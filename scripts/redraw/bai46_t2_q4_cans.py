"""
Vở BT Toán 2, Bài 46 Tiết 2 Q4 — xếp hộp đậu đỏ (khối trụ) thành tháp: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: bốn hình từ trái sang phải có 1, 3 (2+1), 6 (3+2+1) và
10 (4+3+2+1) hộp; mỗi hàng trên ít hơn hàng dưới 1 hộp, hộp trên đặt giữa hai hộp dưới.
Nhãn "đậu đỏ" trên mỗi hộp như sách.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import uid, shade

W, H = 900, 308
CW, CH = 60, 70          # rộng, cao hộp (tâm elip đáy -> tâm elip nắp)
RY = CW * 0.17
BASE = 290
BODY = RED
parts = []
g = uid('can')
parts.append(f'<defs><linearGradient id="{g}" x1="0" x2="1" y1="0" y2="0">'
             f'<stop offset="0" stop-color="{shade(BODY, -0.15)}"/><stop offset="0.3" stop-color="{shade(BODY, 0.25)}"/>'
             f'<stop offset="0.75" stop-color="{BODY}"/><stop offset="1" stop-color="{shade(BODY, -0.3)}"/></linearGradient></defs>')


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round"'


def band(l, r, y0, y1):
    rx = (r - l) / 2
    return f'M{l},{y0} L{l},{y1} A{rx},{RY} 0 0 0 {r},{y1} L{r},{y0} A{rx},{RY} 0 0 1 {l},{y0} Z'


def can(cx, by):
    l, r, top = cx - CW / 2, cx + CW / 2, by - CH
    rx = CW / 2
    parts.append(f'<path d="M{l},{top} L{l},{by} A{rx},{RY} 0 0 0 {r},{by} L{r},{top} Z" fill="url(#{g})" {st()}/>')
    parts.append(f'<path d="{band(l, r, top + 18, by - 14)}" fill="{CREAM}" stroke="{INK}" stroke-width="1.6"/>')
    parts.append(text(cx, top + 37, 'đậu đỏ', size=13, weight=700, fill='#B8323A'))
    for dx, dy, a in ((-12, 45, 20), (0, 47, -15), (12, 45, 35), (-5, 52, 60), (7, 52, -40)):
        parts.append(f'<ellipse cx="{cx + dx}" cy="{top + dy}" rx="4.2" ry="2.8" transform="rotate({a} {cx + dx} {top + dy})" fill="#9E2A33"/>')
    parts.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{RY}" fill="{GREY_L}" {st()}/>')
    parts.append(f'<ellipse cx="{cx}" cy="{top}" rx="{rx - 6}" ry="{RY - 3}" fill="none" stroke="{GREY}" stroke-width="1.6"/>')


def tower(cx, rows):
    parts.append(f'<ellipse cx="{cx}" cy="{BASE + 6}" rx="{rows * CW / 2 + 14}" ry="7" fill="#000" opacity="0.08"/>')
    for k in range(rows):             # k = 0 hàng dưới cùng
        n = rows - k
        by = BASE - k * CH
        for i in range(n):
            can(cx + (i - (n - 1) / 2) * (CW + 6), by)


for cx, rows in ((50, 1), (215, 2), (455, 3), (752, 4)):
    tower(cx, rows)
save('bai46_t2_q4_cans', W, H, parts)
