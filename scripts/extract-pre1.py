"""
Cắt hình cho "Bé Học Vui Toán" (Tiền tiểu học, Tập 1) từ docs/pre_1/*.pdf.

Phần 1 (Bài 1–10, trang 2N-1 và 2N của PDF, đánh số từ 0):
  bN_intro.webp  — hình minh hoạ "Một cái bánh sinh nhật"…
  bN_m0..3.webp  — 4 hình trong bài "nối số" (trên-trái, trên-phải, dưới-trái, dưới-phải)
  bN_count.webp  — hình "Có …… con bướm?"
Toạ độ từng đồ vật (khi mỗi đồ vật là một ảnh riêng) ghi vào src/games/preschool/items.json
để bé chạm đếm từng cái.

Chạy: python scripts/extract-pre1.py
"""
import io, json, os
import pymupdf as fitz
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PDF = os.path.join(ROOT, 'docs', 'pre_1', 'toan-tien-tieu-hoc-tap-1-dem-va-viet-so.pdf')
OUT = os.path.join(ROOT, 'src', 'assets', 'pre1')
DPI = 200
os.makedirs(OUT, exist_ok=True)
doc = fitz.open(PDF)


def images(page):
    return [(im['xref'], fitz.Rect(im['bbox'])) for im in page.get_image_info(xrefs=True)]


def leaves(ims):
    """Bỏ các ảnh làm nền/khung chứa trọn ảnh khác."""
    out = []
    for x, r in ims:
        if any(o is not r and r.contains(o) and o != r for _, o in ims):
            continue
        out.append((x, r))
    return out


def union(rects):
    u = fitz.Rect(rects[0])
    for r in rects[1:]:
        u |= r
    return u


def save(page, clip, name, pad=4):
    clip = fitz.Rect(clip.x0 - pad, clip.y0 - pad, clip.x1 + pad, clip.y1 + pad) & page.rect
    pm = page.get_pixmap(dpi=DPI, clip=clip, alpha=True)
    im = Image.open(io.BytesIO(pm.tobytes('png')))
    # Nền trong suốt → trắng: thẻ trong app nền trắng, webp nhỏ hơn.
    bg = Image.new('RGB', im.size, 'white')
    bg.paste(im, mask=im.split()[-1])
    bg.save(os.path.join(OUT, name), 'WEBP', quality=82)
    return clip


def rel(items, clip):
    """Toạ độ đồ vật theo % của hình đã cắt: [x, y, w, h]."""
    return [[round((r.x0 - clip.x0) / clip.width * 100, 1), round((r.y0 - clip.y0) / clip.height * 100, 1),
             round(r.width / clip.width * 100, 1), round(r.height / clip.height * 100, 1)] for r in items]


def separate(rs):
    """Mỗi ảnh là một đồ vật riêng (không ảnh nào đè lên ảnh khác quá nửa)."""
    return all((a & b).get_area() < 0.5 * min(a.get_area(), b.get_area()) for i, a in enumerate(rs) for b in rs[i + 1:])


def text_top(page, needle):
    for b in page.get_text('blocks'):
        if needle in b[4]:
            return b[1]
    return None


meta = {}
for n in range(1, 11):
    p1, p2 = doc[2 * n - 1], doc[2 * n]
    info = {}

    # ── Hình minh hoạ đầu bài: phía trên dòng "Số …", bên phải thẻ số.
    ims = images(p1)
    so_top = text_top(p1, 'Số ') or 250
    top = [(x, r) for x, r in ims if r.y1 <= so_top + 20 and r.x0 > 190 and r.height > 40 and r.width < 450]
    top = leaves(top)
    clip = save(p1, union([r for _, r in top]), f'b{n}_intro.webp')
    info['intro'] = rel([r for _, r in top], clip) if len(top) == n > 1 and separate([r for _, r in top]) else None

    # ── 4 hình "nối số": khung lặp đúng 4 lần ở nửa dưới trang.
    lower = [(x, r) for x, r in ims if r.y0 > 400]
    counts = {}
    for x, r in lower:
        counts.setdefault(x, []).append(r)
    fx = next(x for x, rs in counts.items() if len(rs) == 4 and rs[0].width > 150)
    frames = list(counts[fx])
    y_top = min(f.y0 for f in frames)
    frames.sort(key=lambda r: (r.y0 > y_top + 80, r.x0))
    for k, f in enumerate(frames):
        inner = [r for x, r in lower if x != fx and f.contains(fitz.Point((r.x0 + r.x1) / 2, (r.y0 + r.y1) / 2))]
        inner = [r & f for r in inner]
        save(p1, union(inner), f'b{n}_m{k}.webp', pad=2)

    # ── "Có …… ?": các ảnh phía trên dòng chữ "Có".
    ims2 = images(p2)
    co_top = text_top(p2, 'Có')
    up = [(x, r) for x, r in ims2 if r.y1 <= co_top + 8 and r.height > 40]
    up = leaves(up)
    clip = save(p2, union([r for _, r in up]), f'b{n}_count.webp')
    info['count'] = rel([r for _, r in up], clip) if len(up) == n > 1 and separate([r for _, r in up]) else None
    info['countSprites'] = len(up)
    info['introSprites'] = len(top)
    meta[n] = info
    print(n, 'intro', len(top), 'count', len(up), 'frames', len(frames))

with open(os.path.join(ROOT, 'src', 'games', 'preschool', 'items.json'), 'w', encoding='utf-8') as fh:
    json.dump({n: {'intro': v['intro'], 'count': v['count']} for n, v in meta.items()}, fh)


# ═══ Phần 2: Thực hành (trang 22–41 của sách = trang 21–40 của PDF) ═══════════════
import numpy as np
from scipy import ndimage as nd

P2 = {}


def page_rgb(page, dpi=72, clip=None):
    pm = page.get_pixmap(dpi=dpi, clip=clip)
    return np.frombuffer(pm.samples, dtype=np.uint8).reshape(pm.height, pm.width, pm.n)[:, :, :3].astype(int)


def content_box(page):
    """Khung bao nội dung (bỏ lề trắng và số trang)."""
    a = page_rgb(page)
    ink = a.min(2) < 235
    ink[int(a.shape[0] * 0.95):] = False  # số trang
    ys, xs = np.where(ink)
    return fitz.Rect(xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)


def holes(page, clip=None):
    """Vùng trắng khép kín (ô tròn trong quả/bóng/toa tàu): [x, y, w, h, độ đầy] theo điểm PDF."""
    a = page_rgb(page, clip=clip)
    ox, oy = (clip.x0, clip.y0) if clip else (0, 0)
    lab, n = nd.label(a.min(2) > 235)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    out = []
    for i, sl in enumerate(nd.find_objects(lab), 1):
        if i in border:
            continue
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        area = int((lab[sl] == i).sum())
        if h > 40 and w > 40 and 0.75 < w / h < 1.35:
            out.append([sl[1].start + ox, sl[0].start + oy, w, h, area / (w * h)])
    return out


def zones(hs, clip):
    return [[round((x + w / 2 - clip.x0) / clip.width * 100, 1), round((y + h / 2 - clip.y0) / clip.height * 100, 1),
             round(w / clip.width * 100, 1)] for x, y, w, h, *_ in hs]


def order(hs):
    hs = sorted(hs, key=lambda h: h[1])
    rows = []
    for h in hs:
        if rows and abs(h[1] - rows[-1][0][1]) < 40:
            rows[-1].append(h)
        else:
            rows.append([h])
    return rows


# Trang 22: 10 quả dâu 1→10 (bé chạm theo thứ tự). Quả số 10 tô tím đậm nên dò thêm bằng tay.
pg = doc[21]
clip = content_box(pg)
clip.y0 = 270
save(pg, clip, 'p2_strawberry.webp', pad=0)
hs = [h for h in holes(pg) if h[4] < 0.6] + [[431, 563, 74, 74, 0]]
# thứ tự theo con số in trên quả (dây leo uốn khúc): 1 2 3 4 / 7 6 5 / 8 9 10
pos = {1: (75, 301), 2: (218, 293), 3: (359, 292), 4: (480, 350), 5: (342, 425), 6: (215, 422), 7: (39, 440),
       8: (93, 566), 9: (274, 570), 10: (431, 563)}
byNum = [min(hs, key=lambda h: abs(h[0] - x) + abs(h[1] - y)) for x, y in pos.values()]
P2['strawberry'] = zones(byNum, clip)

# Trang 23: đoàn tàu 0…10, ô trống ở toa 1, 3, 6, 8.
pg = doc[22]
clip = content_box(pg)
save(pg, clip, 'p2_train.webp', pad=0)
hs = [h for row in order(holes(pg)) for h in sorted(row, key=lambda h: h[0])]
P2['train'] = zones(hs, clip)  # 11 toa theo thứ tự 0…10

# Trang 24: bóng bay 1…10, ô trống ở bóng 2, 6, 9 (tìm theo vị trí trên hình).
pg = doc[23]
clip = content_box(pg)
save(pg, clip, 'p2_balloons.webp', pad=0)
hs = holes(pg)
P2['balloons'] = zones([min(hs, key=lambda h: abs(h[0] + h[2] / 2 - x) + abs(h[1] + h[3] / 2 - y))
                        for x, y in [(238, 138), (288, 370), (339, 581)]], clip)

# Trang 25–27: 6 dãy quả 1…10 (2 hàng × 5), ô trống ở quả 1, 4, 7, 8.
k = 0
for pi in (24, 25, 26):
    pg = doc[pi]
    for half in (fitz.Rect(0, 0, pg.rect.width, pg.rect.height / 2), fitz.Rect(0, pg.rect.height / 2, pg.rect.width, pg.rect.height)):
        hs = [h for h in holes(pg, half) if h[4] > 0.7 and 45 < h[2] < 56 and 50 < h[3] < 62]
        top = min(h[1] for h in hs) - 30
        bottom = max(h[1] + h[3] for h in hs) + 22
        clip = fitz.Rect(12, top, pg.rect.width - 12, bottom)
        save(pg, clip, f'p2_fruit{k}.webp', pad=0)
        P2[f'fruit{k}'] = zones([h for row in order(hs) for h in sorted(row, key=lambda h: h[0])], clip)
        k += 1


def cells(pi):
    """Các ô hình đếm (nền trắng/xám nhạt) trên trang."""
    a = page_rgb(doc[pi])
    m = nd.binary_opening((a.min(2) > 225) & (a.max(2) - a.min(2) < 18), iterations=2)
    out = []
    for sl in nd.find_objects(nd.label(m)[0]):
        h, w = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
        if w > 80 and h > 60 and w < 590:
            out.append([sl[1].start, sl[0].start, w, h])
    ys = []
    for y in sorted(c[1] for c in out):
        if not ys or y - ys[-1] > 30:
            ys.append(y)
    if pi in (29, 30, 31, 32):  # 2 cột × 3 hàng (vài ô dò thiếu vì hình chạm viền)
        W, H = out[0][2], out[0][3]
        return [[x, y, W, H] for y in ys for x in (min(c[0] for c in out), max(c[0] for c in out))]
    if pi in (37, 38, 39, 40):  # 4 hàng ngang
        W, H = max(c[2] for c in out), out[0][3]
        return [[min(c[0] for c in out), y, W, H] for y in ys]
    return sorted(out, key=lambda c: (c[1] // 30, c[0]))


# Trang 28–29 (đếm, điền số), 30–33 (khoanh số 1–5 / 6–10), 38–41 (khoanh số 11–20).
for pi in (27, 28, 29, 30, 31, 32, 37, 38, 39, 40):
    for k, (x, y, w, h) in enumerate(cells(pi)):
        name = f'c{pi + 1}_{k}.webp'
        clip = save(doc[pi], fitz.Rect(x, y, x + w, y + h), name, pad=0)
        if pi in (27, 28):  # xoá ô vuông trả lời có sẵn trong hình (bé chọn số trên app)
            path = os.path.join(OUT, name)
            im = Image.open(path).convert('RGB')
            a = np.asarray(im).astype(int)
            H, W = a.shape[:2]
            # Ô vuông viền xanh ngọc ở góc dưới-phải: tìm phần bên trong được viền bao kín.
            border = (a[:, :, 0] < 170) & (a[:, :, 1] > 170) & (a[:, :, 2] > 200)
            lab, _ = nd.label(~border)
            box = None
            for i, sl in enumerate(nd.find_objects(lab), 1):
                h_, w_ = sl[0].stop - sl[0].start, sl[1].stop - sl[1].start
                if sl[1].start > W * 0.55 and sl[0].start > H * 0.45 and 0.12 * W < w_ < 0.35 * W and 0.75 < w_ / h_ < 1.33                         and (lab[sl] == i).mean() > 0.8:
                    box = (sl[1].start, sl[0].start, sl[1].stop, sl[0].stop)
            if box:
                t = int(W * 0.03)  # độ dày viền ô vuông
                bg = tuple(int(v) for v in np.median(a[H // 2 - 5: H // 2 + 5, 6:20].reshape(-1, 3), axis=0))
                from PIL import ImageDraw
                ImageDraw.Draw(im).rounded_rectangle([box[0] - t, box[1] - t, box[2] + t, box[3] + t], radius=t * 2, fill=bg)
                im.save(path, 'WEBP', quality=82)

# Trang 34–37: hàng trên + hàng dưới = tổng (11–20).
k = 0
for pi in (33, 34, 35, 36):
    pg = doc[pi]
    boxes = []
    for b in pg.get_image_info():
        r = fitz.Rect(b['bbox'])
        if 300 < r.width < 360 and 140 < r.height < 200 and all(abs(r.y0 - o.y0) > 40 for o in boxes):
            boxes.append(r)
    # Trang 36–37 còn sót ảnh của trang trước (bị che): chỉ lấy khung nhìn thấy được.
    seen = content_box(pg)
    for r in sorted(boxes, key=lambda r: r.y0):
        a = page_rgb(pg, clip=r)
        if (a.min(2) < 200).mean() < 0.02:
            continue
        save(pg, fitz.Rect(r.x0 + 3, r.y0 + 3, r.x1 - 3, r.y1 - 3), f'r{k}.webp', pad=0)
        k += 1

with open(os.path.join(ROOT, 'src', 'games', 'preschool', 'zones.json'), 'w', encoding='utf-8') as fh:
    json.dump(P2, fh)
print('part 2 ok, rows', k)

# Vị trí hàng trên / hàng dưới trong hình r*.webp (% chiều cao) để tô sáng khi bé đếm từng hàng.
bands = []
for k in range(10):
    a = np.asarray(Image.open(os.path.join(OUT, f'r{k}.webp')).convert('RGB')).astype(int)
    ink = (a.min(2) < 200).mean(1) > 0.01
    ys = np.where(ink)[0]
    runs, s0 = [], ys[0]
    for a0, a1 in zip(ys, ys[1:]):
        if a1 - a0 > 3:
            runs.append((s0, a0)); s0 = a1
    runs.append((s0, ys[-1]))
    runs = sorted(runs, key=lambda r: r[1] - r[0], reverse=True)[:2]
    runs.sort()
    H = a.shape[0]
    bands.append([[max(0.0, round(float(r0) / H * 100 - 3, 1)), min(100.0, round(float(r1) / H * 100 + 3, 1))] for r0, r1 in runs])
P2['rowBands'] = bands
with open(os.path.join(ROOT, 'src', 'games', 'preschool', 'zones.json'), 'w', encoding='utf-8') as fh:
    json.dump(P2, fh)
