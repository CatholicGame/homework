"""
Vở BT Toán 2, Bài 46 Tiết 1 Q1 — bốn khối A, B, C, D: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: A = khối lập phương, B = khối trụ, C = khối cầu,
D = khối hộp chữ nhật đứng; chữ A B C D đặt dưới từng khối (trái → phải).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 800, 216
parts = []
BASE = 160
parts += render_fit(box(1, 1, 1, ORANGE), 10, 0, 170, BASE + 6, pad=8, align='bottom')
parts += render_fit(cylinder(0.5, 1.35, TEAL), 225, 0, 160, BASE + 6, pad=8, align='bottom')
parts += sphere(528, 88, 70, PURPLE)
parts += render_fit(box(0.62, 1.35, 0.5, YELLOW), 680, 0, 110, BASE + 6, pad=8, align='bottom')
for x, s in ((95, 'A'), (305, 'B'), (528, 'C'), (735, 'D')):
    parts.append(text(x, 204, s, size=30, weight=600))
save('bai46_t1_q1_solids', W, H, parts)
