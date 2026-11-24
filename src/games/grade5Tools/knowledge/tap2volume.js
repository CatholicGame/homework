/** Kiến thức Toán 5 Tập Hai, chủ đề 8, 9, Bài 45–53 (cùng dạng TEACH trong ../knowledge.js). Nguồn: docs/lop_5/kien-thuc-toan5-tap2.md. */

const pg = (p) => `SGK Toán 5 Tập Hai, trang ${p}`;

export const K5_VOLUME = {
  45: {
    title: 'Thể tích của một hình', page: pg(30),
    points: [
      'Hình hộp chữ nhật có ba kích thước: <b>chiều dài, chiều rộng, chiều cao</b>. Hình lập phương có sáu mặt là các hình vuông bằng nhau.',
      'Hình lập phương nằm trọn trong hình hộp chữ nhật: thể tích hình lập phương <b>bé hơn</b> thể tích hình hộp chữ nhật.',
      'Hai hình cùng gồm 4 hình lập phương như nhau (xếp khác dáng): thể tích hai hình <b>bằng nhau</b>.',
      'Hình P tách thành hai hình M và N: thể tích hình P <b>bằng tổng</b> thể tích các hình M và N.',
      'Đếm thể tích phải đếm <b>cả các hình ở phía sau</b>, không chỉ mặt trước; hình bị khuyết thì trừ đi.',
    ],
  },
  46: {
    title: 'Xăng-ti-mét khối. Đề-xi-mét khối', page: pg(33),
    points: [
      'Để đo thể tích người ta có thể dùng những đơn vị: xăng-ti-mét khối, đề-xi-mét khối.',
      '<b>Xăng-ti-mét khối</b> là thể tích của hình lập phương có cạnh 1 cm, viết tắt là <b>cm³</b>. <b>Đề-xi-mét khối</b> là thể tích của hình lập phương có cạnh 1 dm, viết tắt là <b>dm³</b>.',
      'Hình lập phương cạnh 1 dm gồm 1 000 hình lập phương cạnh 1 cm: <b>1 dm³ = 1 000 cm³</b>; 1 cm³ = 1/1 000 dm³.',
      'Đổi đơn vị: mỗi đơn vị ba chữ số. 5 dm³ 6 cm³ = <b>5 006</b> cm³ (hai chữ số 0 giữ chỗ); 8 700 cm³ = 8,7 dm³; 1 l = 1 dm³.',
    ],
  },
  47: {
    title: 'Mét khối', page: pg(35),
    points: [
      'Để đo thể tích người ta còn dùng đơn vị mét khối. <b>Mét khối</b> là thể tích của hình lập phương có cạnh dài 1 m, viết tắt là <b>m³</b>.',
      'Hình lập phương cạnh 1 m gồm 1 000 hình lập phương cạnh 1 dm: <b>1 m³ = 1 000 dm³ = 1 000 000 cm³</b>.',
      'Mỗi đơn vị đo thể tích gấp <b>1 000 lần</b> đơn vị bé hơn tiếp liền: 2 400 dm³ = 2,4 m³; 25 m³ = 25 000 000 cm³.',
      'Ước lượng: viên xúc xắc khoảng 1 cm³, hộp cầm trong tay khoảng 1 dm³, thùng to hai bạn khiêng khoảng 1 m³.',
    ],
  },
  49: {
    title: 'Hình khai triển của hình lập phương, hình hộp chữ nhật và hình trụ', page: pg(40),
    points: [
      '<b>Hình khai triển</b> của một hình khối là hình có thể gấp lại để được hình khối đó.',
      'Hình khai triển của hình lập phương gồm 6 hình vuông bằng nhau; của hình hộp chữ nhật gồm 6 hình chữ nhật (hai đáy ở hai phía hàng mặt bên).',
      'Hình khai triển của hình trụ gồm một hình chữ nhật và hai hình tròn bằng nhau; chiều dài hình chữ nhật bằng <b>chu vi</b> hình tròn đáy.',
      'Không phải cứ 6 hình vuông là gấp được hình lập phương: có 5 ô thẳng hàng hoặc 4 ô thành hình vuông to thì không gấp được. Hai mặt đối diện không bao giờ kề nhau.',
    ],
  },
  50: {
    title: 'Diện tích xung quanh và diện tích toàn phần của hình hộp chữ nhật', page: pg(44),
    points: [
      'Diện tích xung quanh của hình hộp chữ nhật là tổng diện tích bốn mặt bên. Bốn mặt bên trải ra thành <b>một hình chữ nhật</b> dài bằng chu vi đáy.',
      'Để tính diện tích xung quanh của hình hộp chữ nhật, ta lấy <b>chu vi mặt đáy nhân với chiều cao</b> (cùng đơn vị đo): (5 + 4) × 2 × 2 = 36 (m²).',
      'Diện tích toàn phần của hình hộp chữ nhật là <b>tổng diện tích xung quanh và diện tích hai đáy</b>.',
      'Đọc kĩ đề có những mặt nào: bể không nắp chỉ có một đáy (Sxq + 1 đáy); khuôn không đáy chỉ tính xung quanh. Hai hộp khác đơn vị phải đổi cùng đơn vị rồi mới so sánh.',
    ],
  },
  51: {
    title: 'Diện tích xung quanh và diện tích toàn phần của hình lập phương', page: pg(48),
    points: [
      'Tổng diện tích bốn mặt bên của một hình lập phương là diện tích xung quanh của hình lập phương đó.',
      'Diện tích xung quanh của hình lập phương bằng <b>diện tích một mặt nhân với 4</b>: cạnh 30 cm thì 30 × 30 × 4 = 3 600 (cm²).',
      'Diện tích toàn phần của hình lập phương bằng <b>diện tích một mặt nhân với 6</b>: 30 × 30 × 6 = 5 400 (cm²).',
      'Cẩn thận: lấy diện tích một mặt (cạnh × cạnh), không lấy cạnh × 4. Ghép hai hình lập phương thì hai mặt áp vào nhau bị che, không tính.',
    ],
  },
  52: {
    title: 'Thể tích của hình hộp chữ nhật', page: pg(51),
    points: [
      'Xếp các hình lập phương 1 dm³ vào hộp 6 dm × 5 dm × 4 dm: mỗi lớp 6 × 5 = 30 hình, 4 lớp: 6 × 5 × 4 = 120 (dm³).',
      'Muốn tính thể tích của hình hộp chữ nhật, ta lấy <b>chiều dài nhân với chiều rộng rồi nhân với chiều cao</b> (cùng đơn vị đo): <b>V = a × b × c</b>.',
      'Hình ghép: tách thành các hình hộp chữ nhật rồi cộng thể tích. Vật chìm trong bể: thể tích vật bằng thể tích phần nước dâng lên.',
      'Kích thước khác đơn vị thì đổi về cùng một đơn vị trước khi nhân.',
    ],
  },
  53: {
    title: 'Thể tích của hình lập phương', page: pg(54),
    points: [
      'Hình lập phương cạnh 3 cm chứa 3 × 3 × 3 = 27 hình lập phương 1 cm³: thể tích 27 cm³.',
      'Muốn tính thể tích của hình lập phương, ta lấy <b>cạnh nhân với cạnh rồi nhân với cạnh</b>: <b>V = a × a × a</b>.',
      'Cẩn thận: a × a là diện tích một mặt (cm²), thể tích phải nhân thêm cạnh và dùng đơn vị khối (cm³). Cạnh 0,4 m: V = 0,064 m³.',
    ],
  },
};
