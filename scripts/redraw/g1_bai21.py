"""Vở BT Toán 1 — Bài 21 (Số 10), bài 2 "Số ?": sáu vòng hai thẻ chấm (9|1, 8|2, 7|3, 6|4, 5|5, 10|0)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1_b19 import *

for i, (a, b) in enumerate([(9, 1), (8, 2), (7, 3), (6, 4), (5, 5), (10, 0)], 1):
    dice_group(f'bai21_q2_dots{i}', a, b)
