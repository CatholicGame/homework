"""
Vở BT Toán 2, Bài 8 Tiết 1 Q3 — "đèn lồng": vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: 6 đèn lồng treo trên dây, từ trái sang phải
7 + 5, 9 + 2, 6 + 8, 6 + 6, 9 + 5, 7 + 7 (cao thấp xen kẽ như sách),
ba bạn nhỏ đứng bên dưới (hai bạn gái hai bên, bạn trai ở giữa).

    python scripts/redraw/bai8_t1_q3_lanterns.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 860, 747
RX, RY = 66, 42

# centre x, centre y, expression, body colour, rib colour
LANTERNS = [
    (110, 248, '7 + 5', '#FFC2B8', '#F08A7A'),
    (238, 166, '9 + 2', '#FFE08A', '#F2B84B'),
    (380, 108, '6 + 8', '#C9E9FF', '#86C3EC'),
    (478, 196, '6 + 6', '#FFCDE3', '#EE93BB'),
    (618, 160, '9 + 5', '#CDEFC4', '#86C97A'),
    (772, 236, '7 + 7', '#DCD2FA', '#A996EA'),
]


def garland_y(x):
    t = x / W
    return 22 * (1 - t) ** 2 + 2 * t * (1 - t) * 64 + 22 * t ** 2


def lantern(cx, cy, label, body, rib):
    s = []
    top = cy - RY
    s.append(f'<line x1="{cx}" y1="{garland_y(cx):.1f}" x2="{cx}" y2="{top - 12}" stroke="{INK}" stroke-width="2.5"/>')
    # tassel
    by = cy + RY + 10
    s.append(f'<rect x="{cx - 7}" y="{by}" width="14" height="16" rx="4" fill="{RED}" stroke="{INK}" stroke-width="2.5"/>')
    for dx in (-6, -2, 2, 6):
        s.append(f'<path d="M{cx + dx * 0.6},{by + 16} q{dx * 0.8},24 {dx * 1.4},46" fill="none" stroke="{RED}" stroke-width="3" stroke-linecap="round"/>')
    # body with curved ribs
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="{RX}" ry="{RY}" fill="{body}" stroke="{INK}" stroke-width="3.5"/>')
    for k in (0.42, 0.8):
        s.append(f'<path d="M{cx - RX * k * 0.55},{cy - RY + 3} Q{cx - RX * k * 1.25},{cy} {cx - RX * k * 0.55},{cy + RY - 3}" fill="none" stroke="{rib}" stroke-width="2.5"/>')
        s.append(f'<path d="M{cx + RX * k * 0.55},{cy - RY + 3} Q{cx + RX * k * 1.25},{cy} {cx + RX * k * 0.55},{cy + RY - 3}" fill="none" stroke="{rib}" stroke-width="2.5"/>')
    # caps
    for y in (top - 12, cy + RY - 2):
        s.append(f'<rect x="{cx - 26}" y="{y}" width="52" height="14" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<ellipse cx="{cx - RX * 0.55}" cy="{cy - RY * 0.5}" rx="10" ry="5" fill="#fff" opacity=".6" transform="rotate(-25 {cx - RX * 0.55} {cy - RY * 0.5})"/>')
    s.append(text(cx, cy + 12, label, size=34, weight=700))
    return '\n'.join(s)


def kid(cx, hair, shirt, bottom, bottom_kind, shoe, pose):
    s = []
    feet = 712
    hy = 440            # head centre
    # legs and shoes
    for sx in (-1, 1):
        s.append(f'<rect x="{cx + sx * 20 - 10}" y="600" width="20" height="{feet - 606}" rx="9" fill="{SKIN}" stroke="{INK}" stroke-width="3"/>')
        s.append(f'<ellipse cx="{cx + sx * 26}" cy="{feet}" rx="22" ry="12" fill="{shoe}" stroke="{INK}" stroke-width="3"/>')
    # bottoms
    if bottom_kind == 'skirt':
        s.append(f'<path d="M{cx - 52},585 L{cx + 52},585 L{cx + 84},660 Q{cx},674 {cx - 84},660 Z" fill="{bottom}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
        for dx in (-30, 0, 30):
            s.append(f'<path d="M{cx + dx * 0.6},592 L{cx + dx * 1.3},664" stroke="{INK}" stroke-width="1.8" opacity=".35"/>')
    elif bottom_kind == 'shorts':
        s.append(f'<path d="M{cx - 50},580 L{cx + 50},580 L{cx + 56},640 L{cx + 4},640 L{cx},615 L{cx - 4},640 L{cx - 56},640 Z" fill="{bottom}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    # shirt / dress
    if bottom_kind == 'dress':
        s.append(f'<path d="M{cx - 44},508 Q{cx},496 {cx + 44},508 L{cx + 58},560 L{cx + 86},650 Q{cx},668 {cx - 86},650 L{cx - 58},560 Z" fill="{shirt}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
        s.append(f'<path d="M{cx - 54},560 Q{cx},574 {cx + 54},560" fill="none" stroke="{INK}" stroke-width="2.5" opacity=".5"/>')
    else:
        s.append(f'<path d="M{cx - 44},508 Q{cx},496 {cx + 44},508 L{cx + 56},590 Q{cx},598 {cx - 56},590 Z" fill="{shirt}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
    # collar
    s.append(f'<path d="M{cx - 18},503 Q{cx},522 {cx + 18},503" fill="#fff" stroke="{INK}" stroke-width="2.5"/>')
    # arms
    arms = {
        'wave':  [((-44, 515), (-60, 590)), ((44, 515), (102, 468))],
        'down':  [((-44, 515), (-66, 600)), ((44, 515), (66, 600))],
        'clap':  [((-44, 515), (-14, 555)), ((44, 515), (14, 555))],
    }[pose]
    for (sx0, sy0), (hx, hy2) in arms:
        s.append(f'<path d="M{cx + sx0},{sy0} Q{cx + (sx0 + hx) / 2 + (8 if hx > sx0 else -8)},{(sy0 + hy2) / 2 + 12} {cx + hx},{hy2}" fill="none" stroke="{INK}" stroke-width="20" stroke-linecap="round"/>')
        s.append(f'<path d="M{cx + sx0},{sy0} Q{cx + (sx0 + hx) / 2 + (8 if hx > sx0 else -8)},{(sy0 + hy2) / 2 + 12} {cx + hx},{hy2}" fill="none" stroke="{shirt}" stroke-width="14" stroke-linecap="round"/>')
        s.append(f'<circle cx="{cx + hx}" cy="{hy2}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="3"/>')
    # neck + head
    s.append(f'<rect x="{cx - 10}" y="{hy + 50}" width="20" height="16" fill="{SKIN}"/>')
    if hair == 'ponytail':
        s.append(f'<path d="M{cx + 54},{hy - 30} q48,10 36,78 q-18,-10 -34,-44 Z" fill="{HAIR}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
        s.append(f'<circle cx="{cx + 60}" cy="{hy - 28}" r="9" fill="{PINK}" stroke="{INK}" stroke-width="2.5"/>')
    if hair == 'bob':
        s.append(f'<path d="M{cx - 64},{hy - 10} Q{cx - 72},{hy + 44} {cx - 44},{hy + 50} L{cx + 44},{hy + 50} Q{cx + 72},{hy + 44} {cx + 64},{hy - 10} Z" fill="{HAIR}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<ellipse cx="{cx}" cy="{hy}" rx="58" ry="56" fill="{SKIN}" stroke="{INK}" stroke-width="3.5"/>')
    # ears
    for sx in (-1, 1):
        s.append(f'<ellipse cx="{cx + sx * 58}" cy="{hy + 6}" rx="9" ry="12" fill="{SKIN}" stroke="{INK}" stroke-width="3"/>')
    # hair cap
    if hair == 'short':
        s.append(f'<path d="M{cx - 60},{hy + 2} Q{cx - 64},{hy - 62} {cx},{hy - 62} Q{cx + 64},{hy - 62} {cx + 60},{hy + 2} '
                 f'Q{cx + 50},{hy - 26} {cx + 30},{hy - 22} L{cx + 20},{hy - 34} L{cx + 6},{hy - 20} L{cx - 10},{hy - 34} L{cx - 24},{hy - 20} Q{cx - 50},{hy - 24} {cx - 60},{hy + 2} Z" '
                 f'fill="{HAIR}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    else:
        s.append(f'<path d="M{cx - 62},{hy + 8} Q{cx - 66},{hy - 64} {cx},{hy - 62} Q{cx + 66},{hy - 64} {cx + 62},{hy + 8} '
                 f'Q{cx + 40},{hy - 34} {cx + 4},{hy - 26} Q{cx - 36},{hy - 36} {cx - 62},{hy + 8} Z" '
                 f'fill="{HAIR}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # face
    for sx in (-1, 1):
        if pose == 'clap':    # happy closed eyes
            s.append(f'<path d="M{cx + sx * 20 - 8},{hy + 4} q8,-9 16,0" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linecap="round"/>')
        else:
            s.append(f'<ellipse cx="{cx + sx * 20}" cy="{hy + 2}" rx="6" ry="8" fill="{INK}"/><circle cx="{cx + sx * 20 + 2}" cy="{hy - 1}" r="2.2" fill="#fff"/>')
        s.append(f'<ellipse cx="{cx + sx * 34}" cy="{hy + 20}" rx="9" ry="6" fill="#F6A3B4" opacity=".75"/>')
    s.append(f'<path d="M{cx - 12},{hy + 24} Q{cx},{hy + 38} {cx + 12},{hy + 24} Z" fill="#E86A7E" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
    return '\n'.join(s)


parts = [
    # room: back wall tint and floor
    f'<rect x="0" y="540" width="{W}" height="{H - 540}" fill="{CREAM}"/>',
    f'<path d="M0,540 H{W}" stroke="#E6D3B3" stroke-width="4"/>',
    f'<ellipse cx="450" cy="716" rx="330" ry="18" fill="#000" opacity=".06"/>',
    # garland
    f'<path d="M-10,{garland_y(0) - 1} Q{W / 2},{2 * 64 - 22} {W + 10},{garland_y(W) - 1}" fill="none" stroke="{INK}" stroke-width="3"/>',
]
# little pennant flags on the garland between lanterns (decoration, no math)
for fx in (40, 175, 310, 430, 548, 700, 830):
    gy = garland_y(fx)
    parts.append(f'<path d="M{fx - 10},{gy - 1} L{fx + 10},{gy + 1} L{fx + 1},{gy + 20} Z" fill="{[ORANGE, TEAL, PINK, YELLOW, PURPLE, GREEN, RED][fx % 7]}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
for L in LANTERNS:
    parts.append(lantern(*L))
parts.append(kid(245, 'bob', '#FFB3C7', '#F7839F', 'skirt', '#6FB7EA', 'wave'))
parts.append(kid(450, 'short', '#8FD3F4', '#4E8FC8', 'shorts', '#F4A259', 'down'))
parts.append(kid(655, 'ponytail', '#FFE08A', None, 'dress', '#F07167', 'clap'))

save('bai8_t1_q3_lanterns', W, H, parts)
