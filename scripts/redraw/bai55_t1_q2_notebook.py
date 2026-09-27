"""Vở BT Toán 2, Bài 55 Tiết 1 Q2 — quyển vở có mũi tên đo chiều dài: nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 200, 227
parts = []
x0, y0, x1, y1 = 44, 14, 186, 212
parts.append(f'<rect x="{x0}" y="{y0}" width="{x1 - x0}" height="{y1 - y0}" rx="8" fill="{GREEN}" {st(3)}/>')
parts.append(f'<rect x="{x0}" y="{y0}" width="16" height="{y1 - y0}" fill="{GRASS_D}" {st(3)}/>')
for (cx, cy) in ((96, 130), (150, 110), (120, 170), (164, 176), (84, 190), (140, 146)):
    parts.append(f'<circle cx="{cx}" cy="{cy}" r="6" fill="{WHITE}" opacity=".35"/>')
parts.append(f'<rect x="{x0 + 34}" y="36" width="84" height="48" rx="10" fill="{WHITE}" {st(2.4)}/>')
for y in (50, 60, 70):
    parts.append(f'<line x1="{x0 + 44}" y1="{y}" x2="{x0 + 108}" y2="{y}" stroke="{GREY}" stroke-width="2"/>')
parts.append(f'<line x1="18" y1="{y0}" x2="{x0 - 4}" y2="{y0}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<line x1="18" y1="{y1}" x2="{x0 - 4}" y2="{y1}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<line x1="28" y1="{y0 + 2}" x2="28" y2="{y1 - 2}" stroke="{INK}" stroke-width="2.6"/>')
parts.append(f'<path d="M22,{y0 + 10} L28,{y0 + 1} L34,{y0 + 10} M22,{y1 - 10} L28,{y1 - 1} L34,{y1 - 10}" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
save('bai55_t1_q2_notebook', W, H, parts)
