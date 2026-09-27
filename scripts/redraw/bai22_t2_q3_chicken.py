"""
Vở BT Toán 2, Bài 22 Tiết 2 Q3 — đường đến ổ rơm của gà mái mơ: nét riêng.
Giữ nội dung toán: đường bắt đầu "38 + 9", rẽ đôi: nhánh trên "30 + 17" rồi rẽ
"54 – 6" (ổ 1) / "50 – 3" (ổ 2); nhánh dưới "21 + 26" rồi rẽ "60 – 8" (ổ 3) / "55 – 9" (ổ 4).
Bốn ổ rơm xếp từ trên xuống bên phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 416
parts = []
FIELD, ROAD = '#CFEBC0', '#FFF8E8'

parts.append(f'<path d="M0,30 Q10,10 60,12 L700,12 Q730,14 728,50 L740,380 Q742,410 700,410 L40,410 Q0,410 0,380 Z" fill="{FIELD}"/>')
for x, y in ((110, 70), (230, 60), (300, 110), (160, 150), (60, 120), (470, 170), (420, 240), (540, 230), (640, 120),
             (120, 330), (230, 300), (250, 380), (90, 390), (600, 340), (680, 320), (360, 390)):
    parts.append(tuft(x, y, .75, GRASS_D))

ROADS = [
    'M96,238 L292,238',
    'M290,238 C332,238 340,140 392,108 C422,90 452,80 522,78',
    'M520,78 L770,78',
    'M520,78 C562,80 582,124 612,162 C642,200 682,205 770,205',
    'M290,238 C332,240 350,300 400,330 C430,346 456,344 482,340',
    'M480,340 C540,320 582,282 642,280 L770,278',
    'M480,340 C522,364 562,368 770,368',
]
for d in ROADS:
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="42" stroke-linecap="butt"/>')
for d in ROADS:
    parts.append(f'<path d="{d}" fill="none" stroke="{ROAD}" stroke-width="36" stroke-linecap="butt"/>')
# round off the joins so the roads merge cleanly
for x, y in ((292, 238), (521, 78), (481, 340)):
    parts.append(f'<circle cx="{x}" cy="{y}" r="18" fill="{ROAD}"/>')


def lab(x, y, s, rot=0):
    return f'<g transform="translate({x},{y}) rotate({rot})">{text(0, 9, s, size=25, weight=600)}</g>'


parts += [lab(196, 238, '38 + 9'), lab(352, 162, '30 + 17', -58), lab(646, 78, '54 – 6'),
          lab(606, 150, '50 – 3', 52), lab(364, 306, '21 + 26', 36), lab(588, 294, '60 – 8', -22),
          lab(640, 368, '55 – 9')]


def nest(cx, cy, eggs=2):
    g = [f'<ellipse cx="{cx}" cy="{cy + 6}" rx="62" ry="30" fill="#D9A864" {st(2.6)}/>',
         f'<ellipse cx="{cx}" cy="{cy - 2}" rx="46" ry="16" fill="#A8743F" {st(2.2)}/>']
    ex = [cx - 14, cx + 14] if eggs == 2 else [cx]
    for x in ex:
        g.append(f'<ellipse cx="{x}" cy="{cy - 6}" rx="13" ry="16" fill="{WHITE}" {st(2.2)}/>')
    g.append(f'<path d="M{cx - 60},{cy + 4} Q{cx},{cy + 22} {cx + 60},{cy + 4}" fill="#D9A864" {st(2.4)}/>')
    for k in range(-3, 4):
        g.append(f'<path d="M{cx + k * 14 - 6},{cy + 10 + abs(k)} l12,10" stroke="#9B6A35" stroke-width="2" stroke-linecap="round"/>')
    return ''.join(g)


for y in (72, 199, 276, 370):
    parts.append(nest(830, y))


def hen(x, y):
    """x,y = feet centre; faces right"""
    g, b, w = [], '#F6B26B', '#FCE3C0'
    g.append(f'<ellipse cx="{x}" cy="{y + 4}" rx="46" ry="14" fill="{GREY_L}" {st(2.4)}/>')
    g.append(f'<path d="M{x - 30},{y - 36} L{x - 50},{y - 64} L{x - 38},{y - 42} L{x - 54},{y - 52} L{x - 32},{y - 26} Z" fill="{b}" {st(2.2)}/>')
    g.append(f'<ellipse cx="{x - 4}" cy="{y - 28}" rx="34" ry="26" fill="{b}" {st(2.6)}/>')
    g.append(f'<path d="M{x - 22},{y - 30} Q{x - 4},{y - 12} {x + 14},{y - 28}" fill="{w}" {st(2)}/>')
    g.append(f'<ellipse cx="{x + 22}" cy="{y - 60}" rx="17" ry="19" fill="{b}" {st(2.6)}/>')
    g.append(f'<path d="M{x + 16},{y - 78} q4,-10 8,-2 q4,-9 8,0 q4,-6 5,4" fill="{RED}" {st(2)}/>')
    g.append(f'<path d="M{x + 37},{y - 62} L{x + 48},{y - 57} L{x + 37},{y - 53} Z" fill="{YELLOW}" {st(2)}/>')
    g.append(f'<path d="M{x + 34},{y - 52} q4,8 -2,12 q-5,-4 -2,-12 Z" fill="{RED}" {st(1.6)}/>')
    g.append(eye(x + 27, y - 64, 3))
    for dx in (-8, 8):
        g.append(f'<path d="M{x + dx},{y - 4} L{x + dx},{y + 4} M{x + dx},{y + 4} l-6,2 M{x + dx},{y + 4} l6,2" fill="none" stroke="{ORANGE}" stroke-width="3" stroke-linecap="round"/>')
    return ''.join(g)


parts.append(hen(60, 238))

save('bai22_t2_q3_chicken', W, H, parts)
