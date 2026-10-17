// Tuần 34: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-34.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-34', week: 34, topic: 'Cầu treo',
  read: {
    title: 'CẦU TREO',
    paras: [
      'Kĩ sư Brao(1) được giao làm một cây cầu trên sông Tuýt(2). Sau khi tìm hiểu, khảo sát bờ sông và đáy sông, ông thấy không thể xây trụ cầu được. Ông chưa tìm ra giải pháp nào để bắc cầu.',
      'Một lần, ông Brao đi dọc bờ sông. Chân ông bước mà tâm trí chỉ để vào một câu hỏi: “Làm cách nào để bắc cầu bây giờ?”. Bất chợt, đầu ông va vào một cành cây. Ông nhìn lên và thấy một chú nhện đang bỏ chạy, để lại tấm lưới vừa mới chăng. Ông xem xét một cách chăm chú và nhận ra sự kì lạ của tấm mạng nhện chăng giữa hai cành cây. Trước gió, tấm mạng nhện đung đưa, uốn éo nhưng không hề bị đứt. Ông Brao ngắm những sợi tơ nhện rồi reo lên:',
      '- Đúng rồi, cầu trên sông Tuýt sẽ là một chiếc cầu treo.',
      'Thế rồi kĩ sư Brao lao vào thiết kế cây cầu treo trên những sợi cáp. Chẳng bao lâu sau, chiếc cầu treo đầu tiên trên thế giới của kĩ sư Brao đã ra đời từ “gợi ý” của một chú nhện.',
      '(1) Brao: tên một kĩ sư nổi tiếng người Ai-xơ-len (châu Âu)',
      '(2) Tuýt: tên một con sông ở Ai-xơ-len',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Kĩ sư Brao gặp khó khăn gì khi nhận nhiệm vụ làm cây cầu trên sông Tuýt?',
          opts: ['Dòng sông quá rộng và sâu', 'Không thể xây được trụ cầu', 'Không đủ vật liệu làm trụ cầu'],
          ans: 1,
          quote: ['ông thấy không thể xây trụ cầu được'],
          why: 'Sau khi khảo sát bờ sông và đáy sông, ông Brao thấy không thể xây trụ cầu được. Bài không nói sông quá rộng, quá sâu hay thiếu vật liệu.',
        },
        {
          type: 'choice', q: 'Ý tưởng làm chiếc cầu treo của kĩ sư Brao được nảy sinh nhờ sự việc gì?',
          opts: ['Quan sát hai cành cây', 'Quan sát con nhện chạy', 'Quan sát tấm mạng nhện'],
          ans: 2,
          quote: ['nhận ra sự kì lạ của tấm mạng nhện chăng giữa hai cành cây', 'Trước gió, tấm mạng nhện đung đưa, uốn éo nhưng không hề bị đứt'],
          why: 'Ông Brao chăm chú xem tấm mạng nhện chăng giữa hai cành cây: gió thổi đung đưa mà không đứt. Từ đó ông nghĩ ra cầu treo. Hai cành cây chỉ là chỗ mạng nhện bám vào, còn con nhện thì đã bỏ chạy.',
        },
        {
          type: 'choice', q: 'Theo em, dòng nào dưới đây có thể dùng để đặt tên khác cho câu chuyện?',
          opts: ['Người kĩ sư tài năng', 'Con nhện và cây cầu', 'Một phát minh vĩ đại'],
          ans: 2,
          quote: ['chiếc cầu treo đầu tiên trên thế giới của kĩ sư Brao đã ra đời'],
          why: 'Câu chuyện kể về chiếc cầu treo đầu tiên trên thế giới ra đời như thế nào, đó là một phát minh vĩ đại. Tên "Người kĩ sư tài năng" hay "Con nhện và cây cầu" chỉ nói tới một nhân vật, chưa nói được điều quan trọng nhất của chuyện.',
        },
        {
          type: 'choice', q: 'Vì sao nói kĩ sư Brao là một nhà khoa học có tinh thần sáng tạo?',
          opts: ['Vì ông đã tìm ra cách mới, cách giải quyết mới, không bị phụ thuộc vào cái đã có', 'Vì ông đã làm hoàn thành nhiệm vụ được giao.', 'Vì ông đã tìm ra cái mới trên cơ sở tiếp thu cái đã có.'],
          ans: 0,
          quote: ['ông thấy không thể xây trụ cầu được', 'cầu trên sông Tuýt sẽ là một chiếc cầu treo'],
          why: 'Không xây được trụ cầu như cách cũ, ông Brao nghĩ ra cách mới là cầu treo trên những sợi cáp. Sáng tạo là tìm ra cách làm mới, không phụ thuộc vào cái đã có. Hoàn thành nhiệm vụ thì chưa chắc đã sáng tạo.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'write', q: 'Hãy kể những việc em đã làm để bảo vệ môi trường:', lines: 3,
          sample: 'Những việc em đã làm để bảo vệ môi trường: vứt rác đúng nơi quy định, vệ sinh đường làng ngõ xóm, không hái hoa bẻ cành, tuyên truyền mọi người bảo vệ môi trường.',
          tip: 'Nghĩ tới những việc em làm ở nhà, ở trường, ngoài đường: bỏ rác, trồng cây, tiết kiệm nước, điện…',
        },
        {
          type: 'choice', q: 'Tô màu vào ô chứa từ ngữ chỉ hành động bảo vệ môi trường:',
          layout: 'cells', mark: 'color',
          opts: ['phân loại rác', 'trồng cây', 'đi xe đạp', 'dùng túi ni-lông', 'chặt phá rừng', 'nhặt rác'],
          ans: [0, 1, 2, 5],
          why: 'Phân loại rác, trồng cây, nhặt rác giúp môi trường sạch đẹp; đi xe đạp không thải khói bụi. Dùng túi ni-lông làm rác lâu phân huỷ, chặt phá rừng làm mất cây xanh: đó là những việc làm hại môi trường.',
        },
        {
          type: 'fill', q: 'Điền từ trong ngoặc vào chỗ chấm để hoàn thành đoạn văn sau: (tươi sáng, thảm họa, chiến đấu, cải thiện, trách nhiệm)',
          items: [
            { t: 'Ngày 20 tháng 12 hằng năm là Quốc tế Đoàn kết nhân loại. Vào ngày này, mọi người sẽ cùng dành thời gian suy ngẫm, thảo luận, thống nhất những quy định, quy tắc về việc: cấm nổ mìn; {cải thiện} sức khỏe của người dân và đảm bảo rằng thuốc sẽ đến tay những người có nhu cầu; nỗ lực cứu trợ để giúp đỡ những người chịu ảnh hưởng của {thảm họa|thảm hoạ} tự nhiên hoặc nhân tạo; phổ cập giáo dục; {chiến đấu} chống lại đói nghèo, tham nhũng và khủng bố. Ngày Quốc tế Đoàn kết nhân loại là dịp để phản ánh về cách mỗi người trong chúng ta phải chịu {trách nhiệm} đối với hành động của mình trong cuộc sống hàng ngày. Trong thời gian không xa, chúng ta có thể tiến tới một tương lai {tươi sáng} hơn.' },
          ],
          why: 'Làm cho sức khỏe tốt hơn là "cải thiện" sức khỏe. Thiên tai lớn gây nhiều thiệt hại là "thảm họa". "Chiến đấu" chống lại đói nghèo. Phải "chịu trách nhiệm" về việc mình làm. Tương lai tốt đẹp là tương lai "tươi sáng".',
        },
        {
          type: 'write', q: 'Em hãy quan sát và đặt tên cho mỗi bức tranh:', pic: 't34posters',
          parts: [
            { label: 'a)', sample: 'Chung tay bảo vệ môi trường' },
            { label: 'b)', sample: 'Cấm chặt phá rừng' },
            { label: 'c)', sample: 'Trồng cây gây rừng' },
          ],
          tip: 'Nhìn xem mỗi tranh khuyên mọi người làm gì hoặc không được làm gì, rồi đặt tên ngắn gọn như một khẩu hiệu.',
        },
      ],
    },
  ],
};
