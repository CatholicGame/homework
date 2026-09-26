"""
Tạo khung từng đồ vật cho hình đếm của Bé Học Vui Toán Tập 1 (src/assets/pre1) và Tập 2 (pre2),
để bé chỉ chạm vào đồ vật mới được đánh số, mỗi đồ vật một số.

  python scripts/count-detect.py <list.json> <thư_mục_ảnh_kiểm_tra>
    list.json = [["pre1/c28_0", 3], ["pre2/p55_0", 4], …]  (hình, số đồ vật đúng theo đáp án)

Thử lần lượt nhiều bộ tham số của detect_items.detect; nhận bộ đầu tiên cho đúng số đồ vật.
Hình không khớp được liệt kê để khoanh tay trong src/games/preschool/count-manual.json
({ "pre1/c28_0": [[x0, y0, x1, y1, nhóm?], …] } theo điểm ảnh của hình) — khoanh tay luôn được ưu tiên.
Kết quả: src/games/preschool/count-items.json { "pre1/c28_0": [[x%, y%, w%, h%], …] }.
"""
import json, os, sys
from PIL import Image, ImageDraw

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from detect_items import detect  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'games', 'preschool', 'count-items.json')
MANUAL = os.path.join(ROOT, 'src', 'games', 'preschool', 'count-manual.json')

VARIANTS = [dict()] + [dict(thresh=t, close=c, lo=lo, hi=hi, min_frac=m)
                       for t in (75, 55, 100) for c in (2, 1, 3, 4) for lo in (0.4, 0.25)
                       for hi in (3.0, 5.0) for m in (0.0025, 0.001)]


def main():
    todo = json.load(open(sys.argv[1], encoding='utf-8'))
    view_dir = sys.argv[2]
    manual = json.load(open(MANUAL, encoding='utf-8')) if os.path.exists(MANUAL) else {}
    out, miss = {}, []
    for name, want in todo:
        im = Image.open(os.path.join(ROOT, 'src', 'assets', f'{name}.webp'))
        W, H = im.size
        boxes = manual.get(name)
        if boxes is None:
            for v in VARIANTS:
                got = detect(im, **v)
                if len(got) == want:
                    boxes = got
                    break
        if boxes is None or len(boxes) != want:
            miss.append((name, want, len(detect(im))))
            continue
        # Ô thứ 5 (nếu có) là nhóm: mỗi nhóm đếm lại từ 1 (hình so sánh chứa cả hai nhóm).
        out[name] = [[round(b[0] / W * 100, 2), round(b[1] / H * 100, 2), round((b[2] - b[0]) / W * 100, 2),
                      round((b[3] - b[1]) / H * 100, 2), *b[4:]] for b in boxes]
        view = im.convert('RGB')
        d = ImageDraw.Draw(view)
        for b in boxes:
            d.rectangle(b[:4], outline=(255, 0, 0) if len(b) < 5 or not b[4] else (0, 90, 255), width=3)
        view.save(os.path.join(view_dir, name.replace('/', '_') + '.png'))
    with open(OUT, 'w', encoding='utf-8') as f:
        json.dump(dict(sorted(out.items())), f, separators=(',', ':'))
    print(f'ok {len(out)}/{len(todo)}')
    for m in miss:
        print('MISS', *m)


if __name__ == '__main__':
    main()
