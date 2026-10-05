"""SGK Toán 4, bài 1 (trang 3–4): tia số, hình tính chu vi."""
from kit_g4t import *

# Bài 1 câu 1a: tia số 0, 10 000, …, 30 000, …, …, …
xs = [40 + i * 105 for i in range(7)]
out('bai1_q1_tiaso', 760, 110, number_line(20, 34, 730, xs, ['0', '10 000', '?', '30 000', '?', '?', '?']))

# Bài 1 câu 4: tứ giác ABCD, hình chữ nhật MNPQ, hình vuông GHIK
p = []
p += poly([(30, 190), (130, 40), (200, 140), (150, 215)], labels='ABCD', sides=['6cm', '4cm', '3cm', '4cm'])
p += poly([(310, 80), (510, 80), (510, 200), (310, 200)], labels='MNPQ', sides=[None, None, '8cm', '4cm'])
p += poly([(610, 60), (750, 60), (750, 200), (610, 200)], labels='GHIK', sides=[None, None, '5cm', '5cm'])
out("bai1_q4_chuvi", 790, 250, p)
