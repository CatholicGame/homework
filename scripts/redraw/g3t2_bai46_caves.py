"""
Vở BT Toán 3 Tập hai, Bài 46 Tiết 1 Q2 — kiến chọn cửa hang: nét riêng.
Giữ nội dung toán: 3 cửa hang ghi 3 198, 3 891, 3 819 (trái → phải) và đường hầm nối mỗi cửa
với một món ăn, đúng như sách: 3 198 → món bên phải (viên kẹo), 3 891 → món bên trái (bánh quy),
3 819 → món ở giữa. Đường hầm vẽ lại theo kiểu riêng, vẫn đan chéo nhau.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *

W, H = 540, 520
SOIL, SOIL_D, TUN, TUN_E = '#B9A48C', '#9C8770', '#FFFFFF', '#8B7A66'
s = []


def st(w=2.6):
    return f'stroke="{INK}" stroke-width="{w}" stroke-linejoin="round" stroke-linecap="round"'


s.append(f'<defs><clipPath id="cv"><rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="18"/></clipPath></defs>')
s.append('<g clip-path="url(#cv)">')
s.append(f'<rect width="{W}" height="{H}" fill="{SKY}"/>')
for cx, cy, k in ((90, 40, 1), (300, 30, .8), (460, 55, 1.1)):
    s.append(f'<g transform="translate({cx},{cy}) scale({k})"><path d="M-40,12 a18,18 0 0 1 12,-26 a24,24 0 0 1 44,-4 a18,18 0 0 1 26,22 a12,12 0 0 1 -4,8 Z" fill="{WHITE}" {st(2.2)}/></g>')
s.append(f'<path d="M0,112 Q270,92 {W},112 L{W},{H} L0,{H} Z" fill="{SOIL}" {st(2.6)}/>')
for x, y in ((40, 200), (150, 150), (505, 290), (30, 470), (500, 470), (320, 470), (205, 470), (480, 180), (60, 330)):
    s.append(f'<circle cx="{x}" cy="{y}" r="4" fill="{SOIL_D}"/>')

# đường hầm: mỗi đường là một nét trắng có viền; vẽ nối tiếp nên chỗ đan chéo trông như cầu vượt
paths = [
    # 3 891 (giữa) → bánh quy (trái)
    'M270,124 L270,168 L395,168 L395,330 L180,330 L180,250 L95,250 L95,372 L110,372 L110,400',
    # 3 819 (phải) → món ở giữa
    'M430,124 L430,142 L500,142 L500,226 L235,226 L235,382 L270,382 L270,400',
    # 3 198 (trái) → viên kẹo (phải)
    'M110,124 L110,150 L50,150 L50,292 L330,292 L330,196 L462,196 L462,360 L430,360 L430,400',
]
for d in paths:
    s.append(f'<path d="{d}" fill="none" stroke="{TUN_E}" stroke-width="22" stroke-linejoin="round"/>')
    s.append(f'<path d="{d}" fill="none" stroke="{TUN}" stroke-width="15" stroke-linejoin="round"/>')

# cửa hang
for x, lab in ((110, '3 198'), (270, '3 891'), (430, '3 819')):
    s.append(f'<ellipse cx="{x}" cy="{112}" rx="66" ry="24" fill="#4A4448" {st(2.4)}/>')
    s.append(text(x, 121, lab, size=25, weight=700, fill=WHITE))

# món ăn
for x in (110, 270, 430):
    s.append(f'<ellipse cx="{x}" cy="{445}" rx="66" ry="52" fill="{WHITE}" {st(2.4)}/>')
# bánh quy
s.append(f'<circle cx="110" cy="436" r="27" fill="#E9B872" {st(2.4)}/>')
for dx, dy in ((-10, -8), (8, -12), (12, 6), (-6, 10), (0, -1)):
    s.append(f'<circle cx="{110 + dx}" cy="{436 + dy}" r="3.4" fill="#7A4E2D"/>')
# cục đường
s.append(f'<path d="M252,428 L270,418 L290,428 L290,452 L272,462 L252,452 Z" fill="{WHITE}" {st(2.4)}/>')
s.append(f'<path d="M252,428 L272,438 L290,428 M272,438 L272,462" fill="none" {st(2)}/>')
s.append(f'<path d="M272,438 L290,428 L290,452 L272,462 Z" fill="#E6EEF4"/>')
s.append(f'<path d="M252,428 L270,418 L290,428 L290,452 L272,462 L252,452 Z M252,428 L272,438 L290,428 M272,438 L272,462" fill="none" {st(2.2)}/>')
# viên kẹo
s.append(f'<path d="M406,436 l-18,-12 l0,24 Z M454,436 l18,-12 l0,24 Z" fill="{PINK}" {st(2.2)}/>')
s.append(f'<ellipse cx="430" cy="436" rx="26" ry="16" fill="{RED}" {st(2.4)}/>')
s.append(f'<path d="M418,428 q6,8 0,16 M432,424 q6,10 0,24" fill="none" stroke="{WHITE}" stroke-width="3" stroke-linecap="round"/>')
for x, lab in ((110, 'bánh quy'), (270, 'cục đường'), (430, 'viên kẹo')):
    s.append(text(x, 482, lab, size=17, weight=700))

# kiến trên mặt đất
ax, ay = 190, 86
s.append(f'<path d="M{ax - 16},{ay} l-8,10 M{ax - 4},{ay + 2} l-4,12 M{ax + 8},{ay + 2} l4,12 M{ax + 18},{ay} l8,10 M{ax + 24},{ay - 8} q8,-12 16,-12" fill="none" stroke="{INK}" stroke-width="2.4" stroke-linecap="round"/>')
s.append(f'<ellipse cx="{ax - 16}" cy="{ay - 4}" rx="12" ry="8" fill="#6B6F76" {st(2.2)}/>')
s.append(f'<ellipse cx="{ax}" cy="{ay - 3}" rx="7" ry="6" fill="#6B6F76" {st(2.2)}/>')
s.append(f'<circle cx="{ax + 16}" cy="{ay - 6}" r="8" fill="#6B6F76" {st(2.2)}/>')
s.append(f'<circle cx="{ax + 19}" cy="{ay - 8}" r="2" fill="{WHITE}"/>')
s.append('</g>')
s.append(f'<rect x="2" y="2" width="{W - 4}" height="{H - 4}" rx="18" fill="none" {st(2.6)}/>')
save('bai46_t1_q2_caves', W, H, s, folder='grade3-workbook-2')
