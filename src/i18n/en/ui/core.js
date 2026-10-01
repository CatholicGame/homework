/** Giao diện chung bổ sung: Việt → Anh (engine/i18n.js). */
const MONTHS = ['MỘT', 'HAI', 'BA', 'TƯ', 'NĂM', 'SÁU', 'BẢY', 'TÁM', 'CHÍN', 'MƯỜI', 'MƯỜI MỘT', 'MƯỜI HAI'];
const EN_MONTHS = ['JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'];

export default {
  entries: {
    // placeholder ô bài giải (textarea), giữ xuống dòng như bản Việt
    'Bài giải ...': 'Solution\n...',
    // tiêu đề cột viết nhiều dòng "Hàng<br>chục<br>nghìn" (engine/i18n.js dịch cả cụm)
    'Hàng chục nghìn': 'Ten thousands',
    'Hàng nghìn': 'Thousands',
    'Hàng trăm': 'Hundreds',
    'Hàng chục': 'Tens',
    'Hàng đơn vị': 'Ones',
  },
  // Tờ lịch ghi tháng trên nhiều dòng <text> ("THÁNG" / "MƯỜI" / "HAI").
  svgLines: Object.fromEntries(MONTHS.map((m, i) => [`THÁNG ${m}`, EN_MONTHS[i]])),
};
