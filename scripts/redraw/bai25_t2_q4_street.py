"""
Vở BT Toán 2, Bài 25 Tiết 2 Q4 — con đường, ba cột đèn, máy bay: nét riêng.
Giữ nội dung toán: vạch kẻ đường là các đường thẳng; ba cột đèn đứng thẳng hàng
(chân cùng một đường); vệt mây sau máy bay là đường cong.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 450
parts = [f'<rect width="{W}" height="360" fill="#EAF6FD"/>']

# bushy trees behind the pavement
for x, y, r in ((30, 300, 60), (110, 318, 46), (200, 330, 40), (260, 336, 30), (480, 322, 44), (550, 316, 50),
                (650, 332, 34), (720, 318, 46), (800, 296, 62), (880, 290, 58)):
    parts.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{GRASS}" {st(2.6)}/>')
parts.append(f'<rect x="0" y="336" width="{W}" height="24" fill="{GRASS}"/>')

# pavement + road with straight lane markings
parts.append(f'<rect x="-4" y="356" width="{W + 8}" height="14" fill="{GREY_L}" {st(2.6)}/>')
parts.append(f'<rect x="-4" y="370" width="{W + 8}" height="84" fill="#8C96A1" {st(2.6)}/>')
parts.append(f'<line x1="0" y1="386" x2="{W}" y2="386" stroke="{WHITE}" stroke-width="6"/>')
parts.append(f'<line x1="0" y1="440" x2="{W}" y2="440" stroke="{WHITE}" stroke-width="6"/>')
for x in range(10, W, 90):
    parts.append(f'<line x1="{x}" y1="413" x2="{x + 50}" y2="413" stroke="{YELLOW}" stroke-width="6"/>')


# three street lamps standing in a straight row (feet all on y=358)
def lamp(x):
    g = [f'<rect x="{x - 5}" y="182" width="10" height="170" fill="{BLUE}" {st(2.4)}/>',
         f'<path d="M{x},186 Q{x},176 {x + 14},176 L{x + 44},176" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>',
         f'<path d="M{x},186 Q{x},176 {x + 14},176 L{x + 44},176" fill="none" stroke="{BLUE}" stroke-width="4" stroke-linecap="round"/>',
         f'<path d="M{x + 34},178 Q{x + 48},170 {x + 62},178 L{x + 60},186 L{x + 36},186 Z" fill="{BLUE}" {st(2.2)}/>',
         f'<ellipse cx="{x + 48}" cy="189" rx="10" ry="4" fill="{YELLOW}" {st(1.8)}/>',
         f'<path d="M{x - 10},358 L{x - 7},340 L{x + 7},340 L{x + 10},358 Z" fill="{BLUE}" {st(2.4)}/>']
    return ''.join(g)


for x in (120, 372, 603):
    parts.append(lamp(x))

# curved contrail behind the plane
for off in (0, 12):
    parts.append(f'<path d="M462,{22 + off} C600,{20 + off} 700,{50 + off} {740 - off},{104 + off}" fill="none" stroke="{WHITE}" stroke-width="8" stroke-linecap="round"/>')
    parts.append(f'<path d="M462,{22 + off} C600,{20 + off} 700,{50 + off} {740 - off},{104 + off}" fill="none" stroke="{SKY_D}" stroke-width="2.4" stroke-linecap="round"/>')

# plane climbing to the left
g = []
g.append(f'<path d="M318,40 Q330,26 360,20 L440,16 Q462,16 462,26 Q462,36 440,38 L352,48 Q326,50 318,40 Z" fill="{WHITE}" {st(2.6)}/>')
g.append(f'<path d="M440,18 L458,-4 L470,-2 L462,26 Z" fill="{RED}" {st(2.4)}/>')
g.append(f'<path d="M392,34 L430,62 L444,60 L420,32 Z" fill="{BLUE}" {st(2.4)}/>')
g.append(f'<path d="M398,22 L420,6 L432,8 L418,24 Z" fill="{BLUE}" {st(2.2)}/>')
for x in (340, 356, 372, 388, 404):
    g.append(f'<circle cx="{x}" cy="{31 - (x - 340) * .06:.1f}" r="3.2" fill="{SKY_D}"/>')
g.append(f'<path d="M322,36 Q326,30 334,28" fill="none" stroke="{SKY_D}" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<g transform="translate(0,14)">{"".join(g)}</g>')

save('bai25_t2_q4_street', W, H, parts)
