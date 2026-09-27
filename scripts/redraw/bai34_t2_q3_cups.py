"""
Vở BT Toán 3, Bài 34 Tiết 2 Q3 — 4 ca A, B, C, D trong khung. Vẽ lại bằng nét riêng.
  A 500 ml, B 200 ml, C 300 ml, D 150 ml (nhãn trong khung; ca chia 10 vạch × 50 ml,
  mực nước đúng theo vạch).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import *
from kit_w1 import *

W, H = 1290, 365
parts = []
for i, (L, ml) in enumerate((('A', 500), ('B', 200), ('C', 300), ('D', 150))):
    x0 = 10 + i * 330
    cx = x0 + 140
    parts.append(f'<rect x="{x0}" y="10" width="280" height="282" rx="22" fill="{WHITE}" stroke="{SKY_D}" stroke-width="5"/>')
    parts.append(ml_cup(cx - 12, 214, 150, 168, marks=10, level=ml / 50, long_every=2))
    parts.append(text(cx, 262, f'{ml} ml', size=32, weight=500))
    parts.append(letter(cx, 352, L, size=46))

save('bai34_t2_q3_cups', W, H, parts, folder='grade3-workbook')
