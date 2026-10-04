"""Vở BT Toán 1 — Bài 19 (Số 9), bài 2 "Số ?": bốn vòng, mỗi vòng hai thẻ chấm (8|1, 7|2, 6|3, 5|4)."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1_b19 import *

for i, (a, b) in enumerate([(8, 1), (7, '2d'), (6, 3), (5, 4)], 1):
    dice_group(f'bai19_q2_dots{i}', a, b)
