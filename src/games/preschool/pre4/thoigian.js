/**
 * 99 đề toán — Chủ đề 9: Nhận biết thời gian (trang 72–73) và Chủ đề 10: Tiền (trang 74–76).
 * Hình: scripts/pre4/thoigian.json. Đáp án đối chiếu trang 79 của sách.
 */
import { img } from './assets.js';

const NGHIN = 'nghìn đồng';

// Trang 76: bảng giá — dao rọc giấy 3, bút chì 1, quyển sổ 5, quyển sách 12, cặp 35 (nghìn đồng).
const meo = (n, say, rows, total) => ({
  type: 'ask', img: img('p76_gia'), say,
  asks: [
    ...rows.map(([label, answer, ask]) => ({ label, answer, unit: NGHIN, say: ask })),
    { icon: img(`p76_meo${n}`), label: 'Tất cả', answer: total, unit: NGHIN, say: 'Cộng lại, bạn mèo mua hết tất cả bao nhiêu nghìn đồng?' },
  ],
  done: `Giỏi quá! Bạn mèo mua hết ${total} nghìn đồng.`,
});

export const STATIONS = [
  {
    id: 'tg-dong-ho', icon: '⏰', color: '#EAB308', part: 9, title: 'Xem đồng hồ', name: 'Đồng hồ chỉ mấy giờ?',
    rounds: [
      // Trang 72: nối đồng hồ với giờ. Kim ngắn chỉ giờ, kim dài chỉ phút.
      {
        type: 'link', layout: 'tb',
        from: [1, 2, 3, 4].map(k => ({ img: img(`p72_dh${k}`) })),
        to: ['9:30', '10:00', '5:10', '2:15'],
        pairs: [[0, 2], [1, 0], [2, 3], [3, 1]],
        say: 'Mỗi đồng hồ chỉ mấy giờ? Kim ngắn chỉ giờ, kim dài chỉ phút. Bé chạm đồng hồ rồi chạm giờ đúng để nối nhé!',
        hint: 'Chưa khớp rồi. Bé nhìn kim ngắn xem chỉ số mấy nhé!',
      },
      // Trang 72: hai đồng hồ báo thức chênh nhau 35 phút (9 giờ 45 và 9 giờ 10).
      {
        type: 'choice', answer: [1, 3],
        options: [1, 2, 3, 4].map(k => ({ img: img(`p72_bt${k}`) })),
        say: 'Hai chiếc đồng hồ nào chỉ giờ cách nhau ba mươi lăm phút? Bé chạm vào cả hai chiếc nhé!',
        hint: 'Chưa đúng rồi. Bé tìm hai đồng hồ có kim ngắn gần nhau nhé!',
        done: 'Giỏi quá! Chín giờ mười và chín giờ bốn mươi lăm cách nhau ba mươi lăm phút.',
      },
      // Trang 73: từ 2:15 đến 4:00.
      {
        type: 'ask', img: img('p73_a'),
        asks: [{ answer: 1, unit: 'tiếng' }, { answer: 45, unit: 'phút' }],
        say: 'Từ hai giờ mười lăm phút đến bốn giờ là bao lâu? Bé điền số tiếng, rồi số phút nhé!',
        hint: 'Chưa đúng rồi. Từ hai giờ mười lăm đến ba giờ mười lăm là một tiếng đấy!',
        done: 'Giỏi quá! Đã trôi qua một tiếng bốn mươi lăm phút.',
      },
      // Trang 73: từ 10:25 đến 12:15.
      {
        type: 'ask', img: img('p73_b'),
        asks: [{ answer: 1, unit: 'tiếng' }, { answer: 50, unit: 'phút' }],
        say: 'Từ mười giờ hai mươi lăm phút đến mười hai giờ mười lăm phút là bao lâu? Bé điền số tiếng, rồi số phút nhé!',
        hint: 'Chưa đúng rồi. Từ mười giờ hai mươi lăm đến mười một giờ hai mươi lăm là một tiếng đấy!',
        done: 'Giỏi quá! Đã trôi qua một tiếng năm mươi phút.',
      },
      // Trang 73: 8 giờ xuất phát, đi xe buýt nửa tiếng, đi bộ 10 phút.
      {
        type: 'choice', img: img('p73_duong'), answer: 2,
        options: ['8:20', '8:50', '8:40', '8:30'],
        say: 'Tám giờ, Lan và mẹ đi xe buýt nửa tiếng, rồi đi bộ mười phút. Hai mẹ con đến nhà bà ngoại lúc mấy giờ?',
        hint: 'Chưa đúng rồi. Nửa tiếng là ba mươi phút, thêm mười phút nữa nhé!',
      },
    ],
  },
  {
    id: 'tien-mua-do', icon: '🛍️', color: '#16A34A', part: 10, title: 'Đi mua đồ', name: 'Mua đồ xong còn lại bao nhiêu tiền?',
    rounds: [
      // Trang 74: mỗi bạn có một số tiền, mua hết các món trong khung.
      {
        type: 'ask', img: img('p74_ban1'), asks: [{ label: 'Còn lại', answer: 2, unit: NGHIN }],
        say: 'Bạn có mười nghìn đồng, mua cốc nước năm nghìn và bánh mì ba nghìn. Bạn còn lại bao nhiêu tiền?',
        hint: 'Chưa đúng rồi. Mười bớt năm, rồi bớt tiếp ba nhé!',
      },
      {
        type: 'ask', img: img('p74_ban2'), asks: [{ label: 'Còn lại', answer: 4, unit: NGHIN }],
        say: 'Bạn có hai mươi nghìn đồng, mua hộp bút màu mười nghìn và chong chóng sáu nghìn. Bạn còn lại bao nhiêu tiền?',
        hint: 'Chưa đúng rồi. Hai mươi bớt mười, rồi bớt tiếp sáu nhé!',
      },
      {
        type: 'ask', img: img('p74_ban3'), asks: [{ label: 'Còn lại', answer: 3, unit: NGHIN }],
        say: 'Bạn có năm mươi nghìn đồng, mua máy bay ba mươi hai nghìn và thuyền mười lăm nghìn. Bạn còn lại bao nhiêu tiền?',
        hint: 'Chưa đúng rồi. Năm mươi bớt ba mươi hai còn mười tám, rồi bớt tiếp mười lăm nhé!',
      },
      {
        type: 'ask', img: img('p74_ban4'), asks: [{ label: 'Còn lại', answer: 9, unit: NGHIN }],
        say: 'Bạn có một trăm nghìn đồng, mua đôi giày trượt chín mươi mốt nghìn. Bạn còn lại bao nhiêu tiền?',
        hint: 'Chưa đúng rồi. Chín mươi mốt thêm mấy nữa thì được một trăm?',
      },
      // Trang 75: Gấu có 30 nghìn đồng. Nhóm 4 (bút màu 16 + bánh 6 + sổ 8) vừa đủ 30 nghìn.
      {
        type: 'eq', img: img('p75_cuahang'), lines: [[16, '+', 6, '+', 8, '=', 30]], show: [1, 3],
        say: 'Gấu mua hộp bút màu, bánh kem và quyển sổ. Bé tìm giá từng món trong hình, rồi cộng lại xem hết bao nhiêu tiền nhé!',
        hint: 'Chưa đúng rồi. Bé xem sợi dây nối từng món với thẻ giá nhé!',
        done: 'Giỏi quá! Mười sáu cộng sáu cộng tám bằng ba mươi nghìn đồng.',
      },
      {
        type: 'choice', img: img('p75_cuahang'), answer: 3, cols: 2,
        options: [1, 2, 3, 4].map(k => ({ img: img(`p75_n${k}`) })),
        say: 'Gấu có ba mươi nghìn đồng. Nhóm đồ nào Gấu mua vừa hết đúng ba mươi nghìn đồng?',
        hint: 'Chưa đúng rồi. Bé cộng giá ba món trong nhóm xem có bằng ba mươi không nhé!',
        done: 'Giỏi quá! Bút màu, bánh kem và quyển sổ vừa đúng ba mươi nghìn đồng.',
      },
    ],
  },
  {
    id: 'tien-meo-con', icon: '🐱', color: '#0EA5E9', part: 10, title: 'Mèo con đi học', name: 'Ba chú mèo mua đồ hết bao nhiêu tiền?',
    rounds: [
      meo(1, 'Mèo vàng muốn mua hai cây bút chì, một con dao rọc giấy và hai quyển sổ. Bé xem bảng giá rồi tính giúp mèo nhé!', [
        ['2 bút chì', 2, 'Một bút chì giá một nghìn. Hai bút chì hết mấy nghìn đồng?'],
        ['1 dao rọc giấy', 3, 'Con dao rọc giấy giá mấy nghìn đồng?'],
        ['2 quyển sổ', 10, 'Một quyển sổ giá năm nghìn. Hai quyển sổ hết mấy nghìn đồng?'],
      ], 15),
      meo(2, 'Mèo trắng muốn mua một quyển sách, một chiếc cặp và một quyển sổ. Bé xem bảng giá rồi tính giúp mèo nhé!', [
        ['1 quyển sách', 12, 'Quyển sách giá mấy nghìn đồng?'],
        ['1 chiếc cặp', 35, 'Chiếc cặp giá mấy nghìn đồng?'],
        ['1 quyển sổ', 5, 'Quyển sổ giá mấy nghìn đồng?'],
      ], 52),
      meo(3, 'Mèo xám muốn mua một con dao rọc giấy, ba cây bút chì, một quyển sổ và một quyển sách. Bé xem bảng giá rồi tính giúp mèo nhé!', [
        ['1 dao rọc giấy', 3, 'Con dao rọc giấy giá mấy nghìn đồng?'],
        ['3 bút chì', 3, 'Một bút chì giá một nghìn. Ba bút chì hết mấy nghìn đồng?'],
        ['1 quyển sổ', 5, 'Quyển sổ giá mấy nghìn đồng?'],
        ['1 quyển sách', 12, 'Quyển sách giá mấy nghìn đồng?'],
      ], 23),
    ],
  },
];
