"""
Bộ vẽ dùng chung cho nhóm g3 (Bài 29, 31, 32, 36, 39, 40, 41 — Toán 2): đồng hồ kim,
đồng hồ số, khung tranh, bé trai/bé gái, người lớn, rô-bốt, bàn ghế, giường, cây…
Nét riêng, cùng phong cách common.py (phẳng, viền đậm INK, màu tươi).

Quy ước: người / rô-bốt vẽ theo toạ độ CỤC BỘ (gốc 0,0 = giữa hai bàn chân, trục y
hướng xuống, người cao ~330 đơn vị) rồi đặt vào tranh bằng place(x, y, s, flip).
"""
import math
from common import *

SW = 3
ROBOT, ROBOT_L, ROBOT_D = '#F4A259', '#FFE1BF', '#D9803A'   # rô-bốt màu cam của mình
VISOR = '#3F3A40'
_uid = [0]


def uid(p='g3'):
    _uid[0] += 1
    return f'{p}{_uid[0]}'


def st(w=SW):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def place(x, y, s, inner, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


def tube(d, col, w=14, sw=SW):
    """nét dày có viền (tay, chân, ống)"""
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 2 * sw}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


# ───────────────────────── đồng hồ ─────────────────────────
def clock(cx, cy, r, h, m, rim=BLUE, face='#F4FBFF', nums=True, legs=False):
    """Đồng hồ kim chỉ h giờ m phút (kim ngắn đúng vị trí theo phút)."""
    s = []
    if legs:
        for sx in (-1, 1):
            s.append(f'<path d="M{cx + sx * r * .55},{cy + r * .75} L{cx + sx * r * .8},{cy + r * 1.12}" stroke="{INK}" stroke-width="{SW + 1}" stroke-linecap="round"/>')
        for sx in (-1, 1):
            s.append(f'<circle cx="{cx + sx * r * .62}" cy="{cy - r * 1.02}" r="{r * .2}" fill="{YELLOW}" {st(2.4)}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{rim}" {st()}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .84}" fill="{face}" {st(2)}/>')
    for i in range(60):
        a = math.radians(i * 6)
        r1 = r * (.76 if i % 5 == 0 else .8)
        r2 = r * .84
        s.append(f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" x2="{cx + r2 * math.sin(a):.1f}" '
                 f'y2="{cy - r2 * math.cos(a):.1f}" stroke="{INK}" stroke-width="{1.6 if i % 5 == 0 else .7}"/>')
    if nums:
        fs = r * .27
        for n in range(1, 13):
            a = math.radians(n * 30)
            rr = r * .6
            s.append(text(f'{cx + rr * math.sin(a):.1f}', f'{cy - rr * math.cos(a) + fs * .36:.1f}', n, size=f'{fs:.1f}', weight=700))
    am = math.radians(m * 6)
    ah = math.radians((h % 12) * 30 + m * .5)
    s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .27 * math.sin(ah):.1f}" y2="{cy - r * .27 * math.cos(ah):.1f}" '
             f'stroke="{INK}" stroke-width="{max(3, r * .085):.1f}" stroke-linecap="round"/>')
    s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .4 * math.sin(am):.1f}" y2="{cy - r * .4 * math.cos(am):.1f}" '
             f'stroke="{RED}" stroke-width="{max(2, r * .05):.1f}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{max(3, r * .07):.1f}" fill="{INK}"/>')
    return '\n'.join(s)


def digital(cx, cy, w, h, label, body=TEAL, screen='#E6FBF4', size=None):
    """Đồng hồ số: hộp bo tròn, màn hình, hai chân. (cx, cy) = tâm hộp."""
    x, y = cx - w / 2, cy - h / 2
    fs = size or h * .5
    s = [f'<rect x="{x + w * .12}" y="{y + h - 4}" width="{w * .14}" height="{h * .14}" rx="3" fill="{body}" {st(2.4)}/>',
         f'<rect x="{x + w * .74}" y="{y + h - 4}" width="{w * .14}" height="{h * .14}" rx="3" fill="{body}" {st(2.4)}/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{h * .2}" fill="{body}" {st()}/>',
         f'<rect x="{x + w * .08}" y="{y + h * .15}" width="{w * .84}" height="{h * .7}" rx="{h * .1}" fill="{screen}" {st(2.2)}/>',
         text(cx, f'{cy + fs * .36:.1f}', label, size=f'{fs:.1f}', weight=700)]
    return '\n'.join(s)


def panel(x, y, w, h, bg=WHITE, inner=''):
    """Khung tranh: nền + nội dung được cắt gọn trong khung + viền."""
    cid = uid('clip')
    return (f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10"/></clipPath>'
            f'<g clip-path="url(#{cid})"><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{bg}"/>{inner}</g>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="none" stroke="{INK}" stroke-width="2.5"/>')


# ───────────────────────── người ─────────────────────────
def face(expr='smile', look=0, r=56, blush=True):
    """Nét mặt vẽ trong đầu tâm (0,0) bán kính r. look = dịch mắt/miệng sang ngang."""
    k = r / 56
    ex, ey = 20 * k, 2 * k
    s = []
    for sx in (-1, 1):
        x = look + sx * ex
        if expr in ('closed', 'laugh'):
            s.append(f'<path d="M{x - 8 * k},{ey + 3 * k} q{8 * k},{-9 * k} {16 * k},0" fill="none" stroke="{INK}" stroke-width="{3.4 * k}" stroke-linecap="round"/>')
        elif expr == 'sleep':
            s.append(f'<path d="M{x - 8 * k},{ey} q{8 * k},{8 * k} {16 * k},0" fill="none" stroke="{INK}" stroke-width="{3.2 * k}" stroke-linecap="round"/>')
        elif expr == 'down':
            s.append(f'<ellipse cx="{x}" cy="{ey + 6 * k}" rx="{5 * k}" ry="{6 * k}" fill="{INK}"/>')
        else:
            s.append(f'<ellipse cx="{x}" cy="{ey}" rx="{6 * k}" ry="{8 * k}" fill="{INK}"/><circle cx="{x + 2 * k}" cy="{ey - 3 * k}" r="{2.2 * k}" fill="#fff"/>')
        if expr == 'worried':
            s.append(f'<path d="M{x - 9 * k},{-16 * k - (sx * 3 * k)} L{x + 9 * k},{-16 * k + sx * 3 * k}" stroke="{INK}" stroke-width="{2.6 * k}" stroke-linecap="round"/>')
        if blush:
            s.append(f'<ellipse cx="{look + sx * 34 * k}" cy="{20 * k}" rx="{9 * k}" ry="{6 * k}" fill="#F6A3B4" opacity=".75"/>')
    my = 24 * k
    if expr in ('open', 'laugh'):
        s.append(f'<path d="M{look - 12 * k},{my} Q{look},{my + 16 * k} {look + 12 * k},{my} Z" fill="#E86A7E" {st(2.4 * k)}/>')
    elif expr == 'worried':
        s.append(f'<path d="M{look - 8 * k},{my + 6 * k} q{8 * k},{-6 * k} {16 * k},0" fill="none" stroke="{INK}" stroke-width="{2.6 * k}" stroke-linecap="round"/>')
    elif expr == 'o':
        s.append(f'<ellipse cx="{look}" cy="{my + 2 * k}" rx="{5 * k}" ry="{6 * k}" fill="#E86A7E" {st(2.2 * k)}/>')
    elif expr == 'sleep':
        s.append(f'<path d="M{look - 5 * k},{my + 2 * k} q{5 * k},{4 * k} {10 * k},0" fill="none" stroke="{INK}" stroke-width="{2.4 * k}" stroke-linecap="round"/>')
    else:
        s.append(f'<path d="M{look - 10 * k},{my} q{10 * k},{10 * k} {20 * k},0" fill="none" stroke="{INK}" stroke-width="{3 * k}" stroke-linecap="round"/>')
    return ''.join(s)


def head(hair='short', expr='smile', look=0, hair_col=HAIR, band=None, r=56, glasses=False):
    """Đầu tâm (0,0). hair: short, spiky, bob, ponytail, pigtails, adult."""
    k = r / 56
    s = []
    if hair == 'ponytail':
        s.append(f'<path d="M{50 * k},{-34 * k} q{52 * k},{6 * k} {40 * k},{84 * k} q{-20 * k},{-12 * k} {-36 * k},{-48 * k} Z" fill="{hair_col}" {st()}/>')
    if hair == 'pigtails':
        for sx in (-1, 1):
            s.append(f'<circle cx="{sx * 62 * k}" cy="{-26 * k}" r="{20 * k}" fill="{hair_col}" {st()}/>')
    if hair == 'bob':
        s.append(f'<path d="M{-64 * k},{-10 * k} Q{-72 * k},{44 * k} {-44 * k},{50 * k} L{44 * k},{50 * k} Q{72 * k},{44 * k} {64 * k},{-10 * k} Z" fill="{hair_col}" {st()}/>')
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{sx * 56 * k}" cy="{6 * k}" rx="{9 * k}" ry="{12 * k}" fill="{SKIN}" {st()}/>')
    s.append(f'<ellipse cx="0" cy="0" rx="{58 * k}" ry="{56 * k}" fill="{SKIN}" stroke="{INK}" stroke-width="{SW + .5}"/>')
    if hair in ('short', 'adult'):
        top = -58 if hair == 'short' else -56
        s.append(f'<path d="M{-60 * k},{2 * k} Q{-64 * k},{top * k} 0,{top * k} Q{64 * k},{top * k} {60 * k},{2 * k} '
                 f'Q{50 * k},{-26 * k} {30 * k},{-22 * k} L{20 * k},{-34 * k} L{6 * k},{-20 * k} L{-10 * k},{-34 * k} L{-24 * k},{-20 * k} Q{-50 * k},{-24 * k} {-60 * k},{2 * k} Z" '
                 f'fill="{hair_col}" {st()}/>')
    elif hair == 'spiky':
        s.append(f'<path d="M{-60 * k},{4 * k} Q{-70 * k},{-40 * k} {-40 * k},{-62 * k} L{-30 * k},{-76 * k} L{-14 * k},{-62 * k} L{4 * k},{-80 * k} L{16 * k},{-62 * k} '
                 f'L{38 * k},{-74 * k} L{40 * k},{-54 * k} Q{66 * k},{-40 * k} {60 * k},{4 * k} Q{48 * k},{-24 * k} {26 * k},{-24 * k} Q{0},{-34 * k} {-26 * k},{-22 * k} Q{-48 * k},{-24 * k} {-60 * k},{4 * k} Z" '
                 f'fill="{hair_col}" {st()}/>')
    else:
        s.append(f'<path d="M{-62 * k},{8 * k} Q{-66 * k},{-64 * k} 0,{-62 * k} Q{66 * k},{-64 * k} {62 * k},{8 * k} '
                 f'Q{40 * k},{-34 * k} {4 * k},{-26 * k} Q{-36 * k},{-36 * k} {-62 * k},{8 * k} Z" fill="{hair_col}" {st()}/>')
    if band:
        s.append(f'<path d="M{-54 * k},{-24 * k} Q0,{-72 * k} {54 * k},{-24 * k}" fill="none" stroke="{INK}" stroke-width="{11 * k + 2 * SW}" stroke-linecap="round"/>'
                 f'<path d="M{-54 * k},{-24 * k} Q0,{-72 * k} {54 * k},{-24 * k}" fill="none" stroke="{band}" stroke-width="{11 * k}" stroke-linecap="round"/>')
    if hair == 'pigtails' and band:
        pass
    s.append(face(expr, look, r))
    if glasses:
        for sx in (-1, 1):
            s.append(f'<circle cx="{look + sx * 20 * k}" cy="{2 * k}" r="{14 * k}" fill="none" {st(2.6)}/>')
        s.append(f'<path d="M{look - 6 * k},{0} L{look + 6 * k},0" {st(2.6)}/>')
    return ''.join(s)


def person(hair='short', shirt=BLUE, bottom=None, bottom_kind='shorts', expr='smile', look=0,
           arms=((-60, -110), (60, -110)), legs='stand', shoe=RED, band=None, hair_col=HAIR,
           adult=False, sleeve='long', glasses=False, apron=None, no_legs=False, extra_back='', extra_front=''):
    """Người, gốc (0,0) = giữa hai chân. arms = điểm bàn tay trái/phải (toạ độ cục bộ).
    legs: stand | walk | kneel | sit | run.  Trẻ em cao ~330, người lớn ~420."""
    s = [extra_back]
    if adult:
        hip, sh, hy, hr = -190, -320, -385, 50
    else:
        hip, sh, hy, hr = -110, -205, -262, 56
    bw = 44 if not adult else 52
    bottom = bottom or ('#4E8FC8' if bottom_kind in ('shorts', 'pants') else PINK)
    # legs
    if not no_legs:
        lc = '#4E8FC8' if bottom_kind == 'pants' else SKIN
        if bottom_kind == 'pants':
            lc = bottom
        if legs == 'stand':
            L = [(f'M-18,{hip} L-22,-10', -26), (f'M18,{hip} L22,-10', 26)]
        elif legs == 'walk':
            L = [(f'M-14,{hip} L-44,-10', -50), (f'M14,{hip} L34,-8', 42)]
        elif legs == 'run':
            L = [(f'M-12,{hip} Q-40,{hip / 2} -70,-24', -76), (f'M14,{hip} Q40,{hip / 2 + 10} 28,-8', 36)]
        elif legs == 'kneel':      # quỳ: thân hạ thấp 55, đùi ra trước, cẳng chân gập ra sau
            L = [(f'M-14,{hip + 55} L34,-40 L-40,-12', -46), (f'M14,{hip + 55} L52,-36 L-20,-10', -26)]
        elif legs == 'sit':
            L = [(f'M-14,{hip} L60,{hip} L60,-10', 66), (f'M14,{hip} L76,{hip + 4} L78,-8', 84)]
        else:
            L = []
        for d, fx in L:
            s.append(tube(d, lc, 18))
            fy = -12 if legs == 'kneel' else (-24 if legs == 'run' and fx < 0 else -8)
            s.append(f'<ellipse cx="{fx}" cy="{fy}" rx="20" ry="11" fill="{shoe}" {st()}/>')
    if legs == 'kneel':
        s.append('<g transform="translate(0,55)">')
    # bottoms
    if bottom_kind == 'skirt':
        s.append(f'<path d="M{-bw - 6},{hip - 26} L{bw + 6},{hip - 26} L{bw + 34},{hip + 36} Q0,{hip + 48} {-bw - 34},{hip + 36} Z" fill="{bottom}" {st(3.2)}/>')
    elif bottom_kind in ('shorts', 'pants'):
        s.append(f'<path d="M{-bw - 4},{hip - 30} L{bw + 4},{hip - 30} L{bw + 10},{hip + 22} L4,{hip + 22} L0,{hip} L-4,{hip + 22} L{-bw - 10},{hip + 22} Z" fill="{bottom}" {st(3.2)}/>')
    # torso
    if bottom_kind == 'dress':
        s.append(f'<path d="M{-bw},{sh} Q0,{sh - 12} {bw},{sh} L{bw + 14},{hip - 50} L{bw + 42},{hip + 40} Q0,{hip + 56} {-bw - 42},{hip + 40} L{-bw - 14},{hip - 50} Z" fill="{shirt}" {st(3.2)}/>')
    else:
        s.append(f'<path d="M{-bw},{sh} Q0,{sh - 12} {bw},{sh} L{bw + 12},{hip - 20} Q0,{hip - 12} {-bw - 12},{hip - 20} Z" fill="{shirt}" {st(3.2)}/>')
    if apron:
        s.append(f'<path d="M-26,{sh + 14} L26,{sh + 14} L34,{hip + 20} Q0,{hip + 28} -34,{hip + 20} Z" fill="{apron}" {st(2.6)}/>')
    s.append(f'<path d="M-18,{sh - 5} Q0,{sh + 14} 18,{sh - 5}" fill="#fff" {st(2.4)}/>')
    s.append(extra_front)
    # arms
    for sx, (hx, hyy) in zip((-1, 1), arms):
        if hx is None:
            continue
        x0, y0 = sx * bw, sh + 10
        mx, my = (x0 + hx) / 2 + sx * 14, (y0 + hyy) / 2 + 10
        d = f'M{x0},{y0} Q{mx:.1f},{my:.1f} {hx},{hyy}'
        if sleeve == 'long':
            s.append(tube(d, shirt, 16))
        elif sleeve == 'none':
            s.append(tube(d, SKIN, 14))
        else:
            s.append(tube(d, SKIN, 14))
            s.append(f'<path d="M{x0},{y0} L{x0 + (mx - x0) * .6:.1f},{y0 + (my - y0) * .6:.1f}" stroke="{INK}" stroke-width="24" stroke-linecap="round"/>'
                     f'<path d="M{x0},{y0} L{x0 + (mx - x0) * .6:.1f},{y0 + (my - y0) * .6:.1f}" stroke="{shirt}" stroke-width="18" stroke-linecap="round"/>')
        s.append(f'<circle cx="{hx}" cy="{hyy}" r="11" fill="{SKIN}" {st()}/>')
    s.append(f'<rect x="-10" y="{hy + hr - 6}" width="20" height="{sh - hy - hr + 8}" fill="{SKIN}"/>')
    s.append(f'<g transform="translate(0,{hy})">{head(hair, expr, look, hair_col, band, hr, glasses)}</g>')
    if legs == 'kneel':
        s.append('</g>')
    return ''.join(s)


def bust(hair='short', shirt=BLUE, expr='smile', look=0, band=None, hair_col=HAIR, bag=None, hand=None, extra=''):
    """Chân dung nửa người: gốc (0,0) = đáy khung (giữa vai). Cao ~200."""
    s = []
    if bag:
        s.append(f'<rect x="-70" y="-78" width="140" height="90" rx="26" fill="{bag}" {st()}/>')
    s.append(f'<path d="M-66,10 L-62,-50 Q-58,-78 -22,-84 L22,-84 Q58,-78 62,-50 L66,10 Z" fill="{shirt}" {st(3.2)}/>')
    s.append(f'<rect x="-10" y="-102" width="20" height="22" fill="{SKIN}"/>')
    s.append(f'<path d="M-20,-88 Q0,-66 20,-88" fill="#fff" {st(2.4)}/>')
    if bag:
        for sx in (-1, 1):
            s.append(f'<path d="M{sx * 40},-82 L{sx * 46},10" stroke="{INK}" stroke-width="12" stroke-linecap="round"/><path d="M{sx * 40},-82 L{sx * 46},10" stroke="{bag}" stroke-width="7" stroke-linecap="round"/>')
    s.append(extra)
    if hand:
        s.append(hand)
    s.append(f'<g transform="translate(0,-150)">{head(hair, expr, look, hair_col, band)}</g>')
    return ''.join(s)


# ───────────────────────── rô-bốt ─────────────────────────
def robot_head(expr='open', look=0, hat=None):
    """Đầu rô-bốt tâm (0,0), rộng ~124."""
    s = []
    for sx in (-1, 1):
        s.append(f'<rect x="{sx * 62 - 9}" y="-18" width="18" height="36" rx="8" fill="{YELLOW}" {st()}/>')
    s.append(f'<line x1="0" y1="-48" x2="0" y2="-70" stroke="{INK}" stroke-width="3.5"/><circle cx="0" cy="-74" r="8" fill="{RED}" {st()}/>')
    s.append(f'<rect x="-58" y="-50" width="116" height="96" rx="36" fill="{ROBOT}" {st()}/>')
    s.append(f'<rect x="-44" y="-30" width="88" height="54" rx="26" fill="{VISOR}"/>')
    for sx in (-1, 1):
        x = look + sx * 20
        if expr == 'open':
            s.append(f'<circle cx="{x}" cy="-3" r="13" fill="#fff"/><circle cx="{x + 3}" cy="-1" r="6" fill="{INK}"/>')
        elif expr == 'down':
            s.append(f'<circle cx="{x}" cy="-3" r="13" fill="#fff"/><circle cx="{x + 2}" cy="4" r="6" fill="{INK}"/>')
        elif expr == 'happy':
            s.append(f'<path d="M{x - 10},2 q10,-14 20,0" fill="none" stroke="#9FF0E0" stroke-width="4.5" stroke-linecap="round"/>')
        elif expr == 'sleep':
            s.append(f'<path d="M{x - 10},-4 q10,10 20,0" fill="none" stroke="#9FF0E0" stroke-width="4.5" stroke-linecap="round"/>')
        elif expr == 'fierce':
            s.append(f'<circle cx="{x}" cy="0" r="10" fill="#fff"/><circle cx="{x + 1}" cy="2" r="5" fill="{INK}"/>'
                     f'<path d="M{x - 14},{-16 + sx * 5} L{x + 14},{-16 - sx * 5}" stroke="#9FF0E0" stroke-width="4" stroke-linecap="round"/>')
    if expr in ('happy', 'open'):
        s.append(f'<path d="M{look - 9},14 q9,7 18,0" fill="none" stroke="#9FF0E0" stroke-width="3" stroke-linecap="round"/>')
    if hat == 'chef':
        s.append(f'<path d="M-36,-44 L-36,-70 Q-60,-80 -44,-100 Q-36,-118 -12,-110 Q0,-128 18,-112 Q44,-118 46,-94 Q58,-78 36,-70 L36,-44 Z" fill="#fff" {st()}/>')
    if hat == 'party':
        s.append(f'<path d="M-28,-46 L6,-118 L32,-46 Z" fill="{PURPLE}" {st()}/><circle cx="6" cy="-120" r="8" fill="{YELLOW}" {st(2.4)}/>'
                 f'<path d="M-16,-70 L22,-70 M-6,-92 L14,-92" stroke="{YELLOW}" stroke-width="5"/>')
    return ''.join(s)


def robot(arms=((-70, -80), (70, -80)), legs='stand', expr='open', look=0, hat=None, tilt=0, no_legs=False,
          extra_back='', extra_front='', body=None):
    """Rô-bốt, gốc (0,0) = giữa hai chân; cao ~300. Thân tròn có sọc, tay chân dạng ống."""
    body = body or ROBOT
    s = [extra_back]
    hip, sh = -96, -170
    if not no_legs:
        if legs == 'stand':
            L = [('M-18,-100 L-22,-16', -24), ('M18,-100 L22,-16', 24)]
        elif legs == 'walk':
            L = [('M-14,-100 L-44,-16', -48), ('M14,-100 L36,-14', 42)]
        elif legs == 'jump':
            L = [('M-14,-100 Q-40,-60 -26,-26', -30), ('M14,-100 Q30,-60 30,-20', 36)]
        else:
            L = []
        for d, fx in L:
            s.append(tube(d, GREY_L, 12))
            s.append(f'<path d="{d}" fill="none" stroke="{GREY}" stroke-width="12" stroke-dasharray="2.5 7"/>')
            fy = -16 if legs != 'jump' else -18
            s.append(f'<path d="M{fx - 22},{fy + 12} Q{fx - 22},{fy - 8} {fx},{fy - 8} Q{fx + 22},{fy - 8} {fx + 22},{fy + 12} Z" fill="{body}" {st()}/>')
    # arms (behind body)
    for sx, pt in zip((-1, 1), arms):
        if pt is None:
            continue
        hx, hy = pt
        x0, y0 = sx * 36, sh + 22
        d = f'M{x0},{y0} Q{(x0 + hx) / 2 + sx * 16:.1f},{(y0 + hy) / 2 - 6:.1f} {hx},{hy}'
        s.append(tube(d, GREY_L, 11))
        s.append(f'<path d="{d}" fill="none" stroke="{GREY}" stroke-width="11" stroke-dasharray="2.5 7"/>')
        s.append(f'<circle cx="{hx}" cy="{hy}" r="12" fill="{body}" {st()}/>')
    # torso
    s.append(f'<path d="M-40,{sh} Q0,{sh - 10} 40,{sh} L46,{hip} Q0,{hip + 12} -46,{hip} Z" fill="{body}" {st()}/>')
    for yy in (sh + 20, sh + 42, sh + 64):
        s.append(f'<path d="M-38,{yy} Q0,{yy + 8} 38,{yy}" fill="none" stroke="{ROBOT_D}" stroke-width="3"/>')
    s.append(f'<circle cx="0" cy="{sh + 30}" r="9" fill="{TEAL}" {st(2.4)}/>')
    s.append(f'<rect x="-12" y="{sh - 18}" width="24" height="20" fill="{GREY}" {st(2.4)}/>')
    s.append(extra_front)
    s.append(f'<g transform="translate(0,{sh - 60}) rotate({tilt})">{robot_head(expr, look, hat)}</g>')
    return ''.join(s)


def robot_bust(expr='happy', look=0, arms=None):
    """Rô-bốt nửa người: gốc (0,0) = đáy khung."""
    s = []
    if arms:
        for sx, (hx, hy) in zip((-1, 1), arms):
            x0, y0 = sx * 40, -70
            d = f'M{x0},{y0} Q{(x0 + hx) / 2 + sx * 20:.1f},{(y0 + hy) / 2:.1f} {hx},{hy}'
            s.append(tube(d, GREY_L, 11))
            s.append(f'<path d="{d}" fill="none" stroke="{GREY}" stroke-width="11" stroke-dasharray="2.5 7"/>')
            s.append(f'<circle cx="{hx}" cy="{hy}" r="12" fill="{ROBOT}" {st()}/>')
    s.append(f'<path d="M-46,10 L-40,-80 Q0,-90 40,-80 L46,10 Z" fill="{ROBOT}" {st()}/>')
    for yy in (-58, -34, -10):
        s.append(f'<path d="M-42,{yy} Q0,{yy + 8} 42,{yy}" fill="none" stroke="{ROBOT_D}" stroke-width="3"/>')
    s.append(f'<rect x="-12" y="-100" width="24" height="22" fill="{GREY}" {st(2.4)}/>')
    s.append(f'<g transform="translate(0,-150)">{robot_head(expr, look)}</g>')
    return ''.join(s)


# ───────────────────────── đồ vật / cảnh ─────────────────────────
def tree(x, y, h=150, crown=GREEN, trunk=BROWN, r=None):
    r = r or h * .36
    return (f'<path d="M{x - 9},{y} L{x - 6},{y - h * .6} L{x + 6},{y - h * .6} L{x + 9},{y} Z" fill="{trunk}" {st()}/>'
            f'<circle cx="{x - r * .55}" cy="{y - h + r * .9}" r="{r * .7}" fill="{crown}" {st()}/>'
            f'<circle cx="{x + r * .55}" cy="{y - h + r * .95}" r="{r * .7}" fill="{crown}" {st()}/>'
            f'<circle cx="{x}" cy="{y - h + r * .6}" r="{r * .8}" fill="{crown}" {st()}/>'
            f'<path d="M{x - r * .9},{y - h + r * 1.2} Q{x},{y - h + r * 1.9} {x + r * .9},{y - h + r * 1.2}" fill="{crown}" stroke="none"/>')


def bush(x, y, w=80, col=GREEN):
    h = w * .45
    return (f'<path d="M{x - w / 2},{y} Q{x - w / 2 - 4},{y - h * .9} {x - w / 4},{y - h * .8} Q{x - w / 6},{y - h * 1.35} {x + w / 8},{y - h * 1.05} '
            f'Q{x + w / 2.6},{y - h * 1.3} {x + w / 2.2},{y - h * .6} Q{x + w / 2 + 6},{y - h * .3} {x + w / 2},{y} Z" fill="{col}" {st()}/>')


def sapling(x, y, h=150, leaf=GREEN):
    """cây non cành trơ, vài lá"""
    s = [f'<path d="M{x},{y} L{x},{y - h}" stroke="{BROWN}" stroke-width="7" stroke-linecap="round"/>']
    br = [(-0.45, -34, 30), (-0.65, 30, 34), (-0.8, -26, 26), (-0.3, 26, 22)]
    for f, dx, L in br:
        by = y + h * f
        s.append(f'<path d="M{x},{by} L{x + dx},{by - L}" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>')
        for t in (0.6, 1.0):
            lx, ly = x + dx * t, by - L * t
            s.append(f'<ellipse cx="{lx}" cy="{ly - 6}" rx="6" ry="10" fill="{leaf}" {st(2)} transform="rotate({20 if dx > 0 else -20} {lx} {ly - 6})"/>')
    s.append(f'<ellipse cx="{x}" cy="{y - h - 8}" rx="7" ry="11" fill="{leaf}" {st(2)}/>')
    return ''.join(s)


def school_gate(x, y, w, h, sign='TRƯỜNG TIỂU HỌC', size=14, col='#F7C9A8'):
    """Cổng trường: hai trụ + biển tên; (x,y) = chân trụ trái."""
    s = [f'<rect x="{x}" y="{y - h}" width="22" height="{h}" fill="{col}" {st()}/>',
         f'<rect x="{x + w - 22}" y="{y - h}" width="22" height="{h}" fill="{col}" {st()}/>',
         f'<rect x="{x - 8}" y="{y - h - 36}" width="{w + 16}" height="34" rx="4" fill="#fff" {st()}/>',
         text(x + w / 2, y - h - 13, sign, size=size, weight=700, fill=INK)]
    return ''.join(s)


def building(x, y, w, h, col='#FFE8C7', win=SKY):
    s = [f'<rect x="{x}" y="{y - h}" width="{w}" height="{h}" fill="{col}" {st()}/>']
    cols = max(1, int(w // 36))
    rows = max(1, int(h // 40))
    for i in range(cols):
        for j in range(rows):
            wx = x + (w - cols * 36) / 2 + i * 36 + 8
            wy = y - h + 12 + j * 40
            if wy + 22 < y - 4:
                s.append(f'<rect x="{wx}" y="{wy}" width="20" height="22" rx="3" fill="{win}" {st(2)}/>')
    return ''.join(s)


def table(x, y, w, top_y, col='#F2D3A6', legs=True, cloth=None):
    """bàn nhìn nghiêng: mặt bàn từ x tới x+w ở độ cao top_y, chân tới y"""
    s = []
    if legs:
        for lx in (x + 14, x + w - 24):
            s.append(f'<rect x="{lx}" y="{top_y}" width="10" height="{y - top_y}" fill="{BROWN}" {st(2.4)}/>')
    s.append(f'<rect x="{x}" y="{top_y - 10}" width="{w}" height="16" rx="4" fill="{cloth or col}" {st()}/>')
    return ''.join(s)


def chair(x, y, h=90, col=ORANGE, facing=1):
    """ghế nghiêng: lưng ghế ở phía -facing"""
    bx = x - facing * 30
    return (f'<rect x="{bx - 5}" y="{y - h}" width="10" height="{h}" rx="4" fill="{col}" {st(2.4)}/>'
            f'<rect x="{x - 34}" y="{y - h * .5}" width="68" height="10" rx="4" fill="{col}" {st(2.4)}/>'
            f'<rect x="{x + facing * 26 - 4}" y="{y - h * .5}" width="8" height="{h * .5}" fill="{col}" {st(2.2)}/>')


def bed(x, y, w, h=70, frame='#C99668', sheet=SKY, blanket=PURPLE):
    """giường nhìn nghiêng; đầu giường bên trái. (x,y)=chân trái"""
    s = [f'<rect x="{x}" y="{y - h - 60}" width="16" height="{h + 60}" rx="5" fill="{frame}" {st()}/>',
         f'<rect x="{x + w - 14}" y="{y - h - 20}" width="14" height="{h + 20}" rx="5" fill="{frame}" {st()}/>',
         f'<rect x="{x + 10}" y="{y - h}" width="{w - 20}" height="{h * .45}" rx="8" fill="{sheet}" {st()}/>',
         f'<rect x="{x + 10}" y="{y - h * .55}" width="{w - 20}" height="{h * .3}" fill="{frame}" {st()}/>']
    return ''.join(s)


def blanket(x, y, w, h, col=PURPLE):
    """chăn phủ (hình gò) từ x tới x+w, đáy y"""
    return (f'<path d="M{x},{y} Q{x + 4},{y - h} {x + w * .35},{y - h} Q{x + w * .8},{y - h * 1.05} {x + w},{y - h * .7} L{x + w},{y} Z" fill="{col}" {st()}/>'
            f'<path d="M{x + w * .25},{y - h * .6} l10,8 m20,-14 l10,8 m24,-4 l10,8" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>')


def pillow(x, y, w=60, h=26):
    return f'<rect x="{x}" y="{y - h}" width="{w}" height="{h}" rx="{h / 2}" fill="#fff" {st()}/>'


def star_lantern(cx, cy, r, col=YELLOW, light='#FFF0B8', stick=True, stick_len=None, rot=0):
    """Đèn ông sao 5 cánh, (cx,cy) = tâm."""
    pts, inner = [], []
    for i in range(10):
        a = math.radians(-90 + i * 36 + rot)
        rr = r if i % 2 == 0 else r * .42
        pts.append(f'{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}')
    s = []
    if stick:
        L = stick_len or r * 1.4
        s.append(f'<rect x="{cx - 5}" y="{cy + r * .3}" width="10" height="{L}" rx="4" fill="{BROWN}" {st(2.4)}/>')
    s.append(f'<polygon points="{" ".join(pts)}" fill="{col}" {st()}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .38}" fill="{light}" {st(2.2)}/>')
    # dây trang trí từ tâm ra 5 cánh
    for i in range(5):
        a = math.radians(-90 + i * 72 + rot)
        s.append(f'<line x1="{cx + r * .38 * math.cos(a):.1f}" y1="{cy + r * .38 * math.sin(a):.1f}" x2="{cx + r * .8 * math.cos(a):.1f}" y2="{cy + r * .8 * math.sin(a):.1f}" stroke="{INK}" stroke-width="1.8" opacity=".55"/>')
    return ''.join(s)


def note(x, y, s=1, col=INK):
    """nốt nhạc"""
    return (f'<g transform="translate({x},{y}) scale({s})"><ellipse cx="0" cy="0" rx="7" ry="5.5" fill="{col}" transform="rotate(-20)"/>'
            f'<path d="M6,-2 L6,-30 Q14,-24 18,-16" fill="none" stroke="{col}" stroke-width="3" stroke-linecap="round"/></g>')


def ground(x, y, w, h, col=GRASS):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{col}"/>'


def sink(x, y, w, h, col='#DDE6EE', water=True):
    """bồn rửa nhìn chéo: (x,y) = góc trái trên mép bồn"""
    s = [f'<path d="M{x},{y} L{x + w},{y} L{x + w - 14},{y + h} L{x + 14},{y + h} Z" fill="{col}" {st()}/>']
    if water:
        s.append(f'<path d="M{x + 12},{y + 14} L{x + w - 12},{y + 14} L{x + w - 18},{y + h - 8} L{x + 18},{y + h - 8} Z" fill="{WATER_L}" {st(2)}/>')
        for i in range(4):
            s.append(f'<circle cx="{x + 30 + i * (w - 60) / 3}" cy="{y + 12 + (i % 2) * 6}" r="{6 + (i % 2) * 3}" fill="#fff" {st(1.6)}/>')
    return ''.join(s)


def faucet(x, y, h=60, flip=False):
    k = -1 if flip else 1
    return (f'<path d="M{x},{y} L{x},{y - h} Q{x},{y - h - 24} {x + k * 26},{y - h - 24} L{x + k * 34},{y - h - 24} L{x + k * 34},{y - h - 10}" fill="none" stroke="{INK}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="M{x},{y} L{x},{y - h} Q{x},{y - h - 24} {x + k * 26},{y - h - 24} L{x + k * 34},{y - h - 24} L{x + k * 34},{y - h - 10}" fill="none" stroke="{GREY_L}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>')


def plate(x, y, w=40, col='#fff', food=None):
    s = f'<ellipse cx="{x}" cy="{y}" rx="{w / 2}" ry="{w / 6}" fill="{col}" {st(2.2)}/>'
    if food:
        s += f'<ellipse cx="{x}" cy="{y - 3}" rx="{w / 3.4}" ry="{w / 9}" fill="{food}" {st(1.8)}/>'
    return s


def bowl(x, y, w=40, col='#fff', food=None):
    s = ''
    if food:
        s += f'<ellipse cx="{x}" cy="{y - w * .32}" rx="{w * .42}" ry="{w * .12}" fill="{food}" {st(1.8)}/>'
    s += f'<path d="M{x - w / 2},{y - w * .32} Q{x - w / 2},{y} {x},{y} Q{x + w / 2},{y} {x + w / 2},{y - w * .32} Z" fill="{col}" {st(2.4)}/>'
    return s


def book_open(x, y, w=70, col='#fff'):
    return (f'<path d="M{x - w / 2},{y} L{x - w / 2 + 6},{y - 14} Q{x - w / 4},{y - 20} {x},{y - 12} Q{x + w / 4},{y - 20} {x + w / 2 - 6},{y - 14} L{x + w / 2},{y} Q{x + w / 4},{y - 6} {x},{y} Q{x - w / 4},{y - 6} {x - w / 2},{y} Z" fill="{col}" {st(2.4)}/>'
            f'<path d="M{x},{y - 12} L{x},{y}" {st(2)}/>')


def cloud(x, y, s=1):
    return (f'<g transform="translate({x},{y}) scale({s})"><path d="M-50,10 Q-62,-10 -36,-14 Q-30,-36 -4,-30 Q14,-46 34,-26 Q60,-26 54,-2 Q66,12 44,14 Z" '
            f'fill="#fff" {st(2.6)}/></g>')


def arrow_dash(x1, y1, x2, y2, col='#2F8FB8', bend=0):
    """mũi tên nét đứt từ (x1,y1) tới (x2,y2)"""
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy)
    cx, cy = mx - dy / L * bend, my + dx / L * bend
    # hướng đầu mũi tên theo tiếp tuyến cuối
    tx, ty = x2 - cx, y2 - cy
    tl = math.hypot(tx, ty)
    ux, uy = tx / tl, ty / tl
    a1 = (x2 - ux * 16 - uy * 9, y2 - uy * 16 + ux * 9)
    a2 = (x2 - ux * 16 + uy * 9, y2 - uy * 16 - ux * 9)
    return (f'<path d="M{x1},{y1} Q{cx:.1f},{cy:.1f} {x2 - ux * 6:.1f},{y2 - uy * 6:.1f}" fill="none" stroke="{col}" stroke-width="4" stroke-dasharray="12 8" stroke-linecap="round"/>'
            f'<path d="M{a1[0]:.1f},{a1[1]:.1f} L{x2},{y2} L{a2[0]:.1f},{a2[1]:.1f}" fill="none" stroke="{col}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>')
