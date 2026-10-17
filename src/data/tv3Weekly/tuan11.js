// Tuần 11: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-11.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// sửa (bài đọc): "Người dàn ông" → "Người đàn ông", bỏ dấu cách thừa trước dấu chấm ("cô khóc .").
export default {
  id: 'tuan-11', week: 11, topic: 'Hoa tặng mẹ',
  read: {
    title: 'HOA TẶNG MẸ', author: 'Theo Truyện đọc 4',
    paras: [
      'Một người đàn ông dừng xe trước cửa hàng hoa để mua hoa gửi tặng mẹ qua dịch vụ bưu điện. Mẹ anh sống cách chỗ anh khoảng hơn trăm ki-lô-mét. Vừa bước ra khỏi ô tô, anh thấy một bé gái đang lặng lẽ khóc bên vỉa hè. Anh đến gần hỏi cô bé vì sao cô khóc. Cô bé nức nở:',
      '- Cháu muốn mua tặng mẹ cháu một bông hồng. Nhưng cháu chỉ có 75 xu mà giá một bông hồng những 2 đô la.',
      'Người đàn ông mỉm cười nói:',
      '- Đừng khóc nữa! Chú sẽ mua cho cháu một bông.',
      'Người đàn ông chọn mua một bông hồng cho cô bé và đặt một bó hồng gửi tặng mẹ qua dịch vụ. Xong, anh hỏi cô bé có cần đi nhờ xe về nhà không. Cô bé cảm ơn, rồi chỉ đường cho anh lái xe đến một nghĩa trang, nơi có một ngôi mộ mới đắp. Cô bé chỉ ngôi mộ và nói:',
      '- Đây là nhà của mẹ cháu.',
      'Nói xong, cô bé nhẹ nhàng đặt bông hồng lên mộ mẹ.',
      'Ngay sau đó, người đàn ông quay lại cửa hàng hoa. Anh hủy bỏ dịch vụ gửi hoa và mua một bó hồng thật đẹp. Anh lái xe một mạch về nhà để trao tận tay bà bó hoa.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Người đàn ông dừng xe trước cửa hàng hoa để làm gì?',
          opts: ['Mua hoa về nhà tặng mẹ.', 'Mua hoa gửi tặng mẹ mình qua dịch vụ bưu điện.', 'Hỏi han cô bé đang khóc bên vỉa hè.'],
          ans: 1,
          quote: ['dừng xe trước cửa hàng hoa để mua hoa gửi tặng mẹ qua dịch vụ bưu điện'],
          why: 'Câu đầu bài kể anh dừng xe để mua hoa gửi tặng mẹ qua bưu điện, vì mẹ ở xa hơn trăm ki-lô-mét. Anh chỉ gặp cô bé sau khi bước ra khỏi xe, còn việc về nhà tặng mẹ là chuyện ở cuối bài.',
        },
        {
          type: 'choice', q: 'Vì sao cô bé khóc?',
          opts: ['Vì cô bé bị lạc mẹ.', 'Vì mẹ cô bé không mua cho cô bé một bông hồng.', 'Vì cô bé không đủ tiền mua một bông hồng tặng mẹ.'],
          ans: 2,
          quote: ['Cháu muốn mua tặng mẹ cháu một bông hồng', 'Nhưng cháu chỉ có 75 xu mà giá một bông hồng những 2 đô la'],
          why: 'Cô bé muốn mua hoa tặng mẹ nhưng chỉ có 75 xu, còn một bông hồng giá 2 đô la, nên không đủ tiền. Cô bé không bị lạc, và chính cô muốn tặng hoa cho mẹ chứ không đòi mẹ mua.',
        },
        {
          type: 'choice', q: 'Người đàn ông đã làm gì để giúp cô bé?',
          opts: ['Mua cho cô một bông hồng để tặng mẹ.', 'Chở cô bé về nhà để tặng hoa cho mẹ.'],
          ans: 0,
          quote: ['Chú sẽ mua cho cháu một bông', 'chọn mua một bông hồng cho cô bé'],
          why: 'Anh nói "Chú sẽ mua cho cháu một bông" và mua bông hồng cho cô bé. Anh có cho cô bé đi nhờ xe, nhưng xe không về nhà mà đến nghĩa trang, nơi mẹ cô bé nằm.',
        },
        // sửa: phương án C gốc lặp "để tặng để tặng".
        {
          type: 'choice', q: 'Việc làm nào của cô bé khiến người đàn ông quyết định không gửi hoa qua dịch vụ bưu điện mà lái xe về nhà, trao tận tay mẹ bó hoa?',
          opts: ['Ngồi khóc vì không đủ tiền mua hoa cho mẹ.', 'Đi một quãng đường dài đến gặp mẹ để tặng hoa.', 'Đặt một bông hoa lên ngôi mộ để tặng cho người mẹ đã mất.'],
          ans: 2,
          quote: ['cô bé nhẹ nhàng đặt bông hồng lên mộ mẹ', 'Ngay sau đó, người đàn ông quay lại cửa hàng hoa'],
          why: 'Ngay sau khi thấy cô bé đặt bông hồng lên mộ mẹ, anh quay lại hủy dịch vụ gửi hoa. Anh hiểu rằng mẹ mình vẫn còn, phải về tận nơi tặng hoa cho mẹ. Cô bé không đi đường dài, và việc cô khóc chưa làm anh đổi ý.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'fill', q: 'Viết từ chứa vần iu/ưu phù hợp với mỗi tranh:',
          items: [
            { pic: 'w11Cuu', t: 'a. {con cừu|cừu|chú cừu|cừu non}' },
            { pic: 'w11CuuHoa', t: 'b. {xe cứu hỏa|xe cứu hoả|cứu hỏa|cứu hoả}' },
            { pic: 'w11Riu', t: 'c. {cây rìu|cái rìu|rìu|chiếc rìu}' },
            { pic: 'w11Diu', t: 'd. {cái địu|địu|chiếc địu|địu em|địu con}' },
          ],
          why: 'Cừu, cứu hỏa có vần ưu; rìu, địu có vần iu. Vần ưu ít từ hơn, em nhớ: con cừu, quả lựu, cứu giúp, bưu điện, nghỉ hưu.',
        },
        {
          type: 'write', q: 'Tìm 4 - 5 từ ngữ chỉ gộp những người họ hàng: (M: cô chú)', lines: 2,
          sample: 'anh em, cậu mợ, chú thím, cô dì, chú bác',
          tip: 'Từ chỉ gộp ghép tên hai người họ hàng thành một từ, như cô chú, ông bà.',
        },
        {
          type: 'choice', q: 'Tô màu vào ô chứa từ ngữ chỉ tình cảm của ông bà, cha mẹ dành cho con cháu:',
          layout: 'cells', mark: 'color',
          opts: ['đùm bọc', 'quan tâm', 'chăm lo', 'đoàn kết', 'che chở'],
          ans: [0, 1, 2, 4],
          why: 'Ông bà, cha mẹ đùm bọc, quan tâm, chăm lo, che chở con cháu: đều là chăm sóc, bảo vệ người nhỏ hơn. Đoàn kết là nhiều người cùng chung sức với nhau, không phải tình cảm người lớn dành cho con cháu.',
        },
        {
          type: 'write', q: 'Đặt hai câu nói về tình cảm gia đình có sử dụng từ ngữ ở bài tập 6:',
          parts: [
            { label: 'Câu 1:', sample: 'Mẹ dặn: anh em trong nhà phải yêu thương, đùm bọc lẫn nhau.' },
            { label: 'Câu 2:', sample: 'Ngày Tết, cô chú về thăm và tặng quà cho anh em chúng tôi.' },
          ],
          tip: 'Mỗi câu dùng một từ chỉ gộp họ hàng em đã tìm ở bài 6 (anh em, cô chú, cậu mợ…).',
        },
        // sửa: đáp án gốc ghi "tinh thế", đúng là "tinh tế".
        {
          type: 'write', q: 'Đọc câu văn dưới đây và cho biết dấu hai chấm có tác dụng gì?',
          parts: [
            { label: 'a. Giờ đây, cô Ve xanh có một thân hình bề ngoài giống hệt các cô Ve khác: một cái đầu mượt như nhung tơ, một dáng vẻ cân đối thon thả, một bộ cánh sành điệu, mỏng tang.', sample: 'Dấu hai chấm dùng để liệt kê, giải thích cho bề ngoài của cô Ve.' },
            { label: 'b. Kĩ thuật tranh làng Hồ đã đạt tới đỉnh cao sự tinh tế: những bộ tranh tố nữ áo màu, quần hoa chanh, nền đen lĩnh của một thứ màu đen rất Việt Nam.', sample: 'Dấu hai chấm dùng để liệt kê, giải thích sự tinh tế của tranh làng Hồ.' },
          ],
          tip: 'Xem phần đứng sau dấu hai chấm: nó kể ra (liệt kê) những gì, để làm rõ cho điều gì đứng trước?',
        },
      ],
    },
  ],
};
