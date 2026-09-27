"""
Vở BT Toán 2, Bài 4 Tiết 1 Q1 — vịt trên bờ và dưới ao: vẽ lại bằng nét riêng.

Nội dung toán giữ đúng sách: bên trái 8 con vịt đứng trên bờ, bên phải 5 con vịt
bơi dưới ao (8 − 5 = 3).
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 900, 308
parts = []
ST = f'stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"'
BILL = ORANGE
parts.append('<defs><linearGradient id="ducks_pond" gradientUnits="userSpaceOnUse" x1="0" y1="12" x2="0" y2="300">'
             f'<stop offset="0" stop-color="{WATER_L}"/><stop offset="1" stop-color="{WATER_D}"/></linearGradient></defs>')

# bank: a grassy patch with a few tufts
parts.append(f'<path d="M14,100 C30,10 330,0 392,70 C432,130 420,280 360,296 C250,312 70,306 22,280 C-4,250 0,170 14,120 Z" fill="{GRASS}" {ST}/>')
for tx, ty in [(40, 150), (380, 130), (40, 290), (390, 250), (240, 36)]:
    parts.append(f'<path d="M{tx - 8},{ty} l4,-12 l4,10 l4,-14 l4,16" fill="none" stroke="{GRASS_D}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>')

# pond
parts.append(f'<ellipse cx="668" cy="156" rx="222" ry="144" fill="url(#ducks_pond)" {ST}/>')
for rx, ry in [(560, 70), (790, 60), (720, 280), (500, 240)]:
    parts.append(f'<path d="M{rx - 18},{ry} q9,-6 18,0 t18,0" fill="none" stroke="{WHITE}" stroke-width="2.4" stroke-linecap="round" opacity=".8"/>')


def head(hx, hy, f):
    parts.append(f'<path d="M{hx + f * 12},{hy + 2} Q{hx + f * 34},{hy - 2} {hx + f * 34},{hy + 6} Q{hx + f * 30},{hy + 13} {hx + f * 10},{hy + 10} Z" fill="{BILL}" {ST}/>')
    parts.append(f'<circle cx="{hx}" cy="{hy}" r="16" fill="{WHITE}" {ST}/>')
    parts.append(f'<circle cx="{hx + f * 5}" cy="{hy - 3}" r="3.4" fill="{INK}"/>')
    parts.append(f'<circle cx="{hx + f * 1}" cy="{hy + 6}" r="3.5" fill="{PINK}" opacity=".8"/>')


def body(cx, cy, f, ry=20):
    # round body with a perky tail at the back and a wing
    parts.append(f'<path d="M{cx - f * 28},{cy - 2} L{cx - f * 42},{cy - 20} L{cx - f * 22},{cy - 12} Z" fill="{WHITE}" {ST}/>')
    parts.append(f'<ellipse cx="{cx}" cy="{cy}" rx="32" ry="{ry}" fill="{WHITE}" {ST}/>')
    parts.append(f'<path d="M{cx - f * 14},{cy - 6} Q{cx + f * 2},{cy - 10} {cx + f * 10},{cy + 2} Q{cx - f * 4},{cy + 12} {cx - f * 16},{cy + 4} Z" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>')


def standing(cx, by, f):
    for dx in (-8, 8):
        x = cx + dx
        parts.append(f'<line x1="{x}" y1="{by - 16}" x2="{x}" y2="{by - 4}" stroke="{BILL}" stroke-width="4"/>')
        parts.append(f'<path d="M{x - f * 6},{by} L{x + f * 14},{by} L{x + f * 2},{by - 7} Z" fill="{BILL}" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    body(cx, by - 32, f)
    parts.append(f'<rect x="{cx + f * 14 - 7}" y="{by - 62}" width="14" height="22" fill="{WHITE}"/>')
    head(cx + f * 16, by - 66, f)
    parts.append(f'<path d="M{cx + f * 6},{by - 50} Q{cx + f * 6},{by - 58} {cx + f * 6},{by - 60}" stroke="{INK}" stroke-width="2.6" fill="none"/>')


def swimming(cx, wy, f):
    body(cx, wy - 8, f, 17)
    head(cx + f * 18, wy - 36, f)
    # water line over the bottom of the body
    parts.append(f'<path d="M{cx - 40},{wy + 2} q10,-6 20,0 t20,0 t20,0 t20,0 V{wy + 14} H{cx - 40} Z" fill="url(#ducks_pond)"/>')
    parts.append(f'<path d="M{cx - 44},{wy + 2} q11,-6 22,0 t22,0 t22,0 t22,0" fill="none" stroke="{WHITE}" stroke-width="2.4" stroke-linecap="round"/>')


# 8 ducks on the bank (rows of 3, 3, 2)
for cx, by, f in [(85, 120, 1), (195, 110, 1), (305, 118, -1),
                  (75, 200, 1), (185, 194, -1), (300, 202, 1),
                  (135, 282, 1), (260, 286, -1)]:
    standing(cx, by, f)

# 5 ducks in the pond (3 on top, 2 below)
for cx, wy, f in [(545, 128, 1), (670, 118, -1), (795, 132, 1),
                  (600, 232, 1), (745, 238, -1)]:
    swimming(cx, wy, f)

save('bai4_t1_q1_ducks', W, H, parts)
