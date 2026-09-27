"""
Vở BT Toán 2, Bài 37 Tiết 2 Q2 — nhóm 3 con bọ rùa (mỗi con 6 chân): nét riêng.
Giữ nội dung toán: đúng 3 con, mỗi con 6 chân rõ ràng (6 × 3 = 18).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 505, 358
parts = [frame(W, H)]
for x, y, rot in ((115, 118, -10), (390, 116, 10), (252, 250, 0)):
    parts.append(g(x, y, ladybug(), 1.15, rot))
save('bai37_t2_q2_ladybugs', W, H, parts)
