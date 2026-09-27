"""
Vở BT Toán 2, Bài 41 Tiết 1 Q1 — đêm Trung thu: nét riêng.
Giữ nội dung toán: băng rôn "VUI TRUNG THU", đúng 3 đèn ông sao 5 cánh (hai bên trái,
một bên phải), trăng tròn; các bạn và Rô-bốt phá cỗ quanh bàn tròn.
Không vẽ ngôi sao nào khác trên trời để bé không đếm nhầm.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *
from kit_g3 import *

W, H = 900, 530
NIGHT = '#2E3F73'
parts = [f'<clipPath id="tt"><rect width="{W}" height="{H}" rx="18"/></clipPath><g clip-path="url(#tt)">',
         f'<rect width="{W}" height="{H}" fill="{NIGHT}"/>']
# trăng
parts.append(f'<circle cx="760" cy="80" r="52" fill="#FFF3B0" {st()}/>')
parts.append(f'<circle cx="742" cy="66" r="8" fill="#F5E08A"/><circle cx="780" cy="96" r="10" fill="#F5E08A"/>')
# đồi cây phía xa
parts.append(f'<path d="M0,300 Q120,210 260,250 Q380,190 520,240 Q660,180 900,230 L900,330 L0,330 Z" fill="#3E5A8A" {st(2.4)}/>')
# sân gạch
parts.append(f'<rect x="0" y="320" width="{W}" height="210" fill="#8FA7CF"/>')
for i in range(1, 6):
    parts.append(f'<line x1="0" y1="{320 + i * 40}" x2="{W}" y2="{320 + i * 40}" stroke="#7E96C0" stroke-width="2"/>')
# băng rôn
parts.append(f'<path d="M110,70 Q400,40 660,70 L650,160 Q400,130 120,176 Z" fill="#fff" {st()}/>')
parts.append(f'<line x1="110" y1="70" x2="60" y2="0" {st(3)}/><line x1="660" y1="70" x2="700" y2="0" {st(3)}/>')
parts.append(text(386, 134, 'VUI TRUNG THU', size=50, weight=700, fill='#2F8FB8', extra=' transform="rotate(-2 386 120)"'))
# 3 đèn ông sao
parts.append(star_lantern(115, 290, 62, RED, '#FFD3CF', stick_len=70))
parts.append(star_lantern(110, 440, 62, YELLOW, '#FFF0B8', stick_len=70))
parts.append(star_lantern(810, 250, 56, TEAL, '#D5F3EA', stick_len=60))
# các bạn phía sau bàn
parts.append(place(330, 420, .52, person('ponytail', '#FFD166', None, 'shorts', 'laugh', 6,
             arms=((80, -150), (110, -230)), no_legs=True, band=PINK, sleeve='short')))
parts.append(place(480, 360, .5, robot(arms=((-60, -110), (60, -110)), no_legs=True, expr='happy')))
parts.append(place(680, 470, .56, person('short', '#8FD3F4', '#4E8FC8', 'shorts', 'smile', -12,
             arms=((-80, -150), (-60, -140)), legs='sit', shoe=RED, sleeve='short'), flip=True))
# bàn tròn
parts.append(f'<rect x="430" y="400" width="14" height="110" fill="#C99668" {st(2.4)}/>')
parts.append(f'<ellipse cx="440" cy="370" rx="200" ry="56" fill="#FFF4DF" {st()}/>')
parts.append(plate(390, 350, 70, '#fff', '#F4A259'))   # bánh nướng
parts.append(plate(480, 344, 70, '#fff', '#F07167'))   # dưa hấu
parts.append(plate(560, 372, 70, '#fff', '#C8763E'))
parts.append(plate(350, 390, 70, '#fff', YELLOW))
parts.append(plate(450, 396, 70, '#fff', '#C9E27B'))
# bạn gái ngồi quay lưng (phía trước bàn)
girl_back = person('bob', PINK, None, 'dress', 'smile', 0, arms=((40, -150), (70, -160)), legs='stand', shoe=RED)
parts.append(place(300, 520, .5, girl_back + f'<g transform="translate(0,-262)"><ellipse cx="0" cy="0" rx="62" ry="58" fill="{HAIR}" {st()}/></g>'))
parts.append('</g>')
parts.append(f'<rect x="1.5" y="1.5" width="{W - 3}" height="{H - 3}" rx="18" fill="none" stroke="{INK}" stroke-width="2.5"/>')
save('bai41_t1_q1_trungthu', W, H, parts)
