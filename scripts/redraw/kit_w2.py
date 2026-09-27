"""
Bộ vẽ riêng cho nhóm w2 (Vở BT Toán 3): khối 3D phẳng kiểu chiếu xiên, phân số,
chấm điểm hình học. Nét riêng, viền INK, màu tươi.

    from kit_w2 import *
"""
import math
import os
import sys

sys.path.insert(0, os.path.dirname(__file__))
from common import *

_PREFIX = os.path.splitext(os.path.basename(sys.argv[0] or 'kit'))[0].replace('.', '_') or 'kit'
_n = [0]


def uid(tag='w'):
    _n[0] += 1
    return f'{_PREFIX}_{tag}{_n[0]}'


def _rgb(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def shade(h, k):
    """k>0 pha trắng, k<0 pha tối."""
    r = _rgb(h)
    t = [255, 255, 255] if k > 0 else [40, 36, 50]
    k = abs(k)
    return '#' + ''.join(f'{round(a + (b - a) * k):02X}' for a, b in zip(r, t))


def poly(pts, fill, sw=3, stroke=INK, extra=''):
    p = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    return f'<polygon points="{p}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}" stroke-linejoin="round"{extra}/>'


def box3d(x, yb, w, h, dx, dy, col, sw=3):
    """Khối hộp chiếu xiên: mặt trước (x, yb-h, w, h); chiều sâu lệch (dx, -dy) về phía trên phải."""
    t = yb - h
    return ''.join([
        poly([(x + w, t), (x + w + dx, t - dy), (x + w + dx, yb - dy), (x + w, yb)], shade(col, -.22), sw),
        poly([(x, t), (x + dx, t - dy), (x + w + dx, t - dy), (x + w, t)], shade(col, .35), sw),
        poly([(x, t), (x + w, t), (x + w, yb), (x, yb)], col, sw),
    ])


def cylinder(cx, yb, w, h, col, sw=3, ry=None, top=True):
    """Khối trụ đứng: đáy tâm (cx, yb), bề rộng w, cao h (thân)."""
    rx = w / 2
    ry = ry if ry is not None else w * .17
    t = yb - h
    s = [f'<path d="M{cx - rx:.1f},{t:.1f} V{yb:.1f} A{rx:.1f},{ry:.1f} 0 0 0 {cx + rx:.1f},{yb:.1f} V{t:.1f} Z" '
         f'fill="{col}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>',
         f'<path d="M{cx - rx * .62:.1f},{t + ry * 1.6:.1f} V{yb + ry * .4:.1f}" stroke="#fff" stroke-width="{sw * 1.6:.1f}" '
         f'stroke-linecap="round" opacity=".45"/>']
    if top:
        s.append(f'<ellipse cx="{cx:.1f}" cy="{t:.1f}" rx="{rx:.1f}" ry="{ry:.1f}" fill="{shade(col, .35)}" stroke="{INK}" stroke-width="{sw}"/>')
    return ''.join(s)


def sphere(cx, cy, r, col, sw=3):
    g = uid('sph')
    return (f'<defs><radialGradient id="{g}" cx=".36" cy=".32" r=".75">'
            f'<stop offset="0" stop-color="{shade(col, .75)}"/><stop offset=".55" stop-color="{col}"/>'
            f'<stop offset="1" stop-color="{shade(col, -.2)}"/></radialGradient></defs>'
            f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="url(#{g})" stroke="{INK}" stroke-width="{sw}"/>'
            f'<ellipse cx="{cx - r * .36:.1f}" cy="{cy - r * .4:.1f}" rx="{r * .18:.1f}" ry="{r * .11:.1f}" '
            f'transform="rotate(-35 {cx - r * .36:.1f} {cy - r * .4:.1f})" fill="#fff" opacity=".8"/>')


def dot(x, y, r=6, fill=INK):
    return f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{r}" fill="{fill}"/>'


def line(x1, y1, x2, y2, sw=4, col=INK, extra=''):
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{col}" stroke-width="{sw}" '
            f'stroke-linecap="round"{extra}/>')


def frac(x, y, num, den, size=40, weight=600, sw=None):
    """Phân số dọc; (x, y) = tâm ngang, y = vạch phân số."""
    sw = sw or size * .07
    hw = size * .36 * max(len(str(num)), len(str(den)))
    return (text(x, y - size * .18, num, size=size, weight=weight)
            + line(x - hw, y, x + hw, y, sw=sw)
            + text(x, y + size * .88, den, size=size, weight=weight))


def blank_box(x, y, w, h, sw=3, r=10):
    """Ô trống (góc trái trên)."""
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" rx="{r}" fill="#fff" stroke="{INK}" stroke-width="{sw}"/>'


def rtext(x, y, s, deg, size=40, weight=600, fill=INK):
    """Chữ xoay deg độ quanh (x, y)."""
    return text(x, y, s, size=size, weight=weight, fill=fill, extra=f' transform="rotate({deg:.1f} {x:.1f} {y:.1f})"')


def seg_label(p, q, s, off=34, size=50, weight=500, side=-1):
    """Nhãn chữ song song đoạn p→q, lệch vuông góc `off` px (side=-1: phía trên)."""
    (x1, y1), (x2, y2) = p, q
    ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
    if ang > 90 or ang < -90:
        ang += 180
    L = math.hypot(x2 - x1, y2 - y1)
    nx, ny = -(y2 - y1) / L, (x2 - x1) / L          # pháp tuyến
    if ny > 0:
        nx, ny = -nx, -ny                            # luôn hướng lên
    mx, my = (x1 + x2) / 2 - side * nx * -off, (y1 + y2) / 2 - side * ny * -off
    mx, my = (x1 + x2) / 2 + (-side) * nx * off, (y1 + y2) / 2 + (-side) * ny * off
    return rtext(mx, my + size * .35, s, ang, size=size, weight=weight) if False else \
        text(mx, my, s, size=size, weight=weight,
             extra=f' dominant-baseline="central" transform="rotate({ang:.1f} {mx:.1f} {my:.1f})"')


def polyline_fig(pts, names, lens, name_off, size=52, sw=4, lab_off=36, lab_side=None):
    """Đường gấp khúc có chấm ở đỉnh, tên đỉnh (name_off = [(dx, dy)...]) và nhãn độ dài mỗi đoạn."""
    s = [f'<polyline points="{" ".join(f"{x},{y}" for x, y in pts)}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>']
    for (x, y), n, (dx, dy) in zip(pts, names, name_off):
        s.append(dot(x, y, r=7))
        s.append(text(x + dx, y + dy, n, size=size, weight=500))
    for i, L in enumerate(lens):
        side = (lab_side[i] if lab_side else -1)
        s.append(seg_label(pts[i], pts[i + 1], L, off=lab_off, size=size, side=side))
    return ''.join(s)


def mango(x, y, w=34, rot=0, col='#FFC24B'):
    """Quả xoài nằm, (x, y) = giữa đáy; w = chiều dài."""
    h = w * .62
    cx, cy = x, y - h / 2
    d = (f'M{cx - w / 2:.1f},{cy:.1f} C{cx - w / 2:.1f},{cy - h * .7:.1f} {cx + w * .1:.1f},{cy - h * .62:.1f} {cx + w / 2:.1f},{cy - h * .1:.1f} '
         f'C{cx + w * .56:.1f},{cy + h * .4:.1f} {cx + w * .2:.1f},{cy + h * .55:.1f} {cx - w * .1:.1f},{cy + h * .5:.1f} '
         f'C{cx - w * .4:.1f},{cy + h * .48:.1f} {cx - w / 2:.1f},{cy + h * .3:.1f} {cx - w / 2:.1f},{cy:.1f} Z')
    return (f'<g transform="rotate({rot} {cx:.1f} {cy:.1f})"><path d="{d}" fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M{cx - w * .3:.1f},{cy - h * .12:.1f} Q{cx - w * .1:.1f},{cy - h * .38:.1f} {cx + w * .15:.1f},{cy - h * .3:.1f}" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>'
            f'<path d="M{cx - w / 2 + 1:.1f},{cy - 1:.1f} l-4,-4" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>'
            f'<circle cx="{cx + w * .3:.1f}" cy="{cy - h * .05:.1f}" r="{w * .13:.1f}" fill="#F4A259" opacity=".6"/></g>')
