"""
Vở BT Toán 2, Bài 37 Tiết 2 Q2 — nhóm 4 con bọ cánh cứng (mỗi con 6 chân): nét riêng.
Giữ nội dung toán: đúng 4 con, mỗi con 6 chân rõ ràng (6 × 4 = 24).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 505, 352
parts = [frame(W, H)]
for x, y, rot, col, dk in ((105, 128, -12, GREEN, GRASS_D), (300, 108, 8, TEAL, '#3FA88C'),
                           (200, 250, 5, TEAL, '#3FA88C'), (405, 232, -6, GREEN, GRASS_D)):
    parts.append(g(x, y, beetle(col, dk), 1.1, rot))
save('bai37_t2_q2_beetles', W, H, parts)
