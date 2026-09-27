"""
Bộ vẽ riêng cho nhóm w1 (Vở BT Toán 3: cân đồng hồ, cân đĩa gam, ca ml, quà...).
Vẽ ở toạ độ "gốc" cỡ nhỏ (nét 3) rather than full canvas, rồi phóng bằng scaled().

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    from kit_measure import *
    from kit_w1 import *
"""
import math
from common import *
from kit_measure import balance_scale, weight, uid, SCALE, SCALE_D, PAN, METAL

WATER_C = '#8FD3F2'
WATER_E = '#4FB3E0'


def scaled(svg, x, y, k):
    """Dịch tới (x, y) và phóng k lần (nét, chữ phóng theo)."""
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({k:.4f})">{svg}</g>'


def big_balance(cx, by, k, left='', right='', arm=140, pan_w=150, post_h=60):
    """Cân đĩa kit_measure (thăng bằng) nhưng phóng CẢ nét theo k."""
    return scaled(balance_scale(0, 0, left, right, tilt=0, arm=arm, pan_w=pan_w, s=1.0, post_h=post_h), cx, by, k)


def wt(x, lab, w=50, above=None):
    """Quả cân gam: to thì chữ trên thân, nhỏ thì chữ ghi phía trên (như sách)."""
    if above is None:
        above = w < 44
    if not above:
        return weight(x, 0, lab, w=w, size=w * .27)
    h = w * .9
    return weight(x, 0, '', w=w) + text(x, -h - 6, lab, size=15, weight=700)


def letter(x, y, s, size=30):
    return text(x, y, s, size=size, weight=700)


# ───────────────────────── cân đồng hồ (nhà bếp) ─────────────────────────
def kitchen_scale(dial, items='', body=SCALE, k=1.0, cx=0, by=0):
    """Cân đồng hồ, toạ độ gốc: thân rộng 200 (y -190..0), đĩa bát ở trên;
    items: SVG gốc (0,0) = lòng đĩa (mặt đồ vật đặt). dial: SVG mặt số tâm (0,-100)."""
    s = []
    s.append(f'<ellipse cx="0" cy="2" rx="118" ry="7" fill="{INK}" opacity=".12"/>')
    # chân
    s.append(f'<rect x="-80" y="-14" width="160" height="16" rx="6" fill="{SCALE_D}" stroke="{INK}" stroke-width="3"/>')
    # thân
    s.append(f'<rect x="-100" y="-192" width="200" height="182" rx="30" fill="{body}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M-86,-165 V-60" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>')
    # cổ
    s.append(f'<rect x="-22" y="-210" width="44" height="20" fill="{SCALE_D}" stroke="{INK}" stroke-width="3"/>')
    s.append(dial)
    # đĩa bát: lòng (elip) -> đồ -> thành trước
    rim_y, rx, ry = -246, 142, 16
    s.append(f'<ellipse cx="0" cy="{rim_y}" rx="{rx}" ry="{ry}" fill="#D6E6F2" stroke="{INK}" stroke-width="3"/>')
    if items:
        s.append(f'<g transform="translate(0,{rim_y + 6})">{items}</g>')
    s.append(f'<path d="M{-rx},{rim_y} A{rx},{ry} 0 0 0 {rx},{rim_y} Q{rx - 12},{rim_y + 34} 40,-208 H-40 '
             f'Q{-rx + 12},{rim_y + 34} {-rx},{rim_y} Z" fill="{PAN}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    s.append(f'<path d="M{-rx + 24},{rim_y + 16} Q{-rx + 34},{rim_y + 28} -70,{rim_y + 32}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>')
    return scaled(''.join(s), cx, by, k)


def round_dial(cy=-100, R=78, labels=(), n_ticks=20, major_every=5, value_frac=0.0,
               label_r=None, fs=17, center_note=None, face='#FFFFFF', needle_on_top=False):
    """Mặt số tròn: labels = [(phân số vòng 0..1 từ đỉnh theo chiều kim đồng hồ, chữ)].
    n_ticks vạch đều, cứ major_every vạch có một vạch dài. Kim chỉ value_frac."""
    s = [f'<circle cx="0" cy="{cy}" r="{R + 8}" fill="{SCALE_D}" stroke="{INK}" stroke-width="3"/>',
         f'<circle cx="0" cy="{cy}" r="{R}" fill="{face}" stroke="{INK}" stroke-width="2.5"/>']
    for i in range(n_ticks):
        t = 2 * math.pi * i / n_ticks
        sx, sy = math.sin(t), -math.cos(t)
        L = 12 if i % major_every == 0 else 6
        wv = 3 if i % major_every == 0 else 2
        s.append(f'<line x1="{sx * (R - 3):.1f}" y1="{cy + sy * (R - 3):.1f}" x2="{sx * (R - 3 - L):.1f}" y2="{cy + sy * (R - 3 - L):.1f}" '
                 f'stroke="{INK}" stroke-width="{wv}" stroke-linecap="round"/>')
    lr = label_r or R - 28
    if center_note:
        s.append(center_note)
    t = 2 * math.pi * value_frac
    tx, ty = math.sin(t) * (R - 10), cy - math.cos(t) * (R - 10)
    needle = (f'<line x1="0" y1="{cy}" x2="{tx:.1f}" y2="{ty:.1f}" stroke="{RED}" stroke-width="{3.5 if needle_on_top else 4.5}" stroke-linecap="round"/>'
              f'<circle cx="0" cy="{cy}" r="6" fill="{RED}" stroke="{INK}" stroke-width="2.2"/>')
    if not needle_on_top:
        s.append(needle)
    halo = ' stroke="#fff" stroke-width="4" paint-order="stroke" stroke-linejoin="round"'
    for f, lab in labels:
        t = 2 * math.pi * f
        s.append(text(f'{math.sin(t) * lr:.1f}', f'{cy - math.cos(t) * lr + fs * .36:.1f}', lab, size=fs, weight=700, extra=halo))
    if needle_on_top:
        s.append(needle)
    return ''.join(s)


# ───────────────────────── ca đong ml ─────────────────────────
def ml_cup(cx, by, w, h, marks, level, sw=3, top_label=None, fs=None, glass='#F4FAFD',
           long_every=None):
    """Ca đong trong suốt: vạch chia bên trái. marks = số vạch (vạch thứ marks = vạch trên cùng,
    đặt ở 86% chiều cao). level = mực nước tính theo số vạch (vd. 4 = đúng vạch 4).
    top_label ghi cạnh vạch trên cùng (vd. '500 ml'). long_every: vạch dài mỗi n vạch."""
    x0, x1, top = cx - w / 2, cx + w / 2, by - h
    ins = w * .07
    r = min(14, w * .12)
    d = (f'M{x0:.1f},{top:.1f} L{x0 + ins:.1f},{by - r:.1f} Q{x0 + ins:.1f},{by:.1f} {x0 + ins + r:.1f},{by:.1f} '
         f'L{x1 - ins - r:.1f},{by:.1f} Q{x1 - ins:.1f},{by:.1f} {x1 - ins:.1f},{by - r:.1f} L{x1:.1f},{top:.1f} Z')
    inner_bot = by - sw * 1.5
    unit = (h * .86 - sw * 1.5) / marks
    cid = uid('mc')
    out = []
    # quai phải
    hp = (f'M{x1 - ins * .3:.1f},{top + h * .16:.1f} C{x1 + w * .3:.1f},{top + h * .12:.1f} {x1 + w * .3:.1f},{by - h * .3:.1f} '
          f'{x1 - ins * .8:.1f},{by - h * .26:.1f}')
    out.append(f'<path d="{hp}" fill="none" stroke="{INK}" stroke-width="{sw * 3.4:.1f}" stroke-linecap="round"/>')
    out.append(f'<path d="{hp}" fill="none" stroke="{SKY_D}" stroke-width="{sw * 1.4:.1f}" stroke-linecap="round"/>')
    out.append(f'<clipPath id="{cid}"><path d="{d}"/></clipPath>')
    out.append(f'<path d="{d}" fill="{glass}"/>')
    if level > 0:
        wy = inner_bot - level * unit
        out.append(f'<g clip-path="url(#{cid})"><rect x="{x0 - 5:.1f}" y="{wy:.1f}" width="{w + 10:.1f}" height="{by - wy + 5:.1f}" fill="{WATER_C}"/>'
                   f'<line x1="{x0 - 5:.1f}" y1="{wy:.1f}" x2="{x1 + 5:.1f}" y2="{wy:.1f}" stroke="{WATER_E}" stroke-width="{sw:.1f}"/></g>')
    # vạch chia
    tx0 = x0 + ins + w * .1
    for i in range(1, marks + 1):
        y = inner_bot - i * unit
        lng = long_every is None or i % long_every == 0 or i == marks
        L = w * (.2 if lng else .11)
        out.append(f'<line x1="{tx0:.1f}" y1="{y:.1f}" x2="{tx0 + L:.1f}" y2="{y:.1f}" stroke="{INK}" stroke-width="{sw * (.8 if lng else .6):.1f}" stroke-linecap="round"/>')
    out.append(f'<line x1="{tx0:.1f}" y1="{inner_bot - marks * unit:.1f}" x2="{tx0:.1f}" y2="{inner_bot - unit * .3:.1f}" stroke="{INK}" stroke-width="{sw * .6:.1f}"/>')
    if top_label:
        f = fs or w * .15
        out.append(text(f'{tx0 + w * .23:.1f}', f'{inner_bot - marks * unit + f * .36:.1f}', top_label, size=f, weight=700, anchor='start'))
    out.append(f'<path d="M{x1 - w * .28:.1f},{by - h * .72:.1f} V{by - h * .22:.1f}" stroke="#fff" stroke-width="{sw * 1.6:.1f}" stroke-linecap="round" opacity=".8"/>')
    out.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    # vành + mỏ rót trái
    out.append(f'<path d="M{x0 - w * .1:.1f},{top - h * .05:.1f} Q{x0 + w * .05:.1f},{top - sw:.1f} {x0 + w * .2:.1f},{top:.1f} '
               f'L{x0 + ins * .6:.1f},{top + h * .12:.1f} Z" fill="{glass}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    out.append(f'<line x1="{x0 + w * .12:.1f}" y1="{top:.1f}" x2="{x1 + sw * .3:.1f}" y2="{top:.1f}" stroke="{INK}" stroke-width="{sw * 1.6:.1f}" stroke-linecap="round"/>')
    return ''.join(out)


# ───────────────────────── hộp quà ─────────────────────────
def gift(x, y, w, h, body=PINK, ribbon=RED, dots=WHITE, tag=None, tag_size=30):
    """Hộp quà có nơ, (x, y) = giữa đáy (toạ độ gốc). tag = chữ trên nơ (A/B)."""
    s = [f'<rect x="{x - w / 2}" y="{y - h}" width="{w}" height="{h}" rx="4" fill="{body}" stroke="{INK}" stroke-width="3"/>',
         f'<rect x="{x - w / 2 - 4}" y="{y - h}" width="{w + 8}" height="{h * .2}" rx="3" fill="{body}" stroke="{INK}" stroke-width="3"/>']
    for i in range(3):
        for j in range(2):
            dx = x - w / 2 + w * (.2 + .3 * i) + (w * .1 if j else 0)
            dy = y - h + h * (.42 + .3 * j)
            if abs(dx - x) > w * .1:
                s.append(f'<circle cx="{dx:.1f}" cy="{dy:.1f}" r="{w * .035:.1f}" fill="{dots}" opacity=".85"/>')
    s.append(f'<rect x="{x - w * .08}" y="{y - h}" width="{w * .16}" height="{h}" fill="{ribbon}" stroke="{INK}" stroke-width="2.5"/>')
    by_ = y - h
    bw = w * .28
    s.append(f'<path d="M{x},{by_} C{x - bw * .6},{by_ - bw * .9} {x - bw * 1.3},{by_ - bw * .4} {x - bw * .9},{by_} Z" fill="{ribbon}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x},{by_} C{x + bw * .6},{by_ - bw * .9} {x + bw * 1.3},{by_ - bw * .4} {x + bw * .9},{by_} Z" fill="{ribbon}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{x}" cy="{by_ - 2}" r="{w * .06:.1f}" fill="{ribbon}" stroke="{INK}" stroke-width="2.5"/>')
    if tag:
        s.append(text(x, by_ - bw * .9 - 8, tag, size=tag_size, weight=800))
    return ''.join(s)
