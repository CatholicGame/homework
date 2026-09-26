/**
 * Bé Tập Làm Toán — 99 đề toán cho trẻ mẫu giáo (trang 5–76 của sách).
 * Nguồn: docs/pre_1/be_tap_lam_toan_chuan_bi_vao_lop_1.pdf (đáp án in ở trang 77–79).
 *
 * Mỗi chủ đề một tệp trong pre4/ (xuất STATIONS, mỗi trạm có `part` = số chủ đề bên dưới);
 * hình cắt khai báo trong scripts/pre4/<cùng tên>.json. Dạng lượt chơi: play4.js
 * (eq, calc, ask, choice, spot, link, rank, path, seq) và các dạng của Tập 1–2 (engine.js).
 */

import { STATIONS as CONG_TRU_1 } from './pre4/congtru1.js';
import { STATIONS as CONG_TRU_2 } from './pre4/congtru2.js';
import { STATIONS as SO_100 } from './pre4/so100.js';
import { STATIONS as HINH } from './pre4/hinh.js';
import { STATIONS as PHAN_LOAI } from './pre4/phanloai.js';
import { STATIONS as TO_HOP } from './pre4/tohop.js';
import { STATIONS as THOI_GIAN } from './pre4/thoigian.js';

export const BOOK4 = {
  key: 'pre4',
  title: 'Bé Tập Làm Toán',
  subtitle: '99 đề toán — chuẩn bị vào lớp 1',
  note: 'Nguồn: 99 đề toán dành cho trẻ mẫu giáo (Lớp lá).',
  stations: [...CONG_TRU_1, ...CONG_TRU_2, ...SO_100, ...HINH, ...PHAN_LOAI, ...TO_HOP, ...THOI_GIAN],
  parts: [
    { num: 1, title: 'Phép cộng, trừ trong phạm vi 20' },
    { num: 2, title: 'Số trong phạm vi 100' },
    { num: 3, title: 'Hình cơ bản' },
    { num: 4, title: 'Không gian' },
    { num: 5, title: 'Phân loại' },
    { num: 6, title: 'Thống kê' },
    { num: 7, title: 'Tổ hợp' },
    { num: 8, title: 'Tìm quy luật' },
    { num: 9, title: 'Nhận biết thời gian' },
    { num: 10, title: 'Tiền' },
  ],
};
