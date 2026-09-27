"""
Vở BT Toán 2, Bài 58 Tiết 1 Q2 — ba hòn đảo V, N, I nối bằng cầu (nét riêng).
Giữ nội dung toán: đảo V (trái, thấp), N (giữa, cao), I (phải, thấp); cầu V–N ghi
"12 km", cầu N–I ghi "8 km".
"""
import math
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 800, 194
parts = []


def blob(cx, cy, rx, ry, seed, fill, wobble=0.12):
    pts = []
    n = 14
    for i in range(n):
        a = 2 * math.pi * i / n
        r = 1 + wobble * math.sin(seed + i * 2.3) + wobble * 0.6 * math.cos(seed * 1.7 + i * 3.1)
        pts.append((cx + rx * r * math.cos(a), cy + ry * r * math.sin(a)))
    # smooth closed curve through midpoints
    d = ''
    for i in range(n):
        p0, p1 = pts[i], pts[(i + 1) % n]
        m = ((p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2)
        if i == 0:
            pm = pts[-1]
            d += f'M{(pm[0] + p0[0]) / 2:.1f},{(pm[1] + p0[1]) / 2:.1f} '
        d += f'Q{p0[0]:.1f},{p0[1]:.1f} {m[0]:.1f},{m[1]:.1f} '
    return f'<path d="{d}Z" fill="{fill}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>'


def island(cx, cy, rx, ry, letter, seed):
    parts.append(f'<ellipse cx="{cx}" cy="{cy + 4}" rx="{rx * 1.15}" ry="{ry * 1.02}" fill="{WATER_L}" opacity=".8"/>')
    parts.append(blob(cx, cy, rx, ry, seed, '#F6DFA8'))
    parts.append(blob(cx - 2, cy - 3, rx * 0.72, ry * 0.62, seed + 1, GRASS, 0.1))
    parts.append(f'<circle cx="{cx}" cy="{cy - 2}" r="17" fill="{WHITE}" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(text(cx, cy + 6, letter, size=24, weight=700))


# cầu: đường cong bậc hai V -> N -> I
V, C, I = (92, 134), (420, -52), (730, 134)
d = f'M{V[0]},{V[1]} Q{C[0]},{C[1]} {I[0]},{I[1]}'
parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="17" stroke-linecap="round"/>')
parts.append(f'<path d="{d}" fill="none" stroke="#C9A27A" stroke-width="11" stroke-linecap="round"/>')
parts.append(f'<path d="{d}" fill="none" stroke="#8E6A4A" stroke-width="11" stroke-dasharray="2 9"/>')

island(68, 150, 52, 30, 'V', 1.0)
island(420, 45, 56, 30, 'N', 2.4)
island(738, 150, 48, 32, 'I', 4.2)
parts.append(text(236, 50, '12 km', size=28, weight=600, extra=' transform="rotate(-17 236 50)"'))
parts.append(text(612, 56, '8 km', size=28, weight=600, extra=' transform="rotate(20 612 56)"'))
save('bai58_t1_q2_islands', W, H, parts)
