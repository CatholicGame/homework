"""
Vở BT Toán 1 Tập Hai, Bài 39 Ôn tập các số và phép tính trong phạm vi 100 (sách trang 95–100).
Mọi hình vẽ lại bằng nét riêng, chỉ giữ nội dung toán của sách.

    python scripts/redraw/g1t2_bai39.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1t2_f as K
import kit_l1_a as KA
import kit_g3 as G3

F = K.F
st = K.st


# ── Tiết 1 Q1: bó que tính (1 chục) và que rời ───────────────────────────────
def bundle(x, base, h=110):
    """một bó 10 que, chân bó ở (x, base), rộng ~40"""
    s = []
    for i in range(5):
        xx = x - 16 + i * 8
        s.append(f'<rect x="{xx}" y="{base - h}" width="8" height="{h}" rx="3" fill="{K.STICK}" {st(1.8)}/>')
    s.append(f'<ellipse cx="{x + 4}" cy="{base - h}" rx="21" ry="5" fill="#F7D98B" {st(1.8)}/>')
    s.append(f'<rect x="{x - 19}" y="{base - h * .48}" width="46" height="9" rx="4" fill="{RED}" {st(1.8)}/>')
    return ''.join(s)


def single(x, base, h=110):
    return f'<rect x="{x - 4}" y="{base - h}" width="8" height="{h}" rx="3" fill="{K.STICK}" {st(1.8)}/>'


def bundles(name, tens, ones):
    n_w = tens * 50 + ones * 18 + (16 if ones else 0)
    W, H = max(260, n_w + 40), 150
    p = [K.card(3, 3, W - 6, H - 6, r=14)]
    x = (W - n_w) / 2 + 22
    for i in range(tens):
        p.append(bundle(x, 132))
        x += 50
    x += 4
    for i in range(ones):
        p.append(single(x, 132))
        x += 18
    save(name, W, H, p, folder=F)


# ── Tiết 1 Q2: bốn người tuyết cầm hai quả bóng bay ──────────────────────────
def snowman(cx, base, chuc, dv, belly, hat=True):
    s = []
    for sx, lab in ((-1, chuc), (1, dv)):
        bx, by = cx + sx * 62, base - 210
        s.append(f'<path d="M{cx + sx * 34},{base - 112} Q{bx - sx * 10},{by + 70} {bx},{by + 40}" fill="none" {st(2)}/>')
        s.append(f'<ellipse cx="{bx}" cy="{by}" rx="36" ry="40" fill="#CFEFFF" {st(2.6)}/>')
        if lab:
            s.append(text(bx, by + 10, lab, 28, 700, fill='#1F8FC9'))
    s.append(f'<ellipse cx="{cx}" cy="{base - 52}" rx="66" ry="54" fill="#F3FAFF" {st()}/>')
    s.append(f'<circle cx="{cx}" cy="{base - 140}" r="40" fill="#F3FAFF" {st()}/>')
    s.append(f'<path d="M{cx - 40},{base - 104} Q{cx},{base - 92} {cx + 40},{base - 104} L{cx + 36},{base - 92} Q{cx},{base - 82} {cx - 36},{base - 92} Z" fill="{BLUE}" {st(2.2)}/>')
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{cx + sx * 50}" cy="{base - 104}" rx="13" ry="9" fill="{GREY}" {st(2.2)}/>')
    if hat:
        s.append(f'<path d="M{cx - 30},{base - 170} Q{cx},{base - 210} {cx + 30},{base - 170} Z" fill="{GREY}" {st(2.4)}/>'
                 f'<rect x="{cx - 40}" y="{base - 174}" width="80" height="9" rx="4" fill="#7A8390" {st(2.2)}/>')
    else:
        s.append(f'<path d="M{cx - 22},{base - 182} L{cx},{base - 172} L{cx + 22},{base - 182} L{cx + 22},{base - 162} L{cx},{base - 172} L{cx - 22},{base - 162} Z" fill="{PINK}" {st(2.2)}/>')
    s.append(f'<circle cx="{cx - 13}" cy="{base - 144}" r="4" fill="{INK}"/><circle cx="{cx + 13}" cy="{base - 144}" r="4" fill="{INK}"/>')
    s.append(f'<path d="M{cx},{base - 136} L{cx + 16},{base - 130} L{cx},{base - 126} Z" fill="{ORANGE}" {st(1.8)}/>')
    s.append(f'<path d="M{cx - 12},{base - 118} Q{cx},{base - 110} {cx + 12},{base - 118}" fill="none" {st(2)}/>')
    s.append(f'<ellipse cx="{cx}" cy="{base - 46}" rx="34" ry="20" fill="{WHITE}" {st(2.4)}/>')
    if belly:
        s.append(text(cx, base - 37, belly, 26, 700))
    return ''.join(s)


def t1_q2_snowmen():
    W, H = 860, 300
    p = [K.card(3, 3, W - 6, H - 6, fill='#EEF8FD', r=18)]
    for i, (c, d, b, hat) in enumerate((('40', '6', '46', True), ('', '', '75', False), ('', '', '54', False), ('30', '3', '', True))):
        p.append(snowman(110 + i * 213, 290, c, d, b, hat))
    save('bai39_t1_q2_snowmen', W, H, p, folder=F)


# ── Tiết 1 Q4: ba tấm thẻ 4, 0, 9 ────────────────────────────────────────────
def t1_q4_cards():
    W, H = 520, 260
    p = []
    for (x, y, r, lab) in ((80, 70, -4, '4'), (220, 20, 3, '0'), (360, 110, 4, '9')):
        p.append(f'<g transform="rotate({r} {x + 50} {y + 65})"><rect x="{x}" y="{y}" width="100" height="130" rx="8" fill="#BFE6F7" {st()}/>'
                 + text(x + 50, y + 88, lab, 66, 700) + '</g>')
    save('bai39_t1_q4_cards', W, H, p, folder=F)


# ── Tiết 2 Q2: mèo, cá (hình nhỏ trong ô nối) ───────────────────────────────
def t2_q2_cat():
    W, H = 140, 110
    s = [f'<path d="M30,92 Q14,70 30,48" fill="none" {st(7)}/><path d="M30,92 Q14,70 30,48" fill="none" stroke="#C9CED6" stroke-width="3" stroke-linecap="round"/>',
         f'<ellipse cx="70" cy="80" rx="38" ry="22" fill="#C9CED6" {st()}/>',
         f'<path d="M52,64 L54,98 M70,62 L70,100 M88,64 L86,98" stroke="#7A8390" stroke-width="5" stroke-linecap="round"/>',
         f'<path d="M78,30 L84,6 L98,24 Z M110,24 L124,6 L128,32 Z" fill="#C9CED6" {st(2.4)}/>',
         f'<circle cx="104" cy="44" r="27" fill="#E3E7EC" {st()}/>',
         f'<circle cx="95" cy="40" r="7" fill="{WHITE}" {st(1.8)}/><circle cx="96" cy="41" r="4" fill="{INK}"/>',
         f'<circle cx="114" cy="40" r="7" fill="{WHITE}" {st(1.8)}/><circle cx="115" cy="41" r="4" fill="{INK}"/>',
         f'<path d="M100,54 q5,5 10,0" fill="none" {st(2)}/><circle cx="105" cy="51" r="2.2" fill="{PINK}"/>',
         f'<path d="M80,52 L66,50 M80,56 L66,58 M128,52 L140,50 M128,56 L140,58" {st(1.4)}/>']
    save('bai39_t2_q2_cat', W, H, s, folder=F)


def t2_q2_fish():
    W, H = 140, 100
    s = [f'<path d="M100,50 L136,20 L130,50 L136,80 Z" fill="{BLUE}" {st()}/>',
         f'<path d="M10,50 Q40,10 104,48 Q40,92 10,50 Z" fill="#8FD3F4" {st()}/>',
         f'<path d="M50,30 Q66,10 80,36 Z M58,70 Q68,88 78,66 Z" fill="{BLUE}" {st(2.2)}/>',
         f'<circle cx="30" cy="44" r="6" fill="{WHITE}" {st(1.8)}/><circle cx="29" cy="44" r="3" fill="{INK}"/>',
         f'<path d="M14,56 q6,3 10,0" fill="none" {st(1.8)}/>']
    save('bai39_t2_q2_fish', W, H, s, folder=F)


# ── Tiết 2 Q4: đoàn tàu 8 toa A…K ghi phép trừ ──────────────────────────────
CARS = [('A', '66 – 16'), ('B', '70 – 10'), ('C', '54 – 4'), ('D', '37 – 17'), ('E', '63 – 13'), ('G', '48 – 8'),
        ('H', '76 – 6'), ('K', '62 – 12')]


def wheel(cx, cy, r=11):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{INK}"/><circle cx="{cx}" cy="{cy}" r="{r * .45:.1f}" fill="{GREY_L}"/>'


def t2_q4_train():
    cw = 112
    W, H = 160 + len(CARS) * (cw + 6) + 10, 200
    p = [f'<rect x="0" y="176" width="{W}" height="8" fill="#B9A08C"/>']
    # đầu tàu
    p.append(f'<rect x="14" y="70" width="130" height="92" rx="12" fill="{BLUE}" {st()}/>'
             f'<rect x="70" y="30" width="66" height="70" rx="10" fill="{BLUE}" {st()}/>'
             f'<rect x="84" y="44" width="38" height="36" rx="6" fill="#DFF3FF" {st(2.4)}/>'
             f'<rect x="28" y="40" width="22" height="34" rx="4" fill="{GREY}" {st(2.4)}/>'
             f'<rect x="62" y="22" width="82" height="12" rx="5" fill="{RED}" {st(2.4)}/>')
    for x in (40, 80, 120):
        p.append(wheel(x, 166, 13))
    x = 154
    cols = [YELLOW, ORANGE, GREEN, PINK, TEAL, PURPLE, '#8FD3F4', RED]
    for i, (lab, ex) in enumerate(CARS):
        p.append(f'<path d="M{x},{80} Q{x},{40} {x + cw / 2},{40} Q{x + cw},{40} {x + cw},{80} L{x + cw},{158} L{x},{158} Z" fill="{cols[i]}" {st()}/>')
        p.append(text(x + cw / 2, 72, lab, 30, 700))
        p.append(f'<rect x="{x + 6}" y="94" width="{cw - 12}" height="38" rx="8" fill="{WHITE}" {st(2)}/>')
        p.append(text(x + cw / 2, 121, ex, 24, 700))
        p.append(wheel(x + 28, 166) + wheel(x + cw - 28, 166))
        p.append(f'<line x1="{x - 6}" y1="146" x2="{x}" y2="146" {st(4)}/>')
        x += cw + 6
    save('bai39_t2_q4_train', W, H, p, folder=F)


# ── Tiết 3 Q2: lọ sáu bông hoa ghi phép tính (bé tô đỏ / vàng / xanh) ───────
def t3_q2_flowers():
    W, H = 640, 520
    p = [K.card(4, 4, W - 8, H - 8, fill='#FFF8EC', r=24)]
    heads = [(130, 150, '79 – 51', -14), (320, 80, '67 – 40', 0), (510, 120, '13 + 15', 14),
             (120, 300, '58 – 31', -14), (320, 240, '24 + 3', 0), (520, 270, '89 – 60', 14)]
    for (x, y, _, _r) in heads:
        p.append(K.stem(320, 400, x, y + 40, bend=(x - 320) * -.12))
    for (x, y, rot) in ((262, 380, -150), (378, 380, -30), (290, 340, -120), (350, 340, -55), (220, 330, -170), (420, 330, -10)):
        p.append(K.leaf(x, y, 62, rot))
    for (x, y, lab, r) in heads:
        p.append(K.flower(x, y, 82, WHITE, '#FFF4DF', n=8, label=lab, label_size=27, oval=(58, 24), label_rot=r))
    p.append(K.vase(320, 508, 170, 130, col=BLUE))
    save('bai39_t3_q2_flowers', W, H, p, folder=F)


# ── Tiết 3 Q3: hai bạn tưới cây, các chậu hoa ───────────────────────────────
def pot(x, base, k=1.0):
    return KA.g(x, base, f'<path d="M-22,-34 L22,-34 L16,0 L-16,0 Z" fill="{ORANGE}" {st(2.4)}/>'
                f'<rect x="-25" y="-40" width="50" height="10" rx="3" fill="{ORANGE}" {st(2.4)}/>'
                f'<path d="M0,-40 L0,-62" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>'
                f'<ellipse cx="-10" cy="-62" rx="11" ry="6" fill="{GREEN}" {st(2)} transform="rotate(-25 -10 -62)"/>'
                f'<ellipse cx="10" cy="-66" rx="11" ry="6" fill="{GREEN}" {st(2)} transform="rotate(25 10 -66)"/>', k)


def t3_q3_garden():
    W, H = 560, 330
    p = [KA.sky_grass(W, H, 210, sky='#E4F4FC')]
    for i in range(6):
        p.append(pot(40 + i * 96, 316 - (i % 2) * 10, .9))
    for i in range(5):
        p.append(pot(90 + i * 96, 262, .7))
    p.append(G3.place(170, 300, .62, G3.person(hair='pigtails', shirt=PINK, bottom='#4E8FC8', bottom_kind='skirt',
                                                 arms=((-50, -120), (60, -140)))))
    p.append(f'<g transform="translate(225 205)"><path d="M-14,-20 L20,-20 L24,10 L-18,10 Z" fill="{TEAL}" {st(2.4)}/>'
             f'<path d="M22,-12 L50,-30" {st(5)}/><path d="M48,-28 l10,8 M48,-28 l12,-2" stroke="{SKY_D}" stroke-width="2.5" stroke-linecap="round"/></g>')
    p.append(G3.place(400, 300, .62, G3.person(hair='short', shirt=YELLOW, bottom='#4E8FC8', arms=((-60, -130), (60, -100)))))
    save('bai39_t3_q3_garden', W, H, p, folder=F)


# ── Tiết 3 Q5: hai hình xếp bằng que tính (bé chạm để đếm từng que) ─────────
def t3_q5_sticks():
    W, H = 760, 330
    p = [K.card(3, 3, W - 6, H - 6, fill='#F7FBFF', r=18)]
    # hình A: tam giác đều cạnh s
    s, h = 98, 98 * 3 ** .5 / 2
    ox, oy = 230, 34
    P = lambda c, r: (ox + c * s / 2, oy + r * h)
    segs_a = [(P(0, 0), P(-1, 1)), (P(0, 0), P(1, 1)), (P(-1, 1), P(1, 1)),
              (P(-1, 1), P(-2, 2)), (P(-1, 1), P(0, 2)), (P(1, 1), P(0, 2)), (P(1, 1), P(2, 2)),
              (P(-2, 2), P(0, 2)), (P(0, 2), P(2, 2)),
              (P(-2, 2), P(-1, 3)), (P(0, 2), P(-1, 3)), (P(0, 2), P(1, 3)), (P(2, 2), P(1, 3))]
    assert len(segs_a) == 13
    for (a, b) in segs_a:
        p.append(f'<g data-tc="a">{KA.sticks([(a[0], a[1], b[0], b[1])], col=K.STICK)}</g>')
    p.append(f'<circle cx="56" cy="{oy + 1.5 * h}" r="24" fill="#CFEFFF" {st(2.4)}/>' + text(56, oy + 1.5 * h + 9, 'A', 26, 700))
    # hình B: chữ thập 5 ô vuông cạnh c
    c = 80
    bx, by = 500, 40
    segs_b = set()
    for (i, j) in ((1, 0), (0, 1), (1, 1), (2, 1), (1, 2)):
        x0, y0 = bx + i * c, by + j * c
        for seg in (((x0, y0), (x0 + c, y0)), ((x0, y0 + c), (x0 + c, y0 + c)), ((x0, y0), (x0, y0 + c)), ((x0 + c, y0), (x0 + c, y0 + c))):
            segs_b.add(seg)
    assert len(segs_b) == 16
    for (a, b) in sorted(segs_b):
        p.append(f'<g data-tc="b">{KA.sticks([(a[0], a[1], b[0], b[1])], col=K.STICK)}</g>')
    p.append(f'<circle cx="450" cy="{by + 1.5 * c}" r="24" fill="#CFEFFF" {st(2.4)}/>' + text(450, by + 1.5 * c + 9, 'B', 26, 700))
    save('bai39_t3_q5_sticks', W, H, p, folder=F)


if __name__ == '__main__':
    bundles('bai39_t1_q1_n54', 5, 4)
    bundles('bai39_t1_q1_n45', 4, 5)
    bundles('bai39_t1_q1_n71', 7, 1)
    bundles('bai39_t1_q1_n80', 8, 0)
    t1_q2_snowmen()
    t1_q4_cards()
    t2_q2_cat()
    t2_q2_fish()
    t2_q4_train()
    t3_q2_flowers()
    t3_q3_garden()
    t3_q5_sticks()
