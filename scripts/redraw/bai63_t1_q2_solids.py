"""
Vở BT Toán 2, Bài 63 Tiết 1 Q2 — bốn khối ghi số: nét riêng.
Giữ nội dung toán: từ trái sang phải khối lập phương 523, khối trụ 425,
khối cầu 385, khối hộp chữ nhật (dựng đứng) 268.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 193
SW = 3


def shade(c, k):
    c = c.lstrip('#'); r, g, b = (int(c[i:i + 2], 16) for i in (0, 2, 4))
    f = lambda v: max(0, min(255, int(v * k)))
    return f'#{f(r):02X}{f(g):02X}{f(b):02X}'


def prism(x, y, w, h, d, col, lab):
    """front face top-left x,y; depth offset d (up-right)"""
    s = [f'<path d="M{x},{y} L{x + d},{y - d * 0.8} L{x + w + d},{y - d * 0.8} L{x + w},{y} Z" fill="{shade(col, 1.12)}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{x + w},{y} L{x + w + d},{y - d * 0.8} L{x + w + d},{y + h - d * 0.8} L{x + w},{y + h} Z" fill="{shade(col, 0.82)}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{x + 10},{y + 12} L{x + 10},{y + 40}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>',
         text(x + w / 2, y + h / 2 + 13, lab, size=38, weight=600)]
    return '\n'.join(s)


def cylinder(cx, top, rx, ry, h, col, lab):
    s = [f'<path d="M{cx - rx},{top} L{cx - rx},{top + h} A{rx},{ry} 0 0 0 {cx + rx},{top + h} L{cx + rx},{top} Z" fill="{col}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>',
         f'<path d="M{cx + rx - 18},{top + 14} L{cx + rx - 18},{top + h + 4}" stroke="{shade(col, 0.85)}" stroke-width="12" opacity=".7"/>',
         f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{shade(col, 1.12)}" stroke="{INK}" stroke-width="{SW}"/>',
         f'<path d="M{cx - rx + 12},{top + 22} L{cx - rx + 12},{top + 60}" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".55"/>',
         text(cx, top + h / 2 + 30, lab, size=38, weight=600)]
    return '\n'.join(s)


def sphere(cx, cy, r, col, lab):
    s = [f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{col}" stroke="{INK}" stroke-width="{SW}"/>',
         f'<path d="M{cx - r},{cy + 14} A{r},{r * 0.28} 0 0 0 {cx + r},{cy + 14}" fill="none" stroke="{shade(col, 0.8)}" stroke-width="2.5"/>',
         f'<ellipse cx="{cx - r * 0.42}" cy="{cy - r * 0.48}" rx="{r * 0.2}" ry="{r * 0.11}" fill="#fff" opacity=".6" transform="rotate(-35 {cx - r * 0.42} {cy - r * 0.48})"/>',
         text(cx, cy - 4, lab, size=38, weight=600)]
    return '\n'.join(s)


parts = [f'<ellipse cx="{x}" cy="186" rx="{rx}" ry="5" fill="#E6EEF2"/>' for x, rx in ((100, 100), (350, 62), (590, 80), (832, 50))]
parts.append(prism(12, 64, 128, 120, 46, '#FFB86B', '523'))
parts.append(cylinder(350, 40, 58, 17, 130, '#8FD19E', '425'))
parts.append(sphere(590, 104, 78, '#9FD3F5', '385'))
parts.append(prism(782, 42, 78, 142, 28, '#F7A1C4', '268'))
save('bai63_t1_q2_solids', W, H, parts)
