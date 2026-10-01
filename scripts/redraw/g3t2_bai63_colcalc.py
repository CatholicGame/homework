"""
Vở BT Toán 3 Tập hai — phép tính cột dọc (hình học/số, vẽ tay bằng SVG):
  Bài 63 Tiết 2 Q5 (trang 69): hai phép cộng có ô trống để viết chữ số.
  Bài 65 Q2 (trang 73): bốn phép tính cột dọc kèm ô Đ/S (phép c) đặt số trừ lệch cột như sách).
Mỗi chữ số đặt đúng cột theo hàng (đơn vị, chục, ...), nhóm nghìn cách một khoảng như sách.
    python scripts/redraw/g3t2_bai63_colcalc.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
BOX = '#231F20'


def colx(right, place, cw, group):
    return right - place * cw - (group if place >= 3 else 0)


def calc(x0, y0, rows, op, cw=18, group=10, fs=28, rh=44, width=None, boxes=True):
    """rows: list of (digits_string, shift) — '?' = ô trống; shift = số cột lệch sang trái (mặc định 0).
    Hàng cuối là kết quả (sau vạch kẻ). Trả về (parts, right_x)."""
    p = []
    n = max(len(d) + s for d, s in rows)
    right = x0 + 30 + (n - 1) * cw + group
    for k, (digits, shift) in enumerate(rows):
        y = y0 + k * rh + (10 if k == len(rows) - 1 else 0)
        for i, ch in enumerate(digits):
            place = len(digits) - 1 - i + shift
            x = colx(right, place, cw, group)
            if ch == '?':
                p.append(f'<rect x="{x - 12}" y="{y - fs * .85:.1f}" width="24" height="{fs * 1.05:.1f}" rx="4" fill="#FFFFFF" stroke="{BOX}" stroke-width="2"/>')
            elif ch != ' ':
                p.append(text(x, y, ch, size=fs, weight=500, fill=BOX))
    # dấu phép tính giữa hai hàng đầu, vạch kẻ trên kết quả
    p.append(text(x0 + 6, y0 + rh * .5, op, size=fs, weight=500, fill=BOX))
    ly = y0 + (len(rows) - 2) * rh + 14
    p.append(f'<line x1="{x0}" y1="{ly}" x2="{right + 14}" y2="{ly}" stroke="{BOX}" stroke-width="2.4"/>')
    return p, right


# ── Bài 63 Tiết 2 Q5 ─────────────────────────────────────────────────────────
parts = []
for i, (lab, rows) in enumerate([
    ('a)', [('3?568', 0), ('82?7', 0), ('?4?8?', 0)]),
    ('b)', [('56?24', 0), ('2?39?', 0), ('?27?9', 0)]),
]):
    x0 = 20 + i * 290
    parts.append(text(x0, 40, lab, size=26, weight=500, fill=BOX, anchor='start'))
    p, _ = calc(x0 + 40, 40, rows, "+", cw=36, group=0)
    parts += p
save('bai63_t2_q5_puzzles', 570, 190, parts, folder=FOLDER)

# ── Bài 65 Q2 ────────────────────────────────────────────────────────────────
parts = []
CALCS = [
    ('a)', '+', [('54627', 0), ('38165', 0), ('92792', 0)]),
    ('b)', '+', [('67180', 0), ('735', 0), ('67815', 0)]),
    ('c)', '−', [('95684', 0), ('6829', 1), ('27494', 0)]),
    ('d)', '−', [('83657', 0), ('71482', 0), ('12175', 0)]),
]
for i, (lab, op, rows) in enumerate(CALCS):
    x0 = 16 + (i % 2) * 290
    y0 = 40 + (i // 2) * 170
    parts.append(text(x0, y0, lab, size=26, weight=500, fill=BOX, anchor='start'))
    p, right = calc(x0 + 40, y0, rows, op)
    parts += p
    ry = y0 + 2 * 44 + 10
    parts.append(f'<rect x="{right + 26}" y="{ry - 30}" width="38" height="38" rx="6" fill="#FFFFFF" stroke="{BOX}" stroke-width="2.4"/>')
save('bai65_q2_calcs', 560, 330, parts, folder=FOLDER)
