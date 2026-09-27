"""
Vở BT Toán 2, Bài 64 Q3 — ba dây đèn lồng của Rô-bốt: nét riêng.
Giữ nội dung toán (hình dạng từng đèn, trái sang phải):
  hàng 1: hộp, trụ, cầu, trụ, trụ, cầu
  hàng 2: hộp, hộp, cầu, cầu, cầu, trụ
  hàng 3: cầu, cầu, trụ, cầu, cầu, trụ
=> 3 khối hộp chữ nhật, 6 khối trụ, 9 khối cầu (18 đèn).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 648
SW = 3
ROWS = [('BCSCCS', 12, 48), ('BBSSSC', 220, 240), ('SSCSSC', 430, 456)]
XS = [105, 235, 368, 505, 652, 800]
PAL = [('#FF9E8F', '#E0604F'), ('#FFD166', '#E0A526'), ('#F7A1C4', '#D9679A'), ('#FFB870', '#E0803A')]


def rope_y(row, x):
    _, y0, y1 = row
    return y0 + (y1 - y0) * x / W


def tassel(cx, y, col):
    s = [f'<rect x="{cx - 7}" y="{y}" width="14" height="10" rx="3" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>']
    for dx in (-5, 0, 5):
        s.append(f'<path d="M{cx + dx * 0.5},{y + 10} L{cx + dx * 1.4},{y + 30}" stroke="{col}" stroke-width="3" stroke-linecap="round"/>')
    return ''.join(s)


def cap(cx, y, w=40):
    return f'<rect x="{cx - w / 2}" y="{y}" width="{w}" height="10" rx="3" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>'


def sphere(cx, top, body, rib):
    r = 50; cy = top + 12 + r
    s = [cap(cx, top), f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>']
    for k in (0.45, 0.85):
        for sx in (-1, 1):
            s.append(f'<path d="M{cx + sx * r * k * 0.35},{cy - r + 2} Q{cx + sx * r * k * 1.25},{cy} {cx + sx * r * k * 0.35},{cy + r - 2}" fill="none" stroke="{rib}" stroke-width="2.4"/>')
    s.append(f'<line x1="{cx}" y1="{cy - r}" x2="{cx}" y2="{cy + r}" stroke="{rib}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{cx - 24}" cy="{cy - 26}" rx="9" ry="5" fill="#fff" opacity=".6" transform="rotate(-35 {cx - 24} {cy - 26})"/>')
    s.append(cap(cx, cy + r - 2, 34))
    s.append(tassel(cx, cy + r + 8, rib))
    return ''.join(s)


def cylinder(cx, top, body, rib):
    rx, ry, h = 36, 9, 88
    y0 = top + 12 + ry
    s = [cap(cx, top, 34),
         f'<path d="M{cx - rx},{y0} L{cx - rx},{y0 + h} A{rx},{ry} 0 0 0 {cx + rx},{y0 + h} L{cx + rx},{y0} Z" fill="{body}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>']
    for i in range(1, 6):
        y = y0 + h * i / 6
        s.append(f'<path d="M{cx - rx},{y} A{rx},{ry} 0 0 0 {cx + rx},{y}" fill="none" stroke="{rib}" stroke-width="2.4"/>')
    s.append(f'<ellipse cx="{cx}" cy="{y0}" rx="{rx}" ry="{ry}" fill="{body}" stroke="{INK}" stroke-width="{SW}"/>')
    s.append(f'<path d="M{cx - rx + 9},{y0 + 16} L{cx - rx + 9},{y0 + 44}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>')
    s.append(tassel(cx, y0 + h + ry, rib))
    return ''.join(s)


def box(cx, top, body, rib):
    w, h, d = 58, 96, 22
    x = cx - w / 2 - d / 2; y = top + d * 0.7 + 2
    k = d * 0.7
    s = [f'<path d="M{x},{y} L{x + d},{y - k} L{x + w + d},{y - k} L{x + w},{y} Z" fill="{WHITE}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{x},{y} L{x + w + d},{y - k} M{x + d},{y - k} L{x + w},{y}" stroke="{rib}" stroke-width="2"/>',
         f'<path d="M{x + w},{y} L{x + w + d},{y - k} L{x + w + d},{y + h - k} L{x + w},{y + h} Z" fill="{rib}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{body}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>']
    for i in (1, 2):
        s.append(f'<line x1="{x + w * i / 3}" y1="{y + 4}" x2="{x + w * i / 3}" y2="{y + h - 4}" stroke="{rib}" stroke-width="2"/>')
    s.append(f'<line x1="{x + w / 2 + d / 2}" y1="{top - 2}" x2="{x + w / 2 + d / 2}" y2="{y - k / 2}" stroke="{INK}" stroke-width="2.5"/>')
    s.append(tassel(x + w / 2, y + h, rib))
    return ''.join(s)


parts = []
n = 0
for row in ROWS:
    shapes, y0, y1 = row
    parts.append(f'<line x1="0" y1="{y0}" x2="{W}" y2="{y1}" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    for cx, k in zip(XS, shapes):
        ry = rope_y(row, cx)
        top = ry + 30
        body, rib = PAL[n % len(PAL)]
        n += 1
        parts.append(f'<line x1="{cx}" y1="{ry}" x2="{cx}" y2="{top + 4}" stroke="{INK}" stroke-width="2.5"/>')
        parts.append({'B': box, 'C': cylinder, 'S': sphere}[k](cx, top, body, rib))
        parts.append(f'<circle cx="{cx}" cy="{ry:.1f}" r="5" fill="{WHITE}" stroke="{INK}" stroke-width="2.4"/>')
save('bai64_q3_lanterns', W, H, parts)
