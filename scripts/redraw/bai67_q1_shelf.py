"""
Vở BT Toán 2, Bài 67 Q1 — kệ đồ chơi 6 ngăn: nét riêng.
Giữ nội dung toán (từ trên xuống): ngăn 1 sách = chồng 4 quyển nằm + 3 quyển đứng (7),
ngăn 2 3 gấu bông, ngăn 3 5 ô tô, ngăn 4 1 đàn piano + 1 đàn vi-ô-lông (2 cái đàn),
ngăn 5 6 khối ru-bích, ngăn 6 1 búp bê.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import plush_bear
from kit_g8 import car, place

W, H = 700, 1005
FX0, FX1 = 34, 666
BOARDS = [170, 326, 482, 638, 794, 950]     # top of each shelf board
SW = 2.8


def lying_book(cx, by, w, h, col, page='#FFF8EC'):
    return (f'<rect x="{cx - w / 2}" y="{by - h}" width="{w}" height="{h}" rx="4" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>'
            f'<rect x="{cx + w / 2 - 12}" y="{by - h + 4}" width="8" height="{h - 8}" rx="2" fill="{page}" stroke="{INK}" stroke-width="1.6"/>'
            f'<line x1="{cx - w / 2 + 10}" y1="{by - h / 2}" x2="{cx + w / 2 - 22}" y2="{by - h / 2}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>')


def standing_book(x, by, w, h, col, lab, tilt=0):
    cx = x + w / 2
    return (f'<g transform="rotate({tilt} {cx} {by})">'
            f'<rect x="{x}" y="{by - h}" width="{w}" height="{h}" rx="5" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>'
            f'<rect x="{x + 8}" y="{by - h + 22}" width="{w - 16}" height="30" rx="8" fill="#fff" stroke="{INK}" stroke-width="1.8"/>'
            + text(cx, by - h + 42, lab, size=14, weight=700) +
            f'<line x1="{x + 6}" y1="{by - h + 4}" x2="{x + 6}" y2="{by - 4}" stroke="{INK}" stroke-width="1.4" opacity=".35"/></g>')


def rubik(x, by, s=52, seed=0):
    cols = ['#F07167', '#FFD166', '#7BCB8B', '#6FB7EA', '#FFFFFF', '#F4A259']
    c = s / 3
    out = [f'<rect x="{x}" y="{by - s}" width="{s}" height="{s}" rx="5" fill="{INK}"/>']
    k = 0
    for r in range(3):
        for q in range(3):
            out.append(f'<rect x="{x + q * c + 2:.1f}" y="{by - s + r * c + 2:.1f}" width="{c - 4:.1f}" height="{c - 4:.1f}" rx="2.5" fill="{cols[(k * 5 + seed * 3 + k // 3) % 6]}"/>')
            k += 1
    return ''.join(out)


def piano(x, by):
    """đàn piano đứng nhỏ; x = mép trái"""
    w, h = 200, 120
    s = [f'<rect x="{x + 10}" y="{by - 14}" width="12" height="14" fill="{HAIR}" stroke="{INK}" stroke-width="2.4"/>',
         f'<rect x="{x + w - 22}" y="{by - 14}" width="12" height="14" fill="{HAIR}" stroke="{INK}" stroke-width="2.4"/>',
         f'<rect x="{x}" y="{by - h}" width="{w}" height="{h - 12}" rx="8" fill="#8E5BB5" stroke="{INK}" stroke-width="{SW}"/>',
         f'<rect x="{x + 16}" y="{by - h + 14}" width="{w - 32}" height="34" rx="5" fill="#A77BCB" stroke="{INK}" stroke-width="2"/>',
         f'<rect x="{x - 6}" y="{by - 62}" width="{w + 12}" height="14" rx="4" fill="#8E5BB5" stroke="{INK}" stroke-width="2.4"/>',
         f'<rect x="{x + 8}" y="{by - 48}" width="{w - 16}" height="22" fill="#fff" stroke="{INK}" stroke-width="2.2"/>']
    kw = (w - 16) / 14
    for i in range(1, 14):
        s.append(f'<line x1="{x + 8 + i * kw:.1f}" y1="{by - 48}" x2="{x + 8 + i * kw:.1f}" y2="{by - 26}" stroke="{INK}" stroke-width="1.2"/>')
    for i in (1, 2, 4, 5, 6, 8, 9, 11, 12, 13):
        s.append(f'<rect x="{x + 8 + i * kw - 3.5:.1f}" y="{by - 48}" width="7" height="13" fill="{INK}"/>')
    return ''.join(s)


def violin(cx, by):
    """đàn vi-ô-lông nằm trên kệ; (cx, by) = giữa đáy"""
    body = '#E0914A'
    g = [f'<path d="M-60,-22 C-60,-40 -38,-42 -30,-32 C-24,-26 -16,-26 -10,-32 C0,-44 30,-42 30,-22 C30,-2 0,0 -10,-12 C-16,-18 -24,-18 -30,-12 C-38,-2 -60,-4 -60,-22 Z" fill="{body}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="28" y="-26" width="74" height="8" rx="3" fill="{HAIR}" stroke="{INK}" stroke-width="2.2"/>',
         f'<path d="M100,-30 q14,0 14,8 q0,8 -14,8 Z" fill="{HAIR}" stroke="{INK}" stroke-width="2.2"/>',
         f'<line x1="-52" y1="-22" x2="104" y2="-22" stroke="#FFF1C9" stroke-width="1.4"/>',
         f'<rect x="-28" y="-30" width="5" height="16" rx="2" fill="#FFF1C9" stroke="{INK}" stroke-width="1.4"/>',
         f'<path d="M-12,-30 q3,4 0,8 M-12,-22 q-3,4 0,8" fill="none" stroke="{INK}" stroke-width="1.8"/>']
    return f'<g transform="translate({cx} {by}) scale(1.35) rotate(-6)">{"".join(g)}</g>'


def doll(cx, by):
    dress, hair = '#F7A1C4', '#8B5A3C'
    s = [f'<ellipse cx="{cx - 30}" cy="{by - 8}" rx="18" ry="8" fill="{SKIN}" stroke="{INK}" stroke-width="2.4"/>',
         f'<ellipse cx="{cx + 30}" cy="{by - 8}" rx="18" ry="8" fill="{SKIN}" stroke="{INK}" stroke-width="2.4"/>',
         f'<ellipse cx="{cx - 44}" cy="{by - 8}" rx="8" ry="9" fill="{RED}" stroke="{INK}" stroke-width="2.2"/>',
         f'<ellipse cx="{cx + 44}" cy="{by - 8}" rx="8" ry="9" fill="{RED}" stroke="{INK}" stroke-width="2.2"/>',
         f'<path d="M{cx - 20},{by - 70} L{cx + 20},{by - 70} L{cx + 40},{by - 10} Q{cx},{by - 2} {cx - 40},{by - 10} Z" fill="{dress}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{cx - 36},{by - 18} Q{cx},{by - 10} {cx + 36},{by - 18}" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 5"/>',
         f'<path d="M{cx - 18},{by - 64} L{cx - 36},{by - 36}" stroke="{INK}" stroke-width="10" stroke-linecap="round"/><path d="M{cx - 18},{by - 64} L{cx - 36},{by - 36}" stroke="{SKIN}" stroke-width="6" stroke-linecap="round"/>',
         f'<path d="M{cx + 18},{by - 64} L{cx + 36},{by - 36}" stroke="{INK}" stroke-width="10" stroke-linecap="round"/><path d="M{cx + 18},{by - 64} L{cx + 36},{by - 36}" stroke="{SKIN}" stroke-width="6" stroke-linecap="round"/>']
    hy = by - 94
    s.append(f'<path d="M{cx - 26},{hy + 26} Q{cx - 34},{hy - 10} {cx},{hy - 26} Q{cx + 34},{hy - 10} {cx + 26},{hy + 26} Z" fill="{hair}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{cx}" cy="{hy}" r="22" fill="{SKIN}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<path d="M{cx - 22},{hy - 4} Q{cx - 8},{hy - 26} {cx + 22},{hy - 6} Q{cx + 16},{hy - 24} {cx},{hy - 24} Q{cx - 18},{hy - 24} {cx - 22},{hy - 4} Z" fill="{hair}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>')
    s.append(f'<path d="M{cx + 12},{hy - 24} l12,-8 l2,12 Z M{cx + 12},{hy - 24} l-2,-12 l12,4 Z" fill="{RED}" stroke="{INK}" stroke-width="2"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{cx + sx * 8}" cy="{hy + 2}" r="2.8" fill="{INK}"/><circle cx="{cx + sx * 14}" cy="{hy + 9}" r="3.6" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M{cx - 5},{hy + 11} q5,5 10,0" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
    return ''.join(s)


parts = [f'<rect x="8" y="8" width="{W - 16}" height="{H - 12}" rx="30" fill="#DCE3EA" stroke="{INK}" stroke-width="3.5"/>',
         f'<rect x="{FX0}" y="30" width="{FX1 - FX0}" height="{H - 30}" fill="#F3F6F9" stroke="{INK}" stroke-width="2.4"/>']
# ngăn 1: 4 quyển nằm chồng + 3 quyển đứng
b = BOARDS[0]
for i, (w, col) in enumerate(((150, '#6FB7EA'), (140, '#F07167'), (146, '#7BCB8B'), (134, '#FFD166'))):
    parts.append(lying_book(220 + (i % 2) * 8, b - i * 26, w, 24, col))
parts.append(standing_book(334, b, 72, 118, '#B9A7F0', 'Truyện', tilt=-5))
parts.append(standing_book(414, b, 76, 124, '#F4A259', 'Cổ tích'))
parts.append(standing_book(496, b, 72, 112, '#6CCFB5', 'Tranh', tilt=6))
# ngăn 2: gấu bông
for x, fur in ((190, BROWN), (350, '#D9A066'), (510, BROWN)):
    parts.append(plush_bear(x, BOARDS[1], h=120, fur=fur))
# ngăn 3: ô tô
for i, col in enumerate((RED, BLUE, YELLOW, GREEN, PURPLE)):
    s = 0.48
    parts.append(place(car(col), 46 + i * 120, BOARDS[2] - 82 * s - 1, s))
# ngăn 4: đàn
parts.append(piano(90, BOARDS[3]))
parts.append(violin(470, BOARDS[3] - 2))
# ngăn 5: ru-bích
for i in range(6):
    parts.append(rubik(128 + i * 76, BOARDS[4], s=62, seed=i))
# ngăn 6: búp bê
parts.append(doll(350, BOARDS[5]))
for yb in BOARDS:
    parts.append(f'<rect x="{FX0 - 6}" y="{yb}" width="{FX1 - FX0 + 12}" height="16" rx="3" fill="#C6CFD8" stroke="{INK}" stroke-width="2.6"/>')
save('bai67_q1_shelf', W, H, parts)
