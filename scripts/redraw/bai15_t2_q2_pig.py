"""
Vở BT Toán 2, Bài 15 Tiết 2 Q2 — chú lợn (nối với cân nặng): nét riêng.
Giữ nội dung toán: nhãn chữ đúng như sách "Một trăm / ki-lô-gam" (nối với 100 kg);
lợn to, béo, là vật nặng nhất trong bộ.
"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 702, 441
PIG, PIG_D, SNOUT = '#F9B8CF', '#E88AAE', '#F7A1C4'
p = [f'<ellipse cx="340" cy="428" rx="270" ry="10" fill="#EEE6D8"/>']
# curly tail
tail = 'M66,190 C36,176 26,140 50,130 C72,122 78,154 58,156 C44,156 46,136 60,134'
p.append(f'<path d="{tail}" fill="none" stroke="{INK}" stroke-width="8" stroke-linecap="round"/>')
p.append(f'<path d="{tail}" fill="none" stroke="{PIG}" stroke-width="4" stroke-linecap="round"/>')
# back legs (behind)
for x in (150, 470):
    p.append(f'<rect x="{x}" y="320" width="50" height="86" rx="16" fill="{PIG_D}" stroke="{INK}" stroke-width="3.5"/>')
# body
p.append(f'<ellipse cx="320" cy="236" rx="262" ry="160" fill="{PIG}" stroke="{INK}" stroke-width="4"/>')
p.append(f'<path d="M150,346 C230,388 430,388 510,346" fill="none" stroke="{PIG_D}" stroke-width="4" stroke-linecap="round" opacity=".7"/>')
# front legs
for x in (210, 526):
    p.append(f'<rect x="{x}" y="330" width="54" height="90" rx="18" fill="{PIG}" stroke="{INK}" stroke-width="3.5"/>')
    p.append(f'<path d="M{x + 2},398 L{x + 52},398 L{x + 52},402 C{x + 52},414 {x + 44},420 {x + 36},420 L{x + 18},420 C{x + 10},420 {x + 2},414 {x + 2},402 Z" fill="{INK}"/>')
    p.append(f'<line x1="{x + 27}" y1="402" x2="{x + 27}" y2="419" stroke="{PIG}" stroke-width="3"/>')
# ears (behind head)
p.append(f'<path d="M478,110 L500,30 L556,96 Z" fill="{PIG_D}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
p.append(f'<path d="M580,100 L626,36 L640,120 Z" fill="{PIG_D}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
# head
p.append(f'<ellipse cx="572" cy="186" rx="106" ry="94" fill="{PIG}" stroke="{INK}" stroke-width="4"/>')
for x in (544, 610):
    p.append(f'<circle cx="{x}" cy="150" r="10" fill="{INK}"/><circle cx="{x + 3}" cy="146" r="3.4" fill="{WHITE}"/>')
p.append(f'<ellipse cx="516" cy="204" rx="18" ry="12" fill="{PINK}" opacity=".9"/>')
# snout
p.append(f'<ellipse cx="636" cy="204" rx="44" ry="33" fill="{SNOUT}" stroke="{INK}" stroke-width="3.5"/>')
for x in (620, 652):
    p.append(f'<ellipse cx="{x}" cy="204" rx="7" ry="10" fill="#B85A7E"/>')
p.append(f'<path d="M548,246 Q574,268 602,248" fill="none" stroke="{INK}" stroke-width="4" stroke-linecap="round"/>')
# label
p.append(f'<rect x="96" y="160" width="252" height="114" rx="22" fill="{CREAM}" stroke="{INK}" stroke-width="3"/>')
p.append(text(222, 210, 'Một trăm', size=32, weight=600))
p.append(text(222, 252, 'ki-lô-gam', size=32, weight=600))
save('bai15_t2_q2_pig', W, H, p)
