"""
Bộ vẽ riêng cho nhóm p2 (Lớp 3 Luyện tập): con vật, rau củ, trái cây, mây — nét riêng.
Mỗi hàm vẽ trong toạ độ CỤC BỘ rồi place() dịch/thu phóng về vị trí thật.
"""
import math
from common import *

MONKEY_FUR, MONKEY_L = '#9A6A45', '#F6DDBE'
LION_FUR, LION_MANE = '#F2B75B', '#C9702F'
ELE, ELE_L = '#A9B7C9', '#C9D3E0'


def place(svg, x, y, s=1.0, flip=False):
    sx = -s if flip else s
    return f'<g transform="translate({x},{y}) scale({sx},{s})">{svg}</g>'


def limb(d, color, w, ink=3):
    """nét dày có viền: vẽ nét mực to rồi nét màu nhỏ đè lên"""
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 2 * ink}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def ell(cx, cy, rx, ry, fill, sw=3, extra=''):
    st = f' stroke="{INK}" stroke-width="{sw}"' if sw else ''
    return f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{fill}"{st}{extra}/>'


def path(d, fill, sw=3, extra=''):
    col = '' if ' stroke="' in extra else f' stroke="{INK}"'
    st = f'{col} stroke-width="{sw}" stroke-linejoin="round" stroke-linecap="round"' if sw else ''
    return f'<path d="{d}" fill="{fill}"{st}{extra}/>'


def eye(x, y, r=5):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/><circle cx="{x + r * .35}" cy="{y - r * .35}" r="{r * .35}" fill="{WHITE}"/>'


def cheek(x, y, r=6):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{PINK}" opacity=".65"/>'


# ---------------------------------------------------------------- con vật
def monkey():
    """ngồi, nhìn thẳng. Hộp 200×200, chân ở y=200, giữa x=100"""
    f, l = MONKEY_FUR, MONKEY_L
    s = [limb('M132,172 C190,178 196,112 176,96 C162,86 150,100 162,110', f, 9)]
    s += [ell(78, 191, 19, 9, f), ell(122, 191, 19, 9, f)]
    s.append(ell(100, 148, 40, 44, f))
    s.append(ell(100, 156, 24, 30, l, 0))
    s.append(limb('M68,126 C52,150 58,170 78,174', f, 13))
    s.append(limb('M132,126 C148,150 142,170 122,174', f, 13))
    s += [ell(80, 174, 8, 7, l, 2.5), ell(120, 174, 8, 7, l, 2.5)]
    for sx in (-1, 1):
        s.append(ell(100 + sx * 48, 72, 17, 17, f))
        s.append(ell(100 + sx * 48, 72, 9, 9, l, 0))
    s.append(path('M94,30 C92,16 106,10 112,20 C106,18 100,22 104,30', f, 2.5))
    s.append(ell(100, 72, 46, 44, f))
    s.append(path('M100,56 C88,42 62,50 66,72 C58,94 76,112 100,112 C124,112 142,94 134,72 C138,50 112,42 100,56 Z', l, 2.5))
    s += [eye(86, 72), eye(114, 72), cheek(76, 94), cheek(124, 94)]
    s.append(f'<circle cx="96" cy="87" r="2" fill="{INK}"/><circle cx="104" cy="87" r="2" fill="{INK}"/>')
    s.append(path('M86,96 Q100,108 114,96', 'none', 2.5))
    return ''.join(s)


def lion():
    """đi sang trái, mặt nhìn ra. Hộp 240×200, chân ở y=200"""
    f, m = LION_FUR, LION_MANE
    s = [limb('M198,112 C232,112 234,70 222,52', f, 8)]
    s.append(path('M222,52 C208,44 212,26 226,30 C240,20 248,40 236,50 C232,56 226,56 222,52 Z', m, 2.5))
    for x in (160, 186):
        s.append(limb(f'M{x},130 L{x + 2},188', f, 20))
        s.append(ell(x + 4, 192, 15, 8, f, 2.5))
    s.append(ell(138, 120, 72, 40, f))
    s.append(ell(130, 138, 44, 16, CREAM, 0))
    for x in (92, 116):
        s.append(limb(f'M{x},130 L{x - 2},188', f, 20))
        s.append(ell(x - 2, 192, 15, 8, f, 2.5))
    pts = []
    for i in range(24):
        a = 2 * math.pi * i / 24
        r = 64 if i % 2 == 0 else 50
        pts.append(f'{70 + r * math.cos(a):.1f},{84 + r * math.sin(a):.1f}')
    s.append(f'<polygon points="{" ".join(pts)}" fill="{m}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    for sx in (-1, 1):
        s.append(ell(70 + sx * 28, 56, 12, 12, f))
        s.append(ell(70 + sx * 28, 56, 6, 6, PINK, 0))
    s.append(ell(70, 88, 38, 36, f))
    s.append(ell(70, 104, 20, 14, CREAM, 2.5))
    s += [eye(56, 82), eye(84, 82), cheek(46, 100), cheek(94, 100)]
    s.append(path('M63,95 L77,95 L70,103 Z', '#8A4B3A', 2))
    s.append(path('M70,103 L70,108 M62,110 Q70,116 78,110', 'none', 2.2))
    return ''.join(s)


def tiger():
    """ngồi, nhìn thẳng, đuôi cong bên trái. Hộp 200×200"""
    f, l = ORANGE, CREAM
    s = [limb('M70,182 C28,184 18,134 34,112 C44,98 32,88 26,94', f, 11)]
    s.append(ell(100, 150, 42, 44, f))
    s.append(ell(100, 158, 22, 30, l, 0))
    for sx in (-1, 1):
        for dy in (-10, 8):
            x0 = 100 + sx * 40
            s.append(path(f'M{x0},{140 + dy} L{x0 - sx * 14},{144 + dy} L{x0 - sx * 2},{147 + dy} Z', INK, 0))
    for x in (84, 116):
        s.append(limb(f'M{x},140 L{x},186', f, 16))
        s.append(ell(x, 191, 14, 8, l, 2.5))
    for sx in (-1, 1):
        s.append(ell(100 + sx * 36, 44, 14, 14, f))
        s.append(ell(100 + sx * 36, 44, 7, 7, PINK, 0))
    s.append(ell(100, 80, 46, 42, f))
    s.append(path('M92,40 L100,56 L108,40 Z M78,44 L86,56 L84,42 Z M122,44 L114,56 L116,42 Z', INK, 0))
    for sx in (-1, 1):
        s.append(path(f'M{100 + sx * 46},{78} L{100 + sx * 32},{82} L{100 + sx * 46},{86} Z', INK, 0))
    s.append(ell(89, 98, 14, 11, WHITE, 2.5))
    s.append(ell(111, 98, 14, 11, WHITE, 2.5))
    s += [eye(84, 76), eye(116, 76), cheek(72, 96), cheek(128, 96)]
    s.append(path('M94,88 L106,88 L100,95 Z', '#E77A93', 2))
    return ''.join(s)


def elephant():
    """đứng, nhìn ra. Hộp 220×200"""
    f, l = ELE, ELE_L
    s = [path('M176,124 Q192,140 186,158', 'none', 3)]
    for x in (146, 170):
        s.append(f'<rect x="{x - 13}" y="140" width="26" height="54" rx="10" fill="{f}" stroke="{INK}" stroke-width="3"/>')
    s.append(ell(125, 132, 60, 48, f))
    for x in (78, 106):
        s.append(f'<rect x="{x - 13}" y="146" width="26" height="50" rx="10" fill="{f}" stroke="{INK}" stroke-width="3"/>')
        s.append(f'<path d="M{x - 8},190 v5 M{x},190 v5 M{x + 8},190 v5" stroke="{INK}" stroke-width="2"/>')
    for sx in (-1, 1):
        s.append(ell(92 + sx * 48, 84, 32, 42, f))
        s.append(ell(92 + sx * 48, 86, 20, 28, PINK, 0, ' opacity=".55"'))
    s.append(ell(92, 80, 46, 44, f))
    s.append(limb('M92,100 C92,138 82,150 66,142', f, 20))
    s.append(path('M86,120 h12 M86,130 h11', 'none', 2))
    s += [eye(76, 74), eye(108, 74), cheek(66, 94), cheek(118, 94)]
    return ''.join(s)


def gazelle():
    """linh dương đứng, nhìn trái. Hộp 300×275"""
    f, d, l = '#D9A066', '#A8703F', CREAM
    s = []
    for x0, x1 in ((222, 234), (244, 258)):
        s.append(limb(f'M{x0},160 L{x0 + 6},214 L{x1},262', f, 9))
        s.append(ell(x1 + 1, 266, 7, 4, INK, 0))
    s.append(path('M262,132 Q280,138 276,156', 'none', 5))
    s.append(path('M142,122 C120,110 106,92 100,70 L76,80 C84,110 96,140 116,166 Z', f))
    s.append(ell(182, 148, 80, 36, f))
    s.append(path('M112,152 Q182,140 254,150', 'none', 4, f' stroke="{d}"'))
    s.append(ell(182, 168, 56, 14, l, 0))
    for x0, x1 in ((132, 126), (150, 152)):
        s.append(limb(f'M{x0},164 L{x0 - 2},214 L{x1},262', f, 9))
        s.append(ell(x1, 266, 7, 4, INK, 0))
    s.append(path('M80,60 C68,40 66,24 76,8', 'none', 6))
    s.append(path('M92,60 C92,40 98,26 110,14', 'none', 6))
    for sx, x0, y0 in ((1, 66, 64), (-1, 106, 62)):
        s.append(f'<ellipse cx="{x0}" cy="{y0}" rx="15" ry="6.5" fill="{f}" stroke="{INK}" stroke-width="3" transform="rotate({-25 * sx} {x0} {y0})"/>')
    s.append(path('M94,56 C106,62 106,80 98,88 C88,98 68,104 56,100 C46,96 48,84 58,78 C64,66 80,52 94,56 Z', f))
    s.append(ell(66, 94, 9, 5, l, 0))
    s.append(eye(86, 72, 4.5))
    s.append(f'<circle cx="56" cy="94" r="2.2" fill="{INK}"/>')
    return ''.join(s)


def horse():
    """ngựa phi, nhìn trái. Hộp 400×300"""
    f, m = BROWN, HAIR
    s = []
    s.append(path('M304,122 C340,112 368,130 390,176 C366,160 354,168 344,190 C338,160 322,146 300,142 Z', m))
    s.append(limb('M268,176 L296,222 L336,256', f, 20))
    s.append(ell(340, 260, 11, 8, m, 2.5))
    s.append(limb('M126,176 L96,212 L62,232', f, 20))
    s.append(ell(56, 234, 11, 8, m, 2.5))
    s.append(path('M122,164 C110,124 98,92 84,62 L124,46 C140,80 160,108 192,122 Z', f))
    s.append(ell(206, 148, 108, 50, f))
    s.append(ell(200, 170, 70, 18, '#C99A72', 0))
    s.append(limb('M288,168 L330,206 L368,214', f, 20))
    s.append(ell(374, 214, 11, 8, m, 2.5))
    s.append(limb('M148,184 L130,232 L92,254', f, 20))
    s.append(ell(86, 256, 11, 8, m, 2.5))
    s.append(path('M92,40 L100,16 L112,40 Z', f))
    s.append(path('M86,52 C62,54 26,78 22,102 C20,116 40,122 60,112 C80,102 100,88 112,72 Z', f))
    s.append(path('M104,36 C130,30 146,60 160,78 C170,92 186,110 196,118 C176,114 168,104 154,98 C160,110 162,118 170,128 C148,118 136,98 126,82 Z', m))
    s.append(eye(66, 76, 5))
    s.append(f'<circle cx="32" cy="104" r="3" fill="{INK}"/>')
    s.append(path('M36,114 Q46,118 54,112', 'none', 2.5))
    return ''.join(s)


def caterpillar():
    """sâu xanh bò sang phải. Hộp ~100×50, bụng ở y=0, bắt đầu x=0"""
    s = []
    for i, x in enumerate((10, 26, 42, 58)):
        s.append(ell(x, -14 - (4 if i % 2 else 0), 12, 12, GREEN, 2.5))
    s.append(ell(78, -22, 15, 15, '#9EDB8F', 2.5))
    s.append(path('M72,-36 L66,-50 M84,-36 L90,-50', 'none', 2.2))
    s.append(f'<circle cx="66" cy="-51" r="3" fill="{INK}"/><circle cx="90" cy="-51" r="3" fill="{INK}"/>')
    s.append(eye(82, -24, 3.2))
    s.append(path('M78,-14 Q84,-11 88,-15', 'none', 2))
    return ''.join(s)


def leaf():
    """lá cải: đáy cuống ở (0,0), cao ~150, hơi nghiêng"""
    s = [path('M-4,-30 C-50,-44 -54,-112 -28,-138 C-10,-154 22,-150 36,-126 C54,-94 40,-44 6,-30 Z', GRASS)]
    for y, dx in ((-62, 26), (-86, 28), (-110, 22)):
        s.append(path(f'M0,{y + 12} Q{dx * .6},{y - 2} {dx},{y - 10} M0,{y + 12} Q{-dx * .6},{y - 2} {-dx},{y - 12}', 'none', 2.2, f' stroke="{GRASS_D}"'))
    s.append(path('M-11,0 C-9,-40 -5,-90 0,-132 C5,-90 9,-40 11,0 Z', '#EEF7E6', 2.5))
    return f'<g transform="rotate(-8)">{"".join(s)}</g>'


def ant():
    """kiến đứng vẫy tay; chân ở y=0, giữa x=0, cao ~110"""
    c, cl = '#D2694A', '#E98C6B'
    s = []
    s.append(path('M-8,-38 L-14,-6 L-20,-2 M8,-38 L14,-6 L20,-2', 'none', 3.5))
    s.append(path('M-10,-58 L-26,-48 M10,-60 L26,-82', 'none', 3.5))
    s.append(f'<circle cx="27" cy="-84" r="4" fill="{c}" stroke="{INK}" stroke-width="2"/>')
    s.append(ell(0, -30, 13, 16, c, 2.5))
    s.append(ell(0, -56, 10, 12, cl, 2.5))
    s.append(path('M-8,-92 C-14,-104 -20,-108 -24,-108 M8,-92 C14,-104 20,-108 24,-108', 'none', 2.2))
    s.append(ell(0, -80, 16, 14, c, 2.5))
    s += [eye(-6, -82, 3.2), eye(6, -82, 3.2)]
    s.append(path('M-5,-73 Q0,-69 5,-73', 'none', 2))
    return ''.join(s)


def octopus():
    """bạch tuộc, tâm đầu ở (0,0), đầu r≈60; 8 xúc tu toả ra hai bên và xuống"""
    f, d = '#C7B2F2', '#9F86E0'
    s = []
    arms = ['M-30,40 C-70,40 -90,30 -110,48 C-122,60 -104,70 -96,60',
            'M-26,50 C-50,70 -80,70 -86,96 C-90,112 -70,114 -70,100',
            'M-14,56 C-24,84 -48,100 -40,124 C-34,136 -20,128 -24,118',
            'M-4,58 C-6,90 -14,110 -2,130',
            'M6,58 C8,90 18,110 8,132',
            'M16,56 C26,84 50,100 42,124 C36,136 22,128 26,118',
            'M28,50 C52,70 82,70 88,96 C92,112 72,114 72,100',
            'M32,40 C72,40 94,30 114,48 C126,60 108,70 100,60']
    for a in arms:
        s.append(limb(a, f, 12))
    s.append(path('M-58,20 C-66,-40 -34,-66 0,-66 C34,-66 66,-40 58,20 C44,40 -44,40 -58,20 Z', f))
    s.append(ell(-26, 22, 7, 5, PINK, 0, ' opacity=".7"'))
    s.append(ell(26, 22, 7, 5, PINK, 0, ' opacity=".7"'))
    s.append(eye(-14, 22, 4))
    s.append(eye(14, 22, 4))
    s.append(path('M-5,30 Q0,34 5,30', 'none', 2))
    return ''.join(s)


# ---------------------------------------------------------------- đồ vật
def cloud(cx, cy, w, fill=WHITE, stroke=BLUE, sw=4):
    """mây: hợp các hình tròn; w = bề rộng"""
    k = w / 160
    circ = [(-46, 16, 30), (-18, -6, 34), (22, -14, 36), (50, 10, 28), (18, 22, 28), (-16, 24, 26)]
    s = []
    for dx, dy, r in circ:
        s.append(f'<circle cx="{cx + dx * k:.1f}" cy="{cy + dy * k:.1f}" r="{r * k:.1f}" fill="{stroke}" stroke="{stroke}" stroke-width="{2 * sw}"/>')
    for dx, dy, r in circ:
        s.append(f'<circle cx="{cx + dx * k:.1f}" cy="{cy + dy * k:.1f}" r="{r * k:.1f}" fill="{fill}"/>')
    return ''.join(s)


def potato(cx, cy, s=1.0, rot=0):
    g = [path('M-58,-4 C-60,-30 -30,-42 0,-40 C34,-40 60,-30 58,-2 C58,26 30,40 0,38 C-32,38 -56,24 -58,-4 Z', '#D9A866', 3),
         ell(-10, -12, 30, 12, '#E8C28A', 0)]
    for x, y in ((-24, 10), (18, -18), (30, 14), (-4, 22)):
        g.append(f'<path d="M{x - 3},{y} q3,-3 6,0" fill="none" stroke="#9A6B3A" stroke-width="2.5" stroke-linecap="round"/>')
    return f'<g transform="translate({cx},{cy}) rotate({rot}) scale({s})">{"".join(g)}</g>'


def carrot(cx, cy, s=1.0):
    """củ cà rốt nằm chéo: lá ở trên trái, mũi xuống phải; (cx,cy) ~ giữa thân"""
    g = []
    for d in ('M-70,-34 L-110,-62', 'M-70,-34 L-100,-80', 'M-70,-34 L-80,-86', 'M-70,-34 L-116,-40'):
        g.append(limb(d, GREEN, 6, 2.2))
    g.append(path('M-78,-26 C-70,-52 -46,-54 -30,-42 L92,48 C96,52 92,56 86,54 Z', ORANGE, 3))
    for x, y in ((-40, -20), (0, 6), (36, 30)):
        g.append(f'<path d="M{x},{y} l14,-6" stroke="#C9722F" stroke-width="2.5" stroke-linecap="round"/>')
    return f'<g transform="translate({cx},{cy}) scale({s})">{"".join(g)}</g>'


def apple(cx, cy, s=1.0):
    """táo đỏ, (cx,cy) = tâm quả; cao ~ 115 ở s=1"""
    g = [path('M0,-40 C-6,-50 -4,-58 4,-66', 'none', 4)]
    g.append(path('M4,-58 C14,-72 34,-70 40,-60 C28,-52 14,-52 4,-58 Z', GREEN, 3))
    g.append(path('M0,-34 C-24,-50 -56,-40 -56,-4 C-56,30 -30,54 -12,50 C-6,48 6,48 12,50 C30,54 56,30 56,-4 C56,-40 24,-50 0,-34 Z', RED, 3.5))
    g.append(ell(-28, -16, 8, 14, WHITE, 0, ' opacity=".45" transform="rotate(20 -28 -16)"'))
    return f'<g transform="translate({cx},{cy}) scale({s})">{"".join(g)}</g>'


def custard_apple(cx, cy, s=1.0, uid='ca'):
    """quả na xanh, vảy tròn; (cx,cy) = tâm; bề rộng ~120 ở s=1"""
    g = [f'<clipPath id="{uid}"><path d="M0,-50 C36,-54 60,-30 60,4 C60,40 30,58 0,58 C-30,58 -60,40 -60,4 C-60,-30 -36,-54 0,-50 Z"/></clipPath>']
    g.append(path('M0,-50 C36,-54 60,-30 60,4 C60,40 30,58 0,58 C-30,58 -60,40 -60,4 C-60,-30 -36,-54 0,-50 Z', '#8CCB78', 0))
    sc = []
    for row, y in enumerate(range(-44, 66, 20)):
        off = 10 if row % 2 else 0
        for x in range(-70 + off, 72, 20):
            sc.append(f'<path d="M{x - 9},{y - 4} C{x - 9},{y + 9} {x + 9},{y + 9} {x + 9},{y - 4}" fill="#C4E6A8" stroke="#4E9A4C" stroke-width="2.4" stroke-linecap="round"/>')
    g.append(f'<g clip-path="url(#{uid})">{"".join(sc)}</g>')
    g.append(path('M0,-50 C36,-54 60,-30 60,4 C60,40 30,58 0,58 C-30,58 -60,40 -60,4 C-60,-30 -36,-54 0,-50 Z', 'none', 3.5))
    g.append(f'<rect x="-6" y="-62" width="12" height="16" rx="3" fill="{BROWN}" stroke="{INK}" stroke-width="3"/>')
    return f'<g transform="translate({cx},{cy}) scale({s})">{"".join(g)}</g>'


def arrow_head(x, y, direction, size=18, color=BLUE):
    """đầu mũi tên tam giác, mũi ở (x,y); direction: 'l','r','u','d'"""
    a = {'r': 0, 'd': 90, 'l': 180, 'u': 270}[direction]
    return (f'<path d="M0,0 L{-size * 1.5},{-size * .7} L{-size * 1.1},0 L{-size * 1.5},{size * .7} Z" fill="{color}" '
            f'transform="translate({x},{y}) rotate({a})"/>')
