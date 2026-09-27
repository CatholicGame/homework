"""
Vở BT Toán 2, Bài 46 Tiết 2 Q2 — dãy hình lặp lại: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: hàng trên (trái → phải) khối lập phương, khối trụ, khối cầu,
lập phương, trụ, cầu, lập phương, trụ, "?"; hàng dưới ba lựa chọn A. lập phương,
B. khối trụ, C. khối cầu. Mọi khối cùng một màu để bé nhìn theo hình dạng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 800, 232
C = BLUE
parts = []


def cube(x, y, w, h):
    parts.extend(render_fit(box(1, 1, 1, C), x, y, w, h, pad=4, align='bottom'))


def cyl(x, y, w, h):
    parts.extend(render_fit(cylinder(0.5, 1.25, C), x, y, w, h, pad=4, align='bottom'))


def ball(x, y, w, h):
    r = min(w, h) / 2 - 6
    parts.extend(sphere(x + w / 2, y + h - 4 - r, r, C))


ROW = [cube, cyl, ball] * 3
ROW = ROW[:8]
x = 4
for f in ROW:
    f(x, 2, 88, 94)
    x += 94
parts.append(text(x + 30, 72, '?', size=40, weight=700))

for lx, f, lab in ((170, cube, 'A.'), (380, cyl, 'B.'), (590, ball, 'C.')):
    parts.append(text(lx - 10, 222, lab, size=28, weight=600, anchor='end'))
    f(lx - 4, 130, 92, 100)
save('bai46_t2_q2_pattern', W, H, parts)
