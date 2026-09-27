"""
Vở BT Toán 2, Bài 71 Tiết 1 Q1 — nhóm 3 con nhện (mỗi con 8 chân): nét riêng.
Giữ nội dung toán: đúng 3 con nhện, mỗi con 8 chân, trong khung bầu dục (8 × 3 = 24).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 340, 128
parts = [oval(W, H)]
for x, y, r in ((66, 64, -6), (170, 60, 4), (274, 66, 8)):
    parts.append(g(spider(), x, y, 0.8, rot=r))
save('bai71_t1_q1_spiders', W, H, parts)
