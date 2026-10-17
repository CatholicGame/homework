// Tuần 8: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-08.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-8', week: 8, topic: 'Lớp học cuối đông',
  read: {
    title: 'LỚP HỌC CUỐI ĐÔNG',
    paras: [
      'Bây giờ đã là cuối mùa đông. Hôm nay, trời rét thêm. Mặt đất cứng lại. Cây cối rũ lá úa vàng. Đá xám xịt phủ thêm hơi lạnh.',
      'Mấy bạn nhỏ vẫn rủ nhau đến lớp. Những ngón tay nho nhỏ đỏ lên vì lạnh. Thầy giáo và các bạn quây quần bên đống lửa.',
      'Tiếng nói dè dặt ban đầu to dần lên theo ngọn lửa. Các bạn kể cho thầy giáo nghe về cuộc sống của mình. Đêm qua, con bò nhà bạn Súa đẻ một con bê mập mạp. Bạn thức suốt đêm đốt lửa cho mẹ con chúng sưởi. Bạn Mua thì kể về đám cưới của chị gái, về bộ váy áo đẹp nhất, sặc sỡ nhất mà bạn nhìn thấy. Bạn Chơ kể về cái hàng rào đá mà bố con bạn đang xếp dở. Cái hàng rào đá được xếp bằng những hòn đá xanh, bằng sự khéo léo, cần cù của những bàn tay yêu lao động... Tiếng Mông lẫn tiếng Kinh làm cho căn phòng nhỏ thêm rộn ràng.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Những chi tiết nào cho thấy trời rất rét?',
          opts: ['Mặt đất cứng lại. Cây cối rũ lá úa vàng.', 'Mặt đất cứng lại. Cây cối rũ lá úa vàng. Đá xám xịt phủ thêm hơi lạnh.', 'Mặt đất cứng lại. Cây cối rũ lá úa vàng. Đá xám xịt phủ thêm hơi lạnh. Những ngón tay nho nhỏ đỏ lên vì lạnh.'],
          ans: 2,
          quote: ['Mặt đất cứng lại. Cây cối rũ lá úa vàng. Đá xám xịt phủ thêm hơi lạnh.', 'Những ngón tay nho nhỏ đỏ lên vì lạnh.'],
          why: 'Bài đọc có bốn chi tiết tả cái rét: mặt đất cứng lại, cây rũ lá úa vàng, đá phủ hơi lạnh và ngón tay các bạn đỏ lên vì lạnh. Ý C nêu đủ cả bốn, hai ý kia còn thiếu.',
        },
        {
          type: 'choice', q: 'Các bạn nhỏ kể cho thầy giáo nghe về điều gì?',
          opts: ['về cuộc sống của mình', 'về đoạn đường đi học của mình', 'về nhà của mình'],
          ans: 0,
          quote: ['Các bạn kể cho thầy giáo nghe về cuộc sống của mình'],
          why: 'Bài đọc viết rõ: các bạn kể cho thầy nghe về cuộc sống của mình (con bò đẻ, đám cưới chị gái, hàng rào đá). Bài không kể về đường đi học hay ngôi nhà.',
        },
        {
          type: 'match', q: 'Nối để biết mỗi bạn kể cho thầy giáo nghe chuyện gì?',
          left: ['Bạn Mua', 'Bạn Chơ', 'Bạn Súa'],
          right: ['con bò đẻ một con bê mập mạp', 'đám cưới chị gái, bộ váy áo đẹp', 'cái hàng rào đá đang xếp dở'],
          ans: [1, 2, 0],
          quote: ['Bạn Mua thì kể về đám cưới của chị gái', 'Bạn Chơ kể về cái hàng rào đá', 'con bò nhà bạn Súa đẻ một con bê mập mạp'],
          why: 'Đọc kĩ tên từng bạn trong đoạn 3: Súa kể chuyện con bò đẻ, Mua kể về đám cưới chị gái và bộ váy áo, Chơ kể về hàng rào đá bố con bạn đang xếp.',
        },
        {
          type: 'choice', q: 'Các bạn nhỏ trong bài có những điểm gì đáng khen?',
          opts: ['Biết giúp đỡ gia đình trong lao động, trong cuộc sống.', 'Không ngại khó khăn, thời tiết xấu vẫn cố gắng đi học.', 'Biết kể chuyện về cuộc sống của mình cho mọi người nghe.'],
          ans: [0, 1],
          quote: ['Bạn thức suốt đêm đốt lửa cho mẹ con chúng sưởi', 'bố con bạn đang xếp dở', 'Mấy bạn nhỏ vẫn rủ nhau đến lớp'],
          why: 'Súa thức đêm đốt lửa sưởi cho bò, Chơ cùng bố xếp hàng rào: các bạn biết giúp gia đình. Trời rét mà các bạn vẫn rủ nhau đến lớp: không ngại khó khăn. Kể chuyện cho thầy nghe là việc bình thường, chưa phải điểm đáng khen.',
        },
        {
          type: 'write', q: 'Hãy kể lại việc tốt em đã làm hoặc việc em đã làm để giúp đỡ gia đình.', lines: 3,
          sample: 'Em giúp mẹ làm việc nhà. Em giúp bố tưới cây, bắt sâu cho cây.',
          tip: 'Kể rõ em đã làm việc gì, làm lúc nào, giúp ai.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        // sửa: đáp án gốc ghi "Dây truyền sản xuất", viết đúng là "dây chuyền sản xuất".
        // sửa: "……… nhân" chỉ thiếu vần (không có âm đầu) nên điền "ân nhân"; đáp án gốc ghi "thân nhân".
        {
          type: 'spell', rule: 'chtr', q: 'a) Chọn truyền/chuyền điền vào chỗ chấm để tạo từ đúng. b) Điền ân/âng vào chỗ chấm để tạo từ.',
          items: [
            'Chim non tập [ch]uyền cành.', 'Dây [ch]uyền sản xuất.', 'Bạn Trang có giọng đọc [tr]uyền cảm.', 'Em mới biết chơi bóng [ch]uyền.',
            'b[âng/ân] khuâng', 'ng[ân/âng] nga', 'th[ân/âng] thiết', '[ân/âng] nhân', 'n[âng/ân] đỡ', 'kết th[ân/âng]',
          ],
          notes: {
            'Chim non tập chuyền cành.': 'chuyền: nhảy từ cành này sang cành khác.',
            'Dây chuyền sản xuất.': 'dây chuyền: các việc nối tiếp nhau, chuyền từ chỗ này sang chỗ khác.',
            'Bạn Trang có giọng đọc truyền cảm.': 'truyền cảm: làm người nghe cảm động theo, như truyền đi cảm xúc.',
            'Em mới biết chơi bóng chuyền.': 'bóng chuyền: môn thể thao chuyền bóng qua lưới.',
            'ân nhân': 'ân nhân: người đã giúp đỡ mình, vần ân.',
          },
          why: 'Phần a): chuyền là đưa qua đưa lại, nhảy từ chỗ này sang chỗ khác (chuyền cành, bóng chuyền, dây chuyền). Truyền là đưa đi, lan ra (truyền cảm, truyền tin). Phần b): đọc to để nghe âm cuối n hay ng: bâng khuâng, ngân nga, thân thiết, ân nhân, nâng đỡ, kết thân.',
        },
        {
          type: 'sort', q: 'Xếp các từ ngữ sau vào hai nhóm thích hợp:',
          words: ['thủ thư', 'đọc sách', 'thẻ mượn sách', 'tuân thủ nội quy', 'giá sách', 'tạp chí', 'bảng nội quy', 'mượn sách'],
          groups: [
            { label: 'Sự vật có ở thư viện', kind: 'sv', words: ['thủ thư', 'thẻ mượn sách', 'giá sách', 'tạp chí', 'bảng nội quy'] },
            { label: 'Hoạt động ở thư viện', kind: 'hd', words: ['đọc sách', 'tuân thủ nội quy', 'mượn sách'] },
          ],
          why: 'Thủ thư, thẻ mượn sách, giá sách, tạp chí, bảng nội quy là người và đồ vật. Đọc sách, tuân thủ nội quy, mượn sách là việc làm của bạn đọc.',
        },
        {
          type: 'write', q: 'Đặt câu cảm cho mỗi tình huống sau:',
          parts: [
            { label: 'Em bé chạy nhảy, nô đùa trong thư viện gây ồn ào.', sample: 'Em bé chạy nhảy, nô đùa trong thư viện ồn ào quá!' },
            { label: 'Em tìm được cuốn sách mình yêu thích trong thư viện.', sample: 'Vui quá, em tìm được cuốn sách mình yêu thích trong thư viện!' },
            // sửa: câu mẫu gốc "mới mở được nhà xuất bản…" thừa chữ "mở".
            { label: 'Thư viện trường em mới được nhà xuất bản Kim Đồng tặng thêm 500 cuốn sách hay.', sample: 'Thư viện trường em mới được nhà xuất bản Kim Đồng tặng thêm 500 cuốn sách hay quá!' },
          ],
          tip: 'Câu cảm bộc lộ cảm xúc (vui, ngạc nhiên, khó chịu…), thường có từ quá, thật, lắm, ôi và cuối câu có dấu chấm than.',
        },
      ],
    },
  ],
};
