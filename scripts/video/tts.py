"""
Giọng đọc cho video (scripts/video/record.mjs gọi): tạo mp3 bằng giọng Microsoft (edge-tts), có bộ nhớ đệm.

    python scripts/video/tts.py "<câu>" [--voice vi-VN-HoaiMyNeural] [--rate -5%] [--pitch +20Hz]
    → in ra JSON {"file": "...mp3", "dur": giây, "cached": đã có sẵn}

Gói Python nằm ở scripts/video/.pylib (không đưa lên git):
    python -m pip install --target scripts/video/.pylib edge-tts imageio-ffmpeg
"""

import hashlib
import json
import os
import re
import subprocess
import sys
import time

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(HERE, '.pylib'))

import asyncio  # noqa: E402
import edge_tts  # noqa: E402
import imageio_ffmpeg  # noqa: E402

CACHE = os.path.join(HERE, 'out', 'tts-cache')


def duration(path):
    """Độ dài (giây) của tệp âm thanh, đọc từ dòng "Duration:" của ffmpeg."""
    p = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(), '-hide_banner', '-i', path], capture_output=True, text=True, encoding='utf-8', errors='replace')
    m = re.search(r'Duration: (\d+):(\d+):([\d.]+)', p.stderr)
    return int(m[1]) * 3600 + int(m[2]) * 60 + float(m[3]) if m else 0.0


def make(text, voice='vi-VN-HoaiMyNeural', rate='-5%', pitch='+0Hz'):
    os.makedirs(CACHE, exist_ok=True)
    # Giọng mặc định (pitch +0Hz) giữ khoá cũ để không phải tạo lại bộ nhớ đệm.
    key = hashlib.sha1(f'{voice}|{rate}|{text}'.encode('utf-8') if pitch == '+0Hz' else f'{voice}|{rate}|{pitch}|{text}'.encode('utf-8')).hexdigest()[:16]
    path = os.path.join(CACHE, f'{key}.mp3')
    cached = os.path.exists(path) and os.path.getsize(path) > 0
    for attempt in range(4):  # dịch vụ thỉnh thoảng trả về rỗng (NoAudioReceived): thử lại
        if os.path.exists(path) and os.path.getsize(path) > 0:
            break
        try:
            asyncio.run(edge_tts.Communicate(text, voice, rate=rate, pitch=pitch).save(path))
        except Exception:
            if attempt == 3:
                raise
            time.sleep(1 + attempt)
    return {'file': path, 'dur': duration(path), 'cached': cached}


if __name__ == '__main__':
    args = sys.argv[1:]
    opts = {}
    for flag in ('--voice', '--rate', '--pitch'):
        if flag in args:
            i = args.index(flag)
            opts[flag[2:]] = args[i + 1]
            del args[i:i + 2]
    sys.stdout.reconfigure(encoding='utf-8')
    print(json.dumps(make(' '.join(args), **opts), ensure_ascii=False))
