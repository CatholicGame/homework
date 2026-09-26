/**
 * 99 đề toán — Chủ đề 1: Phép cộng, trừ trong phạm vi 20 (trang 5–17).
 * Hình: scripts/pre4/congtru1.json. Đáp án đối chiếu trang 77 của sách.
 */
import { img } from './assets.js';

// Trang 9: bảng tính của bốn con vật (thỏ, hổ, chó, mèo). Bảng của hổ đúng hết.
const TABLES = ['p09_tho', 'p09_ho', 'p09_cho', 'p09_meo'];
// Trang 10: số đồ ăn đang có, cần đủ 20.
const FEED = [
  ['p10_tho', 12, 'Bạn Thỏ có mấy củ cà rốt? Cần cho thêm mấy củ nữa để đủ hai mươi củ?'],
  ['p10_meo', 13, 'Bạn Mèo có mấy con cá? Cần cho thêm mấy con nữa để đủ hai mươi con?'],
  ['p10_cho', 15, 'Bạn Cún có mấy khúc xương? Cần cho thêm mấy khúc nữa để đủ hai mươi?'],
  ['p10_be', 11, 'Bạn nhỏ có mấy quả đào? Cần cho thêm mấy quả nữa để đủ hai mươi quả?'],
];

export const STATIONS = [
  {
    id: 'nhin-hinh-1', icon: '🥬', color: '#16A34A', title: 'Nhìn hình viết phép tính', name: 'Nhìn hình, viết phép tính rồi tính kết quả',
    rounds: [
      // Trang 5: 12 cây bắp cải, thêm 5 cây.
      {
        type: 'eq', img: img('p05_bapcai'), lines: [[12, '+', 5, '=', 17]],
        say: 'Bên trái có mấy cây bắp cải? Thêm vào mấy cây nữa? Bé đếm rồi viết phép tính nhé!',
      },
      // Trang 5: 12 ổ bánh mì, 3 ổ bị gạch bỏ.
      {
        type: 'eq', img: img('p05_banhmi'), lines: [[12, '-', 3, '=', 9]],
        say: 'Có tất cả mấy ổ bánh mì? Mấy ổ bị gạch đi? Bé viết phép tính nhé!',
      },
    ],
  },
  {
    id: 'banh-va-nha', icon: '🍰', color: '#F97316', title: 'Bánh ngọt và ngôi nhà', name: 'Tính rồi chọn, tính rồi nối',
    rounds: [
      // Trang 6: miếng bánh có kết quả lớn hơn 10 là 9 + 5 và 4 + 8.
      {
        type: 'choice', img: img('p06_gau'), answer: [2, 3], cols: 3,
        options: [1, 2, 3, 4, 5].map(k => ({ img: img(`p06_banh${k}`) })),
        say: 'Gấu con muốn ăn miếng bánh có kết quả lớn hơn mười. Bé tính rồi chọn giúp Gấu hai miếng bánh nhé!',
        hint: 'Miếng này chưa lớn hơn mười đâu. Bé tính lại nhé!',
        done: 'Giỏi quá! Chín cộng năm bằng mười bốn, bốn cộng tám bằng mười hai. Gấu con cảm ơn bé!',
      },
      // Trang 6: vịt 5 — 12 − 7, chó 6 — 10 − 4, chuột 7 — 13 − 6, gà 8 — 16 − 8.
      {
        type: 'link', layout: 'tb',
        from: [
          { img: img('p06_vit'), say: 'Vịt con số năm' }, { img: img('p06_cho'), say: 'Cún con số sáu' },
          { img: img('p06_chuot'), say: 'Chuột con số bảy' }, { img: img('p06_ga'), say: 'Gà con số tám' },
        ],
        to: ['10-4', '12-7', '16-8', '13-6'].map(t => ({ text: `🏠 ${t}`, say: t })),
        pairs: [[0, 1], [1, 0], [2, 3], [3, 2]],
        says: ['12-7=5, nhà của Vịt con', '10-4=6, nhà của Cún con', '13-6=7, nhà của Chuột con', '16-8=8, nhà của Gà con'],
        say: 'Các con vật về đúng ngôi nhà có kết quả bằng số của mình. Bé chạm con vật rồi chạm ngôi nhà để nối nhé!',
      },
    ],
  },
  {
    id: 'bong-bay-mat-troi', icon: '🎈', color: '#EC4899', title: 'Khinh khí cầu', name: 'Phép tính nào đúng?',
    rounds: [
      // Trang 7: các khinh khí cầu tính đúng là 1, 3, 4, 6, 9.
      {
        type: 'choice', answer: [0, 2, 3, 5, 8], cols: 5,
        options: ['9+6=15', '13-1=10', '4+12=16', '7+5=12', '18-8=9', '19-9=10', '14+3=18', '13-6=8', '18-7=11', '4+13=16'].map(t => ({ text: `🎈 ${t}`, say: t })),
        say: 'Khinh khí cầu nào có phép tính đúng? Bé tính rồi chạm vào tất cả khinh khí cầu đúng nhé! Có năm cái đấy!',
        hint: 'Phép tính này sai rồi. Bé tính lại nhé!',
      },
      // Trang 8: số ở hàng trên trừ đi số ở hàng dưới bằng 7.
      {
        type: 'link', layout: 'tb',
        from: [15, 10, 19, 14, 18].map(n => ({ text: `☀️ ${n}`, say: String(n) })),
        to: [11, 7, 3, 8, 12].map(n => ({ text: `🌞 ${n}`, say: String(n) })),
        pairs: [[0, 3], [1, 2], [2, 4], [3, 1], [4, 0]],
        says: ['15-8=7', '10-3=7', '19-12=7', '14-7=7', '18-11=7'],
        say: 'Mỗi ông mặt trời ở trên trừ đi ông mặt trời nào ở dưới thì bằng bảy? Bé nối từng cặp nhé!',
        hint: 'Trừ đi số này chưa bằng bảy. Bé thử số khác nhé!',
      },
    ],
  },
  {
    id: 'chiec-quat', icon: '🪭', color: '#EAB308', title: 'Những chiếc quạt', name: 'Tính rồi xếp từ nhỏ đến lớn',
    rounds: [
      // Trang 8: 17 − 14 = 3, 18 − 9 = 9, 12 − 8 = 4, 15 − 8 = 7, 20 − 8 = 12.
      { type: 'calc', theme: '🪭', items: ['17-14=?', '18-9=?', '12-8=?', '15-8=?', '20-8=?'], say: 'Bé tính kết quả trên từng chiếc quạt nhé!' },
      {
        type: 'rank', order: [0, 2, 3, 1, 4],
        items: ['17-14=3', '18-9=9', '12-8=4', '15-8=7', '20-8=12'].map(t => ({ text: `🪭 ${t}`, say: t })),
        say: 'Bây giờ bé chạm vào các chiếc quạt theo thứ tự kết quả từ nhỏ đến lớn nhé!',
        hint: 'Chưa đúng rồi. Bé tìm chiếc quạt có kết quả nhỏ hơn nhé!',
      },
    ],
  },
  {
    id: 'bang-tinh', icon: '🐯', color: '#D97706', title: 'Bảng tính của con vật', name: 'Tìm bảng tính đúng, sửa phép tính sai',
    rounds: [
      {
        type: 'choice', answer: 1, cols: 4,
        options: TABLES.map(name => ({ img: img(name) })),
        say: 'Bảng tính của con vật nào đúng hết cả bốn phép tính? Bé tính rồi chạm vào bảng đó nhé!',
        hint: 'Bảng này có phép tính sai rồi. Bé kiểm tra bảng khác nhé!',
        done: 'Giỏi quá! Bảng của bạn Hổ đúng hết!',
      },
      {
        type: 'calc', theme: '✏️', items: ['15-8=?', '6+12=?', '17-6=?', '13+5=?', '11-8=?', '13+6=?'],
        say: 'Các phép tính này bị viết sai kết quả. Bé tính lại cho đúng nhé!',
      },
    ],
  },
  {
    id: 'cho-an', icon: '🥕', color: '#EA580C', title: 'Cho thêm đồ ăn', name: 'Các bạn cần thêm bao nhiêu để đủ 20?',
    rounds: FEED.map(([name, has, say]) => ({
      type: 'eq', img: img(name), lines: [[has, '+', 20 - has, '=', 20]], show: [1, 3, 4], say,
      hint: 'Chưa đúng rồi. Bé đếm tiếp từ số đồ ăn đang có cho đến hai mươi nhé!',
    })),
  },
  {
    id: 'tinh-nhanh-1', icon: '🐿️', color: '#0EA5E9', title: 'Tính nhanh', name: 'Tính nhanh và đúng',
    rounds: [
      // Trang 11: phép tính đặt dọc.
      { type: 'calc', theme: '🐿️', items: ['17-6=?', '10+5=?', '14-7=?', '13-8=?', '12+7=?', '15+4=?', '11-3=?'], say: 'Bé cùng Sóc con tính thật nhanh và đúng nhé!' },
      // Trang 13: Chuột qua đường.
      {
        type: 'calc', theme: '🐭', items: ['15-4=?', '16-9=?', '12+7=?', '6+13=?', '11+8=?', '14-7=?', '10+9=?', '12-5=?'],
        say: 'Chuột con phải tính đúng các phép tính mới qua được đường an toàn. Bé giúp Chuột nhé!',
        done: 'Giỏi quá! Chuột con đã qua đường an toàn rồi!',
      },
    ],
  },
  {
    id: 'bai-toan-1', icon: '🐛', color: '#65A30D', title: 'Bài toán có lời', name: 'Nghe đề bài, viết phép tính',
    rounds: [
      { type: 'eq', img: img('p12_sau'), lines: [[16, '-', 9, '=', 7]], say: 'Trên lá cây có mười sáu con sâu, đã bò đi chín con. Hỏi trên lá cây còn mấy con sâu?' },
      { type: 'eq', img: img('p12_hoa'), lines: [[13, '-', 5, '=', 8]], say: 'Trong vườn hoa nở mười ba bông hoa, đã ngắt đi năm bông. Hỏi trong vườn còn lại mấy bông hoa?' },
      { type: 'eq', img: img('p12_keo'), lines: [[8, '+', 7, '=', 15]], say: 'Bạn Hồng có tám chiếc kẹo, mẹ cho thêm bảy chiếc nữa. Hỏi bạn Hồng có tất cả bao nhiêu chiếc kẹo?' },
      { type: 'eq', img: img('p12_ngo'), lines: [[10, '+', 4, '=', 14]], say: 'Gấu con có mười bắp ngô, sau đó bẻ thêm bốn bắp nữa. Hỏi Gấu con có tất cả bao nhiêu bắp ngô?' },
    ],
  },
  {
    id: 'cong-ba-so', icon: '🍎', color: '#DC2626', title: 'Cộng ba số', name: 'Đếm từng nhóm rồi cộng lại',
    rounds: [
      { type: 'eq', img: img('p14_xeng'), lines: [[8, '+', 3, '+', 4, '=', 15]], say: 'Hình có ba nhóm cái xẻng. Bé đếm từng nhóm, viết phép cộng rồi tính kết quả nhé!' },
      { type: 'eq', img: img('p14_but'), lines: [[9, '+', 5, '+', 2, '=', 16]], say: 'Bé đếm bút chì ở từng nhóm, rồi viết phép cộng nhé!' },
      { type: 'eq', img: img('p15_tao'), lines: [[2, '+', 4, '+', 5, '=', 11]], show: [0, 1, 2, 3, 4], say: 'Hai quả táo, thêm bốn quả, thêm năm quả nữa. Tất cả là bao nhiêu quả táo?' },
      { type: 'eq', img: img('p15_le'), lines: [[3, '+', 6, '+', 8, '=', 17]], show: [0, 1, 2, 3, 4], say: 'Ba cộng sáu cộng tám bằng bao nhiêu? Bé tính nhé!' },
      { type: 'eq', img: img('p15_dao'), lines: [[4, '+', 5, '+', 6, '=', 15]], show: [0, 1, 2, 3, 4], say: 'Bốn cộng năm cộng sáu bằng bao nhiêu? Bé tính nhé!' },
      { type: 'eq', img: img('p16_chim'), lines: [[4, '+', 5, '+', 6, '=', 15]], say: 'Trên ba cái cây có tất cả bao nhiêu con chim? Bé đếm chim trên từng cây rồi viết phép cộng nhé!' },
    ],
  },
  {
    id: 'noi-ket-qua', icon: '🔗', color: '#2563EB', title: 'Nối với đáp án', name: 'Tính rồi nối phép tính với kết quả',
    rounds: [
      // Trang 16: hai cột phép cộng ba số, ở giữa là kết quả 15–19.
      {
        type: 'link', layout: 'mid',
        from: ['11+4+3', '9+8+2', '7+5+4', '10+3+4', '6+7+2', '9+2+5', '3+10+4', '5+6+7', '12+4+3', '4+8+3'],
        to: [15, 16, 17, 18, 19],
        pairs: [[0, 3], [1, 4], [2, 1], [3, 2], [4, 0], [5, 1], [6, 2], [7, 3], [8, 4], [9, 0]],
        says: ['11+4+3=18', '9+8+2=19', '7+5+4=16', '10+3+4=17', '6+7+2=15', '9+2+5=16', '3+10+4=17', '5+6+7=18', '12+4+3=19', '4+8+3=15'],
        say: 'Bé tính từng phép cộng, rồi nối với kết quả đúng ở giữa nhé!',
        hint: 'Chưa đúng rồi. Bé cộng lại từng số một nhé!',
      },
    ],
  },
  {
    id: 'tru-ba-so', icon: '🎳', color: '#7C3AED', title: 'Bớt đi hai lần', name: 'Nhìn hình viết phép trừ',
    rounds: [
      // Trang 17: 15 − 3 − 5 = 7 và 13 − 5 − 3 = 5 (theo các nhóm khoanh / gạch trong hình).
      { type: 'eq', img: img('p17_vidu'), lines: [[18, '-', 4, '-', 6, '=', 8]], show: [0, 1, 2, 3, 4, 5], say: 'Đây là ví dụ: mười tám chấm, bớt bốn chấm, rồi bớt sáu chấm. Còn lại mấy chấm?' },
      { type: 'eq', img: img('p17_bowling'), lines: [[15, '-', 3, '-', 5, '=', 7]], say: 'Có tất cả mấy con ky? Bớt đi nhóm bị gạch và nhóm được khoanh. Bé viết phép trừ nhé!', hint: 'Chưa đúng rồi. Bé đếm tất cả con ky, rồi đếm từng nhóm bị bớt đi nhé!' },
      { type: 'eq', img: img('p17_hoa'), lines: [[13, '-', 5, '-', 3, '=', 5]], say: 'Có tất cả mấy bông hoa? Bớt đi nhóm bị gạch và nhóm được khoanh. Còn lại mấy bông?', hint: 'Chưa đúng rồi. Bé đếm tất cả bông hoa, rồi đếm từng nhóm bị bớt đi nhé!' },
    ],
  },
].map(s => ({ ...s, part: 1 }));
