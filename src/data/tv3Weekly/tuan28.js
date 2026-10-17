// Tuần 28: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-28.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-28', week: 28, topic: 'Em yêu Tổ quốc Việt Nam',
  read: {
    title: 'EM YÊU TỔ QUỐC VIỆT NAM', author: 'Phạm Hổ',
    poem: [
      ['Tổ quốc em đẹp lắm', 'Cong cong hình lưỡi liềm', 'Trên: núi cao trùng điệp', 'Dưới: biển sóng mông mênh.'],
      ['Những cánh đồng bình yên', 'Nằm phơi mình ở giữa', 'Những con sông xanh, hồng', 'Uốn quanh trăm dải lụa.'],
      ['Tổ quốc em giàu lắm', 'Đồng ruộng: vựa thóc thơm', 'Biển bạc: đặc cá tôm', 'Rừng vàng: đầy quặng, gỗ.'],
      ['Ôi! Việt Nam! Việt Nam!', 'Tổ quốc bao thương mến', 'Yêu từng khóm tre làng', 'Từng con đò vào bến.'],
      ['Càng yêu thêm sông núi', 'Sinh ra những anh hùng', 'Em không nói ai biết', 'Nhưng em sướng vô cùng.'],
      ['Em là công dân nhỏ', 'Nước Việt Nam anh hùng!'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Bạn nhỏ đã miêu tả những cảnh vật nào ở đất nước ta?',
          opts: ['núi, sông, biển, cánh đồng', 'núi, rừng, sông, biển, cánh đồng', 'rừng, núi, sông, biển'],
          ans: 1,
          quote: ['núi cao trùng điệp', 'biển sóng mông mênh', 'Những cánh đồng bình yên', 'Những con sông xanh, hồng', 'Rừng vàng: đầy quặng, gỗ'],
          why: 'Bài thơ tả đủ năm cảnh: núi cao, biển sóng, cánh đồng, con sông và rừng vàng. Ý A thiếu rừng, ý C thiếu cánh đồng.',
        },
        {
          type: 'write', q: 'Em hiểu từ “giàu” trong câu thơ “Tổ quốc em giàu lắm” như thế nào?', lines: 3,
          quote: ['Tổ quốc em giàu lắm', 'Đồng ruộng: vựa thóc thơm', 'Biển bạc: đặc cá tôm', 'Rừng vàng: đầy quặng, gỗ'],
          sample: 'Từ “giàu” trong câu thơ “Tổ quốc em giàu lắm” có nghĩa là Tổ quốc em có rất nhiều nông sản và khoáng sản: đồng ruộng nhiều thóc, biển nhiều cá tôm, rừng nhiều quặng, gỗ.',
          tip: 'Đọc ba dòng thơ ngay sau câu "Tổ quốc em giàu lắm": đồng ruộng, biển, rừng có những gì?',
        },
        {
          type: 'choice', q: 'Đọc khổ thơ 4 và 5 em thấy bạn nhỏ yêu những gì ở Tổ quốc ta?',
          opts: ['núi, sông', 'khóm tre, con đò', 'khóm tre, con đò, núi, sông'],
          ans: 2,
          quote: ['Yêu từng khóm tre làng', 'Từng con đò vào bến', 'Càng yêu thêm sông núi'],
          why: 'Khổ 4 nói bạn nhỏ yêu khóm tre làng, con đò vào bến. Khổ 5 nói "Càng yêu thêm sông núi". Gộp cả hai khổ là khóm tre, con đò, núi, sông. Ý A và B chỉ nói được một khổ.',
        },
        {
          type: 'choice', q: 'Bạn nhỏ cảm thấy thế nào khi được là công dân nước Việt Nam?',
          opts: ['vui sướng, tự hào', 'thú vị', 'yên tâm'],
          ans: 0,
          quote: ['Nhưng em sướng vô cùng', 'Em là công dân nhỏ', 'Nước Việt Nam anh hùng!'],
          why: 'Bạn nhỏ "sướng vô cùng" và tự hào mình là công dân của nước Việt Nam anh hùng. Thú vị, yên tâm không nói được niềm vui và tự hào ấy.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        // sửa: đáp án gốc ghi "chuyền dịch"; đúng là "truyền dịch" (đưa thuốc nước vào người bệnh).
        {
          type: 'spell', rule: 'chtr', q: 'a) Chọn chống/trống điền vào chỗ chấm để tạo từ. b) Chọn chuyền/truyền điền vào chỗ chấm để tạo từ:',
          items: [
            '[chống/trống] chọi', '[chống/trống] dịch', '[trống/chống] đồng', '[trống/chống] trải', 'gà [trống/chống]', '[trống/chống] vắng',
            '[truyền/chuyền] tin', 'tuyên [truyền/chuyền]', 'gia [truyền/chuyền]', '[truyền/chuyền] bệnh', 'dây [chuyền/truyền]', '[truyền/chuyền] dịch',
          ],
          notes: {
            chống: '<b>chống</b> nghĩa là chống lại, ngăn lại cái không tốt.',
            trống: '<b>trống</b> là cái trống để đánh, con gà trống, hoặc nghĩa là không có gì, vắng vẻ.',
            truyền: '<b>truyền</b> nghĩa là đưa sang, lan sang hoặc để lại cho người khác.',
            chuyền: '<b>chuyền</b> nghĩa là chuyển nối tiếp qua nhiều chỗ, nhiều người (dây chuyền là dây nối từng mắt với nhau).',
          },
          why: 'Phải hiểu nghĩa mới chọn đúng: chống (chống lại) khác trống (cái trống, gà trống, trống vắng); truyền (đưa sang, lan sang) khác chuyền (chuyển nối tiếp, dây chuyền).',
        },
        // sửa: hình gốc in "nhộn nhip".
        {
          type: 'match', q: 'Nối các cặp từ có nghĩa giống nhau:',
          left: ['phân vân', 'siêng năng', 'đỡ đần', 'huyên náo', 'khoan khoái'],
          right: ['cần mẫn', 'nhộn nhịp', 'lưỡng lự', 'thoải mái', 'hỗ trợ'],
          ans: [2, 0, 4, 1, 3],
          why: 'Phân vân, lưỡng lự: chưa quyết định được. Siêng năng, cần mẫn: chăm chỉ làm việc. Đỡ đần, hỗ trợ: giúp đỡ người khác. Huyên náo, nhộn nhịp: đông vui, ồn ào. Khoan khoái, thoải mái: dễ chịu trong người.',
        },
        // sửa: đề gốc in "nhứng đám đá"; đáp án gốc ghi đặc điểm giống nhau của câu b là "Xen vào giữa những đám đá tai mèo",
        // đó là chỗ của nương ngô chứ không phải điểm giống bàn cờ, nên để em tự viết.
        {
          type: 'fill', q: 'Dựa vào hình ảnh so sánh có ở mỗi câu, điền vào cột thích hợp (Sự vật 1, Từ so sánh, Sự vật 2, Đặc điểm giống nhau):',
          text: [
            'a. Cầu Thê Húc màu son, cong cong như con tôm dẫn vào đền Ngọc Sơn.',
            'b. Xen vào giữa những đám đá tai mèo, những nương đỗ, nương ngô xanh um trông như những ô bàn cờ.',
          ],
          items: [
            { t: 'a. Sự vật 1: {Cầu Thê Húc|cầu}' },
            { t: 'a. Từ so sánh: {như}' },
            { t: 'a. Sự vật 2: {con tôm|tôm}' },
            { t: 'a. Đặc điểm giống nhau: {màu son, cong cong|cong cong|màu son cong cong|cong cong, màu son|màu son và cong cong}' },
            { t: 'b. Sự vật 1: {những nương đỗ, nương ngô xanh um|nương đỗ, nương ngô|những nương đỗ, nương ngô|nương đỗ, nương ngô xanh um|nương đỗ nương ngô|nương ngô, nương đỗ}' },
            { t: 'b. Từ so sánh: {như|trông như}' },
            { t: 'b. Sự vật 2: {những ô bàn cờ|ô bàn cờ|bàn cờ}' },
            { t: 'b. Đặc điểm giống nhau: {*chia thành từng ô xen kẽ nhau}' },
          ],
          why: 'Mỗi hình ảnh so sánh có sự vật được so sánh (sự vật 1), từ so sánh (như), sự vật dùng để so sánh (sự vật 2) và điểm giống nhau. Cầu Thê Húc cong cong, màu son như con tôm. Nương đỗ, nương ngô nằm thành từng ô xen giữa đá nên trông như những ô bàn cờ.',
        },
        {
          type: 'write', q: 'Quan sát tranh, viết câu có hình ảnh so sánh.', pic: 't28SoSanh',
          parts: [
            { label: 'a) Giọt sương trên lá', sample: 'Những giọt sương đọng trên lá trong suốt như những viên pha lê.' },
            { label: 'b) Vầng trăng trên bầu trời đêm', sample: 'Trăng cong cong như lưỡi liềm ai đó bỏ quên giữa trời.' },
          ],
          tip: 'Nhìn kĩ hình dáng, màu sắc của sự vật trong tranh, nghĩ xem nó giống cái gì, rồi nối hai sự vật bằng từ so sánh như, tựa, giống như.',
        },
      ],
    },
  ],
};
