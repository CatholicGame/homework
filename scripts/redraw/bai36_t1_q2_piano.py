"""
Vở BT Toán 2, Bài 36 Tiết 1 Q2 — Nam tập đàn piano: nét riêng.
Không có đồng hồ trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 628, 312
g = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#F4F0FF"/>']
g.append(f'<rect x="120" y="260" width="130" height="16" rx="5" fill="{BROWN}" {st()}/><rect x="130" y="274" width="10" height="36" fill="{BROWN}" {st(2)}/><rect x="230" y="274" width="10" height="36" fill="{BROWN}" {st(2)}/>')
g.append(place(200, 280, .7, person('short', '#8FD3F4', '#4E8FC8', 'shorts', 'down', 14,
         arms=((110, -150), (140, -140)), legs='sit', shoe=RED, sleeve='short')))
# đàn piano nhìn nghiêng
g.append(f'<rect x="300" y="60" width="150" height="250" rx="6" fill="#4A3F4E" {st()}/>'
         f'<rect x="290" y="52" width="170" height="16" rx="4" fill="#5C5060" {st()}/>'
         f'<rect x="270" y="170" width="60" height="18" fill="#fff" {st(2.4)}/>')
for i in range(1, 6):
    g.append(f'<line x1="{270 + i * 10}" y1="170" x2="{270 + i * 10}" y2="188" stroke="{INK}" stroke-width="1.5"/>')
g.append(f'<rect x="270" y="188" width="60" height="120" fill="#5C5060" {st()}/>')
for nx, ny, s in ((80, 90, 1.2), (130, 60, 1), (500, 70, 1.3), (560, 110, 1)):
    g.append(note(nx, ny, s, '#7C6FD0'))
save('bai36_t1_q2_piano', W, H, [panel(2, 2, W - 4, H - 4, '#F4F0FF', ''.join(g))])
