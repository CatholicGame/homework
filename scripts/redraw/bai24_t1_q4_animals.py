"""
Vở BT Toán 2, Bài 24 Tiết 1 Q4 — nhím, chuột, sóc kể số hạt dẻ: nét riêng.
Giữ nội dung toán: ba lời thoại đúng như sách — nhím "Tớ có 35 hạt dẻ.", chuột
"Tớ có 40 hạt dẻ.", sóc "Số hạt dẻ của tớ nhiều hơn của nhím nhưng ít hơn của chuột."
Không vẽ thêm hạt dẻ nào (để bé không đếm nhầm).
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 240
BUB = '#29A9E0'


def bubble(x, y, w, h, tail, lines, size=22):
    """speech bubble with its box top-left at x,y; tail = (tx, ty) point it aims at"""
    cx, cy = x + w / 2, y + h / 2
    tx, ty = tail
    # tail: a small wedge from the bubble's bottom toward the speaker
    bx = min(max(tx, x + w * 0.2), x + w * 0.8)
    s = [f'<path d="M{bx - 14},{y + h - 6} L{tx},{ty} L{bx + 12},{y + h - 4} Z" fill="{WHITE}" stroke="{BUB}" stroke-width="3" stroke-linejoin="round"/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h / 2}" fill="{WHITE}" stroke="{BUB}" stroke-width="3"/>',
         f'<path d="M{bx - 12},{y + h - 1.5} L{bx + 10},{y + h - 1.5}" stroke="{WHITE}" stroke-width="4"/>']
    lh = size * 1.25
    y0 = cy - (len(lines) - 1) * lh / 2 + size * 0.35
    for i, t in enumerate(lines):
        s.append(text(cx, f'{y0 + i * lh:.1f}', t, size=size, weight=600))
    return '\n'.join(s)


def hedgehog(x, y):
    """x,y = feet centre; faces right"""
    s = []
    spikes = []
    n = 13
    for i in range(n + 1):
        a = math.pi + math.pi * i / n          # from left, over the top, to the right
        r = 62 if i % 2 == 0 else 44
        spikes.append(f'{x - 6 + r * math.cos(a):.1f},{y - 22 + r * math.sin(a) * 0.9:.1f}')
    s.append(f'<polygon points="{" ".join(spikes)} {x + 50},{y - 22} {x - 68},{y - 22}" fill="#8A6A55" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x - 6}" cy="{y - 18}" rx="52" ry="22" fill="#A98468" stroke="{INK}" stroke-width="2.4"/>')
    # face poking out to the right
    s.append(f'<path d="M{x + 22},{y - 44} C{x + 50},{y - 50} {x + 70},{y - 30} {x + 76},{y - 22} C{x + 66},{y - 10} {x + 40},{y - 4} {x + 22},{y - 8} Z" fill="{CREAM}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{x + 78}" cy="{y - 22}" r="5" fill="{INK}"/>')
    s.append(f'<circle cx="{x + 46}" cy="{y - 30}" r="4" fill="{INK}"/><circle cx="{x + 47.5}" cy="{y - 31.5}" r="1.4" fill="{WHITE}"/>')
    s.append(f'<circle cx="{x + 52}" cy="{y - 17}" r="5" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M{x + 58},{y - 13} q6,4 12,-1" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    for dx in (-30, 0, 24):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 2}" rx="9" ry="5" fill="{CREAM}" stroke="{INK}" stroke-width="1.8"/>')
    return '\n'.join(s)


def mouse(x, y):
    """x,y = feet centre; standing, waving"""
    g, gl = '#A7B1BC', '#E8ECF0'
    s = []
    s.append(f'<path d="M{x + 18},{y - 14} C{x + 60},{y - 10} {x + 58},{y - 50} {x + 40},{y - 52}" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')
    s.append(f'<path d="M{x + 18},{y - 14} C{x + 60},{y - 10} {x + 58},{y - 50} {x + 40},{y - 52}" fill="none" stroke="{PINK}" stroke-width="3" stroke-linecap="round"/>')
    for dx in (-10, 10):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 4}" rx="10" ry="5" fill="{PINK}" stroke="{INK}" stroke-width="1.8"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 30}" rx="22" ry="27" fill="{g}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 26}" rx="13" ry="17" fill="{gl}"/>')
    s.append(f'<path d="M{x - 18},{y - 42} L{x - 34},{y - 64}" stroke="{INK}" stroke-width="9" stroke-linecap="round"/><path d="M{x - 18},{y - 42} L{x - 34},{y - 64}" stroke="{g}" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<circle cx="{x - 35}" cy="{y - 66}" r="6" fill="{PINK}" stroke="{INK}" stroke-width="1.6"/>')
    s.append(f'<path d="M{x + 18},{y - 40} L{x + 26},{y - 24}" stroke="{INK}" stroke-width="9" stroke-linecap="round"/><path d="M{x + 18},{y - 40} L{x + 26},{y - 24}" stroke="{g}" stroke-width="5" stroke-linecap="round"/>')
    hy = y - 76
    for sx in (-1, 1):
        s.append(f'<circle cx="{x + sx * 22}" cy="{hy - 18}" r="17" fill="{g}" stroke="{INK}" stroke-width="2.4"/>')
        s.append(f'<circle cx="{x + sx * 22}" cy="{hy - 18}" r="10" fill="{PINK}" opacity=".75"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy}" rx="24" ry="21" fill="{g}" stroke="{INK}" stroke-width="2.4"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{x + sx * 9}" cy="{hy - 3}" r="3.6" fill="{INK}"/><circle cx="{x + sx * 9 + 1.2}" cy="{hy - 4.4}" r="1.3" fill="{WHITE}"/>')
        s.append(f'<circle cx="{x + sx * 15}" cy="{hy + 7}" r="4" fill="{PINK}" opacity=".7"/>')
        for dy in (-2, 3):
            s.append(f'<line x1="{x + sx * 8}" y1="{hy + 6}" x2="{x + sx * 30}" y2="{hy + 4 + dy}" stroke="{INK}" stroke-width="1.2" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy + 5}" rx="4" ry="3" fill="#E77A93"/>')
    s.append(f'<path d="M{x - 5},{hy + 11} q5,5 10,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(s)


def squirrel(x, y):
    """x,y = feet centre; sitting, big tail behind on the right"""
    fur, light = '#E8914A', '#FBE0C4'
    s = []
    s.append(f'<path d="M{x + 16},{y - 8} C{x + 80},{y - 4} {x + 92},{y - 70} {x + 62},{y - 104} C{x + 40},{y - 128} {x + 8},{y - 112} {x + 22},{y - 92} C{x + 44},{y - 96} {x + 56},{y - 70} {x + 30},{y - 46} Z" fill="{fur}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x + 40},{y - 36} C{x + 70},{y - 40} {x + 78},{y - 76} {x + 58},{y - 96}" fill="none" stroke="{light}" stroke-width="5" stroke-linecap="round" opacity=".8"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 28}" rx="26" ry="28" fill="{fur}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{x - 2}" cy="{y - 24}" rx="15" ry="19" fill="{light}"/>')
    for dx in (-14, 12):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 3}" rx="11" ry="6" fill="{fur}" stroke="{INK}" stroke-width="1.8"/>')
    s.append(f'<ellipse cx="{x - 8}" cy="{y - 38}" rx="7" ry="9" fill="{fur}" stroke="{INK}" stroke-width="1.8"/><ellipse cx="{x + 8}" cy="{y - 38}" rx="7" ry="9" fill="{fur}" stroke="{INK}" stroke-width="1.8"/>')
    hy = y - 74
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 20},{hy - 10} L{x + sx * 22},{hy - 38} L{x + sx * 6},{hy - 20} Z" fill="{fur}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy}" rx="25" ry="22" fill="{fur}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy + 8}" rx="14" ry="10" fill="{light}"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{x + sx * 10}" cy="{hy - 4}" r="3.8" fill="{INK}"/><circle cx="{x + sx * 10 + 1.2}" cy="{hy - 5.4}" r="1.3" fill="{WHITE}"/>')
        s.append(f'<circle cx="{x + sx * 17}" cy="{hy + 6}" r="4" fill="{PINK}" opacity=".7"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy + 4}" rx="3.6" ry="2.8" fill="{INK}"/>')
    s.append(f'<path d="M{x - 5},{hy + 9} q5,5 10,0" fill="none" stroke="{INK}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(s)


parts = [f'<ellipse cx="{x}" cy="232" rx="{rx}" ry="6" fill="#E6EEF2"/>' for x, rx in ((120, 80), (330, 45), (640, 60))]
parts.append(hedgehog(110, 230))
parts.append(mouse(330, 228))
parts.append(squirrel(630, 230))
parts.append(bubble(40, 8, 190, 92, (120, 150), ['Tớ có', '35 hạt dẻ.']))
parts.append(bubble(250, 8, 190, 92, (322, 122), ['Tớ có', '40 hạt dẻ.']))
parts.append(bubble(470, 12, 420, 92, (628, 132), ['Số hạt dẻ của tớ nhiều hơn của', 'nhím nhưng ít hơn của chuột.'], size=21))
save('bai24_t1_q4_animals', W, H, parts)
