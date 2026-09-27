"""
Vở BT Toán 2, Bài 36 Tiết 1 Q2 — Nam đeo cặp đi tới cổng trường: nét riêng.
Giữ biển "TRƯỜNG TIỂU HỌC"; không có đồng hồ trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 628, 307
g = [f'<rect x="0" y="200" width="{W}" height="120" fill="#E6E1D8"/>']
g.append(building(300, 200, 190, 180))
g.append(tree(70, 200, 180))
g.append(tree(560, 200, 170))
g.append(f'<rect x="0" y="120" width="250" height="80" fill="#F7C9A8" {st()}/><rect x="440" y="120" width="190" height="80" fill="#F7C9A8" {st()}/>')
g.append(school_gate(248, 200, 190, 110, size=16))
bag = f'<rect x="-44" y="-205" width="88" height="96" rx="20" fill="{ORANGE}" {st()}/><rect x="-30" y="-150" width="60" height="30" rx="8" fill="{YELLOW}" {st(2.4)}/>'
# Nam nhìn từ phía sau: đầu tóc che hết, cặp trước lưng
back = person('short', '#8FD3F4', '#4E8FC8', 'shorts', 'smile', 0, arms=((-60, -110), (70, -130)), legs='walk', shoe=RED, sleeve='short')
g.append(place(200, 290, .66, back + f'<g transform="translate(0,-262)"><ellipse cx="0" cy="0" rx="58" ry="56" fill="{HAIR}" {st()}/></g>' + bag))
save('bai36_t1_q2_school', W, H, [panel(2, 2, W - 4, H - 4, SKY, ''.join(g))])
