"""
Vở BT Toán 2, Bài 4 Tiết 2 Q3 — Mai và Nam gấp thuyền giấy: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: Mai (bạn gái, bên trái) có 10 thuyền = 9 trên bàn phía
Mai + 1 đang cầm trên tay; Nam (bạn trai, bên phải) có 6 thuyền = 5 trên bàn phía
Nam + 1 đang cầm trên tay. Nam kém Mai 4 thuyền; Mai cho Nam 2 thì bằng nhau.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 700, 328
parts = []
ST = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'
ST2 = f'stroke="{INK}" stroke-width="2" stroke-linejoin="round"'
TABLE, TABLE_D = '#F3D9B1', '#D9B383'


def boat(cx, cy, s=1.0, hull=WHITE, sail=GREY_L):
    """a folded paper boat, centred on its waterline"""
    w, h = 30 * s, 13 * s
    parts.append(f'<path d="M{cx - w},{cy - h * 0.6} L{cx + w},{cy - h * 0.6} L{cx + w * 0.62},{cy + h} L{cx - w * 0.62},{cy + h} Z" fill="{hull}" {ST2}/>')
    parts.append(f'<path d="M{cx - w * 0.45},{cy - h * 0.6} L{cx},{cy - h * 2.4} L{cx + w * 0.45},{cy - h * 0.6} Z" fill="{sail}" {ST2}/>')
    parts.append(f'<line x1="{cx}" y1="{cy - h * 2.4}" x2="{cx}" y2="{cy - h * 0.6}" stroke="{INK}" stroke-width="1.4"/>')
    parts.append(f'<line x1="{cx - w * 0.8}" y1="{cy - h * 0.1}" x2="{cx + w * 0.8}" y2="{cy - h * 0.1}" stroke="{SKY_D}" stroke-width="1.6"/>')


def eye(x, y):
    parts.append(f'<ellipse cx="{x}" cy="{y}" rx="4" ry="5.5" fill="{INK}"/><circle cx="{x + 1.5}" cy="{y - 2}" r="1.5" fill="#fff"/>')


# ── Mai (left): ponytail, headband, pink top ──────────────────
parts.append(f'<rect x="10" y="262" width="96" height="16" rx="6" fill="{BROWN}" {ST}/>')
parts.append(f'<rect x="22" y="276" width="10" height="44" fill="{BROWN}" {ST2}/><rect x="84" y="276" width="10" height="44" fill="{BROWN}" {ST2}/>')
parts.append(f'<path d="M20,264 C16,200 30,150 66,146 C104,146 118,200 112,264 Z" fill="{PINK}" {ST}/>')
parts.append(f'<path d="M34,86 C4,92 0,140 20,160 C22,130 30,110 40,100 Z" fill="{HAIR}" {ST}/>')          # ponytail
parts.append(f'<rect x="56" y="126" width="20" height="24" fill="{SKIN}" {ST2}/>')
parts.append(f'<circle cx="68" cy="92" r="40" fill="{SKIN}" {ST}/>')
parts.append(f'<path d="M28,92 C26,48 110,40 108,90 C96,70 70,62 44,74 C38,78 32,86 28,92 Z" fill="{HAIR}" {ST}/>')
parts.append(f'<path d="M32,74 C50,52 88,48 104,70" fill="none" stroke="{PURPLE}" stroke-width="6" stroke-linecap="round"/>')
eye(78, 96); eye(98, 96)
parts.append(f'<circle cx="70" cy="110" r="6" fill="#F6A3B4" opacity=".7"/>')
parts.append(f'<path d="M84,112 Q92,122 100,112 Z" fill="#E77A93" {ST2}/>')

# ── Nam (right): short hair, blue shirt ──────────────────────
parts.append(f'<rect x="596" y="262" width="96" height="16" rx="6" fill="{BROWN}" {ST}/>')
parts.append(f'<rect x="608" y="276" width="10" height="44" fill="{BROWN}" {ST2}/><rect x="670" y="276" width="10" height="44" fill="{BROWN}" {ST2}/>')
parts.append(f'<path d="M590,264 C586,196 600,146 638,142 C676,142 690,196 686,264 Z" fill="{BLUE}" {ST}/>')
parts.append(f'<path d="M624,146 L638,164 L652,146 Z" fill="{WHITE}" {ST2}/>')
parts.append(f'<rect x="628" y="122" width="20" height="24" fill="{SKIN}" {ST2}/>')
parts.append(f'<circle cx="636" cy="88" r="40" fill="{SKIN}" {ST}/>')
parts.append(f'<path d="M596,84 C590,40 660,30 678,70 L672,72 L666,58 L658,70 L648,56 L638,68 L626,54 L618,70 C610,74 602,80 596,84 Z" fill="{HAIR}" {ST}/>')
parts.append(f'<ellipse cx="674" cy="92" rx="7" ry="10" fill="{SKIN}" {ST2}/>')
eye(606, 94); eye(626, 94)
parts.append(f'<circle cx="636" cy="108" r="6" fill="#F6A3B4" opacity=".7"/>')
parts.append(f'<path d="M604,112 q7,5 14,0" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')

# ── table (top in perspective, front edge, legs) ─────────────
parts.append(f'<rect x="126" y="284" width="14" height="40" fill="{TABLE_D}" {ST2}/><rect x="560" y="284" width="14" height="40" fill="{TABLE_D}" {ST2}/>')
parts.append(f'<path d="M158,138 H542 L588,272 H112 Z" fill="{TABLE}" {ST}/>')
parts.append(f'<path d="M112,272 H588 V288 H112 Z" fill="{TABLE_D}" {ST}/>')

# Mai's 9 boats on her half of the table (3 rows × 3)
for row, y in enumerate((170, 212, 256)):
    for col in range(3):
        boat(200 + col * 62 - row * 10, y, 1.0 - 0.02 * (2 - row), WHITE, PINK)
# Nam's 5 boats on his half (3 + 2)
for x, y in [(424, 190), (486, 190), (542, 196), (438, 244), (504, 246)]:
    boat(x, y, 1.0, WHITE, SKY)

# ── hands holding one boat each (drawn over the table) ───────
# Mai: arm from her shoulder to the boat she is folding
parts.append(f'<path d="M100,172 Q132,170 144,134" fill="none" stroke="{INK}" stroke-width="20" stroke-linecap="round"/>')
parts.append(f'<path d="M100,172 Q132,170 144,134" fill="none" stroke="{PINK}" stroke-width="15" stroke-linecap="round"/>')
boat(146, 108, 1.0, WHITE, PINK)
parts.append(f'<circle cx="144" cy="128" r="10" fill="{SKIN}" {ST2}/>')
# Nam: holds his boat up with both hands
for sx in (0, 1):
    y0 = 176 + sx * 16
    parts.append(f'<path d="M612,{y0} Q580,{y0 - 4} 570,{124 + sx * 8}" fill="none" stroke="{INK}" stroke-width="20" stroke-linecap="round"/>')
    parts.append(f'<path d="M612,{y0} Q580,{y0 - 4} 570,{124 + sx * 8}" fill="none" stroke="{BLUE}" stroke-width="15" stroke-linecap="round"/>')
boat(562, 108, 1.0, WHITE, SKY)
parts.append(f'<circle cx="550" cy="122" r="10" fill="{SKIN}" {ST2}/><circle cx="574" cy="124" r="10" fill="{SKIN}" {ST2}/>')

save('bai4_t2_q3_boats', W, H, parts)
