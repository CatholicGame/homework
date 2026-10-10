/** Kiểm tra nhanh 4: Bài 10–12 Toán 4 (số có sáu chữ số, số 1 000 000; hàng và lớp; các số trong phạm vi lớp triệu). Quy tắc: docs/kiem-tra-lo-trinh.md. */

export default {
  id: 'l4-nh-04',
  kind: 'nhanh',
  title: 'Kiểm tra nhanh 4',
  short: 'Nhanh 4',
  after: { book: 'tool4', units: '10-12' },
  desc: 'Số có sáu chữ số, số 1 000 000; hàng và lớp; các số trong phạm vi lớp triệu',
  time: 20,
  numbering: 'continuous',
  parts: [
    { title: 'A. Phần trắc nghiệm', label: 'Câu', questions: [
      // Nhiễu: "linh năm nghìn" viết thành 50 nghìn (350 217), bỏ chữ số 0 hàng chục nghìn (35 217),
      // viết thừa chữ số 0 (3 005 217).
      { type: 'mc', bai: 10, point: 1, level: 1,
        prompt: 'Số "Ba trăm linh năm nghìn hai trăm mười bảy" viết là:',
        options: ['350 217', '305 217', '35 217', '3 005 217'], ans: 1 },
      // 527 836: lớp nghìn là 527, lớp đơn vị là 836. Ý sai: chữ số 7 ở hàng nghìn nên thuộc lớp nghìn;
      // chữ số 5 ở hàng trăm nghìn (nhầm là chục nghìn vì đếm thiếu một hàng).
      { type: 'tf', bai: 11, point: 0, level: 1,
        prompt: 'Cho số 527 836. Đúng ghi Đ, sai ghi S:',
        items: ['Các chữ số 8, 3, 6 thuộc lớp đơn vị.', 'Chữ số 7 thuộc lớp đơn vị.', 'Lớp nghìn gồm các chữ số 5, 2, 7.', 'Chữ số 5 ở hàng chục nghìn.'],
        ans: ['Đ', 'S', 'Đ', 'S'] },
      // Nhiễu: đọc 500 nghìn thành 50 nghìn, tách lớp sai (4 250 000), bỏ bớt ba chữ số 0 (425 000).
      { type: 'mc', bai: 12, point: 1, level: 1,
        prompt: 'Số 42 500 000 đọc là:',
        options: ['Bốn mươi hai triệu năm mươi nghìn', 'Bốn triệu hai trăm năm mươi nghìn', 'Bốn mươi hai triệu năm trăm nghìn', 'Bốn trăm hai mươi lăm nghìn'], ans: 2 },
    ] },
    { title: 'B. Phần tự luận', label: 'Câu', questions: [
      // Chữ số 8 ở hàng chục nghìn (80 000), hàng triệu (8 000 000), hàng nghìn (8 000).
      { type: 'table', bai: 11, point: 1, level: 2,
        prompt: 'Viết giá trị của chữ số 8 trong mỗi số vào ô trống:',
        head: ['Số', 'Giá trị của chữ số 8'],
        rows: [['683 052', '…'], ['8 214 500', '…'], ['1 508 000', '…']],
        ans: [[80000], [8000000], [8000]] },
      // Hàng không có đơn vị nào thì viết chữ số 0: 5 070 004; 20 300 000; 800 006 000.
      { type: 'fill', bai: 12, point: 1, level: 3,
        prompt: 'Viết số thích hợp vào chỗ chấm:',
        items: [
          { t: 'Số gồm 5 triệu, 7 chục nghìn và 4 đơn vị viết là: …', ans: 5070004 },
          { t: 'Số gồm 2 chục triệu và 3 trăm nghìn viết là: …', ans: 20300000 },
          { t: 'Số gồm 8 trăm triệu và 6 nghìn viết là: …', ans: 800006000 },
        ] },
    ] },
  ],
};
