"""
Vở BT Toán 2, Bài 4 Tiết 2 Q1 — ba cây bút: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Bút mực 13 cm, Bút chì 10 cm, Bút sáp 5 cm; ba cây
thẳng mép trái, độ dài tỉ lệ đúng với số đo (cùng một tỉ lệ px/cm).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 850, 284
X0 = 12
PX = 63            # px per cm  -> 13 cm = 819 px
parts = []


def label(cx, y, s):
    parts.append(text(cx, y, s, size=24, weight=600))


# ── Bút mực 13 cm ─────────────────────────────────────────────
L = 13 * PX; y, h = 50, 50; x1 = X0 + L
label(X0 + L / 2, 30, '13 cm')
# barrel (rounded back end), cap on the right with a clip
parts.append(f'<rect x="{X0}" y="{y}" width="{L - 4}" height="{h}" rx="18" fill="{PINK}" stroke="{INK}" stroke-width="3"/>')
cap = X0 + L - 300
parts.append(f'<path d="M{cap},{y} H{x1 - 22} Q{x1},{y} {x1},{y + h / 2} Q{x1},{y + h} {x1 - 22},{y + h} H{cap} Z" fill="{RED}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<rect x="{cap - 10}" y="{y - 3}" width="26" height="{h + 6}" rx="6" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<rect x="{cap + 60}" y="{y + 12}" width="190" height="14" rx="7" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>')
parts.append(f'<circle cx="{cap + 250}" cy="{y + 19}" r="10" fill="{YELLOW}" stroke="{INK}" stroke-width="2.5"/>')
for k in range(3):
    parts.append(f'<circle cx="{X0 + 170 + k * 26}" cy="{y + h / 2}" r="6" fill="#fff" opacity=".7"/>')
parts.append(text(X0 + 22, y + 33, 'Bút mực', size=22, weight=600, anchor='start'))

# ── Bút chì 10 cm ─────────────────────────────────────────────
L = 10 * PX; y, h = 150, 38; x1 = X0 + L
label(X0 + L / 2, 138, '10 cm')
body_end = x1 - 78
parts.append(f'<rect x="{X0}" y="{y}" width="26" height="{h}" rx="6" fill="{PINK}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<rect x="{X0 + 22}" y="{y}" width="16" height="{h}" fill="{GREY}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<rect x="{X0 + 38}" y="{y}" width="{body_end - X0 - 38}" height="{h}" fill="{GREEN}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<line x1="{X0 + 150}" y1="{y + h / 2}" x2="{body_end - 2}" y2="{y + h / 2}" stroke="{GRASS_D}" stroke-width="2"/>')
parts.append(f'<path d="M{body_end},{y} L{x1 - 22},{y + h / 2 - 7} L{x1 - 22},{y + h / 2 + 7} L{body_end},{y + h} '
             f'Q{body_end - 8},{y + h / 2} {body_end},{y} Z" fill="{CREAM}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<path d="M{x1 - 24},{y + h / 2 - 8} L{x1},{y + h / 2} L{x1 - 24},{y + h / 2 + 8} Z" fill="{INK}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
parts.append(text(X0 + 48, y + 27, 'Bút chì', size=22, weight=600, anchor='start'))

# ── Bút sáp 5 cm ──────────────────────────────────────────────
L = 5 * PX; y, h = 236, 38; x1 = X0 + L
label(X0 + L / 2, 224, '5 cm')
body_end = x1 - 50
parts.append(f'<rect x="{X0}" y="{y}" width="{body_end - X0}" height="{h}" rx="8" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
for sx in (body_end - 70, body_end - 50):
    parts.append(f'<rect x="{sx}" y="{y}" width="10" height="{h}" fill="{ORANGE}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<path d="M{body_end},{y + 4} L{x1 - 6},{y + h / 2 - 6} Q{x1},{y + h / 2} {x1 - 6},{y + h / 2 + 6} L{body_end},{y + h - 4} Z" '
             f'fill="{ORANGE}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(text(X0 + 14, y + 27, 'Bút sáp', size=22, weight=600, anchor='start'))

save('bai4_t2_q1_pens', W, H, parts)
