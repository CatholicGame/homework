"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — quả cam dạng khối cầu. Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 192, 181
cx, cy, r = 92, 106, 68
parts = sphere(cx, cy, r, ORANGE, shadow=False)
for dx, dy in ((20, -10), (34, 12), (8, 26), (-18, 30), (28, 38), (-30, 6), (44, -8)):
    parts.append(f'<circle cx="{cx + dx}" cy="{cy + dy}" r="1.8" fill="{shade(ORANGE, -0.25)}"/>')
parts.append(f'<path d="M{cx + 2},{cy - r + 4} q2,-14 10,-22" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>')
parts.append(f'<path d="M{cx + 10},{cy - r - 16} C{cx + 30},{cy - r - 36} {cx + 62},{cy - r - 32} {cx + 76},{cy - r - 22} '
             f'C{cx + 56},{cy - r - 2} {cx + 28},{cy - r - 2} {cx + 10},{cy - r - 16} Z" fill="{GREEN}" '
             f'stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<path d="M{cx + 16},{cy - r - 16} Q{cx + 42},{cy - r - 22} {cx + 66},{cy - r - 21}" fill="none" stroke="{GRASS_D}" stroke-width="2"/>')
save('bai46_t1_q2_orange', W, H, parts)
