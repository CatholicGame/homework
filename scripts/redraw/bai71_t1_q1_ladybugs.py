"""
Vở BT Toán 2, Bài 71 Tiết 1 Q1 — nhóm 4 con bọ rùa (mỗi con 6 chân): nét riêng.
Giữ nội dung toán: đúng 4 con bọ rùa, mỗi con 6 chân, trong khung bầu dục (6 × 4 = 24).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 340, 134
parts = [oval(W, H)]
for x, y, r in ((68, 74, -10), (142, 46, 6), (206, 90, -4), (276, 56, 12)):
    parts.append(g(ladybug(r), x, y, 0.9))
save('bai71_t1_q1_ladybugs', W, H, parts)
