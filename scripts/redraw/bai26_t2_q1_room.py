"""
Vở BT Toán 2, Bài 26 Tiết 2 Q1 — phòng khách: nét riêng.
Giữ nội dung toán: cây đèn có thân gấp khúc (đường gấp khúc); bức tranh, các chiếc gối,
các ngăn kéo tủ có dạng hình tứ giác; mặt bàn tròn; lọ hoa có 6 cạnh (hình lục giác).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 508
parts = []
WALL, WALL_D = '#FFF1E0', '#FBD9B6'
SOFA, SOFA_D = '#7CC6B5', '#5AAE9C'

parts.append(f'<rect width="{W}" height="380" fill="{WALL}"/>')
for x in range(0, W, 60):
    parts.append(f'<rect x="{x}" y="0" width="28" height="380" fill="{WALL_D}" opacity=".45"/>')
parts.append(f'<rect x="0" y="378" width="{W}" height="130" fill="#E7D3BC"/>')
parts.append(f'<line x1="0" y1="378" x2="{W}" y2="378" {st(2.6)}/>')

# picture frame (quadrilateral)
parts.append(f'<line x1="150" y1="50" x2="190" y2="22" {st(2)}/><line x1="230" y1="50" x2="190" y2="22" {st(2)}/>')
parts.append(f'<rect x="126" y="48" width="130" height="84" fill="{BROWN}" {st(2.8)}/>')
parts.append(f'<rect x="138" y="60" width="106" height="60" fill="{SKY}" {st(2)}/>')
parts.append(f'<path d="M138,120 L172,88 L196,106 L214,92 L244,120 Z" fill="{GRASS}" {st(2)}/>')
parts.append(f'<circle cx="222" cy="76" r="8" fill="{YELLOW}" {st(1.8)}/>')

# floor lamp: base, straight pole, bent arm, shade -> a broken line
parts.append(f'<ellipse cx="552" cy="426" rx="32" ry="10" fill="{GREY}" {st(2.6)}/>')
LAMP = 'M552,424 L552,138 L462,50 L394,104'
parts.append(f'<path d="{LAMP}" fill="none" stroke="{INK}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"/>')
parts.append(f'<path d="{LAMP}" fill="none" stroke="{GREY_L}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"/>')
parts.append(f'<path d="M358,128 Q362,98 394,98 Q426,98 430,128 Z" fill="{ORANGE}" {st(2.6)}/>')
parts.append(f'<ellipse cx="394" cy="130" rx="12" ry="4" fill="{YELLOW}" {st(1.8)}/>')

# sofa
parts.append(f'<rect x="54" y="186" width="410" height="120" rx="40" fill="{SOFA}" {st(3)}/>')
parts.append(f'<rect x="84" y="286" width="360" height="100" rx="14" fill="{SOFA}" {st(3)}/>')
parts.append(f'<line x1="264" y1="296" x2="264" y2="380" {st(2.2)}/>')
for x in (26, 432):
    parts.append(f'<rect x="{x}" y="252" width="64" height="140" rx="30" fill="{SOFA_D}" {st(3)}/>')
for x in (54, 440):
    parts.append(f'<path d="M{x},390 L{x + 6},424 L{x + 20},424 L{x + 24},390 Z" fill="{BROWN}" {st(2.4)}/>')


# pillows: tilted quadrilaterals
def pillow(cx, cy, s, rot, c):
    return (f'<g transform="translate({cx},{cy}) rotate({rot})">'
            f'<path d="M{-s},{-s} Q0,{-s + 3} {s},{-s} Q{s - 3},0 {s},{s} Q0,{s - 3} {-s},{s} Q{-s + 3},0 {-s},{-s} Z" fill="{c}" {st(2.6)}/></g>')


parts.append(pillow(96, 268, 40, -14, YELLOW))
parts.append(pillow(172, 280, 38, 10, PINK))
parts.append(pillow(236, 252, 40, -8, WHITE))
parts.append(pillow(360, 250, 40, 12, PURPLE))

# round table
parts.append(f'<rect x="338" y="392" width="12" height="80" fill="{BROWN}" {st(2.4)}/>')
parts.append(f'<rect x="466" y="392" width="12" height="80" fill="{BROWN}" {st(2.4)}/>')
parts.append(f'<rect x="404" y="398" width="12" height="96" fill="{BROWN}" {st(2.4)}/>')
parts.append(f'<ellipse cx="408" cy="380" rx="102" ry="30" fill="#F2C48D" {st(3)}/>')
parts.append(f'<path d="M306,380 L306,392 Q408,428 510,392 L510,380" fill="#D9A46A" {st(2.6)}/>')
parts.append(f'<ellipse cx="408" cy="380" rx="102" ry="30" fill="#F2C48D" {st(3)}/>')

# dresser with four drawers (quadrilaterals)
parts.append(f'<rect x="604" y="226" width="290" height="16" fill="#E9B98A" {st(2.6)}/>')
parts.append(f'<rect x="614" y="242" width="270" height="152" fill="#F2C48D" {st(2.6)}/>')
for x, y, w, h in ((626, 252, 118, 40), (758, 252, 116, 40), (626, 304, 118, 80), (758, 304, 116, 80)):
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="#FBE0C4" {st(2.4)}/>')
    parts.append(f'<circle cx="{x + w / 2}" cy="{y + (14 if h < 50 else 22)}" r="4" fill="{BROWN}" {st(1.6)}/>')
for x in (620, 870):
    parts.append(f'<rect x="{x}" y="394" width="10" height="16" fill="{BROWN}" {st(2)}/>')

# hexagonal vase (6 sides) with flowers
parts.append(f'<path d="M716,120 Q690,80 700,50 M722,120 Q740,70 770,54 M718,120 Q716,80 722,36" fill="none" stroke="{GRASS_D}" stroke-width="4" stroke-linecap="round"/>')
for x, y, c in ((700, 48, RED), (772, 52, PINK), (722, 34, YELLOW)):
    parts.append(f'<circle cx="{x}" cy="{y}" r="12" fill="{c}" {st(2.2)}/><circle cx="{x}" cy="{y}" r="4" fill="{ORANGE}"/>')
HEX = [(690, 158), (710, 128), (750, 128), (770, 158), (752, 224), (708, 224)]
parts.append(f'<polygon points="{pts(HEX)}" fill="{BLUE}" {st(2.8)}/>')

save('bai26_t2_q1_room', W, H, parts)
