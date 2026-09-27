"""
Vở BT Toán 2, Bài 45 Tiết 1 Q1 (mẫu) — 4 đĩa, mỗi đĩa 2 quả chuối: nét riêng.
Giữ nội dung toán: đúng 4 đĩa × 2 quả (2 × 4 = 8).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 360, 88
parts = []
for cx in (46, 136, 226, 316):
    by = 72
    parts.append(plate(cx, by - 2, 86, 24))
    parts.append(s_banana(cx - 4, by - 18, 60, rot=-8))
    parts.append(s_banana(cx + 2, by - 2, 60, rot=4))
save('bai45_t1_q1_bananas', W, H, parts)
