"""
Vở BT Toán 3, Bài 35 Tiết 2 Q2 — nhiệt kế thuỷ ngân đo thân nhiệt Nam: 38 °C. Nét riêng.
Thang 35–42 °C, vạch 0,1 °C; số chẵn 36, 38, 40, 42 phía trên, số lẻ 37, 39, 41 phía dưới,
dấu tam giác ở 37 (thân nhiệt bình thường), cột thuỷ ngân dừng đúng vạch 38.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 1600, 175
parts = []
cy = 90
X35, U = 526, 114            # x của 35 °C, px mỗi độ


def X(t):
    return X35 + (t - 35) * U


GLASS = '#EEF7FC'
# thân ống thuỷ tinh
tube = (f'M30,{cy - 16} H150 Q200,{cy - 16} 240,{cy - 44} Q260,{cy - 62} 300,{cy - 62} H1540 Q1582,{cy - 62} 1582,{cy - 20} '
        f'V{cy + 20} Q1582,{cy + 62} 1540,{cy + 62} H300 Q260,{cy + 62} 240,{cy + 44} Q200,{cy + 16} 150,{cy + 16} H30 '
        f'Q14,{cy + 16} 14,{cy} Q14,{cy - 16} 30,{cy - 16} Z')
parts.append(f'<path d="{tube}" fill="{GLASS}" stroke="{INK}" stroke-width="4" stroke-linejoin="round"/>')
parts.append(f'<path d="M310,{cy - 50} H1520" stroke="#fff" stroke-width="7" stroke-linecap="round"/>')
# đầu nắp phải
parts.append(f'<path d="M1400,{cy - 60} H1540 Q1580,{cy - 60} 1580,{cy - 20} V{cy + 20} Q1580,{cy + 60} 1540,{cy + 60} H1400 Z" fill="{SKY}" stroke="{INK}" stroke-width="3"/>')
# bầu thuỷ ngân + cột tới 38
parts.append(f'<rect x="24" y="{cy - 9}" width="130" height="18" rx="9" fill="{RED}" stroke="{INK}" stroke-width="2.5"/>')
parts.append(f'<rect x="140" y="{cy - 4}" width="{X(38) - 140:.1f}" height="8" rx="4" fill="{RED}"/>')
parts.append(f'<line x1="{X(38):.1f}" y1="{cy - 4}" x2="1395" y2="{cy - 4}" stroke="{INK}" stroke-width="1.5" opacity=".35"/>'
             f'<line x1="{X(38):.1f}" y1="{cy + 4}" x2="1395" y2="{cy + 4}" stroke="{INK}" stroke-width="1.5" opacity=".35"/>')
# vạch chia 0,1 °C
for i in range(0, 71):
    x = X35 + i * U / 10
    L = 18 if i % 10 == 0 else (12 if i % 5 == 0 else 7)
    w = 3 if i % 10 == 0 else 2
    parts.append(f'<line x1="{x:.1f}" y1="{cy - 10}" x2="{x:.1f}" y2="{cy - 10 - L}" stroke="{INK}" stroke-width="{w}"/>'
                 f'<line x1="{x:.1f}" y1="{cy + 10}" x2="{x:.1f}" y2="{cy + 10 + L}" stroke="{INK}" stroke-width="{w}"/>')
for t in (36, 38, 40, 42):
    parts.append(text(f'{X(t):.1f}', cy - 34, str(t), size=30, weight=700))
for t in (37, 39, 41):
    parts.append(text(f'{X(t):.1f}', cy + 58, str(t), size=30, weight=700))
parts.append(text(f'{X(42) + 50:.1f}', cy + 56, '°C', size=28, weight=700))
# dấu thân nhiệt bình thường (37)
x37 = X(37)
parts.append(f'<path d="M{x37 - 10:.1f},{cy - 58} H{x37 + 10:.1f} L{x37:.1f},{cy - 42} Z" fill="{BLUE}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')

save('bai35_t2_q2_thermometer', W, H, parts, folder='grade3-workbook')
