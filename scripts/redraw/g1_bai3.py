"""
Vở BT Toán 1, Bài 3 "Hình vuông, hình tròn" (trang 5). Hình học trắng, kín để bé
chạm tô màu (engine/colorPaint.js).
  1. 4 hình vuông to → nhỏ + bảng 4 × 4 ô vuông
  2. 4 hình tròn nhỏ → to + hình ghép 4 hình tròn (thân, đầu, hai tay)
  3. hình tròn trong hình vuông · hình vuông trong hình tròn · hình vuông (đặt chéo) trong hình tròn
  4. xếp que tính: 5 hình vuông (hình chữ X) · 8 hình vuông (3 – 2 – 3)
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_l1_a import *

F = 'grade1-workbook'
(ROOT / 'src/assets' / F).mkdir(parents=True, exist_ok=True)

# 1. hình vuông
W, H = 900, 300
base = 270
p = [board(W, H, CREAM)]
x = 40
for s in (120, 92, 70, 60):
    p.append(sq(x, base - s, s))
    x += s + 40
cell = 58
gx = W - 40 - 4 * cell
for r in range(4):
    for c in range(4):
        p.append(sq(gx + c * cell, base - 4 * cell + r * cell, cell))
save('bai3_q1_squares', W, H, p, folder=F)

# 2. hình tròn
W, H = 900, 300
base = 270
p = [board(W, H, CREAM)]
x = 40
for r in (48, 60, 72, 92):
    p.append(circ(x + r, base - r, r))
    x += 2 * r + 34
# hình ghép: thân to, đầu, hai hình tròn nhỏ ở hai bên cổ
bx, br = W - 40 - 62, 62
p.append(circ(bx, base - br, br))
hr = 38
hy = base - 2 * br - hr + 6
p.append(circ(bx - 46, hy + 36, 14))
p.append(circ(bx + 46, hy + 36, 14))
p.append(circ(bx, hy, hr))
save('bai3_q2_circles', W, H, p, folder=F)


# 3. hình lồng nhau
def nested(kind, cx, cy, R):
    if kind == 1:   # hình tròn trong hình vuông
        return sq(cx - R, cy - R, 2 * R) + circ(cx, cy, R)
    if kind == 2:   # hình vuông trong hình tròn
        a = R * .72
        return circ(cx, cy, R) + sq(cx - a, cy - a, 2 * a)
    return circ(cx, cy, R) + poly([(cx, cy - R), (cx + R, cy), (cx, cy + R), (cx - R, cy)])   # hình vuông đặt chéo


W, H = 900, 260
p = [board(W, H, CREAM)]
for i, cx in enumerate((160, 450, 740)):
    p.append(nested(i + 1, cx, 130, 92))
save('bai3_q3_nested', W, H, p, folder=F)
for i in range(3):
    save(f'bai3_q3_opt{i + 1}', 200, 200, [nested(i + 1, 100, 100, 84)], folder=F)

# 4. xếp que tính
U = 70


def squares_sticks(cells, ox, oy):
    segs = []
    for c, r in cells:
        x0, y0 = ox + c * U, oy + r * U
        segs += [(x0, y0, x0 + U, y0), (x0, y0 + U, x0 + U, y0 + U), (x0, y0, x0, y0 + U), (x0 + U, y0, x0 + U, y0 + U)]
    return sticks(segs)


W, H = 900, 270
p = [board(W, H, '#EAF6FD')]
p.append(squares_sticks([(0, 0), (2, 0), (1, 1), (0, 2), (2, 2)], 50, 30))
p.append(squares_sticks([(0, 0), (2, 0), (4, 0), (1, 1), (3, 1), (0, 2), (2, 2), (4, 2)], 450, 30))
save('bai3_q4_sticks', W, H, p, folder=F)
