"""
Bộ vẽ riêng cho Vở BT Toán 1 Tập Hai, Bài 21–22 (số có hai chữ số, so sánh số có hai chữ số):
táo, tháp 10 quả, túi 10 quả, que tính và bó 1 chục, cột 10 khối, hũ mật, gấu bông có bảng số,
voi đeo số, nhà chó, xe tải chở chữ, cây xăng ghi số, thuyền, phao câu, ong, hoa, xoài, rô-bốt
cầm thẻ, xe tải nhỏ, bể cá… Nét riêng: phẳng, dễ thương, viền INK, màu tươi (common.py).
Khung, ô, chữ mẫu theo màu xanh của sách (BOOK).

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    import kit_l1t2_a as A

Mỗi hình vẽ quanh gốc (0, 0) = giữa đáy, trừ khi ghi khác; đặt bằng put(x, y, svg, s).
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_p2 as KP2
import kit_measure as KM
import kit_g8 as K8
import kit_g9 as K9
import kit_l1_a as LA
import kit_l1_b as LB
import kit_g1 as K1

F = 'grade1-workbook-2'
BOOK = '#29A9E0'        # xanh của sách: viền khung, ô, chữ mẫu
PANEL = '#DDF1FC'       # nền khung xanh nhạt
PAPER = '#FFFDF6'


def st(w=2.6, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def put(x, y, inner, s=1.0, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


def panel(x, y, w, h, fill=PANEL, edge=BOOK, r=18, sw=3):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" stroke="{edge}" stroke-width="{sw}"/>'


def num(x, y, s, size=22, fill=INK, weight=700):
    return text(x, y + size * .35, s, size=size, weight=weight, fill=fill)


def disc(cx, cy, r, n=None, fill=WHITE, size=None, edge=INK, sw=2.6):
    """ô tròn trắng ghi số (n=None: để trống cho bé viết)"""
    out = f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" {st(sw, edge)}/>'
    if n is not None:
        out += num(cx, cy, n, size or r * 1.05)
    return out


def oval(cx, cy, rx, ry, n=None, size=None):
    out = f'<ellipse cx="{cx}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{WHITE}" {st(2.6)}/>'
    if n is not None:
        out += num(cx, cy, n, size or ry * 1.25)
    return out


def box(x, y, s, n=None, col=BOOK, txt=INK, size=None):
    out = f'<rect x="{x}" y="{y}" width="{s}" height="{s}" fill="{WHITE}" stroke="{col}" stroke-width="2.6"/>'
    if n is not None:
        out += num(x + s / 2, y + s / 2, n, size or s * .5, fill=txt, weight=600)
    return out


# ── trái cây ────────────────────────────────────────────────────────────────

def apple(cx, cy, r=13, col=RED, sw=2.2):
    s = [f'<path d="M{cx},{cy - r * .7} q1,-{r * .45:.1f} {r * .3:.1f},-{r * .65:.1f}" fill="none" {st(sw)}/>',
         f'<path d="M{cx + r * .2:.1f},{cy - r * 1.15:.1f} q{r * .5:.1f},-{r * .55:.1f} {r:.1f},-{r * .2:.1f} q-{r * .45:.1f},{r * .55:.1f} -{r:.1f},{r * .2:.1f} Z" fill="{GREEN}" {st(sw * .7)}/>',
         f'<path d="M{cx},{cy - r * .68:.1f} C{cx - r * .4:.1f},{cy - r * 1.08:.1f} {cx - r * 1.08:.1f},{cy - r:.1f} {cx - r},{cy} '
         f'C{cx - r * .96:.1f},{cy + r * .85:.1f} {cx - r * .4:.1f},{cy + r * 1.05:.1f} {cx},{cy + r * .82:.1f} '
         f'C{cx + r * .4:.1f},{cy + r * 1.05:.1f} {cx + r * .96:.1f},{cy + r * .85:.1f} {cx + r},{cy} '
         f'C{cx + r * 1.08:.1f},{cy - r:.1f} {cx + r * .4:.1f},{cy - r * 1.08:.1f} {cx},{cy - r * .68:.1f} Z" fill="{col}" {st(sw)}/>',
         f'<ellipse cx="{cx - r * .45:.1f}" cy="{cy - r * .2:.1f}" rx="{r * .17:.1f}" ry="{r * .3:.1f}" fill="#fff" opacity=".7"/>']
    return ''.join(s)


def pyramid(cx, base, r=13, fruit=apple, rows=(4, 3, 2, 1)):
    """tháp 10 quả (4-3-2-1), base = tâm hàng dưới cùng"""
    out = []
    px, py = r * 2.05, r * 1.75
    for i, n in enumerate(rows):
        x0 = cx - (n - 1) * px / 2
        for k in range(n):
            out.append(fruit(x0 + k * px, base - i * py, r))
    return ''.join(out)


def heap(cx, base, rows, r=13, fruit=apple):
    """đống quả: rows = số quả mỗi hàng từ dưới lên, hàng trên đặt giữa"""
    out = []
    px, py = r * 2.05, r * 1.75
    for i, n in enumerate(rows):
        x0 = cx - (n - 1) * px / 2
        for k in range(n):
            out.append(fruit(x0 + k * px, base - i * py, r))
    return ''.join(out)


def tomato(cx, cy, r=15, col='#F25C54'):
    s = [f'<ellipse cx="{cx}" cy="{cy}" rx="{r * 1.12:.1f}" ry="{r:.1f}" fill="{col}" {st(2.4)}/>',
         f'<path d="M{cx},{cy - r * .78:.1f} l{-r * .55:.1f},{-r * .12:.1f} l{r * .3:.1f},{-r * .2:.1f} l{r * .25:.1f},{-r * .4:.1f} l{r * .25:.1f},{r * .4:.1f} '
         f'l{r * .3:.1f},{r * .2:.1f} Z" fill="{GREEN}" {st(2)}/>',
         f'<ellipse cx="{cx - r * .5:.1f}" cy="{cy - r * .25:.1f}" rx="{r * .18:.1f}" ry="{r * .32:.1f}" fill="#fff" opacity=".6"/>']
    return ''.join(s)


def net_bag(cx, base, w=110, h=100, inner='', col='#F7E7C6'):
    """túi lưới buộc miệng; inner = quả vẽ trong túi (toạ độ thật)"""
    t = base - h
    body = (f'M{cx - w * .14:.1f},{t + h * .22:.1f} Q{cx - w * .56:.1f},{t + h * .42:.1f} {cx - w * .5:.1f},{base - h * .18:.1f} '
            f'Q{cx - w * .46:.1f},{base:.1f} {cx:.1f},{base:.1f} Q{cx + w * .46:.1f},{base:.1f} {cx + w * .5:.1f},{base - h * .18:.1f} '
            f'Q{cx + w * .56:.1f},{t + h * .42:.1f} {cx + w * .14:.1f},{t + h * .22:.1f} Z')
    out = [f'<path d="{body}" fill="{col}" opacity=".55" {st(2.6)}/>', inner,
           f'<path d="{body}" fill="none" {st(2.8)}/>',
           f'<path d="M{cx - w * .14:.1f},{t + h * .22:.1f} L{cx - w * .3:.1f},{t + 2:.1f} Q{cx - w * .1:.1f},{t + h * .1:.1f} {cx:.1f},{t + 4:.1f} '
           f'Q{cx + w * .1:.1f},{t + h * .1:.1f} {cx + w * .3:.1f},{t + 2:.1f} L{cx + w * .14:.1f},{t + h * .22:.1f} Z" fill="{col}" {st(2.4)}/>',
           f'<rect x="{cx - w * .19:.1f}" y="{t + h * .18:.1f}" width="{w * .38:.1f}" height="{h * .08:.1f}" rx="3" fill="{ORANGE}" {st(2)}/>']
    return ''.join(out)


def apple_bag(cx, base, w=110, h=100):
    """túi có 10 quả táo (tháp 4-3-2-1 nhìn thấy qua lưới)"""
    r = w * .1
    return net_bag(cx, base, w, h, pyramid(cx, base - r * 1.3, r))


def plain_bag(cx, base, w=70, h=66, fill=WHITE):
    """túi trắng để tô (Bài 21 Tiết 3 Q4)"""
    t = base - h
    return (f'<path d="M{cx - w * .14:.1f},{t + h * .3:.1f} Q{cx - w * .58:.1f},{t + h * .5:.1f} {cx - w * .5:.1f},{base - h * .14:.1f} '
            f'Q{cx - w * .44:.1f},{base:.1f} {cx:.1f},{base:.1f} Q{cx + w * .44:.1f},{base:.1f} {cx + w * .5:.1f},{base - h * .14:.1f} '
            f'Q{cx + w * .58:.1f},{t + h * .5:.1f} {cx + w * .14:.1f},{t + h * .3:.1f} Z" fill="{fill}" {st(2.6)}/>'
            f'<path d="M{cx - w * .14:.1f},{t + h * .3:.1f} L{cx - w * .32:.1f},{t + 4:.1f} L{cx - w * .12:.1f},{t + h * .14:.1f} L{cx:.1f},{t:.1f} '
            f'L{cx + w * .12:.1f},{t + h * .14:.1f} L{cx + w * .32:.1f},{t + 4:.1f} L{cx + w * .14:.1f},{t + h * .3:.1f} Z" fill="{fill}" {st(2.4)}/>'
            f'<path d="M{cx - w * .2:.1f},{t + h * .3:.1f} L{cx + w * .2:.1f},{t + h * .3:.1f}" {st(3.2)}/>')


# ── que tính, bó 1 chục, cột 10 khối ───────────────────────────────────────

STICK = '#F6C453'
STICK_D = '#D99A2B'


def stick(x, top, bot, w=9, col=STICK):
    return (f'<rect x="{x - w / 2:.1f}" y="{top:.1f}" width="{w}" height="{bot - top:.1f}" rx="{w / 2:.1f}" fill="{col}" {st(2.2)}/>'
            f'<ellipse cx="{x:.1f}" cy="{top + w * .45:.1f}" rx="{w * .32:.1f}" ry="{w * .22:.1f}" fill="{STICK_D}"/>')


def loose_sticks(x0, top, bot, n, gap=15, w=9):
    return ''.join(stick(x0 + k * gap, top, bot, w) for k in range(n))


def bundle(cx, top, bot, w=9):
    """bó 10 que (một chục): hai lớp que, dây buộc ngang thân, nơ một bên"""
    out = []
    back = [cx - w * 1.5, cx - w * .5, cx + w * .5, cx + w * 1.5]
    front = [cx - w * 2, cx - w, cx, cx + w, cx + w * 2, cx]
    for x in back:
        out.append(stick(x, top - 3, bot - 3, w, '#E9B23F'))
    for x in front[:5]:
        out.append(stick(x, top, bot, w))
    yb = (top + bot) / 2
    out.append(f'<path d="M{cx - w * 2.6:.1f},{yb:.1f} Q{cx},{yb + 5:.1f} {cx + w * 2.6:.1f},{yb:.1f}" fill="none" stroke="{RED}" stroke-width="4" stroke-linecap="round"/>')
    bx = cx + w * 2.6
    out.append(f'<path d="M{bx:.1f},{yb:.1f} l9,-7 l0,12 Z M{bx:.1f},{yb:.1f} l-1,10" fill="{RED}" {st(1.8)}/>')
    return ''.join(out)


def cube_col(x, y, n=10, s=26, fill='#7CC6E8'):
    """cột n khối lập phương nhỏ (x, y = góc trên trái)"""
    return ''.join(f'<rect x="{x}" y="{y + k * s}" width="{s}" height="{s}" fill="{fill}" {st(2.2)}/>' for k in range(n))


# ── con vật, đồ vật mang số ────────────────────────────────────────────────

def elephant_tag(n=None, ear='#C9CED8'):
    """voi đứng nhìn trái, đeo ô tròn số trên thân. Hộp (0,0)–(220,200)."""
    return KP2.elephant() + disc(146, 134, 27, n, size=24)


def jar(n=None):
    """hũ mật có nắp vải, nhãn hình bầu dục ở giữa. Hộp (-40,-100)–(40,0)."""
    body = ('M-26,-74 Q-40,-70 -40,-46 Q-40,-8 -26,-2 Q0,4 26,-2 Q40,-8 40,-46 Q40,-70 26,-74 Z')
    s = [f'<path d="{body}" fill="#FFE29A" {st(2.8)}/>',
         f'<path d="M-30,-58 Q-34,-30 -26,-12" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>',
         f'<rect x="-30" y="-84" width="60" height="12" rx="5" fill="{ORANGE}" {st(2.4)}/>',
         f'<path d="M-34,-84 Q-36,-100 -20,-98 Q-10,-104 0,-98 Q10,-104 20,-98 Q36,-100 34,-84 Z" fill="{BOOK}" {st(2.4)}/>',
         f'<path d="M-24,-74 q4,8 8,0 q4,8 8,0 q4,8 8,0 q4,8 8,0 q4,8 8,0 q4,8 8,0" fill="{BOOK}" {st(2)}/>',
         oval(0, -38, 24, 16, n, 22)]
    return ''.join(s)


def bear_heart(n=None):
    """gấu bông ngồi ôm tấm bảng trái tim ghi số. Hộp (-50,-100)–(50,0)."""
    s = [KM.plush_bear(0, 0, 100, fur='#C98B5A', light='#F1D3B0', bow=RED)]
    s.append(f'<path d="M0,-12 C-34,-26 -36,-50 -20,-54 C-10,-56 -3,-50 0,-44 C3,-50 10,-56 20,-54 C36,-50 34,-26 0,-12 Z" fill="{WHITE}" {st(2.6)}/>')
    if n is not None:
        s.append(num(0, -36, n, 20))
    return ''.join(s)


def bear_belly(n=None):
    """gấu bông đứng, bụng có ô bầu dục ghi số. Hộp (-50,-110)–(50,0)."""
    fur, light = '#9FD3F0', '#DDF1FC'
    s = []
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{sx * 18}" cy="-12" rx="14" ry="12" fill="{fur}" {st(2.6)}/>')
        s.append(f'<ellipse cx="{sx * 18}" cy="-9" rx="8" ry="6" fill="{light}"/>')
        s.append(f'<ellipse cx="{sx * 34}" cy="-52" rx="10" ry="16" fill="{fur}" {st(2.6)} transform="rotate({sx * -30} {sx * 34} -52)"/>')
    s.append(f'<ellipse cx="0" cy="-42" rx="30" ry="32" fill="{fur}" {st(2.6)}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 20}" cy="-100" r="10" fill="{fur}" {st(2.6)}/><circle cx="{sx * 20}" cy="-100" r="5" fill="{light}"/>')
    s.append(f'<circle cx="0" cy="-82" r="24" fill="{fur}" {st(2.6)}/>')
    s.append(f'<ellipse cx="0" cy="-74" rx="11" ry="8" fill="{light}"/>')
    s.append(f'<ellipse cx="0" cy="-77" rx="4" ry="3" fill="{INK}"/>')
    s.append(f'<circle cx="-9" cy="-87" r="3" fill="{INK}"/><circle cx="9" cy="-87" r="3" fill="{INK}"/>')
    s.append(f'<path d="M-4,-70 Q0,-67 4,-70" fill="none" {st(2)}/>')
    s.append(f'<path d="M0,-58 L-10,-63 L-10,-53 Z M0,-58 L10,-63 L10,-53 Z" fill="{YELLOW}" {st(2)}/>')
    s.append(oval(0, -34, 22, 15, n, 20))
    return ''.join(s)


def kennel(x, y, w=64, num_txt=None, wall=WHITE, roof=None):
    """nhà nhỏ có cửa vòm (Bài 21 Tiết 2 Q4); x, y = giữa đáy"""
    roof = roof or BOOK
    h = w * .62
    out = [f'<path d="M{x - w / 2:.1f},{y:.1f} L{x - w / 2:.1f},{y - h:.1f} L{x:.1f},{y - h - w * .42:.1f} L{x + w / 2:.1f},{y - h:.1f} L{x + w / 2:.1f},{y:.1f} Z" fill="{wall}" {st(2.6)}/>',
           f'<path d="M{x - w * .62:.1f},{y - h + 4:.1f} L{x:.1f},{y - h - w * .5:.1f} L{x + w * .62:.1f},{y - h + 4:.1f}" fill="none" stroke="{INK}" stroke-width="{w * .16 + 2:.1f}" stroke-linejoin="round" stroke-linecap="round"/>',
           f'<path d="M{x - w * .62:.1f},{y - h + 4:.1f} L{x:.1f},{y - h - w * .5:.1f} L{x + w * .62:.1f},{y - h + 4:.1f}" fill="none" stroke="{roof}" stroke-width="{w * .16 - 2:.1f}" stroke-linejoin="round" stroke-linecap="round"/>',
           f'<path d="M{x - w * .2:.1f},{y:.1f} L{x - w * .2:.1f},{y - h * .55:.1f} A{w * .2:.1f},{w * .2:.1f} 0 0 1 {x + w * .2:.1f},{y - h * .55:.1f} L{x + w * .2:.1f},{y:.1f} Z" fill="#5B5560" {st(2.2)}/>']
    if num_txt is not None:
        out.append(text(x, y - h - w * .06, num_txt, size=w * .3, weight=700))
    return ''.join(out)


def bee(col=YELLOW):
    """ong bay nhìn phải. Hộp (-60,-50)–(60,40)."""
    s = [f'<ellipse cx="-18" cy="-38" rx="20" ry="13" fill="#E6F6FF" {st(2.4)} transform="rotate(-25 -18 -38)"/>',
         f'<ellipse cx="6" cy="-42" rx="20" ry="13" fill="#E6F6FF" {st(2.4)} transform="rotate(20 6 -42)"/>',
         f'<ellipse cx="-6" cy="0" rx="40" ry="28" fill="{col}" {st(2.8)}/>']
    for x in (-24, -4, 16):
        s.append(f'<path d="M{x},-26 Q{x + 6},0 {x},26" fill="none" stroke="{INK}" stroke-width="8"/>')
    s.append(f'<path d="M-46,0 L-58,4 L-46,8" fill="{INK}" {st(2)}/>')
    s.append(f'<circle cx="36" cy="-6" r="20" fill="{col}" {st(2.8)}/>')
    s.append(f'<path d="M30,-24 Q26,-42 18,-46 M42,-24 Q46,-42 56,-44" fill="none" {st(2.4)}/>')
    s.append(f'<circle cx="18" cy="-46" r="3.4" fill="{INK}"/><circle cx="56" cy="-44" r="3.4" fill="{INK}"/>')
    s.append(f'<circle cx="42" cy="-10" r="3.4" fill="{INK}"/><circle cx="43" cy="-11" r="1.2" fill="#fff"/>')
    s.append(f'<path d="M36,2 Q42,8 48,2" fill="none" {st(2.2)}/>')
    s.append(f'<circle cx="50" cy="-2" r="3.6" fill="{PINK}" opacity=".8"/>')
    return ''.join(s)


def flower(cx, cy, r=34, n=None, petal='#7CC6E8', center=WHITE, petals=8, size=None, sw=2.6):
    """hoa tròn: cánh quanh nhuỵ trắng ghi số"""
    out = []
    pr = r * .42
    for k in range(petals):
        a = 2 * math.pi * k / petals
        out.append(f'<circle cx="{cx + math.cos(a) * r * .66:.1f}" cy="{cy + math.sin(a) * r * .66:.1f}" r="{pr:.1f}" fill="{petal}" {st(sw)}/>')
    out.append(disc(cx, cy, r * .55, n, center, size or r * .5, sw=sw))
    return ''.join(out)


def mango(cx, cy, w=104, n=None, flip=False, fill=WHITE):
    """quả xoài nằm (để tô): đầu tròn to, núm và lá ở đầu bên phải (flip: bên trái)"""
    h = w * .6
    k = -1 if flip else 1
    P = lambda a, b: f'{cx + k * a * w:.1f},{cy + b * h:.1f}'
    d = (f'M{P(.38, -.32)} C{P(.15, -.66)} {P(-.32, -.62)} {P(-.50, -.18)} Q{P(-.62, .08)} {P(-.52, .22)} '
         f'C{P(-.36, .62)} {P(.22, .62)} {P(.44, .20)} C{P(.52, .02)} {P(.48, -.20)} {P(.38, -.32)} Z')
    out = [f'<path d="{d}" fill="{fill}" {st(2.6)}/>',
           f'<path d="M{P(.38, -.32)} Q{P(.44, -.46)} {P(.50, -.52)}" fill="none" {st(2.6)}/>',
           f'<path d="M{P(.50, -.48)} Q{P(.62, -.62)} {P(.66, -.20)} Q{P(.52, -.24)} {P(.50, -.48)} Z" fill="{GREEN}" {st(2.2)}/>']
    if n is not None:
        out.append(num(cx - k * w * .05, cy + h * .02, n, w * .3))
    return ''.join(out)


def flower_outline(cx, cy, r=46, n=None, petals=6):
    """bông hoa trắng một nét viền lượn (để tô), nhuỵ tròn ghi số"""
    pts = []
    for i in range(petals):
        a = 2 * math.pi * i / petals - math.pi / 2
        pts.append((cx + math.cos(a) * r * .62, cy + math.sin(a) * r * .62))
    pr = r * .62 * math.sin(math.pi / petals) * 1.06
    d = f'M{pts[0][0]:.1f},{pts[0][1]:.1f} ' + ' '.join(
        f'A{pr:.1f},{pr:.1f} 0 1 1 {pts[(i + 1) % petals][0]:.1f},{pts[(i + 1) % petals][1]:.1f}' for i in range(petals)) + ' Z'
    return f'<path d="{d}" fill="{WHITE}" {st(2.6)}/>' + disc(cx, cy, r * .4, n, WHITE, r * .44)


def card(x, y, w, h, n, rot=0, fill='#BFE6F7', size=None):
    cx, cy = x + w / 2, y + h / 2
    return (f'<g transform="rotate({rot} {cx} {cy})"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="4" fill="{fill}" {st(2.6)}/>'
            + num(cx, cy, n, size or w * .5) + '</g>')


def robot_cards(a, b):
    """rô-bốt giơ hai tấm thẻ ghi số (để tô). Hộp (-110,-170)–(110,0)."""
    body, dark = '#9FD3F0', '#4E9BD6'
    s = [f'<path d="M-30,0 L30,0 L22,-14 L-22,-14 Z" fill="{dark}" {st(2.4)}/>',
         f'<rect x="-34" y="-70" width="68" height="56" rx="10" fill="{body}" {st(2.6)}/>',
         f'<rect x="-22" y="-60" width="44" height="30" rx="6" fill="{WHITE}" {st(2.2)}/>',
         f'<path d="M-16,-45 l6,0 l3,-7 l5,14 l4,-10 l3,3 l11,0" fill="none" stroke="{dark}" stroke-width="2.4" stroke-linejoin="round"/>',
         f'<rect x="-10" y="-80" width="20" height="12" fill="{dark}" {st(2.2)}/>']
    for sx in (-1, 1):
        s.append(f'<path d="M{sx * 34},-56 Q{sx * 60},-60 {sx * 66},-92" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>')
        s.append(f'<path d="M{sx * 34},-56 Q{sx * 60},-60 {sx * 66},-92" fill="none" stroke="{body}" stroke-width="7" stroke-linecap="round"/>')
    s.append(f'<rect x="-46" y="-138" width="92" height="60" rx="14" fill="{body}" {st(2.6)}/>')
    s.append('<path d="M0,-138 L0,-152" ' + st(2.6) + '/>' + f'<circle cx="0" cy="-156" r="6" fill="{RED}" {st(2.2)}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 20}" cy="-110" r="14" fill="{WHITE}" {st(2.4)}/><circle cx="{sx * 20}" cy="-110" r="6" fill="{INK}"/>')
    s.append(f'<path d="M-10,-90 Q0,-84 10,-90" fill="none" {st(2.2)}/>')
    s.append(card(-118, -154, 60, 68, a, -8, WHITE, 34))
    s.append(card(58, -154, 60, 68, b, 8, WHITE, 34))
    return ''.join(s)


def van(expr_l, sign, expr_r, flip=False):
    """xe tải nhỏ, thân ghi "23 [<] 32". Hộp (0,0)–(300,120)."""
    body = '#BFE6F7'
    if flip:
        d = 'M40,24 L250,24 Q262,24 262,36 L262,92 L18,92 L18,62 Q22,48 40,42 L58,24 Z'
        win = 'M64,32 L100,32 L100,56 L44,56 Z'
    else:
        d = 'M20,24 L230,24 Q242,24 248,34 L270,60 Q284,64 284,78 L284,92 L20,92 Z'
        win = 'M206,32 L230,32 L262,62 L206,62 Z'
    s = [f'<path d="{d}" fill="{body}" {st(2.8)}/>',
         f'<path d="{win}" fill="{WHITE}" {st(2.4)}/>',
         f'<rect x="14" y="88" width="276" height="10" rx="4" fill="#1E6F9F" {st(2)}/>']
    for x in ((80, 220) if not flip else (80, 220)):
        s.append(f'<circle cx="{x}" cy="98" r="18" fill="#4B4F58" {st(2.6)}/><circle cx="{x}" cy="98" r="8" fill="{GREY_L}" {st(2)}/>')
    tx = 172 if flip else 120
    s.append(text(tx - 44, 66, expr_l, size=26, weight=600))
    s.append(f'<rect x="{tx - 15}" y="44" width="30" height="30" fill="{WHITE}" {st(2.4)}/>')
    s.append(text(tx, 67, '&lt;' if sign == '<' else '&gt;' if sign == '>' else sign, size=26, weight=700))
    s.append(text(tx + 44, 66, expr_r, size=26, weight=600))
    return ''.join(s)


def box_truck(facing='right', cargo='#BFE6F7', cab=None):
    """xe tải thùng (thùng trống để ghi chữ bên dưới). Hộp (0,0)–(220,110); facing = đầu xe."""
    cab = cab or BOOK
    s = []
    if facing == 'right':
        s.append(f'<rect x="6" y="8" width="132" height="70" rx="6" fill="{cargo}" {st(2.8)}/>')
        s.append(f'<path d="M142,78 L142,26 L178,26 Q186,26 190,34 L206,56 Q214,58 214,66 L214,78 Z" fill="{cab}" {st(2.8)}/>')
        s.append(f'<path d="M150,32 L176,32 L192,56 L150,56 Z" fill="{WHITE}" {st(2.2)}/>')
        wheels = (44, 176)
    else:
        s.append(f'<rect x="82" y="8" width="132" height="70" rx="6" fill="{cargo}" {st(2.8)}/>')
        s.append(f'<path d="M78,78 L78,26 L42,26 Q34,26 30,34 L14,56 Q6,58 6,66 L6,78 Z" fill="{cab}" {st(2.8)}/>')
        s.append(f'<path d="M70,32 L44,32 L28,56 L70,56 Z" fill="{WHITE}" {st(2.2)}/>')
        wheels = (44, 176)
    s.append(f'<rect x="4" y="76" width="212" height="12" rx="4" fill="{GREY}" {st(2.4)}/>')
    for x in wheels:
        s.append(f'<circle cx="{x}" cy="90" r="17" fill="#4B4F58" {st(2.6)}/><circle cx="{x}" cy="90" r="7" fill="{GREY_L}" {st(2)}/>')
    return ''.join(s)


def pump(n):
    """cây xăng ghi số trên màn hình. Hộp (0,0)–(130,120)."""
    s = [f'<rect x="20" y="108" width="96" height="10" rx="3" fill="#6B7280" {st(2.4)}/>',
         f'<path d="M30,108 L30,14 Q30,6 38,6 L98,6 Q106,6 106,14 L106,108 Z" fill="#C9CED6" {st(2.8)}/>',
         f'<rect x="40" y="16" width="56" height="40" rx="6" fill="{WHITE}" {st(2.4)}/>',
         num(68, 36, n, 28),
         f'<rect x="44" y="66" width="48" height="10" rx="3" fill="{RED}" {st(2)}/>',
         f'<path d="M106,30 Q124,32 122,60 L122,92 Q122,100 114,100" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>',
         f'<rect x="108" y="22" width="12" height="18" rx="3" fill="#4B4F58" {st(2)}/>']
    return ''.join(s)


def boat(col='#BFE6F7', rim='#8A929C'):
    """thuyền gỗ nhìn ngang. Hộp (0,0)–(240,80)."""
    return (f'<path d="M6,20 Q120,6 234,20 L214,40 Q200,74 120,76 Q40,74 26,40 Z" fill="{col}" {st(2.8)}/>'
            f'<path d="M6,20 Q120,6 234,20 Q120,32 6,20 Z" fill="{rim}" {st(2.6)}/>'
            f'<path d="M30,44 Q120,56 210,44" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>')


def sinker(n):
    """quả chì câu cá: khối tròn dẹt có móc ở đầu, ô trắng ghi số. Hộp (0,0)–(120,100)."""
    return (f'<path d="M60,20 Q60,4 72,6 Q82,10 74,18" fill="none" {st(4)}/>'
            f'<rect x="8" y="22" width="104" height="74" rx="14" fill="#9AA3AE" {st(2.8)}/>'
            f'<rect x="22" y="34" width="76" height="52" rx="6" fill="{WHITE}" {st(2.4)}/>'
            + num(60, 60, n, 36))


def tuft(x, y, s=1.0, c=GRASS_D):
    d = (f'M{x - 14 * s},{y} Q{x - 12 * s},{y - 12 * s} {x - 20 * s},{y - 20 * s} Q{x - 6 * s},{y - 12 * s} {x - 4 * s},{y - 4 * s} '
         f'Q{x - 2 * s},{y - 18 * s} {x + 2 * s},{y - 28 * s} Q{x + 4 * s},{y - 14 * s} {x + 5 * s},{y - 4 * s} '
         f'Q{x + 10 * s},{y - 14 * s} {x + 20 * s},{y - 18 * s} Q{x + 12 * s},{y - 8 * s} {x + 14 * s},{y} Z')
    return f'<path d="{d}" fill="{c}" {st(2.2)}/>'
