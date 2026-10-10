"""
Làm nét một hình nhân vật nền trong suốt (vd. src/assets/can_nong_san.png → chị Thảo trạm cân) bằng Real-ESRGAN
(model realesrgan-x4plus-anime, như scripts/upscale-pre.py), lưu webp cạnh dài tối đa --max (mặc định 1600).

  python scripts/upscale-npc.py --esrgan <realesrgan-ncnn-vulkan.exe> src/assets/can_nong_san.png src/assets/grade4-games/weigh/tram-can.webp

Màu lấy từ bản AI; kênh trong suốt KHÔNG lấy từ AI (mô hình làm viền lởm chởm chấm đen) mà phóng từ hình gốc, cắt
ngưỡng rồi co vào 2 px (MinFilter 5) để bỏ dải chấm tối quanh viền, làm mềm lại 1 px. Không cắt khung hình.
Công cụ: https://github.com/xinntao/Real-ESRGAN/releases (realesrgan-ncnn-vulkan-*-windows.zip).
"""
import argparse, os, subprocess, tempfile
from PIL import Image, ImageFilter

MODEL = 'realesrgan-x4plus-anime'


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--esrgan', required=True, help='realesrgan-ncnn-vulkan.exe')
    ap.add_argument('--max', type=int, default=1600, help='cạnh dài tối đa sau khi phóng')
    ap.add_argument('--quality', type=int, default=88)
    ap.add_argument('src')
    ap.add_argument('out')
    args = ap.parse_args()

    orig = Image.open(args.src).convert('RGBA')
    with tempfile.TemporaryDirectory() as tmp:
        inp, out = os.path.join(tmp, 'in.png'), os.path.join(tmp, 'x4.png')
        orig.save(inp)
        subprocess.run([args.esrgan, '-i', inp, '-o', out, '-n', MODEL], cwd=os.path.dirname(args.esrgan), check=True,
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        x4 = Image.open(out).convert('RGB')
        k = min(1, args.max / max(x4.size))
        w, h = round(x4.width * k), round(x4.height * k)
        rgb = x4.resize((w, h), Image.LANCZOS)
    alpha = orig.getchannel('A').resize((w, h), Image.BICUBIC)
    alpha = alpha.point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(1.0))
    rgb.putalpha(alpha)
    rgb.save(args.out, 'WEBP', quality=args.quality, method=6)
    print(f'{args.out}: {w}x{h}, {os.path.getsize(args.out) // 1024} KB')


if __name__ == '__main__':
    main()
