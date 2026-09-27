"""
Vở BT Toán 2, Bài 62 Tiết 3 Q4 — con hổ trong khung (nét riêng).
Chỉ là hình con vật để nối với cân nặng; không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 400, 242
O, OD, OL = '#F59A3E', '#E07F26', '#FFE7C9'
p = [frame(W, H)]
for x in (138, 232):
    p.append(leg(x, 150, 196, 18, OD))
p.append(f'<path d="M110,134 C84,140 80,112 94,98" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round"/>')
p.append(f'<path d="M110,134 C84,140 80,112 94,98" fill="none" stroke="{O}" stroke-width="5" stroke-linecap="round"/>')
p.append(f'<ellipse cx="180" cy="142" rx="76" ry="36" fill="{O}" {STK}/>')
p.append(f'<path d="M130,160 C160,178 206,178 236,162" fill="none" stroke="{OL}" stroke-width="9" stroke-linecap="round"/>')
for x in (148, 172, 196, 220):
    p.append(f'<path d="M{x},108 q-6,14 2,28" fill="none" stroke="{INK}" stroke-width="4.5" stroke-linecap="round"/>')
for x in (122, 242):
    p.append(leg(x, 156, 200, 19, O))
# đầu
hx, hy = 278, 118
for sx in (-1, 1):
    p.append(f'<circle cx="{hx + sx * 22}" cy="{hy - 26}" r="11" fill="{O}" {STK}/><circle cx="{hx + sx * 22}" cy="{hy - 26}" r="5" fill="{INK}" opacity=".7"/>')
p.append(f'<circle cx="{hx}" cy="{hy}" r="34" fill="{O}" {STK}/>')
p.append(f'<ellipse cx="{hx}" cy="{hy + 14}" rx="20" ry="13" fill="{OL}"/>')
for sx in (-1, 1):
    p.append(cute_eye(hx + sx * 12, hy - 4, 4.6))
    p.append(f'<path d="M{hx + sx * 34},{hy - 4} l{-sx * 10},3" stroke="{INK}" stroke-width="3.5" stroke-linecap="round"/>')
p.append(f'<path d="M{hx - 6},{hy - 30} l6,10 l6,-10" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>')
p.append(f'<ellipse cx="{hx}" cy="{hy + 8}" rx="5" ry="3.6" fill="{INK}"/>')
p.append(f'<path d="M{hx - 8},{hy + 16} q8,6 16,0" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
save('bai62_t3_q4_tiger', W, H, p)
