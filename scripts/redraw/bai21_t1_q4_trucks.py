"""
Vở BT Toán 2, Bài 21 Tiết 1 Q4 — hai xe cứu hoả, mỗi xe lấy nước ở các bình trên đường đi: nét riêng.
Giữ nội dung toán: ô trống trước mỗi xe; đường trên có bình 48 l (trên chỗ gồ) và 32 l;
đường dưới có bình 30 l và 39 l (trong chỗ trũng); đám cháy ở cuối hai đường bên phải.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *
from kit_liquid import litre

W, H = 900, 365
parts = []
ROAD = '#D5DBE1'

# empty tick boxes (part of the question)
for y in (140, 283):
    parts.append(f'<rect x="6" y="{y}" width="36" height="36" rx="6" fill="{WHITE}" {st(2.6)}/>')

# roads
UP = [(262, 191), (340, 191), (340, 137), (452, 137), (452, 191), (548, 191), (548, 137), (612, 137), (612, 191), (724, 191)]
LOW = [(262, 306), (318, 306), (318, 350), (684, 350), (684, 306), (724, 306)]
parts.append(corridor(UP, 16, fill=ROAD))
parts.append(corridor(LOW, 16, fill=ROAD))


def drum(x0, x1, bottom, top, n):
    """water drum standing on y=bottom"""
    w, cx = x1 - x0, (x0 + x1) / 2
    g = [f'<rect x="{x0}" y="{top + 8}" width="{w}" height="{bottom - top - 8}" rx="14" fill="#8FD0F2" {st(2.8)}/>',
         f'<rect x="{cx - w * .22}" y="{top}" width="{w * .44}" height="12" rx="4" fill="{BLUE}" {st(2.4)}/>',
         f'<line x1="{x0 + 3}" y1="{top + 24}" x2="{x1 - 3}" y2="{top + 24}" stroke="#5FAFD8" stroke-width="3"/>',
         f'<line x1="{x0 + 3}" y1="{bottom - 14}" x2="{x1 - 3}" y2="{bottom - 14}" stroke="#5FAFD8" stroke-width="3"/>',
         f'<rect x="{x0 + 8}" y="{(top + bottom) / 2 - 16}" width="{w - 16}" height="36" rx="8" fill="{WHITE}" {st(2)}/>',
         text(cx, (top + bottom) / 2 + 11, litre(n), size=26, weight=600)]
    return ''.join(g)


parts.append(drum(350, 444, 127, 8, 48))
parts.append(drum(640, 716, 181, 80, 32))
parts.append(drum(364, 436, 340, 254, 30))
parts.append(drum(534, 626, 340, 234, 39))


def fire_truck(x, y):
    """x = rear, y = ground; faces right, ~190 wide"""
    g = []
    g.append(f'<rect x="{x}" y="{y - 70}" width="118" height="54" rx="6" fill="{RED}" {st(2.8)}/>')
    g.append(f'<path d="M{x + 118},{y - 16} L{x + 118},{y - 72} L{x + 160},{y - 72} L{x + 186},{y - 44} L{x + 186},{y - 16} Z" fill="{RED}" {st(2.8)}/>')
    g.append(f'<path d="M{x + 128},{y - 64} L{x + 156},{y - 64} L{x + 174},{y - 44} L{x + 128},{y - 44} Z" fill="{SKY}" {st(2.2)}/>')
    g.append(f'<rect x="{x + 176}" y="{y - 34}" width="14" height="10" rx="3" fill="{YELLOW}" {st(2)}/>')
    g.append(f'<rect x="{x + 136}" y="{y - 82}" width="16" height="10" rx="4" fill="{BLUE}" {st(2)}/>')
    # ladder on top
    g.append(f'<rect x="{x + 6}" y="{y - 84}" width="104" height="12" rx="2" fill="{GREY_L}" {st(2.2)}/>')
    for k in range(1, 7):
        g.append(f'<line x1="{x + 6 + k * 15}" y1="{y - 84}" x2="{x + 6 + k * 15}" y2="{y - 72}" {st(1.8)}/>')
    # hose reel and white stripe
    g.append(f'<rect x="{x}" y="{y - 36}" width="186" height="8" fill="{WHITE}" {st(1.8)}/>')
    g.append(f'<circle cx="{x + 40}" cy="{y - 50}" r="14" fill="{YELLOW}" {st(2.4)}/><circle cx="{x + 40}" cy="{y - 50}" r="5" fill="{ORANGE}" {st(1.8)}/>')
    g.append(f'<rect x="{x + 70}" y="{y - 62}" width="36" height="20" rx="3" fill="#E85A50" {st(2)}/>')
    for wx in (x + 40, x + 150):
        g.append(f'<circle cx="{wx}" cy="{y - 12}" r="16" fill="{INK}"/><circle cx="{wx}" cy="{y - 12}" r="7" fill="{GREY}"/>')
    return ''.join(g)


parts.append(fire_truck(56, 200))
parts.append(fire_truck(56, 342))


# the fire at the end of both roads: trees with flames
def flame(x, y, s, c1=ORANGE, c2=YELLOW):
    d = f'M{x},{y} C{x - 26 * s},{y - 10 * s} {x - 22 * s},{y - 44 * s} {x - 6 * s},{y - 70 * s} C{x - 4 * s},{y - 48 * s} {x + 8 * s},{y - 46 * s} {x + 10 * s},{y - 80 * s} C{x + 30 * s},{y - 52 * s} {x + 30 * s},{y - 14 * s} {x},{y} Z'
    d2 = f'M{x},{y - 4 * s} C{x - 12 * s},{y - 10 * s} {x - 10 * s},{y - 30 * s} {x},{y - 44 * s} C{x + 12 * s},{y - 30 * s} {x + 14 * s},{y - 10 * s} {x},{y - 4 * s} Z'
    return f'<path d="{d}" fill="{c1}" {st(2.4)}/><path d="{d2}" fill="{c2}"/>'


for x, y, h in ((770, 280, 120), (820, 276, 150), (870, 282, 118), (744, 290, 80), (896, 290, 90)):
    parts.append(pine(x, y, h, c=GREEN))
for x, y, s in ((760, 200, 1.1), (812, 170, 1.4), (864, 200, 1.2), (740, 268, .8), (840, 262, 1.0), (890, 262, .8)):
    parts.append(flame(x, y, s, RED if s > 1.3 else ORANGE))
parts.append(f'<path d="M726,296 L900,296" {st(2.4)}/>')

save('bai21_t1_q4_trucks', W, H, parts)
