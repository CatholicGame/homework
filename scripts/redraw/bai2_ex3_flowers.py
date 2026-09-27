"""
Vở BT Toán 3, Bài 2 Tiết 2 Q3 — năm bông hoa A–E, nhụy mỗi bông ghi một phép tính. Nét riêng.
Hoa 8 cánh vàng (đầu cánh xẻ đôi, gân nhạt), nhụy tròn cam to để chữ phép tính dễ đọc.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

EXPRS = ['125 + 35', '168 + 103', '472 – 317', '392 – 125', '270 – 110']
R, RC = 195, 124            # dài cánh, bán kính nhụy
STEP = 410
W, H = STEP * 5, 2 * R + 90
CY = R + 6

parts = ['<defs>'
         f'<radialGradient id="petal" gradientUnits="userSpaceOnUse" cx="0" cy="0" r="{R}">'
         '<stop offset="0" stop-color="#F29A05"/><stop offset=".45" stop-color="#F0B400"/>'
         '<stop offset=".78" stop-color="#E9CB05"/><stop offset="1" stop-color="#F2A906"/></radialGradient>'
         f'<radialGradient id="core" cx=".45" cy=".4" r=".62">'
         '<stop offset="0" stop-color="#F9A602"/><stop offset=".7" stop-color="#F08A00"/><stop offset="1" stop-color="#DF6A04"/></radialGradient>'
         '</defs>']

# Một cánh hướng lên: phình ra rồi xẻ đôi ở đầu.
w = R * .37
PETAL = (f'M0,0 C{-w * .95:.1f},{-R * .33:.1f} {-w * 1.12:.1f},{-R * .84:.1f} {-w * .58:.1f},{-R * .985:.1f} '
         f'Q{-w * .2:.1f},{-R * 1.04:.1f} 0,{-R * .9:.1f} Q{w * .2:.1f},{-R * 1.04:.1f} {w * .58:.1f},{-R * .985:.1f} '
         f'C{w * 1.12:.1f},{-R * .84:.1f} {w * .95:.1f},{-R * .33:.1f} 0,0 Z')
VEINS = ''.join(f'<path d="M{sg * w * .12:.1f},{-RC - 4} Q{sg * w * .16:.1f},{-R * .7:.1f} {sg * w * .34:.1f},{-R * .83:.1f}" '
                f'fill="none" stroke="#FFE24A" stroke-width="3.2" stroke-linecap="round"/>' for sg in (-1, 1))


def flower(cx, expr, letter):
    g = [f'<g transform="translate({cx} {CY})">']
    rots = [f'rotate({k * 45 + 22.5})' for k in range(8)]
    # Viền vẽ trước, cánh tô đè lên sau: chỉ còn viền ngoài, không lộ nét chồng giữa các cánh.
    g += [f'<path transform="{r}" d="{PETAL}" fill="#E29400" stroke="#E29400" stroke-width="5" stroke-linejoin="round"/>' for r in rots]
    g += [f'<path transform="{r}" d="{PETAL}" fill="url(#petal)"/>' for r in rots]
    g += [f'<g transform="{r}">{VEINS}</g>' for r in rots]
    g.append(f'<circle r="{RC}" fill="url(#core)" stroke="#D96404" stroke-width="3"/>')
    g.append(f'<path d="M{-RC * .62:.1f},{-RC * .55:.1f} A{RC * .82:.1f},{RC * .82:.1f} 0 0 1 {-RC * .05:.1f},{-RC * .83:.1f}" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".45"/>')
    g.append(text(0, 16, expr, size=46, weight=700, fill=WHITE,
                  extra=' stroke="#B94E00" stroke-width="6" stroke-linejoin="round" paint-order="stroke"'))
    g.append('</g>')
    g.append(text(cx, H - 14, letter, size=58, weight=600))
    return '\n'.join(g)


for i, (e, l) in enumerate(zip(EXPRS, 'ABCDE')):
    parts.append(flower(STEP * i + STEP / 2, e, l))

save('bai2_ex3_flowers', W, H, parts, folder='grade3-workbook')
