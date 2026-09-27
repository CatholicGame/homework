"""Vở BT Toán 2, Bài 47 Tiết 2 Q1 — hộp quà dài có ruy băng (khối hộp chữ nhật): nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 240, 153
x, y, w, h, dx, dy = 10, 70, 170, 64, 52, 50
parts = [box(x, y, w, h, 0, fill=PINK, dx=dx, dy=dy)]
rib = YELLOW
# ribbon across front, top and side
bx = x + 52
parts.append(f'<rect x="{bx}" y="{y}" width="18" height="{h}" fill="{rib}" {st(2.2)}/>')
parts.append(f'<path d="M{bx},{y} L{bx + dx},{y - dy} L{bx + dx + 18},{y - dy} L{bx + 18},{y} Z" fill="{rib}" {st(2.2)}/>')
parts.append(f'<path d="M{x + dx / 2},{y - dy / 2} L{x + w + dx / 2},{y - dy / 2} L{x + w + dx / 2 + 7},{y - dy / 2 - 7} L{x + dx / 2 + 7},{y - dy / 2 - 7} Z" fill="{rib}" {st(2.2)}/>')
parts.append(f'<path d="M{x + w + dx / 2},{y - dy / 2 + 2} L{x + w + dx / 2},{y + h - dy / 2} L{x + w + dx / 2 + 7},{y + h - dy / 2 - 7} L{x + w + dx / 2 + 7},{y - dy / 2 - 5} Z" fill="{rib}" {st(2.2)}/>')
# bow at the crossing
kx, ky = bx + dx / 2 + 12, y - dy / 2 - 4
parts.append(f'<path d="M{kx},{ky} C{kx - 34},{ky - 30} {kx - 40},{ky + 6} {kx},{ky} Z" fill="{ORANGE}" {st(2.2)}/>')
parts.append(f'<path d="M{kx},{ky} C{kx + 34},{ky - 30} {kx + 40},{ky + 6} {kx},{ky} Z" fill="{ORANGE}" {st(2.2)}/>')
parts.append(f'<circle cx="{kx}" cy="{ky}" r="6" fill="{ORANGE}" {st(2.2)}/>')
save('bai47_t2_q1_gift', W, H, parts)
