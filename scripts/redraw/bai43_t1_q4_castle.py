"""
Vở BT Toán 3, Bài 43 Tiết 1 câu 4 — lâu đài xếp khối: tầng dưới 4×4 = 16 khối lập phương,
tầng trên 4 khối lập phương ở 4 góc (tổng 20), 2 khối trụ (to ở giữa + cao nhỏ trên nó),
1 khối cầu trên cùng. Chiếu xiên, nét riêng.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from kit_w2 import *

W, H = 760, 905
A, DX, DY = 110, 50, 40
X0, YB = 40, 880
SW = 3.5
CUBE = '#8FD0F2'
CUBE2 = '#FFC98B'


def cube(i, j, k, col):
    x = X0 + i * A + j * DX
    yb = YB - k * A - j * DY
    return box3d(x, yb, A, A, DX, DY, col, SW)


parts = []
for j in (3, 2, 1, 0):
    for i in range(4):
        parts.append(cube(i, j, 0, CUBE))
# tầng trên: hai khối góc phía sau
for i in (0, 3):
    parts.append(cube(i, 3, 1, CUBE2))
# khối trụ to đặt giữa
cx = X0 + 2 * A + 2 * DX
cy = YB - A - 2 * DY
R, K = 100, .36
parts.append(cylinder(cx, cy, 2 * R, 210, PURPLE, SW, ry=R * K))
# khối trụ cao, nhỏ
r2 = 46
parts.append(cylinder(cx, cy - 210, 2 * r2, 300, PINK, SW, ry=r2 * K))
# khối cầu
parts.append(sphere(cx, cy - 210 - 300 - 46, 58, YELLOW, SW))
# tầng trên: hai khối góc phía trước
for i in (0, 3):
    parts.append(cube(i, 0, 1, CUBE2))
save('bai43_t1_q4_castle', W, H, parts, folder='grade3-workbook')
