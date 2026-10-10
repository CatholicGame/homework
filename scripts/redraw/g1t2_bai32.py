"""
Vở BT Toán 1 Tập Hai, Bài 32 (trang 59–64): Phép trừ số có hai chữ số cho số có hai chữ số.
Nét vẽ riêng (kit_l1t2_d.py + kit_g3/kit_g1); chỉ giữ nội dung toán của sách.
    python scripts/redraw/g1t2_bai32.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_l1t2_d import *
import kit_g3 as g3

OUT = []


def out(name, w, h, parts):
    save(name, w, h, parts, folder=FOLDER)
    OUT.append(name)


# ── Tiết 1 câu 3: bốn bạn cầm bảng phép tính ────────────────────────────────
def sign_holder(x, by, s, who, expr, flip=False):
    """Một bạn (hoặc rô-bốt) cầm bảng ghi phép tính bên cạnh đầu."""
    sg = -1 if flip else 1
    hx = sg * 132
    bw = 180
    loc = []
    # bảng + cán (sau người); tay cầm ở chân cán
    loc.append(f'<rect x="{hx - 6}" y="-256" width="12" height="122" fill="#C99668" {st(2.6)}/>')
    loc.append(f'<rect x="{hx - bw / 2}" y="-336" width="{bw}" height="84" rx="6" fill="#fff" {st(3.2)}/>')
    loc.append(text(hx, -280, expr, size=40, weight=700, fill='#1F8FC4'))
    if who == 'robot':
        body = g3.robot(arms=((-70, -80), (hx, -142)), expr='happy')
    elif who == 'girl':
        body = g3.person(hair='ponytail', shirt=BLUE, bottom='#3E86C6', bottom_kind='skirt', expr='laugh', band=PINK,
                         arms=((-58, -112), (hx, -142)), shoe=PINK, sleeve='short')
    elif who == 'nam':
        body = g3.person(hair='short', shirt=BLUE, bottom='#3E86C6', expr='smile', arms=((-58, -112), (hx, -142)), sleeve='short')
    else:
        body = g3.person(hair='spiky', shirt=BLUE, bottom='#3E86C6', expr='smile', arms=((-58, -112), (hx, -142)), sleeve='short', look=6)
    loc.append(body)
    return place(x, by, s, ''.join(loc))


W, H = 760, 560
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
P.append(f'<ellipse cx="185" cy="262" rx="150" ry="10" fill="{INK}" opacity=".08"/>')
P.append(f'<ellipse cx="560" cy="262" rx="150" ry="10" fill="{INK}" opacity=".08"/>')
P.append(sign_holder(150, 258, .62, 'nam', '76 − 42'))
P.append(text(150, 30, 'Nam', size=24, weight=600))
P.append(sign_holder(610, 258, .62, 'girl', '58 − 24', flip=True))
P.append(text(610, 30, 'Mai', size=24, weight=600))
P.append(f'<ellipse cx="290" cy="546" rx="150" ry="10" fill="{INK}" opacity=".08"/>')
P.append(f'<ellipse cx="540" cy="546" rx="130" ry="10" fill="{INK}" opacity=".08"/>')
P.append(sign_holder(230, 542, .62, 'viet', '95 − 71'))
P.append(text(230, 316, 'Việt', size=24, weight=600))
P.append(sign_holder(500, 542, .62, 'robot', '66 − 6'))
P.append(text(470, 318, 'Rô-bốt', size=24, weight=600))
out('bai32_t1_q3_signs', W, H, P)


# ── Tiết 1 câu 4: toa tàu ở sân ga ──────────────────────────────────────────
W, H = 640, 340
P = [f'<rect width="{W}" height="{H}" fill="#EAF6FD"/>',
     f'<rect y="282" width="{W}" height="58" fill="#D8DEE5"/>',
     f'<line x1="0" y1="282" x2="{W}" y2="282" {st(3)}/>',
     f'<line x1="0" y1="296" x2="{W}" y2="296" stroke="{YELLOW}" stroke-width="6"/>']
# toa tàu
P.append(f'<path d="M10,40 H560 Q630,40 632,120 V250 H10 Z" fill="#6FB7EA" {st()}/>')
P.append(f'<rect x="10" y="210" width="622" height="40" fill="#3E86C6" {st()}/>')
P.append(f'<path d="M10,70 H600" stroke="#fff" stroke-width="5" opacity=".6"/>')
for wx in (150, 300):
    P.append(f'<rect x="{wx}" y="88" width="110" height="80" rx="8" fill="#DFF3FC" {st()}/>')
P.append(f'<path d="M470,86 H560 Q600,88 604,150 V168 H470 Z" fill="#DFF3FC" {st()}/>')
# cửa mở
P.append(f'<rect x="30" y="72" width="96" height="178" rx="6" fill="#F4FBFF" {st()}/>')
# hành khách trong toa (đầu sau cửa sổ)
for hx, hair, col in ((180, 'short', ORANGE), (230, 'bob', PINK), (330, 'adult', GREEN), (510, 'ponytail', PURPLE)):
    P.append(place(hx, 168, .32, g3.bust(hair=hair, shirt=col)))
# hành khách xuống tàu, ngồi ghế
P.append(place(64, 250, .46, g3.person(hair='adult', shirt=GREY, bottom='#5B6B7C', bottom_kind='pants', adult=True, arms=((-70, -200), (70, -200)))))
P.append(place(104, 252, .42, g3.person(hair='bob', shirt=PINK, bottom='#7C8CD6', bottom_kind='skirt', adult=True, arms=((-70, -200), (70, -200)), look=-6)))
# ghế chờ
P.append(f'<rect x="440" y="230" width="150" height="14" rx="5" fill="#8A6C52" {st()}/>')
P.append(f'<rect x="440" y="200" width="150" height="12" rx="5" fill="#8A6C52" {st()}/>')
for lx in (452, 572):
    P.append(f'<rect x="{lx}" y="244" width="8" height="40" fill="#5B4636" {st(2)}/>')
P.append(place(512, 284, .44, g3.person(hair='adult', shirt=TEAL, bottom='#4E5A8A', bottom_kind='pants', adult=True,
                                       legs='sit', arms=((40, -250), (80, -250)),
                                       extra_front='')))
P.append(f'<rect x="512" y="150" width="70" height="52" fill="#fff" {st(2.4)} transform="rotate(-8 547 176)"/>')
P.append(f'<path d="M520,164 H570 M520,176 H566 M520,188 H560" stroke="{GREY}" stroke-width="3" transform="rotate(-8 547 176)"/>')
# hai bạn nhỏ đi trên sân ga
P.append(place(250, 330, .5, g3.person(hair='short', shirt=YELLOW, legs='walk', arms=((-60, -112), (60, -112)), look=-8)))
P.append(place(340, 330, .5, g3.person(hair='pigtails', shirt=PINK, bottom='#4E8FC8', bottom_kind='skirt', legs='walk', arms=((-60, -112), (60, -112)), look=-8, sleeve='short')))
out('bai32_t1_q4_train', W, H, P)


# ── Tiết 2 câu 2: dãy rô-bốt ────────────────────────────────────────────────
def chain(name, first, ops, cols):
    W, H = 600, 190
    P = [f'<rect width="{W}" height="{H}" fill="#fff"/>']
    xs = (84, 300, 516)
    for i, op in enumerate(ops):
        P.append(arrow(xs[i] + 60, 110, xs[i + 1] - 72, label=op, size=24))
    for i, cx in enumerate(xs):
        P.append(screen_robot(cx, 182, first if i == 0 else None, body=cols[i]))
    out(name, W, H, P)


chain('bai32_t2_q2a_robots', '76', ('− 46', '− 10'), ('#8FD3F4', '#8FD3F4', '#8FD3F4'))
chain('bai32_t2_q2b_robots', '40', ('+ 8', '− 43'), ('#8FD3F4', '#8FD3F4', '#8FD3F4'))


# ── Tiết 2 câu 4: ai cao nhất ───────────────────────────────────────────────
W, H = 720, 440
G = 410             # mặt đất
K = 3.5             # px mỗi cm
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<path d="M20,{G} H700 L690,{G + 22} H30 Z" fill="#B9C2CB" {st()}/>']
P.append(bear(150, G, 95 * K))
P.append(monkey(400, G, 62 * K))
P.append(box_robot(600, G, 70 * K))
P.append(pole(285, G - 100 * K + 20, G))
P.append(pole(505, G - 100 * K + 20, G))
for x1, x2, cm, lab_x in ((90, 290, 95, 248), (330, 470, 62, 400), (520, 640, 70, 570)):
    y = G - cm * K
    P.append(dashed(x1, y, x2, y))
    P.append(text(lab_x, y - 8, f'{cm} cm', size=22, weight=600))
out('bai32_t2_q4_heights', W, H, P)


# ── Tiết 3 câu 2: bốn bông hoa (tô màu) ─────────────────────────────────────
W, H = 760, 400
P = [f'<rect width="{W}" height="{H}" fill="#fff"/>',
     f'<path d="M40,250 Q30,150 160,170 Q330,190 420,140 Q560,90 700,180 Q760,240 720,330 Q690,390 560,385 H120 Q40,380 40,250 Z" fill="#E3F4FC" pointer-events="none"/>']
P.append(daisy(120, 100, '63 − 3', stem=190))
P.append(daisy(300, 200, '75 − 25', stem=170, leaf_side=-1))
P.append(daisy(500, 90, '20 + 30', stem=200))
P.append(daisy(660, 200, '59 − 12', stem=170, leaf_side=-1))
out('bai32_t3_q2_flowers', W, H, P)


# (Tiết 3 câu 4 nấm và giỏ: ô nối bằng chữ trong app, 10 ô hình sẽ thành cột dài phải cuộn.)

print(len(OUT), 'SVG')
