"""
Bộ vẽ chung cho SGK Toán 4 (src/assets/grade4-textbook): hình học, tia số, biểu đồ, lưới ô vuông.
Nét rõ, đậm như vở bài tập lớp 2, 3: viền INK 3px, chữ Quicksand, màu tươi nhẹ.

    import sys; sys.path.insert(0, 'scripts/redraw')
    from kit_g4t import *
    parts = poly([(40, 40), (200, 40), (200, 140)], labels='ABC', sides=['6cm', '4cm', None])
    out('bai1_q4_shapes', 400, 200, parts)

Mọi hàm trả về list chuỗi SVG; out() ghi file vào src/assets/grade4-textbook/<tên>.svg (kèm ảnh xem thử trong
scripts/redraw/_preview/). Tên file: bai<N>_q<câu>_<mô tả>.svg (N = số bài trong grade4Textbook/catalog.js).
"""
import math
from common import INK, FONT, text, save, SKY, SKY_D, GRASS, GRASS_D, YELLOW, ORANGE, RED, PINK, GREEN, TEAL, BLUE, PURPLE, GREY, GREY_L, CREAM, BROWN, WHITE

SW = 3            # nét hình
FILL = '#EAF4FD'  # nền nhạt trong hình phẳng
ACC = '#2F7FD1'   # màu nhấn (đường cao, đường chéo, cột biểu đồ)


def out(name, w, h, parts, bg=None):
    save(name, w, h, parts, bg=bg, folder='grade4-textbook')


def line(p, q, w=SW, color=INK, dash=None, cap='round'):
    d = f' stroke-dasharray="{dash}"' if dash else ''
    return f'<line x1="{p[0]:.1f}" y1="{p[1]:.1f}" x2="{q[0]:.1f}" y2="{q[1]:.1f}" stroke="{color}" stroke-width="{w}" stroke-linecap="{cap}"{d}/>'


def dot(p, r=4.5, color=INK):
    return f'<circle cx="{p[0]:.1f}" cy="{p[1]:.1f}" r="{r}" fill="{color}"/>'


def _centroid(pts):
    return (sum(p[0] for p in pts) / len(pts), sum(p[1] for p in pts) / len(pts))


def vlabel(p, s, center, gap=20, size=22):
    """Tên đỉnh đặt ra phía ngoài hình (xa tâm)."""
    dx, dy = p[0] - center[0], p[1] - center[1]
    d = math.hypot(dx, dy) or 1
    x, y = p[0] + dx / d * gap, p[1] + dy / d * gap
    return text(round(x, 1), round(y + size * 0.36, 1), s, size=size, weight=700)


def slabel(p, q, s, center, gap=18, size=19, color=INK):
    """Số đo cạnh đặt giữa cạnh, ra phía ngoài hình."""
    mx, my = (p[0] + q[0]) / 2, (p[1] + q[1]) / 2
    nx, ny = -(q[1] - p[1]), q[0] - p[0]
    d = math.hypot(nx, ny) or 1
    nx, ny = nx / d, ny / d
    if (mx + nx - center[0]) ** 2 + (my + ny - center[1]) ** 2 < (mx - center[0]) ** 2 + (my - center[1]) ** 2:
        nx, ny = -nx, -ny
    # Cạnh đứng / xiên: chữ neo một đầu (không đè lên nét); cạnh nằm: chữ giữa cạnh.
    anchor = 'middle' if abs(nx) < 0.45 else ('start' if nx > 0 else 'end')
    g = gap * 0.55 if anchor != 'middle' else gap
    return text(round(mx + nx * g, 1), round(my + ny * g + size * 0.36, 1), s, size=size, weight=600, fill=color, anchor=anchor)


def poly(pts, labels=None, sides=None, fill=FILL, close=True, w=SW, center=None):
    """Đa giác (hoặc đường gấp khúc close=False). labels: chuỗi/list tên đỉnh; sides: số đo từng cạnh (None: bỏ)."""
    c = center or _centroid(pts)
    path = ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts)
    tag = 'polygon' if close else 'polyline'
    f = fill if close else 'none'
    parts = [f'<{tag} points="{path}" fill="{f}" stroke="{INK}" stroke-width="{w}" stroke-linejoin="round"/>']
    n = len(pts)
    if sides:
        for i, s in enumerate(sides):
            if s and (close or i < n - 1):
                parts.append(slabel(pts[i], pts[(i + 1) % n], s, c))
    if labels:
        for p, s in zip(pts, labels):
            if s:
                parts.append(vlabel(p, s, c))
    return parts


def right_mark(v, a, b, size=14, color=INK):
    """Kí hiệu góc vuông ở đỉnh v, giữa hai tia v→a và v→b."""
    def u(p):
        d = math.hypot(p[0] - v[0], p[1] - v[1]) or 1
        return ((p[0] - v[0]) / d, (p[1] - v[1]) / d)
    ua, ub = u(a), u(b)
    p1 = (v[0] + ua[0] * size, v[1] + ua[1] * size)
    p2 = (v[0] + (ua[0] + ub[0]) * size, v[1] + (ua[1] + ub[1]) * size)
    p3 = (v[0] + ub[0] * size, v[1] + ub[1] * size)
    return f'<polyline points="{p1[0]:.1f},{p1[1]:.1f} {p2[0]:.1f},{p2[1]:.1f} {p3[0]:.1f},{p3[1]:.1f}" fill="none" stroke="{color}" stroke-width="2"/>'


def number_line(x0, y, x1, ticks, labels, size=19, arrow=True, box_for=None):
    """Tia số: ticks = list hoành độ vạch; labels = chữ dưới mỗi vạch ('' không ghi, '?' ô trống để điền)."""
    parts = [line((x0, y), (x1, y))]
    if arrow:
        parts.append(f'<polygon points="{x1 + 14},{y} {x1},{y - 7} {x1},{y + 7}" fill="{INK}"/>')
    for x, s in zip(ticks, labels):
        parts.append(line((x, y - 9), (x, y + 9), w=2.5))
        if s == '?':
            parts.append(f'<rect x="{x - 26}" y="{y + 16}" width="52" height="30" rx="6" fill="#fff" stroke="{ACC}" stroke-width="2" stroke-dasharray="5 4"/>')
        elif s:
            parts.append(text(x, y + 36, s, size=size, weight=600))
    return parts


def grid(x, y, cols, rows, cell, color='#B9D3EA', w=1.2):
    """Lưới ô vuông (giấy kẻ ô)."""
    parts = []
    for i in range(cols + 1):
        parts.append(line((x + i * cell, y), (x + i * cell, y + rows * cell), w=w, color=color, cap='butt'))
    for j in range(rows + 1):
        parts.append(line((x, y + j * cell), (x + cols * cell, y + j * cell), w=w, color=color, cap='butt'))
    return parts


def bar_chart(x, y, w, h, values, names, vmax, step, unit_y='', unit_x='', bar_color=ACC, show_values=True, ticks=None, title=None):
    """Biểu đồ cột như sách: trục đứng có vạch số, lưới ngang, cột, tên dưới cột, số trên đỉnh cột (show_values)."""
    parts = []
    if title:
        parts.append(text(x + w / 2, y - 30, title, size=18, weight=700))
    if unit_y:
        parts.append(text(x - 8, y - 8, unit_y, size=16, anchor='end'))
    vals = ticks or list(range(0, vmax + 1, step))
    for v in vals:
        yy = y + h - v / vmax * h
        parts.append(line((x, yy), (x + w, yy), w=1.2, color='#C9D6E3', cap='butt'))
        parts.append(text(x - 10, yy + 6, str(v), size=16, anchor='end'))
    n = len(values)
    slot = w / n
    bw = slot * 0.45
    for i, (v, s) in enumerate(zip(values, names)):
        cx = x + slot * (i + 0.5)
        if v is not None and v > 0:
            top = y + h - v / vmax * h
            parts.append(f'<rect x="{cx - bw / 2:.1f}" y="{top:.1f}" width="{bw:.1f}" height="{y + h - top:.1f}" fill="{bar_color}" stroke="{INK}" stroke-width="2"/>')
            if show_values is True:
                parts.append(text(cx, top - 8, str(v), size=17, weight=700))
        parts.append(text(cx, y + h + 26, s, size=17, weight=600))
    parts.append(line((x, y - 4), (x, y + h), w=2.5))
    parts.append(line((x, y + h), (x + w + 6, y + h), w=2.5))
    if unit_x:
        parts.append(text(x + w + 10, y + h + 26, unit_x, size=16, anchor='start'))
    return parts


def frac_svg(x, y, a, b, size=22, color=INK):
    """Phân số a/b vẽ trong hình (tử trên, gạch, mẫu dưới); (x, y) = giữa gạch ngang."""
    wbar = size * 0.7 * max(len(str(a)), len(str(b))) + 6
    return [text(x, y - 6, str(a), size=size, weight=700, fill=color),
            line((x - wbar / 2, y), (x + wbar / 2, y), w=2, color=color),
            text(x, y + size * 0.95, str(b), size=size, weight=700, fill=color)]
