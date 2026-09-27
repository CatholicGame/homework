"""
Vở BT Toán 2, Bài 47 Tiết 1 Q3 — dãy hình khối lặp lại: nét riêng.
Giữ nội dung toán: trụ nằm, trụ đứng, cầu, trụ nằm, trụ đứng, cầu, trụ nằm, ?, cầu;
lựa chọn A. trụ nằm, B. trụ đứng, C. cầu (đáp án B).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 800, 230
C = '#8DD3F2'
parts = []


def lying(cx, cy):
    return cyl_side(cx, cy, 82, 72, fill=C, rx=12)


def standing(cx, cy):
    return cyl_up(cx, cy - 32, 56, 66, fill=C, ry=9)


def ball(cx, cy):
    return sphere(cx, cy, 36, fill=C)


row = [lying, standing, ball, lying, standing, ball, lying, None, ball]
xs = [46, 134, 222, 322, 412, 500, 600, 688, 760]
for f, x in zip(row, xs):
    if f is None:
        parts.append(text(x, 60, '?', size=40, weight=700))
    else:
        parts.append(f(x, 46))
for x, f, lab in ((230, lying, 'A.'), (430, standing, 'B.'), (620, ball, 'C.')):
    parts.append(text(x - 62, 196, lab, size=24, weight=600))
    parts.append(f(x, 176))
save('bai47_t1_q3_pattern', W, H, parts)
