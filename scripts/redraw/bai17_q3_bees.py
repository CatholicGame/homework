"""
Vở BT Toán 3, Bài 17 câu 3 — ba hình tròn bằng nhau (bán kính 9cm) tiếp xúc nhau đôi một,
tâm A, B, C; đường gấp khúc ABC; chú ong đậu cạnh A. Nét riêng.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 709, 697
R = 148
A = (162, 245)
C = (A[0] + 2 * R, 245)
B = ((A[0] + C[0]) / 2, 245 + 2 * R * math.sin(math.radians(60)))


def petal_ring(cx, cy, col):
    """hình tròn tô nhạt, viền trong gợn sóng như bông hoa (trang trí)."""
    s = [f'<circle cx="{cx}" cy="{cy}" r="{R}" fill="{col}" stroke="{INK}" stroke-width="5"/>']
    n = 16
    pts = []
    for i in range(n):
        a0 = 2 * math.pi * i / n
        a1 = 2 * math.pi * (i + 1) / n
        r2 = R - 14
        x0, y0 = cx + r2 * math.cos(a0), cy + r2 * math.sin(a0)
        x1, y1 = cx + r2 * math.cos(a1), cy + r2 * math.sin(a1)
        pts.append(f'{"M" if i == 0 else "L"}{x0:.1f},{y0:.1f} A{r2 * math.pi / n:.1f},{r2 * math.pi / n:.1f} 0 0 0 {x1:.1f},{y1:.1f}')
    s.append(f'<path d="{" ".join(pts)} Z" fill="#fff" fill-opacity=".55" stroke="{shade(col, -.3)}" stroke-width="2.5"/>')
    return ''.join(s)


def bee(x, y):
    s = []
    for dx, rot in ((-6, -25), (12, 15)):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 26}" rx="13" ry="20" transform="rotate({rot} {x + dx} {y - 26})" fill="#E6F6FF" stroke="{INK}" stroke-width="3"/>')
    cid = uid('bee')
    s.append(f'<clipPath id="{cid}"><ellipse cx="{x}" cy="{y}" rx="30" ry="21"/></clipPath>')
    s.append(f'<ellipse cx="{x}" cy="{y}" rx="30" ry="21" fill="{YELLOW}"/>')
    s.append(f'<g clip-path="url(#{cid})">' + ''.join(f'<rect x="{x + dx}" y="{y - 25}" width="9" height="50" fill="{INK}"/>' for dx in (-4, 12)) + '</g>')
    s.append(f'<ellipse cx="{x}" cy="{y}" rx="30" ry="21" fill="none" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M{x + 29},{y + 2} l9,2 l-9,4" fill="{INK}"/>')
    s.append(f'<circle cx="{x - 30}" cy="{y - 4}" r="16" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{x - 36}" cy="{y - 7}" r="3.2" fill="{INK}"/><circle cx="{x - 26}" cy="{y - 7}" r="3.2" fill="{INK}"/>')
    s.append(f'<path d="M{x - 35},{y + 3} q4,4 8,0" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    s.append(f'<path d="M{x - 36},{y - 18} q-6,-14 -14,-14 M{x - 26},{y - 19} q0,-14 6,-18" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    return ''.join(s)


parts = [petal_ring(*A, '#FFE3A3'), petal_ring(*C, '#FFD1E0'), petal_ring(*B, '#CDEBFA')]
parts.append(f'<polyline points="{A[0]},{A[1]} {B[0]:.1f},{B[1]:.1f} {C[0]},{C[1]}" fill="none" stroke="{INK}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>')
for p in (A, B, C):
    parts.append(dot(*p, r=10))
parts.append(text(A[0] + 34, A[1] - 22, 'A', size=56, weight=600))
parts.append(text(C[0] + 42, C[1] - 4, 'C', size=56, weight=600))
parts.append(text(B[0] + 40, B[1] + 42, 'B', size=56, weight=600))
parts.append(f'<g transform="translate(92,238) scale(1.3) translate(-92,-238)">' + bee(92, 238) + '</g>')
save('bai17_q3_bees', W, H, parts, folder='grade3-workbook')
