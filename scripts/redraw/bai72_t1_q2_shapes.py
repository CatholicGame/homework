"""
Vở BT Toán 2, Bài 72 Tiết 1 Q2 — các hình A, B, C, D, E: vẽ lại nét riêng.
Giữ nội dung toán: A khối lập phương, B khối trụ, C khối nón, D khối hộp chữ nhật,
E khối cầu (trái → phải), chữ A–E bên dưới.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 794, 175
BASE = 132
parts = []
parts.append(cube(8, BASE - 80, 80))
parts.append(cylinder(222, 30, 64, 94))
parts.append(cone(368, 6, 100, 120))
parts.append(cuboid(482, BASE - 62, 124, 62, 28, BOX))
parts.append(sphere(730, 82, 46))
for x, t in ((62, 'A'), (222, 'B'), (368, 'C'), (556, 'D'), (730, 'E')):
    parts.append(text(x, 166, t, size=26, weight=600))
save('bai72_t1_q2_shapes', W, H, parts)
