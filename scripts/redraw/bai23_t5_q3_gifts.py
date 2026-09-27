"""
Vở BT Toán 2, Bài 23 Tiết 5 Q3 — ba hộp quà ghi phép tính: nét riêng.
Giữ nội dung toán: hộp A (dẹt, không phải khối lập phương) "32 – 18 = 14",
hộp B (khối lập phương) "57 – 29 = 28", hộp C (dẹt) "50 – 16 = 44"; chữ A, B, C dưới hộp.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from kit_g2 import *

W, H = 900, 297
parts = []


def shade(c, k):
    c = c.lstrip('#')
    r, g, b = (int(c[i:i + 2], 16) for i in (0, 2, 4))
    return '#%02X%02X%02X' % tuple(max(0, min(255, int(v * k))) for v in (r, g, b))


def box(x, bottom, w, h, depth, body, ribbon, eq, letter, size=28):
    """front face x..x+w, bottom..bottom-h; receding up-right by depth"""
    dx, dy = depth * .62, -depth * .42
    top = bottom - h
    lid = min(28, h * .26)
    g = []
    # side and top faces
    g.append(f'<polygon points="{pts([(x + w, bottom), (x + w + dx, bottom + dy), (x + w + dx, top + dy), (x + w, top)])}" fill="{shade(body, .82)}" {st(2.6)}/>')
    g.append(f'<polygon points="{pts([(x, top), (x + dx, top + dy), (x + w + dx, top + dy), (x + w, top)])}" fill="{shade(body, 1.08)}" {st(2.6)}/>')
    # front face
    g.append(f'<rect x="{x}" y="{top}" width="{w}" height="{h}" fill="{body}" {st(2.6)}/>')
    # lid band
    g.append(f'<rect x="{x - 4}" y="{top}" width="{w + 4}" height="{lid}" fill="{shade(body, .92)}" {st(2.4)}/>')
    g.append(f'<polygon points="{pts([(x + w, top), (x + w + dx, top + dy), (x + w + dx, top + dy + lid), (x + w, top + lid)])}" fill="{shade(body, .74)}" {st(2.4)}/>')
    # ribbon: vertical band on the lid only (front text stays clear), band across the top
    rx = x + w * .5
    g.append(f'<rect x="{rx - 10}" y="{top}" width="20" height="{lid}" fill="{ribbon}" {st(2)}/>')
    g.append(f'<polygon points="{pts([(rx - 10, top), (rx - 10 + dx, top + dy), (rx + 10 + dx, top + dy), (rx + 10, top)])}" fill="{ribbon}" {st(2)}/>')
    g.append(f'<line x1="{x + dx * .5}" y1="{top + dy * .5}" x2="{x + w + dx * .5}" y2="{top + dy * .5}" stroke="{ribbon}" stroke-width="14"/>')
    # bow on top centre
    bx, by = rx + dx * .5, top + dy * .5
    for sx in (-1, 1):
        g.append(f'<path d="M{bx},{by} C{bx + sx * 12},{by - 34} {bx + sx * 46},{by - 26} {bx + sx * 40},{by - 4} C{bx + sx * 34},{by + 10} {bx + sx * 12},{by + 6} {bx},{by} Z" fill="{ribbon}" {st(2.4)}/>')
    g.append(f'<circle cx="{bx}" cy="{by - 2}" r="7" fill="{shade(ribbon, .85)}" {st(2.2)}/>')
    g.append(text(x + w / 2, top + lid + (h - lid) / 2 + size * .36, eq, size=size, weight=600))
    g.append(text(x + w / 2 + dx * .3, 288, letter, size=28, weight=600))
    return ''.join(g)


parts.append(box(8, 252, 186, 92, 110, '#FFE08A', RED, '32 – 18 = 14', 'A'))
parts.append(box(322, 252, 172, 172, 110, '#BFE3F7', PINK, '57 – 29 = 28', 'B', size=27))
parts.append(box(628, 252, 196, 92, 110, '#D9F0C8', PURPLE, '50 – 16 = 44', 'C'))

save('bai23_t5_q3_gifts', W, H, parts)
