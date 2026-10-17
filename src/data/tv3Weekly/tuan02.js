// Tuần 2: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-02.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-2', week: 2, topic: 'Ngày như thế nào là đẹp',
  read: {
    title: 'NGÀY NHƯ THẾ NÀO LÀ ĐẸP', author: 'Ô-xê-ê-va, Thúy Toàn dịch',
    paras: [
      'Châu Chấu nhảy lên gò, chìa cái lưng màu xanh ra phơi nắng. Nó búng chân tanh tách, cọ giữa đôi càng:',
      '- Một ngày tuyệt đẹp!',
      '- Thật khó chịu! – Giun Đất thốt lên, cố rúc đầu sâu thêm vào lớp đất khô.',
      '- Thế là thế nào? – Châu Chấu nhảy lên. – Trên trời không một gợn mây, mặt trời tỏa nắng huy hoàng.',
      '- Không! Mưa bụi và những vũng nước đục, đó mới là một ngày tuyệt đẹp! – Giun Đất cãi lại.',
      'Châu Chấu không đồng ý với Giun Đất. Chúng quyết định đi hỏi. Vừa hay lúc đó Kiến tha nhành lá thông đi qua, đỗ lại nghỉ. Châu Chấu hỏi Kiến:',
      '- Bác Kiến ơi, hãy nói giúp xem hôm nay là một ngày tuyệt đẹp hay đáng ghét?',
      'Kiến lau mồ hôi, ngẫm nghĩ một lát rồi nói:',
      '- Tôi sẽ trả lời câu hỏi của các bạn sau khi mặt trời lặn nhé.',
      'Thế rồi mặt trời cũng lặn, chúng đi đến tổ kiến.',
      '- Hôm nay là ngày thế nào hả bác Kiến đáng kính?',
      '- Hôm nay là một ngày tuyệt đẹp! Tôi đã làm việc rất tốt và bây giờ có thể nghỉ ngơi thoải mái.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          // Đề để trống tên nhân vật sau mỗi phương án; ghi sẵn tên để bé chọn được.
          type: 'choice', q: 'Trong câu chuyện trên có mấy nhân vật? Đó là những nhân vật nào?',
          opts: ['2 nhân vật, đó là: Châu Chấu, Giun Đất', '3 nhân vật, đó là: Châu Chấu, Giun Đất, bác Kiến', '4 nhân vật, đó là: Châu Chấu, Giun Đất, bác Kiến, mặt trời'],
          ans: 1,
          quote: ['Châu Chấu nhảy lên gò', 'Giun Đất thốt lên', 'Kiến tha nhành lá thông đi qua'],
          why: 'Truyện có ba con vật biết nói và tham gia câu chuyện: Châu Chấu, Giun Đất và bác Kiến. Mặt trời chỉ là cảnh vật, không nói, không làm gì nên không phải nhân vật.',
        },
        {
          type: 'choice', q: 'Châu Chấu và Giun Đất tranh luận với nhau về điều gì?',
          opts: ['Thời tiết như thế nào sẽ làm được việc tốt.', 'Cảnh như thế nào là đẹp.', 'Ngày như thế nào là đẹp.'],
          ans: 2,
          quote: ['Một ngày tuyệt đẹp!', 'đó mới là một ngày tuyệt đẹp'],
          why: 'Châu Chấu khen "Một ngày tuyệt đẹp!", Giun Đất thì cãi rằng ngày mưa bụi mới là ngày đẹp. Hai bạn cãi nhau xem ngày như thế nào là đẹp, đúng như tên bài.',
        },
        {
          type: 'choice', q: 'Ai cho rằng ngày có mưa bụi và có những vũng nước đục là một ngày đẹp?',
          opts: ['Giun Đất', 'Châu Chấu', 'Bác Kiến'],
          ans: 0,
          quote: ['Mưa bụi và những vũng nước đục, đó mới là một ngày tuyệt đẹp! – Giun Đất cãi lại.'],
          why: 'Chính Giun Đất nói câu này. Châu Chấu thì thích trời nắng không một gợn mây, còn bác Kiến thấy ngày đẹp là ngày làm việc tốt.',
        },
        {
          type: 'choice', q: 'Câu trả lời của bác Kiến giúp Giun Đất và Châu Chấu hiểu ra điều gì?',
          opts: ['Một ngày đẹp là ngày không mưa, nắng đẹp rực rỡ.', 'Ngày được nghỉ không phải đi làm là một ngày tuyệt đẹp.', 'Ngày làm được nhiều việc tốt là một ngày tuyệt đẹp.'],
          ans: 2,
          quote: ['Hôm nay là một ngày tuyệt đẹp! Tôi đã làm việc rất tốt'],
          why: 'Bác Kiến nói hôm nay tuyệt đẹp vì bác "đã làm việc rất tốt". Ngày đẹp không phụ thuộc vào nắng hay mưa, cũng không phải ngày được nghỉ, mà là ngày mình làm được việc có ích.',
        },
        {
          type: 'write', q: 'Với em, ngày như thế nào là đẹp? Vì sao?', lines: 3,
          quote: ['Tôi đã làm việc rất tốt và bây giờ có thể nghỉ ngơi thoải mái'],
          sample: 'Với em, ngày đẹp là ngày mà em có nhiều niềm vui. Em vui khi được mẹ khen, khi hoàn thành đầy đủ bài tập trên lớp.',
          tip: 'Nói ngày đẹp của em là ngày em làm được việc gì, rồi giải thích vì sao em thấy vui.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'ggh', q: 'Điền g/gh vào chỗ chấm:',
          // Đề: "Dù đoạn đường …ồ …ề và nhiều bãi lầy, nhưng đàn kiến vẫn …ắng sức vượt qua. Cả đàn …é vai, cùng …ánh mẩu bánh mì to về tổ."
          // Tách thành cụm ngắn theo thứ tự trong câu (ô chính tả không chứa được cả câu dài).
          items: ['đoạn đường [g]ồ [gh]ề', 'vẫn [g]ắng sức vượt qua', 'cả đàn [gh]é vai', 'cùng [g]ánh mẩu bánh mì'],
        },
        {
          type: 'underline', q: 'Gạch chân dưới từ ngữ chỉ đặc điểm trong các từ sau:',
          marks: [{ n: 1, kind: 'dd' }],
          lines: ['huy hoàng, búng chân, khó chịu, tanh tách, thoải mái, quyết định, tuyệt đẹp'],
          ans: { 1: ['huy hoàng', 'khó chịu', 'tanh tách', 'thoải mái', 'tuyệt đẹp'] },
          why: 'Từ chỉ đặc điểm trả lời câu hỏi "Thế nào?": nắng huy hoàng, trời khó chịu, tiếng búng chân tanh tách, nghỉ ngơi thoải mái, ngày tuyệt đẹp. "Búng chân" và "quyết định" là việc làm, nên là từ chỉ hoạt động.',
        },
        {
          // sửa: đáp án gốc có "thoải mái" (đã có ở câu 7, đề bảo tìm thêm), thay bằng "đục".
          type: 'write', q: 'Tìm thêm trong bài đọc "Ngày như thế nào là đẹp?" 5 từ ngữ chỉ đặc điểm.', lines: 2,
          sample: 'khô, đáng ghét, đáng kính, tốt, đục',
          tip: 'Tìm từ trả lời câu hỏi "Thế nào?" trong bài, ví dụ: đất thế nào, nước thế nào, bác Kiến thế nào. Không lấy lại các từ ở câu 7.',
        },
        {
          type: 'match', q: 'Nối từ ngữ ở cột A với cột B để tạo câu nêu đặc điểm:',
          left: ['Mặt hồ', 'Bầu trời', 'Dòng sông'],
          right: ['hiền hòa, xanh mát.', 'xanh trong và cao vút.', 'rộng mênh mông và lặng sóng.'],
          ans: [2, 1, 0],
          why: 'Bầu trời thì cao vút. Mặt hồ nước đứng yên nên "lặng sóng", còn dòng sông chảy êm đềm nên "hiền hòa, xanh mát". Mỗi câu nói một sự vật và đặc điểm của nó (trả lời câu hỏi "Thế nào?").',
        },
        {
          // sửa: câu mẫu gốc về Giun Đất ("thích những ngày mưa bụi") nêu sở thích, chưa nêu đặc điểm.
          type: 'write', q: 'Viết câu nêu đặc điểm của mỗi nhân vật trong bài "Ngày như thế nào là đẹp?". Mẫu: Thân hình Châu Chấu khỏe mạnh, rắn chắc.',
          parts: [
            { label: 'a) Châu Chấu', sample: 'Đôi chân của Châu Chấu khỏe mạnh, búng tanh tách.' },
            { label: 'b) Giun Đất', sample: 'Thân hình Giun Đất mềm mại, trơn bóng.' },
            { label: 'c) Bác Kiến', sample: 'Bác Kiến chăm chỉ và làm việc rất tốt.' },
          ],
          tip: 'Câu nêu đặc điểm trả lời câu hỏi "Thế nào?": hình dáng, màu sắc hoặc tính nết của nhân vật.',
        },
      ],
    },
  ],
};
