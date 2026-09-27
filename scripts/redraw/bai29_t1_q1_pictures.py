"""
Vở BT Toán 2, Bài 29 Tiết 1 Q1 — ba tranh sinh hoạt của Mi: nét riêng.
Giữ nội dung toán: tranh 1 Mi và bố tưới rau, đồng hồ 5 giờ; tranh 2 Mi và Mai
đánh răng, đồng hồ 9 giờ; tranh 3 Mi và Mai ngủ trên giường tầng, đồng hồ 2 giờ.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 238
PW, PH, Y0 = 290, 230, 4
xs = [3, 305, 607]
parts = []


def watering_can():
    """bình tưới, gốc = quai (tay cầm) — toạ độ cục bộ"""
    return (f'<path d="M-4,26 L-66,6" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
            f'<path d="M-4,26 L-66,6" stroke="{GREEN}" stroke-width="4" stroke-linecap="round"/>'
            f'<ellipse cx="-72" cy="4" rx="7" ry="10" fill="{GREEN}" {st(2.4)} transform="rotate(-20 -72 4)"/>'
            f'<rect x="-6" y="4" width="44" height="40" rx="8" fill="{GREEN}" {st()}/>'
            f'<path d="M34,10 Q54,-10 30,-16 Q10,-16 8,4" fill="none" {st(3)}/>')


# ── tranh 1: tưới rau, 5 giờ
x = xs[0]
g = [f'<rect x="{x}" y="{Y0 + 170}" width="{PW}" height="70" fill="#CFE9B5"/>',
     f'<rect x="{x}" y="{Y0 + 162}" width="{PW}" height="10" fill="#B7DB96"/>']
# luống rau
g.append(f'<rect x="{x + 110}" y="{Y0 + 186}" width="140" height="22" rx="6" fill="#C9956A" {st()}/>')
for i in range(6):
    cx = x + 124 + i * 22
    g.append(f'<path d="M{cx},{Y0 + 188} q-14,-18 -2,-26 q2,10 2,-6 q10,8 10,24 Z" fill="{GREEN}" {st(2)}/>')
g.append(place(x + 60, Y0 + 222, .5, person('pigtails', '#FFB3C7', '#F7839F', 'skirt', 'smile', 8,
         arms=((30, -150), (66, -150)), legs='stand', shoe=BLUE, sleeve='short')))
g.append(place(x + 100, Y0 + 148, .5, watering_can(), flip=True))
g.append(place(x + 222, Y0 + 262, .42, person('adult', '#8FD3F4', '#4E8FC8', 'pants', 'smile', -12,
         arms=((-96, -200), (-50, -190)), no_legs=True, adult=True, sleeve='short')))
g.append(f'<rect x="{x + 110}" y="{Y0 + 186}" width="140" height="22" rx="6" fill="#C9956A" {st()}/>')
for i in range(6):
    cx = x + 124 + i * 22
    g.append(f'<path d="M{cx},{Y0 + 188} q-14,-18 -2,-26 q2,10 2,-6 q10,8 10,24 Z" fill="{GREEN}" {st(2)}/>')
g.append(clock(x + 150, Y0 + 50, 42, 5, 0))
parts.append(panel(x, Y0, PW, PH, SKY, ''.join(g)))

# ── tranh 2: đánh răng, 9 giờ
x = xs[1]
g = [f'<rect x="{x}" y="{Y0}" width="{PW}" height="{PH}" fill="#EAF6FF"/>']
for i in range(8):
    g.append(f'<line x1="{x + i * 40}" y1="{Y0 + 120}" x2="{x + i * 40}" y2="{Y0 + PH}" stroke="#D2E6F4" stroke-width="2"/>')
brush = lambda: (f'<rect x="-40" y="-243" width="44" height="8" rx="3" fill="{PINK}" {st(2)}/>'
                 f'<rect x="-6" y="-249" width="12" height="12" rx="3" fill="#fff" {st(2)}/>')
for cx, hair, shirt, band, look in ((x + 80, 'bob', '#FFD166', None, 4), (x + 210, 'ponytail', '#B9A7F0', PINK, -4)):
    g.append(place(cx, Y0 + 300, .56, person(hair, shirt, None, 'dress', 'closed', look,
             arms=((-44, -238), (40, -150)), band=band, sleeve='short')))
    g.append(place(cx, Y0 + 300, .56, brush()))
    g.append(f'<rect x="{cx + 12}" y="{Y0 + 196}" width="20" height="24" rx="4" fill="{TEAL}" {st(2.4)}/>')
for cx in (x + 80, x + 210):
    g.append(f'<path d="M{cx - 60},{Y0 + 206} L{cx + 60},{Y0 + 206} Q{cx + 56},{Y0 + 240} {cx},{Y0 + 240} Q{cx - 56},{Y0 + 240} {cx - 60},{Y0 + 206} Z" fill="#fff" {st()}/>')
    g.append(f'<rect x="{cx - 5}" y="{Y0 + 194}" width="10" height="14" rx="3" fill="{GREY}" {st(2)}/>')
g.append(clock(x + 145, Y0 + 50, 42, 9, 0))
parts.append(panel(x, Y0, PW, PH, '#EAF6FF', ''.join(g)))

# ── tranh 3: ngủ giường tầng, 2 giờ
x = xs[2]
g = [f'<rect x="{x}" y="{Y0 + 190}" width="{PW}" height="60" fill="#D9D2F2"/>',
     f'<rect x="{x}" y="{Y0}" width="{PW}" height="190" fill="#EEEAFB"/>']
# cửa sổ đêm

# tủ + đèn
g.append(f'<rect x="{x + 16}" y="{Y0 + 140}" width="50" height="58" rx="4" fill="#E9C9A2" {st()}/>'
         f'<line x1="{x + 16}" y1="{Y0 + 168}" x2="{x + 66}" y2="{Y0 + 168}" {st(2)}/>'
         f'<path d="M{x + 41},{Y0 + 140} L{x + 41},{Y0 + 116}" {st(3)}/>'
         f'<path d="M{x + 28},{Y0 + 118} L{x + 54},{Y0 + 118} L{x + 48},{Y0 + 96} L{x + 34},{Y0 + 96} Z" fill="{YELLOW}" {st(2.4)}/>')
# giường tầng
bx, bw = x + 84, 180
g.append(f'<rect x="{bx}" y="{Y0 + 30}" width="12" height="190" rx="4" fill="#C99668" {st()}/>'
         f'<rect x="{bx + bw - 12}" y="{Y0 + 30}" width="12" height="190" rx="4" fill="#C99668" {st()}/>')
for ly in (Y0 + 92, Y0 + 196):
    g.append(pillow(bx + 14, ly - 16, 44, 22))
    g.append(place(bx + 42, ly - 24, .3, head('bob' if ly < 150 else 'pigtails', 'sleep', 0, band=None)))
    g.append(blanket(bx + 60, ly - 10, bw - 72, 26, PURPLE if ly < 150 else PINK))
    g.append(f'<rect x="{bx + 8}" y="{ly - 10}" width="{bw - 16}" height="14" rx="4" fill="#C99668" {st()}/>')
g.append(f'<rect x="{bx}" y="{Y0 + 50}" width="{bw}" height="10" rx="4" fill="#C99668" {st(2.4)}/>')
# thang
lx = bx + bw - 44
g.append(f'<line x1="{lx}" y1="{Y0 + 90}" x2="{lx}" y2="{Y0 + 186}" {st(3)}/><line x1="{lx + 22}" y1="{Y0 + 90}" x2="{lx + 22}" y2="{Y0 + 186}" {st(3)}/>')
for i in range(4):
    g.append(f'<line x1="{lx}" y1="{Y0 + 106 + i * 22}" x2="{lx + 22}" y2="{Y0 + 106 + i * 22}" {st(2.4)}/>')
g.append(clock(x + 42, Y0 + 50, 36, 2, 0))
parts.append(panel(x, Y0, PW, PH, '#EEEAFB', ''.join(g)))
save('bai29_t1_q1_pictures', W, H, parts)
