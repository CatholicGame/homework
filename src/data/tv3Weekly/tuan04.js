// Tuần 4: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-04.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// sửa (bài đọc): "“ tội nghiệp" → "“Tội nghiệp", "vừa đi vửa gọi" → "vừa đi vừa gọi" (lỗi gõ của trang gốc).
export default {
  id: 'tuan-4', week: 4, topic: 'Hai mẹ con bà tiên',
  read: {
    title: 'HAI MẸ CON BÀ TIÊN', author: 'Sưu tầm',
    paras: [
      'Ngày xưa, ở làng kia, có hai mẹ con cô bé sống trong một túp lều. Họ phải làm lụng vất vả quanh năm mới đủ ăn.',
      'Một hôm, người mẹ không may bị bệnh nặng. Cô bé ngày đêm chăm sóc mẹ, nhưng bệnh mẹ mỗi ngày một nặng thêm. Có người mách:',
      '- Ở vùng bên có ông thầy thuốc giỏi chữa được bệnh này.',
      'Cô bé nhờ bà con hàng xóm trông nom mẹ, ngay hôm ấy lên đường.',
      'Vừa đi, cô bé hiếu thảo vừa lo mấy đồng bạc mang theo không đủ trả tiền thuốc cho mẹ. Bỗng cô thấy bên đường có vật gì như chiếc tay nải ai bỏ quên.',
      'Cô bé nhặt tay nải lên. Miệng túi không hiểu sao lại mở. Cô bé thoáng thấy bên trong có những thỏi vàng lấp lánh. Cô mừng rỡ reo lên: “Mình có tiền mua thuốc cho mẹ rồi!”. Ngẩng đầu lên, cô chợt thấy phía xa có bóng một bà cụ lưng còng đang đi chầm chậm. Cô bé đoán đây là tay nải của bà cụ. Cô bé nghĩ: “Tội nghiệp cho bà cụ, mất chiếc tay nải này chắc buồn và tiếc lắm. Mình không nên lấy của cụ”. Nghĩ vậy, cô bé bèn rảo bước nhanh đuổi theo bà cụ, vừa đi vừa gọi:',
      '- Bà ơi, có phải chiếc tay nải này là của bà để quên không?',
      'Bà lão cười hiền hậu:',
      '- Khen cho con hiếu thảo lại thật thà. Ta chính là tiên thử lòng con đấy thôi. Con thật đáng được giúp đỡ. Hãy đưa ta về nhà chữa bệnh cho mẹ con.',
      'Thế là người mẹ được chữa khỏi bệnh. Mẹ con họ lại sống hạnh phúc bên nhau.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Hai mẹ con cô bé sống trong hoàn cảnh như thế nào?',
          opts: ['giàu sang, sung sướng', 'vất vả, nghèo khó', 'đầy đủ, đáng mơ ước'],
          ans: 1,
          quote: ['sống trong một túp lều', 'làm lụng vất vả quanh năm mới đủ ăn'],
          why: 'Hai mẹ con ở trong túp lều, làm lụng vất vả quanh năm mới đủ ăn, tức là rất nghèo khó. Vì thế không thể nói là giàu sang hay đầy đủ.',
        },
        {
          // sửa: đề gõ "bệnh năng", đúng là "bệnh nặng".
          type: 'choice', q: 'Khi mẹ bị bệnh nặng, cô bé đã làm gì?',
          opts: ['Ngày đêm chăm sóc mẹ.', 'Đi tìm thầy thuốc giỏi chữa bệnh cho mẹ.', 'Tất cả những việc làm trên.'],
          ans: 2,
          quote: ['Cô bé ngày đêm chăm sóc mẹ', 'ngay hôm ấy lên đường'],
          why: 'Cô bé vừa ngày đêm chăm sóc mẹ, vừa lên đường đi tìm ông thầy thuốc giỏi ở vùng bên. Cô làm cả hai việc nên chọn "Tất cả những việc làm trên".',
        },
        {
          type: 'choice', q: 'Vì sao bà tiên lại nói: “Khen cho con đã hiếu thảo lại thật thà?”',
          opts: ['Vì cô bé trả lại tay nải cho bà.', 'Vì cô hết lòng chăm sóc mẹ ốm, tìm người chữa chạy cho mẹ và lại không tham của rơi.', 'Vì cô bé ngoan ngoãn, không tham của rơi.'],
          ans: 1,
          quote: ['Cô bé ngày đêm chăm sóc mẹ', 'Mình không nên lấy của cụ', 'Khen cho con hiếu thảo lại thật thà'],
          why: 'Bà tiên khen hai điều: hiếu thảo (hết lòng chăm sóc, tìm thầy chữa bệnh cho mẹ) và thật thà (trả lại tay nải vàng, không tham của rơi). Ý A và C chỉ nói đến thật thà, thiếu phần hiếu thảo.',
        },
        {
          type: 'choice', q: 'Nội dung câu chuyện là:',
          opts: ['Khuyên người ta nên thật thà.', 'Khuyên người ta nên quan tâm chăm sóc cha, mẹ.', 'Ca ngợi cô bé hiếu thảo và thật thà.'],
          ans: 2,
          quote: ['cô bé hiếu thảo', 'Khen cho con hiếu thảo lại thật thà'],
          why: 'Cả câu chuyện kể về tấm lòng của cô bé: thương mẹ và không tham vàng của người khác. Ý C nói đủ cả hai điều, còn A và B mỗi ý chỉ nói một phần.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'chtr', q: 'Điền ch/tr vào chỗ chấm:',
          // Đề là cả đoạn đối thoại Miệng và Chân; tách thành cụm ngắn theo thứ tự (ô chính tả không chứa được câu dài).
          items: ['Miệng và chân [tr]anh cãi', '[ch]ân nói', 'đi lại [ch]ạy', 'phải [ch]ịu bao điều', 'Miệng từ tốn [tr]ả lời', 'Anh nói [ch]i mà lạ thế!'],
          notes: { 'Anh nói chi mà lạ thế!': 'chi nghĩa là gì (Anh nói gì mà lạ thế), viết <b>ch</b>.' },
          why: 'Đoạn văn: Miệng và chân tranh cãi rất lâu, chân nói: "Tôi hết đi lại chạy, phải chịu bao điều đau đớn…". Miệng từ tốn trả lời: "Anh nói chi mà lạ thế!…". Các từ tranh cãi, chân, chạy, chịu, trả lời em ghi nhớ cách viết.',
        },
        {
          type: 'underline', q: 'Gạch dưới từ ngữ chỉ đặc điểm thời tiết hoặc sự vật tiêu biểu của mùa hè có trong đoạn văn dưới đây:',
          marks: [{ n: 1, label: 'đặc điểm thời tiết, sự vật của mùa hè' }],
          prose: true,
          lines: [
            'Mùa hạ năm nay đến muộn nhưng không vì thế mà cái oi nồng, nóng bức lại dịu đi.',
            'Thậm chí có những hôm, trận mưa rào xối xả cũng không thể cuốn trôi được hơi nóng trong bầu không khí.',
            'He hé cánh cửa sổ, Ngát thấy chùm hoa phượng nở đầu tiên vẫn chưa phai sắc.',
            'Được nghỉ hè đã hai tuần rồi nhưng ngắm sắc đỏ của phượng hòa cùng ánh nắng chói chang khiến cho Ngát tưởng như ngày mai em sẽ tung tăng đến tham dự buổi tổng kết cuối năm học.',
          ],
          ans: { 1: ['oi nồng', 'nóng bức', 'trận mưa rào', 'hơi nóng', 'chùm hoa phượng', 'sắc đỏ của phượng', 'ánh nắng chói chang', 'buổi tổng kết cuối năm học'] },
          ok: ['Mùa hạ', 'xối xả', 'nghỉ hè', 'nở'],
          why: 'Thời tiết mùa hè: oi nồng, nóng bức, hơi nóng, nắng chói chang, những trận mưa rào. Sự vật chỉ có vào mùa hè: hoa phượng đỏ, buổi tổng kết cuối năm học.',
        },
        {
          // sửa: câu a đề gõ "trở lên", đúng là "trở nên"; câu b thêm dấu phẩy giữa "lê-ki-ma, măng cụt" cho đúng dãy liệt kê.
          type: 'punct', mark: ':', q: 'Điền dấu hai chấm vào vị trí thích hợp trong mỗi câu sau:',
          items: [
            'a) Cơn mưa rào làm cho mọi thứ trên đường phố trở nên sạch đẹp hơn^ con đường bóng loáng, cây cối xanh mướt, không khí trong lành,...',
            'b) Vùng Hòn với những vòm lá với đủ các loại cây trái^ mít, dừa, cau, mãng cầu, lê-ki-ma, măng cụt sum sê nhẫy nhượt.',
            'c) Những cảnh tuyệt đẹp của đất nước dần hiện ra^ cánh đồng với những đàn trâu thung thăng gặm cỏ, dòng sông với những đoàn thuyền ngược xuôi…',
          ],
          why: 'Dấu hai chấm đặt trước phần liệt kê, để kể ra những thứ vừa nhắc tới: mọi thứ sạch đẹp hơn gồm những gì, các loại cây trái là cây gì, những cảnh đẹp là cảnh nào.',
        },
      ],
    },
  ],
};
