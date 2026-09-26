"""
Ảnh một trang sách "99 đề toán" có lưới toạ độ (điểm PDF, 20 điểm một ô) để đọc khung cắt / ô chạm.

  python scripts/pre4-grid.py 17 [thư_mục_ra]          → pre4-grid-p17.png
  python scripts/pre4-grid.py 17 out x0 y0 x1 y1       → chỉ vùng đó, phóng to (lưới 10 điểm)
Vẽ thêm các hình đã khai báo trong scripts/pre4/*.json của trang đó (khung đỏ, ô chạm xanh).
"""
import glob, io, json, os, sys
import pymupdf as fitz
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'docs', 'pre_1', 'be_tap_lam_toan_chuan_bi_vao_lop_1.pdf')


def pdf_index(page):
    return page - 3 if page <= 30 else page - 2


page_no = int(sys.argv[1])
out_dir = sys.argv[2] if len(sys.argv) > 2 else '.'
clip = fitz.Rect(*map(float, sys.argv[3:7])) if len(sys.argv) >= 7 else fitz.Rect(0, 0, 612, 792)
step = 10 if len(sys.argv) >= 7 else 20
scale = min(4.0, 1100 / max(clip.width, clip.height))
page = fitz.open(PDF)[pdf_index(page_no)]
pm = page.get_pixmap(matrix=fitz.Matrix(scale, scale), clip=clip)
im = Image.open(io.BytesIO(pm.tobytes('png'))).convert('RGB')
d = ImageDraw.Draw(im)
px = lambda x, y: ((x - clip.x0) * scale, (y - clip.y0) * scale)

x = (int(clip.x0) // step) * step
while x <= clip.x1:
    a, _ = px(x, 0)
    d.line([(a, 0), (a, im.height)], fill=(0, 160, 255) if x % 100 == 0 else (190, 225, 255), width=1)
    d.text((a + 2, 2), str(x), fill=(0, 90, 200))
    x += step
y = (int(clip.y0) // step) * step
while y <= clip.y1:
    _, b = px(0, y)
    d.line([(0, b), (im.width, b)], fill=(0, 160, 255) if y % 100 == 0 else (190, 225, 255), width=1)
    d.text((2, b + 2), str(y), fill=(0, 90, 200))
    y += step

for path in glob.glob(os.path.join(ROOT, 'scripts', 'pre4', '*.json')):
    with open(path, encoding='utf-8') as f:
        for name, spec in json.load(f).items():
            if spec['page'] != page_no:
                continue
            x0, y0, x1, y1 = spec['box']
            d.rectangle([px(x0, y0), px(x1, y1)], outline=(230, 0, 0), width=3)
            d.text(px(x0 + 3, y0 + 3), name, fill=(230, 0, 0))
            for k, (a, b, c, e) in enumerate(spec.get('zones', [])):
                d.rectangle([px(a, b), px(c, e)], outline=(0, 170, 0), width=2)
                d.text(px(a + 2, b + 1), str(k), fill=(0, 140, 0))

out = os.path.join(out_dir, f'pre4-grid-p{page_no}.png')
im.save(out)
print(out)
