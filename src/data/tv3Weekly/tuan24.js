// Tuần 24: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-24.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// Đề gốc không có câu 6 (đánh số 1–5 rồi 7–10); app đánh số liên tục.
export default {
  id: 'tuan-24', week: 24, topic: 'Đàn chim sẻ',
  read: {
    title: 'ĐÀN CHIM SẺ', author: 'Phạm Hổ',
    poem: [
      ['Giữa đường phố vui', 'Hoa đào báo Tết', 'Có bà cụ già', 'Xách bao gạo nếp.'],
      ['Bao không buộc kỹ', 'Nếp đổ trắng đường', 'Gọi nhau, đàn trẻ', 'Ùa ra nhặt giùm.'],
      ['Những bàn tay nhỏ', 'Nhìn dễ thương sao', 'Tíu ta, tíu tít', 'Nhặt vội, nhặt mau.'],
      ['Nếp trở vào bao', 'Như chưa hề đổ', 'Bà cụ tươi cười', 'Nhìn đàn cháu nhỏ', 'Nhìn đàn chim sẻ', 'Truyện “Tấm Cám” xưa', 'Nay thành đông đúc', 'Cháu ngoan Bác Hồ.'],
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Bà cụ gặp chuyện gì khi xách bao gạo nếp của mình?',
          opts: ['bao gạo bị mất', 'bao gạo bị đổ', 'bao gạo bị bỏ quên'],
          ans: 1,
          quote: ['Bao không buộc kỹ', 'Nếp đổ trắng đường'],
          why: 'Bao không buộc kỹ nên gạo nếp đổ trắng cả đường. Bao gạo vẫn còn đó, không bị mất hay bị bỏ quên.',
        },
        // sửa: đáp án gốc ghi A (đàn chim sẻ). Người giúp bà là "đàn trẻ", các bạn nhỏ; "đàn chim sẻ" là hình ảnh nhà thơ ví các bạn.
        {
          type: 'choice', q: 'Ai đã giúp đỡ bà cụ?',
          opts: ['đàn chim sẻ', 'anh thanh niên', 'các bạn nhỏ'],
          ans: 2,
          quote: ['Gọi nhau, đàn trẻ', 'Ùa ra nhặt giùm', 'Những bàn tay nhỏ'],
          why: 'Đàn trẻ, tức là các bạn nhỏ, ùa ra nhặt gạo giúp bà. Nhà thơ gọi các bạn là "đàn chim sẻ" vì các bạn nhặt gạo nhanh như chim sẻ nhặt thóc, chứ không phải chim sẻ thật. Bài không có anh thanh niên nào.',
        },
        {
          type: 'choice', q: 'Theo em, bà cụ cảm thấy thế nào khi nhận được sự giúp đỡ?',
          opts: ['hạnh phúc, xúc động', 'phiền lòng', 'lo lắng'],
          ans: 0,
          quote: ['Bà cụ tươi cười', 'Nhìn đàn cháu nhỏ'],
          why: 'Bà cụ tươi cười nhìn các cháu: bà vui và cảm động vì được giúp. Không có chi tiết nào cho thấy bà phiền lòng hay lo lắng.',
        },
        // sửa: đáp án gốc ghi A (Tấm). Trong truyện Tấm Cám, đàn chim sẻ của Bụt nhặt thóc giúp Tấm; các bạn nhỏ được ví với đàn chim sẻ ấy.
        {
          type: 'choice', q: 'Hình ảnh các cháu nhỏ khiến bà cụ liên tưởng đến nhân vật nào trong câu chuyện “Tấm Cám”?',
          opts: ['Tấm', 'đàn chim sẻ của ông bụt', 'Cám'],
          ans: 1,
          quote: ['Nhìn đàn chim sẻ', 'Truyện “Tấm Cám” xưa'],
          why: 'Trong truyện Tấm Cám, Bụt sai đàn chim sẻ xuống nhặt thóc giúp Tấm. Các bạn nhỏ nhặt gạo giúp bà nhanh thoăn thoắt nên bà nghĩ đến đàn chim sẻ ấy. Tấm là người được giúp, còn Cám là người xấu.',
        },
        {
          type: 'write', q: 'Các bạn nhỏ trong bài thơ có những đức tính nào đáng khen?', lines: 2,
          quote: ['Ùa ra nhặt giùm', 'Nhặt vội, nhặt mau', 'Cháu ngoan Bác Hồ'],
          sample: 'Các bạn nhỏ trong bài thơ có những đức tính đáng khen là: tốt bụng, chăm chỉ, biết giúp đỡ người già, là cháu ngoan Bác Hồ.',
          tip: 'Nghĩ xem các bạn đã làm gì khi thấy gạo của bà bị đổ, và làm việc đó như thế nào.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'underline', q: 'Gạch dưới bộ phận trả lời cho câu hỏi Bằng gì? trong các câu sau:',
          marks: [{ n: 1, label: 'bộ phận trả lời câu hỏi Bằng gì?' }],
          lines: [
            'a. Bằng nỗ lực phi thường, anh ấy đã vượt qua đối thủ trong những giây cuối cùng của cuộc đua.',
            'b. Chú bé chọc cười mọi người trong nhà bằng cách bắt chước những điệu bộ của người lớn.',
            'c. Bằng sự nhanh trí và dũng cảm, anh đã cứu chú bé thoát khỏi nguy hiểm trong gang tấc.',
          ],
          ans: { 1: ['Bằng nỗ lực phi thường', 'bằng cách bắt chước những điệu bộ của người lớn', 'Bằng sự nhanh trí và dũng cảm'] },
          why: 'Bộ phận trả lời câu hỏi "Bằng gì?" nói về cách làm, phương tiện hay chất liệu, thường bắt đầu bằng từ "bằng". Nó có thể đứng đầu câu (a, c) hoặc cuối câu (b).',
        },
        {
          type: 'match', q: 'Nối ý ở cột A với ý ở cột B để tạo câu:',
          left: ['Voi hút nước', 'Em lớn lên', 'Chiếc chiếu được làm'],
          right: ['bằng tình yêu thương của cha mẹ.', 'bằng vòi.', 'bằng sợi cói.'],
          ans: [1, 0, 2],
          why: 'Voi dùng vòi để hút nước. Em lớn lên nhờ cha mẹ yêu thương, chăm sóc. Chiếu được dệt từ sợi cói.',
        },
        {
          // sửa: đề in "Nen – li", tên nhân vật trong sách là Nen-li.
          type: 'fill', q: 'Điền từ thích hợp vào chỗ chấm để có câu hoàn chỉnh: (đôi bàn tay, kiên nhẫn, pha lê)',
          items: [
            { t: 'a. Chiếc bình hoa được làm bằng {pha lê} trong suốt.' },
            { t: 'b. Những chú rối được điều khiển bằng {đôi bàn tay} khéo léo của các cô chú nghệ sĩ.' },
            { t: 'c. Bằng {kiên nhẫn|sự kiên nhẫn}, Nen-li đã chinh phục được bài kiểm tra Thể dục.' },
          ],
          why: 'Pha lê là thứ thủy tinh trong suốt để làm bình hoa. Các nghệ sĩ dùng đôi bàn tay khéo léo điều khiển con rối. Nen-li kiên nhẫn tập luyện nên đã vượt qua bài kiểm tra Thể dục.',
        },
        // Đề gốc in hai câu b và c trên cùng một dòng (b. … c. …), nên câu "Kiến ở đông quá…" đổi thành d.
        // Dấu ngoặc kép đóng đặt trước dấu câu cuối như đáp án (“…quà”.), nên dấu câu cuối tách riêng.
        {
          type: 'punct', mark: '"', q: 'Thêm dấu ngoặc kép vào những chỗ phù hợp ở mỗi câu sau:',
          items: [
            'a. Nàng tiên vung cây đũa thần lên và bảo:^ Em nào làm việc chăm chỉ sẽ được nhận quà^ .',
            'b. Tôi vẫn nhớ như in lời kể của bà:^ Cây xoài này, ông mang từ Cao Lãnh về trồng^ .',
            'c. Hà nắn nót viết vào trang giấy:^ Tết đã đến thật rồi^ !',
            'd. Kiến ở đông quá. Thành ngữ^ đông như kiến^ thật đúng. Đường ngang lối dọc chỗ nào cũng đầy kiến.',
          ],
          why: 'Dấu ngoặc kép đánh dấu lời nói hay lời viết của nhân vật (đặt sau dấu hai chấm, mở trước lời nói và đóng khi hết lời nói), hoặc đánh dấu một thành ngữ, một cụm từ được nhắc đến như "đông như kiến". Mỗi câu cần một dấu mở và một dấu đóng.',
        },
      ],
    },
  ],
};
