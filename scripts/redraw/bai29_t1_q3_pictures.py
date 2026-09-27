"""
Vở BT Toán 2, Bài 29 Tiết 1 Q3 — a) Rô-bốt phơi quần áo dưới nắng, b) bạn gái và
Rô-bốt làm bánh: nét riêng. Giữ nhãn a), b), vạch ngăn giữa, ông mặt trời ở tranh a)
(dấu hiệu buổi sáng). Không có đồng hồ trong hình.
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 346
parts = [text(8, 30, 'a)', size=28, weight=600, anchor='start'),
         text(470, 30, 'b)', size=28, weight=600, anchor='start'),
         f'<line x1="448" y1="8" x2="448" y2="346" stroke="{INK}" stroke-width="4"/>']

# ── a) phơi đồ
x, y, w, h = 6, 55, 414, 286
g = [f'<rect x="{x}" y="{y + 170}" width="{w}" height="{h}" fill="#CFE9B5"/>']
g.append(f'<circle cx="{x + 26}" cy="{y + 22}" r="22" fill="{YELLOW}" {st()}/>')
for i in range(8):
    a = math.radians(i * 45)
    g.append(f'<line x1="{x + 26 + 30 * math.cos(a):.1f}" y1="{y + 22 + 30 * math.sin(a):.1f}" x2="{x + 26 + 42 * math.cos(a):.1f}" y2="{y + 22 + 42 * math.sin(a):.1f}" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>')
# dây phơi
g.append(f'<rect x="{x + 392}" y="{y + 50}" width="8" height="140" fill="{BROWN}" {st(2.4)}/>')
g.append(f'<path d="M{x},{y + 100} Q{x + 200},{y + 90} {x + 396},{y + 54}" fill="none" {st(2.4)}/>')
# khăn đang phơi
g.append(f'<path d="M{x + 250},{y + 84} L{x + 330},{y + 70} L{x + 338},{y + 176} L{x + 262},{y + 186} Z" fill="{PINK}" {st()}/>'
         f'<circle cx="{x + 280}" cy="{y + 120}" r="9" fill="#fff" opacity=".8"/><circle cx="{x + 310}" cy="{y + 146}" r="9" fill="#fff" opacity=".8"/>')
# rô-bốt cầm áo
g.append(place(x + 130, y + 262, .7, robot(arms=((-50, -130), (50, -130)), legs='stand', expr='open', look=6)))
g.append(f'<path d="M{x + 88},{y + 146} L{x + 172},{y + 146} L{x + 180},{y + 180} L{x + 160},{y + 184} L{x + 158},{y + 216} L{x + 102},{y + 216} L{x + 100},{y + 184} L{x + 80},{y + 180} Z" fill="{SKY}" {st()}/>')
# chậu đồ
g.append(f'<path d="M{x + 240},{y + 236} L{x + 350},{y + 236} L{x + 340},{y + 270} L{x + 250},{y + 270} Z" fill="{TEAL}" {st()}/>'
         f'<ellipse cx="{x + 295}" cy="{y + 236}" rx="55" ry="10" fill="{WATER_L}" {st(2.4)}/>')
parts.append(panel(x, y, w, h, SKY, ''.join(g)))

# ── b) làm bánh
x, y, w, h = 480, 55, 414, 286
g = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#FFF4DF"/>',
     f'<rect x="{x + 20}" y="{y + 20}" width="120" height="70" rx="6" fill="#FFE1BF" {st(2.4)}/>'
     f'<line x1="{x + 80}" y1="{y + 20}" x2="{x + 80}" y2="{y + 90}" {st(2.4)}/>']
g.append(place(x + 110, y + 330, .78, person('ponytail', '#8FD3F4', None, 'shorts', 'open', 8,
         arms=((46, -150), (110, -150)), no_legs=True, band=PINK, apron='#fff')))
g.append(place(x + 300, y + 300, .66, robot(arms=((-70, -210), (-60, -110)), no_legs=True, expr='happy', look=-6, hat='chef')))
# cây đánh trứng
g.append(f'<line x1="{x + 254}" y1="{y + 146}" x2="{x + 254}" y2="{y + 110}" {st(4)}/>'
         f'<path d="M{x + 254},{y + 110} q-14,-30 0,-44 q14,14 0,44 M{x + 254},{y + 110} q-6,-30 0,-44 q6,14 0,44" fill="#fff" {st(2)}/>')
# mặt bàn
g.append(f'<path d="M{x},{y + 240} L{x + w},{y + 210} L{x + w},{y + h} L{x},{y + h} Z" fill="#F2D3A6" {st()}/>')
g.append(f'<ellipse cx="{x + 130}" cy="{y + 252}" rx="56" ry="18" fill="#FFF8EC" {st()}/>')
g.append(f'<rect x="{x + 70}" y="{y + 222}" width="130" height="14" rx="7" fill="#E9C9A2" {st()}/>')
g.append(bowl(x + 260, y + 250, 90, SKY, '#FFF3C4'))
g.append(f'<path d="M{x + 330},{y + 250} L{x + 340},{y + 190} Q{x + 365},{y + 180} {x + 390},{y + 190} L{x + 400},{y + 244} Z" fill="#fff" {st()}/>')
parts.append(panel(x, y, w, h, '#FFF4DF', ''.join(g)))
save('bai29_t1_q3_pictures', W, H, parts)
