"""Vở BT Toán 1 Tập Hai — Bài 28 (Luyện tập chung), trang 41–44.
T1 q1: a) xe tải nhỏ, ô tô con, xe buýt (dài nhất: xe buýt); b) xe khách nhỏ, xe chòi chân, xe đạp (ngắn nhất: xe chòi chân).
T1 q2: 7 bạn áo số 1, 2, 5, 6, 10, 9, 15 (cao nhất: số 2, thấp nhất: số 6).
T1 q3: a) bút chì dài 5 ghim giấy = 4 gọt bút chì; b) bàn dài 5 thước kẻ = 10 gang tay.
T2 q1: hươu cao cổ 6 cm, thỏ 3 cm, kì lân 6 cm (1 cm = 50 đơn vị hình, đo bằng 📏 Thước).
T2 q2: a) Chi và rô-bốt cạnh cột đo (rô-bốt thấp hơn); b) hai hộp giống nhau, bút chì dài hơn hộp, bút mực ngắn hơn hộp.
T2 q3: bục 2 – 1 – 3, Việt, Mai, Nam.  T2 q4: 2 dãy × 6 bàn, cô giáo đứng ở dãy bàn số 4."""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_c import *

# ── T1 q1: xe ─────────────────────────────────────────────────────────────────
W, H = 780, 372
p = [f'<rect x="0" y="176" width="{W}" height="12" fill="{GREY_L}" opacity=".7"/>',
     f'<rect x="0" y="356" width="{W}" height="12" fill="{GREY_L}" opacity=".7"/>',
     text(14, 30, 'a)', 22, 700, anchor='start'), text(14, 214, 'b)', 22, 700, anchor='start')]
p += [pickup(48, 176), small_car(310, 176), bus(486, 176, 272)]
p += [van(40, 356, 246), ride_on(336, 356, 124), bicycle(536, 356, 200)]
out('bai28_t1_q1_vehicles', W, H, p)

# ── T1 q2: đội bóng 7 bạn ─────────────────────────────────────────────────────
W, H = 780, 350
GROUND = 322
nums = [1, 2, 5, 6, 10, 9, 15]
hs = [226, 262, 218, 190, 208, 214, 232]          # chiều cao vẽ (tham số h của kid)
mouths = ['smile', 'open', 'smile', 'smile', 'open', 'smile', 'smile']
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#EAF6FF"/>',
     f'<path d="M0,{GROUND - 26} H{W} V{H} H0 Z" fill="{GRASS}"/>',
     f'<path d="M0,{GROUND - 26} H{W}" stroke="{GRASS_D}" stroke-width="3"/>']
for i, (n, h) in enumerate(zip(nums, hs)):
    x = 56 + i * 106
    p.append(shadow(x, GROUND - 2, 40, 6, .15))
    p.append(K1.kid(x, GROUND, h, shirt='#7CC6F0', bottom='#3F4F68', shoe='#2F6FB3', pose='hips', mouth=mouths[i]))
    cy = GROUND - h * 172 / 260
    p.append(text(x, cy + h * .045, str(n), round(h * .1), 700))
bx = 56 + 6 * 106 + 48
p.append(f'<circle cx="{bx}" cy="{GROUND - 18}" r="18" fill="#fff" {st()}/>'
         f'<path d="M{bx - 7},{GROUND - 24} L{bx + 6},{GROUND - 26} L{bx + 9},{GROUND - 14} L{bx - 2},{GROUND - 8} L{bx - 10},{GROUND - 15} Z" fill="{INK}"/>')
out('bai28_t1_q2_team', W, H, p)

# ── T1 q3a: ghim giấy, bút chì, gọt bút chì ───────────────────────────────────
W, H = 640, 262
X0, L = 30, 580
p = [f'<line x1="{X0}" y1="6" x2="{X0}" y2="{H - 6}" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>',
     f'<line x1="{X0 + L}" y1="6" x2="{X0 + L}" y2="{H - 6}" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>']
for i in range(5):
    p.append(paper_clip(X0 + i * L / 5 + 3, 40, L / 5 - 6, 36))
p.append(pencil(X0, 116, L, 48, YELLOW))
for i in range(4):
    p.append(sharpener(X0 + i * L / 4, 170, L / 4, 66, TEAL))
out('bai28_t1_q3a_clips', W, H, p)

# ── T1 q3b: cái bàn, 5 thước kẻ, 10 gang tay ──────────────────────────────────
W, H = 780, 354
p = ['<g transform="translate(0,24)">']
TOP = '#BFE3F7'
# chân sau
for lx, ly in ((196, 84), (716, 84)):
    p.append(f'<rect x="{lx}" y="{ly}" width="26" height="150" fill="#9AA4AE" {st()}/>')
p.append(P('M130,70 H750 L690,140 H70 Z', TOP))
p.append(P('M70,140 H690 V156 H70 Z', '#4A5563'))
p.append(P('M690,140 L750,70 V86 L690,156 Z', '#3A4350'))
for lx in (96, 640):
    p.append(f'<rect x="{lx}" y="156" width="30" height="156" fill="#AEB7C0" {st()}/>'
             f'<rect x="{lx + 22}" y="156" width="8" height="156" fill="#8E99A4"/>')
# 5 thước kẻ dọc mép trước
RX, RL = 90, 600
for i in range(5):
    p.append(ruler_strip(RX + i * RL / 5, 118, RL / 5, 16))
# 10 gang tay: vạch + mũi tên hai đầu
SX, SL, SY = 112, 600, 92
for i in range(11):
    tx = SX + i * SL / 10
    p.append(f'<line x1="{tx - 4}" y1="{SY + 5}" x2="{tx + 4}" y2="{SY - 5}" {st(2.6)}/>')
p.append(f'<line x1="{SX + 6}" y1="106" x2="{SX + SL - 6}" y2="106" {st(2.2)}/>'
         f'<path d="M{SX + 14},100 L{SX + 2},106 L{SX + 14},112 M{SX + SL - 14},100 L{SX + SL - 2},106 L{SX + SL - 14},112" fill="none" {st(2.2)}/>')
p.append(hand_span(SX, SY, SL / 10))
p.append('</g>')
out('bai28_t1_q3b_table', W, H, p)

# ── T2 q1: hươu cao cổ, thỏ, kì lân (1 cm = 50) ───────────────────────────────
W, H = 760, 380
BASE, PER = 360, 50
def arrow_v(x, y1, y2, col='#2E9BD6'):
    return (f'<line x1="{x}" y1="{y1 + 4}" x2="{x}" y2="{y2}" stroke="{col}" stroke-width="2.6"/>'
            f'<path d="M{x - 6},{y1 + 12} L{x},{y1} L{x + 6},{y1 + 12} Z" fill="{col}"/>'
            f'<path d="M{x - 6},{y2 - 12} L{x},{y2} L{x + 6},{y2 - 12} Z" fill="{col}"/>')
def dash_h(x1, x2, y):
    return f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>'
gt, rt = BASE - 6 * PER, BASE - 3 * PER
p = [f'<ellipse cx="{W / 2}" cy="{BASE + 2}" rx="{W / 2 - 20}" ry="12" fill="{GREY_L}"/>', dash_h(20, 740, BASE),
     giraffe(130, BASE, 6 * PER), dash_h(110, 290, gt), arrow_v(262, gt, BASE),
     bunny(352, BASE, 3 * PER), dash_h(312, 450, rt), arrow_v(424, rt, BASE),
     unicorn(622, BASE, 6 * PER), dash_h(474, 650, gt), arrow_v(492, gt, BASE)]
out('bai28_t2_q1_animals', W, H, p)

# ── T2 q2a: Chi và rô-bốt ─────────────────────────────────────────────────────
W, H = 340, 300
GB = 276
p = [f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="24" fill="#F4FBFF" {st(2.6, "#7CC6E8")}/>',
     f'<rect x="40" y="{GB}" width="{W - 80}" height="7" fill="{GREY}" {st(2)}/>',
     f'<rect x="161" y="30" width="9" height="{GB - 30}" fill="#8E99A6" {st(2.2)}/>']
girl_h = 210
gtop = GB - girl_h * 282 / 260
p.append(K1.kid(98, GB, girl_h, girl=True, shirt='#7CC6F0', bottom='#4E8FC8', pose='down'))
rob_h = 160
rtop = GB - rob_h * 202 / 200
p.append(K1.robot(248, GB, rob_h, arm_pose='wave'))
p.append(f'<line x1="70" y1="{gtop:.0f}" x2="161" y2="{gtop:.0f}" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"/>')
p.append(f'<line x1="170" y1="{rtop:.0f}" x2="240" y2="{rtop:.0f}" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"/>')
out('bai28_t2_q2a_height', W, H, p)

# ── T2 q2b: hai hộp, bút chì, bút mực ─────────────────────────────────────────
def cuboid(x, y, w, h, d=16, col='#9AD3F2'):
    return (f'<path d="M{x},{y + d} L{x + d},{y} H{x + w + d} V{y + h} L{x + w},{y + h + d} Z" fill="{col}" {st()}/>'
            f'<path d="M{x},{y + d} H{x + w} V{y + h + d} H{x} Z" fill="{col}" {st()}/>'
            f'<path d="M{x},{y + d} L{x + d},{y} H{x + w + d} L{x + w},{y + d} Z" fill="#C8E8FA" {st(2.4)}/>'
            f'<path d="M{x + w},{y + d} L{x + w + d},{y} V{y + h} L{x + w},{y + h + d} Z" fill="#6FB7EA" {st(2.4)}/>')
def fountain_pen(x, y, L, h=16):
    r = h / 2
    return (f'<rect x="{x}" y="{y - r}" width="{L * .62:.1f}" height="{h}" rx="{r}" fill="{PURPLE}" {st(2.4)}/>'
            f'<rect x="{x + L * .5:.1f}" y="{y - r}" width="{L * .2:.1f}" height="{h}" fill="{YELLOW}" {st(2.2)}/>'
            f'<path d="M{x + L * .7:.1f},{y - r + 2} L{x + L},{y} L{x + L * .7:.1f},{y + r - 2} Z" fill="#C9D1DA" {st(2.2)}/>'
            f'<line x1="{x + L * .76:.1f}" y1="{y}" x2="{x + L - 3}" y2="{y}" {st(1.4)}/>'
            f'<rect x="{x + 10}" y="{y - r - 4}" width="{L * .3:.1f}" height="5" rx="2" fill="{YELLOW}" {st(1.8)}/>')
W, H = 340, 158
p = [f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="22" fill="#F4FBFF" {st(2.6, "#7CC6E8")}/>']
BX1, BX2, BW = 24, 196, 104
for bx in (BX1, BX2):
    p.append(cuboid(bx, 22, BW, 60))
    for ex in (bx, bx + BW):
        p.append(f'<line x1="{ex}" y1="100" x2="{ex}" y2="136" stroke="{INK}" stroke-width="1.8" stroke-dasharray="4 4"/>')
p.append(pencil(BX1, 128, BW + 26, 16, '#6FB7EA'))
p.append(fountain_pen(BX2, 128, BW - 26, 16))
out('bai28_t2_q2b_pens', W, H, p)

# ── T2 q3: bục nhận giải ──────────────────────────────────────────────────────
W, H = 540, 390
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#FFF8EC"/>']
BOT = 376
blocks = [(120, 270, '2'), (220, 226, '1'), (320, 300, '3')]
for bx, top, n in blocks:
    p.append(f'<rect x="{bx}" y="{top}" width="100" height="{BOT - top}" fill="#E3E8EE" {st()}/>'
             f'<path d="M{bx},{top} L{bx + 12},{top - 12} H{bx + 112} L{bx + 100},{top} Z" fill="#F4F6F9" {st(2.4)}/>'
             + text(bx + 50, top + (BOT - top) / 2 + 14, n, 40, 700, '#6B7280'))
kids = [(170, 270, 'Việt', False, 'wave'), (270, 226, 'Mai', True, 'wave'), (370, 300, 'Nam', False, 'down')]
for x, feet, name, girl, pose in kids:
    h = 150
    p.append(K1.kid(x, feet - 12, h, girl=girl, shirt='#7CC6F0', bottom='#4E8FC8', pose=pose, mouth='open' if girl else 'smile'))
    p.append(medal(x, feet - 12 - h * 168 / 260, 'bạc', 8))
    p.append(text(x, feet - 12 - h * 282 / 260 - 14, name, 24, 700, '#2E8BC0'))
out('bai28_t2_q3_podium', W, H, p)

# ── T2 q4: lớp học, 2 dãy × 6 bàn, cô giáo ở dãy bàn số 4 ─────────────────────
W, H = 780, 420
p = [f'<rect x="0" y="0" width="{W}" height="{H}" fill="#FFF8EC"/>']
def row_pos(r):
    return 104 + (6 - r) * 36, 62 + (6 - r) * 54
teacher = g(416, 206, .46, K3.person(hair='bob', shirt='#F7A1C4', bottom='#4A3A36', bottom_kind='skirt', adult=True,
                                    arms=((-62, -250), (66, -400)), sleeve='short'))
for r in range(6, 0, -1):
    xl, y = row_pos(r)
    p.append(desk(xl, y, 150))
    p.append(desk(xl + 300, y, 150))
    p.append(text(xl - 22, y + 34, str(r), 24, 700))
    if r == 4:
        p.append(teacher)
out('bai28_t2_q4_class', W, H, p)
