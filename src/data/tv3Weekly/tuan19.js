// Tuần 19: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-19.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-19', week: 19, topic: 'Cơn dông',
  read: {
    title: 'CƠN DÔNG', author: 'Đoàn Giỏi',
    paras: [
      'Gió bắt đầu thổi mạnh. Bỗng cơn dông ùn ùn thổi tới. Mây ở đâu dưới rừng xa ùn lên đen xì như núi, bao trùm gần kín cả bầu trời. Từng mảng mây khói đen là là hạ thấp xuống mặt kênh làm tối sầm mặt đất. Sóng bắt đầu gào thét, chồm lên tung bọt trắng xoá. Từng đàn cò bay vùn vụt theo mây, ngẩng mặt trông theo gần như không kịp.',
      'Gió càng thổi mạnh, ầm ầm ù ù. Cây đa cổ thụ cành lá rậm xùm xoà đang quằn lên, vặn xuống. Trời mỗi lúc một tối sầm lại. Vũ trụ quay cuồng trong cơn mưa gió mãnh liệt. Những tia chớp xé rách bầu trời đen kịt, phát ra những tiếng nổ kinh thiên động địa.',
      'Một lúc sau gió dịu dần, mưa tạnh hẳn. Trên ngọn đa, mấy con chim chào mào xôn xao chuyền cành nhảy nhót, hót líu lo. Nắng vàng màu da chanh phủ lên cây một thứ ánh sáng dịu mát, trong suốt, lung linh.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Bài văn miêu tả cảnh vào thời điểm nào?',
          opts: ['trong cơn dông', 'bắt đầu cơn dông đến lúc hết', 'sau cơn dông'],
          ans: 1,
          quote: ['Gió bắt đầu thổi mạnh. Bỗng cơn dông ùn ùn thổi tới', 'Một lúc sau gió dịu dần, mưa tạnh hẳn'],
          why: 'Đoạn đầu tả lúc gió bắt đầu thổi, cơn dông kéo tới. Đoạn hai tả lúc dông to nhất. Đoạn cuối tả lúc gió dịu, mưa tạnh. Vậy bài tả từ lúc bắt đầu cơn dông đến lúc hết, không chỉ trong hay sau cơn dông.',
        },
        {
          type: 'choice', q: 'Dấu hiệu nào cho thấy cơn giông rất lớn?',
          opts: ['Gió thổi mạnh, sóng chồm lên, cây cối quằn lên, vặn xuống, sấm sét vang trời', 'Vũ trụ quay cuồng', 'Cả hai đáp án trên'],
          ans: 2,
          quote: ['Sóng bắt đầu gào thét, chồm lên tung bọt trắng xoá', 'đang quằn lên, vặn xuống', 'Vũ trụ quay cuồng trong cơn mưa gió mãnh liệt', 'phát ra những tiếng nổ kinh thiên động địa'],
          why: 'Bài tả gió mạnh, sóng chồm lên, cây đa quằn lên vặn xuống, tiếng nổ kinh thiên động địa, và cả "vũ trụ quay cuồng". Cả hai ý A và B đều là dấu hiệu cơn dông rất lớn, nên chọn C.',
        },
        {
          // sửa: đáp án gốc ghi B (cây đa đau đớn); câu văn cho thấy dông mạnh đến mức cây cổ thụ cũng bị lay chuyển, nên chọn C.
          type: 'choice', q: 'Hình ảnh “Cây đa cổ thụ cành lá rậm xùm xoà đang quằn lên, vặn xuống.” nói lên điều gì?',
          opts: ['Cây đa rất to lớn.', 'Cây đa rất đau đớn vì mưa giông.', 'Mưa giông to đến nỗi làm cả cây cổ thụ cũng phải lay chuyển.'],
          ans: 2,
          quote: ['Gió càng thổi mạnh, ầm ầm ù ù', 'Cây đa cổ thụ cành lá rậm xùm xoà đang quằn lên, vặn xuống'],
          why: 'Cây đa cổ thụ rất to, rất chắc mà vẫn bị gió quật quằn lên, vặn xuống. Hình ảnh ấy cho thấy cơn dông mạnh khủng khiếp. Câu văn không nhằm khoe cây to, cũng không nói cây biết đau.',
        },
        {
          type: 'choice', q: 'Trong đoạn văn trên, tác giả đã sử dụng những giác quan nào khi miêu tả cơn dông?',
          opts: ['Thính giác, khứu giác', 'Thị giác, khứu giác', 'Thị giác, thính giác'],
          ans: 2,
          quote: ['Mây ở đâu dưới rừng xa ùn lên đen xì như núi', 'Gió càng thổi mạnh, ầm ầm ù ù', 'phát ra những tiếng nổ kinh thiên động địa'],
          why: 'Tác giả nhìn thấy mây đen, sóng, cây đa, tia chớp (thị giác: mắt) và nghe thấy gió ầm ầm ù ù, tiếng nổ, chim hót (thính giác: tai). Bài không tả mùi gì nên không có khứu giác.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'choice', q: 'Câu: “Trời mỗi lúc một tối sầm lại.” thuộc kiểu câu:',
          opts: ['Câu giới thiệu', 'Câu nêu hoạt động', 'Câu nêu đặc điểm'],
          ans: 2,
          why: 'Câu cho biết trời thế nào (tối sầm lại), "tối sầm" là từ chỉ đặc điểm, nên đây là câu nêu đặc điểm. Câu không giới thiệu ai là gì, cũng không kể việc ai làm.',
        },
        {
          type: 'underline', q: 'Gạch dưới từ ngữ chỉ hoạt động trong câu:',
          marks: [{ n: 1, kind: 'hd' }],
          lines: ['Sóng bắt đầu gào thét, chồm lên, tung bọt trắng xóa.'],
          ans: { 1: ['gào thét', 'chồm lên', 'tung'] },
          ok: ['bắt đầu'],
          why: 'Sóng làm gì? Sóng gào thét, chồm lên, tung bọt. Đó là các từ chỉ hoạt động. "Trắng xóa" tả màu của bọt, là từ chỉ đặc điểm.',
        },
        {
          // sửa: đáp án gốc bỏ sót "chớp" (cũng là hiện tượng tự nhiên) và ghi "đen sì", đề là "đen xì".
          type: 'sort', q: 'Viết các từ dưới đây vào nhóm thích hợp:',
          words: ['dông', 'lốc', 'tối sầm', 'đen xì', 'chớp', 'sấm', 'bồng bềnh', 'cầu vồng', 'bão', 'mây', 'sáng lóe'],
          groups: [
            { label: 'Từ ngữ chỉ hiện tượng tự nhiên', words: ['dông', 'lốc', 'chớp', 'sấm', 'cầu vồng', 'bão', 'mây'] },
            { label: 'Từ ngữ chỉ đặc điểm', kind: 'dd', words: ['tối sầm', 'đen xì', 'bồng bềnh', 'sáng lóe'] },
          ],
          why: 'Dông, lốc, chớp, sấm, cầu vồng, bão, mây là những hiện tượng xảy ra trong tự nhiên, trên bầu trời. Tối sầm, đen xì, bồng bềnh, sáng lóe tả trời, mây, tia chớp trông thế nào, nên là từ chỉ đặc điểm.',
        },
        {
          // Đề: khoanh câu cảm, gạch dưới câu khiến. Trên app: xếp mỗi câu vào nhóm câu cảm hoặc câu khiến.
          type: 'sort', q: 'Khoanh vào chữ đặt trước câu cảm, gạch dưới câu khiến trong các câu sau (xếp mỗi câu vào đúng nhóm):',
          words: ['a. Nhìn kìa! Cơn dông to quá!', 'b. Những tia chớp cùng những tiếng nổ thật kinh hoàng!', 'c. Chạy nhanh lên đi, cơn dông ập tới rồi.', 'd. Lúc nào tạnh mưa, mình cùng đi xem cầu vồng nhé!'],
          groups: [
            { label: 'Câu cảm (khoanh)', words: ['a. Nhìn kìa! Cơn dông to quá!', 'b. Những tia chớp cùng những tiếng nổ thật kinh hoàng!'] },
            { label: 'Câu khiến (gạch dưới)', words: ['c. Chạy nhanh lên đi, cơn dông ập tới rồi.', 'd. Lúc nào tạnh mưa, mình cùng đi xem cầu vồng nhé!'] },
          ],
          why: 'Câu cảm bộc lộ cảm xúc (ngạc nhiên, sợ hãi…), thường có từ quá, thật: "to quá", "thật kinh hoàng". Câu khiến dùng để đề nghị, rủ rê người khác làm gì, thường có từ đi, nhé, hãy: "Chạy nhanh lên đi", "mình cùng đi xem cầu vồng nhé".',
        },
        {
          type: 'write', q: 'Chuyển câu kể dưới đây thành câu cảm và câu khiến:',
          parts: [
            { label: 'a. Minh chơi đá bóng. Câu cảm:', sample: 'Minh chơi đá bóng hay quá!' },
            { label: 'a. Minh chơi đá bóng. Câu khiến:', sample: 'Minh chơi đá bóng đi!' },
            { label: 'b. Lâm viết đẹp. Câu cảm:', sample: 'Lâm viết đẹp quá!' },
            { label: 'b. Lâm viết đẹp. Câu khiến:', sample: 'Lâm hãy viết đẹp lên!' },
          ],
          tip: 'Câu cảm thêm các từ quá, thật, lắm, ôi và kết thúc bằng dấu chấm than. Câu khiến thêm các từ hãy, đi, nào, thôi để đề nghị, yêu cầu.',
        },
        {
          // sửa: câu mẫu gốc "Mưa đá thật đáng sợ quá!" thừa một từ cảm, bỏ "quá".
          type: 'write', q: 'Đặt câu cảm có chứa các từ:',
          parts: [
            { label: '- cầu vồng:', sample: 'Cầu vồng trông mới đẹp làm sao!' },
            { label: '- mưa đá:', sample: 'Mưa đá thật đáng sợ!' },
            { label: '- sét:', sample: 'Tiếng sét to quá!' },
          ],
          tip: 'Câu cảm bộc lộ cảm xúc của em, thường có các từ quá, thật, lắm, làm sao, ôi và kết thúc bằng dấu chấm than.',
        },
      ],
    },
  ],
};
