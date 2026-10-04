"""
Vở BT Toán 1 (Tập một), Bài 24–28 và Tự kiểm tra (sách trang 28–33): mọi hình vẽ lại bằng nét riêng.
Chỉ giữ nội dung toán của sách (số con vật mỗi loại, ô số, đường nối, hình học).

    python scripts/redraw/g1_bai24_28.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g1 as k1
import kit_g9 as k9
import g3t2_bai56_kit as k56
import kit_l1_kt as kt

F = 'grade1-workbook'
(ASSETS.parent / F).mkdir(exist_ok=True)
LINE = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"'


def scale(x, y, s, inner, flip=False):
    fx = -s if flip else s
    return f'<g transform="translate({x},{y}) scale({fx},{s})">{inner}</g>'


# ── Bài 24 Q5: a) tam giác có một đường từ đỉnh xuống đáy (3 hình), b) hình vuông chia 4 (5 hình) ──
def bai24_shapes():
    W, H = 640, 270
    p = [text(30, 34, 'a)', 24, 700, anchor='start'), text(400, 34, 'b)', 24, 700, anchor='start'),
         f'<path d="M150,40 L36,240 L196,240 Z" fill="#fff" {LINE}/>',
         f'<path d="M150,40 L196,240 L330,240 Z" fill="#fff" {LINE}/>',
         ]
    x0, y0, s = 430, 50, 190
    for i in range(2):
        for j in range(2):
            p.append(f'<rect x="{x0 + j * s / 2}" y="{y0 + i * s / 2}" width="{s / 2}" height="{s / 2}" fill="#fff" {LINE}/>')
    save('bai24_q5_shapes', W, H, p, folder=F)


# ── Tự kiểm tra Q1: 4 bò, 2 ngựa, 10 vịt, 8 gà, 3 lợn (không có chó) ──
def cow(x, y, s=.36, flip=False):
    return scale(x, y, s, k1.cow(0, 0), flip)


def pig(x, y, s=.42, flip=False):
    return scale(x, y, s, k1.pig(0, 0), flip)


def horse(x, y, s=1.0, flip=False):
    return k56.put(x, y, k56.horse(), s, flip)


def duck(x, y, s=1.15, flip=False):
    return k9.g(k9.duck(), x, y, s, flip)


def hen(x, y, h=62, flip=False):
    return k1.hen(x, y, h=h, flip=flip)


def dog(x, y, s=1.0, flip=False):
    return k56.put(x, y, k56.dog(), s, flip)


def kt_farm():
    W, H = 800, 450
    p = [f'<clipPath id="fr"><rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="26"/></clipPath>',
         '<g clip-path="url(#fr)">',
         f'<rect width="{W}" height="{H}" fill="{SKY}"/>',
         f'<path d="M0,110 Q200,80 400,105 T800,95 V{H} H0 Z" fill="{GRASS}"/>',
         f'<path d="M0,250 Q260,232 520,248 T800,240 V{H} H0 Z" fill="#B4E0A2"/>',
         f'<ellipse cx="190" cy="392" rx="170" ry="44" fill="{WATER_L}" stroke="{WATER_D}" stroke-width="3"/>',
         '</g>',
         f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="26" fill="none" {LINE}/>']
    # 4 con bò (2 hàng × 2)
    for x, y in ((95, 140), (265, 140), (110, 245), (280, 245)):
        p.append(cow(x, y))
    # 2 con ngựa
    for x in (500, 665):
        p.append(horse(x, 205, 1.05))
    # 10 con vịt (hai hàng 5 con)
    for i, x in enumerate((50, 115, 180, 245, 310)):
        p.append(duck(x, 342, 1.05, flip=i == 4))
    for i, x in enumerate((75, 140, 205, 270, 335)):
        p.append(duck(x, 420, 1.05, flip=i == 0))
    # 8 con gà mái (hai hàng 4 con)
    for x in (400, 458, 516, 574):
        p.append(hen(x, 340))
    for x in (415, 473, 531, 589):
        p.append(hen(x, 425, flip=True))
    # 3 con lợn
    p.append(pig(655, 330, .36))
    p.append(pig(740, 330, .36))
    p.append(pig(705, 420, .36))
    save('kt_q1_farm', W, H, p, folder=F)


def kt_icons():
    icons = {
        'cow': (130, 100, cow(60, 96, .36)),
        'horse': (180, 150, horse(84, 146, .98)),
        'pig': (110, 70, pig(46, 66, .42)),
        'duck': (70, 74, duck(32, 72, 1.25)),
        'hen': (80, 84, hen(40, 80, 76)),
        'dog': (112, 80, dog(52, 76, 1.05)),
    }
    for name, (w, h, svg) in icons.items():
        save(f'kt_q1_{name}', w, h, [svg], folder=F)


# ── Tự kiểm tra Q4: tam giác có một đường ngang (2 hình), ba hình vuông chồng góc (5 hình) ──
def kt_shapes():
    W, H = 680, 260
    p = [f'<path d="M150,20 L40,220 L260,220 Z" fill="none" {LINE}/>',
         f'<path d="M95,120 H205" fill="none" {LINE}/>']
    s, ox, oy = 136, 360, 20
    for x, y in ((0, 0), (s * 1.3, 0), (s * .65, s * .65)):
        p.append(f'<rect x="{ox + x:.0f}" y="{oy + y:.0f}" width="{s}" height="{s}" fill="none" {LINE}/>')
    # vẽ lại ô (đúng hình học của sách: góc chồng nhau tạo hình vuông nhỏ)
    save('kt_q4_shapes', W, H, p, folder=F)


# ── Bài 25 Q4: 1 con chim + 2 con chim, ô số 1, 3, 2 ──
def bai25_birds():
    W, H = 560, 330
    p = [kt.frame(10, 10, 540, 230, fill='#EAF6FD')]
    for cx, cy, r, n in ((140, 125, 95, 1), (380, 125, 105, 2)):
        p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" {LINE}/>')
        p.append(f'<clipPath id="c{n}"><circle cx="{cx}" cy="{cy}" r="{r - 2}"/></clipPath>')
        p.append(f'<g clip-path="url(#c{n})">{kt.wire(cx - r, cx + r, cy - 10, 10)}</g>')
        xs = [cx] if n == 1 else [cx - 38, cx + 38]
        for x in xs:
            p.append(kt.put(x, cy - 6, kt.swallow(), .95))
    # đường nối xuống ô số
    p.append(f'<path d="M140,220 V270 M380,230 V270 M260,240 V270" fill="none" {LINE}/>')
    for x, n in ((140, 1), (260, 3), (380, 2)):
        p.append(kt.num_box(x, 270, n))
    save('bai25_q4_birds', W, H, p, folder=F)


# ── Bài 26 Q1a: vòng lớn (3) gồm vòng 1 chó + vòng 2 chó ──
def bai26_dogs():
    W, H = 540, 340
    p = [f'<ellipse cx="270" cy="170" rx="210" ry="125" fill="#FFF6E6" {LINE}/>',
         f'<circle cx="175" cy="200" r="62" fill="#fff" {LINE}/>',
         f'<circle cx="335" cy="135" r="82" fill="#fff" {LINE}/>',
         dog(165, 225, 1.0),
         dog(300, 128, .85), dog(362, 200, .85),
         # nhãn
         f'<path d="M110,40 L150,146" fill="none" {LINE}/>', kt.num_box(110, 0, 1),
         f'<path d="M370,214 L420,276" fill="none" {LINE}/>', kt.num_box(430, 276, 2),
         f'<path d="M110,270 L90,290" fill="none" {LINE}/>', kt.num_box(80, 290, 3)]
    save('bai26_q1a_dogs', W, H, p, folder=F)


# ── Bài 26 Q1b: ô 2 thỏ + ô 1 thỏ, ô số 2, 3, 1 ──
def bai26_rabbits():
    W, H = 470, 300
    p = [kt.frame(8, 8, 454, 210, fill='#EAF6FD'),
         kt.frame(22, 22, 260, 182, r=16, fill='#fff'),
         kt.frame(296, 22, 152, 182, r=16, fill='#fff'),
         f'<path d="M22,170 H282 M296,170 H448" stroke="{GRASS}" stroke-width="0"/>']
    for x, y in ((90, 150), (200, 190)):
        p.append(k9.g(k9.rabbit(), x, y, 1.45))
    p.append(k9.g(k9.rabbit(), 372, 170, 1.45, flip=True))
    p.append(f'<path d="M152,204 V244 M372,204 V244 M290,218 V244" fill="none" {LINE}/>')
    for x, n in ((152, 2), (290, 3), (372, 1)):
        p.append(kt.num_box(x, 244, n))
    save('bai26_q1b_rabbits', W, H, p, folder=F)


# ── Bài 27 Q4: 3 vịt đang bơi dưới ao + 1 vịt trên bờ đi xuống ao ──
def bai27_ducks():
    W, H = 560, 320
    p = [f'<clipPath id="fr"><rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="24"/></clipPath>',
         '<g clip-path="url(#fr)">',
         f'<rect width="{W}" height="{H}" fill="{GRASS}"/>',
         f'<path d="M0,0 H330 Q370,90 340,170 Q310,250 360,{H} H0 Z" fill="{WATER_L}" stroke="{WATER_D}" stroke-width="4"/>',
         '</g>',
         f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="24" fill="none" {LINE}/>']
    for x, y in ((90, 110), (230, 165), (110, 255)):
        # vịt bơi: che chân bằng mặt nước
        p.append(f'<clipPath id="sw{x}"><rect x="{x - 60}" y="{y - 120}" width="120" height="{120 - 14}"/></clipPath>')
        p.append(f'<g clip-path="url(#sw{x})">{duck(x, y, 1.7)}</g>')
        p.append(kt.ripple(x - 4, y - 14, 110))
    p.append(duck(445, 215, 1.9, flip=True))
    save('bai27_q4_ducks', W, H, p, folder=F)


# ── Bài 28 Q5: 2 bạn đứng chờ + 2 bạn chạy tới ──
def bai28_kids():
    W, H = 600, 320
    p = [f'<clipPath id="fr"><rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="24"/></clipPath>',
         '<g clip-path="url(#fr)">',
         f'<rect width="{W}" height="{H}" fill="{SKY}"/>',
         f'<path d="M0,230 Q300,214 600,232 V{H} H0 Z" fill="{GRASS}"/>',
         '</g>',
         f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="24" fill="none" {LINE}/>',
         k1.kid(85, 292, 220, shirt=RED, pose='wave'),
         k1.kid(195, 272, 210, girl=True, shirt=PINK, bottom=PURPLE, pose='wave', mouth='open')]
    for x, y, girl, shirt in ((360, 286, False, YELLOW), (500, 280, False, GREEN)):
        p.append(kt.speed_lines(x + 66, y - 130))
        p.append(f'<g transform="rotate(-8 {x} {y})">{k1.kid(x, y, 200, girl=girl, shirt=shirt, pose="wave", mouth="open")}</g>')
    save('bai28_q5_kids', W, H, p, folder=F)


if __name__ == '__main__':
    bai24_shapes()
    kt_farm()
    kt_icons()
    kt_shapes()
    bai25_birds()
    bai26_dogs()
    bai26_rabbits()
    bai27_ducks()
    bai28_kids()
