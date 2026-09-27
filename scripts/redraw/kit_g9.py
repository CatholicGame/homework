"""
Bộ vẽ dùng chung cho nhóm g9 (Bài 71–75, Vở BT Toán 2): khối hình, con vật đếm chân,
bò, thỏ, bé gái, rô-bốt. Nét riêng, phẳng, viền INK.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def limb(d, col, w=8):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w - 3.6}" stroke-linecap="round" stroke-linejoin="round"/>')


def g(inner, x=0, y=0, s=1, flip=False, rot=0):
    sx = -s if flip else s
    return f'<g transform="translate({x} {y}) rotate({rot}) scale({sx} {s})">{inner}</g>'


# ── khối hình ───────────────────────────────────────────────────────────────
CUBE = ('#9ED8F5', '#6FB7EA', '#4F9AD0')        # front, top, side
CYL = ('#FFE08A', '#FFD166', '#E9AE3C')
CONE = ('#FFC3A0', '#F4A259')
BOX = ('#C8F0DE', '#9BE0C3', '#6CCFB5')
BALL = ('#F7A1C4', '#E77AA6')


def cuboid(x, y, w, h, d, col=CUBE, sw=2.8):
    """front face top-left at x,y (w×h); depth offset d up-right"""
    f, t, sd = col
    dx, dy = d, -d * 0.8
    return '\n'.join([
        f'<path d="M{x},{y} L{x + dx},{y + dy} L{x + w + dx},{y + dy} L{x + w},{y} Z" fill="{t}" {st(sw)}/>',
        f'<path d="M{x + w},{y} L{x + w + dx},{y + dy} L{x + w + dx},{y + h + dy} L{x + w},{y + h} Z" fill="{sd}" {st(sw)}/>',
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{f}" {st(sw)}/>',
        f'<path d="M{x + 8},{y + h - 10} L{x + 8},{y + 10} L{x + 18},{y + 10}" fill="none" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>',
    ])


def cube(x, y, s, sw=2.8):
    return cuboid(x, y, s, s, s * 0.34, CUBE, sw)


def cylinder(cx, top, w, h, sw=2.8):
    f, t, sd = CYL
    rx, ry = w / 2, w * 0.18
    b = top + h
    return '\n'.join([
        f'<path d="M{cx - rx},{top} L{cx - rx},{b} A{rx},{ry} 0 0 0 {cx + rx},{b} L{cx + rx},{top} Z" fill="{t}" {st(sw)}/>',
        f'<path d="M{cx + rx * 0.45},{top + ry * 0.9} L{cx + rx * 0.45},{b + ry * 0.9} A{rx},{ry} 0 0 0 {cx + rx},{b} L{cx + rx},{top} Z" fill="{sd}" opacity=".55"/>',
        f'<path d="M{cx - rx},{top} L{cx - rx},{b} A{rx},{ry} 0 0 0 {cx + rx},{b} L{cx + rx},{top}" fill="none" {st(sw)}/>',
        f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{f}" {st(sw)}/>',
        f'<line x1="{cx - rx * 0.62}" y1="{top + ry + 8}" x2="{cx - rx * 0.62}" y2="{b - 4}" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round" opacity=".75"/>',
    ])


def cone(cx, top, w, h, sw=2.8):
    f, sd = CONE
    rx, ry = w / 2, w * 0.16
    b = top + h
    return '\n'.join([
        f'<path d="M{cx},{top} L{cx - rx},{b} A{rx},{ry} 0 0 0 {cx + rx},{b} Z" fill="{f}" {st(sw)}/>',
        f'<path d="M{cx},{top} L{cx + rx * 0.35},{b + ry * 0.94} A{rx},{ry} 0 0 0 {cx + rx},{b} Z" fill="{sd}" opacity=".7"/>',
        f'<path d="M{cx},{top} L{cx - rx},{b} A{rx},{ry} 0 0 0 {cx + rx},{b} Z" fill="none" {st(sw)}/>',
        f'<path d="M{cx - rx},{b} A{rx},{ry} 0 0 1 {cx + rx},{b}" fill="none" stroke="{INK}" stroke-width="1.6" stroke-dasharray="5 4" opacity=".55"/>',
        f'<line x1="{cx - 6}" y1="{top + 26}" x2="{cx - rx * 0.5}" y2="{b - 6}" stroke="{WHITE}" stroke-width="3.5" stroke-linecap="round" opacity=".7"/>',
    ])


def sphere(cx, cy, r, sw=2.8):
    f, sd = BALL
    return '\n'.join([
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{f}" {st(sw)}/>',
        f'<path d="M{cx + r * 0.94},{cy - r * 0.34} A{r},{r} 0 0 1 {cx - r * 0.6},{cy + r * 0.8} A{r * 1.05},{r * 1.05} 0 0 0 {cx + r * 0.94},{cy - r * 0.34} Z" fill="{sd}" opacity=".8"/>',
        f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" {st(sw)}/>',
        f'<ellipse cx="{cx - r * 0.38}" cy="{cy - r * 0.4}" rx="{r * 0.24}" ry="{r * 0.15}" fill="{WHITE}" opacity=".85" transform="rotate(-35 {cx - r * 0.38} {cy - r * 0.4})"/>',
    ])


# ── nhóm con vật trong khung bầu dục ───────────────────────────────────────
def oval(w, h):
    return f'<ellipse cx="{w / 2}" cy="{h / 2}" rx="{w / 2 - 3}" ry="{h / 2 - 3}" fill="#F7FBFD" {st(2.6)}/>'


def spider():
    """centred at 0,0; 8 legs (4 each side)"""
    c, cl = '#8C7BD6', '#B9A7F0'
    s = []
    for sx in (-1, 1):
        for i, (a, k) in enumerate(((-62, 1.0), (-22, 1.1), (18, 1.1), (55, 1.0))):
            ar = math.radians(a)
            kx, ky = sx * (14 + 16 * math.cos(ar) * k), -6 + 20 * math.sin(ar) * k - 8
            ex, ey = sx * (24 + 22 * math.cos(ar) * k), 6 + 24 * math.sin(ar) * k
            s.append(limb(f'M{sx * 6},{2 + i * 2 - 3} L{kx:.1f},{ky:.1f} L{ex:.1f},{ey:.1f}', c, 6))
    s.append(f'<ellipse cx="0" cy="8" rx="16" ry="17" fill="{c}" {st()}/>')
    s.append(f'<path d="M-7,6 q7,-6 14,0 M-6,14 q6,-5 12,0" fill="none" stroke="{cl}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<circle cx="0" cy="-12" r="11" fill="{c}" {st()}/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{sx * 4.5}" cy="-13" r="3.8" fill="{WHITE}" {st(1.4)}/><circle cx="{sx * 4.5 + 0.8}" cy="-12.4" r="1.7" fill="{INK}"/>')
    s.append(f'<path d="M-3,-6 q3,2.5 6,0" fill="none" stroke="{INK}" stroke-width="1.5" stroke-linecap="round"/>')
    return '\n'.join(s)


def duck(body=YELLOW, flap=False):
    """standing duck facing right, feet at y=0, centred x=0; two legs"""
    beak = ORANGE
    s = []
    for dx in (-7, 5):
        s.append(f'<line x1="{dx}" y1="-14" x2="{dx}" y2="-3" stroke="{INK}" stroke-width="5" stroke-linecap="round"/>'
                 f'<line x1="{dx}" y1="-14" x2="{dx}" y2="-3" stroke="{beak}" stroke-width="2.2" stroke-linecap="round"/>')
        s.append(f'<path d="M{dx - 3},-2 L{dx + 9},-2 L{dx + 5},-6 L{dx - 1},-6 Z" fill="{beak}" {st(1.8)}/>')
    s.append(f'<path d="M-24,-30 Q-30,-40 -22,-40 Q-14,-36 -6,-34 L14,-34 Q22,-20 10,-12 L-10,-12 Q-26,-14 -24,-30 Z" fill="{body}" {st()}/>')
    if flap:
        s.append(f'<path d="M-8,-30 Q-16,-50 -2,-50 Q6,-42 4,-28 Z" fill="{body}" {st(2.2)}/>')
    else:
        s.append(f'<path d="M-12,-26 Q-2,-16 8,-24 Q0,-30 -12,-26 Z" fill="{WHITE}" opacity=".55" {st(1.8)}/>')
    s.append(f'<circle cx="12" cy="-44" r="11" fill="{body}" {st()}/>')
    s.append(f'<path d="M20,-45 Q32,-44 31,-40 Q26,-37 19,-39 Z" fill="{beak}" {st(1.8)}/>')
    s.append(f'<circle cx="14" cy="-47" r="2.4" fill="{INK}"/><circle cx="14.8" cy="-47.8" r=".9" fill="{WHITE}"/>')
    s.append(f'<circle cx="11" cy="-40" r="2.6" fill="{PINK}" opacity=".7"/>')
    return '\n'.join(s)


def rabbit(fur='#E9E4F2', light=WHITE, run=False, back='#CFC6E0'):
    """side-view rabbit facing right, ground y=0, centred x=0; 4 legs shown"""
    s = []
    if run:
        legs = [('M-18,-22 L-34,-10 L-40,-6', 0), ('M-12,-20 L-26,-6 L-32,-2', 0),
                ('M14,-22 L26,-12 L34,-12', 0), ('M18,-22 L32,-6 L38,-6', 0)]
    else:
        legs = [('M-20,-18 L-24,-2 L-14,-1', 0), ('M-12,-18 L-14,-2 L-4,-1', 0),
                ('M12,-18 L12,-2 L18,-1', 0), ('M20,-18 L22,-2 L28,-1', 0)]
    for i, (d, _) in enumerate(legs):
        s.append(limb(d, back if i in (1, 3) else fur, 8))
    s.append(f'<circle cx="-28" cy="-30" r="7" fill="{light}" {st(2)}/>')
    s.append(f'<ellipse cx="-2" cy="-26" rx="28" ry="15" fill="{fur}" {st()}/>')
    s.append(f'<ellipse cx="0" cy="-22" rx="15" ry="7" fill="{light}" opacity=".7"/>')
    hx, hy = 26, -40
    for dx, rot, c in ((-6, -28, back), (2, -12, fur)):
        s.append(f'<ellipse cx="{hx + dx}" cy="{hy - 20}" rx="5.5" ry="16" fill="{c}" {st(2.2)} transform="rotate({rot} {hx + dx} {hy - 6})"/>')
    s.append(f'<ellipse cx="{hx + 2}" cy="{hy - 21}" rx="2.4" ry="10" fill="{PINK}" opacity=".8" transform="rotate(-12 {hx + 2} {hy - 6})"/>')
    s.append(f'<circle cx="{hx}" cy="{hy}" r="13" fill="{fur}" {st()}/>')
    s.append(f'<circle cx="{hx + 5}" cy="{hy - 3}" r="2.4" fill="{INK}"/><circle cx="{hx + 5.8}" cy="{hy - 3.8}" r=".9" fill="{WHITE}"/>')
    s.append(f'<circle cx="{hx + 12}" cy="{hy + 2}" r="2.2" fill="#E77A93"/>')
    s.append(f'<circle cx="{hx + 3}" cy="{hy + 5}" r="3" fill="{PINK}" opacity=".7"/>')
    return '\n'.join(s)


def ladybug(rot=0):
    """top view, centred at 0,0; 6 legs"""
    s = []
    for sx in (-1, 1):
        for a in (-40, 0, 40):
            ar = math.radians(a)
            s.append(limb(f'M{sx * 12},{a * 0.25:.1f} L{sx * 27 * math.cos(ar):.1f},{27 * math.sin(ar) + 2:.1f} L{sx * 32 * math.cos(ar):.1f},{32 * math.sin(ar) + (6 if a > 0 else -2):.1f}', INK, 4.5))
    s.append(f'<path d="M-4,-26 Q-8,-34 -12,-34 M4,-26 Q8,-34 12,-34" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    s.append(f'<circle cx="-12.5" cy="-34" r="2.2" fill="{INK}"/><circle cx="12.5" cy="-34" r="2.2" fill="{INK}"/>')
    s.append(f'<ellipse cx="0" cy="-20" rx="11" ry="8" fill="{INK}"/>')
    s.append(f'<circle cx="-4.5" cy="-22" r="2.4" fill="{WHITE}"/><circle cx="4.5" cy="-22" r="2.4" fill="{WHITE}"/>')
    s.append(f'<ellipse cx="0" cy="3" rx="20" ry="21" fill="{RED}" {st()}/>')
    s.append(f'<line x1="0" y1="-17" x2="0" y2="24" stroke="{INK}" stroke-width="2.2"/>')
    for x, y, r in ((-9, -6, 4), (9, -6, 4), (-11, 9, 4.2), (11, 9, 4.2), (-5, 18, 2.8), (5, 18, 2.8)):
        s.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/>')
    s.append(f'<ellipse cx="-10" cy="-10" rx="4" ry="2.4" fill="{WHITE}" opacity=".6" transform="rotate(-40 -10 -10)"/>')
    return g('\n'.join(s), rot=rot)
