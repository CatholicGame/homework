// Tuần 16: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-16.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// Ghi chú: đề gốc không có câu 5 (số câu nhảy từ 4 sang 6); app đánh số liên tục nên câu 6, 7, 8 của đề là câu 5, 6, 7 ở đây.
// sửa: bài đọc gốc in nhầm "toàn nhà" (đúng là "tòa nhà"), câu 4 gốc in "chất đặc biết" (đúng là "đặc biệt").
export default {
  id: 'tuan-16', week: 16, topic: 'Ong xây tổ',
  read: {
    title: 'ONG XÂY TỔ', author: 'Tập đọc 3, 1980',
    paras: [
      'Các em hãy xem kìa, một bầy ong đang xây tổ. Lúc đầu chúng bám vào nhau thành từng chuỗi như cái mành mành. Con nào cũng có việc làm. Các chú ong thợ trẻ lần lượt rời khỏi hang lấy giọt sáp dưới bụng do mình tiết ra trộn với nước bọt thành một chất đặc biệt để xây thành tổ. Hết sáp, chú tự rút lui về phía sau để những chú khác tiến lên xây tiếp. Những bác ong thợ già, những anh ong non không có sáp thì dùng sức nóng của mình để sưởi ấm cho những giọt sáp của ong thợ tiết ra. Chất sáp lúc đầu, sau khô đi thành một chất xốp, bền và khó thấm nước.',
      'Cả bầy ong làm việc thật đông vui, nhộn nhịp nhưng con nào cũng biết tuân theo kỉ luật, con nào cũng hết sức tiết kiệm “vôi vữa”.',
      'Chỉ vài ba tháng sau, một tổ ong đã được xây xong. Đó là một tòa nhà vững chãi, ngăn nắp, trật tự, có hàng ngàn căn phòng giống hệt nhau. Cả đàn ong trong tổ là một khối hòa thuận.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        // sửa: đáp án gốc chỉ chọn C; bài đọc cũng cho thấy ong chăm chỉ (con nào cũng có việc làm) và đoàn kết (bám vào nhau, một khối hòa thuận), nên A và C đều đúng.
        {
          type: 'choice', q: 'Qua việc ong xây tổ, ta thấy ong có những đức tính nào?',
          opts: ['chăm chỉ, đoàn kết', 'ngay thẳng', 'có kỉ luật, tiết kiệm'],
          ans: [0, 2],
          quote: ['Con nào cũng có việc làm', 'bám vào nhau thành từng chuỗi', 'con nào cũng biết tuân theo kỉ luật, con nào cũng hết sức tiết kiệm', 'một khối hòa thuận'],
          why: 'Con nào cũng có việc làm cho thấy ong chăm chỉ; ong bám vào nhau, sống thành một khối hòa thuận cho thấy ong đoàn kết; bài còn nói rõ ong tuân theo kỉ luật và tiết kiệm. Bài không nhắc gì đến tính ngay thẳng.',
        },
        {
          type: 'choice', q: 'Hình ảnh nào dùng để tả tổ ong?',
          opts: ['Một tòa nhà vững chãi, ngăn nắp, trật tự, có hàng ngàn căn phòng giống hệt nhau.', 'Một tòa lâu đài nguy nga, lộng lẫy, đầy màu sắc.', 'Một ngôi nhà nhỏ, xinh xắn, đáng yêu với nhiều cửa sổ.'],
          ans: 0,
          quote: ['Đó là một tòa nhà vững chãi, ngăn nắp, trật tự, có hàng ngàn căn phòng giống hệt nhau'],
          why: 'Câu cuối bài tả tổ ong là "một tòa nhà vững chãi, ngăn nắp, trật tự" với hàng ngàn căn phòng giống hệt nhau. Lâu đài lộng lẫy hay ngôi nhà nhỏ xinh không có trong bài.',
        },
        {
          type: 'choice', q: 'Câu văn nào khen cách làm việc của bầy ong?',
          opts: ['Cả bầy ong làm việc thật đông vui, nhộn nhịp nhưng con nào cũng biết tuân theo kỉ luật, con nào cũng hết sức tiết kiệm “vôi vữa”.', 'Cả đàn ong trong tổ là một khối hòa thuận.', 'Các em hãy xem kìa, một bầy ong đang xây tổ.'],
          ans: 0,
          quote: ['Cả bầy ong làm việc thật đông vui, nhộn nhịp'],
          why: 'Câu A nói về cách ong làm việc: đông vui, nhộn nhịp, có kỉ luật, tiết kiệm. Câu B khen ong sống hòa thuận, câu C chỉ giới thiệu bầy ong đang xây tổ.',
        },
        {
          type: 'match', q: 'Nối:',
          left: ['Các bác ong thợ già, những anh ong non', 'Các chú ong thợ trẻ'],
          right: ['lấy giọt sáp dưới bụng do mình tiết ra, trộn với nước bọt thành một chất đặc biệt để xây thành tổ.', 'dùng sức nóng của mình để sưởi ấm cho những giọt sáp của ong thợ tiết ra.'],
          ans: [1, 0],
          quote: ['Các chú ong thợ trẻ lần lượt rời khỏi hang lấy giọt sáp dưới bụng', 'những anh ong non không có sáp thì dùng sức nóng của mình để sưởi ấm'],
          why: 'Ong thợ trẻ có sáp nên lấy sáp ra để xây tổ. Ong thợ già và ong non không có sáp nên dùng sức nóng của mình sưởi ấm cho sáp.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'sx', q: 'Điền s/x vào chỗ chấm: "Chim …áo, chim …ẻ đều được …inh ra từ những chiếc tổ …inh …ắn. Buổi …ớm mùa đông trên núi cao, …ương …uống lạnh thấu …ương."',
          // Tách thành cụm ngắn theo thứ tự trong câu (ô chính tả không chứa được cả câu dài).
          items: ['Chim [s]áo', 'chim [s]ẻ', 'được [s]inh ra', 'tổ [x]inh [x]ắn', 'Buổi [s]ớm', 'núi cao, [s]ương', '[x]uống lạnh', 'thấu [x]ương'],
          why: 'Sáo, sẻ là tên chim, viết s. Sinh ra (ra đời) viết s, xinh xắn (đẹp) viết x. Sớm (buổi sáng) viết s. Sương là những hạt nước nhỏ, viết s; xương là bộ xương trong người, viết x; xuống (đi xuống) viết x.',
        },
        {
          type: 'sort', q: 'Xếp các từ ngữ được gạch chân vào hai nhóm thích hợp: "Lúc đầu chúng bám vào nhau thành từng chuỗi như cái mành mành. Các chú ong thợ trẻ lần lượt rời khỏi hang lấy giọt sáp dưới bụng do mình tiết ra trộn với nước bọt thành một chất đặc biệt để xây thành tổ."',
          words: ['bám', 'chuỗi', 'cái mành mành', 'chú ong thợ', 'rời khỏi', 'hang', 'lấy', 'giọt sáp', 'bụng', 'tiết ra', 'trộn', 'nước bọt', 'xây', 'tổ'],
          groups: [
            { label: 'Từ ngữ chỉ hoạt động', kind: 'hd', words: ['bám', 'rời khỏi', 'lấy', 'tiết ra', 'trộn', 'xây'] },
            { label: 'Từ ngữ chỉ sự vật', kind: 'sv', words: ['chuỗi', 'cái mành mành', 'chú ong thợ', 'hang', 'giọt sáp', 'bụng', 'nước bọt', 'tổ'] },
          ],
          why: 'Từ chỉ hoạt động trả lời câu hỏi "Làm gì?" (ong bám, rời khỏi, lấy, tiết ra, trộn, xây). Từ chỉ sự vật trả lời câu hỏi "Cái gì? Con gì?" (chuỗi, mành mành, ong thợ, hang, giọt sáp, bụng, nước bọt, tổ).',
        },
        // sửa: câu b) đáp án gốc chép cả câu trong bài; câu hỏi chỉ hỏi "cái gì" nên trả lời gọn: giọt sáp.
        {
          type: 'write', q: 'Dựa vào bài đọc, em viết câu hỏi hoặc câu trả lời cho mỗi câu sau:',
          quote: ['những anh ong non không có sáp thì dùng sức nóng của mình để sưởi ấm cho những giọt sáp', 'lấy giọt sáp dưới bụng do mình tiết ra trộn với nước bọt', 'con nào cũng hết sức tiết kiệm “vôi vữa”', 'Cả bầy ong làm việc thật đông vui'],
          parts: [
            { label: 'a) Những bác ong thợ già, những anh ong non làm gì? Trả lời:', sample: 'Những bác ong thợ già, những anh ong non dùng sức nóng của mình để sưởi ấm cho những giọt sáp của ong thợ tiết ra.' },
            { label: 'b) Các chú ong thợ trẻ lấy cái gì ở dưới bụng mình tiết ra, trộn với nước bọt để xây tổ? Trả lời:', sample: 'Các chú ong thợ trẻ lấy giọt sáp ở dưới bụng mình tiết ra, trộn với nước bọt để xây tổ.' },
            { label: 'c) Hỏi: …? Trả lời: Cả bầy ong lúc nào cũng hết sức tiết kiệm vôi vữa.', sample: 'Cả bầy ong lúc nào cũng hết sức tiết kiệm cái gì?' },
            { label: 'd) Hỏi: …? Trả lời: Cả bầy ong làm việc thật đông vui.', sample: 'Cả bầy ong làm việc như thế nào?' },
          ],
          tip: 'Câu a, b: trả lời đúng vào chỗ được hỏi (làm gì, cái gì). Câu c, d: thay phần in đậm (vôi vữa, làm việc thật đông vui) bằng từ để hỏi (cái gì, như thế nào) và kết thúc bằng dấu chấm hỏi.',
        },
      ],
    },
  ],
};
