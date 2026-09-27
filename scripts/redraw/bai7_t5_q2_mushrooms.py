"""
Vở BT Toán 2, Bài 7 Tiết 5 Q2 — "bạn Sao hái nấm": vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: bạn nhỏ đeo gùi ghi 14; dây nối từ gùi tới cây nấm mẫu 9 + 5;
9 cây nấm ghi phép tính, vị trí tương đối như sách:
  7 + 7 (trên giữa), 10 + 4 (phải), 5 + 8 (giữa), 9 + 5 (trái, nấm mẫu có dây),
  9 + 6 (phải), 8 + 6 (giữa), 8 + 4 (trái dưới), 9 + 7 (giữa dưới), 8 + 9 (phải dưới).

    python scripts/redraw/bai7_t5_q2_mushrooms.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 760, 806
CW, CH = 170, 78          # cap width, height

# text centre x, y, expression, cap colour
MUSHROOMS = [
    (435, 192, '7 + 7', '#FFB3A7'),
    (612, 322, '10 + 4', '#FFD27A'),
    (400, 372, '5 + 8', '#F7B5D2'),
    (230, 432, '9 + 5', '#C9B8F5'),
    (630, 494, '9 + 6', '#FFB3A7'),
    (402, 545, '8 + 6', '#FFD27A'),
    (165, 610, '8 + 4', '#FFB3A7'),
    (372, 694, '9 + 7', '#C9B8F5'),
    (622, 694, '8 + 9', '#F7B5D2'),
]


def mushroom(x, y, label, cap):
    s = []
    base = y + 88
    # grass tuft at the foot
    s.append(f'<path d="M{x - 42},{base + 2} q6,-14 10,-18 M{x - 32},{base + 2} q2,-12 -2,-20 M{x + 34},{base + 2} q-2,-14 4,-20 M{x + 44},{base + 2} q-4,-12 -8,-16" '
             f'fill="none" stroke="{GRASS_D}" stroke-width="3.5" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x}" cy="{base}" rx="40" ry="7" fill="#000" opacity=".08"/>')
    # stem with a tiny face
    s.append(f'<path d="M{x - 22},{y + 22} Q{x - 30},{base - 8} {x - 24},{base} L{x + 24},{base} Q{x + 30},{base - 8} {x + 22},{y + 22} Z" '
             f'fill="{CREAM}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    fy = y + 50
    s.append(f'<circle cx="{x - 9}" cy="{fy}" r="3.2" fill="{INK}"/><circle cx="{x + 9}" cy="{fy}" r="3.2" fill="{INK}"/>')
    s.append(f'<path d="M{x - 5},{fy + 8} q5,5 10,0" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x - 15}" cy="{fy + 7}" rx="4.5" ry="3" fill="#F6A3B4" opacity=".8"/><ellipse cx="{x + 15}" cy="{fy + 7}" rx="4.5" ry="3" fill="#F6A3B4" opacity=".8"/>')
    # cap: a rounded dome
    l, r, top, bot = x - CW / 2, x + CW / 2, y - CH + 26, y + 26
    s.append(f'<path d="M{l},{bot - 6} C{l - 4},{top + 10} {x - 50},{top} {x},{top} C{x + 50},{top} {r + 4},{top + 10} {r},{bot - 6} '
             f'Q{r},{bot} {r - 12},{bot} L{l + 12},{bot} Q{l},{bot} {l},{bot - 6} Z" fill="{cap}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    # white spots near the edges, away from the writing
    for dx, dy, rr in ((-66, -2, 8), (62, 0, 9), (-38, -36, 7), (40, -38, 6), (0, -44, 5)):
        s.append(f'<circle cx="{x + dx}" cy="{y + dy}" r="{rr}" fill="#fff" opacity=".9"/>')
    s.append(text(x, y + 12, label, size=33, weight=700))
    return '\n'.join(s)


def kid(cx, feet, sc):
    """Front-facing child, drawn in local units (head centre 440, feet 712) then scaled."""
    shirt, trousers, hair = '#7FD1B9', '#6FB7EA', HAIR
    s = [f'<g transform="translate({cx},{feet - 712 * sc}) scale({sc})">']
    for sx in (-1, 1):
        s.append(f'<rect x="{sx * 20 - 11}" y="600" width="22" height="100" rx="9" fill="{trousers}" stroke="{INK}" stroke-width="3.5"/>')
        s.append(f'<ellipse cx="{sx * 26}" cy="702" rx="22" ry="12" fill="{ORANGE}" stroke="{INK}" stroke-width="3.5"/>')
    s.append(f'<path d="M-50,580 L50,580 L56,640 L-56,640 Z" fill="{trousers}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    s.append(f'<path d="M-44,508 Q0,496 44,508 L58,596 Q0,606 -58,596 Z" fill="{shirt}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    # basket straps and a belt of colour on the shirt
    for sx in (-1, 1):
        s.append(f'<path d="M{sx * 30},506 Q{sx * 34},540 {sx * 40},586" fill="none" stroke="{BROWN}" stroke-width="7" stroke-linecap="round"/>')
    s.append(f'<path d="M-56,572 Q0,582 56,572" fill="none" stroke="{RED}" stroke-width="8"/>')
    s.append(f'<path d="M-18,503 Q0,522 18,503" fill="#fff" stroke="{INK}" stroke-width="2.5"/>')
    # arms: left hangs holding the strap, right hand up at the chin (thinking)
    for (x0, y0), (hx, hy), mid in (((-44, 515), (-64, 598), (-66, 556)), ((44, 515), (34, 494), (84, 560))):
        for w, c in ((20, INK), (14, shirt)):
            s.append(f'<path d="M{x0},{y0} Q{mid[0]},{mid[1]} {hx},{hy}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round"/>')
        s.append(f'<circle cx="{hx}" cy="{hy}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="3"/>')
    hy = 440
    s.append(f'<ellipse cx="0" cy="{hy}" rx="58" ry="56" fill="{SKIN}" stroke="{INK}" stroke-width="3.5"/>')
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{sx * 58}" cy="{hy + 6}" rx="9" ry="12" fill="{SKIN}" stroke="{INK}" stroke-width="3"/>')
    # hair with a top bun and a flowered headband
    s.append(f'<circle cx="0" cy="{hy - 66}" r="20" fill="{hair}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M-62,{hy + 8} Q-66,{hy - 64} 0,{hy - 62} Q66,{hy - 64} 62,{hy + 8} Q40,{hy - 34} 4,{hy - 26} Q-36,{hy - 36} -62,{hy + 8} Z" '
             f'fill="{hair}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    s.append(f'<path d="M-56,{hy - 22} Q0,{hy - 60} 56,{hy - 22}" fill="none" stroke="{YELLOW}" stroke-width="8" stroke-linecap="round"/>')
    for fx in (-30, 0, 30):
        s.append(f'<circle cx="{fx}" cy="{hy - 44 + abs(fx) * 0.35}" r="6" fill="{PINK}" stroke="{INK}" stroke-width="2"/>')
    # face: looking at the mushrooms, little "o" mouth
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{sx * 20 + 6}" cy="{hy + 2}" rx="6" ry="8" fill="{INK}"/><circle cx="{sx * 20 + 8}" cy="{hy - 1}" r="2.2" fill="#fff"/>')
        s.append(f'<ellipse cx="{sx * 34}" cy="{hy + 20}" rx="9" ry="6" fill="#F6A3B4" opacity=".75"/>')
    s.append(f'<ellipse cx="4" cy="{hy + 28}" rx="6" ry="7" fill="#E86A7E" stroke="{INK}" stroke-width="2.5"/>')
    s.append('</g>')
    return '\n'.join(s)


def basket(x, y, w, h):
    """Woven back basket, wider at the top; returns svg and its lower-left corner."""
    s = []
    inset = 12
    s.append(f'<path d="M{x},{y} L{x + w},{y} L{x + w - inset},{y + h} Q{x + w / 2},{y + h + 8} {x + inset},{y + h} Z" fill="#E7B67C" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    for k in range(1, 5):
        yy = y + k * h / 5
        s.append(f'<path d="M{x + inset * k / 5},{yy} Q{x + w / 2},{yy + 5} {x + w - inset * k / 5},{yy}" fill="none" stroke="{BROWN}" stroke-width="2.2"/>')
    for k in range(1, 6):
        xx = x + k * w / 6
        s.append(f'<line x1="{xx}" y1="{y + 2}" x2="{xx + (x + w / 2 - xx) * 0.1}" y2="{y + h - 2}" stroke="{BROWN}" stroke-width="2" opacity=".6"/>')
    s.append(f'<rect x="{x - 5}" y="{y - 9}" width="{w + 10}" height="14" rx="6" fill="#D39A5C" stroke="{INK}" stroke-width="3.5"/>')
    # number tag
    s.append(f'<circle cx="{x + w / 2 - 8}" cy="{y + h / 2 + 4}" r="30" fill="#fff" stroke="{INK}" stroke-width="3"/>')
    s.append(text(x + w / 2 - 8, y + h / 2 + 16, '14', size=32, weight=700))
    return '\n'.join(s), (x + inset + 4, y + h - 4)


parts = [
    f'<rect width="{W}" height="{H}" fill="#EAF7FD"/>',
    f'<path d="M0,318 Q380,236 {W},292 L{W},{H} L0,{H} Z" fill="{GRASS}" stroke="{GRASS_D}" stroke-width="3"/>',
    f'<path d="M0,470 Q300,420 {W},460 L{W},{H} L0,{H} Z" fill="#8ACB79" opacity=".45"/>',
    f'<circle cx="680" cy="80" r="42" fill="{YELLOW}" stroke="{ORANGE}" stroke-width="3"/>',
    f'<path d="M470,90 q14,-26 40,-14 q18,-22 44,-4 q26,2 20,26 H472 q-18,0 -2,-8 Z" fill="#fff" stroke="#BFDDEB" stroke-width="3" stroke-linejoin="round"/>',
]
bsvg, (sx, sy) = basket(80, 80, 118, 110)
parts.append(bsvg)
parts.append(kid(246, 326, 0.8))
for m in MUSHROOMS:
    parts.append(mushroom(*m))
# the sample string: from the basket to the 9 + 5 mushroom
mx, my = MUSHROOMS[3][0] - CW / 2 + 16, MUSHROOMS[3][1] - 4
parts.append(f'<path d="M{sx},{sy} C{sx - 44},{sy + 110} {sx - 30},{my - 120} {mx},{my}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<circle cx="{sx}" cy="{sy}" r="4.5" fill="{INK}"/><circle cx="{mx}" cy="{my}" r="4.5" fill="{INK}"/>')

save('bai7_t5_q2_mushrooms', W, H, parts)
