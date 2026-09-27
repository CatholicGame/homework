"""
Vở BT Toán 2, Bài 24 Tiết 2 Q2 — chuồn chuồn bay theo sợi dây qua ba bông hoa: nét riêng.
Giữ nội dung toán: xuất phát ở mũi tên (bên chuồn chuồn), dây có một vòng xoắn nhỏ rồi
gặp lần lượt hoa 19, hoa 61, hoa 7, kết thúc ở lá sen.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 384
parts = []

ROPE = ('M122,68 C250,72 380,80 420,70 C466,58 470,8 440,8 C408,8 404,52 444,68 '
        'C476,80 500,76 530,74 C650,80 790,70 782,112 C774,152 520,170 430,200 '
        'C340,230 290,262 330,292 C370,320 520,322 610,322 C700,322 760,300 812,292')
parts.append(f'<path d="{ROPE}" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>')
parts.append(f'<path d="{ROPE}" fill="none" stroke="#B07A4F" stroke-width="3" stroke-linecap="round"/>')

# start arrow
parts.append(f'<path d="M86,52 L126,68 L86,84 L96,68 Z" fill="{SKY_D}" {st(2.6)}/>')
parts.append(f'<line x1="80" y1="68" x2="96" y2="68" {st(3)}/>')


def dragonfly(x, y):
    g = []
    for dy, rot in ((-4, -28), (4, 28)):
        for dx in (-6, 8):
            g.append(f'<ellipse cx="{x + dx}" cy="{y + dy * 5}" rx="9" ry="24" fill="#DDF2FB" {st(2)} transform="rotate({rot} {x + dx} {y + dy * 5})"/>')
    g.append(f'<rect x="{x - 40}" y="{y - 4}" width="40" height="8" rx="4" fill="{TEAL}" {st(2.2)}/>')
    g.append(f'<ellipse cx="{x + 4}" cy="{y}" rx="10" ry="7" fill="{TEAL}" {st(2.2)}/>')
    g.append(f'<circle cx="{x + 18}" cy="{y}" r="8" fill="{TEAL}" {st(2.2)}/>')
    g.append(eye(x + 21, y - 2, 2.4))
    return ''.join(g)


parts.append(dragonfly(46, 50))


def flower(cx, cy, n, petal=PINK, dark='#E77AA6'):
    g = []
    for i in range(10):
        a = i * 36
        g.append(f'<ellipse cx="{cx}" cy="{cy - 34}" rx="14" ry="22" fill="{petal if i % 2 else dark}" {st(2.2)} transform="rotate({a} {cx} {cy})"/>')
    g.append(f'<circle cx="{cx}" cy="{cy}" r="22" fill="{WHITE}" {st(2.4)}/>')
    g.append(text(cx, cy + 9, n, size=25, weight=700))
    return ''.join(g)


parts.append(flower(532, 72, '19', '#FFD166', '#F4A259'))
parts.append(flower(432, 200, '61', PINK, '#E77AA6'))
parts.append(flower(620, 322, '7', '#B9A7F0', '#9580E0'))

# lily pad with a lotus bud at the end
parts.append(lily_pad(842, 284, 56, 26, 150))
parts.append(f'<path d="M850,272 Q852,240 846,218" fill="none" stroke="{GRASS_D}" stroke-width="4"/>')
for rot in (-30, 0, 30):
    parts.append(f'<ellipse cx="846" cy="196" rx="10" ry="24" fill="{PINK}" {st(2.2)} transform="rotate({rot} 846 214)"/>')

save('bai24_t2_q2_dragonfly', W, H, parts)
