"""
Vở BT Toán 2, Bài 16 Tiết 1 Q3 — rót bình A, bình B ra cốc: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: bình A (bên trái) rót vào 8 cốc đầy (2 hàng × 4 cốc),
bình B (bên phải, nhỏ hơn) rót vào 5 cốc đầy (1 hàng). Vạch dọc ngăn hai phần.
Đáp án: A = 8 cốc, B = 5 cốc, cả hai = 13 cốc.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_liquid import *

W, H = 882, 333
parts = []
SW_ = 3.2


def poured_jug(cx, cy, w, h, deg, color, letter, cup_x, cup_top):
    """Bình nằm nghiêng (quai ở trên, miệng rót chúc xuống bên phải) + dòng nước vào cốc."""
    by = cy + h / 2
    body = pitcher(cx, by, w, h, level=None, body=color, lid=WHITE, sw=SW_, base=False)
    g = [f'<g transform="rotate({deg} {cx} {cy}) translate({2 * cx} 0) scale(-1 1)">'] + body + ['</g>']
    # miệng vòi: pitcher() vẽ vòi ở (x0 - .12w, top + .02h); lật gương rồi xoay
    tip = rot_pt(cx + w / 2 + w * .12, by - h + h * .02, deg, cx, cy)
    out = stream(tip[0], tip[1] - 2, cup_x, cup_top + 6, w1=9, w2=7, bend=4)
    out += g
    # chữ A / B đứng thẳng giữa thân bình
    bx, byy = rot_pt(cx, cy + h * .05, deg, cx, cy)
    out.append(text(bx, byy + 16, letter, size=46, weight=700))
    return out


def cups(xs, ys):
    out = []
    for y in ys:
        for x in xs:
            out += tumbler(x, y, 46, 58, level=.84, sw=SW_)
    return out


# ── bình A: 8 cốc ─────────────────────────────────────────────
A_XS, A_YS = (192, 252, 312, 372), (252, 322)
parts += cups(A_XS, A_YS)
parts += poured_jug(114, 104, 116, 180, 92, '#8FD0F2', 'A', A_XS[0], A_YS[0] - 58)

# ── vạch ngăn ─────────────────────────────────────────────────
parts.append(f'<line x1="421" y1="8" x2="421" y2="325" stroke="{INK}" stroke-width="2.5" stroke-linecap="round"/>')

# ── bình B: 5 cốc ─────────────────────────────────────────────
B_XS = (618, 678, 738, 798, 858)
parts += cups(B_XS, (252,))
parts += poured_jug(550, 104, 100, 146, 98, '#F7A1C4', 'B', B_XS[0], 252 - 58)

save('bai16_t1_q3_pour', W, H, parts)
