"""
Vở BT Toán 3 Tập hai, Bài 74 Q1 (trang 103) — chiếc nón kì diệu (nét riêng).
Nội dung toán: 6 miền bằng nhau xen kẽ 3 xanh, 3 trắng (miền trắng ở trên cùng,
nơi mũi tên chỉ vào), không có miền màu nào khác.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 340, 340
cx, cy, R = 170, 178, 128
parts = []
parts.append(f'<circle cx="{cx}" cy="{cy}" r="{R + 22}" fill="{SKY_D}" stroke="{INK}" stroke-width="3"/>')
for k in range(8):
    a = math.radians(k * 45 + 22.5)
    parts.append(f'<circle cx="{cx + (R + 11) * math.sin(a):.1f}" cy="{cy - (R + 11) * math.cos(a):.1f}" r="4" fill="#fff" stroke="{INK}" stroke-width="1.6"/>')
for k in range(6):
    a1, a2 = math.radians(-30 + 60 * k), math.radians(30 + 60 * k)
    x1, y1 = cx + R * math.sin(a1), cy - R * math.cos(a1)
    x2, y2 = cx + R * math.sin(a2), cy - R * math.cos(a2)
    fill = '#fff' if k % 2 == 0 else '#2FA9E6'
    parts.append(f'<path d="M{cx},{cy} L{x1:.1f},{y1:.1f} A{R},{R} 0 0 1 {x2:.1f},{y2:.1f} Z" fill="{fill}" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
parts.append(f'<circle cx="{cx}" cy="{cy}" r="10" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>')
# mũi tên ở trên, chỉ xuống miền trắng
parts.append(f'<path d="M{cx - 16},{cy - R - 30} H{cx + 16} L{cx},{cy - R + 8} Z" fill="{RED}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
save('bai74_q1_wheel', W, H, parts, folder='grade3-workbook-2')
