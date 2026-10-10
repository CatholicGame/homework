"""
Bộ vẽ riêng cho Vở BT Toán 1 Tập hai (Kết nối tri thức), Bài 34–37 (xem giờ, ngày trong tuần, lịch):
đồng hồ kim kiểu sách (viền bạc, mặt xanh nhạt), đồng hồ báo thức nét trắng để tô màu, khung tranh viền
xanh, thẻ nhãn, tờ lịch, vài con vật / đồ vật nhỏ. Nét riêng, phẳng, viền INK như common.py.

Quy ước đồng hồ: kim chỉ dừng trước vòng số (kim dài 0,52 r, số ở 0,68 r), không che số nào.
"""
import math
from common import *

SW = 3
LINE = '#2B9BD6'          # xanh viền khung / nhãn trong sách
LABEL = '#D6EEFB'         # nền nhãn xanh nhạt
FACE = '#E4F4FC'          # mặt đồng hồ
RIM = '#C3CED8'           # viền bạc
HAND = '#1C5F92'          # kim ngắn
MHAND = '#2E9BD6'         # kim dài
F = 'grade1-workbook-2'
_uid = [0]


def uid(p='e'):
    _uid[0] += 1
    return f'{p}{_uid[0]}'


def st(w=SW, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def place(x, y, s, inner, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


# ───────────────────────── đồng hồ ─────────────────────────
def dial(cx, cy, r, h=None, minute=True, nums=True, face=FACE, ink=INK, hand=HAND, mhand=MHAND, ticks=True, fs=None):
    """Mặt số + kim (không viền). h=None: không có kim ngắn (bé tự vẽ)."""
    s = []
    if ticks:
        for i in range(60):
            a = math.radians(i * 6)
            big = i % 5 == 0
            r1, r2 = r * (.83 if big else .87), r * .93
            s.append(f'<line x1="{cx + r1 * math.sin(a):.1f}" y1="{cy - r1 * math.cos(a):.1f}" x2="{cx + r2 * math.sin(a):.1f}" '
                     f'y2="{cy - r2 * math.cos(a):.1f}" stroke="{ink}" stroke-width="{max(1.2, r * .03) if big else max(.6, r * .012):.1f}"/>')
    if nums:
        fs = fs or r * .25
        for n in range(1, 13):
            a = math.radians(n * 30)
            rr = r * .68
            s.append(text(f'{cx + rr * math.sin(a):.1f}', f'{cy - rr * math.cos(a) + fs * .36:.1f}', n, size=f'{fs:.1f}', weight=700, fill=ink))
    if minute:
        s.append(f'<line x1="{cx}" y1="{cy + r * .08:.1f}" x2="{cx}" y2="{cy - r * .52:.1f}" stroke="{mhand}" stroke-width="{max(2.2, r * .05):.1f}" stroke-linecap="round"/>')
    if h is not None:
        a = math.radians((h % 12) * 30)
        L = r * .36
        s.append(f'<line x1="{cx - r * .06 * math.sin(a):.1f}" y1="{cy + r * .06 * math.cos(a):.1f}" x2="{cx + L * math.sin(a):.1f}" y2="{cy - L * math.cos(a):.1f}" '
                 f'stroke="{hand}" stroke-width="{max(3.5, r * .095):.1f}" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{max(2.5, r * .06):.1f}" fill="{hand}" stroke="#fff" stroke-width="{max(1, r * .02):.1f}"/>')
    return ''.join(s)


def bclock(cx, cy, r, h=None, minute=True, nums=True, rim=RIM):
    """Đồng hồ treo tường kiểu sách: viền bạc dày, mặt xanh nhạt, kim xanh đậm."""
    s = [f'<circle cx="{cx + r * .04:.1f}" cy="{cy + r * .06:.1f}" r="{r}" fill="#000" opacity=".12"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{rim}" {st(max(2, r * .045))}/>',
         f'<path d="M{cx - r * .86:.1f},{cy - r * .2:.1f} A{r * .88:.1f},{r * .88:.1f} 0 0 1 {cx + r * .5:.1f},{cy - r * .72:.1f}" fill="none" stroke="#fff" stroke-width="{r * .06:.1f}" opacity=".8" stroke-linecap="round"/>',
         f'<circle cx="{cx}" cy="{cy}" r="{r * .84:.1f}" fill="{FACE}" {st(max(1.4, r * .025))}/>',
         dial(cx, cy, r * .84, h, minute, nums)]
    return ''.join(s)


def clock_svg(h, r=70, minute=True):
    """(W, H, parts) của một đồng hồ đứng riêng (ô nối)."""
    W = H = int(2 * r + 12)
    return W, H, [bclock(W / 2 - 2, H / 2 - 3, r, h, minute)]


def outline_dial(cx, cy, r, h, face_extra=''):
    """Mặt đồng hồ nét đen trắng (để tô màu): vòng mặt + vạch + số + kim đen."""
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff" {st(2.4)}/>'
            + dial(cx, cy, r, h, True, True, face='#fff', ink=INK, hand=INK, mhand=INK) + face_extra)


# ───────────────────────── khung, nhãn ─────────────────────────
def panel(x, y, w, h, inner='', bg=WHITE, border=LINE, r=14):
    """Khung tranh bo góc viền xanh như sách; nội dung cắt gọn trong khung."""
    cid = uid('clip')
    return (f'<clipPath id="{cid}"><rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}"/></clipPath>'
            f'<g clip-path="url(#{cid})"><rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{bg}"/>{inner}</g>'
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="none" stroke="{border}" stroke-width="3.5"/>')


def badge(x, y, ch, r=15):
    """chữ a, b, c… trong vòng tròn trắng ở góc tranh"""
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="#fff" {st(2.2)}/>' + text(x, y + r * .42, ch, size=r * 1.25, weight=600)


def pill(cx, cy, w, h, label, size=None, fill=LABEL, border=LINE, weight=700, col=INK, r=None):
    size = size or h * .5
    r = h * .32 if r is None else r
    return (f'<rect x="{cx - w / 2:.1f}" y="{cy - h / 2:.1f}" width="{w}" height="{h}" rx="{r:.1f}" fill="{fill}" stroke="{border}" stroke-width="2.6"/>'
            + text(f'{cx:.1f}', f'{cy + size * .36:.1f}', label, size=f'{size:.1f}', weight=weight, fill=col))


def dots(x1, x2, y, col=INK):
    """dòng chấm để viết (chỗ chấm trong sách)"""
    return f'<line x1="{x1}" y1="{y}" x2="{x2}" y2="{y}" stroke="{col}" stroke-width="2.6" stroke-dasharray="0.1 6" stroke-linecap="round"/>'


def bubble(cx, cy, w, h, lines, tail=(0, 0), size=17):
    """bóng nói hình bầu dục, đuôi trỏ về tail (toạ độ tuyệt đối)"""
    tx, ty = tail
    s = [f'<path d="M{cx - w * .12:.1f},{cy + h * .38:.1f} L{tx},{ty} L{cx + w * .06:.1f},{cy + h * .44:.1f} Z" fill="#fff" {st(2.4)}/>',
         f'<ellipse cx="{cx}" cy="{cy}" rx="{w / 2}" ry="{h / 2}" fill="#fff" {st(2.4)}/>',
         f'<path d="M{cx - w * .12 + 3:.1f},{cy + h * .38 - 2:.1f} L{cx + w * .06 - 3:.1f},{cy + h * .44 - 2:.1f}" stroke="#fff" stroke-width="5"/>']
    n = len(lines)
    for i, t in enumerate(lines):
        s.append(text(cx, f'{cy + (i - (n - 1) / 2) * size * 1.2 + size * .36:.1f}', t, size=size, weight=600))
    return ''.join(s)


# ───────────────────────── tờ lịch ─────────────────────────
def sheet(x, y, w, h, month, day='', wd='', head=LINE, rot=0, stack=0):
    """Tờ lịch bóc: dải tên tháng xanh, số ngày to, thứ ở dưới. stack = số tờ phía sau (xấp lịch)."""
    s = []
    for k in range(stack, 0, -1):
        s.append(f'<rect x="{x + k * 5}" y="{y + k * 5}" width="{w}" height="{h}" rx="8" fill="#fff" {st(2.2, LINE)}/>')
    hh = h * .2
    s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="8" fill="#fff" {st(2.6, LINE)}/>')
    s.append(f'<path d="M{x},{y + hh} L{x},{y + 8} Q{x},{y} {x + 8},{y} L{x + w - 8},{y} Q{x + w},{y} {x + w},{y + 8} L{x + w},{y + hh} Z" fill="{LABEL}" {st(2.6, LINE)}/>')
    s.append(text(x + w / 2, y + hh * .72, month, size=hh * .62, weight=700))
    if day != '':
        s.append(text(x + w / 2, y + h * .58, day, size=h * .32, weight=700))
    if wd:
        s.append(text(x + w / 2, y + h * .86, wd, size=h * .12, weight=600))
    inner = ''.join(s)
    if rot:
        return f'<g transform="rotate({rot} {x + w / 2} {y + h / 2})">{inner}</g>'
    return inner


# ───────────────────────── đồ vật nhỏ ─────────────────────────
def ground(x, y, w, h, col=GRASS):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{col}"/>'


def sun(cx, cy, r=26):
    s = []
    for i in range(10):
        a = math.radians(i * 36)
        s.append(f'<line x1="{cx + r * 1.25 * math.cos(a):.1f}" y1="{cy + r * 1.25 * math.sin(a):.1f}" x2="{cx + r * 1.65 * math.cos(a):.1f}" y2="{cy + r * 1.65 * math.sin(a):.1f}" stroke="{ORANGE}" stroke-width="4" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{YELLOW}" {st(2.6)}/>')
    return ''.join(s)


def eye(x, y, r=4):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/><circle cx="{x + r * .35:.1f}" cy="{y - r * .4:.1f}" r="{r * .38:.1f}" fill="#fff"/>'


def arrow(x1, y1, x2, y2, bend=0, col=INK):
    """mũi tên cong nét đứt từ (x1,y1) tới (x2,y2); bend > 0 cong sang trái chiều đi"""
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1
    L = math.hypot(dx, dy) or 1
    cx, cy = mx - dy / L * bend, my + dx / L * bend
    tx, ty = x2 - cx, y2 - cy
    tl = math.hypot(tx, ty) or 1
    ux, uy = tx / tl, ty / tl
    a1 = (x2 - ux * 12 - uy * 7, y2 - uy * 12 + ux * 7)
    a2 = (x2 - ux * 12 + uy * 7, y2 - uy * 12 - ux * 7)
    return (f'<path d="M{x1},{y1} Q{cx:.1f},{cy:.1f} {x2 - ux * 4:.1f},{y2 - uy * 4:.1f}" fill="none" stroke="{col}" stroke-width="2.6" stroke-dasharray="7 6" stroke-linecap="round"/>'
            f'<path d="M{a1[0]:.1f},{a1[1]:.1f} L{x2},{y2} L{a2[0]:.1f},{a2[1]:.1f} Z" fill="{col}" stroke="{col}" stroke-width="1.5" stroke-linejoin="round"/>')
