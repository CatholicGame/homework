"""
Luyện tập Toán 3, Tuần 18 Tiết 3 Q2 — kiến đi từ D đến A theo đường gấp khúc.
Giữ nội dung toán: điểm A, B, C, D cùng vị trí, AB 46 mm, BC 64 mm, CD 28 mm; kiến đứng ở D.
"""
import math, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import ant, place

W, H = 1320, 460
A, B, C, D = (55, 293), (447, 72), (977, 382), (1240, 382)
LINE = '#29A9E0'
parts = [f'<polyline points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>']
for p in (A, B, C, D):
    parts.append(f'<circle cx="{p[0]}" cy="{p[1]}" r="8" fill="{LINE}"/>')
parts.append(text(52, 346, 'A', size=46, weight=500))
parts.append(text(445, 52, 'B', size=46, weight=500))
parts.append(text(980, 358, 'C', size=46, weight=500))
parts.append(text(1272, 400, 'D', size=46, weight=500))


def seg_label(p, q, s, off):
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    ang = math.degrees(math.atan2(q[1] - p[1], q[0] - p[0]))
    nx, ny = -math.sin(math.radians(ang)), math.cos(math.radians(ang))
    x, y = mx + nx * off, my + ny * off
    return text(f'{x:.1f}', f'{y:.1f}', s, size=44, weight=500, extra=f' transform="rotate({ang:.1f} {x:.1f} {y:.1f})"')


parts.append(seg_label(A, B, '46 mm', -18))
parts.append(seg_label(B, C, '64 mm', -18))
parts.append(text(1125, 432, '28 mm', size=44, weight=500))
parts.append(place(ant(), 1212, 374, 1.0))
save('tuan18_t3_q2_ant', W, H, parts, folder='grade3-practice')
