"""
Cắt hình cho "Bé Học Vui Toán" Tập 2: So sánh (docs/pre_1/toan-tien-tieu-hoc-tap-2-so-sanh.pdf).

Trang sách = trang PDF (đánh số từ 0) + 43. Ra:
  src/assets/pre2/pNN_K.webp  — khung hình thứ K (trái → phải, trên → dưới) của trang sách NN
  src/assets/pre2/rNN_K.webp  — hàng đồ vật thứ K của trang 44 / 49 (không có khung)
  src/games/preschool/zones2.json — ô từng đồ vật của bài "gạch bỏ" (trang 45–46)
Ô vuông trả lời dính vào khung (trang 61–63) được cắt bỏ: bé chọn số trên app.

Chạy: python scripts/extract-pre2.py
"""
import io, json, os
import numpy as np
import pymupdf as fitz
from PIL import Image
from scipy import ndimage as nd

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'docs', 'pre_1', 'toan-tien-tieu-hoc-tap-2-so-sanh.pdf')
OUT = os.path.join(ROOT, 'src', 'assets', 'pre2')
DPI = 200
os.makedirs(OUT, exist_ok=True)
doc = fitz.open(PDF)
BOOK_OFFSET = 43


def rgb(page, clip=None, dpi=72):
    pm = page.get_pixmap(dpi=dpi, clip=clip)
    return np.frombuffer(pm.samples, dtype=np.uint8).reshape(pm.height, pm.width, pm.n)[:, :, :3].astype(int)


def save(page, clip, name):
    pm = page.get_pixmap(dpi=DPI, clip=clip)
    im = Image.open(io.BytesIO(pm.tobytes('png'))).convert('RGB')
    path = os.path.join(OUT, name)
    im.save(path, 'WEBP', quality=82)
    return path


def panels(pi):
    """Khung hình: vùng sáng khép kín đủ lớn (bỏ các ô vuông trả lời nhỏ)."""
    a = rgb(doc[pi])
    lab, _ = nd.label(a.min(2) > 225)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    out = []
    for i, sl in enumerate(nd.find_objects(lab), 1):
        if i in border:
            continue
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if w > 150 and h > 90:
            out.append(fitz.Rect(sl[1].start, sl[0].start, sl[1].stop, sl[0].stop))
    return sorted(out, key=lambda r: (r.y0 // 25, r.x0))


def answer_boxes(pi):
    """Ô vuông trả lời nhỏ (phần trắng bên trong viền) trên trang."""
    a = rgb(doc[pi])
    lab, _ = nd.label(a.min(2) > 225)
    out = []
    for sl in nd.find_objects(lab):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if not (20 < w < 75 and 0.6 < w / h < 1.6):
            continue
        # Phải có viền xanh lá bao quanh (loại phần trắng của cục tẩy, lọ keo…).
        y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
        ring = np.concatenate([a[max(0, y0 - 3):y0, x0:x1].reshape(-1, 3), a[y1:y1 + 3, x0:x1].reshape(-1, 3),
                               a[y0:y1, max(0, x0 - 3):x0].reshape(-1, 3), a[y0:y1, x1:x1 + 3].reshape(-1, 3)])
        green = (ring[:, 1] - ring[:, 0] > 25) & (ring[:, 1] - ring[:, 2] > 25)
        if green.mean() > 0.4:
            out.append(fitz.Rect(x0, y0, x1, y1))
    return out


def trim_box(r, boxes):
    """Cắt bỏ ô trả lời nằm sát mép trong của khung (trang 61–63): bé chọn số trên app."""
    for b in boxes:
        cy = (b.y0 + b.y1) / 2
        if not (r.y0 < cy < r.y1) or not (r.x0 - 12 < (b.x0 + b.x1) / 2 < r.x1 + 12):
            continue
        if (b.x0 + b.x1) / 2 > (r.x0 + r.x1) / 2:
            t = fitz.Rect(r.x0, r.y0, b.x0 - 4, r.y1)
        else:
            t = fitz.Rect(b.x1 + 4, r.y0, r.x1, r.y1)
        if t.width > r.width * 0.6:  # chỉ ô dính mép khung, không phải ô ở giữa
            r = t
    return r


meta = {'crossout': {}}

# Bài "gạch bỏ" (trang 45–46): số đồ vật hàng trên, hàng dưới (đếm tay trên hình).
CROSS = {'p45_0': (5, 7), 'p45_1': (7, 4), 'p45_2': (8, 4), 'p45_3': (4, 8), 'p45_4': (6, 2),
         'p46_0': (4, 8), 'p46_1': (9, 3), 'p46_2': (3, 7), 'p46_3': (8, 4), 'p46_4': (4, 10)}

# Khung hình các trang 45–65 (bỏ trang 44, 49 không có khung).
for pi in list(range(2, 6)) + list(range(7, 23)):
    boxes = answer_boxes(pi) if pi in (18, 19, 20) else []
    for k, r in enumerate(panels(pi)):
        inset = 5 if pi in (2, 3) else 2  # bài gạch bỏ: bỏ hẳn viền khung để dò đồ vật
        clip = trim_box(fitz.Rect(r.x0 + inset, r.y0 + inset, r.x1 - inset, r.y1 - inset), boxes)
        path = save(doc[pi], clip, f'p{pi + BOOK_OFFSET}_{k}.webp')
        if pi in (2, 3):
            # Gạch bỏ: 2 hàng đồ vật, tìm từng đồ vật theo khoảng trống giữa các cột mực.
            a = np.asarray(Image.open(path).convert('RGB')).astype(int)
            H, W = a.shape[:2]
            ink = a.min(2) < 215
            m = int(W * 0.025)
            ink[:, :m] = False
            ink[:, -m:] = False
            ink[:m] = False
            ink[-m:] = False
            rows = np.where(ink.mean(1) > 0.01)[0]
            runs, s0 = [], rows[0]
            for y0, y1 in zip(rows, rows[1:]):
                if y1 - y0 > 4:
                    runs.append((s0, y0)); s0 = y1
            runs.append((s0, rows[-1]))
            runs = sorted(sorted(runs, key=lambda t: t[1] - t[0], reverse=True)[:2])
            items = []
            for ri, (y0, y1) in enumerate(runs):
                cols = np.where(ink[y0:y1 + 1].any(0))[0]
                cruns, c0 = [], cols[0]
                for x0, x1 in zip(cols, cols[1:]):
                    if x1 - x0 > 3:
                        cruns.append((c0, x0)); c0 = x1
                cruns.append((c0, cols[-1]))
                cruns = [c for c in cruns if c[1] - c[0] > W * 0.02]
                want = CROSS[f'p{pi + BOOK_OFFSET}_{k}'][ri]
                if len(cruns) != want:  # đồ vật chạm nhau: chia đều theo bề ngang hàng
                    step = (cols[-1] - cols[0]) / want
                    cruns = [(cols[0] + i * step, cols[0] + (i + 1) * step) for i in range(want)]
                for c0_, c1_ in cruns:
                    items.append([round(c0_ / W * 100, 1), round(y0 / H * 100, 1),
                                  round((c1_ - c0_) / W * 100, 1), round((y1 - y0) / H * 100, 1), ri])
            meta['crossout'][f'p{pi + BOOK_OFFSET}_{k}'] = items

# Trang 44 (Dấu bằng) và 49 (nhiều hơn – ít hơn): các hàng đồ vật không có khung.
ROWS = {
    1: [(12, 182, 420, 250), (12, 256, 420, 328), (12, 400, 420, 462), (12, 468, 420, 542), (12, 622, 420, 680), (12, 684, 420, 752)],
    6: [(24, 80, 450, 146), (24, 152, 450, 218), (24, 304, 560, 362), (24, 362, 560, 432), (30, 504, 560, 580), (30, 586, 560, 668)],
}
for pi, rows in ROWS.items():
    for k, r in enumerate(rows):
        save(doc[pi], fitz.Rect(*r), f'r{pi + BOOK_OFFSET}_{k}.webp')

# Trang 54: hai khung bài học "dấu bé", "dấu lớn" (nửa trên trang, gồm cả chữ giải thích).
save(doc[11], fitz.Rect(10, 120, 300, 330), 'lesson_lt.webp')
save(doc[11], fitz.Rect(300, 120, 585, 330), 'lesson_gt.webp')

with open(os.path.join(ROOT, 'src', 'games', 'preschool', 'zones2.json'), 'w', encoding='utf-8') as fh:
    json.dump(meta, fh)
print('ok', {k: len(v) for k, v in meta['crossout'].items()})
