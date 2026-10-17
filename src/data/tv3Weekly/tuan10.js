// Tuần 10: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-10.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-10', week: 10, topic: 'Bà tôi',
  read: {
    title: 'BÀ TÔI', author: 'Xuân Quỳnh, Bầu trời trong quả trứng (trích)',
    paras: [
      'Bữa ăn bà thường ngồi đầu nồi, lấy đũa cả đánh tơi cơm ra rồi xới. Bà xới cho bà bát cơm trên, sau mới xới cho cả nhà và cho tôi. Khi ăn, bao giờ bà cũng ăn sau. Mùa hè bà bảo là phải quạt một chút cho mát, mùa rét thì bà bảo bà phải nghỉ một tí cho đỡ mệt rồi bà mới ăn. Bà ăn rất ít, thường thì chỉ hai lưng, một lưng cơm, một miếng cháy. Trong lúc ăn, bà hay để ý đến tôi, nếu tôi có vẻ thích ăn món gì thì bà lại ít ăn món ấy. Có khi bà chỉ cần chan một ít nước dưa hoặc ăn với một vài quả cà pháo là xong bữa.',
      'Hàng ngày chỉ có tôi và bà tôi là ở gần nhau và hay chuyện trò với nhau nhiều nhất. Tôi đi học một buổi, về lại quanh quẩn nhặt rau, lấy muối giúp bà, xâu kim cho bà vá quần áo. Khi ngồi khâu, bà hay kể cho tôi nghe bao nhiêu là truyện: Truyện Kiều, truyện Nhị Độ Mai… những truyện vần, bà thường thuộc từ đầu đến cuối.',
      'Bà tôi vẫn thường hay nói với tôi: “Bà sống được ngày nào hay ngày ấy. Người già như ngọn đèn trước gió, không biết tắt lúc nào”…',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Khi ăn cơm, bà thường ngồi ở đâu?',
          opts: ['ngồi phía trong', 'ngồi đầu nồi để xới cơm', 'ngồi giữa'],
          ans: 1,
          quote: ['Bữa ăn bà thường ngồi đầu nồi', 'lấy đũa cả đánh tơi cơm ra rồi xới'],
          why: 'Câu đầu bài đọc kể bà ngồi đầu nồi, lấy đũa cả đánh tơi cơm rồi xới cho cả nhà. Bài không nói bà ngồi phía trong hay ngồi giữa.',
        },
        {
          type: 'choice', q: 'Vì sao bà xới cho bà bát cơm trên, sau mới xới cho cả nhà và cháu?',
          opts: ['Vì bát cơm trên thường cứng, cơm sau sẽ mềm dẻo hơn.', 'Vì bà muốn ăn trước cho xong nhanh để đi làm việc khác.', 'Bà xới ra trước để nguội cơm bà mới ăn.'],
          ans: 0,
          quote: ['Bà xới cho bà bát cơm trên, sau mới xới cho cả nhà và cho tôi', 'Khi ăn, bao giờ bà cũng ăn sau'],
          why: 'Lớp cơm trên mặt nồi thường khô, cứng hơn. Bà nhận phần ấy về mình để con cháu được ăn cơm mềm dẻo. Bà không ăn trước cho nhanh, vì bài kể bao giờ bà cũng ăn sau.',
        },
        // sửa: đáp án gốc ghi B, C. "Bà ăn sau" không cho thấy bà ăn ít hay ăn đơn giản; ý A đúng với câu "chỉ hai lưng, một lưng cơm, một miếng cháy".
        {
          type: 'choice', q: 'Những chi tiết nào cho thấy bà ăn ít và ăn rất đơn giản?',
          opts: ['Bà chỉ ăn một lưng cơm, một miếng cháy.', 'Bà chan một ít nước dưa hoặc ăn với một vài quả cà pháo là xong bữa.', 'Khi ăn, bao giờ bà cũng ăn sau.'],
          ans: [0, 1],
          quote: ['Bà ăn rất ít, thường thì chỉ hai lưng, một lưng cơm, một miếng cháy', 'chan một ít nước dưa hoặc ăn với một vài quả cà pháo là xong bữa'],
          why: 'Bà chỉ ăn một lưng cơm, một miếng cháy (ăn ít) và có khi chỉ chan nước dưa, ăn vài quả cà pháo (ăn đơn giản). Ý "bà ăn sau" nói bà nhường con cháu, chứ không nói bà ăn ít hay ăn đơn giản.',
        },
        {
          type: 'write', q: 'Câu “Trong lúc ăn, bà hay để ý đến tôi, nếu tôi có vẻ thích ăn món gì thì bà lại ít ăn món ấy.” cho ta thấy điều gì?', lines: 2,
          quote: ['Trong lúc ăn, bà hay để ý đến tôi, nếu tôi có vẻ thích ăn món gì thì bà lại ít ăn món ấy'],
          sample: 'Câu văn cho ta thấy bà rất yêu thương cháu, luôn nhường nhịn để cháu được ăn ngon.',
          tip: 'Bà ít ăn món cháu thích để làm gì? Điều đó cho thấy tình cảm của bà với cháu thế nào?',
        },
        {
          type: 'choice', q: 'Nội dung đoạn 2 cho em biết điều gì?',
          opts: ['Bạn nhỏ rất chăm chỉ làm việc nhà.', 'Bà thuộc rất nhiều thơ vần.', 'Bạn nhỏ rất yêu thương bà và luôn quấn quýt bên bà.'],
          ans: 2,
          quote: ['Hàng ngày chỉ có tôi và bà tôi là ở gần nhau và hay chuyện trò với nhau nhiều nhất', 'quanh quẩn nhặt rau, lấy muối giúp bà, xâu kim cho bà vá quần áo'],
          why: 'Đoạn 2 kể bạn nhỏ luôn ở gần bà, chuyện trò, giúp bà nhặt rau, xâu kim, nghe bà kể chuyện: bạn quấn quýt bên bà. Việc giúp bà và chuyện bà thuộc truyện vần chỉ là từng chi tiết nhỏ, không phải ý chính của cả đoạn.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        // sửa: đáp án gốc ghi "con khiếu", đúng là "con khướu" (chim khướu).
        {
          type: 'spell', rule: 'ieuuou', q: 'Điền iêu/ươu vào chỗ chấm và thêm dấu thanh (nếu có) để tạo từ:',
          items: ['liêu [xiêu]', 'con [khướu]', '[hiếu] thảo', 'ốc [bươu]', '[kiêu] ngạo', 'cái [siêu]'],
          notes: {
            'liêu xiêu': '<b>liêu xiêu</b> là nghiêng ngả, không đứng vững; viết vần <b>iêu</b>.',
            'cái siêu': '<b>siêu</b> là cái ấm nhỏ có cán, dùng để sắc thuốc, đun nước; viết vần <b>iêu</b>.',
          },
        },
        {
          type: 'sort',
          q: 'Xếp các từ in đậm trong đoạn văn sau vào nhóm thích hợp:',
          text: ['Suốt những năm thơ ấu, tôi thường **ngủ** cạnh bà. Tôi còn **nhớ** là bà **nằm** rất **ít** chỗ, có khi bà chỉ nằm **nghiêng** suốt đêm bên lề cái phản **hẹp**, còn tôi thì **vùng vẫy**, **xoay xở** gần hết cả phản. Khi ấy tôi cũng không hiểu là do bà tôi **bé nhỏ** hay là bà quen nằm hẹp như vậy.'],
          words: ['ngủ', 'nhớ', 'nằm', 'ít', 'nghiêng', 'hẹp', 'vùng vẫy', 'xoay xở', 'bé nhỏ'],
          groups: [
            { label: 'Từ ngữ chỉ hoạt động', kind: 'hd', words: ['ngủ', 'nhớ', 'nằm', 'vùng vẫy', 'xoay xở'] },
            { label: 'Từ ngữ chỉ đặc điểm', kind: 'dd', words: ['ít', 'nghiêng', 'hẹp', 'bé nhỏ'] },
          ],
          why: 'Ngủ, nhớ, nằm, vùng vẫy, xoay xở là việc bà và bạn nhỏ làm (trả lời "Làm gì?"). Ít, nghiêng, hẹp, bé nhỏ tả chỗ nằm, cái phản, dáng người của bà (trả lời "Thế nào?").',
        },
        // sửa: câu mẫu gốc "ngủ nướng" dùng từ chỉ hoạt động; đổi sang từ chỉ đặc điểm "hẹp".
        {
          type: 'write', q: 'Đặt 2 câu với hai từ ngữ chỉ đặc điểm ở bài tập 7.',
          parts: [
            { label: 'Câu 1:', sample: 'Con đường vào làng em rất hẹp.' },
            { label: 'Câu 2:', sample: 'Bóng dáng bé nhỏ ấy mỗi lúc một xa.' },
          ],
          tip: 'Chọn hai từ trong nhóm đặc điểm: ít, nghiêng, hẹp, bé nhỏ.',
        },
        {
          type: 'choice', q: 'Khoanh vào chữ cái đặt trước câu khiến:', letters: 'abc',
          opts: ['Bà ơi, sao bà ăn ít thế ạ?', 'Bà ơi, bà ăn thêm cơm nữa đi!', 'Bà nấu ăn ngon quá!'],
          ans: 1,
          why: 'Câu khiến dùng để đề nghị, yêu cầu người khác làm gì, thường có hãy, đừng, chớ, đi, thôi, nào. Câu b mời bà ăn thêm và có từ "đi". Câu a là câu hỏi, câu c là câu cảm (khen bà nấu ngon).',
        },
        {
          type: 'write', q: 'Sử dụng các từ hãy, đừng, chớ, nhé, đi, thôi, nào để đặt câu khiến phù hợp với mỗi tình huống sau:', pic: 'w10Khien',
          parts: [
            { label: 'a) Cô giáo nói:', sample: 'Các em hãy nhìn lên bảng!' },
            { label: 'b) Bạn nữ nói:', sample: 'Chúng mình cùng đi học thôi!' },
          ],
          tip: 'Câu khiến có từ hãy, đừng, chớ, đi, thôi, nào… và thường kết thúc bằng dấu chấm than.',
        },
      ],
    },
  ],
};
