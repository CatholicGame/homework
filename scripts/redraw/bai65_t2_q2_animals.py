"""
Vở BT Toán 2, Bài 65 Tiết 2 Q2 — biểu đồ "SỐ THỎ, RÙA, SÓC TRONG KHU RỪNG": nét riêng.
Giữ nội dung toán: bảng 3 hàng × 8 ô (thỏ, rùa, sóc từ trên xuống), số chấm có sẵn
6 / 5 / 5 xếp từ trái sang, các ô còn lại để trống cho bé vẽ thêm.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_g8 import *

W, H = 900, 335
FR = BLUE
X0, XI, X1 = 5, 151, 894
YS = [50, 155, 243, 330]
cw = (X1 - XI) / 8
parts = [text(450, 28, 'SỐ THỎ, RÙA, SÓC TRONG KHU RỪNG', size=24, weight=600)]
parts.append(f'<rect x="{X0}" y="{YS[0]}" width="{XI - X0}" height="{YS[3] - YS[0]}" fill="#EAF6FD"/>')
for i in range(9):
    x = XI + i * cw
    parts.append(f'<line x1="{x:.1f}" y1="{YS[0]}" x2="{x:.1f}" y2="{YS[3]}" stroke="{FR}" stroke-width="3"/>')
parts.append(f'<line x1="{X0}" y1="{YS[0]}" x2="{X0}" y2="{YS[3]}" stroke="{FR}" stroke-width="3"/>')
for y in YS:
    parts.append(f'<line x1="{X0}" y1="{y}" x2="{X1}" y2="{y}" stroke="{FR}" stroke-width="3"/>')
counts = [6, 5, 5]
icons = [bunny_icon(), turtle_icon(), squirrel_icon()]
for r, (n, ic) in enumerate(zip(counts, icons)):
    y0, y1 = YS[r], YS[r + 1]
    s = min((y1 - y0 - 12) / 80, 1.2)
    parts.append(place(ic, (X0 + XI) / 2 - 50 * s, (y0 + y1) / 2 - 40 * s, s))
    for i in range(n):
        parts.append(f'<circle cx="{XI + (i + 0.5) * cw:.1f}" cy="{(y0 + y1) / 2:.1f}" r="12" fill="{DOT}"/>')
save('bai65_t2_q2_animals', W, H, parts)
