"""
Vở BT Toán 3 Tập hai, Bài 59 — hình vẽ lại bằng nét riêng.
 - bai59_t1_q2_numberline: tia số 7 vạch (các số viết ở dòng chỗ chấm bên dưới, không vẽ vào hình).
 - bai59_t3_q4_photos: hai bức ảnh gốc cây; nhện che 2 chữ số cuối ("53 0.. cm"),
   bọ cánh cứng che 2 chữ số đầu ("..089 cm") — chiều cao 53 089 cm.
"""
import math
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

FOLDER = 'grade3-workbook-2'
LINE = '#1E9AD6'


def numberline():
    W, H = 620, 44
    y = 22
    p = [f'<line x1="10" y1="{y}" x2="{W - 22}" y2="{y}" stroke="{LINE}" stroke-width="3" stroke-linecap="round"/>',
         f'<path d="M{W - 26},{y - 9} L{W - 8},{y} L{W - 26},{y + 9} Z" fill="{LINE}"/>']
    for i in range(7):
        x = 40 + i * 88
        p.append(f'<line x1="{x}" y1="{y - 10}" x2="{x}" y2="{y + 10}" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
    save('bai59_t1_q2_numberline', W, H, p, folder=FOLDER)


# ── ảnh gốc cây ─────────────────────────────────────────────────────────────
def st(w=2.4):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


def photo_bg(x, y, w, h):
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="10" fill="#34495E"/>',
         f'<rect x="{x + 10}" y="{y + 10}" width="{w - 20}" height="{h - 20}" rx="4" fill="#DDF1FB"/>']
    # thân cây to ở giữa
    tx0, tx1 = x + 44, x + w - 44
    s.append(f'<path d="M{tx0},{y + 10} L{tx0 + 8},{y + h - 50} Q{tx0 - 14},{y + h - 16} {tx0 - 24},{y + h - 10} '
             f'L{tx1 + 24},{y + h - 10} Q{tx1 + 14},{y + h - 16} {tx1 - 8},{y + h - 50} L{tx1},{y + 10} Z" fill="#E7C9A0" {st()}/>')
    for k in (0.3, 0.55, 0.78):
        xx = tx0 + (tx1 - tx0) * k
        s.append(f'<path d="M{xx},{y + 22} q-8,40 2,80 q8,30 -4,70" fill="none" stroke="#B98A5C" stroke-width="2.2" stroke-linecap="round"/>')
    # cỏ + nấm
    s.append(f'<rect x="{x + 10}" y="{y + h - 34}" width="{w - 20}" height="24" fill="{GRASS}"/>')
    for gx in (x + 30, x + 50):
        s.append(f'<path d="M{gx},{y + h - 30} l-6,-26 l10,18 l4,-24 l4,26" fill="{GRASS_D}" {st(1.8)}/>')
    mx, my = x + w - 46, y + h - 30
    s.append(f'<rect x="{mx - 6}" y="{my - 22}" width="12" height="22" rx="4" fill="{CREAM}" {st(1.8)}/>')
    s.append(f'<path d="M{mx - 22},{my - 20} Q{mx},{my - 50} {mx + 22},{my - 20} Z" fill="{RED}" {st(1.8)}/>')
    for dx in (-9, 4, 12):
        s.append(f'<circle cx="{mx + dx}" cy="{my - 29 + abs(dx) * 0.3}" r="3" fill="#fff"/>')
    return ''.join(s)


def label_pill(cx, cy, digits, show):
    """digits: 5 chữ số; show: tập chỉ số chữ số được vẽ. Có khoảng hở hàng nghìn."""
    w, h = 214, 48
    s = [f'<rect x="{cx - w / 2}" y="{cy - h / 2}" width="{w}" height="{h}" rx="23" fill="#FFFFFF" stroke="{LINE}" stroke-width="3.5"/>']
    adv = 19
    x = cx - 88
    for i, d in enumerate(digits):
        if i == 2:
            x += 9
        if i in show:
            s.append(text(x + adv / 2, cy + 10, d, size=28, weight=700))
        x += adv
    s.append(text(x + 10, cy + 10, 'cm', size=28, weight=700, anchor='start'))
    return ''.join(s)


def spider(cx, cy):
    s = []
    for side in (-1, 1):
        for k, (a, L) in enumerate([(-40, 34), (-12, 38), (14, 38), (40, 32)]):
            r = math.radians(a)
            x1, y1 = cx + side * 14, cy + k * 5 - 6
            x2, y2 = cx + side * (14 + L * math.cos(r) * 0.3), cy + L * math.sin(r) * 1.3 - 4
            x3, y3 = x2 + side * 3, y2 + 14
            s.append(f'<path d="M{x1},{y1} Q{x2},{y2 - 12} {x2},{y2} L{x3},{y3}" fill="none" stroke="{INK}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>')
            s.append(f'<path d="M{x1},{y1} Q{x2},{y2 - 12} {x2},{y2} L{x3},{y3}" fill="none" stroke="{PURPLE}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy - 6}" rx="20" ry="20" fill="{PURPLE}" {st()}/>')
    s.append(f'<path d="M{cx - 20},{cy - 16} Q{cx},{cy - 24} {cx + 20},{cy - 16}" fill="none" stroke="#7E6BC9" stroke-width="5" stroke-linecap="round"/>')
    s.append(f'<circle cx="{cx}" cy="{cy + 18}" r="16" fill="#CFC3F7" {st()}/>')
    for dx in (-6, 6):
        s.append(f'<circle cx="{cx + dx}" cy="{cy + 15}" r="3.4" fill="{INK}"/><circle cx="{cx + dx + 1}" cy="{cy + 14}" r="1.2" fill="#fff"/>')
    s.append(f'<path d="M{cx - 5},{cy + 23} q5,5 10,0" fill="none" {st(1.8)}/>')
    return ''.join(s)


def beetle(cx, cy):
    c, cl = '#2F5D73', '#4C86A0'
    s = []
    for side in (-1, 1):
        for dy in (-6, 14, 34):
            s.append(f'<path d="M{cx + side * 18},{cy + dy} l{side * 9},{-6 + dy * 0.2} l{side * 3},14" fill="none" stroke="{INK}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>')
    # sừng
    for side in (-1, 1):
        s.append(f'<path d="M{cx + side * 6},{cy - 44} q{side * 16},-18 {side * 8},-40 q{side * 10},14 {side * 16},4" fill="none" stroke="{INK}" stroke-width="6" stroke-linecap="round"/>')
        s.append(f'<path d="M{cx + side * 6},{cy - 44} q{side * 16},-18 {side * 8},-40 q{side * 10},14 {side * 16},4" fill="none" stroke="{cl}" stroke-width="3" stroke-linecap="round"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy + 16}" rx="23" ry="38" fill="{c}" {st()}/>')
    s.append(f'<line x1="{cx}" y1="{cy - 10}" x2="{cx}" y2="{cy + 52}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<ellipse cx="{cx - 10}" cy="{cy + 8}" rx="6" ry="14" fill="{cl}" opacity=".7"/>')
    s.append(f'<ellipse cx="{cx}" cy="{cy - 26}" rx="20" ry="17" fill="{cl}" {st()}/>')
    for dx in (-8, 8):
        s.append(f'<circle cx="{cx + dx}" cy="{cy - 30}" r="6" fill="#fff" {st(1.6)}/><circle cx="{cx + dx + 1}" cy="{cy - 30}" r="2.8" fill="{INK}"/>')
    s.append(f'<path d="M{cx - 6},{cy - 19} q6,5 12,0" fill="none" {st(1.8)}/>')
    return ''.join(s)


def photos():
    W, H = 600, 280
    pw, ph = 250, 260
    p = []
    # ảnh 1: nhện che hai chữ số cuối
    x1 = 20
    p.append(photo_bg(x1, 10, pw, ph))
    p.append(label_pill(x1 + pw / 2, 130, '53089', {0, 1, 2}))
    p.append(spider(x1 + pw / 2 + 5, 122))
    # ảnh 2: bọ cánh cứng che hai chữ số đầu
    x2 = W - 20 - pw
    p.append(photo_bg(x2, 10, pw, ph))
    p.append(label_pill(x2 + pw / 2, 130, '53089', {2, 3, 4}))
    p.append(beetle(x2 + pw / 2 - 69, 126))
    save('bai59_t3_q4_photos', W, H, p, folder=FOLDER)


if __name__ == '__main__':
    numberline()
    photos()
