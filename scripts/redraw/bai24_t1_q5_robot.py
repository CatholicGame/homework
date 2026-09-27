"""
Vở BT Toán 2, Bài 24 Tiết 1 Q5 — rô-bốt với ba thẻ số: nét riêng.
Giữ nội dung toán: rô-bốt giơ thẻ 4 (tay trái) và thẻ 3 (tay phải); thẻ 8 nằm dưới sàn.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 654, 625
parts = []
BODY, LIGHT, CARD = '#8FD0F2', '#E6F5FC', '#FFD166'

# rug
parts.append(f'<path d="M40,420 C60,340 250,330 380,336 C520,340 630,360 620,440 C610,520 470,540 330,536 C170,532 20,500 40,420 Z" fill="#CDEFD6" {st(2.8)}/>')
parts.append(f'<path d="M90,430 C110,380 250,372 380,376 C500,380 580,396 574,440" fill="none" stroke="#A8E0B6" stroke-width="6" stroke-linecap="round"/>')


def card(cx, cy, w, h, rot, digit, size=64):
    return (f'<g transform="translate({cx},{cy}) rotate({rot})">'
            f'<rect x="{-w / 2}" y="{-h / 2}" width="{w}" height="{h}" rx="12" fill="{CARD}" {st(3)}/>'
            f'<rect x="{-w / 2 + 8}" y="{-h / 2 + 8}" width="{w - 16}" height="{h - 16}" rx="8" fill="none" stroke="#F4A259" stroke-width="2.4"/>'
            + text(0, size * .36, digit, size=size, weight=700) + '</g>')


def limb(d, w=16, c=GREY_L):
    return (f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 6}" stroke-linecap="round" stroke-linejoin="round"/>'
            f'<path d="{d}" fill="none" stroke="{c}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


cx = 330
# legs and feet
parts.append(limb(f'M{cx - 26},390 Q{cx - 60},420 {cx - 70},468'))
parts.append(limb(f'M{cx + 26},390 Q{cx + 50},430 {cx + 40},488'))
parts.append(f'<ellipse cx="{cx - 78}" cy="474" rx="46" ry="20" fill="{BODY}" {st(3)}/>')
parts.append(f'<ellipse cx="{cx + 40}" cy="494" rx="46" ry="20" fill="{BODY}" {st(3)}/>')
# arms up to the cards
parts.append(limb(f'M{cx - 60},250 Q{cx - 130},250 {cx - 196},196'))
parts.append(limb(f'M{cx + 60},250 Q{cx + 130},246 {cx + 186},190'))
# body
parts.append(f'<path d="M{cx - 58},262 Q{cx - 64},400 {cx},404 Q{cx + 64},400 {cx + 58},262 Z" fill="{BODY}" {st(3)}/>')
parts.append(f'<rect x="{cx - 30}" y="300" width="60" height="50" rx="12" fill="{LIGHT}" {st(2.6)}/>')
for i, c in enumerate((RED, YELLOW, GREEN)):
    parts.append(f'<circle cx="{cx - 16 + i * 16}" cy="325" r="6" fill="{c}" {st(1.8)}/>')
# head
parts.append(f'<rect x="{cx - 12}" y="246" width="24" height="18" fill="{GREY}" {st(2.6)}/>')
parts.append(f'<line x1="{cx}" y1="112" x2="{cx}" y2="86" {st(3)}/><circle cx="{cx}" cy="80" r="10" fill="{RED}" {st(2.6)}/>')
parts.append(f'<rect x="{cx - 92}" y="110" width="184" height="140" rx="56" fill="{LIGHT}" {st(3)}/>')
parts.append(f'<rect x="{cx - 70}" y="130" width="140" height="92" rx="40" fill="#35536B"/>')
for dx in (-30, 30):
    parts.append(f'<circle cx="{cx + dx}" cy="174" r="22" fill="{WHITE}"/><circle cx="{cx + dx + 4}" cy="170" r="10" fill="{INK}"/><circle cx="{cx + dx + 8}" cy="165" r="3.4" fill="{WHITE}"/>')
parts.append(f'<path d="M{cx - 14},204 Q{cx},214 {cx + 14},204" fill="none" stroke="{WHITE}" stroke-width="3.4" stroke-linecap="round"/>')
for sx in (-1, 1):
    parts.append(f'<rect x="{cx + sx * 96 - 12}" y="160" width="24" height="40" rx="10" fill="{BODY}" {st(2.8)}/>')

# cards held up: 4 (left) and 3 (right); hands drawn over the card edges
parts.append(card(118, 124, 130, 160, -8, '4', 70))
parts.append(card(536, 118, 130, 160, 6, '3', 70))
for hx, hy in ((cx - 196, 196), (cx + 186, 190)):
    parts.append(f'<circle cx="{hx}" cy="{hy}" r="18" fill="{BODY}" {st(3)}/>')
# card 8 lying on the floor
parts.append(card(132, 546, 176, 100, -18, '8', 64))

save('bai24_t1_q5_robot', W, H, parts)
