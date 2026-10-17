// Tuần 7: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-07.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-7', week: 7, topic: 'Người mẹ hiền',
  read: {
    title: 'NGƯỜI MẸ HIỀN', author: 'Theo Nguyễn Văn Thịnh',
    paras: [
      'Giờ ra chơi, Minh thì thầm với Nam: "Ngoài phố có gánh xiếc, bọn mình ra xem đi!"',
      'Nghe vậy, Nam không nén nổi tò mò. Nhưng cổng trường khóa, trốn ra sao được. Minh bảo:',
      '- Tớ biết có một chỗ tường thủng.',
      'Hết giờ ra chơi, hai em đã ở bên bức tường. Minh chui đầu ra. Nam đẩy Minh lọt ra ngoài. Đang đến lượt Nam cố lách ra thì bác bảo vệ vừa tới, nắm chặt hai chân em: "Cậu nào đây? Trốn học hả?" Nam vùng vẫy, Bác càng nắm chặt cổ chân Nam. Sợ quá, Nam khóc toáng lên.',
      'Bỗng có tiếng cô giáo:',
      '- Bác nhẹ tay kẻo cháu đau. Cháu này là học sinh lớp tôi.',
      'Cô nhẹ nhàng kéo Nam lùi lại và đỡ em ngồi dậy. Cô phủi đất cát lầm lem trên người Nam và đưa em về lớp.',
      'Vừa đau, vừa xấu hổ, Nam bật khóc. Cô xoa đầu Nam và gọi Minh đang thập thò ở cửa lớp vào, nghiêm giọng hỏi:',
      '- Từ nay các em có trốn học đi chơi nữa không?',
      'Hai em cùng đáp:',
      '- Thưa cô, không ạ. Chúng em xin lỗi cô.',
      'Cô hài lòng, bảo hai em về chỗ rồi tiếp tục giảng bài.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Vào giờ ra chơi, Minh đã rủ Nam đi đâu?',
          opts: ['Minh rủ Nam chui qua chỗ tường thủng.', 'Minh rủ Nam ra xem gánh xiếc biểu diễn ngoài phố.', 'Minh rủ Nam trốn ra ngoài cổng trường để đi chơi.'],
          ans: 1,
          quote: ['Ngoài phố có gánh xiếc, bọn mình ra xem đi!'],
          why: 'Minh thì thầm rủ Nam ra phố xem gánh xiếc. Chui qua chỗ tường thủng chỉ là cách để ra ngoài, còn cổng trường thì đang khóa nên không ra bằng cổng được.',
        },
        {
          type: 'fill', q: 'Các bạn ấy định ra phố bằng cách nào?',
          items: [{ t: 'Các bạn ấy định ra phố bằng cách {chui qua chỗ tường thủng|chui qua chỗ thủng của tường|chui qua chỗ tường bị thủng|chui qua lỗ thủng của tường|chui qua lỗ tường thủng|chui qua bức tường thủng|chui qua chỗ thủng}.' }],
          quote: ['Tớ biết có một chỗ tường thủng', 'Minh chui đầu ra'],
          why: 'Cổng trường khóa nên Minh bày cách chui qua chỗ tường bị thủng để ra phố.',
        },
        {
          type: 'choice', q: 'Chuyện gì đã xảy ra với hai bạn khi cố gắng chui qua chỗ tường thủng?',
          opts: ['Minh chui ra được nhưng Nam bị bác bảo vệ phát hiện và tóm chặt lấy hai chân.', 'Minh và Nam bị bác bảo vệ phát hiện và đưa về gặp cô giáo.', 'Cô giáo và bác bảo vệ đã phát hiện khi Nam đang cố gắng chui qua lỗ thủng.'],
          ans: 0,
          quote: ['Nam đẩy Minh lọt ra ngoài', 'bác bảo vệ vừa tới, nắm chặt hai chân em'],
          why: 'Minh đã lọt ra ngoài, chỉ có Nam bị bác bảo vệ nắm chặt hai chân. Bác bảo vệ không đưa hai bạn đến gặp cô, và người phát hiện là bác bảo vệ, cô giáo đến sau.',
        },
        {
          type: 'choice', q: '“Người mẹ hiền” trong bài là ai?',
          opts: ['là mẹ của bạn Minh', 'là mẹ của bạn Nam', 'là cô giáo'],
          ans: 2,
          quote: ['Bác nhẹ tay kẻo cháu đau', 'Cô nhẹ nhàng kéo Nam lùi lại và đỡ em ngồi dậy', 'Cô xoa đầu Nam'],
          why: 'Cô giáo che chở, đỡ Nam dậy, phủi đất cát, xoa đầu em như một người mẹ. Mẹ của Minh và Nam không có mặt trong câu chuyện.',
        },
        {
          type: 'fill', q: 'Bài đọc muốn nói với em điều gì? Chọn từ ngữ điền vào chỗ chấm: người mẹ hiền, yêu thương, phiền lòng, nghiêm khắc.',
          items: [{ t: 'Cô giáo rất {yêu thương} nhưng cũng {nghiêm khắc} dạy bảo học sinh nên người. Cô như {người mẹ hiền|mẹ hiền} của các em. Câu chuyện cũng nhắc nhở các em phải ngoan ngoãn, vâng lời cô dạy, không nên làm thầy cô phải {phiền lòng}.' }],
          quote: ['Cô xoa đầu Nam', 'nghiêm giọng hỏi', 'Thưa cô, không ạ. Chúng em xin lỗi cô.'],
          why: 'Cô xoa đầu, đỡ Nam dậy là cô yêu thương học trò. Cô nghiêm giọng hỏi hai bạn là cô nghiêm khắc dạy bảo. Vì thế cô như người mẹ hiền, và các em không nên làm cô phiền lòng.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'ln', q: 'a) Điền l/n vào chỗ chấm. b) Tìm tiếng có chứa vần ăn/ăng.',
          items: [
            'Hoa thảo quả [n]ảy dưới gốc cây kín đáo và [l]ặng [l]ẽ. Dưới tầng đáy rừng, những chùm thảo quả đỏ chon chót, bóng bẩy như chứa [l]ửa, chứa [n]ắng.',
            'Nước đông cứng ở trong thiên nhiên, thường ở nơi khí hậu lạnh là: [băng/băn]',
            'Vật hình chữ nhật hoặc hình vuông, thường dùng để rửa mặt là: [khăn/khăng] mặt',
          ],
          notes: {
            'Nước đông cứng ở trong thiên nhiên, thường ở nơi khí hậu lạnh là: băng': 'băng là nước đông cứng lại vì lạnh, vần ăng.',
            'Vật hình chữ nhật hoặc hình vuông, thường dùng để rửa mặt là: khăn mặt': 'khăn mặt dùng để rửa mặt, vần ăn.',
          },
          why: 'Phần a): nảy (nảy mầm, mọc ra), lặng lẽ (yên lặng, láy âm l), lửa (ngọn lửa), nắng (ánh nắng). Phần b): đọc to để nghe âm cuối: băng (ng), khăn (n).',
        },
        {
          type: 'choice', q: 'Câu kể là câu dùng để kể, tả, giới thiệu và kết thúc bằng dấu chấm. Em hãy khoanh vào chữ cái đặt trước những câu kể trong các câu sau:',
          letters: ['a', 'b', 'c', 'd', 'e'],
          opts: ['Nam và Minh rủ nhau đi xem gánh xiếc ngoài phố.', 'Nam ơi, gánh xiếc biểu diễn hay quá!', 'Cổng trường đang khóa rồi, trốn ra sao được?', 'Cô giáo nhẹ nhàng nhắc nhở về lỗi sai của hai bạn.', 'Cô giáo là người mẹ hiền của các bạn học sinh.'],
          ans: [0, 3, 4],
          why: 'Câu a, d, e dùng để kể, tả, giới thiệu và kết thúc bằng dấu chấm nên là câu kể. Câu b bộc lộ cảm xúc, có dấu chấm than (câu cảm). Câu c có dấu chấm hỏi.',
        },
        {
          type: 'match', q: 'Trong các câu kể em vừa tìm được ở bài tập 7, hãy viết lại câu (nối mỗi kiểu câu với câu đúng):',
          left: ['Câu giới thiệu', 'Câu nêu hoạt động', 'Câu nêu đặc điểm'],
          right: ['Nam và Minh rủ nhau đi xem gánh xiếc ngoài phố.', 'Cô giáo nhẹ nhàng nhắc nhở về lỗi sai của hai bạn.', 'Cô giáo là người mẹ hiền của các bạn học sinh.'],
          ans: [2, 0, 1],
          why: 'Câu giới thiệu trả lời "Ai là gì?" (Cô giáo là người mẹ hiền). Câu nêu hoạt động kể việc làm (rủ nhau đi xem xiếc). Câu còn lại có từ "nhẹ nhàng" nói cô giáo nhắc nhở thế nào, nên là câu nêu đặc điểm.',
        },
      ],
    },
  ],
};
