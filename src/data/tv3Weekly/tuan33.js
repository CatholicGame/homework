// Tuần 33: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-33.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// Bài thơ trong đề in thành hai cột; mỗi cột là một khổ.
export default {
  id: 'tuan-33', week: 33, topic: 'Bài ca môi trường',
  read: {
    title: 'BÀI CA MÔI TRƯỜNG', author: 'Nguyễn Thị Loạt',
    poem: [
      ['Mẹ! mẹ ơi cô dạy', 'Bài bảo vệ môi trường', 'Mỗi khi đi tắm biển', 'Phải nhớ mang áo phao.', 'Không làm ồn gây ào', 'Không vứt rác bừa bãi',
        'Vỏ bim bim bánh kẹo', 'Vỏ bánh gói, ni lông.', 'Các bé nhớ nghe không', 'Phải bỏ vào thùng rác', 'Bỏ đúng nơi quy định', 'Để bảo vệ môi trường.'],
      ['Giữ trong xanh nước biển', 'Cho không khí trong lành', 'Cho mực, tôm, cá, ghẹ…', 'Phát triển và sinh sôi', 'Cung cấp cho con người', 'Thức ăn giàu dinh dưỡng.',
        'Đồng thời giúp phát triển', 'Tiềm lực về giao thông', 'Đường biển lại hàng không', 'Tàu bè đi tấp nập', 'Người du lịch, nghỉ mát', 'Cảm thấy rất vừa lòng',
        'Biển đẹp, nước lại trong.', 'Có công của bé đấy', 'Vì bé nhớ lời cô', 'Biết bảo vệ môi trường.'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Khi đi tắm biển, bé cần nhớ mang theo:',
          opts: ['bim bim', 'bánh kẹo', 'kính bơi', 'áo phao'],
          ans: 3,
          quote: ['Mỗi khi đi tắm biển', 'Phải nhớ mang áo phao.'],
          why: 'Bài thơ dặn: "Mỗi khi đi tắm biển / Phải nhớ mang áo phao." Bim bim, bánh kẹo chỉ được nhắc đến khi nói về vỏ rác, còn kính bơi thì bài không nói.',
        },
        {
          type: 'choice', q: 'Vỏ bim bim, bánh kẹo, bánh gói, ni lông phải được bỏ vào đâu?',
          opts: ['gốc cây', 'thùng rác', 'túi quần, túi áo.'],
          ans: 1,
          quote: ['Phải bỏ vào thùng rác', 'Bỏ đúng nơi quy định'],
          why: 'Bài thơ nhắc các bé phải bỏ vỏ bim bim, bánh kẹo, ni lông vào thùng rác, đúng nơi quy định. Vứt ở gốc cây là vứt rác bừa bãi, còn túi quần áo không phải chỗ để rác.',
        },
        {
          type: 'choice', q: 'Loài vật nào sau đây được nhắc tới trong đoạn thơ?',
          opts: ['mực', 'ốc', 'cua', 'sao biển'],
          ans: 0,
          quote: ['Cho mực, tôm, cá, ghẹ…'],
          why: 'Câu thơ "Cho mực, tôm, cá, ghẹ…" có nhắc tới con mực. Ốc, cua, sao biển cũng sống ở biển nhưng không có trong bài thơ.',
        },
        {
          type: 'write', q: 'Tìm trong bài và viết lại lợi ích của biển mang lại cho con người:', lines: 3,
          quote: ['Cho không khí trong lành', 'Thức ăn giàu dinh dưỡng.', 'Tiềm lực về giao thông', 'Người du lịch, nghỉ mát'],
          sample: 'Biển cho không khí trong lành, cung cấp thức ăn giàu dinh dưỡng, giúp phát triển giao thông đường biển và du lịch, nghỉ mát.',
          tip: 'Đọc khổ thơ thứ hai: biển trong xanh cho con người những gì (không khí, thức ăn, giao thông, du lịch)?',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'rdgi', q: 'Chữ r, d hay gi?',
          // Chỉ đưa hai dòng có chỗ trống vào ô; bài thơ đầy đủ ở phần why.
          items: ['Đây con sông xuôi [d]òng nước chảy', 'Từng ngọn [d]ừa [gi]ó đưa phe phẩy'],
          notes: {
            'dòng': '<b>dòng</b> nước, dòng sông viết <b>d</b>: từ này cần ghi nhớ.',
            'dừa': 'cây <b>dừa</b>, quả dừa viết <b>d</b>: từ này cần ghi nhớ.',
            'gió': '<b>gió</b> thổi viết <b>gi</b>: từ này cần ghi nhớ.',
          },
          why: 'Đoạn thơ của Hoài Vũ: "Đây con sông xuôi dòng nước chảy / Bốn mùa soi từng mảnh mây trời / Từng ngọn dừa gió đưa phe phẩy / Duyên dáng khoe sắc màu."',
        },
        {
          type: 'spell', rule: 'hoinga', q: 'Dấu hỏi hay dấu ngã vào chữ in đậm?',
          // Chỉ đưa các dòng có chữ in đậm vào ô (cột trái rồi cột phải); bài thơ đầy đủ ở phần why.
          items: ['Dòng suối [nhỏ] trôi nhanh,', '[Chở] niềm vui đi [mãi]', 'Tiếng cười vang khắp [bản]', 'Các em mừng, [vẫy] tay.'],
          notes: {
            'nhỏ': '<b>nhỏ</b> (bé, nhỏ bé) viết dấu <b>hỏi</b>.',
            'Chở': '<b>chở</b> (chuyên chở, chở hàng) viết dấu <b>hỏi</b>.',
            'mãi': '<b>mãi</b> (mãi mãi, còn hoài) viết dấu <b>ngã</b>.',
            'bản': '<b>bản</b> (bản làng, làng ở miền núi) viết dấu <b>hỏi</b>.',
            'vẫy': '<b>vẫy</b> tay viết dấu <b>ngã</b>.',
          },
          why: 'Đoạn thơ của Nguyễn Long: "Dòng suối nhỏ trôi nhanh, / Chở niềm vui đi mãi / Cây nêu vừa dựng lại / Duyên dáng khoe sắc màu. // Sân rộng, còn vút cao, / Tiếng cười vang khắp bản / Đu quay tròn, loáng thoáng / Các em mừng, vẫy tay."',
        },
        {
          type: 'spell', q: 'Điền dấu câu phù hợp (dấu chấm, dấu chấm than, dấu ngoặc kép) vào ô trống trong đoạn văn dưới đây:',
          text: [
            'Ông Biển hướng về đất liền, thấy một bãi cát [ ] Gió đang lùa rác từ bãi cát xuống biển, rồi sóng biển lại đưa rác lên bờ [ ] Không thể loanh quanh mãi thế này [ ] - Ông Biển thở dài',
            'Đang tuyệt vọng, ông Biển bỗng thấy trên bãi cát mấy cô bé, cậu bé mang theo những chiếc bao to nhặt rác. [ ] Cứu tinh đây rồi![ ] [ ] Ông reo lên và tặng các cô cậu những làn gió mát nhất.',
          ],
          // Tách thành cụm ngắn theo thứ tự trong đoạn (đoạn đầy đủ ở text phía trên).
          items: [
            'thấy một bãi cát[./!/“/”]', 'đưa rác lên bờ[./!/“/”]', 'loanh quanh mãi thế này[!/./“/”]',
            '[“/”/./!]Cứu tinh đây rồi![”/“/./!]', '[./!/“/”] Ông reo lên',
          ],
          why: 'Dấu chấm đặt cuối câu kể. Dấu chấm than đặt cuối câu bộc lộ cảm xúc (Không thể loanh quanh mãi thế này!). Lời nói của ông Biển "Cứu tinh đây rồi!" được đặt trong dấu ngoặc kép: mở ngoặc ở đầu, đóng ngoặc ở cuối lời nói.',
        },
        // sửa: câu khiến mẫu của đáp án có "nhé", đổi sang lời đề nghị khác.
        {
          type: 'write', q: 'Với bức tranh dưới đây, hãy đặt câu theo yêu cầu:', pic: 't33beach',
          parts: [
            { label: 'Câu kể:', sample: 'Bờ biển có rất nhiều rác.' },
            { label: 'Câu khiến:', sample: 'Chúng mình cùng nhặt rác làm sạch bờ biển nào!' },
            { label: 'Câu cảm:', sample: 'Bờ biển bây giờ sạch đẹp quá!' },
          ],
          tip: 'Câu kể dùng để kể, tả, kết thúc bằng dấu chấm. Câu khiến dùng để đề nghị, thường có hãy, đừng, nào, đi. Câu cảm bộc lộ cảm xúc, thường có quá, thật, ôi và dấu chấm than.',
        },
      ],
    },
  ],
};
