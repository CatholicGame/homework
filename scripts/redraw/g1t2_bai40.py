"""
Vở BT Toán 1 Tập Hai, Bài 40 Ôn tập hình học và đo lường (sách trang 101–104).
Mọi hình vẽ lại bằng nét riêng, chỉ giữ nội dung toán của sách.

    python scripts/redraw/g1t2_bai40.py
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_f as K
import kit_l1_a as KA
import kit_g3 as G3

F = K.F
st = K.st
L3 = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'


def num_tag(x, y, n):
    return f'<circle cx="{x}" cy="{y}" r="16" fill="#CFEFFF" {st(2)}/>' + text(x, y + 7, n, 20, 700)


# ── Tiết 1 Q1: khối hình viền mực (bé tô đỏ khối lập phương, xanh khối hộp chữ nhật) ──
def t1_q1_solids():
    W, H = 760, 446
    p = [text(14, 34, 'a)', 24, 700, anchor='start'), text(14, 244, 'b)', 24, 700, anchor='start')]
    # hàng a
    p.append(K.box3d(40, 80, 120, 70, 34, -28))                 # hộp dẹt
    p.append(K.box3d(240, 70, 90, 90, 34, -28))                 # lập phương
    p.append(K.box3d(445, 50, 70, 120, 26, -22))                # hộp đứng
    # lập phương xoay nghiêng
    cx, cy = 655, 115
    def rot(pts, a=-14):
        r = math.radians(a)
        return [(cx + x * math.cos(r) - y * math.sin(r), cy + x * math.sin(r) + y * math.cos(r)) for x, y in pts]
    front = rot([(-52, -30), (34, -30), (34, 56), (-52, 56)])
    top = rot([(-52, -30), (-22, -58), (64, -58), (34, -30)])
    side = rot([(34, -30), (64, -58), (64, 28), (34, 56)])
    for poly in (top, side, front):
        p.append(f'<polygon points="{" ".join(f"{a:.1f},{b:.1f}" for a, b in poly)}" fill="{WHITE}" {L3}/>')
    for i, x in enumerate((110, 300, 490, 655)):
        p.append(num_tag(x, 200, i + 1))
    # hàng b
    p.append(K.box3d(50, 275, 70, 110, 24, -22))               # hộp đứng
    p.append(f'<path d="M250,320 L320,320 L390,262 Z" fill="{WHITE}" {L3}/>'
             f'<path d="M320,320 L390,262 L382,368 L320,394 Z" fill="{WHITE}" {L3}/>'
             f'<rect x="250" y="320" width="70" height="74" fill="{WHITE}" {L3}/>')   # khối chóp (không phải hộp)
    p.append(f'<path d="M455,275 L455,375 A42,13 0 0 0 539,375 L539,275" fill="{WHITE}" {L3}/>'
             f'<ellipse cx="497" cy="275" rx="42" ry="13" fill="{WHITE}" {L3}/>')   # khối trụ
    p.append(K.box3d(610, 300, 110, 80, 32, -26))              # hộp nằm
    for i, x in enumerate((95, 320, 497, 680)):
        p.append(num_tag(x, 424, i + 1))
    save('bai40_t1_q1_solids', W, H, p, folder=F)


# ── Tiết 1 Q2: các hình phẳng (bé chạm để đếm từng loại) ────────────────────
def t1_q2_shapes():
    W, H = 760, 400
    B1, B2, B3, B4 = '#BFE6F7', '#7CC6E8', '#3FA8DC', '#2C7FB0'
    p = [K.card(4, 4, W - 8, H - 8, fill=WHITE, r=26)]
    tc = lambda grp, s: f'<g data-tc="{grp}">{s}</g>'
    poly = lambda pts, c: f'<polygon points="{" ".join(f"{a},{b}" for a, b in pts)}" fill="{c}" {st(2.4)}/>'
    rect = lambda cx, cy, w, h, r, c: f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" fill="{c}" {st(2.4)} transform="rotate({r} {cx} {cy})"/>'
    circ = lambda cx, cy, r, c: f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{c}" {st(2.4)}/>'
    # tam giác (6)
    for pts, c in (([(30, 34), (130, 34), (80, 58)], B1), ([(450, 28), (585, 28), (585, 90)], B1),
                   ([(40, 150), (40, 240), (88, 195)], B4), ([(150, 180), (245, 270), (115, 268)], B3),
                   ([(522, 165), (560, 263), (460, 263)], B3), ([(340, 305), (480, 305), (370, 366)], B3)):
        p.append(tc('t', poly(pts, c)))
    # hình chữ nhật (3)
    p.append(tc('r', rect(355, 75, 135, 60, 28, B2)))
    p.append(tc('r', rect(650, 118, 165, 52, -34, B3)))
    p.append(tc('r', rect(112, 338, 150, 82, 0, B2)))
    # hình vuông (3)
    p.append(tc('v', rect(195, 118, 82, 82, 45, B4)))
    p.append(tc('v', rect(268, 338, 68, 68, 0, B1)))
    p.append(tc('v', rect(670, 312, 86, 86, 0, B2)))
    # hình tròn (4)
    p.append(tc('c', circ(494, 116, 28, B2)))
    p.append(tc('c', circ(335, 200, 58, B2)))
    p.append(tc('c', circ(682, 205, 34, B4)))
    p.append(tc('c', circ(542, 345, 40, '#4E7FA0')))
    save('bai40_t1_q2_shapes', W, H, p, folder=F)


# ── Tiết 1 Q3: hình vuông 2 × 2 xếp bằng 12 que tính ────────────────────────
def t1_q3_sticks():
    W, H = 300, 300
    a, o = 125, 25
    segs = []
    for i in range(3):
        for j in range(2):
            segs.append((o + j * a, o + i * a, o + (j + 1) * a, o + i * a))
            segs.append((o + i * a, o + j * a, o + i * a, o + (j + 1) * a))
    assert len(segs) == 12
    p = [KA.sticks(segs, col=K.STICK)]
    save('bai40_t1_q3_sticks', W, H, p, folder=F)


# ── Tiết 1 Q4: dãy hình lặp lại, ô dấu "?" ───────────────────────────────────
B1, B2, B3 = '#CFEFFF', '#7CC6E8', '#3FA8DC'


def flat(kind, x, base, k=1.0):
    """hình phẳng đặt chân tại base, mép trái x; trả về (svg, rộng)"""
    if kind == 'sq':
        s = 46 * k
        return f'<rect x="{x}" y="{base - s}" width="{s}" height="{s}" fill="{B1}" {st(2.4)}/>', s
    if kind == 'ci':
        r = 25 * k
        return f'<circle cx="{x + r}" cy="{base - r}" r="{r}" fill="{B2}" {st(2.4)}/>', 2 * r
    if kind == 're':
        w, h = 92 * k, 44 * k
        return f'<rect x="{x}" y="{base - h}" width="{w}" height="{h}" fill="{B1}" {st(2.4)}/>', w
    w, h = 56 * k, 52 * k
    return f'<polygon points="{x},{base} {x + w},{base} {x + w / 2},{base - h}" fill="{B3}" {st(2.4)}/>', w


SOLID = {'big': (58, 58, 18), 'tall': (30, 58, 12), 'small': (32, 32, 12), 'flat': (60, 22, 12)}


def solid(kind, x, base, k=1.0):
    w, h, d = (v * k for v in SOLID[kind])
    return K.solid_box(x, base - h, w, h, d), w + d


def seq(name, items, maker, gap=12, k=1.0, qmark_at=None):
    base = 84
    x = 12
    p = []
    for i, it in enumerate(items):
        if it == '?':
            p.append(text(x + 14, base - 10, '?', 44, 700, fill=RED))
            x += 30 + gap
            continue
        s, w = maker(it, x, base, k)
        p.append(s)
        x += w + gap
    W = int(x + 4)
    save(name, W, 100, p, folder=F)


def opt_icon(name, kind, maker):
    s, w = maker(kind, 8, 74, 1.0)
    save(name, int(w + 18), 82, [s], folder=F)


# ── Tiết 1 Q5: tam giác có một đoạn thẳng từ đỉnh xuống đáy ─────────────────
def t1_q5_triangle():
    W, H = 500, 260
    p = [f'<path d="M180,14 L10,246 L490,246 Z" fill="{WHITE}" {L3}/>', f'<path d="M180,14 L250,246" {L3}/>']
    save('bai40_t1_q5_triangle', W, H, p, folder=F)


# ── Tiết 2 Q1: sáu bức tranh và sáu đồng hồ ─────────────────────────────────
def kid(x, y, k, shirt=BLUE, girl=True, arms=((-60, -110), (60, -110)), legs='stand'):
    return G3.place(x, y, k, G3.person(hair='pigtails' if girl else 'short', shirt=shirt,
                                        bottom_kind='skirt' if girl else 'shorts', arms=arms, legs=legs))


def adult(x, y, k, shirt=GREEN, woman=False):
    return G3.place(x, y, k, G3.person(hair='long' if woman else 'short', shirt=shirt, adult=True,
                                        bottom_kind='pants'))


def scene(name, parts, sky=SKY, horizon=150):
    W, H = 260, 180
    p = [KA.sky_grass(W, H, horizon, sky=sky)] + parts
    save(name, W, H, p, folder=F)


def scenes():
    fam = lambda x0, y0, k=.33: [adult(x0, y0, k, GREEN), adult(x0 + 44, y0, k, PINK, True), kid(x0 + 84, y0, k * .9, YELLOW)]
    # công viên, 8 giờ sáng
    scene('bai40_t2_q1_park', [G3.tree(40, 150, 110), G3.tree(225, 150, 100),
                                G3.school_gate(140, 150, 110, 90, sign='CÔNG VIÊN', size=14, col='#C9E7B8')] + fam(70, 172))
    # vườn thú, 9 giờ sáng
    cage = [f'<rect x="20" y="30" width="220" height="110" fill="#FFF4DF" {st(2.4)}/>',
            G3.tree(200, 138, 90)]
    cage.append(f'<g transform="translate(90 112)"><circle r="30" fill="{ORANGE}" {st()}/><circle r="20" fill="{YELLOW}" {st(2)}/>'
                f'<circle cx="-7" cy="-4" r="3" fill="{INK}"/><circle cx="7" cy="-4" r="3" fill="{INK}"/><path d="M-5,8 q5,4 10,0" fill="none" {st(2)}/></g>')
    for i in range(12):
        cage.append(f'<line x1="{28 + i * 18}" y1="30" x2="{28 + i * 18}" y2="140" stroke="#6B6F78" stroke-width="4"/>')
    scene('bai40_t2_q1_zoo', cage + fam(150, 176, .3))
    # bơi thuyền, 10 giờ sáng
    lake = [f'<path d="M3,95 Q130,80 257,95 L257,177 L3,177 Z" fill="{WATER_L}"/>',
            f'<path d="M40,130 Q60,124 80,130 M150,150 Q170,144 190,150" fill="none" stroke="{WATER_D}" stroke-width="3" stroke-linecap="round"/>',
            f'<rect x="170" y="60" width="60" height="10" rx="3" fill="{BROWN}" {st(2)}/><path d="M176,70 L176,86 M224,70 L224,86" {st(3)}/>']
    lake += [kid(105, 146, .26, PINK), adult(145, 146, .22, GREEN)]
    lake.append(f'<path d="M50,126 L210,126 Q200,152 170,154 L90,154 Q60,152 50,126 Z" fill="{ORANGE}" {st()}/>')
    lake.append(f'<path d="M190,120 L235,150" {st(4)}/>')
    scene('bai40_t2_q1_boat', lake, horizon=100)
    # về nhà, 11 giờ trưa
    scene('bai40_t2_q1_home', [G3.building(20, 150, 110, 130, col='#FFE8C7'),
                                f'<rect x="60" y="112" width="30" height="38" fill="{BROWN}" {st(2)}/>',
                                G3.tree(220, 150, 100), f'<circle cx="215" cy="34" r="18" fill="{YELLOW}" {st(2)}/>'] + fam(120, 174, .3))
    # tập đàn, 3 giờ chiều (trong phòng)
    room = [f'<rect x="3" y="3" width="254" height="174" rx="22" fill="#FFF4DF"/>',
            f'<rect x="20" y="20" width="70" height="56" fill="{SKY}" {st(2.4)}/><path d="M55,20 L55,76 M20,48 L90,48" {st(2)}/>',
            f'<rect x="110" y="50" width="130" height="80" rx="6" fill="{PURPLE}" {st()}/>',
            f'<rect x="104" y="112" width="142" height="20" fill="{WHITE}" {st(2.4)}/>']
    for i in range(1, 10):
        room.append(f'<line x1="{104 + i * 14.2:.1f}" y1="112" x2="{104 + i * 14.2:.1f}" y2="132" {st(1.4)}/>')
    room += [f'<path d="M126,132 L126,172 M226,132 L226,172" {st(4)}/>',
             f'<rect x="150" y="60" width="50" height="34" fill="{WHITE}" {st(2)}/>',
             G3.note(165, 80, .6), kid(70, 172, .4, YELLOW, arms=((40, -160), (60, -150)), legs='sit')]
    save('bai40_t2_q1_piano', 260, 180, room + [f'<rect x="3" y="3" width="254" height="174" rx="22" fill="none" {st(3)}/>'], folder=F)
    # tưới cây, 5 giờ chiều
    gard = []
    for x in (120, 170, 220):
        gard.append(f'<g transform="translate({x} 168)"><path d="M-18,-30 L18,-30 L13,0 L-13,0 Z" fill="{ORANGE}" {st(2.4)}/>'
                    f'<path d="M0,-30 L0,-58" stroke="{GRASS_D}" stroke-width="4"/>'
                    f'<circle cx="0" cy="-64" r="12" fill="{PINK}" {st(2)}/><circle cx="0" cy="-64" r="5" fill="{YELLOW}"/></g>')
    gard += [kid(60, 172, .42, PINK, arms=((-50, -120), (70, -150))),
             f'<g transform="translate(96 92)"><path d="M-12,-14 L14,-14 L18,12 L-14,12 Z" fill="{TEAL}" {st(2.4)}/><path d="M16,-6 L34,-18" {st(4)}/></g>',
             f'<circle cx="40" cy="34" r="16" fill="{ORANGE}" {st(2)}/>']
    scene('bai40_t2_q1_water', gard, sky='#FFE9CF')


def clocks():
    for h in (10, 9, 8, 5, 11, 3):
        p = [K.clock(60, 60, 54, h, 0)]
        save(f'bai40_t2_q1_clock{h}', 120, 120, p, folder=F)


# ── Tiết 2 Q3: thìa, kéo, tuýp kem đánh răng (dài 6 cm, 10 cm, 13 cm; 1 cm = 40) ──
CM = 40


def dashed(x, y1, y2):
    return f'<line x1="{x}" y1="{y1}" x2="{x}" y2="{y2}" stroke="{INK}" stroke-width="2" stroke-dasharray="6 5"/>'


def t2_q3_measure():
    W, H = 760, 330
    p = []
    # thìa: x 30 → 270 (6 cm)
    x0, x1, y = 30, 30 + 6 * CM, 70
    p.append(dashed(x0, 20, 120) + dashed(x1, 20, 120))
    p.append(f'<path d="M{x0},{y - 5} L{x1 - 80},{y - 7} Q{x1 - 66},{y - 30} {x1 - 34},{y - 26} Q{x1},{y - 20} {x1},{y} '
             f'Q{x1},{y + 20} {x1 - 34},{y + 26} Q{x1 - 66},{y + 30} {x1 - 80},{y + 7} L{x0},{y + 5} Q{x0 - 2},{y} {x0},{y - 5} Z" fill="{BLUE}" {st(2.6)}/>')
    p.append(f'<circle cx="{x0 + 10}" cy="{y}" r="3" fill="{WHITE}" {st(1.6)}/>')
    # kéo: x 330 → 730 (10 cm)
    x0, x1, y = 330, 330 + 10 * CM, 80
    p.append(dashed(x0, 10, 160) + dashed(x1, 10, 160))
    p.append(f'<path d="M{x0 + 150},{y - 8} L{x1},{y - 2} L{x0 + 150},{y + 4} Z" fill="#E8ECF0" {st(2.4)}/>')
    p.append(f'<path d="M{x0 + 150},{y + 8} L{x1 - 6},{y + 4} L{x0 + 150},{y - 2} Z" fill="#F5F7F9" {st(2.4)}/>')
    for dy in (-38, 38):
        p.append(f'<ellipse cx="{x0 + 58}" cy="{y + dy}" rx="58" ry="34" fill="{BLUE}" {st()}/>'
                 f'<ellipse cx="{x0 + 62}" cy="{y + dy}" rx="34" ry="18" fill="{WHITE}" {st(2.4)}/>'
                 f'<path d="M{x0 + 108},{y + dy * .55} L{x0 + 156},{y + dy * .1}" stroke="{INK}" stroke-width="14" stroke-linecap="round"/>'
                 f'<path d="M{x0 + 108},{y + dy * .55} L{x0 + 156},{y + dy * .1}" stroke="{BLUE}" stroke-width="9" stroke-linecap="round"/>')
    p.append(f'<circle cx="{x0 + 160}" cy="{y + 1}" r="6" fill="{WHITE}" {st(2)}/>')
    # tuýp kem đánh răng: x 150 → 670 (13 cm)
    x0, x1, y = 150, 150 + 13 * CM, 260
    p.append(dashed(x0, 190, 325) + dashed(x1, 190, 325))
    p.append(f'<path d="M{x0 + 14},{y - 56} L{x1 - 80},{y - 28} Q{x1 - 64},{y} {x1 - 80},{y + 28} L{x0 + 14},{y + 56} Q{x0},{y + 56} {x0},{y + 44} '
             f'L{x0},{y - 44} Q{x0},{y - 56} {x0 + 14},{y - 56} Z" fill="{BLUE}" {st()}/>')
    for i in range(7):
        yy = y - 42 + i * 14
        p.append(f'<line x1="{x0 + 4}" y1="{yy}" x2="{x0 + 34}" y2="{yy}" {st(1.6)}/>')
    for k in (180, 250, 320):
        p.append(f'<path d="M{x0 + k},{y + 50} L{x0 + k + 80},{y - 44} L{x0 + k + 110},{y - 42} L{x0 + k + 30},{y + 48} Z" fill="{WHITE}" opacity=".8"/>')
    p.append(f'<rect x="{x1 - 82}" y="{y - 22}" width="22" height="44" fill="{GREY_L}" {st(2.4)}/>')
    p.append(f'<path d="M{x1 - 60},{y - 20} L{x1 - 14},{y - 16} Q{x1},{y} {x1 - 14},{y + 16} L{x1 - 60},{y + 20} Z" fill="{RED}" {st(2.6)}/>')
    save('bai40_t2_q3_measure', W, H, p, folder=F)


# ── Tiết 2 Q4: bốn băng giấy trên lưới ô vuông (bé tô màu) ──────────────────
def t2_q4_strips():
    c = 52
    cols, rows = 13, 7
    W, H = cols * c + 8, rows * c + 8
    o = 4
    p = [f'<rect x="{o}" y="{o}" width="{cols * c}" height="{rows * c}" fill="{WHITE}" stroke="{SKY_D}" stroke-width="2"/>']
    for i in range(1, cols):
        p.append(f'<line x1="{o + i * c}" y1="{o}" x2="{o + i * c}" y2="{o + rows * c}" stroke="{SKY_D}" stroke-width="1.2"/>')
    for j in range(1, rows):
        p.append(f'<line x1="{o}" y1="{o + j * c}" x2="{o + cols * c}" y2="{o + j * c}" stroke="{SKY_D}" stroke-width="1.2"/>')
    def strip(lab, c0, r0, cw, rh, lx, ly):
        p.append(f'<rect x="{o + c0 * c + 3}" y="{o + r0 * c + 3}" width="{cw * c - 6}" height="{rh * c - 6}" rx="3" fill="{WHITE}" {st(2.8)}/>')
        p.append(text(o + lx * c + c / 2, o + ly * c + c / 2 + 9, lab, 26, 700))
    strip('A', 1, 1, 6, 1, 0, 1)
    strip('B', 1, 3, 8, 1, 0, 3)
    strip('C', 3, 5, 6, 1, 2, 5)
    strip('D', 11, 1, 1, 4, 11, 0)
    save('bai40_t2_q4_strips', W, H, p, folder=F)


if __name__ == '__main__':
    t1_q1_solids()
    t1_q2_shapes()
    t1_q3_sticks()
    seq('bai40_t1_q4_seqA', ['sq', 'ci', 're', 'tr'] * 2 + ['sq', 'ci', '?', 'tr'], flat, gap=10, k=.9)
    seq('bai40_t1_q4_seqB', ['big', 'tall', 'small', 'flat'] * 2 + ['big', 'tall', 'small', '?'], solid, gap=8, k=.95)
    for kind in ('sq', 'ci', 're', 'tr'):
        opt_icon(f'bai40_t1_q4_optA_{kind}', kind, flat)
    for kind in ('big', 'tall', 'small', 'flat'):
        opt_icon(f'bai40_t1_q4_optB_{kind}', kind, solid)
    t1_q5_triangle()
    scenes()
    clocks()
    t2_q3_measure()
    t2_q4_strips()
