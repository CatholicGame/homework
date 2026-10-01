"""Vở BT Toán 3 Tập hai, Bài 68 Tiết 2 Q1 — ba khay bánh kẹo và giá (nét riêng), cùng ba hình nhỏ
dùng trong chỗ chấm. Giữ nội dung toán: khay 1 = bánh mì + bánh vòng + kẹo gậy, 10 000 đồng;
khay 2 = bánh vòng + bánh mì, 5 000 đồng; khay 3 = bánh mì, 3 000 đồng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

BREAD, BREAD_D = '#F2C27B', '#C98E3F'


def bread(cx, cy, s=1.0):
    return (f'<g transform="translate({cx},{cy}) scale({s}) rotate(-8)">'
            f'<path d="M-62,6 Q-66,-26 -20,-30 L30,-30 Q70,-26 62,8 Q56,26 0,26 Q-58,26 -62,6 Z" fill="{BREAD}" {st(2.8)}/>'
            + ''.join(f'<path d="M{x},-20 q10,8 16,20" fill="none" stroke="{BREAD_D}" stroke-width="4" stroke-linecap="round"/>' for x in (-36, -10, 16))
            + '</g>')


def donut(cx, cy, s=1.0):
    o = [f'<g transform="translate({cx},{cy}) scale({s})">',
         f'<ellipse cx="0" cy="0" rx="42" ry="30" fill="#E9B872" {st(2.8)}/>',
         f'<path d="M-38,-4 Q-36,-26 0,-27 Q36,-26 38,-4 Q30,8 18,4 Q10,14 0,6 Q-12,14 -20,4 Q-32,10 -38,-4 Z" fill="{PINK}" {st(2.4)}/>',
         f'<ellipse cx="0" cy="-3" rx="12" ry="7" fill="#fff" {st(2.4)}/>']
    for (x, y, c) in ((-24, -12, YELLOW), (-8, -20, TEAL), (16, -18, '#fff'), (26, -8, YELLOW), (-28, 0, '#fff'), (10, -12, RED)):
        o.append(f'<rect x="{x}" y="{y}" width="7" height="3" rx="1.5" fill="{c}" transform="rotate(30 {x} {y})"/>')
    o.append('</g>')
    return ''.join(o)


def candy(cx, cy, s=1.0):
    return (f'<g transform="translate({cx},{cy}) scale({s})">'
            f'<path d="M6,50 L6,-14 Q6,-40 -16,-40 Q-38,-40 -38,-18" fill="none" stroke="{INK}" stroke-width="16" stroke-linecap="round"/>'
            f'<path d="M6,50 L6,-14 Q6,-40 -16,-40 Q-38,-40 -38,-18" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round"/>'
            f'<path d="M6,50 L6,-14 Q6,-40 -16,-40 Q-38,-40 -38,-18" fill="none" stroke="{RED}" stroke-width="10" stroke-dasharray="7 7"/>'
            f'<path d="M6,14 l-16,-10 0,20 z M6,14 l16,-10 0,20 z" fill="{TEAL}" {st(2)}/></g>')


def tag(cx, y, s):
    w = 150
    return (f'<path d="M{cx - w / 2 - 14},{y + 36} L{cx - w / 2},{y} L{cx + w / 2},{y} L{cx + w / 2},{y + 36} Z" fill="#fff" {st(2.4)}/>'
            f'<path d="M{cx - w / 2 - 14},{y + 36} L{cx - w / 2},{y} L{cx - w / 2},{y + 36} Z" fill="{GREY}" {st(2)}/>'
            + text(cx + 6, y + 26, s, size=21, weight=600))


W, H = 780, 250
PW = 240
parts = []
for i, price in enumerate(['10 000 đồng', '5 000 đồng', '3 000 đồng']):
    x = 10 + i * (PW + 15)
    parts.append(f'<rect x="{x}" y="8" width="{PW}" height="{H - 16}" rx="18" fill="#CDEBFA" stroke="#3FA7DC" stroke-width="3"/>')
    parts.append(tag(x + PW / 2, H - 70, price))
x = 10
parts += [bread(x + 80, 80, .95), donut(x + 130, 140, .85), candy(x + 200, 90, .85)]
x = 10 + PW + 15
parts += [donut(x + 70, 60, .8), bread(x + 140, 130, 1.0)]
x = 10 + 2 * (PW + 15)
parts += [bread(x + 120, 100, 1.0)]
save('bai68_t2_q1_sweets', W, H, parts, folder=FOLDER)

save('bai68_t2_q1_bread', 140, 70, [bread(70, 36, 1.0)], folder=FOLDER)
save('bai68_t2_q1_donut', 100, 70, [donut(50, 36, 1.0)], folder=FOLDER)
save('bai68_t2_q1_candy', 70, 110, [candy(40, 56, 1.0)], folder=FOLDER)
