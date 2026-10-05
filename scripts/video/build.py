"""
Dựng video từ bản quay của scripts/video/record.mjs (record.mjs tự gọi):

    python scripts/video/build.py scripts/video/out/<tên> scripts/video/out/<tên>.mp4

- Hình: các khung JPEG kèm thời điểm → 30 hình/giây, H.264 CRF 18, yuv420p, faststart (TikTok nhận thẳng).
- Tiếng: giọng đọc (mp3 của tts.py) đặt đúng lúc, câu bị cắt ngang thì cắt theo; tiếng động sfx tổng hợp
  giống preschool/fx.js (tone: lên 15 ms, tắt dần theo hàm mũ); nhạc nền tuỳ chọn (timeline.music).
- Đoạn cắt (v.cut / v.uncut): bỏ cả hình lẫn lời; câu đang đọc dừng ở chỗ cắt, tiếng động giữ trọn.
"""

import json
import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '.pylib'))

import numpy as np  # noqa: E402
import imageio_ffmpeg  # noqa: E402

FF = imageio_ffmpeg.get_ffmpeg_exe()
SR = 44100
FPS = 30


def decode(path):
    """Tệp âm thanh → mảng float32 mono 44.1 kHz."""
    p = subprocess.run([FF, '-v', 'error', '-i', path, '-f', 'f32le', '-ac', '1', '-ar', str(SR), '-'], capture_output=True, check=True)
    return np.frombuffer(p.stdout, dtype=np.float32).copy()


def tone(freq, start, dur, type='sine', vol=0.18, slide=0):
    """Giống tone() trong src/games/preschool/fx.js; trả về (vị trí bắt đầu theo mẫu, tín hiệu)."""
    n = int((dur + 0.05) * SR)
    t = np.arange(n) / SR
    f = freq * (slide ** np.minimum(t / dur, 1.0)) if slide else np.full(n, float(freq))
    ph = 2 * np.pi * np.cumsum(f) / SR
    w = np.sin(ph) if type == 'sine' else (2 / np.pi) * np.arcsin(np.sin(ph))
    env = np.where(t < 0.015, 0.0001 * (vol / 0.0001) ** (t / 0.015),
                   vol * (0.0001 / vol) ** (np.clip((t - 0.015) / (dur - 0.015), 0, 1)))
    env[t > dur] = 0
    return int(start * SR), (w * env).astype(np.float32)


SFX = {
    'pop': lambda s: [tone(420 + s * 45, 0, 0.12, 'triangle', 0.2, 1.6)],
    'tap': lambda s: [tone(700, 0, 0.06, 'triangle', 0.12)],
    'ding': lambda s: [tone(880, 0, 0.18, vol=0.16), tone(1320, 0.09, 0.28, vol=0.14)],
    'boing': lambda s: [tone(260, 0, 0.28, 'sine', 0.2, 0.55)],
    'swish': lambda s: [tone(500, 0, 0.18, 'triangle', 0.12, 2.2)],
    'fanfare': lambda s: [tone(f, i * 0.11, 0.25, 'triangle', 0.16) for i, f in enumerate([523, 659, 784, 1047])]
                         + [tone(1319, 0.46, 0.5, 'triangle', 0.14)],
}


def mix_into(buf, at, sig, gain=1.0):
    if at >= len(buf):
        return
    at = max(at, 0)
    sig = sig[:len(buf) - at]
    buf[at:at + len(sig)] += sig * gain


def main(src, out):
    tl = json.load(open(os.path.join(src, 'timeline.json'), encoding='utf-8'))
    t0, t_end = tl['t0'], tl['tEnd']
    sec = lambda t: (t - t0) / 1000  # noqa: E731

    # Các đoạn giữ lại (v.cut / v.uncut trong kịch bản) và hàm đổi giờ quay → giờ trong video.
    keep, a = [], 0.0
    for e in sorted((e for e in tl['events'] if e['kind'] in ('cut', 'uncut')), key=lambda e: e['t']):
        if e['kind'] == 'cut' and a is not None:
            keep.append((a, sec(e['t'])))
            a = None
        elif e['kind'] == 'uncut' and a is None:
            a = sec(e['t'])
    if a is not None:
        keep.append((a, sec(t_end)))
    keep = [(x, y) for x, y in keep if y > x]
    offs, acc = [], 0.0
    for x, y in keep:
        offs.append(acc)
        acc += y - x
    total = acc

    def where(t):
        """(chỉ số đoạn, giờ trong video) nếu t thuộc đoạn giữ lại, không thì None."""
        for i, (x, y) in enumerate(keep):
            if x - 0.005 <= t < y:
                return i, offs[i] + max(t - x, 0)
        return None

    # ── Hình ──
    frames = tl['frames']
    # Dùng thời điểm vẽ của trình duyệt nếu cùng đồng hồ với máy (lệch < 2 s), không thì thời điểm nhận.
    use_ts = frames and frames[0].get('ts') and abs(frames[0]['ts'] - frames[0]['t']) < 2000
    times = [sec(f['ts'] if use_ts else f['t']) for f in frames]
    shots = []  # (giờ trong video, tệp)
    for i, (x, y) in enumerate(keep):
        before = [k for k, t in enumerate(times) if t <= x]
        if before:
            shots.append((offs[i], frames[before[-1]]['f']))
        shots += [(offs[i] + t - x, frames[k]['f']) for k, t in enumerate(times) if x < t < y]
    lst = os.path.join(src, 'frames.txt')
    with open(lst, 'w', encoding='utf-8') as fh:
        for i, (t, f) in enumerate(shots):
            end = shots[i + 1][0] if i + 1 < len(shots) else total
            fh.write(f"file 'frames/{f}'\nduration {max(end - t, 0.001):.4f}\n")
        fh.write(f"file 'frames/{shots[-1][1]}'\n")

    # ── Tiếng ──
    buf = np.zeros(int(total * SR) + SR, dtype=np.float32)
    cancels = {e['id']: sec(e['t']) for e in tl['events'] if e['kind'] == 'cancel'}
    for e in tl['events']:
        at = sec(e['t'])
        w = where(at)
        if w is None:
            continue
        seg, out_at = w
        if e['kind'] == 'say' and e.get('file'):
            sig = decode(e['file'])
            stop = min(cancels.get(e['id'], 1e9), keep[seg][1])  # câu bị cắt ngang / tới chỗ cắt
            if at + len(sig) / SR > stop:
                sig = sig[:max(int((stop - at) * SR), 0)]
                fade = min(len(sig), int(0.06 * SR))
                if fade:
                    sig[-fade:] *= np.linspace(1, 0, fade, dtype=np.float32)
            mix_into(buf, int(out_at * SR), sig, 1.0)
        elif e['kind'] == 'sfx' and e['sound'] in SFX:
            for off, sig in SFX[e['sound']](e.get('arg') or 0):
                mix_into(buf, int(out_at * SR) + off, sig, 1.6)
    if tl.get('music'):
        m = decode(tl['music'])
        m = np.tile(m, int(np.ceil(len(buf) / max(len(m), 1))))[:len(buf)]
        fade = int(1.5 * SR)
        m[-fade:] *= np.linspace(1, 0, fade, dtype=np.float32)
        buf += m * tl.get('musicVolume', 0.12)
    peak = float(np.max(np.abs(buf))) or 1.0
    buf *= min(1.0, 0.95 / peak)
    wav = os.path.join(src, 'audio.f32')
    buf.astype(np.float32).tofile(wav)

    subprocess.run([
        FF, '-y', '-v', 'error', '-stats',
        '-f', 'concat', '-safe', '0', '-i', lst,
        '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', wav,
        '-vf', f'fps={FPS},scale=1080:1920:flags=lanczos:in_range=pc:out_range=tv,format=yuv420p', '-color_range', 'tv',
        '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-profile:v', 'high',
        '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '44100',  # độ to chuẩn TikTok
        '-c:a', 'aac', '-b:a', '192k', '-ac', '2',
        '-t', f'{total:.3f}', '-movflags', '+faststart', out,
    ], check=True)
    print(f'Xong: {out} ({total:.1f} giây)')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
