"""
Vở BT Toán 1 Tập Hai, Bài 33 (trang 65–72): Luyện tập chung.
Nét vẽ riêng (kit_l1t2_d.py + kit_g3/kit_measure/kit_g8); chỉ giữ nội dung toán của sách.
    python scripts/redraw/g1t2_bai33.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_d import *
import kit_g3 as g3
import kit_measure as km
import kit_g8 as g8

OUT = []


def out(name, w, h, parts):
    save(name, w, h, parts, folder=FOLDER)
    OUT.append(name)


# ── Tiết 1 câu 2: bạn nhỏ ngồi học, suy nghĩ ────────────────────────────────
W, H = 320, 270
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<ellipse cx="160" cy="250" rx="140" ry="12" fill="{INK}" opacity=".08"/>']
P.append(place(160, 252, .62, g3.person(hair='short', shirt=BLUE, bottom='#3E86C6', bottom_kind='pants', legs='kneel',
                                       expr='smile', look=-8, arms=((-70, -150), (-6, -236)))))
P.append(g3.book_open(160, 252, 120, '#fff'))
P.append(f'<path d="M40,250 L92,238 L104,252 L52,262 Z" fill="{TEAL}" {st(2.4)}/>')
P.append(f'<path d="M232,252 L262,206 L300,222 L276,262 Z" fill="{YELLOW}" {st(2.4)}/>')
P.append(f'<line x1="60" y1="220" x2="96" y2="232" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>')
P.append(text(190, 52, '?', size=56, weight=800, fill=BLUE))
P.append(text(226, 46, '!', size=52, weight=800, fill=INK))
out('bai33_t1_q2_boy', W, H, P)


# ── Tiết 1 câu 3: sóc trú mưa trong hốc cây ─────────────────────────────────
W, H = 360, 270
P = [f'<rect width="{W}" height="{H}" rx="10" fill="#CDEBFA"/>']
for x, y, s in ((40, 60, .9), (300, 40, 1), (330, 120, .8)):
    P.append(f'<g opacity=".9">{g3.cloud(x, y, s)}</g>')
for i in range(14):
    x = 20 + i * 26
    P.append(f'<line x1="{x}" y1="{10 + (i % 3) * 14}" x2="{x - 8}" y2="{34 + (i % 3) * 14}" stroke="#6FB7EA" stroke-width="2.4" stroke-linecap="round"/>')
P.append(f'<rect y="236" width="{W}" height="34" fill="{GRASS}"/>')
P.append(f'<path d="M70,270 Q90,150 70,40 Q60,0 110,0 H250 Q300,0 290,40 Q270,150 290,270 Z" fill="#B07A4F" {st()}/>')
for x in (110, 140, 230, 260):
    P.append(f'<path d="M{x},20 Q{x + 6},140 {x - 2},250" fill="none" stroke="#8A5A36" stroke-width="3" stroke-linecap="round"/>')
P.append(f'<path d="M130,240 Q120,150 180,90 Q240,150 230,240 Z" fill="#4A3A36" {st()}/>')
P.append(place(118, 112, 1.55, g8.squirrel_icon()))
P.append(f'<ellipse cx="170" cy="212" rx="11" ry="12" fill="#C99A5B" {st(2.4)}/>')
P.append(g3.bush(30, 262, 80, GREEN))
P.append(g3.bush(330, 262, 80, GREEN))
out('bai33_t1_q3_squirrel', W, H, P)


# ── Tiết 1 câu 4: cừu đen trên hai tảng đá ──────────────────────────────────
W, H = 720, 440
G = 410
K = 5.0           # px mỗi gang tay
yb = G - 34 * K   # đỉnh tảng đá to
ys = yb - 25 * K  # đỉnh tảng đá nhỏ
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<path d="M40,{G} H700" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>']
P.append(f'<line x1="150" y1="{G}" x2="150" y2="{ys - 30}" {st(3)}/>')
P.append(dashed(150, ys, 400, ys))
P.append(dashed(150, yb, 330, yb))
P.append(rock(470, G + 4, 360, 34 * K + 4, col='#9FD0EE', dark='#6FAFD8'))
P.append(rock(450, yb + 6, 210, 25 * K + 6, col='#D5E3EE', dark='#A9BCCB'))
P.append(sheep(430, ys + 4, wool='#5B5560', face='#3F3A40', s=1.0))
P.append(sheep(214, G, s=.9))
for x in (300, 360, 560, 640, 690):
    P.append(grass_tuft(x, G, 46))
P.append(text(108, (ys + yb) / 2 + 8, '25', size=24, weight=600))
P.append(hand_icon(150, (ys + yb) / 2 + 2, .8))
P.append(text(108, (yb + G) / 2 + 8, '34', size=24, weight=600))
P.append(hand_icon(150, (yb + G) / 2 + 2, .8))
out('bai33_t1_q4_sheep', W, H, P)


# ── Tiết 2 câu 2: tàu thủy và tên lửa (ô nối) ───────────────────────────────
for i, (e, flip) in enumerate((('29 + 40', False), ('67 − 15', True), ('76 − 1', False), ('82 + 3', True))):
    out(f'bai33_t2_q2_s{i + 1}', 300, 190, [ship(150, 172, e, flip=flip)])
for n in (52, 69, 85, 75):
    out(f'bai33_t2_q2_r{n}', 160, 240, [rocket(80, 226, str(n))])


# ── Tiết 2 câu 3: ô vuông → hình tròn → hình tam giác ───────────────────────
def shapes_chain(name, first, ops, kinds):
    W, H = 600, 130
    P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
    xs = (60, 300, 530)
    P.append(arrow(xs[0] + 42, 72, xs[1] - 48, col='#7CC6E8', w=5, label=ops[0], size=26))
    P.append(arrow(xs[1] + 48, 72, xs[2] - 52, col='#7CC6E8', w=5, label=ops[1], size=26))
    P.append(f'<rect x="{xs[0] - 38}" y="34" width="76" height="76" fill="#7CC6E8" {st()}/>')
    P.append(text(xs[0], 84, first, size=30, weight=700))
    for kind, cx in zip(kinds, xs[1:]):
        if kind == 'circle':
            P.append(f'<circle cx="{cx}" cy="72" r="46" fill="#fff" {st()}/>')
        else:
            P.append(f'<path d="M{cx},18 L{cx + 56},122 L{cx - 56},122 Z" fill="#fff" {st()}/>')
    out(name, W, H, P)


shapes_chain('bai33_t2_q3a_chain', '69', ('− 9', '+ 23'), ('circle', 'tri'))
shapes_chain('bai33_t2_q3b_chain', '75', ('− 15', '+ 20'), ('tri', 'circle'))


# ── Tiết 2 câu 4: mật mã mở cửa ─────────────────────────────────────────────
W, H = 760, 470
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<ellipse cx="640" cy="440" rx="120" ry="22" fill="#E3F4FC"/>']
# cửa (khối hộp)
P.append(f'<path d="M230,110 L260,80 H560 L530,110 Z" fill="#C9D3DC" {st()}/>')
P.append(f'<path d="M530,110 L560,80 V320 L530,350 Z" fill="#8FA2B4" {st()}/>')
P.append(f'<rect x="230" y="110" width="300" height="240" fill="#9ED8F5" {st()}/>')
SL = [(256 + i * 38, 210) for i in range(7)]
P.append(f'<rect x="248" y="200" width="270" height="48" rx="4" fill="#5B6B7C" {st()}/>')
for i, (x, y) in enumerate(SL):
    P.append(f'<rect x="{x}" y="{y}" width="32" height="28" rx="3" fill="#fff" {st(2.4)}/>')
    if i < 2:
        P.append(text(x + 16, y + 23, '15'[i], size=22, weight=800))
    else:
        P.append(gear_dot(x + 16, y + 14))
# cuộn giấy
P.append(scroll(60, 20, 68, 53, '−', 15))
P.append(scroll(610, 20, 90, 1, '+', None))
P.append(scroll(60, 260, 85, 80, '−', None))
P.append(scroll(250, 330, 77, 46, '−', None))
# dây nối nét đứt: kết quả trên cuộn giấy → ô mật mã
LINKS = [((124, 116), 0), ((136, 116), 1), ((131, 348), 2), ((665, 108), 3), ((681, 108), 4), ((305, 418), 5), ((321, 418), 6)]
for (x, y), i in LINKS:
    sx, sy = SL[i]
    P.append(dashed(x, y, sx + 16, sy + 14 + (8 if y > 300 else -8), col=INK, w=1.8))
# thám tử Tí
det = g3.person(hair='short', shirt='#E8F4FB', bottom='#6FB7EA', bottom_kind='pants', expr='smile', look=-10,
                arms=((-74, -90), (-50, -230)))
cap = (f'<path d="M-62,-280 Q-60,-332 0,-334 Q62,-332 64,-284 Q20,-300 -62,-280 Z" fill="#6FB7EA" {st()}/>'
       f'<path d="M-62,-282 Q-96,-282 -100,-268 Q-70,-262 -40,-276 Z" fill="#4FA9D8" {st()}/>'
       f'<path d="M-30,-330 Q-24,-300 -20,-288 M14,-332 Q16,-306 18,-292" fill="none" stroke="#4FA9D8" stroke-width="3"/>')
glass = (f'<line x1="-50" y1="-230" x2="-62" y2="-262" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>'
         f'<circle cx="-70" cy="-284" r="26" fill="#DFF3FC" fill-opacity=".7" stroke="{INK}" stroke-width="6"/>')
P.append(place(668, 462, .7, det + cap + glass))
out('bai33_t2_q4_door', W, H, P)


# ── Tiết 2 câu 5: giỏ trứng ─────────────────────────────────────────────────
W, H = 280, 220
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
for x, y in ((90, 112), (126, 104), (162, 106), (196, 114), (108, 126), (146, 124), (182, 128)):
    P.append(f'<ellipse cx="{x}" cy="{y}" rx="20" ry="25" fill="#FFF8EC" {st(2.4)}/>')
P.append(wicker_basket(140, 206, '', w=230, h=80, col='#7CC6E8'))
P.append(f'<path d="M140,44 q-24,-8 -26,10 q16,6 26,-4 q10,10 26,4 q-2,-18 -26,-10 Z" fill="{BLUE}" {st(2.4)}/>')
out('bai33_t2_q5_eggs', W, H, P)


# ── Tiết 3 câu 2: tháp số (ô trống ghép bằng HTML lên hình) ─────────────────
W, H = 600, 400
NODES = {'top': (300, 56), 'm1': (220, 156, '42'), 'm2': (380, 156), 'r1': (140, 256, '21'), 'r2': (300, 256, '21'),
         'r3': (460, 256), 'b1': (60, 352, '10'), 'b2': (220, 352, '11'), 'b3': (380, 352, '10'), 'b4': (540, 352, '11')}
EDGES = [('top', 'm1'), ('top', 'm2'), ('m1', 'r1'), ('m1', 'r2'), ('m2', 'r2'), ('m2', 'r3'),
         ('r1', 'b1'), ('r1', 'b2'), ('r2', 'b2'), ('r2', 'b3'), ('r3', 'b3'), ('r3', 'b4')]
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
for a, b in EDGES:
    P.append(f'<line x1="{NODES[a][0]}" y1="{NODES[a][1]}" x2="{NODES[b][0]}" y2="{NODES[b][1]}" stroke="#A7B1BC" stroke-width="7" stroke-linecap="round"/>')
for k, v in NODES.items():
    x, y = v[0], v[1]
    if len(v) == 3:
        P.append(ball(x, y, 40, v[2]))
    else:
        P.append(f'<circle cx="{x}" cy="{y}" r="40" fill="#fff" {st(3.4)}/>')
# bạn nhỏ ngồi bàn học (trang trí, góc trên bên phải còn trống)
boy = [g3.place(130, 232, .58, g3.person(hair='short', shirt=BLUE, bottom='#3E86C6', expr='laugh', arms=((-50, -150), (30, -290)))),
       g3.table(40, 236, 180, 150, col='#7CC6E8'), g3.book_open(130, 140, 90)]
P.append(place(452, 0, .6, ''.join(boy)))
out('bai33_t3_q2_pyramid', W, H, P)


# ── Tiết 3 câu 4: lá phong (tô màu) ─────────────────────────────────────────
W, H = 760, 430
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
P.append(maple(130, 110, '96 + 2 = 98', rot=-8))
P.append(maple(380, 106, '34 + 61 = 94', rot=4))
P.append(maple(630, 104, '80 − 20 = 60', rot=10))
P.append(maple(260, 312, '76 − 12 = 68', R=118, rot=-4))
P.append(maple(530, 312, '15 + 40 = 55', rot=6))
out('bai33_t3_q4_leaves', W, H, P)


# ── Tiết 3 câu 5: dãy bong bóng ─────────────────────────────────────────────
W, H = 760, 230
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
for i, lab in enumerate(['25', '35', '45', '55', '?', '75', '85']):
    r = 30 + i * 6
    cx = 24 + sum(2 * (30 + j * 6) + 8 for j in range(i)) + r
    cy = 216 - r - i * 12
    P.append(ball(cx, cy, r, lab))
out('bai33_t3_q5_bubbles', W, H, P)


# ── Tiết 4 câu 3: cân hai đĩa, túi hạt dẻ ───────────────────────────────────
def nut(x, y, r=14):
    return (f'<path d="M{x - r},{y + r * .3} Q{x - r},{y - r} {x},{y - r} Q{x + r},{y - r} {x + r},{y + r * .3} Q{x},{y + r * 1.1} {x - r},{y + r * .3} Z" fill="#9C6B43" {st(2.2)}/>'
            f'<path d="M{x - r * .8},{y + r * .25} Q{x},{y + r * .7} {x + r * .8},{y + r * .25}" fill="none" stroke="#F2D3A6" stroke-width="3"/>')


def nut_bag(x, y, w, h, lab, col):
    return km.sack(x, y, [], w=w, h=h, col=col) + text(x - 14, y - h * .32, lab, size=30, weight=800) + nut(x + 26, y - h * .4)


W, H = 720, 330
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
left = nut_bag(0, 0, 190, 150, '58', '#D5D9DE')
right = nut_bag(-62, 0, 130, 120, '41', '#fff') + nut_bag(66, 0, 120, 110, '?', '#7CC6E8')
P.append(km.balance_scale(360, 320, left=left, right=right, tilt=0, arm=200, pan_w=260, s=1.0, post_h=100))
out('bai33_t4_q3_scale', W, H, P)

print(len(OUT), 'SVG')
