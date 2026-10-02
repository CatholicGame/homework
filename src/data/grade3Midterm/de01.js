/** Đề số 1. Nguồn: docs/lop_3/De_thi/Bo-de-on-tap-giua-hoc-ki-1-mon-toan-lop-3.pdf trang 1–3. */
export default {
  id: 'de-01',
  title: 'Đề số 1',
  short: 'Đề 1',
  desc: 'Bảng chia 7, một phần mấy, đổi đơn vị, gấp lên nhiều lần',
  review: 'bảng chia, một phần mấy và gấp một số lên nhiều lần',
  time: 40,
  numbering: 'part',
  parts: [
    {
      title: 'A. Phần trắc nghiệm',
      label: 'Bài',
      questions: [
        { type: 'mc', prompt: 'Kết quả của phép tính 56 : 7 = ?', options: ['6', '7', '8', '9'], ans: 2 },
        { type: 'mc', prompt: 'Mẹ hái được 42 quả cam, mẹ biếu bà {1/6} số cam. Số cam mẹ biếu bà là:', options: ['21 quả cam', '12 quả cam', '14 quả cam', '7 quả cam'], ans: 3 },
        {
          type: 'pick',
          prompt: 'Hãy khoanh vào:',
          items: [
            { prompt: 'a) {1/3} số con thỏ:', icon: 'rabbit', count: 15, cols: 3, ans: 5 },
            { prompt: 'b) {1/4} số quả cam:', icon: 'orange', count: 16, cols: 4, ans: 4 },
          ],
        },
        { type: 'mc', prompt: '6 dm 4 mm = … mm. Số cần điền vào chỗ trống là:', options: ['64', '60', '604', '640'], ans: 2 },
        {
          type: 'tf',
          prompt: 'Đúng ghi Đ, sai ghi S:',
          items: [
            { div: '80 : 4', q: '2', work: ['8', '0'] },
            { div: '45 : 5', q: '9', work: ['45', '0'] },
            { div: '48 : 6', q: '7', work: ['42', '6'] },
            { div: '19 : 2', q: '8', work: ['16', '3'] },
          ],
          ans: ['S', 'Đ', 'S', 'S'],
        },
        {
          type: 'draw',
          items: [
            { prompt: 'a) Vẽ một đoạn thẳng AB dài 4 cm.', name: 'AB', len: 4 },
            { prompt: 'b) Vẽ đoạn thẳng CD dài gấp đôi (gấp 2) đoạn thẳng AB.', name: 'CD', len: 8 },
          ],
        },
      ],
    },
    {
      title: 'B. Phần tự luận',
      label: 'Bài',
      questions: [
        { type: 'calc', prompt: 'Đặt tính rồi tính:', col: true, items: ['32 × 3', '36 × 4', '87 : 3', '72 : 4'] },
        {
          type: 'word',
          text: 'Trong tháng thi đua chào mừng ngày Nhà giáo Việt Nam, bạn Nam đạt được 6 điểm mười, số điểm mười của bạn Nga gấp 3 lần số điểm mười của bạn Nam. Hỏi bạn Nga được bao nhiêu điểm mười?',
          given: ['Nam được 6 điểm mười.', 'Nga được gấp 3 lần Nam.'],
          ask: 'Nga được bao nhiêu điểm mười?',
          hint: 'Gấp một số lên 3 lần thì lấy số đó nhân với 3.',
          sentence: ['Bạn Nga', 'được số', 'điểm mười', 'là:'],
          decoys: ['còn lại'],
          expr: { a: 6, op: '×', b: 3, result: 18, unit: 'điểm mười' },
          units: ['điểm mười', 'bạn', 'lần'],
        },
        // sửa: đề in "trong đó có số học sinh gấp 3 lần số học sinh giỏi", thêm "cả lớp" cho rõ nghĩa.
        {
          type: 'word',
          text: 'Trong lớp có 27 học sinh, số học sinh cả lớp gấp 3 lần số học sinh giỏi. Hỏi lớp học đó có bao nhiêu học sinh giỏi?',
          given: ['Lớp có 27 học sinh.', 'Số học sinh cả lớp gấp 3 lần số học sinh giỏi.'],
          ask: 'Lớp có bao nhiêu học sinh giỏi?',
          hint: 'Cả lớp gấp 3 lần số học sinh giỏi, nên số học sinh giỏi bằng số học sinh cả lớp chia cho 3.',
          sentence: ['Lớp học đó', 'có số', 'học sinh giỏi', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 27, op: ':', b: 3, result: 9, unit: 'học sinh' },
          units: ['học sinh', 'lớp', 'lần'],
        },
        {
          type: 'fill',
          prompt: 'Cuối năm, cô phát vở cho 7 em học sinh giỏi. Cô nói: "Nếu thêm 6 quyển vở nữa thì mỗi em sẽ được 8 quyển". Hỏi cô có bao nhiêu quyển vở?',
          items: [
            { t: 'Nếu có thêm 6 quyển thì cô có số quyển vở là: … quyển', ans: 56 },
            { t: 'Cô có số quyển vở là: … quyển', ans: 50 },
          ],
        },
      ],
    },
  ],
};
