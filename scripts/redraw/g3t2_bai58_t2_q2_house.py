"""
Vở BT Toán 3 Tập hai, Bài 58 Tiết 2 Q2 — ngôi nhà dạng khối lập phương; 4 cạnh của
nóc nhà (mặt trên) được tô đậm màu xanh như sách, là nơi gắn dây đèn.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g3 as k3

W, H = 380, 300
x, y, s = 90, 100, 170          # mặt trước: góc trên trái, cạnh
dx, dy = 70, -50                # chiều sâu
EDGE = '#1B7FC4'
parts = [f'<ellipse cx="200" cy="{y + s + 6}" rx="185" ry="26" fill="{WATER_L}" stroke="{WATER_D}" stroke-width="2"/>',
         k3.tree(56, y + s, 120, crown='#7CC6E8'), k3.tree(340, y + s - 10, 110, crown='#7CC6E8')]
# mặt bên, mặt trên, mặt trước
parts.append(f'<path d="M{x + s},{y} L{x + s + dx},{y + dy} L{x + s + dx},{y + s + dy} L{x + s},{y + s} Z" fill="#9FD3F0" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
parts.append(f'<path d="M{x},{y} L{x + dx},{y + dy} L{x + s + dx},{y + dy} L{x + s},{y} Z" fill="#E8F6FD" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
parts.append(f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="#D6EEFA" stroke="{INK}" stroke-width="2.6"/>')
# 4 cạnh của nóc nhà
parts.append(f'<path d="M{x},{y} L{x + dx},{y + dy} L{x + s + dx},{y + dy} L{x + s},{y} Z" fill="none" stroke="{EDGE}" stroke-width="6" stroke-linejoin="round"/>')
# cửa sổ, cửa ra vào
for wx in (x + 22, x + s - 62):
    parts.append(f'<rect x="{wx}" y="{y + 24}" width="40" height="42" fill="#F4FBFF" stroke="{INK}" stroke-width="2.2"/>'
                 f'<path d="M{wx + 20},{y + 24} v42 M{wx},{y + 45} h40" stroke="{INK}" stroke-width="1.8"/>')
parts.append(f'<rect x="{x + s / 2 - 26}" y="{y + s - 74}" width="52" height="74" fill="#F4FBFF" stroke="{INK}" stroke-width="2.2"/>'
             f'<path d="M{x + s / 2},{y + s - 74} v74" stroke="{INK}" stroke-width="1.8"/>')
save('bai58_t2_q2_house', W, H, parts, folder='grade3-workbook-2')
