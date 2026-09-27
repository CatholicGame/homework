"""
Vở BT Toán 2, Bài 1 Tiết 1 Q1 (mẫu) — hàng táo: 2 tháp 10 quả + 5 quả lẻ (= 25).
Vẽ lại bằng nét riêng: táo đỏ tròn, lá xanh; chỉ giữ số tháp (mỗi tháp 1-2-3-4 = 10 quả)
và số quả lẻ. Các hàng khác (row2–4) dùng lại apple_row() ở đây.

    python scripts/redraw/bai1_t1_q1_row1.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

D = 32            # apple diameter (at 2x of the 300px book crop)
R = D / 2
PX = D + 2        # horizontal pitch inside a tower / between loose apples
PY = 28           # vertical pitch between tower rows
TOWER_GAP = 12
LOOSE_GAP = 22    # extra space between the last tower and the loose apples
SW = 3.2          # outline width (the picture is shown only ~34px tall)


def apple(cx, cy):
    r = R
    s = []
    # stem + leaf
    s.append(f'<path d="M{cx},{cy - r + 4} q1,-6 4,-9" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx + 3},{cy - r - 3} q7,-8 14,-3 q-6,8 -14,3 Z" fill="{GREEN}" stroke="{INK}" stroke-width="{SW * 0.7}" stroke-linejoin="round"/>')
    # body: two soft lobes on top, round bottom
    s.append(f'<path d="M{cx},{cy - r + 5} C{cx - 5},{cy - r - 1} {cx - r - 1},{cy - r + 1} {cx - r},{cy + 1} '
             f'C{cx - r + 1},{cy + r - 2} {cx - 6},{cy + r + 1} {cx},{cy + r - 2} '
             f'C{cx + 6},{cy + r + 1} {cx + r - 1},{cy + r - 2} {cx + r},{cy + 1} '
             f'C{cx + r + 1},{cy - r + 1} {cx + 5},{cy - r - 1} {cx},{cy - r + 5} Z" '
             f'fill="{RED}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{cx - r * 0.45}" cy="{cy - r * 0.2}" rx="{r * 0.18}" ry="{r * 0.3}" fill="#fff" opacity=".7"/>')
    return ''.join(s)


def apple_row(name, towers, loose, h):
    w = 600
    parts = []
    base = h - 3 - R           # centre y of the bottom row
    x = 3
    for _ in range(towers):
        # rows from the bottom: 4, 3, 2, 1 apples (10 in all); bottom first so upper apples sit on top
        for row, n in enumerate((4, 3, 2, 1)):
            x0 = x + R + row * PX / 2
            for k in range(n):
                parts.append(apple(x0 + k * PX, base - row * PY))
        x += 3 * PX + D + TOWER_GAP
    x += LOOSE_GAP - TOWER_GAP
    for k in range(loose):
        parts.append(apple(x + R + k * PX, base))
    save(name, w, h, parts)


if __name__ == '__main__':
    apple_row('bai1_t1_q1_row1', 2, 5, 134)
