"""
Vở BT Toán 2, Bài 62 Tiết 1 Q4 — Rô-bốt đi qua các phép trừ đúng (nét riêng).
Giữ nội dung toán: 9 ô phép trừ đặt cột (hàng trên 372−124=158, 420−207=213,
372−124=158; hàng giữa 783−282=501, 983−309=674, 628−470=258; hàng dưới
420−216=214, 627−326=301, 491−380=111), các mũi tên nối đúng như sách (thẳng hàng
trên/dưới, chéo chữ X giữa các hàng, mũi tên hai chiều dọc ở cột 2 và 3), ba địa
điểm: sân vận động (trên), rạp chiếu phim có chữ "Rạp chiếu phim" (giữa), công viên
nước (dưới).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 543
BX, BY = (190, 345, 500), (5, 195, 385)
BW, BH = 100, 150
parts = []
st = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'

CALC = [[(372, 124, 158), (420, 207, 213), (372, 124, 158)],
        [(783, 282, 501), (983, 309, 674), (628, 470, 258)],
        [(420, 216, 214), (627, 326, 301), (491, 380, 111)]]


def calc_box(x, y, a, b, c):
    parts.append(f'<rect x="{x}" y="{y}" width="{BW}" height="{BH}" fill="{WHITE}" stroke="{INK}" stroke-width="2.6"/>')
    rx = x + BW - 12
    parts.append(text(rx, y + 40, a, size=28, weight=500, anchor='end'))
    parts.append(text(rx, y + 84, b, size=28, weight=500, anchor='end'))
    parts.append(f'<line x1="{x + 12}" y1="{y + 56}" x2="{x + 26}" y2="{y + 56}" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    parts.append(f'<line x1="{x + 16}" y1="{y + 98}" x2="{x + BW - 8}" y2="{y + 98}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(text(rx, y + 134, c, size=28, weight=500, anchor='end'))


for r in range(3):
    for c in range(3):
        calc_box(BX[c], BY[r], *CALC[r][c])

A = dict(size=11)
# thẳng hàng trên và hàng dưới
for r in (0, 2):
    y = BY[r] + 75
    parts.append(arrow(292, y, 342, y, **A))
    parts.append(arrow(447, y, 497, y, **A))
# chữ X giữa các hàng
for xl, xr in ((290, 345), (445, 500)):
    for yt in (BY[0] + BH, BY[1] + BH):
        yb = yt + 40
        parts.append(arrow(xl, yt, xr - 3, yb - 2, **A))
        parts.append(arrow(xl, yb, xr - 3, yt + 2, **A))
# hai chiều dọc
for x in (395, 550):
    for yt in (BY[0] + BH, BY[1] + BH):
        parts.append(arrow(x, yt + 4, x, yt + 36, both=True, size=9))
# ra địa điểm
parts.append(arrow(602, 80, 648, 80, **A))
parts.append(arrow(602, 270, 668, 270, **A))
parts.append(arrow(602, 460, 662, 460, **A))
# từ rô-bốt
parts.append(arrow(118, 196, 187, 84, **A))
parts.append(arrow(128, 270, 186, 270, **A))
parts.append(arrow(118, 356, 187, 456, **A))

# ── rô-bốt (nét riêng)
rx0 = 64
parts.append(f'<line x1="{rx0}" y1="200" x2="{rx0}" y2="184" stroke="{INK}" stroke-width="3"/><circle cx="{rx0}" cy="180" r="6" fill="{RED}" stroke="{INK}" stroke-width="2.2"/>')
for sx in (-1, 1):   # chân
    parts.append(f'<rect x="{rx0 + sx * 14 - 7}" y="318" width="14" height="42" rx="6" fill="{GREY_L}" {st}/>')
    parts.append(f'<rect x="{rx0 + sx * 14 - 15}" y="352" width="30" height="14" rx="7" fill="{BLUE}" {st}/>')
parts.append(f'<path d="M{rx0 - 32},262 L{rx0 - 48},300" stroke="{INK}" stroke-width="12" stroke-linecap="round"/><path d="M{rx0 - 32},262 L{rx0 - 48},300" stroke="{GREY_L}" stroke-width="6" stroke-linecap="round"/>')
parts.append(f'<path d="M{rx0 + 32},262 L{rx0 + 52},240" stroke="{INK}" stroke-width="12" stroke-linecap="round"/><path d="M{rx0 + 32},262 L{rx0 + 52},240" stroke="{GREY_L}" stroke-width="6" stroke-linecap="round"/>')
parts.append(f'<circle cx="{rx0 + 55}" cy="236" r="8" fill="{BLUE}" {st}/>')
parts.append(f'<circle cx="{rx0 - 50}" cy="304" r="8" fill="{BLUE}" {st}/>')
parts.append(f'<rect x="{rx0 - 32}" y="250" width="64" height="74" rx="16" fill="{BLUE}" {st}/>')
parts.append(f'<rect x="{rx0 - 18}" y="264" width="36" height="26" rx="6" fill="{WHITE}" stroke="{INK}" stroke-width="2"/>')
for i, cc in enumerate((RED, YELLOW, GREEN)):
    parts.append(f'<circle cx="{rx0 - 10 + i * 10}" cy="277" r="3.6" fill="{cc}"/>')
parts.append(f'<rect x="{rx0 - 42}" y="196" width="84" height="58" rx="22" fill="{GREY_L}" {st}/>')
parts.append(f'<rect x="{rx0 - 32}" y="206" width="64" height="38" rx="16" fill="#3D4A5C"/>')
for sx in (-1, 1):
    parts.append(f'<circle cx="{rx0 + sx * 14}" cy="224" r="7" fill="{SKY}"/>')
parts.append(f'<path d="M{rx0 - 6},236 q6,4 12,0" fill="none" stroke="{SKY}" stroke-width="2" stroke-linecap="round"/>')

# ── sân vận động (trên phải)
parts.append(f'<rect x="652" y="14" width="238" height="132" rx="66" fill="{ORANGE}" {st}/>')
parts.append(f'<rect x="668" y="30" width="206" height="100" rx="50" fill="none" stroke="{WHITE}" stroke-width="2" opacity=".8"/>')
parts.append(f'<rect x="686" y="42" width="170" height="76" rx="8" fill="{GRASS}" {st}/>')
parts.append(f'<line x1="771" y1="42" x2="771" y2="118" stroke="{WHITE}" stroke-width="2.4"/>')
parts.append(f'<circle cx="771" cy="80" r="14" fill="none" stroke="{WHITE}" stroke-width="2.4"/>')
for x, w in ((686, 26), (830, 26)):
    parts.append(f'<rect x="{x}" y="62" width="{w}" height="36" fill="none" stroke="{WHITE}" stroke-width="2.4"/>')

# ── rạp chiếu phim (giữa phải)
parts.append(f'<rect x="676" y="196" width="192" height="148" rx="8" fill="#3E4C7A" {st}/>')
parts.append(text(772, 222, 'Rạp chiếu phim', size=19, weight=700, fill=WHITE))
parts.append(f'<rect x="694" y="234" width="156" height="72" rx="4" fill="#DDEBFA" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<path d="M760,254 L760,288 L790,271 Z" fill="{RED}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
parts.append(f'<path d="M680,340 ' + ' '.join(f'q9,-26 18,0' for _ in range(10)) + f' L862,340 Z" fill="#232B45"/>')

# ── công viên nước (dưới phải)
parts.append(f'<rect x="668" y="470" width="222" height="62" rx="14" fill="{WATER_L}" {st}/>')
parts.append(f'<path d="M684,496 q12,-8 24,0 q12,8 24,0 q12,-8 24,0 q12,8 24,0 q12,-8 24,0 q12,8 24,0 q12,-8 24,0 q12,8 24,0" fill="none" stroke="{WATER_D}" stroke-width="2.4"/>')
parts.append(f'<rect x="700" y="404" width="44" height="72" fill="{YELLOW}" {st}/>')
parts.append(f'<path d="M694,406 L722,384 L750,406 Z" fill="{RED}" {st}/>')
parts.append(f'<path d="M744,414 C800,414 810,470 856,484" fill="none" stroke="{INK}" stroke-width="18" stroke-linecap="round"/>')
parts.append(f'<path d="M744,414 C800,414 810,470 856,484" fill="none" stroke="{PINK}" stroke-width="12" stroke-linecap="round"/>')
for x in (706, 734):
    parts.append(f'<line x1="{x}" y1="476" x2="{x}" y2="420" stroke="{INK}" stroke-width="1.6" opacity=".5"/>')
save('bai62_t1_q4_robot', W, H, parts)
