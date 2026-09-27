"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — đèn lồng dạng khối trụ (mẫu nối "Khối trụ").
Vẽ lại bằng nét riêng: đèn lồng giấy đỏ thân thẳng, nắp vàng, tua rua."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 200, 358
cx, l, r, t, b, ry = 100, 28, 172, 78, 278, 20
rx = (r - l) / 2
g = uid('lan')
parts = [f'<defs><linearGradient id="{g}" x1="0" x2="1"><stop offset="0" stop-color="{shade(RED, -0.2)}"/>'
         f'<stop offset="0.32" stop-color="{shade(RED, 0.3)}"/><stop offset="0.7" stop-color="{RED}"/>'
         f'<stop offset="1" stop-color="{shade(RED, -0.3)}"/></linearGradient></defs>']
st = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round"'
parts.append(f'<line x1="{cx}" y1="16" x2="{cx}" y2="{t - 22}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<circle cx="{cx}" cy="10" r="6" fill="none" stroke="{INK}" stroke-width="3"/>')
# thân
parts.append(f'<path d="M{l},{t} L{l},{b} A{rx},{ry} 0 0 0 {r},{b} L{r},{t} Z" fill="url(#{g})" {st}/>')
for y in range(t + 30, b, 30):
    parts.append(f'<path d="M{l},{y} A{rx},{ry} 0 0 0 {r},{y}" fill="none" stroke="{shade(RED, -0.35)}" stroke-width="2"/>')
parts.append(f'<ellipse cx="{cx}" cy="{t}" rx="{rx}" ry="{ry}" fill="{shade(RED, -0.1)}" {st}/>')
# tua rua
for dx in (-12, -4, 4, 12):
    parts.append(f'<path d="M{cx + dx / 2},{b + 52} Q{cx + dx * 1.2},{b + 64} {cx + dx * 1.6},{b + 76}" '
                 f'fill="none" stroke="{YELLOW}" stroke-width="6" stroke-linecap="round"/>')
parts.append(f'<rect x="{cx - 9}" y="{b + 36}" width="18" height="22" rx="6" fill="{ORANGE}" {st}/>')
# nắp dưới
parts.append(f'<path d="M{cx - 38},{b + 14} L{cx - 38},{b + 30} A38,8 0 0 0 {cx + 38},{b + 30} L{cx + 38},{b + 14} Z" fill="{YELLOW}" {st}/>')
# nắp trên
parts.append(f'<path d="M{cx - 38},{t - 16} L{cx - 38},{t} A38,8 0 0 0 {cx + 38},{t} L{cx + 38},{t - 16} Z" fill="{YELLOW}" {st}/>')
parts.append(f'<ellipse cx="{cx}" cy="{t - 16}" rx="38" ry="8" fill="{shade(YELLOW, 0.4)}" {st}/>')
save('bai46_t1_q2_lantern', W, H, parts)
