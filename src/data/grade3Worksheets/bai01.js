/**
 * Phiếu bài tập Bài 1: Ôn tập các số đến 1000.
 * Nguồn: docs/lop_3/De_thi/Bài 1_ Ôn tập các số đến 1000 - Toán LỚP 3 (Có File Tải Về).pdf
 * Định dạng: docs/lop_3/phieu-bai-tap.md, docs/lop_3/de-on-tap-giua-ki.md.
 */
import { readNumber as R } from '../../games/worksheetCore.js';

export default {
  id: 'bai-1',
  title: 'Bài 1: Ôn tập các số đến 1000',
  short: 'Bài 1',
  desc: 'Ôn tập các số đến 1000',
  numbering: 'continuous',
  parts: [
    {
      title: 'Phiếu bài tập',
      label: 'Bài',
      questions: [
        {
          type: 'table',
          prompt: 'Viết số và đọc số. Hoàn thành các ô còn thiếu trong bảng sau:',
          head: ['Trăm', 'Chục', 'Đơn vị', 'Viết số', 'Đọc số'],
          // sửa: bốn hàng in thiếu một chữ số mà ô Viết số cũng để trống (không tìm được số); điền sẵn ô Viết số cho các hàng đó.
          rows: [
            [5, 6, 7, '…', '…'],
            [9, 0, 4, '…', '…'],
            [3, 2, 9, '…', '…'],
            ['…', 8, 1, 681, '…'],
            [7, '…', 5, 735, '…'],
            [2, 7, '…', 279, '…'],
            ['…', 4, 0, 840, '…'],
            [1, 0, 0, '…', '…'],
          ],
          ans: [
            [567, R(567)], [904, R(904)], [329, R(329)], [6, R(681)],
            [3, R(735)], [9, R(279)], [8, R(840)], [100, R(100)],
          ],
        },
        {
          type: 'match',
          prompt: 'Nối số với cách đọc hoặc cấu tạo số. Nối mỗi ý ở cột A với một ý ở cột B cho phù hợp:',
          heads: ['A', 'B'],
          left: [
            'Số gồm 6 trăm, 2 chục và 5 đơn vị',
            'Số gồm 4 trăm, 0 chục và 7 đơn vị',
            'Số gồm 8 trăm, 9 chục và 0 đơn vị',
            'Số gồm 3 trăm, 1 chục và 3 đơn vị',
            'Số gồm 9 trăm, 5 chục và 2 đơn vị',
          ],
          right: ['407', '890', '313', '925', '625'],
          ans: [4, 0, 1, 2, 3],
        },
        {
          type: 'fill',
          prompt: 'Viết số thành tổng các trăm, chục và đơn vị:',
          marker: '1',
          items: [
            { t: '745 = … + … + …', ans: [700, 40, 5] },
            { t: '308 = … + …', ans: [300, 8] },
            { t: '526 = … + … + …', ans: [500, 20, 6] },
            { t: '910 = … + …', ans: [900, 10] },
            { t: '684 = … + … + …', ans: [600, 80, 4] },
            { t: '253 = … + … + …', ans: [200, 50, 3] },
          ],
        },
        {
          type: 'table',
          prompt: 'Tìm số liền trước và số liền sau. Điền vào bảng:',
          head: ['Số liền trước', 'Số đã cho', 'Số liền sau'],
          rows: [
            ['…', 245, '…'],
            ['…', 700, '…'],
            [398, '…', '…'],
            ['…', '…', 1000],
            ['…', 512, '…'],
            [799, '…', '…'],
          ],
          ans: [[244, 246], [699, 701], [399, 400], [998, 999], [511, 513], [800, 801]],
        },
        {
          type: 'fill',
          prompt: 'Điền số còn thiếu để được ba số liên tiếp:',
          items: [
            { t: '157, …, …', ans: [158, 159] },
            { t: '…, 399, …', ans: [398, 400] },
            { t: '…, …, 205', ans: [203, 204] },
            { t: '600, …, …', ans: [601, 602] },
            { t: '…, 721, …', ans: [720, 722] },
            { t: '…, …, 450', ans: [448, 449] },
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
            '781 □ 718',
            '500 □ 499',
            '320 □ 302',
            '888 □ 888',
            '1000 □ 999',
            { t: '730 □ 7 trăm ba mươi', ans: '=' },
            '450 + 10 □ 460',
          ],
        },
        {
          type: 'fill',
          prompt: 'Viết dãy số:',
          items: [
            { t: 'Đếm thêm 1: 214, …, …, …, …, …, …, …, …', ans: [215, 216, 217, 218, 219, 220, 221, 222] },
            { t: 'Đếm bớt 1: 500, …, …, …, …, …, …, …, …', ans: [499, 498, 497, 496, 495, 494, 493, 492] },
            { t: 'Đếm thêm 10: 320, …, …, …, …, …, …, …, …', ans: [330, 340, 350, 360, 370, 380, 390, 400] },
            { t: 'Đếm bớt 10: 900, …, …, …, …, …, …, …, …', ans: [890, 880, 870, 860, 850, 840, 830, 820] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Sắp xếp các số:',
          items: [
            { t: '472, 389, 501, 468. Từ bé đến lớn: …, …, …, …', ans: [389, 468, 472, 501] },
            { t: '472, 389, 501, 468. Từ lớn đến bé: …, …, …, …', ans: [501, 472, 468, 389] },
            { t: '820, 756, 900, 811. Từ bé đến lớn: …, …, …, …', ans: [756, 811, 820, 900] },
            { t: '820, 756, 900, 811. Từ lớn đến bé: …, …, …, …', ans: [900, 820, 811, 756] },
            { t: '234, 432, 123, 321. Từ bé đến lớn: …, …, …, …', ans: [123, 234, 321, 432] },
            { t: '234, 432, 123, 321. Từ lớn đến bé: …, …, …, …', ans: [432, 321, 234, 123] },
            { t: '999, 100, 555, 789. Từ bé đến lớn: …, …, …, …', ans: [100, 555, 789, 999] },
            { t: '999, 100, 555, 789. Từ lớn đến bé: …, …, …, …', ans: [999, 789, 555, 100] },
          ],
        },
        {
          type: 'fill',
          prompt: 'Toán có lời văn:',
          items: [
            { t: '1. Lớp 3A có 345 quyển sách, lớp 3B có 298 quyển sách. Lớp … có nhiều sách hơn và nhiều hơn … quyển.', ans: ['3A', 47], choices: ['3A', '3B'] },
            { t: '2. Trong một hộp có các viên bi mang số: 876, 543, 999, 701. Viên bi mang số lớn nhất là viên số …, viên bi mang số bé nhất là viên số ….', ans: [999, 543] },
            { t: '3. Một cửa hàng bán được 650 chiếc bút trong tháng 5, bán được 698 chiếc trong tháng 6. Tháng … bán được nhiều bút hơn, nhiều hơn … chiếc.', ans: ['6', 48], choices: ['5', '6'] },
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
