"""Vở BT Toán 2, Bài 55 Tiết 1 Q2 — cái bàn có mũi tên đo chiều dài mặt bàn: nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 420, 156
WOOD, WOOD_D = '#D9A066', '#B77D45'
parts = []
parts.append(f'<path d="M8,34 L40,18 L412,18 L412,34 Z" fill="{mix(WOOD, .35)}" {st(2.8)}/>')
for x in (22, 356):
    parts.append(f'<rect x="{x}" y="46" width="24" height="102" rx="3" fill="{WOOD_D}" {st(2.8)}/>')
for x in (60, 386):
    parts.append(f'<rect x="{x}" y="46" width="18" height="84" rx="3" fill="{mix(WOOD_D, -.2)}" {st(2.4)}/>')
parts.append(f'<rect x="8" y="34" width="404" height="16" rx="3" fill="{WOOD}" {st(2.8)}/>')
parts.append(f'<rect x="30" y="50" width="360" height="10" fill="{WOOD_D}" {st(2.2)}/>')
parts.append(f'<line x1="10" y1="7" x2="410" y2="7" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<path d="M18,2 L9,7 L18,12 M402,2 L411,7 L402,12" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
parts.append(f'<line x1="8" y1="2" x2="8" y2="34" stroke="{INK}" stroke-width="1.6"/>')
parts.append(f'<line x1="412" y1="2" x2="412" y2="18" stroke="{INK}" stroke-width="1.6"/>')
save('bai55_t1_q2_table', W, H, parts)
