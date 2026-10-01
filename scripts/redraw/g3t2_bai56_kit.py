"""
Bộ nét vẽ riêng cho lô Vở BT Toán 3 Tập hai, Bài 55–58: voi, ngựa, chó, khúc gỗ,
kiến, cục pin, cà cuống, tôm, rong. Nét riêng: phẳng, viền INK, màu tươi.

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    from g3t2_bai56_kit import *

Mọi hàm vẽ quanh gốc (0,0) = giữa đáy (chỗ chạm đất), rồi đặt bằng put().
"""
from common import *

EL, EL_D, EL_L = '#B7C2CE', '#8E9BAA', '#DDE3EA'


def st(w=2.6, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def put(x, y, inner, s=1.0, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


def elephant(pose='stand', body=EL, dark=EL_D, light=EL_L, sw=2.6):
    """Voi nhìn sang phải, cao ~110, dài ~150. pose: stand | trunk_up | sit."""
    s = []
    # đuôi
    s.append(f'<path d="M-62,-62 Q-80,-50 -76,-30" fill="none" {st(sw)}/>')
    s.append(f'<ellipse cx="-76" cy="-27" rx="4" ry="6" fill="{dark}" {st(1.6)}/>')
    if pose == 'sit':
        # ngồi: chân sau gập, chân trước chống
        s.append(f'<ellipse cx="-30" cy="-12" rx="34" ry="14" fill="{dark}" {st(sw)}/>')
        s.append(f'<path d="M-66,-40 Q-70,-100 -10,-104 Q40,-106 44,-60 L44,-20 Q10,-6 -40,-8 Q-66,-12 -66,-40 Z" fill="{body}" {st(sw)}/>')
        for lx in (18, 38):
            s.append(f'<rect x="{lx - 9}" y="-50" width="18" height="50" rx="6" fill="{body}" {st(sw)}/>')
            s.append(f'<path d="M{lx - 7},-4 h14" {st(1.6)}/>')
    else:
        for lx, c in ((-44, dark), (22, dark), (-28, body), (38, body)):
            s.append(f'<rect x="{lx - 10}" y="-52" width="20" height="52" rx="7" fill="{c}" {st(sw)}/>')
            s.append(f'<path d="M{lx - 7},-5 h14" {st(1.6)}/>')
        s.append(f'<ellipse cx="-4" cy="-66" rx="64" ry="38" fill="{body}" {st(sw)}/>')
        s.append(f'<path d="M-40,-82 Q-10,-96 24,-86" fill="none" stroke="{light}" stroke-width="6" stroke-linecap="round"/>')
    # đầu
    hx, hy = 52, -84
    if pose == 'trunk_up':
        s.append(f'<path d="M{hx + 18},{hy + 8} Q{hx + 44},{hy - 2} {hx + 40},{hy - 36} Q{hx + 38},{hy - 50} {hx + 50},{hy - 54}" fill="none" stroke="{INK}" stroke-width="{16 + 2 * sw}" stroke-linecap="round"/>')
        s.append(f'<path d="M{hx + 18},{hy + 8} Q{hx + 44},{hy - 2} {hx + 40},{hy - 36} Q{hx + 38},{hy - 50} {hx + 50},{hy - 54}" fill="none" stroke="{body}" stroke-width="16" stroke-linecap="round"/>')
    else:
        s.append(f'<path d="M{hx + 18},{hy + 6} Q{hx + 40},{hy + 20} {hx + 36},{hy + 56} Q{hx + 36},{hy + 66} {hx + 46},{hy + 64}" fill="none" stroke="{INK}" stroke-width="{16 + 2 * sw}" stroke-linecap="round"/>')
        s.append(f'<path d="M{hx + 18},{hy + 6} Q{hx + 40},{hy + 20} {hx + 36},{hy + 56} Q{hx + 36},{hy + 66} {hx + 46},{hy + 64}" fill="none" stroke="{body}" stroke-width="16" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx}" cy="{hy}" r="30" fill="{body}" {st(sw)}/>')
    s.append(f'<path d="M{hx - 8},{hy - 20} Q{hx - 46},{hy - 30} {hx - 44},{hy + 6} Q{hx - 40},{hy + 30} {hx - 10},{hy + 20} Z" fill="{light}" {st(sw)}/>')
    s.append(f'<circle cx="{hx + 14}" cy="{hy - 6}" r="3.6" fill="{INK}"/><circle cx="{hx + 15.2}" cy="{hy - 7.3}" r="1.3" fill="#fff"/>')
    s.append(f'<circle cx="{hx + 16}" cy="{hy + 8}" r="4" fill="{PINK}" opacity=".6"/>')
    s.append(f'<path d="M{hx + 22},{hy + 14} q8,2 12,-4" fill="{WHITE}" {st(1.8)}/>')
    return ''.join(s)


def horse(body='#FFF7EC', mane='#3E8FC7', sw=2.6):
    """Ngựa nhìn sang phải, cao ~110 (tới tai), dài ~130."""
    s = []
    s.append(f'<path d="M-52,-70 Q-78,-60 -70,-26" fill="none" stroke="{INK}" stroke-width="{10 + 2 * sw}" stroke-linecap="round"/>')
    s.append(f'<path d="M-52,-70 Q-78,-60 -70,-26" fill="none" stroke="{mane}" stroke-width="10" stroke-linecap="round"/>')
    for lx in (-40, -24, 22, 38):
        s.append(f'<path d="M{lx},-54 L{lx},-6" stroke="{INK}" stroke-width="{10 + 2 * sw}" stroke-linecap="round"/>')
        s.append(f'<path d="M{lx},-54 L{lx},-6" stroke="{body}" stroke-width="10" stroke-linecap="round"/>')
        s.append(f'<rect x="{lx - 7}" y="-8" width="14" height="8" rx="2" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="-66" rx="56" ry="24" fill="{body}" {st(sw)}/>')
    # cổ + đầu
    s.append(f'<path d="M30,-80 L46,-118 L66,-112 L54,-70 Z" fill="{body}" {st(sw)}/>')
    s.append(f'<path d="M44,-126 Q58,-138 86,-116 Q96,-106 88,-100 Q70,-96 50,-104 Z" fill="{body}" {st(sw)}/>')
    s.append(f'<path d="M46,-126 L44,-142 L56,-130 Z" fill="{body}" {st(2)}/>')
    s.append(f'<path d="M44,-124 Q30,-104 30,-80 L38,-84 Q40,-104 52,-120 Z" fill="{mane}" {st(2)}/>')
    s.append(f'<circle cx="64" cy="-118" r="3.2" fill="{INK}"/><circle cx="65" cy="-119" r="1.1" fill="#fff"/>')
    s.append(f'<circle cx="86" cy="-106" r="2" fill="{INK}"/>')
    return ''.join(s)


def dog(body='#E6B37F', ear='#8A5A3B', sw=2.6):
    """Chó con nhìn sang phải, cao ~70, dài ~80."""
    s = []
    s.append(f'<path d="M-30,-40 Q-44,-54 -40,-64" fill="none" {st(4)}/>')
    for lx in (-24, -12, 14, 26):
        s.append(f'<rect x="{lx - 5}" y="-30" width="10" height="30" rx="4" fill="{body}" {st(sw)}/>')
    s.append(f'<ellipse cx="0" cy="-34" rx="34" ry="16" fill="{body}" {st(sw)}/>')
    s.append(f'<circle cx="30" cy="-52" r="17" fill="{body}" {st(sw)}/>')
    s.append(f'<ellipse cx="44" cy="-46" rx="9" ry="7" fill="{WHITE}" {st(2)}/>')
    s.append(f'<circle cx="50" cy="-48" r="3" fill="{INK}"/>')
    s.append(f'<path d="M20,-66 Q10,-60 14,-40 Q24,-46 26,-62 Z" fill="{ear}" {st(2)}/>')
    s.append(f'<circle cx="34" cy="-56" r="2.8" fill="{INK}"/>')
    return ''.join(s)


def log(w=140, h=46, sw=2.8, bark='#C9A27A', end='#F2DDBE'):
    """Khúc gỗ nằm ngang, gốc = giữa đáy."""
    s = [f'<path d="M{-w / 2},{-h} L{w / 2},{-h} A{h * .28},{h / 2} 0 0 1 {w / 2},0 L{-w / 2},0 Z" fill="{bark}" {st(sw)}/>',
         f'<path d="M{-w / 2 + 16},{-h * .62} h{w * .42} M{-w / 2 + 30},{-h * .3} h{w * .5}" fill="none" stroke="#A67C52" stroke-width="3" stroke-linecap="round"/>',
         f'<ellipse cx="{-w / 2}" cy="{-h / 2}" rx="{h * .28}" ry="{h / 2}" fill="{end}" {st(sw)}/>',
         f'<ellipse cx="{-w / 2}" cy="{-h / 2}" rx="{h * .14}" ry="{h / 4}" fill="none" stroke="#C9A27A" stroke-width="2"/>']
    return ''.join(s)


def ant(col=INK, sw=1.6):
    """Kiến nhìn lên trên, dài ~34 (gốc = đuôi)."""
    s = []
    for dy, sp in ((-14, 10), (-18, 11), (-22, 10)):
        s.append(f'<path d="M-{sp},{dy + 6} L0,{dy} L{sp},{dy + 6}" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="0" cy="-6" rx="5" ry="7" fill="{col}"/>')
    s.append(f'<ellipse cx="0" cy="-18" rx="3.4" ry="5" fill="{col}"/>')
    s.append(f'<circle cx="0" cy="-27" r="4.2" fill="{col}"/>')
    s.append(f'<path d="M-2,-30 Q-6,-38 -9,-38 M2,-30 Q6,-38 9,-38" fill="none" stroke="{col}" stroke-width="{sw}" stroke-linecap="round"/>')
    return ''.join(s)


def battery(w=40, h=18, body='#6FB7EA', cap='#DDE9F3', sw=2.2):
    """Cục pin nằm ngang, gốc = giữa đáy."""
    return (f'<rect x="{-w / 2}" y="{-h}" width="{w}" height="{h}" rx="4" fill="{body}" {st(sw)}/>'
            f'<rect x="{w / 2 - 1}" y="{-h * .72}" width="6" height="{h * .44}" rx="1.5" fill="{cap}" {st(sw * .8)}/>'
            f'<rect x="{-w / 2 + 4}" y="{-h + 4}" width="{w * .35}" height="{h - 8}" rx="2" fill="{YELLOW}" stroke="none"/>')


def beetle(letter='', body='#6FB7EA', sw=2.4):
    """Cà cuống nhìn sang phải, dài ~80, gốc = tâm thân."""
    s = []
    for dx, dy1, dy2 in ((-16, -26, -34), (4, -24, -36), (22, -20, -30)):
        s.append(f'<path d="M{dx},0 L{dx - 8},{dy1} L{dx - 18},{dy2}" fill="none" {st(2.4)}/>')
        s.append(f'<path d="M{dx},0 L{dx - 8},{-dy1} L{dx - 18},{-dy2}" fill="none" {st(2.4)}/>')
    s.append(f'<path d="M-40,0 Q-30,-18 10,-16 Q32,-14 34,0 Q32,14 10,16 Q-30,18 -40,0 Z" fill="{body}" {st(sw)}/>')
    s.append(f'<path d="M-36,0 L30,0" stroke="{INK}" stroke-width="1.6"/>')
    s.append(f'<ellipse cx="42" cy="0" rx="10" ry="11" fill="{body}" {st(sw)}/>')
    s.append(f'<circle cx="46" cy="-6" r="4" fill="#fff" {st(1.4)}/><circle cx="47" cy="-6" r="1.8" fill="{INK}"/>')
    s.append(f'<circle cx="46" cy="6" r="4" fill="#fff" {st(1.4)}/><circle cx="47" cy="6" r="1.8" fill="{INK}"/>')
    s.append(f'<path d="M50,-8 L62,-18 M50,8 L62,18" fill="none" {st(2)}/>')
    if letter:
        s.append(f'<circle cx="-6" cy="0" r="12" fill="#fff" {st(1.8)}/>')
        s.append(text(-6, 6, letter, size=17, weight=700))
    return ''.join(s)


def shrimp(body='#F4A259', sw=2.2):
    """Tôm nhìn sang phải, dài ~60, gốc = tâm."""
    s = []
    s.append(f'<path d="M20,-6 Q40,-30 58,-30 M22,-4 Q44,-20 60,-16" fill="none" {st(1.4)}/>')
    s.append(f'<path d="M-30,6 Q-26,-12 0,-12 Q22,-12 26,-2 Q24,8 6,8 Q-12,8 -20,14 Z" fill="{body}" {st(sw)}/>')
    s.append(f'<path d="M-30,6 L-40,0 L-38,14 Z" fill="{body}" {st(sw)}/>')
    for dx in (-14, -4, 6):
        s.append(f'<path d="M{dx},-11 Q{dx + 3},-2 {dx},8" fill="none" stroke="{INK}" stroke-width="1.2"/>')
    s.append(f'<circle cx="18" cy="-6" r="2.2" fill="{INK}"/>')
    return ''.join(s)


def seaweed(h=70, col=GREEN, sw=2.4):
    """Cụm rong, gốc = giữa đáy."""
    s = []
    for dx, hh, bend in ((-14, h * .8, -10), (0, h, 8), (14, h * .75, 12), (-4, h * .6, -14)):
        s.append(f'<path d="M{dx - 4},0 Q{dx + bend},{-hh * .5} {dx + bend * .4},{-hh} Q{dx + bend + 6},{-hh * .5} {dx + 4},0 Z" fill="{col}" {st(sw)}/>')
    return ''.join(s)
