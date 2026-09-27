"""
Luyện tập Toán 3, Tuần 13 Tiết 1 Q4 — con lợn (nối với 30 kg): nét riêng. Không có số trong hình.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from kit_p1 import *
import kit_g1

W, H = 300, 240
p = [f'<ellipse cx="150" cy="214" rx="130" ry="8" fill="{INK}" opacity=".1"/>',
     place(kit_g1.pig(0, 0), 132, 212, 1.18)]
save('tuan13_t1_q4_pig', W, H, p, folder='grade3-practice')
