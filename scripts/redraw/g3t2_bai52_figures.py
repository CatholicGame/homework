"""
Vở BT Toán 3 Tập hai, Bài 52 (Diện tích hình chữ nhật, diện tích hình vuông):
mọi hình của bài, vẽ lại bằng nét riêng. Chỉ giữ nội dung toán (kích thước,
số ô vuông 1 cm², tên điểm, màu các phần), không đồ theo sách.

    python scripts/redraw/g3t2_bai52_figures.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
DARK = '#231F20'
LIGHT = '#B8E5FC'
CYAN = '#00AEEF'
SKYB = '#6DCFF6'      # xanh nhạt của sách
DEEP = '#0093D0'      # xanh đậm
GRAYF = '#BCBEC0'     # xám
GRID = '#9AA3AD'


def lab(x, y, s, size=20, anchor='middle', weight=500, fill=DARK, extra=''):
    return text(x, y, s, size=size, weight=weight, fill=fill, anchor=anchor, extra=extra)


def rect(x, y, w, h, fill='none', stroke=DARK, sw=2.5, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{extra}/>'


def line(x1, y1, x2, y2, stroke=DARK, sw=2.5, extra=''):
    return f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{stroke}" stroke-width="{sw}" stroke-linecap="round"{extra}/>'


def cm_marks(x, y, u, horiz=True, label='1 cm'):
    """the book's small bracket showing one square is 1 cm"""
    if horiz:
        return (f'<path d="M{x},{y - 6} V{y} H{x + u} V{y - 6} M{x + u / 2},{y} v6" fill="none" stroke="{DARK}" stroke-width="1.8"/>'
                + lab(x + u / 2, y + 26, label, 18))
    return (f'<path d="M{x + 6},{y} H{x} V{y + u} H{x + 6} M{x},{y + u / 2} h-6" fill="none" stroke="{DARK}" stroke-width="1.8"/>'
            + lab(x - 10, y + u / 2 + 6, label, 18, anchor='end'))


# ── Tiết 1 Q1: hình chữ nhật ABEG, đoạn DC chia thành ABCD và DCEG ────────────
def t1_q1():
    u = 44
    x0, y0 = 80, 44
    W, H = x0 + 9 * u + 60, y0 + 7 * u + 40
    p = [rect(x0, y0, 9 * u, 7 * u, fill='#FFFFFF'),
         line(x0, y0 + 2 * u, x0 + 9 * u, y0 + 2 * u),
         lab(x0 - 14, y0 + 4, 'A', anchor='end'), lab(x0 + 9 * u + 14, y0 + 4, 'B', anchor='start'),
         lab(x0 - 14, y0 + 2 * u + 7, 'D', anchor='end'), lab(x0 + 9 * u + 14, y0 + 2 * u + 7, 'C', anchor='start'),
         lab(x0 - 14, y0 + 7 * u + 10, 'G', anchor='end'), lab(x0 + 9 * u + 14, y0 + 7 * u + 10, 'E', anchor='start'),
         lab(x0 + 4.5 * u, y0 - 12, '9 cm'),
         lab(x0 - 14, y0 + u + 7, '2 cm', anchor='end'),
         lab(x0 - 14, y0 + 4.5 * u + 7, '5 cm', anchor='end')]
    save('bai52_t1_q1_rect', W, H, p, folder=FOLDER)


# ── Tiết 1 Q3: miếng sô-cô-la 8 × 8 ô, bốn phần của bốn bạn ─────────────────
def cricket(cx, cy):
    s = [f'<path d="M{cx - 4},{cy - 12} q-6,-12 -14,-12 M{cx + 2},{cy - 12} q4,-12 12,-14" fill="none" stroke="{INK}" stroke-width="2" stroke-linecap="round"/>',
         f'<ellipse cx="{cx + 4}" cy="{cy + 4}" rx="15" ry="10" fill="#6B5B4E" stroke="{INK}" stroke-width="2"/>',
         f'<path d="M{cx - 2},{cy + 8} l-10,10 M{cx + 10},{cy + 10} l6,10" stroke="{INK}" stroke-width="2.2" stroke-linecap="round"/>',
         f'<circle cx="{cx - 6}" cy="{cy - 4}" r="11" fill="#8C7A6B" stroke="{INK}" stroke-width="2"/>',
         f'<circle cx="{cx - 8}" cy="{cy - 5}" r="5" fill="#fff" stroke="{INK}" stroke-width="1.4"/>',
         f'<circle cx="{cx - 9}" cy="{cy - 5}" r="2.4" fill="{INK}"/>']
    return ''.join(s)


def robot_head(cx, cy):
    return (f'<line x1="{cx}" y1="{cy - 14}" x2="{cx}" y2="{cy - 20}" stroke="{INK}" stroke-width="2"/><circle cx="{cx}" cy="{cy - 21}" r="3" fill="{YELLOW}" stroke="{INK}" stroke-width="1.5"/>'
            f'<rect x="{cx - 17}" y="{cy - 14}" width="34" height="26" rx="11" fill="#F4F8FB" stroke="{INK}" stroke-width="2"/>'
            f'<rect x="{cx - 12}" y="{cy - 9}" width="24" height="15" rx="7" fill="#3C5A73"/>'
            f'<circle cx="{cx - 5}" cy="{cy - 2}" r="3.4" fill="#fff"/><circle cx="{cx + 5}" cy="{cy - 2}" r="3.4" fill="#fff"/>'
            f'<circle cx="{cx - 4.4}" cy="{cy - 2}" r="1.6" fill="{INK}"/><circle cx="{cx + 5.6}" cy="{cy - 2}" r="1.6" fill="{INK}"/>')


def chick_head(cx, cy):
    return (f'<path d="M{cx - 8},{cy - 13} q2,-9 7,-4 q4,-9 8,-1 q7,-4 5,5 Z" fill="{RED}" stroke="{INK}" stroke-width="1.6"/>'
            f'<circle cx="{cx}" cy="{cy + 2}" r="14" fill="#FFFFFF" stroke="{INK}" stroke-width="2"/>'
            f'<path d="M{cx + 12},{cy} l10,4 l-10,4 Z" fill="{YELLOW}" stroke="{INK}" stroke-width="1.5"/>'
            f'<path d="M{cx + 11},{cy + 8} q2,8 -3,8 q-2,-4 0,-8 Z" fill="{RED}" stroke="{INK}" stroke-width="1.2"/>'
            f'<circle cx="{cx + 4}" cy="{cy - 2}" r="2.4" fill="{INK}"/>')


def puppet_head(cx, cy):
    return (f'<circle cx="{cx}" cy="{cy + 3}" r="13" fill="#F2C9A0" stroke="{INK}" stroke-width="2"/>'
            f'<path d="M{cx + 8},{cy + 4} L{cx + 26},{cy + 1} L{cx + 8},{cy + 8} Z" fill="#E8A87C" stroke="{INK}" stroke-width="1.5" stroke-linejoin="round"/>'
            f'<rect x="{cx - 11}" y="{cy - 22}" width="20" height="14" rx="2" fill="#4E6B8A" stroke="{INK}" stroke-width="1.8"/>'
            f'<rect x="{cx - 17}" y="{cy - 10}" width="32" height="5" rx="2" fill="#4E6B8A" stroke="{INK}" stroke-width="1.8"/>'
            f'<circle cx="{cx + 1}" cy="{cy + 1}" r="2.2" fill="{INK}"/>'
            f'<path d="M{cx - 7},{cy + 10} q4,3 8,0" fill="none" stroke="{INK}" stroke-width="1.5" stroke-linecap="round"/>')


def t1_q3():
    u = 50
    x0, y0 = 16, 14
    colors = {}
    for r in range(8):
        for c in range(8):
            if r < 3:
                col = SKYB if c >= 6 else '#FFFFFF'
            elif r < 5:
                col = DEEP if c < 4 else SKYB
            else:
                col = DEEP if c < 2 else GRAYF
            colors[(r, c)] = col
    p = []
    for (r, c), col in colors.items():
        p.append(f'<rect x="{x0 + c * u}" y="{y0 + r * u}" width="{u}" height="{u}" fill="{col}"/>')
    for i in range(9):
        p.append(line(x0 + i * u, y0, x0 + i * u, y0 + 8 * u, stroke=DARK, sw=1.6))
        p.append(line(x0, y0 + i * u, x0 + 8 * u, y0 + i * u, stroke=DARK, sw=1.6))
    p.append(puppet_head(x0 + 2.5 * u - 4, y0 + 0.5 * u))
    p.append(robot_head(x0 + 6.5 * u, y0 + 2.5 * u + 2))
    p.append(cricket(x0 + 1.5 * u, y0 + 3.5 * u))
    p.append(chick_head(x0 + 4.5 * u - 6, y0 + 5.5 * u))
    # 1 cm brackets at the bottom-right square
    bx, by = x0 + 7 * u, y0 + 8 * u
    p.append(f'<path d="M{bx},{by + 6} V{by + 12} H{bx + u} V{by + 6} M{bx + u / 2},{by + 12} v6" fill="none" stroke="{DARK}" stroke-width="1.8"/>')
    p.append(lab(bx + u / 2, by + 40, '1 cm', 18))
    p.append(f'<path d="M{bx + u + 6},{by - u} H{bx + u + 12} V{by} H{bx + u + 6} M{bx + u + 12},{by - u / 2} h6" fill="none" stroke="{DARK}" stroke-width="1.8"/>')
    p.append(lab(bx + u + 22, by - u / 2 + 6, '1 cm', 18, anchor='start'))
    W, H = x0 + 8 * u + 76, y0 + 8 * u + 50
    save('bai52_t1_q3_grid', W, H, p, folder=FOLDER)


# ── Tiết 1 Q4: lưới 6 × 6 ô 1 cm, các mảnh viền đậm (ghi chữ để bé gọi tên) ──
V = {2: [(0, 1), (2, 4), (5, 6)], 1: [(1, 2), (3, 5)], 3: [(0, 3), (4, 5)], 4: [(0, 2), (3, 6)], 5: [(1, 2), (4, 5)]}
HH = {1: [(1, 2), (5, 6)], 2: [(0, 5)], 3: [(1, 2), (3, 6)], 4: [(0, 1), (2, 4), (5, 6)], 5: [(1, 3), (4, 5)]}
# one cell of each piece where its letter is written (col, row), pieces A..L
PIECE_LABELS = {'A': (0, 0), 'B': (2, 1), 'C': (3, 0), 'D': (5, 0), 'E': (4, 2), 'F': (0, 2),
                'G': (2, 2), 'H': (1, 4), 'I': (4, 3), 'J': (0, 5), 'K': (3, 5), 'L': (5, 5)}


def t1_q4():
    u = 60
    x0, y0 = 30, 26
    p = []
    dash = ' stroke-dasharray="7 6"'
    for i in range(7):
        p.append(line(x0 + i * u, y0 - 14, x0 + i * u, y0 + 6 * u + 14, stroke='#8A8F96', sw=1.4, extra=dash))
        p.append(line(x0 - 14, y0 + i * u, x0 + 6 * u + 14, y0 + i * u, stroke='#8A8F96', sw=1.4, extra=dash))
    for x, segs in V.items():
        for a, b in segs:
            p.append(line(x0 + x * u, y0 + a * u, x0 + x * u, y0 + b * u, sw=4.5))
    for y, segs in HH.items():
        for a, b in segs:
            p.append(line(x0 + a * u, y0 + y * u, x0 + b * u, y0 + y * u, sw=4.5))
    p.append(rect(x0, y0, 6 * u, 6 * u, sw=4.5))
    for k, (c, r) in PIECE_LABELS.items():
        p.append(lab(x0 + c * u + u / 2, y0 + r * u + u / 2 + 8, k, 22, weight=700, fill='#1B75BB'))
    p.append(lab(x0 + 6, y0 + 6 * u + 34, '1 cm', 18, anchor='start'))
    W, H = x0 + 6 * u + 30, y0 + 6 * u + 44
    save('bai52_t1_q4_pieces', W, H, p, folder=FOLDER)


# ── Tiết 2 Q3: bốn tấm bìa (6, 7, 6, 6 ô vuông 1 cm) ────────────────────────
def cells(x0, y0, u, cl, fill):
    s = []
    for c, r in cl:
        s.append(rect(x0 + c * u, y0 + r * u, u, u, fill=fill, sw=2.2))
    return ''.join(s)


def t2_q3():
    u = 46
    x0, y0 = 16, 16
    p = []
    p.append(cells(x0, y0, u, [(c, r) for r in range(2) for c in range(3)], '#1FA8E0'))
    p.append(cells(x0 + 3 * u + 12, y0, u, [(c, 0) for c in range(5)] + [(3, 1), (4, 1)], DEEP))
    p.append(cells(x0, y0 + 2 * u + 12, u, [(c, r) for r in range(2) for c in range(3)], '#FFFFFF'))
    lx, ly = x0 + 3 * u + 12, y0 + u + 12
    p.append(cells(lx, ly, u, [(c, r) for r in range(3) for c in range(2)], SKYB))
    # 1 cm marks on the bottom-right cell of the light-blue card
    bx, by = lx + u, ly + 2 * u
    p.append(f'<path d="M{bx + u + 4},{by} H{bx + u + 10} V{by + u} H{bx + u + 4} M{bx + u + 10},{by + u / 2} h6" fill="none" stroke="{DARK}" stroke-width="1.8"/>')
    p.append(lab(bx + u + 20, by + u / 2 + 6, '1 cm', 18, anchor='start'))
    p.append(f'<path d="M{bx},{by + u + 4} V{by + u + 10} H{bx + u} V{by + u + 4} M{bx + u / 2},{by + u + 10} v6" fill="none" stroke="{DARK}" stroke-width="1.8"/>')
    p.append(lab(bx + u / 2, by + u + 36, '1 cm', 18))
    W, H = x0 + 3 * u + 12 + 5 * u + 16, ly + 3 * u + 46
    W = max(W, bx + u + 70)
    save('bai52_t2_q3_cards', W, H, p, folder=FOLDER)


# ── Tiết 2 Q4: miếng gỗ vuông cạnh 10 cm, đục bỏ hình vuông cạnh 6 cm ở giữa ─
def wood(x, y, w, h, fill='#2A9FD6'):
    s = [rect(x, y, w, h, fill=fill, sw=3)]
    # vân gỗ: vài đường cong nhạt
    for i in range(1, 9):
        yy = y + i * h / 9
        s.append(f'<path d="M{x + 4},{yy} q{w / 4},-8 {w / 2},0 t{w / 2 - 8},0" fill="none" stroke="#FFFFFF" stroke-opacity=".35" stroke-width="1.6"/>')
    return ''.join(s)


def t2_q4():
    u = 22
    x0, y0 = 16, 12
    p = [wood(x0, y0, 10 * u, 10 * u),
         rect(x0 + 2 * u, y0 + 1.6 * u, 6 * u, 6 * u, fill='#FFFFFF', sw=3),
         lab(x0 + 5 * u, y0 + 7.6 * u - 8, '6 cm', 19),
         lab(x0 + 5 * u, y0 + 10 * u + 26, '10 cm', 19)]
    save('bai52_t2_q4_frame', x0 * 2 + 10 * u, y0 + 10 * u + 36, p, folder=FOLDER)


# ── Tiết 3 Q1: hình H = hình vuông ABCD cạnh 9 cm + hình chữ nhật DMNP 20 × 8 ─
def t3_q1():
    u = 14
    x0, y0 = 40, 30
    p = [rect(x0, y0 + 9 * u, 20 * u, 8 * u, fill='#FFFFFF'),
         rect(x0, y0, 9 * u, 9 * u, fill='#FFFFFF')]
    p += [lab(x0 - 10, y0 + 2, 'A', anchor='end'), lab(x0 + 9 * u + 8, y0 + 2, 'B', anchor='start'),
          lab(x0 - 10, y0 + 9 * u + 6, 'D', anchor='end'), lab(x0 + 9 * u, y0 + 9 * u + 26, 'C'),
          lab(x0 + 20 * u + 10, y0 + 9 * u + 4, 'M', anchor='start'),
          lab(x0 - 10, y0 + 17 * u + 8, 'P', anchor='end'), lab(x0 + 20 * u + 10, y0 + 17 * u + 8, 'N', anchor='start'),
          lab(x0 + 9 * u + 10, y0 + 4.5 * u + 7, '9 cm', anchor='start'),
          lab(x0 + 20 * u + 10, y0 + 13 * u + 7, '8 cm', anchor='start'),
          lab(x0 + 10 * u, y0 + 17 * u + 26, '20 cm'),
          lab(x0 + 10 * u, y0 + 17 * u + 56, 'Hình H', 20, extra=' font-style="italic"')]
    save('bai52_t3_q1_H', x0 + 20 * u + 70, y0 + 17 * u + 66, p, folder=FOLDER)


# ── Tiết 3 Q2: ba căn phòng A, B, C trên lưới ô vuông 1 cm ───────────────────
def t3_q2():
    import math
    u = 34
    cols, rows = 21, 9
    x0, y0 = 18, 30
    p = []
    for i in range(cols + 1):
        p.append(line(x0 + i * u, y0 - 8, x0 + i * u, y0 + rows * u + 8, stroke='#A7ADB5', sw=1.2))
    for j in range(rows + 1):
        p.append(line(x0, y0 + j * u, x0 + cols * u, y0 + j * u, stroke='#A7ADB5', sw=1.2))

    def room(x, y, w, h, fill, name):
        return (rect(x, y, w, h, fill=fill, sw=2.5)
                + f'<circle cx="{x + w / 2}" cy="{y + h / 2}" r="15" fill="#FFFFFF" stroke="{DARK}" stroke-width="2"/>'
                + lab(x + w / 2, y + h / 2 + 7, name, 20))
    # A: 4 × 8, cột 0..4, hàng 1..9
    ax, ay = x0, y0 + 1 * u
    p.append(room(ax, ay, 4 * u, 8 * u, GRAYF, 'A'))
    p.append(lab(ax + 2 * u, ay - 8, '4 cm', 19))
    p.append(lab(ax + 4 * u + 6, ay + 4 * u + 6, '8 cm', 19, anchor='start'))
    # C: 5 × 7 ở bên phải, hàng 2..9
    cx, cy = x0 + 16 * u, y0 + 2 * u
    p.append(room(cx, cy, 5 * u, 7 * u, DEEP, 'C'))
    p.append(lab(cx + 2.5 * u, cy - 8, '5 cm', 19))
    p.append(lab(cx - 6, cy + 3.5 * u + 6, '7 cm', 19, anchor='end'))
    # B: hình vuông cạnh 6 cm, xoay nhẹ
    bcx, bcy = x0 + 10 * u, y0 + 5 * u
    a = math.radians(10)
    s = 6 * u / 2
    pts = []
    for dx, dy in ((-s, -s), (s, -s), (s, s), (-s, s)):
        pts.append((bcx + dx * math.cos(a) - dy * math.sin(a), bcy + dx * math.sin(a) + dy * math.cos(a)))
    p.append('<polygon points="' + ' '.join(f'{x:.1f},{y:.1f}' for x, y in pts) + f'" fill="{CYAN}" stroke="{DARK}" stroke-width="2.5"/>')
    p.append(f'<circle cx="{bcx}" cy="{bcy}" r="15" fill="#FFFFFF" stroke="{DARK}" stroke-width="2"/>' + lab(bcx, bcy + 7, 'B', 20))

    def side_label(p1, p2, off, txt):
        mx, my = (p1[0] + p2[0]) / 2, (p1[1] + p2[1]) / 2
        dx, dy = p2[0] - p1[0], p2[1] - p1[1]
        L = math.hypot(dx, dy)
        nx, ny = dy / L, -dx / L
        ang = math.degrees(math.atan2(dy, dx))
        if ang > 90 or ang < -90:
            ang += 180
        x, y = mx + nx * off, my + ny * off
        return lab(f'{x:.1f}', f'{y + 6:.1f}', txt, 19, extra=f' transform="rotate({ang:.1f} {x:.1f} {y:.1f})"')
    p.append(side_label(pts[0], pts[1], 14, '6 cm'))
    p.append(side_label(pts[1], pts[2], 14, '6 cm'))
    p.append(side_label(pts[2], pts[3], 14, '6 cm'))
    p.append(side_label(pts[3], pts[0], 14, '6 cm'))
    save('bai52_t3_q2_rooms', x0 * 2 + cols * u, y0 + rows * u + 20, p, folder=FOLDER)


# ── Tiết 3 Q3: tấm bìa vuông cạnh 10 cm cắt theo hai đường chéo ──────────────
def t3_q3():
    u = 22
    x0, y0 = 20, 36
    p = [rect(x0, y0, 10 * u, 10 * u, fill='#7FD0F2', sw=3),
         line(x0, y0, x0 + 10 * u, y0 + 10 * u, sw=3), line(x0 + 10 * u, y0, x0, y0 + 10 * u, sw=3),
         lab(x0 + 5 * u, y0 - 12, '10 cm', 19)]
    save('bai52_t3_q3_square', x0 * 2 + 10 * u, y0 + 10 * u + 16, p, folder=FOLDER)


# ── Tiết 3 Q4: tấm kính 40 cm × 95 cm ───────────────────────────────────────
def t3_q4():
    k = 2.6
    w, h = 40 * k, 95 * k
    x0, y0 = 90, 12
    p = [rect(x0, y0, w, h, fill='#BDE8FA', stroke=CYAN, sw=3),
         f'<path d="M{x0 + 10},{y0 + 60} L{x0 + w - 10},{y0 + 12} M{x0 + 10},{y0 + 90} L{x0 + w - 10},{y0 + 42} M{x0 + 10},{y0 + h - 20} L{x0 + w - 10},{y0 + h - 80}" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" opacity=".8"/>',
         lab(x0 - 10, y0 + h / 2 + 6, '95 cm', 19, anchor='end'),
         lab(x0 + w / 2, y0 + h + 26, '40 cm', 19)]
    save('bai52_t3_q4_glass', x0 + w + 30, y0 + h + 36, p, folder=FOLDER)


if __name__ == '__main__':
    (ROOT / 'src/assets' / FOLDER).mkdir(parents=True, exist_ok=True)
    t1_q1(); t1_q3(); t1_q4(); t2_q3(); t2_q4(); t3_q1(); t3_q2(); t3_q3(); t3_q4()
