/** Điểm kiến thức Toán 4 Tập Hai, Bài 38, 39, 41, 43, 44 (cùng dạng KNOWLEDGE4 trong ../knowledge.js). Bài 45 là Thực hành và trải nghiệm: không có mục. */
export const K_TAP2CALC = {
  38: {
    title: 'Nhân với số có một chữ số',
    points: [
      'Đặt tính thẳng cột, nhân lần lượt từ hàng đơn vị sang trái: 160 140 × 7 = 1 120 980.',
      'Mỗi lần nhân được số có hai chữ số thì viết chữ số hàng đơn vị, <b>nhớ</b> chữ số hàng chục sang hàng bên trái.',
      'Ở hàng bên trái: nhân xong phải <b>thêm số nhớ</b> (7 nhân 1 bằng 7, thêm 4 bằng 11).',
      'Tính giá trị biểu thức có phép nhân và phép cộng, trừ: làm phép nhân trước.',
    ],
  },
  39: {
    title: 'Chia cho số có một chữ số',
    points: [
      'Đặt tính, chia từ trái sang phải; mỗi lượt: chia, nhân, trừ rồi hạ chữ số tiếp theo.',
      'Có thể nhẩm tích rồi trừ luôn, chỉ viết số dư: 125 730 : 5 = 25 146.',
      'Hạ chữ số mà vẫn bé hơn số chia thì viết <b>0</b> vào thương rồi hạ tiếp.',
      'Phép chia có dư: <b>số dư bé hơn số chia</b>, vd. 125 734 : 5 = 25 146 (dư 4).',
    ],
  },
  41: {
    title: 'Nhân, chia với 10, 100, 1 000,…',
    points: [
      'Nhân một số tự nhiên với 10, 100, 1 000,… ta <b>viết thêm</b> một, hai, ba,… chữ số 0 vào bên phải số đó: 36 × 100 = 3 600.',
      'Chia số tròn chục, tròn trăm, tròn nghìn,… cho 10, 100, 1 000,… ta <b>bỏ bớt</b> một, hai, ba,… chữ số 0 ở bên phải số đó: 36 000 : 1 000 = 36.',
      'Từ 36 × 10 = 360 ta có 360 : 10 = 36 (nhân và chia là hai phép tính ngược nhau).',
      'Dùng để đổi đơn vị đo (500 kg = 5 tạ) và tính thuận tiện (2 136 × 5 × 2 = 2 136 × 10).',
    ],
  },
  43: {
    title: 'Nhân với số có hai chữ số',
    points: [
      '34 × 12 = 34 × (10 + 2) = 34 × 10 + 34 × 2 = 340 + 68 = 408.',
      'Đặt tính: nhân với chữ số hàng đơn vị được <b>tích riêng thứ nhất</b>, nhân với chữ số hàng chục được <b>tích riêng thứ hai</b>.',
      'Tích riêng thứ hai viết <b>lùi sang trái một cột</b> (34 chục = 340), rồi cộng hai tích riêng.',
      'Nhân với số tròn chục: 24 × 30 = (24 × 3) × 10 = 720.',
    ],
  },
  44: {
    title: 'Chia cho số có hai chữ số',
    points: [
      'Đặt tính, chia từ trái sang phải; lấy đủ chữ số để chia được (21 : 12, 229 : 62).',
      '<b>Ước lượng thương</b>: bỏ chữ số cuối của số đem chia và số chia rồi nhẩm (96 : 12 → 9 : 1 = 9), nhân thử, lớn quá thì giảm dần.',
      'Phép chia có dư: số dư bé hơn số chia, vd. 218 : 18 = 12 (dư 2).',
      'Hai số tận cùng là chữ số 0: cùng xoá một, hai,… chữ số 0 rồi chia (450 : 90 = 45 : 9 = 5).',
    ],
  },
};
