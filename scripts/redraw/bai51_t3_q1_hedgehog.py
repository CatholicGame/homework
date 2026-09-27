"""
Vở BT Toán 2, Bài 51 Tiết 3 Q1 — nhím đi theo chỉ dẫn cây/hoa tới khu rừng nấm: nét riêng.
Giữ nội dung toán (cấu trúc đường đi): từ nhím, đoạn chung đi qua 2 cây rồi rẽ 3 nhánh:
  • nhánh trái → cây, hoa → 267 nấm      (cây, cây, cây, hoa)
  • nhánh giữa → hoa, hoa → 672 nấm      (cây, cây, hoa, hoa — mẫu)
  • nhánh phải → hoa, cây → 726 nấm      (cây, cây, hoa, cây)
Hàng chỉ dẫn dưới hình: Mẫu …672, a) …, b) … giữ đúng thứ tự biểu tượng.
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 495
PATH = '#E9C98F'
parts = []
parts.append(f'<rect x="6" y="6" width="{W - 12}" height="404" rx="24" fill="#F2FAEC" {st(2.8)}/>')


def road(d):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="15" stroke-linecap="round"/>'
            f'<path d="{d}" fill="none" stroke="{PATH}" stroke-width="10" stroke-linecap="round"/>')


P_MAIN = 'M690,386 L420,386 C300,386 170,270 124,132'
P_MID = 'M404,386 C356,352 334,220 420,102'
P_RIGHT = 'M396,382 C376,300 410,232 520,226 L690,222 C748,220 766,160 764,96'
for d in (P_MAIN, P_MID, P_RIGHT):
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="15" stroke-linecap="round"/>')
for d in (P_MAIN, P_MID, P_RIGHT):
    parts.append(f'<path d="{d}" fill="none" stroke="{PATH}" stroke-width="10" stroke-linecap="round"/>')


def bubble(cx, cy, n):
    return '\n'.join([f'<ellipse cx="{cx}" cy="{cy}" rx="92" ry="40" fill="{WHITE}" stroke="{SKY_D}" stroke-width="4"/>',
                      text(cx - 22, cy + 11, str(n), size=32, weight=700),
                      mushroom(cx + 38, cy + 16, 1.1)])


parts.append(bubble(122, 96, 267))
parts.append(bubble(452, 66, 672))
parts.append(bubble(762, 58, 726))

# shared stretch: 2 trees
parts.append(tree(480, 364, .9))
parts.append(tree(596, 364, .9))
# left branch: tree then flower
parts.append(tree(166, 396, .78))
parts.append(flower(96, 262, 1.1))
# middle branch: flower, flower
parts.append(flower(322, 262, 1.1))
parts.append(flower(356, 142, 1.1))
# right branch: flower then tree
parts.append(flower(566, 200, 1.1))
parts.append(tree(676, 200, .85))


def hedgehog(x, y):
    """x,y = feet centre; faces left"""
    s = []
    spikes = []
    n = 15
    for i in range(n + 1):
        a = math.pi + math.pi * i / n
        r = 70 if i % 2 == 0 else 50
        spikes.append(f'{x + 10 + r * math.cos(a) * 1.05:.1f},{y - 22 + r * math.sin(a) * .85:.1f}')
    s.append(f'<polygon points="{" ".join(spikes)}" fill="#7C6A5E" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x + 10}" cy="{y - 18}" rx="60" ry="22" fill="#9C8676" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<path d="M{x - 26},{y - 48} C{x - 56},{y - 54} {x - 78},{y - 32} {x - 86},{y - 22} C{x - 74},{y - 8} {x - 46},{y - 4} {x - 26},{y - 10} Z" fill="{CREAM}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{x - 88}" cy="{y - 22}" r="5.5" fill="{INK}"/>')
    s.append(f'<circle cx="{x - 52}" cy="{y - 32}" r="4.2" fill="{INK}"/><circle cx="{x - 53.5}" cy="{y - 33.5}" r="1.4" fill="{WHITE}"/>')
    s.append(f'<circle cx="{x - 58}" cy="{y - 17}" r="5" fill="{PINK}" opacity=".7"/>')
    for dx in (-20, 14, 40):
        s.append(f'<ellipse cx="{x + dx}" cy="{y - 2}" rx="10" ry="5" fill="{CREAM}" stroke="{INK}" stroke-width="2"/>')
    return '\n'.join(s)


parts.append(hedgehog(790, 392))

# ── instruction row
Y = 482
k = .42


def icons(x, seq):
    for t in seq:
        if t == 'c':
            parts.append(tree(x + 20, Y, k))
            x += 42
        else:
            parts.append(flower(x + 10, Y, k * 1.3))
            x += 24
    return x


parts.append(text(10, Y, 'Mẫu:', size=24, weight=600, anchor='start'))
x = icons(72, 'cchh')
parts.append(text(x + 6, Y, '672', size=26, weight=700, anchor='start', fill='#2A8FC7'))
parts.append(mushroom(x + 70, Y, .8))
parts.append(text(330, Y, 'a)', size=24, weight=600, anchor='start'))
x = icons(356, 'ccch')
parts.append(text(x + 6, Y, '.......', size=24, weight=600, anchor='start'))
parts.append(mushroom(x + 76, Y, .8))
parts.append(text(620, Y, 'b)', size=24, weight=600, anchor='start'))
x = icons(646, 'cchc')
parts.append(text(x + 6, Y, '.......', size=24, weight=600, anchor='start'))
parts.append(mushroom(x + 76, Y, .8))
save('bai51_t3_q1_hedgehog', W, H, parts)
