"""
Vở BT Toán 2, Bài 54 Tiết 1 Q3 — bức tường băng (nhà tuyết) có tảng băng ghi số: nét riêng.
Giữ nội dung toán: 26 tảng băng ghi số, đúng các số và thứ tự hàng như sách
(12 số lớn hơn 435, 14 số bé hơn 435); các tảng không ghi số để trống. Tảng băng để
màu trắng (bé tô màu trên giấy).
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 800, 567
CX, BASE, RX, RY = 400, 552, 392, 532
TOP = BASE - RY
ROWH = RY / 7
ICE, ICE_D = '#F4FAFE', '#CFE6F4'
DOOR_L, DOOR_R, DOOR_TOP = 272, 528, 292

# rows top→bottom; each row: list of segments, a segment = (x_from, x_to, [(label, weight), ...]); None = dome edge
ROWS = [
    [(None, None, [('', .6), ('423', 1), ('689', 1), ('', .6)])],
    [(None, None, [('', .5), ('808', 1), ('182', 1), ('31', 1), ('181', 1), ('', .5)])],
    [(None, None, [('', .35), ('57', .8), ('383', 1), ('40', 1), ('712', 1), ('453', .8), ('', .35)])],
    [(None, None, [('', .5), ('216', 1), ('45', .9), ('', .7), ('645', .9), ('294', 1), ('', .5)])],
    [(None, DOOR_L, [('', .25), ('344', 1), ('855', 1)]), (DOOR_R, None, [('1 000', 1.1), ('216', 1), ('', .25)])],
    [(None, DOOR_L, [('', .5), ('470', 1), ('', .5)]), (DOOR_R, None, [('18', .7), ('451', 1), ('', .5)])],
    [(None, DOOR_L, [('', .2), ('566', 1), ('234', 1)]), (DOOR_R, None, [('999', 1), ('720', 1), ('', .2)])],
]


def half_width(y):
    d = (BASE - y) / RY
    return RX * math.sqrt(max(0, 1 - d * d))


dome = f'M{CX - RX},{BASE} A{RX},{RY} 0 0 1 {CX + RX},{BASE} Z'
parts = [f'<defs><clipPath id="dome"><path d="{dome}"/></clipPath></defs>',
         f'<path d="{dome}" fill="{ICE_D}"/>',
         '<g clip-path="url(#dome)">']
labels = []
for i, row in enumerate(ROWS):
    y0 = TOP + i * ROWH
    hw = half_width(y0 + ROWH * .5) + 30
    for x0, x1, bricks in row:
        a = CX - hw if x0 is None else x0
        b = CX + hw if x1 is None else x1
        tot = sum(w for _, w in bricks)
        x = a
        for lab, w in bricks:
            bw = (b - a) * w / tot
            parts.append(f'<rect x="{x + 3:.1f}" y="{y0 + 3:.1f}" width="{bw - 6:.1f}" height="{ROWH - 6:.1f}" rx="12" fill="{ICE}" {st(2.6)}/>')
            if lab:
                labels.append(text(f'{x + bw / 2:.1f}', f'{y0 + ROWH / 2 + 11:.1f}', lab, size=31, weight=600))
            x += bw
parts.append('</g>')
parts.append(f'<path d="{dome}" fill="none" {st(3.4)}/>')
# door: thick ice arch with a dark opening
ow = 26
arch = (f'M{DOOR_L},{BASE} L{DOOR_L},{DOOR_TOP + 110} C{DOOR_L},{DOOR_TOP - 12} {DOOR_R},{DOOR_TOP - 12} {DOOR_R},{DOOR_TOP + 110} L{DOOR_R},{BASE} Z')
inner = (f'M{DOOR_L + ow},{BASE} L{DOOR_L + ow},{DOOR_TOP + 120} C{DOOR_L + ow},{DOOR_TOP + 20} {DOOR_R - ow},{DOOR_TOP + 20} {DOOR_R - ow},{DOOR_TOP + 120} L{DOOR_R - ow},{BASE} Z')
parts.append(f'<path d="{arch}" fill="{ICE}" {st(3)}/>')
parts.append(f'<path d="{inner}" fill="#5B7A99" {st(3)}/>')
parts += labels
parts.append(f'<line x1="0" y1="{BASE}" x2="{W}" y2="{BASE}" {st(3)}/>')
save('bai54_t1_q3_igloo', W, H, parts)
