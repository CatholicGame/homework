"""
Vở BT Toán 2, Bài 75 Tiết 2 Q2 — bốn con bò A, B, C, D nằm trên rơm: nét riêng.
Giữ nội dung toán: chữ A, B, C, D (trái → phải) và cân nặng ghi trên mình từng con:
A 405 kg, B 392 kg, C 389 kg, D 358 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g9 import *

W, H = 900, 120
COWS = [(112, 'A', '405 kg', WHITE, BROWN), (338, 'B', '392 kg', '#FFF1DE', '#6B5146'),
        (562, 'C', '389 kg', WHITE, '#6B5146'), (788, 'D', '358 kg', '#FFF1DE', BROWN)]


def hay(cx, y):
    s = [f'<path d="M{cx - 96},{y} Q{cx - 92},{y - 14} {cx - 70},{y - 12} Q{cx},{y - 20} {cx + 72},{y - 12} Q{cx + 94},{y - 14} {cx + 96},{y} Z" fill="{YELLOW}" {st(2.2)}/>']
    for i in range(-80, 90, 16):
        s.append(f'<line x1="{cx + i}" y1="{y - 2}" x2="{cx + i + 6}" y2="{y - 11}" stroke="{ORANGE}" stroke-width="2" stroke-linecap="round"/>')
    return '\n'.join(s)


def cow(cx, y, letter, kg, body, spot):
    """lying cow, head on the left, belly line at y"""
    s = [hay(cx, y + 8)]
    # tail
    s.append(limb(f'M{cx + 70},{y - 30} Q{cx + 96},{y - 34} {cx + 90},{y - 8}', body, 6))
    s.append(f'<ellipse cx="{cx + 90}" cy="{y - 6}" rx="5" ry="7" fill="{spot}" {st(1.8)}/>')
    # body
    s.append(f'<path d="M{cx - 50},{y} Q{cx - 58},{y - 50} {cx - 10},{y - 54} L{cx + 50},{y - 54} Q{cx + 82},{y - 48} {cx + 78},{y} Z" fill="{body}" {st()}/>')
    s.append(f'<path d="M{cx + 44},{y - 54} Q{cx + 76},{y - 50} {cx + 76},{y - 26} Q{cx + 58},{y - 34} {cx + 44},{y - 54} Z" fill="{spot}"/>')
    # folded legs
    for dx in (-24, 42):
        s.append(f'<path d="M{cx + dx - 14},{y + 2} Q{cx + dx - 14},{y - 10} {cx + dx + 4},{y - 8} L{cx + dx + 16},{y - 6} Q{cx + dx + 22},{y + 2} {cx + dx + 14},{y + 4} Z" fill="{body}" {st(2.2)}/>')
        s.append(f'<rect x="{cx + dx + 12}" y="{y - 6}" width="8" height="10" rx="2" fill="{INK}"/>')
    # head
    hx, hy = cx - 66, y - 44
    for sx in (-1, 1):
        s.append(f'<path d="M{hx + sx * 12},{hy - 16} q{sx * 4},-12 {sx * 10},-12" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>'
                 f'<path d="M{hx + sx * 12},{hy - 16} q{sx * 4},-12 {sx * 10},-12" fill="none" stroke="{CREAM}" stroke-width="3" stroke-linecap="round"/>')
        s.append(f'<ellipse cx="{hx + sx * 26}" cy="{hy - 8}" rx="10" ry="5" fill="{body}" {st(2)} transform="rotate({sx * 20} {hx + sx * 26} {hy - 8})"/>')
    s.append(f'<ellipse cx="{hx}" cy="{hy}" rx="22" ry="20" fill="{body}" {st()}/>')
    s.append(f'<ellipse cx="{hx}" cy="{hy + 14}" rx="19" ry="11" fill="{PINK}" {st(2.2)}/>')
    s.append(f'<circle cx="{hx - 6}" cy="{hy + 14}" r="2.2" fill="{INK}"/><circle cx="{hx + 6}" cy="{hy + 14}" r="2.2" fill="{INK}"/>')
    for sx in (-1, 1):
        s.append(f'<circle cx="{hx + sx * 8}" cy="{hy - 3}" r="3" fill="{INK}"/><circle cx="{hx + sx * 8 + 1}" cy="{hy - 4}" r="1" fill="{WHITE}"/>')
    # weight tag + letter
    s.append(f'<rect x="{cx - 38}" y="{y - 44}" width="92" height="32" rx="10" fill="{WHITE}" {st(2.2)}/>')
    s.append(text(cx + 8, y - 20, kg, size=24, weight=700))
    s.append(text(cx + 8, y - 62, letter, size=24, weight=600))
    return '\n'.join(s)


parts = [cow(cx, 104, l, kg, b, sp) for cx, l, kg, b, sp in COWS]
save('bai75_t2_q2_cows', W, H, parts)
