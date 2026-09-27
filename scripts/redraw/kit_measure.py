"""
Bộ vẽ dùng chung cho các hình ĐO LƯỜNG (cân, quả cân, can, ca, trái cây, thú bông…)
— nét riêng, cùng phong cách với common.py (phẳng, viền đậm INK, màu tươi).

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    from kit_measure import *

Quy ước chung
-------------
* Mọi đồ vật có gốc toạ độ (x, y) = ĐIỂM GIỮA ĐÁY (chỗ nó chạm mặt bàn / đĩa cân),
  trừ khi docstring nói khác. Kích thước truyền bằng px (h = chiều cao, w = bề rộng,
  r = bán kính).
* Mỗi hàm trả về một chuỗi SVG; ghép vào list `parts` rồi save().
* Đồ đặt lên đĩa cân: viết chúng theo toạ độ CỤC BỘ của đĩa, (0, 0) = tâm mặt đĩa,
  ví dụ  left = watermelon(-28, 0, 90, 60) + weight(40, 0, '2 kg').
  balance_scale / dial_scale tự dịch chúng theo đĩa (kể cả khi đĩa nghiêng lên/xuống).
* Chữ "l" (lít) viết nghiêng như sách: nhãn kết thúc bằng " l" (vd. '10 l') được
  label() vẽ chữ l nghiêng có móc bằng nét path (font Quicksand nghiêng giả trông như
  dấu "/"). jerrycan()/cup()/weight() đều gọi label(). Muốn tự vẽ: label(x, y, '2 l', 22).
* Id của clipPath được đánh số tự động (uid()) nên nhiều hình ghép chung không trùng.
"""
import math
from common import *

# màu riêng của bộ cân
SCALE = '#7FB2DE'        # thân cân, đế
SCALE_D = '#4F8FC4'      # đòn cân
PAN = '#EEF2F6'          # đĩa cân
METAL = '#B8C2CC'        # quả cân (gang)
METAL_L = '#D9E0E6'
WATER = '#8FD3F2'        # nước
WATER_DEEP = '#4FB3E0'

_uid = [0]


def uid(prefix='km'):
    """Id duy nhất cho clipPath / gradient trong cùng một file."""
    _uid[0] += 1
    return f'{prefix}{_uid[0]}'


_FONT_CACHE = {}


def text_width(s, size, weight=700):
    """Bề rộng (px) của chuỗi s viết bằng Quicksand cỡ `size`, độ đậm `weight`."""
    if weight not in _FONT_CACHE:
        from fontTools.ttLib import TTFont
        from fontTools.varLib import instancer
        f = instancer.instantiateVariableFont(TTFont(ROOT / 'scripts/fonts/Quicksand-VariableFont_wght.ttf'), {'wght': weight})
        _FONT_CACHE[weight] = (f.getBestCmap(), f['hmtx'], f['head'].unitsPerEm)
    cmap, hmtx, upm = _FONT_CACHE[weight]
    return sum(hmtx[cmap.get(ord(c), cmap[ord('0')])][0] for c in s) * size / upm


def litre_l(x, y, size, fill=INK):
    """Chữ l nghiêng có móc (đơn vị lít) vẽ bằng path; (x, y) = góc trái dưới trên đường chân chữ."""
    k = size
    d = (f'M{x + .34 * k:.1f},{y - .72 * k:.1f} L{x + .13 * k:.1f},{y - .12 * k:.1f} '
         f'Q{x + .08 * k:.1f},{y + .03 * k:.1f} {x + .26 * k:.1f},{y - .05 * k:.1f}')
    return f'<path d="{d}" fill="none" stroke="{fill}" stroke-width="{.095 * k:.2f}" stroke-linecap="round" stroke-linejoin="round"/>'


def label(x, y, s, size=18, weight=700, fill=INK, anchor='middle'):
    """Như text(), nhưng nếu s kết thúc bằng ' l' (lít) thì chữ l vẽ nghiêng có móc.
    y = đường chân chữ (baseline) như text()."""
    if not s.endswith(' l'):
        return text(x, y, s, size=size, weight=weight, fill=fill, anchor=anchor)
    num = s[:-2]
    wn = text_width(num + ' ', size, weight)
    wl = .34 * size
    tot = wn + wl
    x0 = x - tot / 2 if anchor == 'middle' else (x - tot if anchor == 'end' else x)
    return text(f'{x0:.1f}', y, num, size=size, weight=weight, fill=fill, anchor='start') + litre_l(x0 + wn, y, size, fill)


def litre(n):
    """'10' -> '10 l' (nhãn lít cho label()/jerrycan()/cup())."""
    return f'{n} l'


def _g(x, y, k, inner, extra=''):
    return f'<g transform="translate({x:.1f},{y:.1f}) scale({k:.4f}){extra}">{inner}</g>'


def _face(cx, cy, sw, eye=2.8, gap=7, blush=True):
    s = [f'<circle cx="{cx - gap}" cy="{cy}" r="{eye}" fill="{INK}"/>',
         f'<circle cx="{cx + gap}" cy="{cy}" r="{eye}" fill="{INK}"/>',
         f'<circle cx="{cx - gap + 1}" cy="{cy - 1}" r="{eye * .35}" fill="#fff"/>',
         f'<circle cx="{cx + gap + 1}" cy="{cy - 1}" r="{eye * .35}" fill="#fff"/>',
         f'<path d="M{cx - 4},{cy + 7} Q{cx},{cy + 11} {cx + 4},{cy + 7}" fill="none" stroke="{INK}" '
         f'stroke-width="{sw * .75:.2f}" stroke-linecap="round"/>']
    if blush:
        s.append(f'<circle cx="{cx - gap - 5}" cy="{cy + 6}" r="3.6" fill="{PINK}" opacity=".75"/>')
        s.append(f'<circle cx="{cx + gap + 5}" cy="{cy + 6}" r="3.6" fill="{PINK}" opacity=".75"/>')
    return ''.join(s)


# ═════════════════════════════ CÂN ĐĨA ═════════════════════════════════════

def balance_geom(cx, base_y, arm=80, tilt=0, s=1.0, post_h=56, drop=14):
    """Toạ độ tuyệt đối tâm mặt hai đĩa: {'left': (x, y), 'right': (x, y)}.
    Dùng để kẻ đường chỉ nhãn (vd. "cam" -> quả trên đĩa trái)."""
    a = math.atan2(drop * tilt, arm)
    out = {}
    for side, sg in (('left', -1), ('right', 1)):
        ex = sg * arm * math.cos(a)
        ey = -post_h + sg * arm * math.sin(a)
        out[side] = (cx + ex * s, base_y + (ey - 22 - 10 - 3) * s)
    return out


def balance_scale(cx, base_y, left='', right='', tilt=0, arm=80, pan_w=120, s=1.0,
                  post_h=56, drop=14):
    """Cân đĩa (cân Rô-béc-van) kiểu nét riêng.

    cx, base_y : tâm đáy đế cân (px).
    left/right : SVG đồ vật trên đĩa trái/phải, toạ độ cục bộ (0,0)=tâm mặt đĩa.
    tilt       : -1 đĩa TRÁI thấp hơn (bên trái nặng hơn), 0 thăng bằng,
                 +1 đĩa PHẢI thấp hơn (bên phải nặng hơn). Có thể dùng số lẻ (0.5).
    arm        : nửa khoảng cách giữa hai tâm đĩa; pan_w: bề rộng đĩa.
    s          : phóng to/thu nhỏ cả cân lẫn đồ trên đĩa.
    post_h     : độ cao trục đòn cân so với đáy; drop: đĩa lên/xuống bao nhiêu khi tilt=±1.
    Đòn cân, kim ở giữa và hai đĩa luôn di chuyển khớp nhau (kim nghiêng về bên nặng).
    Cao tổng (không kể đồ) ≈ (post_h + 35 + drop) * s.
    """
    sw = 3 / s if s else 3
    a = math.atan2(drop * tilt, arm)
    deg = math.degrees(a)
    P = post_h
    bw = arm + pan_w * 0.25
    L = []
    # bóng + đế
    L.append(f'<ellipse cx="0" cy="-1" rx="{bw + 22}" ry="5" fill="{INK}" opacity=".12"/>')
    L.append(f'<path d="M{-bw - 14},-4 Q{-bw - 12},-17 {-bw + 12},-18 H{bw - 12} Q{bw + 12},-17 {bw + 14},-4 '
             f'Q{bw},0 {bw - 20},0 H{-bw + 20} Q{-bw},0 {-bw - 14},-4 Z" fill="{SCALE}" stroke="{INK}" '
             f'stroke-width="{sw}" stroke-linejoin="round"/>')
    L.append(f'<path d="M{-bw + 16},-12 H{-bw * 0.35}" stroke="#fff" stroke-width="{sw}" stroke-linecap="round" opacity=".6"/>')
    # trụ
    L.append(f'<path d="M-9,-17 L-6,{-P} H6 L9,-17 Z" fill="{SCALE_D}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    # mặt kim (vòng cung) — kim vuông góc với đòn
    R = 24
    L.append(f'<path d="M{-R},{-P} A{R},{R} 0 0 1 {R},{-P} Z" fill="#fff" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
    for t in (-50, -25, 0, 25, 50):
        tr = math.radians(t)
        x1, y1 = (R - 3) * math.sin(tr), -P - (R - 3) * math.cos(tr)
        x2, y2 = (R - 8) * math.sin(tr), -P - (R - 8) * math.cos(tr)
        L.append(f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{INK}" stroke-width="{sw * .6:.2f}" stroke-linecap="round"/>')
    L.append(f'<g transform="rotate({deg:.2f} 0 {-P})"><path d="M0,{-P} L0,{-P - R + 5}" stroke="{RED}" '
             f'stroke-width="{sw * 1.1:.2f}" stroke-linecap="round"/></g>')
    # đòn cân
    L.append(f'<g transform="rotate({deg:.2f} 0 {-P})"><rect x="{-arm - 6}" y="{-P - 5}" width="{2 * arm + 12}" height="10" '
             f'rx="5" fill="{SCALE_D}" stroke="{INK}" stroke-width="{sw}"/></g>')
    L.append(f'<circle cx="0" cy="{-P}" r="7" fill="{YELLOW}" stroke="{INK}" stroke-width="{sw}"/>')
    items = []
    for sg, stuff in ((-1, left), (1, right)):
        ex = sg * arm * math.cos(a)
        ey = -P + sg * arm * math.sin(a)
        top = ey - 22            # đáy đĩa
        rim = top - 10
        L.append(f'<rect x="{ex - 6}" y="{top - 2}" width="12" height="{ey - top + 2}" fill="{SCALE_D}" stroke="{INK}" stroke-width="{sw}"/>')
        L.append(f'<circle cx="{ex}" cy="{ey}" r="7" fill="{YELLOW}" stroke="{INK}" stroke-width="{sw}"/>')
        hw = pan_w / 2
        L.append(f'<path d="M{ex - hw + 4},{rim} Q{ex - hw + 12},{top} {ex - hw + 30},{top} H{ex + hw - 30} '
                 f'Q{ex + hw - 12},{top} {ex + hw - 4},{rim} Z" fill="{PAN}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
        L.append(f'<rect x="{ex - hw - 4}" y="{rim - 3}" width="{pan_w + 8}" height="6" rx="3" fill="#fff" stroke="{INK}" stroke-width="{sw}"/>')
        if stuff:
            items.append(f'<g transform="translate({ex:.2f},{rim - 3:.2f})">{stuff}</g>')
    return _g(cx, base_y, s, ''.join(L) + ''.join(items))


def weight(x, y, lab, w=56, h=None, size=None):
    """Quả cân gang có quai, chữ nhãn giữa thân (vd. '1 kg', '5 kg').
    (x, y) = giữa đáy; w = bề rộng đáy; h mặc định = 0.9 w."""
    h = h or w * 0.9
    size = size or max(12, w * 0.3)
    bt = h * 0.78                 # thân
    tw = w * 0.36                 # nửa bề rộng miệng thân
    y0 = y - bt
    s = []
    # quai (vòng) + cổ
    s.append(f'<rect x="{x - w * .2}" y="{y - h}" width="{w * .4}" height="{h * .14}" rx="{h * .05}" fill="{METAL}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<rect x="{x - w * .12}" y="{y - h + h * .12}" width="{w * .24}" height="{h * .12}" fill="{METAL}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M{x - tw},{y0} H{x + tw} Q{x + tw + 4},{y0} {x + tw + 6},{y0 + 6} '
             f'L{x + w / 2},{y - 6} Q{x + w / 2 + 1},{y} {x + w / 2 - 6},{y} H{x - w / 2 + 6} '
             f'Q{x - w / 2 - 1},{y} {x - w / 2},{y - 6} L{x - tw - 6},{y0 + 6} Q{x - tw - 4},{y0} {x - tw},{y0} Z" '
             f'fill="{METAL}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    s.append(f'<path d="M{x - tw - 1},{y0 + 10} L{x - w / 2 + 5},{y - 10}" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".7"/>')
    s.append(label(x + 2, y - bt * 0.34, lab, size=size))
    return ''.join(s)


# ═════════════════════════════ CÂN ĐỒNG HỒ ═════════════════════════════════

def dial_scale(cx, base_y, value, max_kg=5, items='', w=150, step=1, label_every=1):
    """Cân đồng hồ (cân nhà bếp): đĩa phẳng trên cùng, mặt số tròn, kim chỉ `value`.

    Mặt số chia đều cả vòng tròn từ 0 (trên cùng) theo chiều kim đồng hồ đến max_kg
    (0 và max_kg trùng nhau ở đỉnh như cân thật). Vạch mỗi `step` kg, ghi số mỗi
    `label_every` kg. items: SVG đồ trên đĩa, (0,0) = tâm mặt đĩa. w = bề rộng thân.
    Cao thân ≈ 1.05 w.
    """
    h = w * 1.05
    top = base_y - h
    R = w * 0.34
    dcx, dcy = cx, base_y - h * 0.45
    s = []
    s.append(f'<ellipse cx="{cx}" cy="{base_y - 1}" rx="{w * .6}" ry="5" fill="{INK}" opacity=".12"/>')
    # cổ đỡ đĩa
    s.append(f'<rect x="{cx - w * .12}" y="{top - 4}" width="{w * .24}" height="14" fill="{SCALE_D}" stroke="{INK}" stroke-width="3"/>')
    # thân
    s.append(f'<path d="M{cx - w * .42},{top + 8} H{cx + w * .42} Q{cx + w * .5},{top + 8} {cx + w * .5},{top + 20} '
             f'L{cx + w * .52},{base_y - 10} Q{cx + w * .52},{base_y} {cx + w * .42},{base_y} H{cx - w * .42} '
             f'Q{cx - w * .52},{base_y} {cx - w * .52},{base_y - 10} L{cx - w * .5},{top + 20} Q{cx - w * .5},{top + 8} {cx - w * .42},{top + 8} Z" '
             f'fill="{SCALE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # đĩa
    s.append(f'<path d="M{cx - w * .62},{top - 10} Q{cx - w * .55},{top - 2} {cx - w * .4},{top - 2} H{cx + w * .4} '
             f'Q{cx + w * .55},{top - 2} {cx + w * .62},{top - 10} Z" fill="{PAN}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    s.append(f'<rect x="{cx - w * .66}" y="{top - 15}" width="{w * 1.32}" height="6" rx="3" fill="#fff" stroke="{INK}" stroke-width="3"/>')
    # mặt số
    s.append(f'<circle cx="{dcx}" cy="{dcy}" r="{R + 6}" fill="{SCALE_D}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{dcx}" cy="{dcy}" r="{R}" fill="#fff" stroke="{INK}" stroke-width="2.5"/>')
    n = int(round(max_kg / step))
    for i in range(n):
        v = i * step
        t = 2 * math.pi * v / max_kg
        sx, sy = math.sin(t), -math.cos(t)
        s.append(f'<line x1="{dcx + sx * (R - 2):.1f}" y1="{dcy + sy * (R - 2):.1f}" x2="{dcx + sx * (R - 8):.1f}" '
                 f'y2="{dcy + sy * (R - 8):.1f}" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>')
        if abs(v / label_every - round(v / label_every)) < 1e-6:
            fs = max(10, R * 0.3)
            s.append(text(f'{dcx + sx * (R - 17):.1f}', f'{dcy + sy * (R - 17) + fs * .36:.1f}', f'{v:g}', size=fs, weight=700))
    t = 2 * math.pi * value / max_kg
    s.append(f'<line x1="{dcx}" y1="{dcy}" x2="{dcx + math.sin(t) * (R - 6):.1f}" y2="{dcy - math.cos(t) * (R - 6):.1f}" '
             f'stroke="{RED}" stroke-width="3.2" stroke-linecap="round"/>')
    s.append(f'<circle cx="{dcx}" cy="{dcy}" r="4" fill="{RED}" stroke="{INK}" stroke-width="1.8"/>')
    s.append(text(dcx, dcy + R * .45, 'kg', size=max(9, R * .22), weight=700))
    if items:
        s.append(f'<g transform="translate({cx},{top - 15})">{items}</g>')
    return ''.join(s)


# ═════════════════════════════ CHẤT LỎNG ═══════════════════════════════════

def _rot(px, py, ox, oy, deg):
    r = math.radians(deg)
    dx, dy = px - ox, py - oy
    return ox + dx * math.cos(r) - dy * math.sin(r), oy + dx * math.sin(r) + dy * math.cos(r)


def jerrycan(x, y, lab, w=120, h=130, angle=0, color=BLUE, label_size=None):
    """Can nhựa có quai (lỗ cầm) ở góc trên trái và vòi có nắp ở góc trên phải.
    (x, y) = giữa đáy khi đứng thẳng; angle = độ nghiêng (dương = nghiêng sang phải,
    như đang rót), quay quanh tâm can. Nhãn trên thân, vd. litre('10').
    Vị trí miệng vòi: jerrycan_spout(...) cùng tham số."""
    fs = label_size or w * 0.22
    x0, y0 = x - w / 2, y - h
    cxr, cyr = x, y - h / 2
    s = []
    # vòi (cổ + nắp) góc trên phải
    s.append(f'<path d="M{x0 + w * .72},{y0 + 4} L{x0 + w * .86},{y0 - h * .12} L{x0 + w * 1.0},{y0 + h * .02} L{x0 + w * .92},{y0 + h * .12} Z" '
             f'fill="{color}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    s.append(f'<rect x="{x0 + w * .84}" y="{y0 - h * .2}" width="{w * .2}" height="{h * .12}" rx="4" fill="{YELLOW}" stroke="{INK}" '
             f'stroke-width="3" transform="rotate(45 {x0 + w * .94} {y0 - h * .14})"/>')
    # thân
    s.append(f'<rect x="{x0}" y="{y0}" width="{w}" height="{h}" rx="{w * .12}" fill="{color}" stroke="{INK}" stroke-width="3"/>')
    # quai: lỗ cầm
    s.append(f'<rect x="{x0 + w * .1}" y="{y0 + h * .07}" width="{w * .42}" height="{h * .12}" rx="{h * .06}" fill="#fff" stroke="{INK}" stroke-width="3"/>')
    # nhãn
    s.append(f'<rect x="{x0 + w * .14}" y="{y0 + h * .3}" width="{w * .72}" height="{h * .5}" rx="{w * .08}" fill="{WATER_L}" stroke="{INK}" stroke-width="2.5"/>')
    s.append(f'<path d="M{x0 + w * .06},{y0 + h * .3} V{y0 + h * .85}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>')
    s.append(label(x, y0 + h * .55 + fs * .36, lab, size=fs))
    return f'<g transform="rotate({angle} {cxr} {cyr})">{"".join(s)}</g>'


def jerrycan_spout(x, y, w=120, h=130, angle=0):
    """Toạ độ miệng vòi (giữa nắp) của jerrycan() cùng tham số — điểm bắt đầu dòng rót."""
    px, py = x - w / 2 + w * 1.02, y - h - h * .08
    return _rot(px, py, x, y - h / 2, angle)


def pour_stream(x1, y1, x2, y2, w=9, bend=0.25):
    """Dòng nước rót từ (x1,y1) (miệng vòi) xuống (x2,y2) (miệng ca), cong nhẹ
    như tia nước rơi; kèm vài giọt bắn nhỏ ở đích."""
    mx = x1 + (x2 - x1) * (1 - bend)
    my = y1
    d = f'M{x1:.1f},{y1:.1f} Q{mx:.1f},{my:.1f} {x2:.1f},{y2:.1f}'
    s = [f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 5}" stroke-linecap="round"/>',
         f'<path d="{d}" fill="none" stroke="{WATER}" stroke-width="{w}" stroke-linecap="round"/>',
         f'<path d="{d}" fill="none" stroke="#fff" stroke-width="{w * .25:.1f}" stroke-linecap="round" opacity=".8" stroke-dasharray="6 9"/>']
    for dx, dy, r in ((-10, -4, 2.6), (11, -6, 2.2), (4, -12, 1.8)):
        s.append(f'<circle cx="{x2 + dx}" cy="{y2 + dy}" r="{r}" fill="{WATER}" stroke="{INK}" stroke-width="1.4"/>')
    return ''.join(s)


def cup(x, y, lab, w=66, h=62, fill=0.0, label_size=None, color=WHITE):
    """Ca đong có quai bên phải, mỏ rót bên trái. (x, y) = giữa đáy thân (không kể quai).
    fill: 0 (rỗng) … 1 (đầy) — mực nước vẽ trong thân. Nhãn giữa thân, vd. litre('2').
    Miệng ca ở y - h (dùng làm đích pour_stream)."""
    fs = label_size or w * 0.3
    x0, y0 = x - w / 2, y - h
    b = w * 0.06                 # đáy hẹp hơn miệng
    body = (f'M{x0 - 4},{y0} H{x0 + w} L{x0 + w - b},{y - 8} Q{x0 + w - b},{y} {x0 + w - b - 8},{y} '
            f'H{x0 + b + 8} Q{x0 + b},{y} {x0 + b},{y - 8} L{x0},{y0 + 8} Z')
    cid = uid('cup')
    s = [f'<clipPath id="{cid}"><path d="{body}"/></clipPath>']
    # quai
    s.append(f'<path d="M{x0 + w - 3},{y0 + h * .18} Q{x0 + w + w * .34},{y0 + h * .2} {x0 + w + w * .26},{y0 + h * .55} '
             f'Q{x0 + w + w * .2},{y0 + h * .8} {x0 + w - b - 2},{y0 + h * .78}" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>')
    s.append(f'<path d="M{x0 + w - 3},{y0 + h * .18} Q{x0 + w + w * .34},{y0 + h * .2} {x0 + w + w * .26},{y0 + h * .55} '
             f'Q{x0 + w + w * .2},{y0 + h * .8} {x0 + w - b - 2},{y0 + h * .78}" fill="none" stroke="{SKY_D}" stroke-width="4.5" stroke-linecap="round"/>')
    s.append(f'<path d="{body}" fill="{color}"/>')
    if fill > 0:
        wy = y - (h - 6) * fill
        s.append(f'<g clip-path="url(#{cid})"><rect x="{x0 - 6}" y="{wy:.1f}" width="{w + 12}" height="{h + 10}" fill="{WATER}"/>'
                 f'<path d="M{x0 - 6},{wy:.1f} q{w / 4:.1f},-4 {w / 2:.1f},0 t{w / 2 + 12:.1f},0" fill="none" stroke="{WATER_DEEP}" stroke-width="2"/></g>')
    s.append(f'<path d="{body}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # vạch chia (chỉ khi không có nhãn, tránh đè chữ)
    if not lab:
        for k in (0.35, 0.6):
            s.append(f'<line x1="{x0 + b + 4}" y1="{y - h * k:.1f}" x2="{x0 + b + 11}" y2="{y - h * k:.1f}" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    else:
        s.append(label(x, y - h * .42 + fs * .36, lab, size=fs))
    return ''.join(s)


# ═════════════════════════════ TRÁI CÂY ════════════════════════════════════

def _leaf(x, y, rot=-30, L=14, col=GREEN):
    return (f'<path d="M{x},{y} q{L * .5},{-L * .55} {L},0 q{-L * .5},{L * .55} {-L},0 Z" fill="{col}" '
            f'stroke="{INK}" stroke-width="2" stroke-linejoin="round" transform="rotate({rot} {x} {y})"/>')


def watermelon(x, y, w=110, h=72):
    """Quả dưa hấu nằm ngang (vỏ xanh sọc đậm). (x, y) = giữa đáy."""
    cid = uid('wm')
    cy = y - h / 2
    s = [f'<clipPath id="{cid}"><ellipse cx="{x}" cy="{cy}" rx="{w / 2}" ry="{h / 2}"/></clipPath>',
         f'<ellipse cx="{x}" cy="{cy}" rx="{w / 2}" ry="{h / 2}" fill="{GREEN}"/>', f'<g clip-path="url(#{cid})">']
    for k in range(-3, 4):
        sx = x + k * w * 0.15
        s.append(f'<path d="M{sx},{y - h - 4} q{w * .07:.1f},{h * .18:.1f} 0,{h * .36:.1f} t0,{h * .36:.1f} t0,{h * .36:.1f}" fill="none" '
                 f'stroke="{GRASS_D}" stroke-width="{w * .045:.1f}" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x - w * .2}" cy="{cy - h * .22}" rx="{w * .16}" ry="{h * .09}" fill="#fff" opacity=".45"/></g>')
    s.append(f'<ellipse cx="{x}" cy="{cy}" rx="{w / 2}" ry="{h / 2}" fill="none" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M{x + w / 2 - 2},{cy} q6,-2 8,-8" fill="none" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>')
    return ''.join(s)


def orange(x, y, r=18, col=ORANGE):
    """Quả cam tròn có cuống + lá. (x, y) = giữa đáy."""
    cy = y - r
    return (f'<circle cx="{x}" cy="{cy}" r="{r}" fill="{col}" stroke="{INK}" stroke-width="3"/>'
            f'<ellipse cx="{x - r * .4}" cy="{cy - r * .35}" rx="{r * .28}" ry="{r * .18}" fill="#fff" opacity=".55"/>'
            f'<circle cx="{x + r * .3}" cy="{cy + r * .2}" r="1.3" fill="{INK}" opacity=".35"/>'
            f'<circle cx="{x + r * .5}" cy="{cy - r * .1}" r="1.3" fill="{INK}" opacity=".35"/>'
            f'<path d="M{x},{cy - r + 1} v-5" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>'
            + _leaf(x, cy - r - 3, -25, r * .8))


def apple(x, y, r=17, col=RED):
    """Quả táo (hình tim tròn) có cuống, lá. (x, y) = giữa đáy."""
    t = y - 2 * r
    d = (f'M{x},{t + r * .35} C{x - r * .4},{t - r * .1} {x - r * 1.15},{t} {x - r * 1.05},{t + r * 1.05} '
         f'C{x - r},{t + r * 1.8} {x - r * .4},{y} {x},{y - r * .12} C{x + r * .4},{y} {x + r},{t + r * 1.8} {x + r * 1.05},{t + r * 1.05} '
         f'C{x + r * 1.15},{t} {x + r * .4},{t - r * .1} {x},{t + r * .35} Z')
    return (f'<path d="{d}" fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<ellipse cx="{x - r * .5}" cy="{t + r * .7}" rx="{r * .22}" ry="{r * .3}" fill="#fff" opacity=".55"/>'
            f'<path d="M{x},{t + r * .4} q1,-7 4,-10" fill="none" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>'
            + _leaf(x + 3, t - r * .25, -20, r * .75))


def lemon(x, y, r=15, col=YELLOW, rot=0):
    """Quả chanh bầu dục nhọn hai đầu (nằm ngang). (x, y) = giữa đáy; rot để xếp nghiêng."""
    cy = y - r
    rx = r * 1.3
    d = (f'M{x - rx - 4},{cy} Q{x - rx},{cy - r * 1.05} {x},{cy - r} Q{x + rx},{cy - r * 1.05} {x + rx + 4},{cy} '
         f'Q{x + rx},{cy + r * 1.05} {x},{cy + r} Q{x - rx},{cy + r * 1.05} {x - rx - 4},{cy} Z')
    return (f'<g transform="rotate({rot} {x} {cy})"><path d="{d}" fill="{col}" stroke="{INK}" stroke-width="2.8" stroke-linejoin="round"/>'
            f'<ellipse cx="{x - r * .4}" cy="{cy - r * .45}" rx="{r * .35}" ry="{r * .16}" fill="#fff" opacity=".6"/></g>')


def pomelo(x, y, r=26, col='#C9E27B'):
    """Quả bưởi to, hơi thuôn đầu, có cuống + lá. (x, y) = giữa đáy."""
    t = y - 2.1 * r
    d = (f'M{x},{t} C{x + r * .5},{t} {x + r * 1.05},{t + r * .9} {x + r},{t + r * 1.35} C{x + r * .95},{y - r * .1} {x + r * .4},{y} {x},{y} '
         f'C{x - r * .4},{y} {x - r * .95},{y - r * .1} {x - r},{t + r * 1.35} C{x - r * 1.05},{t + r * .9} {x - r * .5},{t} {x},{t} Z')
    return (f'<path d="{d}" fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<ellipse cx="{x - r * .45}" cy="{t + r * .9}" rx="{r * .2}" ry="{r * .35}" fill="#fff" opacity=".5"/>'
            f'<path d="M{x},{t + 1} v-6" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>'
            + _leaf(x, t - 4, -30, r * .7))


def pumpkin(x, y, w=80, h=64, col=ORANGE):
    """Quả bí ngô nhiều múi, cuống xanh. (x, y) = giữa đáy."""
    cy = y - h / 2
    s = []
    for dx, rw in ((-w * .3, w * .28), (w * .3, w * .28), (-w * .12, w * .24), (w * .12, w * .24)):
        s.append(f'<ellipse cx="{x + dx}" cy="{cy}" rx="{rw}" ry="{h / 2}" fill="{col}" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<ellipse cx="{x}" cy="{cy}" rx="{w * .16}" ry="{h / 2}" fill="{col}" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<path d="M{x - 3},{y - h + 2} q-2,-10 5,-14 l4,3 q-4,4 -3,11 Z" fill="{GRASS_D}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x - w * .3}" cy="{cy - h * .15}" rx="{w * .06}" ry="{h * .18}" fill="#fff" opacity=".45"/>')
    return ''.join(s)


def banana_bunch(x, y, w=130, n=7, col=YELLOW):
    """Nải chuối: n quả cong xoè hình quạt quanh cuống ở giữa đáy. (x, y) = giữa đáy."""
    s = []
    L = w * 0.42
    cx, cy = x, y - 12
    for i in range(n):
        t = -80 + 160 * i / (n - 1)          # góc từ -80 (trái) tới 80 (phải)
        d = (f'M0,0 Q{-L * .28:.1f},{-L * .55:.1f} {-L * .05:.1f},{-L:.1f} Q{L * .02:.1f},{-L * 1.07:.1f} {L * .1:.1f},{-L * 1.02:.1f} '
             f'Q{-L * .05:.1f},{-L * .55:.1f} {L * .14:.1f},{-L * .05:.1f} Z')
        s.append(f'<g transform="translate({cx},{cy}) rotate({t:.1f})"><path d="{d}" fill="{col}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>'
                 f'<path d="M{-L * .05:.1f},{-L:.1f} l{L * .1:.1f},{-L * .02:.1f}" stroke="{BROWN}" stroke-width="4" stroke-linecap="round"/></g>')
    s.append(f'<rect x="{cx - 16}" y="{cy - 8}" width="32" height="18" rx="7" fill="{GRASS}" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy - 8}" rx="16" ry="5" fill="{GRASS_D}" stroke="{INK}" stroke-width="2.2"/>')
    return ''.join(s)


# ═════════════════════════════ BAO, TÚI ════════════════════════════════════

def sack(x, y, lines, w=150, h=130, col=SKY_D, size=None):
    """Bao/túi buộc miệng (vd. túi gạo) với chữ in trên thân, lines = ['GẠO', 'TẺ'].
    (x, y) = giữa đáy."""
    size = size or w * 0.15
    t = y - h
    neck = t + h * .2
    s = [f'<path d="M{x - w * .16},{neck} Q{x - w * .5},{neck + h * .12} {x - w * .5},{y - h * .25} Q{x - w * .52},{y} {x - w * .3},{y} '
         f'H{x + w * .3} Q{x + w * .52},{y} {x + w * .5},{y - h * .25} Q{x + w * .5},{neck + h * .12} {x + w * .16},{neck} Z" '
         f'fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
         # túm miệng
         f'<path d="M{x - w * .16},{neck} L{x - w * .28},{t + 4} Q{x - w * .1},{t + 12} {x},{t} Q{x + w * .1},{t + 12} {x + w * .28},{t + 4} L{x + w * .16},{neck} Z" '
         f'fill="{col}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
         f'<rect x="{x - w * .19}" y="{neck - 5}" width="{w * .38}" height="10" rx="5" fill="{RED}" stroke="{INK}" stroke-width="2.6"/>',
         f'<path d="M{x - w * .36},{neck + h * .22} Q{x - w * .42},{y - h * .3} {x - w * .38},{y - h * .15}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".55"/>']
    n = len(lines)
    y1 = y - h * .42 - (n - 1) * size * .55
    for i, ln in enumerate(lines):
        s.append(text(x, y1 + i * size * 1.1 + size * .36, ln, size=size, weight=800))
    return ''.join(s)


def pillow_bag(x, y, lab, w=130, h=90, col=WHITE, band=PINK, size=None):
    """Túi ni-lông dẹt hình gối (vd. túi đường) có dải nhãn và chữ. (x, y) = giữa đáy."""
    size = size or w * 0.13
    t = y - h
    d = (f'M{x - w / 2 + 6},{t + 4} Q{x},{t + 12} {x + w / 2 - 6},{t + 4} Q{x + w / 2 - 12},{y - h / 2} {x + w / 2 - 4},{y - 2} '
         f'Q{x},{y - 8} {x - w / 2 + 4},{y - 2} Q{x - w / 2 + 12},{y - h / 2} {x - w / 2 + 6},{t + 4} Z')
    cid = uid('bag')
    return (f'<clipPath id="{cid}"><path d="{d}"/></clipPath><path d="{d}" fill="{col}"/>'
            f'<g clip-path="url(#{cid})"><rect x="{x - w}" y="{y - h * .66}" width="{2 * w}" height="{h * .34}" fill="{band}"/></g>'
            f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>'
            f'<path d="M{x - w / 2 + 14},{t + 14} l6,6 M{x + w / 2 - 14},{t + 14} l-6,6" stroke="{INK}" stroke-width="2" stroke-linecap="round" opacity=".5"/>'
            + text(x, y - h * .49 + size * .36, lab, size=size, weight=800))


# ═════════════════════════════ THÚ BÔNG ════════════════════════════════════
# Vẽ ở khung cao ~100, gốc giữa đáy, rồi phóng theo h. Nhìn thẳng, ngồi.

def _feet(sw, col, dx=14):
    return (f'<ellipse cx="{-dx}" cy="-6" rx="12" ry="7" fill="{col}" stroke="{INK}" stroke-width="{sw}"/>'
            f'<ellipse cx="{dx}" cy="-6" rx="12" ry="7" fill="{col}" stroke="{INK}" stroke-width="{sw}"/>')


def plush_bunny(x, y, h=100, fur=WHITE, inner=PINK, shirt=None):
    """Thỏ bông ngồi, tai dài dựng đứng. (x, y) = giữa đáy; h ≈ chiều cao kể cả tai."""
    k = h / 108
    sw = 2.8 / k
    s = [f'<ellipse cx="0" cy="-30" rx="23" ry="24" fill="{shirt or fur}" stroke="{INK}" stroke-width="{sw}"/>',
         f'<ellipse cx="0" cy="-26" rx="12" ry="13" fill="#fff" opacity=".6"/>' if not shirt else '',
         _feet(sw, fur, 13),
         f'<ellipse cx="-22" cy="-34" rx="7" ry="11" fill="{fur}" stroke="{INK}" stroke-width="{sw}" transform="rotate(25 -22 -34)"/>',
         f'<ellipse cx="22" cy="-34" rx="7" ry="11" fill="{fur}" stroke="{INK}" stroke-width="{sw}" transform="rotate(-25 22 -34)"/>']
    for ex, r in ((-9, -10), (9, 10)):
        s.append(f'<ellipse cx="{ex}" cy="-88" rx="7.5" ry="18" fill="{fur}" stroke="{INK}" stroke-width="{sw}" transform="rotate({r} {ex} -74)"/>')
        s.append(f'<ellipse cx="{ex}" cy="-87" rx="3.5" ry="12" fill="{inner}" transform="rotate({r} {ex} -74)"/>')
    s.append(f'<circle cx="0" cy="-62" r="19" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(_face(0, -63, sw))
    s.append(f'<ellipse cx="0" cy="-57" rx="2.6" ry="2" fill="#E77A93"/>')
    return _g(x, y, k, ''.join(s))


def plush_dog(x, y, h=100, fur='#F2C48D', ear=BROWN, spots=False):
    """Chó bông ngồi, tai cụp, mõm sáng màu; spots=True thì có đốm."""
    k = h / 88
    sw = 2.8 / k
    s = [f'<path d="M20,-22 q16,-4 14,-20" fill="none" stroke="{INK}" stroke-width="{sw * 3.2:.1f}" stroke-linecap="round"/>',
         f'<path d="M20,-22 q16,-4 14,-20" fill="none" stroke="{fur}" stroke-width="{sw * 1.6:.1f}" stroke-linecap="round"/>',
         f'<ellipse cx="0" cy="-28" rx="24" ry="23" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>',
         f'<ellipse cx="0" cy="-24" rx="12" ry="13" fill="#fff" opacity=".55"/>',
         _feet(sw, fur, 13)]
    if spots:
        s.append(f'<circle cx="-13" cy="-36" r="5" fill="{INK}" opacity=".8"/><circle cx="14" cy="-22" r="4" fill="{INK}" opacity=".8"/>')
    s.append(f'<circle cx="0" cy="-60" r="21" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>')
    if spots:
        s.append(f'<ellipse cx="9" cy="-70" rx="7" ry="6" fill="{INK}" opacity=".8"/>')
    for sg in (-1, 1):
        s.append(f'<ellipse cx="{sg * 20}" cy="-58" rx="8" ry="15" fill="{ear}" stroke="{INK}" stroke-width="{sw}" transform="rotate({-sg * 18} {sg * 20} -70)"/>')
    s.append(f'<ellipse cx="0" cy="-52" rx="11" ry="8" fill="#FFF6EA" stroke="{INK}" stroke-width="{sw * .7:.2f}"/>')
    s.append(f'<ellipse cx="0" cy="-55" rx="4" ry="3" fill="{INK}"/>')
    s.append(f'<circle cx="-8" cy="-65" r="2.8" fill="{INK}"/><circle cx="8" cy="-65" r="2.8" fill="{INK}"/>')
    s.append(f'<circle cx="-7" cy="-66" r="1" fill="#fff"/><circle cx="9" cy="-66" r="1" fill="#fff"/>')
    s.append(f'<path d="M-4,-49 Q0,-46 4,-49" fill="none" stroke="{INK}" stroke-width="{sw * .7:.2f}" stroke-linecap="round"/>')
    return _g(x, y, k, ''.join(s))


def plush_bear(x, y, h=100, fur=BROWN, light='#E9C9A2', bow=RED):
    """Gấu bông ngồi, tai tròn, nơ ở cổ."""
    k = h / 92
    sw = 2.8 / k
    s = [f'<ellipse cx="0" cy="-28" rx="28" ry="25" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>',
         f'<ellipse cx="0" cy="-24" rx="15" ry="14" fill="{light}"/>',
         f'<ellipse cx="-27" cy="-34" rx="8" ry="12" fill="{fur}" stroke="{INK}" stroke-width="{sw}" transform="rotate(30 -27 -34)"/>',
         f'<ellipse cx="27" cy="-34" rx="8" ry="12" fill="{fur}" stroke="{INK}" stroke-width="{sw}" transform="rotate(-30 27 -34)"/>',
         _feet(sw, fur, 16),
         f'<circle cx="-16" cy="-6" r="4" fill="{light}"/><circle cx="16" cy="-6" r="4" fill="{light}"/>',
         f'<circle cx="-17" cy="-80" r="9" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/><circle cx="-17" cy="-80" r="4.5" fill="{light}"/>',
         f'<circle cx="17" cy="-80" r="9" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/><circle cx="17" cy="-80" r="4.5" fill="{light}"/>',
         f'<circle cx="0" cy="-62" r="22" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>',
         f'<ellipse cx="0" cy="-54" rx="10" ry="7.5" fill="{light}"/>',
         f'<ellipse cx="0" cy="-57" rx="3.6" ry="2.6" fill="{INK}"/>',
         f'<circle cx="-8" cy="-66" r="2.8" fill="{INK}"/><circle cx="8" cy="-66" r="2.8" fill="{INK}"/>',
         f'<path d="M-4,-51 Q0,-48 4,-51" fill="none" stroke="{INK}" stroke-width="{sw * .7:.2f}" stroke-linecap="round"/>',
         f'<path d="M0,-42 L-10,-47 L-10,-37 Z M0,-42 L10,-47 L10,-37 Z" fill="{bow}" stroke="{INK}" stroke-width="{sw * .8:.2f}" stroke-linejoin="round"/>',
         f'<circle cx="0" cy="-42" r="3" fill="{bow}" stroke="{INK}" stroke-width="{sw * .7:.2f}"/>']
    return _g(x, y, k, ''.join(s))


def plush_cat(x, y, h=100, fur=GREY, light=WHITE):
    """Mèo bông ngồi, tai nhọn, đuôi cong, ria."""
    k = h / 84
    sw = 2.8 / k
    s = [f'<path d="M16,-8 q24,-2 18,-28" fill="none" stroke="{INK}" stroke-width="{sw * 3.2:.1f}" stroke-linecap="round"/>',
         f'<path d="M16,-8 q24,-2 18,-28" fill="none" stroke="{fur}" stroke-width="{sw * 1.6:.1f}" stroke-linecap="round"/>',
         f'<ellipse cx="0" cy="-24" rx="20" ry="22" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>',
         f'<ellipse cx="0" cy="-20" rx="10" ry="13" fill="{light}"/>',
         _feet(sw, light, 10)]
    for sg in (-1, 1):
        s.append(f'<path d="M{sg * 18},-62 L{sg * 16},-84 L{sg * 3},-73 Z" fill="{fur}" stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>')
        s.append(f'<path d="M{sg * 15},-66 L{sg * 15},-78 L{sg * 7},-72 Z" fill="{PINK}"/>')
    s.append(f'<ellipse cx="0" cy="-58" rx="21" ry="18" fill="{fur}" stroke="{INK}" stroke-width="{sw}"/>')
    s.append(f'<ellipse cx="0" cy="-52" rx="9" ry="6" fill="{light}"/>')
    s.append(f'<circle cx="-8" cy="-61" r="2.8" fill="{INK}"/><circle cx="8" cy="-61" r="2.8" fill="{INK}"/>')
    s.append(f'<path d="M-2,-55 h4 l-2,2.5 Z" fill="#E77A93"/>')
    s.append(f'<path d="M-4,-50 Q-2,-48 0,-51 Q2,-48 4,-50" fill="none" stroke="{INK}" stroke-width="{sw * .6:.2f}" stroke-linecap="round"/>')
    for sg in (-1, 1):
        s.append(f'<path d="M{sg * 10},-53 l{sg * 12},-2 M{sg * 10},-50 l{sg * 12},2" stroke="{INK}" stroke-width="{sw * .45:.2f}" stroke-linecap="round"/>')
    return _g(x, y, k, ''.join(s))
