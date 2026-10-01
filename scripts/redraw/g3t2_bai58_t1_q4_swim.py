"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 1 Q4 — đường bơi của cà cuống A (2 đoạn 1 246 cm),
cà cuống B (3 đoạn 728 cm) và tôm (đường gấp khúc 7 đoạn, không ghi số) tới cụm rong.
Giữ đúng số đoạn và nhãn; con vật là nét riêng.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from g3t2_bai56_kit import *

W, H = 800, 400
DY = 18
LINE = '#29A9E0'


def path(pts):
    p = ' '.join(f'{x},{y + DY}' for x, y in pts)
    s = [f'<polyline points="{p}" fill="none" stroke="{LINE}" stroke-width="4.4" stroke-linejoin="round"/>']
    s += [f'<circle cx="{x}" cy="{y + DY}" r="6.5" fill="{INK}"/>' for x, y in pts]
    return s


def seg_label(a, b, lab, off=-16):
    (x1, y1), (x2, y2) = a, b
    ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2 + DY
    L = math.hypot(x2 - x1, y2 - y1)
    nx, ny = (y2 - y1) / L, -(x2 - x1) / L        # pháp tuyến phía trên đường
    if ny > 0:
        nx, ny = -nx, -ny
    x, y = mx - nx * off, my - ny * off
    return text(f'{x:.1f}', f'{y:.1f}', lab, size=34, weight=700, extra=f' transform="rotate({ang:.1f} {x:.1f} {y:.1f})"')


A = [(137, 121), (424, 17), (672, 196)]
S = [(168, 205), (240, 221), (307, 254), (380, 240), (440, 198), (514, 204), (588, 190), (658, 212)]
B = [(187, 296), (352, 361), (492, 249), (670, 238)]
parts = []
parts += path(A) + path(S) + path(B)
parts.append(seg_label(A[0], A[1], '1 246 cm'))
parts.append(seg_label(A[1], A[2], '1 246 cm'))
parts.append(seg_label(B[0], B[1], '728 cm', off=40))
parts.append(seg_label(B[1], B[2], '728 cm'))
parts.append(seg_label(B[2], B[3], '728 cm', off=40))
parts.append(put(70, 121 + DY, beetle('A'), 1.0))
parts.append(put(120, 205 + DY, shrimp(), .9))
parts.append(put(118, 294 + DY, beetle('B'), 1.0))
parts.append(put(738, 250 + DY, seaweed(80), 1.0))
save('bai58_t1_q4_swim', W, H, parts, folder='grade3-workbook-2')
