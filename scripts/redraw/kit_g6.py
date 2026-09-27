"""
Bộ vẽ chung cho nhóm g6 (Bài 47 hình khối, Bài 50–55): khối trụ, khối cầu, khối hộp,
khối lập phương, cây, hoa, nấm, đồng hồ. Nét riêng, phẳng, viền INK.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

_n = [0]


def uid(p='g6'):
    _n[0] += 1
    return f'{p}{_n[0]}'


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def mix(c, k):
    """darken (k<0) or lighten (k>0) a #rrggbb colour"""
    c = c.lstrip('#')
    r, g, b = (int(c[i:i + 2], 16) for i in (0, 2, 4))
    if k >= 0:
        r, g, b = (v + (255 - v) * k for v in (r, g, b))
    else:
        r, g, b = (v * (1 + k) for v in (r, g, b))
    return '#%02X%02X%02X' % (int(r), int(g), int(b))


# ── khối ────────────────────────────────────────────────────────────────────

def cyl_up(cx, top, w, h, fill=BLUE, sw=3, top_fill=None, ry=None, shine=True, inner=''):
    """standing cylinder; top = y of the top ellipse centre"""
    rx = w / 2
    ry = ry if ry is not None else max(w * 0.17, 4)
    l, r, b = cx - rx, cx + rx, top + h
    tf = top_fill or mix(fill, .45)
    s = [f'<path d="M{l},{top} L{l},{b} A{rx},{ry} 0 0 0 {r},{b} L{r},{top} Z" fill="{fill}" {st(sw)}/>']
    if inner:
        s.append(inner)
    if shine:
        s.append(f'<path d="M{l + w * .2},{top + ry + 4} L{l + w * .2},{b - 2}" stroke="{WHITE}" stroke-width="{max(w * .08, 2):.1f}" stroke-linecap="round" opacity=".55"/>')
    s.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{tf}" {st(sw)}/>')
    return '\n'.join(s)


def cyl_side(cx, cy, w, h, fill=BLUE, sw=3, end_fill=None, rx=None, shine=True, rings=False):
    """lying cylinder (axis horizontal), round end visible on the right"""
    ry = h / 2
    rx = rx if rx is not None else max(h * 0.17, 4)
    l, r = cx - w / 2 + rx, cx + w / 2 - rx
    t, b = cy - ry, cy + ry
    ef = end_fill or mix(fill, .45)
    s = [f'<path d="M{r},{t} L{l},{t} A{rx},{ry} 0 0 0 {l},{b} L{r},{b} Z" fill="{fill}" {st(sw)}/>']
    if shine:
        s.append(f'<path d="M{l + 4},{t + h * .2} L{r - rx - 2},{t + h * .2}" stroke="{WHITE}" stroke-width="{max(h * .08, 2):.1f}" stroke-linecap="round" opacity=".55"/>')
    s.append(f'<ellipse cx="{r}" cy="{cy}" rx="{rx}" ry="{ry}" fill="{ef}" {st(sw)}/>')
    if rings:
        for k in (.33, .66):
            s.append(f'<ellipse cx="{r}" cy="{cy}" rx="{rx * k:.1f}" ry="{ry * k:.1f}" fill="none" stroke="{mix(fill, -.3)}" stroke-width="1.6"/>')
    return '\n'.join(s)


def sphere(cx, cy, r, fill=BLUE, sw=3, shine=True):
    g = uid('sp')
    s = [f'<defs><radialGradient id="{g}" cx=".38" cy=".34" r=".75">'
         f'<stop offset="0" stop-color="{mix(fill, .55)}"/><stop offset=".55" stop-color="{fill}"/>'
         f'<stop offset="1" stop-color="{mix(fill, -.18)}"/></radialGradient></defs>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{g})" {st(sw)}/>']
    if shine:
        s.append(f'<ellipse cx="{cx - r * .38:.1f}" cy="{cy - r * .42:.1f}" rx="{r * .2:.1f}" ry="{r * .12:.1f}" '
                 f'transform="rotate(-35 {cx - r * .38:.1f} {cy - r * .42:.1f})" fill="{WHITE}" opacity=".8"/>')
    return '\n'.join(s)


def box(x, y, w, h, d, fill=YELLOW, sw=3, top=None, side=None, dx=None, dy=None):
    """cuboid: front face top-left x,y size w×h; depth drawn up-right"""
    dx = d * .7 if dx is None else dx
    dy = d * .5 if dy is None else dy
    top = top or mix(fill, .4)
    side = side or mix(fill, -.15)
    return '\n'.join([
        f'<path d="M{x},{y} L{x + dx},{y - dy} L{x + w + dx},{y - dy} L{x + w},{y} Z" fill="{top}" {st(sw)}/>',
        f'<path d="M{x + w},{y} L{x + w + dx},{y - dy} L{x + w + dx},{y + h - dy} L{x + w},{y + h} Z" fill="{side}" {st(sw)}/>',
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" {st(sw)}/>',
    ])


# ── cảnh vật ────────────────────────────────────────────────────────────────

def tree(x, y, s=1.0, crown=GREEN, trunk=BROWN, sw=2.6):
    """x,y = trunk foot centre"""
    k = s
    p = [f'<path d="M{x - 7 * k},{y} L{x - 5 * k},{y - 44 * k} L{x + 5 * k},{y - 44 * k} L{x + 7 * k},{y} Z" fill="{trunk}" {st(sw)}/>']
    cy = y - 70 * k
    p.append(f'<path d="M{x - 38 * k},{cy + 12 * k} C{x - 52 * k},{cy - 6 * k} {x - 36 * k},{cy - 34 * k} {x - 16 * k},{cy - 30 * k} '
             f'C{x - 10 * k},{cy - 50 * k} {x + 18 * k},{cy - 50 * k} {x + 22 * k},{cy - 28 * k} '
             f'C{x + 44 * k},{cy - 30 * k} {x + 52 * k},{cy - 2 * k} {x + 38 * k},{cy + 14 * k} '
             f'C{x + 30 * k},{cy + 30 * k} {x - 30 * k},{cy + 30 * k} {x - 38 * k},{cy + 12 * k} Z" fill="{crown}" {st(sw)}/>')
    p.append(f'<path d="M{x - 24 * k},{cy - 8 * k} q6,-12 18,-14" fill="none" stroke="{WHITE}" stroke-width="{3 * k:.1f}" stroke-linecap="round" opacity=".6"/>')
    return '\n'.join(p)


def flower(x, y, s=1.0, petal=PINK, sw=2.2):
    """x,y = stem foot"""
    k = s
    hy = y - 46 * k
    p = [f'<path d="M{x},{y} Q{x - 4 * k},{y - 24 * k} {x},{hy}" fill="none" stroke="{GRASS_D}" stroke-width="{3.4 * k:.1f}" stroke-linecap="round"/>',
         f'<path d="M{x - 1 * k},{y - 16 * k} q-14,-4 -16,-14 q12,0 16,12 Z" fill="{GREEN}" {st(sw * .8)}/>',
         f'<path d="M{x},{y - 24 * k} q14,-4 16,-14 q-12,0 -16,12 Z" fill="{GREEN}" {st(sw * .8)}/>']
    for i in range(5):
        a = -math.pi / 2 + i * 2 * math.pi / 5
        p.append(f'<circle cx="{x + 9 * k * math.cos(a):.1f}" cy="{hy + 9 * k * math.sin(a):.1f}" r="{7 * k:.1f}" fill="{petal}" {st(sw)}/>')
    p.append(f'<circle cx="{x}" cy="{hy}" r="{5.5 * k:.1f}" fill="{YELLOW}" {st(sw)}/>')
    return '\n'.join(p)


def mushroom(x, y, s=1.0, cap=RED, sw=2):
    """x,y = foot centre"""
    k = s
    p = [f'<path d="M{x - 6 * k},{y} L{x - 5 * k},{y - 12 * k} L{x + 5 * k},{y - 12 * k} L{x + 6 * k},{y} Z" fill="{CREAM}" {st(sw)}/>',
         f'<path d="M{x - 15 * k},{y - 11 * k} C{x - 15 * k},{y - 30 * k} {x + 15 * k},{y - 30 * k} {x + 15 * k},{y - 11 * k} Z" fill="{cap}" {st(sw)}/>',
         f'<circle cx="{x - 6 * k}" cy="{y - 18 * k}" r="{2.6 * k:.1f}" fill="{WHITE}"/>',
         f'<circle cx="{x + 5 * k}" cy="{y - 21 * k}" r="{2.2 * k:.1f}" fill="{WHITE}"/>']
    return '\n'.join(p)


def clock(cx, cy, r, h, m, sw=3, rim=BLUE):
    """analogue clock face with 12 numbers, hour h, minute m"""
    p = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{rim}" {st(sw)}/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r * .86:.1f}" fill="{WHITE}" {st(sw * .7)}/>']
    for i in range(60):
        a = math.radians(i * 6 - 90)
        r1 = r * (.78 if i % 5 == 0 else .81)
        p.append(f'<line x1="{cx + r1 * math.cos(a):.1f}" y1="{cy + r1 * math.sin(a):.1f}" x2="{cx + r * .84 * math.cos(a):.1f}" '
                 f'y2="{cy + r * .84 * math.sin(a):.1f}" stroke="{INK}" stroke-width="{1.8 if i % 5 == 0 else 0.9}"/>')
    fs = r * .2
    for n in range(1, 13):
        a = math.radians(n * 30 - 90)
        p.append(text(f'{cx + r * .64 * math.cos(a):.1f}', f'{cy + r * .64 * math.sin(a) + fs * .36:.1f}', str(n), size=f'{fs:.1f}', weight=700))
    ha = math.radians((h % 12 + m / 60) * 30 - 90)
    ma = math.radians(m * 6 - 90)
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .36 * math.cos(ha):.1f}" y2="{cy + r * .36 * math.sin(ha):.1f}" stroke="{INK}" stroke-width="{r * .075:.1f}" stroke-linecap="round"/>')
    p.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + r * .52 * math.cos(ma):.1f}" y2="{cy + r * .52 * math.sin(ma):.1f}" stroke="{INK}" stroke-width="{r * .05:.1f}" stroke-linecap="round"/>')
    p.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .05:.1f}" fill="{RED}" {st(1.4)}/>')
    return '\n'.join(p)


def eyes_smile(cx, cy, gap=8, r=3, sw=1.8):
    return '\n'.join([
        f'<circle cx="{cx - gap}" cy="{cy}" r="{r}" fill="{INK}"/><circle cx="{cx - gap + r * .35:.1f}" cy="{cy - r * .4:.1f}" r="{r * .35:.1f}" fill="{WHITE}"/>',
        f'<circle cx="{cx + gap}" cy="{cy}" r="{r}" fill="{INK}"/><circle cx="{cx + gap + r * .35:.1f}" cy="{cy - r * .4:.1f}" r="{r * .35:.1f}" fill="{WHITE}"/>',
        f'<path d="M{cx - gap * .5},{cy + gap * .8} q{gap * .5},{gap * .5} {gap},0" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linecap="round"/>',
    ])
