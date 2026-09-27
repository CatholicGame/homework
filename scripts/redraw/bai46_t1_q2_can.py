"""Vở BT Toán 2, Bài 46 Tiết 1 Q2 — lon nước dạng khối trụ. Vẽ lại bằng nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 132, 220
cx, l, r, t, b, ry = 66, 16, 116, 44, 196, 14
rx = (r - l) / 2
g = uid('can')
parts = [f'<defs><linearGradient id="{g}" x1="0" x2="1"><stop offset="0" stop-color="{shade(GREEN, -0.2)}"/>'
         f'<stop offset="0.3" stop-color="{shade(GREEN, 0.35)}"/><stop offset="0.7" stop-color="{GREEN}"/>'
         f'<stop offset="1" stop-color="{shade(GREEN, -0.3)}"/></linearGradient></defs>']
st = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round"'
tl, tr, tt = l + 10, r - 10, t - 16
parts.append(f'<path d="M{tl},{tt} L{l},{t} L{l},{b} A{rx},{ry} 0 0 0 {r},{b} L{r},{t} L{tr},{tt} Z" fill="url(#{g})" {st}/>')
parts.append(f'<path d="M{l},{t} A{rx},{ry} 0 0 0 {r},{t}" fill="none" stroke="{INK}" stroke-width="1.8"/>')
parts.append(f'<path d="M{l},{b - 18} A{rx},{ry} 0 0 0 {r},{b - 18}" fill="none" stroke="{INK}" stroke-width="1.8"/>')
parts.append(f'<path d="M{l + 1.5},118 C{l + 30},96 {r - 30},146 {r - 1.5},118 L{r - 1.5},142 '
             f'C{r - 30},170 {l + 30},120 {l + 1.5},142 Z" fill="{WHITE}" opacity="0.9"/>')
parts.append(f'<ellipse cx="{cx}" cy="{tt}" rx="{(tr - tl) / 2}" ry="{ry - 3}" fill="{GREY_L}" {st}/>')
parts.append(f'<ellipse cx="{cx + 6}" cy="{tt}" rx="14" ry="5" fill="{GREY}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<ellipse cx="{cx - 14}" cy="{tt}" rx="8" ry="3.5" fill="{WHITE}" stroke="{INK}" stroke-width="2"/>')
save('bai46_t1_q2_can', W, H, parts)
