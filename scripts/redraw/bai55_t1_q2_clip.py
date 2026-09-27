"""Vở BT Toán 2, Bài 55 Tiết 1 Q2 — cái kẹp giấy có mũi tên đo chiều dài: nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 200, 113
parts = []
d = 'M150,70 L40,70 A22,22 0 0 1 40,26 L168,26 A22,22 0 0 1 168,70 L64,70 A13,13 0 0 1 64,44 L140,44'
parts.append(f'<path d="{d}" fill="none" stroke="{INK}" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>')
parts.append(f'<path d="{d}" fill="none" stroke="{PURPLE}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>')
for x in (16, 191):
    parts.append(f'<line x1="{x}" y1="20" x2="{x}" y2="104" stroke="{INK}" stroke-width="2" stroke-dasharray="5 4"/>')
parts.append(f'<line x1="20" y1="94" x2="187" y2="94" stroke="{INK}" stroke-width="2.6"/>')
parts.append(f'<path d="M28,88 L18,94 L28,100 M179,88 L189,94 L179,100" fill="none" stroke="{INK}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>')
save('bai55_t1_q2_clip', W, H, parts)
