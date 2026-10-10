"""
Bộ vẽ riêng cho Vở BT Toán 1 Tập Hai, Bài 38–41 (ôn tập cuối năm): que tính xếp số, bông hoa
(một nét viền liền để tô màu cả bông), lọ hoa, ô lục giác, chú ong, nhà, rùa, chuồng thỏ, đồng hồ,
khối hình. Nét riêng, phẳng, viền INK, màu tươi của common.py.

    import kit_l1t2_f as K
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_l1_a as KA
import kit_l1_b as KB
import kit_g9 as K9

F = 'grade1-workbook-2'
(ASSETS.parent / F).mkdir(exist_ok=True)
SW = 3
STICK = '#F2C14E'          # que tính
BOARD = '#EAF6FD'          # bảng nền xanh nhạt như khung hình của sách


def st(w=SW, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


g = KA.g
fit = KB.fit


def card(x, y, w, h, fill=BOARD, r=18, sw=2.6):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" {st(sw)}/>'


# ── que tính xếp chữ số (kiểu đồng hồ số 7 nét) ─────────────────────────────
#   a: trên, b: phải trên, c: phải dưới, d: dưới, e: trái dưới, f: trái trên, g: giữa
DIGIT = {0: 'abcdef', 1: 'bc', 2: 'abged', 3: 'abgcd', 4: 'fgbc', 5: 'afgcd', 6: 'afgedc',
         7: 'abc', 8: 'abcdefg', 9: 'abcdfg'}


def stick_digit(x, y, w, h, segs):
    """chữ số bằng que tính, góc trên trái (x, y), rộng w, cao h; segs = 'abcdefg' hoặc số"""
    if isinstance(segs, int):
        segs = DIGIT[segs]
    m = h / 2
    pos = {'a': (x, y, x + w, y), 'b': (x + w, y, x + w, y + m), 'c': (x + w, y + m, x + w, y + h),
           'd': (x, y + h, x + w, y + h), 'e': (x, y + m, x, y + h), 'f': (x, y, x, y + m),
           'g': (x, y + m, x + w, y + m)}
    return KA.sticks([pos[s] for s in segs], col=STICK)


def stick_line(x1, y1, x2, y2):
    return KA.stick(x1, y1, x2, y2, col=STICK)


# ── bông hoa: cánh là MỘT hình kín (chạm là tô cả bông) ──────────────────────
def petals_path(cx, cy, R, n=8, depth=.62, rot=-90):
    """viền cánh hoa n cánh: các cánh tròn nối nhau qua các điểm lõm bán kính R*depth"""
    pts = []
    step = 2 * math.pi / n
    a0 = math.radians(rot) - step / 2
    d = []
    for i in range(n):
        av = a0 + i * step
        an = av + step
        ap = av + step / 2
        vx, vy = cx + R * depth * math.cos(av), cy + R * depth * math.sin(av)
        nx, ny = cx + R * depth * math.cos(an), cy + R * depth * math.sin(an)
        c1 = (cx + R * 1.18 * math.cos(ap - step * .34), cy + R * 1.18 * math.sin(ap - step * .34))
        c2 = (cx + R * 1.18 * math.cos(ap + step * .34), cy + R * 1.18 * math.sin(ap + step * .34))
        if i == 0:
            d.append(f'M{vx:.1f},{vy:.1f}')
        d.append(f'C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {nx:.1f},{ny:.1f}')
    return ' '.join(d) + ' Z'


def flower(cx, cy, R, petal=WHITE, center=YELLOW, n=8, rot=-90, label=None, label_size=None, center_r=None,
           oval=None, label_rot=0):
    """bông hoa nhìn chính diện; label: chữ/số ở nhụy (oval=(rx, ry): nhụy hình bầu dục để ghi phép tính)"""
    s = [f'<path d="{petals_path(cx, cy, R, n, rot=rot)}" fill="{petal}" {st(2.6)}/>']
    if oval:
        rx, ry = oval
        s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{center}" {st(2.2)} transform="rotate({label_rot} {cx} {cy})"/>')
    else:
        s.append(f'<circle cx="{cx}" cy="{cy}" r="{center_r or R * .42:.1f}" fill="{center}" {st(2.2)}/>')
    if label is not None:
        fs = label_size or R * .5
        s.append(f'<g transform="rotate({label_rot} {cx} {cy})">{text(cx, cy + fs * .36, label, size=fs, weight=700)}</g>')
    return ''.join(s)


def leaf(x, y, L=46, rot=0, col=GREEN):
    return (f'<path d="M0,0 C{L * .3},{-L * .32} {L * .75},{-L * .3} {L},0 C{L * .75},{L * .3} {L * .3},{L * .32} 0,0 Z" '
            f'fill="{col}" {st(2.2)} transform="translate({x} {y}) rotate({rot})"/>'
            f'<path d="M{L * .1},0 L{L * .85},0" stroke="{GRASS_D}" stroke-width="1.8" stroke-linecap="round" '
            f'transform="translate({x} {y}) rotate({rot})"/>')


def stem(x1, y1, x2, y2, bend=0):
    mx, my = (x1 + x2) / 2 + bend, (y1 + y2) / 2
    return f'<path d="M{x1},{y1} Q{mx},{my} {x2},{y2}" fill="none" stroke="{GRASS_D}" stroke-width="5" stroke-linecap="round"/>'


def vase(cx, base, w=150, h=170, col=BLUE, band=WHITE):
    """lọ hoa phình, đáy ở y=base"""
    t = base - h
    rx = w / 2
    d = (f'M{cx - rx * .34},{t} L{cx + rx * .34},{t} L{cx + rx * .3},{t + h * .14} '
         f'C{cx + rx * 1.1},{t + h * .3} {cx + rx * 1.05},{t + h * .86} {cx + rx * .5},{base} '
         f'L{cx - rx * .5},{base} C{cx - rx * 1.05},{t + h * .86} {cx - rx * 1.1},{t + h * .3} {cx - rx * .3},{t + h * .14} Z')
    return (f'<path d="{d}" fill="{col}" {st()}/>'
            f'<ellipse cx="{cx}" cy="{t}" rx="{rx * .36}" ry="7" fill="{col}" {st(2.4)}/>'
            f'<path d="M{cx - rx * .72},{t + h * .5} Q{cx},{t + h * .62} {cx + rx * .72},{t + h * .5}" fill="none" '
            f'stroke="{band}" stroke-width="7" stroke-linecap="round" opacity=".85"/>'
            f'<path d="M{cx - rx * .55},{t + h * .3} Q{cx - rx * .7},{t + h * .55} {cx - rx * .5},{t + h * .78}" fill="none" '
            f'stroke="{WHITE}" stroke-width="5" stroke-linecap="round" opacity=".5"/>')


# ── ô lục giác (đỉnh nhọn hai bên) ───────────────────────────────────────────
def hexagon(cx, cy, r, fill=WHITE, label=None, size=26, col='#1F8FC9'):
    pts = ' '.join(f'{cx + r * math.cos(math.radians(a)):.1f},{cy + r * math.sin(math.radians(a)):.1f}'
                   for a in range(0, 360, 60))
    s = f'<polygon points="{pts}" fill="{fill}" {st(2.6)}/>'
    if label:
        s += text(cx, cy + size * .36, label, size=size, weight=700, fill=col)
    return s


# ── ngôi nhà có số trên mái ──────────────────────────────────────────────────
def house(cx, base, w=150, h=100, roof=ORANGE, wall=CREAM, label=None, size=30):
    t = base - h
    s = [f'<rect x="{cx - w * .4}" y="{t}" width="{w * .8}" height="{h}" fill="{wall}" {st()}/>',
         f'<path d="M{cx - w * .14},{base} L{cx - w * .14},{base - h * .5} Q{cx},{base - h * .72} {cx + w * .14},{base - h * .5} L{cx + w * .14},{base} Z" fill="{BROWN}" {st(2.4)}/>',
         f'<path d="M{cx - w * .58},{t + 4} L{cx},{t - h * .62} L{cx + w * .58},{t + 4} Z" fill="{roof}" {st()}/>']
    if label is not None:
        s.append(text(cx, t - h * .14, label, size=size, weight=700))
    return ''.join(s)


# ── chuồng thỏ có chữ trên mái ───────────────────────────────────────────────
def hutch(cx, base, w=170, h=96, label='A', wall='#FFE3B3', roof=RED):
    t = base - h
    s = [f'<rect x="{cx - w / 2}" y="{t}" width="{w}" height="{h}" fill="{wall}" {st()}/>',
         f'<path d="M{cx - w * .3},{base} L{cx - w * .3},{t + h * .3} Q{cx - w * .14},{t + h * .1} {cx + w * .02},{t + h * .3} L{cx + w * .02},{base} Z" fill="#8A6A55" {st(2.4)}/>',
         f'<path d="M{cx - w / 2 - 14},{t + 2} L{cx - w / 2 + 18},{t - 34} L{cx + w / 2 + 6},{t - 34} L{cx + w / 2 + 22},{t + 2} Z" fill="{roof}" {st()}/>',
         f'<circle cx="{cx - w * .14}" cy="{t - 16}" r="15" fill="{WHITE}" {st(2.4)}/>',
         text(cx - w * .14, t - 8, label, size=21, weight=700)]
    for i in range(3):
        y = t + h * .3 + i * 18
        s.append(f'<line x1="{cx + w * .14}" y1="{y}" x2="{cx + w * .42}" y2="{y}" stroke="{BROWN}" stroke-width="2.4" stroke-linecap="round"/>')
    return ''.join(s)


# ── chú ong mang phép tính trên thân ─────────────────────────────────────────
def bee(cx, cy, label, k=1.0, flip=False):
    s = [f'<ellipse cx="-14" cy="-34" rx="16" ry="26" fill="#E8F6FF" {st(2.4)} transform="rotate(-25 -14 -34)"/>',
         f'<ellipse cx="10" cy="-36" rx="14" ry="24" fill="#E8F6FF" {st(2.4)} transform="rotate(20 10 -36)"/>',
         f'<path d="M-50,4 L-62,2 L-50,-4 Z" fill="{INK}"/>',
         f'<ellipse cx="-4" cy="0" rx="48" ry="26" fill="{YELLOW}" {st()}/>']
    for x in (-40, -29):
        s.append(f'<path d="M{x},-21 Q{x - 5},0 {x},21" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<rect x="-20" y="-14" width="62" height="28" rx="8" fill="{WHITE}" {st(2)}/>')
    s.append(f'<circle cx="52" cy="-8" r="18" fill="{YELLOW}" {st()}/>')
    s.append(f'<circle cx="57" cy="-12" r="4" fill="{INK}"/><circle cx="58.5" cy="-13.5" r="1.4" fill="#fff"/>')
    s.append(f'<path d="M54,0 q5,4 10,0" fill="none" {st(2)}/>')
    s.append(f'<path d="M46,-24 Q42,-40 34,-44 M56,-25 Q60,-42 68,-44" fill="none" {st(2.2)}/>')
    s.append(f'<circle cx="34" cy="-44" r="3" fill="{INK}"/><circle cx="68" cy="-44" r="3" fill="{INK}"/>')
    inner = ''.join(s)
    body = g(cx, cy, inner, k, flip=flip)
    return body + text(cx + (11 if not flip else -11) * k, cy + 7 * k, label, size=18 * k, weight=700)


# ── rùa mang phép tính trên mai ──────────────────────────────────────────────
def turtle(cx, base, label, k=1.0, shell=GREEN, skin='#C8E6A0', flip=False):
    s = [f'<ellipse cx="62" cy="-34" rx="20" ry="16" fill="{skin}" {st()}/>',
         f'<circle cx="68" cy="-38" r="5" fill="{WHITE}" {st(1.8)}/><circle cx="69.5" cy="-38" r="2.6" fill="{INK}"/>',
         f'<path d="M66,-26 q6,3 10,-2" fill="none" {st(2)}/>']
    for x in (-34, -6, 18, 40):
        s.append(f'<ellipse cx="{x}" cy="-6" rx="11" ry="8" fill="{skin}" {st(2.4)}/>')
    s.append(f'<path d="M-58,-14 L-72,-8 L-56,-6 Z" fill="{skin}" {st(2.2)}/>')
    s.append(f'<path d="M-60,-10 Q-56,-74 0,-76 Q54,-74 58,-10 Z" fill="{shell}" {st()}/>')
    s.append(f'<path d="M-62,-10 L60,-10" {st(3.2)}/>')
    inner = ''.join(s)
    out = g(cx, base, inner, k, flip=flip)
    return out + f'<rect x="{cx - 34 * k}" y="{base - 60 * k}" width="{68 * k}" height="{32 * k}" rx="{9 * k}" fill="{WHITE}" {st(2)}/>' \
        + text(cx, base - 37 * k, label, size=21 * k, weight=700)


# ── đồng hồ kim (kim ngắn, kim dài dừng trước vòng số) ───────────────────────
def clock(cx, cy, r, h=None, m=0, rim=BLUE, face='#F7FCFF', hour=True, minute=True, bells=False, legs=False):
    s = []
    if bells:
        for sx in (-1, 1):
            a = math.radians(-90 + sx * 40)
            bx, by = cx + r * 1.0 * math.cos(a), cy + r * 1.0 * math.sin(a)
            s.append(f'<path d="M{bx - r * .3:.1f},{by + r * .12:.1f} A{r * .3:.1f},{r * .3:.1f} 0 0 1 {bx + r * .3:.1f},{by + r * .12:.1f} Z" '
                     f'fill="{YELLOW}" {st()} transform="rotate({sx * 38} {bx:.1f} {by:.1f})"/>')
        s.append(f'<path d="M{cx - r * .5},{cy - r * 1.12} Q{cx},{cy - r * 1.42} {cx + r * .5},{cy - r * 1.12}" fill="none" {st(4)}/>')
        s.append(f'<rect x="{cx - 6}" y="{cy - r * 1.2}" width="12" height="{r * .22:.1f}" fill="{GREY}" {st(2.2)}/>')
    if legs:
        for sx in (-1, 1):
            s.append(f'<path d="M{cx + sx * r * .55:.1f},{cy + r * .78:.1f} L{cx + sx * r * .78:.1f},{cy + r * 1.1:.1f}" {st(6)}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{rim}" {st()}/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .84:.1f}" fill="{face}" {st(2)}/>')
    for i in range(60):
        a = math.radians(i * 6)
        r1 = r * (.75 if i % 5 == 0 else .79)
        r2 = r * .83
        s.append(f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" x2="{cx + r2 * math.sin(a):.1f}" '
                 f'y2="{cy - r2 * math.cos(a):.1f}" stroke="{INK}" stroke-width="{1.6 if i % 5 == 0 else .7}"/>')
    fs = r * .24
    for n in range(1, 13):
        a = math.radians(n * 30)
        rr = r * .6
        s.append(text(f'{cx + rr * math.sin(a):.1f}', f'{cy - rr * math.cos(a) + fs * .36:.1f}', n, size=f'{fs:.1f}', weight=700))
    # kim dài tới r*.44: dừng trước vòng số (số nằm từ r*.6 - fs/2 ≈ r*.48)
    if hour and h is not None:
        ah = math.radians((h % 12) * 30 + m * .5)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .3 * math.sin(ah):.1f}" y2="{cy - r * .3 * math.cos(ah):.1f}" '
                 f'stroke="{INK}" stroke-width="{max(3.5, r * .085):.1f}" stroke-linecap="round"/>')
    if minute:
        am = math.radians(m * 6)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .44 * math.sin(am):.1f}" y2="{cy - r * .44 * math.cos(am):.1f}" '
                 f'stroke="{RED}" stroke-width="{max(2.5, r * .05):.1f}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{max(3, r * .06):.1f}" fill="{INK}"/>')
    return '\n'.join(s)


# ── khối hình viền mực (để tô màu: mỗi mặt là một hình kín) ──────────────────
def box3d(x, y, w, h, dx, dy, fill=WHITE, sw=3):
    """mặt trước góc trên trái (x, y), chiều sâu (dx, dy) (dy âm: lên)"""
    return (f'<path d="M{x},{y} L{x + dx},{y + dy} L{x + w + dx},{y + dy} L{x + w},{y} Z" fill="{fill}" {st(sw)}/>'
            f'<path d="M{x + w},{y} L{x + w + dx},{y + dy} L{x + w + dx},{y + h + dy} L{x + w},{y + h} Z" fill="{fill}" {st(sw)}/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {st(sw)}/>')


def solid_box(x, y, w, h, d, cols=('#9ED8F5', '#CFEFFF', '#5FAEDC'), sw=2.6):
    """khối hộp màu (mặt trước, mặt trên, mặt bên)"""
    f, t, sd = cols
    dx, dy = d, -d * .8
    return (f'<path d="M{x},{y} L{x + dx},{y + dy} L{x + w + dx},{y + dy} L{x + w},{y} Z" fill="{t}" {st(sw)}/>'
            f'<path d="M{x + w},{y} L{x + w + dx},{y + dy} L{x + w + dx},{y + h + dy} L{x + w},{y + h} Z" fill="{sd}" {st(sw)}/>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{f}" {st(sw)}/>')


def rabbit(run=True, fur='#F4EEFA'):
    return K9.rabbit(fur=fur, run=run)
