"""
Vở BT Toán 2, Bài 28 Q5 — ốc sên bò từ nhà đến siêu thị rồi đến bờ ao: nét riêng.
Giữ nội dung toán: đoạn nhà -> siêu thị ghi 13 cm, đoạn siêu thị -> bờ ao ghi 27 cm;
ao bên trái, siêu thị ở giữa phía trên, nhà bên phải; ốc sên cạnh nhà, mũi tên chỉ hướng bò.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 264
parts = []

# pond
parts.append(f'<path d="M8,150 C0,110 60,98 120,104 C180,108 226,120 222,150 C218,184 150,190 100,188 C40,186 14,176 8,150 Z" fill="#9FD8F2" {st(2.8)}/>')
parts.append(f'<path d="M30,146 C40,126 90,120 140,124" fill="none" stroke="#D6F0FB" stroke-width="5" stroke-linecap="round"/>')
parts.append(lily_pad(60, 160, 18, 9, 60))
parts.append(lily_pad(150, 150, 16, 8, 120))
for x, y in ((40, 196), (170, 194), (200, 112)):
    parts.append(f'<ellipse cx="{x}" cy="{y}" rx="12" ry="6" fill="{GREY}" {st(2)}/>')
parts.append(reeds(70, 110, .7))
parts.append(reeds(214, 150, .6))

# supermarket
parts.append(f'<rect x="384" y="30" width="200" height="104" fill="#FFE8CC" {st(2.8)}/>')
parts.append(f'<rect x="376" y="14" width="216" height="20" rx="4" fill="{RED}" {st(2.6)}/>')
for i in range(6):
    x = 386 + i * 33.3
    parts.append(f'<path d="M{x},56 L{x + 33.3},56 L{x + 33.3},68 Q{x + 25},76 {x + 16.6},68 Q{x + 8},76 {x},68 Z" fill="{WHITE if i % 2 else RED}" {st(2)}/>')
for x in (398, 520):
    parts.append(f'<rect x="{x}" y="82" width="52" height="40" fill="{SKY}" {st(2.2)}/>')
parts.append(f'<rect x="460" y="82" width="46" height="52" fill="{SKY_D}" {st(2.2)}/>')
parts.append(f'<line x1="483" y1="82" x2="483" y2="134" {st(2)}/>')
# shopping cart
parts.append(f'<path d="M596,108 L604,108 L610,128 L638,128 L644,112 L606,112" fill="none" {st(2.4)}/>')
for x in (614, 634):
    parts.append(f'<circle cx="{x}" cy="{134}" r="3.4" fill="{INK}"/>')

# house
parts.append(house(812, 236, 110, 112, wall='#FFF1E0', roof=BLUE, door=BROWN))
for x in (736, 878):
    parts.append(f'<circle cx="{x}" cy="232" r="12" fill="{GRASS}" {st(2.2)}/>')

# route: house -> supermarket (13 cm) -> pond (27 cm)
A, B, C = (695, 248), (478, 160), (152, 220)
parts.append(f'<polyline points="{pts([A, B, C])}" fill="none" stroke="{INK}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>')
parts.append(f'<polyline points="{pts([A, B, C])}" fill="none" stroke="{GREY_L}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>')
for x, y in (A, B, C):
    parts.append(f'<circle cx="{x}" cy="{y}" r="7" fill="{GREY}" {st(2.2)}/>')
parts.append(f'<g transform="translate(326,226) rotate(-10)">{text(0, 0, "27 cm", size=24, weight=600)}</g>')
parts.append(f'<g transform="translate(572,238) rotate(22)">{text(0, 0, "13 cm", size=24, weight=600)}</g>')

# snail beside the house, arrow showing it crawls towards the supermarket
parts.append(snail(690, 226, .55, -1, shell=ORANGE))
parts.append(f'<path d="M660,214 L640,206 M640,206 l8,-6 M640,206 l5,8" fill="none" {st(2.2)}/>')

save('bai28_q5_snail', W, H, parts)
