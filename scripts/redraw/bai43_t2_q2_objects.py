"""
Vở BT Toán 3, Bài 43 Tiết 2 câu 2 — hộp bút, cái bút bi, bát (chén) đầy nước. Nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 420, 780
SW = 4
parts = []
# ── hộp bút dẹt (chiếu xiên) ──
x, yb, w, h, dx, dy = 30, 230, 300, 50, 70, 120
col = '#8FD0F2'
parts.append(box3d(x, yb, w, h, dx, dy, col, SW))
t = yb - h
# nắp: đường chia trên mặt trên + nút bấm + hình trang trí
parts.append(line(x + w * .62, t, x + w * .62 + dx, t - dy, sw=3, col=shade(col, -.35)))
parts.append(f'<rect x="{x + w * .62 - 30}" y="{t + 12}" width="36" height="12" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
for k, (px, py, r, c) in enumerate([(.22, .45, 16, PINK), (.4, .6, 11, YELLOW), (.8, .5, 14, WHITE)]):
    cx, cy = x + w * px + dx * py, t - dy * py
    parts.append(f'<ellipse cx="{cx:.0f}" cy="{cy:.0f}" rx="{r * 1.4}" ry="{r * .8}" fill="{c}" stroke="{INK}" stroke-width="2.5"/>')
# ── bút bi ──
y = 390
parts.append(f'<path d="M20,{y - 11} H300 L352,{y - 3} L380,{y} L352,{y + 3} L300,{y + 11} H20 Q10,{y} 20,{y - 11} Z" fill="{BLUE}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
parts.append(f'<path d="M300,{y - 11} L352,{y - 3} L352,{y + 3} L300,{y + 11} Z" fill="{GREY_L}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<rect x="120" y="{y - 14}" width="16" height="28" rx="4" fill="{shade(BLUE, -.2)}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<path d="M40,{y - 12} v-10 h70 v10" fill="none" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(line(40, y - 4, 110, y - 4, sw=3, col='#fff', extra=' opacity=".6"'))
# ── bát đầy nước ──
cx, top, rx, ry = 190, 575, 165, 48
bowl = '#F7F1E8'
parts.append(f'<path d="M{cx - rx},{top} C{cx - rx},{top + 150} {cx - 70},{top + 170} {cx - 60},{top + 170} H{cx + 60} C{cx + 70},{top + 170} {cx + rx},{top + 150} {cx + rx},{top} Z" '
             f'fill="{bowl}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
parts.append(f'<path d="M{cx - 60},{top + 170} v6 h120 v-6" fill="{bowl}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
parts.append(f'<path d="M{cx - rx + 20},{top + 70} Q{cx},{top + 110} {cx + rx - 20},{top + 70}" fill="none" stroke="{BLUE}" stroke-width="7" stroke-linecap="round"/>')
for k in range(5):
    px = cx - 100 + k * 50
    parts.append(f'<circle cx="{px}" cy="{top + 100 + (0 if k in (0, 4) else 10)}" r="7" fill="{PINK}"/>')
parts.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{bowl}" stroke="{INK}" stroke-width="{SW}"/>')
parts.append(f'<ellipse cx="{cx}" cy="{top + 4}" rx="{rx - 14}" ry="{ry - 12}" fill="{WATER_L}" stroke="{WATER_D}" stroke-width="3"/>')
parts.append(f'<path d="M{cx - 70},{top} q20,-8 40,0 M{cx + 20},{top + 12} q20,-8 40,0" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round"/>')
save('bai43_t2_q2_objects', W, H, parts, folder='grade3-workbook')
