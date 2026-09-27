"""
Bộ nét vẽ dùng chung cho nhóm g2 (ốc sên, rô-bốt, lá sen, bụi cỏ, ngôi nhà, đường đi…).
Tất cả là nét riêng: phẳng, viền INK, màu tươi.

    from kit_g2 import *
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

DISC = '#A9DCF3'


def st(w=2.6, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def pts(p):
    return ' '.join(f'{x:.1f},{y:.1f}' for x, y in p)


def disc(x, y, s, r=19, size=22, fill=DISC):
    """number in a light disc (the question's label)"""
    return (f'<circle cx="{x}" cy="{y}" r="{r}" fill="{fill}" {st(2.2)}/>' +
            text(x, y + size * 0.36, s, size=size, weight=700))


def corridor(p, w=22, sw=2.4, fill=WHITE, cap='butt'):
    """a white lane with ink walls along polyline p (rounded corners)"""
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in p)
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 2 * sw}" stroke-linejoin="round" stroke-linecap="{cap}"/>'
            f'<path d="{d}" fill="none" stroke="{fill}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="{cap}"/>')


def eye(x, y, r=3.6):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/><circle cx="{x + r * .35}" cy="{y - r * .38}" r="{r * .36}" fill="{WHITE}"/>'


def blush(x, y, r=3.6):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{PINK}" opacity=".75"/>'


def smile(x, y, w=8):
    return f'<path d="M{x - w / 2},{y} q{w / 2},{w * .6} {w},0" fill="none" {st(1.6)}/>'


# ── ốc sên ──────────────────────────────────────────────────────────────────
def snail(x, y, s=1.0, face=1, shell=ORANGE, body='#FFE3A3', ring='#FBE0C4'):
    """x,y = bottom centre; face=1 looks right, -1 left; about 60*s wide, 46*s tall"""
    g = []
    k = s
    # body (foot) along the ground, head up at the front
    g.append(f'<path d="M{-30},{0} L{22},{0} C{30},{0} {34},{-6} {30},{-14} L{26},{-30} '
             f'C{24},{-38} {14},{-38} {13},{-30} L{12},{-10} L{-26},{-8} C{-32},{-8} {-34},{-2} {-30},{0} Z" '
             f'fill="{body}" {st(2.4 / k)}/>')
    # antennae
    for dx, tx in ((16, 12), (23, 28)):
        g.append(f'<path d="M{dx},{-32} L{tx},{-46}" fill="none" {st(2 / k)}/>')
        g.append(f'<circle cx="{tx}" cy="{-47}" r="3" fill="{body}" {st(1.8 / k)}/>')
    # shell with spiral
    g.append(f'<circle cx="-6" cy="-22" r="17" fill="{shell}" {st(2.4 / k)}/>')
    g.append(f'<path d="M-6,-22 m0,-3 a3,3 0 1,1 -3,3 a6,6 0 1,1 6,6 a10,10 0 1,1 -10,-10" fill="none" stroke="{INK}" stroke-width="{1.8 / k}" stroke-linecap="round"/>')
    g.append(f'<circle cx="-12" cy="-32" r="3" fill="{ring}" opacity=".8"/>')
    g.append(eye(21, -27, 2.4))
    g.append(blush(26, -20, 2.4))
    sx = face * k
    return f'<g transform="translate({x},{y}) scale({sx},{k})">' + ''.join(g) + '</g>'


# ── rô-bốt nhỏ (nhân vật hỏi) ────────────────────────────────────────────────
def mini_robot(x, y, s=1.0, body='#8FD0F2', light='#E6F5FC'):
    """x,y = feet centre; small robot waving, ~70*s wide, 120*s tall"""
    g = []
    w = 2.4 / s
    # legs
    for dx in (-10, 10):
        g.append(f'<rect x="{dx - 4}" y="-34" width="8" height="26" rx="3" fill="{GREY_L}" {st(w)}/>')
        g.append(f'<rect x="{dx - 10}" y="-10" width="20" height="10" rx="5" fill="{body}" {st(w)}/>')
    # arms
    g.append(f'<path d="M-18,-62 Q-32,-56 -34,-42" fill="none" stroke="{INK}" stroke-width="{9}" stroke-linecap="round"/>'
             f'<path d="M-18,-62 Q-32,-56 -34,-42" fill="none" stroke="{GREY_L}" stroke-width="{5}" stroke-linecap="round"/>')
    g.append(f'<path d="M18,-62 Q30,-72 30,-88" fill="none" stroke="{INK}" stroke-width="{9}" stroke-linecap="round"/>'
             f'<path d="M18,-62 Q30,-72 30,-88" fill="none" stroke="{GREY_L}" stroke-width="{5}" stroke-linecap="round"/>')
    g.append(f'<circle cx="-34" cy="-40" r="6" fill="{body}" {st(w)}/>')
    g.append(f'<circle cx="30" cy="-91" r="6" fill="{body}" {st(w)}/>')
    # body
    g.append(f'<rect x="-20" y="-72" width="40" height="42" rx="12" fill="{body}" {st(w)}/>')
    g.append(f'<rect x="-10" y="-62" width="20" height="14" rx="4" fill="{light}" {st(w * .8)}/>')
    g.append(f'<circle cx="0" cy="-55" r="3" fill="{RED}"/>')
    # head
    g.append(f'<line x1="0" y1="-112" x2="0" y2="-124" {st(w)}/><circle cx="0" cy="-127" r="4" fill="{YELLOW}" {st(w)}/>')
    g.append(f'<rect x="-26" y="-112" width="52" height="40" rx="18" fill="{light}" {st(w)}/>')
    g.append(f'<rect x="-18" y="-104" width="36" height="24" rx="11" fill="#3C5A73"/>')
    for dx in (-8, 8):
        g.append(f'<circle cx="{dx}" cy="-92" r="5" fill="{WHITE}"/><circle cx="{dx + 1}" cy="-92" r="2.4" fill="{INK}"/>')
    for dx in (-29, 29):
        g.append(f'<circle cx="{dx}" cy="-92" r="5" fill="{body}" {st(w)}/>')
    return f'<g transform="translate({x},{y}) scale({s})">' + ''.join(g) + '</g>'


# ── thiên nhiên ──────────────────────────────────────────────────────────────
def tuft(x, y, s=1.0, c=GRASS_D):
    """small grass tuft, base centre x,y"""
    d = (f'M{x - 12 * s},{y} Q{x - 10 * s},{y - 10 * s} {x - 16 * s},{y - 16 * s} Q{x - 5 * s},{y - 10 * s} {x - 4 * s},{y - 4 * s} '
         f'Q{x - 2 * s},{y - 14 * s} {x},{y - 22 * s} Q{x + 3 * s},{y - 12 * s} {x + 4 * s},{y - 4 * s} '
         f'Q{x + 6 * s},{y - 12 * s} {x + 15 * s},{y - 15 * s} Q{x + 10 * s},{y - 8 * s} {x + 12 * s},{y} Z')
    return f'<path d="{d}" fill="{c}" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>'


def lily_pad(x, y, rx, ry=None, rot=0, c='#8ED48A', vein='#5DAF5B', notch=40):
    """round lily pad with a notch (wedge) cut out; rot = notch direction in degrees"""
    ry = ry or rx * .62
    a0, a1 = math.radians(rot - notch / 2), math.radians(rot + notch / 2)
    p0 = (x + rx * math.cos(a1), y + ry * math.sin(a1))
    p1 = (x + rx * math.cos(a0), y + ry * math.sin(a0))
    d = f'M{x},{y} L{p0[0]:.1f},{p0[1]:.1f} A{rx},{ry} 0 1,1 {p1[0]:.1f},{p1[1]:.1f} Z'
    s = [f'<path d="{d}" fill="{c}" {st(2.4)}/>']
    for a in (rot + 90, rot + 180, rot + 270):
        r = math.radians(a)
        s.append(f'<line x1="{x}" y1="{y}" x2="{x + rx * .7 * math.cos(r):.1f}" y2="{y + ry * .7 * math.sin(r):.1f}" stroke="{vein}" stroke-width="1.6" stroke-linecap="round"/>')
    return ''.join(s)


def lotus(x, y, s=1.0, c=PINK, c2='#FBD3E3'):
    """water lily flower seen from above-ish, centre x,y"""
    g = []
    for i in range(8):
        a = i * 45
        g.append(f'<ellipse cx="0" cy="-15" rx="7" ry="15" fill="{c}" {st(1.8)} transform="rotate({a})"/>')
    for i in range(6):
        a = i * 60 + 30
        g.append(f'<ellipse cx="0" cy="-9" rx="5" ry="10" fill="{c2}" {st(1.6)} transform="rotate({a})"/>')
    g.append(f'<circle r="5" fill="{YELLOW}" {st(1.6)}/>')
    return f'<g transform="translate({x},{y}) scale({s})">' + ''.join(g) + '</g>'


def reeds(x, y, s=1.0):
    g = [f'<path d="M-2,0 Q-8,-24 -18,-38 M0,0 Q2,-30 -2,-52 M2,0 Q10,-22 20,-34" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>',
         f'<path d="M-2,0 Q-8,-24 -18,-38 M0,0 Q2,-30 -2,-52 M2,0 Q10,-22 20,-34" fill="none" stroke="{GRASS}" stroke-width="1.6" stroke-linecap="round"/>']
    return f'<g transform="translate({x},{y}) scale({s})">' + ''.join(g) + '</g>'


def pine(x, y, h, c=GREEN, c2=GRASS_D, snow=False):
    """pine tree, base centre x,y, height h"""
    w = h * .55
    s = [f'<rect x="{x - h * .05}" y="{y - h * .14}" width="{h * .1}" height="{h * .14}" fill="{BROWN}" {st(2)}/>']
    for i in range(3):
        top = y - h + i * h * .24
        bot = top + h * .42
        ww = w * (.55 + i * .22)
        s.append(f'<path d="M{x},{top} L{x + ww / 2},{bot} L{x - ww / 2},{bot} Z" fill="{c}" {st(2.2)}/>')
        if snow:
            s.append(f'<path d="M{x},{top} L{x + ww * .18},{top + (bot - top) * .36} L{x},{top + (bot - top) * .28} L{x - ww * .18},{top + (bot - top) * .36} Z" fill="{WHITE}"/>')
    return ''.join(s)


def house(x, y, w=90, h=80, wall=CREAM, roof=RED, door=BROWN):
    """cottage, bottom centre x,y"""
    s = []
    wx, wy = x - w / 2, y - h * .58
    s.append(f'<rect x="{wx}" y="{wy}" width="{w}" height="{h * .58}" fill="{wall}" {st()}/>')
    s.append(f'<path d="M{x - w * .62},{wy + 4} L{x},{y - h} L{x + w * .62},{wy + 4} Z" fill="{roof}" {st()}/>')
    s.append(f'<rect x="{x - w * .14}" y="{y - h * .36}" width="{w * .28}" height="{h * .36}" rx="4" fill="{door}" {st(2.2)}/>')
    s.append(f'<circle cx="{x + w * .08}" cy="{y - h * .17}" r="2" fill="{INK}"/>')
    for sx in (-1, 1):
        cx = x + sx * w * .32
        s.append(f'<rect x="{cx - w * .09}" y="{y - h * .44}" width="{w * .18}" height="{h * .18}" fill="{SKY}" {st(2)}/>')
        s.append(f'<line x1="{cx}" y1="{y - h * .44}" x2="{cx}" y2="{y - h * .26}" {st(1.4)}/>')
    return ''.join(s)


def offset_line(p, d):
    """polyline p offset by d to the left of travel (mitred corners)"""
    out = []
    n = len(p)
    for i in range(n):
        if i == 0:
            dx, dy = p[1][0] - p[0][0], p[1][1] - p[0][1]
            L = math.hypot(dx, dy); nx, ny = dy / L, -dx / L
            out.append((p[0][0] + nx * d, p[0][1] + ny * d))
        elif i == n - 1:
            dx, dy = p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]
            L = math.hypot(dx, dy); nx, ny = dy / L, -dx / L
            out.append((p[i][0] + nx * d, p[i][1] + ny * d))
        else:
            ax, ay = p[i][0] - p[i - 1][0], p[i][1] - p[i - 1][1]
            bx, by = p[i + 1][0] - p[i][0], p[i + 1][1] - p[i][1]
            la, lb = math.hypot(ax, ay), math.hypot(bx, by)
            n1 = (ay / la, -ax / la); n2 = (by / lb, -bx / lb)
            mx, my = n1[0] + n2[0], n1[1] + n2[1]
            lm = math.hypot(mx, my)
            mx, my = mx / lm, my / lm
            k = d / (mx * n1[0] + my * n1[1])
            out.append((p[i][0] + mx * k, p[i][1] + my * k))
    return out


def dashed_lane(p, w=26, c='#4F7FA0', sw=3.2, dash='12 7', fill=WHITE):
    """white lane with dashed edges on both sides"""
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in p)
    s = [f'<path d="{d}" fill="none" stroke="{fill}" stroke-width="{w}" stroke-linejoin="miter"/>']
    for side in (-1, 1):
        q = offset_line(p, side * w / 2)
        s.append(f'<polyline points="{pts(q)}" fill="none" stroke="{c}" stroke-width="{sw}" stroke-dasharray="{dash}"/>')
    return ''.join(s)
