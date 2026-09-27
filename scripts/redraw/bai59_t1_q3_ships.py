"""
Vở BT Toán 2, Bài 59 Tiết 1 Q3 — hai con tàu chở hàng A, B (nét riêng).
Giữ nội dung toán: tàu A chở hai thùng 230 kg (trên) và 450 kg (dưới); tàu B chở
140 kg (trên) và 543 kg (dưới); nhãn A, B dưới tàu. Tàu B quay ngược tàu A.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g7 import *

W, H = 900, 283
st = f'stroke="{INK}" stroke-width="2.8" stroke-linejoin="round"'


def ship(hull, cabin):
    s = []
    # ống khói
    s.append(f'<rect x="58" y="36" width="36" height="120" rx="4" fill="{RED}" {st}/>')
    s.append(f'<rect x="58" y="56" width="36" height="14" fill="{WHITE}" {st}/>')
    s.append(f'<ellipse cx="72" cy="22" rx="12" ry="8" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<ellipse cx="90" cy="12" rx="9" ry="6" fill="{GREY_L}" stroke="{INK}" stroke-width="2"/>')
    # cabin 2 tầng
    s.append(f'<rect x="104" y="96" width="150" height="72" rx="8" fill="{cabin}" {st}/>')
    s.append(f'<rect x="130" y="56" width="100" height="44" rx="8" fill="{WHITE}" {st}/>')
    for x in (142, 186):
        s.append(f'<rect x="{x}" y="66" width="32" height="22" rx="5" fill="{SKY}" stroke="{INK}" stroke-width="2.2"/>')
    s.append(f'<line x1="180" y1="56" x2="180" y2="36" stroke="{INK}" stroke-width="3"/><circle cx="180" cy="32" r="5" fill="{YELLOW}" stroke="{INK}" stroke-width="2"/>')
    s.append(f'<rect x="120" y="112" width="30" height="46" rx="12" fill="{YELLOW}" stroke="{INK}" stroke-width="2.2"/>')
    s.append(f'<rect x="170" y="112" width="68" height="24" rx="6" fill="{SKY}" stroke="{INK}" stroke-width="2.2"/>')
    # thân tàu
    s.append(f'<path d="M6,166 L446,156 C436,198 414,230 382,238 L62,238 C32,232 14,200 6,166 Z" fill="{hull}" {st}/>')
    s.append(f'<path d="M12,186 L438,178" stroke="{WHITE}" stroke-width="7" stroke-linecap="round"/>')
    s.append(f'<path d="M30,212 q12,-9 24,0 q12,9 24,0 q12,-9 24,0 q12,9 24,0 q12,-9 24,0 q12,9 24,0 q12,-9 24,0 q12,9 24,0 '
             f'q12,-9 24,0 q12,9 24,0 q12,-9 24,0 q12,9 24,0 q12,-9 24,0 q12,9 24,0 q12,-9 24,0" fill="none" stroke="{WHITE}" stroke-width="2.4" opacity=".8"/>')
    return '\n'.join(s)


def crate(x, y, w, h, label):
    return (f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="6" fill="#F6E3C0" {st}/>'
            f'<rect x="{x + 5}" y="{y + 5}" width="{w - 10}" height="{h - 10}" rx="4" fill="{WHITE}" stroke="#C9A36B" stroke-width="1.6"/>'
            + text(x + w / 2, y + h / 2 + 10, label, size=28, weight=700))


parts = [ship(BLUE, '#DDEFFB'),
         f'<g transform="translate({W},0) scale(-1,1)">{ship(TEAL, "#DDF5EE")}</g>',
         crate(270, 102, 132, 56, '450 kg'), crate(280, 46, 112, 56, '230 kg'),
         crate(W - 402, 102, 132, 56, '543 kg'), crate(W - 392, 46, 112, 56, '140 kg'),
         text(208, 272, 'A', size=28, weight=600), text(W - 208, 272, 'B', size=28, weight=600)]
save('bai59_t1_q3_ships', W, H, parts)
