"""
Vở BT Toán 3, Bài 19 Tiết 3 câu 1 — hình chữ nhật ABCD, BC = 20 cm, CD = 50 cm,
con kiến ở điểm A. Nét riêng (con kiến tự vẽ).
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 814, 425
A, B, C, D = (107, 97), (730, 97), (730, 344), (107, 344)


def ant(x, y, col='#E86A5C'):
    """kiến đứng trên đường thẳng, (x, y) = chân; nhìn sang phải."""
    s = []
    for dx in (-24, -4, 16):
        s.append(f'<path d="M{x + dx},{y - 16} l-8,14 M{x + dx},{y - 16} l8,14" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{x - 30}" cy="{y - 20}" rx="18" ry="14" fill="{col}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<ellipse cx="{x - 2}" cy="{y - 20}" rx="11" ry="9" fill="{col}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{x + 22}" cy="{y - 30}" r="15" fill="{col}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<path d="M{x + 18},{y - 43} q-4,-14 -12,-18 M{x + 28},{y - 43} q4,-14 12,-16" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round"/>')
    s.append(f'<circle cx="{x + 5}" cy="{y - 61}" r="3.5" fill="{INK}"/><circle cx="{x + 41}" cy="{y - 59}" r="3.5" fill="{INK}"/>')
    s.append(f'<circle cx="{x + 27}" cy="{y - 33}" r="3.4" fill="{INK}"/><circle cx="{x + 28.2}" cy="{y - 34.2}" r="1.2" fill="#fff"/>')
    s.append(f'<path d="M{x + 25},{y - 24} q5,4 10,-1" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>')
    return ''.join(s)


parts = [f'<polygon points="{A[0]},{A[1]} {B[0]},{B[1]} {C[0]},{C[1]} {D[0]},{D[1]}" fill="none" stroke="{INK}" stroke-width="5" stroke-linejoin="round"/>']
for p in (A, B, C, D):
    parts.append(dot(*p, r=9))
parts.append(ant(A[0] + 50, A[1] - 3))
parts.append(text(60, 78, 'A', size=48, weight=500))
parts.append(text(765, 78, 'B', size=48, weight=500))
parts.append(text(62, 385, 'D', size=48, weight=500))
parts.append(text(766, 390, 'C', size=48, weight=500))
parts.append(rtext(790, 222, '20 cm', -90, size=46, weight=500))
parts.append(text(396, 408, '50 cm', size=46, weight=500))
save('bai19_t3_q1_ant', W, H, parts, folder='grade3-workbook')
