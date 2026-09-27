"""
Vở BT Toán 2, Bài 32 Q2 — lịch tháng Bảy và bốn cuộc thi của Rô-bốt: nét riêng.
Giữ nội dung toán: tờ lịch "THÁNG BẢY" (ngày 1 là thứ Tư, 31 ngày, cột Chủ nhật tô màu);
các ngày khoanh tròn và mũi tên nét đứt: 5 → thi vẽ (trên phải), 11 → thi hát (trên trái),
23 → thi bơi (dưới trái), 31 → thi võ (dưới phải).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 476
CAL = '#2F8FB8'
parts = []


def blob(x, y, w, h, inner, fill='#FFFBF3'):
    cx, cy = x + w / 2, y + h / 2
    d = (f'M{x + w * .1},{cy} C{x - w * .02},{y + h * .1} {x + w * .35},{y - h * .04} {cx},{y + h * .03} '
         f'C{x + w * .8},{y - h * .02} {x + w * 1.02},{y + h * .2} {x + w * .98},{cy} '
         f'C{x + w * 1.02},{y + h * .85} {x + w * .7},{y + h * 1.02} {cx},{y + h * .98} '
         f'C{x + w * .25},{y + h * 1.03} {x - w * .02},{y + h * .85} {x + w * .1},{cy} Z')
    cid = uid('b')
    return (f'<clipPath id="{cid}"><path d="{d}"/></clipPath><path d="{d}" fill="{fill}"/>'
            f'<g clip-path="url(#{cid})">{inner}</g><path d="{d}" fill="none" {st(2.6)}/>')


# ── bốn bức tranh
mic = (f'<rect x="54" y="-176" width="12" height="46" rx="5" fill="{GREY}" {st(2.4)} transform="rotate(-20 60 -150)"/>'
       f'<circle cx="68" cy="-182" r="12" fill="{INK}"/>')
parts.append(blob(15, 15, 235, 180,
    place(118, 186, .5, robot(arms=((-70, -200), (56, -150)), legs='walk', expr='happy', extra_front=mic))
    + note(190, 60, 1, '#7C6FD0') + note(60, 70, .9, '#7C6FD0')))
easel = (f'<path d="M110,-20 L150,-250 M190,-20 L150,-250 M150,-250 L150,-20" {st(6)}/>'
         f'<rect x="96" y="-240" width="110" height="130" rx="4" fill="#fff" {st()}/>'
         f'<circle cx="130" cy="-190" r="16" fill="{YELLOW}"/><path d="M104,-128 Q140,-170 196,-130 Z" fill="{GREEN}"/>')
parts.append(blob(650, 8, 245, 196,
    place(740, 196, .6, robot(arms=((80, -170), (-60, -110)), legs='stand', expr='open', look=10, extra_back=easel))
    + f'<ellipse cx="712" cy="130" rx="22" ry="14" fill="{CREAM}" {st(2.4)}/><circle cx="706" cy="126" r="4" fill="{RED}"/><circle cx="718" cy="132" r="4" fill="{BLUE}"/>'))
pool = (f'<rect x="0" y="330" width="330" height="140" fill="{WATER_L}"/>'
        f'<path d="M0,346 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0" fill="none" stroke="{WATER_D}" stroke-width="3"/>'
        f'<path d="M190,340 L190,300 M220,340 L220,300 M190,312 L220,312 M190,326 L220,326" {st(3.5)}/>')
swimmer = (place(300, 368, .58, robot(arms=((-40, -360), (40, -350)), legs='stand', expr='sleep'), rot=-90)
           + f'<path d="M0,376 q20,-8 40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 t40,0 L330,470 L0,470 Z" fill="{WATER_L}" fill-opacity=".75" stroke="{WATER_D}" stroke-width="3"/>'
           + f'<circle cx="262" cy="360" r="4" fill="{WATER_D}"/><circle cx="274" cy="350" r="3" fill="{WATER_D}"/>')
parts.append(blob(5, 290, 315, 170, pool + swimmer, fill='#F3F8FB'))
belt = f'<path d="M-44,-110 L44,-110" stroke="{INK}" stroke-width="8"/><path d="M-6,-110 l-10,24 M6,-110 l10,24" {st(5)}/>'
parts.append(blob(672, 250, 222, 212,
    place(778, 446, .62, robot(arms=((96, -200), (-70, -130)), legs='walk', expr='fierce', body='#FFFFFF', extra_front=belt))))

# ── tờ lịch
x0, y0, cw, rh = 342, 150, 33, 40
calw = cw * 7
parts.append(f'<rect x="{x0 - 8}" y="{y0}" width="{calw + 16}" height="{rh * 5 + 96}" rx="6" fill="#EAF6FB" {st(2.4)}/>')
for i in range(8):
    parts.append(f'<circle cx="{x0 + 10 + i * (calw - 20) / 7}" cy="{y0}" r="4" fill="#fff" {st(2)}/>')
parts.append(text(x0, y0 + 34, 'THÁNG BẢY', size=22, weight=700, fill=CAL, anchor='start'))
hy = y0 + 44
parts.append(f'<rect x="{x0}" y="{hy}" width="{calw}" height="32" fill="{CAL}"/>')
days = [('Thứ', 'Hai'), ('Thứ', 'Ba'), ('Thứ', 'Tư'), ('Thứ', 'Năm'), ('Thứ', 'Sáu'), ('Thứ', 'Bảy'), ('Chủ', 'nhật')]
for i, (a, b) in enumerate(days):
    cx = x0 + cw * i + cw / 2
    parts.append(text(cx, hy + 13, a, size=10, weight=700, fill='#fff') + text(cx, hy + 26, b, size=10, weight=700, fill='#fff'))
gy = hy + 32
parts.append(f'<rect x="{x0}" y="{gy}" width="{calw}" height="{rh * 5}" fill="#fff" stroke="{CAL}" stroke-width="2"/>')
for i in range(1, 7):
    parts.append(f'<line x1="{x0 + cw * i}" y1="{hy}" x2="{x0 + cw * i}" y2="{gy + rh * 5}" stroke="{CAL}" stroke-width="1.5"/>')
for j in range(1, 5):
    parts.append(f'<line x1="{x0}" y1="{gy + rh * j}" x2="{x0 + calw}" y2="{gy + rh * j}" stroke="{CAL}" stroke-width="1.5"/>')
cells = {}
for d in range(1, 32):
    k = d + 1                       # ngày 1 ở cột thứ Tư (chỉ số 2)
    col, row = k % 7, k // 7
    cx, cy = x0 + cw * col + cw / 2, gy + rh * row + rh / 2
    cells[d] = (cx, cy)
    parts.append(text(cx, cy + 7, d, size=19, weight=600, fill=CAL if col == 6 else INK))
for d in (5, 11, 23, 31):
    cx, cy = cells[d]
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="15" fill="none" stroke="{CAL}" stroke-width="3"/>')
# mũi tên
parts.append(arrow_dash(cells[5][0] + 10, cells[5][1] - 16, 648, 160, CAL, bend=-20))
parts.append(arrow_dash(cells[11][0] - 14, cells[11][1] - 10, 252, 184, CAL, bend=20))
parts.append(arrow_dash(cells[23][0] - 16, cells[23][1] + 4, 318, 378, CAL, bend=-10))
parts.append(arrow_dash(cells[31][0] + 16, cells[31][1], 666, cells[31][1] - 4, CAL))
save('bai32_q2_contests', W, H, parts)
