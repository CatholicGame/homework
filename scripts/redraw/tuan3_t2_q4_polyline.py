"""
Luyện tập Toán 3, Tuần 3 Tiết 2 Q4 — sâu bò theo đường gấp khúc ABCD tới lá rau.
Giữ nội dung toán: điểm A, B, C, D cùng vị trí, độ dài 105 cm (AB), 95 cm (BC), 100 cm (CD);
sâu ở A, lá rau cạnh D. Sâu và lá là nét riêng.
"""
import math, sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_p2 import caterpillar, leaf, place

W, H = 1120, 360
A, B, C, D = (82, 140), (412, 277), (633, 73), (948, 187)
LINE = '#29A9E0'
parts = [place(leaf(), 1052, 228, 1.15)]
parts.append(f'<polyline points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>')
for p in (A, B, C, D):
    parts.append(f'<circle cx="{p[0]}" cy="{p[1]}" r="8" fill="{INK}"/>')
parts.append(text(50, 156, 'A', size=46, weight=500))
parts.append(text(412, 332, 'B', size=46, weight=500))
parts.append(text(633, 56, 'C', size=46, weight=500))
parts.append(text(982, 214, 'D', size=46, weight=500))


def seg_label(p, q, s, off):
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    ang = math.degrees(math.atan2(q[1] - p[1], q[0] - p[0]))
    if ang > 90: ang -= 180
    if ang < -90: ang += 180
    nx, ny = -math.sin(math.radians(ang)), math.cos(math.radians(ang))
    x, y = mx + nx * off, my + ny * off
    return text(f'{x:.1f}', f'{y:.1f}', s, size=44, weight=500, extra=f' transform="rotate({ang:.1f} {x:.1f} {y:.1f})"')


parts.append(seg_label(A, B, '105 cm', -18))
parts.append(seg_label(B, C, '95 cm', -18))
parts.append(seg_label(C, D, '100 cm', -18))
parts.append(place(caterpillar(), 100, 142, 0.9))
save('tuan3_t2_q4_polyline', W, H, parts, folder='grade3-practice')
