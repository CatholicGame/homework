"""
Vở BT Toán 2, Bài 58 Tiết 1 Q4 — ba con vật dài 32 m, 26 m, 16 m (nét riêng).
Giữ nội dung toán: A = cá voi xanh 32 m, B = khủng long cổ dài 26 m, C = cá voi nhỏ
16 m; mỗi con có hai vạch đứt ở hai đầu và mũi tên đo ghi số mét. Chiều dài vẽ
cùng tỉ lệ 16 px/m như sách (A dài nhất).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 447
S = 16
parts = []
st = f'stroke="{INK}" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"'


def dashed(x, y0, y1):
    parts.append(f'<line x1="{x}" y1="{y0}" x2="{x}" y2="{y1}" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>')


def measure(x0, m, ytop0, ytop1, yarr, letter, lx):
    x1 = x0 + m * S
    dashed(x0, ytop0, yarr + 12)
    dashed(x1, ytop1, yarr + 12)
    parts.append(dim(x0, x1, yarr, f'{m} m', size=26, ly=yarr + 30))
    parts.append(text(lx, yarr + 2, letter, size=28, weight=600, anchor='start'))


# ── A: cá voi xanh, đầu bên trái (x=80) đuôi bên phải (x=592)
BW, BWL = '#79AEE0', '#D6E9FA'
parts.append(f'<path d="M80,70 C90,40 180,22 300,24 C420,26 505,45 548,62 C562,52 576,40 592,34 '
             f'C588,54 580,62 570,68 C582,74 590,84 592,98 C576,92 562,82 552,74 C500,94 400,112 290,110 '
             f'C170,108 95,100 80,70 Z" fill="{BW}" {st}/>')
parts.append(f'<path d="M84,78 C110,98 190,106 290,104 C390,102 470,88 520,76 C440,86 330,92 250,88 C170,84 110,80 84,78 Z" fill="{BWL}"/>')
parts.append(f'<path d="M82,74 C110,80 140,82 170,80" fill="none" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>')
parts.append(f'<circle cx="150" cy="60" r="5" fill="{INK}"/><circle cx="151.5" cy="58.5" r="1.6" fill="{WHITE}"/>')
parts.append(f'<circle cx="170" cy="72" r="6" fill="{PINK}" opacity=".6"/>')
parts.append(f'<path d="M230,92 C236,112 250,124 270,128 C266,112 258,100 250,92 Z" fill="{BW}" {st}/>')
parts.append(f'<path d="M340,24 L352,12 L360,26" fill="{BW}" {st}/>')
measure(80, 32, 30, 34, 134, 'A.', 22)

# ── B: khủng long cổ dài, đầu bên trái (x=80) đuôi bên phải (x=496)
G, GL = '#8FD08A', '#CDEEC4'
# chân sau (phía xa)
for x in (262, 382):
    parts.append(f'<rect x="{x}" y="320" width="26" height="72" rx="10" fill="#6DB86A" {st}/>')
# cổ
neck = 'M262,296 C200,270 160,200 104,190'
parts.append(f'<path d="{neck}" fill="none" stroke="{INK}" stroke-width="30" stroke-linecap="round"/>')
parts.append(f'<path d="{neck}" fill="none" stroke="{G}" stroke-width="24" stroke-linecap="round"/>')
# đuôi thon về x=496
parts.append(f'<path d="M420,280 C450,288 475,294 496,300 C470,306 445,318 410,326 Z" fill="{G}" {st}/>')
# thân
parts.append(f'<ellipse cx="335" cy="300" rx="100" ry="52" fill="{G}" {st}/>')
parts.append(f'<path d="M258,320 C290,346 380,350 420,322" fill="none" stroke="{GL}" stroke-width="10" stroke-linecap="round"/>')
for x in (300, 340, 380):
    parts.append(f'<circle cx="{x}" cy="{282 - (x - 340) ** 2 / 400}" r="7" fill="{GL}"/>')
# chân trước (phía gần)
for x in (240, 360):
    parts.append(f'<rect x="{x}" y="326" width="28" height="70" rx="11" fill="{G}" {st}/>')
    parts.append(f'<path d="M{x + 4},390 h20" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
# đầu
parts.append(f'<ellipse cx="102" cy="190" rx="22" ry="14" fill="{G}" {st}/>')
parts.append(f'<circle cx="98" cy="185" r="3.6" fill="{INK}"/><circle cx="99" cy="184" r="1.2" fill="{WHITE}"/>')
parts.append(f'<path d="M84,196 q8,4 16,1" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
measure(80, 26, 190, 300, 410, 'B.', 22)

# ── C: cá voi nhỏ, đầu bên trái (x=624) đuôi vểnh bên phải (x=880)
CW, CWL = '#5FC3D6', '#D2F1F6'
parts.append(f'<path d="M624,322 C628,285 680,268 745,280 C800,290 830,300 846,292 C856,280 866,268 880,262 '
             f'C874,284 866,296 858,302 C868,308 876,318 880,332 C862,330 848,320 840,314 C800,345 740,368 690,362 '
             f'C650,356 624,345 624,322 Z" fill="{CW}" {st}/>')
parts.append(f'<path d="M628,332 C640,352 680,360 720,356 C760,350 790,338 810,326 C770,338 720,344 680,340 C656,338 638,336 628,332 Z" fill="{CWL}"/>')
parts.append(f'<path d="M626,328 C640,332 656,332 672,330" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
parts.append(f'<circle cx="662" cy="312" r="4.4" fill="{INK}"/><circle cx="663.4" cy="310.6" r="1.4" fill="{WHITE}"/>')
parts.append(f'<circle cx="680" cy="324" r="5" fill="{PINK}" opacity=".6"/>')
parts.append(f'<path d="M708,352 C714,372 726,384 744,388 C740,372 732,360 724,352 Z" fill="{CW}" {st}/>')
measure(624, 16, 318, 262, 410, 'C.', 586)
save('bai58_t1_q4_animals', W, H, parts)
