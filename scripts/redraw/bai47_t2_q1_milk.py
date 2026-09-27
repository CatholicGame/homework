"""Vở BT Toán 2, Bài 47 Tiết 2 Q1 — hộp sữa hình trụ có chữ SỮA (khối trụ): nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_g6 import *
W, H = 154, 208
cx, top, w, h = 77, 26, 130, 158
band = (f'<path d="M{cx - w / 2},{top + 40} L{cx - w / 2},{top + 84} A{w / 2},{w * .17} 0 0 0 {cx + w / 2},{top + 84} '
        f'L{cx + w / 2},{top + 40} A{w / 2},{w * .17} 0 0 1 {cx - w / 2},{top + 40} Z" fill="{BLUE}" {st(2.6)}/>' +
        text(cx, top + 88, 'SỮA', size=30, weight=700, fill=WHITE))
parts = [cyl_up(cx, top, w, h, fill=WHITE, top_fill='#DCEFF8', inner=band, shine=False)]
parts.append(f'<ellipse cx="{cx}" cy="{top}" rx="{w / 2 - 12}" ry="{w * .17 - 6:.1f}" fill="{WHITE}" {st(2)}/>')
parts.append(f'<path d="M{cx - w / 2 + 16},{top + 110} L{cx - w / 2 + 16},{top + 160}" stroke="{SKY_D}" stroke-width="6" stroke-linecap="round" opacity=".6"/>')
save('bai47_t2_q1_milk', W, H, parts)
