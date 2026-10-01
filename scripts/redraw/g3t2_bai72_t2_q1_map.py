"""
Vở BT Toán 3 Tập hai, Bài 72 Tiết 2 Q1 (trang 97) — đường đến kho báu (nét riêng).
Giữ nội dung toán: 5 điểm A, B, C, D, G và 7 đoạn đường với phép tính như sách:
A–B 24 000 : 4, A–D 72 000 : 9, B–D 3 000 × 3, B–C 28 000 : 4, D–C 45 000 : 9,
D–G 2 000 × 2, C–G 3 500 × 2. Rô-bốt đứng ở A (trái), lâu đài kho báu ở G (phải).
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g1 import robot

W, H = 960, 420
P = {'A': (175, 300), 'B': (400, 92), 'C': (650, 180), 'D': (470, 350), 'G': (800, 340)}
ROADS = [('A', 'B', '24 000 : 4'), ('A', 'D', '72 000 : 9'), ('B', 'D', '3 000 × 3'), ('B', 'C', '28 000 : 4'),
         ('D', 'C', '45 000 : 9'), ('D', 'G', '2 000 × 2'), ('C', 'G', '3 500 × 2')]
ROAD = '#FFF6E0'
parts = []
# nền: trời, đồi, cỏ
parts.append(f'<rect width="{W}" height="{H}" rx="22" fill="{SKY}"/>')
parts.append(f'<path d="M0,210 Q120,120 230,190 Q330,110 470,170 Q600,90 720,160 Q840,100 960,170 V420 H0 Z" fill="#B7E0A8" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<path d="M0,300 Q200,250 420,300 Q640,350 960,280 V420 H0 Z" fill="{GRASS}" opacity=".7"/>')
for cx, cy, s in ((80, 70, 1), (560, 50, .8), (880, 60, 1.1)):
    parts.append(f'<g transform="translate({cx},{cy}) scale({s})"><path d="M-40,10 Q-40,-12 -18,-12 Q-10,-30 10,-24 Q28,-34 40,-12 Q58,-10 54,10 Z" fill="#fff" stroke="{INK}" stroke-width="2"/></g>')
# hồ và bụi cây trong các ô
parts.append(f'<ellipse cx="335" cy="255" rx="62" ry="30" fill="{WATER_L}" stroke="{INK}" stroke-width="2.4"/>')
parts.append(f'<path d="M300,250 q12,-6 24,0 M340,264 q12,-6 24,0" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/>')
parts.append(f'<ellipse cx="520" cy="190" rx="34" ry="20" fill="{WATER_L}" stroke="{INK}" stroke-width="2.4"/>')
for bx, by in ((585, 290), (620, 300), (655, 292), (470, 145), (505, 138)):
    parts.append(f'<circle cx="{bx}" cy="{by}" r="17" fill="{GREEN}" stroke="{INK}" stroke-width="2.4"/>')
# đường: viền mực rồi lòng đường
for a, b, _ in ROADS:
    (x1, y1), (x2, y2) = P[a], P[b]
    parts.append(f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{INK}" stroke-width="54" stroke-linecap="round"/>')
for a, b, _ in ROADS:
    (x1, y1), (x2, y2) = P[a], P[b]
    parts.append(f'<path d="M{x1},{y1} L{x2},{y2}" stroke="{ROAD}" stroke-width="48" stroke-linecap="round" fill="none"/>')
# phép tính trên từng đoạn
for a, b, s in ROADS:
    (x1, y1), (x2, y2) = P[a], P[b]
    if x2 < x1:
        x1, y1, x2, y2 = x2, y2, x1, y1
    ang = math.degrees(math.atan2(y2 - y1, x2 - x1))
    if ang > 90: ang -= 180
    if ang < -90: ang += 180
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    parts.append(f'<g transform="translate({mx:.1f},{my:.1f}) rotate({ang:.1f})">{text(0, 9, s, size=25, weight=600)}</g>')
# các điểm
for k, (x, y) in P.items():
    parts.append(f'<circle cx="{x}" cy="{y}" r="19" fill="#fff" stroke="{INK}" stroke-width="2.6"/>')
    parts.append(text(x, y + 8, k, size=24, weight=700))
# Rô-bốt ở A
parts.append(robot(88, 385, h=190, arm_pose='wave', look=(3, 0)))
# lâu đài kho báu ở G
cx, base = 895, 400
wall = '#F3D9A4'
parts.append(f'<rect x="{cx - 48}" y="{base - 110}" width="96" height="110" fill="{wall}" stroke="{INK}" stroke-width="2.6"/>')
for tx in (cx - 60, cx + 36):
    parts.append(f'<rect x="{tx}" y="{base - 150}" width="26" height="150" fill="{wall}" stroke="{INK}" stroke-width="2.6"/>')
    parts.append(f'<path d="M{tx - 4},{base - 150} L{tx + 13},{base - 186} L{tx + 30},{base - 150} Z" fill="{RED}" stroke="{INK}" stroke-width="2.6" stroke-linejoin="round"/>')
parts.append(f'<path d="M{cx - 18},{base} V{base - 34} Q{cx},{base - 54} {cx + 18},{base - 34} V{base} Z" fill="{BROWN}" stroke="{INK}" stroke-width="2.6"/>')
parts.append(f'<line x1="{cx}" y1="{base - 110}" x2="{cx}" y2="{base - 150}" stroke="{INK}" stroke-width="2.6"/>')
parts.append(f'<path d="M{cx},{base - 150} L{cx + 26},{base - 142} L{cx},{base - 134} Z" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>')
parts.append(f'<rect x="{cx - 12}" y="{base - 90}" width="24" height="18" rx="4" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>')
save('bai72_t2_q1_map', W, H, parts, folder='grade3-workbook-2')
