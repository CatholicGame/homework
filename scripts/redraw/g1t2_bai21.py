"""
Vở BT Toán 1 Tập Hai, Bài 21 "Số có hai chữ số" (sách trang 4–15): mọi hình vẽ lại bằng nét riêng.
Chỉ giữ nội dung toán của sách: số quả, số que, số khối, số con vật, các số ghi trên hình, vị trí tương đối.

    python scripts/redraw/g1t2_bai21.py
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_a as A
import kit_g9 as K9
import kit_g8 as K8
import kit_l1_a as LA
import kit_l1_b as LB
import kit_measure as KM

F = A.F


def tc(group, svg):
    """một vật bé chạm để đếm (engine/tapCount.js)"""
    return f'<g data-tc="{group}">{svg}</g>'


# ── Tiết 1 ──────────────────────────────────────────────────────────────────

# Q1: khung táo = tháp 10 quả + quả lẻ hai hàng như sách (12 mẫu, 14, 17, 15, 18)
EXTRA = {2: (2, 0), 4: (2, 2), 7: (4, 3), 5: (3, 2), 8: (4, 4)}
for n, (top, bot) in EXTRA.items():
    W, H = 250, 160
    p = [A.panel(3, 3, W - 6, H - 6, fill=A.PAPER), A.pyramid(68, 136, 13)]
    r, px = 12, 25
    ytop = 86 if bot else 106
    for j in range(top):
        p.append(A.apple(150 + j * px + (px / 2 if top < bot else 0), ytop, r))
    for j in range(bot):
        p.append(A.apple(150 + j * px + (px / 2 if bot < top else 0), ytop + 32, r))
    save(f'bai21_t1_q1_apples{10 + n}', W, H, p, folder=F)

# Q2: a) 10 quả táo (3 hàng 3 + 1), b) 16 quả cà chua (3 hàng 5 + 1); bé chạm để đếm
W, H = 680, 250
p = [A.panel(4, 4, 250, 242, fill=A.PANEL), A.panel(290, 4, 386, 242, fill=A.PANEL),
     text(26, 34, 'a)', 22, 700), text(312, 34, 'b)', 22, 700)]
for k in range(10):
    x, y = 70 + (k % 3) * 66, 62 + (k // 3) * 54
    p.append(tc('a', A.apple(x, y, 19)))
for k in range(16):
    x, y = 336 + (k % 5) * 70, 64 + (k // 5) * 52
    p.append(tc('b', A.tomato(x, y, 19)))
save('bai21_t1_q2_fruits', W, H, p, folder=F)
save('bai21_apple', 44, 44, [A.apple(22, 25, 16)], folder=F)
save('bai21_tomato', 48, 44, [A.tomato(24, 24, 17)], folder=F)

# Q3: con voi đeo ô số (ô để trống: số hoặc ô viết đặt lên bằng HTML)
save('bai21_elephant', 220, 200, [A.elephant_tag(None)], folder=F)

# Q4: nối các số 1 → 17 (có sẵn nét 17 – 1), hiện ra con mèo; rồi tô màu
DOTS = {1: (495, 1102), 2: (560, 1172), 3: (345, 1170), 4: (390, 1104), 5: (313, 1065), 6: (290, 1005),
        7: (315, 890), 8: (328, 822), 9: (398, 866), 10: (428, 862), 11: (437, 922), 12: (459, 862),
        13: (488, 866), 14: (567, 836), 15: (562, 908), 16: (594, 1005), 17: (557, 1068)}
LBL = {1: (-12, 14), 2: (16, 6), 3: (-16, 0), 4: (8, 18), 5: (12, 16), 6: (-18, 4), 7: (-14, 16), 8: (14, -10),
       9: (-4, -16), 10: (0, -16), 11: (0, 22), 12: (2, -16), 13: (4, -16), 14: (20, 4), 15: (20, 6), 16: (20, 4), 17: (20, 14)}
W, H = 400, 430
ox, oy, k = 270, 800, 1.05


def P(n):
    x, y = DOTS[n]
    return (x - ox) * k + 20, (y - oy) * k + 10


p = [A.panel(3, 3, W - 6, H - 6, fill=A.PAPER)]
# nét nối mẫu 17 – 1
x1, y1 = P(17)
x2, y2 = P(1)
p.append(f'<path d="M{x1:.1f},{y1:.1f} Q{(x1 + x2) / 2 + 6:.1f},{(y1 + y2) / 2 + 26:.1f} {x2:.1f},{y2:.1f}" fill="none" stroke="{A.BOOK}" stroke-width="3" stroke-linecap="round"/>')
# tai, mắt, ria, miệng (nét mảnh) bên trong
ex = lambda x, y: ((x - ox) * k + 20, (y - oy) * k + 10)
(a1, b1), (a2, b2), (a3, b3) = ex(335, 838), ex(378, 862), ex(338, 882)
p.append(f'<polygon points="{a1:.0f},{b1:.0f} {a2:.0f},{b2:.0f} {a3:.0f},{b3:.0f}" fill="{WHITE}" {A.st(2)}/>')
(a1, b1), (a2, b2), (a3, b3) = ex(553, 848), ex(508, 870), ex(550, 890)
p.append(f'<polygon points="{a1:.0f},{b1:.0f} {a2:.0f},{b2:.0f} {a3:.0f},{b3:.0f}" fill="{WHITE}" {A.st(2)}/>')
for cx in (378, 493):
    x, y = ex(cx, 944)
    p.append(f'<circle cx="{x:.0f}" cy="{y:.0f}" r="14" fill="{WHITE}" {A.st(2.4)}/><circle cx="{x:.0f}" cy="{y + 2:.0f}" r="6" fill="{INK}"/>')
x, y = ex(437, 975)
p.append(f'<path d="M{x - 8:.0f},{y:.0f} L{x + 8:.0f},{y:.0f} L{x:.0f},{y + 8:.0f} Z" fill="{PINK}" {A.st(2)}/>')
p.append(f'<path d="M{x:.0f},{y + 8:.0f} Q{x - 10:.0f},{y + 24:.0f} {x - 24:.0f},{y + 16:.0f} M{x:.0f},{y + 8:.0f} Q{x + 10:.0f},{y + 24:.0f} {x + 24:.0f},{y + 16:.0f}" fill="none" {A.st(2.4)}/>')
for sx in (-1, 1):
    for dy in (-8, 4):
        x0 = x + sx * 46
        p.append(f'<path d="M{x0:.0f},{y + 10 + dy * .3:.0f} L{x0 + sx * 42:.0f},{y + 6 + dy:.0f}" fill="none" {A.st(2.4)}/>')
for n in DOTS:
    x, y = P(n)
    dx, dy = LBL[n]
    p.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="4.6" fill="{INK}"/>')
    p.append(text(x + dx, y + dy + 6, str(n), 16, 600))
save('bai21_t1_q4_dots', W, H, p, folder=F)

# ── Tiết 2 ──────────────────────────────────────────────────────────────────

save('bai21_jar', 84, 104, [A.put(42, 102, A.jar(None))], folder=F)
save('bai21_bear_heart', 104, 104, [A.put(52, 102, A.bear_heart(None))], folder=F)
save('bai21_bear_belly', 104, 114, [A.put(52, 112, A.bear_belly(None))], folder=F)

# Q2: vịt (11), rùa (12), gà con (14) lẫn lộn trong khung; bé chạm để đếm
# vị trí: lưới 8 × 5 ô xê dịch ngẫu nhiên (không vật nào chồng lên vật nào), 3 ô để trống
import random as _r
_rng = _r.Random(2106)
_cells = [(c, r) for r in range(5) for c in range(8)]
_rng.shuffle(_cells)
_kinds = ['d'] * 11 + ['t'] * 12 + ['c'] * 14
_pos = {'d': [], 't': [], 'c': []}
for (c, r), kind in zip(_cells, _kinds):
    _pos[kind].append((80 + c * 134 + _rng.uniform(-18, 18), 70 + r * 140 + _rng.uniform(-14, 14)))
DUCKS, TURTLES, CHICKS = _pos['d'], _pos['t'], _pos['c']
assert (len(DUCKS), len(TURTLES), len(CHICKS)) == (11, 12, 14)


def duck_s(x, y, flip=False):
    return A.put(x, y + 50, K9.duck(body=WHITE), 1.6, flip=flip)


def turtle_s(x, y, flip=False):
    return A.put(x + (60 if flip else -60), y - 40, K8.turtle_icon(), 1.2, flip=flip)


def chick_s(x, y, flip=False):
    return A.put(x - 8, y + 46, LA.chick(0, 0, .9, col=YELLOW), 1, flip=flip)


W, H = 1100, 720
inner = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="22" fill="#EEF8E8" stroke="{A.BOOK}" stroke-width="4"/>']
for i, (x, y) in enumerate(DUCKS):
    inner.append(tc('a', duck_s(x, y, flip=i % 3 == 1)))
for i, (x, y) in enumerate(TURTLES):
    inner.append(tc('b', turtle_s(x, y + 4, flip=i % 2 == 1)))
for i, (x, y) in enumerate(CHICKS):
    inner.append(tc('c', chick_s(x, y, flip=i % 3 == 0)))
s = .62
save('bai21_t2_q2_animals', round(W * s), round(H * s), [f'<g transform="scale({s})">{"".join(inner)}</g>'], folder=F)
save('bai21_duck', 60, 64, [A.put(30, 62, K9.duck(body=WHITE), .9)], folder=F)
save('bai21_turtle', 76, 56, [A.put(0, -8, K8.turtle_icon(), .8)], folder=F)
save('bai21_chick', 64, 64, [A.put(28, 62, LA.chick(0, 0, .58, col=YELLOW))], folder=F)

# Q4: dãy 18 ngôi nhà (đánh số sẵn 1–4), thỏ và chó; tô đỏ nhà số 11, vàng nhà số 16
HOUSES = [(70, 105), (130, 125), (195, 165), (255, 215), (335, 235), (395, 270), (460, 240), (525, 200), (600, 175),
          (680, 155), (760, 195), (790, 255), (825, 320), (765, 375), (800, 430), (725, 470), (660, 530), (580, 560)]
W, H = 900, 640
p = [f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="22" fill="#D7EFFB" {A.st(3)}/>',
     f'<path d="M3,150 Q200,110 420,150 T897,130 L897,615 Q897,637 875,637 L25,637 Q3,637 3,615 Z" fill="#BFE3A8" opacity=".9"/>']
for x, y in ((60, 160), (60, 430), (250, 600), (530, 230), (720, 510), (800, 540), (860, 500)):
    p.append(A.tuft(x, y, 1.2))
for i, (x, y) in enumerate(HOUSES):
    p.append(A.kennel(x, y + 30, 76, str(i + 1) if i < 4 else None))
p.append(A.put(165, 420, K9.rabbit(), 1.3))
p.append(LB.fit(LB.dog(), 380, 455, 160, 120))
save('bai21_t2_q4_houses', W, H, p, folder=F)

# ── Tiết 3 ──────────────────────────────────────────────────────────────────

# Q1: 1, 2, 3, 4 cột 10 khối (10 mẫu)
W, H = 640, 290
p = []
CS = 26
groups = [(60, 1), (205, 2), (380, 3), (555, 4)]
for cx, n in groups:
    x0 = cx - (n * CS + (n - 1) * 12) / 2
    for j in range(n):
        p.append(A.cube_col(x0 + j * (CS + 12), 10, 10, CS))
save('bai21_t3_q1_cubes', W, H, p, folder=F)

# Q2: xe tải chở chữ (không chữ trên hình, chữ ghi dưới ô); cây xăng là ô số (8 hàng ô hình thì quá dài)
save('bai21_truck_r', 220, 110, [A.box_truck('right')], folder=F)
save('bai21_truck_l', 220, 110, [A.box_truck('left')], folder=F)

# Q4: mỗi túi 10 quả cà chua; hàng mẫu 40 tô sẵn 4 túi
W, H = 680, 410
p = []
for r, n in enumerate((40, 10, 20, 50, 70)):
    y = 12 + r * 80
    p.append(f'<rect x="6" y="{y + 22}" width="52" height="34" rx="4" fill="#BFE6F7" {A.st(2.2)}/>')
    p.append(text(32, y + 46, str(n), 20, 700))
    for j in range(9):
        p.append(A.plain_bag(110 + j * 64, y + 70, 54, 60, fill='#9FD3F0' if r == 0 and j < 4 else WHITE))
    if r < 4:
        p.append(f'<line x1="6" y1="{y + 78}" x2="674" y2="{y + 78}" stroke="{A.BOOK}" stroke-width="2.4" stroke-dasharray="2 6" stroke-linecap="round"/>')
save('bai21_t3_q4_bags', W, H, p, folder=F)

# ── Tiết 4 ──────────────────────────────────────────────────────────────────

# Q1: túi 10 quả táo + quả lẻ: mẫu 45, a) 54, b) 67, c) 86, d) 71
BAGS = {'mau': (4, (4, 1)), 'a': (5, (4,)), 'b': (6, (4, 3)), 'c': (8, (2, 2, 2)), 'd': (7, (1,))}
for key, (bags, loose) in BAGS.items():
    top = {4: 3, 5: 3, 6: 3, 7: 4, 8: 4}[bags]
    shift_top = 20 if bags == 6 else 0
    shift_bot = 40 if bags in (4, 5) else 0
    xl = 60 + (bags - top) * 82 + shift_bot - 10
    loose_w = 40 if loose == (2, 2, 2) else len(loose) and max(loose) * 18.5 + 10
    W = int(max(60 + top * 82 + shift_top - 4, xl + loose_w + 20) + 10)
    H = 210
    p = [A.panel(3, 3, W - 6, H - 6, fill=WHITE)]
    for j in range(top):
        p.append(A.apple_bag(60 + j * 82 + shift_top, 96, 74, 70))
    for j in range(bags - top):
        p.append(A.apple_bag(60 + j * 82 + shift_bot, 196, 74, 70))
    r = 9
    if loose == (2, 2, 2):
        for i in range(3):
            for j in range(2):
                p.append(A.apple(xl + 6 + j * 21 + i * 6, 142 + i * 21, r))
    else:
        p.append(A.heap(xl + max(loose) * 9.25 + 2, 182, loose, r))
    save(f'bai21_t4_q1_{key}', W, H, p, folder=F)

# ── Tiết 5 ──────────────────────────────────────────────────────────────────

# Q1: bó 1 chục + que lẻ: mẫu 38, a) 63, b) 55, c) 71
STICKS = {'mau': (3, 8), 'a': (6, 3), 'b': (5, 5), 'c': (7, 1)}
for key, (b, n) in STICKS.items():
    W, H = 410, 150
    p = [A.panel(3, 3, W - 6, H - 6, fill=A.PANEL)]
    x = 34
    for j in range(b):
        p.append(A.bundle(x + 4, 22, 128, 8))
        x += 48
    x += 8
    p.append(A.loose_sticks(x, 22, 128, n, 14, 8))
    save(f'bai21_t5_q1_{key}', W, H, p, folder=F)

# Q3: thuyền (chữ ghi dưới ô) và quả chì ghi số
save('bai21_boat', 240, 80, [A.boat()], folder=F)
for n in (28, 31, 46, 55, 74):
    save(f'bai21_t5_q3_sinker{n}', 120, 100, [A.sinker(str(n))], folder=F)

# Q4: bể cá: lá cây ghi số có một chữ số (xanh lá), cá ghi 11, 44 (vàng), nước ghi số tròn chục (xanh nước biển)
W, H = 640, 440
p = []
bowl = 'M60,48 Q20,140 30,250 Q50,380 180,410 L460,410 Q590,380 610,250 Q620,140 580,48 Z'
p.append(f'<path d="{bowl}" fill="{WHITE}" {A.st(3)}/>')
p.append(f'<path d="M60,48 Q120,30 160,48 Q220,64 280,46 Q340,30 400,48 Q460,64 520,46 Q560,34 580,48" fill="none" {A.st(2.6)}/>')
# đáy sỏi và chân bể
p.append(f'<path d="M110,386 Q320,360 530,386 Q470,410 320,412 Q170,410 110,386 Z" fill="{GREY_L}" {A.st(2.4)}/>')
import random
rnd = random.Random(21)
for _ in range(34):
    x, y = rnd.uniform(140, 500), rnd.uniform(378, 404)
    p.append(f'<ellipse cx="{x:.0f}" cy="{y:.0f}" rx="{rnd.uniform(6, 11):.0f}" ry="{rnd.uniform(4, 6):.0f}" fill="{GREY}" {A.st(1.6)}/>')
p.append(f'<rect x="200" y="410" width="240" height="14" rx="4" fill="{GREY}" {A.st(2.4)}/>')
# lá cây: mỗi lá là một vùng kín
LEAVES = [('M150,378 Q70,340 66,246 Q130,280 150,378 Z', '2', 100, 320),
          ('M152,378 Q104,280 132,196 Q196,280 152,378 Z', '3', 146, 292),
          ('M156,378 Q190,334 244,342 Q206,384 156,378 Z', '1', 204, 362),
          ('M496,378 Q474,296 512,220 Q550,306 496,378 Z', '9', 510, 302),
          ('M502,378 Q530,316 566,262 Q600,340 502,378 Z', '7', 560, 330),
          ('M496,378 Q440,340 372,352 Q430,392 496,378 Z', '8', 438, 366)]
for d, n, x, y in LEAVES:
    p.append(f'<path d="{d}" fill="{WHITE}" {A.st(2.6)}/>')
    p.append(text(x, y + 9, n, 28, 700))
# cá nhỏ (11) và cá lớn (44)
p.append(f'<path d="M210,130 Q250,86 310,108 Q340,120 350,140 Q330,166 290,170 Q240,172 210,150 L180,170 L186,140 L176,110 Z" fill="{WHITE}" {A.st(2.6)}/>')
p.append(f'<circle cx="326" cy="132" r="5" fill="{INK}"/>')
p.append(text(262, 150, '11', 28, 700))
big = (f'<path d="M330,300 Q340,236 420,224 Q490,220 516,260 Q530,300 500,330 Q450,360 380,340 L340,360 L346,320 L316,300 Z" fill="{WHITE}" {A.st(2.6 / .85)}/>'
       f'<circle cx="480" cy="262" r="10" fill="{WHITE}" {A.st(2)}/><circle cx="482" cy="264" r="4.6" fill="{INK}"/>'
       f'<path d="M470,300 Q486,312 500,298" fill="none" {A.st(2.2)}/>')
p.append(f'<g transform="translate(-20,-20) translate(420 290) scale(.85) translate(-420 -290)">{big}</g>')
p.append(text(398, 280, '44', 28, 700))
for x, y, r in ((420, 120, 9), (434, 150, 7), (428, 176, 6)):
    p.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{WHITE}" {A.st(2)}/>')
for n, x, y in (('20', 120, 130), ('80', 480, 110), ('40', 286, 358)):
    p.append(text(x, y, n, 28, 700))
save('bai21_t5_q4_bowl', W, H, p, folder=F)

# ── Tiết 6 ──────────────────────────────────────────────────────────────────

# Q1b: bảng 0–99 đã hoàn thiện (câu a) để tô màu theo bảng màu
GIVEN = {0: [0, 1, 2, 3, 4, 5, 8, 9], 1: [0, 1, 2, 7, 8, 9], 2: [0, 1, 2, 4, 5, 6, 7, 8, 9], 3: [0, 1, 5, 6, 7, 9],
         4: [0, 2, 3, 4, 6, 7, 8, 9], 5: [0, 1, 2, 5, 7, 8, 9], 6: [0, 1, 2, 4, 5, 6, 7, 8, 9], 7: [0, 3, 4, 5, 9],
         8: [0, 4, 5, 6, 7, 8, 9], 9: [0, 1, 4, 5, 9]}
CELL = 52
W, H = CELL * 10 + 8, CELL * 10 + 8
p = []
for r in range(10):
    for c in range(10):
        x, y = 4 + c * CELL, 4 + r * CELL
        p.append(f'<rect x="{x}" y="{y}" width="{CELL}" height="{CELL}" fill="{WHITE}" stroke="{A.BOOK}" stroke-width="2.4"/>')
for r in range(10):
    for c in range(10):
        p.append(text(4 + c * CELL + CELL / 2, 4 + r * CELL + CELL / 2 + 7, str(r * 10 + c), 20, 600))
save('bai21_t6_q1_grid', W, H, p, folder=F)

# Q2: ong (chữ ghi dưới ô) và bông hoa ghi số
save('bai21_bee', 124, 96, [A.put(62, 52, A.bee())], folder=F)
for n in (25, 34, 49, 53, 77, 86):
    save(f'bai21_t6_q2_flower{n}', 100, 100, [A.flower(50, 50, 44, str(n), size=24)], folder=F)
