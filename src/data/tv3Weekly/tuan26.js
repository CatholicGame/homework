// Tuần 26: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-26.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-26', week: 26, topic: 'Kiến và chim bồ câu',
  read: {
    title: 'KIẾN VÀ CHIM BỒ CÂU',
    poem: [
      ['Chú Kiến nọ ra sông chảy xiết', 'Uống thật nhiều cho hết khát khô.', 'Nào ngờ sóng cuốn khỏi bờ', 'Ngoi lên chìm xuống chỉ chờ cá xơi.'],
      ['Bồ Câu đậu ngay nơi cành lả', 'Liền ngắt một chiếc lá thả rơi.', 'Theo dòng lá lướt tới nơi', 'Kiến leo lên, an toàn trôi vào bờ.'],
      ['Sau đó thì bất ngờ xuất hiện', 'Người bẫy chim cạnh kiến đang bò.', 'Bác cầm cục đá vôi to', 'Giơ lên nhằm ném vào bồ câu kia.'],
      ['Kiến hiểu rõ chuyện gì chờ đón', 'Nên cắn ngay vào ngón chân người.', 'Giật mình, bác ta đánh rơi', 'Đá tòm xuống nước, chim thời bay đi.'],
      ['Làm điều tốt sẽ thường khi', 'Nhận về việc tốt, nhớ ghi điều này.'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Kiến đã gặp phải điều không may gì?',
          opts: ['Kiến ra sông uống nước và bị sóng cuốn khỏi bờ.', 'Kiến ra sông uống nước và bị quên đường về.', 'Kiến ra sông uống nước và bị đàn cá đuổi bắt.'],
          ans: 0,
          quote: ['Nào ngờ sóng cuốn khỏi bờ', 'Ngoi lên chìm xuống chỉ chờ cá xơi'],
          why: 'Kiến ra sông uống nước thì bị sóng cuốn khỏi bờ. "Chỉ chờ cá xơi" nghĩa là Kiến có thể bị cá ăn, chứ chưa có đàn cá nào đuổi bắt. Bài không nói Kiến quên đường.',
        },
        {
          type: 'choice', q: 'Bồ Câu đã cứu giúp Kiến bằng cách nào?',
          opts: ['sà xuống quắp Kiến lên', 'thả chiếc lá xuống cho Kiến leo lên', 'gọi người đến cứu Kiến'],
          ans: 1,
          quote: ['Liền ngắt một chiếc lá thả rơi', 'Kiến leo lên, an toàn trôi vào bờ'],
          why: 'Bồ Câu ngắt một chiếc lá thả xuống sông, Kiến leo lên lá và trôi vào bờ an toàn. Bồ Câu không sà xuống quắp Kiến, cũng không gọi ai.',
        },
        {
          type: 'choice', q: 'Kiến đã giúp bồ câu thoát nạn bằng cách nào?',
          opts: ['bò đi chỗ khác đánh lạc hướng người bẫy chim', 'gọi các bạn khác đến giúp Bồ Câu', 'cắn bất ngờ vào chân người bẫy chim cho hòn đá rơi xuống nước'],
          ans: 2,
          quote: ['Nên cắn ngay vào ngón chân người', 'Đá tòm xuống nước, chim thời bay đi'],
          why: 'Kiến cắn vào ngón chân người bẫy chim, bác ta giật mình đánh rơi hòn đá xuống nước, nhờ vậy Bồ Câu bay đi. Kiến không bò đi chỗ khác hay gọi bạn.',
        },
        {
          type: 'write', q: 'Bài thơ muốn nói với em điều gì?', lines: 3,
          quote: ['Làm điều tốt sẽ thường khi', 'Nhận về việc tốt, nhớ ghi điều này'],
          sample: 'Bài thơ nói với em về sự đền ơn đáp nghĩa. Nếu mình nhận được sự giúp đỡ từ người khác thì phải trả ơn cho họ. Làm điều tốt cho người khác thì sẽ nhận lại điều tốt.',
          tip: 'Đọc hai dòng cuối bài thơ, rồi nghĩ: Bồ Câu giúp Kiến, sau đó Kiến đã làm gì cho Bồ Câu?',
        },
        {
          type: 'write', q: 'Kể về việc em đã giúp đỡ người khác hoặc người khác giúp đỡ em.', lines: 3,
          sample: 'Trong một lần em đi học muộn, bạn Trang đã trực nhật giúp em. Em rất cảm ơn bạn và hôm sau em trực nhật giúp lại bạn.',
          tip: 'Kể rõ: ai giúp ai, giúp việc gì, lúc nào, và em cảm thấy thế nào.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        // sửa: đáp án gốc phần b ghi "tiếng giao", đúng là "tiếng rao" (tiếng người bán hàng rao).
        {
          type: 'spell', rule: 'rdgi', q: 'a) Chọn rang/giang/dang điền vào chỗ chấm để tạo từ. b) Chọn rao/dao/giao điền vào chỗ chấm để tạo từ.',
          items: ['cơm [r]ang', '[gi]ang sơn', '[d]ang cánh', 'giỏi [gi]ang', '[r]ang lạc', 'cây [gi]ang',
            'con [d]ao', 'tiếng [r]ao', 'bạn tâm [gi]ao', 'cầu [d]ao', 'bàn [gi]ao', '[r]ao bán'],
          notes: {
            'cơm rang': 'viết <b>r</b>: rang là đảo đồ ăn trong chảo nóng cho chín (cơm rang, rang lạc).',
            'rang lạc': 'viết <b>r</b>: rang là đảo đồ ăn trong chảo nóng cho chín (cơm rang, rang lạc).',
            'giang sơn': 'viết <b>gi</b>: giang nghĩa là sông, giang sơn là sông núi, đất nước.',
            'dang cánh': 'viết <b>d</b>: dang là mở rộng ra (dang tay, dang cánh).',
            'giỏi giang': 'viết <b>gi</b>: giỏi giang là giỏi, làm được nhiều việc, cần ghi nhớ.',
            'cây giang': 'viết <b>gi</b>: cây giang là một loại cây giống tre, nứa, cần ghi nhớ.',
            'con dao': 'viết <b>d</b>: con dao là đồ dùng để cắt, thái (cầu dao cũng viết d).',
            'cầu dao': 'viết <b>d</b>: cầu dao là cái để đóng, ngắt điện, cần ghi nhớ.',
            'tiếng rao': 'viết <b>r</b>: rao là nói to cho mọi người biết để bán hàng (tiếng rao, rao bán).',
            'rao bán': 'viết <b>r</b>: rao là nói to cho mọi người biết để bán hàng (tiếng rao, rao bán).',
            'bạn tâm giao': 'viết <b>gi</b>: giao là qua lại, kết bạn với nhau; bạn tâm giao là bạn hiểu lòng nhau.',
            'bàn giao': 'viết <b>gi</b>: giao là trao cho người khác (giao việc, bàn giao).',
          },
          why: 'Rang (làm chín trong chảo), rao (nói to để bán hàng) viết r. Dang (mở rộng), dao (đồ dùng để cắt) viết d. Giang (sông), giao (trao, qua lại) viết gi.',
          stars: 3,
        },
        {
          type: 'match', q: 'Nối ý ở cột A với ý ở cột B để tạo câu:',
          left: ['Mai khoanh tay và cúi đầu chào', 'Nam vẫy tay, miệng mỉm cười', 'Việt lịch sự bắt tay'],
          right: ['khi tạm biệt chị gái.', 'khi nhìn thấy cô giáo.', 'khi gặp người bạn quốc tế tới thăm trường.'],
          ans: [1, 0, 2],
          why: 'Gặp cô giáo (người lớn) thì khoanh tay, cúi đầu chào lễ phép. Tạm biệt chị gái (người thân) thì vẫy tay, mỉm cười. Gặp khách nước ngoài thì bắt tay lịch sự.',
        },
        {
          // sửa: đề in "tuori", đúng là "tuổi".
          type: 'fill', q: 'Chọn từ đúng với nghĩa: (lịch sự, cởi mở, lễ phép)',
          items: [
            { t: 'a. cách giao tiếp chân thành và hồn nhiên là {cởi mở}' },
            { t: 'b. có lời nói, hành động đẹp trong giao tiếp là {lịch sự}' },
            { t: 'c. thái độ cư xử kính trọng với người lớn tuổi hơn là {lễ phép}' },
          ],
          why: 'Cởi mở là dễ gần, nói chuyện chân thành, hồn nhiên. Lịch sự là nói năng, cư xử đẹp với mọi người. Lễ phép là kính trọng người lớn tuổi hơn mình.',
        },
        {
          type: 'write', q: 'Đặt câu với mỗi từ ngữ ở bài tập 8 (đặt trong hoàn cảnh giao tiếp).',
          parts: [
            { label: 'a) lịch sự', sample: 'Dù trong hoàn cảnh nào, chúng em cũng đều phải cư xử lịch sự.' },
            { label: 'b) cởi mở', sample: 'Vì bạn Lan rất cởi mở nên mọi người đều yêu quý bạn ấy.' },
            { label: 'c) lễ phép', sample: 'Mỗi khi gặp cô giáo, chúng em đều lễ phép chào.' },
          ],
          tip: 'Mỗi câu nói về một lúc em nói chuyện, chào hỏi với ai đó (thầy cô, bạn bè, người thân, khách).',
        },
      ],
    },
  ],
};
