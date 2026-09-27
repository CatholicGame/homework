"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — quả địa cầu dạng khối cầu. Vẽ lại bằng nét riêng
(lục địa là các mảng tự vẽ, không theo bản đồ sách)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 200, 251
cx, cy, r = 94, 106, 80
cid = uid('clip')
parts = []
st = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round"'
parts.append(f'<path d="M{cx - 30},244 L{cx + 54},244 L{cx + 42},230 L{cx - 18},230 Z" fill="{BROWN}" {st}/>')
parts.append(f'<rect x="{cx + 6}" y="{cy + r + 4}" width="12" height="{230 - cy - r - 4}" fill="{BROWN}" {st}/>')
parts += sphere(cx, cy, r, BLUE, shadow=False, gloss=False)
parts.append(f'<defs><clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{r - 1.5}"/></clipPath></defs>')
land = [
    'M40,58 C60,38 90,46 96,64 C100,82 80,84 76,102 C72,118 54,116 50,98 C46,84 30,76 40,58 Z',
    'M110,42 C130,38 150,50 158,68 C150,72 138,68 130,76 C120,70 106,58 110,42 Z',
    'M104,110 C120,98 146,106 150,126 C154,148 136,170 118,166 C112,148 100,136 104,110 Z',
    'M30,128 C44,124 60,136 58,152 C50,162 36,158 28,146 Z',
]
parts.append(f'<g clip-path="url(#{cid})">' + ''.join(
    f'<path d="{d}" fill="{GREEN}" stroke="{GRASS_D}" stroke-width="2"/>' for d in land) + '</g>')
parts.append(f'<ellipse cx="{cx - r * 0.4}" cy="{cy - r * 0.45}" rx="{r * 0.18}" ry="{r * 0.1}" '
             f'transform="rotate(-35 {cx - r * 0.4} {cy - r * 0.45})" fill="{WHITE}" opacity="0.7"/>')
# giá đỡ nửa vòng
R = r + 12
arc = f'M{cx + 12},{cy - R + 1} A{R},{R} 0 0 1 {cx + 12},{cy + R - 1}'
parts.append(f'<path d="{arc}" fill="none" stroke="{INK}" stroke-width="11" stroke-linecap="round"/>')
parts.append(f'<path d="{arc}" fill="none" stroke="{GREY}" stroke-width="6" stroke-linecap="round"/>')
save('bai46_t1_q2_globe', W, H, parts)
