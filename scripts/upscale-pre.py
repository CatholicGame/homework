"""
Phóng nét hình Tiền tiểu học (src/assets/pre1, pre2, pre4 *.webp) bằng Real-ESRGAN (model
realesrgan-x4plus-anime, hợp với hình hoạt hình / clipart), để vùng chơi phóng to trên màn hình ngang
(preschool/fit.js) mà hình không mờ. Hình cắt từ PDF chỉ ~200 DPI (99 đề: bản quét ~86 DPI), cắt
lại ở DPI cao hơn cũng không nét hơn.

  python scripts/upscale-pre.py --esrgan <đường dẫn realesrgan-ncnn-vulkan.exe> [pre1 pre2 pre4]

Công cụ: https://github.com/xinntao/Real-ESRGAN/releases (realesrgan-ncnn-vulkan-*-windows.zip).
Phóng 4 lần rồi thu về cạnh dài tối đa MAX_SIDE, lưu đè webp (giữ nền trong suốt nếu có).
scripts/upscale-pre.json ghi các hình đã phóng (tên → cỡ sau khi phóng): chạy lại thì bỏ qua hình đã
phóng; hình cắt lại từ PDF (extract-pre*.py) có cỡ khác nên sẽ được phóng lại.
"""
import argparse, json, os, shutil, subprocess, sys, tempfile
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ASSETS = os.path.join(ROOT, 'src', 'assets')
MANIFEST = os.path.join(ROOT, 'scripts', 'upscale-pre.json')
MODEL = 'realesrgan-x4plus-anime'
MAX_SIDE = 1600
QUALITY = 85


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--esrgan', required=True, help='realesrgan-ncnn-vulkan.exe')
    ap.add_argument('dirs', nargs='*', default=['pre1', 'pre2', 'pre4'])
    args = ap.parse_args()
    done = json.load(open(MANIFEST, encoding='utf-8')) if os.path.exists(MANIFEST) else {}

    for d in args.dirs:
        src_dir = os.path.join(ASSETS, d)
        todo = []
        for name in sorted(os.listdir(src_dir)):
            if not name.endswith('.webp'):
                continue
            rel = f'{d}/{name}'
            with Image.open(os.path.join(src_dir, name)) as im:
                size = f'{im.width}x{im.height}'
            if done.get(rel) == size:
                continue
            todo.append(name)
        print(f'{d}: {len(todo)} hình cần phóng', flush=True)
        if not todo:
            continue
        with tempfile.TemporaryDirectory() as tmp:
            inp, out = os.path.join(tmp, 'in'), os.path.join(tmp, 'out')
            os.makedirs(inp); os.makedirs(out)
            # Real-ESRGAN đọc png ổn định hơn webp.
            for name in todo:
                with Image.open(os.path.join(src_dir, name)) as im:
                    im.save(os.path.join(inp, name[:-5] + '.png'))
            subprocess.run([args.esrgan, '-i', inp, '-o', out, '-n', MODEL, '-f', 'png'],
                           cwd=os.path.dirname(args.esrgan), check=True,
                           stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            for name in todo:
                path = os.path.join(src_dir, name)
                with Image.open(path) as orig:
                    mode = orig.mode
                    ow, oh = orig.size
                up = Image.open(os.path.join(out, name[:-5] + '.png'))
                k = min(1.0, MAX_SIDE / max(up.size))
                w, h = max(ow, round(up.width * k)), max(oh, round(up.height * k))
                if (w, h) != up.size:
                    up = up.resize((w, h), Image.LANCZOS)
                up.convert('RGBA' if mode == 'RGBA' else 'RGB').save(path, 'WEBP', quality=QUALITY, method=6)
                done[f'{d}/{name}'] = f'{w}x{h}'
        json.dump(done, open(MANIFEST, 'w', encoding='utf-8'), indent=0, sort_keys=True)
        print(f'{d}: xong', flush=True)


if __name__ == '__main__':
    sys.exit(main())
