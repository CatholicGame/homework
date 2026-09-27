"""
Vở BT Toán 2, Bài 64 Q1 — giá sách 3 ngăn: nét riêng.
Giữ nội dung toán: số sách mỗi loại (xếp xoè, cuốn cuối mỗi nhóm lộ hết bìa):
  ngăn 1: 9 Tiếng Việt 2, 3 Tự nhiên và Xã hội 2
  ngăn 2: 6 Toán 2, 6 Tiếng Việt 2
  ngăn 3: 5 Tự nhiên và Xã hội 2, 4 Toán 2
=> Toán 2: 10, Tiếng Việt 2: 15, Tự nhiên và Xã hội 2: 8.
Mỗi loại một màu bìa riêng, chữ đầu tên sách vẫn đọc được trên phần lộ ra.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 755, 653
STRIP, FULL, BH = 40, 128, 176
SUBJ = {
    'toan': ('#FFB45E', '#FFD9A6', ['Toán'], 'To'),
    'tv':   ('#7FCB8E', '#C4EBCB', ['Tiếng Việt'], 'Tiế'),
    'tn':   ('#B9A7F0', '#E0D8FB', ['Tự nhiên', 'và Xã hội'], 'Tự'),
}
ROWS = [[('tv', 9), ('tn', 3)], [('toan', 6), ('tv', 6)], [('tn', 5), ('toan', 4)]]
SHELF_Y = [212, 424, 636]      # top of each shelf board (books stand on it)
FX0, FX1 = 22, 733


def book(x, y, kind, full):
    col, light, title, short = SUBJ[kind]
    s = [f'<rect x="{x}" y="{y}" width="{FULL}" height="{BH}" rx="5" fill="{col}" stroke="{INK}" stroke-width="2.6"/>',
         f'<path d="M{x + 2},{y + BH - 50} Q{x + 40},{y + BH - 76} {x + 76},{y + BH - 48} T{x + FULL - 2},{y + BH - 56} L{x + FULL - 2},{y + BH - 4} L{x + 2},{y + BH - 4} Z" fill="{light}"/>',
         f'<line x1="{x + 6}" y1="{y + 4}" x2="{x + 6}" y2="{y + BH - 4}" stroke="{INK}" stroke-width="1.4" opacity=".35"/>']
    if full:
        if len(title) == 1:
            s.append(text(x + FULL / 2, y + 48, title[0], size=25 if len(title[0]) < 6 else 21, weight=700, fill=INK))
        else:
            s.append(text(x + FULL / 2, y + 36, title[0], size=19, weight=700))
            s.append(text(x + FULL / 2, y + 58, title[1], size=19, weight=700))
        s.append(f'<circle cx="{x + FULL / 2}" cy="{y + 96}" r="21" fill="#fff" stroke="{INK}" stroke-width="2.4"/>')
        s.append(text(x + FULL / 2, y + 106, '2', size=30, weight=700))
    else:
        s.append(text(x + 8, y + 46, short, size=20, weight=700, anchor='start'))
    return ''.join(s)


parts = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="18" fill="#E3E7EC" stroke="{INK}" stroke-width="3"/>',
         f'<rect x="{FX0}" y="16" width="{FX1 - FX0}" height="{H - 26}" rx="6" fill="#F6F8FA" stroke="{INK}" stroke-width="2"/>']
for row, sy in zip(ROWS, SHELF_Y):
    total = sum((n - 1) * STRIP + FULL for _, n in row) + 22 * (len(row) - 1)
    x = (FX0 + FX1) / 2 - total / 2
    y = sy - BH
    for kind, n in row:
        for i in range(n):
            parts.append(book(x + i * STRIP, y, kind, i == n - 1))
        x += (n - 1) * STRIP + FULL + 22
    parts.append(f'<rect x="{FX0 - 4}" y="{sy}" width="{FX1 - FX0 + 8}" height="12" rx="3" fill="#C9D1D9" stroke="{INK}" stroke-width="2.6"/>')
save('bai64_q1_books', W, H, parts)
