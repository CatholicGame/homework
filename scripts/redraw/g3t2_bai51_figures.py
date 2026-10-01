"""
Vở BT Toán 3 Tập hai, Bài 51 (Diện tích của một hình. Xăng-ti-mét vuông):
hình học vẽ lại bằng SVG, đúng số ô vuông của sách (đếm ở 300 dpi).
  bai51_t1_q1_quads  tứ giác ABCD chứa tứ giác ABEG
  bai51_t1_q2_grid   hình A (31 ô) và hình B (23 ô) trên lưới
  bai51_t1_q3_mn     hình chữ nhật M (3 x 2 ô) cắt chéo, ghép thành tam giác N
  bai51_t1_q4_duck   chú vịt 11 ô
  bai51_t2_q2_grid   hình A (30 ô) và hình B (23 ô), ô 1 cm
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

F = 'grade3-workbook-2'
LINE = '#1BA3DD'
LIGHT = '#8FD3F2'
GRID = '#9AA0A6'
DARK = '#231F20'


def grid(x0, y0, cols, rows, c, over=0.0):
    """grey grid lines; `over` = how far lines run past the outer border"""
    s = []
    for i in range(cols + 1):
        x = x0 + i * c
        s.append(f'<line x1="{x}" y1="{y0 - over}" x2="{x}" y2="{y0 + rows * c + over}" stroke="{GRID}" stroke-width="1.2"/>')
    for j in range(rows + 1):
        y = y0 + j * c
        s.append(f'<line x1="{x0 - over}" y1="{y}" x2="{x0 + cols * c + over}" y2="{y}" stroke="{GRID}" stroke-width="1.2"/>')
    return s


def cells_outline(cells, x0, y0, c, sw=3.2):
    """outline (only the outer edges) of a set of (col,row) cells"""
    S = set(cells)
    segs = []
    for (i, j) in S:
        if (i, j - 1) not in S: segs.append((i, j, i + 1, j))
        if (i, j + 1) not in S: segs.append((i, j + 1, i + 1, j + 1))
        if (i - 1, j) not in S: segs.append((i, j, i, j + 1))
        if (i + 1, j) not in S: segs.append((i + 1, j, i + 1, j + 1))
    return [f'<line x1="{x0 + a * c}" y1="{y0 + b * c}" x2="{x0 + p * c}" y2="{y0 + q * c}" stroke="{LINE}" stroke-width="{sw}" stroke-linecap="square"/>'
            for a, b, p, q in segs]


def seg(x1, y1, x2, y2, col=LINE, sw=3.2):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{col}" stroke-width="{sw}" stroke-linecap="round"/>'


def dog_cells(notch):
    """figure A: head 3x3 at cols 0-2 rows 0-2 (optionally without the top-middle cell),
    neck col 7 rows 1-4, body cols 1-7 rows 3-4 plus cols 3-7 row 2, legs col 2 and col 6 row 5"""
    cells = [(i, j) for i in range(3) for j in range(3)]
    if notch:
        cells.remove((1, 0))
    cells += [(i, 2) for i in range(3, 8)]
    cells += [(7, 1)]
    cells += [(i, j) for i in range(1, 8) for j in (3, 4)]
    cells += [(2, 5), (6, 5)]
    return cells


def turtle_cells(hc):
    """figure B: head (hc,0), shell cols hc-1..hc+1 rows 1-6, flippers rows 2 and 5"""
    cells = [(hc, 0)]
    cells += [(i, j) for i in range(hc - 1, hc + 2) for j in range(1, 7)]
    cells += [(hc - 2, 2), (hc + 2, 2), (hc - 2, 5), (hc + 2, 5)]
    return cells


def draw_dog(x0, y0, c, notch):
    cells = dog_cells(notch)
    s = cells_outline(cells, x0, y0, c)
    # line under the head's first row pair: the book draws the head's bottom edge across row 2/3 and the snout line
    s.append(seg(x0, y0 + 2 * c, x0 + 3 * c, y0 + 2 * c))            # head / body joint line (row 1|2)
    s.append(seg(x0 + 3 * c, y0 + 2 * c, x0 + 3 * c, y0 + 3 * c))    # head right edge in row 2
    s.append(f'<ellipse cx="{x0 + 1.5 * c}" cy="{y0 + 2 * c}" rx="{0.5 * c}" ry="{0.27 * c}" fill="{WHITE}" stroke="{LINE}" stroke-width="2.6"/>')
    for ex in (0.5, 2.5):
        s.append(f'<circle cx="{x0 + ex * c}" cy="{y0 + 1.35 * c}" r="{0.11 * c}" fill="{LINE}"/>')
    return s


def draw_turtle(x0, y0, c, hc):
    cells = turtle_cells(hc)
    s = cells_outline(cells, x0, y0, c)
    L, R = hc - 1, hc + 2
    # inner shell lines
    for i in (hc, hc + 1):
        s.append(seg(x0 + i * c, y0 + 1 * c, x0 + i * c, y0 + 7 * c))
    for j in (2, 3, 4, 5, 6):
        s.append(seg(x0 + L * c, y0 + j * c, x0 + R * c, y0 + j * c))
    # flipper joints
    for j in (2, 5):
        s.append(seg(x0 + L * c, y0 + j * c, x0 + L * c, y0 + (j + 1) * c))
        s.append(seg(x0 + R * c, y0 + j * c, x0 + R * c, y0 + (j + 1) * c))
    # corner diagonals
    s.append(seg(x0 + L * c, y0 + c, x0 + hc * c, y0 + 2 * c))
    s.append(seg(x0 + R * c, y0 + c, x0 + (hc + 1) * c, y0 + 2 * c))
    s.append(seg(x0 + L * c, y0 + 7 * c, x0 + hc * c, y0 + 6 * c))
    s.append(seg(x0 + R * c, y0 + 7 * c, x0 + (hc + 1) * c, y0 + 6 * c))
    # eyes
    for ex in (0.35, 0.65):
        s.append(f'<circle cx="{x0 + (hc + ex) * c}" cy="{y0 + 0.5 * c}" r="{0.11 * c}" fill="{LINE}"/>')
    # claws on the flippers (small scallops)
    for j in (2, 5):
        for side, xx in ((1, x0 + (hc - 2) * c), (-1, x0 + (hc + 3) * c)):
            cy = y0 + (j + 0.5) * c
            k = 0.22 * c
            s.append(f'<path d="M{xx},{cy - 2 * k} q{side * 1.3 * k},{0.2 * k} {side * 0.7 * k},{k} q{side * 0.9 * k},{0.5 * k} {0},{k} q{side * 0.6 * k},{0.8 * k} {-side * 0.7 * k},{k * 1.1}" '
                     f'fill="none" stroke="{LINE}" stroke-width="2.2" stroke-linecap="round"/>')
    return s


def quads():
    W, H = 500, 190
    D, C = (40, 32), (460, 32)
    A, B = (140, 160), (350, 160)
    G, E = (196, 62), (292, 62)
    pts = lambda P: ' '.join(f'{x},{y}' for x, y in P)
    s = [f'<polygon points="{pts([A, B, C, D])}" fill="none" stroke="{DARK}" stroke-width="2.6" stroke-linejoin="round"/>',
         f'<polygon points="{pts([A, B, E, G])}" fill="none" stroke="{DARK}" stroke-width="2.6" stroke-linejoin="round"/>']
    for (x, y), n, dx, dy in ((D, 'D', -16, -4), (C, 'C', 16, -4), (A, 'A', -14, 20), (B, 'B', 14, 20), (G, 'G', -14, -8), (E, 'E', 14, -8)):
        s.append(text(x + dx, y + dy, n, size=19, weight=600, fill=DARK))
    save('bai51_t1_q1_quads', W, H, s, folder=F)


def grid_ab(name, cols, rows, c, notch, hc, unit_labels):
    x0, y0 = 14, 14
    W = x0 * 2 + cols * c + (34 if unit_labels else 0)
    H = y0 + rows * c + 44
    s = [f'<rect width="{W}" height="{H}" fill="{WHITE}"/>']
    s += grid(x0, y0, cols, rows, c)
    s += draw_dog(x0, y0, c, notch)
    s += draw_turtle(x0, y0, c, hc)
    by = y0 + rows * c + 32
    s.append(text(x0 + 4.5 * c, by, 'A', size=24, weight=700, fill=DARK, extra=' font-style="italic"'))
    s.append(text(x0 + (hc + 0.5) * c, by, 'B', size=24, weight=700, fill=DARK, extra=' font-style="italic"'))
    if unit_labels:
        xr = x0 + cols * c
        s.append(text(xr - 0.5 * c, y0 + rows * c + 22, '1 cm', size=16, weight=500, fill=DARK))
        s.append(text(xr + 16, y0 + (rows - 0.5) * c, '1 cm', size=16, weight=500, fill=DARK,
                      extra=f' transform="rotate(90 {xr + 16} {y0 + (rows - 0.5) * c - 5})"'))
    save(name, W, H, s, folder=F)


def mn():
    c = 60
    x0, y0 = 20, 20
    cols, rows = 9, 3
    W, H = x0 * 2 + cols * c, y0 + rows * c + 50
    s = grid(x0, y0 + 0, cols, rows, c, over=8)
    # M: rectangle cols 0-3, rows 1-3 (3 x 2 cells), with a light diagonal
    L, T, Rr, Bt = x0, y0 + c, x0 + 3 * c, y0 + 3 * c
    s.append(seg(L, T, Rr, Bt, col=LIGHT, sw=4))
    s.append(f'<rect x="{L}" y="{T}" width="{3 * c}" height="{2 * c}" fill="none" stroke="{LINE}" stroke-width="4"/>')
    # N: triangle base cols 4-8 on the bottom line, apex above col 6 top line
    bx0, bx1, ax, ay = x0 + 4 * c, x0 + 8 * c, x0 + 6 * c, y0
    s.append(seg(ax, ay, ax, Bt, col=LIGHT, sw=4))
    s.append(f'<polygon points="{bx0},{Bt} {ax},{ay} {bx1},{Bt}" fill="none" stroke="{LINE}" stroke-width="4" stroke-linejoin="round"/>')
    # arrow M -> N
    s.append(f'<path d="M{x0 + 3.2 * c},{y0 + 1.75 * c} Q{x0 + 3.55 * c},{y0 + 1.25 * c} {x0 + 3.9 * c},{y0 + 1.7 * c}" fill="none" stroke="{DARK}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<path d="M{x0 + 3.9 * c - 11},{y0 + 1.7 * c - 6} L{x0 + 3.9 * c + 2},{y0 + 1.7 * c + 3} L{x0 + 3.9 * c - 6},{y0 + 1.7 * c - 17}" fill="{DARK}" stroke="{DARK}" stroke-width="1.5" stroke-linejoin="round"/>')
    s.append(text(x0 + 1.5 * c, H - 12, 'M', size=24, weight=700, fill=DARK, extra=' font-style="italic"'))
    s.append(text(ax, H - 12, 'N', size=24, weight=700, fill=DARK, extra=' font-style="italic"'))
    save('bai51_t1_q3_mn', W, H, s, folder=F)


def duck():
    c = 48
    x0, y0 = 16, 16
    cols, rows = 5, 4
    W, H = x0 * 2 + cols * c, y0 * 2 + rows * c
    s = grid(x0, y0, cols, rows, c, over=10)
    cells = [(3, 0), (4, 0), (3, 1), (0, 2), (1, 2), (2, 2), (3, 2), (0, 3), (1, 3), (2, 3), (3, 3)]
    s += cells_outline(cells, x0, y0, c, sw=3.6)
    s.append(f'<ellipse cx="{x0 + 3.55 * c}" cy="{y0 + 0.45 * c}" rx="7" ry="5.5" fill="{LINE}"/>')
    save('bai51_t1_q4_duck', W, H, s, folder=F)


if __name__ == '__main__':
    quads()
    grid_ab('bai51_t1_q2_grid', 15, 7, 30, notch=False, hc=12, unit_labels=False)
    mn()
    duck()
    grid_ab('bai51_t2_q2_grid', 14, 7, 46, notch=True, hc=11, unit_labels=True)
