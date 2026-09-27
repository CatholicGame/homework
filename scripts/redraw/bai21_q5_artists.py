"""
Vở BT Toán 3, Bài 21 câu 5b — ba nghệ sĩ xiếc trên khung thép dạng khối hộp chữ nhật (12 cạnh).
Giữ nội dung toán: bạn gái treo hai tay vào CÙNG một cạnh trên phía sau; chú nằm ngang bám hai
tay vào CÙNG một cạnh đứng phía trước bên phải; bạn trồng chuối chống hai tay trên CÙNG một cạnh
dưới của mặt bên phải → 3 cạnh được bám, 9 cạnh không ai bám. Người vẽ nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 1064, 684
# khung: mặt trước F, mặt sau B (lệch lên phải)
F = [(18, 158), (742, 158), (742, 664), (18, 664)]          # TL TR BR BL
OFF = (300, -140)
BK = [(x + OFF[0], y + OFF[1]) for x, y in F]
BAR, BAR_IN = '#9AA6B2', '#EEF2F6'


def bar(p, q):
    return (line(*p, *q, sw=15, col=INK) + line(*p, *q, sw=8, col=BAR_IN))


def limb(pts, col, w=26):
    d = 'M' + ' L'.join(f'{x:.0f},{y:.0f}' for x, y in pts)
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 7}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def hand(x, y, r=14):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SKIN}" stroke="{INK}" stroke-width="3.5"/>'


def head(x, y, r, hair, flip=False, bun=False, rot=0):
    s = [f'<g transform="rotate({rot} {x} {y})">']
    if bun:
        s.append(f'<circle cx="{x}" cy="{y + r * 1.05}" r="{r * .42}" fill="{hair}" stroke="{INK}" stroke-width="3.5"/>')
    s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{SKIN}" stroke="{INK}" stroke-width="3.5"/>')
    hy = y + r * .15 if flip else y - r * .15
    sweep = 0 if flip else 1
    s.append(f'<path d="M{x - r},{hy} A{r},{r} 0 0 {sweep} {x + r},{hy} Q{x},{hy + (-.35 if not flip else .35) * r * -1} {x - r},{hy} Z" '
             f'fill="{hair}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    ey = y + (-r * .35 if flip else r * .25)
    s.append(f'<circle cx="{x - r * .35}" cy="{ey}" r="4" fill="{INK}"/><circle cx="{x + r * .35}" cy="{ey}" r="4" fill="{INK}"/>')
    my = ey + (-r * .3 if flip else r * .3)
    s.append(f'<path d="M{x - 7},{my} Q{x},{my + (-7 if flip else 7)} {x + 7},{my}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<circle cx="{x - r * .6}" cy="{my}" r="5" fill="{PINK}" opacity=".7"/><circle cx="{x + r * .6}" cy="{my}" r="5" fill="{PINK}" opacity=".7"/>')
    s.append('</g>')
    return ''.join(s)


parts = []
# cạnh phía sau (vẽ trước)
for i in range(4):
    parts.append(bar(BK[i], BK[(i + 1) % 4]))
for i in (0, 3):                                    # cạnh nối trái (sau lưng mặt trước)
    parts.append(bar(F[i], BK[i]))

# ── bạn gái treo trên cạnh trên phía sau (BK[0]–BK[1]) ──
g1, g2 = (392, 18), (500, 18)
dress = PINK
parts.append(limb([(528, 240), (640, 212), (700, 232)], SKIN, 22))       # chân duỗi
parts.append(limb([(520, 250), (560, 300), (600, 320)], SKIN, 22))       # chân co
parts.append(limb([(420, 132), g1], SKIN, 20))
parts.append(limb([(470, 132), g2], SKIN, 20))
parts.append(f'<path d="M{420},{130} L{474},{128} L{540},{226} Q{560},{258} {500},{282} Q{470},{290} {452},{262} Z" fill="{dress}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(f'<path d="M474,204 L546,230 Q576,276 556,310 Q520,318 492,300 Q466,296 438,278 Q444,238 474,204 Z" fill="{shade(dress, -.1)}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(head(446, 104, 32, HAIR, bun=False))
parts.append(hand(*g1) + hand(*g2))
parts.append(f'<ellipse cx="706" cy="234" rx="16" ry="10" fill="{RED}" stroke="{INK}" stroke-width="3.5"/><ellipse cx="604" cy="324" rx="16" ry="10" fill="{RED}" stroke="{INK}" stroke-width="3.5"/>')

# ── chú nằm ngang, hai tay bám cạnh đứng trước bên phải (F[1]–F[2]) ──
m1, m2 = (742, 282), (742, 604)
suit, pants = YELLOW, '#5B8DEF'
parts.append(limb([(470, 418), (300, 400), (170, 392)], pants, 34))
parts.append(limb([(470, 446), (300, 440), (170, 436)], pants, 34))
parts.append(f'<ellipse cx="160" cy="392" rx="14" ry="20" fill="{INK}"/><ellipse cx="160" cy="436" rx="14" ry="20" fill="{INK}"/>')
parts.append(f'<path d="M452,394 L630,386 Q654,430 630,478 L452,470 Z" fill="{suit}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(limb([(622, 400), m1], SKIN, 22))
parts.append(limb([(622, 466), m2], SKIN, 22))
parts.append(head(676, 432, 34, HAIR, rot=90))

# ── bạn trồng chuối, hai tay chống trên cạnh dưới mặt phải (F[2]–BK[2]) ──
def on_edge(t):
    (x1, y1), (x2, y2) = F[2], BK[2]
    return (x1 + (x2 - x1) * t, y1 + (y2 - y1) * t)
h1, h2 = on_edge(.3), on_edge(.62)
kid = GREEN
parts.append(limb([(900, 262), (948, 170), (986, 92)], kid, 28))
parts.append(limb([(924, 268), (982, 190), (1020, 118)], kid, 28))
parts.append(f'<ellipse cx="990" cy="84" rx="12" ry="18" transform="rotate(25 990 84)" fill="{WHITE}" stroke="{INK}" stroke-width="3.5"/>')
parts.append(f'<ellipse cx="1024" cy="110" rx="12" ry="18" transform="rotate(25 1024 110)" fill="{WHITE}" stroke="{INK}" stroke-width="3.5"/>')
parts.append(f'<path d="M886,262 L940,262 Q950,340 944,420 L884,420 Q876,340 886,262 Z" fill="{kid}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(limb([(890, 410), (h1[0], h1[1] - 8)], SKIN, 20))
parts.append(limb([(940, 410), (h2[0], h2[1] - 8)], SKIN, 20))
parts.append(head(916, 462, 32, '#7A4B2A', flip=True))

# cạnh phía trước (vẽ sau cùng, đè lên người) — trừ cạnh đứng phải để hai bàn tay nắm lên trên
for i in (0, 2, 3):
    parts.append(bar(F[i], F[(i + 1) % 4]))
parts.append(bar(F[1], BK[1]))
parts.append(bar(F[2], BK[2]))
parts.append(bar(F[1], F[2]))
# bàn tay nắm lên thanh (vẽ đè)
parts.append(hand(*m1) + hand(*m2))
parts.append(hand(h1[0], h1[1] - 5) + hand(h2[0], h2[1] - 5))
save('bai21_q5_artists', W, H, parts, folder='grade3-workbook')
