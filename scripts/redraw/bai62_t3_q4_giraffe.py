"""
Vở BT Toán 2, Bài 62 Tiết 3 Q4 — hươu cao cổ trong khung (nét riêng).
Chỉ là hình con vật để nối với cân nặng; không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 400, 242
Y, YD, SP = '#F7C85C', '#E0A43A', '#C9793A'
p = [frame(W, H)]
# chân xa
for x in (146, 206):
    p.append(leg(x, 150, 224, 15, YD, BROWN))
# đuôi
p.append(f'<path d="M122,134 C108,150 104,168 106,182" fill="none" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
p.append(f'<ellipse cx="106" cy="186" rx="5" ry="8" fill="{BROWN}" {STK}/>')
# cổ
p.append(f'<path d="M198,126 L236,40 L264,52 L232,136 Z" fill="{Y}" {STK}/>')
# thân
p.append(f'<ellipse cx="176" cy="140" rx="60" ry="30" fill="{Y}" {STK}/>')
# chân gần
for x in (134, 218):
    p.append(leg(x, 150, 226, 16, Y, BROWN))
# đốm
for cx, cy, r in ((150, 132, 9), (178, 150, 8), (200, 128, 9), (160, 156, 6), (222, 148, 6), (238, 80, 7), (248, 60, 5), (230, 104, 7)):
    p.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{SP}"/>')
# bờm
p.append(f'<path d="M232,44 L202,124" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>')
# đầu
for x in (246, 262):
    p.append(f'<line x1="{x}" y1="30" x2="{x - 2}" y2="19" stroke="{INK}" stroke-width="3"/><circle cx="{x - 2}" cy="18" r="5" fill="{BROWN}" {STK}/>')
p.append(f'<ellipse cx="236" cy="28" rx="12" ry="6" fill="{Y}" {STK} transform="rotate(-25 236 28)"/>')
p.append(f'<path d="M244,22 C262,18 276,28 296,40 C304,48 298,60 286,60 C272,60 256,54 246,46 C236,38 236,26 244,22 Z" fill="{Y}" {STK}/>')
p.append(f'<ellipse cx="290" cy="50" rx="11" ry="9" fill="#F9DE9A"/>')
p.append(cute_eye(262, 34, 4.5))
p.append(f'<circle cx="292" cy="46" r="1.8" fill="{INK}"/>')
p.append(f'<path d="M284,56 q6,3 11,-1" fill="none" stroke="{INK}" stroke-width="1.8" stroke-linecap="round"/>')
save('bai62_t3_q4_giraffe', W, H, p)
