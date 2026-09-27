"""
Vở BT Toán 2, Bài 62 Tiết 3 Q4 — con trâu trong khung (nét riêng).
Chỉ là hình con vật để nối với cân nặng; không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 400, 241
B, BD, BL = '#7D8794', '#606A77', '#A9B3BE'
p = [frame(W, H)]
for x in (130, 238):
    p.append(leg(x, 150, 208, 20, BD, INK))
p.append(f'<path d="M104,124 C90,134 86,156 90,172" fill="none" stroke="{INK}" stroke-width="3.2" stroke-linecap="round"/>')
p.append(f'<path d="M86,170 l4,14 l6,-12 Z" fill="{INK}"/>')
p.append(f'<ellipse cx="180" cy="134" rx="84" ry="44" fill="{B}" {STK}/>')
p.append(f'<path d="M126,150 C160,172 210,172 244,152" fill="none" stroke="{BL}" stroke-width="8" stroke-linecap="round" opacity=".7"/>')
for x in (116, 222):
    p.append(leg(x, 156, 212, 21, B, INK))
# đầu
p.append(f'<path d="M258,100 C284,92 306,104 312,126 C318,148 310,168 290,170 C270,172 254,156 250,136 C247,120 248,106 258,100 Z" fill="{B}" {STK}/>')
p.append(f'<ellipse cx="296" cy="156" rx="20" ry="14" fill="{BL}" {STK}/>')
p.append(f'<circle cx="289" cy="156" r="2.4" fill="{INK}"/><circle cx="303" cy="156" r="2.4" fill="{INK}"/>')
p.append(cute_eye(274, 124, 4.6))
p.append(cute_eye(300, 122, 4.6))
# tai
p.append(f'<ellipse cx="248" cy="112" rx="14" ry="7" fill="{BD}" {STK} transform="rotate(20 248 112)"/>')
# sừng cong
p.append(f'<path d="M262,102 C236,96 222,76 232,56 C238,74 254,84 272,90 Z" fill="{CREAM}" {STK}/>')
p.append(f'<path d="M300,100 C326,92 336,72 326,52 C322,70 306,80 290,88 Z" fill="{CREAM}" {STK}/>')
save('bai62_t3_q4_buffalo', W, H, p)
