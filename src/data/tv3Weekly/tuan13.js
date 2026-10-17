// Tuần 13: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-13.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
// sửa (bài đọc): "cùng với với một mảnh vải vải màu khác" → "cùng với một mảnh vải màu khác" (lặp chữ trong đề gốc).
export default {
  id: 'tuan-13', week: 13, topic: 'Chiếc gối',
  read: {
    title: 'CHIẾC GỐI', author: 'Phan Thu Hương',
    paras: [
      'Ngày ấy, gia đình tôi còn khó khăn nên ngoài hai buổi đi làm, mẹ tôi còn nhận thêm vải để may mong tăng thêm thu nhập cho gia đình.',
      'Một hôm, trong lúc dọn dẹp nhà cửa, tôi thấy mẹ nhìn cái hộp chứa đầy vải vụn và lẩm nhẩm: - Cái này làm được gì nhỉ?',
      'Lúc sau, mẹ quay sang tôi, nói: - A, phải rồi! Mẹ sẽ làm cho Cún một cái gối.',
      'Nghe mẹ nói vậy, tôi hớn hở cùng mẹ bắt tay vào để làm gối. Đầu tiên mẹ lựa các mảnh vải xanh thật đẹp để riêng cùng với một mảnh vải màu khác. Còn bao nhiêu vải vụn mẹ cắt nhỏ ra để làm ruột gối. Tôi thắc mắc:',
      '- Sao mẹ không để cả miếng vải cho đỡ mất công cắt ạ?',
      '- Bởi vì như thế nó sẽ không mềm. Mẹ sợ con không ngủ được.',
      'Cứ thế, tôi thức cùng mẹ để hoàn thành chiếc gối. Rồi đêm khuya tôi ngủ lúc nào không hay, chỉ biết rằng đôi lúc chập chờn, tôi vẫn cảm thấy có ánh điện. Chắc mẹ vẫn chưa ngủ.',
      'Ba ngày sau, chiếc gối hoàn thành, một chiếc gối bằng vải màu xanh xen lẫn một vài miếng vải đỏ và vàng. Nhưng đối với tôi nó không chỉ có vậy. Bởi vì khi mẹ may cho tôi chiếc gối, mẹ đã như cho tôi một bầu trời xanh trong đầy mơ ước, nơi đó có vầng thái dương chói lọi dẫn bước tôi đi tới nhiều chân trời mới mang một hành trang đặc biệt. Đó là tình yêu bao la của mẹ.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Vì sao ngoài hai buổi đi làm, mẹ Cún còn nhận thêm vải để may?',
          opts: ['vì gia đình khó khăn nên mẹ muốn tăng thêm thu nhập', 'vì thời gian đi làm của mẹ ngắn', 'vì mẹ rất thích công việc may vá'],
          ans: 0,
          quote: ['gia đình tôi còn khó khăn', 'mong tăng thêm thu nhập cho gia đình'],
          why: 'Câu đầu bài kể gia đình còn khó khăn nên mẹ nhận thêm vải để may, mong có thêm tiền cho gia đình. Bài không nói mẹ đi làm ít giờ hay mẹ thích may vá.',
        },
        {
          type: 'choice', q: 'Mẹ đã may cho Cún chiếc gối bằng nguyên liệu gì?',
          opts: ['mảnh vải mới và bông gòn trắng muốt', 'vải vụn (vải thừa) sau khi mẹ may xong', 'miếng vải vuông mẹ không dùng đến'],
          ans: 1,
          quote: ['cái hộp chứa đầy vải vụn', 'Còn bao nhiêu vải vụn mẹ cắt nhỏ ra để làm ruột gối'],
          why: 'Mẹ nhìn hộp vải vụn rồi nghĩ ra việc làm gối: mẹ chọn mảnh vải vụn đẹp làm vỏ gối, cắt nhỏ phần còn lại làm ruột gối. Bài không nhắc vải mới, bông gòn hay miếng vải vuông.',
        },
        {
          type: 'choice', q: 'Những chi tiết nào cho thấy sự quan tâm, lòng yêu thương con của người mẹ khi làm cho con chiếc gối?',
          opts: ['Nhận may thêm ngoài giờ để tăng thêm thu nhập cho gia đình.', 'Cắt nhỏ những miếng vải để gối êm, con ngủ ngon giấc.', 'Thức rất khuya để may gối cho con.'],
          ans: [1, 2],
          quote: ['Bởi vì như thế nó sẽ không mềm. Mẹ sợ con không ngủ được', 'Chắc mẹ vẫn chưa ngủ'],
          why: 'Khi làm gối, mẹ cắt nhỏ vải vụn vì sợ gối không mềm, con khó ngủ, và mẹ thức khuya tới khi con đã ngủ. Việc nhận may thêm là chuyện lo cho gia đình, không phải lúc làm gối cho con.',
        },
        {
          type: 'write', q: 'Vì sao với Cún: “chiếc gối lại chứa cả một bầu trời xanh trong đầy mơ ước, là một hành trang đặc biệt?”', lines: 2,
          quote: ['mẹ đã như cho tôi một bầu trời xanh trong đầy mơ ước', 'Đó là tình yêu bao la của mẹ'],
          sample: 'Vì mẹ đã dành cả tình yêu thương của mình để may chiếc gối ấy cho Cún.',
          tip: 'Đọc câu cuối bài: hành trang đặc biệt ấy là gì?',
        },
        {
          type: 'write', q: 'Nếu em là Cún, em có thích chiếc gối mẹ làm từ vải vụn không? Vì sao?', lines: 2,
          sample: 'Nếu là Cún, em rất thích chiếc gối mẹ làm từ vải vụn, bởi vì chiếc gối đó chứa đựng tình yêu thương của mẹ dành cho em.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          // Ô chính tả không xuống dòng, nên tách thành cụm ngắn; cả bài thơ ở đề bài.
          type: 'spell', rule: 'rdgi',
          q: 'r, d hay gi? Nắng vàng …át mỏng sân phơi / Vê tròn thành …ọt nắng rơi bồng bềnh / Nắng đùa với cỏ ngây thơ / Quẩn quanh bên võng, nắng chờ bà …u / Bốn mùa đông, hạ, xuân, thu / Nắng cùng với …ó hát …u quê mình. (Nguyễn Tiến Bình)',
          items: ['nắng vàng [d]át mỏng', 'thành [gi]ọt nắng', 'nắng chờ bà [r]u', 'cùng với [gi]ó', 'hát [r]u quê mình'],
          notes: {
            'nắng vàng dát mỏng': '<b>dát</b> là đập, cán cho mỏng ra (dát vàng, dát mỏng), viết <b>d</b>.',
            'thành giọt nắng': '<b>giọt</b> (giọt nước, giọt nắng) là từ cần nhớ viết <b>gi</b>.',
            'nắng chờ bà ru': '<b>ru</b> là hát nhẹ cho em bé ngủ (bà ru, hát ru), viết <b>r</b>.',
            'cùng với gió': '<b>gió</b> là từ cần nhớ viết <b>gi</b>.',
            'hát ru quê mình': '<b>hát ru</b> là hát cho em bé ngủ, viết <b>r</b>.',
          },
        },
        {
          type: 'underline', q: 'Gạch dưới từ ngữ chỉ các sự vật được so sánh với nhau trong các câu thơ dưới đây:',
          marks: [{ n: 1, kind: 'ss' }],
          lines: ['a. Bạc phơ mái tóc như mây trong vườn.', 'b. Hoa lựu như lửa lập loè', 'Nhớ khi em tưới, em che hàng ngày.'],
          ans: { 1: ['mái tóc', 'mây', 'Hoa lựu', 'lửa'] },
          ok: ['lập loè'],
          why: 'Mái tóc bạc được so sánh với mây (cùng màu trắng). Hoa lựu đỏ được so sánh với lửa. Hai sự vật được nối với nhau bằng từ "như".',
        },
        {
          type: 'fill', q: 'Chọn từ thích hợp trong ngoặc điền vào chỗ trống: (bay, tinh nghịch, con voi)',
          items: [
            { t: '- Con ngựa phi nhanh như {bay}.' },
            { t: '- Con mèo rất {tinh nghịch}.' },
            { t: '- {Con voi} kéo gỗ rất khỏe.' },
          ],
          why: 'Ngựa phi nhanh như bay: so sánh với tốc độ bay. Mèo hay đùa nghịch nên rất tinh nghịch. Con voi to khỏe, được dùng để kéo gỗ.',
        },
        {
          type: 'fill', q: 'Viết tiếp để có câu văn chứa hình ảnh so sánh về bạn trong nhà: (hai mảnh vỏ trấu, pha lê, cục bông gòn)',
          items: [
            { t: 'a. Chú gà con có bộ lông vàng như {cục bông gòn|một cục bông gòn}.' },
            { t: 'b. Cái mỏ chú nhỏ xíu, xinh xinh như {hai mảnh vỏ trấu}.' },
            { t: 'c. Đôi mắt chú tròn xoe, long lanh như {pha lê|hạt pha lê|viên pha lê}.' },
          ],
          why: 'Lông gà con mềm, bông xù như cục bông gòn. Mỏ gà con nhỏ, nhọn như hai mảnh vỏ trấu khép lại. Mắt tròn, sáng long lanh như pha lê.',
        },
      ],
    },
  ],
};
