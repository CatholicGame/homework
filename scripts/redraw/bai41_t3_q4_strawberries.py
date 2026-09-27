"""
Vở BT Toán 3, Bài 41 Tiết 3 câu 4 — 24 quả dâu tây (4 hàng × 6 quả). Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 1100, 600


def berry(cx, cy):
    s = [f'<path d="M{cx},{cy + 50} C{cx - 30},{cy + 40} {cx - 46},{cy + 6} {cx - 42},{cy - 16} C{cx - 38},{cy - 34} {cx - 14},{cy - 36} {cx},{cy - 30} '
         f'C{cx + 14},{cy - 36} {cx + 38},{cy - 34} {cx + 42},{cy - 16} C{cx + 46},{cy + 6} {cx + 30},{cy + 40} {cx},{cy + 50} Z" '
         f'fill="{RED}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>',
         f'<path d="M{cx - 28},{cy - 10} Q{cx - 30},{cy + 10} {cx - 18},{cy + 26}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".5"/>']
    for dx, dy in ((-18, -6), (0, -10), (18, -6), (-24, 12), (-6, 8), (12, 10), (26, 12), (-12, 26), (6, 26), (0, 40)):
        s.append(f'<ellipse cx="{cx + dx}" cy="{cy + dy}" rx="2.4" ry="3.6" fill="{YELLOW}"/>')
    # đài lá: 5 lá nhọn rủ xuống quanh cuống
    import math
    for ang in (165, 125, 90, 55, 15):
        r = math.radians(ang)
        lx, ly = cx + 17 * math.cos(r), cy - 34 + 12 * math.sin(r)
        s.append(f'<ellipse cx="{lx:.1f}" cy="{ly:.1f}" rx="7" ry="19" transform="rotate({ang - 90} {lx:.1f} {ly:.1f})" '
                 f'fill="{GREEN}" stroke="{INK}" stroke-width="3.2"/>')
    s.append(f'<path d="M{cx},{cy - 38} q2,-14 10,-20" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>'
             f'<path d="M{cx},{cy - 38} q2,-14 10,-20" fill="none" stroke="{GRASS_D}" stroke-width="3.5" stroke-linecap="round"/>')
    return ''.join(s)


parts = []
for r in range(4):
    for c in range(6):
        parts.append(berry(88 + c * 184, 92 + r * 140))
save('bai41_t3_q4_strawberries', W, H, parts, folder='grade3-workbook')
