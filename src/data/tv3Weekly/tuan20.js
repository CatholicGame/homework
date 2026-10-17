// Tuần 20: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-20.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-20', week: 20, topic: 'Mưa',
  read: {
    title: 'MƯA', author: 'Trần Đăng Khoa (trích)',
    poem: [
      ['Sắp mưa', 'Sắp mưa', 'Những con mối', 'Bay ra', 'Mối trẻ', 'Bay cao', 'Mối già', 'Bay thấp', 'Gà con', 'Rối rít tìm nơi', 'Ẩn nấp',
        'Ông trời', 'Mặc áo giáp đen', 'Ra trận', 'Muôn nghìn cây mía', 'Múa gươm', 'Kiến', 'Hành quân', 'Đầy đường'],
      ['Lá khô', 'Gió cuốn', 'Bụi bay', 'Cuồn cuộn', 'Cỏ gà rung tai', 'Nghe', 'Bụi tre', 'Tần ngần', 'Gỡ tóc', 'Hàng bưởi', 'Đu đưa',
        'Bế lũ con', 'Đầu tròn', 'Trọc lốc', 'Chớp', 'Rạch ngang trời', 'Khô khốc'],
      ['Sấm', 'Ghé xuống sân', 'Khanh khách', 'Cười', 'Cây dừa', 'Sải tay', 'Bơi', 'Ngọn mùng tơi', 'Nhảy múa', 'Mưa', 'Mưa',
        'Ù ù như xay lúa', 'Lộp bộp', 'Lộp bộp…', 'Rơi', 'Rơi…'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          // sửa: đáp án gốc chọn cả C; bưởi là cây, không phải loài vật, nên chỉ chọn A, B, D.
          type: 'choice', q: 'Các loài vật báo hiệu trời sắp mưa bằng những hoạt động nào? (chọn nhiều ý)',
          opts: ['Mối thi nhau bay ra.', 'Gà con tìm nơi ẩn nấp.', 'Bưởi bế lũ con đu đưa.', 'Kiến hành quân (đi) đầy đường.'],
          ans: [0, 1, 3],
          quote: ['Những con mối', 'Bay ra', 'Rối rít tìm nơi', 'Ẩn nấp', 'Hành quân', 'Đầy đường'],
          why: 'Những loài vật trong bài là mối, gà con và kiến: mối bay ra, gà con tìm nơi ẩn nấp, kiến hành quân đầy đường. Hàng bưởi là cây, không phải con vật, nên không chọn C.',
        },
        {
          type: 'fill', q: 'Viết tiếp hoạt động của sự vật:',
          items: [
            { t: '- Ông trời {mặc áo giáp đen|mặc áo giáp đen ra trận|mặc áo giáp đen, ra trận}' },
            { t: '- Cây mía {múa gươm}' },
            { t: '- Cây dừa {sải tay bơi|sải tay, bơi|sải tay}' },
            { t: '- Lá khô {gió cuốn|bị gió cuốn}' },
            { t: '- Bụi tre {tần ngần gỡ tóc|tần ngần, gỡ tóc|gỡ tóc}' },
            { t: '- Hàng bưởi {đu đưa bế lũ con đầu tròn trọc lốc|đu đưa bế lũ con|đu đưa, bế lũ con|đu đưa, bế lũ con đầu tròn trọc lốc|bế lũ con|đu đưa}' },
          ],
          quote: ['Mặc áo giáp đen', 'Múa gươm', 'Gió cuốn', 'Gỡ tóc', 'Bế lũ con', 'Sải tay'],
          why: 'Mỗi sự vật trong bài được tả hoạt động như con người: ông trời mặc áo giáp đen ra trận, cây mía múa gươm, cây dừa sải tay bơi, lá khô bị gió cuốn, bụi tre tần ngần gỡ tóc, hàng bưởi đu đưa bế lũ con.',
        },
        {
          type: 'underline', q: 'Tìm các từ ngữ miêu tả âm thanh có trong khổ 3 (gạch dưới):',
          marks: [{ n: 1, label: 'từ ngữ miêu tả âm thanh' }],
          lines: ['Sấm', 'Ghé xuống sân', 'Khanh khách', 'Cười', 'Cây dừa', 'Sải tay', 'Bơi', 'Ngọn mùng tơi', 'Nhảy múa', 'Mưa', 'Mưa',
            'Ù ù như xay lúa', 'Lộp bộp', 'Lộp bộp…', 'Rơi', 'Rơi…'],
          ans: { 1: ['Khanh khách', 'Ù ù', 'Lộp bộp', 'Lộp bộp#2'] },
          ok: ['như xay lúa'],
          quote: ['Khanh khách', 'Ù ù như xay lúa', 'Lộp bộp'],
          why: 'Tiếng sấm cười khanh khách, tiếng mưa ù ù như xay lúa, hạt mưa rơi lộp bộp: đó là những từ tả âm thanh, đọc lên như nghe thấy tiếng. "Cười", "Rơi" là hoạt động.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'underline', q: 'Gạch dưới từ có nghĩa giống nhau trong các câu sau:',
          marks: [{ n: 1, label: 'từ có nghĩa giống nhau' }],
          lines: [
            'a) Bầm ơi, liền khúc ruột mềm', 'Có con có mẹ, còn thêm đồng bào.',
            'b) Chim bắt đầu vội vã', 'Có đám mây mùa hạ', 'Cũng vội vàng sang thu.',
            'c) Vào đây con cá diếc', 'Hay vơ vẩn rong chơi', 'Nhung nhăng khoe áo trắng', 'Và nhẩn nha rỉa mồi.',
          ],
          ans: { 1: ['Bầm', 'mẹ', 'vội vã', 'vội vàng', 'vơ vẩn', 'nhẩn nha'] },
          why: 'Từ có nghĩa giống nhau là những từ khác tiếng nhưng cùng nghĩa: "bầm" là tiếng gọi mẹ ở một số vùng quê; "vội vã" và "vội vàng" đều là làm gấp, nhanh; "vơ vẩn" và "nhẩn nha" đều là thong thả, không vội.',
        },
        {
          type: 'underline', q: 'Gạch dưới bộ phận trả lời cho câu hỏi Khi nào?',
          marks: [{ n: 1, label: 'bộ phận trả lời câu hỏi Khi nào?' }],
          prose: true,
          lines: [
            'a) Ban sáng, lộc cây vừa mới nhú.', 'Lá non còn cuộn tròn trong búp, chỉ hơi hé nở.', 'Đến trưa, lá đã xoè tung.',
            'Sáng hôm sau, lá đã xanh đậm lẫn vào màu xanh bình thường của các loài cây khác.',
            'b) Người Tày, Nùng thường múa sư tử vào các dịp lễ hội mừng xuân.',
            'c) Tháng năm, bầu trời giống như chiếc chảo khổng lồ bị nung nóng úp chụp vào xóm làng.',
          ],
          ans: { 1: ['Ban sáng', 'Đến trưa', 'Sáng hôm sau', 'vào các dịp lễ hội mừng xuân', 'Tháng năm'] },
          ok: ['thường'],
          why: 'Bộ phận trả lời câu hỏi "Khi nào?" chỉ thời gian: ban sáng, đến trưa, sáng hôm sau, vào các dịp lễ hội mừng xuân, tháng năm. Thử hỏi: "Khi nào lộc cây vừa mới nhú?", "Ban sáng."',
        },
        {
          type: 'write', q: 'Đặt câu hỏi cho bộ phận in đậm trong mỗi câu sau:',
          text: [
            'a. **Sáng mồng Một**, em cùng ba mẹ đi chúc Tết ông bà nội, ngoại.',
            'b. **Đúng bảy giờ tối**, gia đình em lại quây quần bên mâm cơm.',
            'c. **Nghỉ hè,** em được về quê thăm bà.',
            'd) Bác Hồ đọc bản Tuyên ngôn độc lập **vào ngày 2 tháng 9 năm 1945.**',
          ],
          parts: [
            { label: 'a.', sample: 'Hôm nào, em cùng ba mẹ đi chúc Tết ông bà nội, ngoại?' },
            { label: 'b.', sample: 'Gia đình em quây quần bên mâm cơm lúc mấy giờ?' },
            { label: 'c.', sample: 'Khi nào em được về quê thăm bà?' },
            { label: 'd)', sample: 'Bác Hồ đọc bản Tuyên ngôn độc lập vào ngày tháng năm nào?' },
          ],
          tip: 'Phần in đậm chỉ thời gian, nên thay nó bằng từ để hỏi như khi nào, hôm nào, lúc mấy giờ, ngày tháng năm nào, rồi kết thúc câu bằng dấu chấm hỏi.',
        },
      ],
    },
  ],
};
