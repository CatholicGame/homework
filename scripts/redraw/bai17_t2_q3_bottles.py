"""
Vở BT Toán 2, Bài 17 Tiết 2 Q3 — bình A, bình B và các cốc nước: nét riêng.

Nội dung toán giữ đúng sách: bình "A" cạnh 10 cốc (2 hàng x 5), bình "B" cạnh
8 cốc (2 hàng x 4). Bình A to hơn bình B.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g1 import jar, teacup

W, H = 900, 205
P = []
P.append(jar(50, 198, 90, 190, 'A', level=.8, size=32, lid=TEAL))
for r, yb in enumerate((82, 150)):
    for i in range(5):
        P.append(teacup(138 + i * 72, yb, 52, 40, col='#FFE3B8' if r == 0 else '#FFD0DE'))
P.append(jar(592, 188, 76, 170, 'B', level=.55, size=30, lid=PURPLE))
for r, yb in enumerate((70, 136)):
    for i in range(4):
        P.append(teacup(664 + i * 64, yb, 52, 40, col='#DFF3D8' if r == 0 else '#E4DCFA'))
save('bai17_t2_q3_bottles', W, H, P)
