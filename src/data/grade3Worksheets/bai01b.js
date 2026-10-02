/**
 * Phiếu bài tập Bài 1: Đọc, viết, so sánh các số có 3 chữ số.
 * Nguồn: docs/lop_3/De_thi/Bài 1_ Đọc, viết, so sánh các số có 3 chữ số - Toán LỚP 3 (Có File Tải Về).pdf
 */
import { readNumber as R } from '../../games/worksheetCore.js';

export default {
  id: 'bai-1b',
  title: 'Bài 1: Đọc, viết, so sánh các số có 3 chữ số',
  short: 'Bài 1 (b)',
  desc: 'Đọc, viết, so sánh các số có 3 chữ số',
  numbering: 'continuous',
  parts: [
    {
      title: 'Nhận biết',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Đọc số:',
          items: [
            { t: 'Số 205 đọc là: …', ans: R(205) },
            { t: 'Số 430 đọc là: …', ans: R(430) },
            { t: 'Số 999 đọc là: …', ans: R(999) },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết số:',
          items: [
            { t: 'Bốn trăm mười hai: …', ans: 412 },
            { t: 'Sáu trăm linh năm: …', ans: 605 },
            { t: 'Tám trăm mười bảy: …', ans: 817 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết các số theo thứ tự tăng dần:',
          items: [
            { t: '507, 275, 750, 570: …, …, …, …', ans: [275, 507, 570, 750] },
            { t: '321, 213, 132, 231: …, …, …, …', ans: [132, 213, 231, 321] },
          ],
        },
      ],
    },
    {
      title: 'Thông hiểu',
      label: '',
      questions: [
        {
          type: 'table',
          prompt: 'Điền số thích hợp vào ô trống:',
          head: ['Hàng trăm', 'Hàng chục', 'Hàng đơn vị', 'Số cần điền'],
          rows: [[3, 5, 8, '…'], [9, 0, 7, '…'], [1, 8, 0, '…']],
          ans: [[358], [907], [180]],
        },
        {
          type: 'mc',
          prompt: 'Khoanh vào chữ cái trước câu trả lời đúng:',
          items: [
            { prompt: 'a) Số nào lớn nhất?', options: ['721', '712', '217', '271'], ans: 0 },
            { prompt: 'b) Số nào nhỏ nhất?', options: ['356', '365', '653', '635'], ans: 0 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Số liền trước và số liền sau:',
          items: [
            { t: 'Số liền trước của 400 là: …', ans: 399 },
            { t: 'Số liền sau của 400 là: …', ans: 401 },
            { t: 'Số liền trước của 999 là: …', ans: 998 },
            { t: 'Số liền sau của 999 là: …', ans: 1000 },
          ],
        },
      ],
    },
    {
      title: 'Vận dụng',
      label: '',
      questions: [
        { type: 'compare', prompt: 'So sánh các số sau, điền dấu >, < hoặc = vào chỗ trống:', items: ['348 □ 384', '560 □ 506', '777 □ 777'] },
        {
          type: 'fill',
          prompt: 'Viết các số sau theo thứ tự giảm dần:',
          items: [
            { t: '850, 805, 580, 508: …, …, …, …', ans: [850, 805, 580, 508] },
            { t: '999, 990, 909, 919: …, …, …, …', ans: [999, 990, 919, 909] },
          ],
        },
      ],
    },
    {
      title: 'Vận dụng cao',
      label: '',
      questions: [
        {
          type: 'fill',
          prompt: 'Tìm số bí mật:',
          items: [
            { t: 'Tôi là số có ba chữ số, chữ số hàng trăm là 4, chữ số hàng chục là 0, chữ số hàng đơn vị là 9. Tôi là số …', ans: 409 },
            { t: 'Tôi là số lớn nhất có ba chữ số giống nhau. Tôi là số …', ans: 999 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Số nào?',
          items: [
            { t: 'Số nhỏ nhất có ba chữ số khác nhau là: …', ans: 102 },
            { t: 'Số lớn nhất có ba chữ số khác nhau là: …', ans: 987 },
          ],
        },
        // sửa: đề in lưới 9 ô A–I với dãy số có số trùng (312, 231, 132 hai lần), có nhiều cách xếp nên không chấm được.
        // Giữ ý chính theo đáp án mẫu của đề: xếp sáu số khác nhau theo thứ tự tăng dần.
        {
          type: 'fill',
          prompt: 'Xếp các số 321, 123, 213, 231, 312, 132 theo thứ tự tăng dần từ trái sang phải:',
          items: [{ t: '…, …, …, …, …, …', ans: [123, 132, 213, 231, 312, 321] }],
        },
      ],
    },
  ],
};
