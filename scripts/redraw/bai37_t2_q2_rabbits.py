"""
Vở BT Toán 2, Bài 37 Tiết 2 Q2 — nhóm 6 con thỏ (mỗi con 4 chân): nét riêng.
Giữ nội dung toán: đúng 6 con, mỗi con thấy rõ 4 chân (4 × 6 = 24).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 510, 352
parts = [frame(W, H)]
for i, (x, y, flip) in enumerate( ((95, 158, False), (255, 168, True), (415, 158, False),
                   (95, 318, True), (255, 318, False), (415, 318, True))):
    parts.append(g(x, y, rabbit(WHITE if i % 2 == 0 else '#F6E7D8'), 1.0, 0, flip))
save('bai37_t2_q2_rabbits', W, H, parts)
