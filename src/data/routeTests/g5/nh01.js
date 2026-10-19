/** Kiểm tra nhanh 1: Bài 1–3 Toán 5 (ôn tập số tự nhiên; các phép tính với số tự nhiên; ôn tập phân số). Quy tắc: docs/kiem-tra-lo-trinh.md. */
import { fracBars } from './art.js';

export default {
  id: 'l5-nh-01',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 1',
  short: 'Nhanh 1',
  after: { book: 'tool5', units: '1-3' },
  desc: 'Ôn tập số tự nhiên; các phép tính với số tự nhiên; ôn tập phân số',
  time: 30,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Chữ số 4 trong 2 403 516 ở hàng trăm nghìn. Nhiễu: lấy chữ số (4), nhầm hàng chục nghìn (40 000), hàng triệu (4 000 000).
      { type: 'mc', bai: 1, point: 1, level: 1,
        prompt: 'Trong số 2 403 516, chữ số 4 có giá trị là:',
        options: ['4', '40 000', '400 000', '4 000 000'], ans: 2 },
      // Băng chia 8 phần, tô 5 phần: {5/8}. Nhiễu: đảo tử mẫu, lấy phần không tô ({3/8}), so phần tô với phần không tô ({5/3}).
      { type: 'mc', bai: 3, point: 0, level: 1,
        prompt: 'Phân số chỉ phần đã tô màu của băng giấy là:',
        fig: fracBars([{ n: 8, k: 5 }]),
        options: ['{5/8}', '{8/5}', '{3/8}', '{5/3}'], ans: 0 },
      // Cùng tử số: mẫu bé hơn thì lớn hơn ({3/4} > {3/7}); {12/18} rút gọn được {2/3}; {4/9} < {5/9}; {6/8} = {3/4}.
      { type: 'tf', bai: 3, point: 4, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['{3/4} < {3/7}', 'Rút gọn {12/18} được phân số tối giản {2/3}.', '{4/9} < {5/9}', '{6/8} = {3/4}'],
        ans: ['S', 'Đ', 'Đ', 'Đ'] },
      // Số nhiều chữ số hơn thì lớn hơn: 102 345 (6 chữ số) lớn nhất. Nhiễu: nhìn chữ số đầu 9 (98 765, 99 999), 100 998 có chữ số 9 ở cuối.
      { type: 'mc', bai: 1, point: 3, level: 1,
        prompt: 'Số lớn nhất trong các số 98 765; 102 345; 99 999; 100 998 là:',
        options: ['98 765', '102 345', '99 999', '100 998'], ans: 1 },
      // Nhân cả tử và mẫu với 2: {3/5} = {6/10}. Nhiễu: cộng 3 vào cả tử và mẫu ({6/8}), chỉ nhân mẫu ({3/10}), đảo tử mẫu ({5/3}).
      { type: 'mc', bai: 3, point: 1, level: 1,
        prompt: 'Phân số bằng phân số {3/5} là:',
        options: ['{6/10}', '{6/8}', '{3/10}', '{5/3}'], ans: 0 },
      // 5 trăm nghìn, 4 nghìn, 8 chục, 2 đơn vị: hàng chục nghìn và hàng trăm không có nên viết 0: 504 082.
      // Nhiễu: bỏ các chữ số 0 (5 482), đặt 4 vào hàng chục nghìn (540 082), đặt 4 vào hàng trăm (500 482).
      { type: 'mc', bai: 1, point: 2, level: 2,
        prompt: 'Số gồm 5 trăm nghìn, 4 nghìn, 8 chục và 2 đơn vị là:',
        options: ['5 482', '504 082', '540 082', '500 482'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Nhân chia trước, cộng trừ sau: 4 250 − 125 × 8 = 4 250 − 1 000 = 3 250; tính thuận tiện 25 × 36 × 4 = 100 × 36 = 3 600.
      { type: 'fill', bai: 2, point: 2, level: 2,
        prompt: 'Tính giá trị của biểu thức:',
        items: [
          { t: '4 250 − 125 × 8 = 4 250 − … = …', ans: [1000, 3250] },
          { t: '(1 236 + 764) : 25 = … : 25 = …', ans: [2000, 80] },
        ] },
      // Tổng và hiệu: tổng 86 quyển, hiệu 14 quyển. Số lớn (lớp 5A) = (86 + 14) : 2 = 50; lớp 5B = 50 − 14 = 36.
      { type: 'fill', bai: 2, point: 4, level: 3,
        prompt: 'Hai lớp 5A và 5B quyên góp được 86 quyển sách. Lớp 5A quyên góp nhiều hơn lớp 5B 14 quyển. Hỏi mỗi lớp quyên góp được bao nhiêu quyển sách?',
        items: [
          { t: 'Lớp 5A quyên góp được: (86 + 14) : 2 = … (quyển)', ans: [50] },
          { t: 'Lớp 5B quyên góp được: 50 − 14 = … (quyển)', ans: [36] },
        ] },
      // a) 3 và 4 không chia hết cho nhau: mẫu số chung 3 × 4 = 12. b) 12 chia hết cho 6 nên lấy 12 làm mẫu số chung, {7/12} giữ nguyên.
      { type: 'fill', bai: 3, point: 3, level: 2,
        prompt: 'Quy đồng mẫu số: a) {2/3} và {3/4}; b) {5/6} và {7/12}.',
        items: [
          { t: 'a) {2/3} = {…/…}', ans: [8, 12] },
          { t: 'a) {3/4} = {…/…}', ans: [9, 12] },
          { t: 'b) {5/6} = {…/…}', ans: [10, 12] },
        ] },
      // 4 và 7 không chia hết cho nhau, mẫu số chung 28: {3/4} = {21/28} > {5/7} = {20/28}. Bẫy: thấy 5, 7 lớn hơn 3, 4 nên chọn Minh.
      { type: 'fill', bai: 3, point: 4, level: 3,
        prompt: 'Hùng và Minh cùng chạy trên một đường đua dài 1 km. Hùng đã chạy được {3/4} đường đua, Minh đã chạy được {5/7} đường đua. Hỏi bạn nào đã chạy được nhiều hơn?',
        items: [
          { t: 'Quy đồng mẫu số: {3/4} = {…/…}', ans: [21, 28] },
          { t: '{5/7} = {…/…}', ans: [20, 28] },
          { t: 'Bạn chạy được nhiều hơn là bạn …', ans: 'Hùng', choices: ['Hùng', 'Minh'] },
        ] },
    ] },
  ],
};
