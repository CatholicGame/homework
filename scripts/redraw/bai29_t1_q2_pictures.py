"""
Vở BT Toán 2, Bài 29 Tiết 1 Q2 — Việt ăn cơm, Rô-bốt tan học, Nam chuẩn bị sách vở: nét riêng.
Giữ nội dung toán: đồng hồ kim ở góc phải mỗi tranh chỉ 11 giờ, 4 giờ, 9 giờ;
tranh 2 có biển "TRƯỜNG TIỂU HỌC".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 233
PW, PH, Y0 = 290, 226, 4
xs = [3, 305, 607]
parts = []

# ── tranh 1: ăn cơm trưa, 11 giờ
x = xs[0]
g = [f'<rect x="{x}" y="{Y0}" width="{PW}" height="{PH}" fill="#FFF4DF"/>']
g.append(place(x + 80, Y0 + 272, .62, person('short', '#8FD3F4', None, 'shorts', 'closed', 6,
         arms=((40, -200), (60, -150)), no_legs=True, sleeve='short')))
g.append(f'<rect x="{x + 104}" y="{Y0 + 162}" width="7" height="34" rx="3" fill="#E9C9A2" {st(2)} transform="rotate(40 {x + 107} {Y0 + 180})"/>')
g.append(f'<path d="M{x}, {Y0 + 196} L{x + PW},{Y0 + 170} L{x + PW},{Y0 + PH} L{x},{Y0 + PH} Z" fill="#F2D3A6" {st()}/>')
g.append(bowl(x + 122, Y0 + 196, 44, '#fff', '#fff'))
g.append(bowl(x + 205, Y0 + 186, 58, SKY, '#F4A259'))
g.append(plate(x + 160, Y0 + 212, 56, '#fff', YELLOW))
g.append(clock(x + PW - 46, Y0 + 50, 40, 11, 0))
parts.append(panel(x, Y0, PW, PH, '#FFF4DF', ''.join(g)))

# ── tranh 2: Rô-bốt tan học, 4 giờ
x = xs[1]
g = [f'<rect x="{x}" y="{Y0 + 150}" width="{PW}" height="90" fill="#E6E1D8"/>']
g.append(building(x + 60, Y0 + 150, 170, 110))
g.append(tree(x + 30, Y0 + 150, 120, GREEN))
g.append(f'<rect x="{x}" y="{Y0 + 112}" width="60" height="40" fill="#F7C9A8" {st()}/><rect x="{x + 230}" y="{Y0 + 112}" width="60" height="40" fill="#F7C9A8" {st()}/>')
g.append(school_gate(x + 22, Y0 + 152, 190, 92, size=14))
g.append(place(x + 118, Y0 + 222, .38, robot(arms=((-60, -96), (64, -110)), legs='walk', expr='open', look=4)))
g.append(clock(x + PW - 44, Y0 + 50, 38, 4, 0))
parts.append(panel(x, Y0, PW, PH, SKY, ''.join(g)))

# ── tranh 3: chuẩn bị sách vở, 9 giờ tối
x = xs[2]
g = [f'<rect x="{x}" y="{Y0}" width="{PW}" height="{PH}" fill="#E7E4F7"/>']
g.append(f'<rect x="{x + 120}" y="{Y0 + 14}" width="80" height="56" rx="4" fill="#3E4A7A" {st()}/>'
         f'<circle cx="{x + 142}" cy="{Y0 + 34}" r="9" fill="{YELLOW}"/><circle cx="{x + 147}" cy="{Y0 + 31}" r="8" fill="#3E4A7A"/>')
g.append(place(x + 80, Y0 + 300, .62, person('spiky', '#9BD58A', None, 'shorts', 'down', 12,
         arms=((70, -150), (120, -150)), no_legs=True)))
g.append(table(x + 60, Y0 + 260, 240, Y0 + 196))
# cặp sách + sách
g.append(f'<rect x="{x + 120}" y="{Y0 + 130}" width="90" height="64" rx="14" fill="{RED}" {st()}/>'
         f'<rect x="{x + 132}" y="{Y0 + 116}" width="56" height="30" rx="3" fill="#fff" {st(2.4)} transform="rotate(-6 {x + 160} {Y0 + 130})"/>'
         f'<path d="M{x + 120},{Y0 + 152} L{x + 210},{Y0 + 152}" {st(2.4)}/>')
g.append(f'<rect x="{x + 218}" y="{Y0 + 172}" width="58" height="12" rx="2" fill="{BLUE}" {st(2.4)}/><rect x="{x + 222}" y="{Y0 + 160}" width="54" height="12" rx="2" fill="{YELLOW}" {st(2.4)}/>')
g.append(clock(x + PW - 44, Y0 + 50, 38, 9, 0))
parts.append(panel(x, Y0, PW, PH, '#E7E4F7', ''.join(g)))
save('bai29_t1_q2_pictures', W, H, parts)
