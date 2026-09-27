"""
Vở BT Toán 2, Bài 38 Tiết 2 Q3 — ô tô xếp 3 hàng × 4 cột: nét riêng.
Giữ nội dung toán: đúng 12 ô tô, 3 hàng, mỗi hàng 4 chiếc (4 × 3 = 3 × 4 = 12).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 900, 333


def car(x, y, body=RED, dark='#D2554C'):
    """x, y = giữa đáy bánh xe; xe quay phải, dài ~150."""
    s = [f'<path d="M{x - 72},{y - 20} Q{x - 76},{y - 46} {x - 58},{y - 48} L{x - 40},{y - 50} Q{x - 24},{y - 84} {x + 6},{y - 84} '
         f'L{x + 18},{y - 84} Q{x + 40},{y - 84} {x + 52},{y - 52} L{x + 64},{y - 48} Q{x + 78},{y - 44} {x + 76},{y - 22} '
         f'Q{x + 76},{y - 14} {x + 66},{y - 14} L{x - 64},{y - 14} Q{x - 72},{y - 14} {x - 72},{y - 20} Z" fill="{body}" {st(3)}/>',
         f'<path d="M{x - 30},{y - 52} Q{x - 18},{y - 76} {x - 2},{y - 76} L{x - 2},{y - 52} Z" fill="{SKY}" {st(2.6)}/>',
         f'<path d="M{x + 8},{y - 76} L{x + 18},{y - 76} Q{x + 34},{y - 76} {x + 42},{y - 52} L{x + 8},{y - 52} Z" fill="{SKY}" {st(2.6)}/>',
         f'<rect x="{x + 62}" y="{y - 42}" width="12" height="9" rx="4" fill="{YELLOW}" {st(2.2)}/>',
         f'<rect x="{x - 74}" y="{y - 40}" width="8" height="9" rx="3" fill="{ORANGE}" {st(2.2)}/>',
         f'<line x1="{x + 2}" y1="{y - 48}" x2="{x + 2}" y2="{y - 20}" stroke="{dark}" stroke-width="2.4"/>',
         f'<line x1="{x + 10}" y1="{y - 42}" x2="{x + 20}" y2="{y - 42}" {st(2.6)}/>']
    for wx in (x - 42, x + 42):
        s.append(f'<circle cx="{wx}" cy="{y - 16}" r="16" fill="{INK}"/>')
        s.append(f'<circle cx="{wx}" cy="{y - 16}" r="7" fill="{GREY_L}" {st(2)}/>')
    return ''.join(s)


parts = [frame(W, H)]
for r in range(3):
    for c in range(4):
        parts.append(car(125 + c * 217, 110 + r * 100))
save('bai38_t2_q3_cars', W, H, parts)
