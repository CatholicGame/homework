"""
Bộ vẽ cho Vở BT Toán 1 Tập Hai, Bài 23–27 (scripts/redraw/g1t2_bai23.py … g1t2_bai27.py).
Nét riêng, phẳng, viền INK, bảng màu của common.py. Chỉ giữ nội dung toán của sách: số lượng,
độ dài / chiều cao tương đối, số ghi trên hình, vị trí tương đối.
Hầu hết hàm trả về chuỗi SVG đặt sẵn theo toạ độ truyền vào.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import kit_g1 as K1
import kit_g3 as K3
import kit_p2 as KP2
import kit_measure as KM

SW = 3
FOLDER = 'grade1-workbook-2'
BLUE_D = '#3B8FD0'
BLUE_L = '#D6ECFB'
LEAF = '#4CB0E6'


def st(w=SW, col=INK):
    return f'stroke="{col}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def put(inner, x, y, s=1.0, flip=False, rot=0):
    sx = -s if flip else s
    return f'<g transform="translate({x:.1f},{y:.1f}) rotate({rot}) scale({sx:.4f},{s:.4f})">{inner}</g>'


def out(name, w, h, parts, bg=None):
    save(name, w, h, parts, bg=bg, folder=FOLDER)


def panel(x, y, w, h, fill=BLUE_L, rx=14, edge='#9CCDEE'):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" {st(2.4, edge)}/>'


def dash(x1, y1, x2, y2, col=INK, w=1.6, d='5 4'):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{w}" stroke-dasharray="{d}"/>'


def arrow2(x1, x2, y, col=INK, w=2.4):
    """mũi tên hai đầu ↔ (đo chiều dài)"""
    return (f'<line x1="{x1 + 4}" y1="{y}" x2="{x2 - 4}" y2="{y}" stroke="{col}" stroke-width="{w}"/>'
            f'<path d="M{x1},{y} l12,-6 l0,12 Z M{x2},{y} l-12,-6 l0,12 Z" fill="{col}"/>')


# ── que tính ────────────────────────────────────────────────────────────────

def stick(x, y, h=150, w=11, col='#9ED3F5'):
    """một que tính đứng, (x, y) = góc trên trái"""
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{col}" {st(2)}/>'


def bundle(x, y, h=150, col='#9ED3F5'):
    """bó một chục que tính buộc dây; (x, y) = góc trên trái, rộng ~44"""
    s = []
    for i in range(4):
        s.append(stick(x + i * 10.5, y + 2, h - 2, 11, col))
    s.append(f'<ellipse cx="{x + 21.5}" cy="{y + 4}" rx="23" ry="6" fill="{col}" {st(2)}/>')
    for i in range(4):
        s.append(f'<circle cx="{x + 7 + i * 10}" cy="{y + 4}" r="3" fill="#fff" {st(1.4)}/>')
    yb = y + h * .52
    s.append(f'<path d="M{x - 2},{yb} Q{x + 22},{yb + 8} {x + 46},{yb}" fill="none" {st(4, BROWN)}/>')
    s.append(f'<path d="M{x + 44},{yb + 1} l8,-7 M{x + 44},{yb + 1} l9,5" fill="none" {st(3, BROWN)}/>')
    return ''.join(s)


def sticks_panel(tens, ones, w=None, h=200, fill=BLUE_L):
    """khung xanh: `tens` bó chục và `ones` que lẻ. Trả về (parts, W, H)."""
    W = w or (40 + tens * 58 + 18 + ones * 17 + 30)
    s = [panel(4, 4, W - 8, h - 8, fill)]
    x = (W - (tens * 58 + 18 + ones * 17 - 6)) / 2
    for i in range(tens):
        s.append(bundle(x, 26, h - 52))
        x += 58
    x += 18
    for i in range(ones):
        s.append(stick(x, 30, h - 56))
        x += 17
    return s, W, h


# ── nhà, cây bụi ────────────────────────────────────────────────────────────

def house(x, y, w=64, num=None, wall='#5DB4EA', side='#3C8CC6', roof=WHITE):
    """ngôi nhà nhỏ nhìn chéo: (x, y) = góc dưới trái mặt trước; mái trắng để tô."""
    h = w * .62
    d = w * .55            # chiều sâu sang phải
    up = w * .2
    s = [f'<path d="M{x + w / 2},{y - h - w * .38} L{x + w / 2 + d},{y - h - w * .38 - up} L{x + w + d},{y - h - up} L{x + w + d},{y - up} L{x + w},{y} L{x + w},{y - h} Z" fill="{side}" {st(2.4)}/>',
         f'<path d="M{x - 4},{y - h + 2} L{x + w / 2},{y - h - w * .38} L{x + w + 4},{y - h + 2} Z" fill="{wall}" {st(2.4)}/>',
         f'<rect x="{x}" y="{y - h}" width="{w}" height="{h}" fill="{wall}" {st(2.4)}/>',
         f'<path d="M{x + w * .3},{y} L{x + w * .3},{y - h * .55} A{w * .2},{w * .2} 0 0 1 {x + w * .7},{y - h * .55} L{x + w * .7},{y} Z" fill="{WHITE}" {st(2.2)}/>',
         # mái: tấm trắng từ đỉnh hồi sang phải
         f'<path d="M{x + w / 2},{y - h - w * .38} L{x + w / 2 + d},{y - h - w * .38 - up} L{x + w + d + 5},{y - h - up + 3} L{x + w + 5},{y - h + 3} Z" fill="{roof}" {st(2.4)}/>']
    if num is not None:
        pts = [(x + w / 2, y - h - w * .38), (x + w / 2 + d, y - h - w * .38 - up), (x + w + d + 5, y - h - up + 3), (x + w + 5, y - h + 3)]
        cx, cy = sum(p[0] for p in pts) / 4, sum(p[1] for p in pts) / 4
        s.append(text(cx, cy + w * .11, num, w * .3, 800))
    return ''.join(s)


def tuft(x, y, s=1.0, col=TEAL, dark='#3E9C86'):
    """bụi cỏ lá nhọn"""
    leaves = []
    for a, L in ((-60, 34), (-35, 44), (-10, 50), (15, 46), (40, 38), (65, 30)):
        r = math.radians(a - 90)
        tx, ty = x + math.cos(r) * L * s, y + math.sin(r) * L * s
        leaves.append(f'<path d="M{x - 5 * s},{y} Q{(x + tx) / 2 - 6 * s},{(y + ty) / 2} {tx:.1f},{ty:.1f} Q{(x + tx) / 2 + 6 * s},{(y + ty) / 2} {x + 5 * s},{y} Z" fill="{col if a % 2 else dark}" {st(2)}/>')
    return ''.join(leaves)


def sign(x, y, txt, s=1.0):
    """biển cầm tay: que từ (x, y) lên, bảng số ở trên"""
    return (f'<line x1="{x}" y1="{y}" x2="{x}" y2="{y - 52 * s}" {st(5 * s, BROWN)}/>'
            f'<rect x="{x - 28 * s}" y="{y - 96 * s}" width="{56 * s}" height="{46 * s}" rx="{8 * s}" fill="{WHITE}" {st(2.6)}/>'
            + text(x, y - 63 * s, txt, 28 * s, 800))


# ── gấu bông ────────────────────────────────────────────────────────────────

def bear_heart(x, y, h, num):
    """gấu bông trắng ôm trái tim ghi số; (x, y) = giữa đáy"""
    s = [KM.plush_bear(x, y, h, fur=WHITE, light='#F3EEE6', bow=PINK)]
    k = h / 100
    cy = y - h * .36
    s.append(f'<path d="M{x},{cy + 26 * k} C{x - 40 * k},{cy} {x - 34 * k},{cy - 30 * k} {x - 16 * k},{cy - 26 * k} '
             f'C{x - 6 * k},{cy - 24 * k} {x},{cy - 16 * k} {x},{cy - 12 * k} C{x},{cy - 16 * k} {x + 6 * k},{cy - 24 * k} {x + 16 * k},{cy - 26 * k} '
             f'C{x + 34 * k},{cy - 30 * k} {x + 40 * k},{cy} {x},{cy + 26 * k} Z" fill="{WHITE}" {st(2.6)}/>')
    s.append(text(x, cy + 10 * k, num, 22 * k, 800, fill='#1E88D0'))
    return ''.join(s)


# ── bút chì, thước, ghim ────────────────────────────────────────────────────

def pencil(x1, x2, y, w=22, body='#8FD0F5', tip=True):
    """bút chì nằm ngang: đuôi tẩy ở x1, ngòi ở x2 (tip=False: chỉ phần đuôi, để vẽ tiếp)"""
    h = w / 2
    s = []
    cone = w * 1.5 if tip else 0
    xb = x2 - cone
    s.append(f'<rect x="{x1}" y="{y - h}" width="{xb - x1}" height="{w}" fill="{body}" {st(2.4)}/>')
    s.append(f'<line x1="{x1 + 10}" y1="{y - h / 3}" x2="{xb}" y2="{y - h / 3}" stroke="#fff" stroke-width="2" opacity=".7"/>')
    s.append(f'<path d="M{x1 + 2},{y - h} A{h},{h} 0 0 0 {x1 + 2},{y + h} Z" fill="{PINK}" {st(2.4)}/>')
    s.append(f'<rect x="{x1}" y="{y - h}" width="{w * .45}" height="{w}" fill="{GREY}" {st(2.2)}/>')
    if tip:
        s.append(f'<path d="M{xb},{y - h} L{x2},{y} L{xb},{y + h} Z" fill="{CREAM}" {st(2.4)}/>')
        s.append(f'<path d="M{x2 - cone * .32},{y - h * .32} L{x2},{y} L{x2 - cone * .32},{y + h * .32} Z" fill="{INK}"/>')
    else:
        s.append(f'<line x1="{xb}" y1="{y - h}" x2="{xb}" y2="{y + h}" {st(2.4)}/>')
    return ''.join(s)


def crayon(x1, x2, y, w=30, col='#4C9EDB'):
    h = w / 2
    xb = x2 - w * 1.1
    return (f'<rect x="{x1}" y="{y - h}" width="{xb - x1}" height="{w}" rx="4" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{(x1 + xb) / 2}" cy="{y}" rx="{(xb - x1) * .26}" ry="{h * .45}" fill="#fff" {st(2)}/>'
            f'<path d="M{xb},{y - h * .8} L{x2},{y} L{xb},{y + h * .8} Z" fill="{col}" {st(2.4)}/>')


def sharpener(x1, x2, y, col=BLUE):
    w = x2 - x1
    h = w * .8
    return (f'<path d="M{x1},{y + h / 2} L{x1},{y - h / 2} L{x2 - 8},{y - h / 2} L{x2},{y - h / 2 + 10} L{x2},{y + h / 2} Z" fill="{col}" {st(2.4)}/>'
            f'<rect x="{x1 + w * .18}" y="{y - h * .3}" width="{w * .5}" height="{h * .22}" rx="3" fill="#E9F4FB" {st(2)}/>'
            f'<circle cx="{x1 + w * .43}" cy="{y + h * .12}" r="{w * .12}" fill="{INK}"/>')


def clip(x, y, w=48, h=None, col='#9AA6B2'):
    """ghim giấy nằm ngang, (x, y) = mép trái giữa; dài w"""
    h = h or w * .38
    r = h / 2
    r2 = r * .62
    return (f'<path d="M{x + w - r},{y - r} L{x + r},{y - r} A{r},{r} 0 0 0 {x + r},{y + r} L{x + w - r},{y + r} '
            f'A{r * .8},{r * .8} 0 0 0 {x + w - r},{y - r * .6} L{x + r * 1.6},{y - r * .6} A{r2},{r2} 0 0 0 {x + r * 1.6},{y + r * .6} L{x + w - r * 1.8},{y + r * .6}" '
            f'fill="none" stroke="{col}" stroke-width="{max(2.6, h * .16):.1f}" stroke-linecap="round" stroke-linejoin="round"/>')


def clip_row(x, y, n, w=48):
    return ''.join(clip(x + i * w + 1, y, w - 2) for i in range(n))


def ruler(x0, y, cm, per, n=None, h=None, start=0, label='cm', col='#BFE3F8', fs=None, zero=True):
    """thước kẻ: vạch 0 ở x0, mỗi cm = per; n = số cm in số (mặc định cm)"""
    h = h or per * 1.15
    fs = fs or max(11, min(18, per * .36))
    pad = per * (.35 if zero else .85)
    xs, xe = x0 - pad, x0 + (cm - start) * per + pad
    s = [f'<rect x="{xs}" y="{y}" width="{xe - xs}" height="{h}" rx="3" fill="{col}" {st(2.2)}/>']
    for i in range(int((cm - start) * 10) + 1):
        xx = x0 + i * per / 10
        L = h * (.42 if i % 10 == 0 else .3 if i % 5 == 0 else .18)
        s.append(f'<line x1="{xx:.1f}" y1="{y}" x2="{xx:.1f}" y2="{y + L:.1f}" stroke="{INK}" stroke-width="{1.6 if i % 10 == 0 else 1}"/>')
    for c in range(start, cm + 1):
        xx = x0 + (c - start) * per
        if c == 0 and label and not zero:
            s.append(text(xx - per * .4, y + h * .8, label, fs * .8, 700))
        elif c == 0 and label:
            s.append(text(xx, y + h * .8, '0', fs, 700))
            s.append(text(xx + per * .45, y + h * .8, label, fs * .8, 700))
        elif c == start and label and start != 0:
            s.append(text(xx - per * .55, y + h * .8, label, fs * .8, 700))
            s.append(text(xx, y + h * .8, str(c), fs, 700))
        else:
            s.append(text(xx, y + h * .8, str(c), fs, 700))
    return ''.join(s)


def pen(x1, x2, y, w=20):
    return K1.fountain_pen(x1, y, x2, y, w=w, body='#5D6B7A', cap='#9FB2C4')


def scissors(x1, x2, y, s=1.0, col=BLUE):
    """kéo nằm ngang: vòng tay cầm ở x1, mũi ở x2"""
    L = x2 - x1
    r = 15 * s
    hx = x1 + r * 2.1
    pv = x1 + L * .38
    return (f'<path d="M{hx},{y - 6 * s} L{x2},{y - 1.5 * s} L{pv},{y + 3 * s} Z" fill="#E4EAF0" {st(2.2)}/>'
            f'<path d="M{hx},{y + 6 * s} L{x2 - 4 * s},{y + 2 * s} L{pv},{y - 3 * s} Z" fill="#CBD5DF" {st(2.2)}/>'
            f'<ellipse cx="{x1 + r}" cy="{y - r * 1.05}" rx="{r * 1.05}" ry="{r * .85}" fill="none" stroke="{col}" stroke-width="{7 * s}"/>'
            f'<ellipse cx="{x1 + r}" cy="{y - r * 1.05}" rx="{r * 1.05 + 3.5 * s}" ry="{r * .85 + 3.5 * s}" fill="none" {st(1.6)}/>'
            f'<ellipse cx="{x1 + r}" cy="{y + r * 1.05}" rx="{r * 1.05}" ry="{r * .85}" fill="none" stroke="{col}" stroke-width="{7 * s}"/>'
            f'<ellipse cx="{x1 + r}" cy="{y + r * 1.05}" rx="{r * 1.05 + 3.5 * s}" ry="{r * .85 + 3.5 * s}" fill="none" {st(1.6)}/>'
            f'<path d="M{x1 + r * 1.9},{y - r * .6} L{hx + 6 * s},{y - 4 * s} M{x1 + r * 1.9},{y + r * .6} L{hx + 6 * s},{y + 4 * s}" fill="none" stroke="{col}" stroke-width="{7 * s}" stroke-linecap="round"/>'
            f'<circle cx="{pv}" cy="{y}" r="{3 * s}" fill="{INK}"/>')


# ── đồ dùng hằng ngày ───────────────────────────────────────────────────────

def nail(x1, x2, y, col=GREY_L):
    return (f'<rect x="{x1 + 8}" y="{y - 4}" width="{x2 - x1 - 30}" height="8" fill="{col}" {st(2.2)}/>'
            f'<path d="M{x2 - 23},{y - 4} L{x2},{y} L{x2 - 23},{y + 4} Z" fill="{col}" {st(2.2)}/>'
            f'<rect x="{x1}" y="{y - 15}" width="9" height="30" rx="3" fill="{col}" {st(2.2)}/>')


def hammer(x1, x2, y, handle=WHITE, head=WHITE):
    hw = (x2 - x1) * .17
    return (f'<rect x="{x1}" y="{y - 10}" width="{x2 - x1 - hw * .6}" height="20" rx="10" fill="{handle}" {st(2.6)}/>'
            f'<path d="M{x2 - hw},{y - 40} L{x2 - 6},{y - 40} Q{x2},{y - 40} {x2},{y - 32} L{x2},{y + 30} Q{x2 - hw / 2},{y + 46} {x2 - hw},{y + 30} Z" fill="{head}" {st(2.6)}/>')


def spoon(x1, x2, y, fill=WHITE, handle=None):
    L = x2 - x1
    bw = L * .26
    hc = handle or fill
    return (f'<path d="M{x1 + 8},{y - 7} L{x2 - bw},{y - 3} L{x2 - bw},{y + 3} L{x1 + 8},{y + 7} A7,7 0 0 1 {x1 + 8},{y - 7} Z" fill="{hc}" {st(2.4)}/>'
            f'<ellipse cx="{x2 - bw / 2}" cy="{y}" rx="{bw / 2}" ry="{bw * .34}" fill="{fill}" {st(2.4)}/>')


def fork(x1, x2, y, fill=WHITE, handle=None):
    L = x2 - x1
    tw = L * .24
    hc = handle or fill
    xs = x2 - tw
    tines = ''.join(f'<line x1="{xs + 6}" y1="{y + d}" x2="{x2}" y2="{y + d}" {st(3)}/>' for d in (-9, -3, 3, 9))
    return (f'<path d="M{x1 + 8},{y - 7} L{xs - 8},{y - 3} L{xs - 8},{y + 3} L{x1 + 8},{y + 7} A7,7 0 0 1 {x1 + 8},{y - 7} Z" fill="{hc}" {st(2.4)}/>'
            f'<path d="M{xs - 10},{y - 4} Q{xs},{y - 12} {xs + 8},{y - 12} L{xs + 8},{y + 12} Q{xs},{y + 12} {xs - 10},{y + 4} Z" fill="{fill}" {st(2.4)}/>' + tines)


def key(x1, x2, y, fill=WHITE):
    r = (x2 - x1) * .2
    xb = x1 + 2 * r
    return (f'<path d="M{xb - 4},{y - 7} L{x2},{y - 7} L{x2},{y + 2} L{x2 - 8},{y + 2} L{x2 - 8},{y + 9} L{x2 - 16},{y + 9} L{x2 - 16},{y + 2} '
            f'L{x2 - 24},{y + 2} L{x2 - 24},{y + 11} L{x2 - 32},{y + 11} L{x2 - 32},{y + 7} L{xb - 4},{y + 7} Z" fill="{fill}" {st(2.4)}/>'
            f'<circle cx="{x1 + r}" cy="{y}" r="{r}" fill="{fill}" {st(2.6)}/>'
            f'<circle cx="{x1 + r * .8}" cy="{y}" r="{r * .3}" fill="#fff" {st(2.2)}/>')


def bat(x1, x2, y, fill=WHITE):
    L = x2 - x1
    return (f'<path d="M{x1 + 14},{y - 6} L{x1 + L * .4},{y - 9} C{x1 + L * .7},{y - 22} {x2 - 30},{y - 30} {x2 - 18},{y - 28} '
            f'A20,20 0 0 1 {x2 - 10},{y + 6} C{x2 - 40},{y + 12} {x1 + L * .6},{y + 10} {x1 + L * .4},{y + 7} L{x1 + 14},{y + 6} Z" fill="{fill}" {st(2.6)}/>'
            f'<rect x="{x1}" y="{y - 13}" width="14" height="26" rx="4" fill="{fill}" {st(2.6)}/>')


def spatula(x1, x2, y, fill=WHITE):
    L = x2 - x1
    hw = L * .3
    xs = x2 - hw
    slots = ''.join(f'<rect x="{xs + 12}" y="{y - 22 + i * 12}" width="{hw - 26}" height="6" rx="3" fill="#fff" {st(1.8)}/>' for i in range(4))
    return (f'<path d="M{x1 + 6},{y - 5} L{xs},{y - 4} L{xs},{y + 4} L{x1 + 6},{y + 5} A5,5 0 0 1 {x1 + 6},{y - 5} Z" fill="{fill}" {st(2.4)}/>'
            f'<circle cx="{x1 + 10}" cy="{y}" r="2.4" fill="{INK}"/>'
            f'<rect x="{xs}" y="{y - 30}" width="{hw}" height="56" rx="10" fill="{fill}" {st(2.6)}/>' + slots)


def comb(x1, x2, y, col=BLUE):
    L = x2 - x1
    hx = x1 + L * .45
    teeth = ''.join(f'<rect x="{hx + 6 + i * ((x2 - hx - 12) / 9):.1f}" y="{y - 2}" width="5" height="34" rx="2" fill="{col}" {st(1.6)}/>' for i in range(10))
    return (teeth + f'<path d="M{x1 + 10},{y - 22} Q{x1},{y - 12} {x1 + 10},{y - 2} L{hx},{y + 2} L{x2 - 4},{y + 2} L{x2},{y - 6} L{x2},{y - 16} L{hx},{y - 16} Q{x1 + L * .25},{y - 28} {x1 + 10},{y - 22} Z" fill="{col}" {st(2.4)}/>')


def toothpaste(x1, x2, y, col='#7CC6E8'):
    L = x2 - x1
    cx = x2 - L * .08
    return (f'<path d="M{x1},{y - 22} L{cx - 10},{y - 12} L{cx - 10},{y + 12} L{x1},{y + 22} Z" fill="{col}" {st(2.6)}/>'
            f'<rect x="{x1 - 4}" y="{y - 24}" width="8" height="48" rx="2" fill="{WHITE}" {st(2.2)}/>'
            f'<ellipse cx="{x1 + L * .35}" cy="{y}" rx="{L * .17}" ry="10" fill="#fff" {st(2)}/>'
            f'<rect x="{cx - 10}" y="{y - 8}" width="{x2 - cx + 10}" height="16" rx="3" fill="#fff" {st(2.4)}/>')


def toothbrush(x1, x2, y, col=BLUE):
    L = x2 - x1
    hx = x2 - L * .22
    bristles = ''.join(f'<rect x="{hx + 4 + i * ((x2 - hx - 8) / 5):.1f}" y="{y - 26}" width="{(x2 - hx - 8) / 5 - 1:.1f}" height="20" rx="2" fill="#E9F7FF" {st(1.6)}/>' for i in range(5))
    return (bristles + f'<path d="M{x1 + 8},{y - 7} Q{x1 + L * .5},{y - 4} {hx - 6},{y - 6} L{x2},{y - 8} L{x2},{y + 2} L{hx - 6},{y + 4} Q{x1 + L * .5},{y + 8} {x1 + 8},{y + 7} A7,7 0 0 1 {x1 + 8},{y - 7} Z" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{x1 + 14}" cy="{y}" rx="5" ry="3" fill="#fff"/>')


def ladle(x1, x2, y, col=BLUE):
    L = x2 - x1
    r = L * .15
    cx = x2 - r
    return (f'<path d="M{x1 + 8},{y - 7} L{cx - r * .6},{y - 4} L{cx - r * .6},{y + 4} L{x1 + 8},{y + 7} A7,7 0 0 1 {x1 + 8},{y - 7} Z" fill="{col}" {st(2.4)}/>'
            f'<circle cx="{x1 + 12}" cy="{y}" r="3" fill="#fff" {st(1.4)}/>'
            f'<path d="M{cx},{y - r * 1.2} A{r},{r * 1.2} 0 0 1 {cx},{y + r * 1.2} Z" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{cx}" cy="{y}" rx="{r * .45}" ry="{r * 1.2}" fill="#fff" {st(2.4)}/>')


# ── xe ──────────────────────────────────────────────────────────────────────

def wheel(cx, cy, r, hub=GREY_L):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{INK}"/>'
            f'<circle cx="{cx}" cy="{cy}" r="{r * .5}" fill="{hub}" {st(1.8)}/>')


def sedan(x1, x2, y, col=BLUE, win='#E3F4FF'):
    """ô tô con: từ x1 tới x2, mặt đường y"""
    L = x2 - x1
    r = L * .1
    h = L * .22
    s = [f'<path d="M{x1 + 3},{y - r * .5} L{x1},{y - h * .9} Q{x1 + 2},{y - h * 1.1} {x1 + L * .1},{y - h * 1.12} L{x1 + L * .25},{y - h * 1.15} '
         f'L{x1 + L * .38},{y - h * 1.85} L{x1 + L * .68},{y - h * 1.85} L{x1 + L * .8},{y - h * 1.15} L{x2 - 6},{y - h * 1.05} Q{x2},{y - h} {x2},{y - h * .7} L{x2 - 3},{y - r * .5} Z" fill="{col}" {st(2.6)}/>',
         f'<path d="M{x1 + L * .3},{y - h * 1.2} L{x1 + L * .4},{y - h * 1.7} L{x1 + L * .52},{y - h * 1.7} L{x1 + L * .52},{y - h * 1.2} Z" fill="{win}" {st(2)}/>',
         f'<path d="M{x1 + L * .56},{y - h * 1.2} L{x1 + L * .56},{y - h * 1.7} L{x1 + L * .66},{y - h * 1.7} L{x1 + L * .74},{y - h * 1.2} Z" fill="{win}" {st(2)}/>',
         wheel(x1 + L * .22, y - r * .6, r), wheel(x2 - L * .22, y - r * .6, r)]
    return ''.join(s)


def jeep(x1, x2, y, col=BLUE, win='#E3F4FF'):
    L = x2 - x1
    r = L * .14
    s = [f'<rect x="{x1 + L * .06}" y="{y - L * .52}" width="{L * .16}" height="{L * .3}" rx="{L * .06}" fill="{col}" {st(2.4)}/>',
         f'<path d="M{x1 + L * .12},{y - r * .6} L{x1 + L * .12},{y - L * .62} Q{x1 + L * .14},{y - L * .7} {x1 + L * .26},{y - L * .7} L{x1 + L * .62},{y - L * .7} '
         f'L{x1 + L * .76},{y - L * .45} L{x2 - 4},{y - L * .4} Q{x2},{y - L * .36} {x2},{y - L * .26} L{x2 - 4},{y - r * .6} Z" fill="{col}" {st(2.6)}/>',
         f'<rect x="{x1 + L * .3}" y="{y - L * .78}" width="{L * .3}" height="{L * .07}" rx="3" fill="{GREY_L}" {st(2)}/>',
         f'<path d="M{x1 + L * .28},{y - L * .45} L{x1 + L * .28},{y - L * .64} L{x1 + L * .58},{y - L * .64} L{x1 + L * .7},{y - L * .45} Z" fill="{win}" {st(2)}/>',
         wheel(x1 + L * .32, y - r * .6, r), wheel(x2 - L * .2, y - r * .6, r)]
    return ''.join(s)


def pickup(x1, x2, y, col=BLUE, win='#E3F4FF'):
    L = x2 - x1
    r = L * .085
    s = [f'<path d="M{x1},{y - r * .6} L{x1},{y - L * .2} L{x1 + L * .5},{y - L * .2} L{x1 + L * .52},{y - L * .4} L{x1 + L * .72},{y - L * .4} '
         f'L{x1 + L * .82},{y - L * .24} L{x2 - 4},{y - L * .2} Q{x2},{y - L * .18} {x2},{y - L * .1} L{x2 - 3},{y - r * .6} Z" fill="{col}" {st(2.6)}/>',
         f'<path d="M{x1 + L * .58},{y - L * .24} L{x1 + L * .58},{y - L * .35} L{x1 + L * .7},{y - L * .35} L{x1 + L * .77},{y - L * .24} Z" fill="{win}" {st(2)}/>',
         f'<rect x="{x1 + L * .53}" y="{y - L * .36}" width="{L * .04}" height="{L * .12}" fill="{win}" {st(1.6)}/>',
         wheel(x1 + L * .2, y - r * .6, r), wheel(x2 - L * .2, y - r * .6, r)]
    return ''.join(s)


def van(x1, x2, y, fill=WHITE, win='#E3F4FF'):
    """xe hộp cao (xe 7 chỗ) để tô màu"""
    L = x2 - x1
    r = L * .09
    H = L * .52
    s = [f'<path d="M{x1 + 2},{y - r * .5} L{x1},{y - H} Q{x1},{y - H - 8} {x1 + 10},{y - H - 8} L{x1 + L * .72},{y - H - 8} Q{x1 + L * .8},{y - H - 8} {x1 + L * .84},{y - H * .55} '
         f'L{x2 - 6},{y - H * .5} Q{x2},{y - H * .46} {x2},{y - H * .3} L{x2 - 2},{y - r * .5} Z" fill="{fill}" {st(2.6)}/>']
    for i in range(3):
        s.append(f'<rect x="{x1 + 8 + i * L * .25}" y="{y - H + 2}" width="{L * .21}" height="{H * .33}" rx="4" fill="{win}" {st(2)}/>')
    s.append(f'<line x1="{x1 + L * .5}" y1="{y - H * .55}" x2="{x1 + L * .5}" y2="{y - r * 1.6}" {st(2)}/>')
    s += [wheel(x1 + L * .2, y - r * .6, r), wheel(x2 - L * .2, y - r * .6, r)]
    return ''.join(s)


def bus(x1, x2, y, col=BLUE, win='#FFFFFF'):
    L = x2 - x1
    r = L * .07
    H = L * .4
    s = [f'<path d="M{x1 + 4},{y - r * .4} L{x1},{y - H + 10} Q{x1},{y - H} {x1 + 10},{y - H} L{x2 - 16},{y - H} Q{x2},{y - H} {x2},{y - H + 20} L{x2},{y - r * .4} Z" fill="{col}" {st(2.6)}/>']
    for i in range(4):
        s.append(f'<rect x="{x1 + 10 + i * L * .18}" y="{y - H + 10}" width="{L * .17}" height="{H * .35}" fill="{win}" {st(2)}/>')
    s.append(f'<rect x="{x2 - L * .18}" y="{y - H + 10}" width="{L * .1}" height="{H * .78}" rx="3" fill="{win}" {st(2)}/>')
    s += [wheel(x1 + L * .22, y - r * .4, r), wheel(x1 + L * .62, y - r * .4, r)]
    return ''.join(s)


def beetle(x1, x2, y, col=BLUE, win='#E3F4FF'):
    L = x2 - x1
    r = L * .13
    s = [f'<path d="M{x1 + 2},{y - r * .7} Q{x1 - 4},{y - L * .3} {x1 + L * .18},{y - L * .34} Q{x1 + L * .3},{y - L * .68} {x1 + L * .55},{y - L * .66} '
         f'Q{x1 + L * .8},{y - L * .62} {x1 + L * .86},{y - L * .34} Q{x2 + 2},{y - L * .3} {x2 - 2},{y - r * .7} Z" fill="{col}" {st(2.6)}/>',
         f'<path d="M{x1 + L * .26},{y - L * .36} Q{x1 + L * .34},{y - L * .58} {x1 + L * .48},{y - L * .6} L{x1 + L * .48},{y - L * .36} Z" fill="{win}" {st(2)}/>',
         f'<path d="M{x1 + L * .53},{y - L * .36} L{x1 + L * .53},{y - L * .6} Q{x1 + L * .7},{y - L * .56} {x1 + L * .76},{y - L * .36} Z" fill="{win}" {st(2)}/>',
         wheel(x1 + L * .24, y - r * .7, r), wheel(x2 - L * .24, y - r * .7, r)]
    return ''.join(s)


def train(x1, x2, y, cars=3, col=BLUE, fill=None, win='#E3F4FF'):
    """tàu hoả đồ chơi: `cars` toa rồi đầu máy bên phải"""
    L = x2 - x1
    unit = L / (cars + 1.15)
    r = unit * .13
    s = []
    for i in range(cars):
        cx = x1 + i * unit
        w = unit - 8
        s.append(f'<rect x="{cx}" y="{y - unit * .62}" width="{w}" height="{unit * .48}" rx="6" fill="{fill or col}" {st(2.4)}/>')
        for j in range(3):
            s.append(f'<rect x="{cx + 6 + j * (w - 12) / 3:.1f}" y="{y - unit * .56}" width="{(w - 12) / 3 - 4:.1f}" height="{unit * .2}" rx="2" fill="{win}" {st(1.6)}/>')
        s.append(wheel(cx + w * .25, y - r, r) + wheel(cx + w * .75, y - r, r))
        s.append(f'<line x1="{cx + w}" y1="{y - unit * .3}" x2="{cx + unit}" y2="{y - unit * .3}" {st(3)}/>')
    ex = x1 + cars * unit
    ew = x2 - ex
    s.append(f'<path d="M{ex},{y - r * 1.2} L{ex},{y - unit * .9} L{ex + ew * .45},{y - unit * .9} L{ex + ew * .45},{y - unit * .5} L{x2 - 4},{y - unit * .5} Q{x2},{y - unit * .5} {x2},{y - unit * .4} L{x2},{y - r * 1.2} Z" fill="{fill or col}" {st(2.4)}/>')
    s.append(f'<rect x="{ex - 4}" y="{y - unit * .98}" width="{ew * .55}" height="{unit * .1}" rx="3" fill="{fill or col}" {st(2)}/>')
    s.append(f'<rect x="{ex + ew * .08}" y="{y - unit * .82}" width="{ew * .3}" height="{unit * .2}" rx="2" fill="{win}" {st(1.6)}/>')
    s.append(f'<rect x="{ex + ew * .62}" y="{y - unit * .78}" width="{ew * .14}" height="{unit * .28}" fill="{fill or col}" {st(2)}/>')
    s.append(wheel(ex + ew * .25, y - r * 1.3, r * 1.3) + wheel(ex + ew * .72, y - r, r))
    return ''.join(s)


# ── con vật (nét riêng, đơn giản) ────────────────────────────────────────────

def eye(x, y, r=3.4):
    return f'<circle cx="{x}" cy="{y}" r="{r}" fill="{INK}"/><circle cx="{x + r * .35}" cy="{y - r * .35}" r="{r * .32}" fill="#fff"/>'


def hedgehog(x, y, h=60, col='#8A6A55', face='#E9C9A2'):
    """nhím: (x, y) = giữa đáy, cao h"""
    k = h / 60
    spikes = []
    for i in range(13):
        a = math.radians(200 + i * 12)
        bx, by = x - 4 * k + math.cos(a) * 34 * k, y - 26 * k + math.sin(a) * 28 * k
        tx, ty = x - 4 * k + math.cos(a) * 46 * k, y - 26 * k + math.sin(a) * 36 * k
        spikes.append(f'<path d="M{bx - 6 * k:.1f},{by:.1f} L{tx:.1f},{ty:.1f} L{bx + 6 * k:.1f},{by + 4 * k:.1f} Z" fill="{col}" {st(2)}/>')
    return (''.join(spikes)
            + f'<ellipse cx="{x - 4 * k}" cy="{y - 24 * k}" rx="{36 * k}" ry="{24 * k}" fill="{col}" {st(2.6)}/>'
            + f'<path d="M{x + 18 * k},{y - 30 * k} Q{x + 46 * k},{y - 16 * k} {x + 44 * k},{y - 6 * k} Q{x + 30 * k},{y} {x + 14 * k},{y - 4 * k} Z" fill="{face}" {st(2.4)}/>'
            + f'<circle cx="{x + 45 * k}" cy="{y - 9 * k}" r="{3.4 * k}" fill="{INK}"/>' + eye(x + 30 * k, y - 18 * k, 3 * k)
            + f'<ellipse cx="{x - 22 * k}" cy="{y - 1 * k}" rx="{7 * k}" ry="{4 * k}" fill="{face}" {st(2)}/>'
            + f'<ellipse cx="{x + 8 * k}" cy="{y - 1 * k}" rx="{7 * k}" ry="{4 * k}" fill="{face}" {st(2)}/>')


def squirrel(x, y, h=140, col='#C98A4E', light='#F3D7B0'):
    k = h / 140
    return (f'<path d="M{x - 20 * k},{y - 10 * k} C{x - 80 * k},{y - 20 * k} {x - 80 * k},{y - 110 * k} {x - 40 * k},{y - 140 * k} C{x - 20 * k},{y - 150 * k} {x},{y - 120 * k} {x - 20 * k},{y - 110 * k} C{x - 50 * k},{y - 90 * k} {x - 40 * k},{y - 40 * k} {x - 10 * k},{y - 30 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x + 4 * k}" cy="{y - 36 * k}" rx="{24 * k}" ry="{34 * k}" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x + 10 * k}" cy="{y - 32 * k}" rx="{12 * k}" ry="{22 * k}" fill="{light}"/>'
            f'<circle cx="{x + 12 * k}" cy="{y - 80 * k}" r="{20 * k}" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x + 2 * k},{y - 96 * k} L{x + 4 * k},{y - 112 * k} L{x + 14 * k},{y - 98 * k} Z" fill="{col}" {st(2.2)}/>'
            + eye(x + 20 * k, y - 84 * k, 3.4 * k)
            + f'<circle cx="{x + 31 * k}" cy="{y - 76 * k}" r="{2.6 * k}" fill="{INK}"/>'
            f'<ellipse cx="{x + 2 * k}" cy="{y - 3 * k}" rx="{14 * k}" ry="{5 * k}" fill="{col}" {st(2.2)}/>'
            f'<ellipse cx="{x + 24 * k}" cy="{y - 50 * k}" rx="{8 * k}" ry="{6 * k}" fill="{col}" {st(2.2)}/>')


def kangaroo(x, y, h=200, col='#D9A066', light='#F3D7B0'):
    k = h / 200
    return (f'<path d="M{x - 30 * k},{y - 40 * k} C{x - 70 * k},{y - 30 * k} {x - 100 * k},{y - 10 * k} {x - 110 * k},{y - 4 * k} C{x - 90 * k},{y - 22 * k} {x - 60 * k},{y - 54 * k} {x - 34 * k},{y - 66 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x - 10 * k},{y - 40 * k} L{x + 30 * k},{y - 4 * k} L{x - 20 * k},{y - 2 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x - 10 * k}" cy="{y - 70 * k}" rx="{34 * k}" ry="{50 * k}" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x + 2 * k}" cy="{y - 66 * k}" rx="{16 * k}" ry="{30 * k}" fill="{light}"/>'
            f'<path d="M{x + 18 * k},{y - 100 * k} L{x + 40 * k},{y - 82 * k}" {st(7 * k, col)}/>'
            f'<path d="M{x - 6 * k},{y - 112 * k} Q{x + 6 * k},{y - 150 * k} {x + 20 * k},{y - 152 * k} L{x + 50 * k},{y - 146 * k} Q{x + 56 * k},{y - 140 * k} {x + 46 * k},{y - 134 * k} L{x + 14 * k},{y - 128 * k} Q{x + 6 * k},{y - 110 * k} {x - 6 * k},{y - 112 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x + 10 * k},{y - 152 * k} L{x + 4 * k},{y - 196 * k} L{x + 22 * k},{y - 156 * k} Z" fill="{col}" {st(2.4)}/>'
            f'<path d="M{x + 18 * k},{y - 154 * k} L{x + 22 * k},{y - 198 * k} L{x + 30 * k},{y - 154 * k} Z" fill="{col}" {st(2.4)}/>'
            + eye(x + 28 * k, y - 144 * k, 3.6 * k)
            + f'<circle cx="{x + 52 * k}" cy="{y - 141 * k}" r="{3 * k}" fill="{INK}"/>')


def koala(x, y, h=100, col='#A7B1BC', light='#E8ECF0'):
    k = h / 100
    return (f'<ellipse cx="{x}" cy="{y - 28 * k}" rx="{28 * k}" ry="{28 * k}" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x}" cy="{y - 22 * k}" rx="{15 * k}" ry="{18 * k}" fill="{light}"/>'
            f'<circle cx="{x - 28 * k}" cy="{y - 84 * k}" r="{15 * k}" fill="{col}" {st(2.6)}/>'
            f'<circle cx="{x + 28 * k}" cy="{y - 84 * k}" r="{15 * k}" fill="{col}" {st(2.6)}/>'
            f'<circle cx="{x - 28 * k}" cy="{y - 84 * k}" r="{8 * k}" fill="{light}"/>'
            f'<circle cx="{x + 28 * k}" cy="{y - 84 * k}" r="{8 * k}" fill="{light}"/>'
            f'<circle cx="{x}" cy="{y - 68 * k}" r="{28 * k}" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x}" cy="{y - 62 * k}" rx="{7 * k}" ry="{10 * k}" fill="{INK}"/>'
            + eye(x - 12 * k, y - 74 * k, 3 * k) + eye(x + 12 * k, y - 74 * k, 3 * k)
            + f'<ellipse cx="{x - 14 * k}" cy="{y - 2 * k}" rx="{11 * k}" ry="{5 * k}" fill="{col}" {st(2.2)}/>'
            f'<ellipse cx="{x + 14 * k}" cy="{y - 2 * k}" rx="{11 * k}" ry="{5 * k}" fill="{col}" {st(2.2)}/>')


def giraffe(x, y, h=300, col='#F5C55B', spot='#C98A4E'):
    """hươu cao cổ đứng nhìn phải; (x, y) = giữa đáy, cao h (tính cả sừng)"""
    k = h / 300
    s = []
    for lx in (-38, -24, 24, 38):
        s.append(f'<rect x="{x + (lx - 5) * k}" y="{y - 110 * k}" width="{10 * k}" height="{108 * k}" rx="{4 * k}" fill="{col}" {st(2.4)}/>')
        s.append(f'<rect x="{x + (lx - 6) * k}" y="{y - 10 * k}" width="{12 * k}" height="{10 * k}" rx="{2 * k}" fill="{INK}"/>')
    s.append(f'<path d="M{x - 50 * k},{y - 140 * k} Q{x - 64 * k},{y - 100 * k} {x - 60 * k},{y - 80 * k}" fill="none" {st(4 * k)}/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 128 * k}" rx="{54 * k}" ry="{28 * k}" fill="{col}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 26 * k},{y - 140 * k} L{x + 44 * k},{y - 262 * k} L{x + 64 * k},{y - 258 * k} L{x + 52 * k},{y - 130 * k} Z" fill="{col}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 40 * k},{y - 272 * k} Q{x + 50 * k},{y - 292 * k} {x + 70 * k},{y - 282 * k} L{x + 96 * k},{y - 262 * k} Q{x + 100 * k},{y - 250 * k} {x + 88 * k},{y - 248 * k} L{x + 56 * k},{y - 250 * k} Q{x + 40 * k},{y - 252 * k} {x + 40 * k},{y - 272 * k} Z" fill="{col}" {st(2.6)}/>')
    s.append(f'<line x1="{x + 54 * k}" y1="{y - 284 * k}" x2="{x + 52 * k}" y2="{y - 296 * k}" {st(3.4 * k)}/><circle cx="{x + 52 * k}" cy="{y - 297 * k}" r="{4 * k}" fill="{BROWN}" {st(1.6)}/>')
    s.append(f'<line x1="{x + 64 * k}" y1="{y - 284 * k}" x2="{x + 64 * k}" y2="{y - 296 * k}" {st(3.4 * k)}/><circle cx="{x + 64 * k}" cy="{y - 297 * k}" r="{4 * k}" fill="{BROWN}" {st(1.6)}/>')
    s.append(eye(x + 66 * k, y - 268 * k, 3.6 * k))
    for sx, sy, r in ((-30, -130, 9), (-6, -138, 8), (18, -124, 9), (-20, -116, 6), (42, -170, 6), (48, -200, 6), (52, -232, 5), (36, -150, 5)):
        s.append(f'<circle cx="{x + sx * k}" cy="{y + sy * k}" r="{r * k}" fill="{spot}"/>')
    return ''.join(s)


def fox(x, y, h=150, col='#F08A3C', light='#FFF4DF'):
    """cáo ngồi nhìn thẳng"""
    k = h / 150
    return (f'<path d="M{x + 20 * k},{y - 8 * k} C{x + 80 * k},{y - 4 * k} {x + 90 * k},{y - 40 * k} {x + 64 * k},{y - 60 * k} C{x + 60 * k},{y - 36 * k} {x + 40 * k},{y - 26 * k} {x + 16 * k},{y - 30 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x + 72 * k},{y - 18 * k} Q{x + 84 * k},{y - 32 * k} {x + 70 * k},{y - 50 * k}" fill="none" stroke="{light}" stroke-width="{6 * k}"/>'
            f'<path d="M{x - 30 * k},{y - 4 * k} Q{x - 36 * k},{y - 70 * k} {x},{y - 90 * k} Q{x + 36 * k},{y - 70 * k} {x + 30 * k},{y - 4 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x - 14 * k},{y - 6 * k} Q{x - 16 * k},{y - 60 * k} {x},{y - 78 * k} Q{x + 16 * k},{y - 60 * k} {x + 14 * k},{y - 6 * k} Z" fill="{light}"/>'
            f'<path d="M{x - 28 * k},{y - 116 * k} L{x - 30 * k},{y - 150 * k} L{x - 6 * k},{y - 128 * k} Z" fill="{col}" {st(2.4)}/>'
            f'<path d="M{x + 28 * k},{y - 116 * k} L{x + 30 * k},{y - 150 * k} L{x + 6 * k},{y - 128 * k} Z" fill="{col}" {st(2.4)}/>'
            f'<path d="M{x - 34 * k},{y - 112 * k} Q{x - 30 * k},{y - 134 * k} {x},{y - 132 * k} Q{x + 30 * k},{y - 134 * k} {x + 34 * k},{y - 112 * k} Q{x + 20 * k},{y - 84 * k} {x},{y - 78 * k} Q{x - 20 * k},{y - 84 * k} {x - 34 * k},{y - 112 * k} Z" fill="{col}" {st(2.6)}/>'
            f'<path d="M{x - 16 * k},{y - 98 * k} Q{x},{y - 104 * k} {x + 16 * k},{y - 98 * k} Q{x + 8 * k},{y - 82 * k} {x},{y - 80 * k} Q{x - 8 * k},{y - 82 * k} {x - 16 * k},{y - 98 * k} Z" fill="{light}"/>'
            f'<circle cx="{x}" cy="{y - 84 * k}" r="{4 * k}" fill="{INK}"/>'
            + eye(x - 12 * k, y - 110 * k, 3.4 * k) + eye(x + 12 * k, y - 110 * k, 3.4 * k)
            + f'<ellipse cx="{x - 14 * k}" cy="{y - 3 * k}" rx="{11 * k}" ry="{5 * k}" fill="{light}" {st(2.2)}/>'
            f'<ellipse cx="{x + 14 * k}" cy="{y - 3 * k}" rx="{11 * k}" ry="{5 * k}" fill="{light}" {st(2.2)}/>')


def unicorn(x, y, h=210, col=WHITE, mane='#B9A7F0', horn=YELLOW):
    """ngựa một sừng đứng nhìn phải; cao h tính cả sừng"""
    k = h / 210
    s = []
    for lx in (-40, -26, 26, 40):
        s.append(f'<rect x="{x + (lx - 6) * k}" y="{y - 74 * k}" width="{12 * k}" height="{70 * k}" rx="{5 * k}" fill="{col}" {st(2.4)}/>')
        s.append(f'<rect x="{x + (lx - 7) * k}" y="{y - 10 * k}" width="{14 * k}" height="{10 * k}" rx="{3 * k}" fill="{mane}" {st(2)}/>')
    s.append(f'<path d="M{x - 50 * k},{y - 100 * k} C{x - 80 * k},{y - 90 * k} {x - 80 * k},{y - 40 * k} {x - 66 * k},{y - 20 * k} C{x - 60 * k},{y - 50 * k} {x - 56 * k},{y - 70 * k} {x - 46 * k},{y - 84 * k} Z" fill="{mane}" {st(2.4)}/>')
    s.append(f'<ellipse cx="{x}" cy="{y - 90 * k}" rx="{56 * k}" ry="{28 * k}" fill="{col}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 24 * k},{y - 104 * k} L{x + 40 * k},{y - 150 * k} L{x + 66 * k},{y - 140 * k} L{x + 54 * k},{y - 92 * k} Z" fill="{col}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 34 * k},{y - 156 * k} Q{x + 44 * k},{y - 176 * k} {x + 64 * k},{y - 168 * k} L{x + 92 * k},{y - 146 * k} Q{x + 98 * k},{y - 132 * k} {x + 86 * k},{y - 128 * k} L{x + 62 * k},{y - 130 * k} Q{x + 40 * k},{y - 132 * k} {x + 34 * k},{y - 156 * k} Z" fill="{col}" {st(2.6)}/>')
    s.append(f'<path d="M{x + 50 * k},{y - 168 * k} L{x + 60 * k},{y - 208 * k} L{x + 62 * k},{y - 166 * k} Z" fill="{horn}" {st(2.2)}/>')
    s.append(f'<path d="M{x + 44 * k},{y - 168 * k} L{x + 40 * k},{y - 184 * k} L{x + 52 * k},{y - 170 * k} Z" fill="{col}" {st(2)}/>')
    s.append(f'<path d="M{x + 40 * k},{y - 164 * k} C{x + 20 * k},{y - 150 * k} {x + 20 * k},{y - 120 * k} {x + 26 * k},{y - 104 * k} C{x + 34 * k},{y - 120 * k} {x + 36 * k},{y - 140 * k} {x + 48 * k},{y - 150 * k} Z" fill="{mane}" {st(2.4)}/>')
    s.append(f'<path d="M{x + 60 * k},{y - 156 * k} Q{x + 66 * k},{y - 152 * k} {x + 72 * k},{y - 156 * k}" fill="none" {st(2.2)}/>')
    s.append(f'<circle cx="{x + 88 * k}" cy="{y - 136 * k}" r="{2.6 * k}" fill="{INK}"/>')
    return ''.join(s)


def bunny(x, y, h=150, col='#E9E4F2', light=WHITE):
    """thỏ đứng hai chân, nhìn thẳng; cao h tính cả tai"""
    k = h / 150
    return (f'<ellipse cx="{x - 14 * k}" cy="{y - 128 * k}" rx="{8 * k}" ry="{24 * k}" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{x + 14 * k}" cy="{y - 128 * k}" rx="{8 * k}" ry="{24 * k}" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{x - 14 * k}" cy="{y - 126 * k}" rx="{3.5 * k}" ry="{16 * k}" fill="{PINK}"/>'
            f'<ellipse cx="{x + 14 * k}" cy="{y - 126 * k}" rx="{3.5 * k}" ry="{16 * k}" fill="{PINK}"/>'
            f'<ellipse cx="{x - 12 * k}" cy="{y - 8 * k}" rx="{8 * k}" ry="{10 * k}" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{x + 12 * k}" cy="{y - 8 * k}" rx="{8 * k}" ry="{10 * k}" fill="{col}" {st(2.4)}/>'
            f'<ellipse cx="{x}" cy="{y - 40 * k}" rx="{24 * k}" ry="{30 * k}" fill="{col}" {st(2.6)}/>'
            f'<ellipse cx="{x}" cy="{y - 36 * k}" rx="{13 * k}" ry="{18 * k}" fill="{light}"/>'
            f'<path d="M{x - 22 * k},{y - 56 * k} Q{x - 40 * k},{y - 46 * k} {x - 34 * k},{y - 34 * k}" fill="none" {st(7 * k, col)}/>'
            f'<path d="M{x + 22 * k},{y - 56 * k} Q{x + 40 * k},{y - 66 * k} {x + 38 * k},{y - 80 * k}" fill="none" {st(7 * k, col)}/>'
            f'<circle cx="{x}" cy="{y - 86 * k}" r="{24 * k}" fill="{col}" {st(2.6)}/>'
            + eye(x - 9 * k, y - 90 * k, 3.4 * k) + eye(x + 9 * k, y - 90 * k, 3.4 * k)
            + f'<ellipse cx="{x}" cy="{y - 80 * k}" rx="{3.4 * k}" ry="{2.6 * k}" fill="{PINK}"/>'
            f'<path d="M{x - 6 * k},{y - 74 * k} Q{x},{y - 68 * k} {x + 6 * k},{y - 74 * k}" fill="none" {st(2)}/>')


def leaf(x, y, h=30, col=LEAF):
    """lá đơn vị đo (đứng, cuống ở dưới): (x, y) = đỉnh"""
    w = h * .42
    return (f'<path d="M{x},{y} C{x + w},{y + h * .3} {x + w},{y + h * .75} {x},{y + h} C{x - w},{y + h * .75} {x - w},{y + h * .3} {x},{y} Z" fill="{col}" {st(1.8)}/>'
            f'<line x1="{x}" y1="{y + h * .2}" x2="{x}" y2="{y + h}" stroke="#fff" stroke-width="1.6"/>')


def fish(x1, x2, y, col=BLUE, fin=None, stripes=False, fill=None):
    """cá bơi sang phải từ đuôi x1 tới miệng x2"""
    L = x2 - x1
    h = L * .5
    fin = fin or col
    s = [f'<path d="M{x1},{y - h * .4} L{x1 + L * .25},{y} L{x1},{y + h * .4} Z" fill="{fin}" {st(2.4)}/>',
         f'<path d="M{x1 + L * .4},{y - h * .38} Q{x1 + L * .5},{y - h * .7} {x1 + L * .66},{y - h * .38} Z" fill="{fin}" {st(2.2)}/>',
         f'<ellipse cx="{x1 + L * .58}" cy="{y}" rx="{L * .4}" ry="{h * .42}" fill="{fill or col}" {st(2.6)}/>']
    if stripes:
        for sx in (.45, .7):
            s.append(f'<path d="M{x1 + L * sx},{y - h * .4} Q{x1 + L * (sx + .06)},{y} {x1 + L * sx},{y + h * .4} L{x1 + L * (sx + .08)},{y + h * .38} Q{x1 + L * (sx + .13)},{y} {x1 + L * (sx + .08)},{y - h * .38} Z" fill="#fff" {st(1.8)}/>')
    s.append(eye(x1 + L * .84, y - h * .1, max(2.4, L * .03)))
    s.append(f'<path d="M{x2 - L * .06},{y + h * .12} Q{x2 - L * .1},{y + h * .18} {x2 - L * .14},{y + h * .14}" fill="none" {st(2)}/>')
    return ''.join(s)


def caterpillar(x1, x2, y, n, col='#7BCB8B', head=None):
    L = x2 - x1
    r = L / (n * 1.55 + .6)
    s = []
    for i in range(n):
        cx = x1 + r + i * r * 1.55
        s.append(f'<line x1="{cx}" y1="{y - r * .2}" x2="{cx}" y2="{y}" {st(2)}/>')
        s.append(f'<circle cx="{cx}" cy="{y - r}" r="{r}" fill="{col}" {st(2.2)}/>')
    hx = x2 - r * 1.15
    s.append(f'<circle cx="{hx}" cy="{y - r * 1.4}" r="{r * 1.15}" fill="{head or col}" {st(2.4)}/>')
    s.append(f'<path d="M{hx - r * .3},{y - r * 2.4} L{hx - r * .6},{y - r * 3.2} M{hx + r * .3},{y - r * 2.4} L{hx + r * .6},{y - r * 3.2}" fill="none" {st(2)}/>')
    s.append(eye(hx + r * .4, y - r * 1.6, r * .25))
    return ''.join(s)


def ant(x1, x2, y, col='#6FB7EA'):
    L = x2 - x1
    r = L * .17
    s = []
    for dx in (-.25, 0, .25):
        cx = x1 + L * (.5 + dx)
        s.append(f'<path d="M{cx},{y - r} L{cx - r * .5},{y} M{cx},{y - r} L{cx + r * .5},{y}" fill="none" {st(2)}/>')
    s.append(f'<ellipse cx="{x1 + r * 1.1}" cy="{y - r * 1.2}" rx="{r * 1.1}" ry="{r * .9}" fill="{col}" {st(2.2)}/>')
    s.append(f'<circle cx="{x1 + L * .52}" cy="{y - r * 1.2}" r="{r * .6}" fill="{col}" {st(2.2)}/>')
    s.append(f'<circle cx="{x2 - r * .8}" cy="{y - r * 1.5}" r="{r * .8}" fill="{col}" {st(2.2)}/>')
    s.append(f'<path d="M{x2 - r},{y - r * 2.2} L{x2 - r * 1.3},{y - r * 3} M{x2 - r * .5},{y - r * 2.2} L{x2 - r * .3},{y - r * 3}" fill="none" {st(2)}/>')
    s.append(eye(x2 - r * .6, y - r * 1.6, r * .22))
    return ''.join(s)


# ── cây ─────────────────────────────────────────────────────────────────────

def banana_tree(x, y, h=150, col=GREEN):
    k = h / 150
    s = [f'<path d="M{x - 7 * k},{y} L{x - 5 * k},{y - 90 * k} L{x + 5 * k},{y - 90 * k} L{x + 7 * k},{y} Z" fill="#DCE9C8" {st(2.4)}/>']
    for a, L in ((-160, 90), (-120, 70), (-60, 70), (-20, 90), (-90, 60)):
        r = math.radians(a)
        tx, ty = x + math.cos(r) * L * k, y - 90 * k + math.sin(r) * L * k * .7
        s.append(f'<path d="M{x},{y - 90 * k} Q{(x + tx) / 2},{min(ty, y - 90 * k) - 24 * k} {tx:.1f},{ty:.1f} Q{(x + tx) / 2},{min(ty, y - 90 * k) + 6 * k} {x},{y - 86 * k} Z" fill="{col}" {st(2.2)}/>')
    return ''.join(s)


def bamboo(x, y, h=220, col='#9BD58A'):
    k = h / 220
    s = [f'<rect x="{x - 6 * k}" y="{y - 190 * k}" width="{12 * k}" height="{190 * k}" fill="{col}" {st(2.4)}/>']
    for i in range(1, 7):
        s.append(f'<line x1="{x - 7 * k}" y1="{y - i * 28 * k}" x2="{x + 7 * k}" y2="{y - i * 28 * k}" {st(2)}/>')
    for yy, d in ((-200, 1), (-180, -1), (-160, 1), (-140, -1), (-120, 1), (-208, -1)):
        tx = x + d * 34 * k
        s.append(f'<path d="M{x},{y + yy * k} Q{x + d * 16 * k},{y + (yy - 18) * k} {tx},{y + (yy - 6) * k} Q{x + d * 16 * k},{y + (yy + 2) * k} {x},{y + yy * k} Z" fill="{GREEN}" {st(1.8)}/>')
    s.append(f'<path d="M{x},{y - 190 * k} L{x + 2 * k},{y - 220 * k} L{x + 8 * k},{y - 196 * k} Z" fill="{GREEN}" {st(1.8)}/>')
    return ''.join(s)


def palm(x, y, h=180, col=GREEN):
    k = h / 180
    s = [f'<path d="M{x - 10 * k},{y} Q{x - 2 * k},{y - 70 * k} {x - 4 * k},{y - 140 * k} L{x + 6 * k},{y - 140 * k} Q{x + 8 * k},{y - 70 * k} {x + 12 * k},{y} Z" fill="#E7C9A0" {st(2.4)}/>']
    for a in (-170, -135, -100, -70, -40, -8):
        r = math.radians(a)
        tx, ty = x + math.cos(r) * 62 * k, y - 140 * k + math.sin(r) * 40 * k + 20 * k
        s.append(f'<path d="M{x},{y - 142 * k} Q{(x + tx) / 2},{y - 182 * k + (20 if abs(a + 90) > 50 else 0) * k} {tx:.1f},{ty:.1f} Q{(x + tx) / 2},{y - 150 * k} {x},{y - 138 * k} Z" fill="{col}" {st(2.2)}/>')
    return ''.join(s)


def round_tree(x, y, h=160, crown='#5DB4EA', trunk='#4A3A36'):
    k = h / 160
    return (f'<path d="M{x - 8 * k},{y} L{x - 4 * k},{y - 80 * k} L{x + 4 * k},{y - 80 * k} L{x + 8 * k},{y} Z" fill="{trunk}" {st(2)}/>'
            f'<path d="M{x},{y - 70 * k} L{x - 26 * k},{y - 110 * k} M{x},{y - 76 * k} L{x + 22 * k},{y - 116 * k}" {st(4 * k, trunk)}/>'
            f'<circle cx="{x - 22 * k}" cy="{y - 110 * k}" r="{34 * k}" fill="{crown}" {st(2.4)}/>'
            f'<circle cx="{x + 24 * k}" cy="{y - 112 * k}" r="{32 * k}" fill="{crown}" {st(2.4)}/>'
            f'<circle cx="{x}" cy="{y - 130 * k}" r="{30 * k}" fill="{crown}" {st(2.4)}/>'
            f'<ellipse cx="{x}" cy="{y}" rx="{24 * k}" ry="{6 * k}" fill="{GRASS_D}" opacity=".6"/>')


# ── người ───────────────────────────────────────────────────────────────────

def kid(x, y, h, girl=False, shirt=BLUE, bottom='#4E8FC8', hair=HAIR, pose='down'):
    return K1.kid(x, y, h=h, girl=girl, shirt=shirt, bottom=bottom, hair=hair, pose=pose)


def robot(x, y, h, accent=BLUE):
    return K1.robot(x, y, h=h, accent=accent, arm_pose='down') if True else ''


def hand(x, y, w=110, skin=SKIN):
    """bàn tay xoè một gang, úp xuống, nhìn từ trên: đầu ngón cái ở (x, y), đầu ngón út ở (x + w, y)"""
    k = w / 110
    s = []
    # ngón: (gốc x, gốc y, đầu x, đầu y, bề rộng)
    for bx, by, tx, ty, fw in ((30, 46, 2, 4, 15), (44, 36, 40, -36, 13), (56, 34, 62, -42, 13), (68, 36, 82, -34, 12), (78, 42, 108, 4, 11)):
        s.append(f'<line x1="{x + bx * k:.1f}" y1="{y + by * k:.1f}" x2="{x + tx * k:.1f}" y2="{y + ty * k:.1f}" stroke="{INK}" stroke-width="{(fw + 5) * k:.1f}" stroke-linecap="round"/>')
        s.append(f'<line x1="{x + bx * k:.1f}" y1="{y + by * k:.1f}" x2="{x + tx * k:.1f}" y2="{y + ty * k:.1f}" stroke="{skin}" stroke-width="{fw * k:.1f}" stroke-linecap="round"/>')
    s.append(f'<path d="M{x + 26 * k},{y + 40 * k} Q{x + 54 * k},{y + 20 * k} {x + 84 * k},{y + 40 * k} L{x + 80 * k},{y + 92 * k} L{x + 32 * k},{y + 92 * k} Z" fill="{skin}" {st(2.4)}/>')
    return ''.join(s)
