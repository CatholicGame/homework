"""
Vở BT Toán 2, Bài 45 Tiết 1 Q1 — 2 đĩa, mỗi đĩa 3 quả lê: nét riêng.
Giữ nội dung toán: đúng 2 đĩa × 3 quả (3 × 2 = 6).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 360, 92
parts = []
for cx in (90, 270):
    by = 78
    parts.append(plate(cx, by - 2, 140, 26))
    parts.append(s_pear(cx - 30, by - 6, 54))
    parts.append(s_pear(cx + 30, by - 6, 54))
    parts.append(s_pear(cx, by + 2, 54))
save('bai45_t1_q1_pears', W, H, parts)
