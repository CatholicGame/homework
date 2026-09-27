"""Vở BT Toán 3, Bài 34 Tiết 2 Q2 — máy tính xách tay (để nối với 2 kg). Nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 600, 420
parts = []
# màn hình (nghiêng nhẹ)
parts.append('<path d="M150,70 L470,52 L452,262 L168,280 Z" fill="#5B5560" stroke="#3F3A40" stroke-width="4" stroke-linejoin="round"/>')
parts.append(f'<path d="M166,86 L456,70 L440,248 L182,264 Z" fill="{SKY}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
parts.append(f'<path d="M182,264 Q260,190 330,214 T440,190 L440,248 Z" fill="{GRASS}" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
parts.append(f'<circle cx="390" cy="118" r="22" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>')
parts.append(f'<path d="M230,140 q10,-14 24,-6 q14,-10 24,4 q10,2 6,12 H228 q-8,-2 2,-10 Z" fill="#fff" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
# thân bàn phím (phối cảnh)
parts.append(f'<path d="M168,280 L452,262 L560,330 L90,352 Z" fill="{GREY_L}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(f'<path d="M90,352 L560,330 L560,340 Q560,346 552,346 L98,368 Q90,368 90,362 Z" fill="{GREY}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
# phím
for r in range(3):
    y0 = 284 + r * 14
    xl = 168 - r * 22 + 18
    xr = 452 + r * 22 - 12
    n = 12
    for i in range(n):
        x = xl + (xr - xl) * i / n
        parts.append(f'<rect x="{x:.1f}" y="{y0 - i * 1.2:.1f}" width="{(xr - xl) / n - 4:.1f}" height="9" rx="2" fill="#fff" stroke="{INK}" stroke-width="1.5"/>')
parts.append(f'<path d="M270,334 L360,329 L366,342 L268,347 Z" fill="#fff" stroke="{INK}" stroke-width="2"/>')

save('bai34_t2_q2_laptop', W, H, parts, folder='grade3-workbook')
