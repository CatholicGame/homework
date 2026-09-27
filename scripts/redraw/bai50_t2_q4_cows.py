"""
Vở BT Toán 2, Bài 50 Tiết 2 Q4 — ba con bò trên bập bênh: nét riêng.
Giữ nội dung toán: bập bênh trái — Bò tót (trái, bên cao, nhẹ hơn) và Bò sữa (phải, bên thấp);
bập bênh phải — Bò sữa (trái, bên cao) và Bò xám (phải, bên thấp, nặng nhất).
Nhãn chữ giữ đúng: "Bò tót", "Bò sữa", "Bò xám".
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 216
TILT = 5          # degrees; right side down
parts = []


def cow(kind):
    """cow at origin (feet on y=0, centre x=0), facing left for 'tot', right otherwise"""
    if kind == 'tot':
        body, dark, horns, face = '#8C5A3C', '#6B412A', True, '#B07A55'
    elif kind == 'sua':
        body, dark, horns, face = WHITE, INK, False, '#F7D7C8'
    else:
        body, dark, horns, face = '#9AA3AD', '#6F7781', True, '#C4CAD1'
    s = []
    for dx in (-44, -26, 26, 44):
        s.append(f'<rect x="{dx - 6}" y="-40" width="12" height="40" rx="4" fill="{body}" {st(2.4)}/>')
        s.append(f'<rect x="{dx - 6}" y="-8" width="12" height="8" rx="2" fill="{INK}"/>')
    s.append(f'<path d="M-58,-66 q-16,10 -12,34" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    s.append(f'<circle cx="-70" cy="-30" r="4" fill="{dark}"/>')
    s.append(f'<rect x="-62" y="-92" width="116" height="58" rx="26" fill="{body}" {st(2.8)}/>')
    if kind == 'sua':
        s.append(f'<path d="M-40,-90 c10,10 24,6 22,22 c-4,12 -24,8 -30,-4 Z" fill="{INK}"/>')
        s.append(f'<path d="M10,-60 c8,-8 26,-4 26,10 c-2,10 -20,10 -26,0 Z" fill="{INK}"/>')
        s.append(f'<ellipse cx="18" cy="-34" rx="10" ry="6" fill="{PINK}" {st(2)}/>')
    hx, hy = 62, -98
    if horns:
        s.append(f'<path d="M{hx - 14},{hy - 18} C{hx - 30},{hy - 24} {hx - 30},{hy - 40} {hx - 20},{hy - 46} C{hx - 20},{hy - 34} {hx - 12},{hy - 28} {hx - 4},{hy - 26} Z" fill="{CREAM}" {st(2.2)}/>')
        s.append(f'<path d="M{hx + 14},{hy - 18} C{hx + 30},{hy - 24} {hx + 30},{hy - 40} {hx + 20},{hy - 46} C{hx + 20},{hy - 34} {hx + 12},{hy - 28} {hx + 4},{hy - 26} Z" fill="{CREAM}" {st(2.2)}/>')
    s.append(f'<ellipse cx="{hx - 24}" cy="{hy - 10}" rx="12" ry="7" transform="rotate(-20 {hx - 24} {hy - 10})" fill="{body}" {st(2.2)}/>')
    s.append(f'<ellipse cx="{hx + 24}" cy="{hy - 10}" rx="12" ry="7" transform="rotate(20 {hx + 24} {hy - 10})" fill="{body}" {st(2.2)}/>')
    s.append(f'<ellipse cx="{hx}" cy="{hy}" rx="24" ry="28" fill="{body}" {st(2.8)}/>')
    s.append(f'<ellipse cx="{hx}" cy="{hy + 16}" rx="20" ry="13" fill="{face}" {st(2.4)}/>')
    s.append(f'<circle cx="{hx - 7}" cy="{hy + 16}" r="2.6" fill="{INK}"/><circle cx="{hx + 7}" cy="{hy + 16}" r="2.6" fill="{INK}"/>')
    s.append(f'<circle cx="{hx - 9}" cy="{hy - 6}" r="3.4" fill="{INK}"/><circle cx="{hx + 9}" cy="{hy - 6}" r="3.4" fill="{INK}"/>')
    flip = ' scale(-1,1)' if kind == 'tot' else ''
    return s, flip


def seesaw(cx, left_kind, right_kind, left_label, right_label):
    py = 190
    L = 420
    a = math.radians(TILT)
    s = []
    s.append(f'<path d="M{cx - 40},{py + 26} L{cx - 40},{py - 2} A40,40 0 0 1 {cx + 40},{py - 2} L{cx + 40},{py + 26} Z" fill="{GREY}" {st(3)}/>')
    s.append(f'<g transform="translate({cx},{py - 22}) rotate({TILT})">')
    s.append(f'<rect x="{-L / 2}" y="-6" width="{L}" height="12" rx="5" fill="{ORANGE}" {st(2.8)}/>')
    for off, kind in ((-120, left_kind), (120, right_kind)):
        body, flip = cow(kind)
        s.append(f'<g transform="translate({off},-6){flip} scale(.72)">' + '\n'.join(body) + '</g>')
    s.append('</g>')
    s.append(f'<circle cx="{cx}" cy="{py - 22}" r="12" fill="{WHITE}" {st(2.8)}/>')
    # labels above each cow (follow the tilt)
    for off, lab in ((-120, left_label), (120, right_label)):
        x = cx + off * math.cos(a)
        y = py - 22 + off * math.sin(a) - 122
        s.append(text(f'{x:.0f}', f'{y:.0f}', lab, size=22, weight=700))
    return '\n'.join(s)


parts.append(seesaw(222, 'tot', 'sua', 'Bò tót', 'Bò sữa'))
parts.append(seesaw(678, 'sua', 'xam', 'Bò sữa', 'Bò xám'))
save('bai50_t2_q4_cows', W, H, parts)
