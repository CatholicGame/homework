// Tuần 9: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-09.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-9', week: 9, topic: 'Phần thưởng',
  read: {
    title: 'PHẦN THƯỞNG', author: 'Phỏng theo Blai-tơn (Lương Hùng dịch)',
    paras: [
      'Na là một cô bé tốt bụng. Ở lớp, ai cũng mến em. Em gọt bút chì giúp bạn Lan. Em cho bạn Minh nửa cục tẩy. Nhiều lần, em làm trực nhật giúp các bạn bị mệt... Na chỉ buồn vì em học chưa giỏi.',
      'Cuối năm học, cả lớp bàn tán về điểm thi và phần thưởng. Riêng Na chỉ lặng yên nghe các bạn. Em biết mình chưa giỏi môn nào.',
      'Một buổi sáng, vào giờ ra chơi, các bạn trong lớp túm tụm bàn bạc điều gì đó có vẻ bí mật lắm. Rồi các bạn kéo nhau đến gặp cô giáo.',
      'Cô giáo cho rằng sáng kiến của các bạn rất hay.',
      'Ngày tổng kết năm học, từng học sinh giỏi bước lên bục nhận phần thưởng. Cha mẹ các em cũng hồi hộp. Bất ngờ, cô giáo nói:',
      '- Bây giờ, cô sẽ trao phần thưởng đặc biệt. Đây là phần thưởng cả lớp đề nghị tặng bạn Na. Na học chưa giỏi, nhưng em có tấm lòng thật đáng quý.',
      'Na không hiểu mình có nghe nhầm không. Đỏ bừng mặt, cô bé đứng dậy bước lên bục. Tiếng vỗ tay vang dậy. Mẹ của Na lặng lẽ chấm khăn lên đôi mắt đỏ hoe.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Na đã làm những việc tốt gì giúp các bạn trong lớp?',
          opts: ['gọt bút chì giúp Lan', 'gọt bút chì giúp Lan, cho Minh nửa cục tẩy', 'gọt bút chì giúp Lan, cho Minh nửa cục tẩy, trực nhật giúp các bạn bị mệt'],
          ans: 2,
          quote: ['Em gọt bút chì giúp bạn Lan', 'Em cho bạn Minh nửa cục tẩy', 'em làm trực nhật giúp các bạn bị mệt'],
          why: 'Đoạn đầu kể ba việc tốt của Na: gọt bút chì giúp Lan, cho Minh nửa cục tẩy, làm trực nhật giúp bạn bị mệt. Ý C nêu đủ cả ba, hai ý kia còn thiếu.',
        },
        // sửa: đề gốc hỏi "… Lan chỉ lặng yên?", trong bài người lặng yên là Na (các đáp án cũng nói về Na).
        {
          type: 'choice', q: 'Vì sao khi nghe cả lớp bàn tán về điểm thi và phần thưởng Na chỉ lặng yên?',
          opts: ['Vì Na biết mình học chưa giỏi.', 'Vì Na không tham gia được vào buổi tổng kết.', 'Vì Na là một cô bé tốt bụng, ai cũng mến em.'],
          ans: 0,
          quote: ['Riêng Na chỉ lặng yên nghe các bạn. Em biết mình chưa giỏi môn nào.'],
          why: 'Ngay sau câu Na lặng yên, bài đọc giải thích: em biết mình chưa giỏi môn nào. Na vẫn dự buổi tổng kết, còn tốt bụng thì không phải lí do khiến Na im lặng.',
        },
        {
          type: 'write', q: 'Theo em, điều bí mật được các bạn của Na bàn bạc là gì?', lines: 2,
          sample: 'Theo em, điều bí mật được các bạn bàn bạc là cùng nhau đề nghị cô giáo tặng cho Na một phần thưởng vào buổi tổng kết.',
          tip: 'Đọc đoạn cô giáo trao phần thưởng đặc biệt để đoán điều các bạn bàn bạc.',
        },
        {
          type: 'choice', q: 'Vì sao các bạn và cô giáo muốn trao phần thưởng cho Na?',
          opts: ['Vì Na đã rất nỗ lực trong học tập.', 'Vì lòng tốt của Na dành cho mọi người.', 'Vì Na là người duy nhất không có phần thưởng'],
          ans: 1,
          quote: ['Na học chưa giỏi, nhưng em có tấm lòng thật đáng quý'],
          why: 'Cô giáo nói Na học chưa giỏi nhưng có tấm lòng thật đáng quý, tức là phần thưởng dành cho lòng tốt của Na. Bài không nói Na được thưởng vì học tập hay vì chưa có phần thưởng.',
        },
        {
          type: 'choice', q: 'Câu chuyện Phần thưởng muốn nói với em điều gì?',
          opts: ['Hãy làm việc tốt và giúp đỡ mọi người.', 'Hãy đoàn kết với bạn bè.', 'Hãy cố gắng học tập tốt để nhận được phần thưởng.'],
          ans: 0,
          quote: ['Na là một cô bé tốt bụng. Ở lớp, ai cũng mến em.', 'em có tấm lòng thật đáng quý'],
          why: 'Na hay giúp đỡ bạn nên ai cũng mến và cả lớp tặng em phần thưởng đặc biệt. Câu chuyện khuyên em làm việc tốt, giúp đỡ mọi người. Na được thưởng không phải nhờ học giỏi.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'sort', q: 'Xếp các từ được gạch chân dưới đây vào nhóm thích hợp:',
          text: ['Na không hiểu mình có __nghe__ nhầm không. Đỏ bừng mặt, __cô bé__ đứng dậy __bước__ lên __bục__. Tiếng vỗ tay __vang dậy__. Mẹ của Na __lặng lẽ__ chấm __khăn__ lên __đôi mắt__ __đỏ hoe__.'],
          words: ['nghe', 'cô bé', 'bước', 'bục', 'vang dậy', 'lặng lẽ', 'khăn', 'đôi mắt', 'đỏ hoe'],
          groups: [
            { label: 'Từ ngữ chỉ sự vật', kind: 'sv', words: ['cô bé', 'bục', 'khăn', 'đôi mắt'] },
            { label: 'Từ ngữ chỉ hoạt động', kind: 'hd', words: ['nghe', 'bước'] },
            { label: 'Từ ngữ chỉ đặc điểm', kind: 'dd', words: ['vang dậy', 'lặng lẽ', 'đỏ hoe'] },
          ],
          why: 'Cô bé, bục, khăn, đôi mắt là người và đồ vật. Nghe, bước là việc làm. Vang dậy (tiếng vỗ tay thế nào), lặng lẽ (mẹ chấm khăn thế nào), đỏ hoe (đôi mắt thế nào) là đặc điểm.',
        },
        {
          type: 'write', q: 'Viết tiếp để có câu giới thiệu, câu nêu hoạt động và câu nêu đặc điểm:',
          parts: [
            { label: 'a) Na là …', sample: 'Na là một học sinh ngoan, hay giúp đỡ bạn bè.' },
            { label: 'b) Giờ ra chơi, các bạn trong lớp …', sample: 'Giờ ra chơi, các bạn trong lớp tụ tập bàn về phần thưởng cuối năm học.' },
            { label: 'c) Đôi mắt của mẹ Na …', sample: 'Đôi mắt của mẹ Na đỏ hoe vì xúc động.' },
          ],
          tip: 'a) giới thiệu Na là ai. b) kể các bạn làm gì. c) tả đôi mắt của mẹ thế nào.',
        },
        {
          type: 'write', q: 'Đặt câu kể phù hợp với mỗi tranh sau:', pic: 't9pictures',
          parts: [
            { label: 'a)', sample: 'Các bạn học sinh đang hỏi thăm, an ủi bạn học sinh khó khăn hơn.' },
            { label: 'b)', sample: 'Bạn học sinh nam đang phát vở cho bạn học sinh nữ.' },
          ],
          tip: 'Câu kể kể lại việc các bạn trong tranh đang làm, cuối câu có dấu chấm.',
        },
        {
          type: 'punct', q: 'Điền dấu hai chấm vào vị trí thích hợp:', mark: ':',
          items: [
            'Na đã giúp các bạn trong lớp rất nhiều việc^ gọt bút chì giúp Lan, cho Minh nửa cục tẩy, trực nhật giúp các bạn bị mệt, …',
            'Khi Na bước lên bục nhận thưởng, ai nấy đều mừng vui^ các bạn vỗ tay vang dậy, mẹ Na lặng lẽ chấm khăn lên đôi mắt đỏ hoe.',
          ],
          why: 'Dấu hai chấm đặt trước phần liệt kê hoặc giải thích cho ý đứng trước: "rất nhiều việc" là những việc gì, "mừng vui" thể hiện ra sao.',
        },
      ],
    },
  ],
};
