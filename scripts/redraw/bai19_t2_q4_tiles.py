"""
Vở BT Toán 3, Bài 19 Tiết 2 câu 4 — hình chữ nhật ghép bởi 6 viên gạch hoa vuông
(3 viên theo chiều dài × 2 viên theo chiều rộng). Hoa văn gạch là nét riêng.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 821, 534
S = 255
X0, Y0 = (W - 3 * S) / 2, (H - 2 * S) / 2
BASE, MOT, MOT2 = '#DDF1FB', '#7CC6E8', '#FFD166'


def tile(x, y):
    cx, cy = x + S / 2, y + S / 2
    cid = uid('t')
    s = [f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{S}" height="{S}"/></clipPath>',
         f'<rect x="{x}" y="{y}" width="{S}" height="{S}" fill="{BASE}"/>', f'<g clip-path="url(#{cid})">']
    # góc: một phần tư hình tròn ở mỗi góc (ghép 4 viên thành vòng tròn)
    for gx in (x, x + S):
        for gy in (y, y + S):
            s.append(f'<circle cx="{gx}" cy="{gy}" r="{S * .22}" fill="{MOT}" opacity=".55"/>')
    # 8 cánh hoa quanh tâm
    for i in range(8):
        a = i * 45
        s.append(f'<ellipse cx="{cx}" cy="{cy - S * .22}" rx="{S * .07}" ry="{S * .15}" fill="{MOT}" '
                 f'transform="rotate({a} {cx} {cy})"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{S * .36}" fill="none" stroke="{MOT}" stroke-width="6"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{S * .1}" fill="{MOT2}" stroke="{shade(MOT2, -.25)}" stroke-width="3"/>')
    s.append('</g>')
    return ''.join(s)


parts = [tile(X0 + c * S, Y0 + r * S) for r in range(2) for c in range(3)]
for c in range(4):
    parts.append(line(X0 + c * S, Y0, X0 + c * S, Y0 + 2 * S, sw=6))
for r in range(3):
    parts.append(line(X0, Y0 + r * S, X0 + 3 * S, Y0 + r * S, sw=6))
save('bai19_t2_q4_tiles', W, H, parts, folder='grade3-workbook')
