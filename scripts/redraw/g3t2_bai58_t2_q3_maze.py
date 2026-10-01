"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 2 Q3 — ốc sên A (1 010 × 7) bò theo nét liền,
ốc sên B (7 010 : 7) bò theo nét đứt, tới 5 chiếc lá: 7 070, 1 001 (dư 3),
1 001 (dư 2), 7 210, 1 000. Giữ đúng lưới nét đứt và các đoạn nét liền như sách.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g2 as k2

W, H = 1190, 490
COLS = [390, 483, 573, 663, 753]
ROWS = [58, 150, 240, 328, 415]
DASH = '#29A9E0'
LEAF, LEAF_D = '#7CC6E8', '#2F8FB8'


def dashed(x1, y1, x2, y2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{DASH}" stroke-width="3.4" stroke-dasharray="12 7"/>'


def solid(pts):
    p = ' '.join(f'{x},{y}' for x, y in pts)
    return f'<polyline points="{p}" fill="none" stroke="{INK}" stroke-width="5" stroke-linejoin="miter" stroke-linecap="square"/>'


def leaf(x, y, lab):
    w, h = 250, 76
    return (f'<path d="M{x},{y} Q{x + 40},{y - h / 2 - 6} {x + w * .55},{y - h / 2} Q{x + w * .9},{y - h / 2 + 6} {x + w},{y - 4} '
            f'Q{x + w * .85},{y + h / 2 - 2} {x + w * .5},{y + h / 2} Q{x + 40},{y + h / 2 + 4} {x},{y} Z" fill="{LEAF}" stroke="{LEAF_D}" stroke-width="3"/>'
            + text(x + w * .52, y + 11, lab, size=31, weight=600))


def snail_with(cx, by, lab):
    s = [k2.snail(cx + 20, by, s=3.4, shell='#B9C3CD', body='#A9DCF3', ring='#E8ECF0')]
    s.append(f'<rect x="{cx - 88}" y="{by - 108}" width="176" height="48" rx="12" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
    s.append(text(cx, by - 73, lab, size=31, weight=600))
    return ''.join(s)


parts = []
# lưới nét đứt
for x in COLS:
    parts.append(dashed(x, ROWS[0], x, ROWS[-1]))
for y in ROWS:
    parts.append(dashed(COLS[0], y, COLS[-1], y))
parts.append(dashed(222, 328, COLS[0], 328))       # từ ốc sên B vào lưới
parts.append(dashed(COLS[-1], 150, 890, 150))      # tới lá 1 001 (dư 3)
parts.append(dashed(COLS[-1], 415, 890, 415))      # tới lá 1 000
# nét liền
parts.append(solid([(222, 150), (483, 150), (483, 240), (890, 240)]))
parts.append(solid([(573, 58), (573, 240)]))
parts.append(solid([(663, 150), (663, 328), (890, 328)]))
parts.append(solid([(663, 150), (753, 150), (753, 58), (890, 58)]))
for y, lab in zip(ROWS, ['7 070', '1 001 (dư 3)', '1 001 (dư 2)', '7 210', '1 000']):
    parts.append(leaf(890, y, lab))
parts.append(snail_with(120, 200, '1 010 × 7'))
parts.append(snail_with(120, 390, '7 010 : 7'))
parts.append(text(112, 34, 'A', size=32, weight=600))
parts.append(text(112, 462, 'B', size=32, weight=600))
save('bai58_t2_q3_maze', W, H, parts, folder='grade3-workbook-2')
