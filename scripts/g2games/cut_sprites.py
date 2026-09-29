"""Cắt hình từ tấm tranh nền trắng (xoá nền loang từ mép), mỗi vùng liền lớn = 1 hình, lưu WebP nền trong.

    python scripts/g2games/cut_sprites.py frog-ref/sheet.png src/assets/grade2-games/frog  # chỉ liệt kê
    python scripts/g2games/cut_sprites.py frog-ref/sheet.png src/assets/grade2-games/frog sit,jump,-,...

Thứ tự hình: theo cột trái → phải (x), cùng cột thì trên → dưới. '-' = bỏ hình đó.
Hình nhỏ quá 1/3 bản gốc được phóng to ×SCALE để đỡ vỡ trên màn hình nét."""
import os, sys
from collections import deque
import numpy as np
from PIL import Image

SRC = 'scripts/g2games/' + sys.argv[1]
OUT = sys.argv[2]
names = sys.argv[3].split(',') if len(sys.argv) > 3 else None
TOL, MIN_AREA, MERGE, SCALE = 26, 4000, 40, 3

im = np.asarray(Image.open(SRC).convert('RGB')).astype(int)
h, w, _ = im.shape
whitish = (255 - im).max(axis=2) <= TOL
bg = np.zeros((h, w), bool); q = deque()
for x in range(w):
    for y in (0, h - 1):
        if whitish[y, x]: bg[y, x] = True; q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if whitish[y, x] and not bg[y, x]: bg[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and whitish[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = True; q.append((ny, nx))
fg = ~bg
lab = np.zeros((h, w), int); n = 0; boxes = []
for sy in range(h):
    for sx in range(w):
        if fg[sy, sx] and not lab[sy, sx]:
            n += 1; lab[sy, sx] = n; q = deque([(sy, sx)]); ys = []; xs = []
            while q:
                y, x = q.popleft(); ys.append(y); xs.append(x)
                for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                    ny, nx = y + dy, x + dx
                    if 0 <= ny < h and 0 <= nx < w and fg[ny, nx] and not lab[ny, nx]:
                        lab[ny, nx] = n; q.append((ny, nx))
            boxes.append((len(ys), min(ys), min(xs), max(ys), max(xs), n))
big = [b for b in boxes if b[0] > MIN_AREA]
big.sort(key=lambda b: (round(b[2] / 120), b[1]))
owner = {b[5]: i for i, b in enumerate(big)}
for b in boxes:
    if b[5] in owner or b[0] < 30: continue
    cy, cx = (b[1] + b[3]) / 2, (b[2] + b[4]) / 2
    dist = lambda i: max(0, big[i][1] - cy, cy - big[i][3]) + max(0, big[i][2] - cx, cx - big[i][4])
    i = min(range(len(big)), key=dist)
    if dist(i) <= MERGE and cy >= big[i][1]: owner[b[5]] = i  # bỏ bong bóng bay trên đầu
for i, b in enumerate(big):
    print(i, f'x={b[2]}-{b[4]} y={b[1]}-{b[3]} area={b[0]}', names[i] if names and i < len(names) else '')
if not names: sys.exit()
rgba = np.dstack([im, np.where(fg, 255, 0)]).astype(np.uint8)
os.makedirs(OUT, exist_ok=True)
for i, b in enumerate(big):
    if i >= len(names) or names[i] == '-': continue
    m = np.isin(lab, [k for k, v in owner.items() if v == i])
    ys, xs = np.nonzero(m)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = rgba[y0:y1, x0:x1].copy(); crop[..., 3] = np.where(m[y0:y1, x0:x1], 255, 0)
    img = Image.fromarray(crop)
    img = img.resize((img.width * SCALE, img.height * SCALE), Image.LANCZOS)
    img.save(f'{OUT}/{names[i]}.webp', quality=90, method=6)
    print('->', names[i], img.size)
