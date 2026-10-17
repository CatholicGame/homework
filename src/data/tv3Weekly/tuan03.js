// Tuần 3: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap1/tuan-03.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-3', week: 3, topic: 'Khu vườn trên sân thượng',
  read: {
    title: 'KHU VƯỜN TRÊN SÂN THƯỢNG', author: 'Hạt giống tâm hồn',
    paras: [
      'Ngày cuối tuần, bố và Bon cùng mang những chiếc chai nhựa thu gom được lên sân thượng làm thành những chậu cây nhỏ, sau đó hai bố con cùng đổ đất rồi gieo hạt, trồng cây.',
      '- Một khu vườn trên sân thượng, tuyệt vời quá bố ạ! - Bon hào hứng nói với bố.',
      'Hằng ngày, Bon theo bố lên sân thượng, chăm sóc cho khu vườn của hai bố con.',
      'Đang chăm chú nhổ cỏ dại và bắt sâu xanh, Bon ngạc nhiên khi thấy bố dùng chai nhựa làm bình tưới.',
      'Bố mỉm cười giải thích:',
      '- Mình phải tái sử dụng những chai nhựa này để tưới cây, vừa để bảo vệ môi trường, vừa tiết kiệm đó con!',
      'Đến một ngày, bố và Bon yêu cầu mẹ nhắm mắt rồi cả hai cùng dắt mẹ lên sân thượng.',
      '- Bây giờ thì mẹ mở mắt ra đi! - Bon khe khẽ nói với mẹ.',
      '- Khu vườn này bố và con dành tặng mẹ đấy!',
      'Từ hôm đó, mẹ thường lên sân thượng hái rau sạch để nấu ăn cho cả nhà.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Bố và Bon dùng chai nhựa thu gom được để làm gì?',
          opts: ['để bán ve chai', 'để làm chậu trồng cây, bình tưới cây', 'để trang trí sân thượng'],
          ans: 1,
          quote: ['làm thành những chậu cây nhỏ', 'bố dùng chai nhựa làm bình tưới'],
          why: 'Bài kể hai bố con dùng chai nhựa làm chậu cây nhỏ, rồi bố còn dùng chai nhựa làm bình tưới. Bài không nói đến chuyện bán ve chai hay trang trí sân thượng.',
        },
        {
          type: 'choice', q: 'Việc tái sử dụng chai nhựa có những ý nghĩa gì?',
          opts: ['bảo vệ môi trường', 'tiết kiệm', 'có vườn cây đẹp'],
          ans: [0, 1],
          quote: ['vừa để bảo vệ môi trường, vừa tiết kiệm đó con'],
          why: 'Bố giải thích rõ: dùng lại chai nhựa "vừa để bảo vệ môi trường, vừa tiết kiệm". Vườn cây đẹp là nhờ hai bố con chăm sóc, không phải ý nghĩa của việc dùng lại chai nhựa.',
        },
        {
          type: 'choice', q: 'Bon làm những việc gì để cùng bố chăm sóc khu vườn trên sân thượng?',
          opts: ['tưới cây', 'nhổ cỏ', 'bắt sâu xanh'],
          ans: [1, 2],
          quote: ['nhổ cỏ dại và bắt sâu xanh', 'bố dùng chai nhựa làm bình tưới'],
          why: 'Bài viết Bon "đang chăm chú nhổ cỏ dại và bắt sâu xanh". Người tưới cây bằng chai nhựa là bố, nên không chọn ý tưới cây.',
        },
        {
          type: 'fill', q: 'Bố và Bon đã tặng khu vườn trên sân thượng cho ai? Người đó đã sử dụng món quà này thế nào?',
          items: [{ t: 'Bố và Bon đã tặng khu vườn cho {mẹ|mẹ Bon|mẹ của Bon|mẹ của bạn Bon}. Người đó {*thường lên sân thượng hái rau sạch để nấu ăn cho cả nhà}.' }],
          quote: ['Khu vườn này bố và con dành tặng mẹ đấy!', 'mẹ thường lên sân thượng hái rau sạch để nấu ăn cho cả nhà'],
          why: 'Bon nói "Khu vườn này bố và con dành tặng mẹ đấy!". Đoạn cuối kể mẹ thường lên sân thượng hái rau sạch để nấu ăn cho cả nhà.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          // sửa: đáp án gốc ghi "nghuệch ngoạc", đúng là "nguệch ngoạc" (trước u viết ng).
          type: 'spell', rule: 'ngngh', q: 'Điền ng/ngh vào chỗ chấm để tạo từ hoàn chỉnh:',
          items: ['[ng]ây [ng]ô', '[ng]ạo [ngh]ễ', '[ng]oằn [ng]oèo', '[ng]ập [ng]ừng', '[ng]uệch [ng]oạc', '[ng]ặt [ngh]ẽo'],
        },
        {
          // sửa: đề có 10 tranh nhưng khung chỉ có 9 từ (đáp án gốc ghi "nướng" hai lần); bỏ tranh nồi thịt thứ 7, mỗi từ một tranh.
          type: 'fill', q: 'Điền từ ngữ chỉ hoạt động nấu ăn ở trong khung phù hợp với mỗi tranh: pha trộn, luộc, thái, nướng, cán bột, chiên (rán), phết, rót, nạo.',
          items: [
            { pic: 'cook_phet', t: '1. {phết}' },
            { pic: 'cook_tron', t: '2. {pha trộn|trộn}' },
            { pic: 'cook_nao', t: '3. {nạo}' },
            { pic: 'cook_luoc', t: '4. {luộc}' },
            { pic: 'cook_thai', t: '5. {thái}' },
            { pic: 'cook_can', t: '6. {cán bột|cán}' },
            { pic: 'cook_rot', t: '7. {rót}' },
            { pic: 'cook_nuong', t: '8. {nướng}' },
            { pic: 'cook_chien', t: '9. {chiên (rán)|chiên|rán|chiên rán|chiên, rán}' },
          ],
          why: 'Mỗi từ là một việc làm khi nấu ăn: phết bơ lên bánh mì, pha trộn bột trong bát, nạo củ trên bàn nạo, luộc trong nồi nước sôi, thái bằng dao trên thớt, cán bột bằng cây cán, rót sữa ra cốc, nướng bánh trong lò, chiên (rán) trứng trong chảo dầu.',
        },
        {
          type: 'fill', q: 'Điền từ ngữ chỉ hoạt động vào chỗ chấm để hoàn thành đoạn văn kể về việc em làm cùng người thân: (xem phim, đi chợ, tưới, nấu ăn, lau nhà, dọn dẹp)',
          items: [{ t: 'Mỗi cuối tuần, gia đình Khôi lại quây quần bên nhau để cùng {nấu ăn} và {dọn dẹp} nhà cửa. Sáng, mẹ {đi chợ} thật sớm để mua được thức ăn tươi ngon. Sau đó bố và mẹ cùng vào bếp nấu cơm. Chị Phương {lau nhà}, cọ ấm chén sạch bóng. Bà nội quét sân và {tưới} cho vườn cây nhỏ xinh trước nhà. Còn em Hưng mới lên ba, em ngồi ngoan ở phòng khách {xem phim} hoạt hình, thỉnh thoảng lại cười phá lên thích thú. Ngày nghỉ của gia đình Khôi trôi qua như thế đấy! Thật bình yên và ấm áp.' }],
          why: 'Đọc từ đứng sau chỗ trống để chọn: "… nhà cửa" đi với dọn dẹp, mua thức ăn thì phải đi chợ, "cho vườn cây" đi với tưới, "… hoạt hình" đi với xem phim. Chỗ trống đầu là việc cả nhà làm cùng nhau trong bếp: nấu ăn.',
        },
      ],
    },
  ],
};
