"""
Vở BT Toán 2, Bài 71 Tiết 1 Q1 — nhóm 5 con vịt (mỗi con 2 chân): nét riêng.
Giữ nội dung toán: đúng 5 con vịt, mỗi con 2 chân, trong khung bầu dục (2 × 5 = 10).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 340, 132
parts = [oval(W, H)]
for x, y, flip, flap, c in ((62, 86, False, False, YELLOW), (125, 114, True, True, '#FFE08A'),
                            (182, 72, False, False, YELLOW), (240, 112, True, False, '#FFE08A'),
                            (292, 82, True, True, YELLOW)):
    parts.append(g(duck(c, flap), x, y, 0.95, flip=flip))
save('bai71_t1_q1_ducks', W, H, parts)
