/**
 * Khách hàng NPC dùng chung cho các trò: hình nhân vật (WebP nền trong, cắt từ
 * scripts/g3games/npc-sheet.png bằng cut_npcs.py) + cách xưng hô.
 * Tâm trạng 'wait' (chờ) / 'happy' (vui: nhún nhảy) thể hiện bằng chuyển động; 'sad' (không hài lòng)
 * đổi sang hình mặt cau có (cắt từ scripts/g3games/npc-sheet-sad.png, cùng tư thế và cỡ) + lắc đầu.
 * me: khách tự xưng; you: khách gọi bé.
 */

import imgBaTu from '../../assets/grade3-games/npc/ba-tu.webp';
import imgOngSau from '../../assets/grade3-games/npc/ong-sau.webp';
import imgCoLan from '../../assets/grade3-games/npc/co-lan.webp';
import imgChuHung from '../../assets/grade3-games/npc/chu-hung.webp';
import imgChiMai from '../../assets/grade3-games/npc/chi-mai.webp';
import imgAnhMinh from '../../assets/grade3-games/npc/anh-minh.webp';
import imgBanNa from '../../assets/grade3-games/npc/ban-na.webp';
import imgBeTi from '../../assets/grade3-games/npc/be-ti.webp';
import imgBanBin from '../../assets/grade3-games/npc/ban-bin.webp';
import sadBaTu from '../../assets/grade3-games/npc/ba-tu-sad.webp';
import sadOngSau from '../../assets/grade3-games/npc/ong-sau-sad.webp';
import sadCoLan from '../../assets/grade3-games/npc/co-lan-sad.webp';
import sadChuHung from '../../assets/grade3-games/npc/chu-hung-sad.webp';
import sadChiMai from '../../assets/grade3-games/npc/chi-mai-sad.webp';
import sadAnhMinh from '../../assets/grade3-games/npc/anh-minh-sad.webp';
import sadBanNa from '../../assets/grade3-games/npc/ban-na-sad.webp';
import sadBeTi from '../../assets/grade3-games/npc/be-ti-sad.webp';
import sadBanBin from '../../assets/grade3-games/npc/ban-bin-sad.webp';
// Người làm ở kho hàng / bến xe (trò Xe chở hàng) — cắt từ scripts/g3games/npc-sheet-truck.png (bác tài, chị giao hàng)
// và npc-sheet-jobs.png (chú bốc hàng, cô thợ máy, anh quản lý kho). Chưa có tấm mặt buồn: 'sad' dùng lại hình thường
// (vẫn có chuyển động lắc đầu).
import imgBacBa from '../../assets/grade3-games/npc/bac-ba.webp';
import imgChiHoa from '../../assets/grade3-games/npc/chi-hoa.webp';
import imgChuTam from '../../assets/grade3-games/npc/chu-tam.webp';
import imgCoThu from '../../assets/grade3-games/npc/co-thu.webp';
import imgAnhNam from '../../assets/grade3-games/npc/anh-nam.webp';
// Phòng thí nghiệm (trò Máy phóng to – thu nhỏ) — cũng cắt từ npc-sheet-jobs.png (logo trên laptop đã xoá);
// mặt buồn của cô nhà khoa học cắt từ npc-scientist-sad.png, hai người kia chưa có.
import imgCoHanh from '../../assets/grade3-games/npc/co-hanh.webp';
import sadCoHanh from '../../assets/grade3-games/npc/co-hanh-sad.webp';
import imgThayQuang from '../../assets/grade3-games/npc/thay-quang.webp';
import imgChiLinh from '../../assets/grade3-games/npc/chi-linh.webp';
// Văn phòng thám tử (trò Thám tử góc vuông) — chú công an cắt từ npc-sheet-jobs.png, chưa có mặt buồn.
import imgChuKhang from '../../assets/grade3-games/npc/chu-khang.webp';

export const NPCS = [
  { id: 'ba', name: 'Bà Tư', me: 'bà', you: 'cháu', img: imgBaTu, sad: sadBaTu },
  { id: 'co', name: 'Cô Lan', me: 'cô', you: 'cháu', img: imgCoLan, sad: sadCoLan },
  { id: 'chu', name: 'Chú Hùng', me: 'chú', you: 'cháu', img: imgChuHung, sad: sadChuHung },
  { id: 'ong', name: 'Ông Sáu', me: 'ông', you: 'cháu', img: imgOngSau, sad: sadOngSau },
  { id: 'anh', name: 'Anh Minh', me: 'anh', you: 'em', img: imgAnhMinh, sad: sadAnhMinh },
  { id: 'ban', name: 'Bạn Na', me: 'mình', you: 'bạn', img: imgBanNa, sad: sadBanNa },
  { id: 'chi', name: 'Chị Mai', me: 'chị', you: 'em', img: imgChiMai, sad: sadChiMai },
  { id: 'ti', name: 'Bạn Tí', me: 'mình', you: 'bạn', img: imgBeTi, sad: sadBeTi },
  { id: 'bin', name: 'Bạn Bin', me: 'mình', you: 'bạn', img: imgBanBin, sad: sadBanBin },
];

export const WORKER_NPCS = [
  { id: 'taixe', name: 'Bác Ba tài xế', me: 'bác', you: 'cháu', img: imgBacBa, sad: imgBacBa },
  { id: 'giaohang', name: 'Chị Hoa giao hàng', me: 'chị', you: 'em', img: imgChiHoa, sad: imgChiHoa },
  { id: 'bochang', name: 'Chú Tâm bốc hàng', me: 'chú', you: 'cháu', img: imgChuTam, sad: imgChuTam },
  { id: 'thomay', name: 'Cô Thu thợ máy', me: 'cô', you: 'cháu', img: imgCoThu, sad: imgCoThu },
  { id: 'quanly', name: 'Anh Nam quản lý kho', me: 'anh', you: 'em', img: imgAnhNam, sad: imgAnhNam },
];

/** Phòng thí nghiệm: 3 người làm máy + 2 bạn nhỏ đến xem máy (thứ tự = người giao nhiệm vụ ở màn giới thiệu cấp 1, 2, 3, 4). */
export const LAB_NPCS = [
  { id: 'khoahoc', name: 'Cô Hạnh nhà khoa học', me: 'cô', you: 'cháu', img: imgCoHanh, sad: sadCoHanh },
  { id: 'giaosu', name: 'Thầy Quang giáo sư', me: 'thầy', you: 'em', img: imgThayQuang, sad: imgThayQuang },
  { id: 'kysu', name: 'Chị Linh kỹ sư', me: 'chị', you: 'em', img: imgChiLinh, sad: imgChiLinh },
  NPCS.find(n => n.id === 'ti'),
  NPCS.find(n => n.id === 'ban'),
];

/** Văn phòng thám tử: chú công an giao vụ + các bạn nhỏ làm thám tử phụ (thứ tự = người giao nhiệm vụ cấp 1, 2, 3). */
export const DETECTIVE_NPCS = [
  { id: 'congan', name: 'Chú Khang công an', me: 'chú', you: 'cháu', img: imgChuKhang, sad: imgChuKhang },
  NPCS.find(n => n.id === 'ban'),
  NPCS.find(n => n.id === 'ti'),
  NPCS.find(n => n.id === 'bin'),
  NPCS.find(n => n.id === 'anh'),
];

/** Hình NPC toàn thân; đổi `mood` thì vẽ lại để chuyển động chạy lại từ đầu. */
export function npcPic(n, mood = 'wait') {
  return `<img class="g3-npc-img g3-npc-${mood}" src="${mood === 'sad' ? n.sad : n.img}" alt="${n.name}" draggable="false" decoding="async">`;
}

// Tải sẵn mọi hình (vui + buồn) ngay khi mở trò chơi — khách mới hiện ra là có hình liền, không chờ mạng.
// Giữ tham chiếu để trình duyệt không bỏ ảnh đã tải.
const kept = [];
export function preloadNpcs() {
  if (kept.length) return;
  for (const n of [...NPCS, ...WORKER_NPCS, ...LAB_NPCS.slice(0, 3), DETECTIVE_NPCS[0]]) {
    for (const src of [n.img, n.sad]) {
      const im = new Image();
      im.decoding = 'async';
      im.src = src;
      kept.push(im);
    }
  }
}

// Mạng chập chờn làm một hình khách tải hỏng → trước đây phải thoát ra vào lại. Giờ tự tải lại (tối đa 3 lần,
// chờ lâu dần), thêm ?r= để trình duyệt không dùng lại lần tải hỏng.
if (typeof document !== 'undefined') {
  document.addEventListener('error', (e) => {
    const img = e.target;
    if (!(img instanceof HTMLImageElement) || !img.classList.contains('g3-npc-img')) return;
    const tries = Number(img.dataset.retry || 0);
    if (tries >= 3) return;
    img.dataset.retry = String(tries + 1);
    const base = img.getAttribute('src').replace(/[?&]r=\d+$/, '');
    setTimeout(() => { if (img.isConnected) img.src = `${base}${base.includes('?') ? '&' : '?'}r=${tries + 1}`; }, 500 * (tries + 1));
  }, true);
}

export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
