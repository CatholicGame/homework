/** Vở BT Toán 3 Tập 2, Bài 59–67: what the child types / taps in English → the book's answer (engine/i18n.js toVietnameseAnswer). */

// "Đọc số" blanks (Bài 59, 62) with five-digit numbers: toVietnameseAnswer only turns English number words
// below 1 000 into Vietnamese, so the readings are listed here, written without "and"
// ("forty thousand five hundred thirteen"), with hyphens or spaces ("twenty-nine" / "twenty nine").
const READINGS = {
  'eighteen thousand twenty-three': 'mười tám nghìn không trăm hai mươi ba',
  'sixty thousand one hundred four': 'sáu mươi nghìn một trăm linh bốn',
  'forty thousand five hundred thirteen': 'bốn mươi nghìn năm trăm mười ba',
  'fifteen thousand thirty': 'mười lăm nghìn không trăm ba mươi',
  'eighty-nine thousand two hundred five': 'tám mươi chín nghìn hai trăm linh năm',
  'sixty thousand': 'sáu mươi nghìn',
  'forty thousand five hundred seventy-eight': 'bốn mươi nghìn năm trăm bảy mươi tám',
};
const readings = {};
for (const [en, vi] of Object.entries(READINGS)) {
  readings[en] = vi;
  readings[en.replace(/-/g, ' ')] = vi;
}

export default {
  ...readings,
  // Bài 60 Q2 (Tiết 2): TV programs
  'english grade 3': 'Tiếng Anh lớp 3', 'english 3': 'Tiếng Anh lớp 3',
  'crafts grade 3': 'Thủ công lớp 3', 'crafts 3': 'Thủ công lớp 3',
  "children's music": 'Ca nhạc thiếu nhi', 'childrens music': 'Ca nhạc thiếu nhi', 'children music': 'Ca nhạc thiếu nhi',
  'life skills': 'Kĩ năng sống', 'life skill': 'Kĩ năng sống',
  // Bài 62 Q4 (Tiết 1): cities
  'city a': 'A', 'city b': 'B', 'city c': 'C', 'city d': 'D',
  // Bài 67 Tiết 1 Q1: activities
  'wake up': 'thức dậy', 'waking up': 'thức dậy', 'wakes up': 'thức dậy', 'get up': 'thức dậy',
  'ride a bike': 'đi xe đạp', 'riding a bike': 'đi xe đạp', 'rides a bike': 'đi xe đạp', 'bike ride': 'đi xe đạp', 'cycling': 'đi xe đạp', 'ride bike': 'đi xe đạp',
  'have breakfast': 'ăn sáng', 'having breakfast': 'ăn sáng', 'eat breakfast': 'ăn sáng', 'breakfast': 'ăn sáng',
  // Bài 67 Tiết 1 Q3: chores
  'tidy up the bookshelf': 'sắp xếp lại giá sách', 'tidy the bookshelf': 'sắp xếp lại giá sách', 'tidy up the bookshelves': 'sắp xếp lại giá sách',
  'arrange the bookshelf': 'sắp xếp lại giá sách', 'bookshelf': 'sắp xếp lại giá sách',
  'vacuum then mop the floor': 'hút bụi rồi lau nhà', 'vacuum and mop the floor': 'hút bụi rồi lau nhà',
  'vacuum': 'hút bụi', 'mop the floor': 'lau nhà', 'mop': 'lau nhà',
  'cut the grass in the garden': 'cắt cỏ ở vườn', 'cut the grass': 'cắt cỏ ở vườn', 'mow the lawn': 'cắt cỏ ở vườn', 'mow the grass': 'cắt cỏ ở vườn',
};
