/** Tranh thẻ chữ cái (preschool/flash): con ngựa, con ong, con hổ, quả bơ, cái phao. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const O = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const T = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const N = `fill="none" ${T}`;
const BLUSH = 'fill="#FDA4AF" opacity=".8"';
const eye = (x, y, rx = 5, ry = 6.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${INK}"/><circle cx="${x + 1.8}" cy="${y - 2.2}" r="2" fill="#fff"/>`;

/** Sóng tuần hoàn (chu kì 40) để dịch ngang liền mạch. */
function wave(y, amp, bottom) {
  let d = `M-60 ${y}`;
  for (let x = -60; x < 300; x += 40) d += ` Q${x + 10} ${y - amp} ${x + 20} ${y} Q${x + 30} ${y + amp} ${x + 40} ${y}`;
  return d + ` L300 ${bottom} L-60 ${bottom} Z`;
}

/* Bơ: nửa quả (toạ độ gốc ở tâm) */
const AVO = 'M0 -72 C20 -72 28 -46 32 -20 C42 6 46 42 26 62 C12 74 -12 74 -26 62 C-46 42 -42 6 -32 -20 C-28 -46 -20 -72 0 -72 Z';
const AVO2 = 'M0 -62 C15 -62 22 -40 25 -17 C34 6 37 36 20 53 C10 62 -10 62 -20 53 C-37 36 -34 6 -25 -17 C-22 -40 -15 -62 0 -62 Z';
const AVO3 = 'M0 -50 C11 -50 17 -32 20 -12 C28 8 30 30 16 43 C8 50 -8 50 -16 43 C-30 30 -28 8 -20 -12 C-17 -32 -11 -50 0 -50 Z';
const avoHalf = (x, y, rot) => `<g transform="translate(${x} ${y}) rotate(${rot})">
<path d="${AVO}" fill="#365314" ${O}/>
<path d="${AVO2}" fill="#A3E635" ${T}/>
<path d="${AVO3}" fill="#ECFCCB"/>
<ellipse cx="0" cy="24" rx="23" ry="23" fill="#D9F99D" ${T}/>
<path d="M-16 32 C-10 42 10 42 16 32" fill="none" stroke="#BEF264" stroke-width="4" stroke-linecap="round"/>
<ellipse cx="-9" cy="-20" rx="3.6" ry="4.6" fill="${INK}"/><circle cx="-8" cy="-21.6" r="1.4" fill="#fff"/>
<ellipse cx="9" cy="-20" rx="3.6" ry="4.6" fill="${INK}"/><circle cx="10" cy="-21.6" r="1.4" fill="#fff"/>
<ellipse cx="-16" cy="-10" rx="5" ry="3.2" ${BLUSH}/><ellipse cx="16" cy="-10" rx="5" ry="3.2" ${BLUSH}/>
<path d="M-5 -11 C-2 -7 2 -7 5 -11" ${N}/>
</g>`;
const star = (x, y, r) => `<path d="M${x} ${y - r} Q${x + r * .22} ${y - r * .22} ${x + r} ${y} Q${x + r * .22} ${y + r * .22} ${x} ${y + r} Q${x - r * .22} ${y + r * .22} ${x - r} ${y} Q${x - r * .22} ${y - r * .22} ${x} ${y - r} Z" fill="#FDE047" ${T}/>`;

export const ART = {
  'ngua': `<svg class="fa fa-ngua" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="120" cy="166" rx="88" ry="6" fill="#000" opacity=".08"/>
<g class="p-gallop"><g class="p-body">
<g class="p-tail"><path d="M66 82 C44 74 24 92 22 118 C20 138 26 150 34 156 C36 140 44 124 58 108 C64 100 70 92 66 82 Z" fill="#78350F" ${O}/>
<path d="M50 92 C38 104 33 122 33 140" ${N}/></g>
<rect x="72" y="100" width="18" height="54" rx="8" fill="#B45309" ${O}/>
<rect x="70" y="149" width="22" height="14" rx="4" fill="#57534E" ${T}/>
<g class="p-fl2"><g class="p-fl2b"><rect x="141" y="124" width="18" height="30" rx="8" fill="#B45309" ${O}/>
<rect x="139" y="149" width="22" height="14" rx="4" fill="#57534E" ${T}/></g>
<rect x="141" y="100" width="18" height="40" rx="8" fill="#B45309" ${O}/></g>
<rect x="92" y="104" width="18" height="50" rx="8" fill="#D97706" ${O}/>
<rect x="90" y="149" width="22" height="14" rx="4" fill="#57534E" ${T}/>
<g class="p-fl1"><g class="p-fl1b"><rect x="161" y="126" width="18" height="28" rx="8" fill="#D97706" ${O}/>
<rect x="159" y="149" width="22" height="14" rx="4" fill="#57534E" ${T}/></g>
<rect x="161" y="102" width="18" height="40" rx="8" fill="#D97706" ${O}/></g>
<ellipse cx="118" cy="96" rx="62" ry="30" fill="#D97706" ${O}/>
<path d="M76 84 C84 94 86 106 82 118" ${N}/>
<path d="M84 74 C100 68 124 67 140 72" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".35"/>
<g class="p-head">
<path d="M180 42 L188 24 L195 44 Z" fill="#B45309" ${T}/>
<path d="M138 84 C146 68 156 58 168 50 L196 62 C186 76 180 92 176 108 C162 110 148 100 138 84 Z" fill="#D97706" ${O}/>
<g class="p-mane"><path d="M170 44 C160 42 152 48 150 56 C142 56 138 64 140 70 C132 72 130 82 134 88 C130 92 132 98 138 100 L150 90 C152 76 160 62 176 52 Z" fill="#78350F" ${O}/></g>
<path d="M164 50 C176 36 200 38 212 54 C222 66 228 78 220 86 C210 94 192 86 182 78 C172 70 158 60 164 50 Z" fill="#D97706" ${O}/>
<path d="M170 46 L172 26 L186 40 Z" fill="#D97706" ${O}/><path d="M174 40 L175 32 L181 38 Z" fill="#F9A8D4"/>
<path d="M168 46 C172 36 182 33 189 38 C182 42 177 48 175 55 Z" fill="#78350F" ${T}/>
<ellipse cx="212" cy="76" rx="13" ry="11" fill="#F5C98A" ${T}/>
<ellipse cx="216" cy="72" rx="2.5" ry="3" fill="${INK}"/>
<path d="M204 82 C208 85 212 85 216 82" ${N}/>
<g class="p-eye">${eye(191, 57)}</g>
<ellipse cx="196" cy="70" rx="7" ry="4.5" ${BLUSH}/>
</g></g></g>
</svg>`,

  'ong': `<svg class="fa fa-ong" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="ong-c"><ellipse cx="106" cy="114" rx="50" ry="38"/></clipPath></defs>
<g class="p-shadow"><ellipse cx="112" cy="166" rx="56" ry="5" fill="#000" opacity=".08"/></g>
<g class="p-fly">
<path d="M88 146 L84 160 M108 150 L106 162 M128 146 L132 160" fill="none" ${O}/>
<g class="p-w1"><ellipse cx="86" cy="58" rx="17" ry="26" transform="rotate(-25 86 58)" fill="#BFDBFE" fill-opacity=".9" ${O}/></g>
<path d="M58 110 L36 118 L58 126 Z" fill="${INK}" ${O}/>
<ellipse cx="106" cy="114" rx="50" ry="38" fill="#FDE047"/>
<g clip-path="url(#ong-c)" fill="${INK}">
<path d="M70 70 C80 100 80 130 70 160 L88 160 C98 130 98 100 88 70 Z"/>
<path d="M108 70 C118 100 118 130 108 160 L126 160 C136 130 136 100 126 70 Z"/>
</g>
<ellipse cx="106" cy="114" rx="50" ry="38" fill="none" ${O}/>
<path d="M76 92 C82 86 90 83 98 82" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".6"/>
<g class="p-w2"><ellipse cx="122" cy="54" rx="19" ry="28" transform="rotate(18 122 54)" fill="#BFDBFE" fill-opacity=".9" ${O}/>
<path d="M116 46 C118 38 123 33 129 32" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></g>
<g class="p-ant1"><path d="M156 72 C154 60 150 52 144 46" fill="none" ${O}/><circle cx="143" cy="44" r="5.5" fill="${INK}"/></g>
<g class="p-ant2"><path d="M176 72 C180 60 184 52 190 46" fill="none" ${O}/><circle cx="191" cy="44" r="5.5" fill="${INK}"/></g>
<circle cx="166" cy="100" r="32" fill="#FDE047" ${O}/>
<g class="p-eye">${eye(155, 96, 5, 7)}${eye(179, 96, 5, 7)}</g>
<ellipse cx="146" cy="110" rx="6.5" ry="4" ${BLUSH}/><ellipse cx="188" cy="110" rx="6.5" ry="4" ${BLUSH}/>
<path d="M159 110 C164 117 171 117 176 110" ${N}/>
</g>
</svg>`,

  'ho': `<svg class="fa fa-ho" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="ho-c"><ellipse cx="98" cy="106" rx="62" ry="30"/></clipPath></defs>
<ellipse cx="114" cy="166" rx="92" ry="6" fill="#000" opacity=".08"/>
<g class="p-legs">
<rect x="52" y="108" width="20" height="52" rx="9" fill="#EA7A2A" ${O}/>
<rect x="124" y="108" width="20" height="52" rx="9" fill="#EA7A2A" ${O}/>
<rect x="72" y="112" width="22" height="50" rx="10" fill="#FB923C" ${O}/>
<rect x="146" y="112" width="22" height="50" rx="10" fill="#FB923C" ${O}/>
<path d="M79 154 L79 161 M87 154 L87 161 M153 154 L153 161 M161 154 L161 161" fill="none" ${T}/>
</g>
<g class="p-torso">
<g class="p-tail"><path d="M40 104 C16 102 8 76 22 58" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="round"/>
<path d="M40 104 C16 102 8 76 22 58" fill="none" stroke="#FB923C" stroke-width="9" stroke-linecap="round"/>
<path d="M22 58 L25 63" fill="none" stroke="${INK}" stroke-width="12" stroke-linecap="round"/>
<path d="M11 78 L22 80 M15 93 L25 90" fill="none" ${O}/></g>
<ellipse cx="98" cy="106" rx="62" ry="30" fill="#FB923C"/>
<g clip-path="url(#ho-c)">
<ellipse cx="100" cy="142" rx="54" ry="18" fill="#FFF"/>
<g fill="${INK}"><path d="M54 72 L64 72 L58 100 Z"/><path d="M76 72 L88 72 L82 106 Z"/><path d="M100 72 L112 72 L106 106 Z"/><path d="M124 72 L134 72 L129 98 Z"/><path d="M34 102 L48 106 L34 112 Z"/></g>
</g>
<ellipse cx="98" cy="106" rx="62" ry="30" fill="none" ${O}/>
<g class="p-head">
<circle cx="146" cy="50" r="13" fill="#FB923C" ${O}/><circle cx="146" cy="50" r="6" fill="#FDA4AF"/>
<circle cx="188" cy="50" r="13" fill="#FB923C" ${O}/><circle cx="188" cy="50" r="6" fill="#FDA4AF"/>
<ellipse cx="166" cy="80" rx="40" ry="36" fill="#FB923C" ${O}/>
<path d="M159 46 L161 58 M167 45 L167 60 M175 46 L173 58" fill="none" ${O}/>
<path d="M127 72 L139 76 L128 82 M128 88 L139 90 L130 96" ${N}/>
<path d="M205 72 L194 76 L204 82 M204 88 L194 90 L202 96" ${N}/>
<g class="p-mouth" opacity="0"><ellipse cx="168" cy="111" rx="13" ry="13" fill="#7F1D1D" ${T}/>
<ellipse cx="168" cy="118" rx="8" ry="5" fill="#F472B6"/>
<path d="M159 101 L161 109 L163 101 Z M173 101 L175 109 L177 101 Z" fill="#fff" ${T}/></g>
<g class="p-jaw"><ellipse cx="168" cy="109" rx="10" ry="6.5" fill="#FFF" ${T}/></g>
<ellipse cx="158" cy="99" rx="12" ry="9" fill="#FFF" ${T}/>
<ellipse cx="178" cy="99" rx="12" ry="9" fill="#FFF" ${T}/>
<path d="M162 89 L174 89 L168 96 Z" fill="#F472B6" ${T}/>
<circle cx="154" cy="99" r="1.4" fill="${INK}"/><circle cx="160" cy="102" r="1.4" fill="${INK}"/><circle cx="176" cy="102" r="1.4" fill="${INK}"/><circle cx="182" cy="99" r="1.4" fill="${INK}"/>
<g class="p-eye">${eye(152, 76)}${eye(183, 76)}</g>
<ellipse cx="140" cy="92" rx="6.5" ry="4" ${BLUSH}/><ellipse cx="196" cy="92" rx="6.5" ry="4" ${BLUSH}/>
</g>
<g class="p-roar" opacity="0"><path d="M216 88 Q223 100 216 112 M225 80 Q234 100 225 120 M214 70 L221 64 M214 130 L221 136" fill="none" ${O}/></g>
</g>
</svg>`,

  'bo-qua': `<svg class="fa fa-bo-qua" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="120" cy="166" rx="100" ry="6" fill="#000" opacity=".08"/>
<g class="p-left">${avoHalf(72, 92, -12)}</g>
<g class="p-right">${avoHalf(166, 92, 12)}
<g class="p-seed"><circle cx="161" cy="115.5" r="21" fill="#92400E" ${O}/>
<ellipse cx="153" cy="107" rx="6.5" ry="4.5" fill="#D97706" opacity=".85"/>
<path d="M168 126 C172 122 174 118 174 113" fill="none" stroke="#78350F" stroke-width="3" stroke-linecap="round"/></g></g>
<g class="p-spark1" opacity="0">${star(206, 30, 10)}</g>
<g class="p-spark2" opacity="0">${star(122, 34, 7)}</g>
</svg>`,

  'phao': `<svg class="fa fa-phao" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<defs><clipPath id="phao-w"><rect x="6" y="90" width="228" height="84" rx="26"/></clipPath>
<clipPath id="phao-c"><path d="M28 100 A92 46 0 1 0 212 100 A92 46 0 1 0 28 100 Z M82 94 A38 16 0 1 1 158 94 A38 16 0 1 1 82 94 Z" clip-rule="evenodd"/></clipPath></defs>
<g clip-path="url(#phao-w)"><g class="p-wb"><path d="${wave(126, 5, 180)}" fill="#7DD3FC"/></g></g>
<g class="p-ring">
<ellipse cx="120" cy="108" rx="92" ry="46" fill="#991B1B" ${O}/>
<g clip-path="url(#phao-c)">
<rect x="0" y="0" width="240" height="180" fill="#FFF"/>
<g fill="#EF4444"><polygon points="120,96 305,173 197,281"/><polygon points="120,96 43,281 -65,173"/><polygon points="120,96 -65,19 43,-89"/><polygon points="120,96 197,-89 305,19"/></g>
</g>
<ellipse cx="120" cy="100" rx="92" ry="46" fill="none" ${O}/>
<ellipse cx="120" cy="94" rx="38" ry="16" fill="#38BDF8" ${O}/>
<path d="M82 94 A38 16 0 0 1 158 94 A38 9 0 0 0 82 94 Z" fill="#FCA5A5" ${T}/>
<path d="M44 82 C56 66 78 58 100 56" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".75"/>
<path d="M172 124 C186 120 196 112 202 104" fill="none" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".5"/>
</g>
<g clip-path="url(#phao-w)"><g class="p-wf"><path d="${wave(142, 5, 180)}" fill="#0EA5E9" opacity=".92"/>
<path d="${wave(142, 5, 180).split(' L300')[0]}" fill="none" stroke="#E0F2FE" stroke-width="3" stroke-linecap="round"/></g></g>
<path d="M6 130 L6 148 A26 26 0 0 0 32 174 L208 174 A26 26 0 0 0 234 148 L234 130" fill="none" ${O}/>
<g class="p-drop1" opacity="0"><path d="M30 128 C26 122 28 116 30 112 C32 116 34 122 30 128 Z M42 120 C40 117 41 114 42 112 C43 114 44 117 42 120 Z" fill="#BAE6FD" ${T}/></g>
<g class="p-drop2" opacity="0"><path d="M210 128 C206 122 208 116 210 112 C212 116 214 122 210 128 Z M198 120 C196 117 197 114 198 112 C199 114 200 117 198 120 Z" fill="#BAE6FD" ${T}/></g>
</svg>`,
};

/* ---- Động tác ---- */
const rn = v => Math.round(v * 100) / 100;
const PLAY = [], CALM = [];
/** frames: [pct, {x, y, r, sx, sy, o}] — bản êm dịu nhân biên độ với k (kR riêng cho góc quay). */
function anim(key, part, [ox, oy], dur, frames, { ease = 'ease-in-out', k = 0.6, kR = k } = {}) {
  const sel = `.fa-${key} .p-${part}`;
  const name = `fa-${key}-${part}`;
  const body = (kt, kr) => frames.map(([p, f]) => {
    const s = (v, kk) => rn(1 + ((v ?? 1) - 1) * kk);
    let t = `transform: translate(${rn((f.x || 0) * kt)}px,${rn((f.y || 0) * kt)}px) rotate(${rn((f.r || 0) * kr)}deg) scale(${s(f.sx, kt)},${s(f.sy, kt)})`;
    if (f.o != null) t += `; opacity: ${f.o}`;
    return `${p}% { ${t} }`;
  }).join(' ');
  PLAY.push(`${sel} { transform-box: view-box; transform-origin: ${ox}px ${oy}px; }`,
    `.is-play ${sel} { animation: ${name} ${dur}s ${ease} both; }`,
    `@keyframes ${name} { ${body(1, 1)} }`,
    `@keyframes ${name}-c { ${body(k, kR)} }`);
  CALM.push(`.is-play ${sel} { animation-name: ${name}-c; }`);
}
const blink = (key, at, [ox, oy], dur) => anim(key, 'eye', [ox, oy], dur, [[0, {}], [at, {}], [at + 3, { sy: 0.1 }], [at + 6, {}], [100, {}]], { k: 1 });

/* Ngựa: lấy đà, chồm lên hai chân sau, đá hai chân trước, bờm đuôi bay, đáp xuống, phi một bước. */
anim('ngua', 'body', [100, 163], 2.4, [[0, {}], [10, { r: 3 }], [28, { r: -17 }], [46, { r: -15 }], [54, { r: -16 }], [62, { r: 2 }], [68, {}], [100, {}]]);
anim('ngua', 'gallop', [118, 140], 2.4, [[0, {}], [62, {}], [64, { y: 2, sy: 0.97 }], [72, { x: 7, y: -9, r: -4 }], [80, { x: 12, r: 3 }], [86, { x: 10, y: -3 }], [93, { x: 4 }], [100, {}]]);
anim('ngua', 'fl1', [170, 106], 2.4, [[0, {}], [14, {}], [28, { r: -52 }], [36, { r: -18 }], [44, { r: -56 }], [52, { r: -22 }], [60, { r: 4 }], [66, {}], [72, { r: -34 }], [80, { r: 12 }], [88, {}], [100, {}]]);
anim('ngua', 'fl1b', [170, 136], 2.4, [[0, {}], [14, {}], [28, { r: 85 }], [36, { r: 45 }], [44, { r: 90 }], [52, { r: 50 }], [60, {}], [66, {}], [72, { r: 50 }], [80, {}], [100, {}]]);
anim('ngua', 'fl2', [150, 104], 2.4, [[0, {}], [16, {}], [31, { r: -40 }], [40, { r: -12 }], [48, { r: -48 }], [56, { r: -14 }], [62, {}], [74, { r: 14 }], [82, { r: -26 }], [90, {}], [100, {}]]);
anim('ngua', 'fl2b', [150, 132], 2.4, [[0, {}], [16, {}], [31, { r: 80 }], [40, { r: 40 }], [48, { r: 85 }], [56, { r: 40 }], [62, {}], [82, { r: 45 }], [90, {}], [100, {}]]);
anim('ngua', 'head', [152, 86], 2.4, [[0, {}], [10, { r: 5 }], [28, { r: -10 }], [38, { r: -4 }], [48, { r: -11 }], [62, { r: 6 }], [70, {}], [76, { r: -5 }], [86, { r: 3 }], [100, {}]]);
anim('ngua', 'mane', [172, 50], 2.4, [[0, {}], [20, {}], [30, { r: 12 }], [38, { r: -6 }], [46, { r: 12 }], [56, { r: -4 }], [66, { r: 8 }], [76, { r: -6 }], [86, { r: 5 }], [100, {}]]);
anim('ngua', 'tail', [66, 86], 2.4, [[0, {}], [12, { r: -6 }], [28, { r: 16 }], [36, { r: 6 }], [44, { r: 18 }], [54, { r: 10 }], [64, { r: -4 }], [74, { r: 20 }], [86, { r: -6 }], [100, {}]]);
blink('ngua', 90, [191, 57], 2.4);

/* Ong: lấy đà, vỗ cánh vù vù, bay vòng số 8 rồi đáp lại chỗ cũ, râu rung. */
anim('ong', 'fly', [112, 120], 2.4, [[0, {}], [8, { y: 4, sx: 1.06, sy: 0.92 }], [18, { x: -12, y: -14, r: -8 }], [30, { x: -30, y: -20, r: -12 }], [40, { x: -22, y: -4, r: 4 }], [50, { x: 0, y: -12 }], [60, { x: 20, y: -20, r: 10 }], [70, { x: 26, y: -4, r: 6 }], [80, { x: 12, y: -6, r: -4 }], [89, { y: 3, sx: 1.06, sy: 0.93 }], [95, { y: -2 }], [100, {}]]);
anim('ong', 'shadow', [112, 166], 2.4, [[0, {}], [8, { sx: 1.08 }], [30, { x: -30, sx: 0.65, o: 0.6 }], [50, { sx: 0.75, o: 0.7 }], [60, { x: 20, sx: 0.65, o: 0.6 }], [70, { x: 26, sx: 0.85 }], [89, { sx: 1.06, o: 1 }], [100, { o: 1 }]]);
anim('ong', 'ant1', [156, 72], 2.4, [[0, {}], [8, { r: 12 }], [20, { r: -14 }], [34, { r: 10 }], [48, { r: -12 }], [62, { r: 10 }], [76, { r: -10 }], [90, { r: 14 }], [100, {}]]);
anim('ong', 'ant2', [176, 72], 2.4, [[0, {}], [10, { r: 14 }], [22, { r: -10 }], [36, { r: 14 }], [50, { r: -8 }], [64, { r: 14 }], [78, { r: -8 }], [92, { r: 10 }], [100, {}]]);
blink('ong', 48, [167, 96], 2.4);
PLAY.push(
  `.fa-ong .p-w1 { transform-box: view-box; transform-origin: 98px 80px; }`,
  `.fa-ong .p-w2 { transform-box: view-box; transform-origin: 112px 80px; }`,
  `.is-play .fa-ong .p-w1 { animation: fa-ong-buzz1 .08s ease-in-out 30 alternate both; }`,
  `.is-play .fa-ong .p-w2 { animation: fa-ong-buzz2 .08s ease-in-out 30 alternate both; }`,
  `@keyframes fa-ong-buzz1 { from { transform: rotate(0) } to { transform: rotate(-38deg) scale(1,.8) } }`,
  `@keyframes fa-ong-buzz2 { from { transform: rotate(0) } to { transform: rotate(-30deg) scale(1,.75) } }`,
  `@keyframes fa-ong-buzz1-c { from { transform: rotate(0) } to { transform: rotate(-24deg) scale(1,.88) } }`,
  `@keyframes fa-ong-buzz2-c { from { transform: rotate(0) } to { transform: rotate(-20deg) scale(1,.86) } }`);
CALM.push(
  `.is-play .fa-ong .p-w1 { animation: fa-ong-buzz1-c .3s ease-in-out 8 alternate both; }`,
  `.is-play .fa-ong .p-w2 { animation: fa-ong-buzz2-c .3s ease-in-out 8 alternate both; }`);

/* Hổ: thu mình, rướn đầu tới GẦM há to miệng, vạch tiếng gầm, quất đuôi. */
anim('ho', 'torso', [100, 160], 2.4, [[0, {}], [18, { y: 7 }], [30, { x: 3, y: -4 }], [70, { x: 3, y: -3 }], [82, { y: 1 }], [100, {}]]);
anim('ho', 'legs', [100, 162], 2.4, [[0, {}], [18, { sy: 0.865 }], [30, { sy: 1.07 }], [70, { sy: 1.055 }], [82, { sy: 0.98 }], [100, {}]]);
anim('ho', 'head', [148, 104], 2.4, [[0, {}], [18, { y: 2, r: 7 }], [32, { x: 5, y: -2, r: -6, sx: 1.05, sy: 1.05 }], [52, { x: 4, y: -1, r: -4, sx: 1.04, sy: 1.04 }], [70, { x: 5, y: -2, r: -6, sx: 1.05, sy: 1.05 }], [84, { r: 2 }], [100, {}]]);
anim('ho', 'jaw', [168, 104], 2.4, [[0, {}], [30, {}], [36, { y: 13 }], [68, { y: 12 }], [76, {}], [100, {}]], { k: 0.75 });
anim('ho', 'mouth', [168, 101], 2.4, [[0, { sy: 0.2, o: 0 }], [30, { sy: 0.2, o: 0 }], [36, { o: 1 }], [68, { o: 1 }], [76, { sy: 0.2, o: 0 }], [100, { sy: 0.2, o: 0 }]], { k: 1 });
anim('ho', 'roar', [212, 100], 2.4, [[0, { o: 0 }], [34, { x: -6, sx: 0.7, sy: 0.7, o: 0 }], [40, { o: 1 }], [52, { x: 4, o: 0.9 }], [56, { x: -2, sx: 0.8, sy: 0.8, o: 1 }], [70, { x: 5, o: 0.9 }], [80, { x: 8, o: 0 }], [100, { o: 0 }]]);
anim('ho', 'tail', [40, 104], 2.4, [[0, {}], [18, { r: -10 }], [34, { r: 24 }], [44, { r: -18 }], [54, { r: 22 }], [64, { r: -14 }], [76, { r: 10 }], [88, { r: -4 }], [100, {}]]);
anim('ho', 'eye', [167, 76], 2.4, [[0, {}], [30, {}], [35, { sy: 0.35 }], [70, { sy: 0.35 }], [76, {}], [100, {}]], { k: 1 });

/* Bơ: hai nửa nảy tách ra, hạt bật lên xoay vòng rồi rơi lại vào lõm, lấp lánh. */
anim('bo-qua', 'left', [72, 160], 2.2, [[0, {}], [12, { y: 2, sx: 1.04, sy: 0.95 }], [24, { x: -8, y: -8, r: -7 }], [34, { x: -6, r: -3 }], [62, { x: -6, r: -3 }], [68, { x: -6, y: -4, r: -4 }], [76, { x: -6, r: -3 }], [88, { x: 1, r: 1 }], [100, {}]]);
anim('bo-qua', 'right', [166, 160], 2.2, [[0, {}], [12, { y: 2, sx: 1.04, sy: 0.95 }], [24, { x: 8, y: -8, r: 7 }], [34, { x: 6, r: 3 }], [62, { x: 6, r: 3 }], [68, { x: 6, y: 3, sx: 1.03, sy: 0.96, r: 3 }], [76, { x: 6, r: 3 }], [88, { x: -1, r: -1 }], [100, {}]]);
anim('bo-qua', 'seed', [161, 115.5], 2.2, [[0, {}], [20, {}], [26, { y: 3, sx: 1.12, sy: 0.88 }], [42, { y: -72, r: -200 }], [50, { y: -78, r: -280 }], [64, { y: 0, r: -360, sx: 0.92, sy: 1.08 }], [68, { y: 2, r: -360, sx: 1.12, sy: 0.88 }], [73, { y: -7, r: -360 }], [78, { r: -360 }], [100, { r: -360 }]], { kR: 1 });
anim('bo-qua', 'spark1', [206, 30], 2.2, [[0, { sx: 0.2, sy: 0.2, o: 0 }], [38, { sx: 0.2, sy: 0.2, o: 0 }], [46, { r: 45, sx: 1.2, sy: 1.2, o: 1 }], [58, { r: 90, sx: 0.3, sy: 0.3, o: 0 }], [100, { sx: 0.2, sy: 0.2, o: 0 }]], { k: 1 });
anim('bo-qua', 'spark2', [122, 34], 2.2, [[0, { sx: 0.2, sy: 0.2, o: 0 }], [66, { sx: 0.2, sy: 0.2, o: 0 }], [74, { r: -45, sx: 1.2, sy: 1.2, o: 1 }], [86, { r: -90, sx: 0.3, sy: 0.3, o: 0 }], [100, { sx: 0.2, sy: 0.2, o: 0 }]], { k: 1 });

/* Phao: nổi trên nước, nhấp nhô và lắc lư, sóng chạy, bắn vài giọt nước. */
anim('phao', 'ring', [120, 104], 2.4, [[0, {}], [10, { y: 6, sx: 1.02, sy: 0.97 }], [26, { y: -8, r: -5 }], [42, { y: 4, r: 4 }], [58, { y: -5, r: -3 }], [74, { y: 2, r: 2 }], [88, { y: -1, r: -1 }], [100, {}]]);
anim('phao', 'wb', [120, 140], 2.4, [[0, {}], [100, { x: 40 }]], { ease: 'linear', k: 1 });
anim('phao', 'wf', [120, 150], 2.4, [[0, {}], [100, { x: -40 }]], { ease: 'linear', k: 1 });
anim('phao', 'drop1', [34, 128], 2.4, [[0, { o: 0 }], [10, { o: 0 }], [14, { o: 1 }], [32, { x: -10, y: -16, o: 0 }], [100, { o: 0 }]]);
anim('phao', 'drop2', [206, 128], 2.4, [[0, { o: 0 }], [40, { o: 0 }], [44, { o: 1 }], [62, { x: 10, y: -16, o: 0 }], [100, { o: 0 }]]);

/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
export const CSS = `${PLAY.join('\n')}
@media (prefers-reduced-motion: reduce) {
${CALM.join('\n')}
}
`;
