"""
Vở BT Toán 3, Bài 7 Tiết 1 câu 1a — năm đồ vật để nối với dạng khối:
hộp quà (lập phương), hộp bánh tròn (trụ), quả bóng (cầu), tủ quần áo (hộp chữ nhật),
cốc (trụ). Nét riêng; mỗi đồ vật một file, cùng kích thước ảnh cũ.
Chạy: python scripts/redraw/bai7_objs.py (ghi cả 5 file) hoặc từng bai7_obj_*.py
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

SW = 5
F = 'grade3-workbook'


# ── hộp quà lập phương ──────────────────────────────────────────────────────
def gift():
    W, H = 500, 580
    x, yb, w, d, dy = 80, 520, 290, 90, 62
    col = PINK
    p = [box3d(x, yb, w, w, d, dy, col, SW)]
    t = yb - w
    # nắp: dải ngang trên mặt trước
    lid = 62
    p.append(poly([(x - 8, t), (x + w + 8, t), (x + w + 8, t + lid), (x - 8, t + lid)], shade(col, .15), SW))
    p.append(poly([(x + w + 8, t), (x + w + d + 8, t - dy), (x + w + d + 8, t - dy + lid), (x + w + 8, t + lid)], shade(col, -.12), SW))
    p.append(poly([(x - 8, t), (x + d - 8, t - dy), (x + w + d + 8, t - dy), (x + w + 8, t)], shade(col, .4), SW))
    # chấm bi trên thân (trang trí, không cần đếm)
    for r in range(4):
        for c in range(5):
            cx = x + 34 + c * 56 + (r % 2) * 28
            cy = t + lid + 40 + r * 52
            if cx < x + w - 16:
                p.append(f'<circle cx="{cx}" cy="{cy}" r="9" fill="#fff" opacity=".85"/>')
    # ruy băng dọc mặt trước và nắp trên
    rb = YELLOW
    mx = x + w / 2
    p.append(poly([(mx - 20, t), (mx + 20, t), (mx + 20, yb), (mx - 20, yb)], rb, SW))
    p.append(poly([(mx - 20, t), (mx + 20, t), (mx + 20 + d, t - dy), (mx - 20 + d, t - dy)], rb, SW))
    # nơ
    bx, by = mx + d / 2, t - dy / 2
    for s in (-1, 1):
        p.append(f'<path d="M{bx},{by} C{bx + s * 70},{by - 70} {bx + s * 110},{by - 10} {bx},{by} Z" fill="{rb}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
        p.append(f'<path d="M{bx},{by} L{bx + s * 44},{by + 50} L{bx + s * 22},{by + 46} Z" fill="{ORANGE}" stroke="{INK}" stroke-width="{SW - 1}" stroke-linejoin="round"/>')
    p.append(f'<ellipse cx="{bx}" cy="{by}" rx="18" ry="14" fill="{ORANGE}" stroke="{INK}" stroke-width="{SW}"/>')
    save('bai7_obj_box', W, H, p, folder=F)


# ── hộp bánh tròn (dạng trụ thấp) ───────────────────────────────────────────
def tin():
    W, H = 540, 400
    cx, rx, ry = 270, 220, 60
    t, yb = 110, 320
    col = TEAL
    cid = uid('tin')
    body = f'M{cx - rx},{t} V{yb} A{rx},{ry} 0 0 0 {cx + rx},{yb} V{t} Z'
    p = [f'<clipPath id="{cid}"><path d="{body}"/></clipPath>',
         f'<path d="{body}" fill="{col}"/>',
         f'<g clip-path="url(#{cid})">']
    # dải sóng vàng + các ngôi sao nhỏ trang trí
    wave = ' '.join(f'L{cx - rx + i * 22},{t + 70 + (12 if i % 2 else 0) + ry * (1 - ((i * 22 - rx) / rx) ** 2) ** .5 * .8:.1f}' for i in range(0, 21))
    p.append(f'<path d="M{cx - rx},{t} {wave} L{cx + rx},{t} Z" fill="{YELLOW}"/>')
    p.append(f'<rect x="{cx - rx}" y="{yb - 20}" width="{2 * rx}" height="{ry + 40}" fill="{shade(col, -.15)}"/>')
    for k, (sx, sy) in enumerate([(-150, 250), (-50, 262), (50, 262), (150, 250)]):
        p.append(f'<circle cx="{cx + sx}" cy="{sy}" r="22" fill="#fff" opacity=".85"/>')
        p.append(f'<circle cx="{cx + sx}" cy="{sy}" r="9" fill="{PINK}"/>')
    p.append('</g>')
    p.append(f'<path d="{body}" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    # nắp
    p.append(f'<path d="M{cx - rx - 10},{t} v26 A{rx + 10},{ry + 4} 0 0 0 {cx + rx + 10},{t + 26} v-26" fill="{shade(col, -.1)}" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    p.append(f'<ellipse cx="{cx}" cy="{t}" rx="{rx + 10}" ry="{ry + 4}" fill="{shade(col, .45)}" stroke="{INK}" stroke-width="{SW}"/>')
    p.append(f'<ellipse cx="{cx}" cy="{t}" rx="{rx - 30}" ry="{ry - 14}" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/>')
    save('bai7_obj_bowl', W, H, p, folder=F)


# ── quả bóng đá (khối cầu) ──────────────────────────────────────────────────
def ball():
    W, H = 540, 420
    cx, cy, r = 250, 212, 160
    cid = uid('ball')
    p = [f'<clipPath id="{cid}"><circle cx="{cx}" cy="{cy}" r="{r}"/></clipPath>',
         f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="#fff"/>', f'<g clip-path="url(#{cid})">']

    def pent(px, py, rr, rot):
        return [(px + rr * math.cos(math.radians(rot + 72 * i)), py + rr * math.sin(math.radians(rot + 72 * i))) for i in range(5)]
    ox, oy = cx + 6, cy + 8
    c0 = pent(ox, oy, 48, -90)
    p.append(poly(c0, BLUE, SW - 1))
    outer = []
    for i in range(5):
        th = -90 + 36 + 72 * i
        a = math.radians(th)
        px, py = ox + 138 * math.cos(a), oy + 138 * math.sin(a)
        pts = pent(px, py, 46, th + 180)          # một đỉnh chĩa vào tâm
        outer.append(pts)
        p.append(poly(pts, BLUE, SW - 1))
    for i in range(5):
        v = c0[i]
        a = math.radians(-90 + 72 * i)
        j = (ox + 92 * math.cos(a), oy + 92 * math.sin(a))
        p.append(line(v[0], v[1], j[0], j[1], sw=3))
        for k in (i - 1, i):
            q = min(outer[k % 5], key=lambda t: (t[0] - j[0]) ** 2 + (t[1] - j[1]) ** 2)
            p.append(line(j[0], j[1], q[0], q[1], sw=3))
    p.append('</g>')
    p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="none" stroke="{INK}" stroke-width="{SW + 1}"/>')
    p.append(f'<path d="M{cx - 120},{cy - 50} A{r - 22},{r - 22} 0 0 1 {cx - 50},{cy - 122}" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".8"/>')
    save('bai7_obj_ball', W, H, p, folder=F)


# ── tủ quần áo (khối hộp chữ nhật) ──────────────────────────────────────────
def wardrobe():
    W, H = 460, 660
    x, yb, w, h, d, dy = 70, 600, 240, 510, 70, 50
    col = '#E9B47A'
    p = [box3d(x, yb, w, h, d, dy, col, SW)]
    t = yb - h
    mx = x + w / 2
    p.append(line(mx, t, mx, yb, sw=SW))
    for s in (-1, 1):
        dx0 = mx + s * 14
        p.append(f'<rect x="{dx0 - 6 if s > 0 else dx0 - 6}" y="{t + h * .42}" width="12" height="60" rx="6" fill="{BROWN}" stroke="{INK}" stroke-width="3"/>')
        # khung cánh cửa
        x1, x2 = (x + 22, mx - 18) if s < 0 else (mx + 18, x + w - 22)
        p.append(f'<rect x="{x1}" y="{t + 26}" width="{x2 - x1}" height="{h - 52}" rx="8" fill="none" stroke="{shade(col, -.25)}" stroke-width="4"/>')
    save('bai7_obj_wardrobe', W, H, p, folder=F)


# ── cốc (khối trụ cao) ──────────────────────────────────────────────────────
def cup():
    W, H = 380, 580
    cx, w, t, yb = 185, 200, 110, 480
    col = '#F4A7B9'
    rx, ry = w / 2, 30
    cid = uid('cup')
    body = f'M{cx - rx},{t} V{yb} A{rx},{ry} 0 0 0 {cx + rx},{yb} V{t} Z'
    p = [f'<clipPath id="{cid}"><path d="{body}"/></clipPath>', f'<path d="{body}" fill="{col}"/>',
         f'<g clip-path="url(#{cid})">']
    for k in range(3):
        y = t + 120 + k * 90
        p.append(f'<path d="M{cx - rx - 10},{y} q25,-18 50,0 t50,0 t50,0 t50,0 t50,0" fill="none" stroke="#fff" stroke-width="10" opacity=".85"/>')
    p.append(f'<rect x="{cx - rx + 18}" y="{t + 30}" width="16" height="{yb - t - 40}" rx="8" fill="#fff" opacity=".45"/>')
    p.append('</g>')
    p.append(f'<path d="{body}" fill="none" stroke="{INK}" stroke-width="{SW}" stroke-linejoin="round"/>')
    p.append(f'<ellipse cx="{cx}" cy="{t}" rx="{rx}" ry="{ry}" fill="{shade(col, -.3)}" stroke="{INK}" stroke-width="{SW}"/>')
    p.append(f'<ellipse cx="{cx}" cy="{t + 6}" rx="{rx - 14}" ry="{ry - 10}" fill="{shade(col, -.45)}"/>')
    save('bai7_obj_cup', W, H, p, folder=F)


if __name__ == '__main__':
    gift(); tin(); ball(); wardrobe(); cup()
