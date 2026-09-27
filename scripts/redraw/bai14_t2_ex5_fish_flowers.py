"""
Vở BT Toán 3, Bài 14 Tiết 2 câu 5 — tô màu 1/2 số con cá (6 con: 3 cột × 2 hàng) và
1/4 số bông hoa (12 bông: 4 cột × 3 hàng). Hình để tô nên vẽ nét, nền trắng. Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 1402, 1478
SW = 4.5


def fish(cx, cy):
    """cá vàng nhìn sang trái, đuôi xoè bên phải; nền trắng để bé tô."""
    s = []
    # đuôi
    s.append(f'<path d="M{cx + 50},{cy} C{cx + 90},{cy - 30} {cx + 110},{cy - 90} {cx + 120},{cy - 100} '
             f'C{cx + 130},{cy - 40} {cx + 115},{cy - 10} {cx + 128},{cy} C{cx + 118},{cy + 12} {cx + 132},{cy + 50} {cx + 122},{cy + 100} '
             f'C{cx + 108},{cy + 88} {cx + 90},{cy + 30} {cx + 50},{cy} Z" fill="#fff" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    for dy in (-45, 0, 45):
        s.append(f'<path d="M{cx + 62},{cy + dy * .1} Q{cx + 95},{cy + dy * .5} {cx + 112},{cy + dy * 1.3}" fill="none" stroke="{INK}" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>')
    # vây lưng + vây bụng
    s.append(f'<path d="M{cx - 30},{cy - 58} C{cx - 20},{cy - 100} {cx + 30},{cy - 96} {cx + 42},{cy - 44}" fill="#fff" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<path d="M{cx - 10},{cy + 58} C{cx},{cy + 92} {cx + 30},{cy + 90} {cx + 36},{cy + 48}" fill="#fff" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    # thân
    s.append(f'<ellipse cx="{cx}" cy="{cy}" rx="82" ry="64" fill="#fff" stroke="{INK}" stroke-width="{SW}"/>')
    # mang + vảy
    s.append(f'<path d="M{cx - 30},{cy - 44} Q{cx - 8},{cy} {cx - 30},{cy + 44}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    for (dx, dy) in ((10, -20), (34, -20), (22, 4), (46, 4), (10, 28), (34, 28)):
        s.append(f'<path d="M{cx + dx - 9},{cy + dy} q9,10 18,0" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round" opacity=".55"/>')
    # vây ngực
    s.append(f'<path d="M{cx - 8},{cy + 14} q22,6 26,30 q-24,-2 -26,-30 Z" fill="#fff" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # mắt, miệng
    s.append(f'<circle cx="{cx - 52}" cy="{cy - 16}" r="13" fill="#fff" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{cx - 55}" cy="{cy - 16}" r="7" fill="{INK}"/><circle cx="{cx - 57}" cy="{cy - 19}" r="2.4" fill="#fff"/>')
    s.append(f'<path d="M{cx - 80},{cy + 12} q8,8 18,2" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    return ''.join(s)


def flower(cx, cy, r=46):
    """bông hoa 5 cánh tròn, nhụy nhỏ; nền trắng để bé tô."""
    import math
    s = []
    for i in range(5):
        a = math.radians(-90 + 72 * i)
        px, py = cx + r * .95 * math.cos(a), cy + r * .95 * math.sin(a)
        s.append(f'<circle cx="{px:.1f}" cy="{py:.1f}" r="{r * .62:.1f}" fill="#fff" stroke="{INK}" stroke-width="3.5"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .62:.1f}" fill="#fff"/>')
    s.append(f'<circle cx="{cx}" cy="{cy}" r="{r * .3:.1f}" fill="#fff" stroke="{INK}" stroke-width="3.5"/>')
    return ''.join(s)


parts = []
for r in range(2):
    for c in range(3):
        parts.append(fish(185 + c * 520, 150 + r * 225))
# 1/2 số con cá là [ ] con cá.
y = 548
parts.append(frac(48, y, 1, 2, size=50))
parts.append(text(92, y + 18, 'số con cá là', size=50, weight=500, anchor='start'))
parts.append(blank_box(412, y - 36, 70, 72, sw=4, r=12))
parts.append(text(502, y + 18, 'con cá.', size=50, weight=500, anchor='start'))
# b)
y = 682
parts.append(text(24, y + 18, 'b) Tô màu', size=48, weight=500, anchor='start'))
parts.append(frac(290, y, 1, 4, size=48))
parts.append(text(334, y + 18, 'số bông hoa rồi viết số thích hợp vào ô trống.', size=48, weight=500, anchor='start'))
for r in range(3):
    for c in range(4):
        parts.append(flower(326 + c * 280, 872 + r * 200))
y = 1410
parts.append(frac(48, y, 1, 4, size=50))
parts.append(text(92, y + 18, 'số bông hoa là', size=50, weight=500, anchor='start'))
parts.append(blank_box(470, y - 36, 70, 72, sw=4, r=12))
parts.append(text(560, y + 18, 'bông hoa.', size=50, weight=500, anchor='start'))
save('bai14_t2_ex5_fish_flowers', W, H, parts, folder='grade3-workbook')
