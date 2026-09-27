"""
Vở BT Toán 2, Bài 45 Tiết 1 Q1 — 4 đĩa, mỗi đĩa 5 quả táo: nét riêng.
Giữ nội dung toán: đúng 4 đĩa × 5 quả (4 × 5 = 20).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 360, 93
parts = []
for i, cx in enumerate((46, 136, 226, 316)):
    by = 80
    parts.append(plate(cx, by - 2, 88, 22))
    for dx in (-22, 0, 22):
        parts.append(s_apple(cx + dx, by - 21, 11.5))
    for dx in (-11, 11):
        parts.append(s_apple(cx + dx, by - 1, 11.5))
save('bai45_t1_q1_apples', W, H, parts)
