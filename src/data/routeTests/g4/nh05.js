/** Kiểm tra nhanh 5: Bài 13–16 Toán 4 (làm tròn số đến hàng trăm nghìn; so sánh các số có nhiều chữ số; dãy số tự nhiên). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-nh-05',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 5',
  short: 'Nhanh 5',
  after: { book: 'tool4', units: '13-16' },
  desc: 'Làm tròn số đến hàng trăm nghìn; so sánh các số có nhiều chữ số; dãy số tự nhiên',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: so chữ số tận cùng (758 943 có 3 > 2), đổi chỗ hai chữ số cuối (785 423),
      // thấy chữ số 9 lớn mà quên số chữ số (78 954 chỉ có năm chữ số).
      { type: 'mc', bai: 14, point: 1, level: 1,
        prompt: 'Số lớn nhất trong các số 758 943; 785 423; 78 954; 785 432 là:',
        options: ['758 943', '785 423', '78 954', '785 432'], ans: 3 },
      // Ý sai: nghĩ có số tự nhiên lớn nhất; nhầm hai số tự nhiên liên tiếp với hai số chẵn liên tiếp (hơn kém 2).
      { type: 'tf', bai: 15, point: 0, level: 1,
        prompt: 'Đúng ghi Đ, sai ghi S:',
        items: ['Số 0 là số tự nhiên bé nhất.', 'Số tự nhiên lớn nhất là 999 999 999.', 'Số liền sau của 99 999 là 100 000.', 'Hai số tự nhiên liên tiếp hơn kém nhau 2 đơn vị.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Chữ số hàng chục nghìn là 6 nên làm tròn lên: 4 400 000. Nhiễu: làm tròn xuống (4 300 000),
      // làm tròn đến hàng chục nghìn (4 370 000), đến hàng triệu (4 000 000).
      { type: 'mc', bai: 13, point: 0, level: 1,
        prompt: 'Làm tròn số 4 367 000 đến hàng trăm nghìn thì được số:',
        options: ['4 300 000', '4 400 000', '4 370 000', '4 000 000'], ans: 1 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Cùng số chữ số thì so từ trái sang phải; nhiều chữ số hơn thì lớn hơn.
      { type: 'compare', bai: 14, point: 1, level: 2,
        prompt: 'Điền dấu >, <, = thích hợp:',
        items: ['689 512 □ 698 215', '1 000 000 □ 999 999', '45 780 312 □ 45 708 312', '305 600 □ 305 000 + 600'] },
      // 1 488 200: hàng nghìn 8 nên làm tròn chục nghìn lên 1 490 000; hàng chục nghìn 8 nên làm tròn
      // trăm nghìn lên 1 500 000 (nhớ sang hàng triệu); hàng trăm 2 nên làm tròn nghìn xuống 1 488 000.
      { type: 'fill', bai: 13, point: 1, level: 3,
        prompt: 'Một thành phố có 1 488 200 người. Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Làm tròn đến hàng nghìn: khoảng … người.', ans: 1488000 },
          { t: 'Làm tròn đến hàng chục nghìn: khoảng … người.', ans: 1490000 },
          { t: 'Làm tròn đến hàng trăm nghìn: khoảng … người.', ans: 1500000 },
        ] },
    ] },
  ],
};
