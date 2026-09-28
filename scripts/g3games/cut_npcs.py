"""Cắt nhân vật khách hàng (Chợ phiên) từ tấm ảnh npc-sheet.png: xoá nền trắng
(loang từ mép ảnh) rồi tách từng nhân vật theo vùng liền, lưu WebP nền trong.

    python scripts/g3games/cut_npcs.py be-ti,ba-tu,...                        # tấm thường
    python scripts/g3games/cut_npcs.py be-ti,ba-tu,... npc-sheet-sad.png -sad  # tấm "không hài lòng"

In ra `top`: phần hình nhô lên trên đầu nhân vật (dấu 💢…) tính theo tỉ lệ chiều cao thân — npc.js dùng
để vẽ hình buồn sao cho thân nhân vật to đúng bằng hình thường."""
import sys
from collections import deque
import numpy as np
from PIL import Image

SRC = 'scripts/g3games/' + (sys.argv[2] if len(sys.argv) > 2 else 'npc-sheet.png')
SUFFIX = sys.argv[3] if len(sys.argv) > 3 else ''
OUT = 'src/assets/grade3-games/npc'
TOL = 26  # khoảng cách tới màu trắng vẫn coi là nền

im = np.asarray(Image.open(SRC).convert('RGB')).astype(int)
h, w, _ = im.shape
whitish = (255 - im).max(axis=2) <= TOL
bg = np.zeros((h, w), bool)
q = deque()
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
# Vùng liền của phần nhân vật
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
big = sorted([b for b in boxes if b[0] > 20000], key=lambda b: (b[1] > h * 0.47, b[2]))
print(len(big), 'nhân vật')
# Mảnh nhỏ (quai túi…) gộp vào nhân vật gần tâm nhất
owner = {b[5]: i for i, b in enumerate(big)}
for b in boxes:
    if b[5] in owner or b[0] < 30: continue
    cy, cx = (b[1] + b[3]) / 2, (b[2] + b[4]) / 2
    owner[b[5]] = min(range(len(big)), key=lambda i: max(0, big[i][1] - cy, cy - big[i][3]) + max(0, big[i][2] - cx, cx - big[i][4]))
rgba = np.dstack([im, np.where(fg, 255, 0)]).astype(np.uint8)
import os; os.makedirs(OUT, exist_ok=True)
names = sys.argv[1].split(',')
for i, b in enumerate(big):
    ids = [k for k, v in owner.items() if v == i]
    m = np.isin(lab, ids)
    ys, xs = np.nonzero(m)
    y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    crop = rgba[y0:y1, x0:x1].copy(); crop[..., 3] = np.where(m[y0:y1, x0:x1], 255, 0)
    img = Image.fromarray(crop)
    img.thumbnail((400, 400), Image.LANCZOS)
    img.save(f'{OUT}/{names[i]}{SUFFIX}.webp', quality=88, method=6)
    body_h = b[3] - b[1] + 1          # thân nhân vật (vùng liền lớn nhất), không tính dấu 💢
    print(names[i], img.size, f'top={(b[1] - y0) / body_h:.3f}', f'h={(y1 - y0) / body_h:.3f}')
