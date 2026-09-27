"""
Vở BT Toán 2, Bài 46 Tiết 1 Q4 — rô-bốt ở sân chơi: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: đúng 6 rô-bốt — 3 rô-bốt thân KHỐI CẦU (ngồi đầu trái bập
bênh, đang đi bộ, đang trượt cầu trượt) và 3 rô-bốt thân KHỐI TRỤ (đứng đầu phải bập bênh,
hai rô-bốt đứng có bánh xe). Thân rô-bốt để màu xám nhạt (bé tô màu). Cảnh vật (tường gạch,
bụi cây, bập bênh, cầu trượt) là nét riêng, không có khối cầu/khối trụ nào khác gây nhầm.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 900, 667
BODY = '#DCE3EA'
BRICK, BRICK_D = '#F2C9A8', '#D9A07A'
HEDGE, HEDGE_D = '#A8DB93', '#6DBA63'
parts = []


def st(w=3):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def wall(x, y, w, h, d=14):
    parts.append(f'<path d="M{x},{y} L{x + d},{y - d} L{x + w + d},{y - d} L{x + w},{y} Z" fill="{shade(BRICK, 0.3)}" {st(2.5)}/>')
    parts.append(f'<path d="M{x + w},{y} L{x + w + d},{y - d} L{x + w + d},{y + h - d} L{x + w},{y + h} Z" fill="{BRICK_D}" {st(2.5)}/>')
    parts.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{BRICK}" {st(2.5)}/>')
    bh, bw = 16, 44
    rows = int(h // bh)
    lines = []
    for i in range(1, rows + 1):
        yy = y + i * bh
        if yy < y + h - 2:
            lines.append(f'M{x},{yy}H{x + w}')
    for i in range(rows + 1):
        y0, y1 = y + i * bh, min(y + (i + 1) * bh, y + h)
        off = 0 if i % 2 == 0 else bw / 2
        xx = x + off + bw
        while xx < x + w - 4:
            lines.append(f'M{xx},{y0}V{y1}')
            xx += bw
    parts.append(f'<path d="{"".join(lines)}" stroke="{BRICK_D}" stroke-width="2" fill="none"/>')


def hedge(x, y, w, h):
    # bụi cây: hình chữ nhật bo mép lượn sóng
    n = max(2, int(w // 34))
    step = w / n
    d = [f'M{x},{y + h}', f'L{x},{y + 14}']
    for i in range(n):
        d.append(f'Q{x + step * (i + .5)},{y - 14} {x + step * (i + 1)},{y + 14}')
    m = max(2, int((h - 14) // 40))
    sh = (h - 14) / m
    for i in range(m):
        d.append(f'Q{x + w + 12},{y + 14 + sh * (i + .5)} {x + w},{y + 14 + sh * (i + 1)}')
    d.append('Z')
    parts.append(f'<path d="{" ".join(d)}" fill="{HEDGE}" {st(2.5)}/>')
    for i in range(int(w * h // 2600)):
        px = x + 12 + (i * 37) % max(1, int(w - 24))
        py = y + 24 + (i * 53) % max(1, int(h - 40))
        parts.append(f'<path d="M{px},{py} q6,-6 12,0" fill="none" stroke="{HEDGE_D}" stroke-width="2.2" stroke-linecap="round"/>')


def eyes(cx, cy, gap=9, r=4.5):
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * gap}" cy="{cy}" r="{r}" fill="{WHITE}" {st(2)}/>')
        parts.append(f'<circle cx="{cx + sx * gap + 1}" cy="{cy}" r="{r * 0.45}" fill="{INK}"/>')


def limb(pts, w=5):
    d = 'M' + ' L'.join(f'{x},{y}' for x, y in pts)
    parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="{w + 4}" stroke-linecap="round" stroke-linejoin="round"/>')
    parts.append(f'<path d="{d}" fill="none" stroke="{GREY}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>')


def hand(x, y):
    parts.append(f'<path d="M{x - 6},{y - 4} a7,7 0 1 1 12,0" fill="none" {st(3)}/>')


def foot(x, y, dx=1):
    parts.append(f'<path d="M{x - 10 * dx},{y} q{-2 * dx},-12 {10 * dx},-12 h{8 * dx} q{8 * dx},0 {8 * dx},12 Z" fill="{GREY}" {st(2.5)}/>')


def round_head(cx, cy, w=46, h=36):
    parts.append(f'<line x1="{cx}" y1="{cy - h / 2}" x2="{cx}" y2="{cy - h / 2 - 12}" {st(3)}/>')
    parts.append(f'<circle cx="{cx}" cy="{cy - h / 2 - 15}" r="4" fill="{YELLOW}" {st(2)}/>')
    parts.append(f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="14" fill="{BODY}" {st()}/>')
    eyes(cx, cy - 2)
    parts.append(f'<path d="M{cx - 6},{cy + 9} q6,4 12,0" fill="none" {st(2)}/>')


def box_head(cx, cy, w=48, h=34):
    for sx in (-1, 1):
        parts.append(f'<rect x="{cx + sx * (w / 2 + 3) - 4}" y="{cy - 6}" width="8" height="12" rx="3" fill="{GREY}" {st(2)}/>')
    parts.append(f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="6" fill="{BODY}" {st()}/>')
    parts.append(f'<rect x="{cx - w / 2 + 6}" y="{cy - 8}" width="{w - 12}" height="14" rx="7" fill="{INK}"/>')
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * 9}" cy="{cy - 1}" r="3.2" fill="{TEAL}"/>')


def wheels(cx, y, gap=16):
    parts.append(f'<rect x="{cx - gap - 12}" y="{y - 10}" width="{2 * gap + 24}" height="10" rx="4" fill="{GREY}" {st(2.5)}/>')
    for sx in (-1, 1):
        parts.append(f'<circle cx="{cx + sx * gap}" cy="{y + 6}" r="9" fill="{INK}"/>')
        parts.append(f'<circle cx="{cx + sx * gap}" cy="{y + 6}" r="3.5" fill="{GREY_L}"/>')


def panel(cx, cy, w=26, h=16):
    parts.append(f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="4" fill="{WHITE}" {st(2)}/>')


# ── cảnh: tường gạch, bụi cây ─────────────────────────────────────────────────
wall(12, 44, 440, 112)
wall(596, 22, 206, 92)
wall(238, 356, 280, 112)
wall(206, 548, 306, 80)
hedge(14, 318, 86, 270)
hedge(530, 130, 62, 208)
hedge(604, 596, 282, 50)

# ── bập bênh ──────────────────────────────────────────────────────────────────
PX, PY = 176, 188                                 # trục bập bênh
parts.append(f'<path d="M{PX - 26},222 L{PX},{PY} L{PX + 26},222 Z" fill="{ORANGE}" {st()}/>')
parts.append(f'<rect x="{PX - 34}" y="220" width="68" height="8" rx="3" fill="{shade(ORANGE, -0.2)}" {st(2.5)}/>')
x0, y0, x1, y1 = 34, 178, 322, 198                # tấm ván (trái cao hơn một chút)
plank_y = lambda x: y0 + (y1 - y0) * (x - x0) / (x1 - x0)
parts.append(f'<path d="M{x0},{y0 - 6} L{x1},{y1 - 6} L{x1},{y1 + 6} L{x0},{y0 + 6} Z" fill="{YELLOW}" {st()}/>')
for hx in (112, 250):
    parts.append(f'<path d="M{hx},{plank_y(hx) - 6} v-22 h12" fill="none" {st(3.5)}/>')
parts.append(f'<circle cx="{PX}" cy="{PY}" r="7" fill="{GREY}" {st(2.5)}/>')

# 1) rô-bốt thân khối cầu — ngồi đầu trái
cx = 70
limb([(cx + 14, 168), (cx + 34, 198), (cx + 34, 214)]); foot(cx + 40, 222)
limb([(cx - 6, 170), (cx + 10, 204), (cx + 10, 220)]); foot(cx + 16, 228)
limb([(cx + 26, 130), (cx + 48, 146), (112, 150)]); hand(114, 152)
parts += sphere(cx, 138, 36, BODY, shadow=False)
panel(cx + 6, 140)
round_head(cx, 84)

# 2) rô-bốt thân khối trụ — đứng đầu phải
cx = 282
by = plank_y(cx) - 6
limb([(cx - 8, by - 20), (cx - 8, by)]); limb([(cx + 8, by - 20), (cx + 8, by)])
foot(cx - 10, by + 2, -1); foot(cx + 10, by + 2)
limb([(cx - 18, by - 70), (cx - 30, by - 50), (256, by - 34)])
limb([(cx + 18, by - 70), (cx + 34, by - 54), (cx + 38, by - 36)]); hand(cx + 38, by - 32)
parts += cyl2d(cx, by - 96, 38, 72, BODY)
panel(cx, by - 58, 20, 22)
box_head(cx, by - 124, 40, 30)

# 3) rô-bốt thân khối cầu — đang đi bộ
cx, cy = 446, 204
limb([(cx - 14, cy + 32), (cx - 30, cy + 62), (cx - 36, cy + 84)]); foot(cx - 36, cy + 92, -1)
limb([(cx + 14, cy + 32), (cx + 34, cy + 54), (cx + 52, cy + 72)]); foot(cx + 56, cy + 80)
limb([(cx - 36, cy - 12), (cx - 52, cy - 34), (cx - 48, cy - 56)]); hand(cx - 48, cy - 52)
limb([(cx + 36, cy - 12), (cx + 54, cy - 30), (cx + 52, cy - 54)]); hand(cx + 52, cy - 50)
parts += sphere(cx, cy, 42, BODY, shadow=False)
panel(cx, cy + 4, 34, 20)
round_head(cx, cy - 64, 52, 38)

# ── cầu trượt ─────────────────────────────────────────────────────────────────
for lx in (822, 868):
    parts.append(f'<line x1="{lx - 26}" y1="222" x2="{lx + 10}" y2="382" {st(8)}/>')
    parts.append(f'<line x1="{lx - 26}" y1="222" x2="{lx + 10}" y2="382" stroke="{RED}" stroke-width="4" stroke-linecap="round"/>')
for i in range(1, 6):
    t = i / 6
    ya = 222 + 160 * t
    parts.append(f'<line x1="{796 + 36 * t}" y1="{ya}" x2="{842 + 36 * t}" y2="{ya}" {st(4)}/>')
parts.append(f'<path d="M752,238 L760,212 Q792,196 824,212 L830,238 Z" fill="{BLUE}" {st()}/>')
parts.append(f'<path d="M790,212 l4,8 9,1 -7,6 2,9 -8,-5 -8,5 2,-9 -7,-6 9,-1 Z" fill="{YELLOW}" {st(1.8)}/>')
parts.append(f'<path d="M762,232 L636,352 Q624,366 640,374 L664,378 L676,366 L786,244 Z" fill="{TEAL}" {st()}/>')
parts.append(f'<path d="M786,244 L676,366 L676,386 L792,258 Z" fill="{shade(TEAL, -0.25)}" {st()}/>')

# 4) rô-bốt thân khối cầu — đang trượt
cx, cy = 724, 272
limb([(cx - 24, cy + 22), (cx - 50, cy + 44), (cx - 70, cy + 56)]); foot(cx - 74, cy + 62, -1)
limb([(cx - 6, cy + 30), (cx - 30, cy + 58), (cx - 46, cy + 72)]); foot(cx - 50, cy + 78, -1)
limb([(cx + 22, cy - 26), (cx + 30, cy - 52), (cx + 22, cy - 72)]); hand(cx + 22, cy - 68)
limb([(cx + 30, cy - 10), (cx + 56, cy - 24), (cx + 64, cy - 46)]); hand(cx + 64, cy - 42)
parts += sphere(cx, cy, 36, BODY, shadow=False)
panel(cx - 4, cy + 2, 28, 16)
round_head(cx + 6, cy - 54, 44, 34)

# 5) rô-bốt thân khối trụ — đứng bên trái
cx = 176
limb([(cx - 25, 408), (cx - 42, 430), (cx - 44, 460)]); hand(cx - 44, 464)
limb([(cx + 25, 408), (cx + 42, 430), (cx + 44, 460)]); hand(cx + 44, 464)
parts += cyl2d(cx, 398, 50, 84, BODY)
panel(cx - 8, 438, 18, 30); panel(cx + 10, 438, 12, 30)
wheels(cx, 492)
box_head(cx, 366, 50, 36)

# 6) rô-bốt thân khối trụ — cao, đứng giữa phải
cx = 548
limb([(cx - 20, 468), (cx - 40, 486), (cx - 58, 496)]); hand(cx - 62, 496)
limb([(cx + 20, 468), (cx + 34, 492), (cx + 36, 516)]); hand(cx + 36, 520)
parts += cyl2d(cx, 458, 40, 110, BODY)
panel(cx, 490, 18, 30)
wheels(cx, 580, 14)
box_head(cx, 428, 44, 32)

save('bai46_t1_q4_robots', W, H, parts)
