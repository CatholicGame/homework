"""
Vở BT Toán 3 Tập hai, Bài 74 Q3 (trang 104) — Nam và khay 4 chiếc bánh quy giống hệt
nhau bề ngoài (nét riêng). Nội dung giữ lại: 4 bánh trên một khay, không nhìn thấy nhân.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g1 import kid

W, H = 460, 300
parts = []
parts.append(kid(120, 294, h=250, pose='wave', shirt=BLUE))
# khay
tx, ty, tw, th = 220, 170, 220, 96
parts.append(f'<rect x="{tx}" y="{ty}" width="{tw}" height="{th}" rx="18" fill="{SKY_D}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<rect x="{tx + 12}" y="{ty + 10}" width="{tw - 24}" height="{th - 20}" rx="12" fill="{SKY}" stroke="{INK}" stroke-width="2"/>')
for bx, by in ((tx + 62, ty + 32), (tx + 148, ty + 32), (tx + 62, ty + 62), (tx + 148, ty + 62)):
    parts.append(f'<ellipse cx="{bx}" cy="{by}" rx="30" ry="13" fill="#E9B872" stroke="{INK}" stroke-width="2.4"/>')
    parts.append(f'<ellipse cx="{bx}" cy="{by - 2}" rx="20" ry="7" fill="#F4D29C"/>')
    for dx in (-10, 2, 12):
        parts.append(f'<circle cx="{bx + dx}" cy="{by - 3 + (dx % 3)}" r="1.8" fill="#B07A4F"/>')
save('bai74_q3_cookies', W, H, parts, folder='grade3-workbook-2')
