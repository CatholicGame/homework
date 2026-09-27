"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — quả bóng đá dạng khối cầu. Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *
import math

W, H = 200, 147
cx, cy, r = 100, 74, 66
ox, oy = cx + 4, cy + 4          # tâm mảng ngũ giác giữa (lệch nhẹ -> cảm giác khối)
cid = uid('clip')
parts = sphere(cx, cy, r, '#F4F6F8', shadow=False, gloss=False)
parts.append(f'<defs><clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{r - 1.5}"/></clipPath></defs>')


def P(rad, deg):
    a = math.radians(deg)
    return ox + rad * math.cos(a), oy + rad * math.sin(a)


def pent(px, py, s, rot):
    return ' '.join(f'{px + s * math.cos(math.radians(rot + 72 * i)):.1f},{py + s * math.sin(math.radians(rot + 72 * i)):.1f}'
                    for i in range(5))


g = [f'<polygon points="{pent(ox, oy, 20, -80)}" fill="{INK}"/>']
for i in range(5):
    d = -80 + 72 * i                    # hướng đỉnh ngũ giác giữa
    v, e = P(20, d), P(42, d)
    g.append(f'<line x1="{v[0]:.1f}" y1="{v[1]:.1f}" x2="{e[0]:.1f}" y2="{e[1]:.1f}" stroke="{INK}" stroke-width="2.5"/>')
    for s in (-1, 1):                   # hai đường chéo tới mảng đen ở mép
        f = P(58, d + s * 30)
        g.append(f'<line x1="{e[0]:.1f}" y1="{e[1]:.1f}" x2="{f[0]:.1f}" y2="{f[1]:.1f}" stroke="{INK}" stroke-width="2.5"/>')
    c = P(74, d + 36)
    g.append(f'<polygon points="{pent(c[0], c[1], 20, d + 36)}" fill="{INK}"/>')
parts.append(f'<g clip-path="url(#{cid})">' + ''.join(g) + '</g>')
parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<ellipse cx="{cx - 34}" cy="{cy - 30}" rx="10" ry="5" transform="rotate(-40 {cx - 34} {cy - 30})" fill="{WHITE}" opacity="0.9"/>')
save('bai46_t1_q2_ball', W, H, parts)
