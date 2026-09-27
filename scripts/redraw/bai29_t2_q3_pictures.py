"""
Vở BT Toán 2, Bài 29 Tiết 2 Q3 — Mai dọn bàn ăn, Việt chạy bộ, Nam học bài, bố đọc
truyện cho Mi: nét riêng. Giữ nội dung toán: đồng hồ số góc phải mỗi tranh
18 : 15, 05 : 30 (hàng trên), 15 : 30, 21 : 15 (hàng dưới).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 433
PW, PH = 414, 204
pos = [(3, 3), (482, 3), (3, 226), (482, 226)]
parts = []


def dclock(x, y, label):
    return digital(x + PW - 62, y + 36, 100, 50, label)


# ── Mai dọn bàn ăn 18:15
x, y = pos[0]
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#FFF4DF"/>']
for cx in (x + 170, x + 250):
    g.append(f'<rect x="{cx - 26}" y="{y + 50}" width="52" height="70" rx="20" fill="#E9C9A2" {st()}/>')
g.append(place(x + 80, y + 222, .58, person('ponytail', '#8FD3F4', None, 'shorts', 'smile', 10,
         arms=((96, -160), (60, -150)), no_legs=True, band=PINK, sleeve='short')))
g.append(f'<path d="M{x + 60},{y + 130} L{x + 360},{y + 130} L{x + 390},{y + 200} L{x + 40},{y + 200} Z" fill="#DDEEFF" {st()}/>')
for i in range(1, 8):
    g.append(f'<line x1="{x + 60 + i * 38}" y1="{y + 130}" x2="{x + 45 + i * 44}" y2="{y + 200}" stroke="#B7D5F0" stroke-width="3"/>')
g.append(f'<rect x="{x + 40}" y="{y + 196}" width="350" height="12" fill="#C99668" {st()}/>')
g.append(bowl(x + 136, y + 150, 34, '#fff'))
g.append(bowl(x + 210, y + 142, 34, '#fff'))
g.append(bowl(x + 290, y + 150, 50, SKY, '#F4A259'))
g.append(plate(x + 180, y + 176, 60, '#fff', GREEN))
g.append(plate(x + 250, y + 180, 60, '#fff', ORANGE))
g.append(dclock(x, y, '18 : 15'))
parts.append(panel(x, y, PW, PH, '#FFF4DF', ''.join(g)))

# ── Việt chạy bộ 05:30
x, y = pos[1]
g = [f'<rect x="{x}" y="{y + 90}" width="{PW}" height="120" fill="#CFE9B5"/>',
     f'<path d="M{x + 120},{y + 210} Q{x + 200},{y + 120} {x + 300},{y + 110} L{x + 420},{y + 104} L{x + 420},{y + 140} Q{x + 260},{y + 140} {x + 230},{y + 210} Z" fill="#EFE6D6" {st(2.4)}/>']
g.append(tree(x + 40, y + 100, 110))
g.append(tree(x + 230, y + 96, 100))
g.append(f'<rect x="{x + 90}" y="{y + 74}" width="80" height="12" rx="3" fill="{BROWN}" {st(2.4)}/><rect x="{x + 90}" y="{y + 56}" width="80" height="10" rx="3" fill="{BROWN}" {st(2.4)}/>'
         f'<line x1="{x + 98}" y1="{y + 86}" x2="{x + 98}" y2="{y + 104}" {st(3)}/><line x1="{x + 162}" y1="{y + 86}" x2="{x + 162}" y2="{y + 104}" {st(3)}/>')
g.append(bush(x + 60, y + 190, 100))
g.append(place(x + 220, y + 196, .44, person('short', '#FFD166', '#4E8FC8', 'shorts', 'open', 8,
         arms=((-60, -130), (50, -190)), legs='run', shoe=RED, sleeve='short')))
g.append(dclock(x, y, '05 : 30'))
parts.append(panel(x, y, PW, PH, SKY, ''.join(g)))

# ── Nam học bài 15:30
x, y = pos[2]
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#EAF6FF"/>',
     f'<rect x="{x + 150}" y="{y + 10}" width="90" height="70" rx="4" fill="{SKY}" {st()}/><line x1="{x + 195}" y1="{y + 10}" x2="{x + 195}" y2="{y + 80}" {st(2.4)}/>']
for i, (cx, cy, s, hair, shirt, look) in enumerate(((x + 50, y + 180, .36, 'ponytail', PINK, 6),
                                                   (x + 130, y + 216, .42, 'bob', '#FFD166', 6),
                                                   (x + 230, y + 270, .52, 'short', '#8FD3F4', 10))):
    g.append(place(cx, cy, s, person(hair, shirt, None, 'shorts', 'down', look,
             arms=((40, -140), (80, -140)), no_legs=True, sleeve='short')))
    dw = 200 * s / .52
    g.append(f'<path d="M{cx - dw * .2},{cy - 140 * s} L{cx + dw * .8},{cy - 140 * s} L{cx + dw * .9},{cy - 110 * s} L{cx - dw * .1},{cy - 110 * s} Z" fill="#F2D3A6" {st()}/>')
    g.append(book_open(cx + dw * .35, cy - 132 * s, 60 * s / .52))
g.append(dclock(x, y, '15 : 30'))
parts.append(panel(x, y, PW, PH, '#EAF6FF', ''.join(g)))

# ── bố đọc truyện 21:15
x, y = pos[3]
g = [f'<rect x="{x}" y="{y}" width="{PW}" height="{PH}" fill="#E7E4F7"/>',
     f'<rect x="{x + 230}" y="{y + 10}" width="60" height="70" rx="4" fill="#3E4A7A" {st()}/>'
     f'<circle cx="{x + 252}" cy="{y + 30}" r="8" fill="{YELLOW}"/><circle cx="{x + 256}" cy="{y + 27}" r="7" fill="#3E4A7A"/>']
g.append(f'<rect x="{x + 30}" y="{y + 70}" width="18" height="140" rx="5" fill="#C99668" {st()}/>')
g.append(pillow(x + 48, y + 150, 90, 36))
g.append(place(x + 98, y + 120, .42, head('bob', 'smile', 8)))
g.append(blanket(x + 70, y + 170, 200, 40, PINK))
g.append(f'<rect x="{x + 44}" y="{y + 168}" width="240" height="30" fill="#C99668" {st()}/>')
g.append(place(x + 210, y + 240, .46, person('adult', '#9BD58A', '#4E8FC8', 'pants', 'smile', -10,
         arms=((-60, -230), (-30, -210)), no_legs=True, adult=True)))
g.append(f'<path d="M{x + 168},{y + 118} L{x + 190},{y + 128} L{x + 212},{y + 118} L{x + 212},{y + 150} L{x + 190},{y + 160} L{x + 168},{y + 150} Z" fill="{YELLOW}" {st(2.4)}/>')
g.append(dclock(x, y, '21 : 15'))
parts.append(panel(x, y, PW, PH, '#E7E4F7', ''.join(g)))
save('bai29_t2_q3_pictures', W, H, parts)
