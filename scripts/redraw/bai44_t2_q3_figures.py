"""
Vở BT Toán 3, Bài 44 Tiết 2 câu 3 — a) đường gấp khúc ABCD: 34 mm, 18 mm, 45 mm;
b) cân thăng bằng: quả cân 100 g, 200 g, 500 g ↔ túi đường; c) 3 ca, mỗi ca nước tới vạch 200 ml
(vạch ghi 20, 100, 200 ml). Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *
from kit_measure import balance_scale, weight, pillow_bag

W, H = 1410, 990
parts = [text(12, 64, 'a)', size=58, weight=500, anchor='start'),
         text(12, 398, 'b)', size=58, weight=500, anchor='start'),
         text(12, 818, 'c)', size=58, weight=500, anchor='start')]
pts = [(197, 238), (590, 95), (785, 205), (1320, 60)]
parts.append(polyline_fig(pts, 'ABCD', ['34 mm', '18 mm', '45 mm'],
                          [(-34, 26), (0, -32), (6, 56), (40, 4)], size=54, sw=4.5, lab_off=38))
left = (weight(-58, 0, '', w=26) + text(-58, -34, '100 g', size=13, weight=700)
        + weight(-14, 0, '', w=34) + text(-14, -42, '200 g', size=13, weight=700)
        + weight(42, 0, '500 g', w=52, size=12))
right = pillow_bag(0, 0, 'Đường', w=86, h=84, col=WHITE, band=SKY_D, size=15)
parts.append(balance_scale(525, 690, left, right, tilt=0, arm=110, pan_w=170, s=2.1))


def jug(x0, yb):
    """ca đong nhìn nghiêng: thân (x0..x0+200), vòi trái, quai phải, nước tới vạch 200 ml."""
    w, h = 200, 200
    top = yb - h
    body = f'M{x0},{top} L{x0 + 18},{yb - 10} Q{x0 + 20},{yb} {x0 + 32},{yb} H{x0 + w - 12} Q{x0 + w},{yb} {x0 + w},{yb - 12} V{top} Z'
    cid = uid('jug')
    y20, y100, y200 = yb - 22, yb - 88, yb - 170
    s = [f'<path d="M{x0 + w - 2},{top + 30} C{x0 + w + 70},{top + 20} {x0 + w + 70},{yb - 50} {x0 + w - 2},{yb - 40}" fill="none" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>',
         f'<path d="M{x0 + w - 2},{top + 30} C{x0 + w + 70},{top + 20} {x0 + w + 70},{yb - 50} {x0 + w - 2},{yb - 40}" fill="none" stroke="{GREY_L}" stroke-width="7" stroke-linecap="round"/>',
         f'<clipPath id="{cid}"><path d="{body}"/></clipPath>',
         f'<path d="{body}" fill="#F4FAFD"/>',
         f'<rect x="{x0 - 10}" y="{y200}" width="{w + 20}" height="{h}" fill="{WATER_D}" opacity=".75" clip-path="url(#{cid})"/>',
         f'<path d="{body}" fill="none" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>',
         f'<path d="M{x0 - 22},{top - 8} Q{x0 - 4},{top - 2} {x0 + 20},{top} H{x0 + w + 4}" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>']
    # thang chia độ bên trái: vạch nhỏ mỗi 10 ml từ 20 đến 200
    sx = x0 + 44
    for ml in range(20, 201, 10):
        y = yb - 22 - (ml - 20) * (148 / 180)
        big = ml in (20, 100, 200)
        s.append(line(sx, y, sx + (24 if big else 12), y, sw=3.5 if big else 2.5))
    s.append(line(sx, y200, sx, y20, sw=3.5))
    s.append(text(sx + 30, y200 + 12, '200 ml', size=32, weight=600, anchor='start'))
    s.append(text(sx + 30, y100 + 12, '100', size=32, weight=600, anchor='start'))
    s.append(text(sx + 30, y20 + 12, '20', size=32, weight=600, anchor='start'))
    return ''.join(s)


for x0 in (150, 505, 858):
    parts.append(jug(x0, 972))
save('bai44_t2_q3_figures', W, H, parts, folder='grade3-workbook')
