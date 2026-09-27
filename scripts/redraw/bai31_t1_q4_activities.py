"""
Vở BT Toán 2, Bài 31 Tiết 1 Q4 — bốn hoạt động và hai đồng hồ số A, B dưới mỗi tranh:
nét riêng. Giữ nội dung toán: tranh 1 trồng cây, tưới cây (A. 06 : 15, B. 23 : 30);
tranh 2 Rô-bốt câu cá (A. 03 : 30, B. 16 : 15); tranh 3 bạn gái xếp khối hộp
(A. 09 : 00, B. 00 : 30); tranh 4 Rô-bốt và bạn chơi bóng chuyền (A. 12 : 15, B. 17 : 30).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 807
PW, PH = 415, 262
parts = []


def clocks(x, y, a, b):
    s = [text(x + 2, y + 10, 'A.', size=26, weight=600, anchor='start'),
         digital(x + 110, y, 150, 76, a, size=36),
         text(x + 222, y + 10, 'B.', size=26, weight=600, anchor='start'),
         digital(x + 332, y, 150, 76, b, size=36)]
    return ''.join(s)


# ── tranh 1: trồng cây, tưới cây
x, y = 3, 6
g = [f'<rect x="{x}" y="{y + 190}" width="{PW}" height="80" fill="#CFE9B5"/>']
g.append(f'<ellipse cx="{x + 210}" cy="{y + 234}" rx="60" ry="12" fill="#C9956A" {st(2.4)}/>')
g.append(sapling(x + 210, y + 236, 200))
g.append(place(x + 90, y + 256, .62, person('ponytail', '#8FD3F4', '#6FB7EA', 'skirt', 'open', 12,
         arms=((70, -150), (90, -140)), band=PINK, shoe=BLUE, sleeve='short')))
g.append(f'<rect x="{x + 120}" y="{y + 158}" width="46" height="38" rx="8" fill="{GREEN}" {st()}/>'
         f'<path d="M{x + 164},{y + 180} L{x + 192},{y + 196}" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
         f'<path d="M{x + 164},{y + 180} L{x + 192},{y + 196}" stroke="{GREEN}" stroke-width="4" stroke-linecap="round"/>')
g.append(place(x + 320, y + 250, .56, person('short', '#FFD166', '#4E8FC8', 'shorts', 'smile', -12,
         arms=((-100, -110), (-70, -110)), legs='kneel', shoe=RED, sleeve='short'), flip=True))
g.append(f'<ellipse cx="{x + 270}" cy="{y + 222}" rx="16" ry="12" fill="#A98468" {st(2.4)}/>')
parts.append(panel(x, y, PW, PH, SKY, ''.join(g)))
parts.append(clocks(x + 8, y + PH + 76, '06 : 15', '23 : 30'))

# ── tranh 2: Rô-bốt câu cá
x, y = 482, 6
g = [f'<rect x="{x}" y="{y + 120}" width="{PW}" height="150" fill="#CFE9B5"/>',
     f'<path d="M{x},{y + 140} Q{x + 150},{y + 130} {x + 250},{y + 190} Q{x + 300},{y + 230} {x + 330},{y + 270} L{x},{y + 270} Z" fill="{WATER_L}" {st()}/>']
for fx, fy, c in ((x + 60, y + 200, ORANGE), (x + 140, y + 240, YELLOW), (x + 40, y + 250, RED)):
    g.append(f'<ellipse cx="{fx}" cy="{fy}" rx="18" ry="9" fill="{c}" {st(2.2)}/><path d="M{fx + 16},{fy} l12,-8 l0,16 Z" fill="{c}" {st(2.2)}/>')
g.append(place(x + 330, y + 240, .66, robot(arms=((-90, -130), (60, -80)), legs='stand', expr='down', look=-10)))
g.append(f'<path d="M{x + 264},{y + 154} L{x + 150},{y + 90}" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>'
         f'<path d="M{x + 150},{y + 90} L{x + 150},{y + 214}" stroke="{INK}" stroke-width="1.5"/>'
         f'<circle cx="{x + 150}" cy="{y + 214}" r="5" fill="{RED}" {st(1.6)}/>')
g.append(f'<path d="M{x + 250},{y + 186} L{x + 290},{y + 186} L{x + 284},{y + 226} L{x + 256},{y + 226} Z" fill="{GREY_L}" {st()}/>'
         f'<path d="M{x + 250},{y + 186} Q{x + 270},{y + 160} {x + 290},{y + 186}" fill="none" {st(2.4)}/>')
parts.append(panel(x, y, PW, PH, SKY, ''.join(g)))
parts.append(clocks(x + 8, y + PH + 76, '03 : 30', '16 : 15'))

# ── tranh 3: xếp khối hộp
x, y = 3, 414
g = [f'<rect x="{x}" y="{y + 190}" width="{PW}" height="80" fill="#F2E3F7"/>']


def cube(cx, by, s=36, c=SKY):
    d = s * .3
    return (f'<rect x="{cx - s / 2}" y="{by - s}" width="{s}" height="{s}" fill="{c}" {st(2.4)}/>'
            f'<path d="M{cx - s / 2},{by - s} l{d},{-d} h{s} l{-d},{d} Z" fill="#fff" {st(2.4)}/>'
            f'<path d="M{cx + s / 2},{by - s} l{d},{-d} v{s} l{-d},{d} Z" fill="{WATER_D}" {st(2.4)}/>')


g.append(place(x + 290, y + 256, .66, person('ponytail', '#FFB3C7', PURPLE, 'skirt', 'down', -12,
         arms=((-150, -190), (-70, -150)), legs='kneel', band=YELLOW, shoe=RED, sleeve='short'), flip=False))
g.append(cube(x + 90, y + 236))
g.append(cube(x + 150, y + 240) + cube(x + 150, y + 204) + cube(x + 150, y + 168))
g.append(cube(x + 210, y + 244))
parts.append(panel(x, y, PW, PH, '#FBF4FF', ''.join(g)))
parts.append(clocks(x + 8, y + PH + 76, '09 : 00', '00 : 30'))

# ── tranh 4: bóng chuyền
x, y = 482, 414
g = [f'<rect x="{x}" y="{y + 110}" width="{PW}" height="160" fill="#F4E3C4"/>']
g.append(f'<line x1="{x + 250}" y1="{y + 20}" x2="{x + 170}" y2="{y + 250}" stroke="{INK}" stroke-width="5"/>')
g.append(f'<path d="M{x + 250},{y + 24} L{x + 170},{y + 254} L{x + 170},{y + 180} L{x + 250},{y + 90} Z" fill="#fff" fill-opacity=".3" {st(2.4)}/>')
for i in range(1, 7):
    t = i / 7
    g.append(f'<line x1="{x + 250 - 80 * t}" y1="{y + 24 + 230 * t}" x2="{x + 250 - 80 * t}" y2="{y + 90 + 90 * t}" stroke="{INK}" stroke-width="1.4"/>')
g.append(f'<path d="M{x + 250},{y + 24} L{x + 170},{y + 254}" stroke="{INK}" stroke-width="0"/>')
g.append(place(x + 90, y + 230, .56, robot(arms=((70, -290), (-60, -80)), legs='jump', expr='open', look=6)))
g.append(f'<circle cx="{x + 140}" cy="{y + 50}" r="20" fill="#fff" {st()}/><path d="M{x + 122},{y + 44} Q{x + 140},{y + 56} {x + 158},{y + 42} M{x + 140},{y + 30} Q{x + 132},{y + 50} {x + 142},{y + 70}" fill="none" stroke="{INK}" stroke-width="2"/>')
g.append(place(x + 330, y + 244, .56, person('spiky', '#8FD3F4', '#4E8FC8', 'shorts', 'smile', -10,
         arms=((-60, -130), (-30, -120)), legs='walk', shoe=RED, sleeve='short')))
parts.append(panel(x, y, PW, PH, SKY, ''.join(g)))
parts.append(clocks(x + 8, y + PH + 76, '12 : 15', '17 : 30'))
save('bai31_t1_q4_activities', W, H, parts)
