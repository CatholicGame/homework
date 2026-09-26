/**
 * 99 đề toán — Chủ đề 3: Hình cơ bản (trang 42–49) và Chủ đề 4: Không gian (trang 50–55).
 * Hình: scripts/pre4/hinh.json. Đáp án đối chiếu trang 78 của sách; trang 43, 45, 48, 55 không có
 * đáp án in sẵn nên tự giải.
 * Bỏ qua: trang 45 bài 1 (bản quét mất các đường cắt đứt đoạn), trang 47 bài 1 và trang 55 bài 2
 * (bài vẽ hình trên lưới).
 */
import { img, zones } from './assets.js';

const imgs = (names) => names.map(n => ({ img: img(n) }));

// Trang 46: hình vuông A–D thiếu một miếng; miếng ghép 1–4. Đáp án: A–1, B–4, C–3, D–2.
const PIECES = imgs(['p46_m1', 'p46_m2', 'p46_m3', 'p46_m4']);
const MISSING = [['a', 0], ['b', 3], ['c', 2], ['d', 1]];

// Trang 52: 10 phòng trống (trên → dưới, trái → phải); lời các bạn nhỏ và phòng đúng.
const HOUSE = [
  ['Bạn Ếch nói: Tớ sống ở tầng năm, phòng ngoài cùng bên trái. Tầng năm là tầng cao nhất đấy! Bé chạm vào phòng của bạn Ếch nhé!', 0],
  ['Bạn Mèo nói: Tớ sống ở tầng ba, phòng ngoài cùng bên trái. Bé tìm phòng của bạn Mèo nhé!', 4],
  ['Bạn Cún nói: Tớ sống ở tầng dưới nhà Mèo con. Nhà Mèo ở tầng ba, phòng bên trái. Bé tìm phòng của bạn Cún nhé!', 6],
  ['Bạn Cáo nói: Tớ sống ở bên phải bạn Hổ. Bạn Hổ ở tầng một, dưới cùng. Bé tìm phòng của bạn Cáo nhé!', 8],
];

// Trang 54: ô (cột A–E, hàng 1–6) → chỉ số ô trên lưới = hàng × 5 + cột.
const cell = (col, row) => (row - 1) * 5 + 'ABCDE'.indexOf(col);

export const STATIONS = [
  // ── Hình cơ bản ──────────────────────────────────────────────────────────
  {
    id: 'hinh-ghep', icon: '🧩', color: '#8B5CF6', title: 'Ghép hình', name: 'Ghép các miếng thành hình hoàn chỉnh', part: 3,
    rounds: [
      // Trang 42: A (3/4 hình tròn) + B (1/4), C (3/4) + F (1/4), D (nửa trên) + E (nửa dưới).
      {
        type: 'link', layout: 'lr',
        from: imgs(['p42_a', 'p42_c', 'p42_d']),
        to: imgs(['p42_e', 'p42_b', 'p42_f']),
        pairs: [[0, 1], [1, 2], [2, 0]],
        say: 'Gấu con muốn ghép thành ba hình tròn. Bé chạm một miếng bên trái, rồi chạm miếng bên phải ghép vừa khít thành hình tròn nhé!',
        hint: 'Hai miếng này chưa ghép thành hình tròn. Bé thử miếng khác nhé!',
        done: 'Giỏi quá! Bé đã ghép được ba hình tròn rồi!',
      },
      // Trang 42: tòa thành giống hình ví dụ là tòa số 3.
      {
        type: 'choice', img: img('p42_mau'), answer: 2, cols: 4,
        options: imgs(['p42_thanh1', 'p42_thanh2', 'p42_thanh3', 'p42_thanh4']),
        say: 'Đây là một tòa thành thật đẹp. Tòa thành nào bên dưới có hình dáng giống hệt tòa thành này? Bé chạm vào nhé!',
        hint: 'Chưa giống rồi. Bé đếm các mái nhọn và nhìn thật kỹ nhé!',
        done: 'Đúng rồi! Tòa thành này giống hệt hình ví dụ!',
      },
      ...MISSING.map(([k, answer]) => ({
        type: 'choice', img: img(`p46_${k}`), answer, cols: 4, options: PIECES,
        say: 'Hình vuông này bị thiếu một miếng. Miếng ghép nào bên dưới lấp vừa chỗ trống? Bé chạm vào nhé!',
        hint: 'Miếng này chưa vừa chỗ trống. Bé nhìn kỹ chỗ trống màu trắng nhé!',
        done: 'Giỏi quá! Miếng ghép vừa khít rồi!',
      })),
    ],
  },
  {
    id: 'hinh-tim', icon: '🔺', color: '#EC4899', title: 'Quan sát hình', name: 'Tìm hình thừa, hình chia đều, hình cắt gấp', part: 3,
    rounds: [
      // Trang 43: hình thừa trong mỗi nhóm là hình chữ nhật hồng, nửa hình tròn, tam giác vàng nhỏ.
      ...['p43_h1', 'p43_h2', 'p43_h3'].map((name, k) => ({
        type: 'spot', img: img(name), zones: zones(name), answer: [3],
        say: k === 0
          ? 'Hình bên trái được ghép từ các hình nhỏ. Có một hình nhỏ bị thừa, không dùng đến. Bé chạm vào hình thừa nhé!'
          : 'Hình nhỏ nào không có trong hình bên trái? Bé chạm vào hình thừa nhé!',
        hint: 'Hình này có trong hình bên trái rồi. Bé tìm hình khác nhé!',
        done: 'Đúng rồi! Đây là hình bị thừa!',
      })),
      // Trang 44: hình ví dụ có 30 ô vuông; các hình thiếu lần lượt 15, 14, 16, 9, 8 ô.
      {
        type: 'ask', img: img('p44_mau'),
        asks: [15, 14, 16, 9, 8].map((answer, k) => ({ icon: img(`p44_h${k + 1}`), label: `Hình ${k + 1}:`, answer, unit: 'ô' })),
        say: 'Hình vuông mẫu có ba mươi ô vuông nhỏ. Mỗi hình bên dưới cần ghép thêm mấy ô nữa để thành hình vuông giống hình mẫu? Bé đếm rồi chọn số nhé!',
        hint: 'Chưa đúng rồi. Bé đếm số ô của hình, rồi đếm tiếp cho đến ba mươi nhé!',
      },
      // Trang 45: hình chia thành bốn phần bằng nhau: 3 (hình vuông), 4 (hình tròn), 6 (nửa hình tròn).
      {
        type: 'choice', answer: [2, 3, 5], cols: 3,
        options: imgs(['p45_h1', 'p45_h2', 'p45_h3', 'p45_h4', 'p45_h5', 'p45_h6']),
        say: 'Hình nào được chia thành bốn phần bằng nhau? Bé đếm số phần rồi chạm vào tất cả các hình đúng nhé! Có ba hình đấy!',
        hint: 'Hình này chưa chia thành bốn phần bằng nhau. Bé đếm lại nhé!',
        done: 'Giỏi quá! Hình vuông, hình tròn và nửa hình tròn đều chia thành bốn phần bằng nhau!',
      },
      // Trang 47: gấp đôi hình vuông hai lần rồi cắt, mở ra được hình 3.
      {
        type: 'choice', img: img('p47_gap'), answer: 2, cols: 4,
        options: imgs(['p47_h1', 'p47_h2', 'p47_h3', 'p47_h4']),
        say: 'Gấp tờ giấy vuông hai lần thành hình tam giác nhỏ, rồi cắt một miếng. Mở tờ giấy ra sẽ được hình nào? Bé chọn nhé!',
        hint: 'Chưa đúng rồi. Tờ giấy gấp làm bốn lớp, nên sẽ có bốn lỗ cắt đấy!',
        done: 'Đúng rồi! Mở ra sẽ có bốn lỗ hình chữ nhật!',
      },
    ],
  },
  {
    id: 'hinh-khoi', icon: '🧊', color: '#0EA5E9', title: 'Hình khối', name: 'Khối trụ, khối cầu, khối hộp, khối nón', part: 3,
    rounds: [
      // Trang 48: A trụ – nến, B cầu – quả địa cầu, C lập phương – hộp quà, D hộp chữ nhật – tủ lạnh, E nón – mũ.
      {
        type: 'link',
        from: [
          { img: img('p48_a'), say: 'Khối trụ' }, { img: img('p48_b'), say: 'Khối cầu' },
          { img: img('p48_c'), say: 'Khối lập phương' }, { img: img('p48_d'), say: 'Khối hộp chữ nhật' },
          { img: img('p48_e'), say: 'Khối nón' },
        ],
        to: [
          { img: img('p48_v1'), say: 'Tủ lạnh' }, { img: img('p48_v2'), say: 'Cây nến' }, { img: img('p48_v3'), say: 'Quả địa cầu' },
          { img: img('p48_v4'), say: 'Chiếc mũ' }, { img: img('p48_v5'), say: 'Hộp quà' },
        ],
        pairs: [[0, 1], [1, 2], [2, 4], [3, 0], [4, 3]], layout: 'tb',
        say: 'Mỗi hình khối giống đồ vật nào? Bé chạm hình khối bên trái, rồi chạm đồ vật có hình dáng giống nó nhé!',
        hint: 'Đồ vật này có hình dáng khác rồi. Bé nhìn kỹ nhé!',
        done: 'Giỏi quá! Bé đã biết khối trụ, khối cầu, khối hộp và khối nón rồi!',
      },
      // Trang 49: 0 chai, 1 cốc, 2 dưa hấu, 3 lò vi sóng, 4 bánh kem, 5 hộp sữa, 6 quả cam, 7 quả bóng.
      {
        type: 'spot', img: img('p49_anh'), zones: zones('p49_anh'), answer: [0, 1, 4],
        say: 'Cái chai, cái cốc, cái bánh kem có hình khối giống nhau đấy, đều là khối trụ! Bé tìm và chạm vào ba đồ vật hình khối trụ nhé!',
        hint: 'Đồ vật này không phải khối trụ. Bé tìm đồ vật tròn dài như cái cốc nhé!',
        done: 'Giỏi quá! Cái chai, cái cốc và bánh kem đều là khối trụ!',
      },
      {
        type: 'spot', img: img('p49_anh'), zones: zones('p49_anh'), answer: [2, 6, 7],
        say: 'Bây giờ bé tìm ba đồ vật tròn như quả bóng, đó là khối cầu nhé!',
        hint: 'Đồ vật này không tròn như quả bóng. Bé tìm lại nhé!',
        done: 'Đúng rồi! Quả dưa hấu, quả cam và quả bóng đều là khối cầu!',
      },
      {
        type: 'spot', img: img('p49_anh'), zones: zones('p49_anh'), answer: [3, 5],
        say: 'Còn hai đồ vật có hình cái hộp, là khối hộp chữ nhật. Bé tìm hai đồ vật đó nhé!',
        hint: 'Đồ vật này không có hình cái hộp. Bé tìm lại nhé!',
        done: 'Giỏi quá! Hộp sữa và lò vi sóng đều là khối hộp chữ nhật!',
      },
    ],
  },

  // ── Không gian ───────────────────────────────────────────────────────────
  {
    id: 'kg-quan-sat', icon: '🌷', color: '#16A34A', title: 'Mắt tinh tường', name: 'Quan sát thật kỹ, tìm hình đúng', part: 4,
    rounds: [
      // Trang 50: chậu hoa đối xứng (soi gương) với hình ví dụ là chậu trên bên phải.
      {
        type: 'spot', img: img('p50_chau'), zones: zones('p50_chau'), answer: [1],
        say: 'Chậu hoa màu hồng bên trái là hình mẫu. Chậu hoa nào giống như hình mẫu soi vào gương, bông hoa và hình trang trí đổi bên? Bé chạm vào nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn thứ tự các bông hoa và hình bông nhỏ trên chậu nhé!',
        done: 'Đúng rồi! Các bông hoa và hình trang trí đều đổi bên như soi gương!',
      },
      // Trang 50: nhóm có tam giác xanh lam nằm dưới cùng là nhóm trên bên trái.
      {
        type: 'spot', img: img('p50_tamgiac'), zones: zones('p50_tamgiac'), answer: [0],
        say: 'Trong bốn nhóm hình tam giác, nhóm nào có hình tam giác màu xanh lam nằm dưới cùng, bị các hình khác đè lên? Bé chạm vào nhóm đó nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn chỗ các đường cắt nhau, đường nào bị che nhé!',
      },
      // Trang 53: chiếc hộp không giống ba hộp còn lại là hộp số 2.
      {
        type: 'choice', answer: 1, cols: 4,
        options: imgs(['p53_hop1', 'p53_hop2', 'p53_hop3', 'p53_hop4']),
        say: 'Có bốn chiếc hộp. Ba chiếc là cùng một hộp xoay các hướng khác nhau, còn một chiếc khác hẳn. Bé tìm chiếc hộp khác nhé!',
        hint: 'Hộp này giống các hộp khác, chỉ xoay đi thôi. Bé tìm lại nhé!',
        done: 'Đúng rồi! Chiếc hộp này khác ba chiếc còn lại!',
      },
      // Trang 53: chồng hai hình lại được hình 1.
      {
        type: 'choice', img: img('p53_mau'), answer: 0, cols: 4,
        options: imgs(['p53_h1', 'p53_h2', 'p53_h3', 'p53_h4']),
        say: 'Hình mẫu: chồng hai hình lên nhau thì được hình mới. Bây giờ bé đoán xem chồng hai hình thì được hình nào nhé!',
        hint: 'Chưa đúng rồi. Bé nhìn kỹ các góc nhọn màu hồng nhé!',
      },
    ],
  },
  {
    id: 'kg-xoay', icon: '🔄', color: '#F97316', title: 'Gấp và xoay hình', name: 'Gấp hộp giấy, xoay hình', part: 4,
    rounds: [
      // Trang 51: gấp được hộp 1 (hộp 2 có hai mặt đối diện nằm cạnh nhau).
      {
        type: 'choice', img: img('p51_mau'), answer: 0, cols: 4,
        options: imgs(['p51_hop1', 'p51_hop2', 'p51_hop3', 'p51_hop4']),
        say: 'Tờ giấy có sáu con cá này gấp lại thành chiếc hộp. Chiếc hộp nào gấp được từ tờ giấy này? Bé chạm vào nhé!',
        hint: 'Chưa đúng rồi. Hai mặt nằm cạnh nhau trên hộp phải nằm cạnh nhau trên tờ giấy đấy!',
        done: 'Giỏi quá! Chiếc hộp này gấp được từ tờ giấy!',
      },
      // Trang 51: xoay theo chiều kim đồng hồ 90° được hình 2.
      {
        type: 'choice', img: img('p51_xoay'), answer: 1, cols: 4,
        options: imgs(['p51_x1', 'p51_x2', 'p51_x3', 'p51_x4']),
        say: 'Xoay hình mẫu một phần tư vòng theo chiều kim đồng hồ, sẽ được hình nào? Bé chạm vào nhé!',
        hint: 'Chưa đúng rồi. Xoay theo chiều kim đồng hồ thì ô trên bên trái sẽ sang ô trên bên phải đấy!',
      },
      // Trang 55: xoay nửa vòng (180°) được hình 2 — mọi thứ lộn ngược.
      {
        type: 'choice', img: img('p55_mau'), answer: 1, cols: 3,
        options: imgs(['p55_x1', 'p55_x2', 'p55_x3']),
        say: 'Xoay cái đĩa nửa vòng, sẽ được hình nào? Bé chú ý các hình sẽ bị lộn ngược đấy!',
        hint: 'Chưa đúng rồi. Xoay nửa vòng thì quả táo sẽ xuống góc dưới bên phải và lộn ngược đấy!',
        done: 'Đúng rồi! Xoay nửa vòng thì mọi thứ đều lộn ngược!',
      },
    ],
  },
  {
    id: 'kg-nha', icon: '🏢', color: '#EAB308', title: 'Ngôi nhà nhiều tầng', name: 'Tìm phòng cho các bạn nhỏ', part: 4,
    rounds: HOUSE.map(([say, k]) => ({
      type: 'spot', img: img('p52_nha'), zones: zones('p52_nha'), answer: [k], say,
      hint: 'Chưa đúng rồi. Bé nghe lại lời bạn nhỏ và đếm tầng từ dưới lên nhé!',
      done: 'Đúng rồi! Bạn nhỏ đã tìm được nhà rồi, cảm ơn bé!',
    })),
  },
  {
    id: 'kg-toa-do', icon: '🗺️', color: '#DB2777', title: 'Tìm tọa độ', name: 'Cột chữ, hàng số', part: 4,
    rounds: [
      // Trang 54: kẹo C3, ếch B1, cặp D6, tất A4, cá E5.
      {
        type: 'ask', img: img('p54_luoi'),
        asks: [
          { icon: img('p54_keo'), answer: 'C3', options: ['B3', 'C3', 'C2', 'D3'] },
          { icon: img('p54_ech'), answer: 'B1', options: ['A1', 'B2', 'B1', 'C1'] },
          { icon: img('p54_cap'), answer: 'D6', options: ['D5', 'C6', 'E6', 'D6'] },
          { icon: img('p54_tat'), answer: 'A4', options: ['A4', 'A3', 'B4', 'A5'] },
          { icon: img('p54_ca'), answer: 'E5', options: ['E6', 'D5', 'E5', 'E4'] },
        ].map(a => ({ ...a, options: a.options.map(t => ({ text: t, say: `${t[0]} ${t[1]}` })) })),
        say: 'Chiếc mũ ở cột A, hàng một, nên ô của nó là A một. Bé tìm xem mỗi đồ vật ở ô nào, rồi chọn chữ và số đúng nhé!',
        hint: 'Chưa đúng rồi. Bé dò chữ ở cột trên cùng, số ở hàng bên trái nhé!',
      },
      {
        type: 'spot', img: img('p54_luoi'), zones: zones('p54_luoi'), answer: [cell('D', 4)],
        say: 'Bé chạm vào ô ở cột D, hàng bốn nhé! Con gì ở đó nhỉ?',
        hint: 'Chưa đúng rồi. Bé tìm cột chữ D ở trên, rồi đi xuống hàng số bốn nhé!',
        done: 'Đúng rồi! Ô D bốn là bạn Bạch tuộc!',
      },
      {
        type: 'spot', img: img('p54_luoi'), zones: zones('p54_luoi'), answer: [cell('B', 6)],
        say: 'Bây giờ bé chạm vào ô ở cột B, hàng sáu nhé!',
        hint: 'Chưa đúng rồi. Bé tìm cột chữ B, rồi đi xuống hàng số sáu, hàng dưới cùng nhé!',
        done: 'Đúng rồi! Ô B sáu là chú cá vàng!',
      },
    ],
  },
];
