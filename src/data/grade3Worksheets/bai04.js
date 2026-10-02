/**
 * Phiếu bài tập Bài 4: Ôn tập bảng nhân 2, bảng chia 2, bảng nhân 5, bảng chia 5.
 * Nguồn: docs/lop_3/De_thi/Bài 4_ Ôn tập bảng nhân 2, bảng chia 2, bảng nhân 5, bảng chia 5 - Toán LỚP 3 (Có File Tải Về).pdf
 */
const K = [1, 3, 5, 7, 9, 2, 4, 6, 8, 10];
const D = [50, 45, 40, 35, 30, 25, 20, 15, 10, 5];

export default {
  id: 'bai-4',
  title: 'Bài 4: Ôn tập bảng nhân 2, bảng chia 2, bảng nhân 5, bảng chia 5',
  short: 'Bài 4',
  desc: 'Ôn tập bảng nhân 2, 5 và bảng chia 2, 5',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phiếu bài tập ôn tập bảng nhân 5, bảng chia 5',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Số?',
          items: [
            { prompt: 'Bảng phép nhân', transpose: true, head: ['Thừa số', 'Thừa số', 'Tích'], rows: K.map(k => [5, k, '…']), ans: K.map(k => [5 * k]) },
            { prompt: 'Bảng phép chia', transpose: true, head: ['Số bị chia', 'Số chia', 'Thương'], rows: D.map(d => [d, 5, '…']), ans: D.map(d => [d / 5]) },
          ],
        },
        {
          type: 'table',
          prompt: 'Số?',
          items: [
            { prompt: 'Đếm thêm 5', rows: [[5, '…', 15, '…', 25, 30, '…', '…', 45, 50]], ans: [[10, 20, 35, 40]] },
            { prompt: 'Đếm lùi 5', rows: [[50, 45, '…', 35, '…', '…', 20, 15, '…', 5]], ans: [[40, 30, 25, 10]] },
          ],
        },
        { type: 'chain', prompt: 'Số? Bắt đầu từ số 50, em hãy thực hiện các phép tính theo sơ đồ mũi tên sau:', items: [{ start: 50, steps: [': 5', ': 2', '× 9'] }] },
        {
          type: 'word',
          text: 'Mỗi hộp có 5 chiếc bút chì. Hỏi 8 hộp như vậy có tất cả bao nhiêu chiếc bút chì?',
          given: ['Mỗi hộp có 5 chiếc bút chì.', 'Có 8 hộp như vậy.'],
          ask: 'Có tất cả bao nhiêu chiếc bút chì?',
          hint: '8 hộp, hộp nào cũng có 5 chiếc: lấy 5 lặp lại 8 lần, đó là phép nhân.',
          sentence: ['8 hộp', 'có tất cả', 'số chiếc bút chì', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 5, op: '×', b: 8, result: 40, unit: 'chiếc bút chì' },
          units: ['chiếc bút chì', 'hộp', 'cái'],
        },
      ],
    },
  ],
};
