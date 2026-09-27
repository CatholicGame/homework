"""
Vở BT Toán 2, Bài 47 Tiết 1 Q4 — người tuyết: nét riêng.
Giữ nội dung toán: người tuyết gồm các khối tuyết tròn (khối cầu), khối dưới cùng lớn nhất
và rõ dạng khối cầu (đáp án: khối cầu).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *

W, H = 400, 494
SNOW = '#EAF6FD'
parts = []
# ground snow
parts.append(f'<path d="M-4,470 C80,452 150,462 200,458 C260,454 330,450 404,466 L404,500 L-4,500 Z" fill="#DDEFF9" {st(2.6)}/>')


def snowball(cx, cy, r):
    g = uid('sn')
    return (f'<defs><radialGradient id="{g}" cx=".36" cy=".32" r=".8"><stop offset="0" stop-color="{WHITE}"/>'
            f'<stop offset=".6" stop-color="{SNOW}"/><stop offset="1" stop-color="#B9DDF2"/></radialGradient></defs>'
            f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{g})" {st(3)}/>')


# stick arms (behind)
parts.append(f'<path d="M150,236 L86,170 M104,188 L84,196 M112,196 L104,176" fill="none" stroke="{BROWN}" stroke-width="7" stroke-linecap="round"/>')
parts.append(f'<path d="M252,236 L318,166 M300,186 L322,190 M292,194 L298,172" fill="none" stroke="{BROWN}" stroke-width="7" stroke-linecap="round"/>')
parts.append(snowball(200, 378, 98))
parts.append(snowball(200, 232, 70))
parts.append(snowball(200, 118, 54))
# buttons
for y in (212, 246, 330, 366, 402):
    parts.append(f'<circle cx="200" cy="{y}" r="7" fill="{PURPLE}" {st(2)}/>')
# scarf
parts.append(f'<path d="M150,164 C176,178 224,178 250,164 L252,182 C226,196 174,196 148,182 Z" fill="{RED}" {st(2.6)}/>')
parts.append(f'<path d="M226,184 L236,238 L256,232 L244,180 Z" fill="{RED}" {st(2.6)}/>')
for y in (206, 222):
    parts.append(f'<line x1="{233 + (y - 200) * .15:.0f}" y1="{y}" x2="{250 + (y - 200) * .15:.0f}" y2="{y - 4}" stroke="{WHITE}" stroke-width="3"/>')
# face
parts.append(eyes_smile(200, 120, gap=16, r=5, sw=2.4))
parts.append(f'<path d="M200,130 L244,138 L200,140 Z" fill="{ORANGE}" {st(2.4)}/>')
parts.append(f'<circle cx="174" cy="136" r="7" fill="{PINK}" opacity=".7"/><circle cx="228" cy="144" r="6" fill="{PINK}" opacity=".7"/>')
# hat: pompom beanie
parts.append(f'<path d="M152,94 C150,40 250,40 248,94 Z" fill="{TEAL}" {st(2.8)}/>')
parts.append(f'<rect x="146" y="86" width="108" height="18" rx="9" fill="{YELLOW}" {st(2.8)}/>')
parts.append(f'<circle cx="200" cy="44" r="13" fill="{YELLOW}" {st(2.8)}/>')
save('bai47_t1_q4_snowman', W, H, parts)
