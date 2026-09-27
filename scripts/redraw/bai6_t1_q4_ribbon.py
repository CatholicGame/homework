"""
Vở BT Toán 2, Bài 6 Tiết 1 Q4 — "dải ruy băng": vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: dải ruy băng ghi 4 số theo thứ tự từ trái sang phải
39, 23, 56, 34 (hai số đầu thấp hơn, hai số sau cao hơn như sách).

    python scripts/redraw/bai6_t1_q4_ribbon.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *
import math

W, H = 700, 122
X0, X1 = 92, 608          # band ends
HALF = 27                 # half height of the band
BAND, BAND_D, BAND_DD = '#FFC6DC', '#F29BBE', '#D9779F'


def yc(x):
    t = (x - X0) / (X1 - X0)
    return 58 + 14 * math.cos(math.pi * t) + 3 * math.sin(2 * math.pi * t)


def band():
    xs = [X0 + i * (X1 - X0) / 60 for i in range(61)]
    top = [(x, yc(x) - HALF) for x in xs]
    bot = [(x, yc(x) + HALF) for x in reversed(xs)]
    pts = ' '.join(f'{x:.1f},{y:.1f}' for x, y in top + bot)
    return pts, top, bot


def tail(x_end, y_mid, dx, dy):
    """Ribbon end behind the band: from x_end out by dx, shifted by dy, with a V notch."""
    xo = x_end + dx
    xin = x_end - (14 if dx < 0 else -14)
    notch = xo + (22 if dx < 0 else -22)
    y0, y1 = y_mid - HALF + dy, y_mid + HALF + dy
    body = (f'<path d="M{xin},{y0} L{xo},{y0} L{notch},{(y0 + y1) / 2} L{xo},{y1} L{xin},{y1} Z" '
            f'fill="{BAND_D}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    # small darker fold where the end tucks under the band
    edge_y = y_mid + HALF if dy > 0 else y_mid - HALF
    far_y = y1 if dy > 0 else y0
    fold = (f'<path d="M{x_end},{edge_y} L{xin},{far_y} L{x_end},{far_y} Z" '
            f'fill="{BAND_DD}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
    return body + fold


pts, top, bot = band()
parts = [
    tail(X0, yc(X0), -78, 12),
    tail(X1, yc(X1), 78, 12),
    f'<polygon points="{pts}" fill="{BAND}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
    # a thin stitched line along each edge
    '<polyline points="' + ' '.join(f'{x:.1f},{y + 7:.1f}' for x, y in top[1:-1]) +
    f'" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>',
    '<polyline points="' + ' '.join(f'{x:.1f},{y - 7:.1f}' for x, y in bot[1:-1]) +
    f'" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="7 6" stroke-linecap="round"/>',
]
for x, n in ((125, '39'), (262, '23'), (422, '56'), (562, '34')):
    parts.append(text(x, round(yc(x) + 9, 1), n, size=26, weight=700))

save('bai6_t1_q4_ribbon', W, H, parts)
