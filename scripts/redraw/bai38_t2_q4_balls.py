"""
Vở BT Toán 2, Bài 38 Tiết 2 Q4 — quả bóng xếp 2 hàng × 5 cột: nét riêng.
Giữ nội dung toán: đúng 10 quả bóng, 2 hàng, mỗi hàng 5 quả (2 × 5 = 5 × 2).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 751, 290
parts = []


def pent(cx, cy, r, rot=0):
    return ' '.join(f'{cx + r * math.sin(math.radians(rot + 72 * k)):.1f},{cy - r * math.cos(math.radians(rot + 72 * k)):.1f}' for k in range(5))


def ball(cx, cy, R, i):
    cid = f'b38b{i}'
    s = [f'<clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{R}"/></clipPath>',
         f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{WHITE}"/>', f'<g clip-path="url(#{cid})">']
    r0 = R * .3
    s.append(f'<polygon points="{pent(cx, cy, r0)}" fill="{BLUE}" {st(2.6)}/>')
    outer = []
    for k in range(5):
        b = math.radians(72 * k + 36)
        ox, oy = cx + R * .9 * math.sin(b), cy - R * .9 * math.cos(b)
        rot = 72 * k + 36 + 36          # một cạnh quay vào tâm
        outer.append([(ox + r0 * 1.1 * math.sin(math.radians(rot + 72 * j)), oy - r0 * 1.1 * math.cos(math.radians(rot + 72 * j))) for j in range(5)])
        s.append(f'<polygon points="{" ".join(f"{a:.1f},{c:.1f}" for a, c in outer[-1])}" fill="{BLUE}" {st(2.6)}/>')
    for k in range(5):
        a = math.radians(72 * k)
        px, py = cx + r0 * math.sin(a), cy - r0 * math.cos(a)
        qx, qy = cx + R * .6 * math.sin(a), cy - R * .6 * math.cos(a)
        s.append(f'<line x1="{px:.1f}" y1="{py:.1f}" x2="{qx:.1f}" y2="{qy:.1f}" {st(2.6)}/>')
        for poly in (outer[k], outer[k - 1]):
            vx, vy = min(poly, key=lambda v: (v[0] - qx) ** 2 + (v[1] - qy) ** 2)
            s.append(f'<line x1="{qx:.1f}" y1="{qy:.1f}" x2="{vx:.1f}" y2="{vy:.1f}" {st(2.6)}/>')
    s.append(f'<ellipse cx="{cx - R * .45}" cy="{cy - R * .5}" rx="{R * .16}" ry="{R * .09}" fill="#fff" opacity=".7" transform="rotate(-35 {cx - R * .45} {cy - R * .5})"/>')
    s.append('</g>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="none" {st(3)}/>')
    return ''.join(s)


i = 0
for r in range(2):
    for c in range(5):
        parts.append(ball(75 + c * 150, 75 + r * 142, 62, i)); i += 1
save('bai38_t2_q4_balls', W, H, parts)
