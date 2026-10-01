"""
Vở BT Toán 3 Tập hai, Bài 66 Tiết 1 Q1 (trang 75): bốn khung a)–d), mỗi khung một đồ vật
gợi hoạt động (xe đạp, sách tiếng Anh, chậu rửa bát, cánh diều) và một đồng hồ kim.
Nét riêng — chỉ giữ nội dung toán: giờ trên mỗi đồng hồ (5:45, 8:20, 11:35, 4:55).
    python scripts/redraw/g3t2_bai66_t1_q1_scenes.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from g3t2_bai66_clocks import *

PW, PH, GAP = 380, 210, 16
W, H = 2 * PW + GAP + 4, 2 * PH + GAP + 4


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def bike(x, y):
    s = []
    for wx in (x + 40, x + 140):
        s.append(f'<circle cx="{wx}" cy="{y}" r="34" fill="none" {st(5)}/>')
        s.append(f'<circle cx="{wx}" cy="{y}" r="5" fill="{INK}"/>')
    s.append(f'<path d="M{x + 40},{y} L{x + 78},{y - 52} L{x + 128},{y - 52} L{x + 140},{y} M{x + 78},{y - 52} L{x + 92},{y} L{x + 40},{y} M{x + 92},{y} L{x + 128},{y - 52}" fill="none" stroke="{RED}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>')
    s.append(f'<path d="M{x + 72},{y - 66} l20,0 M{x + 124},{y - 52} l6,-22 l14,-4" fill="none" {st(5)}/>')
    s.append(f'<path d="M{x + 82},{y - 52} l-4,-14" {st(4)}/>')
    return '\n'.join(s)


def tree(x, y):
    return (f'<rect x="{x - 5}" y="{y - 50}" width="10" height="50" fill="{BROWN}" {st(2.4)}/>'
            f'<ellipse cx="{x}" cy="{y - 82}" rx="30" ry="42" fill="{GREEN}" {st(2.6)}/>')


def books(x, y):
    s = [f'<rect x="{x}" y="{y - 14}" width="120" height="14" rx="3" fill="{PURPLE}" {st(2.4)}/>',
         f'<rect x="{x + 6}" y="{y - 28}" width="110" height="14" rx="3" fill="{YELLOW}" {st(2.4)}/>',
         f'<rect x="{x - 2}" y="{y - 42}" width="116" height="14" rx="3" fill="{TEAL}" {st(2.4)}/>']
    # quyển sách mở phía trên
    bx, by = x + 58, y - 60
    s.append(f'<path d="M{bx},{by} C{bx - 30},{by - 16} {bx - 60},{by - 14} {bx - 76},{by - 6} L{bx - 76},{by - 76} C{bx - 60},{by - 84} {bx - 30},{by - 86} {bx},{by - 70} Z" fill="{WHITE}" {st(2.6)}/>')
    s.append(f'<path d="M{bx},{by} C{bx + 30},{by - 16} {bx + 60},{by - 14} {bx + 76},{by - 6} L{bx + 76},{by - 76} C{bx + 60},{by - 84} {bx + 30},{by - 86} {bx},{by - 70} Z" fill="{WHITE}" {st(2.6)}/>')
    s.append(text(bx - 38, by - 36, 'ABC', size=18, weight=700, fill=BLUE))
    for k in range(3):
        s.append(f'<line x1="{bx + 16}" y1="{by - 52 + k * 13}" x2="{bx + 62}" y2="{by - 48 + k * 13}" stroke="{GREY}" stroke-width="3" stroke-linecap="round"/>')
    return '\n'.join(s)


def sink(x, y):
    s = [f'<path d="M{x},{y - 60} L{x + 170},{y - 60} L{x + 150},{y} L{x + 20},{y} Z" fill="{GREY_L}" {st(3)}/>',
         f'<rect x="{x - 6}" y="{y - 70}" width="182" height="12" rx="5" fill="{GREY}" {st(2.6)}/>',
         f'<path d="M{x + 140},{y - 70} l0,-40 l-26,0 l0,12" fill="none" stroke="{GREY}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
         f'<path d="M{x + 140},{y - 70} l0,-40 l-26,0 l0,12" fill="none" {st(2)}/>',
         f'<path d="M{x + 114},{y - 92} l0,16 M{x + 108},{y - 84} l0,8 M{x + 120},{y - 84} l0,8" stroke="{BLUE}" stroke-width="3" stroke-linecap="round"/>',
         f'<ellipse cx="{x + 62}" cy="{y - 74}" rx="40" ry="12" fill="{WHITE}" {st(2.6)}/>',
         f'<ellipse cx="{x + 62}" cy="{y - 76}" rx="22" ry="5" fill="none" stroke="{SKY_D}" stroke-width="2"/>']
    for bx, by, r in [(x + 20, y - 96, 9), (x + 38, y - 110, 6), (x + 96, y - 100, 8), (x + 80, y - 118, 5)]:
        s.append(f'<circle cx="{bx}" cy="{by}" r="{r}" fill="{WHITE}" stroke="{SKY_D}" stroke-width="2"/>')
    return '\n'.join(s)


def kite(x, y):
    s = [f'<ellipse cx="{x + 80}" cy="{y}" rx="100" ry="14" fill="{GRASS}"/>',
         f'<path d="M{x + 110},{y - 150} L{x + 150},{y - 110} L{x + 110},{y - 40} L{x + 70},{y - 110} Z" fill="{ORANGE}" {st(3)}/>',
         f'<path d="M{x + 110},{y - 150} L{x + 110},{y - 40} M{x + 70},{y - 110} L{x + 150},{y - 110}" {st(2.2)}/>',
         f'<path d="M{x + 110},{y - 40} q-12,14 0,24 q12,10 -2,22" fill="none" {st(2.2)}/>',
         f'<path d="M{x + 104},{y - 26} l-10,-4 l2,10 Z M{x + 110},{y - 8} l10,-6 l0,10 Z" fill="{RED}" {st(1.6)}/>',
         f'<path d="M{x + 110},{y - 110} Q{x + 50},{y - 60} {x + 30},{y - 10}" fill="none" stroke="{INK}" stroke-width="1.8"/>',
         f'<circle cx="{x + 30}" cy="{y - 10}" r="6" fill="{BROWN}" {st(2)}/>']
    return '\n'.join(s)


PANELS = [('a)', (5, 45), 'bike'), ('b)', (8, 20), 'books'), ('c)', (11, 35), 'sink'), ('d)', (4, 55), 'kite')]
parts = []
for i, (lab, (h, m), kind) in enumerate(PANELS):
    x0 = 2 + (i % 2) * (PW + GAP)
    y0 = 2 + (i // 2) * (PH + GAP)
    parts.append(f'<rect x="{x0}" y="{y0}" width="{PW}" height="{PH}" rx="16" fill="{SKY}" opacity=".45"/>')
    parts.append(text(x0 + 12, y0 + 30, lab, size=24, weight=600, anchor='start'))
    gy = y0 + PH - 22
    if kind == 'bike':
        parts.append(tree(x0 + 100, gy - 30))
        parts.append(bike(x0 + 14, gy - 20))
    elif kind == 'books':
        parts.append(books(x0 + 40, gy))
    elif kind == 'sink':
        parts.append(sink(x0 + 20, gy))
    else:
        parts.append(kite(x0 + 30, gy))
    parts.append(clock(x0 + PW - 92, y0 + PH / 2, 84, h, m))
save('bai66_t1_q1_scenes', W, H, parts, folder=FOLDER)
