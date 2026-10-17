// Tuần 35: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-35.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-35', week: 35, topic: 'Sự tích sông hồ ở Tây Nguyên',
  read: {
    title: 'SỰ TÍCH SÔNG HỒ Ở TÂY NGUYÊN', author: 'Theo Truyện cổ Tây Nguyên',
    paras: [
      'Ngày xưa, muông thú còn sống thành buôn làng, quanh một cái hồ lớn. Cuộc sống thật tươi vui, đầm ấm.',
      'Một hôm, Cá Sấu từ xa đến, chiếm luôn cái hồ. Cảnh hồ trở nên vắng lặng. Già làng Voi tức lắm, liền bảo mọi người cùng đánh đuổi Cá Sấu.',
      'Trong một trận đánh, già làng Voi nhử được Cá Sấu ra xa hồ nước. Cá Sấu khát quá, cố chạy trở lại lòng hồ. Nhưng đã muộn, lúc này cả làng xúm lại, vây kín mặt hồ. Muông thú các nơi cũng kéo gỗ lát đường, băng qua bãi lầy, đến bên hồ trợ giúp. Cá Sấu không được uống nước để lấy thêm sức mạnh, nó bị già làng Voi đánh quỵ.',
      'Ngày nay, khắp núi rừng Tây Nguyên đâu đâu cũng có sông hồ. Dân làng bảo: những dấu chân già làng Voi đánh nhau với Cá Sấu tạo thành hồ. Còn những dấu vết kéo gỗ ngang dọc hoá thành sông, suối.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Già làng Voi tức giận vì điều gì?',
          opts: ['Cá Sấu đến sống ở hồ nước của buôn làng.', 'Cá Sấu đến chiếm hồ nước của buôn làng.', 'Cá Sấu đến phá cuộc sống của buôn làng.'],
          ans: 1,
          quote: ['Cá Sấu từ xa đến, chiếm luôn cái hồ', 'Già làng Voi tức lắm'],
          why: 'Cá Sấu không chỉ đến sống mà "chiếm luôn cái hồ" của buôn làng, nên già làng Voi tức lắm. Bài không nói Cá Sấu phá cuộc sống của buôn làng.',
        },
        {
          type: 'choice', q: 'Già làng Voi làm thế nào để đánh thắng Cá Sấu?',
          opts: ['Nhử Cá Sấu lên bờ hồ để dân làng dễ đánh bại.', 'Nhử Cá Sấu ra xa hồ nước để dễ dàng đánh bại.', 'Nhử Cá Sấu ra đến bãi lầy để dễ dàng đánh bại.'],
          ans: 1,
          quote: ['già làng Voi nhử được Cá Sấu ra xa hồ nước', 'Cá Sấu không được uống nước để lấy thêm sức mạnh'],
          why: 'Già làng Voi nhử Cá Sấu ra xa hồ nước. Cá Sấu khát mà không được uống nước để lấy thêm sức mạnh nên bị đánh quỵ. Bãi lầy là chỗ muông thú các nơi kéo gỗ lát đường đi qua, không phải chỗ nhử Cá Sấu.',
        },
        {
          type: 'choice', q: 'Theo dân làng, sông hồ ở Tây Nguyên do đâu mà có?',
          opts: ['Do dấu chân già làng Voi và dấu vết kéo gỗ tạo thành.', 'Do dấu chân của Cá Sấu và dấu vết trận đánh tạo thành.', 'Do dấu chân dân làng và dấu chân muông thú tạo thành.'],
          ans: 0,
          quote: ['những dấu chân già làng Voi đánh nhau với Cá Sấu tạo thành hồ', 'những dấu vết kéo gỗ ngang dọc hoá thành sông, suối'],
          why: 'Dân làng bảo dấu chân già làng Voi khi đánh nhau với Cá Sấu tạo thành hồ, còn dấu vết kéo gỗ ngang dọc hoá thành sông, suối. Bài không nói tới dấu chân Cá Sấu hay dấu chân muông thú.',
        },
        // sửa: đáp án gốc viết "cá sáu", đúng là "Cá Sấu".
        {
          type: 'write', q: 'Vì sao mọi người đồng lòng cùng già làng Voi đánh đuổi Cá Sấu?', lines: 3,
          quote: ['Cuộc sống thật tươi vui, đầm ấm', 'Cá Sấu từ xa đến, chiếm luôn cái hồ. Cảnh hồ trở nên vắng lặng'],
          sample: 'Vì ngày xưa muông thú sống thành buôn làng quanh một cái hồ lớn, cuộc sống thật tươi vui, đầm ấm. Khi Cá Sấu chiếm hồ nước thì cảnh hồ trở nên vắng lặng, ai cũng muốn lấy lại cái hồ của buôn làng.',
          tip: 'So sánh cuộc sống quanh hồ trước khi Cá Sấu đến và sau khi Cá Sấu chiếm hồ.',
        },
        {
          type: 'choice', q: 'Nội dung, ý nghĩa của câu chuyện là:',
          opts: ['Giải thích sự hình thành sông hồ, ca ngợi ý chí quyết tâm và lòng dũng cảm của dân làng Tây Nguyên.', 'Giải thích sự hình thành sông hồ, ca ngợi trí thông minh và quyết tâm đuổi Cá Sấu của già làng Voi.', 'Giải thích sự hình thành sông hồ, ca ngợi trí thông minh và tinh thần đoàn kết của dân làng Tây Nguyên.'],
          ans: 2,
          quote: ['nhử được Cá Sấu ra xa hồ nước', 'cả làng xúm lại, vây kín mặt hồ', 'Muông thú các nơi cũng kéo gỗ lát đường, băng qua bãi lầy, đến bên hồ trợ giúp'],
          why: 'Câu chuyện giải thích vì sao Tây Nguyên có nhiều sông hồ. Dân làng thắng Cá Sấu nhờ mưu trí (nhử Cá Sấu ra xa hồ) và nhờ đoàn kết (cả làng xúm lại, muông thú các nơi đến trợ giúp). Ý B chỉ nói tới một mình già làng Voi.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        // Đáp án gốc gộp "vây kín" thành một từ chỉ hoạt động và bỏ sót "băng qua"; ở đây giữ "vây kín" một thẻ, thêm "băng qua" vào nhóm hoạt động.
        {
          type: 'sort', q: 'Xếp các từ được gạch chân vào nhóm từ ngữ thích hợp:',
          text: ['Trong một trận đánh, già làng Voi __nhử__ được Cá Sấu ra __xa__ __hồ nước__. Cá Sấu khát quá, cố chạy trở lại lòng hồ. Nhưng đã __muộn__, lúc này cả làng __xúm lại__, __vây__ __kín__ mặt hồ. __Muông thú__ các nơi cũng __kéo__ __gỗ__ __lát__ __đường__, __băng qua__ __bãi lầy__, đến bên hồ __trợ giúp__. Cá Sấu không được uống nước để __lấy__ thêm sức mạnh, nó bị __già làng__ Voi __đánh quỵ__.'],
          words: ['nhử', 'xa', 'hồ nước', 'muộn', 'xúm lại', 'vây kín', 'Muông thú', 'kéo', 'gỗ', 'lát', 'đường', 'băng qua', 'bãi lầy', 'trợ giúp', 'lấy', 'già làng', 'đánh quỵ'],
          groups: [
            { label: 'Từ ngữ chỉ sự vật', kind: 'sv', words: ['hồ nước', 'Muông thú', 'gỗ', 'đường', 'bãi lầy', 'già làng'] },
            { label: 'Từ ngữ chỉ hoạt động', kind: 'hd', words: ['nhử', 'xúm lại', 'vây kín', 'kéo', 'lát', 'băng qua', 'trợ giúp', 'lấy', 'đánh quỵ'] },
            { label: 'Từ ngữ chỉ đặc điểm', kind: 'dd', words: ['xa', 'muộn'] },
          ],
          why: 'Từ chỉ sự vật trả lời "Cái gì? Con gì? Ai?" (hồ nước, gỗ, già làng). Từ chỉ hoạt động trả lời "Làm gì?" (nhử, kéo, lát, trợ giúp). Từ chỉ đặc điểm trả lời "Thế nào?" (ra xa, đã muộn).',
          stars: 4,
        },
        {
          type: 'underline', q: 'Gạch dưới bộ phận trả lời câu hỏi “Bằng gì?” trong các câu dưới đây',
          marks: [{ n: 1, label: 'bộ phận trả lời câu hỏi “Bằng gì?”' }],
          lines: [
            'a. Chiếc thước kẻ của em được làm bằng nhựa.',
            'b. Bằng sự khéo léo và dẻo dai của mình, các nghệ sĩ xiếc đã cống hiến cho người xem những tiết mục đặc sắc.',
            'c. Bằng ý chí chiến đấu quật cường, nhân dân ta đã đánh đuổi được giặc ngoại xâm ra khỏi đất nước.',
          ],
          ans: { 1: ['bằng nhựa', 'Bằng sự khéo léo và dẻo dai của mình', 'Bằng ý chí chiến đấu quật cường'] },
          why: 'Bộ phận trả lời câu hỏi "Bằng gì?" nói về vật liệu, cách thức hay phương tiện, thường bắt đầu bằng chữ "bằng". Ví dụ: Thước kẻ làm bằng gì? Bằng nhựa.',
        },
        // sửa: câu hỏi mẫu a của đáp án thiếu dấu chấm hỏi.
        {
          type: 'write', q: 'Đặt câu hỏi (Ở đâu? Khi nào? Bằng gì?) cho bộ phận in đậm:',
          text: ['a. **Sáng tinh mơ,** ông em đã cặm cụi làm việc ngoài vườn.', 'b. **Trên các vách núi,** những chùm phong lan đang khoe sắc màu rực rỡ.'],
          parts: [
            { label: 'a.', sample: 'Khi nào ông em đã cặm cụi làm việc ngoài vườn?' },
            { label: 'b.', sample: 'Những chùm phong lan đang khoe sắc màu rực rỡ ở đâu?' },
          ],
          tip: '"Sáng tinh mơ" chỉ thời gian nên hỏi "Khi nào?". "Trên các vách núi" chỉ nơi chốn nên hỏi "Ở đâu?". Câu hỏi kết thúc bằng dấu chấm hỏi.',
        },
      ],
    },
  ],
};
