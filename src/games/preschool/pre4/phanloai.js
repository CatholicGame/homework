/**
 * 99 đề toán — Chủ đề 5: Phân loại (trang 56–58) và Chủ đề 6: Thống kê (trang 59–61).
 * Hình: scripts/pre4/phanloai.json. Đáp án đối chiếu trang 78–79 của sách
 * (trang 56, 58 không có đáp án: ngủ đông = ếch, rùa, rắn; vừa ở nước vừa ở cạn = rùa, ếch, cá sấu).
 */
import { img, zones } from './assets.js';

const odd = (name, answer, say, done) => ({
  type: 'spot', img: img(name), zones: zones(name), answer: [answer], say, done,
  hint: 'Chưa đúng rồi. Hình này giống các bạn khác đấy. Bé tìm hình không cùng nhóm nhé!',
});

const PHAN_LOAI = [
  {
    id: 'pl-dong-vat', icon: '🐸', color: '#16A34A', title: 'Các con vật', name: 'Con vật nào ngủ đông? Con vật nào sống cả dưới nước và trên cạn?',
    rounds: [
      // Trang 56: ếch (0), rùa (1), rắn (5) ngủ đông.
      {
        type: 'spot', img: img('p56_ngudong'), zones: zones('p56_ngudong'), answer: [0, 1, 5],
        say: 'Mùa đông lạnh, có những con vật phải đi ngủ một giấc thật dài. Bé tìm ba con vật ngủ đông nhé!',
        hint: 'Con vật này không ngủ đông đâu. Bé tìm con ếch, con rùa hay con rắn xem!',
        done: 'Giỏi quá! Ếch, rùa và rắn ngủ đông suốt mùa lạnh đấy!',
      },
      // Trang 58: rùa (1), ếch (2), cá sấu (3) vừa sống dưới nước vừa sống trên cạn.
      {
        type: 'spot', img: img('p58_luongcu'), zones: zones('p58_luongcu'), answer: [1, 2, 3],
        // Vịt bơi dưới nước và đi trên cạn: sách không có đáp án, nên chạm vịt cũng được khen nhưng không bắt buộc.
        extra: [5], extraSay: 'Đúng rồi! Vịt cũng vừa bơi dưới nước vừa đi trên cạn. Bé tìm thêm các bạn khác nhé!',
        say: 'Con vật nào vừa bơi dưới nước, vừa bò lên cạn được? Bé tìm ba con vật nhé!',
        hint: 'Chưa đúng rồi. Bé tìm con vật vừa sống dưới nước vừa sống trên cạn nhé!',
        done: 'Tuyệt vời! Rùa, ếch và cá sấu vừa sống dưới nước vừa sống trên cạn!',
      },
    ],
  },
  {
    id: 'pl-vat-khac', icon: '🧺', color: '#EA580C', title: 'Vật khác biệt', name: 'Tìm vật, tìm hình khác với các bạn còn lại',
    rounds: [
      // Trang 57 (đáp án: áo len, bàn, chổi, xe đạp).
      odd('p57_quanao', 2, 'Trong nhóm quần áo này, cái nào khác các bạn? Bé chạm vào nhé!',
        'Đúng rồi! Áo len để mặc mùa đông, còn các bộ khác mặc mùa hè!'),
      odd('p57_banghe', 0, 'Có ba cái để ngồi và một cái không để ngồi. Bé tìm cái khác biệt nhé!',
        'Đúng rồi! Cái bàn không phải để ngồi, còn ghế sô pha, ghế xếp, ghế dài để ngồi!'),
      odd('p57_dodung', 3, 'Ba đồ vật đựng được nước, còn một đồ vật thì không. Đó là cái nào?',
        'Đúng rồi! Cái chổi để quét nhà, không đựng được nước!'),
      odd('p57_xe', 0, 'Chiếc xe nào khác hai chiếc xe còn lại? Bé chạm vào nhé!',
        'Đúng rồi! Xe đạp phải đạp bằng chân, còn ô tô và xe buýt chạy bằng máy!'),
      // Trang 58, nhóm dưới: hình chữ nhật (3), hình bầu dục (15), hình vuông (23), hình thang (32).
      {
        type: 'spot', img: img('p58_hinh'), zones: zones('p58_hinh'), answer: [3, 15, 23, 32],
        say: 'Có bốn nhóm hình. Trong mỗi nhóm có một hình không giống các bạn. Bé tìm cả bốn hình nhé!',
        hint: 'Hình này giống các bạn trong nhóm rồi. Bé nhìn kỹ số cạnh và hình dáng nhé!',
        done: 'Giỏi quá! Hình chữ nhật, hình bầu dục, hình vuông và hình bốn cạnh là những hình khác biệt!',
      },
    ],
  },
].map(s => ({ ...s, part: 5 }));

const THONG_KE = [
  {
    id: 'tk-dem', icon: '📊', color: '#9333EA', title: 'Đếm và ghi lại', name: 'Đếm mỗi loại có bao nhiêu, rồi ghi số',
    rounds: [
      // Trang 59: mỗi con vật trực nhật 6 lần (đáp án sách).
      {
        type: 'ask', img: img('p59_lich'),
        say: 'Đây là lịch trực nhật của các bạn thú. Bé đếm xem mỗi bạn trực nhật mấy lần nhé!',
        asks: [
          { icon: img('p59_cho'), answer: 6, say: 'Bạn Chó trực nhật mấy lần?' },
          { icon: img('p59_tho'), answer: 6, say: 'Bạn Thỏ trực nhật mấy lần?' },
          { icon: img('p59_meo'), answer: 6, say: 'Bạn Mèo trực nhật mấy lần?' },
          { icon: img('p59_chim'), answer: 6, say: 'Bạn Chim trực nhật mấy lần?' },
          { icon: img('p59_su_tu'), answer: 6, say: 'Bạn Sư Tử trực nhật mấy lần?' },
        ],
        done: 'Giỏi quá! Bạn nào cũng trực nhật sáu lần, thật công bằng!',
      },
      // Trang 60: 6 dưa hấu, 5 cam, 7 chùm nho, 7 quả lê.
      {
        type: 'ask', img: img('p60_hoaqua'),
        say: 'Bé đếm xem mỗi loại quả có bao nhiêu nhé! Chạm vào từng quả để đếm cho dễ.',
        asks: [
          { icon: img('p60_dua'), answer: 6, say: 'Có mấy miếng dưa hấu?' },
          { icon: img('p60_cam'), answer: 5, say: 'Có mấy quả cam?' },
          { icon: img('p60_nho'), answer: 7, say: 'Có mấy chùm nho?' },
          { icon: img('p60_le'), answer: 7, say: 'Có mấy quả lê?' },
        ],
      },
      // Trang 60: 6 xe đỏ, 5 xe vàng, 6 xe đen.
      {
        type: 'ask', img: img('p60_oto'),
        say: 'Có rất nhiều ô tô. Bé đếm xem mỗi màu có mấy chiếc nhé!',
        asks: [
          { icon: img('p60_xedo'), answer: 6, say: 'Có mấy chiếc xe màu đỏ?' },
          { icon: img('p60_xevang'), answer: 5, say: 'Có mấy chiếc xe màu vàng?' },
          { icon: img('p60_xeden'), answer: 6, say: 'Có mấy chiếc xe màu đen?' },
        ],
      },
      // Trang 61: 5 ngựa gỗ (thêm chong chóng 5, vỏ sò 6 cho bé đếm).
      {
        type: 'ask', img: img('p61_dochoi'),
        say: 'Trong tranh có mấy con ngựa gỗ? Bé đếm thật kỹ nhé!',
        asks: [
          { icon: img('p61_ngua'), answer: 5, say: 'Có mấy con ngựa gỗ?' },
          { icon: img('p61_chongchong'), answer: 5, say: 'Còn chong chóng thì có mấy cái?' },
          { icon: img('p61_vo_so'), answer: 6, say: 'Có mấy cái vỏ sò?' },
        ],
      },
      // Trang 61: 4 hoa bốn cánh, 5 hoa chữ thập, 4 hoa lá phong, 7 hoa tròn.
      {
        type: 'ask', img: img('p61_hoa'),
        say: 'Bé đếm xem mỗi loại hoa có mấy bông nhé!',
        asks: [
          { icon: img('p61_hoa4canh'), answer: 4, say: 'Hoa màu hồng bốn cánh có mấy bông?' },
          { icon: img('p61_hoachuthap'), answer: 5, say: 'Hoa màu vàng có mấy bông?' },
          { icon: img('p61_hoala'), answer: 4, say: 'Hoa màu cam có mấy bông?' },
          { icon: img('p61_hoatron'), answer: 7, say: 'Hoa tròn màu hồng có mấy bông?' },
        ],
      },
    ],
  },
].map(s => ({ ...s, part: 6 }));

export const STATIONS = [...PHAN_LOAI, ...THONG_KE];
