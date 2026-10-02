/**
 * Phiếu bài tập Bài 1: Ôn tập các số đến 1000 (phiếu thứ hai).
 * Nguồn: docs/lop_3/De_thi/Phiếu bài tập - Bài 1_ Ôn tập các số đến 1000 - Toán LỚP 3 (Có File Tải Về).pdf
 */
import { readNumber as R } from '../../games/worksheetCore.js';

export default {
  id: 'bai-1c',
  title: 'Bài 1: Ôn tập các số đến 1000',
  short: 'Bài 1 (c)',
  desc: 'Ôn tập các số đến 1000 (phiếu 2)',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phiếu bài tập',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Viết số và đọc số:',
          head: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          rows: [452, 807, 691, 235, 740, 999, 518].map(n => [Math.floor(n / 100), Math.floor(n / 10) % 10, n % 10, '…', '…']),
          ans: [452, 807, 691, 235, 740, 999, 518].map(n => [n, R(n)]),
        },
        // sửa: bảng nối của đề in 871 và 940 ở cột câu hỏi, cột đáp án để trống. Cột phải lấy các số đúng cùng 871, 940 làm số nhiễu.
        {
          type: 'match',
          prompt: 'Nối số với cách đọc hoặc cấu tạo số. Nối mỗi ý ở cột trái với đáp án đúng ở cột phải:',
          heads: ['Câu hỏi', 'Đáp án đúng'],
          left: [
            'Số gồm 3 trăm, 2 chục và 4 đơn vị',
            'Số gồm 6 trăm, 0 chục và 5 đơn vị',
            'Số gồm 1 trăm, 8 chục và 7 đơn vị',
          ],
          right: ['605', '871', '324', '940', '187'],
          ans: [2, 0, 4],
        },
        {
          type: 'fill',
          prompt: 'Viết số thành tổng các trăm, chục và đơn vị:',
          marker: '1',
          items: [
            { t: '352 = … + … + …', ans: [300, 50, 2] },
            { t: '608 = … + …', ans: [600, 8] },
            { t: '471 = … + … + …', ans: [400, 70, 1] },
            { t: '790 = … + …', ans: [700, 90] },
            { t: '215 = … + … + …', ans: [200, 10, 5] },
            { t: '963 = … + … + …', ans: [900, 60, 3] },
          ],
        },
        {
          type: 'table',
          prompt: 'Tìm số liền trước và số liền sau:',
          head: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
          rows: [
            ['…', 245, '…'],
            ['…', 700, '…'],
            [398, '…', '…'],
            ['…', '…', 1000],
            ['…', 601, '…'],
            [499, '…', '…'],
          ],
          ans: [[244, 246], [699, 701], [399, 400], [998, 999], [600, 602], [500, 501]],
        },
        {
          type: 'fill',
          prompt: 'Điền số còn thiếu để được ba số liên tiếp:',
          items: [
            { t: '56, …, …', ans: [57, 58] },
            { t: '…, 321, …', ans: [320, 322] },
            { t: '…, …, 455', ans: [453, 454] },
            { t: '609, …, …', ans: [610, 611] },
            { t: '…, 800, …', ans: [799, 801] },
            { t: '998, …, …', ans: [999, 1000] },
          ],
        },
        {
          type: 'compare',
          prompt: 'Điền dấu >, <, = vào ô trống:',
          marker: '1',
          items: [
            '457 □ 475',
            { t: '900 □ 9 trăm', ans: '=' },
            '600 + 20 + 3 □ 623',
            '756 □ 765',
            '1000 □ 999',
            '830 □ 803',
            '478 □ 487',
            '333 □ 330 + 3',
            '250 + 40 □ 290',
            '710 □ 701',
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết dãy số:',
          items: [
            { t: 'Đếm thêm 1: 215, 216, …, …, …, …, …, …, …', ans: [217, 218, 219, 220, 221, 222, 223] },
            { t: 'Đếm bớt 1: 900, 899, …, …, …, …, …, …, …', ans: [898, 897, 896, 895, 894, 893, 892] },
            { t: 'Đếm thêm 10: 340, 350, …, …, …, …, …, …, …', ans: [360, 370, 380, 390, 400, 410, 420] },
            { t: 'Đếm bớt 10: 670, 660, …, …, …, …, …, …, …', ans: [650, 640, 630, 620, 610, 600, 590] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Sắp xếp các số:',
          items: [
            { t: '432, 789, 256, 590. Từ bé đến lớn: …, …, …, …', ans: [256, 432, 590, 789] },
            { t: '432, 789, 256, 590. Từ lớn đến bé: …, …, …, …', ans: [789, 590, 432, 256] },
            { t: '905, 100, 675, 380. Từ bé đến lớn: …, …, …, …', ans: [100, 380, 675, 905] },
            { t: '905, 100, 675, 380. Từ lớn đến bé: …, …, …, …', ans: [905, 675, 380, 100] },
            { t: '812, 218, 712, 128. Từ bé đến lớn: …, …, …, …', ans: [128, 218, 712, 812] },
            { t: '812, 218, 712, 128. Từ lớn đến bé: …, …, …, …', ans: [812, 712, 218, 128] },
            { t: '999, 111, 888, 222. Từ bé đến lớn: …, …, …, …', ans: [111, 222, 888, 999] },
            { t: '999, 111, 888, 222. Từ lớn đến bé: …, …, …, …', ans: [999, 888, 222, 111] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Toán có lời văn:',
          items: [
            { t: '1. Lan có 245 viên bi, Nam có 378 viên bi. Bạn … có nhiều bi hơn và nhiều hơn … viên.', ans: ['Nam', 133], choices: ['Lan', 'Nam'] },
            { t: '2. Trong các số: 504, 789, 320, 965, số lớn nhất là …', ans: 965 },
            { t: '3. Trong các số: 732, 401, 999, 205, số bé nhất là …', ans: 205 },
          ],
        },
        {
          type: 'fill',
          prompt: 'Thử thách:',
          marker: '1',
          items: [
            { t: 'Số lớn nhất có 3 chữ số là …', ans: 999 },
            { t: 'Số bé nhất có 3 chữ số là …', ans: 100 },
            { t: 'Số gồm 9 trăm, 9 chục và 9 đơn vị là …', ans: 999 },
            { t: 'Số liền trước của 1000 là …', ans: 999 },
          ],
        },
      ],
    },
  ],
};
