"""
Vở BT Toán 2, Bài 15 Tiết 2 Q2 — bao gạo (nối với cân nặng): nét riêng.
Giữ nội dung toán: nhãn chữ đúng như sách "Hai mươi / ki-lô-gam" (nối với 20 kg).
Vẽ cùng bộ với bag / milk / log / pig; bao to, nặng hơn túi nhỏ và hộp sữa.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 383, 472
SACK, SACK_D, RICE = '#E9C98F', '#C79A5B', '#FFFDF6'
p = [f'<ellipse cx="192" cy="458" rx="150" ry="10" fill="#EEE6D8"/>']
# body
p.append(f'<path d="M78,150 C40,210 18,300 34,380 C44,440 110,456 192,456 C274,456 340,440 350,380 C366,300 344,210 306,150 Z" '
         f'fill="{SACK}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
# folded rim
p.append(f'<path d="M60,120 C50,60 110,40 192,44 C274,40 334,60 324,120 C330,160 290,176 192,172 C94,176 54,160 60,120 Z" '
         f'fill="{SACK}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
# rice inside the opening
p.append(f'<path d="M92,108 C100,76 150,68 192,70 C240,68 286,78 292,108 C290,132 250,142 192,140 C134,142 94,132 92,108 Z" fill="{RICE}" stroke="{INK}" stroke-width="3"/>')
for x, y in ((140, 104), (170, 92), (206, 98), (240, 110), (160, 122), (220, 126), (262, 96), (122, 118), (190, 114)):
    p.append(f'<ellipse cx="{x}" cy="{y}" rx="5" ry="2.6" fill="#EFE4CC" transform="rotate({(x * 7) % 60 - 30} {x} {y})"/>')
# stitches (burlap)
p.append(f'<path d="M66,138 C120,164 264,164 318,138" fill="none" stroke="{SACK_D}" stroke-width="3" stroke-dasharray="10 8" stroke-linecap="round"/>')
p.append(f'<path d="M58,220 C140,232 244,232 326,220" fill="none" stroke="{SACK_D}" stroke-width="3" stroke-dasharray="10 8" stroke-linecap="round"/>')
p.append(f'<path d="M50,420 C140,436 244,436 334,420" fill="none" stroke="{SACK_D}" stroke-width="3" stroke-dasharray="10 8" stroke-linecap="round"/>')
# label patch
p.append(f'<rect x="92" y="262" width="200" height="118" rx="18" fill="{CREAM}" stroke="{INK}" stroke-width="3"/>')
p.append(text(192, 314, 'Hai mươi', size=30, weight=600))
p.append(text(192, 356, 'ki-lô-gam', size=30, weight=600))
save('bai15_t2_q2_sack', W, H, p)
