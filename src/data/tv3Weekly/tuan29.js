// Tuần 29: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-29.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-29', week: 29, topic: 'Rừng trưa',
  read: {
    title: 'RỪNG TRƯA',
    paras: [
      'Quanh co trong rừng, chừng một giờ sau, tôi ngồi nghỉ dưới một gốc cây to. Những ngày nắng ráo thế này, rừng khô hiện lên với tất cả vẻ uy nghi tráng lệ của nó trong ánh nắng mặt trời vàng óng. Những thân cây tràm vỏ trắng vươn thẳng lên trời cao, chẳng khác gì những cây nến khổng lồ. Đầu lá rủ phất phơ như những đầu lá liễu bạt ngàn. Từ trong biển lá xanh rờn đã bắt đầu ngả sang màu cỏ úa, ngát dậy một mùi hương lá tràm bị hun nóng dưới mặt trời. Tiếng chim không ngớt vang xa, vọng mãi lên trời cao xanh thẳm. Trên các trảng rộng và chung quanh những lùm bụi thấp mọc theo các lạch nước, nơi mà sắc lá còn xanh, ta có thể nghe thấy tiếng vù vù bất tận của nghìn loại côn trùng có cánh. Chúng không ngớt bay đi bay lại trên những bông hoa nhiệt đới muôn màu sặc sỡ vừa lộng lẫy nở ra đã vội tàn nhanh trong nắng.',
      'Mùi hương ngòn ngọt, nhức đầu của những loài hoa rừng không tên hòa quyện vào ánh nắng ban trưa. Mùi hương ấy khiến con người dễ sinh buồn ngủ. Người ta có thể sẵn sàng ngả lưng dưới bóng một cây nào đó, để cho thứ cảm giác mệt mỏi chốn rừng trưa lơ mơ đưa mình vào một giấc ngủ chẳng đợi chờ.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        // sửa: đề gốc in "cây trám", bài đọc là "cây tràm".
        {
          type: 'choice', q: 'Hình ảnh cây tràm được miêu tả thế nào?',
          opts: ['Vươn thẳng lên trời, đầu lá bay phất phơ, lao xao trong gió nhẹ.', 'Vươn thẳng lên trời, đầu lá rủ phất phơ, ngát dậy mùi hương.', 'Thân to cao lực lưỡng, lá ngát dậy mùi hương, xanh mượt mà.'],
          ans: 1,
          quote: ['Những thân cây tràm vỏ trắng vươn thẳng lên trời cao', 'Đầu lá rủ phất phơ', 'ngát dậy một mùi hương lá tràm'],
          why: 'Bài tả thân tràm vươn thẳng lên trời cao, đầu lá rủ phất phơ và lá tràm ngát dậy mùi hương. Bài không nói lá lao xao trong gió, cũng không tả thân tràm to cao lực lưỡng.',
        },
        // sửa: đề gốc in "rả rich".
        {
          type: 'choice', q: 'Âm thanh gì xuất hiện liên tục trong rừng?',
          opts: ['tiếng chim hót, tiếng côn trùng bay', 'tiếng chim hót, tiếng gió thổi ào ào', 'tiếng gió thổi ào ào, tiếng côn trùng kêu rả rích'],
          ans: 0,
          quote: ['Tiếng chim không ngớt vang xa', 'tiếng vù vù bất tận của nghìn loại côn trùng có cánh'],
          why: '"Không ngớt", "bất tận" nghĩa là liên tục, không dừng: đó là tiếng chim và tiếng vù vù của côn trùng có cánh bay. Bài không có tiếng gió thổi ào ào.',
        },
        {
          type: 'choice', q: 'Vì sao ở trong rừng người ta dễ buồn ngủ?',
          opts: ['vì trong rừng mát mẻ, lại có mùi thơm của lá tràm', 'vì trong rừng có nhiều tiếng chim hót, côn trùng kêu', 'vì có mùi hương của hoa rừng hòa quyện với nắng'],
          ans: 2,
          quote: ['Mùi hương ngòn ngọt, nhức đầu của những loài hoa rừng không tên hòa quyện vào ánh nắng ban trưa', 'Mùi hương ấy khiến con người dễ sinh buồn ngủ'],
          why: 'Bài viết mùi hương hoa rừng hòa quyện vào ánh nắng ban trưa, "mùi hương ấy khiến con người dễ sinh buồn ngủ". Rừng trưa nắng nóng chứ không mát mẻ, còn tiếng chim, côn trùng không làm người ta buồn ngủ.',
        },
        {
          type: 'choice', q: 'Dòng nào ghi 3 từ giống nghĩa với từ “vàng óng”?',
          opts: ['vàng tươi, vàng ròng, vàng thỏi', 'vàng rực, vàng tươi, vàng mượt', 'vàng tươi, vàng rực, vàng bạc'],
          ans: 1,
          quote: ['ánh nắng mặt trời vàng óng'],
          why: '"Vàng óng" là màu vàng sáng, bóng đẹp. Vàng rực, vàng tươi, vàng mượt đều tả màu vàng sáng đẹp. Vàng ròng, vàng thỏi, vàng bạc là kim loại vàng, không phải màu sắc.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'underline', q: 'Gạch dưới tên riêng chưa viết hoa trong bài thơ dưới và viết hoa lại các tên riêng ấy.',
          marks: [{ n: 1, kind: 'tr' }],
          lines: ['Gió đưa cành trúc la đà,', 'Tiếng chuông trấn vũ canh gà Thọ xương.', 'Mịt mờ khói toả ngàn sương,', 'Nhịp chày yên thái, mặt gương tây hồ.'],
          ans: { 1: ['trấn vũ', 'xương', 'yên thái', 'tây hồ'] },
          ok: ['Thọ'],
          why: 'Trấn Vũ (tên đền), Thọ Xương, Yên Thái (tên làng xưa), Tây Hồ (tên hồ) là tên riêng nên phải viết hoa chữ cái đầu mỗi tiếng. Viết lại: "Tiếng chuông Trấn Vũ canh gà Thọ Xương. Nhịp chày Yên Thái, mặt gương Tây Hồ."',
        },
        // sửa: đáp án gốc ghi 64 tỉnh, thành phố. Sách ghi 63; từ ngày 1/7/2025 nước ta còn 34 tỉnh, thành phố (nhận cả hai).
        {
          type: 'fill', q: 'Điền thông tin còn thiếu vào chỗ chấm:',
          items: [
            { t: 'a) Đất nước em tên là {Việt Nam|nước Việt Nam|Cộng hòa xã hội chủ nghĩa Việt Nam|Cộng hoà xã hội chủ nghĩa Việt Nam}, có {34|63} tỉnh, thành phố; với {54} dân tộc anh em cùng sinh sống.' },
            { t: 'b) Đất nước em có {3|ba} miền: {Bắc|miền Bắc}, {Trung|miền Trung}, Nam. Thủ đô nước em là {Hà Nội}.' },
            { t: 'c) Trang phục truyền thống của người Việt là {áo dài|chiếc áo dài}, thường được mặc trong các dịp lễ, Tết,…' },
          ],
          why: 'Nước ta tên là Việt Nam, có 54 dân tộc anh em. Từ ngày 1/7/2025 nước ta có 34 tỉnh, thành phố (trước đó là 63). Nước ta có ba miền Bắc, Trung, Nam; thủ đô là Hà Nội. Áo dài là trang phục truyền thống của người Việt.',
        },
        // sửa: đáp án gốc in "Hội trọi châu", đúng là "Hội chọi trâu".
        {
          type: 'write', q: 'Kể tên:',
          parts: [
            { label: 'a) 5 tỉnh, thành phố của nước ta:', sample: 'Hà Nội, Đà Nẵng, Lâm Đồng, Khánh Hòa, Thành phố Hồ Chí Minh.' },
            { label: 'b) 3 vị anh hùng của dân tộc:', sample: 'Hồ Chí Minh, Nguyễn Trãi, Lê Lợi.' },
            { label: 'c) 3 lễ hội truyền thống:', sample: 'Hội Gióng, Hội chùa Hương, Hội chọi trâu.' },
          ],
          tip: 'Tên tỉnh, thành phố, tên người, tên lễ hội đều là tên riêng: nhớ viết hoa chữ cái đầu mỗi tiếng.',
        },
        // sửa: đáp án gốc in "biên bạc", đúng là "biển bạc".
        {
          type: 'fill', q: 'Điền từ vào chỗ trống để hoàn chỉnh các câu thành ngữ về đất nước dưới đây:',
          items: [
            { t: 'a) {Rừng|rừng} vàng, {biển} bạc.' },
            { t: 'b) {Giang sơn|giang sơn|non sông|Non sông} gấm vóc.' },
            { t: 'c) {Non|non} xanh, {nước} biếc.' },
            { t: 'd) {Non nước|non nước|sơn thủy|sơn thuỷ} hữu tình.' },
          ],
          why: 'Rừng vàng, biển bạc: rừng và biển nước ta có nhiều của quý. Giang sơn gấm vóc: đất nước đẹp như gấm như vóc. Non xanh, nước biếc và non nước hữu tình: núi sông nước ta rất đẹp, nên thơ.',
        },
        // sửa: câu mẫu của đáp án dùng "nhé" và có câu "Khi chúng ta biết bảo vệ… mới đẹp làm sao!" chưa rõ ý, viết lại câu mẫu.
        {
          type: 'write', q: 'Với mỗi tình huống dưới đây, em hãy đặt một câu cảm và một câu khiến:',
          parts: [
            { label: 'a) Bày tỏ cảm xúc về cảnh đẹp quê hương em.', sample: 'Câu cảm: Quê hương em mới đẹp làm sao! Câu khiến: Các bạn hãy cùng ngắm nhìn cảnh đẹp quê hương ta đi!' },
            { label: 'b) Đưa ra ý kiến về mong muốn giữ gìn, bảo vệ cảnh đẹp quê hương em.', sample: 'Câu cảm: Ôi, quê hương sạch đẹp thật đáng yêu biết bao! Câu khiến: Chúng ta hãy cùng nhau chung tay bảo vệ cảnh đẹp quê hương!' },
          ],
          tip: 'Câu cảm bày tỏ cảm xúc, thường có ôi, quá, lắm, làm sao, biết bao và kết thúc bằng dấu chấm than. Câu khiến dùng để đề nghị, yêu cầu, thường có hãy, đừng, chớ, đi, nào.',
        },
      ],
    },
  ],
};
