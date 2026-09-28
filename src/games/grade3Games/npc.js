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

/** Hình NPC toàn thân; đổi `mood` thì vẽ lại để chuyển động chạy lại từ đầu. */
export function npcPic(n, mood = 'wait') {
  return `<img class="g3-npc-img g3-npc-${mood}" src="${mood === 'sad' ? n.sad : n.img}" alt="${n.name}" draggable="false">`;
}

export const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
