// Tuần 1: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-01.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-1', week: 1, topic: 'Mùa thu của em',
  read: {
    title: 'MÙA THU CỦA EM', author: 'Quang Huy',
    poem: [
      ['Mùa thu của em', 'Là vàng hoa cúc', 'Như nghìn con mắt', 'Mở nhìn trời êm.'],
      ['Mùa thu của em', 'Là xanh cốm mới', 'Mùi hương như gợi', 'Từ màu lá sen.'],
      ['Mùa thu của em', 'Rước đèn họp bạn', 'Hội rằm tháng Tám', 'Chị Hằng xuống xem.'],
      ['Ngôi trường thân quen', 'Bạn thầy mong đợi', 'Lật trang vở mới', 'Em vào mùa thu.'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Những sự vật được tả trong bài thơ gắn với mùa thu là:',
          opts: ['hoa cúc, cốm, lá sen', 'hoa cúc, cốm, đèn ông sao', 'hoa cúc, lá sen, đèn ông sao', 'hoa cúc, cốm, lá sen, đèn ông sao'],
          ans: 3,
          quote: ['vàng hoa cúc', 'xanh cốm mới', 'màu lá sen', 'Rước đèn họp bạn'],
          why: 'Bài thơ nhắc đủ bốn sự vật: hoa cúc (khổ 1), cốm và lá sen (khổ 2), đèn rước đêm rằm tháng Tám, tức đèn ông sao (khổ 3). Các ý khác thiếu ít nhất một sự vật.',
        },
        {
          type: 'choice', q: 'Những niềm vui được bạn nhỏ mong chờ khi đến mùa thu là:',
          opts: ['Bạn nhỏ được đi rước đèn ông sao cùng với các bạn', 'Bạn nhỏ được tựu trường, gặp lại thầy cô giáo và các bạn sau mùa hè', 'Cả hai đáp án trên đều đúng'],
          ans: 2,
          quote: ['Rước đèn họp bạn', 'Ngôi trường thân quen', 'Bạn thầy mong đợi', 'Lật trang vở mới'],
          why: 'Khổ 3 kể niềm vui rước đèn cùng bạn, khổ 4 kể niềm vui trở lại trường gặp bạn, gặp thầy. Cả hai niềm vui đều có trong bài nên chọn "Cả hai đáp án trên đều đúng".',
        },
        {
          type: 'choice', q: 'Cốm là:',
          opts: ['món ăn làm từ thóc nếp non rang chín, có màu xanh', 'món ăn làm từ thóc nếp non rang chín, giã sạch vỏ, có màu xanh và hương thơm (cốm thường được gói trong lá sen)'],
          ans: 1,
          quote: ['Là xanh cốm mới', 'Mùi hương như gợi', 'Từ màu lá sen'],
          why: 'Bài thơ tả cốm có màu xanh, có mùi hương và gắn với lá sen. Ý B nói đủ các điều đó (giã sạch vỏ, màu xanh, hương thơm, gói trong lá sen), còn ý A thiếu.',
        },
        {
          type: 'write', q: 'Viết 2 – 3 câu chia sẻ những điều em thích nhất của mùa thu:', lines: 3,
          sample: 'Mùa thu đến, em rất thích ngắm nhìn những bông hoa cúc vàng tươi, thưởng thức hương cốm mới. Em vui vẻ đi rước đèn cùng các bạn trong xóm. Càng vui hơn khi em được gặp lại thầy cô, bạn bè sau những ngày nghỉ hè.',
          tip: 'Nói rõ em thích điều gì (hoa cúc, cốm, rước đèn, ngày khai trường…) và vì sao em thích.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'ck', q: 'Điền c/k vào chỗ chấm để tạo từ hoàn chỉnh:',
          items: ['[k]im [c]ương', '[k]ính [c]ận', '[c]ánh [c]ửa', '[k]ì nhông', '[k]iềm chế', '[k]ì [c]ọ', '[c]ảm [c]úm', '[k]èm [c]ặp'],
        },
        {
          type: 'underline', q: 'Gạch 1 gạch dưới từ ngữ chỉ sự vật, 2 gạch dưới từ ngữ chỉ hoạt động có trong các câu thơ dưới đây:',
          marks: [{ n: 1, kind: 'sv' }, { n: 2, kind: 'hd' }],
          lines: ['Ngôi trường thân quen', 'Bạn thầy mong đợi', 'Lật trang vở mới', 'Em vào mùa thu.'],
          ans: { 1: ['Ngôi trường', 'Bạn', 'thầy', 'trang vở'], 2: ['mong đợi', 'Lật', 'vào'] },
          ok: ['Em', 'mùa thu'],
          why: 'Ngôi trường, bạn, thầy, trang vở là người và đồ vật (trả lời câu hỏi "Ai? Cái gì?"). Mong đợi, lật, vào là việc làm (trả lời câu hỏi "Làm gì?"). "Em" và "mùa thu" gạch hay không đều được.',
        },
        {
          type: 'write', q: 'Quan sát tranh các bạn đang vui chơi.', pic: 'playground',
          parts: [
            { label: 'a) Tìm và viết lại ít nhất 5 từ ngữ chỉ sự vật.', sample: 'cầu trượt, quả bóng rổ, quả bóng đá, sợi dây, xe đạp' },
            { label: 'b) Tìm và viết lại ít nhất 5 từ ngữ chỉ hoạt động.', sample: 'đạp xe, nhảy dây, đá bóng, trò chuyện, chơi cầu trượt' },
          ],
          tip: 'Sự vật là người, đồ vật em nhìn thấy trong tranh. Hoạt động là việc các bạn đang làm.',
        },
        {
          type: 'fill', q: 'Viết tiếp vào chỗ chấm để tạo câu giới thiệu và câu nêu hoạt động.',
          items: [
            { pic: 'teacher', t: 'a. Đây là {cô giáo|cô|giáo viên|cô giáo em}. Cô đang {*giảng bài}.' },
            { pic: 'doctor', t: 'b. Bố em là {bác sĩ|bác sỹ}. Bố đang {*khám bệnh}.' },
          ],
          why: 'Câu giới thiệu trả lời "Ai là gì?" (Đây là cô giáo). Câu nêu hoạt động trả lời "Làm gì?" (Cô đang giảng bài).',
        },
        {
          type: 'write', q: 'Viết',
          parts: [
            { label: 'a. Câu nêu hoạt động của em và bạn trong ngày đầu quay lại trường học.', sample: 'Em và các bạn cùng nhau dọn dẹp vệ sinh lớp học.' },
            { label: 'b. Tin nhắn hỏi thăm sức khỏe ông bà.', sample: 'Cháu chào ông bà, ông bà dạo này có khỏe không ạ? Cháu nhớ ông bà nhiều lắm.' },
          ],
        },
      ],
    },
  ],
};
