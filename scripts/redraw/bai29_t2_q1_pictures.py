"""
Vở BT Toán 2, Bài 29 Tiết 2 Q1 — đi bộ ở cổng trường, làm bánh với bố, tiệc sinh nhật
Rô-bốt: nét riêng. Giữ nội dung toán: đồng hồ kim góc trái mỗi tranh chỉ 4 giờ 15 phút,
10 giờ 30 phút, 8 giờ 15 phút; biển "TRƯỜNG TIỂU HỌC" ở tranh 1.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 231
PW, PH, Y0 = 290, 224, 4
xs = [3, 305, 607]
parts = []

# ── tranh 1: hai bạn đi bộ, 4 giờ 15 phút chiều
x = xs[0]
g = [f'<rect x="{x}" y="{Y0 + 150}" width="{PW}" height="90" fill="#E6E1D8"/>']
g.append(building(x + 90, Y0 + 150, 120, 110))
g.append(tree(x + 250, Y0 + 150, 130))
g.append(school_gate(x + 80, Y0 + 150, 140, 90, size=12))
g.append(bush(x + 40, Y0 + 152, 90))
g.append(place(x + 110, Y0 + 216, .44, person('short', '#8FD3F4', '#4E8FC8', 'shorts', 'smile', 10,
         arms=((-50, -120), (56, -130)), legs='walk', shoe=RED, sleeve='short',
         extra_back=f'<rect x="-50" y="-200" width="60" height="80" rx="16" fill="{ORANGE}" {st()}/>')))
g.append(place(x + 200, Y0 + 220, .44, person('spiky', '#FFD166', '#4E8FC8', 'shorts', 'open', -10,
         arms=((-80, -170), (50, -120)), legs='walk', shoe=BLUE, sleeve='short'), flip=True))
g.append(clock(x + 46, Y0 + 46, 40, 4, 15))
parts.append(panel(x, Y0, PW, PH, SKY, ''.join(g)))

# ── tranh 2: làm bánh với bố, 10 giờ 30 phút sáng
x = xs[1]
g = [f'<rect x="{x + 110}" y="{Y0 + 10}" width="170" height="70" rx="4" fill="#FFE1BF" {st(2.4)}/>',
     f'<line x1="{x + 195}" y1="{Y0 + 10}" x2="{x + 195}" y2="{Y0 + 80}" {st(2.4)}/>']
g.append(place(x + 150, Y0 + 236, .46, person('adult', '#9BD58A', None, 'pants', 'smile', 0,
         arms=((-60, -230), (60, -230)), no_legs=True, adult=True, glasses=True, apron='#fff')))
g.append(place(x + 50, Y0 + 236, .44, person('ponytail', PINK, None, 'dress', 'smile', 10,
         arms=((70, -150), (40, -130)), no_legs=True, band=PURPLE, sleeve='short')))
g.append(place(x + 240, Y0 + 236, .44, person('pigtails', '#FFD166', None, 'dress', 'down', -10,
         arms=((-60, -130), (-30, -126)), no_legs=True, sleeve='short')))
g.append(f'<rect x="{x}" y="{Y0 + 170}" width="{PW}" height="60" fill="#DDEEFF" {st()}/>')
for i in range(1, 9):
    g.append(f'<line x1="{x + i * 34}" y1="{Y0 + 170}" x2="{x + i * 34}" y2="{Y0 + 230}" stroke="#B7D5F0" stroke-width="3"/>')
# bánh kem hai tầng
cx = x + 150
g.append(f'<rect x="{cx - 50}" y="{Y0 + 130}" width="100" height="40" rx="8" fill="#FFCDE3" {st()}/>'
         f'<rect x="{cx - 34}" y="{Y0 + 100}" width="68" height="32" rx="8" fill="#FFF3C4" {st()}/>'
         f'<path d="M{cx - 50},{Y0 + 142} q12,10 25,0 q12,10 25,0 q12,10 25,0 q12,10 25,0" fill="none" stroke="#fff" stroke-width="4"/>'
         f'<ellipse cx="{cx}" cy="{Y0 + 172}" rx="62" ry="8" fill="#fff" {st(2.4)}/>')
g.append(f'<path d="M{x + 84},{Y0 + 136} L{x + 106},{Y0 + 152} L{x + 100},{Y0 + 118} Z" fill="#fff" {st(2.2)}/>')
g.append(clock(x + 48, Y0 + 46, 40, 10, 30))
parts.append(panel(x, Y0, PW, PH, '#FFF4DF', ''.join(g)))

# ── tranh 3: tiệc sinh nhật Rô-bốt, 8 giờ 15 phút tối
x = xs[2]
g = []
for bx, by, c in ((x + 120, 30, RED), (x + 200, 20, YELLOW), (x + 250, 40, TEAL)):
    g.append(f'<path d="M{bx},{Y0 + by + 26} Q{bx - 4},{Y0 + by + 60} {bx + 6},{Y0 + by + 80}" fill="none" {st(1.6)}/>'
             f'<ellipse cx="{bx}" cy="{Y0 + by}" rx="17" ry="22" fill="{c}" {st(2.4)}/>')
g.append(place(x + 40, Y0 + 244, .42, person('pigtails', '#FFB3C7', None, 'dress', 'smile', 8,
         arms=((60, -140), (70, -130)), no_legs=True, sleeve='short')))
g.append(place(x + 140, Y0 + 226, .42, robot(arms=((-60, -120), (60, -120)), no_legs=True, expr='happy', hat='party')))
g.append(place(x + 205, Y0 + 244, .42, person('bob', '#B9A7F0', None, 'dress', 'closed', 0,
         arms=((-40, -130), (40, -130)), no_legs=True, sleeve='short')))
g.append(place(x + 262, Y0 + 244, .42, person('short', '#8FD3F4', None, 'shorts', 'open', -12,
         arms=((-60, -140), (-30, -130)), no_legs=True, sleeve='short')))
g.append(f'<path d="M{x},{Y0 + 170} L{x + PW},{Y0 + 170} L{x + PW},{Y0 + PH} L{x},{Y0 + PH} Z" fill="#fff" {st()}/>')
g.append(f'<path d="M{x},{Y0 + 170} L{x + PW},{Y0 + 170}" stroke="{PINK}" stroke-width="6"/>')
g.append(f'<rect x="{x + 112}" y="{Y0 + 140}" width="56" height="32" rx="6" fill="#FFCDE3" {st()}/>')
g.append(f'<rect x="{x + 190}" y="{Y0 + 144}" width="34" height="28" rx="3" fill="{PURPLE}" {st(2.4)}/><path d="M{x + 207},{Y0 + 144} V{Y0 + 172} M{x + 190},{Y0 + 156} H{x + 224}" stroke="{YELLOW}" stroke-width="4"/>')
g.append(plate(x + 70, Y0 + 190, 50, '#fff', ORANGE))
g.append(plate(x + 230, Y0 + 196, 50, '#fff', GREEN))
g.append(clock(x + 44, Y0 + 46, 38, 8, 15))
parts.append(panel(x, Y0, PW, PH, '#EEEAFB', ''.join(g)))
save('bai29_t2_q1_pictures', W, H, parts)
