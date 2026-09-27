"""
Vở BT Toán 2, Bài 47 Tiết 2 Q4 — tê tê đào hang theo giờ: nét riêng.
Giữ nội dung toán: 4 khung, đồng hồ chỉ 4 giờ, 4 giờ 15 phút, 4 giờ 30 phút, 5 giờ;
hang sâu 20 cm, 40 cm, 60 cm, 90 cm (mũi tên đo độ sâu, vẽ theo cùng tỉ lệ).
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 900, 285
GROUND = 150
PX = 1.25     # px per cm
SOIL, SOIL_D, HOLE = '#E3B98A', '#C99966', '#7A5337'
parts = []
PANELS = [(4, 0, 20), (4, 15, 40), (4, 30, 60), (5, 0, 90)]
pw, gap = 214, 14


def pangolin(x, y, ang, k=1.0):
    """x,y = centre; ang in degrees (0 = lying, head left)"""
    body, sc = '#B9875A', '#8E6440'
    s = [f'<g transform="translate({x},{y}) rotate({ang}) scale({k})">']
    s.append(f'<path d="M30,-4 C50,-6 66,4 74,16 C60,14 46,10 30,10 Z" fill="{body}" {st(2.4)}/>')   # tail
    s.append(f'<ellipse cx="0" cy="0" rx="38" ry="20" fill="{body}" {st(2.6)}/>')
    for i in range(-2, 3):
        s.append(f'<path d="M{i * 13 - 8},{-16 + abs(i) * 2} q8,9 16,0" fill="none" stroke="{sc}" stroke-width="2.2"/>')
        s.append(f'<path d="M{i * 13 - 2},{-4} q8,9 16,0" fill="none" stroke="{sc}" stroke-width="2.2"/>')
    s.append(f'<path d="M-34,-6 C-48,-6 -58,0 -62,6 C-54,12 -42,12 -32,8 Z" fill="#E7C29A" {st(2.4)}/>')   # snout
    s.append(f'<circle cx="-40" cy="0" r="2.6" fill="{INK}"/>')
    s.append(f'<path d="M-20,16 l-4,10 M14,16 l4,10" stroke="{INK}" stroke-width="3.4" stroke-linecap="round"/>')
    s.append('</g>')
    return '\n'.join(s)


for i, (hh, mm, cm) in enumerate(PANELS):
    x0 = 2 + i * (pw + gap)
    cid = f'pc{i}'
    parts.append(f'<defs><clipPath id="{cid}"><rect x="{x0}" y="40" width="{pw}" height="{H - 42}" rx="14"/></clipPath></defs>')
    parts.append(f'<g clip-path="url(#{cid})">')
    parts.append(f'<rect x="{x0}" y="40" width="{pw}" height="{H - 40}" fill="{SKY}"/>')
    parts.append(f'<rect x="{x0}" y="{GROUND}" width="{pw}" height="{H - GROUND}" fill="{SOIL}"/>')
    parts.append(f'<rect x="{x0}" y="{GROUND - 6}" width="{pw}" height="8" fill="{GRASS}"/>')
    for j in range(5):   # pebbles
        parts.append(f'<ellipse cx="{x0 + 20 + j * 44}" cy="{H - 14}" rx="18" ry="7" fill="{SOIL_D}"/>')
    hx = x0 + 132
    depth = cm * PX
    parts.append(f'<rect x="{hx - 20}" y="{GROUND - 2}" width="40" height="{depth + 2}" rx="4" fill="{HOLE}"/>')
    parts.append(f'<ellipse cx="{hx}" cy="{GROUND + depth - 1}" rx="20" ry="4" fill="{HOLE}"/>')
    # pangolin: lies at the hole first, then digs head-down
    ang = [0, -62, -76, -86][i]
    px, py = [(hx + 44, GROUND - 22), (hx + 12, GROUND - 4), (hx + 4, GROUND + 26), (hx + 2, GROUND + depth - 56)][i]
    parts.append(pangolin(px, py, ang, .8))
    # depth arrow + label
    ax = hx - 30
    y1, y2 = GROUND, GROUND + depth
    parts.append(f'<line x1="{ax - 8}" y1="{y1}" x2="{ax + 8}" y2="{y1}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(f'<line x1="{ax - 8}" y1="{y2}" x2="{ax + 8}" y2="{y2}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(f'<line x1="{ax}" y1="{y1 + 2}" x2="{ax}" y2="{y2 - 2}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(f'<path d="M{ax - 5},{y1 + 9} L{ax},{y1 + 2} L{ax + 5},{y1 + 9} M{ax - 5},{y2 - 9} L{ax},{y2 - 2} L{ax + 5},{y2 - 9}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
    parts.append(f'<rect x="{ax - 70}" y="{(y1 + y2) / 2 - 15}" width="60" height="28" rx="8" fill="{WHITE}" opacity=".9"/>')
    parts.append(text(ax - 40, (y1 + y2) / 2 + 7, f'{cm} cm', size=20, weight=700))
    parts.append('</g>')
    parts.append(f'<rect x="{x0}" y="40" width="{pw}" height="{H - 42}" rx="14" fill="none" {st(2.6)}/>')
    parts.append(clock(x0 + pw / 2, 56, 52, hh, mm))
save('bai47_t2_q4_clocks', W, H, parts)
