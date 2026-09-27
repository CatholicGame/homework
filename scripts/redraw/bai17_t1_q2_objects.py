"""
Vở BT Toán 2, Bài 17 Tiết 1 Q2 — ước lượng vật nặng hơn / nhẹ hơn: nét riêng.

Nội dung toán giữ đúng sách: a) một quyển sách to và một cái bút mực;
b) một cái bút chì và một hộp bút. Hai ô cách nhau bằng đường kẻ dọc.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g1 import pencil, fountain_pen

W, H = 900, 325
P = []
P.append(text(8, 42, 'a)', size=30, weight=600, anchor='start'))
P.append(text(580, 42, 'b)', size=30, weight=600, anchor='start'))
P.append(f'<line x1="526" y1="0" x2="526" y2="{H}" stroke="{INK}" stroke-width="2.5"/>')

# a) quyển sách nằm nghiêng (bìa + độ dày)
cover = 'M40,262 L118,92 L292,82 L214,252 Z'
P.append(f'<path d="M40,262 L214,252 L214,278 L40,290 Z" fill="{CREAM}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
for k in (0.3, 0.55, 0.8):
    P.append(f'<line x1="44" y1="{266 + 20 * k:.1f}" x2="210" y2="{255 + 20 * k:.1f}" stroke="{INK}" stroke-width="1.2" opacity=".35"/>')
P.append(f'<path d="M214,252 L292,82 L292,110 L214,278 Z" fill="{ORANGE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
P.append(f'<path d="{cover}" fill="#FFB86B" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
P.append(f'<path d="M92,210 L140,110 L240,104 L192,204 Z" fill="#FFE3B8" stroke="{INK}" stroke-width="2.5" stroke-linejoin="round"/>')
P.append(f'<path d="M150,130 L220,126 M140,150 L210,146 M130,170 L180,167" stroke="{INK}" stroke-width="3" stroke-linecap="round" opacity=".55"/>')
P.append(f'<circle cx="160" cy="186" r="8" fill="{RED}" stroke="{INK}" stroke-width="2"/>')
# bút mực
P.append(fountain_pen(300, 290, 440, 150, w=20, body=TEAL, cap='#3E8FC8'))

# b) bút chì + hộp bút
P.append(pencil(600, 250, 668, 124, w=15, body=YELLOW))
bx0, by0, bw, bh = 650, 212, 240, 78
P.append(f'<rect x="{bx0}" y="{by0 + 30}" width="{bw}" height="{bh - 30}" rx="14" fill="{PURPLE}" stroke="{INK}" stroke-width="3"/>')
P.append(f'<rect x="{bx0 - 3}" y="{by0}" width="{bw + 6}" height="40" rx="16" fill="#D6CBFA" stroke="{INK}" stroke-width="3"/>')
P.append(f'<rect x="{bx0 + bw / 2 - 16}" y="{by0 + 34}" width="32" height="12" rx="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>')
P.append(f'<path d="M{bx0 + 18},{by0 + 12} H{bx0 + 90}" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>')
for i, c in enumerate((RED, TEAL, YELLOW)):
    P.append(f'<circle cx="{bx0 + 170 + i * 22}" cy="{by0 + 20}" r="6" fill="{c}" stroke="{INK}" stroke-width="2"/>')

save('bai17_t1_q2_objects', W, H, P)
