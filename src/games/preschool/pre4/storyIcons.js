/**
 * Icon nhỏ chen trong đề bằng chữ (round.story của vòng 'eq'): vẽ lại theo nét riêng, thay ảnh chụp
 * chữ của sách (chữ trong ảnh co theo bề ngang điện thoại, nhỏ không đọc được).
 */
const INK = '#3F3A40';
const svg = (inner, vb = '0 0 64 48') => `<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">${inner}</svg>`;

export const STORY_ICONS = {
  // Con sâu xanh, đầu đen, hai râu
  sau: svg(`
    <circle cx="51" cy="31" r="7" fill="#A3D94A"/><circle cx="41" cy="31" r="8" fill="#B5E35C"/>
    <circle cx="30" cy="30" r="8.5" fill="#A3D94A"/><circle cx="17" cy="25" r="11" fill="#4B4650"/>
    <path d="M12 15 L8 6 M20 14 L23 5" fill="none"/>
    <circle cx="13" cy="24" r="2.6" fill="#fff" stroke="none"/><circle cx="21" cy="24" r="2.6" fill="#fff" stroke="none"/>
    <circle cx="13.5" cy="24.5" r="1.2" fill="${INK}" stroke="none"/><circle cx="21.5" cy="24.5" r="1.2" fill="${INK}" stroke="none"/>
    <path d="M14 30 Q17 32 20 30" fill="none" stroke="#fff" stroke-width="2"/>
    <path d="M30 39 v4 M41 39 v4 M51 38 v4" fill="none"/>`),
  // Bông hoa đỏ nhuỵ vàng, cuống và hai lá
  hoa: svg(`
    <path d="M32 30 V46" fill="none" stroke="#4D7C0F" stroke-width="4"/>
    <path d="M32 42 Q22 34 18 40 Q24 46 32 42 Z M32 40 Q42 32 46 38 Q40 44 32 40 Z" fill="#84CC16"/>
    <g fill="#E11D48"><circle cx="32" cy="9" r="7"/><circle cx="42" cy="16" r="7"/><circle cx="39" cy="27" r="7"/><circle cx="25" cy="27" r="7"/><circle cx="22" cy="16" r="7"/></g>
    <circle cx="32" cy="18" r="6" fill="#FACC15"/>`, '0 0 64 48'),
  // Chiếc kẹo gói giấy vàng, sọc cam
  keo: svg(`
    <path d="M18 24 L4 13 L7 24 L4 35 Z M46 24 L60 13 L57 24 L60 35 Z" fill="#FDBA4D"/>
    <ellipse cx="32" cy="24" rx="15" ry="12" fill="#FACC15"/>
    <path d="M24 14 L38 34 M31 12 L44 30" fill="none" stroke="#F97316" stroke-width="3.5"/>
    <ellipse cx="32" cy="24" rx="15" ry="12" fill="none"/>`),
  // Bắp ngô vàng, vỏ xanh
  ngo: svg(`
    <path d="M44 44 L54 47" fill="none" stroke="#4D7C0F" stroke-width="4"/>
    <ellipse cx="30" cy="22" rx="10" ry="19" transform="rotate(38 30 22)" fill="#FACC15"/>
    <path d="M22 13 L37 30 M18 20 L33 35 M27 8 L41 24" fill="none" stroke="#EAB308" stroke-width="2.5"/>
    <path d="M44 44 Q24 40 12 22 Q30 30 44 44 Z" fill="#84CC16"/>
    <path d="M44 44 Q44 22 34 8 Q50 24 44 44 Z" fill="#65A30D"/>`),
};
