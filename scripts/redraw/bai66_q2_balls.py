"""
Vở BT Toán 2, Bài 66 Q2 — hộp trong suốt đựng 4 quả bóng màu xanh: nét riêng.
Giữ nội dung toán: đúng 4 quả bóng, tất cả cùng màu xanh, không có quả trắng nào.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 500, 373
BALL, BALL_D = '#4DB2EC', '#2B86C4'
# box: front rect + back offset (dx, dy)
FX, FY, FW, FH = 8, 142, 372, 222
DX, DY = 112, -134


def ball(cx, cy, r):
    return (f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{BALL}" stroke="{INK}" stroke-width="3"/>'
            f'<path d="M{cx - r * 0.95},{cy - r * 0.2} Q{cx},{cy + r * 0.35} {cx + r * 0.95},{cy - r * 0.2}" fill="none" stroke="{BALL_D}" stroke-width="3"/>'
            f'<path d="M{cx - r * 0.1},{cy - r} Q{cx + r * 0.45},{cy} {cx - r * 0.1},{cy + r}" fill="none" stroke="{BALL_D}" stroke-width="3"/>'
            f'<ellipse cx="{cx - r * 0.45}" cy="{cy - r * 0.5}" rx="{r * 0.22}" ry="{r * 0.12}" fill="#fff" opacity=".7" transform="rotate(-35 {cx - r * 0.45} {cy - r * 0.5})"/>')


bx, by = FX + DX, FY + DY
parts = [
    # back + side panels (tinted glass)
    f'<path d="M{bx},{by} L{bx + FW},{by} L{bx + FW},{by + FH} L{bx},{by + FH} Z" fill="#E4F4FC" stroke="{INK}" stroke-width="2" opacity=".9"/>',
    f'<path d="M{FX},{FY + FH} L{bx},{by + FH} L{bx + FW},{by + FH} L{FX + FW},{FY + FH} Z" fill="#D2ECF8"/>',
    ball(190, 172, 82), ball(362, 158, 80),
    ball(112, 264, 90), ball(300, 262, 90),
    # front glass + edges
    f'<rect x="{FX}" y="{FY}" width="{FW}" height="{FH}" fill="#CDEBFA" opacity=".15"/>',
    f'<path d="M{FX + FW},{FY} L{bx + FW},{by} L{bx + FW},{by + FH} L{FX + FW},{FY + FH} Z" fill="#CDEBFA" fill-opacity=".14" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
    f'<path d="M{FX},{FY} L{bx},{by} L{bx + FW},{by} L{FX + FW},{FY} Z" fill="#CDEBFA" fill-opacity=".2" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>',
    f'<rect x="{FX}" y="{FY}" width="{FW}" height="{FH}" fill="none" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>',
    f'<path d="M{FX + 24},{FY + 30} L{FX + 70},{FY + 14} M{FX + 24},{FY + 56} L{FX + 110},{FY + 26}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>',
]
save('bai66_q2_balls', W, H, parts)
