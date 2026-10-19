"""
Làm nét sticker vòng quay (src/assets/sticker/{boy,girl}/<bộ>/*.webp) bằng Real-ESRGAN realesrgan-x4plus-anime, như
scripts/upscale-npc.py: màu lấy từ bản AI, kênh trong suốt phóng từ hình gốc (cắt ngưỡng, co 2 px, làm mềm 1 px).

Hình gốc ~300 px mà ô xem sticker rộng tới 440 px (màn retina cần ~880 px) nên bị mờ; lưu cạnh dài --max (mặc định 880).
Nguồn nên là PNG gốc trong git (bản trước khi đổi sang WebP, 6ce2a75^), giữ cấu trúc <boy|girl>/<bộ>/<tên>.png:

  git show "6ce2a75^:src/assets/sticker/boy/dino/4_boy_dino_01.png" > src_dir/boy/dino/4_boy_dino_01.png  (…từng hình)
  python scripts/upscale-stickers.py --esrgan <realesrgan-ncnn-vulkan.exe> src_dir [tên lọc]

Tên hình giữ nguyên nên mã sticker trong bộ sưu tập của bé không đổi.
"""
import argparse, os, subprocess, tempfile
from PIL import Image, ImageFilter

MODEL = 'realesrgan-x4plus-anime'
OUT = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'sticker')


def upscale(esrgan, src, dst, max_side, quality):
    orig = Image.open(src).convert('RGBA')
    with tempfile.TemporaryDirectory() as tmp:
        inp, out = os.path.join(tmp, 'in.png'), os.path.join(tmp, 'x4.png')
        # nền trong suốt → trắng cho AI khỏi vẽ viền tối quanh hình
        flat = Image.new('RGB', orig.size, (255, 255, 255))
        flat.paste(orig, mask=orig.getchannel('A'))
        flat.save(inp)
        subprocess.run([esrgan, '-i', inp, '-o', out, '-n', MODEL], cwd=os.path.dirname(esrgan), check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        x4 = Image.open(out).convert('RGB')
    k = min(1, max_side / max(x4.size))
    w, h = round(x4.width * k), round(x4.height * k)
    rgb = x4.resize((w, h), Image.LANCZOS)
    alpha = orig.getchannel('A').resize((w, h), Image.BICUBIC)
    alpha = alpha.point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.0))
    rgb.putalpha(alpha)
    rgb.save(dst, 'WEBP', quality=quality, method=6)
    return w, h


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--esrgan', required=True, help='realesrgan-ncnn-vulkan.exe')
    ap.add_argument('--max', type=int, default=880, help='cạnh dài sau khi phóng')
    ap.add_argument('--quality', type=int, default=82)
    ap.add_argument('--out', default=OUT, help='thư mục ra (mặc định src/assets/sticker)')
    ap.add_argument('src', help='thư mục PNG gốc: <boy|girl>/<bộ>/<tên>.png')
    ap.add_argument('only', nargs='?', default='', help='chỉ làm hình có đường dẫn chứa chuỗi này')
    args = ap.parse_args()

    total = 0
    for root, _, files in os.walk(args.src):
        for f in sorted(files):
            if not f.endswith('.png'):
                continue
            src = os.path.join(root, f)
            rel = os.path.relpath(src, args.src)
            if args.only not in rel.replace('\\', '/'):
                continue
            dst = os.path.join(args.out, rel[:-4] + '.webp')
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            w, h = upscale(args.esrgan, src, dst, args.max, args.quality)
            total += os.path.getsize(dst)
            print(f'{rel}: {w}x{h}, {os.path.getsize(dst) // 1024} KB', flush=True)
    print(f'total {total / 1024 / 1024:.1f} MB')


if __name__ == '__main__':
    main()
