"""
Vở BT Toán 2, Bài 54 Tiết 2 Q5 — mèo đi theo số bé hơn ở mỗi ngã rẽ: nét riêng.
Giữ nội dung toán (sơ đồ đường): mèo → ngã rẽ 132 / 123;
  132 → ngã rẽ 240 (cột cào móng) / 204 → ngã rẽ 537 (bình + bát sữa) / 437 (khay cát);
  123 → ngã rẽ 523 → 460 (chuột đồ chơi) / 461 (cuộn len);  352 → ngã rẽ 633 / 636 (thịt hộp);
  633 → 1 000 (vòng cổ) / 999 (xương cá).  Đáp án: xương cá.
Chữ "Sữa", "Thịt hộp" giữ đúng. Các số viết ngang cho dễ đọc, đặt cạnh nhánh của nó.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 713
ROAD, DOT = '#B9C0C8', '#3FA7E0'
N = {1: (140, 378), 2: (258, 315), 3: (310, 210), 4: (600, 178), 5: (268, 545), 6: (435, 435),
     7: (590, 648), 8: (650, 508), 'v': (455, 655)}
ITEM = {'milk': (700, 140), 'post': (390, 322), 'litter': (715, 290), 'mouse': (540, 388), 'yarn': (478, 510),
        'ring': (770, 408), 'fish': (790, 500), 'can': (800, 640)}
EDGES = [(1, 2), (2, 'post'), (2, 3), (3, 4), (4, 'milk'), (4, 'litter'), (1, 5), (5, 6), (6, 'mouse'), (6, 'yarn'),
         (5, 'v'), ('v', 7), (7, 8), (8, 'ring'), (8, 'fish'), (7, 'can')]
# label, x, y (horizontal numbers beside the branch they belong to)
LABELS = [('132', 196, 334), ('123', 168, 468), ('240', 306, 350), ('204', 250, 262), ('537', 640, 150),
          ('437', 606, 240), ('523', 330, 480), ('352', 330, 612), ('460', 450, 400), ('461', 420, 490),
          ('633', 590, 590), ('636', 650, 692), ('1 000', 690, 438), ('999', 706, 544)]


def pt(k):
    return N[k] if k in N else ITEM[k]


parts = []
for a, b in EDGES:
    (x1, y1), (x2, y2) = pt(a), pt(b)
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="20" stroke-linecap="round"/>')
for a, b in EDGES:
    (x1, y1), (x2, y2) = pt(a), pt(b)
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{ROAD}" stroke-width="14" stroke-linecap="round"/>')
for k in (1, 2, 3, 4, 5, 6, 7, 8):
    x, y = N[k]
    parts.append(f'<circle cx="{x}" cy="{y}" r="17" fill="{DOT}" {st(2.8)}/>')
LABEL_PARTS = []
for lab, x, y in LABELS:
    LABEL_PARTS.append(text(x, y, lab, size=28, weight=700,
                            extra=f' stroke="{WHITE}" stroke-width="7" stroke-linejoin="round" paint-order="stroke"'))


def cat(x, y):
    """sitting cat, x,y = bottom centre"""
    f, fl = '#F4B36A', '#FFE3C2'
    tail = f'M{x + 30},{y - 8} C{x + 70},{y - 6} {x + 70},{y - 50} {x + 50},{y - 60}'
    s = [f'<path d="{tail}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>',
         f'<path d="{tail}" fill="none" stroke="{f}" stroke-width="7" stroke-linecap="round"/>',
         f'<path d="M{x - 38},{y} C{x - 44},{y - 50} {x - 26},{y - 86} {x},{y - 86} C{x + 26},{y - 86} {x + 44},{y - 50} {x + 38},{y} Z" fill="{f}" {st(3)}/>',
         f'<ellipse cx="{x}" cy="{y - 36}" rx="18" ry="26" fill="{fl}"/>',
         f'<ellipse cx="{x - 16}" cy="{y - 4}" rx="12" ry="7" fill="{fl}" {st(2.2)}/>',
         f'<ellipse cx="{x + 16}" cy="{y - 4}" rx="12" ry="7" fill="{fl}" {st(2.2)}/>']
    hy = y - 110
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 36},{hy - 8} L{x + sx * 40},{hy - 48} L{x + sx * 12},{hy - 30} Z" fill="{f}" {st(2.6)}/>')
        s.append(f'<path d="M{x + sx * 32},{hy - 16} L{x + sx * 35},{hy - 38} L{x + sx * 20},{hy - 28} Z" fill="{PINK}"/>')
    s.append(f'<ellipse cx="{x}" cy="{hy}" rx="42" ry="36" fill="{f}" {st(3)}/>')
    for sx in (-1, 1):
        s.append(f'<path d="M{x + sx * 18},{hy - 2} q{sx * 6},-8 {sx * 12},0" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
        s.append(f'<circle cx="{x + sx * 26}" cy="{hy + 10}" r="6" fill="{PINK}" opacity=".7"/>')
        for dy in (-3, 4):
            s.append(f'<line x1="{x + sx * 22}" y1="{hy + 12}" x2="{x + sx * 52}" y2="{hy + 10 + dy * 2}" stroke="{INK}" stroke-width="1.4" stroke-linecap="round"/>')
    s.append(f'<path d="M{x - 5},{hy + 8} L{x + 5},{hy + 8} L{x},{hy + 13} Z" fill="#E77A93" {st(1.4)}/>')
    s.append(f'<path d="M{x - 8},{hy + 18} q4,5 8,0 q4,5 8,0" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    return '\n'.join(s)


parts.append(cat(66, 420))

# ── items
x, y = ITEM['milk']
parts.append(f'<path d="M{x + 56},{y - 104} L{x + 80},{y - 104} L{x + 80},{y - 82} C{x + 96},{y - 70} {x + 98},{y - 50} {x + 98},{y - 36} '
             f'L{x + 98},{y + 4} L{x + 38},{y + 4} L{x + 38},{y - 36} C{x + 38},{y - 50} {x + 40},{y - 70} {x + 56},{y - 82} Z" fill="{WHITE}" {st(2.8)}/>')
parts.append(f'<rect x="{x + 52}" y="{y - 116}" width="32" height="14" rx="4" fill="{BLUE}" {st(2.4)}/>')
parts.append(f'<rect x="{x + 42}" y="{y - 48}" width="52" height="28" rx="6" fill="{SKY}" {st(2)}/>')
parts.append(text(x + 68, y - 27, 'Sữa', size=17, weight=700))
parts.append(f'<path d="M{x - 42},{y - 6} L{x + 46},{y - 6} C{x + 42},{y + 24} {x + 26},{y + 34} {x + 2},{y + 34} '
             f'C{x - 22},{y + 34} {x - 38},{y + 24} {x - 42},{y - 6} Z" fill="{PINK}" {st(2.8)}/>')
parts.append(f'<ellipse cx="{x + 2}" cy="{y - 6}" rx="44" ry="10" fill="{WHITE}" {st(2.4)}/>')
x, y = ITEM['post']
parts.append(f'<rect x="{x - 12}" y="{y + 4}" width="76" height="18" rx="5" fill="{PURPLE}" {st(2.6)}/>')
parts.append(f'<rect x="{x + 16}" y="{y - 70}" width="20" height="76" fill="#E4C79A" {st(2.6)}/>')
for yy in range(y - 60, y + 4, 10):
    parts.append(f'<line x1="{x + 16}" y1="{yy}" x2="{x + 36}" y2="{yy + 6}" stroke="{BROWN}" stroke-width="1.8"/>')
parts.append(f'<rect x="{x - 4}" y="{y - 84}" width="60" height="16" rx="5" fill="{PURPLE}" {st(2.6)}/>')
parts.append(f'<path d="M{x + 46},{y - 68} L{x + 46},{y - 40}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<circle cx="{x + 46}" cy="{y - 36}" r="6" fill="{YELLOW}" {st(2)}/>')
x, y = ITEM['litter']
parts.append(f'<path d="M{x - 60},{y - 16} L{x + 76},{y - 16} L{x + 62},{y + 22} L{x - 48},{y + 22} Z" fill="{TEAL}" {st(2.8)}/>')
parts.append(f'<path d="M{x - 52},{y - 16} C{x - 30},{y - 30} {x + 40},{y - 30} {x + 68},{y - 16} Z" fill="#EBD9B4" {st(2.2)}/>')
x, y = ITEM['mouse']
parts.append(f'<path d="M{x + 40},{y + 6} C{x + 60},{y + 14} {x + 70},{y - 4} {x + 84},{y + 4}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
parts.append(f'<path d="M{x - 26},{y + 12} C{x - 22},{y - 20} {x + 20},{y - 24} {x + 42},{y + 10} Z" fill="{GREY}" {st(2.6)}/>')
parts.append(f'<circle cx="{x - 4}" cy="{y - 16}" r="10" fill="{GREY}" {st(2.4)}/>')
parts.append(f'<circle cx="{x - 4}" cy="{y - 16}" r="5" fill="{PINK}"/>')
parts.append(f'<circle cx="{x - 14}" cy="{y}" r="2.6" fill="{INK}"/>')
parts.append(f'<circle cx="{x - 27}" cy="{y + 10}" r="3" fill="#E77A93"/>')
x, y = ITEM['yarn']
for dx, col in ((-2, RED), (44, BLUE)):
    c = x + dx
    parts.append(f'<circle cx="{c}" cy="{y + 24}" r="30" fill="{col}" {st(2.8)}/>')
    for k in (-14, 0, 14):
        parts.append(f'<path d="M{c - 26},{y + 24 + k} Q{c},{y + 10 + k} {c + 26},{y + 24 + k}" fill="none" stroke="{mix(col, -.35)}" stroke-width="2"/>')
parts.append(f'<path d="M{x - 30},{y + 40} C{x - 60},{y + 50} {x - 70},{y + 30} {x - 90},{y + 44}" fill="none" stroke="{RED}" stroke-width="3" stroke-linecap="round"/>')
x, y = ITEM['ring']
parts.append(f'<ellipse cx="{x + 22}" cy="{y - 10}" rx="28" ry="22" fill="none" stroke="{INK}" stroke-width="13"/>')
parts.append(f'<ellipse cx="{x + 22}" cy="{y - 10}" rx="28" ry="22" fill="none" stroke="{RED}" stroke-width="8"/>')
parts.append(f'<circle cx="{x + 12}" cy="{y + 16}" r="9" fill="{YELLOW}" {st(2.4)}/>')
x, y = ITEM['fish']
parts.append(f'<path d="M{x - 18},{y} L{x + 70},{y}" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>')
for k in range(5):
    xx = x + 6 + k * 13
    parts.append(f'<path d="M{xx},{y - 18} L{xx + 4},{y} L{xx},{y + 18}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<path d="M{x - 18},{y} C{x - 12},{y - 20} {x - 44},{y - 22} {x - 46},{y} C{x - 44},{y + 22} {x - 12},{y + 20} {x - 18},{y} Z" fill="{WHITE}" {st(2.6)}/>')
parts.append(f'<path d="M{x - 38},{y - 5} l6,6 M{x - 32},{y - 5} l-6,6" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
parts.append(f'<path d="M{x + 70},{y} L{x + 88},{y - 16} L{x + 84},{y} L{x + 88},{y + 16} Z" fill="{WHITE}" {st(2.6)}/>')
x, y = ITEM['can']
parts.append(cyl_up(x + 22, y - 44, 84, 92, fill=ORANGE, ry=12, shine=False))
parts.append(f'<rect x="{x - 16}" y="{y - 20}" width="76" height="40" rx="6" fill="{CREAM}" {st(2)}/>')
parts.append(text(x + 22, y + 7, 'Thịt hộp', size=17, weight=700))
parts += LABEL_PARTS
save('bai54_t2_q5_maze', W, H, parts)
