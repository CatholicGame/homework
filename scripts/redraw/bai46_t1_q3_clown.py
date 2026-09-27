"""
Vở BT Toán 2, Bài 46 Tiết 1 Q3 — chú hề bằng gỗ: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: chú hề có đúng 7 khối cầu — quả cầu trên chóp mũ, đầu,
thân, 2 tay, 2 chân. Mũ là hình nón (không phải khối cầu). Không thêm cúc áo / mũi tròn
hay chi tiết tròn nào khác có thể bị đếm nhầm là khối cầu.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g5 import *

W, H = 420, 717
parts = []
st = f'stroke="{INK}" stroke-width="3" stroke-linejoin="round"'

# thân (khối cầu lớn)
parts += sphere(210, 520, 168, PURPLE, shadow=False)
# đầu
parts += sphere(210, 300, 90, SKIN, shadow=False)
# mặt
for sx in (-1, 1):
    ex = 210 + sx * 32
    parts.append(f'<path d="M{ex - 16},262 Q{ex},{252} {ex + 16},262" fill="none" stroke="{HAIR}" stroke-width="5" stroke-linecap="round"/>')
    parts.append(f'<ellipse cx="{ex}" cy="286" rx="9" ry="12" fill="{INK}"/>')
    parts.append(f'<ellipse cx="{ex + 3}" cy="281" rx="3" ry="4" fill="{WHITE}"/>')
    parts.append(f'<ellipse cx="{210 + sx * 56}" cy="322" rx="15" ry="9" fill="{PINK}" opacity="0.7"/>')
parts.append(f'<path d="M210,292 L198,322 L222,322 Z" fill="{ORANGE}" {st}/>')
parts.append(f'<path d="M176,338 Q210,366 244,338" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>')
# mũ hình nón (sọc)
ax, ay, by, brx, bry = 210, 92, 222, 86, 16
cid = uid('hat')
cone = f'M{ax},{ay} L{ax - brx},{by} A{brx},{bry} 0 0 0 {ax + brx},{by} Z'
parts.append(f'<defs><clipPath id="{cid}"><path d="{cone}"/></clipPath></defs>')
parts.append(f'<path d="{cone}" fill="{TEAL}"/>')
stripes = ''.join(
    f'<path d="M{ax - brx * f - 4},{ay + (by - ay) * f} A{brx * f + 4},{bry * f + 3} 0 0 0 {ax + brx * f + 4},{ay + (by - ay) * f} '
    f'L{ax + brx * g + 4},{ay + (by - ay) * g} A{brx * g + 4},{bry * g + 3} 0 0 1 {ax - brx * g - 4},{ay + (by - ay) * g} Z" fill="{YELLOW}"/>'
    for f, g in ((0.30, 0.44), (0.58, 0.72), (0.86, 1.0)))
parts.append(f'<g clip-path="url(#{cid})">{stripes}</g>')
parts.append(f'<path d="{cone}" fill="none" {st}/>')
# quả cầu trên chóp mũ
parts += sphere(210, 58, 38, RED, shadow=False)
# hai tay
parts += sphere(72, 392, 62, RED, shadow=False)
parts += sphere(348, 386, 62, RED, shadow=False)
# hai chân
parts += sphere(96, 644, 62, BLUE, shadow=False)
parts += sphere(316, 644, 62, BLUE, shadow=False)
save('bai46_t1_q3_clown', W, H, parts)
