"""
Vở BT Toán 2, Bài 71 Tiết 1 Q1 — nhóm 3 con thỏ (mỗi con 4 chân): nét riêng.
Giữ nội dung toán: đúng 3 con thỏ, mỗi con thấy rõ 4 chân, trong khung bầu dục (4 × 3 = 12).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 340, 126
parts = [oval(W, H)]
parts.append(g(rabbit(), 70, 96, 0.95))
parts.append(g(rabbit('#F3E3D3', WHITE, back='#E2CDB6'), 168, 108, 0.95, flip=True))
parts.append(g(rabbit(run=True), 262, 92, 0.9))
save('bai71_t1_q1_rabbits', W, H, parts)
