// Video dọc 9:16 (TikTok / Reels) giới thiệu Toán Tiểu Học cho phụ huynh, khoảng 1 phút 20.
// Theo mẫu E:\ManC\kinh-thanh\scripts\.tmp\video-gioi-thieu. Không nói, không hiện địa chỉ trang (TikTok không duyệt quảng bá).
// Mỗi đoạn: head (chữ lớn trên màn), lines (lời đọc = phụ đề; say = cách đọc cho Azure khi khác chữ hiện), items (hình).
// Toạ độ item theo % khung 1080×1920: x = tâm ngang, y = mép trên, w = bề rộng (cqw); rot độ nghiêng; z lớp; d giây trễ.
// Loại item:
//   clip   : điện thoại chiếu đoạn quay thật của app (app/clip-<tên>.mp4, cắt bằng clips.mjs), rate = tốc độ
//   screen : điện thoại hiện ảnh chụp thật của app (app/*-dai.png), cuộn xuống scroll (0..1), tap = [x%, y%, giây]
//   grades : dải thẻ các lớp nảy lên
//   cta    : màn hình chính điện thoại có biểu tượng app

export const SEGMENTS = [
  {
    head: ['Con ngại học toán?', 'Thử cách này xem!'],
    lines: ['Con ngồi học toán mà cứ ngáp dài?', 'Ba mẹ thử cho con học kiểu này xem.'],
    items: [{ kind: 'clip', src: 'app/clip-tho-dem.mp4', x: 50, y: 23, w: 45 }],
  },
  {
    head: ['Toán Tiểu Học', 'từ mầm non đến lớp 5'],
    lines: [
      'Đây là Toán Tiểu Học: học cùng con từ trước lớp một đến hết lớp năm.',
      'Bám đúng sách giáo khoa và vở bài tập, đúng bài, đúng trang.',
    ],
    items: [
      { kind: 'screen', src: 'app/g-1-learn-dai.png', scroll: 0.35, x: 31, y: 23, w: 37, rot: -5, z: 0 },
      { kind: 'screen', src: 'app/g3-learn-dai.png', scroll: 0.4, x: 69, y: 24.5, w: 37, rot: 4, z: 1, d: 0.6 },
      { kind: 'grades', x: 50, y: 61, w: 92, z: 3 },
    ],
  },
  {
    head: ['Thấy bằng hình', 'rồi mới học quy tắc'],
    lines: [
      'Mỗi bài cho con thấy bằng hình trước, rồi mới đến quy tắc.',
      'Vì sao bảy là số lẻ? Xếp chấm thành từng đôi, con tự thấy còn thừa một chấm.',
    ],
    items: [{ kind: 'clip', src: 'app/clip-chan-le.mp4', x: 50, y: 23, w: 45 }],
  },
  {
    head: ['Con tự tay làm', 'như với đồ thật'],
    lines: [
      'Con tự tay lát ô vuông, đặt quả lên cân, tô số theo nét.',
      'Làm sai, thầy nhắc cách nghĩ chứ không đưa sẵn đáp án.',
    ],
    items: [
      { kind: 'clip', src: 'app/clip-met-vuong.mp4', x: 30, y: 24, w: 38, rot: -4, z: 0 },
      { kind: 'clip', src: 'app/clip-can-xoai.mp4', x: 70, y: 23, w: 38, rot: 4, z: 1, d: 1.2 },
    ],
  },
  {
    head: ['Đặt tính', 'như viết trong vở'],
    lines: [
      'Luyện tính thì đặt tính, kẻ thước, nhớ số y như viết trong vở.',
      'Mỗi lượt một phép tính mới, luyện bao nhiêu cũng có bài.',
    ],
    items: [{ kind: 'clip', src: 'app/clip-dat-tinh.mp4', rate: 2.2, x: 50, y: 23, w: 45 }],
  },
  {
    head: ['Trò chơi', 'mà vẫn là toán'],
    lines: [
      'Có trò chơi chở khách, bán hàng, săn cá mập, bảo vệ Trái Đất,',
      'toàn là toán của đúng lớp con đang học.',
    ],
    items: [
      { kind: 'clip', src: 'app/clip-xe-buyt.mp4', rate: 1.3, x: 30, y: 23, w: 38, rot: -4, z: 1 },
      { kind: 'screen', src: 'app/g3-challenge-dai.png', scroll: 0.38, x: 70, y: 25, w: 36, rot: 4, z: 0, d: 1 },
    ],
  },
  {
    head: ['Đấu Trường Nhí', 'thi cùng các bạn'],
    lines: ['Buổi tối có Đấu Trường Nhí: các bạn cùng lên sân khấu, thi trả lời trước cả khán phòng.'],
    items: [{ kind: 'screen', src: 'app/g3-challenge-dai.png', scroll: 0, tap: [50, 38, 3], x: 50, y: 23, w: 40 }],
  },
  {
    head: ['Cả Tiếng Việt', 'và Tiếng Anh'],
    lines: [
      'Ngoài Toán còn có Tiếng Việt, Tiếng Anh, luyện viết văn có nhận xét từng câu.',
      'Gần thi có đề giữa kì, cuối kì để con ôn.',
    ],
    items: [
      { kind: 'screen', src: 'app/g3-tiengviet-dai.png', scroll: 0.15, x: 31, y: 24, w: 37, rot: -4, z: 0 },
      { kind: 'screen', src: 'app/g3-learn-dai.png', scroll: 0.5, x: 69, y: 23, w: 37, rot: 4, z: 1, d: 3 },
    ],
  },
  {
    head: ['Học xong', 'được quay sticker'],
    lines: ['Làm đủ mười bài, con được quay một sticker để sưu tập, nên ngày nào cũng muốn học.'],
    items: [{ kind: 'screen', src: 'app/g3-sticker-dai.png', scroll: 0.02, tap: [50, 34, 2.5], x: 50, y: 23, w: 40 }],
  },
  {
    head: ['Mỗi tối', '15 phút cùng con'],
    lines: [
      'Mỗi tối chỉ cần mười lăm phút ngồi cùng con.',
      'Con hiểu bài vì được thấy, được tự tay làm, chứ không phải học thuộc.',
    ],
    items: [{ kind: 'cta', x: 50, y: 22.5, w: 100 }],
  },
];

/** Màn kết (không đọc). */
export const END = { big: 'Toán Tiểu Học', small: 'Học bằng hình, tự tay làm, đúng sách giáo khoa', note: 'Mầm non · Lớp 1 đến Lớp 5' };

export const GRADES = [
  ['Mầm non', '#EC4899'], ['Lớp 1', '#FF6B9D'], ['Lớp 2', '#60A5FA'], ['Lớp 3', '#34D399'], ['Lớp 4', '#C084FC'], ['Lớp 5', '#F59E0B'],
];
