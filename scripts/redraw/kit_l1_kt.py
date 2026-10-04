"""
Bộ vẽ riêng cho Vở BT Toán 1, Bài 24–28 và Tự kiểm tra: chim én đậu dây, bạn nhỏ chạy,
ô số có viền. Nét riêng: phẳng, viền INK, màu tươi.

    import sys, os; sys.path.insert(0, os.path.dirname(__file__))
    from common import *
    import kit_l1_kt as kt

Gốc (0,0) = giữa đáy (chỗ chân chạm dây/đất), trừ khi ghi khác.
"""
from common import *


def st(w=2.6, c=INK):
    return f'stroke="{c}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def put(x, y, inner, s=1.0, flip=False, rot=0):
    fx = -s if flip else s
    r = f' rotate({rot})' if rot else ''
    return f'<g transform="translate({x:.1f},{y:.1f}){r} scale({fx:.4f},{s:.4f})">{inner}</g>'


def swallow(back='#3B5B8C', belly='#FFF6E6', throat='#F07167'):
    """Chim én đậu, nhìn sang phải, cao ~96 (đầu tới chóp đuôi chẻ), chân ở y=0."""
    s = []
    # đuôi chẻ đôi thõng xuống dưới dây
    s.append(f'<path d="M-10,-20 L-22,44 L-12,22 L-4,46 L2,-16 Z" fill="{back}" {st()}/>')
    # thân
    s.append(f'<path d="M-16,-30 Q-20,-62 4,-66 Q24,-64 24,-36 Q22,-6 2,-2 Q-14,-4 -16,-30 Z" fill="{belly}" {st()}/>')
    # cánh (lưng) phủ phía sau
    s.append(f'<path d="M-18,-34 Q-22,-64 2,-66 Q-6,-44 -2,-24 Q-4,-2 -20,10 Q-24,-10 -18,-34 Z" fill="{back}" {st()}/>')
    # đầu
    s.append(f'<circle cx="10" cy="-70" r="15" fill="{back}" {st()}/>')
    s.append(f'<path d="M6,-60 Q14,-50 22,-58 Q22,-64 16,-64 Z" fill="{throat}" {st(2)}/>')
    s.append(f'<path d="M23,-73 L34,-69 L23,-65 Z" fill="{YELLOW}" {st(2)}/>')
    s.append(f'<circle cx="15" cy="-74" r="3.2" fill="#fff"/><circle cx="15.6" cy="-74" r="2" fill="{INK}"/>')
    # chân bám dây
    s.append(f'<path d="M0,-4 v4 M8,-5 v5" stroke="{INK}" stroke-width="3" stroke-linecap="round"/>')
    return ''.join(s)


def num_box(x, y, n, w=44, size=28):
    """Ô vuông có số (tâm x, đỉnh y)."""
    return (f'<rect x="{x - w / 2}" y="{y}" width="{w}" height="{w}" rx="4" fill="#fff" {st(2.6)}/>'
            + text(x, y + w / 2 + size * .36, str(n), size=size, weight=700))


def frame(x, y, w, h, r=22, fill='#FFFDF6', sw=3):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" {st(sw)}/>'


def wire(x0, x1, y, sag=6):
    return f'<path d="M{x0},{y} Q{(x0 + x1) / 2},{y + sag} {x1},{y}" fill="none" stroke="{INK}" stroke-width="3"/>'


def speed_lines(x, y, n=3, L=34, gap=12):
    """Vạch chạy (sau lưng bạn nhỏ đang chạy), đầu phải ở x."""
    return ''.join(f'<path d="M{x - L + i * 6},{y + i * gap} H{x}" stroke="{INK}" stroke-width="3" stroke-linecap="round" opacity=".45"/>'
                   for i in range(n))


def ripple(cx, y, w):
    return (f'<path d="M{cx - w / 2},{y} q{w / 8},-6 {w / 4},0 t{w / 4},0 t{w / 4},0 t{w / 4},0" fill="none" '
            f'stroke="#5BA9D6" stroke-width="3" stroke-linecap="round"/>')
