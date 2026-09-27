"""
Luyện tập Toán 3, Tuần 3 Tiết 2 Q1a — dãy khối lặp lại: trụ, lập phương, cầu, hộp chữ nhật (×2),
"?", lập phương, cầu, hộp chữ nhật; đáp án A. lập phương, B. cầu, C. trụ, D. hộp chữ nhật.
Giữ đúng thứ tự và nhãn; vẽ lại khối bằng nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 1480, 395
C_FRONT, C_TOP, C_SIDE = '#6FB7EA', '#A9D6F5', '#4C9AD6'
SW = 4
parts = [f'<defs><radialGradient id="sph" cx=".35" cy=".35" r=".75"><stop offset="0" stop-color="#D6ECFB"/>'
         f'<stop offset=".5" stop-color="{C_FRONT}"/><stop offset="1" stop-color="#3F86C4"/></radialGradient></defs>']


def box(cx, by, w, h, d):
    """khối hộp: mặt trước w×h, đáy giữa ở (cx, by), chiều sâu d (lệch lên phải)"""
    x0, y0 = cx - (w + d) / 2, by
    dy = d * 0.8
    front = f'{x0},{y0} {x0 + w},{y0} {x0 + w},{y0 - h} {x0},{y0 - h}'
    top = f'{x0},{y0 - h} {x0 + w},{y0 - h} {x0 + w + d},{y0 - h - dy} {x0 + d},{y0 - h - dy}'
    side = f'{x0 + w},{y0} {x0 + w + d},{y0 - dy} {x0 + w + d},{y0 - h - dy} {x0 + w},{y0 - h}'
    return ''.join(f'<polygon points="{p}" fill="{c}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>'
                   for p, c in ((front, C_FRONT), (top, C_TOP), (side, C_SIDE)))


def cube(cx, by, a=78):
    return box(cx, by, a, a, a * 0.36)


def tall(cx, by):
    return box(cx, by, 66, 118, 30)


def cyl(cx, by, w=92, h=80):
    rx, ry = w / 2, w * 0.17
    return (f'<path d="M{cx - rx},{by - h} L{cx - rx},{by} A{rx},{ry} 0 0 0 {cx + rx},{by} L{cx + rx},{by - h} Z" '
            f'fill="{C_FRONT}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>'
            f'<ellipse cx="{cx}" cy="{by - h}" rx="{rx}" ry="{ry}" fill="{C_TOP}" stroke="{INK}" stroke-width="{SW}"/>')


def sphere(cx, by, r=50):
    return (f'<circle cx="{cx}" cy="{by - r}" r="{r}" fill="url(#sph)" stroke="{INK}" stroke-width="{SW}"/>'
            f'<ellipse cx="{cx - r * .35}" cy="{by - r * 1.4}" rx="{r * .18}" ry="{r * .11}" fill="{WHITE}" opacity=".8" transform="rotate(-35 {cx - r * .35} {by - r * 1.4})"/>')


B1 = 168
seq = [cyl(66, B1), cube(190, B1), sphere(320, B1), tall(438, B1),
       cyl(560, B1), cube(684, B1), sphere(806, B1), tall(924, B1)]
parts += seq
parts.append(text(1042, 138, '?', size=56, weight=700))
parts += [cube(1160, B1), sphere(1282, B1), tall(1400, B1)]

B2 = 374
for lx, lab, shape in ((22, 'A.', cube(140, B2)), (428, 'B.', sphere(546, B2)),
                       (778, 'C.', cyl(892, B2)), (1122, 'D.', tall(1240, B2))):
    parts.append(text(lx, B2 - 4, lab, size=54, weight=600, anchor='start'))
    parts.append(shape)
save('tuan3_t2_q1a_shapes', W, H, parts, folder='grade3-practice')
