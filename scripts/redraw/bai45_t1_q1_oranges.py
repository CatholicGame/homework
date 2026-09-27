"""
Vở BT Toán 2, Bài 45 Tiết 1 Q1 — 3 đĩa, mỗi đĩa 5 quả cam: nét riêng.
Giữ nội dung toán: đúng 3 đĩa × 5 quả (5 × 3 = 15).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 360, 81
parts = []
for cx in (60, 180, 300):
    by = 70
    parts.append(plate(cx, by - 2, 108, 22))
    for dx in (-27, 0, 27):
        parts.append(s_orange(cx + dx, by - 18, 14))
    for dx in (-14, 14):
        parts.append(s_orange(cx + dx, by, 14))
save('bai45_t1_q1_oranges', W, H, parts)
