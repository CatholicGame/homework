"""Vở BT Toán 3 Tập hai, Bài 68 Tiết 1 Q1 — ba chú lợn tiết kiệm (nét riêng).
Giữ nội dung toán: lợn bên trái có 1 tờ 2 000 + 2 tờ 10 000; lợn bên phải có 1 tờ 20 000;
lợn ở giữa (phía dưới) có 2 tờ 50 000."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

W, H = 760, 560
PIG, PIG_D = '#FFE3EA', '#F4A9BC'
parts = []


def pig(cx, cy, s=1.0):
    """lợn đất quay mặt sang trái, tâm thân tại cx,cy; thân ~ 300 x 190 khi s=1"""
    rx, ry = 150 * s, 96 * s
    o = []
    # chân
    for dx in (-95, -45, 45, 95):
        o.append(f'<rect x="{f(cx + dx * s - 17 * s)}" y="{f(cy + ry * .62)}" width="{f(34 * s)}" height="{f(48 * s)}" rx="{f(9 * s)}" fill="{PIG_D}" {st(2.6)}/>')
    # đuôi xoăn
    o.append(f'<path d="M{f(cx + rx - 6 * s)},{f(cy - 10 * s)} q{f(26 * s)},{f(-6 * s)} {f(22 * s)},{f(-26 * s)} q{f(-4 * s)},{f(-14 * s)} {f(-14 * s)},{f(-4 * s)} '
             f'q{f(-6 * s)},{f(14 * s)} {f(18 * s)},{f(16 * s)} q{f(14 * s)},0 {f(22 * s)},{f(-8 * s)}" fill="none" {st(3)}/>')
    # tai
    o.append(f'<path d="M{f(cx - 80 * s)},{f(cy - ry * .78)} L{f(cx - 96 * s)},{f(cy - ry - 34 * s)} L{f(cx - 44 * s)},{f(cy - ry + 2 * s)} Z" fill="{PIG_D}" {st(2.6)}/>')
    # thân
    o.append(f'<ellipse cx="{f(cx)}" cy="{f(cy)}" rx="{f(rx)}" ry="{f(ry)}" fill="{PIG}" {st(3)}/>')
    # khe bỏ tiền
    o.append(f'<rect x="{f(cx - 40 * s)}" y="{f(cy - ry + 16 * s)}" width="{f(80 * s)}" height="{f(9 * s)}" rx="{f(4.5 * s)}" fill="{INK}"/>')
    # mõm
    o.append(f'<ellipse cx="{f(cx - rx + 4 * s)}" cy="{f(cy + 6 * s)}" rx="{f(22 * s)}" ry="{f(30 * s)}" fill="{PIG_D}" {st(2.6)}/>')
    for dy in (-8, 18):
        o.append(f'<ellipse cx="{f(cx - rx + 2 * s)}" cy="{f(cy + dy * s)}" rx="{f(5 * s)}" ry="{f(7 * s)}" fill="{INK}"/>')
    # mắt, má
    o.append(f'<circle cx="{f(cx - 100 * s)}" cy="{f(cy - 36 * s)}" r="{f(7 * s)}" fill="{INK}"/>')
    o.append(f'<circle cx="{f(cx - 97 * s)}" cy="{f(cy - 39 * s)}" r="{f(2.2 * s)}" fill="#fff"/>')
    o.append(f'<ellipse cx="{f(cx - 78 * s)}" cy="{f(cy - 8 * s)}" rx="{f(12 * s)}" ry="{f(7 * s)}" fill="{PINK}" opacity=".7"/>')
    return '\n'.join(o)


NW, NH = 112, 53
# lợn bên trái
parts.append(pig(190, 175))
parts.append(banknote(168, 102, NW, NH, 10000))
parts.append(banknote(168, 164, NW, NH, 10000))
parts.append(banknote(50, 152, NW, NH, 2000))
# lợn bên phải
parts.append(pig(575, 165))
parts.append(banknote(540, 138, NW, NH, 20000))
# lợn ở giữa
parts.append(pig(380, 420))
parts.append(banknote(330, 362, NW, NH, 50000))
parts.append(banknote(352, 426, NW, NH, 50000))
save('bai68_t1_q1_pigs', W, H, parts, folder=FOLDER)
