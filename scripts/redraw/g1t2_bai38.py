"""
Vở BT Toán 1 Tập Hai, Bài 38 Ôn tập các số và phép tính trong phạm vi 10 (sách trang 89–94).
Mọi hình vẽ lại bằng nét riêng, chỉ giữ nội dung toán của sách (số vật, số, phép tính, vị trí).

    python scripts/redraw/g1t2_bai38.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_f as K
import kit_l1_a as KA
import kit_l1_b as KB

F = K.F
st = K.st


# ── Tiết 1 Q2: 5 bông hoa trắng trong lọ (bé tô đỏ / vàng) ───────────────────
def t1_q2_flowers():
    W, H = 640, 470
    p = [K.card(4, 4, W - 8, H - 8, fill='#FFF8EC', r=24)]
    heads = [(205, 92), (330, 70), (455, 100), (250, 205), (420, 210)]
    for i, (x, y) in enumerate(heads):
        p.append(K.stem(320, 330, x, y + 30, bend=(x - 320) * -.15))
    for (x, y, rot) in ((262, 300, -150), (378, 300, -30), (300, 268, -120), (344, 262, -55), (232, 250, -170), (410, 250, -10)):
        p.append(K.leaf(x, y, 58, rot))
    for i, (x, y) in enumerate(heads):
        p.append(K.flower(x, y, 58, WHITE, YELLOW, n=8, rot=-90 + i * 9))
    p.append(K.vase(320, 455, 170, 150, col=BLUE))
    # bảng màu, bút vẽ
    p.append(f'<path d="M40,410 C30,350 110,330 150,360 C176,380 150,400 160,420 C170,446 120,460 80,452 C56,446 44,432 40,410 Z" fill="#F3E3C8" {st(2.6)}/>')
    for (x, y, c) in ((78, 380, RED), (112, 372, YELLOW), (70, 420, BLUE), (102, 432, GREEN)):
        p.append(f'<circle cx="{x}" cy="{y}" r="11" fill="{c}" {st(2)}/>')
    p.append(f'<path d="M150,330 L206,286" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>'
             f'<path d="M150,330 L206,286" stroke="{ORANGE}" stroke-width="5" stroke-linecap="round"/>'
             f'<path d="M150,330 L138,346 L148,338 Z" fill="{RED}" {st(2)}/>')
    save('bai38_t1_q2_flowers', W, H, p, folder=F)


# ── Tiết 1 Q3: cành trên 7 con chim, cành dưới 5 con chim ───────────────────
def t1_q3_birds():
    W, H = 640, 400
    p = [KA.sky_grass(W, H, 470, sky='#E4F4FC')]
    br = '#9A6B4A'
    # thân cây bên phải, hai cành
    p.append(f'<path d="M600,396 C590,300 600,200 640,120 L640,170 C622,230 618,320 624,396 Z" fill="{br}" {st(2.6)}/>')
    p.append(f'<path d="M612,190 C500,170 300,150 30,150 L30,166 C300,168 500,190 606,214 Z" fill="{br}" {st(2.6)}/>')
    p.append(f'<path d="M616,330 C500,316 300,300 60,306 L60,322 C300,318 500,334 612,352 Z" fill="{br}" {st(2.6)}/>')
    for (x, y, r) in ((80, 168, 20), (260, 172, -10), (430, 190, 15), (180, 322, 160), (380, 328, -170), (520, 356, 10)):
        p.append(K.leaf(x, y, 40, r + 60))
    cols = [BLUE, '#5BC0EE', TEAL, BLUE, '#8FD3F4', '#5BC0EE', BLUE]
    xs_top = [62, 140, 218, 296, 374, 452, 530]
    for i, x in enumerate(xs_top):
        p.append(KB.fit(KB.bird(cols[i]), x, 112, 92, 72, flip=(i % 3 == 1)))
    xs_bot = [100, 210, 320, 430, 540]
    for i, x in enumerate(xs_bot):
        p.append(KB.fit(KB.bird(cols[(i + 2) % 7]), x, 268, 92, 72, flip=(i % 2 == 1)))
    p.append(text(28, 60, 'Cành trên', 24, 700, anchor='start'))
    p.append(text(28, 232, 'Cành dưới', 24, 700, anchor='start'))
    save('bai38_t1_q3_birds', W, H, p, folder=F)


# ── Tiết 1 Q4: 6 chú thỏ, ba chuồng A, B, C ──────────────────────────────────
def t1_q4_rabbits():
    W, H = 720, 470
    p = [KA.sky_grass(W, H, 150, sky='#E4F4FC')]
    p.append(K.hutch(130, 150, 170, 96, 'A'))
    p.append(K.hutch(600, 210, 170, 96, 'B', wall='#D9F0FF', roof=ORANGE))
    p.append(K.hutch(600, 400, 170, 96, 'C', wall='#E6F7D9', roof=PURPLE))
    rab = [(110, 290), (250, 270), (390, 300), (130, 420), (290, 430), (430, 440)]
    for i, (x, y) in enumerate(rab):
        p.append(KA.g(x, y, K.rabbit(run=True), 1.55, flip=(i % 2 == 1)))
    for (x, y) in ((60, 200), (360, 190), (470, 380), (220, 345)):
        p.append(f'<path d="M{x},{y} l-8,-22 M{x},{y} l0,-26 M{x},{y} l9,-22" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>')
    save('bai38_t1_q4_rabbits', W, H, p, folder=F)


# ── Tiết 2 Q1: tổ ong 11 ô ghi phép tính (bé tô vàng / đỏ / xanh) ───────────
HEX = [('4 + 6', 0, 0), ('10 – 1', 2, 0), ('5 + 4', 4, 0), ('6 + 2', 1, 1), ('9 – 1', 3, 1), ('6 + 1', 2, 2),
       ('7 + 3', 1, 3), ('8 + 2', 3, 3), ('4 + 4', 0, 4), ('3 + 5', 2, 4), ('10 – 2', 4, 4)]


def t2_q1_hex():
    r = 62
    dx, dy = r * 1.5, r * 3 ** .5 / 2
    W, H = int(4 * dx + 2 * r + 20), int(4 * dy + 2 * dy + 20)
    p = []
    for lab, c, rr in HEX:
        cx, cy = 10 + r + c * dx, 10 + dy + rr * dy
        p.append(K.hexagon(cx, cy, r - 2, WHITE, lab, size=27, col=INK))
    save('bai38_t2_q1_hex', W, H, p, folder=F)


# ── Tiết 2 Q2: ba ngôi nhà 5, 4, 10 và năm bạn rùa ───────────────────────────
def t2_q2_turtles():
    W, H = 760, 430
    p = [KA.sky_grass(W, H, 170, sky='#E4F4FC')]
    p.append(K.house(130, 170, 170, 96, roof=ORANGE, label='5'))
    p.append(K.house(380, 150, 170, 96, roof=RED, label='4'))
    p.append(K.house(630, 170, 170, 96, roof=PURPLE, label='10'))
    tur = [(120, 290, '7 + 3', False), (360, 280, '2 + 2', False), (630, 290, '3 + 7', True),
           (230, 400, '9 – 5', False), (520, 400, '9 – 4', False)]
    for (x, y, lab, fl) in tur:
        p.append(K.turtle(x, y, lab, k=1.18, flip=fl))
    save('bai38_t2_q2_turtles', W, H, p, folder=F)


# ── Tiết 2 Q5: năm bông hoa 2, 4, 5, 7, 8 và mười chú ong ────────────────────
BEES = [('9 – 4', 120, 95), ('10 – 3', 370, 85), ('4 + 4', 600, 95), ('6 – 4', 690, 200), ('1 + 1', 680, 330),
        ('9 – 5', 610, 460), ('3 + 5', 420, 470), ('10 – 8', 230, 450), ('3 + 1', 90, 370), ('7 + 0', 80, 230)]
FLOWERS = [('4', 320, 200), ('5', 470, 200), ('2', 250, 300), ('7', 520, 300), ('8', 385, 345)]


def t2_q5_bees():
    W, H = 780, 520
    p = [KA.sky_grass(W, H, 600, sky='#EEF8E6')]
    cols = {'2': PINK, '4': ORANGE, '5': PURPLE, '7': RED, '8': TEAL}
    for lab, x, y in FLOWERS:
        p.append(K.flower(x, y, 54, cols[lab], WHITE, n=10, label=lab, label_size=32, center_r=26))
    for lab, x, y in BEES:
        p.append(K.bee(x, y, lab, k=1.05, flip=x > 420))
    save('bai38_t2_q5_bees', W, H, p, folder=F)


def flower_icon(lab):
    cols = {'2': PINK, '4': ORANGE, '5': PURPLE, '7': RED, '8': TEAL}
    p = [K.flower(40, 40, 34, cols[lab], WHITE, n=10, label=lab, label_size=24, center_r=16)]
    save(f'bai38_t2_q5_flower{lab}', 80, 80, p, folder=F)


# ── Tiết 3 Q1–Q3: que tính xếp số ────────────────────────────────────────────
def stick_panel(name, glyphs, W=600):
    """glyphs: list of ('d', n|segs) chữ số, ('>',), ('-',), ('+',), ('=',)"""
    H = 230
    p = [K.card(4, 4, W - 8, H - 8)]
    unit = {'d': 110, '>': 90, '-': 80, '+': 90, '=': 90}
    total = sum(unit[g_[0]] for g_ in glyphs) + 30 * (len(glyphs) - 1)
    x = (W - total) / 2
    top, h = 45, 140
    for gl in glyphs:
        kind = gl[0]
        if kind == 'd':
            p.append(K.stick_digit(x + 12, top, 86, h, gl[1]))
        elif kind == '>':
            p.append(K.stick_line(x + 14, top + 30, x + 74, top + h / 2))
            p.append(K.stick_line(x + 74, top + h / 2, x + 14, top + h - 30))
        elif kind == '-':
            p.append(K.stick_line(x + 8, top + h / 2, x + 72, top + h / 2))
        elif kind == '+':
            p.append(K.stick_line(x + 10, top + h / 2, x + 80, top + h / 2))
            p.append(K.stick_line(x + 45, top + h / 2 - 35, x + 45, top + h / 2 + 35))
        elif kind == '=':
            p.append(K.stick_line(x + 10, top + h / 2 - 16, x + 80, top + h / 2 - 16))
            p.append(K.stick_line(x + 10, top + h / 2 + 16, x + 80, top + h / 2 + 16))
        x += unit[kind] + 30
    save(name, W, H, p, folder=F)


# ── Tiết 3 Q4: thỏ, hai bức tường có cửa số, cà rốt ─────────────────────────
def t3_q4_gates():
    W, H = 760, 380
    p = [K.card(4, 4, W - 8, H - 8, fill='#E6F5E1', r=22)]
    wall = '#B9A08C'
    def wall_col(x, gaps):
        out = []
        y = 4
        for gy in gaps:
            out.append(f'<rect x="{x - 9}" y="{y}" width="18" height="{gy - 34 - y}" fill="{wall}" {st(2.4)}/>')
            out.append(f'<rect x="{x - 14}" y="{gy - 40}" width="28" height="8" rx="2" fill="{WHITE}" {st(2)}/>')
            out.append(f'<rect x="{x - 14}" y="{gy + 32}" width="28" height="8" rx="2" fill="{WHITE}" {st(2)}/>')
            y = gy + 40
        out.append(f'<rect x="{x - 9}" y="{y}" width="18" height="{H - 4 - y}" fill="{wall}" {st(2.4)}/>')
        return out
    g1 = [(140, '3'), (290, '4')]
    g2 = [(90, '6'), (195, '5'), (300, '7')]
    p += wall_col(260, [y for y, _ in g1])
    p += wall_col(470, [y for y, _ in g2])
    for x, gs in ((260, g1), (470, g2)):
        for y, lab in gs:
            p.append(f'<circle cx="{x + 36}" cy="{y}" r="22" fill="{WHITE}" {st(2.6)}/>')
            p.append(text(x + 36, y + 10, lab, 28, 700))
    # thỏ và dấu hỏi
    p.append(KA.g(110, 270, K.rabbit(run=False), 2.0))
    p.append(text(200, 130, '?', 80, 700, fill=BLUE))
    # bó cà rốt
    for i, (x, y, r) in enumerate(((620, 160, -30), (660, 190, -10), (600, 220, -40), (680, 240, 5), (640, 260, -20))):
        p.append(KB.fit(KB.carrot(), x, y, 120, 70, rot=r))
    save('bai38_t3_q4_gates', W, H, p, folder=F)


if __name__ == '__main__':
    t1_q2_flowers()
    t1_q3_birds()
    t1_q4_rabbits()
    t2_q1_hex()
    t2_q2_turtles()
    t2_q5_bees()
    for lab in '24578':
        flower_icon(lab)
    stick_panel('bai38_t3_q1_sticks', [('d', 0), ('>',), ('d', 5)], W=520)
    stick_panel('bai38_t3_q2_sticks', [('d', 8), ('-',), ('d', 3), ('=',), ('d', 6)], W=700)
    stick_panel('bai38_t3_q3_sticks', [('d', 9), ('+',), ('d', 5), ('=',), ('d', 5)], W=720)
    t3_q4_gates()
