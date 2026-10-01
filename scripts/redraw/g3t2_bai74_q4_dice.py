"""
Vở BT Toán 3 Tập hai, Bài 74 Q4 (trang 104) — 6 mặt xúc xắc 1 đến 6 chấm.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

S, GAPX = 76, 22
W, H = 6 * S + 5 * GAPX + 20, S + 20
PIPS = {1: [(1, 1)], 2: [(0, 0), (2, 2)], 3: [(0, 0), (1, 1), (2, 2)], 4: [(0, 0), (2, 0), (0, 2), (2, 2)],
        5: [(0, 0), (2, 0), (1, 1), (0, 2), (2, 2)], 6: [(0, 0), (2, 0), (0, 1), (2, 1), (0, 2), (2, 2)]}
parts = []
for n in range(1, 7):
    x, y = 10 + (n - 1) * (S + GAPX), 10
    parts.append(f'<rect x="{x}" y="{y}" width="{S}" height="{S}" rx="14" fill="{SKY}" stroke="{INK}" stroke-width="3"/>')
    for i, j in PIPS[n]:
        parts.append(f'<circle cx="{x + S * (0.25 + 0.25 * i):.1f}" cy="{y + S * (0.25 + 0.25 * j):.1f}" r="7" fill="{INK}"/>')
save('bai74_q4_dice', W, H, parts, folder='grade3-workbook-2')
