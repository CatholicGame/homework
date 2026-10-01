/** Vở BT Toán 3 Tập 2, Bài 49–51: đáp án bé gõ bằng tiếng Anh → chữ trong đáp án của sách. */
// Bài 51 Tiết 2 Q1: số đo diện tích viết bằng chữ (areaWordsOk): mọi cách viết thường gặp.
const AREA = {
  'Tám nghìn bốn trăm linh bảy xăng-ti-mét vuông': ['eight thousand four hundred and seven', 'eight thousand four hundred seven'],
  'Chín nghìn không trăm năm mươi sáu xăng-ti-mét vuông': ['nine thousand and fifty-six', 'nine thousand fifty-six', 'nine thousand and fifty six', 'nine thousand fifty six'],
  'Ba nghìn không trăm linh tư xăng-ti-mét vuông': ['three thousand and four', 'three thousand four'],
};
const UNITS = ['', ' square centimeters', ' square centimetres', ' square centimeter', ' square cm', ' cm²', ' cm2'];
const area = {};
for (const [vi, list] of Object.entries(AREA)) {
  for (const en of list) for (const u of UNITS) area[en + u] = vi;
}

export default {
  ...area,
  // Bài 50 Tiết 2 Q3 b): xếp được hình vuông không? (yesOk)
  yes: 'Có', 'yes, it can': 'Có', 'yes it can': 'Có', 'yes, you can': 'Có', 'yes you can': 'Có', 'yes, i can': 'Có', 'yes i can': 'Có',
  // Bài 50 Tiết 3 Q2: Nam tính đúng hay sai? (namWrongOk)
  wrong: 'sai', 'nam is wrong': 'Nam tính sai', 'he is wrong': 'Nam tính sai', "he's wrong": 'Nam tính sai', "nam's wrong": 'Nam tính sai',
  'nam calculated wrong': 'Nam tính sai', 'nam calculated wrongly': 'Nam tính sai', 'nam calculated incorrectly': 'Nam tính sai',
  'nam is not right': 'Nam tính không đúng', 'nam is not correct': 'Nam tính không đúng', 'not right': 'không đúng', 'not correct': 'không đúng',
  incorrect: 'sai', 'it is wrong': 'sai', "it's wrong": 'sai', false: 'sai', 'nam is incorrect': 'Nam tính sai',
};
