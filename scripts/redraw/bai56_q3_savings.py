"""
Vở BT Toán 2, Bài 56 Q3 — tiền tiết kiệm của Mai và Mi (tờ tiền cách điệu riêng).
Giữ nội dung toán: Mai: 1 tờ 100, 3 tờ 200, 1 tờ 500 đồng; Mi: 1 tờ 100, 2 tờ 200,
3 tờ 500 đồng. Các tờ cùng loại xếp lệch ngang, mỗi tờ lộ góc trái có số.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 237
NW, NH = 140, 70
parts = [f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="6" fill="{WHITE}" stroke="{INK}" stroke-width="2.4"/>',
         f'<line x1="3" y1="118.5" x2="{W - 3}" y2="118.5" stroke="{INK}" stroke-width="2.4"/>']


def row(y, name, groups):
    parts.append(text(22, y + 68, name, size=26, weight=600, anchor='start'))
    for x0, value, n, step in groups:
        for i in range(n):
            x = x0 + i * step
            parts.append(f'<rect x="{x + 3}" y="{y + 26}" width="{NW}" height="{NH}" rx="4" fill="#000" opacity=".08"/>')
            parts.append(banknote(x, y + 23, NW, NH, value))


row(0, 'Mai', [(92, 100, 1, 0), (318, 200, 3, 68), (692, 500, 1, 0)])
row(118, 'Mi', [(92, 100, 1, 0), (302, 200, 2, 72), (590, 500, 3, 52)])
save('bai56_q3_savings', W, H, parts)
