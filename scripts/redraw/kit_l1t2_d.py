"""
Bộ vẽ riêng cho Vở BT Toán 1 Tập Hai, Bài 32–33 (phép trừ / luyện tập chung số có hai chữ số):
rô-bốt màn hình số, hoa cúc, nấm, giỏ, tàu thủy, tên lửa, lá phong, bong bóng, cuộn giấy,
cừu, tảng đá, túi hạt dẻ, gấu, khỉ, rô-bốt hộp. Nét riêng, phẳng, viền INK, màu tươi.

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from kit_l1t2_d import *
    save('bai32_...', W, H, parts, folder='grade1-workbook-2')
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

SW = 3
FOLDER = 'grade1-workbook-2'
BOOK_BLUE = '#00AEEF'      # màu chữ phép tính in xanh trong sách
CARD = '#D9F1FC'           # nền thẻ xanh nhạt của sách
_n = [0]


def uid(p='d'):
    _n[0] += 1
    return f'{p}{_n[0]}'


def st(w=SW):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def place(x, y, s, inner, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


def tube(d, col, w=14, sw=SW):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 2 * sw}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def arrow(x1, y, x2, col=INK, w=3, label=None, size=20, lab_fill=INK):
    """mũi tên ngang có nhãn phép tính phía trên"""
    s = [f'<path d="M{x1},{y} L{x2 - 4},{y}" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/>',
         f'<path d="M{x2 - 14},{y - 8} L{x2},{y} L{x2 - 14},{y + 8} Z" fill="{col}" stroke="{col}" stroke-width="2" stroke-linejoin="round"/>']
    if label:
        s.append(text((x1 + x2) / 2, y - 10, label, size=size, weight=700, fill=lab_fill))
    return ''.join(s)


# ── rô-bốt màn hình (Bài 32 Tiết 2 câu 2) ───────────────────────────────────
def screen_robot(cx, by, num=None, body='#8FD3F4', dark='#4FA9D8'):
    """Rô-bốt thân bầu, màn hình ở bụng. (cx, by) = giữa đáy. Cao ~170, màn hình tâm (cx, by-44)."""
    s = []
    # tay
    for sg in (-1, 1):
        s.append(tube(f'M{cx + sg * 50},{by - 90} Q{cx + sg * 70},{by - 70} {cx + sg * 66},{by - 30}', GREY, 9))
        s.append(f'<circle cx="{cx + sg * 66}" cy="{by - 28}" r="8" fill="{GREY_L}" {st(2.6)}/>')
    # ăng-ten
    s.append(f'<line x1="{cx}" y1="{by - 150}" x2="{cx}" y2="{by - 166}" {st(4)}/>')
    s.append(f'<circle cx="{cx}" cy="{by - 168}" r="8" fill="{RED}" {st(2.6)}/>')
    # thân
    s.append(f'<path d="M{cx - 52},{by - 10} L{cx - 52},{by - 104} Q{cx - 52},{by - 152} {cx},{by - 152} '
             f'Q{cx + 52},{by - 152} {cx + 52},{by - 104} L{cx + 52},{by - 10} Q{cx + 52},{by} {cx + 40},{by} '
             f'H{cx - 40} Q{cx - 52},{by} {cx - 52},{by - 10} Z" fill="{body}" {st()}/>')
    # kính mắt
    s.append(f'<rect x="{cx - 38}" y="{by - 134}" width="76" height="38" rx="19" fill="#fff" {st(2.6)}/>')
    for sg in (-1, 1):
        s.append(f'<circle cx="{cx + sg * 16}" cy="{by - 115}" r="7" fill="{INK}"/><circle cx="{cx + sg * 16 + 2}" cy="{by - 118}" r="2.2" fill="#fff"/>')
    for i in range(3):
        s.append(f'<circle cx="{cx + 14 + i * 11}" cy="{by - 84}" r="3.6" fill="{YELLOW if i == 0 else INK}"/>')
    # màn hình
    s.append(f'<rect x="{cx - 36}" y="{by - 66}" width="72" height="44" rx="8" fill="#fff" {st(2.8)}/>')
    if num is not None:
        s.append(text(cx, by - 35, num, size=28, weight=700))
    return ''.join(s)


# ── hoa cúc ghi phép tính (Bài 32 Tiết 3 câu 2) ─────────────────────────────
def daisy(cx, cy, label, R=74, n=12, stem=150, leaf_side=1):
    """Hoa cúc nhiều cánh, giữa là hình bầu dục ghi phép tính. Cánh là hình kín riêng để tô."""
    s = []
    # cuống + lá
    s.append(tube(f'M{cx},{cy + 20} Q{cx + 12},{cy + stem * .6} {cx - 6},{cy + stem}', '#7BAF6A', 6))
    for sg, yy in ((leaf_side, .45), (-leaf_side, .72)):
        lx, ly = cx + 4, cy + stem * yy
        s.append(f'<path d="M{lx},{ly} q{sg * 30},{-34} {sg * 66},{-22} q{-sg * 18},{36} {-sg * 66},{22} Z" fill="{GRASS}" {st(2.6)}/>')
    # cánh
    for i in range(n):
        a = 2 * math.pi * i / n
        px, py = cx + math.cos(a) * R * .74, cy + math.sin(a) * R * .52
        deg = math.degrees(a)
        s.append(f'<ellipse cx="{px:.1f}" cy="{py:.1f}" rx="{R * .4:.1f}" ry="{R * .19:.1f}" fill="#fff" {st(2.6)} '
                 f'transform="rotate({deg:.1f} {px:.1f} {py:.1f})"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{R * .8:.1f}" ry="{R * .33:.1f}" fill="#FFF6D6" {st(2.6)}/>')
    s.append(text(cx, cy + 9, label, size=24, weight=700, fill='#1F8FC4'))
    return ''.join(s)


# ── nấm, giỏ (Bài 32 Tiết 3 câu 4) ──────────────────────────────────────────
def mushroom(cx, by, label, cap=SKY_D, stem='#FFF4DF', w=150):
    s = [f'<path d="M{cx - 22},{by - 54} Q{cx - 30},{by - 6} {cx - 24},{by - 2} H{cx + 24} Q{cx + 30},{by - 6} {cx + 22},{by - 54} Z" fill="{stem}" {st()}/>',
         f'<path d="M{cx - w / 2},{by - 52} Q{cx - w / 2 + 6},{by - 120} {cx},{by - 122} Q{cx + w / 2 - 6},{by - 120} {cx + w / 2},{by - 52} '
         f'Q{cx},{by - 62} {cx - w / 2},{by - 52} Z" fill="{cap}" {st()}/>',
         f'<path d="M{cx - w * .36},{by - 84} Q{cx - w * .3},{by - 106} {cx - w * .14},{by - 112}" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".6"/>',
         text(cx, by - 70, label, size=24, weight=700)]
    return ''.join(s)


def wicker_basket(cx, by, label, w=130, h=74, col='#7CC6E8', dark='#4FA9D8'):
    top = by - h
    cid = uid('wb')
    d = f'M{cx - w / 2},{top} L{cx - w * .38},{by - 6} Q{cx},{by + 6} {cx + w * .38},{by - 6} L{cx + w / 2},{top} Z'
    s = [f'<path d="M{cx - w * .36},{top + 2} Q{cx - w * .36},{top - h * 1.05} {cx},{top - h * 1.05} Q{cx + w * .36},{top - h * 1.05} {cx + w * .36},{top + 2}" fill="none" stroke="{INK}" stroke-width="12" stroke-linecap="round"/>',
         f'<path d="M{cx - w * .36},{top + 2} Q{cx - w * .36},{top - h * 1.05} {cx},{top - h * 1.05} Q{cx + w * .36},{top - h * 1.05} {cx + w * .36},{top + 2}" fill="none" stroke="{col}" stroke-width="6" stroke-linecap="round"/>',
         f'<clipPath id="{cid}"><path d="{d}"/></clipPath>',
         f'<path d="{d}" fill="{col}"/>',
         f'<g clip-path="url(#{cid})">']
    for k in range(1, 5):
        yy = top + h * k / 5
        s.append(f'<line x1="{cx - w / 2}" y1="{yy:.1f}" x2="{cx + w / 2}" y2="{yy:.1f}" stroke="{dark}" stroke-width="2.4"/>')
    for k in range(-5, 6):
        s.append(f'<line x1="{cx + k * 13}" y1="{top}" x2="{cx + k * 11}" y2="{by}" stroke="{dark}" stroke-width="2" opacity=".7"/>')
    s.append('</g>')
    s.append(f'<path d="{d}" fill="none" {st()}/>')
    s.append(f'<rect x="{cx - w / 2 - 6}" y="{top - 8}" width="{w + 12}" height="14" rx="7" fill="{dark}" {st()}/>')
    if label:
        s.append(f'<ellipse cx="{cx}" cy="{by - h * .45}" rx="24" ry="19" fill="#fff" {st(2.6)}/>')
        s.append(text(cx, by - h * .45 + 9, label, size=24, weight=700))
    return ''.join(s)


# ── tàu thủy, tên lửa (Bài 33 Tiết 2 câu 2) ────────────────────────────────
def ship(cx, by, label, w=240, flip=False):
    """Tàu thủy nhìn ngang, mũi tàu bên phải (flip: bên trái); biển tên trên thân ghi phép tính."""
    k = -1 if flip else 1
    def X(dx):
        return cx + k * dx
    hw = w / 2
    s = [f'<path d="M{X(-hw)},{by - 58} L{X(hw + 18)},{by - 58} L{X(hw - 20)},{by} L{X(-hw + 16)},{by} Z" fill="#5B7FA6" {st()}/>',
         f'<path d="M{X(-hw + 4)},{by - 22} L{X(hw - 6)},{by - 22}" stroke="#fff" stroke-width="4" opacity=".5"/>',
         # ca-bin
         f'<rect x="{min(X(-hw * .55), X(hw * .25))}" y="{by - 96}" width="{hw * .8}" height="40" rx="6" fill="#fff" {st()}/>',
         f'<rect x="{min(X(-hw * .4), X(hw * .05))}" y="{by - 130}" width="{hw * .45}" height="36" rx="6" fill="#fff" {st()}/>',
         f'<rect x="{X(-hw * .26) - 9}" y="{by - 160}" width="18" height="32" fill="{RED}" {st()}/>']
    for i in range(3):
        wx = X(-hw * .44 + i * hw * .26)
        s.append(f'<circle cx="{wx}" cy="{by - 76}" r="7" fill="{SKY}" {st(2.2)}/>')
    # biển tên (phép tính) trên thân
    s.append(f'<rect x="{cx - hw * .62}" y="{by - 52}" width="{hw * 1.24}" height="40" rx="8" fill="#CDEBFA" {st(2.6)}/>')
    s.append(text(cx, by - 23, label, size=26, weight=700, fill='#1F7FB8'))
    # sóng
    s.append(f'<path d="M{cx - hw - 10},{by + 6} q15,-8 30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0 t30,0" fill="none" stroke="{SKY_D}" stroke-width="4" stroke-linecap="round"/>')
    return ''.join(s)


def rocket(cx, by, label, body='#E8F4FB', fin=BLUE):
    s = []
    # cánh
    for sg in (-1, 1):
        s.append(f'<path d="M{cx + sg * 34},{by - 110} Q{cx + sg * 70},{by - 70} {cx + sg * 66},{by - 18} L{cx + sg * 34},{by - 40} Z" fill="{fin}" {st()}/>')
    # lửa
    s.append(f'<path d="M{cx - 18},{by - 26} Q{cx},{by + 22} {cx + 18},{by - 26} Z" fill="{ORANGE}" {st(2.6)}/>')
    s.append(f'<path d="M{cx - 8},{by - 26} Q{cx},{by + 4} {cx + 8},{by - 26} Z" fill="{YELLOW}"/>')
    # thân
    s.append(f'<path d="M{cx - 36},{by - 30} L{cx - 38},{by - 120} Q{cx - 34},{by - 190} {cx},{by - 216} Q{cx + 34},{by - 190} {cx + 38},{by - 120} L{cx + 36},{by - 30} Z" fill="{body}" {st()}/>')
    s.append(f'<path d="M{cx - 30},{by - 182} Q{cx},{by - 196} {cx + 30},{by - 182} Q{cx + 20},{by - 206} {cx},{by - 216} Q{cx - 20},{by - 206} {cx - 30},{by - 182} Z" fill="{RED}" {st(2.6)}/>')
    s.append(f'<circle cx="{cx}" cy="{by - 154}" r="12" fill="{SKY}" {st(2.6)}/>')
    s.append(f'<rect x="{cx - 36}" y="{by - 44}" width="72" height="16" rx="5" fill="{fin}" {st(2.6)}/>')
    s.append(f'<ellipse cx="{cx}" cy="{by - 98}" rx="27" ry="21" fill="#fff" {st(2.6)}/>')
    s.append(text(cx, by - 89, label, size=26, weight=800))
    return ''.join(s)


# ── lá phong (Bài 33 Tiết 3 câu 4) ──────────────────────────────────────────
def maple(cx, cy, label, R=112, rot=0):
    """Lá phong 5 thùy rộng (hình kín để tô), cuống, gân lá; phép tính viết ngang lá."""
    lobes = [(-90, 1.0), (-22, .95), (-158, .95), (38, .62), (142, .62)]
    lobes.sort()
    pts = []
    for j, (a, L) in enumerate(lobes):
        for da, f in ((-24, .8), (-16, .9), (-8, .84), (0, 1.0), (8, .84), (16, .9), (24, .8)):
            aa = math.radians(a + da)
            pts.append((cx + math.cos(aa) * R * L * f, cy + math.sin(aa) * R * L * f * .82))
        na = (a + lobes[(j + 1) % len(lobes)][0] + (360 if j == len(lobes) - 1 else 0)) / 2
        aa = math.radians(na)
        pts.append((cx + math.cos(aa) * R * .64, cy + math.sin(aa) * R * .56))
    d = 'M' + ' L'.join(f'{x:.1f},{y:.1f}' for x, y in pts) + ' Z'
    s = [f'<g transform="rotate({rot} {cx} {cy})">',
         f'<path d="M{cx},{cy + 10} Q{cx + 4},{cy + R * .7} {cx + 18},{cy + R * .95}" fill="none" stroke="#8A8F96" stroke-width="5" stroke-linecap="round"/>',
         f'<path d="{d}" fill="#fff" {st(2.6)}/>']
    for a, L in lobes:
        aa = math.radians(a)
        s.append(f'<path d="M{cx},{cy} L{cx + math.cos(aa) * R * L * .85:.1f},{cy + math.sin(aa) * R * L * .7:.1f}" stroke="#B9C2CB" stroke-width="2" fill="none" pointer-events="none"/>')
    s.append('</g>')
    s.append(text(cx, cy + 8, label, size=22, weight=700, fill='#1F7FB8', extra=' stroke="#fff" stroke-width="5" paint-order="stroke" pointer-events="none"'))
    return ''.join(s)


# ── bong bóng (Bài 33 Tiết 3 câu 5) ─────────────────────────────────────────
def ball(cx, cy, r, label, col='#5BC0EE'):
    gid = uid('bb')
    return (f'<radialGradient id="{gid}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#BDE6F8"/><stop offset="1" stop-color="{col}"/></radialGradient>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{gid})" {st(2.6)}/>'
            f'<path d="M{cx - r * .6},{cy - r * .25} Q{cx - r * .5},{cy - r * .6} {cx - r * .2},{cy - r * .68}" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>'
            + text(cx, cy + r * .28, label, size=r * .72, weight=700))


# ── cuộn giấy phép tính dọc (Bài 33 Tiết 2 câu 4) ───────────────────────────
def scroll(x, y, a, b, op, res, w=96, h=150, gear=BLUE):
    """Tờ giấy cuộn dưới: phép tính dọc a op b, kẻ vạch, dòng kết quả (res=None → các bánh răng nhỏ = chỗ trống).
    (x, y) = góc trên trái."""
    s = [f'<path d="M{x},{y} Q{x + w / 2},{y + 10} {x + w},{y} L{x + w},{y + h - 26} H{x + 24} Z" fill="#E8F6FD" {st(2.6)}/>',
         f'<path d="M{x},{y} L{x + 6},{y + h - 26}" {st(2.6)}/>',
         f'<rect x="{x - 26}" y="{y + h - 40}" width="{w + 24}" height="34" rx="17" fill="#BDE6F8" {st(2.6)}/>',
         f'<circle cx="{x - 10}" cy="{y + h - 23}" r="12" fill="#E8F6FD" {st(2.4)}/>',
         f'<circle cx="{x - 10}" cy="{y + h - 23}" r="5" fill="none" {st(2)}/>']
    rx = x + w - 18
    s.append(text(rx, y + 34, str(a), size=24, weight=600, anchor='end'))
    s.append(text(rx, y + 62, str(b), size=24, weight=600, anchor='end'))
    s.append(text(x + 18, y + 52, op, size=24, weight=600))
    s.append(f'<line x1="{x + 14}" y1="{y + 70}" x2="{rx + 4}" y2="{y + 70}" {st(2.6)}/>')
    if res is not None:
        s.append(text(rx, y + 96, str(res), size=24, weight=600, anchor='end'))
    else:
        n = 1 if a - b < 10 and op == '−' else 2
        for i in range(n):
            s.append(gear_dot(rx - 7 - i * 16, y + 88, gear))
    return ''.join(s)


def gear_dot(cx, cy, col=BLUE, r=6):
    s = []
    for i in range(8):
        a = math.radians(i * 45)
        s.append(f'<line x1="{cx}" y1="{cy}" x2="{cx + math.cos(a) * r:.1f}" y2="{cy + math.sin(a) * r:.1f}" stroke="{col}" stroke-width="3"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .62:.1f}" fill="{col}"/><circle cx="{cx}" cy="{cy}" r="{r * .25:.1f}" fill="#fff"/>')
    return ''.join(s)


# ── cừu, đá, cỏ (Bài 33 Tiết 1 câu 4) ───────────────────────────────────────
def sheep(cx, by, wool='#fff', face='#7A7378', s=1.0, flip=False):
    k = s
    p = []
    for dx in (-26, -10, 12, 28):
        p.append(f'<rect x="{dx - 4}" y="-30" width="9" height="30" rx="4" fill="{face}" {st(2.4)}/>')
    blobs = [(-36, -46, 18), (-16, -58, 20), (8, -60, 20), (30, -50, 18), (-26, -34, 18), (0, -34, 20), (26, -34, 18)]
    for x, y, r in blobs:
        p.append(f'<circle cx="{x}" cy="{y}" r="{r}" fill="{wool}" {st(2.6)}/>')
    for x, y, r in blobs:
        p.append(f'<circle cx="{x}" cy="{y}" r="{r - 2.6}" fill="{wool}"/>')
    p.append(f'<ellipse cx="48" cy="-58" rx="18" ry="21" fill="{face}" {st(2.6)}/>')
    p.append(f'<ellipse cx="34" cy="-66" rx="9" ry="5" fill="{face}" {st(2.2)} transform="rotate(-25 34 -66)"/>')
    p.append(f'<ellipse cx="62" cy="-66" rx="9" ry="5" fill="{face}" {st(2.2)} transform="rotate(25 62 -66)"/>')
    p.append(f'<circle cx="48" cy="-76" r="9" fill="{wool}" {st(2.2)}/>')
    p.append(f'<circle cx="42" cy="-58" r="3.4" fill="#fff"/><circle cx="54" cy="-58" r="3.4" fill="#fff"/>')
    p.append(f'<circle cx="42" cy="-58" r="1.8" fill="{INK}"/><circle cx="54" cy="-58" r="1.8" fill="{INK}"/>')
    p.append(f'<path d="M44,-48 q4,4 8,0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/>')
    return place(cx, by, k, ''.join(p), flip=flip)


def rock(cx, by, w, h, col='#B9C6D2', dark='#8FA2B4'):
    d = (f'M{cx - w / 2},{by} Q{cx - w / 2 - 8},{by - h * .7} {cx - w * .3},{by - h * .95} Q{cx},{by - h * 1.06} {cx + w * .3},{by - h * .95} '
         f'Q{cx + w / 2 + 8},{by - h * .7} {cx + w / 2},{by} Z')
    return (f'<path d="{d}" fill="{col}" {st()}/>'
            f'<path d="M{cx - w * .3},{by - h * .55} q{w * .1},{-h * .12} {w * .22},{-h * .02}" fill="none" stroke="{dark}" stroke-width="5" stroke-linecap="round"/>'
            f'<path d="M{cx + w * .1},{by - h * .3} q{w * .12},{-h * .1} {w * .25},0" fill="none" stroke="{dark}" stroke-width="5" stroke-linecap="round"/>')


def grass_tuft(x, by, h=40, col=GRASS_D):
    s = []
    for dx, hh, lean in ((-10, .7, -8), (-4, 1.0, -3), (3, .9, 4), (10, .65, 9)):
        s.append(f'<path d="M{x + dx},{by} Q{x + dx + lean * .3},{by - h * hh * .6} {x + dx + lean},{by - h * hh}" fill="none" stroke="{col}" stroke-width="3.4" stroke-linecap="round"/>')
    return ''.join(s)


def hand_icon(x, y, s=1.0, col=BLUE):
    """bàn tay xoè nằm ngang (gang tay)"""
    p = (f'<path d="M0,0 L-30,-2 Q-36,-2 -36,-8 Q-36,-13 -30,-13 L-10,-12 L-24,-22 Q-28,-27 -23,-30 Q-19,-32 -15,-28 L2,-16 '
         f'Q8,-22 14,-18 L20,-12 Q24,-6 18,0 Z" fill="#fff" stroke="{col}" stroke-width="2.6" stroke-linejoin="round"/>')
    return place(x, y, s, p)


# ── gấu, khỉ, rô-bốt hộp (Bài 32 Tiết 2 câu 4) ──────────────────────────────
def bear(cx, by, h, col='#C98F5E', light='#F2D3A6'):
    """Gấu đứng vẫy tay, cao h (đỉnh tai = by - h)."""
    k = h / 300
    p = []
    for sg in (-1, 1):
        p.append(f'<ellipse cx="{sg * 34}" cy="-26" rx="30" ry="34" fill="{col}" {st()}/>')
        p.append(f'<ellipse cx="{sg * 38}" cy="-6" rx="30" ry="12" fill="{light}" {st(2.6)}/>')
    p.append(f'<ellipse cx="0" cy="-104" rx="72" ry="82" fill="{col}" {st()}/>')
    p.append(f'<ellipse cx="0" cy="-96" rx="46" ry="58" fill="{light}"/>')
    p.append(tube('M-58,-150 Q-96,-180 -100,-226', col, 28))
    p.append(f'<circle cx="-100" cy="-230" r="20" fill="{col}" {st()}/>')
    p.append(tube('M60,-150 Q82,-120 64,-96', col, 28))
    for sg in (-1, 1):
        p.append(f'<circle cx="{sg * 40}" cy="-272" r="18" fill="{col}" {st()}/><circle cx="{sg * 40}" cy="-272" r="9" fill="{light}"/>')
    p.append(f'<ellipse cx="0" cy="-226" rx="56" ry="50" fill="{col}" {st()}/>')
    p.append(f'<ellipse cx="0" cy="-208" rx="26" ry="19" fill="{light}" {st(2.4)}/>')
    p.append(f'<ellipse cx="0" cy="-218" rx="9" ry="7" fill="{INK}"/>')
    p.append(f'<path d="M-9,-204 q9,8 18,0" fill="none" {st(2.6)}/>')
    for sg in (-1, 1):
        p.append(f'<circle cx="{sg * 20}" cy="-240" r="6" fill="{INK}"/><circle cx="{sg * 20 + 2}" cy="-242" r="2" fill="#fff"/>')
        p.append(f'<ellipse cx="{sg * 36}" cy="-216" rx="8" ry="5" fill="{PINK}" opacity=".7"/>')
    return place(cx, by, k, ''.join(p))


def monkey(cx, by, h, col='#B07A4F', light='#F2D3A6'):
    """Khỉ đứng, cao h (đỉnh đầu = by - h)."""
    k = h / 260
    p = []
    p.append('<path d="M36,-70 Q90,-80 84,-150 Q80,-180 98,-186" fill="none" stroke="' + INK + '" stroke-width="11" stroke-linecap="round"/>')
    p.append(f'<path d="M36,-70 Q90,-80 84,-150 Q80,-180 98,-186" fill="none" stroke="{col}" stroke-width="5" stroke-linecap="round"/>')
    for sg in (-1, 1):
        p.append(tube(f'M{sg * 16},-70 Q{sg * 30},-40 {sg * 24},-10', col, 16))
        p.append(f'<ellipse cx="{sg * 30}" cy="-6" rx="18" ry="8" fill="{light}" {st(2.4)}/>')
        p.append(tube(f'M{sg * 30},-148 Q{sg * 52},-110 {sg * 46},-76', col, 14))
        p.append(f'<circle cx="{sg * 46}" cy="-72" r="9" fill="{light}" {st(2.4)}/>')
    p.append(f'<ellipse cx="0" cy="-110" rx="38" ry="50" fill="{col}" {st()}/>')
    p.append(f'<ellipse cx="0" cy="-104" rx="22" ry="34" fill="{light}"/>')
    for sg in (-1, 1):
        p.append(f'<circle cx="{sg * 44}" cy="-206" r="16" fill="{light}" {st()}/>')
    p.append(f'<ellipse cx="0" cy="-204" rx="44" ry="42" fill="{col}" {st()}/>')
    p.append(f'<path d="M-30,-206 Q-30,-232 -10,-228 Q0,-222 10,-228 Q30,-232 30,-206 Q34,-176 0,-172 Q-34,-176 -30,-206 Z" fill="{light}" {st(2.4)}/>')
    for sg in (-1, 1):
        p.append(f'<circle cx="{sg * 13}" cy="-210" r="5.5" fill="{INK}"/><circle cx="{sg * 13 + 2}" cy="-212" r="1.8" fill="#fff"/>')
    p.append(f'<path d="M-10,-188 q10,9 20,0" fill="none" {st(2.6)}/>')
    return place(cx, by, k, ''.join(p))


def box_robot(cx, by, h, body='#9CC8EE', dark='#5E9BD6'):
    """Rô-bốt thân hộp, đầu vuông, tay kìm, cao h (đỉnh ăng-ten = by - h)."""
    k = h / 300
    p = []
    for sg in (-1, 1):
        p.append(f'<rect x="{sg * 22 - 12}" y="-70" width="24" height="56" fill="{GREY_L}" {st()}/>')
        p.append(f'<path d="M{sg * 22 - 22},0 L{sg * 22 - 22},-10 Q{sg * 22 - 22},-22 {sg * 22},-22 Q{sg * 22 + 22},-22 {sg * 22 + 22},-10 L{sg * 22 + 22},0 Z" fill="{dark}" {st()}/>')
    p.append(tube('M-52,-160 L-80,-110 L-76,-80', GREY, 9))
    p.append(f'<path d="M-88,-80 a12,12 0 1 0 24,0" fill="none" {st(5)}/>')
    p.append(tube('M52,-160 L84,-180 L92,-214', GREY, 9))
    p.append(f'<path d="M80,-214 a12,12 0 1 1 24,0" fill="none" {st(5)}/>')
    p.append(f'<rect x="-52" y="-180" width="104" height="112" rx="8" fill="{body}" {st()}/>')
    p.append(f'<rect x="-34" y="-160" width="44" height="58" rx="4" fill="{dark}" {st(2.4)}/>')
    for r in range(3):
        for c in range(3):
            p.append(f'<rect x="{-29 + c * 13}" y="{-153 + r * 17}" width="9" height="11" rx="2" fill="#fff"/>')
    for i in range(6):
        p.append(f'<circle cx="34" cy="{-166 + i * 15}" r="4.4" fill="{YELLOW if i % 2 == 0 else "#fff"}" {st(1.8)}/>')
    p.append(f'<rect x="-10" y="-196" width="20" height="18" fill="{GREY}" {st(2.4)}/>')
    p.append(f'<rect x="-44" y="-270" width="88" height="76" rx="10" fill="{body}" {st()}/>')
    p.append(f'<line x1="0" y1="-270" x2="0" y2="-290" {st(4)}/><circle cx="0" cy="-292" r="8" fill="{RED}" {st(2.4)}/>')
    for sg in (-1, 1):
        p.append(f'<circle cx="{sg * 18}" cy="-244" r="11" fill="#fff" {st(2.4)}/><circle cx="{sg * 18}" cy="-243" r="5" fill="{INK}"/>')
    p.append(f'<path d="M-24,-220 Q0,-202 24,-220 Z" fill="#fff" {st(2.4)}/>')
    p.append(f'<path d="M-12,-218 V-212 M0,-216 V-208 M12,-218 V-212" {st(1.6)}/>')
    return place(cx, by, k, ''.join(p))


def pole(x, top, by, col='#8A8F96'):
    s = [f'<rect x="{x - 6}" y="{top}" width="12" height="{by - top}" fill="#E8ECF0" {st(2.6)}/>']
    n = 10
    for i in range(1, n):
        yy = by - (by - top) * i / n
        s.append(f'<line x1="{x - 12}" y1="{yy:.1f}" x2="{x + 12}" y2="{yy:.1f}" stroke="{INK}" stroke-width="2"/>')
    return ''.join(s)


def dashed(x1, y1, x2, y2, col=INK, w=2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}" stroke-dasharray="6 5"/>'
