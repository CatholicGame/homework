"""
Vở BT Toán 3 Tập hai, Bài 46 Tiết 2 Q4 — bốn chiếc cốc ghi năm sinh: nét riêng.
Giữ nội dung toán: 1 983, 2 011, 2 015, 1 983 (thứ tự sách).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 760, 160
s = []


def st(w=2.8):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


COLS = [BLUE, YELLOW, PINK, GREEN]
for i, n in enumerate(['1 983', '2 011', '2 015', '1 983']):
    cx = 88 + i * 190
    s.append(f'<path d="M{cx + 50},{50} C{cx + 92},{44} {cx + 92},{118} {cx + 44},{112}" fill="none" stroke="{INK}" stroke-width="18" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx + 50},{50} C{cx + 92},{44} {cx + 92},{118} {cx + 44},{112}" fill="none" stroke="{COLS[i]}" stroke-width="12" stroke-linecap="round"/>')
    s.append(f'<path d="M{cx - 62},{24} H{cx + 62} L{cx + 52},{140} Q{cx + 50},{152} {cx + 38},{152} H{cx - 38} Q{cx - 50},{152} {cx - 52},{140} Z" fill="{COLS[i]}" {st()}/>')
    s.append(f'<ellipse cx="{cx}" cy="{24}" rx="62" ry="10" fill="{WHITE}" {st()}/>')
    s.append(f'<rect x="{cx - 46}" y="{66}" width="92" height="38" rx="12" fill="{WHITE}" {st(2.2)}/>')
    s.append(text(cx, 94, n, size=26, weight=700))
save('bai46_t2_q4_mugs', W, H, s, folder='grade3-workbook-2')
