"""
Vở BT Toán 2, Bài 15 Tiết 2 Q2 — khúc gỗ (nối với cân nặng): nét riêng.
Giữ nội dung toán: nhãn chữ đúng như sách "Ba mươi lăm / ki-lô-gam" (nối với 35 kg).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 730, 191
WOOD, WOOD_D, END, END_D = '#C98B55', '#9C6437', '#F3D29B', '#C99A5E'
ANG = 7   # log slopes down to the right
p = [f'<ellipse cx="370" cy="182" rx="320" ry="7" fill="#EEE6D8"/>']
g = [f'<g transform="rotate({ANG} 365 95)">']
g.append(f'<path d="M40,56 L668,56 L668,134 L40,134 A20,39 0 0 1 40,56 Z" fill="{WOOD}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
for x1, y, x2 in ((70, 66, 190), (500, 64, 630), (90, 124, 190), (490, 126, 620), (60, 96, 120)):
    g.append(f'<path d="M{x1},{y} C{(x1 + x2) / 2},{y - 6} {(x1 + x2) / 2},{y + 6} {x2},{y}" fill="none" stroke="{WOOD_D}" stroke-width="3" stroke-linecap="round"/>')
# knot
g.append(f'<ellipse cx="560" cy="98" rx="12" ry="6" fill="{WOOD_D}" stroke="{INK}" stroke-width="2"/>')
# cut end with rings
g.append(f'<ellipse cx="668" cy="95" rx="22" ry="39" fill="{END}" stroke="{INK}" stroke-width="3.5"/>')
for r in (0.7, 0.45, 0.2):
    g.append(f'<ellipse cx="668" cy="95" rx="{22 * r:.1f}" ry="{39 * r:.1f}" fill="none" stroke="{END_D}" stroke-width="2.4"/>')
# label plank
g.append(f'<rect x="210" y="60" width="260" height="70" rx="14" fill="{CREAM}" stroke="{INK}" stroke-width="3"/>')
g.append(text(340, 90, 'Ba mươi lăm', size=26, weight=600))
g.append(text(340, 122, 'ki-lô-gam', size=26, weight=600))
g.append('</g>')
p.extend(g)
save('bai15_t2_q2_log', W, H, p)
