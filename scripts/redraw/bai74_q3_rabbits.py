"""
Vở BT Toán 2, Bài 74 Q3 — 3 con thỏ và hai chuồng M, N: nét riêng.
Giữ nội dung toán: hai chuồng ghi chữ M (trái) và N (phải) trong vòng tròn, đúng 3 con
thỏ bên dưới, khung viền nét đứt bo góc.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 436, 289
parts = [f'<rect x="4" y="4" width="{W - 8}" height="{H - 8}" rx="18" fill="{WHITE}" stroke="{INK}" stroke-width="2.4" stroke-dasharray="10 7"/>']
parts.append(f'<path d="M14,{H - 30} Q218,{H - 50} {W - 14},{H - 30} L{W - 14},{H - 14} Q{W - 14},{H - 8} {W - 22},{H - 8} L22,{H - 8} Q14,{H - 8} 14,{H - 14} Z" fill="{GRASS}" opacity=".55"/>')


def hutch(cx, letter, wall, roof):
    s = [f'<rect x="{cx - 48}" y="62" width="96" height="84" rx="4" fill="{wall}" {st(2.8)}/>',
         f'<path d="M{cx - 70},66 L{cx},18 L{cx + 70},66 Z" fill="{roof}" {st(2.8)}/>',
         f'<path d="M{cx - 20},146 L{cx - 20},128 Q{cx},116 {cx + 20},128 L{cx + 20},146" fill="{BROWN}" opacity=".35" stroke="{INK}" stroke-width="2"/>',
         f'<circle cx="{cx}" cy="98" r="21" fill="{WHITE}" {st(2.8)}/>',
         text(cx, 107, letter, size=24, weight=700)]
    return '\n'.join(s)


parts.append(hutch(130, 'M', CREAM, ORANGE))
parts.append(hutch(306, 'N', CREAM, TEAL))
parts.append(g(rabbit(run=True), 80, 246, 1.0))
parts.append(g(rabbit('#F3E3D3', WHITE, back='#E2CDB6'), 290, 262, 0.95, flip=True))
parts.append(g(rabbit(), 372, 232, 0.8))
save('bai74_q3_rabbits', W, H, parts)
