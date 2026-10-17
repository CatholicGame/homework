// Tuần 6: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-06.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-6', week: 6, topic: 'Bạn mới',
  read: {
    title: 'BẠN MỚI', author: 'Theo Na-riu-ki (Anh Chi dịch)',
    paras: [
      'Giờ ra chơi, cả lớp ùa ra sân trường. A-i-a là học sinh mới, chưa quen ai nên không tham gia nhóm nào. Thấy cô bé thơ thẩn ngoài sân, thầy giáo bảo: “Em vào chơi với các bạn đi!”. Được thầy khích lệ, A-i-a cất tiếng: “Cho mình... chơi... với!”. Nhưng em nói nhỏ quá nên chẳng ai nghe thấy. “Nào, các em!”. Nghe tiếng thầy giáo, tất cả liền dừng chơi. A-i-a lấy hết can đảm, nhắc lại một lần nữa: “Cho mình... chơi với!”.',
      'Nhưng khi đến lượt làm người đuổi bắt, A-i-a không bắt nổi ai vì cô bé chạy quá chậm. “Người đuổi bắt mà chậm thế này thì chán quá!” − Tét-su-ô kêu lên, khiến A-i-a càng lúng túng. Thầy giáo đứng quan sát học trò. Thầy gọi A-i-a vào lớp, hỏi: “Em cho thầy xem bức tranh em mới vẽ được không? Các bạn nói là em vẽ đẹp lắm.”. Kể từ hôm đó, cứ đến giờ ra chơi là A-i-a lại mang các bức vẽ đến cho thầy xem. Thầy treo những bức tranh đó trên bức tường dọc hành lang. “Tranh đẹp quá!”, “Tranh của A-i-a đấy!” − Các bạn trong trường bàn tán xôn xao.',
      'Một hôm, Tét-su-ô đến gặp A-i-a, bảo: “Ngày mai, cậu chơi đuổi bắt với chúng tớ nhé!”.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        // sửa: đáp án gốc ghi A, bài đọc nói rõ "A-i-a là học sinh mới, chưa quen ai nên không tham gia nhóm nào" → B.
        {
          type: 'choice', q: 'Vì sao trong giờ ra chơi, A-i-a không tham gia cùng nhóm nào?',
          opts: ['vì em chạy chậm quá, các bạn không muốn chơi cùng', 'vì em là học sinh mới, chưa quen ai', 'vì em nói bé quá, các bạn không nghe thấy tiếng gọi xin chơi cùng của em'],
          ans: 1,
          quote: ['A-i-a là học sinh mới, chưa quen ai nên không tham gia nhóm nào'],
          why: 'Ngay câu thứ hai, bài đọc nói A-i-a là học sinh mới, chưa quen ai nên không vào nhóm nào. Chuyện chạy chậm và nói nhỏ xảy ra sau đó, không phải lí do lúc đầu.',
        },
        {
          type: 'choice', q: 'Những chi tiết nào cho thấy A-i-a rất rụt rè?',
          opts: ['chơi thơ thẩn ngoài sân một mình', 'nói (gọi) nhỏ quá, các bạn không nghe thấy', 'chạy chậm, không đuổi kịp các bạn'],
          ans: [0, 1],
          quote: ['thơ thẩn ngoài sân', 'em nói nhỏ quá nên chẳng ai nghe thấy'],
          why: 'Rụt rè là ngại ngùng, không dám mạnh dạn. A-i-a đứng thơ thẩn một mình, xin chơi thì nói nhỏ quá nên không ai nghe. Chạy chậm là sức chạy của em, không phải tính rụt rè.',
        },
        {
          type: 'choice', q: 'Thầy giáo đã giúp A-i-a tự tin bằng cách nào?',
          opts: ['Gọi các bạn và yêu cầu các bạn chơi cùng cô bé.', 'Đứng quan sát các học trò chơi.', 'Treo các bức tranh do A-i-a vẽ dọc hành lang để các bạn biết về thế mạnh của cô bé.'],
          ans: 2,
          quote: ['Thầy treo những bức tranh đó trên bức tường dọc hành lang', 'Các bạn trong trường bàn tán xôn xao'],
          why: 'Thầy treo tranh của A-i-a dọc hành lang, cả trường khen tranh đẹp, nhờ vậy em tự tin hơn. Thầy chỉ gọi các bạn dừng chơi để nghe A-i-a, không bắt các bạn chơi cùng. Đứng quan sát chưa phải là cách giúp.',
        },
        {
          type: 'choice', q: 'Theo em, vì sao Tét-su-ô chủ động đến rủ A-i-a cùng chơi?',
          opts: ['Vì thầy giáo yêu cầu bạn ấy làm thế.', 'Vì A-i-a đã tập luyện và chạy nhanh hơn.', 'Vì Tét-su-ô đã hiểu và quý mến người bạn mới.'],
          ans: 2,
          quote: ['Tranh đẹp quá!', 'Một hôm, Tét-su-ô đến gặp A-i-a'],
          why: 'Khi thấy tranh A-i-a vẽ đẹp, các bạn hiểu và quý A-i-a hơn, nên Tét-su-ô tự đến rủ bạn chơi. Bài không nói thầy bảo Tét-su-ô, cũng không nói A-i-a đã chạy nhanh hơn.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'rdgi', q: 'a) Điền r/d/gi vào chỗ chấm trong các câu thành ngữ, tục ngữ. b) Điền an/ang vào chỗ chấm trong các câu thành ngữ, tục ngữ.',
          items: [
            '[d]ây mơ [r]ễ má.', 'Rút [d]ây động rừng.', '[gi]ấy trắng mực đen.', '[gi]ương đông kích tây.', '[gi]eo gió gặt bão.', '[d]ãi gió [d]ầm mưa.',
            'Đen như hòn [than/thang].', 'Bắc [thang/than] lên hỏi ông trời.', 'Đi một ngày [đàng/đàn], học một [sàng/sàn] khôn.',
          ],
          notes: {
            'Rút dây động rừng.': 'dây: sợi dây leo trong rừng, rút dây thì cả khu rừng rung động.',
            'giấy trắng mực đen.': 'giấy: tờ giấy để viết, ý nói đã viết rõ ràng trên giấy.',
            'giương đông kích tây.': 'giương: giơ cao lên, như giương cờ, giương cung.',
            'gieo gió gặt bão.': 'gieo: rắc hạt giống xuống đất, như gieo hạt.',
            'Đen như hòn than.': 'than: cục than đen dùng để đun bếp, vần an.',
            'Bắc thang lên hỏi ông trời.': 'thang: cái thang để trèo lên cao, vần ang.',
          },
          why: 'Phần a): r, d, gi không có luật chắc chắn, em nhớ nghĩa từng tiếng: dây (sợi dây), rễ (rễ cây), giấy (tờ giấy), gieo (gieo hạt), dãi dầm (chịu nắng gió). Phần b): đọc to để nghe âm cuối: hòn than, cái thang, đàng (con đường), sàng (cái sàng gạo) đều có nghĩa riêng.',
        },
        // sửa: đề gốc ghi "cột cờ" hai lần, chỉ giữ một lần để xếp.
        {
          type: 'sort', q: 'Xếp các từ ngữ về nhà trường vào nhóm thích hợp:',
          words: ['thư viện', 'cột cờ', 'hiệu trưởng', 'căng-tin', 'tổng phụ trách', 'sân trường', 'sao đỏ', 'ghế đá'],
          groups: [
            { label: 'Người làm việc ở trường', words: ['hiệu trưởng', 'tổng phụ trách', 'sao đỏ'] },
            { label: 'Cảnh vật ở trường', words: ['thư viện', 'cột cờ', 'căng-tin', 'sân trường', 'ghế đá'] },
          ],
          why: 'Hiệu trưởng, tổng phụ trách, sao đỏ là người (trả lời câu hỏi "Ai?"). Thư viện, cột cờ, căng-tin, sân trường, ghế đá là nơi chốn, đồ vật em nhìn thấy ở trường (trả lời câu hỏi "Cái gì?").',
        },
        {
          type: 'fill', q: 'Quan sát tranh và sử dụng từ ngữ ở bài tập 6 để đặt câu:',
          items: [
            { pic: 't6library', t: 'a) Các bạn đang mượn sách ở {thư viện|thư viện trường}.' },
            { pic: 't6canteen', t: 'b) Chúng em cùng ăn trưa tại {căng tin|căng-tin|căng – tin|căn tin}.' },
          ],
          why: 'Thư viện là nơi có nhiều giá sách để các bạn đọc và mượn sách. Căng-tin là nơi bán đồ ăn, nơi các bạn ngồi ăn trưa cùng nhau.',
        },
        {
          type: 'choice', q: 'Khoanh vào chữ cái trước câu hỏi:',
          letters: ['a', 'b', 'c'],
          opts: ['Giờ ra chơi giúp chúng mình được thư giãn và gắn kết với nhau hơn.', 'Bạn cho rằng những giờ ra chơi có ý nghĩa như thế nào?', 'Giờ ra chơi thật là vui biết bao!'],
          ans: 1,
          why: 'Câu hỏi dùng để hỏi điều mình chưa biết, thường có từ để hỏi (như thế nào, ai, gì…) và cuối câu có dấu chấm hỏi. Câu a là câu kể (dấu chấm), câu c là câu cảm (dấu chấm than).',
        },
      ],
    },
  ],
};
