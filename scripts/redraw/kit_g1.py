"""
Bộ vẽ riêng cho nhóm g1 (đo lường: cân, cân nặng, lít) — nét riêng, phẳng, viền INK.
Bổ sung cho kit_measure.py / kit_liquid.py (không sửa hai file đó).

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    import kit_measure as km, kit_liquid as kl
    from kit_g1 import *

Quy ước: (x, y) = điểm giữa đáy của đồ vật (chỗ chạm mặt đỡ), trừ khi ghi khác.
"""
import math
from common import *

SW = 3


def _p(d, fill, sw=SW, extra=''):
    return f'<path d="{d}" fill="{fill}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round"{extra}/>'


def g(x, y, k, inner, flip=False):
    sx = -k if flip else k
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({sx:.4f},{k:.4f})">{inner}</g>'


def eyes(cx, cy, gap=8, r=3.2, look=(0, 0)):
    lx, ly = look
    return (f'<circle cx="{cx - gap}" cy="{cy}" r="{r}" fill="{INK}"/><circle cx="{cx + gap}" cy="{cy}" r="{r}" fill="{INK}"/>'
            f'<circle cx="{cx - gap + 1 + lx}" cy="{cy - 1 + ly}" r="{r * .38:.2f}" fill="#fff"/>'
            f'<circle cx="{cx + gap + 1 + lx}" cy="{cy - 1 + ly}" r="{r * .38:.2f}" fill="#fff"/>')


def smile(cx, cy, w=5, sw=2.4):
    return f'<path d="M{cx - w},{cy} Q{cx},{cy + w * .8} {cx + w},{cy}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linecap="round"/>'


def blush(cx, cy, gap=14, r=3.6):
    return (f'<circle cx="{cx - gap}" cy="{cy}" r="{r}" fill="{PINK}" opacity=".75"/>'
            f'<circle cx="{cx + gap}" cy="{cy}" r="{r}" fill="{PINK}" opacity=".75"/>')


# ═════════════════════════════ SÁCH, BÚT ═════════════════════════════════════

def book_flat(x, y, w, h, cover, dx=0):
    """Quyển sách nằm ngang nhìn nghiêng: gáy bìa màu bên trái, mép giấy trắng.
    (x, y) = giữa đáy; w dài, h dày."""
    x0 = x - w / 2 + dx
    r = h * .35
    s = [f'<rect x="{x0:.1f}" y="{y - h:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{r:.1f}" fill="{cover}" stroke="{INK}" stroke-width="{SW}"/>',
         f'<rect x="{x0 + w * .12:.1f}" y="{y - h + h * .24:.1f}" width="{w * .86:.1f}" height="{h * .52:.1f}" rx="2" fill="#fff" stroke="{INK}" stroke-width="2"/>']
    for k in (.42, .6):
        s.append(f'<line x1="{x0 + w * .16:.1f}" y1="{y - h * k:.1f}" x2="{x0 + w * .95:.1f}" y2="{y - h * k:.1f}" stroke="{INK}" stroke-width="1.2" opacity=".35"/>')
    return ''.join(s)


def pencil(x1, y1, x2, y2, w=14, body=YELLOW, tip=True):
    """Bút chì từ đuôi (x1,y1) tới ngòi (x2,y2)."""
    L = math.hypot(x2 - x1, y2 - y1)
    a = math.degrees(math.atan2(y2 - y1, x2 - x1))
    h = w / 2
    t = w * 1.3
    inner = (f'<rect x="0" y="{-h}" width="{w * .6}" height="{w}" rx="2" fill="{PINK}" stroke="{INK}" stroke-width="2.6"/>'
             f'<rect x="{w * .6}" y="{-h}" width="{w * .35}" height="{w}" fill="{GREY}" stroke="{INK}" stroke-width="2.6"/>'
             f'<path d="M{w * .95},{-h} H{L - t} L{L},0 L{L - t},{h} H{w * .95} Z" fill="{body}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>'
             f'<path d="M{L - t},{-h} L{L},0 L{L - t},{h} Z" fill="{CREAM}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>'
             f'<path d="M{L - t * .38},{-h * .38} L{L},0 L{L - t * .38},{h * .38} Z" fill="{INK}"/>'
             f'<line x1="{w * 1.1}" y1="0" x2="{L - t - 3}" y2="0" stroke="{INK}" stroke-width="1.4" opacity=".4"/>')
    return f'<g transform="translate({x1},{y1}) rotate({a:.2f})">{inner}</g>'


def fountain_pen(x1, y1, x2, y2, w=18, body=TEAL, cap=BLUE):
    """Bút mực: đuôi (x1,y1) tới ngòi (x2,y2)."""
    L = math.hypot(x2 - x1, y2 - y1)
    a = math.degrees(math.atan2(y2 - y1, x2 - x1))
    h = w / 2
    inner = (f'<path d="M{h},{-h} H{L * .5} V{h} H{h} A{h},{h} 0 0 1 {h},{-h} Z" fill="{cap}" stroke="{INK}" stroke-width="2.6"/>'
             f'<rect x="{L * .08}" y="{-h - 4}" width="{L * .32}" height="5" rx="2.5" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>'
             f'<path d="M{L * .5},{-h} H{L * .74} L{L * .8},{-h * .6} V{h * .6} L{L * .74},{h} H{L * .5} Z" fill="{body}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>'
             f'<path d="M{L * .8},{-h * .55} L{L},0 L{L * .8},{h * .55} Z" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>'
             f'<line x1="{L * .84}" y1="0" x2="{L * .97}" y2="0" stroke="{INK}" stroke-width="1.6"/>'
             f'<circle cx="{L * .86}" cy="0" r="1.8" fill="{INK}"/>')
    return f'<g transform="translate({x1},{y1}) rotate({a:.2f})">{inner}</g>'


# ═════════════════════════════ NGƯỜI, RÔ-BỐT ═════════════════════════════════

def robot(x, y, h=200, body='#DDE9F3', accent=BLUE, arm_pose='wave', look=(0, 0)):
    """Rô-bốt tròn đầu to, thân trụ, tay lò xo. (x, y) = giữa đáy chân. Khung vẽ cao 200."""
    k = h / 200
    sw = SW / k
    s = []
    # chân
    for sg in (-1, 1):
        s.append(f'<path d="M{sg * 14},-72 L{sg * 18},-18" stroke="{INK}" stroke-width="{11 + sw}" stroke-linecap="round"/>')
        s.append(f'<path d="M{sg * 14},-72 L{sg * 18},-18" stroke="{GREY}" stroke-width="11" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="{sg * 22}" cy="-10" rx="18" ry="10" fill="{accent}" stroke="{INK}" stroke-width="{sw}"/>')
    # tay
    arms = {'wave': [(-26, -104, -54, -70), (26, -104, 58, -140)],
            'down': [(-26, -104, -44, -62), (26, -104, 44, -62)],
            'hold': [(-26, -104, -2, -86), (26, -104, 44, -80)],
            'think': [(-26, -104, -44, -62), (26, -104, 18, -142)]}[arm_pose]
    for x1, y1, x2, y2 in arms:
        s.append(f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{INK}" stroke-width="{9 + sw}" stroke-linecap="round"/>')
        s.append(f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{GREY}" stroke-width="9" stroke-linecap="round" stroke-dasharray="3 3"/>')
        s.append(f'<circle cx="{x2}" cy="{y2}" r="8" fill="{accent}" stroke="{INK}" stroke-width="{sw}"/>')
    # thân
    s.append(f'<rect x="-30" y="-124" width="60" height="58" rx="18" fill="{body}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(f'<rect x="-14" y="-108" width="28" height="18" rx="6" fill="{accent}" stroke="{INK}" stroke-width="{sw * .8}"/>')
    s.append(f'<circle cx="-5" cy="-99" r="3" fill="{YELLOW}"/><circle cx="5" cy="-99" r="3" fill="{RED}"/>')
    # cổ + đầu
    s.append(f'<rect x="-8" y="-134" width="16" height="12" fill="{GREY}" stroke="{INK}" stroke-width="{sw}"/>')
    for sg in (-1, 1):
        s.append(f'<rect x="{sg * 50 - 7}" y="-176" width="14" height="22" rx="6" fill="{accent}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(f'<ellipse cx="0" cy="-166" rx="48" ry="36" fill="{body}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(f'<rect x="-34" y="-186" width="68" height="40" rx="20" fill="#3A4E66" stroke="{INK}" stroke-width="{sw}"/>')
    lx, ly = look
    for sg in (-1, 1):
        s.append(f'<ellipse cx="{sg * 14}" cy="-166" rx="10" ry="12" fill="#fff"/>')
        s.append(f'<circle cx="{sg * 14 + lx}" cy="{-165 + ly}" r="5" fill="{INK}"/>')
    s.append(f'<line x1="0" y1="-202" x2="0" y2="-214" stroke="{INK}" stroke-width="{sw}"/><circle cx="0" cy="-216" r="5" fill="{RED}" stroke="{INK}" stroke-width="{sw * .8}"/>')
    return g(x, y, k, ''.join(s))


def kid(x, y, h=260, girl=False, skin=SKIN, hair=HAIR, shirt=BLUE, bottom='#4E8FC8', shoe=RED, pose='down', mouth='smile'):
    """Bạn nhỏ đứng thẳng nhìn thẳng. (x, y) = giữa đáy giày. Khung vẽ cao 260.
    girl=True: tóc đuôi ngựa + váy; pose: 'down' | 'wave' | 'hips'."""
    k = h / 260
    sw = SW / k
    s = []
    # chân + giày
    for sg in (-1, 1):
        s.append(f'<rect x="{sg * 14 - 8}" y="-92" width="16" height="80" rx="7" fill="{skin}" stroke="{INK}" stroke-width="{sw}"/>')
        s.append(f'<path d="M{sg * 14 - 12},-4 Q{sg * 14 - 12},-18 {sg * 14},-18 Q{sg * 14 + 16},-18 {sg * 14 + 16 * sg if sg > 0 else sg * 14 + 12},-4 Z" fill="{shoe}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    # váy / quần
    if girl:
        s.append(_p('M-30,-150 H30 L50,-84 Q0,-74 -50,-84 Z', bottom, sw))
        for dx in (-22, 0, 22):
            s.append(f'<path d="M{dx * .6},-146 L{dx * 1.3},-82" stroke="{INK}" stroke-width="{sw * .5}" opacity=".35"/>')
    else:
        s.append(_p('M-30,-150 H30 L34,-92 H4 L0,-118 L-4,-92 H-34 Z', bottom, sw))
    # tay
    arms = {'down': [(-30, -196, -42, -120), (30, -196, 42, -120)],
            'wave': [(-30, -196, -42, -120), (30, -196, 66, -238)],
            'hips': [(-30, -196, -54, -160, -34, -140), (30, -196, 54, -160, 34, -140)]}[pose]
    for a in arms:
        d = f'M{a[0]},{a[1]} L{a[2]},{a[3]}' + (f' L{a[4]},{a[5]}' if len(a) > 4 else '')
        hx, hy = (a[4], a[5]) if len(a) > 4 else (a[2], a[3])
        s.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{15 + sw * 2}" stroke-linecap="round" stroke-linejoin="round"/>')
        s.append(f'<path d="{d}" fill="none" stroke="{skin}" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>')
        s.append(f'<path d="M{a[0]},{a[1]} L{a[0] + (a[2] - a[0]) * .35:.1f},{a[1] + (a[3] - a[1]) * .35:.1f}" stroke="{INK}" stroke-width="{19 + sw * 2}" stroke-linecap="round"/>')
        s.append(f'<path d="M{a[0]},{a[1]} L{a[0] + (a[2] - a[0]) * .35:.1f},{a[1] + (a[3] - a[1]) * .35:.1f}" stroke="{shirt}" stroke-width="19" stroke-linecap="round"/>')
    # áo
    s.append(_p('M-32,-204 Q0,-212 32,-204 L36,-140 Q0,-134 -36,-140 Z', shirt, sw))
    s.append(_p('M-12,-208 L0,-196 L12,-208', '#fff', sw * .8))
    # cổ + đầu
    s.append(f'<rect x="-7" y="-218" width="14" height="14" fill="{skin}"/>')
    hy = -244
    if girl:
        s.append(_p(f'M30,{hy - 20} q34,6 26,58 q-14,-8 -26,-34 Z', hair, sw))
        s.append(f'<circle cx="34" cy="{hy - 20}" r="7" fill="{PINK}" stroke="{INK}" stroke-width="{sw * .8}"/>')
    s.append(f'<ellipse cx="0" cy="{hy}" rx="34" ry="33" fill="{skin}" stroke="{INK}" stroke-width="{sw}"/>')
    for sg in (-1, 1):
        s.append(f'<ellipse cx="{sg * 34}" cy="{hy + 4}" rx="6" ry="8" fill="{skin}" stroke="{INK}" stroke-width="{sw * .8}"/>')
    if girl:
        s.append(_p(f'M-36,{hy + 6} Q-40,{hy - 40} 0,{hy - 38} Q40,{hy - 40} 36,{hy + 6} Q24,{hy - 20} 2,{hy - 16} Q-20,{hy - 22} -36,{hy + 6} Z', hair, sw))
    else:
        s.append(_p(f'M-35,{hy} Q-38,{hy - 38} 0,{hy - 38} Q38,{hy - 38} 35,{hy} Q30,{hy - 14} 18,{hy - 14} L12,{hy - 22} L2,{hy - 12} L-8,{hy - 22} L-14,{hy - 12} Q-30,{hy - 16} -35,{hy} Z', hair, sw))
    s.append(eyes(0, hy + 2, gap=12, r=3.8))
    s.append(blush(0, hy + 12, gap=20, r=5))
    if mouth == 'open':
        s.append(_p(f'M-7,{hy + 14} Q0,{hy + 24} 7,{hy + 14} Z', '#E86A7E', sw * .7))
    elif mouth == 'o':
        s.append(f'<ellipse cx="0" cy="{hy + 18}" rx="3.5" ry="4" fill="#E86A7E" stroke="{INK}" stroke-width="{sw * .6}"/>')
    else:
        s.append(smile(0, hy + 15, 6, sw * .8))
    return g(x, y, k, ''.join(s))


def bathroom_scale(x, y, w=180, h=26, col=GREY_L, face=True):
    """Cân sức khoẻ (bàn cân dẹt) nhìn chếch. (x, y) = giữa đáy."""
    s = [f'<ellipse cx="{x}" cy="{y}" rx="{w * .55}" ry="5" fill="{INK}" opacity=".1"/>',
         f'<path d="M{x - w / 2},{y - h} L{x - w / 2 + 6},{y - 4} H{x + w / 2 - 6} L{x + w / 2},{y - h} Z" fill="{SCALE_D if False else "#9FB6CC"}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="{x - w / 2 - 4}" y="{y - h - 12}" width="{w + 8}" height="16" rx="7" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>']
    if face:
        fx, fy = x + w * .3, y - h * .52
        s.append(f'<path d="M{fx - 16},{fy + 6} A16,14 0 0 1 {fx + 16},{fy + 6} Z" fill="#fff" stroke="{INK}" stroke-width="2"/>')
        s.append(f'<line x1="{fx}" y1="{fy + 5}" x2="{fx + 5}" y2="{fy - 5}" stroke="{RED}" stroke-width="2" stroke-linecap="round"/>')
    return ''.join(s)


def bubble(cx, cy, r, s, size=20, tail=None):
    """Bong bóng tròn ghi chữ; tail = (x, y) mũi đuôi."""
    out = []
    if tail:
        tx, ty = tail
        a = math.atan2(ty - cy, tx - cx)
        p1 = (cx + r * math.cos(a + .35), cy + r * math.sin(a + .35))
        p2 = (cx + r * math.cos(a - .35), cy + r * math.sin(a - .35))
        out.append(f'<path d="M{p1[0]:.1f},{p1[1]:.1f} L{tx},{ty} L{p2[0]:.1f},{p2[1]:.1f}" fill="#fff" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
    if tail:
        out.append(f'<path d="M{p1[0]:.1f},{p1[1]:.1f} L{p2[0]:.1f},{p2[1]:.1f}" stroke="#fff" stroke-width="4"/>')
    out.append(text(cx, cy + size * .36, s, size=size, weight=700))
    return ''.join(out)


_n = [0]


def uid(tag='g1'):
    _n[0] += 1
    return f'g1{tag}{_n[0]}'


def jar(x, y, w, h, lab=None, level=None, size=None, body='#EEF7FC', lid=TEAL, water=WATER_L):
    """Bình nhựa cao có nắp vặn, vai bo tròn. level 0..1 = mực nước; lab = chữ giữa thân."""
    x0, x1 = x - w / 2, x + w / 2
    top = y - h
    nw = w * .56
    lh = h * .12
    sh = top + lh + h * .1
    r = w * .14
    d = (f'M{x - nw / 2:.1f},{top + lh:.1f} Q{x0:.1f},{top + lh + 2:.1f} {x0:.1f},{sh + 10:.1f} L{x0:.1f},{y - r:.1f} '
         f'Q{x0:.1f},{y:.1f} {x0 + r:.1f},{y:.1f} L{x1 - r:.1f},{y:.1f} Q{x1:.1f},{y:.1f} {x1:.1f},{y - r:.1f} L{x1:.1f},{sh + 10:.1f} '
         f'Q{x1:.1f},{top + lh + 2:.1f} {x + nw / 2:.1f},{top + lh:.1f} Z')
    cid = uid('jar')
    s = [f'<clipPath id="{cid}"><path d="{d}"/></clipPath>', f'<path d="{d}" fill="{body}"/>']
    if level:
        wy = y - (y - top - lh) * level
        s.append(f'<g clip-path="url(#{cid})"><rect x="{x0 - 4}" y="{wy:.1f}" width="{w + 8}" height="{y - wy + 4:.1f}" fill="{water}"/>'
                 f'<line x1="{x0 - 4}" y1="{wy:.1f}" x2="{x1 + 4}" y2="{wy:.1f}" stroke="{WATER_D}" stroke-width="2.4"/></g>')
    s.append(f'<path d="M{x0 + w * .16:.1f},{sh + 14:.1f} V{y - h * .12:.1f}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".85"/>')
    s.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x - nw / 2 - 3:.1f}" y="{top:.1f}" width="{nw + 6:.1f}" height="{lh:.1f}" rx="4" fill="{lid}" stroke="{INK}" stroke-width="{SW}"/>')
    for k in range(1, 6):
        lx = x - nw / 2 + nw * k / 6
        s.append(f'<line x1="{lx:.1f}" y1="{top + 4:.1f}" x2="{lx:.1f}" y2="{top + lh - 4:.1f}" stroke="{INK}" stroke-width="1.6" opacity=".5"/>')
    if lab:
        fs = size or w * .3
        s.append(text(x, y - (y - sh) * .5 + fs * .36, lab, size=fs, weight=700))
    return ''.join(s)


def teacup(x, y, w=50, h=36, col=WHITE, water=True):
    """Cốc/tách nhỏ có quai phải, thấy mặt nước ở miệng. (x, y) = giữa đáy."""
    x0, x1, top = x - w / 2, x + w / 2, y - h
    d = f'M{x0:.1f},{top:.1f} L{x0 + w * .08:.1f},{y - 6:.1f} Q{x0 + w * .1:.1f},{y:.1f} {x0 + w * .2:.1f},{y:.1f} H{x1 - w * .2:.1f} Q{x1 - w * .1:.1f},{y:.1f} {x1 - w * .08:.1f},{y - 6:.1f} L{x1:.1f},{top:.1f} Z'
    s = [f'<path d="M{x1 - 3:.1f},{top + h * .22:.1f} C{x1 + w * .32:.1f},{top + h * .1:.1f} {x1 + w * .32:.1f},{y - h * .25:.1f} {x1 - w * .06:.1f},{y - h * .28:.1f}" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>',
         f'<path d="M{x1 - 3:.1f},{top + h * .22:.1f} C{x1 + w * .32:.1f},{top + h * .1:.1f} {x1 + w * .32:.1f},{y - h * .25:.1f} {x1 - w * .06:.1f},{y - h * .28:.1f}" fill="none" stroke="{col}" stroke-width="3.5" stroke-linecap="round"/>',
         _p(d, col, 2.8)]
    s.append(f'<ellipse cx="{x}" cy="{top:.1f}" rx="{w / 2:.1f}" ry="{h * .14:.1f}" fill="{WATER_L if water else col}" stroke="{INK}" stroke-width="2.8"/>')
    return ''.join(s)


def hen(x, y, h=100, body=WHITE, wing='#F3E6CF', flip=False):
    """Gà mái đứng nhìn nghiêng (đầu bên trái; flip=True đầu bên phải). Khung cao 100."""
    k = h / 100
    sw = SW / k
    s = []
    for dx in (-8, 8):
        s.append(f'<path d="M{dx},-26 V-4 M{dx},-4 l-7,4 M{dx},-4 l7,4 M{dx},-4 v5" stroke="{ORANGE}" stroke-width="{sw * 1.3}" stroke-linecap="round" fill="none"/>')
        s.append(f'<path d="M{dx},-26 V-4" stroke="{INK}" stroke-width="{sw * .5}" opacity="0"/>')
    # đuôi
    s.append(_p('M22,-46 Q44,-78 40,-52 Q52,-66 46,-38 Q40,-26 22,-30 Z', body, sw))
    # thân
    s.append(f'<ellipse cx="2" cy="-44" rx="30" ry="24" fill="{body}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(_p('M-6,-50 Q10,-58 22,-44 Q12,-30 -4,-36 Q0,-42 -6,-50 Z', wing, sw * .8))
    # đầu + cổ
    s.append(f'<ellipse cx="-20" cy="-66" rx="15" ry="17" fill="{body}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(f'<path d="M-6,-58 Q-2,-50 4,-50" fill="{body}" stroke="none"/>')
    s.append(_p('M-28,-80 q2,-10 8,-4 q4,-10 9,-2 q7,-6 7,4 Q-18,-76 -28,-80 Z', RED, sw * .8))
    s.append(_p('M-34,-66 L-46,-62 L-34,-58 Z', YELLOW, sw * .8))
    s.append(_p('M-33,-56 q-3,8 3,8 q3,-2 1,-8 Z', RED, sw * .6))
    s.append(f'<circle cx="-24" cy="-69" r="3" fill="{INK}"/><circle cx="-23" cy="-70" r="1" fill="#fff"/>')
    s.append(f'<circle cx="-16" cy="-62" r="3.4" fill="{PINK}" opacity=".7"/>')
    return g(x, y, k, ''.join(s), flip=flip)


def seesaw(cx, y, L=880, stand_h=120, left='', right=''):
    """Cầu bập bênh thăng bằng: tấm ván ngang dài L trên trụ giữa. y = mặt ván (chỗ con vật đứng).
    left/right: SVG đã đặt sẵn toạ độ tuyệt đối (vẽ đè lên ván)."""
    t = 16
    s = []
    base = y + t + stand_h
    s.append(f'<ellipse cx="{cx}" cy="{base + 2}" rx="90" ry="7" fill="{INK}" opacity=".1"/>')
    s.append(f'<rect x="{cx - 76}" y="{base - 16}" width="152" height="16" rx="6" fill="{SCALE_D if False else "#4F8FC4"}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(_p(f'M{cx - 42},{base - 16} L{cx - 30},{y + 10} H{cx + 30} L{cx + 42},{base - 16} Z', '#7FB2DE'))
    s.append(f'<circle cx="{cx}" cy="{y + 22}" r="22" fill="#7FB2DE" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<rect x="{cx - L / 2}" y="{y}" width="{L}" height="{t}" rx="{t / 2}" fill="{ORANGE}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<line x1="{cx - L / 2 + 14}" y1="{y + 5}" x2="{cx - L / 2 + 140}" y2="{y + 5}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>')
    s.append(f'<circle cx="{cx}" cy="{y + 8}" r="9" fill="{YELLOW}" stroke="{INK}" stroke-width="{SW}"/>')
    return ''.join(s) + left + right


def sack_lying(x, y, w, h, lab, size=26, col=CREAM, tie=RED):
    """Bao gạo nằm ngang, túm buộc ở đầu trái, ô nhãn bầu dục ghi chữ. (x, y) = giữa đáy."""
    x0, x1, top = x - w / 2, x + w / 2, y - h
    bx0 = x0 + w * .16
    d = (f'M{bx0:.1f},{top + h * .3:.1f} C{bx0 + w * .04:.1f},{top + h * .02:.1f} {bx0 + w * .3:.1f},{top + h * .1:.1f} {x1 - w * .16:.1f},{top + h * .02:.1f} '
         f'C{x1 - w * .02:.1f},{top - h * .02:.1f} {x1 + w * .03:.1f},{top + h * .2:.1f} {x1:.1f},{top + h * .5:.1f} '
         f'C{x1 + w * .03:.1f},{y - h * .2:.1f} {x1 - w * .02:.1f},{y + h * .02:.1f} {x1 - w * .16:.1f},{y - h * .02:.1f} '
         f'C{bx0 + w * .3:.1f},{y - h * .1:.1f} {bx0 + w * .04:.1f},{y - h * .02:.1f} {bx0:.1f},{y - h * .3:.1f} Z')
    ear = (f'M{bx0 + 4:.1f},{top + h * .36:.1f} L{x0 + w * .02:.1f},{top + h * .16:.1f} Q{x0 - w * .02:.1f},{top + h * .5:.1f} {x0 + w * .02:.1f},{y - h * .16:.1f} '
           f'L{bx0 + 4:.1f},{y - h * .36:.1f} Z')
    s = [_p(ear, col), _p(d, col),
         f'<rect x="{bx0 - 7:.1f}" y="{top + h * .3:.1f}" width="14" height="{h * .4:.1f}" rx="6" fill="{tie}" stroke="{INK}" stroke-width="2.6"/>',
         f'<path d="M{x0 + w * .06:.1f},{top + h * .34:.1f} l{w * .06:.1f},{h * .08:.1f} M{x0 + w * .05:.1f},{y - h * .3:.1f} l{w * .07:.1f},{-h * .06:.1f}" stroke="{INK}" stroke-width="2" stroke-linecap="round" opacity=".45"/>',
         f'<ellipse cx="{x + w * .1:.1f}" cy="{y - h / 2:.1f}" rx="{w * .34:.1f}" ry="{h * .34:.1f}" fill="#fff" stroke="{INK}" stroke-width="2.6"/>',
         f'<path d="M{x1 - w * .12:.1f},{top + h * .12:.1f} Q{x1 - w * .07:.1f},{top + h * .45:.1f} {x1 - w * .1:.1f},{y - h * .15:.1f}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>',
         text(x + w * .1, y - h / 2 + size * .36, lab, size=size, weight=700)]
    return ''.join(s)


# ═════════════════════════════ GIA SÚC (nhìn nghiêng, đầu bên phải) ═══════════
# Gốc (0,0) = giữa đáy chân; toạ độ thật (px), không phóng. flip=True: đầu bên trái.

def _legs(xs, top, bot, col, hoof=INK, w=18):
    s = []
    for x in xs:
        s.append(f'<rect x="{x - w / 2}" y="{top}" width="{w}" height="{bot - top}" rx="{w * .4}" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>')
        s.append(f'<rect x="{x - w / 2 - 1}" y="{bot - 10}" width="{w + 2}" height="10" rx="3" fill="{hoof}" stroke="{INK}" stroke-width="{SW}"/>')
    return ''.join(s)


def cow(x, y, flip=False, body=WHITE, spot=BROWN):
    """Bò sữa đốm. Rộng ~270, cao ~250. Chỗ ghi chữ: thân quanh (-40, -130)."""
    s = [f'<path d="M-118,-150 q-34,10 -30,62" fill="none" stroke="{INK}" stroke-width="{SW + 5}" stroke-linecap="round"/>',
         f'<path d="M-118,-150 q-34,10 -30,62" fill="none" stroke="{body}" stroke-width="5" stroke-linecap="round"/>',
         _p('M-150,-92 q-8,14 2,20 q8,-6 4,-20 Z', INK, 2),
         _legs((-96, -66, 44, 74), -80, 0, body, hoof='#6B5A50', w=22)]
    cid = uid('cow')
    bd = 'M-96,-180 Q-124,-180 -122,-150 Q-126,-66 -100,-66 H80 Q108,-66 104,-120 Q100,-178 72,-180 Z'
    s.append(f'<clipPath id="{cid}"><path d="{bd}"/></clipPath>')
    s.append(_p(bd, body))
    s.append(f'<g clip-path="url(#{cid})"><ellipse cx="-110" cy="-100" rx="26" ry="30" fill="{spot}"/>'
             f'<ellipse cx="60" cy="-170" rx="30" ry="20" fill="{spot}"/><ellipse cx="96" cy="-82" rx="18" ry="16" fill="{spot}"/></g>')
    s.append(_p(bd, 'none'))
    s.append(_p('M20,-68 q12,16 30,0', PINK, 2.4))
    # đầu
    s.append(_p('M84,-210 q-26,-12 -30,6 q12,10 32,6 Z', body))
    s.append(_p('M148,-210 q26,-12 30,6 q-12,10 -32,6 Z', body))
    s.append(_p('M92,-222 q-8,-18 2,-24 q4,10 8,18 Z', YELLOW, 2.4))
    s.append(_p('M140,-222 q8,-18 -2,-24 q-4,10 -8,18 Z', YELLOW, 2.4))
    s.append(f'<ellipse cx="116" cy="-178" rx="36" ry="44" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<ellipse cx="102" cy="-204" rx="14" ry="10" fill="{spot}"/>')
    s.append(f'<ellipse cx="116" cy="-150" rx="34" ry="22" fill="{PINK}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<ellipse cx="104" cy="-150" rx="4" ry="6" fill="{INK}"/><ellipse cx="128" cy="-150" rx="4" ry="6" fill="{INK}"/>')
    s.append(eyes(116, -190, gap=13, r=4))
    return g(x, y, 1, ''.join(s), flip=flip)


def pig(x, y, flip=False, body='#FFC2CF'):
    """Lợn mũm mĩm. Rộng ~200, cao ~130; đầu bên phải. Chỗ ghi chữ quanh (-20, -64)."""
    s = [f'<path d="M-88,-80 q-22,-6 -14,-22 q10,-2 6,10" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round"/>',
         _legs((-60, -30, 30, 58), -36, 0, body, hoof='#C9798A', w=20),
         f'<ellipse cx="-4" cy="-66" rx="90" ry="54" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>',
         f'<ellipse cx="80" cy="-78" rx="42" ry="40" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>',
         _p('M58,-112 L54,-136 L78,-118 Z', body),
         _p('M96,-116 L110,-136 L112,-110 Z', body),
         f'<ellipse cx="112" cy="-70" rx="16" ry="18" fill="#FF9FB3" stroke="{INK}" stroke-width="{SW}"/>',
         f'<ellipse cx="108" cy="-70" rx="2.6" ry="4" fill="{INK}"/><ellipse cx="117" cy="-70" rx="2.6" ry="4" fill="{INK}"/>',
         eyes(84, -92, gap=10, r=3.6),
         f'<path d="M84,-56 q8,6 16,0" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>']
    return g(x, y, 1, ''.join(s), flip=flip)


def goat(x, y, flip=False, body='#F4EEE4'):
    """Dê có sừng, râu. Rộng ~170, cao ~230; đầu bên phải. Chỗ ghi chữ quanh (-14, -118)."""
    s = [_p('M-72,-140 q-18,-14 -8,-30 q6,10 16,16 Z', body),
         _legs((-56, -34, 34, 56), -96, 0, body, hoof='#6B5A50', w=16),
         f'<rect x="-80" y="-160" width="150" height="76" rx="36" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>',
         _p('M40,-150 L62,-196 L92,-184 L74,-130 Z', body),
         _p('M72,-232 q-24,-24 -38,-4 q18,-6 26,14 Z', '#C9A57A', 2.6),
         _p('M88,-232 q-6,-30 -26,-24 q14,6 14,26 Z', '#C9A57A', 2.6),
         _p('M104,-214 q22,-2 26,10 q-16,6 -28,0 Z', body),
         f'<ellipse cx="84" cy="-200" rx="26" ry="32" fill="{body}" stroke="{INK}" stroke-width="{SW}" transform="rotate(-18 84 -200)"/>',
         _p('M94,-174 q4,24 -8,32 q-4,-16 -6,-28 Z', '#E2D6C4', 2.4),
         f'<ellipse cx="102" cy="-184" rx="3" ry="2.4" fill="{INK}"/>',
         f'<circle cx="84" cy="-208" r="3.6" fill="{INK}"/><circle cx="85" cy="-209" r="1.2" fill="#fff"/>',
         f'<rect x="50" y="-150" width="22" height="10" rx="4" fill="{RED}" stroke="{INK}" stroke-width="2" transform="rotate(-50 61 -145)"/>',
         f'<circle cx="60" cy="-134" r="6" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>']
    return g(x, y, 1, ''.join(s), flip=flip)


def basket(x, y, w, h, lines=(), size=26, col='#E9C48F', dark='#C99A5B'):
    """Sọt đan có hai quai, chữ (nhiều dòng) giữa thân. (x, y) = giữa đáy."""
    x0, x1, top = x - w / 2, x + w / 2, y - h
    bw = w * .42
    d = f'M{x0:.1f},{top:.1f} L{x - bw:.1f},{y - 8:.1f} Q{x:.1f},{y + 6:.1f} {x + bw:.1f},{y - 8:.1f} L{x1:.1f},{top:.1f} Z'
    cid = uid('bk')
    s = []
    for sg in (-1, 1):
        s.append(f'<path d="M{x + sg * w * .3:.1f},{top + 4:.1f} q{sg * w * .12:.1f},{-h * .34:.1f} {sg * w * .22:.1f},0" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>')
        s.append(f'<path d="M{x + sg * w * .3:.1f},{top + 4:.1f} q{sg * w * .12:.1f},{-h * .34:.1f} {sg * w * .22:.1f},0" fill="none" stroke="{col}" stroke-width="4" stroke-linecap="round"/>')
    s.append(f'<clipPath id="{cid}"><path d="{d}"/></clipPath>')
    s.append(f'<path d="{d}" fill="{col}"/>')
    s.append(f'<g clip-path="url(#{cid})">')
    for k in range(1, 6):
        yy = top + h * k / 6
        s.append(f'<line x1="{x0}" y1="{yy:.1f}" x2="{x1}" y2="{yy:.1f}" stroke="{dark}" stroke-width="2" opacity=".6"/>')
    s.append('</g>')
    s.append(f'<ellipse cx="{x}" cy="{y - h * .45:.1f}" rx="{w * .3:.1f}" ry="{h * .34:.1f}" fill="#FFF6E6" stroke="{INK}" stroke-width="2"/>')
    s.append(_p(d, 'none'))
    s.append(f'<ellipse cx="{x}" cy="{top:.1f}" rx="{w / 2 + 2:.1f}" ry="{h * .08:.1f}" fill="{dark}" stroke="{INK}" stroke-width="{SW}"/>')
    n = len(lines)
    y1 = y - h * .45 - (n - 1) * size * .55
    for i, ln in enumerate(lines):
        s.append(text(x, y1 + i * size * 1.1 + size * .36, ln, size=size, weight=700))
    return ''.join(s)


def melon(cx, cy, rx, ry, lab='', rot=0, size=24, col='#CDEFC0', stripe='#8CCB7A'):
    """Quả dưa hấu nằm (tâm cx, cy) có sọc, chữ giữa quả."""
    cid = uid('ml')
    s = [f'<g transform="rotate({rot} {cx} {cy})">',
         f'<clipPath id="{cid}"><ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}"/></clipPath>',
         f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{col}"/>',
         f'<g clip-path="url(#{cid})">']
    for k in (-.7, -.35, .35, .7):
        s.append(f'<path d="M{cx - rx},{cy + ry * k:.1f} Q{cx},{cy + ry * k * 1.5:.1f} {cx + rx},{cy + ry * k:.1f}" fill="none" stroke="{stripe}" stroke-width="5" stroke-linecap="round"/>')
    s.append('</g>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="none" stroke="{INK}" stroke-width="{SW}"/>')
    s.append('</g>')
    if lab:
        s.append(text(cx, cy + size * .36, lab, size=size, weight=700))
    return ''.join(s)


def leaf(x, y, L=22, rot=0, col=GRASS):
    return (f'<path d="M{x},{y} q{L * .5},{-L * .5} {L},0 q{-L * .5},{L * .5} {-L},0 Z" fill="{col}" stroke="{INK}" '
            f'stroke-width="2" stroke-linejoin="round" transform="rotate({rot} {x} {y})"/>')


def water_bottle(x, y, w, h, lab=None, size=None, body='#DDF1FB', band='#8FD0F2', cap='#6FB7EA'):
    """Chai nước nhựa: nắp, cổ, vai tròn, eo lượn, dải nhãn ghi chữ. (x, y) = giữa đáy."""
    x0, x1, top = x - w / 2, x + w / 2, y - h
    cw, chh = w * .42, h * .09
    nk = top + chh + h * .05
    sh = top + h * .3
    d = (f'M{x - cw / 2 + 2:.1f},{nk:.1f} C{x - cw / 2:.1f},{nk + h * .1:.1f} {x0:.1f},{nk + h * .06:.1f} {x0:.1f},{sh:.1f} '
         f'L{x0:.1f},{y - h * .3:.1f} Q{x0 + w * .08:.1f},{y - h * .2:.1f} {x0:.1f},{y - h * .1:.1f} L{x0:.1f},{y - 8:.1f} Q{x0:.1f},{y:.1f} {x0 + 10:.1f},{y:.1f} '
         f'H{x1 - 10:.1f} Q{x1:.1f},{y:.1f} {x1:.1f},{y - 8:.1f} L{x1:.1f},{y - h * .1:.1f} Q{x1 - w * .08:.1f},{y - h * .2:.1f} {x1:.1f},{y - h * .3:.1f} '
         f'L{x1:.1f},{sh:.1f} C{x1:.1f},{nk + h * .06:.1f} {x + cw / 2:.1f},{nk + h * .1:.1f} {x + cw / 2 - 2:.1f},{nk:.1f} Z')
    cid = uid('wb')
    by0, by1 = top + h * .4, top + h * .62
    s = [f'<clipPath id="{cid}"><path d="{d}"/></clipPath>', f'<path d="{d}" fill="{body}"/>',
         f'<g clip-path="url(#{cid})"><rect x="{x0 - 2:.1f}" y="{by0:.1f}" width="{w + 4:.1f}" height="{by1 - by0:.1f}" fill="{band}" stroke="{INK}" stroke-width="2.4"/></g>',
         f'<path d="M{x0 + w * .16:.1f},{sh + 4:.1f} V{by0 - 6:.1f} M{x0 + w * .16:.1f},{by1 + 6:.1f} V{y - h * .34:.1f}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".9"/>',
         _p(d, 'none'),
         f'<rect x="{x - cw / 2 - 1:.1f}" y="{nk - 5:.1f}" width="{cw + 2:.1f}" height="7" rx="3" fill="#fff" stroke="{INK}" stroke-width="2.4"/>',
         f'<rect x="{x - cw / 2:.1f}" y="{top:.1f}" width="{cw:.1f}" height="{chh:.1f}" rx="4" fill="{cap}" stroke="{INK}" stroke-width="{SW}"/>']
    if lab:
        fs = size or (by1 - by0) * .7
        s.append(text(x, (by0 + by1) / 2 + fs * .36, lab, size=fs, weight=700))
    return ''.join(s)
