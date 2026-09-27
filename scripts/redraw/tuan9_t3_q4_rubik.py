"""
Luyện tập Toán 3, Tuần 9 Tiết 3 Q4 — khối ru-bích 2×2 dạng lập phương, thấy 3 mặt, mỗi mặt 4 ô vuông nhỏ,
mỗi mặt một màu. Vẽ lại bằng nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 680, 620
BODY = '#2F2A33'
# các góc của 3 mặt (trước, trên, phải)
F = [(60, 210), (400, 210), (400, 570), (60, 570)]          # TL, TR, BR, BL
T = [(250, 50), (620, 50), (400, 210), (60, 210)]            # sau-trái, sau-phải, trước-phải, trước-trái
R = [(400, 210), (620, 50), (620, 390), (400, 570)]


def lerp(p, q, t):
    return (p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t)


def bil(quad, u, v):
    """quad theo thứ tự p00 (u0v0), p10, p11, p01"""
    a = lerp(quad[0], quad[1], u)
    b = lerp(quad[3], quad[2], u)
    return lerp(a, b, v)


def stickers(quad, color, pad=0.07):
    out = []
    for i in range(2):
        for j in range(2):
            u0, u1 = i / 2 + pad, (i + 1) / 2 - pad
            v0, v1 = j / 2 + pad, (j + 1) / 2 - pad
            pts = [bil(quad, u0, v0), bil(quad, u1, v0), bil(quad, u1, v1), bil(quad, u0, v1)]
            ps = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
            out.append(f'<polygon points="{ps}" fill="{color}" stroke="{color}" stroke-width="14" stroke-linejoin="round"/>')
            # vệt sáng nhỏ
            hl = [bil(quad, u0 + .04, v0 + .04), bil(quad, u0 + .16, v0 + .04), bil(quad, u0 + .04, v0 + .16)]
            out.append(f'<polygon points="{" ".join(f"{x:.1f},{y:.1f}" for x, y in hl)}" fill="{WHITE}" opacity=".45" stroke="{WHITE}" stroke-width="6" stroke-linejoin="round" stroke-opacity=".45"/>')
    return out


def poly(q):
    return ' '.join(f'{x},{y}' for x, y in q)


outline = [(60, 210), (250, 50), (620, 50), (620, 390), (400, 570), (60, 570)]
parts = [f'<polygon points="{poly(outline)}" fill="{BODY}" stroke="{BODY}" stroke-width="22" stroke-linejoin="round"/>']
# mặt trước: p00 = TL
parts += stickers(F, '#F07167')
# mặt trên: p00 = trước-trái, p10 = trước-phải, p11 = sau-phải, p01 = sau-trái
parts += stickers([T[3], T[2], T[1], T[0]], '#FFD166')
# mặt phải: p00 = trên-trước, p10 = trên-sau, p11 = dưới-sau, p01 = dưới-trước
parts += stickers(R, '#6FB7EA')
parts.append(f'<path d="M60,210 L400,210 L620,50 M400,210 L400,570" fill="none" stroke="{BODY}" stroke-width="10" stroke-linejoin="round"/>')
save('tuan9_t3_q4_rubik', W, H, parts, folder='grade3-practice')
