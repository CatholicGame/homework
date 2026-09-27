"""
Vở BT Toán 2, Bài 15 Tiết 2 Q2 — hộp sữa (nối với cân nặng): nét riêng.
Giữ nội dung toán: chữ "SỮA" trên nhãn và nhãn cân "Hai / ki-lô-gam" (nối với 2 kg).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 178, 268
CAN, CAN_D, BAND = '#FFFFFF', '#CFE3F2', '#6FB7EA'
p = [f'<ellipse cx="89" cy="258" rx="80" ry="8" fill="#EEE6D8"/>']
# body
p.append(f'<path d="M10,34 L10,236 A79,20 0 0 0 168,236 L168,34 Z" fill="{CAN}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
p.append(f'<path d="M24,136 L24,222" stroke="{CAN_D}" stroke-width="7" stroke-linecap="round"/>')
# blue band with SỮA
p.append(f'<path d="M10,74 A79,16 0 0 0 168,74 L168,122 A79,16 0 0 1 10,122 Z" fill="{BAND}" stroke="{INK}" stroke-width="3"/>')
p.append(text(89, 116, 'SỮA', size=26, weight=700, fill=WHITE))
# lid
p.append(f'<ellipse cx="89" cy="34" rx="79" ry="20" fill="#E8F3FB" stroke="{INK}" stroke-width="3.5"/>')
p.append(f'<ellipse cx="89" cy="34" rx="58" ry="12" fill="#D4E8F6" stroke="{INK}" stroke-width="2"/>')
p.append(text(89, 186, 'Hai', size=28, weight=600))
p.append(text(89, 224, 'ki-lô-gam', size=26, weight=600))
save('bai15_t2_q2_milk', W, H, p)
