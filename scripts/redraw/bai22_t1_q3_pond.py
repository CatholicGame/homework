"""
Vở BT Toán 3, Bài 22 Tiết 1 câu 3 — ao hình chữ nhật của gọng vó với các lá súng tròn.
Giữ nội dung toán: hàng trên cùng 2 lá nhỏ (đk 5cm) + 1 lá to (đk 10cm) xếp sát nhau chạm hai
cạnh bên → rộng 20cm; cột bên phải 2 lá to + 2 lá nhỏ xếp sát nhau chạm cạnh trên và dưới → dài
30cm. Tỉ lệ vẽ đúng. Nét riêng.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 501, 701
X0, Y0, S = 40, 55, 20.15          # px mỗi cm
RW, RH = 20 * S, 30 * S
LEAF, LEAF_D = '#7BCB8B', '#4E9E57'


def pad(cx, cy, r, notch_deg):
    """lá súng tròn có khe hình nêm (khe hướng notch_deg)."""
    a0 = math.radians(notch_deg - 14)
    a1 = math.radians(notch_deg + 14)
    x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0)
    x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
    d = f'M{cx:.1f},{cy:.1f} L{x1:.1f},{y1:.1f} A{r:.1f},{r:.1f} 0 1 1 {x0:.1f},{y0:.1f} Z'
    s = [f'<path d="{d}" fill="{LEAF}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>']
    for k in range(1, 6):
        a = math.radians(notch_deg + 60 * k)
        s.append(line(cx, cy, cx + r * .72 * math.cos(a), cy + r * .72 * math.sin(a), sw=2.2, col=LEAF_D))
    return ''.join(s)


def strider(x, y):
    s = []
    for (dx1, dy1, dx2, dy2, dx3, dy3) in ((-6, -10, -40, -40, -62, -58), (6, -10, 40, -40, 62, -58),
                                           (-6, 8, -46, 20, -58, 72), (6, 8, 46, 20, 58, 72),
                                           (-5, 0, -34, -4, -54, 20), (5, 0, 34, -4, 54, 20)):
        s.append(f'<path d="M{x + dx1},{y + dy1} L{x + dx2},{y + dy2} L{x + dx3},{y + dy3}" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{x}" cy="{y + 6}" rx="8" ry="30" fill="{BROWN}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{x}" cy="{y - 30}" r="9" fill="{BROWN}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{x - 4}" cy="{y - 33}" r="2.4" fill="#fff"/><circle cx="{x + 4}" cy="{y - 33}" r="2.4" fill="#fff"/>')
    s.append(f'<path d="M{x - 3},{y - 38} l-8,-16 M{x + 3},{y - 38} l8,-16" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    for dx in (-18, 18):
        pass
    s.append(f'<ellipse cx="{x}" cy="{y + 80}" rx="40" ry="6" fill="none" stroke="{WATER_D}" stroke-width="2" opacity=".7"/>')
    return ''.join(s)


parts = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="26" fill="{GRASS}" stroke="{INK}" stroke-width="4"/>',
         f'<rect x="{X0}" y="{Y0}" width="{RW:.1f}" height="{RH:.1f}" fill="{WATER_L}"/>']
for k in range(5):
    y = Y0 + 110 + k * 110
    parts.append(f'<path d="M{X0 + 30},{y} q15,-8 30,0 t30,0" fill="none" stroke="{WATER_D}" stroke-width="2.5" stroke-linecap="round" opacity=".6"/>')
rs, rb = 2.5 * S, 5 * S
leaves = [((X0 + 2.5 * S, Y0 + 5 * S), rs, 120), ((X0 + 7.5 * S, Y0 + 5 * S), rs, 60),
          ((X0 + 15 * S, Y0 + 5 * S), rb, 135), ((X0 + 15 * S, Y0 + 15 * S), rb, 215),
          ((X0 + 15 * S, Y0 + 22.5 * S), rs, 170), ((X0 + 15 * S, Y0 + 27.5 * S), rs, 200)]
for (cx, cy), r, n in leaves:
    parts.append(pad(cx, cy, r, n))
parts.append(strider(160, 470))
parts.append(f'<rect x="{X0}" y="{Y0}" width="{RW:.1f}" height="{RH:.1f}" fill="none" stroke="{INK}" stroke-width="4"/>')
save('bai22_t1_q3_pond', W, H, parts, folder='grade3-workbook')
