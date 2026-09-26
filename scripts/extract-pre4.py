"""
Cắt hình cho "Bé Tập Làm Toán — 99 đề toán cho trẻ mẫu giáo" (docs/pre_1/be_tap_lam_toan_chuan_bi_vao_lop_1.pdf).

Danh sách hình: scripts/pre4/*.json, mỗi tệp một chủ đề, dạng
  { "p05_rau": { "page": 5, "box": [x0, y0, x1, y1], "zones": [[x0, y0, x1, y1], ...] } }
  - page  = số trang in trên sách (5–76)
  - box   = khung cắt, đơn vị điểm PDF (trang 612 × 792, gốc ở góc trên trái)
  - zones = (tuỳ chọn) các ô chạm trên hình, cũng theo điểm PDF của trang
  - items = (tuỳ chọn) khung từng đồ vật để bé chạm đếm (mỗi đồ vật một số), điểm PDF của trang;
            thêm số thứ 5 = nhóm (0, 1, 2…) thì mỗi nhóm đếm lại từ 1
  - mask  = (tuỳ chọn) các vùng tô trắng sau khi cắt (che ô trả lời in sẵn), điểm PDF của trang
Ra:
  src/assets/pre4/<tên>.webp
  src/games/preschool/pre4/zones.json — { tên: [[x%, y%, w%, h%], ...] } theo phần trăm của hình đã cắt
  src/games/preschool/pre4/items.json — như trên, cho khung đồ vật để đếm

Xem toạ độ một trang: python scripts/pre4-grid.py 17   (ảnh trang có lưới 20 điểm)
Chạy: python scripts/extract-pre4.py [tên ...]   (không có tên: cắt tất cả)
"""
import glob, io, json, os, sys
import pymupdf as fitz
from PIL import Image, ImageDraw

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'docs', 'pre_1', 'be_tap_lam_toan_chuan_bi_vao_lop_1.pdf')
OUT = os.path.join(ROOT, 'src', 'assets', 'pre4')
ZONES = os.path.join(ROOT, 'src', 'games', 'preschool', 'pre4', 'zones.json')
ITEMS = os.path.join(ROOT, 'src', 'games', 'preschool', 'pre4', 'items.json')
DPI = 170


def pdf_index(page):
    """Trang sách → chỉ số trang PDF. Trang 5–30 lệch 3; sau trang trắng (PDF 28) lệch 2."""
    return page - 3 if page <= 30 else page - 2


def load_specs():
    specs = {}
    for path in sorted(glob.glob(os.path.join(ROOT, 'scripts', 'pre4', '*.json'))):
        with open(path, encoding='utf-8') as f:
            for name, spec in json.load(f).items():
                if name in specs:
                    raise SystemExit(f'Trùng tên hình {name} ({path})')
                specs[name] = spec
    return specs


def main(only):
    os.makedirs(OUT, exist_ok=True)
    doc = fitz.open(PDF)
    specs = load_specs()
    # zones.json / items.json luôn dựng lại từ toàn bộ JSON (không phụ thuộc lần chạy trước).
    zones, items = {}, {}
    for name, spec in specs.items():
        x0, y0, x1, y1 = spec['box']
        w, h = x1 - x0, y1 - y0
        # Ô thứ 5 (nếu có) là nhóm của đồ vật: mỗi nhóm đếm lại từ 1.
        pct = lambda rects: [[round((a - x0) / w * 100, 2), round((b - y0) / h * 100, 2),
                              round((c - a) / w * 100, 2), round((d - b) / h * 100, 2), *r[4:]]
                             for r in rects for a, b, c, d in [r[:4]]]
        if spec.get('zones'):
            zones[name] = pct(spec['zones'])
        if spec.get('items'):
            items[name] = pct(spec['items'])
        if only and name not in only:
            continue
        page = doc[pdf_index(spec['page'])]
        pm = page.get_pixmap(dpi=DPI, clip=fitz.Rect(x0, y0, x1, y1))
        im = Image.open(io.BytesIO(pm.tobytes('png'))).convert('RGB')
        k = im.width / w
        for a, b, c, d in spec.get('mask', []):
            ImageDraw.Draw(im).rectangle([(a - x0) * k, (b - y0) * k, (c - x0) * k, (d - y0) * k], fill='white')
        im.save(os.path.join(OUT, f'{name}.webp'), 'WEBP', quality=80, method=6)
    for path, data in ((ZONES, zones), (ITEMS, items)):
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(dict(sorted(data.items())), f, ensure_ascii=False, separators=(',', ':'))
    print(f'{len(only) if only else len(specs)} images, {len(zones)} zone sets, {len(items)} item sets')


if __name__ == '__main__':
    main(set(sys.argv[1:]))
