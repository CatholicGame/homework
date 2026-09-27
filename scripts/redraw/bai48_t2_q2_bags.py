"""
Vở BT Toán 2, Bài 48 Tiết 2 Q2 — 12 túi đồng xu giống nhau xếp một hàng: nét riêng.
Giữ nội dung toán: đúng 12 túi (bé khoanh 5 túi và 10 túi); không vẽ đồng xu rời.
"""
import sys, os, math; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g4 import *

W, H = 900, 79


def bag(x, y, w=62, h=70, col='#F2D39A'):
    """x, y = giữa đáy."""
    t = y - h
    neck = t + h * .26
    s = [f'<path d="M{x - w * .16},{neck} Q{x - w * .52},{neck + h * .18} {x - w * .48},{y - h * .18} Q{x - w * .46},{y} {x - w * .26},{y} '
         f'H{x + w * .26} Q{x + w * .46},{y} {x + w * .48},{y - h * .18} Q{x + w * .52},{neck + h * .18} {x + w * .16},{neck} Z" fill="{col}" {st(2.6)}/>',
         f'<path d="M{x - w * .16},{neck} L{x - w * .3},{t + 3} Q{x - w * .12},{t + 9} {x},{t + 1} Q{x + w * .12},{t + 9} {x + w * .3},{t + 3} L{x + w * .16},{neck} Z" fill="{col}" {st(2.6)}/>',
         f'<rect x="{x - w * .2}" y="{neck - 3.5}" width="{w * .4}" height="7" rx="3.5" fill="{RED}" {st(2)}/>',
         f'<path d="M{x - w * .32},{neck + h * .2} Q{x - w * .38},{y - h * .3} {x - w * .32},{y - h * .14}" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity=".6"/>']
    return ''.join(s)


parts = [bag(38 + i * 74.9, 76) for i in range(12)]
save('bai48_t2_q2_bags', W, H, parts)
