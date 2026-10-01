"""
Vở BT Toán 3 Tập hai, Bài 46 Tiết 1 Q3 — bốn đồ vật và cân nặng: nét riêng.
Giữ nội dung toán: túi đường 1 000 g, hộp sữa bột 980 g, can dầu ăn 1 890 g, cái nồi 1 200 g (thứ tự sách).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 848, 250
PW, GAP = 198, 16
s = []


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


ITEMS = [('Túi đường', '1 000 g'), ('Hộp sữa bột', '980 g'), ('Can dầu ăn', '1 890 g'), ('Cái nồi', '1 200 g')]
for i, (name, w) in enumerate(ITEMS):
    x = 4 + i * (PW + GAP)
    s.append(f'<rect x="{x}" y="4" width="{PW}" height="{H - 8}" rx="14" fill="#E3F4FC" {st(2.4)}/>')
    s.append(f'<path d="M{x},{H - 60} H{x + PW} V{H - 18} a14,14 0 0 1 -14,14 H{x + 14} a14,14 0 0 1 -14,-14 Z" fill="#9FD6F2" {st(2.4)}/>')
    s.append(text(x + PW / 2, H - 24, w, size=26, weight=700))
    cx = x + PW / 2
    if i == 0:   # túi đường
        s.append(f'<path d="M{cx - 52},{150} L{cx - 46},{50} Q{cx},{40} {cx + 46},{50} L{cx + 52},{150} Q{cx},{160} {cx - 52},{150} Z" fill="{WHITE}" {st()}/>')
        s.append(f'<path d="M{cx - 46},{50} l8,-12 l8,10 l8,-10 l8,10 l8,-10 l8,10 l8,-10 l8,10 l8,-10 l8,10 l6,12" fill="{WHITE}" {st(2.2)}/>')
        s.append(f'<rect x="{cx - 40}" y="{86}" width="80" height="30" rx="10" fill="{PINK}" {st(2.2)}/>')
        s.append(text(cx, 108, 'Đường', size=19, weight=700))
    elif i == 1:  # hộp sữa bột
        s.append(f'<path d="M{cx - 42},{58} V{146} A42,12 0 0 0 {cx + 42},{146} V{58}" fill="{YELLOW}" {st()}/>')
        s.append(f'<ellipse cx="{cx}" cy="{58}" rx="42" ry="12" fill="#FFE7A6" {st()}/>')
        s.append(f'<rect x="{cx - 42}" y="{88}" width="84" height="32" fill="{WHITE}" {st(2.2)}/>')
        s.append(text(cx, 110, 'Sữa bột', size=18, weight=700))
    elif i == 2:  # can dầu ăn
        s.append(f'<path d="M{cx - 40},{64} Q{cx - 40},{52} {cx - 28},{52} H{cx + 6} L{cx + 16},{40} H{cx + 30} L{cx + 34},{52} Q{cx + 44},{54} {cx + 44},{66} V{150} Q{cx + 44},{158} {cx + 36},{158} H{cx - 32} Q{cx - 40},{158} {cx - 40},{150} Z" fill="#FFD98A" {st()}/>')
        s.append(f'<rect x="{cx + 14}" y="{30}" width="18" height="12" rx="3" fill="{RED}" {st(2.2)}/>')
        s.append(f'<path d="M{cx - 28},{52} Q{cx - 16},{34} {cx - 4},{52}" fill="none" {st(4)}/>')
        s.append(f'<rect x="{cx - 34}" y="{94}" width="72" height="32" rx="6" fill="{WHITE}" {st(2.2)}/>')
        s.append(text(cx + 2, 116, 'Dầu ăn', size=18, weight=700))
    else:        # cái nồi
        s.append(f'<path d="M{cx - 60},{92} H{cx + 60} V{140} Q{cx + 60},{156} {cx + 44},{156} H{cx - 44} Q{cx - 60},{156} {cx - 60},{140} Z" fill="{TEAL}" {st()}/>')
        s.append(f'<rect x="{cx - 76}" y="{98}" width="18" height="12" rx="5" fill="{INK}"/><rect x="{cx + 58}" y="{98}" width="18" height="12" rx="5" fill="{INK}"/>')
        s.append(f'<path d="M{cx - 66},{92} Q{cx},{56} {cx + 66},{92} Z" fill="#9BE0CF" {st()}/>')
        s.append(f'<circle cx="{cx}" cy="{68}" r="8" fill="{INK}"/>')
    s.append(text(cx, H - 72, name, size=18, weight=700))
save('bai46_t1_q3_objects', W, H, s, folder='grade3-workbook-2')
