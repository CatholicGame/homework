"""Vở BT Toán 3, Bài 34 Tiết 2 Q2 — bút máy (để nối với 20 g). Nét riêng."""
import sys, os; sys.path.insert(0, os.path.dirname(__file__))
from common import *

W, H = 600, 420
parts = ['<g transform="rotate(-8 300 210)">']
# ngòi
parts.append(f'<path d="M430,196 L488,210 L430,224 Z" fill="{YELLOW}" stroke="{INK}" stroke-width="3" stroke-linejoin="round"/>')
parts.append(f'<path d="M444,210 H486" stroke="{INK}" stroke-width="2"/><circle cx="446" cy="210" r="3" fill="{INK}"/>')
# thân
parts.append(f'<path d="M290,188 H420 Q436,188 436,196 V224 Q436,232 420,232 H290 Z" fill="{PURPLE}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
# nắp
parts.append(f'<path d="M130,190 Q112,190 112,210 Q112,230 130,230 H292 V190 Z" fill="{PINK}" stroke="{INK}" stroke-width="3.5" stroke-linejoin="round"/>')
parts.append(f'<rect x="284" y="186" width="16" height="48" rx="4" fill="{YELLOW}" stroke="{INK}" stroke-width="3"/>')
parts.append(f'<path d="M150,199 H270" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".7"/>')
# kẹp (nằm trên nắp)
parts.append(f'<path d="M270,212 H160 Q146,212 146,222 Q146,230 158,230 H200" fill="none" stroke="{INK}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>'
             f'<path d="M270,212 H160 Q146,212 146,222 Q146,230 158,230 H200" fill="none" stroke="{GREY_L}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>')
parts.append('</g>')

save('bai34_t2_q2_pen', W, H, parts, folder='grade3-workbook')
