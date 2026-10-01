"""
Vở BT Toán 3 Tập hai, Bài 54 Tiết 2 Q3: ba cây (đa, gạo, xà cừ), mỗi cây một
tấm bảng ghi phép tính. Nét riêng; chỉ giữ tên cây và phép tính như sách.

    python scripts/redraw/g3t2_bai54_trees.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
TRUNK, TRUNK_D = '#A0714F', '#7A5236'


def trunk(x, y, w, h):
    return (f'<path d="M{x - w / 2},{y} C{x - w / 3},{y - h * .5} {x - w / 5},{y - h * .8} {x - w / 6},{y - h} '
            f'L{x + w / 6},{y - h} C{x + w / 5},{y - h * .8} {x + w / 3},{y - h * .5} {x + w / 2},{y} Z" '
            f'fill="{TRUNK}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')


def crown(x, y, rx, ry, col, dark):
    s = []
    for dx, dy, k in ((-0.55, 0.15, .62), (0.55, 0.15, .62), (0, -0.25, .7), (-0.3, -0.05, .6), (0.3, -0.05, .6)):
        s.append(f'<ellipse cx="{x + dx * rx:.1f}" cy="{y + dy * ry:.1f}" rx="{rx * k:.1f}" ry="{ry * k:.1f}" fill="{col}" stroke="{INK}" stroke-width="2.4"/>')
    for dx, dy, k in ((-0.55, 0.15, .62), (0.55, 0.15, .62), (0, -0.25, .7), (-0.3, -0.05, .6), (0.3, -0.05, .6)):
        s.append(f'<ellipse cx="{x + dx * rx:.1f}" cy="{y + dy * ry:.1f}" rx="{rx * k - 2.4:.1f}" ry="{ry * k - 2.4:.1f}" fill="{col}"/>')
    s.append(f'<ellipse cx="{x - rx * .25:.1f}" cy="{y - ry * .35:.1f}" rx="{rx * .25:.1f}" ry="{ry * .15:.1f}" fill="#FFFFFF" opacity=".25"/>')
    return ''.join(s)


def tag(x, y, s, left=True):
    w = 26 + len(s) * 11
    if left:
        d = f'M{x},{y} h{w} v28 h-{w} l-14,-14 Z'
        tx = x + w / 2
    else:
        d = f'M{x},{y} h-{w} v28 h{w} l14,-14 Z'
        tx = x - w / 2
    return (f'<path d="{d}" fill="#FFF4DF" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>'
            + text(tx, y + 20, s, size=17, weight=700))


def board(cx, y, s):
    w = 190
    return (f'<rect x="{cx - w / 2}" y="{y}" width="{w}" height="44" rx="10" fill="#E6F5FC" stroke="{INK}" stroke-width="2.4"/>'
            + text(cx, y + 30, s, size=22, weight=600))


def main():
    W, H = 680, 300
    GY = 238
    p = [f'<rect x="0" y="{GY - 6}" width="{W}" height="12" rx="6" fill="{GRASS}"/>']
    # cây đa: tán rộng, rễ phụ thả xuống
    x = 122
    p.append(trunk(x, GY, 70, 110))
    for dx in (-62, -44, 40, 58, 72):
        p.append(f'<path d="M{x + dx},{GY - 120} C{x + dx + 3},{GY - 70} {x + dx - 3},{GY - 40} {x + dx},{GY}" fill="none" stroke="{TRUNK_D}" stroke-width="3" stroke-linecap="round"/>')
    p.append(crown(x, GY - 150, 100, 70, '#3E9E5C', '#2E7A45'))
    p.append(tag(24, GY - 90, 'Cây đa', left=True))
    # cây gạo: thân cao, hoa đỏ
    x = 340
    p.append(trunk(x, GY, 40, 130))
    p.append(f'<path d="M{x},{GY - 110} L{x - 44},{GY - 150} M{x},{GY - 118} L{x + 46},{GY - 156}" stroke="{TRUNK}" stroke-width="7" stroke-linecap="round"/>')
    p.append(crown(x, GY - 170, 88, 58, '#7CC47F', '#5DAF5B'))
    import random
    random.seed(4)
    for _ in range(18):
        fx, fy = x + random.uniform(-75, 75), GY - 170 + random.uniform(-40, 30)
        p.append(f'<circle cx="{fx:.1f}" cy="{fy:.1f}" r="6" fill="{RED}" stroke="{INK}" stroke-width="1.2"/>')
    p.append(tag(266, GY - 70, 'Cây gạo', left=True))
    # cây xà cừ: thân thẳng, tán tròn dày
    x = 560
    p.append(trunk(x, GY, 44, 120))
    p.append(crown(x, GY - 160, 92, 66, '#52B36B', '#3E9E5C'))
    p.append(tag(664, GY - 76, 'Cây xà cừ', left=False))
    p.append(board(122, GY + 12, '3 000 + 5 000'))
    p.append(board(340, GY + 12, '2 800 + 4 000'))
    p.append(board(560, GY + 12, '7 200 + 600'))
    save('bai54_t2_q3_trees', W, H, p, folder=FOLDER)


if __name__ == '__main__':
    (ROOT / 'src/assets' / FOLDER).mkdir(parents=True, exist_ok=True)
    main()
