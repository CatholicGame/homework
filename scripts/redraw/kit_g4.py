"""
Bộ vẽ riêng của lô g4 (Bài 37–49 Toán 2): khung tranh, đĩa, bọ, nhện, thỏ, gà con,
bánh kem, túi… — nét riêng, phẳng, viền INK.

    import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
    from kit_g4 import *

Mọi hàm trả về chuỗi SVG. Gốc toạ độ ghi trong docstring từng hàm.
"""
import math
from common import *


def st(w=3, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def frame(w, h, r=26, sw=3, fill=WHITE):
    """Khung bo góc bao quanh cả tranh (như khung trong sách)."""
    return f'<rect x="{sw / 2 + 1}" y="{sw / 2 + 1}" width="{w - sw - 2}" height="{h - sw - 2}" rx="{r}" fill="{fill}" {st(sw)}/>'


def g(x, y, inner, k=1.0, rot=0, flip=False):
    sx = -k if flip else k
    return f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({sx:.4f},{k:.4f})">{inner}</g>'


def plate(cx, cy, w, h=None, col='#EAF6FD', rim='#BFE3F5', sw=2.4):
    """Đĩa nhìn nghiêng: (cx, cy) = tâm mặt đĩa."""
    h = h or w * .28
    return (f'<ellipse cx="{cx}" cy="{cy + h * .12:.1f}" rx="{w / 2}" ry="{h / 2}" fill="{rim}" {st(sw)}/>'
            f'<ellipse cx="{cx}" cy="{cy:.1f}" rx="{w * .36:.1f}" ry="{h * .3:.1f}" fill="{col}" stroke="{INK}" stroke-width="{sw * .5:.1f}" opacity=".9"/>')


# ═════════════════════════════ CÔN TRÙNG (nhìn từ trên, đầu hướng lên) ═══════
# Toạ độ cục bộ: (0,0) = tâm thân; khung ~ 110 x 120.

def _leg(pts, sw=5):
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linecap="round" stroke-linejoin="round"/>')


def beetle(col=GREEN, dark=GRASS_D):
    """Bọ cánh cứng: 6 chân (3 mỗi bên), 2 râu, cánh chia đôi."""
    s = []
    for side in (-1, 1):
        s.append(_leg([(side * 22, -14), (side * 40, -22), (side * 46, -38)]))
        s.append(_leg([(side * 26, 2), (side * 46, 4), (side * 54, -6)]))
        s.append(_leg([(side * 22, 20), (side * 40, 32), (side * 44, 48)]))
        s.append(f'<path d="M{side * 6},-44 Q{side * 12},-60 {side * 24},-62" fill="none" {st(3)}/>')
        s.append(f'<circle cx="{side * 25}" cy="-62" r="3.5" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="-38" rx="15" ry="11" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="-26" rx="22" ry="9" fill="{dark}" {st(3)}/>')
    s.append(f'<path d="M-26,-18 Q-30,40 0,46 Q30,40 26,-18 Q0,-26 -26,-18 Z" fill="{col}" {st(3)}/>')
    s.append(f'<line x1="0" y1="-20" x2="0" y2="45" {st(3)}/>')
    s.append(f'<path d="M-15,-8 Q-18,14 -12,28" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>')
    s.append(f'<circle cx="-6" cy="-38" r="3" fill="#fff"/><circle cx="6" cy="-38" r="3" fill="#fff"/>')
    return ''.join(s)


def ladybug(col=RED):
    """Bọ rùa: 6 chân, 2 râu, cánh đỏ có chấm đen, đầu đen."""
    s = []
    for side in (-1, 1):
        s.append(_leg([(side * 26, -12), (side * 46, -20), (side * 52, -32)]))
        s.append(_leg([(side * 30, 4), (side * 52, 6), (side * 60, 0)]))
        s.append(_leg([(side * 24, 22), (side * 42, 34), (side * 46, 46)]))
        s.append(f'<path d="M{side * 6},-36 Q{side * 10},-52 {side * 22},-56" fill="none" {st(3)}/>')
        s.append(f'<circle cx="{side * 23}" cy="-56" r="3.5" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="-30" rx="17" ry="12" fill="{INK}"/>')
    s.append(f'<circle cx="-7" cy="-32" r="3.2" fill="#fff"/><circle cx="7" cy="-32" r="3.2" fill="#fff"/>')
    s.append(f'<ellipse cx="0" cy="6" rx="31" ry="34" fill="{col}" {st(3)}/>')
    s.append(f'<line x1="0" y1="-26" x2="0" y2="40" {st(3)}/>')
    for x, y, r in ((-15, -6, 6), (15, -6, 6), (-18, 16, 5), (18, 16, 5), (-8, 30, 4.5), (8, 30, 4.5)):
        s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/>')
    s.append(f'<path d="M-22,-10 Q-26,0 -24,8" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" opacity=".55"/>')
    return ''.join(s)


def spider(col=PURPLE, dark='#7E6BC4'):
    """Nhện: 8 chân (4 mỗi bên), thân tròn, đầu có mắt to."""
    s = []
    for side in (-1, 1):
        for a0, a1, a2 in (((18, -14), (42, -40), (50, -62)), ((24, -4), (58, -22), (74, -6)),
                            ((24, 10), (62, 12), (74, 34)), ((20, 22), (44, 42), (48, 64))):
            s.append(_leg([(side * a0[0], a0[1]), (side * a1[0], a1[1]), (side * a2[0], a2[1])], sw=5.5))
            s.append(_leg([(side * a0[0], a0[1]), (side * a1[0], a1[1]), (side * a2[0], a2[1])], sw=2))
    # recolor thin core of legs
    s = [p.replace(f'stroke="{INK}" stroke-width="2"', f'stroke="{dark}" stroke-width="2"') for p in s]
    s.append(f'<ellipse cx="0" cy="14" rx="30" ry="32" fill="{col}" {st(3)}/>')
    s.append(f'<path d="M-10,8 L0,18 L10,8 M-10,26 L0,36 L10,26" fill="none" stroke="{dark}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    s.append(f'<circle cx="0" cy="-22" r="19" fill="{col}" {st(3)}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 7}" cy="-25" r="6" fill="#fff" {st(2)}/>')
        s.append(f'<circle cx="{sx * 7 + 1}" cy="-24" r="2.8" fill="{INK}"/>')
    s.append(f'<path d="M-5,-13 Q0,-9 5,-13" fill="none" {st(2)}/>')
    return ''.join(s)


# ═════════════════════════════ THỎ, GÀ CON (nhìn nghiêng, quay phải) ═══════
# (0,0) = điểm giữa chân chạm đất.

def rabbit(fur=WHITE, inner=PINK):
    """Thỏ đứng nghiêng bốn chân rõ ràng (2 chân trước, 2 chân sau), khung ~120 x 120."""
    s = []
    leg = lambda x, top, c: (f'<rect x="{x - 6}" y="{top}" width="12" height="{-top + 1}" rx="6" fill="{c}" {st(2.6)}/>'
                             f'<ellipse cx="{x + 3}" cy="-1" rx="10" ry="5" fill="{c}" {st(2.6)}/>')
    far = '#E4E0E6'
    # chân phía xa (tô xám nhạt) vẽ trước
    s.append(leg(-20, -30, far))
    s.append(leg(28, -30, far))
    # đuôi
    s.append(f'<circle cx="-50" cy="-52" r="11" fill="#fff" {st(2.6)}/>')
    # thân
    s.append(f'<ellipse cx="-4" cy="-46" rx="46" ry="26" fill="{fur}" {st(3)}/>')
    # chân phía gần
    s.append(leg(-40, -28, fur))
    s.append(leg(6, -28, fur))
    # tai
    s.append(f'<ellipse cx="28" cy="-104" rx="9" ry="26" fill="{fur}" {st(3)} transform="rotate(-18 28 -104)"/>')
    s.append(f'<ellipse cx="42" cy="-102" rx="9" ry="26" fill="{fur}" {st(3)} transform="rotate(12 42 -102)"/>')
    s.append(f'<ellipse cx="42" cy="-102" rx="4" ry="18" fill="{inner}" transform="rotate(12 42 -102)"/>')
    # đầu
    s.append(f'<ellipse cx="38" cy="-68" rx="24" ry="21" fill="{fur}" {st(3)}/>')
    s.append(f'<circle cx="45" cy="-72" r="3.8" fill="{INK}"/><circle cx="46.3" cy="-73.3" r="1.3" fill="#fff"/>')
    s.append(f'<ellipse cx="61" cy="-64" rx="3.4" ry="2.8" fill="#E77A93"/>')
    s.append(f'<circle cx="44" cy="-60" r="4.5" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M56,-58 q4,4 8,0" fill="none" {st(1.8)}/>')
    return ''.join(s)


def chick(col=YELLOW, dark=ORANGE):
    """Gà con đứng nghiêng, hai chân rõ, khung ~100 x 110."""
    s = []
    for x in (-10, 10):
        s.append(f'<path d="M{x},-24 L{x},-2" {st(4, dark)}/>')
        s.append(f'<path d="M{x - 8},0 L{x},-4 L{x + 10},0 M{x},-4 L{x + 3},2" fill="none" {st(3.2, dark)}/>')
    s.append(f'<path d="M-40,-52 Q-58,-66 -56,-44 Q-50,-36 -40,-40 Z" fill="{col}" {st(2.8)}/>')
    s.append(f'<ellipse cx="-4" cy="-48" rx="38" ry="30" fill="{col}" {st(3)}/>')
    s.append(f'<path d="M-24,-52 Q-8,-40 8,-50 Q0,-24 -18,-30 Q-26,-38 -24,-52 Z" fill="{dark}" opacity=".45" {st(2.4)}/>')
    s.append(f'<circle cx="22" cy="-80" r="22" fill="{col}" {st(3)}/>')
    s.append(f'<path d="M14,-100 q2,-12 8,-4 q4,-10 8,2" fill="{col}" {st(2.4)}/>')
    s.append(f'<path d="M42,-84 L56,-78 L42,-72 Z" fill="{dark}" {st(2.4)}/>')
    s.append(f'<circle cx="30" cy="-86" r="4" fill="{INK}"/><circle cx="31.4" cy="-87.4" r="1.4" fill="#fff"/>')
    s.append(f'<circle cx="28" cy="-72" r="4.5" fill="{PINK}" opacity=".75"/>')
    return ''.join(s)


# ═════════════════════════════ BÁNH KEM ═════════════════════════════════════

def cupcake(x, y, w=80, h=86, cream=PINK, cup=BLUE, top='cherry', sw=3):
    """Bánh kem cốc giấy: (x, y) = giữa đáy; w = bề rộng miệng cốc; h = chiều cao đến đỉnh kem."""
    ch = h * .42               # chiều cao cốc giấy
    bw = w * .74
    cy0 = y - ch
    s = [f'<path d="M{x - w / 2},{cy0} L{x - bw / 2},{y - 3} Q{x - bw / 2},{y} {x - bw / 2 + 3},{y} H{x + bw / 2 - 3} '
         f'Q{x + bw / 2},{y} {x + bw / 2},{y - 3} L{x + w / 2},{cy0} Z" fill="{cup}" {st(sw)}/>']
    for i in range(1, 6):
        t = i / 6
        xa = x - w / 2 + w * t
        xb = x - bw / 2 + bw * t
        s.append(f'<line x1="{xa:.1f}" y1="{cy0 + 3:.1f}" x2="{xb:.1f}" y2="{y - 3:.1f}" stroke="{INK}" stroke-width="{sw * .5:.1f}" opacity=".45"/>')
    # kem: ba tầng
    kh = h - ch
    r1 = w * .56
    s.append(f'<path d="M{x - r1},{cy0 + 2} Q{x - r1 - 4},{cy0 - kh * .42} {x - r1 * .5},{cy0 - kh * .45} '
             f'Q{x - r1 * .45},{cy0 - kh * .85} {x},{cy0 - kh * .82} Q{x + r1 * .45},{cy0 - kh * .85} {x + r1 * .5},{cy0 - kh * .45} '
             f'Q{x + r1 + 4},{cy0 - kh * .42} {x + r1},{cy0 + 2} Q{x},{cy0 + 10} {x - r1},{cy0 + 2} Z" fill="{cream}" {st(sw)}/>')
    s.append(f'<path d="M{x - r1 * .6},{cy0 - kh * .38} Q{x},{cy0 - kh * .22} {x + r1 * .6},{cy0 - kh * .38}" fill="none" stroke="{INK}" stroke-width="{sw * .6:.1f}" opacity=".5" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x - r1 * .45}" cy="{cy0 - kh * .25}" rx="{w * .09}" ry="{kh * .08}" fill="#fff" opacity=".55"/>')
    tip = cy0 - kh * .82
    if top == 'cherry':
        s.append(f'<path d="M{x},{tip - 8} q2,-12 12,-16" fill="none" {st(2.4)}/>')
        s.append(f'<circle cx="{x}" cy="{tip - 3}" r="{w * .1:.1f}" fill="{RED}" {st(sw * .8)}/>')
    elif top == 'star':
        r, r2 = w * .12, w * .055
        pts = ' '.join(f'{x + (r if k % 2 == 0 else r2) * math.sin(k * math.pi / 5):.1f},'
                       f'{tip - 5 - (r if k % 2 == 0 else r2) * math.cos(k * math.pi / 5):.1f}' for k in range(10))
        s.append(f'<polygon points="{pts}" fill="{YELLOW}" {st(sw * .7)}/>')
    elif top == 'swirl':
        s.append(f'<path d="M{x - w * .12},{tip + 2} Q{x - w * .1},{tip - w * .16} {x + w * .04},{tip - w * .14} Q{x + w * .1},{tip - w * .1} {x + w * .02},{tip - w * .03}" fill="{cream}" {st(sw * .8)}/>')
    return ''.join(s)


# ═════════════════════════════ TRÁI CÂY NHỎ (nét mảnh hơn, để xếp lên đĩa) ═══
# (x, y) = giữa đáy quả.

def leaf(x, y, rot=-30, L=10, col=GREEN, sw=1.8):
    return (f'<path d="M{x},{y} q{L * .5},{-L * .55} {L},0 q{-L * .5},{L * .55} {-L},0 Z" fill="{col}" '
            f'{st(sw)} transform="rotate({rot} {x} {y})"/>')


def s_apple(x, y, r=10, col=RED, sw=2.2):
    t = y - 2 * r
    d = (f'M{x},{t + r * .4} C{x - r * .5},{t - r * .1} {x - r * 1.1},{t + r * .1} {x - r},{t + r * 1.05} '
         f'C{x - r * .95},{t + r * 1.8} {x - r * .4},{y + r * .05} {x},{y - r * .15} C{x + r * .4},{y + r * .05} {x + r * .95},{t + r * 1.8} {x + r},{t + r * 1.05} '
         f'C{x + r * 1.1},{t + r * .1} {x + r * .5},{t - r * .1} {x},{t + r * .4} Z')
    return (f'<path d="{d}" fill="{col}" {st(sw)}/>'
            f'<ellipse cx="{x - r * .45:.1f}" cy="{t + r * .75:.1f}" rx="{r * .2:.1f}" ry="{r * .28:.1f}" fill="#fff" opacity=".6"/>'
            f'<path d="M{x},{t + r * .45:.1f} l1,{-r * .5:.1f}" {st(sw * .9)}/>' + leaf(x + 1, t, -25, r * .7, sw=sw * .8))


def s_orange(x, y, r=13, col=ORANGE, sw=2.2):
    cy = y - r
    return (f'<circle cx="{x}" cy="{cy}" r="{r}" fill="{col}" {st(sw)}/>'
            f'<ellipse cx="{x - r * .4:.1f}" cy="{cy - r * .38:.1f}" rx="{r * .26:.1f}" ry="{r * .17:.1f}" fill="#fff" opacity=".6"/>'
            f'<circle cx="{x}" cy="{cy - r + 2}" r="1.6" fill="{GRASS_D}"/>')


def s_pear(x, y, h=46, col='#C8DE6A', sw=2.4):
    w = h * .62
    t = y - h
    d = (f'M{x},{t + h * .08} C{x + w * .28},{t + h * .08} {x + w * .22},{t + h * .4} {x + w * .4},{t + h * .56} '
         f'C{x + w * .62},{t + h * .78} {x + w * .45},{y} {x},{y} C{x - w * .45},{y} {x - w * .62},{t + h * .78} {x - w * .4},{t + h * .56} '
         f'C{x - w * .22},{t + h * .4} {x - w * .28},{t + h * .08} {x},{t + h * .08} Z')
    return (f'<path d="{d}" fill="{col}" {st(sw)}/>'
            f'<ellipse cx="{x - w * .22:.1f}" cy="{t + h * .66:.1f}" rx="{w * .09:.1f}" ry="{h * .12:.1f}" fill="#fff" opacity=".55"/>'
            f'<path d="M{x},{t + h * .1:.1f} q1,-6 4,-8" fill="none" {st(sw * .9, BROWN)}/>' + leaf(x + 3, t + h * .02, -20, h * .22, sw=sw * .8))


def s_banana(x, y, L=56, col=YELLOW, sw=2.2, rot=0):
    """Quả chuối nằm cong (hình trăng khuyết), (x, y) = giữa đáy."""
    d = (f'M{-L / 2},{-L * .2} Q{0},{L * .26} {L / 2},{-L * .28} Q{0},{-L * .1} {-L / 2},{-L * .2} Z')
    return (f'<g transform="translate({x},{y}) rotate({rot})">'
            f'<path d="{d}" fill="{col}" {st(sw)}/>'
            f'<path d="M{-L * .3:.1f},{-L * .12:.1f} Q0,{L * .1:.1f} {L * .3:.1f},{-L * .14:.1f}" fill="none" stroke="{ORANGE}" stroke-width="{sw * .7:.1f}" stroke-linecap="round" opacity=".6"/>'
            f'<path d="M{L / 2},{-L * .28} l4,-3" {st(sw * 1.4, BROWN)}/>'
            f'<circle cx="{-L / 2 + 1}" cy="{-L * .24}" r="{sw * .9:.1f}" fill="{BROWN}"/></g>')


def pouch(x, y, w=62, h=70, col='#F2D39A', tie=RED, sw=2.6):
    """Túi/bao túm miệng có dây buộc. (x, y) = giữa đáy."""
    t = y - h
    neck = t + h * .26
    return ''.join([
        f'<path d="M{x - w * .16},{neck} Q{x - w * .52},{neck + h * .18} {x - w * .48},{y - h * .18} Q{x - w * .46},{y} {x - w * .26},{y} '
        f'H{x + w * .26} Q{x + w * .46},{y} {x + w * .48},{y - h * .18} Q{x + w * .52},{neck + h * .18} {x + w * .16},{neck} Z" fill="{col}" {st(sw)}/>',
        f'<path d="M{x - w * .16},{neck} L{x - w * .3},{t + 3} Q{x - w * .12},{t + h * .12} {x},{t + 1} Q{x + w * .12},{t + h * .12} {x + w * .3},{t + 3} L{x + w * .16},{neck} Z" fill="{col}" {st(sw)}/>',
        f'<rect x="{x - w * .2}" y="{neck - h * .05}" width="{w * .4}" height="{h * .1}" rx="{h * .05}" fill="{tie}" {st(sw * .8)}/>',
        f'<path d="M{x - w * .32},{neck + h * .2} Q{x - w * .38},{y - h * .3} {x - w * .32},{y - h * .14}" fill="none" stroke="#fff" stroke-width="{sw * 1.3:.1f}" stroke-linecap="round" opacity=".6"/>'])
