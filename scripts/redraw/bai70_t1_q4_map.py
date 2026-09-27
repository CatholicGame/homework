"""
Vở BT Toán 2, Bài 70 Tiết 1 Q4 — bản đồ một số tuyến đường bộ Việt Nam: nét riêng.
Giữ nội dung toán: các điểm Cao Bằng, Hà Nội (sao), Vinh, Đà Nẵng, TP. Hồ Chí Minh,
Cần Thơ, Cà Mau và tuyến đường nét đứt với số ki-lô-mét đúng như sách:
Hà Nội – Cao Bằng 240 km, Hà Nội – Vinh 308 km, Vinh – Đà Nẵng 463 km,
Đà Nẵng – TP. Hồ Chí Minh 858 km, TP. Hồ Chí Minh – Cần Thơ 174 km.
Giữ các tên đảo/quần đảo: Đ. Phú Quốc, QĐ. Côn Sơn, Bãi cạn Cà Mau,
QĐ. Hoàng Sa (Việt Nam), QĐ. Trường Sa (Việt Nam).
Đường bờ biển là nét giản lược, làm trơn; bỏ bản đồ nhỏ góc phải (không dùng cho câu hỏi).
Số km viết to, nằm ngang trong nhãn trắng để đọc được trên màn hình.
"""
import random
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 900, 1039
LAND, LAND_D = '#8ED1F2', '#3E9FD1'
SEA = '#F2FAFE'
ROUTE = '#E4572E'

OUTLINE = [(228, 78), (206, 91), (198, 108), (166, 111), (154, 127), (141, 112), (121, 112), (105, 131),
           (77, 114), (58, 131), (85, 174), (96, 178), (93, 198), (110, 223), (136, 234), (164, 221),
           (182, 232), (179, 250), (204, 276), (188, 298), (162, 295), (146, 316), (207, 350), (257, 419),
           (294, 457), (301, 483), (345, 511), (335, 529), (356, 553), (343, 620), (356, 659),
           (348, 689), (353, 724), (289, 753), (279, 766), (262, 764), (252, 778), (250, 800), (221, 813),
           (207, 809), (195, 831), (168, 842), (174, 854), (189, 854), (202, 865), (190, 895), (190, 951),
           (207, 946), (227, 918), (269, 904), (287, 890), (308, 842), (352, 835), (431, 789), (448, 762),
           (449, 726), (459, 698), (450, 672), (450, 629), (430, 557), (390, 506), (349, 477),
           (303, 431), (291, 412), (290, 394), (265, 377), (243, 337), (259, 284), (294, 260), (308, 233),
           (361, 220), (362, 202), (374, 187), (337, 180), (305, 156), (295, 136), (307, 117), (301, 109),
           (256, 102)]

CB, HN, VINH, DN = (257, 122), (258, 214), (233, 345), (386, 513)
HCM, CT, CM = (299, 823), (246, 861), (208, 914)


def smooth(pts, closed=True, t=0.5):
    """Catmull-Rom -> cubic Bézier path"""
    n = len(pts)
    d = [f'M{pts[0][0]},{pts[0][1]}']
    rng = range(n) if closed else range(n - 1)
    for i in rng:
        p0 = pts[(i - 1) % n] if closed or i > 0 else pts[i]
        p1, p2 = pts[i], pts[(i + 1) % n]
        p3 = pts[(i + 2) % n] if closed or i + 2 < n else p2
        c1 = (p1[0] + (p2[0] - p0[0]) * t / 3, p1[1] + (p2[1] - p0[1]) * t / 3)
        c2 = (p2[0] - (p3[0] - p1[0]) * t / 3, p2[1] - (p3[1] - p1[1]) * t / 3)
        d.append(f'C{c1[0]:.1f},{c1[1]:.1f} {c2[0]:.1f},{c2[1]:.1f} {p2[0]},{p2[1]}')
    return ' '.join(d) + (' Z' if closed else '')


def route(pts):
    return (f'<path d="{smooth(pts, closed=False)}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity=".8"/>'
            f'<path d="{smooth(pts, closed=False)}" fill="none" stroke="{ROUTE}" stroke-width="3.6" stroke-dasharray="11 7" stroke-linecap="round"/>')


def km(x, y, s):
    w = 16 + len(s) * 11.5
    return (f'<rect x="{x - w / 2:.1f}" y="{y - 14}" width="{w:.1f}" height="26" rx="13" fill="#fff" stroke="{ROUTE}" stroke-width="2.2"/>'
            + text(x, y + 6, s, size=17, weight=700, fill=INK))


def city(x, y):
    return f'<circle cx="{x}" cy="{y}" r="7" fill="#fff" stroke="{INK}" stroke-width="2.6"/>'


def star(x, y, r=11):
    import math
    pts = []
    for i in range(10):
        a = -math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * 0.45
        pts.append(f'{x + rr * math.cos(a):.1f},{y + rr * math.sin(a):.1f}')
    return f'<polygon points="{" ".join(pts)}" fill="{YELLOW}" stroke="{INK}" stroke-width="2.2" stroke-linejoin="round"/>'


def label(px, py, lx, ly, lines, anchor='start', size=22, rot=0):
    """leader line from point (px,py) to the label, label text starting at (lx,ly)"""
    s = []
    if px is not None:
        s.append(f'<line x1="{px}" y1="{py}" x2="{lx - 6 if anchor == "start" else lx + 6}" y2="{ly - 7}" stroke="{INK}" stroke-width="1.8"/>')
    g = []
    for i, t in enumerate(lines):
        g.append(text(lx, ly + i * size * 1.2, t, size=size, weight=700, anchor=anchor))
    body = ''.join(g)
    if rot:
        body = f'<g transform="rotate({rot} {lx} {ly})">{body}</g>'
    s.append(body)
    return ''.join(s)


def islands(cx, cy, rx, ry, n, seed, rmin=2.5, rmax=5):
    rnd = random.Random(seed)
    s = []
    for _ in range(n):
        x = cx + rnd.uniform(-rx, rx)
        y = cy + rnd.uniform(-ry, ry)
        r = rnd.uniform(rmin, rmax)
        s.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{r:.1f}" ry="{r * 0.75:.1f}" fill="{LAND}" stroke="{LAND_D}" stroke-width="1.6"/>')
    return ''.join(s)


def island_band(p0, p1, width, n, seed):
    rnd = random.Random(seed)
    s = []
    for _ in range(n):
        t = rnd.random()
        x = p0[0] + (p1[0] - p0[0]) * t + rnd.uniform(-width, width)
        y = p0[1] + (p1[1] - p0[1]) * t + rnd.uniform(-width, width)
        r = rnd.uniform(2.4, 4.6)
        s.append(f'<ellipse cx="{x:.1f}" cy="{y:.1f}" rx="{r:.1f}" ry="{r * 0.75:.1f}" fill="{LAND}" stroke="{LAND_D}" stroke-width="1.6"/>')
    return ''.join(s)


parts = [f'<rect width="{W}" height="{H}" fill="{SEA}"/>',
         text(640, 330, 'BIỂN ĐÔNG', size=26, weight=700, fill='#9CCBE3', extra=' letter-spacing="4"'),
         f'<path d="{smooth(OUTLINE)}" fill="{LAND}" stroke="{LAND_D}" stroke-width="3" stroke-linejoin="round"/>',
         # Phú Quốc, Côn Sơn, bãi cạn Cà Mau
         f'<path d="M137,838 Q134,850 141,860 Q149,858 148,845 Q145,836 137,838 Z" fill="{LAND}" stroke="{LAND_D}" stroke-width="2"/>',
         islands(299, 942, 6, 4, 3, 7, 2.5, 4),
         islands(193, 968, 3, 5, 3, 9, 1.8, 2.6),
         # Hoàng Sa, Trường Sa
         islands(608, 474, 40, 34, 16, 3),
         island_band((780, 770), (560, 960), 34, 46, 5),
         ]
parts += [route([CB, HN]), route([HN, (250, 270), VINH]), route([VINH, (285, 420), (332, 478), DN]),
          route([DN, (425, 580), (428, 700), (400, 770), (340, 808), HCM]), route([HCM, (270, 845), CT])]
parts += [city(*CB), city(*VINH), city(*DN), city(*HCM), city(*CT), city(*CM), star(*HN)]
parts += [km(198, 168, '240 km'), km(196, 290, '308 km'), km(232, 442, '463 km'),
          km(472, 660, '858 km'), km(190, 872, '174 km')]
parts += [
    label(*CB, 318, 86, ['Cao Bằng']),
    label(*HN, 344, 158, ['Hà Nội']),
    label(*VINH, 260, 350, ['Vinh']),
    label(*DN, 438, 476, ['Đà Nẵng']),
    label(HCM[0] - 4, HCM[1] - 6, 250, 757, ['TP. Hồ Chí Minh'], anchor='end'),
    label(143, 842, 150, 810, ['Đ. Phú Quốc'], anchor='end'),
    label(*CT, 322, 882, ['Cần Thơ']),
    label(*CM, 160, 988, ['Cà Mau'], anchor='end'),
    label(192, 972, 196, 1028, ['Bãi cạn Cà Mau'], anchor='end'),
    label(300, 946, 316, 1004, ['QĐ. Côn Sơn']),
    label(None, None, 540, 590, ['QĐ. Hoàng Sa', '(Việt Nam)'], size=24, rot=-12),
    label(None, None, 500, 905, ['QĐ. Trường Sa', '(Việt Nam)'], size=24, rot=-38),
]
save('bai70_t1_q4_map', W, H, parts)
