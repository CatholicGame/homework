"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 3 Q4 — sơ đồ cung điện: bốn toà nhà A (trái),
B (trên), C (phải), D (dưới) vây quanh sân hình vuông. Hình học, vẽ tay bằng SVG.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *


def hip(x, y, w, h, fill='#fff'):
    """Mái nhà nhìn từ trên: khung ngoài, sống mái bên trong và 4 đường nối góc."""
    i = min(w, h) * .32
    ix0, iy0, ix1, iy1 = x + i, y + i, x + w - i, y + h - i
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{INK}" stroke-width="3.4"/>'
            f'<rect x="{ix0}" y="{iy0}" width="{ix1 - ix0}" height="{iy1 - iy0}" fill="{fill}" stroke="{INK}" stroke-width="2.8"/>'
            f'<path d="M{x},{y} L{ix0},{iy0} M{x + w},{y} L{ix1},{iy0} M{x + w},{y + h} L{ix1},{iy1} M{x},{y + h} L{ix0},{iy1}" stroke="{INK}" stroke-width="2.8"/>')


W, H = 470, 440
parts = ['<g transform="translate(24,26)">', f'<rect x="90" y="70" width="260" height="262" fill="#F4FBFF" stroke="{INK}" stroke-width="2.4"/>',
         hip(58, 58, 34, 272),              # A
         hip(348, 58, 34, 272),             # C
         hip(80, 36, 280, 36),              # B
         hip(84, 316, 272, 30),             # D (hai cánh)
         hip(166, 304, 108, 54),            # D (gian giữa)
         '</g>',
         text(244, 46, 'B', size=40, weight=700),
         text(30, 238, 'A', size=40, weight=700),
         text(442, 238, 'C', size=40, weight=700),
         text(244, 430, 'D', size=40, weight=700)]
save('bai58_t3_q4_palace', W, H, parts, folder='grade3-workbook-2')
