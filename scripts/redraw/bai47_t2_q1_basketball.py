"""Vở BT Toán 2, Bài 47 Tiết 2 Q1 — quả bóng rổ (khối cầu): nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 200, 201
cx, cy, r = 100, 100, 88
parts = [sphere(cx, cy, r, fill='#F28C3A', shine=False)]
seam = f'fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"'
parts.append(f'<line x1="{cx - r}" y1="{cy}" x2="{cx + r}" y2="{cy}" {seam}/>')
parts.append(f'<line x1="{cx}" y1="{cy - r}" x2="{cx}" y2="{cy + r}" {seam}/>')
parts.append(f'<path d="M{cx - 62},{cy - 62} C{cx - 30},{cy - 30} {cx - 30},{cy + 30} {cx - 62},{cy + 62}" {seam}/>')
parts.append(f'<path d="M{cx + 62},{cy - 62} C{cx + 30},{cy - 30} {cx + 30},{cy + 30} {cx + 62},{cy + 62}" {seam}/>')
parts.append(f'<ellipse cx="{cx - 40}" cy="{cy - 50}" rx="16" ry="9" transform="rotate(-35 {cx - 40} {cy - 50})" fill="{WHITE}" opacity=".55"/>')
save('bai47_t2_q1_basketball', W, H, parts)
