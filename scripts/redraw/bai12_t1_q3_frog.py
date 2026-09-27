"""
Vở BT Toán 2, Bài 12 Tiết 1 Q3 — chú ếch số 9 và sáu lá sen: nét riêng.
Giữ nội dung toán: ếch mang số 9 ở giữa, sáu lá sen nối dây về ếch, mỗi lá
một phép trừ "a − ô": mẫu 12 − 3 (ô đã điền 3), còn lại 11, 16, 18, 17, 13 với ô trống.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 459
PAD, PAD_D, PAD_L = '#8FD27E', '#4FA85A', '#B9E6A6'
VINE = '#6BBF6A'
FX, FY = 430, 232          # frog centre

# (pad cx, cy, number, box x, box y, filled)
PADS = [
    (165, 72, '12', 165, 40, '3'),
    (700, 84, '11', 692, 52, None),
    (114, 232, '16', 92, 200, None),
    (784, 228, '18', 778, 196, None),
    (178, 378, '17', 186, 346, None),
    (705, 386, '13', 702, 354, None),
]


def pad(cx, cy):
    rx, ry = 104, 54
    # lily pad with a small notch cut in from the top-right edge
    import math
    a1, a2 = math.radians(-62), math.radians(-44)
    p1 = (cx + rx * math.cos(a1), cy + ry * math.sin(a1))
    p2 = (cx + rx * math.cos(a2), cy + ry * math.sin(a2))
    hub = (cx + 34, cy - 16)
    s = [f'<ellipse cx="{cx}" cy="{cy + 5}" rx="{rx + 8}" ry="{ry + 6}" fill="{WATER_L}" opacity=".85"/>',
         f'<path d="M{p1[0]:.1f},{p1[1]:.1f} L{hub[0]},{hub[1]} L{p2[0]:.1f},{p2[1]:.1f} '
         f'A{rx},{ry} 0 1 1 {p1[0]:.1f},{p1[1]:.1f} Z" fill="{PAD}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>']
    for deg in (0, 40, 90, 140, 180, 220):
        a = math.radians(deg)
        s.append(f'<path d="M{hub[0]},{hub[1]} L{cx + (rx - 14) * math.cos(a):.1f},{cy + (ry - 10) * math.sin(a):.1f}" '
                 f'fill="none" stroke="{PAD_D}" stroke-width="2" stroke-linecap="round" opacity=".3"/>')
    return '\n'.join(s)


def frog(x, y):
    g, gd, belly = '#7ED07A', '#3E9A4E', '#E9F7C9'
    s = []
    # back legs
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 22},{y + 20} C{x + sx * 58},{y + 12} {x + sx * 62},{y + 44} {x + sx * 38},{y + 48} Z" fill="{g}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
        s.append(f'<ellipse cx="{x + sx * 44}" cy="{y + 50}" rx="15" ry="6" fill="{g}" stroke="{INK}" stroke-width="2.4"/>')
    # body
    s.append(f'<ellipse cx="{x}" cy="{y + 14}" rx="38" ry="36" fill="{g}" stroke="{INK}" stroke-width="2.8"/>')
    s.append(f'<ellipse cx="{x}" cy="{y + 20}" rx="24" ry="24" fill="{belly}"/>')
    # front legs
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 16},{y + 26} L{x + sx * 18},{y + 50}" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>')
        s.append(f'<path d="M{x + sx * 16},{y + 26} L{x + sx * 18},{y + 50}" stroke="{g}" stroke-width="6" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="{x + sx * 19}" cy="{y + 52}" rx="9" ry="4.5" fill="{g}" stroke="{INK}" stroke-width="2"/>')
    # head
    hy = y - 30
    s.append(f'<ellipse cx="{x}" cy="{hy}" rx="44" ry="26" fill="{g}" stroke="{INK}" stroke-width="2.8"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{x + sx * 22}" cy="{hy - 22}" r="15" fill="{g}" stroke="{INK}" stroke-width="2.6"/>')
        s.append(f'<circle cx="{x + sx * 22}" cy="{hy - 22}" r="9.5" fill="{WHITE}"/>')
        s.append(f'<circle cx="{x + sx * 22 + 1}" cy="{hy - 21}" r="5.5" fill="{INK}"/><circle cx="{x + sx * 22 + 2.8}" cy="{hy - 23}" r="1.8" fill="{WHITE}"/>')
        s.append(f'<ellipse cx="{x + sx * 30}" cy="{hy + 6}" rx="6" ry="4" fill="{PINK}" opacity=".8"/>')
    s.append(f'<path d="M{x - 22},{hy + 4} Q{x},{hy + 20} {x + 22},{hy + 4}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(text(x, y + 30, '9', size=30, weight=700))
    return '\n'.join(s)


parts = [f'<rect width="{W}" height="{H}" fill="{WHITE}"/>']
# vines from each pad to the frog (drawn first, under pads & frog)
for cx, cy, *_ in PADS:
    ex = cx + (60 if cx < FX else -60)
    ey = cy + (30 if cy < FY else (-30 if cy > FY else 0))
    mx, my = (ex + FX) / 2, (ey + FY) / 2 + (18 if cy < FY else -18)
    d = f'M{ex},{ey} Q{mx},{my} {FX + (-22 if cx < FX else 22)},{FY + 8}'
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>')
    parts.append(f'<path d="{d}" fill="none" stroke="{VINE}" stroke-width="5" stroke-linecap="round"/>')
for cx, cy, n, bx, by, val in PADS:
    parts.append(pad(cx, cy))
    parts.append(text(bx - 8, by + 41, f'{n} −', size=28, weight=700, anchor='end'))
    parts.append(f'<rect x="{bx}" y="{by}" width="62" height="62" rx="10" fill="{WHITE}" stroke="{INK}" stroke-width="3"/>')
    if val:
        parts.append(text(bx + 31, by + 42, val, size=30, weight=600))
parts.append(frog(FX, FY))
save('bai12_t1_q3_frog', W, H, parts)
