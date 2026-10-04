"""
Bộ vẽ cho Vở BT Toán 1, Bài 7–12 (scripts/redraw/g1_bai7.py … g1_bai12.py).
Mỗi hình con trả về (svg, (x0, y0, x1, y1)) theo toạ độ cục bộ; fit() đặt nó vừa một ô.
Nét riêng, phẳng, viền INK. Dùng lại vài hình của các bộ kit_g1, g4, g6, g8, g9, p1, p2.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g1 as K1
import kit_g4 as K4
import kit_g6 as K6
import kit_g8 as K8
import kit_g9 as K9
import kit_p1 as KP1
import kit_p2 as KP2

SW = 3


def st(w=SW, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def fit(sprite, cx, cy, w, h, flip=False, rot=0):
    """Đặt sprite (svg, bbox) vừa khung w×h, tâm (cx, cy)."""
    svg, (x0, y0, x1, y1) = sprite
    k = min(w / (x1 - x0), h / (y1 - y0))
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    sx = -k if flip else k
    return (f'<g transform="translate({cx:.1f},{cy:.1f}) rotate({rot}) scale({sx:.4f},{k:.4f}) '
            f'translate({-mx:.1f},{-my:.1f})">{svg}</g>')


def panel(x, y, w, h, fill='#FFFDF6'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="16" fill="{fill}" {st(2.6, "#B9B2A8")}/>'


def box(x, y, s, fill=WHITE, txt=None, size=None, col=INK):
    out = f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="4" fill="{fill}" {st(2.6)}/>'
    if txt is not None:
        out += text(x + s / 2, y + s * .72, txt, size=size or s * .62, weight=700, fill=col)
    return out


# ── con vật, người ──────────────────────────────────────────────────────────

def bird(col=BLUE, wing='#4E9BD6'):
    s = [f'<path d="M-34,6 L-52,-4 L-50,14 Z" fill="{wing}" {st()}/>',
         f'<ellipse cx="-6" cy="4" rx="32" ry="18" fill="{col}" {st()}/>',
         f'<ellipse cx="-2" cy="12" rx="18" ry="8" fill="{WHITE}" opacity=".6"/>',
         f'<circle cx="24" cy="-8" r="15" fill="{col}" {st()}/>',
         f'<path d="M37,-10 L52,-4 L37,0 Z" fill="{ORANGE}" {st(2.4)}/>',
         f'<circle cx="28" cy="-12" r="3" fill="{INK}"/><circle cx="29" cy="-13" r="1" fill="#fff"/>',
         f'<circle cx="24" cy="-2" r="3.4" fill="{PINK}" opacity=".7"/>',
         f'<path d="M-10,0 C-16,-30 -2,-50 14,-48 C10,-30 6,-12 -10,0 Z" fill="{wing}" {st()}/>']
    return ''.join(s), (-54, -50, 54, 24)


def kid(girl=False, shirt=BLUE, bottom='#4E8FC8', hair=HAIR, pose='wave'):
    return K1.kid(0, 0, h=260, girl=girl, shirt=shirt, bottom=bottom, hair=hair, pose=pose), (-70, -262, 70, 2)


def dog(col='#F2D7B5', spot=BROWN):
    s = [K9.limb('M-24,-20 L-26,-2', col, 9), K9.limb('M-12,-20 L-12,-2', col, 9),
         K9.limb('M16,-20 L16,-2', col, 9), K9.limb('M26,-20 L28,-2', col, 9),
         f'<path d="M-34,-34 Q-50,-48 -46,-30" fill="none" {st(5)}/>',
         f'<ellipse cx="0" cy="-30" rx="36" ry="17" fill="{col}" {st()}/>',
         f'<ellipse cx="-10" cy="-36" rx="9" ry="7" fill="{spot}"/>',
         f'<circle cx="34" cy="-54" r="20" fill="{col}" {st()}/>',
         f'<ellipse cx="22" cy="-50" rx="8" ry="15" fill="{spot}" {st(2.4)} transform="rotate(20 22 -50)"/>',
         f'<ellipse cx="48" cy="-48" rx="9" ry="7" fill="{WHITE}" {st(2)}/>',
         f'<circle cx="55" cy="-50" r="3.6" fill="{INK}"/>',
         f'<circle cx="38" cy="-58" r="3" fill="{INK}"/><circle cx="39" cy="-59" r="1" fill="#fff"/>',
         f'<path d="M44,-42 Q48,-38 52,-42" fill="none" {st(2)}/>']
    return ''.join(s), (-50, -76, 60, 2)


def rabbit():
    return K9.rabbit(), (-44, -78, 44, 2)


def duck():
    return K9.duck(), (-30, -58, 34, 2)


# ── đồ vật ──────────────────────────────────────────────────────────────────

def rocking_horse(col='#F4C27A', mane=BROWN):
    s = [f'<path d="M-60,4 Q0,26 60,4" fill="none" stroke="{INK}" stroke-width="9" stroke-linecap="round"/>',
         f'<path d="M-60,4 Q0,26 60,4" fill="none" stroke="{RED}" stroke-width="4" stroke-linecap="round"/>']
    for x1, x2 in ((-34, -40), (-20, -24), (22, 24), (36, 42)):
        s.append(K9.limb(f'M{x1},-30 L{x2},6', col, 9))
    s += [f'<path d="M-46,-40 Q-60,-36 -58,-16" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>',
          f'<path d="M-46,-40 Q-60,-36 -58,-16" fill="none" stroke="{mane}" stroke-width="4" stroke-linecap="round"/>',
          f'<rect x="-46" y="-50" width="92" height="28" rx="14" fill="{col}" {st()}/>',
          f'<path d="M-12,-50 Q0,-60 12,-50 Z" fill="{RED}" {st(2.4)}/>',
          f'<path d="M30,-46 L40,-82 L56,-82 L44,-40 Z" fill="{col}" {st()}/>',
          f'<rect x="38" y="-96" width="36" height="22" rx="10" fill="{col}" {st()}/>',
          f'<path d="M42,-96 L44,-108 L52,-98 Z" fill="{col}" {st(2.4)}/>',
          f'<path d="M38,-92 Q28,-78 34,-56" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>',
          f'<path d="M38,-92 Q28,-78 34,-56" fill="none" stroke="{mane}" stroke-width="4" stroke-linecap="round"/>',
          f'<circle cx="54" cy="-88" r="2.8" fill="{INK}"/><circle cx="69" cy="-82" r="1.8" fill="{INK}"/>']
    return ''.join(s), (-64, -110, 76, 20)


def paddle(col=RED):
    s = [f'<rect x="-8" y="26" width="16" height="40" rx="6" fill="{BROWN}" {st()}/>',
         f'<circle cx="0" cy="0" r="34" fill="{col}" {st()}/>',
         f'<path d="M-20,-16 Q-12,-26 2,-28" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>']
    return ''.join(s), (-36, -36, 36, 68)


def bicycle(col=TEAL):
    s = []
    for wx in (-40, 40):
        s.append(f'<circle cx="{wx}" cy="0" r="24" fill="none" stroke="{INK}" stroke-width="5"/>'
                 f'<circle cx="{wx}" cy="0" r="4" fill="{INK}"/>')
    fr = f'M-40,0 L-10,0 L-22,-34 Z M-10,0 L26,-34 L-22,-34 M26,-34 L40,0 M26,-34 L22,-46'
    s.append(f'<path d="{fr}" fill="none" stroke="{INK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"/>')
    s.append(f'<path d="{fr}" fill="none" stroke="{col}" stroke-width="3.6" stroke-linejoin="round" stroke-linecap="round"/>')
    s.append(f'<path d="M-32,-40 H-14" {st(6)}/><path d="M16,-48 H32" {st(6)}/>')
    s.append(f'<circle cx="-10" cy="0" r="6" fill="{GREY}" {st(2)}/>')
    return ''.join(s), (-66, -52, 66, 26)


def banana():
    return K4.s_banana(0, 0, L=60, rot=-60), (-30, -30, 30, 30)


def tree():
    return K6.tree(0, 0, 1.0), (-54, -124, 54, 2)


def pencil(col=YELLOW):
    return K1.pencil(-36, 36, 36, -36, w=16, body=col), (-46, -46, 46, 46)


def car(col=RED):
    return K8.car(col), (4, 4, 238, 84)


def dress(col=PINK):
    s = [f'<path d="M-18,-40 L-36,-30 L-44,-12 L-30,-6 L-24,-18 L-34,30 Q0,40 34,30 L24,-18 L30,-6 L44,-12 L36,-30 L18,-40 Q0,-30 -18,-40 Z" fill="{col}" {st()}/>',
         f'<path d="M-30,24 Q0,32 30,24" fill="none" stroke="#fff" stroke-width="3" stroke-dasharray="4 5" stroke-linecap="round"/>',
         f'<circle cx="0" cy="-20" r="3" fill="#fff" {st(1.6)}/><circle cx="0" cy="-8" r="3" fill="#fff" {st(1.6)}/>']
    return ''.join(s), (-46, -42, 46, 38)


def shirt(col=BLUE):
    s = [f'<path d="M-20,-40 L-44,-30 L-54,-6 L-36,0 L-30,-14 L-30,40 H30 L30,-14 L36,0 L54,-6 L44,-30 L20,-40 Q0,-26 -20,-40 Z" fill="{col}" {st()}/>',
         f'<path d="M-20,-40 Q0,-26 20,-40" fill="none" {st(2.6)}/>',
         f'<rect x="10" y="-6" width="12" height="12" rx="2" fill="none" {st(2)}/>']
    return ''.join(s), (-56, -42, 56, 42)


def cap(col=RED):
    s = [f'<path d="M24,6 Q60,4 66,14 Q40,20 12,14 Z" fill="{col}" {st()}/>',
         f'<path d="M-40,12 Q-42,-34 0,-34 Q36,-32 30,12 Z" fill="{col}" {st()}/>',
         f'<path d="M-6,-34 Q-10,-10 -6,12" fill="none" {st(2)} opacity=".6"/>',
         f'<circle cx="-4" cy="-35" r="4" fill="{col}" {st(2)}/>']
    return ''.join(s), (-42, -40, 68, 20)


def pineapple():
    s = []
    for a in (-40, -20, 0, 20, 40):
        s.append(f'<path d="M0,-34 Q{a * .6},-60 {a * .9},-80 Q{a * .2 + 4},-56 6,-34 Z" fill="{GREEN}" {st(2.4)} transform="rotate({a * .2} 0 -34)"/>')
    s.append(f'<ellipse cx="2" cy="10" rx="34" ry="46" fill="{YELLOW}" {st()}/>')
    cid = K1.uid('pine')
    s.append(f'<clipPath id="{cid}"><ellipse cx="2" cy="10" rx="34" ry="46"/></clipPath><g clip-path="url(#{cid})">')
    for k in range(-6, 7):
        s.append(f'<line x1="{k * 14 - 40}" y1="-40" x2="{k * 14 + 40}" y2="60" stroke="{ORANGE}" stroke-width="2.4"/>')
        s.append(f'<line x1="{k * 14 + 40}" y1="-40" x2="{k * 14 - 40}" y2="60" stroke="{ORANGE}" stroke-width="2.4"/>')
    s.append('</g>')
    s.append(f'<ellipse cx="2" cy="10" rx="34" ry="46" fill="none" {st()}/>')
    return ''.join(s), (-38, -82, 42, 58)


def sailboat(col=RED, hull=BROWN):
    s = [f'<path d="M-50,10 H50 L36,30 H-36 Z" fill="{hull}" {st()}/>',
         f'<line x1="0" y1="10" x2="0" y2="-62" {st(3.4)}/>',
         f'<path d="M4,-58 L44,2 H4 Z" fill="{col}" {st()}/>',
         f'<path d="M-4,-44 L-34,2 H-4 Z" fill="{YELLOW}" {st()}/>',
         f'<path d="M-58,36 Q-44,30 -30,36 T-2,36 T26,36 T54,36" fill="none" stroke="{WATER_D}" stroke-width="3.4" stroke-linecap="round"/>']
    return ''.join(s), (-60, -64, 60, 40)


def potted_flower(petal=RED):
    s = [K6.flower(0, -20, 1.4, petal=petal),
         f'<path d="M-20,-22 H20 L15,14 H-15 Z" fill="{ORANGE}" {st()}/>',
         f'<rect x="-23" y="-28" width="46" height="10" rx="3" fill="{ORANGE}" {st()}/>']
    return ''.join(s), (-26, -100, 26, 16)


def daisy(petal=YELLOW):
    return K6.flower(0, 0, 1.4, petal=petal), (-24, -88, 24, 2)


def cup(col=TEAL):
    s = [f'<path d="M22,-28 Q44,-28 44,-8 Q44,12 20,10" fill="none" stroke="{INK}" stroke-width="10"/>',
         f'<path d="M22,-28 Q44,-28 44,-8 Q44,12 20,10" fill="none" stroke="{col}" stroke-width="5"/>',
         f'<path d="M-30,-40 H30 L24,30 Q22,36 16,36 H-16 Q-22,36 -24,30 Z" fill="{col}" {st()}/>',
         f'<ellipse cx="0" cy="-40" rx="30" ry="6" fill="#E9F7FB" {st(2.6)}/>',
         f'<path d="M-18,-26 L-14,22" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>']
    return ''.join(s), (-32, -48, 50, 38)


def ball():
    return KP1.soccer_ball(0, 0, r=30), (-32, -62, 32, 2)


def apple():
    return KP2.apple(0, 0), (-58, -70, 58, 56)


def carrot():
    return KP2.carrot(0, 0), (-120, -90, 98, 58)


def circle_shape(col=BLUE):
    return f'<circle cx="0" cy="0" r="30" fill="{col}" {st()}/>', (-32, -32, 32, 32)


def triangle_shape(col=ORANGE):
    return f'<path d="M0,-30 L34,28 H-34 Z" fill="{col}" {st()}/>', (-36, -32, 36, 30)


# ── xúc xắc, tháp ô vuông ───────────────────────────────────────────────────

DICE_PIPS = {
    1: [(0, 0)], 2: [(-1, -1), (1, 1)], 3: [(-1, -1), (0, 0), (1, 1)],
    4: [(-1, -1), (1, -1), (-1, 1), (1, 1)], 5: [(-1, -1), (1, -1), (0, 0), (-1, 1), (1, 1)],
}


def dice(cx, cy, s, n, rot=0, pip=INK, fill=WHITE):
    """Mặt xúc xắc cạnh s, tâm (cx, cy), n chấm."""
    r = s * .1
    d = s * .27
    pips = ''.join(f'<circle cx="{px * d:.1f}" cy="{py * d:.1f}" r="{r:.1f}" fill="{pip}"/>' for px, py in DICE_PIPS[n])
    return (f'<g transform="translate({cx},{cy}) rotate({rot})">'
            f'<rect x="{-s / 2}" y="{-s / 2}" width="{s}" height="{s}" rx="{s * .16}" fill="{fill}" {st(2.8)}/>{pips}</g>')


def tower(x, base, n, cell=34, col=YELLOW):
    """Cột n ô vuông xếp chồng, góc trái dưới (x, base)."""
    return ''.join(f'<rect x="{x}" y="{base - (i + 1) * cell}" width="{cell}" height="{cell}" rx="3" fill="{col}" {st(2.6)}/>'
                   for i in range(n))
