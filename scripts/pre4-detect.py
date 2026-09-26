"""
Tìm nháp khung từng đồ vật trên hình đã cắt của "99 đề" để bé chạm đếm (khoá "items" trong scripts/pre4/*.json).

  python scripts/pre4-detect.py <thư_mục_ra> p05_bapcai p10_meo ...
    → in số đồ vật tìm được, lưu ảnh kiểm tra <thư_mục_ra>/det-<tên>.png (khung đỏ đánh số)
  python scripts/pre4-detect.py <thư_mục_ra> --write p05_bapcai ...
    → ghi luôn khung (điểm PDF của trang) vào khoá "items" của hình trong JSON

Cách tìm: màu chiếm nhiều diện tích (trên 8%) và màu trắng là nền; phần còn lại là đồ vật.
Bỏ khung viền (vùng phủ gần hết hình) và mảnh vụn, lấp lỗ bên trong từng đồ vật.
Hình nét đen trên nền trắng hoặc đồ vật chồng lên nhau thường tìm sai — xem ảnh rồi sửa tay.
"""
import glob, json, os, sys
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from detect_items import detect  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DPI = 170


def load_specs():
    out = {}
    for path in glob.glob(os.path.join(ROOT, 'scripts', 'pre4', '*.json')):
        with open(path, encoding='utf-8') as f:
            for name, spec in json.load(f).items():
                out[name] = (path, spec)
    return out


def main():
    out_dir = sys.argv[1]
    write = '--write' in sys.argv
    names = [n for n in sys.argv[2:] if n != '--write']
    specs = load_specs()
    changed = {}
    for name in names:
        path, spec = specs[name]
        im = Image.open(os.path.join(ROOT, 'src', 'assets', 'pre4', f'{name}.webp'))
        boxes = detect(im)
        view = im.convert('RGB')
        d = ImageDraw.Draw(view)
        for k, (x0, y0, x1, y1) in enumerate(boxes):
            d.rectangle([x0, y0, x1, y1], outline=(255, 0, 0), width=3)
            d.text((x0 + 3, y0 + 2), str(k), fill=(255, 0, 0))
        view.save(os.path.join(out_dir, f'det-{name}.png'))
        print(name, len(boxes))
        if write:
            bx0, by0 = spec['box'][:2]
            k = 72 / DPI
            spec['items'] = [[round(bx0 + x0 * k, 1), round(by0 + y0 * k, 1), round(bx0 + x1 * k, 1), round(by0 + y1 * k, 1)]
                             for x0, y0, x1, y1 in boxes]
            changed.setdefault(path, {})[name] = spec
    for path, upd in changed.items():
        with open(path, encoding='utf-8') as f:
            data = json.load(f)
        data.update(upd)
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=1)


if __name__ == '__main__':
    main()
