// Tuần 30: Bài tập cuối tuần Tiếng Việt 3, Kết nối tri thức (nguồn: docs/lop_3/btct_tap2/tuan-30.html).
// Định dạng: xem đầu file src/games/tiengViet3.js.
export default {
  id: 'tuan-30', week: 30, topic: 'Biển đẹp',
  read: {
    title: 'BIỂN ĐẸP',
    paras: [
      'Buổi sớm nắng sáng. Những cánh buồm nâu trên biển được nắng chiếu vào hồng rực lên như đàn bướm múa lượn giữa trời xanh.',
      'Mặt trời xế trưa bị mây che lỗ nhỏ. Những tia nắng dát vàng một vùng biển tròn, làm nổi bật những cánh buồm duyên dáng như ánh sáng chiếc đèn sân khấu khổng lồ đang chiếu cho các nàng tiên biển múa vui.',
      'Lại đến một buổi chiều gió mùa đông bắc vừa dừng. Biển lặng đỏ đục, đầy như mâm bánh đúc, loáng thoáng những con thuyền như những hạt lạc ai đem rắc lên trên. Biển khoác chiếc áo mới. Cảnh vật mờ ảo. Sóng ầm ầm, lao xao. Hàng thùy dương xào xạc, vi vu như đang trò chuyện.',
      'Biển nhiều khi rất đẹp, ai cũng thấy như thế. Nhưng có một điều ít ai chú ý là: vẻ đẹp của biển, vẻ đẹp kì diệu muôn màu sắc ấy phần lớn là do mây trời và ánh sáng tạo nên.',
    ],
  },
  parts: [
    {
      title: 'II. Đọc hiểu văn bản',
      questions: [
        {
          type: 'choice', q: 'Khi nắng chiếu vào, những cánh buồm trên biển có sự thay đổi về màu sắc như thế nào?',
          opts: ['Từ trắng chuyển sang nâu', 'Từ nâu chuyển sang hồng', 'Từ trắng chuyển sang vàng'],
          ans: 1,
          quote: ['Những cánh buồm nâu trên biển được nắng chiếu vào hồng rực lên'],
          why: 'Cánh buồm vốn màu nâu, được nắng chiếu vào thì "hồng rực lên". Bài không nói cánh buồm màu trắng.',
        },
        {
          type: 'choice', q: 'Khi nào biển lặng đỏ đục?',
          opts: ['Buổi sáng', 'Buổi trưa', 'Buổi chiều'],
          ans: 2,
          quote: ['Lại đến một buổi chiều gió mùa đông bắc vừa dừng', 'Biển lặng đỏ đục'],
          why: 'Đoạn ba bắt đầu bằng "Lại đến một buổi chiều…", ngay sau đó là "Biển lặng đỏ đục". Buổi sáng cánh buồm hồng rực, buổi trưa nắng dát vàng mặt biển.',
        },
        {
          type: 'choice', q: 'Tác giả tập trung miêu tả những sự vật nào trên biển?',
          opts: ['Thuyền buồm, mặt biển', 'Thuyền buồm, bãi cát', 'Mây trời'],
          ans: 0,
          quote: ['Những cánh buồm nâu trên biển', 'Những tia nắng dát vàng một vùng biển tròn', 'Biển lặng đỏ đục, đầy như mâm bánh đúc', 'loáng thoáng những con thuyền'],
          why: 'Đoạn nào cũng tả cánh buồm, con thuyền và mặt biển lúc sáng, trưa, chiều. Bài không tả bãi cát. Mây trời chỉ được nhắc tới như thứ làm biển đẹp, không phải sự vật được tả nhiều.',
        },
        {
          type: 'choice', q: 'Em hiểu câu “Vẻ đẹp của biển, vẻ đẹp kì diệu muôn màu sắc ấy phần lớn là do mây trời và ánh sáng tạo nên.” có nghĩa là gì?',
          opts: ['Mây trời soi bóng xuống biển và ánh sáng phản chiếu làm cho biển có vẻ đẹp muôn màu.', 'Biển đẹp là nhờ trên mặt biển có mây trời và ánh sáng.', 'Biển, mây trời, ánh sáng lúc nào cũng đẹp.'],
          ans: 0,
          quote: ['vẻ đẹp kì diệu muôn màu sắc ấy phần lớn là do mây trời và ánh sáng tạo nên', 'Mặt trời xế trưa bị mây che lỗ nhỏ'],
          why: 'Biển đổi màu theo mây và nắng: nắng sớm làm buồm hồng rực, mây che chỉ để lọt nắng dát vàng một vùng biển. Mây trời soi bóng, ánh sáng phản chiếu nên biển có muôn màu. Mây trời không nằm "trên mặt biển", và bài cũng không nói lúc nào biển cũng đẹp.',
        },
      ],
    },
    {
      title: 'III. Luyện tập',
      questions: [
        {
          type: 'spell', rule: 'sx', q: 'Chữ s hay x?',
          text: ['Mùa xuân, khi mưa phùn và … ương … ớm lẫn vào nhau, cây gạo ngoài cổng chùa bật ra những đoá hoa làm … áng bừng một góc trời. Tiếng chim … áo về ríu rít. Nghe mà … ốn … ang mãi.', 'Theo BĂNG SƠN'],
          items: [
            'mưa phùn và [s]ương [s]ớm', 'làm [s]áng bừng một góc trời', 'Tiếng chim [s]áo về ríu rít.', 'Nghe mà [x]ốn [x]ang mãi.',
          ],
          notes: {
            sương: '<b>sương</b> (sương sớm, sương mù) viết s.',
            sớm: '<b>sớm</b> (buổi sớm, sương sớm) viết s.',
            sáng: '<b>sáng</b> (sáng bừng, ánh sáng) viết s.',
            sáo: '<b>sáo</b> là tên một loài chim (chim sáo), viết s.',
            xốn: '<b>xốn xang</b> là từ láy tả lòng rộn lên, xao xuyến; cả hai tiếng đều viết x.',
            xang: '<b>xốn xang</b> là từ láy tả lòng rộn lên, xao xuyến; cả hai tiếng đều viết x.',
          },
          why: 'Đoạn văn trích từ bài của Băng Sơn. s và x không có luật chắc chắn, em đọc nhiều và ghi nhớ từng từ: sương sớm, sáng, chim sáo, xốn xang.',
        },
        {
          type: 'sort', q: 'Nêu tác dụng của dấu ngoặc kép trong mỗi câu sau:',
          text: [
            'a. Bỗng có một ông già râu tóc bạc trắng hiện lên, nói với vua rằng: “Sáng mai, nhà vua ra đón ở bờ sông, sẽ có Thần Kim Quy đến giúp.”',
            'b. Thần Kim Quy rút một cái móng của mình trao cho An Dương Vương, dặn rằng: “Nhà vua giữ lấy móng này để làm lẫy nỏ. Khi có giặc thì đem ra bắn, một phát có thể giết được hàng nghìn quân giặc.”',
            'c. Bỗng một tiếng “kít... ít” làm cậu sững lại.',
          ],
          words: ['Câu a', 'Câu b', 'Câu c'],
          groups: [
            { label: 'Đánh dấu (trích dẫn) lời nói của nhân vật', words: ['Câu a', 'Câu b'] },
            { label: 'Đánh dấu từ ngữ được trích dẫn', words: ['Câu c'] },
          ],
          why: 'Ở câu a và b, dấu ngoặc kép đặt sau dấu hai chấm, bao quanh lời ông già và lời Thần Kim Quy nói: đó là lời nói của nhân vật. Ở câu c, dấu ngoặc kép đánh dấu từ ngữ "kít... ít" (tiếng kêu được dẫn lại), không phải một lời nói.',
        },
        // Đáp án theo HƯỚNG DẪN ĐÁP ÁN: ngoặc kép bao hai câu được dẫn lại của Hiếu. Dấu ngoặc kép mở và đóng là hai chỗ chạm.
        {
          type: 'punct', mark: '"', q: 'Truyện vui sau đây còn thiếu một số dấu ngoặc kép để đánh dấu những từ ngữ hoặc câu được trích dẫn. Em thêm dấu ngoặc kép vào vị trí đó (chạm vào chỗ cần đặt dấu).',
          text: [
            'Hùng: – Bài đọc trên có từ mếu máo. Bạn hãy đặt một câu với từ đó!',
            'Hiếu: – Câu của mình là: Bạn Quang chạy theo xích lô, vừa khóc vừa nói.',
            'Hùng: – Nhưng câu đó chưa có từ cần đặt.',
            'Hiếu: – Có mà: Vừa khóc vừa nói có nghĩa là mếu máo rồi!',
            'HÀ THU',
          ],
          items: [
            'Hiếu: – Câu của mình là:^ Bạn Quang chạy theo xích lô, vừa khóc vừa nói^ .',
            'Hiếu: – Có mà:^ Vừa khóc vừa nói có nghĩa là mếu máo rồi^ !',
          ],
          why: 'Dấu ngoặc kép đánh dấu câu được dẫn lại nguyên văn. Câu Hiếu đặt là "Bạn Quang chạy theo xích lô, vừa khóc vừa nói", và câu Hiếu giải thích "Vừa khóc vừa nói có nghĩa là mếu máo rồi". Mỗi chỗ trích dẫn có một dấu ngoặc kép mở ở đầu và một dấu đóng ở cuối.',
        },
        {
          type: 'write', q: 'Chuyển câu trong dấu ngoặc kép thành lời nói trực tiếp được đánh dấu bằng dấu gạch ngang:',
          text: ['Quốc Toản bèn chạy đến, quỳ xuống tâu: “Cho giặc mượn đường là mất nước. Xin Bệ hạ cho đánh!”'],
          parts: [
            { label: 'Dòng 1: lời dẫn', sample: 'Quốc Toản bèn chạy đến, quỳ xuống tâu:' },
            { label: 'Dòng 2: lời nói, mở đầu bằng dấu gạch ngang', sample: '- Cho giặc mượn đường là mất nước. Xin Bệ hạ cho đánh!' },
          ],
          tip: 'Bỏ dấu ngoặc kép, xuống dòng, đặt dấu gạch ngang ở đầu dòng rồi viết lời nói của nhân vật.',
        },
      ],
    },
  ],
};
