/**
 * Kiến thức Toán 5 Tập Hai, chủ đề 10, Bài 56–60 (cùng dạng TEACH trong ../knowledge.js).
 * Bài 56 và đầu Bài 57 đối chiếu sách mẫu (tr. 64–67); phần còn lại chưa đối chiếu sách (soạn theo chương trình).
 */

const pg = (p) => `SGK Toán 5 Tập Hai, trang ${p}`;

export const K5_TIME = {
  56: {
    title: 'Các đơn vị đo thời gian', page: pg(64),
    points: [
      '1 thế kỉ = 100 năm; 1 năm = 12 tháng = 365 ngày; <b>năm nhuận</b> có 366 ngày, cứ <b>4 năm</b> có một năm nhuận. 1 tuần lễ = 7 ngày; 1 ngày = 24 giờ; <b>1 giờ = 60 phút; 1 phút = 60 giây</b>.',
      'Tháng Một, Ba, Năm, Bảy, Tám, Mười, Mười hai có <b>31 ngày</b>; tháng Tư, Sáu, Chín, Mười một có <b>30 ngày</b>; tháng Hai có 28 ngày (năm nhuận 29 ngày).',
      'Năm 1 đến năm 100 là thế kỉ I; năm 1901 đến năm 2000 là thế kỉ XX; năm 2001 đến năm 2100 là thế kỉ XXI. Vd. năm 1010 thuộc thế kỉ XI, năm 1954 thuộc thế kỉ XX.',
      'Đổi phút ra giờ (số thập phân): <b>72 phút = 72/60 giờ = 1,2 giờ</b>; 90 phút = 1,5 giờ; 42 giây = 0,7 phút.',
      'Cẩn thận: thời gian đổi theo 60, không theo 10. <b>0,1 giờ = 6 phút</b>, nên 1,5 giờ = 1 giờ 30 phút (không phải 1 giờ 50 phút); 1,4 giờ = 1 giờ 24 phút.',
    ],
  },
  57: {
    title: 'Cộng, trừ số đo thời gian', page: pg(67),
    points: [
      'Đặt tính: <b>giờ thẳng cột giờ, phút thẳng cột phút</b>, cộng (trừ) từng loại đơn vị. Vd. 19 giờ 15 phút + 1 giờ 30 phút = 20 giờ 45 phút.',
      'Khi cộng, số phút (giây) <b>từ 60 trở lên</b> thì đổi sang đơn vị lớn hơn: 5 giờ 80 phút = 6 giờ 20 phút.',
      'Khi trừ, số phút ở số bị trừ bé hơn thì <b>mượn 1 giờ = 60 phút</b>: 4 giờ 20 phút − 2 giờ 45 phút = 3 giờ 80 phút − 2 giờ 45 phút = 1 giờ 35 phút.',
      'Giờ kết thúc = giờ bắt đầu + thời gian; thời gian = giờ kết thúc − giờ bắt đầu. Đồng hồ chậm thì cộng thêm, đồng hồ nhanh thì trừ bớt để được giờ đúng.',
    ],
  },
  58: {
    title: 'Nhân, chia số đo thời gian với một số', page: pg(71),
    points: [
      'Nhân: nhân từng số đo theo từng đơn vị với số đó; phút, giây <b>từ 60 trở lên</b> thì đổi: 3 giờ 15 phút × 5 = 15 giờ 75 phút = 16 giờ 15 phút.',
      'Chia: chia từng đơn vị, <b>bắt đầu từ đơn vị lớn</b>: 42 phút 30 giây : 3 = 14 phút 10 giây.',
      'Còn dư thì <b>đổi số dư sang đơn vị bé hơn</b>, cộng vào rồi chia tiếp: 7 giờ 40 phút : 4 → 7 giờ : 4 = 1 giờ dư 3 giờ = 180 phút; 180 + 40 = 220 phút; 220 : 4 = 55 phút. Kết quả 1 giờ 55 phút.',
      'Cẩn thận: không bỏ số dư, không chia như số thập phân (7,40 : 4).',
    ],
  },
  59: {
    title: 'Vận tốc của một chuyển động đều', page: pg(76),
    points: [
      'Ô tô đi 170 km hết 4 giờ: mỗi giờ đi 170 : 4 = 42,5 km. Ta nói <b>vận tốc</b> của ô tô là 42,5 km/giờ.',
      'Muốn tính vận tốc, ta lấy quãng đường chia cho thời gian: <b>v = s : t</b>.',
      'Đơn vị vận tốc ghép từ đơn vị quãng đường và thời gian: <b>km/giờ, m/phút, m/giây</b>. Chạy 60 m hết 10 giây: v = 6 m/giây.',
      'Thời gian cho bằng giờ phút thì đổi ra giờ trước: 1 giờ 30 phút = 1,5 giờ (không phải 1,3 giờ). Vận tốc thật: đi bộ khoảng 5 km/giờ, xe đạp khoảng 15 km/giờ, ô tô khoảng 40 đến 60 km/giờ.',
    ],
  },
  60: {
    title: 'Quãng đường, thời gian của một chuyển động đều', page: pg(78),
    points: [
      'Muốn tính quãng đường, ta lấy vận tốc nhân với thời gian: <b>s = v × t</b>. Vd. 12 km/giờ đi 2,5 giờ: s = 12 × 2,5 = 30 km.',
      'Muốn tính thời gian, ta lấy quãng đường chia cho vận tốc: <b>t = s : v</b>. Vd. 45 km với 30 km/giờ: t = 45 : 30 = 1,5 giờ = 1 giờ 30 phút.',
      '<b>Đơn vị phải khớp</b>: vận tốc km/giờ thì thời gian tính bằng giờ. 12 km/giờ đi 30 phút: 30 phút = 0,5 giờ, s = 6 km (không phải 360 km).',
      'Giờ đến = giờ xuất phát + thời gian đi. Kết quả t = 1,25 giờ là 1 giờ 15 phút (không phải 1 giờ 25 phút).',
    ],
  },
};
