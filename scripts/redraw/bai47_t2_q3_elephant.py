"""
Vở BT Toán 2, Bài 47 Tiết 2 Q3 — voi kéo khối gỗ: nét riêng.
Giữ nội dung toán: 2 khúc gỗ khối trụ ghi 30 kg (trên) và 20 kg (dưới); 2 khối gỗ khối cầu
ghi 35 kg và 25 kg. Voi vẽ theo dáng riêng.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 379
WOOD, WOOD_E = '#D9A066', '#F3D3A6'
parts = []
parts.append(f'<path d="M0,190 C180,150 420,140 560,120 C700,100 820,110 900,150 L900,379 L0,379 Z" fill="{GRASS}" {st(2.6)}/>')
for x, y in ((80, 210), (640, 170), (760, 230), (560, 330), (680, 300), (840, 190)):
    parts.append(f'<path d="M{x},{y} l-5,-10 M{x},{y} l0,-12 M{x},{y} l5,-10" stroke="{GRASS_D}" stroke-width="2.4" stroke-linecap="round"/>')


def elephant(x, y):
    """x,y = feet line, centre of body; faces left"""
    g, gd = '#B8C4D6', '#95A3B8'
    s = []
    for dx in (-60, -24, 40, 72):
        s.append(f'<rect x="{x + dx - 15}" y="{y - 60}" width="30" height="60" rx="10" fill="{gd if dx in (-24, 72) else g}" {st(3)}/>')
    s.append(f'<path d="M{x + 96},{y - 110} q24,6 22,34" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x + 6}" cy="{y - 96}" rx="98" ry="64" fill="{g}" {st(3)}/>')
    hx, hy = x - 90, y - 130
    s.append(f'<ellipse cx="{hx + 38}" cy="{hy - 4}" rx="44" ry="54" fill="{g}" {st(3)}/>')
    s.append(f'<ellipse cx="{hx + 38}" cy="{hy - 4}" rx="28" ry="38" fill="{PINK}" opacity=".6"/>')
    s.append(f'<circle cx="{hx - 10}" cy="{hy}" r="50" fill="{g}" {st(3)}/>')
    s.append(f'<path d="M{hx - 44},{hy + 4} C{hx - 80},{hy + 20} {hx - 96},{hy + 50} {hx - 92},{hy + 76} C{hx - 90},{hy + 90} {hx - 72},{hy + 92} {hx - 72},{hy + 78} '
             f'C{hx - 74},{hy + 56} {hx - 60},{hy + 40} {hx - 30},{hy + 30} Z" fill="{g}" {st(3)}/>')
    s.append(f'<path d="M{hx - 84},{hy + 50} l10,4 M{hx - 80},{hy + 38} l10,6" stroke="{gd}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx - 26}" cy="{hy - 12}" r="6" fill="{INK}"/><circle cx="{hx - 24}" cy="{hy - 14}" r="2" fill="{WHITE}"/>')
    s.append(f'<circle cx="{hx + 2}" cy="{hy + 14}" r="9" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M{hx - 30},{hy + 34} q10,10 22,2" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    return '\n'.join(s)


parts.append(elephant(300, 236))


def lbl(x, y, s):
    return text(x, y, s, size=30, weight=700, fill=INK)


parts.append(cyl_side(260, 322, 480, 64, fill=WOOD, end_fill=WOOD_E, rx=14, rings=True))
parts.append(lbl(250, 334, '20 kg'))
parts.append(cyl_side(310, 250, 520, 64, fill=WOOD, end_fill=WOOD_E, rx=14, rings=True))
parts.append(lbl(390, 262, '30 kg'))
parts.append(sphere(590, 124, 72, fill='#C9A57E'))
parts.append(lbl(590, 134, '35 kg'))
parts.append(sphere(812, 300, 64, fill='#C9A57E'))
parts.append(lbl(812, 310, '25 kg'))
save('bai47_t2_q3_elephant', W, H, parts)
