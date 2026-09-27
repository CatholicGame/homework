"""
Vở BT Toán 2, Bài 39 Tiết 2 Q4 — sân trại: nét riêng.
Giữ nội dung toán: 4 con thỏ, 10 con gà (1 gà trống + 1 gà mái + 8 gà con), 6 con vịt.
Mỗi con gà/vịt thấy rõ 2 chân, mỗi con thỏ thấy rõ 2 tai. Không vẽ thêm con vật nào.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 490
parts = [f'<rect width="{W}" height="{H}" rx="18" fill="{SKY}"/>']
parts.append(cloud(150, 90, 1.3) + cloud(420, 50, 1.0))
# hàng rào
parts.append(f'<rect x="0" y="230" width="{W}" height="16" fill="#E9C9A2" {st(2.4)}/>')
for i in range(24):
    x = 10 + i * 38
    parts.append(f'<path d="M{x},{286} L{x},{206} L{x + 13},{194} L{x + 26},{206} L{x + 26},{286} Z" fill="#F2D3A6" {st(2.4)}/>')
parts.append(f'<path d="M0,280 Q450,250 900,280 L900,490 L0,490 Z" fill="#CFE9B5"/>')
parts.append(f'<path d="M0,280 Q450,250 900,280" fill="none" stroke="{GRASS_D}" stroke-width="3"/>')
# cây
parts.append(f'<path d="M820,420 L830,200 L860,200 L872,420 Z" fill="{BROWN}" {st()}/>')
for cx, cy, r in ((700, 90, 90), (830, 60, 100), (760, 170, 80), (880, 170, 70)):
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{GREEN}" {st()}/>')


def legs2(x, y, dx=8, h=16, col=ORANGE):
    s = ''
    for sx in (-1, 1):
        s += f'<path d="M{x + sx * dx},{y} L{x + sx * dx},{y + h} M{x + sx * dx - 6},{y + h} L{x + sx * dx + 6},{y + h}" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>'
        s += f'<path d="M{x + sx * dx},{y} L{x + sx * dx},{y + h} M{x + sx * dx - 6},{y + h} L{x + sx * dx + 6},{y + h}" stroke="{col}" stroke-width="2.4" stroke-linecap="round"/>'
    return s


def duck(x, y, f=1):
    """x,y = chân chạm đất; f=1 quay trái"""
    s = legs2(0, -18, 10, 18)
    s += f'<path d="M-40,-44 Q-40,-18 -4,-16 L30,-16 Q50,-20 52,-48 Q40,-36 20,-40 Q0,-60 -24,-52 Z" fill="#fff" {st()}/>'
    s += f'<path d="M0,-40 Q16,-30 30,-38" fill="none" {st(2.4)}/>'
    s += f'<path d="M-30,-50 L-34,-82" stroke="{INK}" stroke-width="18" stroke-linecap="round"/><path d="M-30,-50 L-34,-82" stroke="#fff" stroke-width="12" stroke-linecap="round"/>'
    s += f'<circle cx="-34" cy="-88" r="16" fill="#fff" {st()}/>'
    s += f'<path d="M-48,-90 L-66,-84 L-48,-80 Z" fill="{ORANGE}" {st(2.2)}/>'
    s += f'<circle cx="-38" cy="-92" r="3" fill="{INK}"/>'
    return place(x, y, 1, s, flip=(f < 0))


def chick(x, y, f=1):
    s = legs2(0, -12, 6, 12)
    s += f'<ellipse cx="0" cy="-28" rx="20" ry="17" fill="{YELLOW}" {st()}/>'
    s += f'<circle cx="-12" cy="-48" r="12" fill="{YELLOW}" {st()}/>'
    s += f'<path d="M-22,-50 L-32,-46 L-22,-43 Z" fill="{ORANGE}" {st(2)}/><circle cx="-15" cy="-51" r="2.4" fill="{INK}"/>'
    s += f'<path d="M4,-30 q8,6 14,-2" fill="none" {st(2)}/>'
    return place(x, y, 1, s, flip=(f < 0))


def hen(x, y, f=1, rooster=False):
    body = '#C8763E' if rooster else '#F4E3C4'
    s = legs2(0, -22, 10, 22, ORANGE)
    if rooster:
        s += f'<path d="M20,-60 Q70,-110 60,-40 Q56,-30 30,-34 Z" fill="#3F7F6A" {st()}/><path d="M24,-56 Q60,-90 54,-46" fill="none" stroke="{TEAL}" stroke-width="5"/>'
    else:
        s += f'<path d="M24,-56 Q52,-80 46,-40 Z" fill="{body}" {st()}/>'
    s += f'<ellipse cx="0" cy="-44" rx="36" ry="26" fill="{body}" {st()}/>'
    s += f'<path d="M-4,-48 Q14,-36 26,-48" fill="none" {st(2.4)}/>'
    s += f'<ellipse cx="-26" cy="-78" rx="16" ry="20" fill="{body}" {st()}/>'
    s += f'<path d="M-36,-96 q4,-12 10,-4 q4,-12 10,-2 q6,-8 8,4 Z" fill="{RED}" {st(2)}/>'
    s += f'<path d="M-40,-80 L-54,-76 L-40,-72 Z" fill="{YELLOW}" {st(2)}/><path d="M-40,-70 q-4,10 4,12 q4,-4 2,-12 Z" fill="{RED}" {st(1.8)}/>'
    s += f'<circle cx="-30" cy="-84" r="3" fill="{INK}"/>'
    return place(x, y, 1.1 if rooster else 1, s, flip=(f < 0))


def rabbit(x, y, f=1, sit=True):
    s = ''
    s += f'<ellipse cx="4" cy="-34" rx="30" ry="34" fill="#fff" {st()}/>'
    s += f'<circle cx="32" cy="-18" r="10" fill="#fff" {st()}/>'
    for sx in (-1, 1):
        s += f'<ellipse cx="{sx * 14 - 4}" cy="-4" rx="12" ry="6" fill="#fff" {st(2.4)}/>'
    for dx, rot in ((-12, -10), (10, 12)):
        s += f'<ellipse cx="{dx}" cy="-118" rx="9" ry="26" fill="#fff" {st()} transform="rotate({rot} {dx} -96)"/>'
        s += f'<ellipse cx="{dx}" cy="-118" rx="4" ry="18" fill="{PINK}" transform="rotate({rot} {dx} -96)"/>'
    s += f'<circle cx="0" cy="-78" r="24" fill="#fff" {st()}/>'
    s += f'<circle cx="-9" cy="-80" r="3" fill="{INK}"/><circle cx="9" cy="-80" r="3" fill="{INK}"/>'
    s += f'<ellipse cx="0" cy="-72" rx="3.5" ry="2.6" fill="{PINK}"/><path d="M-5,-66 q5,4 10,0" fill="none" {st(1.6)}/>'
    s += f'<circle cx="-15" cy="-70" r="4" fill="{PINK}" opacity=".6"/><circle cx="15" cy="-70" r="4" fill="{PINK}" opacity=".6"/>'
    return place(x, y, 1, s, flip=(f < 0))


# gà trống, gà mái, 8 gà con (giữa - trái)
parts.append(hen(110, 340, 1, rooster=True))
parts.append(hen(470, 336, -1))
for i, (cx, cy) in enumerate(((230, 300), (290, 300), (350, 300), (410, 304),
                              (205, 350), (265, 352), (330, 352), (395, 356))):
    parts.append(chick(cx, cy, 1 if i % 2 else -1))
# 4 thỏ (phải)
for cx, cy in ((600, 350), (700, 350), (640, 450), (760, 450)):
    parts.append(rabbit(cx, cy))
# 6 vịt (hàng dưới)
for cx, cy in ((80, 450), (170, 470), (260, 450), (350, 470), (440, 450), (530, 430)):
    parts.append(duck(cx, cy))
save('bai39_t2_q4_farm', W, H, [f'<clipPath id="farm"><rect width="{W}" height="{H}" rx="18"/></clipPath><g clip-path="url(#farm)">'] + parts + ['</g>', f'<rect x="1.5" y="1.5" width="{W - 3}" height="{H - 3}" rx="18" fill="none" stroke="{INK}" stroke-width="2.5"/>'])
