"""
Nhạc nền tự soạn cho video (không dùng nhạc có bản quyền): vòng hoà âm C – G – Am – F, 100 nhịp/phút,
đàn gảy rải hợp âm (Karplus–Strong), bass trầm, chuông nhỏ hát giai điệu, tiếng lắc nhẹ phách lẻ.

    python scripts/video/music.py [scripts/video/out/music/vui-ve.wav]

Tệp dài đúng 16 ô nhịp, đuôi các nốt cuối vòng được cộng về đầu tệp nên lặp lại (build.py) không bị hụt.
"""

import os
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '.pylib'))

import numpy as np  # noqa: E402
import imageio_ffmpeg  # noqa: E402

SR = 44100
BPM = 100
BEAT = 60 / BPM
BARS = 16
rng = np.random.default_rng(7)

NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}


def hz(name):
    """'A4' → 440."""
    n, o = name[:-1], int(name[-1])
    return 440.0 * 2 ** ((NOTE[n] + 12 * (o + 1) - 69) / 12)


def pluck(f, dur, vol=0.25):
    """Dây gảy Karplus–Strong, hơi ấm (lọc trung bình)."""
    n = int(dur * SR)
    p = max(int(SR / f), 2)
    buf = rng.uniform(-1, 1, p)
    buf = np.convolve(buf, np.ones(3) / 3, mode='same')
    out = np.empty(n)
    for i in range(n):
        out[i] = buf[i % p]
        buf[i % p] = 0.4985 * (buf[i % p] + buf[(i + 1) % p])
    return out * vol


def bell(f, dur, vol=0.16):
    t = np.arange(int(dur * SR)) / SR
    w = np.sin(2 * np.pi * f * t) + 0.35 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 6) + 0.12 * np.sin(2 * np.pi * f * 3.01 * t) * np.exp(-t * 9)
    env = np.minimum(t / 0.006, 1) * np.exp(-t * 3.2)
    return w * env * vol


def bass(f, dur, vol=0.32):
    t = np.arange(int(dur * SR)) / SR
    w = np.sin(2 * np.pi * f * t) + 0.25 * np.sin(2 * np.pi * 2 * f * t)
    env = np.minimum(t / 0.02, 1) * np.exp(-t * 1.6) * np.clip((dur - t) / 0.05, 0, 1)
    return w * env * vol


def shaker(dur=0.09, vol=0.05):
    n = int(dur * SR)
    t = np.arange(n) / SR
    x = rng.uniform(-1, 1, n)
    x = x - np.concatenate([[0], x[:-1]])  # bỏ bớt tiếng trầm: chỉ còn tiếng xào xạc
    return x * np.exp(-t * 45) * vol


def main(out):
    total = int(BARS * 4 * BEAT * SR)
    tail = int(3 * SR)
    buf = np.zeros(total + tail)

    def put(at_beat, sig):
        i = int(at_beat * BEAT * SR)
        buf[i:i + len(sig)] += sig[:len(buf) - i]

    chords = [
        ('C', ['C3', 'G3', 'C4', 'E4'], 'C2'),
        ('G', ['G2', 'D3', 'G3', 'B3'], 'G1'),
        ('Am', ['A2', 'E3', 'A3', 'C4'], 'A1'),
        ('F', ['F2', 'C3', 'F3', 'A3'], 'F1'),
    ]
    # Giai điệu chuông: hai câu 4 ô nhịp (nốt, phách bắt đầu trong ô, độ dài phách); None = nghỉ.
    tune_a = [
        [('E5', 0, 1), ('G5', 1, 1), ('E5', 2, 0.5), ('D5', 2.5, 0.5), ('C5', 3, 1)],
        [('D5', 0, 1.5), ('B4', 1.5, 0.5), ('D5', 2, 2)],
        [('C5', 0, 1), ('E5', 1, 1), ('A5', 2, 1), ('G5', 3, 1)],
        [('F5', 0, 1), ('E5', 1, 1), ('C5', 2, 2)],
    ]
    tune_b = [
        [('G5', 0, 0.5), ('E5', 0.5, 0.5), ('G5', 1, 1), ('C6', 2, 2)],
        [('B5', 0, 1), ('G5', 1, 1), ('D5', 2, 2)],
        [('E5', 0, 0.5), ('C5', 0.5, 0.5), ('E5', 1, 1), ('A5', 2, 1.5), ('G5', 3.5, 0.5)],
        [('F5', 0, 1), ('A5', 1, 1), ('G5', 2, 2)],
    ]
    for bar in range(BARS):
        _, notes, root = chords[bar % 4]
        b0 = bar * 4
        # Đàn gảy rải: lên xuống theo tám nốt móc đơn.
        order = [0, 1, 2, 3, 2, 1, 2, 3]
        for k, j in enumerate(order):
            put(b0 + k * 0.5, pluck(hz(notes[j]), 1.4, 0.2 if k % 2 else 0.26))
        put(b0, bass(hz(root), 1.9))
        put(b0 + 2, bass(hz(root), 1.4, 0.26))
        put(b0 + 3.5, bass(hz(root) * 1.5, 0.45, 0.18))
        # Giai điệu: 4 ô đầu nghỉ (nhạc vào nhẹ), rồi câu A, câu B, câu A.
        phrase = (bar // 4) % 4
        if phrase:
            tune = tune_b if phrase == 2 else tune_a
            for n, at, d in tune[bar % 4]:
                put(b0 + at, bell(hz(n), d * BEAT + 0.6))
        for k in range(4):
            put(b0 + k + 0.5, shaker())
            if phrase:
                put(b0 + k + 0.75, shaker(0.06, 0.025))

    # Đuôi cuối vòng cộng về đầu: lặp liền mạch.
    buf[:tail] += buf[total:total + tail]
    buf = buf[:total]
    buf *= 0.8 / max(np.max(np.abs(buf)), 1e-6)
    os.makedirs(os.path.dirname(out), exist_ok=True)
    pcm = (buf * 32767).astype('<i2').tobytes()
    subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-y', '-v', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', out],
                   input=pcm, check=True)
    print(f'Xong: {out} ({total / SR:.1f} giây)')


if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else os.path.join(HERE, 'out', 'music', 'vui-ve.wav'))
