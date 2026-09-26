/**
 * 99 đề toán — Chủ đề 1 (tiếp): Phép cộng, trừ trong phạm vi 20 (trang 18–31).
 * Hình: scripts/pre4/congtru2.json. Đáp án đối chiếu trang 77–78 của sách.
 */
import { img } from './assets.js';

const t = (text) => ({ text, say: text });

export const STATIONS = [
  {
    id: 'ct2-bot-lien-tiep', icon: '🍬', color: '#DB2777', title: 'Bớt đi hai lần', name: 'Bớt rồi lại bớt, còn lại bao nhiêu?',
    rounds: [
      // Trang 18: 16 cái kẹo, bớt 5 rồi bớt 3.
      {
        type: 'eq', img: img('p18_keo'), lines: [[16, '-', 5, '-', 3, '=', 8]], show: [0, 1, 2, 3, 4],
        say: 'Có mười sáu cái kẹo. Bớt đi năm cái, rồi bớt thêm ba cái nữa. Còn lại mấy cái kẹo? Bé chạm để đếm nhé!',
        hint: 'Chưa đúng rồi. Bé chạm gạch bớt năm cái, rồi ba cái, đếm số kẹo còn lại nhé!',
      },
      // Trang 18: 13 bắp ngô, bớt 7 rồi bớt 2.
      {
        type: 'eq', img: img('p18_ngo'), lines: [[13, '-', 7, '-', 2, '=', 4]], show: [0, 1, 2, 3, 4],
        say: 'Có mười ba bắp ngô. Bớt đi bảy bắp, rồi bớt thêm hai bắp. Còn lại mấy bắp ngô?',
      },
      // Trang 19: Mèo con tính đúng mới được ăn cá.
      {
        type: 'calc', theme: '🐟', img: img('p19_meo'), items: ['11-4-3=?', '15-9-2=?', '19-8-3=?', '13-5-7=?', '14-6-1=?', '12-1-8=?'],
        say: 'Mèo con phải tính đúng mới được ăn cá. Bé giúp Mèo tính nhé!',
        done: 'Giỏi quá! Mèo con được ăn cá rồi!',
      },
      {
        type: 'calc', theme: '🐟', img: img('p19_meo'), items: ['11-3-8=?', '14-6-2=?', '17-5-3=?', '12-7-3=?', '15-5-4=?', '19-6-7=?'],
        say: 'Còn sáu con cá nữa. Bé tính tiếp giúp Mèo con nhé!',
        done: 'Tuyệt vời! Mèo con ăn no cá rồi, cảm ơn bé!',
      },
    ],
  },
  {
    id: 'ct2-hai-qua', icon: '🍓', color: '#E11D48', title: 'Hái quả, chia quả', name: 'Đếm quả rồi viết phép tính',
    rounds: [
      // Trang 20: cây táo có 18 quả; thỏ trắng hái 7, thỏ xám hái thêm 5.
      {
        type: 'ask', img: img('p20_cay'), asks: [{ label: 'Trên cây có', answer: 18, unit: 'quả' }],
        say: 'Quả trên cây đã chín rồi! Bé chạm vào từng quả để đếm xem trên cây có bao nhiêu quả nhé!',
      },
      {
        type: 'eq', img: img('p20_tho1'), lines: [[18, '-', 7, '=', 11]],
        say: 'Thỏ trắng nói: tớ hái được bảy quả rồi. Trên cây mười tám quả, hỏi còn bao nhiêu quả? Bé viết phép tính nhé!',
      },
      {
        type: 'eq', img: img('p20_tho2'), lines: [[11, '-', 5, '=', 6]],
        say: 'Thỏ xám hái thêm năm quả nữa. Trên cây đang còn mười một quả, bây giờ còn lại mấy quả?',
      },
      // Trang 21: khay có 19 quả dâu tây; Minh lấy 6, Cường lấy 8.
      {
        type: 'ask', img: img('p21_dau'), asks: [{ label: 'Trong khay có', answer: 19, unit: 'quả' }],
        say: 'Trong khay có bao nhiêu quả dâu tây? Bé chạm để đếm nhé!',
      },
      {
        type: 'eq', img: img('p21_minh'), lines: [[19, '-', 6, '=', 13]],
        say: 'Minh lấy sáu quả dâu tây, còn lại cho Cường. Hỏi Cường lấy được mấy quả?',
      },
      {
        type: 'eq', img: img('p21_cuong'), lines: [[19, '-', 6, '-', 8, '=', 5]],
        say: 'Minh lấy sáu quả, Cường lấy tám quả. Hỏi trong khay còn lại mấy quả dâu tây?',
      },
    ],
  },
  {
    id: 'ct2-doc-de', icon: '🐤', color: '#F59E0B', title: 'Đọc đề, tìm đáp án', name: 'Quan sát hình và phép tính',
    rounds: [
      // Trang 22: nhóm 3 khoanh và gạch không khớp với phép tính 14 − 3 − 7.
      {
        type: 'choice', answer: 2, cols: 2,
        options: [1, 2, 3, 4].map(k => ({ img: img(`p22_n${k}`) })),
        say: 'Trong bốn nhóm này, có một nhóm hình vẽ không khớp với phép tính. Bé đếm số hình gạch đi và số hình khoanh lại, rồi chạm vào nhóm sai nhé!',
        hint: 'Nhóm này hình vẽ khớp với phép tính rồi. Bé kiểm tra nhóm khác nhé!',
        done: 'Giỏi quá! Nhóm ngôi sao vẽ chưa đúng với phép tính!',
      },
      // Trang 23: 8 + 7 − 3 = 12.
      {
        type: 'eq', img: img('p23_sau'), lines: [[8, '+', 7, '-', 3, '=', 12]],
        say: 'Gà con bắt được tám con sâu dưới gốc cây, bảy con sâu trên bãi cỏ, rồi ăn mất ba con. Hỏi gà con còn lại mấy con sâu?',
      },
      // Trang 24: 12 − 3 + 5 = 14.
      {
        type: 'eq', img: img('p24_ong'), lines: [[12, '-', 3, '+', 5, '=', 14]],
        say: 'Trong vườn hoa có mười hai con ong. Ba con bay đi, sau đó năm con bay về. Hỏi trong vườn bây giờ có bao nhiêu con ong?',
      },
      // Trang 25: 15 − 7 + 9 − 7 = 10.
      {
        type: 'choice', img: img('p25_xebus'), answer: 1,
        options: [t('9 người'), t('10 người'), t('11 người'), t('12 người')],
        say: 'Trên xe buýt có mười lăm người. Đến bến, bảy người xuống, chín người lên. Đến bến sau, bảy người xuống nữa. Hỏi trên xe còn bao nhiêu người?',
        hint: 'Chưa đúng rồi. Bé tính từng bến một nhé: mười lăm trừ bảy, cộng chín, trừ bảy.',
      },
    ],
  },
  {
    id: 'ct2-lien-hoan', icon: '🍄', color: '#7C3AED', title: 'Tính liên hoàn', name: 'Tính tiếp nối từng bước',
    rounds: [
      // Trang 24: chim về nhà — 11 + 7 − 3 = 15, 15 − 3 + 6 = 18, 10 + 8 − 9 = 9, 14 − 4 + 2 = 12, 11 − 8 + 7 = 10.
      {
        type: 'link', layout: 'tb',
        from: [
          ['p24_chim1', 'mười một cộng bảy trừ ba'], ['p24_chim2', 'mười lăm trừ ba cộng sáu'], ['p24_chim3', 'mười cộng tám trừ chín'],
          ['p24_chim4', 'mười bốn trừ bốn cộng hai'], ['p24_chim5', 'mười một trừ tám cộng bảy'],
        ].map(([name, say]) => ({ img: img(name), say })),
        to: [9, 10, 12, 15, 18].map(n => ({ img: img(`p24_nha${n}`), say: `Ngôi nhà số ${n}` })),
        pairs: [[0, 3], [1, 4], [2, 0], [3, 2], [4, 1]],
        say: 'Chim nhỏ muốn về nhà! Bé tính phép tính của mỗi chú chim, rồi nối chim với ngôi nhà có kết quả đúng nhé!',
        hint: 'Ngôi nhà này chưa đúng kết quả. Bé tính lại nhé!',
      },
      // Trang 26: ba chuỗi phép tính liên hoàn.
      {
        type: 'seq', cells: [10, 12, 13, 8, 17, 13, 19], hide: [1, 2, 3, 4, 5], links: ['+2', '+1', '-5', '+9', '-4', '+6'],
        say: 'Bắt đầu từ số mười. Bé làm theo từng mũi tên, rồi điền số vào cây nấm tiếp theo nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn số trước và phép tính trên mũi tên nhé!',
      },
      {
        type: 'seq', cells: [14, 9, 17, 10, 14, 12, 20], hide: [1, 2, 3, 4, 5], links: ['-5', '+8', '-7', '+4', '-2', '+8'],
        say: 'Bắt đầu từ số mười bốn. Bé tính theo mũi tên, điền số vào từng quả táo nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn số trước và phép tính trên mũi tên nhé!',
      },
      {
        type: 'seq', cells: [8, 12, 19, 11, 14, 7, 17], hide: [1, 2, 3, 4, 5], links: ['+4', '+7', '-8', '+3', '-7', '+10'],
        say: 'Bắt đầu từ số tám. Bé tính theo mũi tên, điền số vào từng bông hoa nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn số trước và phép tính trên mũi tên nhé!',
      },
      // Trang 27: Cừu con về nhà ăn cỏ.
      {
        type: 'calc', theme: '🏠', img: img('p27_cuu'), items: ['11+7-3=?', '10+5-7=?', '15-8+6=?', '12+5-4=?', '16-9+4=?', '13+6-9=?'],
        say: 'Cừu con phải tính đúng phép tính trên mỗi ngôi nhà mới được vào nhà ăn cỏ. Bé giúp Cừu con nhé!',
        done: 'Giỏi quá! Cừu con được vào nhà ăn cỏ rồi!',
      },
    ],
  },
  {
    id: 'ct2-bang-chuot', icon: '🐭', color: '#EC4899', title: 'Bảng tính của Chuột', name: 'Tính theo cột, điền hàng cuối',
    rounds: [
      // Trang 28, bảng hồng: cột 7 + 9 − 3, 10 + 5 − 8, 2 + 14 − 11, 15 − 8 + 4; hàng cuối 13 − 7 + 5 = 11.
      {
        type: 'calc', theme: '🐭', img: img('p28_bang1'), items: ['7+9-3=?', '10+5-8=?', '2+14-11=?', '15-8+4=?'],
        say: 'Bé tính từng cột của bảng hồng, từ trên xuống dưới nhé!',
      },
      {
        type: 'eq', img: img('p28_bang1'), lines: [[13, '-', 7, '+', 5, '=', 11]], show: [1, 3],
        say: 'Bây giờ bé điền kết quả các cột vào hàng dưới cùng, rồi tính hàng đó nhé!',
        hint: 'Chưa đúng rồi. Bé xem lại kết quả của từng cột nhé!',
      },
      // Trang 28, bảng cam: cột 12 + 7 − 4, 6 + 9 − 8, 10 + 4 − 9, 16 − 7 + 4; hàng cuối 15 − 7 + 5 = 13.
      {
        type: 'calc', theme: '⭐', img: img('p28_bang2'), items: ['12+7-4=?', '6+9-8=?', '10+4-9=?', '16-7+4=?'],
        say: 'Đến bảng màu cam! Bé tính từng cột từ trên xuống dưới nhé!',
      },
      {
        type: 'eq', img: img('p28_bang2'), lines: [[15, '-', 7, '+', 5, '=', 13]], show: [1, 3],
        say: 'Bé điền kết quả các cột vào hàng dưới cùng, rồi tính hàng đó nhé!',
        hint: 'Chưa đúng rồi. Bé xem lại kết quả của từng cột nhé!',
      },
    ],
  },
  {
    id: 'ct2-doan-so', icon: '🦀', color: '#0891B2', title: 'Đoán số bí mật', name: 'Mỗi hình là một số',
    rounds: [
      // Trang 29: cà rốt 10, cải 7, củ cải 12, cà tím 3 — đáp án 3.
      {
        type: 'ask', img: img('p29_phep'),
        asks: [
          { icon: img('p29_carot'), label: '=', answer: 10, say: 'Hai củ cà rốt bằng hai mươi. Vậy một củ cà rốt là mấy?' },
          { icon: img('p29_cai'), label: '=', answer: 7, say: 'Cà rốt cộng cây cải bằng mười bảy. Cây cải là mấy?' },
          { icon: img('p29_cu'), label: '=', answer: 12, say: 'Củ cải đỏ cộng cây cải bằng mười chín. Củ cải đỏ là mấy?' },
          { icon: img('p29_ca'), label: '=', answer: 3, say: 'Cà tím cộng củ cải đỏ bằng mười lăm. Cà tím là mấy?' },
        ],
        say: 'Mỗi loại rau củ là một số bí mật. Hai củ cà rốt bằng hai mươi. Vậy một củ cà rốt là mấy?',
      },
      {
        type: 'choice', answer: 2, cols: 2,
        options: [1, 2, 3, 4].map(k => ({ img: img(`p29_d${k}`) })),
        say: 'Cà rốt mười, củ cải đỏ mười hai, cây cải bảy, cà tím ba. Bảng nào đúng? Bé chạm vào bảng đó nhé!',
        hint: 'Bảng này có số chưa đúng. Bé so từng rau củ nhé!',
      },
      // Trang 30: 1 khỉ = 3 chó = 6 gà = 18 chim.
      {
        type: 'ask', img: img('p30_bang'),
        asks: [
          { icon: img('p30_khi'), label: '=', answer: 6, unit: 'con gà', say: 'Một con khỉ bằng ba con chó, một con chó bằng hai con gà. Vậy một con khỉ bằng mấy con gà?' },
          { icon: img('p30_khi'), label: '=', answer: 18, unit: 'con chim', say: 'Một con gà bằng ba con chim. Vậy một con khỉ bằng mấy con chim?' },
        ],
        say: 'Một con khỉ bằng ba con chó, một con chó bằng hai con gà. Vậy một con khỉ bằng mấy con gà?',
        hint: 'Chưa đúng rồi. Bé đổi từng con một nhé: mỗi con chó là hai con gà.',
      },
      // Trang 31: cá ngựa 3, bạch tuộc 4, cá nóc 6, cua 2 — đáp án 4.
      {
        type: 'ask', img: img('p31_phep'),
        asks: [
          { icon: img('p31_cangua'), label: '=', answer: 3, say: 'Cá ngựa bằng ba. Bé điền số ba nhé!' },
          { icon: img('p31_bachtuoc'), label: '=', answer: 4, say: 'Bạch tuộc cộng cá ngựa bằng bảy. Bạch tuộc là mấy?' },
          { icon: img('p31_nocca'), label: '=', answer: 6, say: 'Cá ngựa cộng cá nóc bằng chín. Cá nóc là mấy?' },
          { icon: img('p31_cua'), label: '=', answer: 2, say: 'Con cua cộng cá nóc bằng tám. Con cua là mấy?' },
        ],
        say: 'Mỗi con vật dưới biển là một số. Cá ngựa bằng ba. Bé điền số ba nhé!',
      },
      {
        type: 'choice', answer: 3, cols: 4,
        options: [1, 2, 3, 4].map(k => ({ img: img(`p31_d${k}`) })),
        say: 'Cua hai, cá nóc sáu, bạch tuộc bốn. Nhóm nào đúng? Bé chạm vào nhóm đó nhé!',
        hint: 'Nhóm này có số chưa đúng. Bé so từng con vật nhé!',
        done: 'Giỏi quá! Hai cộng bốn cộng sáu cộng ba bằng mười lăm, đúng rồi!',
      },
    ],
  },
].map(s => ({ ...s, part: 1 }));
