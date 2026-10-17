// Tuần 5: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-05.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-5', week: 5, topic: 'Ngày khai trường',
  read: {
    title: 'NGÀY KHAI TRƯỜNG', author: 'Nguyễn Bùi Vợi',
    poem: [
      ['Sáng đầu thu trong xanh', 'Em mặc quần áo mới', 'Đi đón ngày khai trường', 'Vui như là đi hội.'],
      ['Gặp bạn cười hớn hở', 'Đứa tay bắt mặt mừng', 'Đứa ôm vai bá cổ', 'Cặp sách đùa trên lưng.'],
      ['Nhìn các thầy các cô', 'Ai cũng như trẻ lại', 'Sân trường vàng nắng mới', 'Lá cờ bay như reo.'],
      ['Từng nhóm đứng đo nhau', 'Thấy bạn nào cũng lớn', 'Năm xưa bé tí teo', 'Giờ lớp ba, lớp bốn.'],
      ['Tiếng trống trường gióng giả', 'Năm học mới đến rồi', 'Chúng em đi vào lớp', 'Khăn quàng bay đỏ tươi.'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Vì sao bạn nhỏ nói ngày khai trường “vui như hội”? (chọn nhiều ý)',
          opts: ['vì được gặp lại bạn bè, thầy cô sau ba tháng nghỉ hè', 'vì được mặc quần áo mới', 'vì được tham gia nhiều trò chơi hay'],
          ans: [0, 1],
          quote: ['Em mặc quần áo mới', 'Vui như là đi hội', 'Gặp bạn cười hớn hở', 'Nhìn các thầy các cô'],
          why: 'Bài thơ kể bạn nhỏ được mặc quần áo mới, được gặp lại bạn bè và thầy cô nên vui như đi hội. Bài không nhắc đến trò chơi nào cả.',
        },
        {
          type: 'choice', q: 'Khổ thơ thứ hai cho em biết điều gì?',
          opts: ['Niềm vui của các bạn học sinh khi có cặp sách mới.', 'Niềm vui của tác giả khi được gặp lại các bạn của mình.', 'Các bạn học sinh rất hiếu động.'],
          ans: 1,
          quote: ['Gặp bạn cười hớn hở', 'Đứa tay bắt mặt mừng', 'Đứa ôm vai bá cổ'],
          why: 'Khổ hai tả lúc gặp lại bạn: cười hớn hở, tay bắt mặt mừng, ôm vai bá cổ. Đó là niềm vui gặp lại bạn bè. "Cặp sách đùa trên lưng" chỉ tả cặp sách nhún nhảy theo bước chân, không nói đến cặp sách mới.',
        },
        {
          type: 'choice', q: 'Trong khổ thơ thứ tư, các bạn làm gì khi gặp lại nhau?',
          opts: ['đo xem ai cao hơn, ai chóng lớn', 'kể cho nhau nghe những chuyện vui trong hè', 'thấy có bạn vẫn bé tí teo'],
          ans: 0,
          quote: ['Từng nhóm đứng đo nhau', 'Thấy bạn nào cũng lớn'],
          why: 'Các bạn "đứng đo nhau" để xem ai cao hơn, và thấy "bạn nào cũng lớn". "Bé tí teo" là nói các bạn năm xưa, bây giờ không còn bé nữa. Khổ thơ không kể chuyện vui trong hè.',
        },
        {
          type: 'choice', q: 'Tiếng trống trường trong khổ thơ cuối thúc giục các bạn học sinh bước vào năm học mới với cảm xúc như thế nào?',
          opts: ['phấn khởi, háo hức', 'lo lắng', 'bồn chồn'],
          ans: 0,
          quote: ['Tiếng trống trường gióng giả', 'Năm học mới đến rồi', 'Khăn quàng bay đỏ tươi'],
          why: 'Tiếng trống vang lên rộn rã, "Năm học mới đến rồi", khăn quàng bay đỏ tươi: các bạn vào lớp với niềm vui háo hức. Cả bài thơ đều vui nên không có cảm giác lo lắng hay bồn chồn.',
        },
        {
          type: 'choice', q: 'Nội dung của bài thơ “Ngày khai trường” là:',
          opts: ['Niềm trăn trở của học sinh trong ngày khai trường.', 'Niềm băn khoăn của học sinh trong ngày khai trường.', 'Niềm vui sướng của học sinh trong ngày khai trường.'],
          ans: 2,
          quote: ['Vui như là đi hội', 'Gặp bạn cười hớn hở'],
          why: 'Khổ nào cũng nói về niềm vui: vui như đi hội, cười hớn hở, lá cờ bay như reo. Trăn trở, băn khoăn là cảm giác lo nghĩ, không có trong bài.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'sort', q: 'Nối song/xong để tạo từ thích hợp:',
          words: ['hành', 'xuôi', 'ca', 'chuyện', 'hỷ', 'song', 'cửa', 'việc'],
          groups: [
            { label: 'song', words: ['hành', 'ca', 'hỷ', 'song', 'cửa'] },
            { label: 'xong', words: ['xuôi', 'chuyện', 'việc'] },
          ],
          why: '"song" nghĩa là hai, cùng nhau (song hành, song ca, song hỷ, song song) hoặc thanh chắn cửa sổ (song cửa). "xong" nghĩa là đã làm hết (xong xuôi, xong chuyện, xong việc).',
        },
        {
          type: 'sort', q: 'Sắp xếp các từ sau vào 3 nhóm tương ứng:',
          words: ['thật thà', 'trắng tinh', 'hài hước', 'thấp bé', 'vui vẻ', 'cân đối', 'ngoan ngoãn', 'vuông vắn', 'mũm mĩm', 'hiền hậu', 'đanh đá', 'vàng tươi', 'keo kiệt', 'béo', 'nâu', 'đen', 'xanh biếc', 'cao lớn', 'xanh dương', 'tròn xoe', 'đo đỏ', 'đỏ tươi', 'tím biếc', 'trắng ngần', 'lùn', 'gầy gò'],
          groups: [
            { label: 'Từ chỉ hình dáng', words: ['thấp bé', 'cân đối', 'vuông vắn', 'mũm mĩm', 'béo', 'cao lớn', 'tròn xoe', 'lùn', 'gầy gò'] },
            { label: 'Từ chỉ màu sắc', words: ['trắng tinh', 'vàng tươi', 'nâu', 'đen', 'xanh biếc', 'xanh dương', 'đo đỏ', 'đỏ tươi', 'tím biếc', 'trắng ngần'] },
            { label: 'Từ chỉ tính tình', words: ['thật thà', 'hài hước', 'vui vẻ', 'ngoan ngoãn', 'hiền hậu', 'đanh đá', 'keo kiệt'] },
          ],
          why: 'Hình dáng là to nhỏ, cao thấp, béo gầy, vuông tròn. Màu sắc là trắng, vàng, xanh, đỏ, tím, nâu, đen. Tính tình là tính nết của người: thật thà, vui vẻ, hiền hậu, keo kiệt…',
          stars: 4,
        },
        {
          type: 'underline', q: 'Gạch dưới từ ngữ chỉ đặc điểm có trong mỗi câu văn dưới đây:',
          marks: [{ n: 1, kind: 'dd' }],
          prose: true,
          lines: [
            'a) Cây bỏng lá dày như chiếc bánh quy.',
            'Hoa của nó treo lủng là lủng lẳng từng chùm như những chiếc đèn lồng xanh xanh hồng hồng nhỏ xíu, xinh ơi là xinh!',
            'b) Cánh rừng mùa đông trơ trụi.',
            'Những thân cây khẳng khiu vươn nhành cành khô xơ xác trên nền trời xám xịt.',
          ],
          ans: { 1: ['dày', 'lủng là lủng lẳng', 'xanh xanh', 'hồng hồng', 'nhỏ xíu', 'xinh', 'xinh#2', 'trơ trụi', 'khẳng khiu', 'khô', 'xơ xác', 'xám xịt'] },
          ok: ['ơi là'],
          why: 'Từ chỉ đặc điểm trả lời câu hỏi "Thế nào?": lá thế nào (dày), hoa treo thế nào (lủng là lủng lẳng), đèn lồng thế nào (xanh xanh, hồng hồng, nhỏ xíu, xinh), rừng thế nào (trơ trụi), thân cây thế nào (khẳng khiu), cành thế nào (khô, xơ xác), trời thế nào (xám xịt).',
        },
        {
          // sửa: đáp án gốc phần b có "đi hội" ("Vui như là đi hội" là hình ảnh so sánh, không phải việc bạn nhỏ làm), thay bằng ôm, đo.
          type: 'write', q: 'Tìm trong bài thơ “Ngày khai trường”:',
          parts: [
            { label: 'a) 6 từ ngữ chỉ đặc điểm:', sample: 'trong xanh, mới, vui, hớn hở, trẻ, vàng' },
            { label: 'b) 6 từ ngữ chỉ hoạt động:', sample: 'mặc, đi đón, cười, bắt, ôm, đo' },
          ],
          tip: 'Từ chỉ đặc điểm trả lời câu hỏi "Thế nào?" (trời trong xanh, áo mới). Từ chỉ hoạt động trả lời câu hỏi "Làm gì?" (mặc, cười, đi vào lớp).',
        },
        {
          // sửa: câu mẫu gốc dùng từ của bài tập 9 (trong xanh, hớn hở); đề hỏi từ ở bài tập 8 nên đổi câu mẫu.
          type: 'write', q: 'Đặt 2 câu với các từ chỉ đặc điểm em tìm được ở bài tập 8.',
          parts: [
            { label: 'a) Câu thứ nhất', sample: 'Bầu trời hôm nay xám xịt, sắp có mưa rồi.' },
            { label: 'b) Câu thứ hai', sample: 'Chú mèo con nhà em nhỏ xíu, xinh ơi là xinh!' },
          ],
          tip: 'Chọn một từ ở bài tập 8 (dày, nhỏ xíu, khẳng khiu, xám xịt…) rồi nói sự vật nào có đặc điểm ấy.',
        },
      ],
    },
  ],
};
