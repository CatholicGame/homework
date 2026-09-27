"""
Vở BT Toán 2, Bài 49 Tiết 2 Q3 — 10 chiếc bánh kem ghi số: nét riêng.
Giữ nội dung toán: đúng 10 bánh, nhãn 400, 1 000, 230, 750, 110, 380, 80, 990, 600, 200
(cùng thứ tự trái → phải, xen kẽ trên/dưới như sách).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 900, 272
CAKES = [  # x, đáy, nhãn, kem, cốc, trang trí
    (64, 152, '400', PINK, BLUE, 'cherry'),
    (150, 264, '1 000', '#FFF1C9', TEAL, 'star'),
    (240, 152, '230', '#DCEBFF', PURPLE, 'star'),
    (330, 264, '750', '#F9D4B8', GREEN, 'swirl'),
    (414, 152, '110', '#FFF1C9', RED, 'cherry'),
    (498, 264, '380', '#E3F6D9', ORANGE, 'swirl'),
    (582, 152, '80', PINK, TEAL, 'star'),
    (666, 264, '990', '#DCEBFF', YELLOW, 'cherry'),
    (752, 140, '600', '#F9D4B8', PURPLE, 'swirl'),
    (840, 264, '200', '#E3F6D9', BLUE, 'cherry'),
]
parts = []
for x, by, lab, cr, cu, top in CAKES:
    w = 100 if len(lab) > 3 else 88
    parts.append(cupcake(x, by, w, 120, cr, cu, top))
    tw = 18 + 14 * len(lab.replace(' ', '')) + (6 if ' ' in lab else 0)
    parts.append(f'<rect x="{x - tw / 2}" y="{by - 40}" width="{tw}" height="30" rx="8" fill="{WHITE}" {st(2.4)}/>')
    parts.append(text(x, by - 17, lab, size=23, weight=700))
save('bai49_t2_q3_cupcakes', W, H, parts)
