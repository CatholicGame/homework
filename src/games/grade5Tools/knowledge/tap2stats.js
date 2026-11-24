/** Kiến thức Toán 5 Tập Hai, chủ đề 11, Bài 63–65 (cùng dạng TEACH trong ../knowledge.js). */
// chưa đối chiếu sách: sách mẫu chưa có trang 87–95, soạn theo chương trình KNTT (docs/lop_5/kien-thuc-toan5-tap2.md)

const pg = (p) => `SGK Toán 5 Tập Hai, trang ${p}`;

export const K5_STATS = {
  63: {
    title: 'Thu thập, phân loại, sắp xếp các số liệu', page: pg(87),
    points: [
      '<b>Thu thập</b> số liệu: đặt câu hỏi rồi hỏi từng bạn (phát phiếu), quan sát, đo hoặc đếm.',
      '<b>Phân loại</b>: xếp các phiếu theo từng nhóm (môn thể thao, loại quả…), mỗi phiếu gạch một vạch kiểm đếm; đủ 5 vạch thì vạch thứ năm gạch chéo.',
      '<b>Kiểm tra lại</b>: cộng số liệu các nhóm phải bằng tổng số người được hỏi (không sót, không đếm trùng phiếu nào).',
      '<b>Sắp xếp</b> số liệu từ bé đến lớn hoặc từ lớn đến bé để thấy nhóm nhiều nhất, ít nhất, hơn kém nhau bao nhiêu.',
      'Ví dụ: lớp 5A có 20 bạn: bóng đá 7, cầu lông 5, bơi 3, cờ vua 5; 7 + 5 + 3 + 5 = 20. Bóng đá nhiều nhất, nhiều hơn bơi 7 − 3 = 4 bạn.',
    ],
  },
  64: {
    title: 'Biểu đồ hình quạt tròn', page: pg(90),
    points: [
      'Biểu đồ hình quạt tròn: <b>cả hình tròn biểu thị 100%</b>, mỗi hình quạt biểu thị tỉ số phần trăm của một phần so với toàn bộ.',
      'Nửa hình tròn là <b>50%</b>, một phần tư hình tròn là <b>25%</b>, ba phần tư là 75%. Hình quạt lớn hơn thì số phần trăm lớn hơn.',
      'Các phần cộng lại bằng 100%; phần còn thiếu = 100% trừ các phần đã biết. Ví dụ 100% − 40% − 25% − 20% = 15%.',
      'Tính số lượng của một phần: <b>tổng số × số phần trăm : 100</b>. Ví dụ lớp có 40 bạn, 25% thích cầu lông: 40 × 25 : 100 = 10 (bạn).',
      'Cẩn thận: số phần trăm chưa phải số người (25% của 40 bạn là 10 bạn, không phải 25 bạn).',
    ],
  },
  65: {
    title: 'Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện', page: pg(94),
    points: [
      'Lặp lại một thí nghiệm nhiều lần (tung đồng xu, gieo xúc xắc, lấy bóng), kiểm đếm số lần mỗi sự kiện xảy ra.',
      'Tỉ số của số lần lặp lại một sự kiện so với tổng số lần thực hiện = <b>số lần sự kiện xảy ra : tổng số lần thực hiện</b>.',
      'Ví dụ: tung đồng xu 20 lần, 12 lần mặt ngửa. Tỉ số số lần mặt ngửa so với tổng số lần tung là 12/20 (= 3/5); mặt sấp 20 − 12 = 8 lần, tỉ số 8/20.',
      'Viết số lần xảy ra ở trên, tổng số lần ở dưới; không so với số lần không xảy ra (12/8 là sai).',
      'Tung 20 lần không chắc được đúng 10 lần ngửa: mỗi lần làm thí nghiệm, kết quả có thể khác.',
    ],
  },
};
