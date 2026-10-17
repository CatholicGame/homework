// Tuần 17: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-17.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-17', week: 17, topic: 'Quê hương',
  read: {
    title: 'QUÊ HƯƠNG',
    paras: [
      'Quê Thảo là một vùng nông thôn trù phú. Thảo rất yêu quê hương mình. Thảo yêu mái nhà tranh của bà, yêu giàn hoa thiên lí tỏa mùi hương thơm ngát, yêu tiếng võng kẽo kẹt mẹ đưa, yêu cả những đứa trẻ hồn nhiên mà tinh nghịch. Thảo sinh ra và lớn lên ở đây. Nơi thơm hương cánh đồng lúa chín ngày mùa, thơm hương hạt gạo mẹ vẫn đem ra sàng sảy, nơi nâng cánh diều tuổi thơ của Thảo bay lên cao, cao mãi.',
      'Thảo nhớ lại những ngày ở quê vui biết bao. Mỗi sáng, Thảo đi chăn trâu cùng cái Tí, nghe nó kể chuyện rồi hai đứa cười rũ rượi. Chiều về thì đi theo các anh chị lớn bắt châu chấu, cào cào. Tối đến rủ nhau ra ngoài sân đình chơi và xem đom đóm bay. Đom đóm ở quê thật nhiều, trông cứ như là những ngọn đèn nhỏ bay trong đêm. Màn đêm giống như nàng tiên khoác chiếc áo nhung đen thêu nhiều kim tuyến lấp lánh.',
      'Thời gian dần trôi, Thảo chuyển về thành phố. Đêm tối ở thành phố ồn ã, sôi động chứ không yên tĩnh như ở quê. Những lúc đó, Thảo thường ngẩng lên bầu trời đếm sao và mong đến kì nghỉ hè để lại được về quê.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Quê hương Thảo ở đâu?',
          opts: ['Thành phố', 'Miền núi', 'Nông thôn'],
          ans: 2,
          quote: ['Quê Thảo là một vùng nông thôn trù phú'],
          why: 'Câu đầu bài viết: quê Thảo là một vùng nông thôn trù phú. Thành phố là nơi Thảo chuyển đến sau này, còn miền núi thì bài không nhắc.',
        },
        {
          type: 'choice', q: 'Thảo nhớ những kỉ niệm gì ở quê nhà?',
          opts: ['Đi chăn trâu, đi bắt châu chấu, cào cào, ra đình chơi và xem múa lân.', 'Theo các anh chị lớn đi bắt châu chấu, cào cào, bắt đom đóm.', 'Đi chăn trâu, đi bắt châu chấu, cào cào, ra đình chơi và xem đom đóm bay.'],
          ans: 2,
          quote: ['Thảo đi chăn trâu cùng cái Tí', 'bắt châu chấu, cào cào', 'ra ngoài sân đình chơi và xem đom đóm bay'],
          why: 'Thảo nhớ buổi sáng đi chăn trâu, buổi chiều bắt châu chấu, cào cào, buổi tối ra sân đình chơi và xem đom đóm bay. Bài không có múa lân, và Thảo chỉ xem đom đóm chứ không bắt đom đóm.',
        },
        {
          type: 'choice', q: 'Con vật nào được tác giả miêu tả trông như những ngọn đèn nhỏ bay trong đêm?',
          opts: ['Con châu chấu', 'Con cào cào', 'Con đom đóm'],
          ans: 2,
          quote: ['Đom đóm ở quê thật nhiều, trông cứ như là những ngọn đèn nhỏ bay trong đêm'],
          why: 'Đom đóm phát sáng vào ban đêm nên được so sánh với những ngọn đèn nhỏ bay trong đêm. Châu chấu, cào cào là những con Thảo bắt vào buổi chiều.',
        },
        {
          type: 'write', q: 'Tìm và viết lại câu văn cho thấy sau khi về sống ở thành phố, Thảo nhớ và yêu quê hương tha thiết.', lines: 3,
          quote: ['Những lúc đó, Thảo thường ngẩng lên bầu trời đếm sao và mong đến kì nghỉ hè để lại được về quê'],
          sample: 'Những lúc đó, Thảo thường ngẩng lên bầu trời đếm sao và mong đến kì nghỉ hè để lại được về quê.',
          tip: 'Tìm ở đoạn cuối, sau khi Thảo chuyển về thành phố: câu nào cho thấy Thảo mong được về quê?',
        },
        {
          type: 'write', q: 'Em thích cuộc sống ở thành phố hay ở nông thôn? Vì sao?', lines: 3,
          sample: 'Em thích cuộc sống ở nông thôn hơn vì ở quê rất yên bình, không khí trong lành và mát mẻ.',
          tip: 'Nói rõ em thích nơi nào, rồi nêu một vài lí do (cảnh vật, không khí, trò chơi, người thân…).',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'underline', q: 'Trong các câu ca dao dưới đây, các tên riêng đều chưa được viết hoa, em hãy gạch chân và viết hoa lại các tên riêng ấy.',
          marks: [{ n: 1, kind: 'tr' }],
          lines: ['Đồng đăng có phố kì lừa', 'Có nàng tô thị có chùa tam thanh.'],
          ans: { 1: ['đăng', 'kì lừa', 'tô thị', 'tam thanh'] },
          ok: ['Đồng'],
          why: 'Đồng Đăng, Kì Lừa, Tô Thị, Tam Thanh là tên riêng (tên địa danh, tên người, tên chùa) nên phải viết hoa chữ cái đầu mỗi tiếng. Viết lại: "Đồng Đăng có phố Kì Lừa / Có nàng Tô Thị có chùa Tam Thanh."',
        },
        // sửa: đề gốc in "vườn ra", đúng là "vườn rau".
        {
          type: 'write', q: 'Tìm 5 - 7 từ ngữ và viết vào bảng (theo mẫu):',
          parts: [
            { label: 'Ở thành thị, từ ngữ chỉ sự vật: chung cư, …', sample: 'chung cư, biệt thự, đường phố, trung tâm thương mại, tòa nhà, nhà cao tầng' },
            { label: 'Ở thành thị, từ ngữ chỉ đặc điểm: cao ngất, …', sample: 'cao ngất, sáng trưng, rực rỡ, ồn ào, tấp nập, vội vã' },
            { label: 'Ở nông thôn, từ ngữ chỉ sự vật: vườn rau, …', sample: 'vườn rau, đồng ruộng, ao cá, bờ đê, cánh diều, đình làng' },
            { label: 'Ở nông thôn, từ ngữ chỉ đặc điểm: xanh mơn mởn, …', sample: 'xanh mơn mởn, bao la, xanh rêu, thẳng tắp, cao vút, yên bình' },
          ],
          tip: 'Từ chỉ sự vật trả lời "Cái gì?" (chung cư, ao cá). Từ chỉ đặc điểm trả lời "Thế nào?" (cao ngất, yên bình).',
        },
        {
          type: 'underline', q: 'Gạch dưới hình ảnh so sánh có trong những câu sau:',
          marks: [{ n: 1, kind: 'ss' }],
          lines: [
            'a) Tiếng chim buổi sáng như bản hòa ca rộn ràng.',
            'b) Bốn cánh chú chuồn chuồn mỏng như giấy bóng.',
            'c) Chúng tôi đang đi bên những thác trắng xóa tựa mây trời.',
            'd) Mặt trời xuống biển như hòn lửa.',
          ],
          ans: { 1: ['Tiếng chim buổi sáng như bản hòa ca rộn ràng', 'cánh chú chuồn chuồn mỏng như giấy bóng', 'thác trắng xóa tựa mây trời', 'Mặt trời xuống biển như hòn lửa'] },
          ok: ['Bốn', 'những'],
          why: 'Mỗi hình ảnh so sánh gồm sự vật được so sánh, từ so sánh (như, tựa) và sự vật dùng để so sánh: tiếng chim như bản hòa ca, cánh chuồn chuồn như giấy bóng, thác trắng xóa tựa mây trời, mặt trời như hòn lửa.',
        },
        {
          type: 'write', q: 'Viết tiếp để tạo câu có hình ảnh so sánh:',
          parts: [
            { label: 'a) Nhìn từ xa, những tòa nhà cao tầng giống như…', sample: 'Nhìn từ xa, những tòa nhà cao tầng giống như những ngọn tháp chọc thủng trời xanh.' },
            { label: 'b) Mặt hồ rộng mênh mông như…', sample: 'Mặt hồ rộng mênh mông như một tấm gương to khổng lồ.' },
            { label: 'c) Tai voi tựa như…', sample: 'Tai voi tựa như hai cái quạt nan.' },
            { label: 'd) Con trâu là … của bà con nông dân.', sample: 'Con trâu là tài sản quý giá của bà con nông dân.' },
          ],
          tip: 'Nghĩ xem sự vật đó giống cái gì về hình dáng, màu sắc hay công dụng, rồi viết sau từ so sánh.',
        },
      ],
    },
  ],
};
