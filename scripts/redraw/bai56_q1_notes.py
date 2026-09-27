"""
Vở BT Toán 2, Bài 56 Q1 — bốn tập tiền (tờ tiền cách điệu, không chép hoa văn tiền thật).
Giữ nội dung toán: Tập 1 = 7 tờ 100 đồng, Tập 2 = 5 tờ 200 đồng, Tập 3 = 2 tờ 500 đồng,
Tập 4 = 4 tờ 1000 đồng; các tờ xếp chồng lộ mép trên (vẫn thấy số ở hai góc để đếm).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 530, 630
parts = []


def stack(x, y, w, h, n, step, value):
    for i in range(n):
        yy = y + i * step
        parts.append(f'<rect x="{x + 3}" y="{yy + 3}" width="{w}" height="{h}" rx="5" fill="#000" opacity=".08"/>')
        parts.append(banknote(x, yy, w, h, value))


stack(48, 8, 180, 88, 7, 26, 100)      # Tập 1
stack(296, 58, 190, 92, 5, 28, 200)    # Tập 2
stack(40, 440, 190, 92, 2, 32, 500)    # Tập 3
stack(284, 386, 212, 102, 4, 30, 1000)  # Tập 4
for x, y, t in ((138, 300, 'Tập 1'), (391, 300, 'Tập 2'), (135, 612, 'Tập 3'), (390, 612, 'Tập 4')):
    parts.append(text(x, y, t, size=24, weight=600))
save('bai56_q1_notes', W, H, parts)
