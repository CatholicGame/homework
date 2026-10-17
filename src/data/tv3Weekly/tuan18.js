// Tuần 18: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-18.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// sửa: bài đọc gốc viết lẫn "Rô-ma-nốp" / "Rô-ma-nôp", thống nhất là "Rô-ma-nốp".
export default {
  id: 'tuan-18', week: 18, topic: 'Những điều lí thú về tên người',
  read: {
    title: 'NHỮNG ĐIỀU LÍ THÚ VỀ TÊN NGƯỜI', author: 'Tổng hợp từ báo chí trong nước và nước ngoài',
    paras: [
      'Các dân tộc trên thế giới, thậm chí các vùng trong một nước có những tục lệ rất khác nhau trong việc đặt và sử dụng tên người.',
      'Ở nhiều dân tộc, tên người gồm họ và tên. Ngoài họ, tên, một số dân tộc còn thêm tên đệm (người Việt), phụ danh (người Nga). Ví dụ: đọc tên một người Nga là Vích-to Xéch-ghê-ê-vích Rô-ma-nốp, ta biết anh ấy tên là Vích-to, bố là Xéc-gây, thuộc dòng họ Rô-ma-nốp.',
      'Ngược lại, người một số dân tộc khác chỉ có tên, không có họ. Người Hà Nhì ở Lai Châu, Nghĩa Lộ lấy tên cha làm họ cho con. Ở một số vùng thuộc tỉnh Hà Tây, người ta lấy tên đệm của cha làm họ cho con gái. Ví dụ: cha là Đỗ Minh Vượng, con gái là Minh Thị Phúc.',
      'Theo quan niệm truyền thống, cái tên cũng là sự gửi gắm mơ ước, hi vọng của người cha, người mẹ dành cho con mình. Một cái tên hay, tươi sáng sẽ là sự báo hiệu, sự mở đầu cho một cuộc đời nhiều may mắn, thành công.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Theo bài đọc, dân tộc Việt Nam khi đặt tên thường có thêm gì:',
          opts: ['Tên địa danh', 'Tên riêng', 'Tên đệm'],
          ans: 2,
          quote: ['còn thêm tên đệm (người Việt)'],
          why: 'Bài đọc nói ngoài họ và tên, một số dân tộc còn thêm tên đệm, và ghi rõ trong ngoặc là người Việt. Tên riêng thì dân tộc nào cũng có, tên địa danh không dùng để đặt tên người.',
        },
        {
          type: 'choice', q: 'Khi đặt tên, người Nga thường gồm có những bộ phận gì ở trong tên?',
          opts: ['Họ, tên, tên đệm', 'Họ, tên, phụ danh', 'Phụ danh, tên đệm'],
          ans: 1,
          quote: ['tên người gồm họ và tên', 'phụ danh (người Nga)'],
          why: 'Tên người Nga có họ, tên và thêm phụ danh (tên lấy theo bố), như Vích-to (tên), Xéch-ghê-ê-vích (phụ danh), Rô-ma-nốp (họ). Tên đệm là của người Việt.',
        },
        {
          type: 'choice', q: 'Người Hà Nhì ở Lai Châu, Nghĩa Lộ đã lấy tên cha để:',
          opts: ['làm tên cho con', 'làm họ cho con', 'không để làm gì cả'],
          ans: 1,
          quote: ['Người Hà Nhì ở Lai Châu, Nghĩa Lộ lấy tên cha làm họ cho con'],
          why: 'Bài đọc viết người Hà Nhì "lấy tên cha làm họ cho con". Tên cha trở thành họ, không phải tên của con.',
        },
        {
          type: 'choice', q: 'Một số người dân vùng nào lấy tên đệm của cha làm họ cho con gái?',
          opts: ['Hà Tây', 'Cao Bằng', 'Lạng Sơn'],
          ans: 0,
          quote: ['Ở một số vùng thuộc tỉnh Hà Tây, người ta lấy tên đệm của cha làm họ cho con gái'],
          why: 'Bài đọc nhắc tỉnh Hà Tây, với ví dụ cha là Đỗ Minh Vượng, con gái là Minh Thị Phúc. Cao Bằng, Lạng Sơn không có trong bài.',
        },
        {
          type: 'write', q: 'Ai là người đã đặt tên cho em? Tên của em có ý nghĩa gì?', lines: 3,
          sample: 'Bố mẹ đã đặt tên cho em là Minh An. "Minh" là sáng suốt, thông minh, "An" là bình an. Bố mẹ mong em lớn lên thông minh và luôn bình an.',
          tip: 'Em hỏi bố mẹ, ông bà xem ai đặt tên cho em và tên ấy gửi gắm mong ước gì.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'sort', q: 'Đọc đoạn văn, viết từ ngữ được gạch chân vào nhóm thích hợp: "Trước mặt Minh, đầm sen rộng mênh mông. Những bông sen trắng, sen hồng khẽ đu đưa nổi bật trên nền lá xanh mượt. Giữa đầm, mẹ con bác Tâm đang bơi chiếc mủng đi hái hoa sen cho tổ. Bác cẩn thận ngắt từng bông, bó (1) thành từng bó (2), ngoài bọc một chiếc lá rồi để nhè nhẹ vào lòng thuyền."',
          words: ['đầm sen', 'rộng', 'mênh mông', 'bông sen', 'đu đưa', 'xanh mượt', 'bơi', 'chiếc mủng', 'hái', 'tổ', 'cẩn thận', 'ngắt', 'bó (1)', 'bó (2)', 'bọc', 'để', 'nhè nhẹ'],
          groups: [
            { label: 'Từ ngữ chỉ sự vật', kind: 'sv', words: ['đầm sen', 'bông sen', 'chiếc mủng', 'tổ', 'bó (2)'] },
            { label: 'Từ ngữ chỉ hoạt động', kind: 'hd', words: ['đu đưa', 'bơi', 'hái', 'ngắt', 'bó (1)', 'bọc', 'để'] },
            { label: 'Từ ngữ chỉ đặc điểm', kind: 'dd', words: ['rộng', 'mênh mông', 'xanh mượt', 'cẩn thận', 'nhè nhẹ'] },
          ],
          why: 'Chữ "bó" xuất hiện hai lần với hai nghĩa: "bó (1) thành từng..." là việc làm (buộc hoa lại), còn "từng bó (2)" là một vật (một bó hoa). Rộng, mênh mông, xanh mượt, cẩn thận, nhè nhẹ trả lời câu hỏi "Thế nào?" nên là từ chỉ đặc điểm.',
        },
        {
          type: 'underline', q: 'Gạch dưới những hình ảnh so sánh có trong khổ thơ sau (Đỗ Trung Quân). Trong khổ thơ trên, em tìm và ghi lại: từ ngữ chỉ sự vật, từ ngữ chỉ hoạt động, từ ngữ chỉ đặc điểm.',
          marks: [{ n: 1, kind: 'ss' }],
          lines: ['Quê hương là con diều biếc', 'Tuổi thơ con thả trên đồng', 'Quê hương là con đò nhỏ', 'Êm đềm khua nước ven sông.'],
          ans: { 1: ['Quê hương là con diều biếc', 'Quê hương là con đò nhỏ'] },
          why: 'Quê hương được so sánh với con diều biếc và con đò nhỏ, nối bằng từ "là". Phần tìm từ: sự vật là quê hương, con diều, tuổi thơ, con, đồng, đò, nước, sông; hoạt động là thả, khua; đặc điểm là biếc, nhỏ, êm đềm.',
        },
        // sửa: đề gốc viết "…con rắn giả đấy [ ] bố mua cho Hùng…" với chữ "bố" viết thường sau dấu chấm; viết hoa "Bố" cho đúng.
        {
          type: 'spell', q: 'Điền dấu câu thích hợp vào chỗ chấm: "Hai đứa nhỏ trong nhà chạy ra […] Chúng ríu rít vây quanh bố và bi bô nói chuyện: - Bố có mua quà cho con không ạ […] - Có, bố có quà cho các con đây […] Bỗng cu Hùng hét toáng lên: - Ôi con rắn […] Con rắn to quá […] Nó có cắn con không hả bố […] - Không, đó là con rắn giả đấy […] Bố mua cho Hùng để Hùng chơi […]"',
          // Tách thành cụm ngắn theo thứ tự trong đoạn (ô chính tả không chứa được cả câu dài).
          items: [
            'nhà chạy ra[./?/!]', 'con không ạ[?/./!]', 'các con đây[./?/!]', 'Ôi con rắn[!/./?]',
            'rắn to quá[!/./?]', 'không hả bố[?/./!]', 'rắn giả đấy[./?/!]', 'Hùng chơi[./?/!]',
          ],
          why: 'Dấu chấm (.) đặt cuối câu kể. Dấu chấm hỏi (?) đặt cuối câu hỏi (có "không", "hả"…). Dấu chấm than (!) đặt cuối câu bộc lộ cảm xúc như ngạc nhiên, sợ hãi (Ôi con rắn! Con rắn to quá!).',
        },
        {
          type: 'write', q: 'Đặt câu sử dụng cặp từ trái nghĩa:',
          parts: [
            { label: 'a) sáng – tối:', sample: 'Anh ấy làm việc từ sáng đến tối rất chăm chỉ.' },
            { label: 'b) gầy – béo:', sample: 'Bạn Nam thì gầy còn bạn Hùng thì béo.' },
          ],
          tip: 'Mỗi câu dùng cả hai từ trái nghĩa. Nhớ viết hoa đầu câu và có dấu chấm cuối câu.',
        },
      ],
    },
  ],
};
