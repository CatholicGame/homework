"""
Vở BT Toán 2, Bài 15 Tiết 2 Q2 — túi vải buộc dây (nối với cân nặng): nét riêng.
Giữ nội dung toán: nhãn chữ đúng như sách "Năm / ki-lô-gam" (nối với 5 kg).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 243, 222
BAG, BAG_D = '#F7A1C4', '#E0729F'
p = [f'<ellipse cx="122" cy="212" rx="96" ry="7" fill="#EEE6D8"/>']
# gathered top (frill)
p.append(f'<path d="M94,54 L58,14 C80,24 96,10 112,22 C122,8 136,12 142,24 C158,10 176,20 188,14 L150,54 Z" fill="{BAG}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
# body
p.append(f'<path d="M96,52 C46,70 14,120 18,164 C22,200 70,210 122,210 C174,210 222,200 226,164 C230,120 198,70 148,52 Z" '
         f'fill="{BAG}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
p.append(f'<path d="M100,62 C84,72 70,86 60,104" fill="none" stroke="{BAG_D}" stroke-width="3" stroke-linecap="round"/>')
# tie
p.append(f'<rect x="88" y="44" width="68" height="14" rx="7" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
tie = 'M152,54 q14,18 4,32 M152,54 q24,6 26,24'
p.append(f'<path d="{tie}" fill="none" stroke="{INK}" stroke-width="7" stroke-linecap="round"/>')
p.append(f'<path d="{tie}" fill="none" stroke="{YELLOW}" stroke-width="3.5" stroke-linecap="round"/>')
p.append(text(122, 134, 'Năm', size=27, weight=600))
p.append(text(122, 172, 'ki-lô-gam', size=27, weight=600))
save('bai15_t2_q2_bag', W, H, p)
