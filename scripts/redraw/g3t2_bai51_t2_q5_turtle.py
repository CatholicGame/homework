"""
Vở BT Toán 3 Tập hai, Bài 51 Tiết 2 Q5 — rô-bốt rùa có mặt bên là lưới 5 x 4 ô (mỗi ô 1 cm2),
hai bạn kiến đang sơn xen kẽ xanh / trắng: nét riêng.
Giữ nội dung toán: lưới 5 cột x 4 hàng; các ô đã sơn xanh giống sách (hàng dưới: cột 2, 4;
hàng 3: cột 3, 5 và một phần cột 1; hàng 2: một phần cột 4), còn lại chưa sơn.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

F = 'grade3-workbook-2'
PAINT = '#5CC3EE'
C = 58
GX, GY = 190, 70
COLS, ROWS = 5, 4


def cell(i, j):
    return GX + i * C, GY + j * C


def ant(x, y, flip=1, s=1.0):
    """x,y = belly centre; flip=1 faces right"""
    D = '#4B4650'
    k = s
    p = []
    for dx, dy in ((-10, 0), (4, 2), (16, 1)):
        p.append(f'<path d="M{x + flip * dx * k},{y + 4 * k} q{flip * -6 * k},{12 * k} {flip * -10 * k},{22 * k}" fill="none" stroke="{D}" stroke-width="{2.4 * k}" stroke-linecap="round"/>')
    p.append(f'<ellipse cx="{x - flip * 20 * k}" cy="{y + 2 * k}" rx="{15 * k}" ry="{11 * k}" fill="{D}" stroke="{INK}" stroke-width="2"/>')
    p.append(f'<ellipse cx="{x}" cy="{y}" rx="{9 * k}" ry="{7 * k}" fill="{D}" stroke="{INK}" stroke-width="2"/>')
    hx, hy = x + flip * 16 * k, y - 10 * k
    p.append(f'<path d="M{hx},{hy - 8 * k} q{flip * 2 * k},{-14 * k} {flip * 12 * k},{-18 * k}" fill="none" stroke="{D}" stroke-width="2" stroke-linecap="round"/>')
    p.append(f'<path d="M{hx - flip * 4 * k},{hy - 8 * k} q{flip * -4 * k},{-12 * k} {flip * 4 * k},{-20 * k}" fill="none" stroke="{D}" stroke-width="2" stroke-linecap="round"/>')
    p.append(f'<circle cx="{hx}" cy="{hy}" r="{11 * k}" fill="{D}" stroke="{INK}" stroke-width="2"/>')
    p.append(f'<circle cx="{hx + flip * 4 * k}" cy="{hy - 3 * k}" r="{4 * k}" fill="{WHITE}"/><circle cx="{hx + flip * 5 * k}" cy="{hy - 3 * k}" r="{2 * k}" fill="{INK}"/>')
    p.append(f'<path d="M{hx + flip * 2 * k},{hy + 5 * k} q{flip * 4 * k},{3 * k} {flip * 8 * k},{0}" fill="none" stroke="{WHITE}" stroke-width="1.6" stroke-linecap="round"/>')
    return '\n'.join(p)


def roller(x1, y1, x2, y2):
    """handle from (x1,y1) to the roller centre (x2,y2)"""
    return (f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>'
            f'<rect x="{x2 - 7}" y="{y2 - 17}" width="14" height="34" rx="6" fill="{PAINT}" stroke="{INK}" stroke-width="2"/>')


def turtle():
    W, H = 630, 350
    s = []
    gw, gh = COLS * C, ROWS * C
    # tail
    # head + neck on the right
    hx, hy = GX + gw + 60, GY + gh * 0.45
    s.append(f'<path d="M{GX + gw - 4},{hy + 20} q30,-4 40,-18 l0,50 q-18,-6 -40,-4 z" fill="#8FA7BD" stroke="{INK}" stroke-width="2.4" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{hx}" cy="{hy}" rx="52" ry="42" fill="#9DB6CC" stroke="{INK}" stroke-width="2.6"/>')
    s.append(f'<circle cx="{hx + 12}" cy="{hy - 10}" r="8" fill="{WHITE}" stroke="{INK}" stroke-width="2"/><circle cx="{hx + 14}" cy="{hy - 10}" r="4" fill="{INK}"/>')
    s.append(f'<circle cx="{hx + 36}" cy="{hy - 8}" r="7" fill="{WHITE}" stroke="{INK}" stroke-width="2"/><circle cx="{hx + 38}" cy="{hy - 8}" r="3.5" fill="{INK}"/>')
    s.append(f'<path d="M{hx + 8},{hy + 16} q18,14 38,0" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<circle cx="{hx - 6}" cy="{hy + 8}" r="6" fill="{PINK}" opacity=".6"/>')
    # wheels
    for wx in (GX + 36, GX + 82, GX + gw - 82, GX + gw - 36):
        s.append(f'<circle cx="{wx}" cy="{GY + gh + 22}" r="20" fill="#5B5763" stroke="{INK}" stroke-width="2.4"/>')
        s.append(f'<circle cx="{wx}" cy="{GY + gh + 22}" r="8" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>')
    # antenna + little claw arm on the top
    s.append(f'<line x1="{GX + gw - 60}" y1="{GY}" x2="{GX + gw - 50}" y2="{GY - 30}" stroke="{INK}" stroke-width="3"/>')
    s.append(f'<circle cx="{GX + gw - 50}" cy="{GY - 34}" r="7" fill="{RED}" stroke="{INK}" stroke-width="2"/>')
    # the grid shell: white cells, some already painted blue
    s.append(f'<rect x="{GX}" y="{GY}" width="{gw}" height="{gh}" fill="{WHITE}"/>')
    for (i, j) in ((1, 3), (3, 3), (2, 2), (4, 2)):
        x, y = cell(i, j)
        s.append(f'<rect x="{x}" y="{y}" width="{C}" height="{C}" fill="{PAINT}"/>')
    # half-painted cells (the ants are still painting them)
    x, y = cell(0, 2)
    s.append(f'<path d="M{x},{y + 22} q16,-10 30,-6 q14,4 28,-6 V{y + C} H{x} z" fill="{PAINT}"/>')
    x, y = cell(3, 1)
    s.append(f'<path d="M{x + 18},{y + C} q6,-22 20,-30 q10,-6 20,-18 V{y + C} z" fill="{PAINT}"/>')
    for i in range(COLS + 1):
        s.append(f'<line x1="{GX + i * C}" y1="{GY}" x2="{GX + i * C}" y2="{GY + gh}" stroke="{INK}" stroke-width="2.2"/>')
    for j in range(ROWS + 1):
        s.append(f'<line x1="{GX}" y1="{GY + j * C}" x2="{GX + gw}" y2="{GY + j * C}" stroke="{INK}" stroke-width="2.2"/>')
    s.append(f'<rect x="{GX}" y="{GY}" width="{gw}" height="{gh}" fill="none" stroke="{INK}" stroke-width="3"/>')
    # ant on the ground painting the first cell of row 3
    s.append(roller(126, GY + 2.55 * C, GX - 10, GY + 2.5 * C))
    s.append(ant(110, GY + 2.9 * C, flip=1, s=1.25))
    # ant in a basket hanging from a rope, painting row 2
    bx, by = GX + 1.35 * C, GY + 1.12 * C
    s.append(f'<line x1="{bx + 30}" y1="0" x2="{bx + 30}" y2="{by - 30}" stroke="{INK}" stroke-width="2.4"/>')
    s.append(f'<path d="M{bx + 30},{by - 30} L{bx},{by} M{bx + 30},{by - 30} L{bx + 60},{by}" stroke="{INK}" stroke-width="2"/>')
    s.append(ant(bx + 30, by - 4, flip=1, s=0.9))
    s.append(roller(bx + 44, by - 10, GX + 3.3 * C, GY + 1.6 * C))
    s.append(f'<rect x="{bx - 4}" y="{by}" width="68" height="30" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2.4"/>')
    for k in range(1, 5):
        s.append(f'<line x1="{bx - 4 + k * 13.6}" y1="{by + 3}" x2="{bx - 4 + k * 13.6}" y2="{by + 27}" stroke="{ORANGE}" stroke-width="2"/>')
    save('bai51_t2_q5_turtle', W, H, s, folder=F)


if __name__ == '__main__':
    turtle()
