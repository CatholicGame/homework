/**
 * Cảnh vẽ của 🏘️ Phố Kỹ Năng. Mỗi cảnh là một SVG 1600 × 1000, nét và màu theo bộ vẽ chung của các trò (INK, nét dày,
 * màu phẳng). Trạng thái của cảnh (đèn đỏ / xanh, xe tới, cửa bị gõ, điện thoại reo, loa…) KHÔNG vẽ lại: engine đặt
 * data-* trên khung cảnh (.ls-scene), CSS ở lifeSkills/styles.js bật / tắt các nhóm có class tương ứng.
 *
 * top: màn ngang nhìn từ y = top tới đáy (1000); màn càng rộng thì nhìn thêm sang hai bên (nền vẽ rộng từ x = -800 tới 2400,
 *   xem landBox). port: vùng nhìn khi màn hình dọc. Nhân vật đứng ở mép dưới vùng nhìn.
 */

export const INK = '#3F3A40';

const sky = (id) => `<defs>
    <linearGradient id="${id}-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8FD3FF"/><stop offset=".75" stop-color="#D6F0FF"/></linearGradient>
    <linearGradient id="${id}-road" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6B7280"/><stop offset="1" stop-color="#4B5563"/></linearGradient>
  </defs>
  <rect x="-800" width="3200" height="1000" fill="url(#${id}-sky)" stroke="none"/>`;

const cloud = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})" fill="#fff" stroke="none" class="ls-cloud">
    <ellipse cx="0" cy="0" rx="90" ry="30"/><ellipse cx="60" cy="-22" rx="60" ry="34"/><ellipse cx="-40" cy="-14" rx="44" ry="26"/></g>`;

const tree = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})">
    <rect x="-17" y="-200" width="34" height="200" rx="8" fill="#9A6236"/>
    <circle cx="0" cy="-240" r="96" fill="#4CC25A"/><circle cx="-57" cy="-200" r="60" fill="#3FAE4E"/><circle cx="63" cy="-200" r="62" fill="#3FAE4E"/></g>`;

const STROKE = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;

/** Ngã tư trước cổng trường: đèn cho người đi bộ, vạch kẻ đường, xe máy. data-light: red|green, data-bike: come|stop|none, data-alert. */
function crossing() {
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">${sky('cr')}
  <g ${STROKE}>
    <circle cx="1460" cy="250" r="56" fill="#FFD94D" stroke="#F2B705"/>
    ${cloud(260, 290)}${cloud(900, 250, .8)}
    <path d="M-800 450 Q-400 380 0 470 Q220 360 470 440 T980 420 T1600 430 Q2000 380 2400 440 V560 H-800Z" fill="#9BE08E" stroke="none"/>
    <g transform="translate(40 90) scale(.92)">
      <rect x="820" y="250" width="620" height="290" rx="10" fill="#FFE2B0"/>
      <path d="M790 262 L1130 150 L1470 262 Z" fill="#F07A4F"/>
      <rect x="1040" y="182" width="180" height="46" rx="10" fill="#fff"/>
      <text x="1130" y="214" font-size="26" font-weight="800" text-anchor="middle" fill="#B45309" stroke="none" font-family="inherit">TRƯỜNG EM</text>
      <g fill="#9ED8FF"><rect x="860" y="300" width="90" height="80" rx="6"/><rect x="980" y="300" width="90" height="80" rx="6"/><rect x="1190" y="300" width="90" height="80" rx="6"/><rect x="1310" y="300" width="90" height="80" rx="6"/></g>
      <path d="M905 300 V380 M860 340 H950 M1025 300 V380 M980 340 H1070 M1235 300 V380 M1190 340 H1280 M1355 300 V380 M1310 340 H1400" stroke-width="3"/>
      <path d="M1090 540 V420 Q1130 380 1170 420 V540" fill="#B7793F"/>
      <path d="M1130 150 V100"/><path d="M1130 100 L1180 114 L1130 128Z" fill="#EF4444"/>
    </g>
    <g fill="#fff"><rect x="560" y="500" width="260" height="14" rx="4"/><rect x="1440" y="500" width="900" height="14" rx="4"/><rect x="-800" y="500" width="700" height="14" rx="4"/>
      <rect x="580" y="470" width="16" height="70" rx="4"/><rect x="640" y="470" width="16" height="70" rx="4"/><rect x="700" y="470" width="16" height="70" rx="4"/><rect x="760" y="470" width="16" height="70" rx="4"/></g>
    ${tree(-420, 540, .8)}${tree(137, 540)}${tree(482, 540, .66)}${tree(1900, 540, .85)}
    <rect x="-810" y="540" width="3220" height="50" fill="#E7DCCB"/>
    <rect x="-810" y="590" width="3220" height="200" fill="url(#cr-road)"/>
    <g fill="#fff" stroke="none">${[560, 620, 680, 740, 800, 860].map(x => `<rect x="${x}" y="596" width="36" height="188" rx="4"/>`).join('')}</g>
    <g fill="#FACC15" stroke="none">${[-780, -580, -380, -180, 20, 220, 1000, 1200, 1400, 1600, 1800, 2000, 2200].map(x => `<rect x="${x}" y="686" width="110" height="10" rx="5"/>`).join('')}</g>
    <path d="M940 600 V780" stroke="#fff" stroke-width="8" stroke-dasharray="1 0"/>
    <rect x="-810" y="790" width="3220" height="220" fill="#EFE5D5"/>
    <path d="M-810 790 H2410" stroke-width="5"/>
    <path d="M-810 804 H2410" stroke="#D6C7AE" stroke-width="3"/>
    <g class="ls-bike"><g transform="translate(1180 600) scale(-1 1)">
      <ellipse cx="90" cy="150" rx="110" ry="12" fill="rgba(0,0,0,.18)" stroke="none"/>
      <circle cx="20" cy="120" r="32" fill="#374151"/><circle cx="20" cy="120" r="12" fill="#D1D5DB"/>
      <circle cx="170" cy="120" r="32" fill="#374151"/><circle cx="170" cy="120" r="12" fill="#D1D5DB"/>
      <path d="M-6 96 Q10 60 70 66 L150 70 Q186 72 196 104 L150 104 Q120 86 80 98 Z" fill="#EF4444"/>
      <path d="M170 74 L190 40" stroke-width="6"/><circle cx="198" cy="76" r="9" fill="#FDE68A"/>
      <path d="M80 66 L104 18 L132 22 L120 70Z" fill="#2563EB"/>
      <circle cx="120" cy="2" r="24" fill="#FBBF24"/><path d="M98 2 Q120 -26 144 2" fill="#FBBF24"/>
      <path d="M104 20 L170 46" stroke-width="8"/>
    </g>
    <circle class="ls-alert" cx="1090" cy="680" r="150" fill="none" stroke="#EF4444" stroke-width="10" stroke-dasharray="26 18"/></g>
    <g>
      <rect x="452" y="560" width="14" height="250" fill="#6B7280"/>
      <rect x="420" y="430" width="78" height="150" rx="14" fill="#1F2937"/>
      <circle class="ls-red" cx="459" cy="470" r="24" fill="#EF4444"/>
      <circle class="ls-red-off" cx="459" cy="470" r="24" fill="#4B2525"/>
      <circle class="ls-green" cx="459" cy="536" r="24" fill="#22C55E"/>
      <circle class="ls-green-off" cx="459" cy="536" r="24" fill="#243A2B"/>
    </g>
    <g class="ls-look ls-look-left"><path d="M120 690 L40 690 M70 660 L40 690 L70 720" stroke="#FACC15" stroke-width="14" fill="none"/></g>
    <g class="ls-look ls-look-right"><path d="M1480 690 L1560 690 M1530 660 L1560 690 L1530 720" stroke="#FACC15" stroke-width="14" fill="none"/></g>
  </g></svg>`;
}

/** Phòng khách: cửa ra vào, cửa sổ, ghế, bàn có điện thoại. data-door: knock, data-phone: ring. */
function home() {
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <rect x="-800" width="3200" height="1000" fill="#FDF0D5"/>
  <g ${STROKE}>
    <rect x="-810" y="-10" width="3220" height="800" fill="#FCE7C3" stroke="none"/>
    <path d="M-810 250 H2410" stroke="#EBCB98" stroke-width="6"/>
    <g fill="none" stroke="#F3D7A8" stroke-width="3">${[-700, -500, -300, -100, 100, 300, 500, 700, 900, 1100, 1300, 1500, 1700, 1900, 2100, 2300].map(x => `<path d="M${x} 260 V780"/>`).join('')}</g>
    <rect x="-810" y="780" width="3220" height="230" fill="#D8A86F"/>
    <path d="M-810 780 H2410" stroke-width="5"/>
    <g stroke="#C38E55" stroke-width="3">${[0, 1, 2, 3].map(i => `<path d="M-810 ${830 + i * 50} H2410"/>`).join('')}</g>
    <!-- cửa sổ -->
    <rect x="120" y="290" width="300" height="240" rx="10" fill="#9ED8FF"/>
    <path d="M270 290 V530 M120 410 H420" stroke-width="5"/>
    <path d="M150 330 Q200 300 240 330" stroke="#fff" stroke-width="5" fill="none"/>
    <rect x="100" y="270" width="340" height="30" rx="6" fill="#F472B6"/>
    <!-- tranh -->
    <rect x="560" y="300" width="180" height="130" rx="8" fill="#fff"/>
    <path d="M580 410 L630 350 L670 390 L700 360 L720 410Z" fill="#86EFAC"/><circle cx="690" cy="335" r="14" fill="#FDE047"/>
    <!-- ghế sô pha -->
    <rect x="80" y="610" width="460" height="150" rx="30" fill="#60A5FA"/>
    <rect x="60" y="560" width="90" height="200" rx="30" fill="#3B82F6"/><rect x="470" y="560" width="90" height="200" rx="30" fill="#3B82F6"/>
    <rect x="150" y="560" width="320" height="90" rx="24" fill="#93C5FD"/>
    <path d="M100 760 V790 M520 760 V790" stroke-width="8"/>
    <!-- bàn + điện thoại -->
    <rect x="620" y="660" width="260" height="22" rx="6" fill="#B7793F"/>
    <path d="M650 682 V780 M850 682 V780" stroke-width="10"/>
    <g class="ls-phone"><rect x="700" y="596" width="100" height="64" rx="14" fill="#F43F5E"/>
      <rect x="716" y="580" width="68" height="22" rx="10" fill="#FB7185"/><circle cx="750" cy="628" r="16" fill="#fff"/>
      <g class="ls-ring" fill="none" stroke="#F43F5E" stroke-width="6"><path d="M680 600 Q666 628 680 656"/><path d="M820 600 Q834 628 820 656"/><path d="M660 586 Q640 628 660 670"/><path d="M840 586 Q860 628 840 670"/></g>
    </g>
    <!-- cửa ra vào -->
    <g class="ls-door">
      <rect x="1010" y="300" width="270" height="480" rx="8" fill="#B7793F"/>
      <rect x="1040" y="330" width="210" height="190" rx="8" fill="#C98B4E"/><rect x="1040" y="550" width="210" height="200" rx="8" fill="#C98B4E"/>
      <circle cx="1240" cy="560" r="14" fill="#FACC15"/>
      <circle cx="1145" cy="420" r="14" fill="#1F2937"/>
    </g>
    <rect x="990" y="284" width="310" height="22" rx="6" fill="#92582A"/>
    <g class="ls-knock" stroke="none">
      <rect x="770" y="420" width="220" height="80" rx="40" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <path d="M990 450 L1012 460 L990 472Z" fill="#fff" stroke="${INK}" stroke-width="4"/>
      <text x="880" y="474" font-size="40" font-weight="800" text-anchor="middle" fill="#B45309" font-family="inherit">Cốc cốc!</text>
    </g>
    <!-- cây cảnh, kệ sách (màn rất rộng) -->
    <rect x="-440" y="420" width="300" height="360" rx="10" fill="#B7793F"/>
    ${[0, 1, 2].map(r => `<path d="M-440 ${520 + r * 100} H-140" stroke-width="5"/>${[0, 1, 2, 3, 4].map(i => `<rect x="${-420 + i * 52}" y="${450 + r * 100}" width="36" height="66" rx="4" fill="${['#EF4444', '#3B82F6', '#22C55E', '#FACC15', '#A855F7'][(i + r) % 5]}"/>`).join('')}`).join('')}
    <rect x="1720" y="300" width="260" height="220" rx="10" fill="#9ED8FF"/><path d="M1850 300 V520 M1720 410 H1980" stroke-width="5"/>
    <rect x="1400" y="680" width="110" height="100" rx="14" fill="#F97316"/>
    <path d="M1455 680 Q1400 560 1440 500 M1455 680 Q1470 560 1520 520 M1455 680 Q1430 600 1380 600" stroke="#16A34A" stroke-width="16" fill="none"/>
  </g></svg>`;
}

/** Siêu thị: kệ hàng, quầy thu ngân, lối ra. data-loa: on (loa đọc thông báo). */
function market() {
  const shelf = (x, colors) => `<g transform="translate(${x} 280)">
      <rect x="0" y="0" width="300" height="470" rx="10" fill="#F1F5F9"/>
      ${[0, 1, 2, 3].map(r => `<rect x="10" y="${100 + r * 110}" width="280" height="14" fill="#94A3B8"/>
        ${[0, 1, 2, 3, 4].map(i => `<rect x="${22 + i * 54}" y="${44 + r * 110}" width="42" height="56" rx="6" fill="${colors[(i + r) % colors.length]}"/>`).join('')}`).join('')}
    </g>`;
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
  <rect x="-800" width="3200" height="1000" fill="#EAF6F1"/>
  <g ${STROKE}>
    <rect x="-810" y="-10" width="3220" height="800" fill="#E0F2EC" stroke="none"/>
    <g fill="#FEF9C3">${[160, 560, 960, 1360].map(x => `<rect x="${x}" y="140" width="160" height="26" rx="13"/>`).join('')}</g>
    <rect x="-810" y="780" width="3220" height="230" fill="#E2E8F0"/>
    <path d="M-810 780 H2410" stroke-width="5"/>
    <g stroke="#CBD5E1" stroke-width="3">${[-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<path d="M${i * 220} 780 L${i * 220 - 120} 1000"/>`).join('')}</g>
    ${shelf(-300, ['#FDE047', '#60A5FA', '#F472B6', '#34D399'])}
    ${shelf(1620, ['#F87171', '#A78BFA', '#FBBF24', '#4ADE80'])}
    ${shelf(40, ['#F87171', '#FBBF24', '#34D399', '#60A5FA'])}
    ${shelf(380, ['#A78BFA', '#F472B6', '#FDE047', '#4ADE80'])}
    <rect x="60" y="226" width="240" height="44" rx="10" fill="#22C55E"/><text x="180" y="258" font-size="26" font-weight="800" text-anchor="middle" fill="#fff" stroke="none" font-family="inherit">BÁNH KẸO</text>
    <rect x="400" y="226" width="240" height="44" rx="10" fill="#3B82F6"/><text x="520" y="258" font-size="26" font-weight="800" text-anchor="middle" fill="#fff" stroke="none" font-family="inherit">SỮA</text>
    <!-- quầy thu ngân -->
    <rect x="760" y="560" width="420" height="200" rx="14" fill="#FB923C"/>
    <rect x="740" y="540" width="460" height="34" rx="10" fill="#FDBA74"/>
    <rect x="1040" y="470" width="110" height="74" rx="8" fill="#334155"/><rect x="1052" y="482" width="86" height="40" rx="4" fill="#86EFAC"/>
    <rect x="800" y="330" width="320" height="64" rx="12" fill="#fff"/><text x="960" y="374" font-size="34" font-weight="800" text-anchor="middle" fill="#EA580C" stroke="none" font-family="inherit">THU NGÂN</text>
    <path d="M960 280 V330" stroke-width="4"/>
    <!-- lối ra -->
    <rect x="1290" y="300" width="270" height="480" rx="8" fill="#BAE6FD"/>
    <path d="M1425 300 V780" stroke-width="5"/>
    <rect x="1310" y="226" width="230" height="56" rx="10" fill="#16A34A"/><text x="1425" y="264" font-size="30" font-weight="800" text-anchor="middle" fill="#fff" stroke="none" font-family="inherit">LỐI RA ➜</text>
    <!-- loa -->
    <g transform="translate(700 150)">
      <path d="M0 20 H30 L70 -10 V90 L30 60 H0Z" fill="#94A3B8"/>
      <g class="ls-loa" fill="none" stroke="#F97316" stroke-width="7"><path d="M90 10 Q110 40 90 70"/><path d="M110 -6 Q140 40 110 86"/></g>
    </g>
  </g></svg>`;
}

/** Bản đồ phố (màn đầu): trời, đồi, đường cong, vài ngôi nhà. Các nút địa điểm đặt đè lên. */
export function townSvg() {
  const house = (x, y, wall, roof) => `<g transform="translate(${x} ${y})">
      <rect x="0" y="40" width="150" height="110" rx="6" fill="${wall}"/><path d="M-14 46 L75 -10 L164 46Z" fill="${roof}"/>
      <rect x="20" y="70" width="40" height="36" rx="4" fill="#9ED8FF"/><rect x="90" y="86" width="40" height="64" rx="4" fill="#B7793F"/></g>`;
  return `<svg viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${sky('tw')}
  <g ${STROKE}>
    <circle cx="1480" cy="110" r="60" fill="#FFD94D" stroke="#F2B705"/>
    ${cloud(240, 120)}${cloud(820, 90, .8)}${cloud(1240, 170, .7)}
    <path d="M0 360 Q300 260 620 340 T1200 320 T1600 330 V1000 H0Z" fill="#9BE08E" stroke="none"/>
    <path d="M0 520 Q400 440 800 520 T1600 500 V1000 H0Z" fill="#86D97A" stroke="none"/>
    <path d="M-20 960 C300 820 500 640 820 640 S1300 560 1620 420" stroke="#6B7280" stroke-width="90" fill="none"/>
    <path d="M-20 960 C300 820 500 640 820 640 S1300 560 1620 420" stroke="#FACC15" stroke-width="6" stroke-dasharray="40 34" fill="none"/>
    ${house(120, 300, '#FFE2B0', '#F07A4F')}${house(560, 300, '#DBEAFE', '#3B82F6')}${house(1000, 270, '#FCE7F3', '#EC4899')}${house(1360, 240, '#DCFCE7', '#16A34A')}
    ${tree(440, 470, .5)}${tree(900, 450, .45)}${tree(1260, 420, .42)}
  </g></svg>`;
}

export const SCENES = {
  crossing: { svg: crossing, top: 200, port: '120 330 820 670' },
  home: { svg: home, top: 160, port: '560 260 860 740' },
  market: { svg: market, top: 150, port: '520 220 900 780' },
};

/** Vùng nhìn màn ngang theo tỉ lệ khung cảnh (rộng / cao): giữ phần trên từ y = top, màn rộng hơn 1600 : (1000 - top)
 *  thì mở rộng sang hai bên (tối đa nền đã vẽ, -800 … 2400) thay vì cắt bớt phía trên. */
export function landBox(sc, aspect) {
  const h = 1000 - sc.top;
  const w = Math.min(3200, Math.max(1600, h * aspect));
  return `${800 - w / 2} ${sc.top} ${w} ${h}`;
}
