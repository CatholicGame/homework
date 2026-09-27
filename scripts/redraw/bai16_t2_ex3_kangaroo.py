"""
Vở BT Toán 3, Bài 16 Tiết 2 câu 3 — cầu đá 11 tảng ghi số 0…10, chuột túi đứng trên tảng số 1,
mũi tên nhảy từ 1 sang 2. Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 1942, 315
SW = 4
STONE = '#C9D6E2'


def stone(cx, n):
    t, b = 196, 306
    d = (f'M{cx - 40},{t + 6} Q{cx - 10},{t - 6} {cx + 30},{t + 2} Q{cx + 50},{t + 6} {cx + 50},{t + 30} '
         f'Q{cx + 54},{b - 30} {cx + 40},{b - 6} Q{cx},{b + 6} {cx - 40},{b - 4} Q{cx - 54},{b - 40} {cx - 50},{t + 30} '
         f'Q{cx - 50},{t + 10} {cx - 40},{t + 6} Z')
    return (f'<path d="{d}" fill="{STONE}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>'
            f'<path d="M{cx - 40},{t + 14} Q{cx},{t + 2} {cx + 40},{t + 14}" fill="none" stroke="#fff" stroke-width="4" opacity=".8"/>'
            f'<path d="M{cx - 28},{t + 50} L{cx - 22},{b - 16}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>'
            + text(cx + 2, t + 66, n, size=58, weight=700))


def kangaroo(x, y):
    """chuột túi đứng trên chân sau, nhìn sang phải; (x, y) = bàn chân."""
    fur, light = '#E0A36A', '#F6DDBF'
    s = []
    # đuôi
    s.append(f'<path d="M{x - 20},{y - 34} C{x - 80},{y - 30} {x - 130},{y - 40} {x - 170},{y - 70} C{x - 120},{y - 44} {x - 70},{y - 50} {x - 18},{y - 56} Z" '
             f'fill="{fur}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    # bàn chân dài
    s.append(f'<path d="M{x - 26},{y - 4} Q{x - 20},{y - 16} {x + 12},{y - 14} L{x + 44},{y - 10} Q{x + 50},{y - 2} {x + 40},{y} L{x - 20},{y} Q{x - 28},{y} {x - 26},{y - 4} Z" '
             f'fill="{fur}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    # thân + đùi
    s.append(f'<path d="M{x - 30},{y - 20} C{x - 50},{y - 70} {x - 10},{y - 130} {x + 20},{y - 126} C{x + 44},{y - 110} {x + 40},{y - 50} {x + 24},{y - 16} Z" '
             f'fill="{fur}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x + 2},{y - 110} C{x + 26},{y - 100} {x + 28},{y - 50} {x + 14},{y - 26} C{x},{y - 40} {x - 6},{y - 90} {x + 2},{y - 110} Z" fill="{light}"/>')
    s.append(f'<ellipse cx="{x - 16}" cy="{y - 42}" rx="24" ry="30" fill="{fur}" stroke="{INK}" stroke-width="{SW}"/>')
    # tay
    s.append(f'<path d="M{x + 22},{y - 102} q22,8 26,28" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>'
             f'<path d="M{x + 22},{y - 102} q22,8 26,28" fill="none" stroke="{fur}" stroke-width="6" stroke-linecap="round"/>')
    # đầu
    hx, hy = x + 30, y - 150
    for dx, rot in ((-16, -18), (4, 8)):
        s.append(f'<ellipse cx="{hx + dx}" cy="{hy - 40}" rx="10" ry="26" transform="rotate({rot} {hx + dx} {hy - 40})" fill="{fur}" stroke="{INK}" stroke-width="{SW}"/>'
                 f'<ellipse cx="{hx + dx}" cy="{hy - 38}" rx="4" ry="16" transform="rotate({rot} {hx + dx} {hy - 38})" fill="{PINK}"/>')
    s.append(f'<path d="M{hx - 26},{hy + 4} C{hx - 30},{hy - 30} {hx + 10},{hy - 30} {hx + 22},{hy - 14} L{hx + 44},{hy - 2} Q{hx + 48},{hy + 10} {hx + 36},{hy + 14} '
             f'C{hx + 10},{hy + 24} {hx - 20},{hy + 24} {hx - 26},{hy + 4} Z" fill="{fur}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{hx + 44}" cy="{hy + 2}" r="5" fill="{INK}"/>')
    s.append(f'<circle cx="{hx + 8}" cy="{hy - 6}" r="5" fill="{INK}"/><circle cx="{hx + 9.5}" cy="{hy - 7.5}" r="1.8" fill="#fff"/>')
    s.append(f'<circle cx="{hx + 8}" cy="{hy + 10}" r="5" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M{hx + 26},{hy + 12} q6,4 12,-1" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    return ''.join(s)


xs = [188 + i * 150 for i in range(11)]
parts = [stone(x, i) for i, x in enumerate(xs)]
parts.append(f'<g transform="translate({xs[1] - 6},204) scale(.86) translate({-(xs[1] - 6)},-204)">' + kangaroo(xs[1] - 6, 204) + '</g>')
# mũi tên nhảy 1 -> 2
x1, x2 = xs[1] + 30, xs[2] - 20
parts.append(f'<path d="M{x1},{200} Q{(x1 + x2) / 2},{140} {x2 - 4},{192}" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')
parts.append(poly([(x2 + 6, 206), (x2 - 24, 190), (x2 + 2, 176)], INK, 2))
save('bai16_t2_ex3_kangaroo', W, H, parts, folder='grade3-workbook')
