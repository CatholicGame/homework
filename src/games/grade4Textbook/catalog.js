/**
 * Mục lục SGK Toán 4 (NXB Giáo dục Việt Nam, tái bản lần thứ sáu, 2011; sách trang 181–183).
 * Mỗi bài học trong sách là một "bài" của app, đánh số liên tục 1–175 theo thứ tự trong sách.
 * page = trang sách nơi bài bắt đầu (PDF docs/lop_4/Sách giáo khoa Toán 4.pdf: chỉ số trang 0-based = trang sách).
 */

const C1 = 'Chương một. Số tự nhiên. Bảng đơn vị đo khối lượng';
const C2 = 'Chương hai. Bốn phép tính với các số tự nhiên. Hình học';
const C3 = 'Chương ba. Dấu hiệu chia hết cho 2, 5, 9, 3. Giới thiệu hình bình hành';
const C4 = 'Chương bốn. Phân số, các phép tính với phân số. Giới thiệu hình thoi';
const C5 = 'Chương năm. Tỉ số, một số bài toán liên quan đến tỉ số. Tỉ lệ bản đồ';
const C6 = 'Chương sáu. Ôn tập';

const TT = ' (tiếp theo)';
const RAW = [
  [C1, [
    [3, 'Ôn tập các số đến 100 000'], [4, 'Ôn tập các số đến 100 000' + TT], [5, 'Ôn tập các số đến 100 000' + TT],
    [6, 'Biểu thức có chứa một chữ'], [7, 'Luyện tập'], [8, 'Các số có sáu chữ số'], [10, 'Luyện tập'],
    [11, 'Hàng và lớp'], [12, 'So sánh các số có nhiều chữ số'], [13, 'Triệu và lớp triệu'], [14, 'Triệu và lớp triệu' + TT],
    [16, 'Luyện tập'], [17, 'Luyện tập'], [19, 'Dãy số tự nhiên'], [20, 'Viết số tự nhiên trong hệ thập phân'],
    [21, 'So sánh và xếp thứ tự các số tự nhiên'], [22, 'Luyện tập'], [23, 'Yến, tạ, tấn'], [24, 'Bảng đơn vị đo khối lượng'],
    [25, 'Giây, thế kỉ'], [26, 'Luyện tập'], [26, 'Tìm số trung bình cộng'], [28, 'Luyện tập'], [28, 'Biểu đồ'],
    [30, 'Biểu đồ' + TT], [33, 'Luyện tập'], [35, 'Luyện tập chung'], [36, 'Luyện tập chung'],
  ]],
  [C2, [
    [38, 'Phép cộng'], [39, 'Phép trừ'], [40, 'Luyện tập'], [41, 'Biểu thức có chứa hai chữ'],
    [42, 'Tính chất giao hoán của phép cộng'], [43, 'Biểu thức có chứa ba chữ'], [45, 'Tính chất kết hợp của phép cộng'],
    [46, 'Luyện tập'], [47, 'Tìm hai số khi biết tổng và hiệu của hai số đó'], [48, 'Luyện tập'], [48, 'Luyện tập chung'],
    [49, 'Góc nhọn, góc tù, góc bẹt'], [50, 'Hai đường thẳng vuông góc'], [51, 'Hai đường thẳng song song'],
    [52, 'Vẽ hai đường thẳng vuông góc'], [53, 'Vẽ hai đường thẳng song song'], [54, 'Thực hành vẽ hình chữ nhật'],
    [55, 'Thực hành vẽ hình vuông'], [55, 'Luyện tập'], [56, 'Luyện tập chung'],
    [57, 'Nhân với số có một chữ số'], [58, 'Tính chất giao hoán của phép nhân'], [59, 'Nhân với 10, 100, 1000, … Chia cho 10, 100, 1000, …'],
    [60, 'Tính chất kết hợp của phép nhân'], [61, 'Nhân với số có tận cùng là chữ số 0'], [62, 'Đề-xi-mét vuông'],
    [64, 'Mét vuông'], [66, 'Nhân một số với một tổng'], [67, 'Nhân một số với một hiệu'], [68, 'Luyện tập'],
    [69, 'Nhân với số có hai chữ số'], [69, 'Luyện tập'], [70, 'Giới thiệu nhân nhẩm số có hai chữ số với 11'],
    [72, 'Nhân với số có ba chữ số'], [73, 'Nhân với số có ba chữ số' + TT], [74, 'Luyện tập'], [75, 'Luyện tập chung'],
    [76, 'Chia một tổng cho một số'], [77, 'Chia cho số có một chữ số'], [78, 'Luyện tập'], [78, 'Chia một số cho một tích'],
    [79, 'Chia một tích cho một số'], [80, 'Chia hai số có tận cùng là các chữ số 0'], [81, 'Chia cho số có hai chữ số'],
    [82, 'Chia cho số có hai chữ số' + TT], [83, 'Luyện tập'], [83, 'Chia cho số có hai chữ số' + TT], [84, 'Luyện tập'],
    [85, 'Thương có chữ số 0'], [86, 'Chia cho số có ba chữ số'], [87, 'Luyện tập'], [87, 'Chia cho số có ba chữ số' + TT],
    [89, 'Luyện tập'], [90, 'Luyện tập chung'], [91, 'Luyện tập chung'],
  ]],
  [C3, [
    [94, 'Dấu hiệu chia hết cho 2'], [95, 'Dấu hiệu chia hết cho 5'], [96, 'Luyện tập'], [97, 'Dấu hiệu chia hết cho 9'],
    [97, 'Dấu hiệu chia hết cho 3'], [98, 'Luyện tập'], [99, 'Luyện tập chung'], [99, 'Ki-lô-mét vuông'], [100, 'Luyện tập'],
    [102, 'Hình bình hành'], [103, 'Diện tích hình bình hành'], [104, 'Luyện tập'],
  ]],
  [C4, [
    [106, 'Phân số'], [108, 'Phân số và phép chia số tự nhiên'], [109, 'Phân số và phép chia số tự nhiên' + TT], [110, 'Luyện tập'],
    [111, 'Phân số bằng nhau'], [112, 'Rút gọn phân số'], [114, 'Luyện tập'], [115, 'Quy đồng mẫu số các phân số'],
    [116, 'Quy đồng mẫu số các phân số' + TT], [117, 'Luyện tập'], [118, 'Luyện tập chung'], [119, 'So sánh hai phân số cùng mẫu số'],
    [120, 'Luyện tập'], [121, 'So sánh hai phân số khác mẫu số'], [122, 'Luyện tập'], [123, 'Luyện tập chung'], [123, 'Luyện tập chung'],
    [124, 'Luyện tập chung'], [126, 'Phép cộng phân số'], [127, 'Phép cộng phân số' + TT], [128, 'Luyện tập'], [128, 'Luyện tập'],
    [129, 'Phép trừ phân số'], [130, 'Phép trừ phân số' + TT], [131, 'Luyện tập'], [131, 'Luyện tập chung'], [132, 'Phép nhân phân số'],
    [133, 'Luyện tập'], [134, 'Luyện tập'], [135, 'Tìm phân số của một số'], [135, 'Phép chia phân số'], [136, 'Luyện tập'],
    [137, 'Luyện tập'], [137, 'Luyện tập chung'], [138, 'Luyện tập chung'], [138, 'Luyện tập chung'], [139, 'Luyện tập chung'],
    [140, 'Hình thoi'], [141, 'Diện tích hình thoi'], [143, 'Luyện tập'], [144, 'Luyện tập chung'],
  ]],
  [C5, [
    [146, 'Giới thiệu tỉ số'], [147, 'Tìm hai số khi biết tổng và tỉ số của hai số đó'], [148, 'Luyện tập'], [149, 'Luyện tập'],
    [149, 'Luyện tập chung'], [150, 'Tìm hai số khi biết hiệu và tỉ số của hai số đó'], [151, 'Luyện tập'], [151, 'Luyện tập'],
    [152, 'Luyện tập chung'], [153, 'Luyện tập chung'], [154, 'Tỉ lệ bản đồ'], [156, 'Ứng dụng của tỉ lệ bản đồ'],
    [157, 'Ứng dụng của tỉ lệ bản đồ' + TT], [158, 'Thực hành'], [159, 'Thực hành' + TT],
  ]],
  [C6, [
    [160, 'Ôn tập về số tự nhiên'], [161, 'Ôn tập về số tự nhiên' + TT], [161, 'Ôn tập về số tự nhiên' + TT],
    [162, 'Ôn tập về các phép tính với số tự nhiên'], [163, 'Ôn tập về các phép tính với số tự nhiên' + TT],
    [164, 'Ôn tập về các phép tính với số tự nhiên' + TT], [164, 'Ôn tập về biểu đồ'], [166, 'Ôn tập về phân số'],
    [167, 'Ôn tập về các phép tính với phân số'], [168, 'Ôn tập về các phép tính với phân số' + TT],
    [169, 'Ôn tập về các phép tính với phân số' + TT], [170, 'Ôn tập về các phép tính với phân số' + TT],
    [170, 'Ôn tập về đại lượng'], [171, 'Ôn tập về đại lượng' + TT], [172, 'Ôn tập về đại lượng' + TT],
    [173, 'Ôn tập về hình học'], [174, 'Ôn tập về hình học' + TT], [175, 'Ôn tập về tìm số trung bình cộng'],
    [175, 'Ôn tập về tìm hai số khi biết tổng và hiệu của hai số đó'], [176, 'Ôn tập về tìm hai số khi biết tổng hoặc hiệu và tỉ số của hai số đó'],
    [176, 'Luyện tập chung'], [177, 'Luyện tập chung'], [178, 'Luyện tập chung'], [179, 'Luyện tập chung'],
  ]],
];

let n = 0;
/** [{ id: 'bai-1', number: 1, page: 3, title, chapter }] — 175 bài. */
export const CATALOG = RAW.flatMap(([chapter, list]) => list.map(([page, title]) => {
  n++;
  return { id: `bai-${n}`, number: n, page, title, chapter };
}));
