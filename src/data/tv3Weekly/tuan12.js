// Tuần 12: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-12.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-12', week: 12, topic: 'Cha sẽ luôn ở bên con',
  read: {
    title: 'CHA SẼ LUÔN Ở BÊN CON', author: 'Thanh Giang dịch',
    paras: [
      'Một trận động đất lớn xảy ra. Chỉ trong vòng bốn phút, nó đã san bằng thành phố. Giữa cơn hỗn loạn đó, một người cha chạy vội đến trường học của con. Ông bàng hoàng, lặng đi vì ngôi trường chỉ còn là một đống đổ nát. Rồi ông nhớ lại lời hứa với con: “Dù có chuyện gì xảy ra, cha cũng sẽ luôn ở bên con.”. Ông cố nhớ lại vị trí lớp học của con, chạy đến đó và ra sức đào bới. Mọi người kéo ông ra và an ủi:',
      '- Muộn quá rồi! Bác không làm được gì nữa đâu!',
      'Nhưng với ai, ông cũng chỉ có một câu hỏi: “Bác có giúp tôi không?”, rồi tiếp tục đào bới. Nhiều người bắt đầu đào bới cùng ông.',
      'Nhiều giờ trôi qua. Đến khi lật một mảng tường lớn lên, người cha bỗng nghe thấy tiếng con trai. Mừng quá, ông gọi to tên cậu bé. Có tiếng đáp lại: “Cha ơi, con ở đây!”. Mọi người cùng ào đến. Bức tường đổ đã tạo ra một khoảng trống nhỏ nên bọn trẻ còn sống. Bọn trẻ được cứu thoát. Cậu con trai ôm chầm lấy cha: - Cha ơi! Con đã bảo các bạn là nhất định cha sẽ cứu con và các bạn mà!',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Chuyện gì xảy ra với ngôi trường của cậu con trai khi động đất?',
          opts: ['Ngôi trường chỉ còn lại một phần nhỏ nguyên vẹn.', 'Ngôi trường chỉ còn là một đống đổ nát.', 'Ngôi trường đang có rất nhiều người đào bới.'],
          ans: 1,
          quote: ['ngôi trường chỉ còn là một đống đổ nát'],
          why: 'Bài đọc kể người cha lặng đi vì ngôi trường chỉ còn là một đống đổ nát. Bài không nói còn phần nào nguyên vẹn, còn việc nhiều người đào bới là chuyện xảy ra sau đó.',
        },
        {
          type: 'choice', q: 'Vì sao người cha vẫn quyết tâm đào bới đống đổ nát khi mọi người cho rằng không còn hi vọng?',
          opts: ['Vì ông nghe thấy tiếng gọi của cậu con trai từ phía dưới đống đổ nát.', 'Vì ông nhớ được vị trí lớp học của con.', 'Vì ông nhớ lại lời hứa với con: “Dù có chuyện gì xảy ra, cha cũng sẽ luôn ở bên con”.'],
          ans: 2,
          quote: ['Rồi ông nhớ lại lời hứa với con', 'Dù có chuyện gì xảy ra, cha cũng sẽ luôn ở bên con'],
          why: 'Lời hứa "cha cũng sẽ luôn ở bên con" khiến ông không bỏ cuộc. Nhớ vị trí lớp học chỉ giúp ông biết đào ở đâu, còn tiếng con trai thì nhiều giờ sau ông mới nghe thấy.',
        },
        // sửa: phương án C gốc ghi "mảng tưởng", đúng là "mảng tường".
        {
          type: 'choice', q: 'Quyết tâm của người cha đã đem lại kết quả gì?',
          opts: ['Ông đã tìm thấy, cứu thoát được con trai và các bạn.', 'Ông đã tìm thấy con trai mình.', 'Ông đã lật được mảng tường lớn lên.'],
          ans: 0,
          quote: ['người cha bỗng nghe thấy tiếng con trai', 'Bọn trẻ được cứu thoát'],
          why: 'Nhờ người cha kiên trì đào bới, cả cậu con trai và các bạn đều được cứu thoát. Ý B chỉ nói tìm thấy con trai, ý C chỉ là một việc ông làm trên đường tìm con, đều chưa đủ.',
        },
        {
          type: 'write', q: 'Viết lại câu nói cho thấy cậu con trai rất tin tưởng vào cha mình?', lines: 2,
          quote: ['Cha ơi! Con đã bảo các bạn là nhất định cha sẽ cứu con và các bạn mà!'],
          sample: 'Cha ơi! Con đã bảo các bạn là nhất định cha sẽ cứu con và các bạn mà!',
          tip: 'Tìm câu cậu bé nói khi ôm chầm lấy cha. Chép đúng, có cả dấu chấm than.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          // Ô chính tả không xuống dòng, nên tách thành từng từ; câu đầy đủ ở đề bài.
          type: 'spell', rule: 'sx',
          q: 'Điền s/x vào chỗ chấm: Đường …á rộng rãi, phố …á đông đúc. Triển vọng …áng …ủa, tương lai …án lạn. Cố tránh cọ …át để giảm ma …át.',
          items: ['đường [s]á', 'phố [x]á', '[s]áng [s]ủa', '[x]án lạn', 'cọ [x]át', 'ma [s]át'],
          notes: {
            'đường sá': '<b>đường sá</b> là đường đi nói chung, từ cần nhớ viết <b>s</b>.',
            'phố xá': '<b>phố xá</b> là phố phường nói chung, từ cần nhớ viết <b>x</b>.',
            'sáng sủa': '<b>sáng sủa</b> là từ láy, hai tiếng cùng âm đầu <b>s</b>.',
            'xán lạn': '<b>xán lạn</b> nghĩa là rực rỡ, tươi sáng, viết <b>x</b>.',
            'cọ xát': '<b>xát</b> là chà mạnh lên mặt vật khác (cọ xát, xát gạo), viết <b>x</b>.',
            'ma sát': '<b>ma sát</b> là lực cản khi hai vật cọ vào nhau, viết <b>s</b>.',
          },
        },
        {
          type: 'underline', q: 'Gạch dưới từ ngữ chỉ hoạt động trong các từ dưới đây:',
          marks: [{ n: 1, kind: 'hd' }],
          lines: ['bàng hoàng, san lấp, đào bới, an ủi,', 'trận động đất, lật mảng tường, ào đến, cứu thoát'],
          ans: { 1: ['san lấp', 'đào bới', 'an ủi', 'lật mảng tường', 'ào đến', 'cứu thoát'] },
          why: 'San lấp, đào bới, an ủi, lật mảng tường, ào đến, cứu thoát là việc làm (trả lời "Làm gì?"). Bàng hoàng chỉ trạng thái, cảm xúc của người cha; trận động đất là sự vật.',
        },
        // sửa: đề gốc ghi "khác từ ở bài tập 7", đúng là bài tập 6.
        {
          type: 'write', q: 'Tìm trong bài đọc 5 từ ngữ chỉ hoạt động (khác từ ở bài tập 6):', lines: 2,
          sample: 'chạy, kéo, gọi, ôm chầm, đáp lại',
          tip: 'Đọc lại bài, tìm việc làm của người cha, mọi người và cậu bé.',
        },
        {
          type: 'write', q: 'Đặt câu nêu hoạt động với các từ:',
          parts: [
            { label: 'a) gào thét:', sample: 'Người cha gào thét gọi tên con giữa đống đổ nát.' },
            { label: 'b) nhớ:', sample: 'Người cha nhớ lời hứa với con.' },
          ],
        },
        {
          type: 'choice', q: 'Khoanh vào chữ cái đặt trước các câu kể:', letters: 'abcde',
          opts: ['Cậu bé ôm chầm lấy cha.', 'Trận động đất kinh hoàng quá!', 'Trận động đất xảy ra trong bao lâu?', 'Một người cha chạy vội đến trường học của con.', 'Người cha rất kiên nhẫn, đào bới từng chút một.'],
          ans: [0, 3, 4],
          why: 'Câu kể dùng để kể, tả, giới thiệu sự việc và cuối câu có dấu chấm (câu a, d, e). Câu b bộc lộ cảm xúc, có dấu chấm than, là câu cảm. Câu c dùng để hỏi, là câu hỏi.',
        },
        {
          type: 'fill', q: 'Dựa vào nội dung bài đọc, viết tiếp vào chỗ chấm để tạo câu kể.',
          items: [
            { t: 'a. Người cha nhớ lời hứa với con nên {*ra sức đào bới đống đổ nát để tìm con}.' },
            { t: 'b. Bọn trẻ rất {vui mừng|vui|mừng|vui sướng|mừng rỡ|sung sướng|hạnh phúc|mừng vui} khi được cứu thoát.' },
            { t: 'c. Nhờ có niềm tin vào lời hứa của cha nên {*cậu bé đã bình tĩnh đợi cha đến cứu}.' },
          ],
          why: 'Câu kể kể lại sự việc trong bài, cuối câu có dấu chấm. Chỗ trống b cần một từ chỉ cảm xúc của bọn trẻ khi thoát nạn.',
        },
      ],
    },
  ],
};
