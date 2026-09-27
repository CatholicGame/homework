"""
Vở BT Toán 2, Bài 23 Tiết 2 Q5 — đường đi của bạn khỉ tới món ăn: nét riêng.
Giữ nội dung toán: từ chỗ khỉ rẽ đôi "30 – 7" (lên) / "30 – 6" (xuống).
Nhánh trên rẽ "32 – 15" -> chuối, "40 – 15" -> dừa.
Nhánh dưới rẽ "63 – 38" -> ngô, "63 – 30" -> mía.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *
from kit_measure import banana_bunch

W, H = 900, 403
parts = []
ROAD = '#E4E8EC'

ROADS = [
    'M110,290 C200,280 250,222 300,190 C330,170 342,150 352,128',
    'M352,128 C336,108 314,92 292,72',
    'M352,128 C400,98 462,110 560,100 C620,94 660,86 704,86',
    'M110,292 C220,304 300,324 420,324 C500,324 560,318 592,300',
    'M592,300 C602,262 622,232 662,226 C700,220 718,220 732,220',
    'M592,300 C622,330 680,346 790,346',
]
parts.append(f'<ellipse cx="130" cy="292" rx="60" ry="34" fill="{INK}"/>')
for d in ROADS:
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="56" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="130" cy="292" rx="56" ry="30" fill="{ROAD}"/>')
for d in ROADS:
    parts.append(f'<path d="{d}" fill="none" stroke="{ROAD}" stroke-width="50" stroke-linecap="round"/>')


def lab(x, y, s, rot=0):
    return f'<g transform="translate({x},{y}) rotate({rot})">{text(0, 9, s, size=26, weight=600)}</g>'


parts += [lab(252, 232, '30 – 7', -38), lab(326, 106, '32 – 15', 40), lab(500, 104, '40 – 15', -4),
          lab(300, 318, '30 – 6', 8), lab(652, 232, '63 – 38', -10), lab(720, 346, '63 – 30')]

# foods at the four ends
parts.append(f'<g transform="translate(262,4) rotate(160)">{banana_bunch(0, 0, 130, 5)}</g>')
for cx, cy, r in ((738, 92, 28), (768, 70, 24)):
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#8CC66A" {st(2.6)}/>')
    parts.append(f'<circle cx="{cx - r * .3}" cy="{cy - r * .3}" r="{r * .25}" fill="#B8E09A"/>')
parts.append(f'<path d="M780,50 q10,-12 22,-10" fill="none" stroke="{GRASS_D}" stroke-width="3" stroke-linecap="round"/>')
# corn cob
parts.append(f'<g transform="translate(780,212) rotate(-12)">'
             f'<ellipse cx="0" cy="0" rx="42" ry="15" fill="{YELLOW}" {st(2.6)}/>'
             + ''.join(f'<line x1="{x}" y1="-13" x2="{x}" y2="13" stroke="#E9B949" stroke-width="2"/>' for x in (-24, -12, 0, 12, 24))
             + f'<path d="M-30,6 Q-60,20 -76,6 Q-50,-2 -34,-4 Z" fill="{GREEN}" {st(2.2)}/>'
             f'<path d="M-30,-6 Q-56,-24 -72,-12 Q-50,0 -34,4 Z" fill="{GRASS}" {st(2.2)}/></g>')
# sugarcane stalks
for x, h in ((816, 150), (840, 172), (864, 140)):
    top = 390 - h
    parts.append(f'<rect x="{x - 7}" y="{top}" width="14" height="{h}" rx="5" fill="#9B6BB5" {st(2.4)}/>')
    for y in range(top + 30, 390, 32):
        parts.append(f'<line x1="{x - 7}" y1="{y}" x2="{x + 7}" y2="{y}" {st(2)}/>')
    parts.append(f'<path d="M{x},{top + 4} Q{x - 30},{top - 20} {x - 40},{top + 6} M{x},{top + 4} Q{x + 26},{top - 26} {x + 38},{top}" fill="none" stroke="{GRASS_D}" stroke-width="5" stroke-linecap="round"/>')

# branch with vine, monkey hanging on and sitting at the start
parts.append(f'<path d="M0,40 Q120,48 220,44" fill="none" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>')
parts.append(f'<path d="M0,40 Q120,48 220,44" fill="none" stroke="{BROWN}" stroke-width="10" stroke-linecap="round"/>')
parts.append(f'<path d="M118,48 Q108,110 122,168" fill="none" stroke="{GRASS_D}" stroke-width="4"/>')
for x, y in ((112, 84), (118, 124), (60, 64), (180, 64)):
    parts.append(f'<ellipse cx="{x}" cy="{y}" rx="9" ry="5" fill="{GREEN}" {st(1.8)} transform="rotate(30 {x} {y})"/>')


def monkey(x, y):
    """x,y = seat point"""
    g, fur, face = [], '#A0704A', '#F3D2AE'
    g.append(f'<path d="M{x - 20},{y - 6} C{x - 60},{y} {x - 64},{y - 40} {x - 44},{y - 50}" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>')
    g.append(f'<path d="M{x - 20},{y - 6} C{x - 60},{y} {x - 64},{y - 40} {x - 44},{y - 50}" fill="none" stroke="{fur}" stroke-width="4" stroke-linecap="round"/>')
    for dx in (-12, 16):
        g.append(f'<ellipse cx="{x + dx}" cy="{y}" rx="13" ry="8" fill="{fur}" {st(2.2)}/>')
    g.append(f'<ellipse cx="{x}" cy="{y - 30}" rx="24" ry="28" fill="{fur}" {st(2.4)}/>')
    g.append(f'<ellipse cx="{x + 2}" cy="{y - 26}" rx="14" ry="18" fill="{face}"/>')
    # arm up to the vine, other arm waving
    g.append(f'<path d="M{x - 6},{y - 50} L{x - 2},{y - 108}" stroke="{INK}" stroke-width="11" stroke-linecap="round"/><path d="M{x - 6},{y - 50} L{x - 2},{y - 108}" stroke="{fur}" stroke-width="7" stroke-linecap="round"/>')
    g.append(f'<path d="M{x + 18},{y - 40} L{x + 50},{y - 62}" stroke="{INK}" stroke-width="11" stroke-linecap="round"/><path d="M{x + 18},{y - 40} L{x + 50},{y - 62}" stroke="{fur}" stroke-width="7" stroke-linecap="round"/>')
    g.append(f'<circle cx="{x + 52}" cy="{y - 64}" r="7" fill="{face}" {st(2)}/>')
    hy = y - 72
    for sx in (-1, 1):
        g.append(f'<circle cx="{x + sx * 24}" cy="{hy}" r="9" fill="{face}" {st(2.2)}/>')
    g.append(f'<circle cx="{x}" cy="{hy}" r="22" fill="{fur}" {st(2.4)}/>')
    g.append(f'<path d="M{x - 16},{hy + 2} Q{x - 16},{hy - 14} {x},{hy - 10} Q{x + 16},{hy - 14} {x + 16},{hy + 2} Q{x + 16},{hy + 18} {x},{hy + 18} Q{x - 16},{hy + 18} {x - 16},{hy + 2} Z" fill="{face}"/>')
    for sx in (-1, 1):
        g.append(eye(x + sx * 7, hy - 2, 3))
    g.append(smile(x, hy + 9, 10))
    g.append(f'<circle cx="{x - 2}" cy="{y - 110}" r="7" fill="{face}" {st(2)}/>')
    return ''.join(g)


parts.append(monkey(120, 282))

save('bai23_t2_q5_monkey', W, H, parts)
