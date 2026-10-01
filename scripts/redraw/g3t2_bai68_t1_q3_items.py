"""Vở BT Toán 3 Tập hai, Bài 68 Tiết 1 Q3 — bốn món đồ và bốn tờ tiền (nét riêng).
Giữ nội dung toán: thứ tự Bút bi, Quyển vở, Chiếc hộp cười, Quả bóng gỗ; hàng tiền bên dưới
theo thứ tự 2 000, 50 000, 10 000, 20 000 đồng (không ghép tiền với món đồ)."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from g3t2_bai68_kit import *

W, H = 820, 330
parts = []
cols = [105, 305, 510, 715]

# bút bi (xiên)
x0, y0 = cols[0], 110
parts.append(f'<g transform="translate({x0},{y0}) rotate(-38)">'
             f'<rect x="-9" y="-78" width="18" height="130" rx="7" fill="{BLUE}" {st(2.6)}/>'
             f'<rect x="-9" y="-78" width="18" height="34" rx="7" fill="#2F6FB0" {st(2.6)}/>'
             f'<path d="M-4,-78 L-4,-96 L4,-96 L4,-60" fill="none" {st(2.6)}/>'
             f'<path d="M-9,52 L0,78 L9,52 Z" fill="{CREAM}" {st(2.6)}/><circle cx="0" cy="76" r="2.4" fill="{INK}"/></g>')
# quyển vở
x0 = cols[1]
parts.append(f'<rect x="{x0 - 58}" y="22" width="116" height="160" rx="8" fill="#8FD0F2" {st(3)}/>')
for i in range(4):
    for j in range(5):
        cx, cy = x0 - 38 + i * 25, 72 + j * 24
        parts.append(f'<path d="M{cx},{cy - 7} l2,5 5,0 -4,3 2,6 -5,-4 -5,4 2,-6 -4,-3 5,0 z" fill="#fff" opacity=".9"/>')
parts.append(f'<rect x="{x0 - 34}" y="36" width="68" height="26" rx="6" fill="#fff" {st(2.2)}/>')
for k in range(3):
    parts.append(f'<line x1="{x0 - 26}" y1="{43 + k * 6}" x2="{x0 + 26}" y2="{43 + k * 6}" stroke="{INK}" stroke-width="1.4"/>')
# hộp cười (hộp quà có nơ và chữ)
x0 = cols[2]
parts.append(f'<path d="M{x0 - 80},{80} L{x0 - 40},{50} L{x0 + 90},{50} L{x0 + 50},{80} Z" fill="#BFE6F7" {st(3)}/>')
parts.append(f'<path d="M{x0 + 50},{80} L{x0 + 90},{50} L{x0 + 90},{150} L{x0 + 50},{182} Z" fill="#6FB7EA" {st(3)}/>')
parts.append(f'<rect x="{x0 - 80}" y="80" width="130" height="102" fill="#8FD0F2" {st(3)}/>')
parts.append(f'<path d="M{x0 - 15},80 L{x0 - 15},182 M{x0 - 60},65 L{x0 + 70},65" stroke="{YELLOW}" stroke-width="10"/>')
parts.append(f'<path d="M{x0 + 5},62 q-30,-34 -40,-6 q10,14 40,6 q30,-34 40,-6 q-10,14 -40,6 z" fill="{YELLOW}" {st(2.4)}/>')
parts.append(text(x0 - 15, 142, 'Hộp cười', size=22, weight=700, fill='#E4572E'))
parts.append(f'<circle cx="{x0 - 58}" cy="112" r="11" fill="#fff" {st(2)}/><circle cx="{x0 - 61}" cy="110" r="2" fill="{INK}"/><circle cx="{x0 - 55}" cy="110" r="2" fill="{INK}"/>'
             f'<path d="M{x0 - 63},115 q5,5 10,0" fill="none" {st(1.6)}/>')
# quả bóng gỗ
x0 = cols[3]
parts.append(f'<circle cx="{x0}" cy="110" r="62" fill="#D9A56B" {st(3)}/>')
for d in ('M-50,-30 q30,20 20,60', 'M-20,-58 q30,40 70,30', 'M-58,10 q40,-10 60,40', 'M10,-60 q10,40 50,50', 'M-30,40 q30,-10 60,10'):
    parts.append(f'<path d="{d}" transform="translate({x0},110)" fill="none" stroke="#A8743E" stroke-width="3" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="{x0 - 22}" cy="80" rx="14" ry="9" fill="#fff" opacity=".45"/>')
for x, name in zip(cols, ['Bút bi', 'Quyển vở', 'Chiếc hộp cười', 'Quả bóng gỗ']):
    parts.append(text(x, 216, name, size=22, weight=600))
# hàng tiền
parts.append(f'<rect x="8" y="232" width="{W - 16}" height="88" rx="10" fill="#E8ECF0"/>')
for x, v in zip(cols, [2000, 50000, 10000, 20000]):
    parts.append(banknote(x - 76, 240, 152, 72, v))
save('bai68_t1_q3_items', W, H, parts, folder=FOLDER)
