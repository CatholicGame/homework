"""
Vở BT Toán 2, Bài 1 Tiết 3 Q1 — sơ đồ ghế phòng họp (mỗi hình người = một ghế): nét riêng.
Giữ nội dung toán: 4 hàng, 5 nhóm mỗi hàng; hàng 1 có nhóm 2-3-2-3-2 (12 ghế),
hàng 2, 3, 4 mỗi hàng 2-2-2-2-2 (10 ghế); hàng cuối trong khung nét đứt (10 ghế = 1 chục).
Tổng 42 ghế.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 700, 273
GROUP_X = [16, 140, 306, 442, 612]     # left edge of each seat group
ROW_Y = [40, 106, 172, 240]            # centre of each row
ROWS = [[2, 3, 2, 3, 2], [2] * 5, [2] * 5, [2] * 5]
PITCH = 33
SHIRTS = [ORANGE, TEAL, PINK, YELLOW, GREEN, BLUE, PURPLE, RED]
HAIRS = [HAIR, '#8A5A33', '#2E2A2E', '#C46A3A']


def kid(cx, cy, k):
    shirt = SHIRTS[k % len(SHIRTS)]
    hair = HAIRS[(k * 3) % len(HAIRS)]
    s = []
    # chair back peeking behind
    s.append(f'<rect x="{cx - 15}" y="{cy - 6}" width="30" height="30" rx="7" fill="#E3D7C3" stroke="{INK}" stroke-width="1.8"/>')
    # body
    s.append(f'<path d="M{cx - 13},{cy + 26} L{cx - 13},{cy + 10} Q{cx - 13},{cy} {cx},{cy} Q{cx + 13},{cy} {cx + 13},{cy + 10} L{cx + 13},{cy + 26} Z" '
             f'fill="{shirt}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    # head
    hy = cy - 11
    s.append(f'<circle cx="{cx}" cy="{hy}" r="11" fill="{SKIN}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<path d="M{cx - 11},{hy - 1} Q{cx - 10},{hy - 12} {cx},{hy - 12} Q{cx + 10},{hy - 12} {cx + 11},{hy - 1} Q{cx + 4},{hy - 7} {cx - 3},{hy - 5} Q{cx - 7},{hy - 4} {cx - 11},{hy - 1} Z" '
             f'fill="{hair}" stroke="{INK}" stroke-width="1.6" stroke-linejoin="round"/>')
    s.append(f'<circle cx="{cx - 4}" cy="{hy + 1}" r="1.6" fill="{INK}"/><circle cx="{cx + 4}" cy="{hy + 1}" r="1.6" fill="{INK}"/>')
    s.append(f'<path d="M{cx - 3},{hy + 5} q3,2.5 6,0" fill="none" stroke="{INK}" stroke-width="1.3" stroke-linecap="round"/>')
    return '\n'.join(s)


parts = [f'<rect x="1" y="1" width="{W - 2}" height="{H - 2}" rx="14" fill="{SKY}"/>']
k = 0
for r, (y, groups) in enumerate(zip(ROW_Y, ROWS)):
    for gx, n in zip(GROUP_X, groups):
        for i in range(n):
            parts.append(kid(gx + 14 + i * PITCH, y - 4, k))
            k += 1
# dashed box round the last row (one ten)
parts.append(f'<rect x="7" y="{ROW_Y[3] - 32}" width="{W - 14}" height="62" rx="4" fill="none" stroke="{INK}" stroke-width="2" stroke-dasharray="10 7"/>')
save('bai1_t3_q1_seats', W, H, parts)
