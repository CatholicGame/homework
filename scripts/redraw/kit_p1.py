"""
Bộ vẽ riêng cho nhóm p1 (Luyện tập Toán 3 — cân, ca, quả cân gam) — nét riêng.
Bổ sung cho kit_measure.py / kit_liquid.py (không sửa hai file đó).

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from kit_p1 import *

Hình lớp 3 là ảnh lớn (1000–1800 px) nên mỗi script vẽ trong "không gian thiết kế"
nhỏ (W/k × H/k) rồi bọc bằng scaled(parts, k) để nét/chữ to đúng tỉ lệ.
Quy ước: (x, y) = điểm giữa đáy của đồ vật, trừ khi ghi khác.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_measure import (balance_scale, weight, label, uid, orange, apple, sack,
                         plush_bear, SCALE, SCALE_D, PAN, METAL, WATER, WATER_DEEP)

SW = 3
STK = f'stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round" stroke-linecap="round"'


def scaled(parts, k):
    return [f'<g transform="scale({k:.4f})">'] + list(parts) + ['</g>']


def place(inner, x, y, s=1.0, flip=False):
    sx = -s if flip else s
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({sx:.4f},{s:.4f})">{inner}</g>'


# ═════════════════════════ QUẢ CÂN CÓ NHÃN CHỈ ═════════════════════════════

def wt(x, y, lab, w=50, dx=0, rise=16, size=22, hr=1.1):
    """Quả cân gang (không chữ trên thân) + nhãn phía trên nối bằng đường chỉ.
    dx: lệch nhãn sang ngang; rise: độ dài đường chỉ; hr: cao/rộng."""
    h = w * hr
    top = y - h
    s = [weight(x, y, '', w=w, h=h)]
    tx, ty = x + dx, top - rise
    s.append(f'<line x1="{x}" y1="{top + 1}" x2="{tx}" y2="{ty}" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    s.append(text(tx, ty - 5, lab, size=size, weight=600))
    return ''.join(s)


# ═════════════════════════ CÂN ĐỒNG HỒ (gam) ══════════════════════════════

def g_dial(cx, by, grams, w=130, items=''):
    """Cân đồng hồ vạch 1 kg / vòng: 1 kg trên cùng, 250 g phải, 500 g dưới, 750 g trái.
    Kim chỉ `grams` (0..1000). items: SVG đồ trên đĩa, (0,0) = mặt đĩa."""
    h = w * 1.0
    top = by - h
    R = w * 0.36
    dcx, dcy = cx, by - h * 0.46
    s = [f'<ellipse cx="{cx}" cy="{by - 1}" rx="{w * .6}" ry="4" fill="{INK}" opacity=".12"/>',
         f'<rect x="{cx - w * .1}" y="{top - 6}" width="{w * .2}" height="14" fill="{SCALE_D}" {STK}/>',
         f'<path d="M{cx - w * .38},{top + 6} H{cx + w * .38} Q{cx + w * .46},{top + 6} {cx + w * .47},{top + 16} '
         f'L{cx + w * .52},{by - 9} Q{cx + w * .52},{by} {cx + w * .43},{by} H{cx - w * .43} '
         f'Q{cx - w * .52},{by} {cx - w * .52},{by - 9} L{cx - w * .47},{top + 16} Q{cx - w * .46},{top + 6} {cx - w * .38},{top + 6} Z" '
         f'fill="{SCALE}" {STK}/>',
         f'<path d="M{cx - w * .6},{top - 12} Q{cx - w * .52},{top - 4} {cx - w * .38},{top - 4} H{cx + w * .38} '
         f'Q{cx + w * .52},{top - 4} {cx + w * .6},{top - 12} Z" fill="{PAN}" {STK}/>',
         f'<rect x="{cx - w * .64}" y="{top - 16}" width="{w * 1.28}" height="6" rx="3" fill="#fff" {STK}/>',
         f'<circle cx="{dcx}" cy="{dcy}" r="{R + 6}" fill="{SCALE_D}" {STK}/>',
         f'<circle cx="{dcx}" cy="{dcy}" r="{R}" fill="#fff" stroke="{INK}" stroke-width="2.5"/>']
    for i in range(20):                       # vạch 50 g
        t = 2 * math.pi * i / 20
        sx, sy = math.sin(t), -math.cos(t)
        L = 8 if i % 5 == 0 else 4.5
        s.append(f'<line x1="{dcx + sx * (R - 2):.1f}" y1="{dcy + sy * (R - 2):.1f}" x2="{dcx + sx * (R - 2 - L):.1f}" '
                 f'y2="{dcy + sy * (R - 2 - L):.1f}" stroke="{INK}" stroke-width="{2 if i % 5 == 0 else 1.4}" stroke-linecap="round"/>')
    fs = R * 0.24
    for v, lab in ((0, '1 kg'), (250, '250 g'), (500, '500 g'), (750, '750 g')):
        t = 2 * math.pi * v / 1000
        if v in (250, 750):          # chữ nằm ngay trên vạch ngang, kim không đè chữ
            sg = 1 if v == 250 else -1
            s.append(text(f'{dcx + sg * (R - 11):.1f}', f'{dcy - 5:.1f}', lab, size=f'{fs:.1f}', weight=700,
                          anchor='end' if sg > 0 else 'start'))
        else:
            rr = R - 12 - fs * .3
            s.append(text(f'{dcx:.1f}', f'{dcy - math.cos(t) * rr + fs * .36:.1f}', lab, size=f'{fs:.1f}', weight=700))
    t = 2 * math.pi * grams / 1000
    s.append(f'<line x1="{dcx}" y1="{dcy}" x2="{dcx + math.sin(t) * (R - 8):.1f}" y2="{dcy - math.cos(t) * (R - 8):.1f}" '
             f'stroke="{RED}" stroke-width="3.2" stroke-linecap="round"/>')
    s.append(f'<circle cx="{dcx}" cy="{dcy}" r="4" fill="{RED}" stroke="{INK}" stroke-width="1.8"/>')
    if items:
        s.append(f'<g transform="translate({cx},{top - 16})">{items}</g>')
    return ''.join(s)


def net_oranges(x, y, w=90, h=58):
    """Túi lưới đựng cam, buộc túm ở trên. (x, y) = giữa đáy."""
    r = w * 0.17
    h = max(h, r * 4.0)
    s = []
    for ox, oy in ((-w * .3, 0), (0, 0), (w * .3, 0), (-w * .15, -r * 1.6), (w * .15, -r * 1.6)):
        s.append(f'<circle cx="{x + ox:.1f}" cy="{y + oy - r:.1f}" r="{r:.1f}" fill="{ORANGE}" stroke="{INK}" stroke-width="2.4"/>'
                 f'<ellipse cx="{x + ox - r * .4:.1f}" cy="{y + oy - r * 1.35:.1f}" rx="{r * .28:.1f}" ry="{r * .18:.1f}" fill="#fff" opacity=".55"/>')
    # lưới: đường bao + ô trám
    top = y - h
    bag = (f'M{x - w * .5},{y - r * .9} Q{x - w * .52},{y + 2} {x - w * .2},{y + 2} H{x + w * .2} '
           f'Q{x + w * .52},{y + 2} {x + w * .5},{y - r * .9} Q{x + w * .44},{top + h * .35} {x + 6},{top + 10} '
           f'H{x - 6} Q{x - w * .44},{top + h * .35} {x - w * .5},{y - r * .9} Z')
    cid = uid('net')
    s.append(f'<clipPath id="{cid}"><path d="{bag}"/></clipPath><g clip-path="url(#{cid})">')
    for k in range(-8, 9):
        s.append(f'<line x1="{x + k * 9 - 40}" y1="{y + 4}" x2="{x + k * 9 + 40}" y2="{top}" stroke="{GREEN}" stroke-width="1.6"/>')
        s.append(f'<line x1="{x + k * 9 + 40}" y1="{y + 4}" x2="{x + k * 9 - 40}" y2="{top}" stroke="{GREEN}" stroke-width="1.6"/>')
    s.append('</g>')
    s.append(f'<path d="{bag}" fill="none" stroke="{GRASS_D}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x - 6},{top + 10} L{x - 12},{top - 2} Q{x},{top + 4} {x + 12},{top - 2} L{x + 6},{top + 10} Z" '
             f'fill="{GREEN}" stroke="{GRASS_D}" stroke-width="2.2" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x - 8}" y="{top + 7}" width="16" height="6" rx="3" fill="{RED}" stroke="{INK}" stroke-width="1.8"/>')
    return ''.join(s)


# ═════════════════════════ HỘP, GÓI ═══════════════════════════════════════

def coffee_bag(x, y, lab, w=110, h=170, col='#E4C9A0', band='#C99A6B'):
    """Gói cà phê giấy xi măng, miệng gấp cuộn, nhãn số gam, hình tách cà phê."""
    top = y - h
    fold = h * .16
    s = [f'<path d="M{x - w * .5},{top + fold} L{x - w * .52},{y - 6} Q{x - w * .52},{y} {x - w * .46},{y} H{x + w * .46} '
         f'Q{x + w * .52},{y} {x + w * .52},{y - 6} L{x + w * .5},{top + fold} Z" fill="{col}" {STK}/>',
         f'<path d="M{x - w * .36},{top + fold + 4} L{x - w * .4},{y - 4}" stroke="{band}" stroke-width="2.4" stroke-linecap="round"/>',
         f'<path d="M{x + w * .36},{top + fold + 4} L{x + w * .4},{y - 4}" stroke="{band}" stroke-width="2.4" stroke-linecap="round"/>',
         f'<rect x="{x - w * .54}" y="{top}" width="{w * 1.08}" height="{fold + 2}" rx="{fold * .4}" fill="{band}" {STK}/>',
         f'<line x1="{x - w * .46}" y1="{top + fold * .5}" x2="{x + w * .46}" y2="{top + fold * .5}" stroke="{INK}" stroke-width="1.8" opacity=".45"/>',
         f'<rect x="{x - w * .4}" y="{top + fold + 12}" width="{w * .8}" height="{h * .2}" rx="8" fill="#FFF8EC" stroke="{INK}" stroke-width="2.4"/>',
         text(x, top + fold + 12 + h * .1 + 9, lab, size=26, weight=700)]
    # tách cà phê + hơi
    cy = y - h * .3
    s.append(f'<path d="M{x - 20},{cy - 14} H{x + 16} Q{x + 14},{cy + 8} {x - 2},{cy + 8} Q{x - 18},{cy + 8} {x - 20},{cy - 14} Z" fill="#fff" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x + 15},{cy - 10} q10,0 8,8 q-2,6 -10,5" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x - 2}" cy="{cy + 11}" rx="26" ry="4" fill="#fff" stroke="{INK}" stroke-width="2.2"/>')
    s.append(f'<ellipse cx="{x - 2}" cy="{cy - 14}" rx="17" ry="3" fill="#7A4B2E"/>')
    for dx in (-8, 4):
        s.append(f'<path d="M{x + dx},{cy - 22} q-5,-6 0,-12 q5,-6 0,-12" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round" opacity=".7"/>')
    return ''.join(s)


def biscuit_box(x, y, w=44, h=52, col='#F4A259', seed=0):
    """Hộp bánh quy vuông có nắp viền, hình bánh tròn trên mặt."""
    top = y - h
    s = [f'<rect x="{x - w / 2}" y="{top + 5}" width="{w}" height="{h - 5}" rx="4" fill="{col}" {STK}/>',
         f'<rect x="{x - w / 2 - 3}" y="{top}" width="{w + 6}" height="11" rx="4" fill="{YELLOW}" {STK}/>',
         f'<circle cx="{x}" cy="{top + h * .58}" r="{w * .26}" fill="#E9C48F" stroke="{INK}" stroke-width="2.2"/>']
    for dx, dy in ((-.1, -.08), (.1, -.02), (-.02, .1)):
        s.append(f'<circle cx="{x + dx * w:.1f}" cy="{top + h * .58 + dy * w:.1f}" r="1.8" fill="{BROWN}"/>')
    return ''.join(s)


def milk_box(x, y, w=40, h=78, col=WHITE, band=BLUE):
    """Hộp sữa giấy có mái gập, dải màu và giọt sữa."""
    top = y - h
    roof = h * .16
    s = [f'<rect x="{x - w / 2}" y="{top + roof}" width="{w}" height="{h - roof}" rx="3" fill="{col}" {STK}/>',
         f'<path d="M{x - w / 2},{top + roof} L{x - w * .3},{top + 4} H{x + w * .3} L{x + w / 2},{top + roof} Z" fill="{col}" {STK}/>',
         f'<rect x="{x - w * .3}" y="{top - 2}" width="{w * .6}" height="7" rx="2" fill="{col}" {STK}/>',
         f'<rect x="{x - w / 2}" y="{top + h * .55}" width="{w}" height="{h * .32}" fill="{band}" {STK}/>',
         f'<path d="M{x},{top + roof + 8} q-8,11 0,16 q8,-5 0,-16 Z" fill="{SKY}" stroke="{INK}" stroke-width="2"/>',
         f'<path d="M{x - w * .3},{top + h * .7} q{w * .15},-6 {w * .3},0 t{w * .3},0" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/>']
    return ''.join(s)


def gift_box(x, y, w=80, h=76, col=PURPLE, rib=RED):
    top = y - h
    lid = h * .2
    s = [f'<rect x="{x - w / 2 + 4}" y="{top + lid}" width="{w - 8}" height="{h - lid}" rx="3" fill="{col}" {STK}/>',
         f'<rect x="{x - 6}" y="{top + lid}" width="12" height="{h - lid}" fill="{rib}" {STK}/>',
         f'<rect x="{x - w / 2}" y="{top}" width="{w}" height="{lid}" rx="3" fill="{col}" {STK}/>',
         f'<rect x="{x - 6}" y="{top}" width="12" height="{lid}" fill="{rib}" {STK}/>',
         f'<path d="M{x},{top} C{x - 30},{top - 28} {x - 36},{top - 2} {x},{top} Z" fill="{rib}" {STK}/>',
         f'<path d="M{x},{top} C{x + 30},{top - 28} {x + 36},{top - 2} {x},{top} Z" fill="{rib}" {STK}/>',
         f'<circle cx="{x}" cy="{top - 1}" r="5" fill="{rib}" {STK}/>']
    return ''.join(s)


def soccer_ball(x, y, r=26):
    """Quả bóng đá (mảng đen ngũ giác). (x, y) = giữa đáy."""
    cx, cy = x, y - r
    cid = uid('ball')

    def pent(px, py, rr, rot=0):
        return ' '.join(f'{px + rr * math.sin(math.radians(rot + 72 * k)):.1f},{py - rr * math.cos(math.radians(rot + 72 * k)):.1f}' for k in range(5))
    s = [f'<clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff"/>', f'<g clip-path="url(#{cid})">',
         f'<polygon points="{pent(cx, cy, r * .32)}" fill="{INK}"/>']
    for k in range(5):
        a = math.radians(72 * k)
        s.append(f'<line x1="{cx + r * .32 * math.sin(a):.1f}" y1="{cy - r * .32 * math.cos(a):.1f}" '
                 f'x2="{cx + r * .62 * math.sin(a):.1f}" y2="{cy - r * .62 * math.cos(a):.1f}" stroke="{INK}" stroke-width="2"/>')
        b = math.radians(72 * k + 36)
        s.append(f'<polygon points="{pent(cx + r * .9 * math.sin(b), cy - r * .9 * math.cos(b), r * .28, 72 * k + 36 + 36)}" fill="{INK}"/>')
    s.append(f'<ellipse cx="{cx - r * .42}" cy="{cy - r * .5}" rx="{r * .16}" ry="{r * .09}" fill="#fff" opacity=".8" '
             f'transform="rotate(-35 {cx - r * .42:.1f} {cy - r * .5:.1f})"/></g>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{INK}" stroke-width="{SW}"/>')
    return ''.join(s)


def toy_car(x, y, w=110, col=RED):
    """Ô tô đồ chơi lên dây cót (chìa vặn trên nóc). (x, y) = giữa đáy bánh."""
    k = w / 110
    s = [f'<path d="M-30,-40 L-18,-58 Q-15,-62 -10,-62 H18 Q23,-62 26,-58 L38,-40 Z" fill="{col}" {STK}/>',
         f'<path d="M-22,-41 L-13,-55 H2 V-41 Z" fill="#DFF3FF" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>',
         f'<path d="M8,-41 V-55 H20 L29,-41 Z" fill="#DFF3FF" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>',
         f'<path d="M-50,-38 Q-50,-42 -44,-42 H44 Q54,-40 55,-30 V-20 Q55,-15 50,-15 H-50 Q-55,-15 -55,-20 V-32 Q-55,-38 -50,-38 Z" fill="{col}" {STK}/>',
         f'<ellipse cx="50" cy="-32" rx="4" ry="3.5" fill="{YELLOW}" stroke="{INK}" stroke-width="1.8"/>',
         f'<line x1="-40" y1="-34" x2="-20" y2="-34" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".5"/>',
         # chìa vặn dây cót
         f'<line x1="4" y1="-62" x2="4" y2="-70" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>',
         f'<path d="M4,-70 C-8,-82 -14,-68 4,-70 C22,-68 16,-82 4,-70 Z" fill="{YELLOW}" {STK}/>']
    for wx in (-32, 34):
        s.append(f'<circle cx="{wx}" cy="-13" r="13" fill="{INK}"/><circle cx="{wx}" cy="-13" r="6.5" fill="{GREY_L}" stroke="{INK}" stroke-width="1.8"/>')
    return place(''.join(s), x, y, k)


# ═════════════════════════ CA, BÌNH ═══════════════════════════════════════

def mug(cx, by, w, h, col='#BFE3F7', water=WATER):
    """Ca nhựa trong, đầy nước, quai vuông bên phải, đế có gờ sọc."""
    top = by - h
    bh = h * .14
    x0, x1 = cx - w / 2, cx + w / 2
    ins = w * .05
    body = f'M{x0},{top} H{x1} L{x1 - ins},{by - bh} H{x0 + ins} Z'
    s = [f'<path d="M{x1 - 2},{top + h * .12} H{x1 + w * .32} V{by - bh - h * .2} H{x1 - ins - 1}" fill="none" stroke="{INK}" stroke-width="9" stroke-linejoin="round"/>',
         f'<path d="M{x1 - 2},{top + h * .12} H{x1 + w * .32} V{by - bh - h * .2} H{x1 - ins - 1}" fill="none" stroke="{col}" stroke-width="3.6" stroke-linejoin="round"/>',
         f'<path d="{body}" fill="{water}" {STK}/>',
         f'<ellipse cx="{cx}" cy="{top + 5}" rx="{w / 2 - 3}" ry="4" fill="{WATER_DEEP}" opacity=".45"/>',
         f'<line x1="{x0 + w * .18}" y1="{top + h * .2}" x2="{x0 + w * .2}" y2="{by - bh - h * .12}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>',
         f'<rect x="{x0 + ins - 1}" y="{by - bh}" width="{w - 2 * ins + 2}" height="{bh}" rx="2" fill="#fff" {STK}/>',
         f'<line x1="{x0 - 2}" y1="{top}" x2="{x1 + 2}" y2="{top}" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>']
    n = max(4, int(w / 7))
    for k in range(1, n):
        gx = x0 + ins + (w - 2 * ins) * k / n
        s.append(f'<line x1="{gx:.1f}" y1="{by - bh + 3:.1f}" x2="{gx:.1f}" y2="{by - 3:.1f}" stroke="{INK}" stroke-width="1.6"/>')
    return ''.join(s)


def tilted_jug(px, py, w=120, h=96, deg=-28, col='#BFE3F7', flip=False):
    """Bình nước nghiêng đang rót (thân tròn bầu, quai phải, mỏ trái).
    (px, py) = vị trí mỏ rót sau khi nghiêng."""
    # vẽ bình đứng với mỏ ở (0,0), rồi xoay quanh mỏ
    x0 = 6
    s = [f'<path d="M{x0 + w * .78},{h * .12} C{x0 + w * 1.12},{h * .1} {x0 + w * 1.12},{h * .7} {x0 + w * .82},{h * .68}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>',
         f'<path d="M{x0 + w * .78},{h * .12} C{x0 + w * 1.12},{h * .1} {x0 + w * 1.12},{h * .7} {x0 + w * .82},{h * .68}" fill="none" stroke="{col}" stroke-width="4" stroke-linecap="round"/>',
         f'<path d="M0,0 L{x0 + w * .12},{h * .04} H{x0 + w * .82} Q{x0 + w * .9},{h * .45} {x0 + w * .84},{h - 6} '
         f'Q{x0 + w * .83},{h} {x0 + w * .76},{h} H{x0 + w * .16} Q{x0 + w * .09},{h} {x0 + w * .08},{h - 6} '
         f'Q{x0 + w * .02},{h * .45} {x0 + w * .12},{h * .16} Z" fill="{col}" {STK}/>',
         f'<line x1="{x0 + w * .22}" y1="{h * .25}" x2="{x0 + w * .2}" y2="{h * .72}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/>',
         f'<line x1="{x0 + w * .1}" y1="{h * .04}" x2="{x0 + w * .84}" y2="{h * .04}" stroke="{INK}" stroke-width="4.5" stroke-linecap="round"/>']
    fl = ' scale(-1,1)' if flip else ''
    return f'<g transform="translate({px},{py}) rotate({deg}){fl}">{"".join(s)}</g>'


def stream(x1, y1, x2, y2, w=7):
    mx = (x1 + x2) / 2 - 4
    return (f'<path d="M{x1},{y1} Q{mx},{(y1 + y2) / 2} {x2},{y2}" fill="none" stroke="{INK}" stroke-width="{w + 5}" stroke-linecap="round"/>'
            f'<path d="M{x1},{y1} Q{mx},{(y1 + y2) / 2} {x2},{y2}" fill="none" stroke="{WATER}" stroke-width="{w}" stroke-linecap="round"/>')


# ═════════════════════════ RAU QUẢ ═══════════════════════════════════════

def pea_pod(cx, cy, L=64, rot=-28):
    """Quả đỗ (đậu Hà Lan) cong nằm chéo, có 4 hạt nổi và cuống. (cx, cy) = tâm."""
    hl = L / 2
    d = (f'M{-hl},{4} C{-hl * .6},{-14} {hl * .4},{-16} {hl},{-6} '
         f'C{hl * .5},{8} {-hl * .4},{14} {-hl},{4} Z')
    s = [f'<path d="{d}" fill="{GREEN}" {STK}/>']
    for k in range(4):
        t = -hl * .55 + k * hl * .36
        s.append(f'<circle cx="{t:.1f}" cy="{-2 - k * .8:.1f}" r="{L * .075:.1f}" fill="#A8DE8F" stroke="{GRASS_D}" stroke-width="1.6"/>')
    s.append(f'<path d="M{hl - 2},{-6} q6,-4 5,-10" fill="none" stroke="{GRASS_D}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<path d="M{-hl * .7},{8} C{-hl * .2},{11} {hl * .4},{4} {hl * .8},{-4}" fill="none" stroke="{GRASS_D}" stroke-width="1.6" opacity=".7"/>')
    return f'<g transform="translate({cx:.1f},{cy:.1f}) rotate({rot})">{"".join(s)}</g>'


def broccoli(cx, cy, s=1.0):
    """Cây súp lơ xanh: tán 5 bông tròn + cuống. (cx, cy) = tâm."""
    stem = '#B7E08E'
    p = [f'<path d="M-9,4 L-7,26 Q0,30 7,26 L9,4 Z" fill="{stem}" {STK}/>',
         f'<path d="M-4,8 L-10,-2 M4,8 L10,-2" stroke="{GRASS_D}" stroke-width="2.2" stroke-linecap="round"/>']
    for bx, by, r in ((-16, -4, 11), (16, -4, 11), (-9, -16, 12), (9, -16, 12), (0, -4, 11)):
        p.append(f'<circle cx="{bx}" cy="{by}" r="{r}" fill="{GRASS_D}" {STK}/>')
    for bx, by in ((-12, -18), (6, -20), (-18, -6), (13, -7), (-2, -8)):
        p.append(f'<circle cx="{bx}" cy="{by}" r="2.4" fill="{GREEN}"/>')
    return f'<g transform="translate({cx:.1f},{cy:.1f}) scale({s})">{"".join(p)}</g>'


def loop(d, sw=2.6):
    return f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>'
