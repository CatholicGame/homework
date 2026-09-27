"""
Vở BT Toán 2, Bài 17 Tiết 2 Q1 — bốn bạn đứng trên cân sức khoẻ: nét riêng.

Nội dung toán giữ đúng sách (trái -> phải), số cân ghi trong bong bóng cạnh cân:
  bạn gái (Mai) 23 kg · bạn trai 25 kg · bạn trai (Việt) 24 kg · Rô-bốt 20 kg.
"""
import sys, os; sys.path.insert(0, os.path.dirname(__file__)); from common import *
from kit_g1 import kid, robot, bathroom_scale, bubble

W, H = 900, 330
P = []
slots = [(112, '23 kg'), (337, '25 kg'), (562, '24 kg'), (787, '20 kg')]
for cx, lab in slots:
    P.append(bathroom_scale(cx, 324, w=184, h=22))
P.append(kid(96, 296, 262, girl=True, shirt='#FFB3C7', bottom='#F7839F', shoe='#6FB7EA', pose='down', mouth='open'))
P.append(kid(315, 296, 262, shirt=YELLOW, bottom='#4E8FC8', shoe=ORANGE, hair='#6B4A3A', pose='hips', mouth='o'))
P.append(kid(540, 296, 254, shirt=GREEN, bottom='#7C8CD6', shoe=RED, pose='down'))
P.append(robot(762, 296, 210, arm_pose='wave'))
for cx, lab in slots:
    P.append(bubble(cx + 58, 232, 34, lab, size=21, tail=(cx + 64, 282)))
save('bai17_t2_q1_kids', W, H, P)
