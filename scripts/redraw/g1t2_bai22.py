"""
Vở BT Toán 1 Tập Hai, Bài 22 "So sánh số có hai chữ số" (sách trang 16–21): mọi hình vẽ lại bằng nét riêng.
Chỉ giữ nội dung toán của sách: số bó que và que lẻ, các số ghi trên quả xoài, bông hoa, thẻ, xe, gấu bông.

    python scripts/redraw/g1t2_bai22.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_a as A
import kit_measure as KM
import kit_g1 as K1
import kit_g3 as K3

F = A.F

# ── Tiết 1 ──────────────────────────────────────────────────────────────────

# Q1: hai khung bó que (mẫu 24 | 27, a) 36 | 42, b) 45 | 43, c) 27 | 30)
ROWS = {'mau': ((2, 4), (2, 7)), 'a': ((3, 6), (4, 2)), 'b': ((4, 5), (4, 3)), 'c': ((2, 7), (3, 0))}


def sticks_panel(x0, b, n, w=300, h=140):
    out = [A.panel(x0 + 3, 3, w - 6, h - 6, fill=A.PANEL)]
    used = b * 46 + (n * 13 + 8 if n else 0)
    x = x0 + (w - used) / 2 + 22
    for _ in range(b):
        out.append(A.bundle(x, 22, 120, 8))
        x += 46
    if n:
        out.append(A.loose_sticks(x - 8, 22, 120, n, 13, 8))
    return ''.join(out)


for key, ((b1, n1), (b2, n2)) in ROWS.items():
    W, H = 640, 140
    save(f'bai22_t1_q1_{key}', W, H, [sticks_panel(0, b1, n1), sticks_panel(340, b2, n2)], folder=F)

# Q3: quả xoài ghi số (để tô quả có số lớn nhất)
MANGO = {'a': ([35, 39, 37], False), 'b': ([48, 46, 39], True), 'c': ([74, 69, 80], True), 'd': ([68, 86, 81], False)}
W, H = 772, 230
p = []
for i, (key, (nums, flip)) in enumerate(MANGO.items()):
    gx, gy = (i % 2) * 384, (i // 2) * 116
    p.append(A.panel(gx + 30, gy + 6, 346, 104, fill=A.PANEL, r=16))
    p.append(text(gx + 14, gy + 64, f'{key})', 20, 700))
    for j, n in enumerate(nums):
        p.append(A.mango(gx + 94 + j * 110, gy + 60, 88, str(n), flip=flip))
save('bai22_t1_q3_mangoes', W, H, p, folder=F)

# Q4: bông hoa ghi số (để tô bông có số bé nhất)
FLOWERS = {'a': [25, 29, 21], 'b': [63, 56, 59], 'c': [73, 90, 87]}
W, H = 640, 390
p = []
for i, (key, nums) in enumerate(FLOWERS.items()):
    y = 8 + i * 128
    p.append(A.panel(44 + (30 if key == 'b' else 0), y, 560, 118, fill=A.PANEL, r=18))
    p.append(text(18, y + 66, f'{key})', 20, 700))
    for j, n in enumerate(nums):
        p.append(A.flower_outline(150 + (30 if key == 'b' else 0) + j * 170, y + 59, 54, str(n)))
save('bai22_t1_q4_flowers', W, H, p, folder=F)

# ── Tiết 2 ──────────────────────────────────────────────────────────────────

# Q1: rô-bốt giơ hai thẻ số (tô thẻ có số lớn hơn / bé hơn)
ROBOTS = [('13', '19'), ('45', '50'), ('76', '66'), ('84', '79'), ('94', '96'), ('36', '63')]
W, H = 760, 420
p = [text(10, 30, 'a)', 20, 700), text(10, 240, 'b)', 20, 700)]
for i, (l, r) in enumerate(ROBOTS):
    x, y = 140 + (i % 3) * 250, 196 + (i // 3) * 212
    p.append(A.put(x, y, A.robot_cards(l, r), .95))
save('bai22_t2_q1_robots', W, H, p, folder=F)

# ── Tiết 3 ──────────────────────────────────────────────────────────────────

# Q1: xe ghi phép so sánh (Đ/S)
VANS = {'a': ('23', '<', '32', False), 'b': ('58', '>', '48', False), 'c': ('69', '>', '80', True), 'd': ('75', '<', '77', True)}
for key, (l, s, r, flip) in VANS.items():
    save(f'bai22_t3_q1_van_{key}', 300, 120, [A.van(l, s, r, flip=flip)], folder=F)

# Q3: gấu bông trắng ghi số (tô xanh gấu có số bé nhất, đỏ gấu có số lớn nhất)
BEARS = {'a': [43, 66, 99], 'b': [86, 64, 97, 75]}
W, H = 760, 330
p = []
for i, (key, nums) in enumerate(BEARS.items()):
    y = 6 + i * 162
    p.append(f'<rect x="30" y="{y}" width="724" height="152" rx="18" fill="{GREY_L}"/>')
    p.append(text(14, y + 82, f'{key})', 20, 700))
    step = 724 / len(nums)
    for j, n in enumerate(nums):
        cx = 30 + step * (j + .5)
        p.append(KM.plush_bear(cx, y + 146, 136, fur=WHITE, light=WHITE, bow=WHITE))
        p.append(text(cx, y + 116, str(n), 30, 800, fill=A.BOOK))
save('bai22_t3_q3_bears', W, H, p, folder=F)

# Q4: ba bạn cầm bó hoa đứng bên đường trong công viên
W, H = 760, 380
p = [f'<rect x="3" y="3" width="{W - 6}" height="{H - 6}" rx="20" fill="{SKY}"/>',
     f'<path d="M3,250 Q380,210 757,240 L757,355 Q757,377 735,377 L25,377 Q3,377 3,355 Z" fill="{GRASS}"/>',
     f'<path d="M430,377 Q470,300 560,262 Q640,232 757,232 L757,262 Q660,268 600,300 Q540,330 520,377 Z" fill="#E8DCC4" {A.st(2)}/>',
     K3.tree(90, 250, 190, GREEN), K3.tree(700, 236, 170, GREEN), K3.bush(250, 252, 120, GRASS_D), K3.bush(560, 240, 100, GRASS_D),
     K3.cloud(170, 70, .9), K3.cloud(560, 56, 1.1)]
for x, y in ((40, 300), (130, 330), (330, 300), (700, 320), (620, 350), (230, 350)):
    for k in range(5):
        import math
        a = k * 2 * math.pi / 5
        p.append(f'<circle cx="{x + math.cos(a) * 7:.0f}" cy="{y + math.sin(a) * 7:.0f}" r="6" fill="{WHITE}" {A.st(1.6)}/>')
    p.append(f'<circle cx="{x}" cy="{y}" r="4" fill="{YELLOW}" {A.st(1.4)}/>')


def bouquet(x, y):
    s = [f'<path d="M{x - 14},{y} L{x},{y + 46} L{x + 14},{y} Z" fill="{PINK}" {A.st(2.2)}/>']
    for dx, dy, c in ((-16, -6, RED), (0, -14, YELLOW), (16, -6, PURPLE), (-8, 6, ORANGE), (8, 6, RED)):
        s.append(f'<circle cx="{x + dx}" cy="{y + dy}" r="9" fill="{c}" {A.st(2)}/><circle cx="{x + dx}" cy="{y + dy}" r="3" fill="{YELLOW}"/>')
    return ''.join(s)


KIDS = [(250, False, BLUE, '#4E8FC8'), (390, True, PINK, PURPLE), (530, False, GREEN, '#4E8FC8')]
for x, girl, shirt, bottom in KIDS:
    p.append(K1.kid(x, 352, h=230, girl=girl, shirt=shirt, bottom=bottom, pose='down'))
    p.append(bouquet(x, 230))
save('bai22_t3_q4_friends', W, H, p, folder=F)
