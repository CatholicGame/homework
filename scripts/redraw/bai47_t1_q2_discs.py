"""
Vở BT Toán 2, Bài 47 Tiết 1 Q2 — chồng đĩa lồng vào 2 cọc: nét riêng.
Giữ nội dung toán: chồng 4 đĩa (từ trên xuống) xám, xanh, xám, xanh cắm trên 2 cọc;
4 đĩa lựa chọn A xám 2 lỗ, B xanh 1 lỗ, C xám 1 lỗ, D xanh 2 lỗ (đáp án D).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 800, 270
G, B = '#C9CED4', '#7CCBF0'


def disc(cx, top, w, t, col, holes, sw=3):
    """a flat disc (short cylinder): top ellipse centre y = top, thickness t"""
    rx, ry = w / 2, w * .13
    s = [f'<path d="M{cx - rx},{top} L{cx - rx},{top + t} A{rx},{ry} 0 0 0 {cx + rx},{top + t} L{cx + rx},{top} Z" fill="{mix(col, -.1)}" {st(sw)}/>',
         f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{mix(col, .35)}" {st(sw)}/>']
    xs = [cx] if holes == 1 else [cx - w * .15, cx + w * .15]
    for x in xs:
        s.append(f'<ellipse cx="{x:.1f}" cy="{top}" rx="{w * .075:.1f}" ry="{w * .045:.1f}" fill="{WHITE}" {st(2.4)}/>')
    return '\n'.join(s)


parts = []
# stack: bottom first
cx, w, t = 400, 132, 22
tops = [118, 94, 70, 46]            # bottom .. top
cols = [B, G, B, G]
for i, (tp, c) in enumerate(zip(tops, cols)):
    rx, ry = w / 2, w * .13
    parts.append(f'<path d="M{cx - rx},{tp} L{cx - rx},{tp + t} A{rx},{ry} 0 0 0 {cx + rx},{tp + t} L{cx + rx},{tp} Z" fill="{c}" {st()}/>')
parts.append(f'<ellipse cx="{cx}" cy="46" rx="{w / 2}" ry="{w * .13:.1f}" fill="{mix(G, .35)}" {st()}/>')
for px in (cx - 20, cx + 20):
    parts.append(cyl_up(px, 8, 15, 40, fill=B, sw=2.6, ry=3.5, shine=False))
for x, col, holes, lab in ((70, G, 2, 'A'), (290, B, 1, 'B'), (510, G, 1, 'C'), (730, B, 2, 'D')):
    parts.append(disc(x, 180, 132, 20, col, holes))
    parts.append(text(x, 262, lab, size=26, weight=600))
save('bai47_t1_q2_discs', W, H, parts)
