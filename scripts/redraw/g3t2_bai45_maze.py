"""
Vở BT Toán 3 Tập hai, Bài 45 Tiết 3 Q4 — kiến bò từ A đến B, chỉ đọc số ở bên phải.
Hình học giữ đúng sách: đường đi (A lên, sang trái, xuống, sang phải, lên, sang trái, xuống B)
và vị trí các biển số: 3 286 (phải đường đứng bên phải), 2 368 (treo dưới đường ngang trên),
2 638 (trên đường ngang trên), 3 862 (trái đường đứng bên trái), 6 283 (gắn vào đoạn xuống B, quay vào trong).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 760, 556
PATH, TAG, TAG_D = '#9AA2AA', '#A9DDF5', '#3F3A40'
s = []


def st(w=2):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round"'


# đường đi (nét dày xám, góc bo)
d = 'M620,470 L620,110 Q620,95 605,95 L140,95 Q125,95 125,110 L125,420 Q125,435 140,435 L420,435 Q435,435 435,420 L435,265 Q435,250 420,250 L300,250 Q285,250 285,265 L285,360'
s.append(f'<path d="{d}" fill="none" stroke="{PATH}" stroke-width="14" stroke-linecap="butt" stroke-linejoin="round"/>')


def htag(x, y, w, h, label, notch):
    """biển nằm ngang; notch='left'/'right': phía có đuôi khía (phía ngoài)."""
    if notch == 'left':
        p = f'M{x},{y} L{x + w},{y} L{x + w},{y + h} L{x},{y + h} L{x + 12},{y + h / 2} Z'
        tx = x + w / 2 + 5
    else:
        p = f'M{x},{y} L{x + w},{y} L{x + w - 12},{y + h / 2} L{x + w},{y + h} L{x},{y + h} Z'
        tx = x + w / 2 - 5
    return f'<path d="{p}" fill="{TAG}" {st()}/>' + text(tx, y + h / 2 + 11, label, size=32, weight=600)


def vtag(x, y, w, h, label, notch):
    """biển đứng, chữ xoay dọc; notch='top'/'bottom'."""
    if notch == 'top':
        p = f'M{x},{y} L{x + w / 2},{y + 12} L{x + w},{y} L{x + w},{y + h} L{x},{y + h} Z'
        cy = y + h / 2 + 5
    else:
        p = f'M{x},{y} L{x + w},{y} L{x + w},{y + h} L{x + w / 2},{y + h - 12} L{x},{y + h} Z'
        cy = y + h / 2 - 5
    cx = x + w / 2
    return (f'<path d="{p}" fill="{TAG}" {st()}/>'
            f'<g transform="translate({cx + 8},{cy}) rotate(-90)">{text(0, 0, label, size=32, weight=600)}</g>')


s.append(vtag(180, -34, 54, 124, '2 638', 'top'))          # trên đường ngang trên
s.append(vtag(490, 102, 54, 128, '2 368', 'bottom'))    # treo dưới đường ngang trên
s.append(htag(0, 200, 118, 54, '3 862', 'left'))        # bên trái đường đứng trái
s.append(htag(627, 200, 130, 54, '3 286', 'right'))     # bên phải đường đứng phải
s.append(htag(292, 266, 130, 52, '6 283', 'right'))     # gắn vào đoạn xuống B, quay vào trong

# kiến (nét riêng) ở A, đầu hướng lên
ANT, ANT_D = '#6FB7EA', '#2E8FC8'
ax, ay = 620, 440
for dy, dx1 in ((-18, 26), (0, 30), (16, 26)):
    s.append(f'<path d="M{ax},{ay + dy} q{-dx1 / 2},-6 {-dx1},{6}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    s.append(f'<path d="M{ax},{ay + dy} q{dx1 / 2},-6 {dx1},{6}" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
s.append(f'<path d="M{ax - 5},{ay - 44} q-8,-14 -16,-16 M{ax + 5},{ay - 44} q8,-14 16,-16" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
s.append(f'<ellipse cx="{ax}" cy="{ay + 26}" rx="13" ry="18" fill="{ANT}" {st(2.4)}/>')
s.append(f'<ellipse cx="{ax}" cy="{ay}" rx="8" ry="11" fill="{ANT}" {st(2.4)}/>')
s.append(f'<circle cx="{ax}" cy="{ay - 30}" r="12" fill="{ANT}" {st(2.4)}/>')
s.append(f'<circle cx="{ax - 5}" cy="{ay - 33}" r="2.4" fill="{INK}"/><circle cx="{ax + 5}" cy="{ay - 33}" r="2.4" fill="{INK}"/>')
s.append(text(ax, 514, 'A', size=32, weight=600))
s.append(text(285, 398, 'B', size=32, weight=600))
save('bai45_t3_q4_maze', W, H, ['<g transform="translate(0,36)">'] + s + ['</g>'], folder='grade3-workbook-2')
