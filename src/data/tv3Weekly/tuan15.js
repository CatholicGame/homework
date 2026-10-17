// Tuần 15: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-15.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// Ghi chú: đáp án gốc lệch số câu (có thêm câu 5 "vì sao gọi là Trạng Lường" không có trong đề), đã đối chiếu lại theo nội dung.
export default {
  id: 'tuan-15', week: 15, topic: 'Trạng Lường',
  read: {
    title: 'TRẠNG LƯỜNG', author: 'Theo sách Kể chuyện thần đồng Việt Nam',
    paras: [
      'Lương Thế Vinh đỗ Trạng nguyên năm 21 tuổi. Ông được mọi người nể phục vì vừa học rộng vừa có rất nhiều sáng kiến trong đời sống. Có lần, sứ thần Trung Hoa thử tài Lương Thế Vinh, nhờ ông cân giúp một con voi. Lương Thế Vinh sai lính dắt voi xuống thuyền, đánh dấu mức chìm của thuyền. Sau đó, ông cho voi lên bờ và xếp đá vào thuyền. Khi thuyền chìm đến mức đã đánh dấu, ông sai cân chỗ đá ấy và biết voi nặng bao nhiêu.',
      'Sứ thần lại xé một trang sách mỏng, nhờ ông đo xem nó dày bao nhiêu. Ông lấy thước đo cuốn sách, rồi chia cho số trang để biết độ dày của mỗi trang sách. Sứ thần hết sức khâm phục tài trí của Trạng nguyên nước Việt. Lương Thế Vinh đã tìm ra nhiều quy tắc tính toán, viết thành một cuốn sách. Mỗi quy tắc tính toán đều được ông tóm tắt bằng một bài thơ cho dễ nhớ. Đó là cuốn sách toán đầu tiên ở Việt Nam. Sách của ông được dạy trong nhà trường gần 400 năm. Ông cũng là người Việt Nam đầu tiên làm ra bàn tính. Bàn tính lúc đầu làm bằng đất, về sau làm bằng gỗ và trúc, sơn nhiều màu, rất dễ sử dụng.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        // Giữ đáp án gốc B và C: câu hỏi hỏi "những lí do", đỗ Trạng nguyên năm 21 tuổi nêu ngay đầu bài.
        {
          type: 'choice', q: 'Những lí do nào khiến mọi người nể phục Lương Thế Vinh?',
          opts: ['Ông có sức khỏe và trí nhớ phi thường.', 'Ông vừa học rộng vừa có rất nhiều sáng kiến trong đời sống.', 'Ông đỗ Trạng nguyên năm 21 tuổi.'],
          ans: [1, 2],
          quote: ['đỗ Trạng nguyên năm 21 tuổi', 'nể phục vì vừa học rộng vừa có rất nhiều sáng kiến trong đời sống'],
          why: 'Ngay đầu bài viết: Lương Thế Vinh đỗ Trạng nguyên năm 21 tuổi, và ông được mọi người nể phục vì vừa học rộng vừa có rất nhiều sáng kiến. Đó là hai lí do nên chọn B và C. Bài không nói gì về sức khoẻ hay trí nhớ của ông.',
        },
        {
          type: 'choice', q: 'Lương Thế Vinh đã vượt qua những thử thách nào của sứ thần Trung Hoa?',
          opts: ['thử thách cân voi, đo độ dày một trang sách', 'thử thách cân số đá bên bờ sông', 'thử thách đo độ dày quyển sách'],
          ans: 0,
          quote: ['nhờ ông cân giúp một con voi', 'xé một trang sách mỏng, nhờ ông đo xem nó dày bao nhiêu'],
          why: 'Sứ thần đưa ra hai thử thách: cân một con voi và đo độ dày một trang sách mỏng. Cân đá chỉ là cách ông làm để biết voi nặng bao nhiêu; đo cả cuốn sách là cách ông tìm ra độ dày của một trang.',
        },
        {
          type: 'choice', q: 'Lương Thế Vinh đã làm gì để những quy tắc tính toán trở nên dễ nhớ?',
          opts: ['viết những quy tắc tính toán một cách ngắn gọn', 'viết những quy tắc tính toán vào một cuốn sổ', 'tóm tắt mỗi quy tắc tính toán thành một bài thơ'],
          ans: 2,
          quote: ['Mỗi quy tắc tính toán đều được ông tóm tắt bằng một bài thơ cho dễ nhớ'],
          why: 'Bài đọc nói mỗi quy tắc được ông tóm tắt bằng một bài thơ "cho dễ nhớ". Bài không nói ông viết vào sổ hay chỉ viết ngắn gọn.',
        },
        {
          type: 'choice', q: 'Lúc đầu, ông Lương Thế Vinh làm ra bàn tính bằng chất liệu gì?',
          opts: ['gỗ', 'đất', 'trúc'],
          ans: 1,
          quote: ['Bàn tính lúc đầu làm bằng đất'],
          why: 'Bàn tính lúc đầu làm bằng đất. Gỗ và trúc là chất liệu dùng về sau, không phải lúc đầu.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'hoinga', q: 'Dấu hỏi hay dấu ngã? "Nếu nhắm mắt nghi về cha mẹ, / Đa nuôi em khôn lớn từng ngày, / Tay bồng bế, sớm khuya vất va, / Mắt nhắm rồi, lại mơ ra ngay."',
          // Tách thành cụm ngắn theo thứ tự trong khổ thơ (ô chính tả không chứa được cả dòng thơ dài).
          items: ['nhắm mắt [nghĩ] về', '[Đã] nuôi em', 'sớm khuya vất [vả]', 'lại [mở] ra ngay'],
          notes: {
            'nhắm mắt nghĩ về': 'viết <b>nghĩ</b> (dấu ngã) vì đây là suy nghĩ, nghĩ ngợi; còn <b>nghỉ</b> (dấu hỏi) là nghỉ ngơi',
            'Đã nuôi em': 'viết <b>đã</b> (dấu ngã): chỉ việc xảy ra rồi, như đã ăn, đã học',
            'sớm khuya vất vả': '<b>vất vả</b> là từ láy. Tiếng <b>vất</b> mang dấu sắc nên <b>vả</b> mang dấu hỏi',
            'lại mở ra ngay': 'viết <b>mở</b> (dấu hỏi): mở mắt, mở cửa; còn <b>mỡ</b> (dấu ngã) là mỡ ăn',
          },
          why: 'Khổ thơ đúng: "Nếu nhắm mắt nghĩ về cha mẹ, / Đã nuôi em khôn lớn từng ngày, / Tay bồng bế, sớm khuya vất vả, / Mắt nhắm rồi, lại mở ra ngay." (Vũ Quần Phương)',
        },
        {
          type: 'fill', q: 'Tìm thêm một tiếng để tạo từ chứa các tiếng có cùng âm đầu l hoặc n:',
          items: [
            { t: 'lũ {lụt|lượt},   lúc {lắc|la|lâu|lỉu},   nước {nôi|non|nóng|nổi},   {nôn|nao} nao,' },
            { t: 'lo {lắng|liệu|lường|lót},   náo {nức},   nặng {nề|nợ|nài},   {lúc|líu|liu} lỉu' },
          ],
          why: 'Hai tiếng trong từ có cùng âm đầu: lũ lụt, lúc lắc, lo lắng, lúc lỉu (cùng l); nước nôi, nôn nao, náo nức, nặng nề (cùng n).',
        },
        {
          type: 'write', q: 'Đặt câu nói về nghề nghiệp, công việc và nơi làm việc của mỗi người:', pic: 't15jobs',
          parts: [
            { label: 'a)', sample: 'Hai anh chị ấy làm nông nghiệp trên một trang trại.' },
            { label: 'b)', sample: 'Cô ấy làm nha sĩ ở một bệnh viện lớn.' },
            { label: 'c)', sample: 'Chị ấy làm thu ngân cho một siêu thị gần nhà.' },
          ],
          tip: 'Mỗi câu nói đủ ba ý: người đó làm nghề gì, đang làm việc gì, làm ở đâu.',
        },
        {
          type: 'fill', q: 'Chọn các từ đã cho trong ngoặc để điền vào chỗ trống thích hợp trong các câu dưới đây: (chuyên gia máy tính, bác sĩ, nhà bác học, kiến trúc sư)',
          items: [
            { t: 'a. Là một {nhà bác học} giàu sáng kiến, Ê-đi-xơn đã cống hiến cho loài người hơn một ngàn sáng chế.' },
            { t: 'b. Tại các trạm y tế xã, các {bác sĩ|bác sỹ} đang khám bệnh cho mọi người.' },
            { t: 'c. Cha tôi là một {kiến trúc sư}. Để có được những bản thiết kế mẫu nhà ưng ý, ông đã phải thức trắng rất nhiều đêm.' },
            { t: 'd. Công việc bề bộn khiến anh phải thường xuyên ngồi hàng giờ bên chiếc máy vi tính. Anh là một {chuyên gia máy tính} hàng đầu của đất nước.' },
          ],
          why: 'Nhà bác học nghiên cứu, sáng chế ra nhiều thứ mới. Bác sĩ khám chữa bệnh. Kiến trúc sư vẽ thiết kế nhà cửa. Chuyên gia máy tính làm việc giỏi với máy vi tính.',
        },
      ],
    },
  ],
};
