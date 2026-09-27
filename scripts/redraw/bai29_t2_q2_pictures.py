"""
Vở BT Toán 2, Bài 29 Tiết 2 Q2 — Rô-bốt ngủ, tưới cây, rửa bát: nét riêng.
Không có đồng hồ trong hình; giữ đúng ba hoạt động theo thứ tự trái → phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 237
PW, PH, Y0 = 290, 230, 4
xs = [3, 305, 607]
parts = []

# ── ngủ
x = xs[0]
g = [f'<rect x="{x}" y="{Y0}" width="{PW}" height="{PH}" fill="#E7E4F7"/>',
     f'<rect x="{x + 190}" y="{Y0 + 18}" width="70" height="56" rx="4" fill="#3E4A7A" {st()}/>'
     f'<circle cx="{x + 212}" cy="{Y0 + 38}" r="9" fill="{YELLOW}"/><circle cx="{x + 217}" cy="{Y0 + 35}" r="8" fill="#3E4A7A"/>']
g.append(f'<rect x="{x + 20}" y="{Y0 + 90}" width="18" height="140" rx="5" fill="#C99668" {st()}/>')
g.append(f'<rect x="{x + 34}" y="{Y0 + 170}" width="{PW - 40}" height="26" rx="6" fill="#fff" {st()}/>')
g.append(pillow(x + 42, Y0 + 170, 80, 34))
g.append(place(x + 96, Y0 + 140, .5, robot_head('sleep'), rot=-18))
g.append(blanket(x + 120, Y0 + 172, PW - 110, 60, PURPLE))
g.append(f'<rect x="{x + 34}" y="{Y0 + 194}" width="{PW - 40}" height="20" fill="#C99668" {st()}/>')
g.append(text(x + 150, Y0 + 70, 'z', size=22, weight=700, fill='#7C6FD0') + text(x + 166, Y0 + 52, 'z', size=28, weight=700, fill='#7C6FD0'))
parts.append(panel(x, Y0, PW, PH, '#E7E4F7', ''.join(g)))

# ── tưới cây
x = xs[1]
g = [f'<rect x="{x}" y="{Y0 + 190}" width="{PW}" height="50" fill="#CFE9B5"/>']
g.append(f'<ellipse cx="{x + 80}" cy="{Y0 + 200}" rx="50" ry="10" fill="#C9956A" {st(2.4)}/>')
g.append(sapling(x + 80, Y0 + 200, 160))
g.append(place(x + 210, Y0 + 222, .62, robot(arms=((-86, -140), (-40, -120)), legs='stand', expr='down', look=-8)))
# bình tưới
g.append(f'<rect x="{x + 132}" y="{Y0 + 120}" width="46" height="40" rx="8" fill="{TEAL}" {st()}/>'
         f'<path d="M{x + 134},{Y0 + 140} L{x + 104},{Y0 + 124}" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
         f'<path d="M{x + 134},{Y0 + 140} L{x + 104},{Y0 + 124}" stroke="{TEAL}" stroke-width="4" stroke-linecap="round"/>')
for i in range(4):
    g.append(f'<line x1="{x + 100 - i * 4}" y1="{Y0 + 132 + i * 6}" x2="{x + 96 - i * 6}" y2="{Y0 + 150 + i * 10}" stroke="{WATER_D}" stroke-width="3" stroke-linecap="round"/>')
parts.append(panel(x, Y0, PW, PH, SKY, ''.join(g)))

# ── rửa bát
x = xs[2]
g = [f'<rect x="{x}" y="{Y0}" width="{PW}" height="{PH}" fill="#FFF4DF"/>']
for i in range(6):
    g.append(f'<line x1="{x + i * 50}" y1="{Y0}" x2="{x + i * 50}" y2="{Y0 + 150}" stroke="#F4E3C4" stroke-width="3"/>')
g.append(place(x + 150, Y0 + 250, .62, robot(arms=((-40, -120), (40, -110)), no_legs=True, expr='down', look=-4)))
g.append(f'<rect x="{x}" y="{Y0 + 150}" width="{PW}" height="90" fill="#DDE6EE" {st()}/>')
g.append(sink(x + 50, Y0 + 158, 200, 60))
g.append(faucet(x + 240, Y0 + 158, 40, flip=True))
g.append(f'<ellipse cx="{x + 130}" cy="{Y0 + 164}" rx="30" ry="10" fill="#fff" {st(2.4)}/><ellipse cx="{x + 172}" cy="{Y0 + 158}" rx="18" ry="12" fill="{YELLOW}" {st(2.4)}/>')
parts.append(panel(x, Y0, PW, PH, '#FFF4DF', ''.join(g)))
save('bai29_t2_q2_pictures', W, H, parts)
