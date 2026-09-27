"""
Vở BT Toán 2, Bài 49 Tiết 1 Q2 — 10 chiếc cốc (2 hàng × 5): nét riêng.
Giữ nội dung toán: hàng trên 4 cốc để trống + cốc "1 000"; hàng dưới 100, 300, 500, 700, 900
(bé điền 200, 400, 600, 800 vào bốn cốc trống).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 900, 279


def teacup(cx, by, lab=None, body=WHITE):
    w, h = 116, 78
    top = by - 12 - h
    s = [f'<ellipse cx="{cx}" cy="{by - 6}" rx="76" ry="13" fill="{SKY}" {st(2.6)}/>',
         f'<ellipse cx="{cx}" cy="{by - 8}" rx="34" ry="5" fill="none" stroke="{SKY_D}" stroke-width="2"/>',
         f'<path d="M{cx + w / 2 - 6},{top + 18} C{cx + w / 2 + 30},{top + 8} {cx + w / 2 + 28},{top + 56} {cx + w / 2 - 16},{top + 62}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>',
         f'<path d="M{cx + w / 2 - 6},{top + 18} C{cx + w / 2 + 30},{top + 8} {cx + w / 2 + 28},{top + 56} {cx + w / 2 - 16},{top + 62}" fill="none" stroke="{TEAL}" stroke-width="6" stroke-linecap="round"/>',
         f'<path d="M{cx - w / 2},{top} Q{cx - w / 2},{top + h} {cx - 22},{by - 12} H{cx + 22} Q{cx + w / 2},{top + h} {cx + w / 2},{top} Z" fill="{body}" {st(3)}/>',
         f'<ellipse cx="{cx}" cy="{top}" rx="{w / 2}" ry="9" fill="{CREAM}" {st(3)}/>',
         f'<path d="M{cx - w / 2 + 6},{top + 19} Q{cx},{top + 26} {cx + w / 2 - 6},{top + 19}" fill="none" stroke="{TEAL}" stroke-width="5"/>']
    if lab:
        s.append(text(cx, top + 61, lab, size=27, weight=600))
    return ''.join(s)


parts = []
for i, lab in enumerate([None, None, None, None, '1 000']):
    parts.append(teacup(80 + i * 183, 118, lab))
for i, lab in enumerate(['100', '300', '500', '700', '900']):
    parts.append(teacup(80 + i * 183, 268, lab))
save('bai49_t1_q2_cups', W, H, parts)
