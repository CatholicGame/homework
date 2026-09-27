"""
Vở BT Toán 2, Bài 37 Tiết 2 Q2 — nhóm 5 con gà con (mỗi con 2 chân): nét riêng.
Giữ nội dung toán: đúng 5 con, mỗi con 2 chân rõ ràng (2 × 5 = 10).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 510, 358
parts = [frame(W, H)]
for x, y, flip in ((100, 160, False), (255, 175, True), (410, 160, False),
                   (170, 325, True), (345, 325, False)):
    parts.append(g(x, y, chick(), 1.1, 0, flip))
save('bai37_t2_q2_chicks', W, H, parts)
