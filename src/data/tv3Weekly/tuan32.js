// Tuần 32: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-32.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// sửa: bài đọc gốc in "đã này ra những chùm hoa" và "máu còn úa đỏ", đúng là "nảy ra" và "màu còn úa đỏ".
export default {
  id: 'tuan-32', week: 32, topic: 'Chồi biếc',
  read: {
    title: 'CHỒI BIẾC',
    paras: [
      'Mùa xuân, những hạt mưa li ti giăng giăng thả bụi êm đềm, cây cối chịu qua giá rét của mùa đông ngủ một giấc đẫy chợt bừng tỉnh. Những hạt mưa đủ để cho cây cối nhú chồi biếc, hớn hở đón chào mùa xuân.',
      'Chồi cây giống như cuộc đời của một con người. Khi mới nứt nanh, có một màu tím biếc thật dễ thương như cu con mới lọt lòng. Những lá non mới chui từ lòng mẹ chui ra, chúng còn yếu ớt, mềm mại non tơ, ngơ ngác với thiên nhiên. Hằng ngày được nắng, gió luyện rèn, chả mấy chốc chúng từ màu tím biếc đã chuyển sang màu xanh nõn. Lúc này, lá cây cũng giống như bàn tay em bé, vẫy vẫy theo gió xuân nhè nhẹ. Và tháng năm về, khi tiếng ve cưa miết vào không gian, cũng là lúc lá cây chuyển sang màu xanh đậm. Lúc này, lá cây ở thời kì sung sức nhất của cuộc đời mình. Từ những nách lá đã nảy ra những chùm hoa đỏ chói, vàng sáng, tím lịm như nhung ... rồi kết quả. Mùa thu đến, cũng là lúc lá cây về già, gân guốc nổi lên để chống chọi với những đợt gió táp, sương sa. Mùa đông, lá cây như những cụ già lụ khụ, úa vàng, màu còn úa đỏ trên mặt lá đã phải lìa cành để nhường lại cho cây ấp ủ những chồi biếc mai sau.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Bài văn tả cảnh gì?',
          opts: ['Tả chồi biếc vào mùa xuân.', 'Tả lá cây ở thời kì phát triển nhất.', 'Tả sự phát triển của chồi cây suốt bốn mùa.'],
          ans: 2,
          quote: ['Mùa xuân, những hạt mưa li ti', 'tháng năm về', 'Mùa thu đến', 'Mùa đông, lá cây như những cụ già lụ khụ'],
          why: 'Bài văn đi lần lượt qua mùa xuân, mùa hè (tháng năm), mùa thu, mùa đông để kể chồi cây lớn lên, già đi rồi lìa cành. Chồi biếc mùa xuân hay lá cây lúc sung sức nhất chỉ là một phần của bài.',
        },
        {
          type: 'choice', q: 'Những từ ngữ nào đã được dùng để tả sức sống, niềm vui của cây cối khi mùa xuân đến?',
          opts: ['Giăng giăng thả bụi, ngủ đẫy giấc', 'Ngủ đủ giấc, nhú chồi biếc', 'Bừng tỉnh, hớn hở chào đón mùa xuân'],
          ans: 2,
          quote: ['chợt bừng tỉnh', 'hớn hở đón chào mùa xuân'],
          why: 'Cây cối "bừng tỉnh" và "hớn hở đón chào mùa xuân": đó là những từ cho thấy cây đầy sức sống và vui mừng. "Giăng giăng thả bụi" là tả hạt mưa, còn "ngủ đẫy giấc" là lúc cây còn đang ngủ qua mùa đông.',
        },
        {
          type: 'write', q: 'Viết tiếp vào chỗ chấm để có hình ảnh chồi biếc phát triển theo thời gian:',
          quote: ['chuyển sang màu xanh nõn', 'lá cây chuyển sang màu xanh đậm', 'lá cây về già, gân guốc nổi lên', 'úa vàng', 'lìa cành'],
          parts: [
            { label: 'a. Khi nắng non chan hòa khắp đó đây…', sample: 'Khi nắng non chan hòa khắp đó đây, chồi cây từ màu tím biếc đã chuyển sang màu xanh nõn. Lúc này, lá cây cũng giống như bàn tay em bé, vẫy vẫy theo gió xuân nhè nhẹ.' },
            { label: 'b. Khi tiếng ve cưa miết vào không gian…', sample: 'Khi tiếng ve cưa miết vào không gian, cũng là lúc lá cây chuyển sang màu xanh đậm.' },
            { label: 'c. Khi mùa thu, mùa đông đến…', sample: 'Khi mùa thu, mùa đông đến, lá cây về già, gân guốc, úa vàng rồi lìa cành.' },
          ],
          tip: 'Đọc lại bài, tìm xem lá cây có màu gì, trông thế nào vào mùa xuân, mùa hè (tiếng ve), mùa thu và mùa đông.',
        },
        // sửa: đáp án gốc chọn B; bài viết lá chuyển sang màu xanh nõn rồi "Lúc này, lá cây cũng giống như bàn tay em bé", nên đúng là C.
        {
          type: 'choice', q: 'Sự vật nào được so sánh với bàn tay em bé?',
          opts: ['Chồi mới nứt nanh', 'Lá non mới chui từ lòng mẹ ra', 'Lá có màu xanh nõn'],
          ans: 2,
          quote: ['chuyển sang màu xanh nõn. Lúc này, lá cây cũng giống như bàn tay em bé'],
          why: 'Khi lá đã chuyển sang màu xanh nõn, bài viết "Lúc này, lá cây cũng giống như bàn tay em bé". Chồi mới nứt nanh được so sánh với cu con mới lọt lòng, còn lá non mới chui ra thì được tả là yếu ớt, ngơ ngác.',
        },
        {
          type: 'choice', q: 'Bài văn trên có mấy hình ảnh so sánh?',
          opts: ['3 hình ảnh', '4 hình ảnh', '5 hình ảnh'],
          ans: 2,
          quote: ['Chồi cây giống như cuộc đời của một con người', 'thật dễ thương như cu con mới lọt lòng', 'lá cây cũng giống như bàn tay em bé', 'tím lịm như nhung', 'lá cây như những cụ già lụ khụ'],
          why: 'Có 5 hình ảnh so sánh: chồi cây giống như cuộc đời con người; chồi tím biếc như cu con mới lọt lòng; lá cây giống như bàn tay em bé; hoa tím lịm như nhung; lá cây mùa đông như những cụ già lụ khụ.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'punct', mark: ',', q: 'Điền dấu phẩy vào vị trí thích hợp:',
          items: [
            'Vì tin rằng sư tử xuất hiện đầu năm là điềm lành^ một số dân tộc ít người thường múa sư tử vào các dịp lễ hội mừng xuân.',
            'Do một cơn bão bất ngờ ập đến^ cả đoàn tàu phải nghỉ lại trên hoang đảo.',
            'Khi mới nhú lộc^ bàng màu hung nâu. Chỉ vài ba ngày sau^ nó chuyển sang màu xanh nõn chúm chím như những búp hoa.',
          ],
          why: 'Dấu phẩy ngăn cách phần nói lí do (Vì…, Do…) hoặc thời gian (Khi…, Chỉ vài ba ngày sau) đứng đầu câu với phần chính của câu.',
        },
        // sửa: câu c gốc in "nhằm dành lại phần thắng", đúng chính tả là "giành lại"; câu d gốc in "dặc biệt", đúng là "đặc biệt".
        {
          type: 'underline', q: 'Gạch dưới bộ phận trả lời câu hỏi “Để làm gì?” trong mỗi câu sau:',
          marks: [{ n: 1, label: 'bộ phận trả lời câu hỏi “Để làm gì?”' }],
          lines: [
            'a. Tôi ngửa mặt nhìn bầu trời để tận hưởng không khí trong lành của buổi sớm mai.',
            'b. Em thường dậy từ 6 giờ sáng để ôn bài trước khi đến lớp.',
            'c. Anh ta cố gắng ra miếng đòn thật hiểm hóc nhằm giành lại phần thắng từ tay đối phương.',
            'd. Bố mẹ hứa sẽ tặng cu Tí một món quà đặc biệt nhân dịp Tí đạt danh hiệu học sinh giỏi để khích lệ cậu.',
            'e. Các em nhỏ thả chim bồ câu trắng lên trời xanh để thể hiện khát vọng hòa bình.',
          ],
          ans: { 1: ['để tận hưởng không khí trong lành của buổi sớm mai', 'để ôn bài trước khi đến lớp', 'nhằm giành lại phần thắng từ tay đối phương', 'để khích lệ cậu', 'để thể hiện khát vọng hòa bình'] },
          why: 'Bộ phận trả lời câu hỏi "Để làm gì?" nói mục đích của việc làm, thường bắt đầu bằng "để", "nhằm", "vì". Ví dụ: Em dậy sớm để làm gì? Để ôn bài trước khi đến lớp.',
        },
        // sửa: đáp án gốc ghi dấu chấm phẩy ở chỗ thứ hai, nhưng đề chỉ cho dấu phẩy hoặc dấu hai chấm; dấu hai chấm báo phần giải thích phía sau.
        {
          type: 'spell', q: 'Điền dấu phẩy hoặc dấu hai chấm vào chỗ trống:',
          text: [
            'Trên boong tàu, các chú thuỷ thủ bỗng reo ầm lên [ ] “Cá heo!”. Cá heo là bạn của hải quân đấy [ ] Ở một số nước, cá heo được huấn luyện để bảo vệ vùng biển.',
            'Các chuyên gia cho biết [ ] “Cá heo mũi chai có khả năng dò tìm thuỷ lôi nhanh hơn nhiều so với máy móc.”',
            'Theo HOÀNG TRANG',
          ],
          // Tách thành cụm ngắn theo thứ tự trong đoạn (đoạn đầy đủ ở text phía trên).
          items: ['bỗng reo ầm lên[:/,] “Cá heo!”', 'bạn của hải quân đấy[:/,] Ở một số nước', 'Các chuyên gia cho biết[:/,] “Cá heo mũi chai…”'],
          why: 'Dấu hai chấm đặt trước lời nói được dẫn lại (reo ầm lên: “Cá heo!”, cho biết: “…”) và trước phần giải thích cho điều nói ở trước (vì sao cá heo là bạn của hải quân).',
        },
      ],
    },
  ],
};
