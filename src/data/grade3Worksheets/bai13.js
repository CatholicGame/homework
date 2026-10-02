/**
 * Phiếu bài tập Bài 13: Tìm thành phần trong phép nhân, phép chia.
 * Nguồn: docs/lop_3/De_thi/Bài 13_ Tìm thành phần trong phép nhân, phép chia - Toán LỚP 3 (Có File Tải Về).pdf
 */

const MUL = ['thừa số', 'tích'];
const DIV = ['số bị chia', 'số chia', 'thương'];
const ST = 'stroke="#1f2937" stroke-width="2.5" fill="none"';
const lbl = (x, y, t, a = 'middle') => `<text x="${x}" y="${y}" font-size="14" font-weight="700" fill="#1f2937" text-anchor="${a}">${t}</text>`;
// Hình chữ nhật ABCD 6 cm × 4 cm (24 px = 1 cm).
const FIG = `<svg viewBox="0 0 220 140" width="220" xmlns="http://www.w3.org/2000/svg" font-family="Quicksand, sans-serif">
  <rect x="24" y="16" width="144" height="96" ${ST}/>
  ${lbl(14, 14, 'D')}${lbl(178, 14, 'C')}${lbl(14, 126, 'A')}${lbl(178, 126, 'B')}${lbl(96, 130, '6 cm')}${lbl(176, 68, '4 cm', 'start')}
</svg>`;

const word = (o) => ({ type: 'word', ...o });

export default {
  id: 'bai-13',
  title: 'Bài 13: Tìm thành phần trong phép nhân, phép chia',
  short: 'Bài 13',
  desc: 'Thừa số, tích, số bị chia, số chia, thương',
  numbering: 'continuous',
  parts: [
    {
      title: '1. Nhận biết thành phần phép nhân',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Viết tên các thành phần trong phép nhân sau:',
          items: [
            { t: '7 × 5 = 35: 7 là …, 5 là …, 35 là …', ans: ['thừa số', 'thừa số', 'tích'], choices: MUL },
            { t: '9 × 4 = 36: 9 là …, 4 là …, 36 là …', ans: ['thừa số', 'thừa số', 'tích'], choices: MUL },
            { t: '6 × 8 = 48: 6 là …, 8 là …, 48 là …', ans: ['thừa số', 'thừa số', 'tích'], choices: MUL },
          ],
        },
      ],
    },
    {
      title: '2. Nhận biết thành phần phép chia',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Viết tên các thành phần trong phép chia sau:',
          items: [
            { t: '42 : 7 = 6: 42 là …, 7 là …, 6 là …', ans: DIV, choices: DIV },
            { t: '24 : 8 = 3: 24 là …, 8 là …, 3 là …', ans: DIV, choices: DIV },
            { t: '56 : 7 = 8: 56 là …, 7 là …, 8 là …', ans: DIV, choices: DIV },
          ],
        },
      ],
    },
    {
      title: '3. Điền vào chỗ trống (phép nhân)',
      label: '',
      questions: [{ type: 'fill', prompt: 'Điền số thích hợp vào chỗ trống:', items: ['5 × … = 40', '… × 7 = 49', '9 × … = 63'] }],
    },
    {
      title: '4. Điền vào chỗ trống (phép chia)',
      label: '',
      questions: [{ type: 'fill', prompt: 'Điền số thích hợp vào chỗ trống:', items: ['56 : … = 8', '… : 4 = 9', '32 : … = 4'] }],
    },
    {
      title: '5. Trắc nghiệm: Chọn đáp án đúng',
      label: '',
      questions: [
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái đặt trước câu trả lời đúng.',
          items: [
            { prompt: 'a) Trong phép nhân 8 × 6 = 48, số 8 là:', options: ['Thừa số', 'Tích', 'Số chia'], ans: 0 },
            { prompt: 'b) Trong phép chia 54 : 9 = 6, số 9 là:', options: ['Số bị chia', 'Số chia', 'Thương'], ans: 1 },
            { prompt: 'c) Trong phép nhân 3 × 7 = 21, số 21 là:', options: ['Thừa số', 'Tích', 'Số chia'], ans: 1 },
          ],
        },
      ],
    },
    {
      title: '6. Nối thành phần với tên gọi đúng',
      label: '',
      questions: [
        // sửa: cột "Tên gọi" của đề để trống và cột trái chỉ in cả phép tính; ghi rõ số cần gọi tên và cho sẵn các tên gọi để nối.
        {
          type: 'match',
          prompt: 'Nối thành phần với tên gọi đúng:',
          heads: ['Thành phần', 'Tên gọi'],
          left: ['Số 36 trong 36 : 6 = 6', 'Số 8 trong 5 × 8 = 40', 'Số 9 trong 72 : 8 = 9'],
          right: ['Thừa số', 'Số bị chia', 'Thương', 'Tích'],
          ans: [1, 0, 2],
        },
      ],
    },
    {
      title: '7. Viết phép nhân hoặc phép chia theo yêu cầu',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Viết phép nhân hoặc phép chia phù hợp với các thành phần sau:',
          items: [
            { t: 'Thừa số thứ nhất: 4, thừa số thứ hai: 9, tích: …', ans: 36 },
            { t: 'Số bị chia: 45, số chia: 5, thương: …', ans: 9 },
            { t: 'Thừa số thứ nhất: 7, tích: 49, thừa số thứ hai: …', ans: 7 },
          ],
        },
      ],
    },
    {
      title: '8. Tìm thành phần chưa biết (vận dụng)',
      label: '',
      questions: [{ type: 'findx', prompt: 'Tìm số thích hợp thay cho x:', items: ['x × 3 = 21', '56 : x = 7', 'x : 5 = 4', '8 × x = 56'] }],
    },
    {
      title: '9. Bài toán có lời văn',
      label: '',
      questions: [
        word({
          text: 'Một cửa hàng có 7 kệ, mỗi kệ xếp 8 hộp sữa. Hỏi cửa hàng có tất cả bao nhiêu hộp sữa?',
          given: ['Có 7 kệ.', 'Mỗi kệ xếp 8 hộp sữa.'],
          ask: 'Cửa hàng có tất cả bao nhiêu hộp sữa?',
          hint: '7 kệ, kệ nào cũng có 8 hộp: lấy 8 lặp lại 7 lần, đó là phép nhân.',
          sentence: ['Cửa hàng', 'có tất cả', 'số hộp sữa', 'là:'],
          decoys: ['mỗi kệ'],
          expr: { a: 8, op: '×', b: 7, result: 56, unit: 'hộp sữa' },
          units: ['hộp sữa', 'kệ', 'cửa hàng'],
        }),
        word({
          text: 'Một thùng có 48 quả cam, chia đều vào 6 túi. Hỏi mỗi túi có bao nhiêu quả cam?',
          given: ['Có 48 quả cam.', 'Chia đều vào 6 túi.'],
          ask: 'Mỗi túi có bao nhiêu quả cam?',
          hint: 'Chia đều vào các túi, túi nào cũng bằng nhau: đó là phép chia.',
          sentence: ['Mỗi túi', 'có số', 'quả cam', 'là:'],
          decoys: ['tất cả'],
          expr: { a: 48, op: ':', b: 6, result: 8, unit: 'quả cam' },
          units: ['quả cam', 'túi', 'thùng'],
        }),
      ],
    },
    {
      title: '10. Bài toán hình học ứng dụng phép nhân, chia',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Một hình chữ nhật có chiều dài 6 cm, chiều rộng 4 cm. Tính chu vi và diện tích hình chữ nhật đó.',
          fig: FIG,
          items: [
            { t: 'Chu vi hình chữ nhật là: … cm', ans: 20 },
            { t: 'Diện tích hình chữ nhật là: … cm²', ans: 24 },
          ],
        },
      ],
    },
  ],
};
