"""
Vở BT Toán 2, Bài 36 Tiết 1 Q2 — Nam ngồi làm bài tập ở bàn học: nét riêng.
Không có đồng hồ trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 530, 307
g = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#FFF4DF"/>',
     f'<rect x="40" y="30" width="110" height="90" rx="4" fill="{SKY}" {st()}/><line x1="95" y1="30" x2="95" y2="120" {st(2.4)}/>']
g.append(chair(410, 300, 150, ORANGE, facing=-1))
g.append(place(360, 330, .8, person('spiky', '#8FD3F4', None, 'shorts', 'down', -14,
         arms=((-110, -150), (-60, -130)), no_legs=True, sleeve='short')))
g.append(f'<rect x="20" y="210" width="320" height="16" rx="4" fill="#F2D3A6" {st()}/>'
         f'<rect x="40" y="224" width="14" height="90" fill="{BROWN}" {st(2.4)}/><rect x="306" y="224" width="14" height="90" fill="{BROWN}" {st(2.4)}/>')
g.append(book_open(210, 212, 150))
for i in range(3):
    g.append(f'<line x1="{150 + i * 4}" y1="{196 + i * 4}" x2="{196}" y2="{198 + i * 4}" stroke="{GREY}" stroke-width="2"/>')
g.append(f'<rect x="258" y="180" width="6" height="34" rx="2" fill="{YELLOW}" {st(2)} transform="rotate(-30 261 197)"/>')
save('bai36_t1_q2_homework', W, H, [panel(2, 2, W - 4, H - 4, '#FFF4DF', ''.join(g))])
