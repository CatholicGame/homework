"""
Bộ vẽ riêng cho Vở BT Toán 1 Tập Hai, Bài 28–31 (lát c): xe cộ, ghim giấy, bút chì, gọt bút chì,
cái bàn, hươu cao cổ, thỏ, kì lân, bục nhận giải, bàn học, đảo dừa, hải cẩu, hòm báu, lâu đài,
kị sĩ, cá chuồn, mèo, cá, tủ lạnh… Nét riêng, phẳng, viền INK, màu tươi (common.py).

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from kit_l1t2_c import *

Quy ước: (x, y) = điểm giữa đáy (chỗ chạm đất) trừ khi ghi khác.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g1 as K1
import kit_g3 as K3

SW = 3
FOLDER = 'grade1-workbook-2'
WIN = '#CFEAFB'      # kính xe
TYRE = '#4A4550'


def st(w=SW, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def P(d, fill, w=SW, extra=''):
    return f'<path d="{d}" fill="{fill}" {st(w)}{extra}/>'


def g(x, y, k, inner, flip=False, rot=0):
    sx = -k if flip else k
    return f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({sx:.4f},{k:.4f})">{inner}</g>'


def out(name, w, h, parts, bg=None):
    save(name, w, h, parts, bg=bg, folder=FOLDER)


def shadow(cx, y, rx, ry=6, op=.12):
    return f'<ellipse cx="{cx}" cy="{y}" rx="{rx}" ry="{ry}" fill="{INK}" opacity="{op}"/>'


def wheel(cx, cy, r, hub=GREY_L):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{TYRE}" {st()}/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * .5:.1f}" fill="{hub}" {st(2.2)}/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * .14:.1f}" fill="{INK}"/>')


def label_pill(cx, cy, s, size=20, w=None, fill=WHITE, col=INK):
    w = w or (len(s) * size * .55 + 22)
    h = size * 1.5
    return (f'<rect x="{cx - w / 2:.1f}" y="{cy - h / 2:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{h * .32:.1f}" fill="{fill}" {st(2.4)}/>'
            + text(cx, cy + size * .36, s, size, 700, col))


def eyes(cx, cy, gap=8, r=3.2):
    return K1.eyes(cx, cy, gap, r)


def smile(cx, cy, w=5, sw=2.4):
    return K1.smile(cx, cy, w, sw)


def blush(cx, cy, gap=14, r=3.6):
    return K1.blush(cx, cy, gap, r)


# ── xe cộ: (x, y) = đầu trái của xe, mặt đất; thân trắng để bé tô ─────────────────
def pickup(x, y):
    """Xe tải nhỏ (bán tải), dài 220."""
    s = [shadow(x + 112, y, 118)]
    s.append(P(f'M{x},{y - 30} V{y - 82} H{x + 118} V{y - 120} Q{x + 120},{y - 128} {x + 128},{y - 128} H{x + 170} '
               f'L{x + 194},{y - 84} H{x + 212} Q{x + 222},{y - 82} {x + 222},{y - 70} V{y - 36} Q{x + 222},{y - 30} {x + 216},{y - 30} Z', WHITE))
    s.append(P(f'M{x + 132},{y - 118} H{x + 166} L{x + 182},{y - 88} H{x + 132} Z', WIN, 2.4))
    s.append(f'<line x1="{x + 118}" y1="{y - 82}" x2="{x + 118}" y2="{y - 34}" {st(2.2)}/>')
    s.append(f'<rect x="{x + 214}" y="{y - 72}" width="10" height="12" rx="3" fill="{YELLOW}" {st(2)}/>')
    s.append(f'<line x1="{x + 140}" y1="{y - 70}" x2="{x + 154}" y2="{y - 70}" {st(3)}/>')
    s.append(wheel(x + 46, y - 24, 23) + wheel(x + 182, y - 24, 23))
    return ''.join(s)


def small_car(x, y, body=WHITE):
    """Ô tô con nhỏ, dài 140."""
    s = [shadow(x + 70, y, 76)]
    s.append(P(f'M{x + 6},{y - 20} Q{x},{y - 20} {x},{y - 30} V{y - 46} Q{x + 2},{y - 56} {x + 16},{y - 58} L{x + 34},{y - 60} '
               f'L{x + 50},{y - 90} Q{x + 54},{y - 96} {x + 62},{y - 96} H{x + 94} Q{x + 102},{y - 96} {x + 106},{y - 90} '
               f'L{x + 120},{y - 60} Q{x + 140},{y - 56} {x + 140},{y - 42} V{y - 28} Q{x + 140},{y - 20} {x + 132},{y - 20} Z', body))
    s.append(P(f'M{x + 46},{y - 62} L{x + 58},{y - 86} H{x + 76} V{y - 62} Z', WIN, 2.2))
    s.append(P(f'M{x + 82},{y - 62} V{y - 86} H{x + 98} L{x + 110},{y - 62} Z', WIN, 2.2))
    s.append(f'<rect x="{x + 132}" y="{y - 52}" width="9" height="9" rx="3" fill="{YELLOW}" {st(2)}/>')
    s.append(wheel(x + 32, y - 17, 17) + wheel(x + 108, y - 17, 17))
    return ''.join(s)


def bus(x, y, L=270):
    """Xe buýt, dài L."""
    s = [shadow(x + L / 2, y, L / 2 + 6)]
    s.append(f'<rect x="{x}" y="{y - 152}" width="{L}" height="{124}" rx="16" fill="{WHITE}" {st()}/>')
    ww = (L - 70) / 4
    for i in range(4):
        s.append(f'<rect x="{x + 12 + i * ww:.1f}" y="{y - 140}" width="{ww - 8:.1f}" height="44" rx="6" fill="{WIN}" {st(2.2)}/>')
    s.append(f'<rect x="{x + L - 52}" y="{y - 140}" width="34" height="100" rx="6" fill="{WIN}" {st(2.2)}/>')
    s.append(f'<line x1="{x + L - 35}" y1="{y - 140}" x2="{x + L - 35}" y2="{y - 40}" {st(2)}/>')
    s.append(f'<line x1="{x + 4}" y1="{y - 84}" x2="{x + L - 60}" y2="{y - 84}" {st(2.2)}/>')
    s.append(f'<rect x="{x + L - 8}" y="{y - 66}" width="10" height="14" rx="3" fill="{YELLOW}" {st(2)}/>')
    s.append(wheel(x + 52, y - 26, 25) + wheel(x + L - 82, y - 26, 25))
    return ''.join(s)


def van(x, y, L=246):
    """Xe khách nhỏ (xe van), dài L."""
    s = [shadow(x + L / 2, y, L / 2 + 4)]
    s.append(P(f'M{x + 8},{y - 26} Q{x},{y - 26} {x},{y - 36} V{y - 116} Q{x},{y - 128} {x + 14},{y - 128} H{x + L - 44} '
               f'Q{x + L - 30},{y - 128} {x + L - 24},{y - 116} L{x + L - 10},{y - 76} Q{x + L},{y - 72} {x + L},{y - 60} V{y - 36} '
               f'Q{x + L},{y - 26} {x + L - 10},{y - 26} Z', WHITE))
    xs = [x + 12, x + 64, x + 116, x + 168]
    for i, wx in enumerate(xs):
        last = i == 3
        if last:
            s.append(P(f'M{wx},{y - 116} H{x + L - 46} L{x + L - 34},{y - 80} H{wx} Z', WIN, 2.2))
        else:
            s.append(f'<rect x="{wx}" y="{y - 116}" width="44" height="36" rx="5" fill="{WIN}" {st(2.2)}/>')
    s.append(f'<line x1="{x + 4}" y1="{y - 62}" x2="{x + L - 4}" y2="{y - 62}" {st(2.2)}/>')
    s.append(f'<line x1="{x + 162}" y1="{y - 80}" x2="{x + 162}" y2="{y - 30}" {st(2)}/>')
    s.append(f'<rect x="{x + L - 8}" y="{y - 58}" width="9" height="12" rx="3" fill="{YELLOW}" {st(2)}/>')
    s.append(wheel(x + 46, y - 22, 22) + wheel(x + L - 52, y - 22, 22))
    return ''.join(s)


def ride_on(x, y, L=124):
    """Xe chòi chân của bé (thân cong, tay lái), dài L."""
    s = [shadow(x + L / 2, y, L / 2)]
    s.append(P(f'M{x + 10},{y - 22} Q{x},{y - 30} {x + 6},{y - 46} Q{x + 18},{y - 66} {x + 44},{y - 62} Q{x + 60},{y - 60} {x + 70},{y - 48} '
               f'L{x + 96},{y - 70} Q{x + 106},{y - 76} {x + 110},{y - 66} L{x + L},{y - 30} Q{x + L},{y - 18} {x + L - 12},{y - 18} H{x + 18} Z', WHITE))
    s.append(P(f'M{x + 18},{y - 50} Q{x + 34},{y - 62} {x + 56},{y - 54}', 'none', 2.4))
    s.append(f'<path d="M{x + 103},{y - 70} L{x + 92},{y - 98}" fill="none" {st(5)}/>')
    s.append(f'<path d="M{x + 82},{y - 100} H{x + 104}" fill="none" {st(7)}/>')
    for wx in (x + 20, x + 56, x + L - 12):
        s.append(f'<circle cx="{wx}" cy="{y - 9}" r="9" fill="{TYRE}" {st(2.4)}/><circle cx="{wx}" cy="{y - 9}" r="3" fill="{GREY_L}"/>')
    return ''.join(s)


def bicycle(x, y, L=196):
    """Xe đạp trẻ em, dài L (từ mép bánh sau tới mép bánh trước)."""
    r = 36
    bx, fx, cy = x + r, x + L - r, y - r
    s = [shadow(x + L / 2, y, L / 2)]
    for wx in (bx, fx):
        s.append(f'<circle cx="{wx}" cy="{cy}" r="{r}" fill="{WHITE}" {st(6, TYRE)}/>')
        s.append(f'<circle cx="{wx}" cy="{cy}" r="{r - 7}" fill="none" stroke="{GREY}" stroke-width="1.6"/>')
        for a in range(0, 180, 30):
            dx, dy = (r - 7) * math.cos(math.radians(a)), (r - 7) * math.sin(math.radians(a))
            s.append(f'<line x1="{wx - dx:.1f}" y1="{cy - dy:.1f}" x2="{wx + dx:.1f}" y2="{cy + dy:.1f}" stroke="{GREY}" stroke-width="1.4"/>')
        s.append(f'<circle cx="{wx}" cy="{cy}" r="4" fill="{INK}"/>')
    px, py = x + L * .45, cy
    sx_, sy_ = x + L * .38, y - 92
    hx, hy = fx - 18, y - 104
    fr = f'M{bx},{cy} L{px},{py} L{sx_},{sy_} Z M{px},{py} L{hx + 4},{hy + 14} L{sx_ + 4},{sy_ + 6} M{hx + 4},{hy + 14} L{fx},{cy} M{hx + 4},{hy + 14} L{hx},{hy}'
    s.append(f'<path d="{fr}" fill="none" stroke="{INK}" stroke-width="9" stroke-linejoin="round" stroke-linecap="round"/>')
    s.append(f'<path d="{fr}" fill="none" stroke="{RED}" stroke-width="4.5" stroke-linejoin="round" stroke-linecap="round"/>')
    s.append(P(f'M{sx_ - 16},{sy_ - 6} Q{sx_},{sy_ - 14} {sx_ + 14},{sy_ - 6} Q{sx_},{sy_} {sx_ - 16},{sy_ - 6} Z', INK, 2))
    s.append(f'<path d="M{hx - 12},{hy - 4} Q{hx},{hy - 2} {hx + 10},{hy - 10}" fill="none" {st(6)}/>')
    s.append(f'<circle cx="{px}" cy="{py}" r="9" fill="{GREY_L}" {st(2.4)}/>')
    return ''.join(s)


# ── đồ dùng học tập ────────────────────────────────────────────────────────────
def paper_clip(x, y, L, h=34, col='#8E99A6'):
    """Ghim giấy nằm ngang: (x, y) = mép trái, giữa chiều cao. Dài L."""
    r = h / 2
    d = (f'M{x + L - r},{y + r} H{x + r} A{r},{r} 0 0 1 {x + r},{y - r} H{x + L - r} A{r},{r} 0 0 1 {x + L - r},{y + r - 8} '
         f'H{x + r + 6} A{r - 8},{r - 8} 0 0 1 {x + r + 6},{y - r + 8} H{x + L - r - 14}')
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="7.5" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>')


def pencil(x, y, L, h=40, body=YELLOW, flip=False):
    """Bút chì nằm ngang, đầu tẩy bên trái, ngòi nhọn bên phải. (x, y) = mép trái, giữa."""
    r = h / 2
    tip = h * 1.25
    s = [f'<path d="M{x + r},{y - r} H{x + L - tip} L{x + L},{y} L{x + L - tip},{y + r} H{x + r} A{r},{r} 0 0 1 {x + r},{y - r} Z" fill="{body}" {st()}/>',
         f'<path d="M{x + r},{y - r} A{r},{r} 0 0 0 {x + r},{y + r} Z" fill="{PINK}" {st(2.4)}/>',
         f'<rect x="{x + r}" y="{y - r}" width="{h * .5:.1f}" height="{h}" fill="{GREY}" {st(2.4)}/>',
         f'<path d="M{x + L - tip},{y - r} L{x + L},{y} L{x + L - tip},{y + r} Q{x + L - tip + 8},{y} {x + L - tip},{y - r} Z" fill="{CREAM}" {st(2.4)}/>',
         f'<path d="M{x + L - tip * .32:.1f},{y - r * .32:.1f} L{x + L},{y} L{x + L - tip * .32:.1f},{y + r * .32:.1f} Z" fill="{INK}"/>',
         f'<line x1="{x + r + h * .5 + 6:.1f}" y1="{y - r * .35:.1f}" x2="{x + L - tip - 4:.1f}" y2="{y - r * .35:.1f}" stroke="#fff" stroke-width="3" opacity=".6" stroke-linecap="round"/>']
    inner = ''.join(s)
    if flip:
        return f'<g transform="translate({2 * x + L},0) scale(-1,1)">{inner}</g>'
    return inner


def sharpener(x, y, w, h=56, col=TEAL):
    """Gọt bút chì nhìn nghiêng: (x, y) = góc trên trái, rộng w."""
    return (f'<rect x="{x + 2}" y="{y}" width="{w - 4}" height="{h}" rx="8" fill="{col}" {st()}/>'
            f'<rect x="{x + 10}" y="{y + 8}" width="{w - 20}" height="{h * .42:.1f}" rx="5" fill="#BFC8D2" {st(2.2)}/>'
            f'<circle cx="{x + w / 2}" cy="{y + 8 + h * .21:.1f}" r="5" fill="#fff" {st(2)}/>'
            f'<line x1="{x + w / 2 - 3}" y1="{y + 8 + h * .21:.1f}" x2="{x + w / 2 + 3}" y2="{y + 8 + h * .21:.1f}" {st(1.6)}/>'
            f'<path d="M{x + 8},{y + h - 12} Q{x + w / 2},{y + h - 4} {x + w - 8},{y + h - 12}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".7"/>')


def ruler_strip(x, y, L, h=14):
    """Thước kẻ nằm ngang: (x, y) = góc trên trái."""
    s = [f'<rect x="{x}" y="{y}" width="{L}" height="{h}" rx="2" fill="#FFFFFF" {st(2)}/>']
    n = int(L // 6)
    for i in range(1, n):
        tall = i % 5 == 0
        s.append(f'<line x1="{x + i * L / n:.1f}" y1="{y}" x2="{x + i * L / n:.1f}" y2="{y + (h * .6 if tall else h * .35):.1f}" stroke="{INK}" stroke-width="1"/>')
    return ''.join(s)


def hand_span(x, y, w):
    """Bàn tay đang đo gang (nhìn từ trên): đầu ngón cái chạm (x, y), đầu ngón út chạm (x + w, y)."""
    def tube(d, wd):
        return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{wd + 5}" stroke-linecap="round" stroke-linejoin="round"/>'
                f'<path d="{d}" fill="none" stroke="{SKIN}" stroke-width="{wd}" stroke-linecap="round" stroke-linejoin="round"/>')
    cx, cy = x + w * .55, y - 46
    s = [tube(f'M{cx - 30},{cy - 34} L{cx - 4},{cy - 4}', 26),
         tube(f'M{cx - 8},{cy + 6} Q{x + w * .1},{cy + 4} {x + 5},{y - 5}', 11),
         tube(f'M{cx + 12},{cy + 8} Q{x + w * .95},{cy + 10} {x + w - 4},{y - 5}', 10)]
    for dx in (-2, 8, 18):
        s.append(tube(f'M{cx + dx - 6},{cy + 10} L{cx + dx - 4},{cy + 20}', 8))
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="20" ry="17" fill="{SKIN}" {st(2.6)}/>')
    for px in (x, x + w):
        s.append(f'<circle cx="{px}" cy="{y}" r="3.5" fill="{RED}"/>')
    return ''.join(s)


# ── con vật (đứng trên đất y, chiều cao đúng h) ─────────────────────────────────
def giraffe(x, y, h=300):
    """Hươu cao cổ quay sang phải, x = giữa thân, đỉnh sừng chạm y - h."""
    k = h / 300
    s = []
    col, spot = YELLOW, ORANGE
    # chân
    for lx in (-44, -24, 22, 42):
        s.append(f'<rect x="{lx - 7}" y="-96" width="14" height="92" rx="6" fill="{col}" {st()}/>'
                 f'<rect x="{lx - 8}" y="-14" width="16" height="14" rx="4" fill="{BROWN}" {st(2.4)}/>')
    s.append(P('M-58,-118 Q-70,-96 -74,-60', 'none', 3) + f'<circle cx="-74" cy="-58" r="5" fill="{BROWN}" {st(2)}/>')
    s.append(f'<ellipse cx="0" cy="-118" rx="62" ry="34" fill="{col}" {st()}/>')
    # cổ
    s.append(P('M20,-138 L44,-238 Q50,-250 62,-246 L74,-240 L52,-120 Z', col))
    # đầu
    s.append(P('M40,-246 Q44,-272 70,-270 Q92,-266 100,-250 Q104,-238 92,-234 Q74,-232 60,-234 Q44,-234 40,-246 Z', col))
    s.append(f'<ellipse cx="94" cy="-246" rx="2" ry="2.5" fill="{INK}"/>')
    for ox in (52, 68):
        s.append(f'<line x1="{ox}" y1="-266" x2="{ox - 2}" y2="-290" {st(4)}/><circle cx="{ox - 2}" cy="-292" r="7" fill="{BROWN}" {st(2.4)}/>')
    s.append(P('M44,-262 Q30,-276 26,-262 Q32,-252 44,-254 Z', col, 2.4))
    s.append(eyes(72, -256, 0, 3.6))
    s.append(blush(84, -244, 0, 4))
    for sx, sy, r in [(-30, -124, 9), (-6, -110, 7), (20, -128, 8), (36, -106, 6), (-44, -108, 6), (48, -186, 6), (40, -158, 7), (56, -214, 5), (8, -136, 5)]:
        s.append(f'<ellipse cx="{sx}" cy="{sy}" rx="{r}" ry="{r * .8:.1f}" fill="{spot}" {st(1.8)}/>')
    return g(x, y, k, ''.join(s))


def bunny(x, y, h=150):
    """Thỏ đứng, x = giữa, đỉnh tai chạm y - h."""
    k = h / 150
    col = '#F4F1F8'
    s = []
    for sg in (-1, 1):
        s.append(f'<ellipse cx="{sg * 14}" cy="-112" rx="9" ry="30" fill="{col}" {st()}/>'
                 f'<ellipse cx="{sg * 14}" cy="-110" rx="4" ry="20" fill="{PINK}"/>')
    s.append(f'<ellipse cx="0" cy="-34" rx="30" ry="34" fill="{col}" {st()}/>')
    s.append(f'<ellipse cx="0" cy="-28" rx="16" ry="20" fill="#fff" {st(1.8)}/>')
    for sg in (-1, 1):
        s.append(f'<ellipse cx="{sg * 18}" cy="-4" rx="14" ry="7" fill="{col}" {st(2.6)}/>')
        s.append(f'<ellipse cx="{sg * 28}" cy="-40" rx="7" ry="11" fill="{col}" {st(2.4)}/>')
    s.append(f'<circle cx="0" cy="-80" r="28" fill="{col}" {st()}/>')
    s.append(eyes(0, -82, 10, 3.6))
    s.append(f'<ellipse cx="0" cy="-73" rx="3.5" ry="2.6" fill="{PINK}" {st(1.4)}/>')
    s.append(smile(0, -69, 5, 2))
    s.append(blush(0, -72, 18, 4))
    return g(x, y, k, ''.join(s))


def unicorn(x, y, h=300, flip=False):
    """Kì lân quay sang trái, x = giữa thân, mũi sừng chạm y - h."""
    k = h / 300
    body = '#FFFFFF'
    mane, mane2 = PURPLE, PINK
    s = []
    for lx, sh in ((-50, 0), (-26, 6), (40, 6), (64, 0)):
        s.append(f'<rect x="{lx - 9}" y="-{118 - sh}" width="18" height="{108 - sh}" rx="8" fill="{body}" {st()}/>'
                 f'<rect x="{lx - 10}" y="-16" width="20" height="16" rx="4" fill="{GREY}" {st(2.4)}/>')
    s.append(P('M86,-156 Q136,-166 132,-96 Q124,-56 106,-66 Q120,-104 88,-126 Z', mane))
    s.append(P('M90,-146 Q116,-144 116,-100', 'none', 2.4))
    s.append(f'<ellipse cx="18" cy="-142" rx="80" ry="42" fill="{body}" {st()}/>')
    s.append(P('M-36,-158 Q-54,-196 -54,-236 L-14,-244 Q-6,-204 14,-172 Z', body))
    s.append(P('M-50,-254 Q-30,-266 -12,-250 Q-4,-232 -22,-220 L-82,-198 Q-106,-192 -108,-208 Q-106,-224 -84,-234 Z', body))
    s.append(f'<ellipse cx="-98" cy="-208" rx="3.5" ry="4.5" fill="{INK}" opacity=".7"/>')
    s.append(P('M-40,-254 L-30,-300 L-22,-252 Z', YELLOW, 2.6))
    s.append(P('M-37,-268 L-26,-271 M-34,-282 L-28,-284', 'none', 1.8))
    s.append(P('M-18,-250 L-10,-278 L-2,-248 Z', body, 2.6))
    s.append(P('M-6,-250 Q22,-240 22,-206 Q24,-180 10,-158 Q2,-190 -14,-204 Q0,-226 -6,-250 Z', mane))
    s.append(P('M2,-236 Q12,-220 8,-192', 'none', 2.2) + P('M-50,-252 Q-62,-268 -44,-262 Z', mane2, 2.2))
    s.append(P('M-62,-234 Q-54,-226 -46,-234', 'none', 2.6))
    for dx in (-60, -54, -48):
        s.append(f'<line x1="{dx}" y1="-230" x2="{dx - 1}" y2="-224" {st(1.6)}/>')
    s.append(f'<circle cx="-70" cy="-218" r="5" fill="{PINK}" opacity=".7"/>')
    s.append(smile(-92, -200, 5, 2))
    return g(x, y, k, ''.join(s), flip=flip)


# ── bục nhận giải, huy chương ─────────────────────────────────────────────────
MEDAL = {'vàng': '#F6C744', 'bạc': '#C9D1DA', 'đồng': '#D99058'}


def medal(cx, cy, kind, r=9):
    return (f'<path d="M{cx - 7},{cy - 26} L{cx},{cy - 6} L{cx + 7},{cy - 26}" fill="none" stroke="{RED}" stroke-width="4"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{MEDAL[kind]}" {st(2.2)}/>')


# ── bàn học (nhìn chéo) ──────────────────────────────────────────────────────
def desk(x, y, w=150, top='#7CC6E8'):
    """Bàn học nhìn chéo: (x, y) = góc trước trái của mặt bàn."""
    d = 26
    s = [f'<path d="M{x},{y} L{x + 26},{y - d} H{x + w + 26} L{x + w},{y} Z" fill="{top}" {st()}/>',
         f'<path d="M{x},{y} H{x + w} V{y + 8} H{x} Z" fill="#4E9CC8" {st(2.4)}/>']
    for lx in (x + 10, x + w - 10):
        s.append(f'<line x1="{lx}" y1="{y + 8}" x2="{lx}" y2="{y + 60}" {st(5, "#6B7280")}/>')
    for lx in (x + 34, x + w + 16):
        s.append(f'<line x1="{lx}" y1="{y - 10}" x2="{lx}" y2="{y + 38}" {st(4, "#9CA3AF")}/>')
    return ''.join(s)


# ── cảnh vật ──────────────────────────────────────────────────────────────────
def palm(x, y, h=70, lean=0):
    """Cây dừa, gốc (x, y)."""
    k = h / 70
    s = [P(f'M-3,0 Q{-2 + lean},-36 {4 + lean * 1.6},-64 L{9 + lean * 1.6},-63 Q{4 + lean},-36 4,0 Z', BROWN, 2.2)]
    tx, ty = 6 + lean * 1.6, -64
    for a, l in [(-160, 30), (-120, 26), (-60, 26), (-20, 30), (-90, 22)]:
        ex, ey = tx + l * math.cos(math.radians(a)), ty + l * math.sin(math.radians(a))
        mx, my = tx + l * .5 * math.cos(math.radians(a - 25)), ty + l * .5 * math.sin(math.radians(a - 25)) - 6
        s.append(P(f'M{tx},{ty} Q{mx:.1f},{my:.1f} {ex:.1f},{ey:.1f} Q{(tx + ex) / 2 + 4:.1f},{(ty + ey) / 2 + 6:.1f} {tx},{ty} Z', GREEN, 2))
    s.append(f'<circle cx="{tx - 3}" cy="{ty + 4}" r="4" fill="{BROWN}" {st(1.6)}/><circle cx="{tx + 4}" cy="{ty + 5}" r="4" fill="{BROWN}" {st(1.6)}/>')
    return g(x, y, k, ''.join(s))


def island(cx, cy, w, kind=0):
    """Đảo cát có dừa, tâm đáy (cx, cy)."""
    s = [f'<ellipse cx="{cx}" cy="{cy}" rx="{w / 2}" ry="{w * .16:.1f}" fill="{WATER_L}" {st(2)}/>',
         f'<ellipse cx="{cx}" cy="{cy - 3}" rx="{w * .34:.1f}" ry="{w * .1:.1f}" fill="#F7DFA0" {st(2)}/>']
    if kind == 0:
        s.append(palm(cx - 4, cy - 4, w * .74, 4))
    elif kind == 1:
        s.append(palm(cx - 12, cy - 4, w * .64, -3) + palm(cx + 12, cy - 4, w * .54, 5))
    else:
        s.append(palm(cx + 2, cy - 4, w * .56, -4))
    return ''.join(s)


def sailboat(cx, y, w=60):
    k = w / 60
    s = [P('M-30,0 H30 L22,12 H-22 Z', RED, 2.4), f'<line x1="0" y1="0" x2="0" y2="-56" {st(2.6)}/>',
         P('M3,-54 L28,-6 H3 Z', WHITE, 2.4), P('M-3,-46 L-24,-6 H-3 Z', YELLOW, 2.4),
         P('M0,-56 L12,-52 L0,-48', RED, 1.6)]
    return g(cx, y, k, ''.join(s))


def turn_arrow(x, y, side, r=16, col='#8E99A6'):
    """Mũi tên vòng xuống (đi tiếp hàng dưới). side='R' ở mép phải, 'L' ở mép trái. (x, y) = điểm đầu."""
    sg = 1 if side == 'R' else -1
    d = f'M{x},{y} A{r},{r} 0 0 {1 if sg > 0 else 0} {x},{y + 2 * r}'
    tip = f'M{x + 9 * sg * -1 + sg * 0},{y + 2 * r - 8} L{x - 2 * sg},{y + 2 * r} L{x + 8 * sg * -1 + 2 * sg},{y + 2 * r + 9}'
    return (f'<path d="{d}" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round"/>'
            f'<path d="M{x + 2 * sg},{y + 2 * r - 9} L{x - 6 * sg},{y + 2 * r} L{x + 2 * sg},{y + 2 * r + 9}" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')


def cloud(cx, cy, w, fill='#FFFFFF', op=1):
    k = w / 100
    return g(cx, cy, k, f'<path d="M-46,10 Q-52,-10 -30,-12 Q-26,-32 -4,-28 Q10,-42 28,-26 Q50,-28 48,-6 Q60,8 42,14 H-40 Q-50,14 -46,10 Z" fill="{fill}" opacity="{op}" {st(2.4)}/>')


def bush(cx, y, w, col=GREEN):
    k = w / 80
    return g(cx, y, k, P('M-40,0 Q-46,-20 -26,-24 Q-22,-42 0,-38 Q20,-46 28,-24 Q46,-20 40,0 Z', col, 2.6))


def round_tree(cx, y, h=150, crown=GREEN, trunk=BROWN, fruit=None, fruits=()):
    """Cây tán tròn, gốc (cx, y)."""
    k = h / 150
    s = [P('M-10,0 L-8,-60 Q-6,-70 -20,-84 L-12,-88 L0,-74 L12,-90 L20,-86 L8,-66 L10,0 Z', trunk),
         P('M-60,-80 Q-74,-110 -50,-124 Q-48,-152 -16,-150 Q0,-166 22,-150 Q54,-150 54,-120 Q76,-104 60,-80 Q40,-64 0,-70 Q-40,-62 -60,-80 Z', crown)]
    for fx, fy in fruits:
        s.append(f'<circle cx="{fx}" cy="{fy}" r="7" fill="{fruit}" {st(2)}/><path d="M{fx},{fy - 7} q2,-5 6,-6" fill="none" {st(1.6)}/>')
    return g(cx, y, k, ''.join(s))


def footprint(x, y, s=1):
    """Dấu bàn chân nhỏ (biểu tượng bước chân), (x, y) = gót."""
    return g(x, y, s, P('M-4,0 Q-7,-8 -5,-18 Q-3,-26 2,-24 Q6,-20 4,-10 Q3,-2 -4,0 Z', INK, 1)
             + ''.join(f'<circle cx="{dx}" cy="{dy}" r="{r}" fill="{INK}"/>' for dx, dy, r in [(-4, -29, 1.8), (0, -31, 1.7), (4, -30, 1.6), (7, -27, 1.4)]))


def ice_floe(cx, cy, w, h):
    """Tảng băng nổi dẹt, tâm (cx, cy)."""
    pts = [(-.5, .05), (-.36, -.42), (-.12, -.5), (.06, -.38), (.3, -.5), (.5, -.12), (.44, .34), (.2, .5), (-.1, .4), (-.38, .48)]
    d = 'M' + ' L'.join(f'{cx + px * w:.1f},{cy + py * h:.1f}' for px, py in pts) + ' Z'
    return (f'<ellipse cx="{cx}" cy="{cy + h * .38:.1f}" rx="{w * .56:.1f}" ry="{h * .22:.1f}" fill="{WATER_L}" opacity=".9"/>'
            f'<path d="{d}" fill="#F3FBFF" {st(2.6)}/>'
            f'<path d="M{cx - w * .3:.1f},{cy + h * .32:.1f} Q{cx},{cy + h * .4:.1f} {cx + w * .32:.1f},{cy + h * .26:.1f}" fill="none" stroke="{SKY_D}" stroke-width="2.4" stroke-linecap="round"/>')


def treasure_chest(cx, y, w=150, body=WHITE):
    """Hòm báu (thân trắng để bé tô), (cx, y) = giữa đáy."""
    h = w * .62
    x0 = cx - w / 2
    s = [shadow(cx, y, w * .55),
         f'<rect x="{x0}" y="{y - h * .62:.1f}" width="{w}" height="{h * .62:.1f}" rx="6" fill="{body}" {st()}/>',
         f'<path d="M{x0},{y - h * .62:.1f} V{y - h * .8:.1f} Q{x0},{y - h} {cx},{y - h} Q{x0 + w},{y - h} {x0 + w},{y - h * .8:.1f} V{y - h * .62:.1f} Z" fill="{body}" {st()}/>']
    for fx in (x0 + w * .18, x0 + w * .82):
        s.append(f'<line x1="{fx:.1f}" y1="{y - h:.1f}" x2="{fx:.1f}" y2="{y}" {st(2.4)}/>')
    for fy in (y - h * .4, y - h * .2):
        s.append(f'<line x1="{x0 + 4}" y1="{fy:.1f}" x2="{x0 + w * .18 - 2:.1f}" y2="{fy:.1f}" stroke="{INK}" stroke-width="1.4"/>'
                 f'<line x1="{x0 + w * .82 + 2:.1f}" y1="{fy:.1f}" x2="{x0 + w - 4}" y2="{fy:.1f}" stroke="{INK}" stroke-width="1.4"/>')
    s.append(f'<rect x="{cx - 9}" y="{y - h * .7:.1f}" width="18" height="20" rx="3" fill="{YELLOW}" {st(2.2)}/>')
    s.append(f'<circle cx="{cx}" cy="{y - h * .7 + 9:.1f}" r="2.6" fill="{INK}"/>')
    return ''.join(s)


def castle(cx, y, w=120, col='#BFE3F7', roof=BLUE, flag=RED, towers=2):
    """Lâu đài: (cx, y) = giữa đáy."""
    k = w / 120
    s = []
    for tx in (-46, 46) if towers == 2 else (0,):
        s.append(f'<rect x="{tx - 16}" y="-100" width="32" height="100" fill="{col}" {st()}/>'
                 + P(f'M{tx - 20},-100 L{tx},-134 L{tx + 20},-100 Z', roof))
    s.append(f'<rect x="-34" y="-74" width="68" height="74" fill="{col}" {st()}/>')
    for bx in (-34, -14, 6, 26):
        s.append(f'<rect x="{bx}" y="-84" width="10" height="10" fill="{col}" {st(2.4)}/>')
    s.append(P('M-16,0 V-28 Q-16,-44 0,-44 Q16,-44 16,-28 V0 Z', '#7C5A43'))
    for gx in (-8, 0, 8):
        s.append(f'<line x1="{gx}" y1="-40" x2="{gx}" y2="0" {st(1.6)}/>')
    s.append(f'<line x1="0" y1="-134" x2="0" y2="-158" {st(2.4)}/>' + P('M0,-158 L22,-152 L0,-146 Z', flag, 2) if towers == 1 else
             f'<line x1="46" y1="-134" x2="46" y2="-156" {st(2.4)}/>' + P('M46,-156 L66,-150 L46,-144 Z', flag, 2))
    for wx in (-46, 46) if towers == 2 else ():
        s.append(f'<rect x="{wx - 5}" y="-80" width="10" height="16" rx="5" fill="{INK}" opacity=".7"/>')
    return g(cx, y, k, ''.join(s))


def house(cx, y, w=60, wall=CREAM, roof=RED):
    k = w / 60
    return g(cx, y, k, f'<rect x="-24" y="-38" width="48" height="38" fill="{wall}" {st()}/>'
             + P('M-32,-36 L0,-62 L32,-36 Z', roof)
             + f'<rect x="-6" y="-20" width="12" height="20" fill="{BROWN}" {st(2)}/>'
             + f'<rect x="10" y="-30" width="10" height="10" fill="{WIN}" {st(1.8)}/>')


def hut(cx, y, w=50, wall='#E9D7B7', roof='#C98B4E'):
    k = w / 50
    return g(cx, y, k, f'<rect x="-18" y="-26" width="36" height="26" fill="{wall}" {st()}/>'
             + P('M-28,-22 Q-10,-50 0,-52 Q10,-50 28,-22 Z', roof)
             + f'<rect x="-5" y="-14" width="10" height="14" rx="4" fill="{INK}" opacity=".7"/>')


def mountain(cx, y, w, h, col='#B7D7EA', snow='#FFFFFF'):
    return (f'<path d="M{cx - w / 2},{y} L{cx},{y - h} L{cx + w / 2},{y} Z" fill="{col}" {st(2.4)}/>'
            f'<path d="M{cx - w * .14:.1f},{y - h * .72:.1f} L{cx},{y - h} L{cx + w * .14:.1f},{y - h * .72:.1f} L{cx + w * .05:.1f},{y - h * .66:.1f} L{cx - w * .04:.1f},{y - h * .74:.1f} Z" fill="{snow}" {st(1.8)}/>')


# ── con vật nhỏ (cầm biển số) ─────────────────────────────────────────────────
def cat(x, y, s=1, col='#F5C58E', stripe='#D98B47'):
    """Mèo con ngồi nhìn sang phải, (x, y) = giữa đáy, cao ~100*s."""
    inner = [P('M-30,-6 Q-56,-30 -40,-60 Q-34,-66 -30,-58 Q-44,-30 -22,-12 Z', col, 2.6),
             f'<ellipse cx="0" cy="-30" rx="30" ry="28" fill="{col}" {st()}/>',
             f'<ellipse cx="-14" cy="-4" rx="12" ry="7" fill="{col}" {st(2.4)}/><ellipse cx="14" cy="-4" rx="12" ry="7" fill="{col}" {st(2.4)}/>',
             P('M-24,-78 L-30,-104 L-8,-88 Z', col, 2.6), P('M24,-78 L30,-104 L8,-88 Z', col, 2.6),
             f'<ellipse cx="0" cy="-72" rx="32" ry="26" fill="{col}" {st()}/>',
             f'<path d="M-12,-96 L-8,-86 M0,-98 V-88 M12,-96 L8,-86" fill="none" {st(2.4, stripe)}/>',
             eyes(0, -74, 11, 4), f'<path d="M-3,-64 L3,-64 L0,-61 Z" fill="{PINK}" {st(1.4)}/>',
             P('M-6,-58 Q-3,-55 0,-58 Q3,-55 6,-58', 'none', 1.8), blush(0, -64, 18, 4)]
    for wy in (-64, -60):
        inner.append(f'<line x1="-22" y1="{wy}" x2="-36" y2="{wy - 2}" {st(1.2)}/><line x1="22" y1="{wy}" x2="36" y2="{wy - 2}" {st(1.2)}/>')
    return g(x, y, s, ''.join(inner))


def dog(x, y, s=1, col='#F2D7B5', ear=BROWN):
    """Chó con ngồi, (x, y) = giữa đáy, cao ~100*s."""
    inner = [f'<path d="M24,-14 Q46,-26 40,-50" fill="none" {st(9)}/>', f'<path d="M24,-14 Q46,-26 40,-50" fill="none" {st(4.5, col)}/>',
             f'<ellipse cx="0" cy="-30" rx="28" ry="28" fill="{col}" {st()}/>',
             f'<ellipse cx="-14" cy="-4" rx="12" ry="7" fill="{col}" {st(2.4)}/><ellipse cx="14" cy="-4" rx="12" ry="7" fill="{col}" {st(2.4)}/>',
             f'<ellipse cx="0" cy="-70" rx="30" ry="26" fill="{col}" {st()}/>',
             P('M-24,-88 Q-44,-84 -38,-56 Q-28,-60 -22,-74 Z', ear, 2.6), P('M24,-88 Q44,-84 38,-56 Q28,-60 22,-74 Z', ear, 2.6),
             eyes(0, -74, 11, 4), f'<ellipse cx="0" cy="-62" rx="5" ry="4" fill="{INK}"/>',
             P('M-6,-56 Q0,-52 6,-56', 'none', 1.8), blush(0, -62, 18, 4),
             f'<path d="M-18,-48 Q0,-42 18,-48" fill="none" stroke="{RED}" stroke-width="4" stroke-linecap="round"/>']
    return g(x, y, s, ''.join(inner))


def fish(cx, cy, w=150, col=BLUE, fin=TEAL, flip=False):
    """Cá bơi sang trái, tâm (cx, cy), dài w."""
    k = w / 150
    inner = [P('M44,0 L76,-26 Q70,0 76,26 Z', fin), P('M-6,-26 Q10,-48 30,-30 Z', fin, 2.6), P('M0,26 Q12,42 26,26 Z', fin, 2.6),
             P('M-70,0 Q-50,-36 0,-34 Q40,-30 50,0 Q40,30 0,34 Q-50,36 -70,0 Z', col),
             f'<ellipse cx="-10" cy="0" rx="36" ry="20" fill="#fff" opacity=".85"/>',
             f'<circle cx="-48" cy="-8" r="7" fill="#fff" {st(2)}/><circle cx="-49" cy="-8" r="3.4" fill="{INK}"/>',
             P('M-66,8 Q-60,12 -54,8', 'none', 2)]
    for bx, by, r in [(-86, -12, 4), (-92, -2, 3), (-86, 6, 2.6)]:
        inner.append(f'<circle cx="{bx}" cy="{by}" r="{r}" fill="{SKY_D}" {st(1.4)}/>')
    return g(cx, cy, k, ''.join(inner), flip=flip)


def flying_fish(cx, cy, w=80, col=BLUE, flip=False, rot=0):
    k = w / 80
    inner = [P('M-6,-4 Q-20,-34 4,-30 Q14,-20 10,-4 Z', '#DCEFFB', 2.2),
             P('M20,0 L40,-14 L34,0 L40,14 Z', col, 2.2),
             P('M-40,0 Q-24,-12 0,-10 Q20,-8 24,0 Q20,8 0,10 Q-24,12 -40,0 Z', col, 2.4),
             f'<ellipse cx="-6" cy="3" rx="18" ry="5" fill="#fff" opacity=".8"/>',
             f'<circle cx="-30" cy="-3" r="2.6" fill="{INK}"/>',
             P('M-2,2 Q-14,22 8,20 Q14,12 10,4 Z', '#DCEFFB', 2)]
    return g(cx, cy, k, ''.join(inner), flip=flip, rot=rot)


def die_face(x, y, size, n, fill=WHITE):
    from kit_l1_c import die
    return die(x, y, size, n, fill)
