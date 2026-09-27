"""
Vở BT Toán 2, Bài 37 Tiết 1 Q3 — bốn chiếc quạt, mỗi quạt 3 cánh: nét riêng.
Giữ nội dung toán: 4 quạt, mỗi quạt đúng 3 cánh; rô-bốt hỏi
"Có tất cả bao nhiêu cánh quạt?".
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 256
parts = []


def fan(cx, cy, r=70, blade=BLUE):
    g = []
    # stand and base
    g.append(f'<path d="M{cx - 10},{cy + 30} L{cx - 16},{cy + 120} L{cx + 16},{cy + 120} L{cx + 10},{cy + 30} Z" fill="{GREY_L}" {st(2.6)}/>')
    g.append(f'<path d="M{cx - 46},{cy + 138} Q{cx - 44},{cy + 116} {cx},{cy + 116} Q{cx + 44},{cy + 116} {cx + 46},{cy + 138} Z" fill="{SKY_D}" {st(2.6)}/>')
    g.append(f'<circle cx="{cx + 26}" cy="{cy + 128}" r="4" fill="{WHITE}" {st(1.6)}/>')
    # cage back
    g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#F4FAFD" {st(2.8)}/>')
    # three blades
    for a in (-90, 30, 150):
        g.append(f'<path d="M0,0 C{-r * .42},{-r * .3} {-r * .38},{-r * .9} 0,{-r * .86} C{r * .38},{-r * .9} {r * .42},{-r * .3} 0,0 Z" '
                 f'fill="{blade}" {st(2.4)} transform="translate({cx},{cy}) rotate({a + 90})"/>')
    # cage front: thin rings and spokes
    g.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .6}" fill="none" stroke="{GREY}" stroke-width="1.4"/>')
    for k in range(16):
        a = math.radians(k * 22.5)
        g.append(f'<line x1="{cx + r * .2 * math.cos(a):.1f}" y1="{cy + r * .2 * math.sin(a):.1f}" x2="{cx + r * math.cos(a):.1f}" y2="{cy + r * math.sin(a):.1f}" stroke="{GREY}" stroke-width="1.2"/>')
    g.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" {st(2.8)}/>')
    g.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .22}" fill="{GREY}" {st(2.4)}/>')
    return ''.join(g)


for i, c in enumerate((BLUE, PINK, TEAL, ORANGE)):
    parts.append(fan(80 + i * 154, 102, 70, c))

# robot with a speech bubble
parts.append(mini_robot(700, 250, .95))
BUB = '#29A9E0'
parts.append(f'<path d="M716,98 L700,130 L740,100 Z" fill="{WHITE}" stroke="{BUB}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<ellipse cx="770" cy="54" rx="124" ry="50" fill="{WHITE}" stroke="{BUB}" stroke-width="3"/>')
parts.append(f'<path d="M717,97 L739,99" stroke="{WHITE}" stroke-width="5"/>')
parts.append(text(770, 46, 'Có tất cả bao nhiêu', size=22, weight=600, extra=' font-style="italic"'))
parts.append(text(770, 76, 'cánh quạt?', size=22, weight=600, extra=' font-style="italic"'))

save('bai37_t1_q3_fans', W, H, parts)
