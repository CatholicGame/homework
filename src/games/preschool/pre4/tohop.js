/**
 * 99 đề toán — Chủ đề 7: Tổ hợp (trang 62–65) và Chủ đề 8: Tìm quy luật (trang 66–71).
 * Hình: scripts/pre4/tohop.json. Đáp án đối chiếu trang 78 của sách.
 */
import { img, zones } from './assets.js';

const pics = (prefix, n) => Array.from({ length: n }, (_, k) => ({ img: img(`${prefix}${k + 1}`) }));
const numbered = (prefix, n) => Array.from({ length: n }, (_, k) => ({ img: img(`${prefix}${k + 1}`), text: String(k + 1) }));

const TO_HOP = [
  {
    id: 'th-manh-thua', icon: '🦋', color: '#F97316', title: 'Miếng ghép thừa', name: 'Tìm miếng ghép bị thừa',
    rounds: [
      // Trang 62: miếng thừa của con bướm là miếng 2, của ốc sên là miếng 1.
      {
        type: 'choice', img: img('p62_buom'), options: pics('p62_buom', 5), answer: 1,
        say: 'Bốn miếng ghép lại thành con bướm, còn một miếng bị thừa. Bé tìm miếng thừa nhé!',
        hint: 'Miếng này có trong hình con bướm đấy. Bé nhìn kỹ lại nhé!',
        done: 'Giỏi quá! Miếng này không có trong hình con bướm!',
      },
      {
        type: 'choice', img: img('p62_oc'), options: pics('p62_oc', 5), answer: 0,
        say: 'Còn bạn ốc sên thì sao? Miếng ghép nào bị thừa nhỉ?',
        hint: 'Miếng này có trong hình ốc sên đấy. Bé nhìn kỹ lại nhé!',
        done: 'Đúng rồi! Ốc sên chỉ có một cái đầu thôi!',
      },
      // Trang 65: chú cánh cam — miếng thừa là miếng trên cùng bên phải.
      {
        type: 'spot', img: img('p65_canhcam'), zones: zones('p65_canhcam'), answer: [2],
        say: 'Chú cánh cam được ghép từ bốn miếng. Bé chạm vào miếng ghép bị thừa nhé!',
        hint: 'Miếng này ghép được vào chú cánh cam đấy. Bé tìm miếng khác nhé!',
        done: 'Giỏi quá! Miếng này có nhiều chấm đen quá, không khớp với chú cánh cam!',
      },
    ],
  },
  {
    id: 'th-ghep-hinh', icon: '🚗', color: '#EC4899', title: 'Ghép hình', name: 'Các hình ghép lại được hình nào?',
    rounds: [
      // Trang 62: xe ô tô — đáp án 3.
      {
        type: 'choice', img: img('p62_xe'), options: numbered('p62_xe', 4), answer: 2, cols: 2,
        say: 'Dùng các hình trong ô bên trái thì ghép được chiếc xe nào? Bé nhìn thật kỹ nhé!',
        hint: 'Chiếc xe này có hình không giống ô bên trái. Bé so sánh lại nhé!',
      },
      // Trang 64: con thuyền — đáp án 3.
      {
        type: 'choice', img: img('p64_thuyen'), options: numbered('p64_thuyen', 4), answer: 2, cols: 2,
        say: 'Các hình trong ô bên trái ghép được con thuyền nào? Bé chọn nhé!',
        hint: 'Con thuyền này chưa giống đâu. Bé nhìn cabin, lá cờ và thân thuyền nhé!',
      },
      // Trang 65: miếng tam giác còn thiếu — đáp án 1.
      {
        type: 'choice', img: img('p65_tamgiac'), options: numbered('p65_tg', 4), answer: 0, cols: 2,
        say: 'Hình tam giác lớn còn thiếu một miếng ở giữa. Miếng tam giác nào ghép vừa chỗ trống?',
        hint: 'Miếng này không vừa chỗ trống. Chỗ trống có mũi nhọn chúc xuống dưới đấy!',
      },
    ],
  },
  {
    id: 'th-xep-hinh', icon: '🐳', color: '#0EA5E9', title: 'Xếp hình', name: 'Đặt miếng ghép vào đúng chỗ',
    rounds: [
      // Trang 63: A — 1, B — 2, C — 3.
      {
        type: 'ask', img: img('p63_tranh'),
        asks: [['A', [24.3, 11.9, 20.7, 20.8]], ['B', [24.5, 54.8, 17.8, 25.3]], ['C', [58.7, 72.1, 24.5, 21.8]]].map(([label, zone], k) => ({
          label, zone, answer: String(k + 1), options: numbered('p63_manh', 3),
          say: `Chỗ trống ${label} cần miếng ghép nào? Bé chọn nhé!`,
        })),
        say: 'Cùng Gấu chơi xếp hình nào! Chỗ trống A cần miếng ghép nào? Bé chọn nhé!',
        hint: 'Miếng này chưa khớp. Bé nhìn hình xung quanh chỗ trống nhé!',
        done: 'Giỏi quá! Bức tranh biển đã hoàn thành rồi!',
      },
      // Trang 64: hai bạn thỏ — miếng còn thiếu là miếng 3.
      {
        type: 'choice', img: img('p64_tho'), options: numbered('p64_tho', 4), answer: 2, cols: 2,
        say: 'Bức tranh hai bạn thỏ bị thiếu một miếng ghép hình chữ thập. Miếng nào ghép vừa?',
        hint: 'Miếng này chưa khớp với bức tranh. Bé nhìn màu áo của hai bạn thỏ nhé!',
      },
    ],
  },
].map(s => ({ ...s, part: 7 }));

const QUY_LUAT = [
  {
    id: 'ql-hinh-tiep', icon: '⏰', color: '#8B5CF6', title: 'Hình tiếp theo', name: 'Tìm hình tiếp theo',
    rounds: [
      // Trang 66: kim dài quay dần — đáp án 1.
      {
        type: 'choice', img: img('p66_dongho'), options: numbered('p66_dh', 3), answer: 0,
        say: 'Kim đồng hồ quay theo một quy luật. Chiếc đồng hồ tiếp theo là chiếc nào?',
        hint: 'Chưa đúng rồi. Bé nhìn xem kim dài quay thế nào nhé!',
      },
      // Trang 67: các hình quay vòng — đáp án 3.
      {
        type: 'choice', img: img('p67_hinh'), options: numbered('p67_a', 3), answer: 2,
        say: 'Mặt trời, mặt trăng, ngôi sao và đám mây đổi chỗ theo quy luật. Ô trống là hình nào?',
        hint: 'Chưa đúng rồi. Bé nhìn xem mỗi hình di chuyển sang đâu nhé!',
      },
      // Trang 67: chấm trong tam giác 1, 1, 2, 2, 3, 3, ?, 4 (hồng, trắng xen kẽ); hình tròn lặp 4 kiểu — đáp án 1.
      {
        type: 'choice', img: img('p67_day'), options: numbered('p67_b', 4), answer: 0, cols: 2,
        say: 'Chấm tròn trong tam giác và hình trong vòng tròn thay đổi theo quy luật. Chỗ dấu hỏi là cặp hình nào?',
        hint: 'Chưa đúng rồi. Bé đếm số chấm, nhìn màu chấm và màu hình trong vòng tròn nhé!',
      },
      // Trang 71: mặt trời, khinh khí cầu, kẹo mút lặp lại — đáp án 3.
      {
        type: 'choice', img: img('p71_hinh'), options: numbered('p71_o', 4), answer: 2, cols: 2,
        say: 'Mặt trời, khinh khí cầu, kẹo mút lặp lại theo đường đi. Ba ô trống là nhóm hình nào?',
        hint: 'Chưa đúng rồi. Bé đi theo đường từ trái sang phải, rồi vòng xuống nhé!',
      },
    ],
  },
  {
    id: 'ql-hoa-tiet', icon: '🧣', color: '#DB2777', title: 'Họa tiết', name: 'Điền họa tiết còn thiếu',
    rounds: [
      // Trang 66: chiếc khăn — mỗi hàng lùi một ô so với hàng trên.
      {
        type: 'ask', img: img('p66_khan'),
        asks: [
          { answer: 'B', zone: [0.4, 17.3, 19.8, 16.5], say: 'Ô trống ở hàng thứ hai, bên trái là họa tiết nào?' },
          { answer: 'E', zone: [59.7, 17.3, 19.8, 16.5], say: 'Ô trống ở hàng thứ hai, ô thứ tư là họa tiết nào?' },
          { answer: 'A', zone: [59.7, 33.8, 19.8, 16.5], say: 'Ô trống ở hàng thứ ba, ô thứ tư là họa tiết nào?' },
          { answer: 'D', zone: [79.4, 66.7, 19.8, 16.5], say: 'Ô trống ở hàng thứ năm, bên phải là họa tiết nào?' },
          { answer: 'C', zone: [39.9, 83.1, 19.8, 16.5], say: 'Ô trống ở hàng cuối cùng, ô ở giữa là họa tiết nào?' },
        ].map((a, k) => ({ ...a, label: `Ô ${k + 1}`, options: ['A', 'B', 'C', 'D', 'E'].map(t => ({ img: img(`p66_${t}`), text: t })) })),
        say: 'Mỗi hàng của chiếc khăn lùi đi một ô so với hàng trên. Ô trống ở hàng thứ hai, bên trái là họa tiết nào?',
        hint: 'Chưa đúng rồi. Bé nhìn hàng ngay phía trên, rồi lùi sang trái một ô nhé!',
        done: 'Giỏi quá! Chiếc khăn đã đủ họa tiết rồi!',
      },
      // Trang 68: chong chóng — A 4, B 2, C 3, D 1.
      {
        type: 'ask', img: img('p68_chong'),
        asks: [['A', 4, [34.7, 11.8, 9.3, 10]], ['B', 2, [54.4, 11.8, 9.3, 10]], ['C', 3, [35.2, 70.8, 10.1, 10.3]], ['D', 1, [86, 59, 9.8, 9.7]]].map(([label, n, zone]) => ({
          label, answer: String(n), zone, options: numbered('p68_ht', 4),
          say: `Vị trí ${label} là họa tiết gì? Bé chọn nhé!`,
        })),
        say: 'Họa tiết trên chong chóng xếp theo quy luật. Vị trí A là họa tiết gì? Bé chọn nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn các họa tiết lặp lại quanh chong chóng nhé!',
        done: 'Giỏi quá! Các chong chóng quay tít rồi!',
      },
    ],
  },
  {
    id: 'ql-so-luong', icon: '🍍', color: '#16A34A', title: 'Tăng dần, giảm dần', name: 'Số lượng thay đổi theo quy luật',
    rounds: [
      // Trang 69: A 14 (2, 5, 8, 11), B 18 (…, 14, 10, 6, 2), C 11 (1, 2, 4, 7), D 19 (7, 10, 13, 16).
      {
        type: 'ask', img: img('p69_nhom'),
        asks: [['A', 14, [80.9, 0.3, 18.6, 21.5]], ['B', 18, [0.7, 26.2, 18.6, 21.5]], ['C', 11, [80.9, 52, 18.6, 21.5]], ['D', 19, [80.9, 78.2, 18.6, 21.3]]].map(([label, answer, zone]) => ({
          label, answer, zone, options: [11, 19, 14, 18],
          say: `Ô ${label} có bao nhiêu? Bé đếm các ô bên cạnh để tìm quy luật nhé!`,
        })),
        say: 'Số lượng đồ vật trong mỗi hàng tăng hoặc giảm đều. Ô A có bao nhiêu quả dứa? Bé đếm để tìm quy luật nhé!',
        hint: 'Chưa đúng rồi. Bé đếm xem mỗi ô tăng hay giảm bao nhiêu nhé!',
        done: 'Giỏi quá! Bé tìm được quy luật của cả bốn hàng rồi!',
      },
    ],
  },
  {
    id: 'ql-sinh-vat-bien', icon: '🦀', color: '#0891B2', title: 'Sinh vật biển', name: 'Chọn tấm hình cho chỗ trống',
    rounds: [
      // Trang 70: A — 2, B — 1, C — 3.
      ...[['A', 1], ['B', 0], ['C', 2]].map(([row, answer]) => ({
        type: 'choice', img: img(`p70_${row}`), options: numbered('p70_o', 3), answer,
        say: `Nhóm ${row}: các con vật biển đổi chỗ theo quy luật. Tấm hình nào điền vào ô màu vàng?`,
        hint: 'Chưa đúng rồi. Bé xem mỗi con vật di chuyển sang ô nào nhé!',
      })),
    ],
  },
].map(s => ({ ...s, part: 8 }));

export const STATIONS = [...TO_HOP, ...QUY_LUAT];
