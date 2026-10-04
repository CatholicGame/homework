"""
Bộ vẽ riêng cho Vở bài tập Toán 1, Bài 2–6 (nhiều hơn / ít hơn, hình vuông,
hình tròn, hình tam giác, các số 1 2 3). Nét riêng, cùng phong cách common.py:
phẳng, dễ thương, viền đậm INK, màu tươi.
Mỗi hàm vẽ quanh điểm (x, y) = giữa chân / đáy của vật.
"""
import math
from common import *

SW = 3


def st(w=SW, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def g(x, y, inner, k=1.0, rot=0, flip=False):
    fx = -k if flip else k
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.3f},{k:.3f})">{inner}</g>'


# ─────────────────────────── cảnh nền ───────────────────────────
def board(w, h, bg=WHITE, r=22):
    return f'<rect x="3" y="3" width="{w - 6}" height="{h - 6}" rx="{r}" fill="{bg}" {st(3)}/>'


def sky_grass(w, h, horizon, r=22, sky=SKY, grass=GRASS):
    cid = f'clip{w}x{h}x{horizon}'
    return (f'<defs><clipPath id="{cid}"><rect x="3" y="3" width="{w - 6}" height="{h - 6}" rx="{r}"/></clipPath></defs>'
            f'<g clip-path="url(#{cid})"><rect width="{w}" height="{h}" fill="{sky}"/>'
            f'<path d="M0,{horizon} Q{w * .3},{horizon - 18} {w * .55},{horizon - 4} T{w},{horizon - 10} L{w},{h} L0,{h} Z" fill="{grass}"/></g>'
            f'<rect x="3" y="3" width="{w - 6}" height="{h - 6}" rx="{r}" fill="none" {st(3)}/>')


def cloud(x, y, k=1.0):
    return g(x, y, f'<path d="M-40,10 Q-46,-10 -24,-12 Q-18,-30 4,-26 Q22,-36 34,-18 Q52,-14 44,10 Z" fill="#fff" {st(2.4)}/>', k)


# ─────────────────────────── cây ───────────────────────────
def fruit_tree(x, y, k=1.0, crown=GREEN, fruit=RED):
    """cây có quả: tán tròn xanh đậm, quả đỏ"""
    s = [f'<path d="M-9,0 L-6,-62 L6,-62 L9,0 Z" fill="{BROWN}" {st()}/>',
         f'<path d="M-6,-50 L-22,-70 M6,-56 L20,-74" fill="none" {st(3)}/>',
         f'<path d="M-54,-84 C-70,-110 -50,-140 -26,-134 C-20,-160 22,-162 30,-136 C56,-142 70,-110 54,-84 '
         f'C60,-62 30,-54 0,-60 C-30,-54 -62,-62 -54,-84 Z" fill="{crown}" {st()}/>']
    for fx, fy in ((-30, -100), (8, -124), (34, -94), (-6, -80), (-36, -72), (28, -70)):
        s.append(f'<circle cx="{fx}" cy="{fy}" r="8" fill="{fruit}" {st(2.2)}/>'
                 f'<circle cx="{fx - 2.5}" cy="{fy - 2.5}" r="2.2" fill="#fff" opacity=".7"/>')
    return g(x, y, ''.join(s), k)


def leafy_tree(x, y, k=1.0, leaf='#C9E77C'):
    """cây không có quả: thân cành rõ, tán lá nhạt hình giọt"""
    s = [f'<path d="M-8,0 L-5,-58 L5,-58 L8,0 Z" fill="{BROWN}" {st()}/>',
         f'<ellipse cx="0" cy="-108" rx="50" ry="56" fill="{leaf}" {st()}/>',
         f'<path d="M0,-58 L0,-130 M0,-80 L-24,-104 M0,-96 L24,-120 M0,-116 L-14,-136" fill="none" {st(3, BROWN)}/>']
    for lx, ly, rot in ((-30, -126, -30), (28, -138, 30), (-34, -88, -50), (32, -96, 40), (8, -150, 0), (-14, -150, -20)):
        s.append(f'<ellipse cx="{lx}" cy="{ly}" rx="5" ry="9" fill="{GRASS}" {st(1.6)} transform="rotate({rot} {lx} {ly})"/>')
    return g(x, y, ''.join(s), k)


# ─────────────────────────── đồ vật ───────────────────────────
def flower(x, y, k=1.0, petal=PINK):
    s = [f'<path d="M0,0 Q-4,-26 0,-48" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>',
         f'<path d="M-1,-16 q-16,-4 -18,-16 q14,0 18,13 Z" fill="{GREEN}" {st(2)}/>',
         f'<path d="M0,-26 q16,-4 18,-16 q-14,0 -18,13 Z" fill="{GREEN}" {st(2)}/>']
    for i in range(5):
        a = -math.pi / 2 + i * 2 * math.pi / 5
        s.append(f'<circle cx="{10 * math.cos(a):.1f}" cy="{-50 + 10 * math.sin(a):.1f}" r="8" fill="{petal}" {st(2.4)}/>')
    s.append(f'<circle cx="0" cy="-50" r="6" fill="{YELLOW}" {st(2.4)}/>')
    return g(x, y, ''.join(s), k)


def orange(x, y, k=1.0, col=ORANGE):
    s = (f'<circle cx="0" cy="-20" r="20" fill="{col}" {st()}/>'
         f'<ellipse cx="-7" cy="-27" rx="5" ry="3.4" fill="#fff" opacity=".6"/>'
         f'<path d="M0,-40 q2,-6 0,-9" fill="none" {st(3, BROWN)}/>'
         f'<path d="M1,-42 q10,-10 16,-4 q-8,8 -16,4 Z" fill="{GREEN}" {st(2)}/>')
    return g(x, y, s, k)


def cap(x, y, k=1.0, col=RED, brim=YELLOW):
    """mũ lưỡi trai, lưỡi trai quay sang phải"""
    s = (f'<path d="M20,-4 Q58,-6 66,4 Q40,10 14,6 Z" fill="{brim}" {st()}/>'
         f'<path d="M-40,4 Q-42,-44 0,-46 Q38,-44 36,4 Z" fill="{col}" {st()}/>'
         f'<path d="M0,-46 L-2,4 M-24,-36 Q-30,-14 -26,4" fill="none" {st(2.2)}/>'
         f'<circle cx="0" cy="-47" r="4.5" fill="{brim}" {st(2.2)}/>')
    return g(x, y, s, k)


def girl_head(x, y, k=1.0, hair=HAIR, bow=PINK, shirt=PURPLE):
    """bé gái tóc hai bím (đầu và cổ áo), y = đáy cổ áo"""
    s = [f'<path d="M-46,0 Q-44,-30 -20,-34 L20,-34 Q44,-30 46,0 Z" fill="{shirt}" {st()}/>',
         f'<path d="M-14,-34 L0,-22 L14,-34" fill="#fff" {st(2.4)}/>']
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{sx * 46}" cy="-78" rx="12" ry="18" fill="{hair}" {st()}/>')
        s.append(f'<path d="M{sx * 40},-102 l{sx * 14},-8 l0,16 Z M{sx * 40},-102 l{sx * -2},-14 l{sx * 12},6 Z" fill="{bow}" {st(2)}/>')
    s.append(f'<ellipse cx="0" cy="-80" rx="40" ry="40" fill="{SKIN}" {st()}/>')
    s.append(f'<path d="M-42,-78 Q-44,-124 0,-122 Q44,-124 42,-78 Q30,-104 6,-98 Q-20,-108 -42,-78 Z" fill="{hair}" {st()}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 14}" cy="-76" r="4" fill="{INK}"/><circle cx="{sx * 14 + 1.3}" cy="-77.4" r="1.3" fill="#fff"/>')
        s.append(f'<circle cx="{sx * 24}" cy="-64" r="5" fill="{PINK}" opacity=".7"/>')
    s.append(f'<path d="M-7,-60 Q0,-53 7,-60" fill="none" {st(2.6)}/>')
    return g(x, y, ''.join(s), k)


def crane(x, y, k=1.0, col='#F7A1C4', dark='#E879A8'):
    """hạc giấy (origami), nhìn nghiêng, đầu quay trái"""
    s = (f'<path d="M-6,-96 L18,-30 L-26,-36 Z" fill="{col}" {st()}/>'          # cánh sau dựng đứng
         f'<path d="M-30,-20 L40,-20 L10,0 Z" fill="{dark}" {st()}/>'              # thân dưới
         f'<path d="M-30,-20 L-8,-48 L40,-20 Z" fill="{col}" {st()}/>'             # thân trên
         f'<path d="M-30,-20 L-50,-62 L-42,-62 L-20,-28 Z" fill="{col}" {st()}/>' # cổ
         f'<path d="M-50,-62 L-62,-56 L-44,-58 Z" fill="{dark}" {st(2.4)}/>'      # mỏ
         f'<path d="M40,-20 L58,-58 L48,-24 Z" fill="{col}" {st()}/>'              # đuôi
         f'<path d="M8,-90 L30,-26 L-4,-34 Z" fill="#FBD3E3" {st()}/>')            # cánh trước
    return g(x, y, s, k)


def paper_boat(x, y, k=1.0, col=BLUE, light='#CFE8FA'):
    s = (f'<path d="M-56,-26 L56,-26 L38,0 L-38,0 Z" fill="{col}" {st()}/>'
         f'<path d="M-30,-26 L0,-62 L30,-26 Z" fill="{light}" {st()}/>'
         f'<path d="M0,-62 L0,-26" fill="none" {st(2.2)}/>')
    return g(x, y, s, k)


def star(cx, cy, r=26, col=YELLOW):
    p = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * .45
        p.append(f'{cx + rr * math.cos(a):.1f},{cy + rr * math.sin(a):.1f}')
    return f'<polygon points="{" ".join(p)}" fill="{col}" {st()}/>'


def balloon(x, y, k=1.0, col=RED):
    """y = đầu dưới sợi dây"""
    s = (f'<path d="M0,-50 Q-8,-30 4,-16 Q-6,-6 0,0" fill="none" {st(2.2)}/>'
         f'<ellipse cx="0" cy="-86" rx="26" ry="32" fill="{col}" {st()}/>'
         f'<path d="M-5,-54 L5,-54 L0,-49 Z" fill="{col}" {st(2.2)}/>'
         f'<ellipse cx="-9" cy="-98" rx="5" ry="9" fill="#fff" opacity=".55" transform="rotate(20 -9 -98)"/>')
    return g(x, y, s, k)


def bird(x, y, k=1.0, col=BLUE, wing='#CFE8FA', flip=False):
    """chim đang bay, đầu quay phải, (x, y) = giữa thân"""
    s = (f'<path d="M-30,4 L-54,-6 L-50,10 L-56,22 Z" fill="{col}" {st()}/>'
         f'<ellipse cx="0" cy="4" rx="34" ry="18" fill="{col}" {st()}/>'
         f'<circle cx="32" cy="-8" r="14" fill="{col}" {st()}/>'
         f'<path d="M44,-10 L56,-5 L44,-1 Z" fill="{ORANGE}" {st(2.2)}/>'
         f'<circle cx="36" cy="-11" r="3" fill="{INK}"/>'
         f'<path d="M-6,0 Q-20,-46 10,-56 Q8,-24 14,2 Z" fill="{wing}" {st()}/>')
    return g(x, y, s, k, flip=flip)


def chick(x, y, k=1.0, col=YELLOW, dark=ORANGE):
    """gà con đứng, y = chân"""
    s = []
    for fx in (-10, 10):
        s.append(f'<path d="M{fx},-22 L{fx},-2" {st(4, dark)}/>')
        s.append(f'<path d="M{fx - 8},0 L{fx},-4 L{fx + 10},0" fill="none" {st(3, dark)}/>')
    s.append(f'<ellipse cx="-4" cy="-46" rx="36" ry="28" fill="{col}" {st()}/>')
    s.append(f'<path d="M-24,-50 Q-8,-38 8,-48 Q0,-24 -18,-30 Q-26,-38 -24,-50 Z" fill="{dark}" opacity=".45" {st(2.4)}/>')
    s.append(f'<circle cx="22" cy="-78" r="22" fill="{col}" {st()}/>')
    s.append(f'<path d="M14,-98 q2,-12 8,-4 q4,-10 8,2" fill="{col}" {st(2.4)}/>')
    s.append(f'<path d="M42,-82 L56,-76 L42,-70 Z" fill="{dark}" {st(2.4)}/>')
    s.append(f'<circle cx="30" cy="-84" r="4" fill="{INK}"/><circle cx="31.4" cy="-85.4" r="1.4" fill="#fff"/>')
    s.append(f'<circle cx="28" cy="-70" r="4.5" fill="{PINK}" opacity=".75"/>')
    return g(x, y, ''.join(s), k)


# ─────────────────────────── hình học ───────────────────────────
def poly(pts, fill=WHITE, w=3):
    return f'<polygon points="{" ".join(f"{a:.1f},{b:.1f}" for a, b in pts)}" fill="{fill}" {st(w)}/>'


def sq(x, y, s, fill=WHITE, w=3):
    return f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="{fill}" {st(w)}/>'


def circ(cx, cy, r, fill=WHITE, w=3):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" {st(w)}/>'


def stick(x1, y1, x2, y2, col='#F2C14E', w=7):
    """que tính: thân vàng viền mực"""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="{w + 4}" stroke-linecap="round"/>'
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>')


def shrink(x1, y1, x2, y2, gap=7):
    """rút ngắn hai đầu que để các que không chồng lên nhau ở góc"""
    L = math.hypot(x2 - x1, y2 - y1)
    ux, uy = (x2 - x1) / L, (y2 - y1) / L
    return x1 + ux * gap, y1 + uy * gap, x2 - ux * gap, y2 - uy * gap


def sticks(segs, col='#F2C14E'):
    return ''.join(stick(*shrink(*s), col=col) for s in segs)


def dot_card(x, y, s, n, fill=WHITE, dot=RED):
    """ô vuông có n chấm tròn xếp chéo (1, 2, 3 chấm như mặt xúc xắc)"""
    out = [f'<rect x="{x}" y="{y}" width="{s}" height="{s}" rx="{s * .12:.1f}" fill="{fill}" {st()}/>']
    pos = {1: [(.5, .5)], 2: [(.32, .34), (.68, .66)], 3: [(.26, .26), (.5, .5), (.74, .74)]}[n]
    for px, py in pos:
        out.append(f'<circle cx="{x + px * s:.1f}" cy="{y + py * s:.1f}" r="{s * .1:.1f}" fill="{dot}" {st(2)}/>')
    return ''.join(out)
