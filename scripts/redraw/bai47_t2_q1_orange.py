"""Vở BT Toán 2, Bài 47 Tiết 2 Q1 — quả cam có cuống lá (khối cầu): nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 220, 214
cx, cy, r = 104, 122, 84
parts = [sphere(cx, cy, r, fill=ORANGE)]
for x, y in ((80, 170), (96, 182), (118, 176), (132, 164), (110, 158), (88, 150), (140, 186)):
    parts.append(f'<circle cx="{x}" cy="{y}" r="1.8" fill="{mix(ORANGE, -.35)}"/>')
parts.append(f'<path d="M{cx + 8},{cy - r + 6} Q{cx + 16},{cy - r - 12} {cx + 34},{cy - r - 26}" fill="none" stroke="{BROWN}" stroke-width="5" stroke-linecap="round"/>')
parts.append(f'<path d="M{cx + 18},{cy - r - 14} C{cx + 50},{cy - r - 44} {cx + 92},{cy - r - 30} {cx + 104},{cy - r - 8} C{cx + 70},{cy - r + 4} {cx + 40},{cy - r + 2} {cx + 18},{cy - r - 14} Z" fill="{GREEN}" {st(2.6)}/>')
parts.append(f'<path d="M{cx + 22},{cy - r - 13} Q{cx + 60},{cy - r - 22} {cx + 100},{cy - r - 9}" fill="none" stroke="{GRASS_D}" stroke-width="2"/>')
parts.append(f'<path d="M{cx + 10},{cy - r - 6} C{cx - 20},{cy - r - 36} {cx - 60},{cy - r - 26} {cx - 74},{cy - r - 6} C{cx - 44},{cy - r + 6} {cx - 14},{cy - r + 4} {cx + 10},{cy - r - 6} Z" fill="{GREEN}" {st(2.6)}/>')
parts.append(f'<circle cx="{cx + 6}" cy="{cy - r + 4}" r="5" fill="{GRASS_D}" {st(2)}/>')
save('bai47_t2_q1_orange', W, H, parts)
