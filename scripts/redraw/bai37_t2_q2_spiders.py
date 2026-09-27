"""
Vở BT Toán 2, Bài 37 Tiết 2 Q2 — nhóm 2 con nhện (mỗi con 8 chân): nét riêng.
Giữ nội dung toán: đúng 2 con, mỗi con 8 chân rõ ràng (8 × 2 = 16).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 505, 355
parts = [frame(W, H)]
parts.append(g(140, 120, spider(), 1.2))
parts.append(g(360, 230, spider(PINK, '#D86F9A'), 1.2))
save('bai37_t2_q2_spiders', W, H, parts)
