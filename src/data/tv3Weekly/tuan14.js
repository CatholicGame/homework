// Tuần 14: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-14.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-14', week: 14, topic: 'Nhà rông',
  read: {
    title: 'NHÀ RÔNG', author: 'Lưu Hùng',
    paras: [
      'Ở hầu hết các địa phương vùng Bắc Tây Nguyên trước đây, làng nào cũng có nhà rông. Hình dáng nhà rông có thể không giống nhau, nhưng bao giờ đó cũng là ngôi nhà sàn cao lớn nhất, đẹp nhất của làng. Nhà rông được dựng bằng gỗ tốt kết hợp với tre, nứa; mái lợp cỏ tranh. Dân làng cùng nhau làm nhà rông. Làng càng lớn và có nhiều người tài giỏi thì nhà rông càng bề thế, khang trang.',
      'Nhà rông dùng làm nơi đón tiếp khách đến làng, nơi các già làng bàn bạc việc chung, nơi đàn ông lúc rỗi rãi ngồi trò chuyện hoặc vót nan, đan lát,… Nhà rông là chỗ ngủ của con trai từ tuổi thiếu niên cho đến khi lấy vợ. Đây là tập quán từ xa xưa do trai tráng phải trực chiến để bảo vệ làng. Nhà rông còn là nơi tổ chức những lễ cúng chung của dân làng. Nhà rông thật là đặc sắc. Vì vậy, mỗi khi nói đến Tây Nguyên là người ta thường nhắc đến nhà rông.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Nhà rông có những đặc điểm gì nổi bật?',
          opts: ['cao lớn nhất, đẹp nhất của làng', 'được dựng bằng gỗ tốt kết hợp với tre, nứa; mái lợp cỏ tranh', 'hình dáng không giống nhau'],
          ans: [0, 1],
          quote: ['ngôi nhà sàn cao lớn nhất, đẹp nhất của làng', 'dựng bằng gỗ tốt kết hợp với tre, nứa; mái lợp cỏ tranh'],
          why: 'Bài đọc tả nhà rông là ngôi nhà sàn cao lớn nhất, đẹp nhất làng, dựng bằng gỗ tốt, tre, nứa, mái lợp cỏ tranh. Còn "hình dáng có thể không giống nhau" chỉ nói các làng làm khác nhau, không phải đặc điểm nổi bật.',
        },
        {
          type: 'choice', q: 'Vì sao thanh niên cần phải ngủ ở nhà rông?',
          opts: ['để bàn bạc việc chung', 'để đón tiếp khách đến làng', 'để trực chiến, bảo vệ làng'],
          ans: 2,
          quote: ['chỗ ngủ của con trai từ tuổi thiếu niên cho đến khi lấy vợ', 'trai tráng phải trực chiến để bảo vệ làng'],
          why: 'Bài đọc nói con trai ngủ ở nhà rông vì trai tráng phải trực chiến để bảo vệ làng. Bàn việc chung là việc của các già làng, đón khách là việc chung của nhà rông, không phải lí do ngủ lại.',
        },
        // sửa: đáp án gốc chép lại các công dụng của nhà rông, chưa trả lời "tài năng" và "tinh thần cộng đồng".
        {
          type: 'write', q: 'Vì sao có thể nói nhà rông thể hiện tài năng và tinh thần cộng đồng của người dân Tây Nguyên?', lines: 3,
          quote: ['Dân làng cùng nhau làm nhà rông', 'có nhiều người tài giỏi thì nhà rông càng bề thế, khang trang', 'nơi tổ chức những lễ cúng chung của dân làng'],
          sample: 'Vì nhà rông do cả dân làng cùng nhau dựng nên, làng càng có nhiều người tài giỏi thì nhà rông càng bề thế, khang trang. Nhà rông còn là nơi cả làng đón khách, bàn việc chung và tổ chức lễ cúng chung.',
          tip: 'Tìm trong bài: ai làm nhà rông, nhà rông đẹp hay không nhờ đâu, nhà rông dùng vào những việc chung nào.',
        },
        {
          type: 'choice', q: '“Già làng” là:',
          opts: ['Người có nhiều kinh nghiệm trong việc dựng nhà rông.', 'Người tài giỏi và có sức khỏe nhất làng.', 'Người cao tuổi được dân làng cử ra để điều khiển công việc chung.'],
          ans: 2,
          quote: ['nơi các già làng bàn bạc việc chung'],
          why: 'Già làng là người cao tuổi, được dân làng tin cậy cử ra lo việc chung, nên bài đọc nói các già làng bàn bạc việc chung ở nhà rông. Già làng không phải người khoẻ nhất hay thợ dựng nhà.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'fill', q: 'Quan sát đặc điểm của sự vật trong tranh, nêu cặp từ trái nghĩa tương ứng:',
          items: [
            { pic: 't14pencils', t: 'a) {dài} – {ngắn|cụt}' },
            { pic: 't14elephant', t: 'b) {to|lớn|to lớn|khổng lồ} – {nhỏ|bé|nhỏ bé|bé nhỏ|nhỏ xíu|tí hon}' },
            { pic: 't14tall', t: 'c) {cao} – {thấp|lùn|thấp bé}' },
          ],
          why: 'Từ trái nghĩa là những từ có nghĩa trái ngược nhau. Bút chì này dài, bút kia ngắn; con voi to, con chuột nhỏ; anh trai cao, em gái thấp.',
        },
        {
          type: 'fill', q: 'Thay từ được gạch chân trong mỗi câu bằng từ trái nghĩa tương ứng sau đó viết lại câu:',
          items: [
            { t: 'a. (bên dưới) Quyển sách yêu thích của em ở {bên trên|trên|phía trên} kệ sách thứ ba.' },
            { t: 'b. (rộng) Ở đây có một con đường {hẹp|nhỏ hẹp|chật hẹp} men theo chân núi.' },
            { t: 'c. (phong phú) Mùa này, cây cối, hoa trái ở trang trại rất {nghèo nàn|ít ỏi|đơn điệu|nghèo}.' },
          ],
          why: 'Trái nghĩa với "bên dưới" là "bên trên", với "rộng" là "hẹp", với "phong phú" (nhiều, đủ loại) là "nghèo nàn" (ít, không có gì nhiều).',
        },
        {
          type: 'fill', q: 'Với mỗi từ “chín” dưới đây, hãy tìm một từ trái nghĩa:',
          items: [
            { t: '- lúa chín: lúa {non|xanh}' },
            { t: '- quả chín: quả {xanh|non}' },
            { t: '- thịt chín: thịt {sống|tái}' },
          ],
          why: 'Một từ "chín" có nhiều nghĩa, nên từ trái nghĩa cũng khác nhau: lúa chưa chín là lúa non, quả chưa chín là quả xanh, thịt chưa nấu chín là thịt sống.',
        },
        // sửa: đáp án gốc ghi "đua đòi" là trái nghĩa của "giản dị"; đúng hơn là "cầu kì, xa hoa" (vẫn nhận "đua đòi").
        {
          type: 'fill', q: 'Viết lần lượt các từ trái nghĩa với những từ sau: dũng cảm, cần cù, giản dị, thông minh',
          items: [
            { t: 'dũng cảm: {hèn nhát|nhút nhát|nhát gan|hèn yếu|nhát|hèn}' },
            { t: 'cần cù: {lười biếng|lười nhác|biếng nhác|lười}' },
            { t: 'giản dị: {cầu kì|cầu kỳ|xa hoa|kiểu cách|phô trương|loè loẹt|lòe loẹt|diêm dúa|đua đòi|xa xỉ}' },
            { t: 'thông minh: {dốt nát|ngu dốt|dốt|ngốc nghếch|ngu ngốc|đần độn|ngốc|chậm hiểu}' },
          ],
          why: 'Dũng cảm (không sợ) trái với hèn nhát. Cần cù (chăm làm) trái với lười biếng. Giản dị (đơn giản, không cầu kì) trái với cầu kì, xa hoa. Thông minh (nhanh hiểu) trái với dốt nát.',
        },
        // sửa: câu mẫu của đáp án dùng "nhé", đổi sang lời đề nghị khác.
        {
          type: 'write', q: 'Viết câu khiến cho mỗi tình huống dưới đây:',
          parts: [
            { label: 'a. Em muốn bố mẹ cho tới Tây Nguyên để thăm nhà rông.', sample: 'Bố mẹ cho con tới Tây Nguyên thăm nhà rông đi ạ!' },
            { label: 'b. Kêu gọi mọi người tới tham quan, khám phá nét độc đáo của nhà rông.', sample: 'Mọi người hãy tới tham quan, khám phá nét độc đáo của nhà rông!' },
            { label: 'c. Yêu cầu mọi người cùng bảo vệ, giữ gìn nét văn hóa đặc sắc của người Tây Nguyên.', sample: 'Mọi người hãy cùng nhau bảo vệ, giữ gìn nét văn hóa đặc sắc của người Tây Nguyên!' },
          ],
          tip: 'Câu khiến dùng để đề nghị, yêu cầu, thường có các từ hãy, đừng, chớ, đi, nào và kết thúc bằng dấu chấm than.',
        },
      ],
    },
  ],
};
