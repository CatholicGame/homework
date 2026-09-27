"""
Vở BT Toán 2, Bài 49 Tiết 2 Q2 — giá sách 4 ngăn: nét riêng.
Giữ nội dung toán: các quyển sách cùng bề dày; ngăn trên cùng 20 quyển, ngăn thứ hai 40,
ngăn thứ ba 30, ngăn dưới cùng 10 (mẫu: khoảng 10 quyển) — độ dài hàng sách tỉ lệ đúng.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 800, 468
BW = 17                       # bề dày một quyển
COLS = [BLUE, YELLOW, RED, GREEN, PURPLE, ORANGE, TEAL, PINK]
parts = [f'<rect x="10" y="8" width="780" height="452" rx="16" fill="{BROWN}" {st(3)}/>',
         f'<rect x="30" y="24" width="740" height="416" rx="6" fill="#F3E3CF" {st(2.4)}/>']
boards = [124, 228, 330, 432]
counts = [20, 40, 30, 10]
top = 24
for k, (by, n) in enumerate(zip(boards, counts)):
    for i in range(n):
        x = 36 + i * BW
        hgt = 84 + (i * 7 % 5) * 2
        c = COLS[(i + k * 3) % len(COLS)]
        parts.append(f'<rect x="{x}" y="{by - hgt}" width="{BW}" height="{hgt}" rx="2.5" fill="{c}" {st(2)}/>')
        parts.append(f'<line x1="{x + 3}" y1="{by - hgt + 12}" x2="{x + BW - 3}" y2="{by - hgt + 12}" stroke="#fff" stroke-width="2" opacity=".7"/>')
        parts.append(f'<line x1="{x + 3}" y1="{by - 14}" x2="{x + BW - 3}" y2="{by - 14}" stroke="#fff" stroke-width="2" opacity=".7"/>')
    if k < 3:
        parts.append(f'<rect x="22" y="{by}" width="756" height="12" rx="3" fill="#D29A69" {st(2.4)}/>')
parts.append(f'<rect x="22" y="432" width="756" height="12" rx="3" fill="#D29A69" {st(2.4)}/>')
save('bai49_t2_q2_shelf', W, H, parts)
