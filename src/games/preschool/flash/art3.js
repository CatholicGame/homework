/** Tranh thẻ chữ cái (preschool/flash): con hà mã, con khỉ, quả khế, con lợn, con mèo. Vẽ riêng, nét INK; mỗi hình có động tác riêng (CSS bên dưới). */
const INK = '#3F3A40';
const S = `stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
const S3 = `stroke="${INK}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const BLUSH = 'fill="#FDA4AF" opacity=".8"';
const SHADOW = 'fill="#000" opacity=".08"';
const eye = (x, y, rx = 4.5, ry = 5.5) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${INK}"/><circle cx="${x + 1.5}" cy="${y - 2}" r="1.6" fill="#fff"/>`;
/** Nét dày hai lớp (viền INK + màu) cho đuôi, tay. */
const limb = (d, c, w = 8) => `<path d="${d}" fill="none" stroke="${INK}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const spark = (x, y, c = '#FACC15') => `<g transform="translate(${x} ${y})"><path class="p-spark" opacity="0" d="M0 -11 C1.5 -3 3 -1.5 11 0 C3 1.5 1.5 3 0 11 C-1.5 3 -3 1.5 -11 0 C-3 -1.5 -1.5 -3 0 -11 Z" fill="${c}" ${S3}/></g>`;

export const ART = {
  'ha-ma': `<svg class="fa fa-ha-ma" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="114" cy="168" rx="98" ry="7" ${SHADOW}/>
<g class="p-body">
<rect x="70" y="122" width="26" height="42" rx="10" fill="#8B85BC" ${S}/>
<rect x="146" y="122" width="26" height="42" rx="10" fill="#8B85BC" ${S}/>
<path d="M22 102 C12 104 8 112 10 120 M10 120 L6 127 M10 120 L13 128" fill="none" ${S}/>
<ellipse cx="98" cy="106" rx="80" ry="48" fill="#A8A2D0" ${S}/>
<path d="M36 122 C56 148 128 154 164 132" fill="none" stroke="#C4BFE3" stroke-width="10" stroke-linecap="round"/>
<path d="M48 76 C66 64 96 61 116 64" fill="none" stroke="#C4BFE3" stroke-width="7" stroke-linecap="round"/>
<circle cx="70" cy="92" r="5" fill="#948DC4"/><circle cx="84" cy="82" r="3.5" fill="#948DC4"/><circle cx="58" cy="104" r="3" fill="#948DC4"/>
<rect x="40" y="126" width="28" height="40" rx="10" fill="#A8A2D0" ${S}/>
<rect x="116" y="126" width="28" height="40" rx="10" fill="#A8A2D0" ${S}/>
<path d="M46 160 Q54 155 62 160 M122 160 Q130 155 138 160" fill="none" ${S3}/>
<g class="p-head">
<g class="p-mouth" opacity="0"><path d="M166 106 C180 88 204 76 222 78 C232 98 228 126 210 140 C192 138 176 126 166 106 Z" fill="#9F1239" ${S3}/>
<ellipse cx="200" cy="122" rx="15" ry="8" transform="rotate(30 200 122)" fill="#FB7185"/></g>
<g class="p-jaw"><path d="M184 108 L186 92 L194 106 Z M208 106 L213 90 L219 106 Z" fill="#fff" ${S3}/>
<ellipse cx="196" cy="118" rx="33" ry="17" fill="#A8A2D0" ${S}/>
<path d="M176 124 Q196 132 216 124" fill="none" stroke="#C4BFE3" stroke-width="5" stroke-linecap="round"/></g>
<g class="p-top">
<g class="p-ear-a"><ellipse cx="136" cy="50" rx="9" ry="12" fill="#A8A2D0" ${S}/><ellipse cx="136" cy="51" rx="4" ry="6" fill="#F9A8D4"/></g>
<g class="p-ear-b"><ellipse cx="154" cy="43" rx="9" ry="12" fill="#A8A2D0" ${S}/><ellipse cx="154" cy="44" rx="4" ry="6" fill="#F9A8D4"/></g>
<ellipse cx="160" cy="78" rx="38" ry="32" fill="#A8A2D0" ${S}/>
<ellipse cx="198" cy="94" rx="36" ry="24" fill="#B8B3DC" ${S}/>
<path d="M178 78 C190 72 206 72 214 74" fill="none" stroke="#D2CEEC" stroke-width="5" stroke-linecap="round"/>
<ellipse cx="211" cy="84" rx="3.5" ry="5" fill="${INK}"/><ellipse cx="226" cy="88" rx="3" ry="4.5" fill="${INK}"/>
<path d="M168 102 Q172 109 179 110" fill="none" ${S3}/>
<g class="p-eye">${eye(166, 61)}${eye(186, 61)}</g>
<ellipse cx="150" cy="94" rx="7" ry="4.5" ${BLUSH}/>
</g>
</g>
</g>
</svg>`,

  'khi': `<svg class="fa fa-khi" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse class="p-shadow" cx="120" cy="171" rx="62" ry="6" ${SHADOW}/>
<g class="p-monkey">
<g class="p-tail">
<g class="p-tail-c">${limb('M150 150 C190 162 216 134 206 106 C198 88 172 92 178 110 C182 120 194 116 194 108', '#A16207')}</g>
<g class="p-tail-u" opacity="0">${limb('M150 150 C188 156 210 138 214 110 C218 90 214 78 204 70 C198 66 192 70 194 76', '#A16207')}</g>
</g>
<ellipse cx="120" cy="128" rx="40" ry="36" fill="#A16207" ${S}/>
<ellipse cx="120" cy="136" rx="25" ry="25" fill="#FDDCB5" ${S3}/>
<ellipse cx="90" cy="152" rx="18" ry="13" fill="#A16207" ${S}/>
<ellipse cx="150" cy="152" rx="18" ry="13" fill="#A16207" ${S}/>
<ellipse cx="86" cy="163" rx="15" ry="7" fill="#FDDCB5" ${S}/>
<ellipse cx="154" cy="163" rx="15" ry="7" fill="#FDDCB5" ${S}/>
<g class="p-head">
<circle cx="76" cy="60" r="17" fill="#A16207" ${S}/><circle cx="76" cy="60" r="9" fill="#FDDCB5"/>
<circle cx="164" cy="60" r="17" fill="#A16207" ${S}/><circle cx="164" cy="60" r="9" fill="#FDDCB5"/>
<circle cx="120" cy="58" r="42" fill="#A16207" ${S}/>
<path d="M110 18 Q114 8 122 14 Q126 6 132 16" fill="none" ${S3}/>
<path d="M120 52 C108 34 84 40 86 62 C86 78 96 94 120 94 C144 94 154 78 154 62 C156 40 132 34 120 52 Z" fill="#FDDCB5" ${S3}/>
<g class="p-eye">${eye(106, 60)}${eye(134, 60)}</g>
<circle cx="116" cy="74" r="2" fill="${INK}"/><circle cx="124" cy="74" r="2" fill="${INK}"/>
<path class="p-smile" d="M108 81 Q120 89 132 81" fill="none" ${S3}/>
<ellipse class="p-chomp" cx="120" cy="84" rx="8" ry="6" fill="#9F1239" ${S3} opacity="0"/>
<ellipse cx="95" cy="78" rx="6" ry="4" ${BLUSH}/><ellipse cx="145" cy="78" rx="6" ry="4" ${BLUSH}/>
</g>
<g class="p-arm-l">${limb('M92 106 Q70 128 82 146', '#A16207')}<circle cx="82" cy="146" r="8" fill="#FDDCB5" ${S3}/></g>
<g class="p-arm-up" opacity="0">${limb('M94 106 Q56 98 64 62 Q68 44 84 36', '#A16207')}<circle cx="86" cy="34" r="8" fill="#FDDCB5" ${S3}/></g>
<g class="p-arm-r">${limb('M148 106 Q168 124 150 138', '#A16207')}
<path d="M152 132 C140 140 124 140 112 130 L106 140 C120 152 142 150 156 140 Z" fill="#FDE047" ${S}/>
<ellipse cx="109" cy="135" rx="3.5" ry="6" transform="rotate(30 109 135)" fill="#FEF3C7" ${S3}/>
<path class="p-bite" d="M114 128 C104 124 98 116 96 106 C94 122 98 136 104 144" fill="#FDE047" ${S}/>
<path d="M154 136 L162 132" stroke="#78350F" stroke-width="6" stroke-linecap="round"/>
<circle cx="150" cy="138" r="8" fill="#FDDCB5" ${S3}/></g>
</g>
</svg>`,

  'khe': `<svg class="fa fa-khe" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="122" cy="160" rx="106" ry="7" ${SHADOW}/>
<g class="p-fruit">
<g class="p-leaf"><path d="M12 88 C4 64 18 40 46 30 C50 56 36 78 12 88 Z" fill="#22C55E" ${S}/>
<path d="M14 82 C22 66 32 52 42 36" fill="none" ${S3}/></g>
<path d="M16 96 C22 66 52 50 88 52 C126 50 158 64 168 94 C158 126 126 142 88 140 C52 142 22 126 16 96 Z" fill="#D4E157"/>
<path d="M18 92 C24 66 52 52 88 52 C126 50 158 64 166 90 C124 72 60 70 18 92 Z" fill="#ECF27C"/>
<path d="M18 100 C60 122 124 122 166 98 C158 126 126 142 88 140 C52 142 22 126 18 100 Z" fill="#AFC93E"/>
<path d="M40 70 C60 60 90 58 110 60" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity=".7"/>
<path d="M18 92 C60 70 124 72 166 90 M18 100 C60 122 124 122 166 98" fill="none" ${S3}/>
<path d="M16 96 C22 66 52 50 88 52 C126 50 158 64 168 94 C158 126 126 142 88 140 C52 142 22 126 16 96 Z" fill="none" ${S}/>
<path d="M16 96 L8 88" stroke="#92400E" stroke-width="6" stroke-linecap="round"/>
<path d="M164 90 L170 94 L164 98" fill="none" ${S3}/>
</g>
<g class="p-slice">
<polygon points="184,64 199.3,89 227.7,95.8 208.7,118 211,147.2 184,136 157,147.2 159.3,118 140.3,95.8 168.7,89" fill="#D4E157" ${S}/>
<polygon points="184,77 195.2,94.6 215.3,99.5 202.1,115.9 203.4,136.5 184,129 164.6,136.5 165.9,115.9 152.7,99.5 172.8,94.6" fill="#FEF9C3"/>
<path d="M184 110 L184 80 M184 110 L212 101 M184 110 L201 134 M184 110 L167 134 M184 110 L156 101" stroke="#E6EE6F" stroke-width="2.5" stroke-linecap="round"/>
<ellipse cx="184" cy="98" rx="2.5" ry="4" fill="#92400E"/>
<ellipse cx="195.4" cy="106.3" rx="2.5" ry="4" transform="rotate(72 195.4 106.3)" fill="#92400E"/>
<ellipse cx="191" cy="119.7" rx="2.5" ry="4" transform="rotate(144 191 119.7)" fill="#92400E"/>
<ellipse cx="177" cy="119.7" rx="2.5" ry="4" transform="rotate(216 177 119.7)" fill="#92400E"/>
<ellipse cx="172.6" cy="106.3" rx="2.5" ry="4" transform="rotate(288 172.6 106.3)" fill="#92400E"/>
</g>
${spark(146, 52)}${spark(224, 50, '#FDE047')}${spark(230, 154, '#FACC15')}${spark(140, 160, '#FDE047')}
</svg>`,

  'lon': `<svg class="fa fa-lon" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse class="p-shadow" cx="118" cy="169" rx="92" ry="7" ${SHADOW}/>
<g class="p-pig">
<rect x="76" y="122" width="22" height="42" rx="8" fill="#EC8FC0" ${S}/>
<rect x="148" y="122" width="22" height="42" rx="8" fill="#EC8FC0" ${S}/>
<g class="p-tail"><path d="M36 100 C28 100 22 96 21 91" fill="none" ${S}/>
<g class="p-curl"><path d="M21 91 C20 79 4 80 6 92 C8 103 23 101 21 90 C20 85 13 85 13 91" fill="none" ${S}/></g></g>
<ellipse cx="106" cy="106" rx="74" ry="48" fill="#F9A8D4" ${S}/>
<path d="M50 126 C70 148 130 152 160 136" fill="none" stroke="#FBCFE8" stroke-width="10" stroke-linecap="round"/>
<path d="M60 74 C76 64 100 62 116 64" fill="none" stroke="#FBCFE8" stroke-width="7" stroke-linecap="round"/>
<rect x="52" y="126" width="24" height="40" rx="8" fill="#F9A8D4" ${S}/>
<rect x="122" y="126" width="24" height="40" rx="8" fill="#F9A8D4" ${S}/>
<path d="M54 156 L74 156 M124 156 L144 156 M78 154 L96 154 M150 154 L168 154" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
<path d="M64 156 L64 165 M134 156 L134 165" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
<g class="p-head">
<g class="p-ear-b"><path d="M144 70 C138 50 146 36 158 32 C166 44 166 58 160 66 Z" fill="#EC8FC0" ${S}/></g>
<circle cx="174" cy="88" r="40" fill="#F9A8D4" ${S}/>
<path d="M150 70 C158 58 172 54 184 56" fill="none" stroke="#FBCFE8" stroke-width="6" stroke-linecap="round"/>
<g class="p-eye">${eye(170, 80)}${eye(194, 78)}</g>
<ellipse cx="166" cy="102" rx="7" ry="4.5" ${BLUSH}/>
<path d="M186 116 Q194 122 204 116" fill="none" ${S3}/>
<g class="p-snout"><ellipse cx="214" cy="96" rx="15" ry="19" fill="#F472B6" ${S}/>
<ellipse cx="216" cy="90" rx="7" ry="5" fill="#F9A8D4" opacity=".7"/>
<ellipse cx="209" cy="98" rx="2.8" ry="5" fill="${INK}"/><ellipse cx="219" cy="98" rx="2.8" ry="5" fill="${INK}"/></g>
<g class="p-ear-f"><path d="M164 60 C160 40 170 28 184 24 C192 36 192 50 186 60 Z" fill="#EC8FC0" ${S}/>
<path d="M172 54 C172 44 176 38 182 34 C186 42 186 50 182 56 Z" fill="#F9A8D4"/></g>
</g>
</g>
</svg>`,

  'meo': `<svg class="fa fa-meo" viewBox="0 0 240 180" xmlns="http://www.w3.org/2000/svg">
<ellipse cx="122" cy="170" rx="66" ry="6" ${SHADOW}/>
<g class="p-tail">${limb('M150 160 C190 166 210 140 202 110 C198 96 204 84 214 80', '#FB923C', 12)}
<path d="M196 150 L204 144 M206 126 L214 124 M203 100 L210 104" stroke="#EA580C" stroke-width="4" stroke-linecap="round"/></g>
<g class="p-body">
<path d="M78 166 C64 138 80 94 120 88 C158 94 174 138 160 166 Z" fill="#FB923C" ${S}/>
<path d="M84 128 Q92 124 98 132 M80 146 Q88 142 96 150 M156 126 Q148 124 144 132 M160 146 Q152 142 146 150" fill="none" stroke="#EA580C" stroke-width="4" stroke-linecap="round"/>
<path d="M106 98 C96 120 108 142 120 140 C134 140 142 120 132 98 Z" fill="#fff" ${S3}/>
<g class="p-leg-r"><rect x="124" y="122" width="18" height="44" rx="8" fill="#FB923C" ${S}/>
<ellipse cx="134" cy="163" rx="12" ry="6" fill="#fff" ${S3}/></g>
<g class="p-leg-l"><rect x="98" y="122" width="18" height="44" rx="8" fill="#FB923C" ${S}/>
<ellipse cx="106" cy="163" rx="12" ry="6" fill="#fff" ${S3}/></g>
<g class="p-head">
<g class="p-ear-l"><path d="M86 42 L88 8 L116 28 Z" fill="#FB923C" ${S}/><path d="M92 32 L93 18 L106 27 Z" fill="#F9A8D4"/></g>
<g class="p-ear-r"><path d="M144 28 L172 8 L174 42 Z" fill="#FB923C" ${S}/><path d="M154 27 L167 18 L168 32 Z" fill="#F9A8D4"/></g>
<ellipse cx="130" cy="58" rx="50" ry="40" fill="#FB923C" ${S}/>
<path d="M120 22 L122 34 M130 20 L130 34 M140 22 L138 34" stroke="#EA580C" stroke-width="4" stroke-linecap="round"/>
<path d="M118 76 L86 70 M118 82 L84 86 M142 76 L174 70 M142 82 L176 86" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
<g class="p-tongue" opacity="0"><path d="M126 82 C126 94 112 98 110 90 C116 88 122 84 126 82 Z" fill="#FB7185" ${S3}/></g>
<ellipse cx="122" cy="78" rx="10" ry="8" fill="#fff" ${S3}/>
<ellipse cx="138" cy="78" rx="10" ry="8" fill="#fff" ${S3}/>
<path d="M124 68 L136 68 L130 75 Z" fill="#F472B6" ${S3}/>
<g class="p-eye">${eye(112, 54, 5, 7)}${eye(148, 54, 5, 7)}</g>
<ellipse cx="98" cy="70" rx="6" ry="4" ${BLUSH}/><ellipse cx="162" cy="70" rx="6" ry="4" ${BLUSH}/>
</g>
<g class="p-leg-up" opacity="0">${limb('M104 130 Q86 112 98 94', '#FB923C', 12)}
<ellipse cx="102" cy="90" rx="11" ry="9" fill="#fff" ${S3}/>
<ellipse cx="104" cy="88" rx="4" ry="3" fill="#F9A8D4"/></g>
</g>
</svg>`,
};

/** Động tác: chạy một lần khi một khối cha có class `is-play` (thêm lại class để chạy lại). */
export const CSS = `
.fa-ha-ma .p-body { transform-box: view-box; transform-origin: 100px 160px; }
.fa-ha-ma .p-head { transform-box: view-box; transform-origin: 150px 100px; }
.fa-ha-ma .p-top { transform-box: view-box; transform-origin: 170px 104px; }
.fa-ha-ma .p-jaw { transform-box: view-box; transform-origin: 166px 112px; }
.fa-ha-ma .p-mouth { opacity: 0; }
.fa-ha-ma .p-eye { transform-box: view-box; transform-origin: 176px 61px; }
.fa-ha-ma .p-ear-a { transform-box: view-box; transform-origin: 138px 60px; }
.fa-ha-ma .p-ear-b { transform-box: view-box; transform-origin: 156px 54px; }
.is-play .fa-ha-ma .p-body { animation: fa-ha-ma-body 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-head { animation: fa-ha-ma-head 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-top { animation: fa-ha-ma-top 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-jaw { animation: fa-ha-ma-jaw 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-mouth { animation: fa-ha-ma-mouth 2.4s linear both; }
.is-play .fa-ha-ma .p-eye { animation: fa-ha-ma-eye 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-ear-a { animation: fa-ha-ma-ear 2.4s ease-in-out both; }
.is-play .fa-ha-ma .p-ear-b { animation: fa-ha-ma-ear 2.4s ease-in-out .08s both; }
@keyframes fa-ha-ma-body { 0%,12% { transform: scale(1) } 34%,60% { transform: scale(1.04,1.04) } 78% { transform: scale(.99,.99) } 100% { transform: scale(1) } }
@keyframes fa-ha-ma-head { 0% { transform: rotate(0) } 12% { transform: rotate(4deg) } 32%,60% { transform: rotate(-8deg) } 76% { transform: rotate(3deg) } 88% { transform: rotate(-1deg) } 100% { transform: rotate(0) } }
@keyframes fa-ha-ma-top { 0%,12% { transform: rotate(0) } 32% { transform: rotate(-22deg) } 46% { transform: rotate(-25deg) } 60% { transform: rotate(-22deg) } 72% { transform: rotate(2deg) } 80%,100% { transform: rotate(0) } }
@keyframes fa-ha-ma-jaw { 0%,12% { transform: rotate(0) } 32% { transform: rotate(28deg) } 46% { transform: rotate(32deg) } 60% { transform: rotate(28deg) } 72% { transform: rotate(-2deg) } 80%,100% { transform: rotate(0) } }
@keyframes fa-ha-ma-mouth { 0%,14% { opacity: 0 } 19%,66% { opacity: 1 } 71%,100% { opacity: 0 } }
@keyframes fa-ha-ma-eye { 0%,16% { transform: scaleY(1) } 26%,62% { transform: scaleY(.12) } 72%,90% { transform: scaleY(1) } 94% { transform: scaleY(.12) } 98%,100% { transform: scaleY(1) } }
@keyframes fa-ha-ma-ear { 0%,72% { transform: rotate(0) } 77% { transform: rotate(-20deg) } 82% { transform: rotate(16deg) } 87% { transform: rotate(-12deg) } 92% { transform: rotate(6deg) } 100% { transform: rotate(0) } }

.fa-khi .p-monkey { transform-box: view-box; transform-origin: 120px 170px; }
.fa-khi .p-shadow { transform-box: view-box; transform-origin: 120px 171px; }
.fa-khi .p-head { transform-box: view-box; transform-origin: 120px 98px; }
.fa-khi .p-eye { transform-box: view-box; transform-origin: 120px 60px; }
.fa-khi .p-tail { transform-box: view-box; transform-origin: 150px 150px; }
.fa-khi .p-arm-l, .fa-khi .p-arm-up { transform-box: view-box; transform-origin: 93px 106px; }
.fa-khi .p-arm-r { transform-box: view-box; transform-origin: 148px 106px; }
.is-play .fa-khi .p-monkey { animation: fa-khi-hop 2.6s ease-in-out both; }
.is-play .fa-khi .p-shadow { animation: fa-khi-shadow 2.6s ease-in-out both; }
.is-play .fa-khi .p-head { animation: fa-khi-head 2.6s ease-in-out both; }
.is-play .fa-khi .p-eye { animation: fa-khi-eye 2.6s ease-in-out both; }
.is-play .fa-khi .p-tail { animation: fa-khi-tail 2.6s ease-in-out both; }
.is-play .fa-khi .p-tail-c { animation: fa-khi-tc 2.6s linear both; }
.is-play .fa-khi .p-tail-u { animation: fa-khi-tu 2.6s linear both; }
.is-play .fa-khi .p-arm-l { animation: fa-khi-arml 2.6s ease-in-out both; }
.is-play .fa-khi .p-arm-up { animation: fa-khi-armup 2.6s ease-in-out both; }
.is-play .fa-khi .p-arm-r { animation: fa-khi-armr 2.6s ease-in-out both; }
.is-play .fa-khi .p-bite { animation: fa-khi-bite 2.6s linear both; }
.is-play .fa-khi .p-chomp { animation: fa-khi-chomp 2.6s linear both; }
.is-play .fa-khi .p-smile { animation: fa-khi-smile 2.6s linear both; }
@keyframes fa-khi-hop { 0% { transform: none } 5% { transform: scale(1.05,.93) } 12% { transform: translateY(-9px) scale(.98,1.02) } 18% { transform: scale(1.05,.94) } 25% { transform: translateY(-7px) scale(.99,1.02) } 31% { transform: scale(1.03,.97) } 36%,100% { transform: none } }
@keyframes fa-khi-shadow { 0%,5%,18%,31%,100% { transform: scale(1) } 12%,25% { transform: scale(.82) } }
@keyframes fa-khi-head { 0%,30% { transform: rotate(0) } 38% { transform: rotate(-7deg) } 52% { transform: rotate(-5deg) } 58% { transform: rotate(0) } 68% { transform: rotate(4deg) } 74% { transform: rotate(6deg) } 78% { transform: rotate(2deg) } 82% { transform: rotate(5deg) } 86% { transform: rotate(2deg) } 90% { transform: rotate(4deg) } 96%,100% { transform: rotate(0) } }
@keyframes fa-khi-eye { 0%,38% { transform: scaleY(1) } 41%,50% { transform: scaleY(.15) } 53%,74% { transform: scaleY(1) } 77%,86% { transform: scaleY(.15) } 89%,100% { transform: scaleY(1) } }
@keyframes fa-khi-tail { 0% { transform: rotate(0) } 14% { transform: rotate(-10deg) } 28% { transform: rotate(8deg) } 42% { transform: rotate(-6deg) } 54%,100% { transform: rotate(0) } }
@keyframes fa-khi-tc { 0%,8% { opacity: 1 } 11%,34% { opacity: 0 } 37%,100% { opacity: 1 } }
@keyframes fa-khi-tu { 0%,8% { opacity: 0 } 11%,34% { opacity: 1 } 37%,100% { opacity: 0 } }
@keyframes fa-khi-arml { 0%,30% { transform: rotate(0); opacity: 1 } 35% { transform: rotate(70deg); opacity: 1 } 36%,54% { transform: rotate(70deg); opacity: 0 } 55% { transform: rotate(70deg); opacity: 1 } 60%,100% { transform: rotate(0); opacity: 1 } }
@keyframes fa-khi-armup { 0%,30% { transform: rotate(-70deg); opacity: 0 } 35% { transform: rotate(-70deg); opacity: 0 } 36% { transform: rotate(-60deg); opacity: 1 } 39% { transform: rotate(4deg) } 42% { transform: rotate(-6deg) } 45% { transform: rotate(4deg) } 48% { transform: rotate(-6deg) } 51% { transform: rotate(2deg); opacity: 1 } 54% { transform: rotate(-60deg); opacity: 1 } 55%,100% { transform: rotate(-70deg); opacity: 0 } }
@keyframes fa-khi-armr { 0%,58% { transform: rotate(0) } 62% { transform: rotate(-6deg) } 72%,76% { transform: rotate(34deg) } 80% { transform: rotate(30deg) } 92% { transform: rotate(-3deg) } 100% { transform: rotate(0) } }
@keyframes fa-khi-bite { 0%,74% { opacity: 1 } 75%,94% { opacity: 0 } 100% { opacity: 1 } }
@keyframes fa-khi-chomp { 0%,66% { opacity: 0 } 68%,74% { opacity: 1 } 75%,100% { opacity: 0 } }
@keyframes fa-khi-smile { 0%,66% { opacity: 1 } 68%,74% { opacity: 0 } 75%,100% { opacity: 1 } }

.fa-khe .p-fruit { transform-box: view-box; transform-origin: 90px 140px; }
.fa-khe .p-leaf { transform-box: view-box; transform-origin: 12px 88px; }
.fa-khe .p-slice { transform-box: view-box; transform-origin: 184px 110px; }
.fa-khe .p-spark { transform-box: fill-box; transform-origin: center; opacity: 0; }
.is-play .fa-khe .p-fruit { animation: fa-khe-fruit 2.4s ease-in-out both; }
.is-play .fa-khe .p-leaf { animation: fa-khe-leaf 2.4s ease-in-out both; }
.is-play .fa-khe .p-slice { animation: fa-khe-slice 2.4s ease-in-out both; }
.is-play .fa-khe .p-spark { animation: fa-khe-spark 2.4s ease-out both; }
.is-play .fa-khe g:nth-of-type(4) .p-spark { animation-delay: .1s; }
.is-play .fa-khe g:nth-of-type(5) .p-spark { animation-delay: .2s; }
.is-play .fa-khe g:nth-of-type(6) .p-spark { animation-delay: .05s; }
@keyframes fa-khe-fruit { 0% { transform: rotate(0) } 6% { transform: rotate(-5deg) } 14% { transform: rotate(4deg) } 22% { transform: rotate(-3deg) } 30% { transform: rotate(2deg) } 36%,82% { transform: rotate(0) } 86% { transform: rotate(-2deg) } 92% { transform: rotate(1deg) } 100% { transform: rotate(0) } }
@keyframes fa-khe-leaf { 0% { transform: rotate(0) } 8% { transform: rotate(-14deg) } 18% { transform: rotate(10deg) } 28% { transform: rotate(-8deg) } 38% { transform: rotate(5deg) } 48%,80% { transform: rotate(0) } 86% { transform: rotate(-8deg) } 94% { transform: rotate(4deg) } 100% { transform: rotate(0) } }
@keyframes fa-khe-slice { 0%,30% { transform: rotate(0) scale(1) } 38% { transform: rotate(-24deg) scale(.92) } 64% { transform: rotate(360deg) scale(1.1) } 70% { transform: rotate(360deg) scale(.95) } 76% { transform: rotate(360deg) scale(1.04) } 82%,100% { transform: rotate(360deg) scale(1) } }
@keyframes fa-khe-spark { 0%,60% { opacity: 0; transform: scale(.2) rotate(0) } 68% { opacity: 1; transform: scale(1.25) rotate(30deg) } 80% { opacity: 1; transform: scale(.9) rotate(60deg) } 90%,100% { opacity: 0; transform: scale(.3) rotate(90deg) } }

.fa-lon .p-pig { transform-box: view-box; transform-origin: 112px 166px; }
.fa-lon .p-shadow { transform-box: view-box; transform-origin: 118px 169px; }
.fa-lon .p-head { transform-box: view-box; transform-origin: 150px 104px; }
.fa-lon .p-snout { transform-box: view-box; transform-origin: 202px 98px; }
.fa-lon .p-ear-f { transform-box: view-box; transform-origin: 176px 60px; }
.fa-lon .p-ear-b { transform-box: view-box; transform-origin: 152px 66px; }
.fa-lon .p-tail { transform-box: view-box; transform-origin: 36px 100px; }
.fa-lon .p-curl { transform-box: view-box; transform-origin: 13px 91px; }
.fa-lon .p-eye { transform-box: view-box; transform-origin: 182px 79px; }
.is-play .fa-lon .p-pig { animation: fa-lon-hop 2.4s ease-in-out both; }
.is-play .fa-lon .p-shadow { animation: fa-lon-shadow 2.4s ease-in-out both; }
.is-play .fa-lon .p-head { animation: fa-lon-head 2.4s ease-in-out both; }
.is-play .fa-lon .p-snout { animation: fa-lon-snout 2.4s ease-in-out both; }
.is-play .fa-lon .p-ear-f { animation: fa-lon-ear 2.4s ease-in-out both; }
.is-play .fa-lon .p-ear-b { animation: fa-lon-ear 2.4s ease-in-out .06s both; }
.is-play .fa-lon .p-tail { animation: fa-lon-tail 2.4s ease-in-out both; }
.is-play .fa-lon .p-curl { animation: fa-lon-curl 2.4s ease-in-out both; }
.is-play .fa-lon .p-eye { animation: fa-lon-eye 2.4s ease-in-out both; }
@keyframes fa-lon-snout { 0%,4% { transform: none } 9% { transform: rotate(-9deg) scale(1.08) } 14% { transform: rotate(5deg) scale(.96) } 19% { transform: rotate(-9deg) scale(1.08) } 24% { transform: rotate(5deg) scale(.96) } 31% { transform: rotate(-7deg) scale(1.06) } 36% { transform: rotate(4deg) } 41%,100% { transform: none } }
@keyframes fa-lon-head { 0%,4% { transform: rotate(0) } 12%,34% { transform: rotate(-5deg) } 42% { transform: rotate(2deg) } 50%,100% { transform: rotate(0) } }
@keyframes fa-lon-ear { 0%,36% { transform: rotate(0) } 42% { transform: rotate(26deg) } 47% { transform: rotate(-8deg) } 52% { transform: rotate(16deg) } 57% { transform: rotate(-4deg) } 62%,76% { transform: rotate(0) } 82% { transform: rotate(-10deg) } 88% { transform: rotate(18deg) } 94% { transform: rotate(-4deg) } 100% { transform: rotate(0) } }
@keyframes fa-lon-tail { 0%,40% { transform: rotate(0) } 48% { transform: rotate(-20deg) } 58% { transform: rotate(14deg) } 66% { transform: rotate(-8deg) } 72%,100% { transform: rotate(0) } }
@keyframes fa-lon-curl { 0%,40% { transform: rotate(0) } 70%,100% { transform: rotate(-720deg) } }
@keyframes fa-lon-hop { 0%,70% { transform: none } 75% { transform: scale(1.06,.92) } 83% { transform: translateY(-13px) scale(.98,1.02) } 90% { transform: scale(1.06,.93) } 95% { transform: scale(.99,1.01) } 100% { transform: none } }
@keyframes fa-lon-shadow { 0%,75%,90%,100% { transform: scale(1) } 83% { transform: scale(.8) } }
@keyframes fa-lon-eye { 0%,72% { transform: scaleY(1) } 75%,92% { transform: scaleY(.2) } 96%,100% { transform: scaleY(1) } }

.fa-meo .p-tail { transform-box: view-box; transform-origin: 150px 160px; }
.fa-meo .p-head { transform-box: view-box; transform-origin: 122px 96px; }
.fa-meo .p-eye { transform-box: view-box; transform-origin: 130px 54px; }
.fa-meo .p-ear-l { transform-box: view-box; transform-origin: 100px 38px; }
.fa-meo .p-ear-r { transform-box: view-box; transform-origin: 160px 36px; }
.fa-meo .p-leg-l, .fa-meo .p-leg-up { transform-box: view-box; transform-origin: 106px 126px; }
.fa-meo .p-tongue { transform-box: view-box; transform-origin: 126px 82px; }
.is-play .fa-meo .p-tail { animation: fa-meo-tail 2.6s ease-in-out both; }
.is-play .fa-meo .p-head { animation: fa-meo-head 2.6s ease-in-out both; }
.is-play .fa-meo .p-eye { animation: fa-meo-eye 2.6s ease-in-out both; }
.is-play .fa-meo .p-ear-l { animation: fa-meo-earl 2.6s ease-in-out both; }
.is-play .fa-meo .p-ear-r { animation: fa-meo-earr 2.6s ease-in-out both; }
.is-play .fa-meo .p-leg-l { animation: fa-meo-legl 2.6s ease-in-out both; }
.is-play .fa-meo .p-leg-up { animation: fa-meo-legup 2.6s ease-in-out both; }
.is-play .fa-meo .p-tongue { animation: fa-meo-tongue 2.6s ease-in-out both; }
@keyframes fa-meo-tail { 0% { transform: rotate(0) } 10% { transform: rotate(-16deg) } 22% { transform: rotate(14deg) } 34% { transform: rotate(-14deg) } 46% { transform: rotate(12deg) } 58% { transform: rotate(-10deg) } 70% { transform: rotate(8deg) } 82% { transform: rotate(-6deg) } 92% { transform: rotate(3deg) } 100% { transform: rotate(0) } }
@keyframes fa-meo-eye { 0%,4% { transform: scaleY(1) } 12%,18% { transform: scaleY(.1) } 26%,30% { transform: scaleY(1) } 38%,76% { transform: scaleY(.25) } 84%,100% { transform: scaleY(1) } }
@keyframes fa-meo-earl { 0%,80% { transform: rotate(0) } 83% { transform: rotate(-14deg) } 86% { transform: rotate(4deg) } 89% { transform: rotate(-10deg) } 92%,100% { transform: rotate(0) } }
@keyframes fa-meo-earr { 0%,6% { transform: rotate(0) } 9% { transform: rotate(14deg) } 12% { transform: rotate(-4deg) } 15% { transform: rotate(10deg) } 18%,86% { transform: rotate(0) } 89% { transform: rotate(12deg) } 92%,100% { transform: rotate(0) } }
@keyframes fa-meo-head { 0%,30% { transform: rotate(0) } 40% { transform: rotate(-7deg) } 48% { transform: rotate(-4deg) } 54% { transform: rotate(-8deg) } 60% { transform: rotate(-4deg) } 66% { transform: rotate(-8deg) } 74% { transform: rotate(-5deg) } 84%,100% { transform: rotate(0) } }
@keyframes fa-meo-legl { 0%,32% { transform: rotate(0); opacity: 1 } 36% { transform: rotate(30deg); opacity: 1 } 37%,78% { transform: rotate(30deg); opacity: 0 } 79% { transform: rotate(30deg); opacity: 1 } 84%,100% { transform: rotate(0); opacity: 1 } }
@keyframes fa-meo-legup { 0%,36% { transform: rotate(-30deg); opacity: 0 } 37% { transform: rotate(-30deg); opacity: 1 } 41% { transform: rotate(3deg) } 44% { transform: rotate(0) } 50% { transform: rotate(-6deg) } 56% { transform: rotate(0) } 62% { transform: rotate(-6deg) } 68% { transform: rotate(0) } 78% { transform: rotate(-30deg); opacity: 1 } 79%,100% { transform: rotate(-30deg); opacity: 0 } }
@keyframes fa-meo-tongue { 0%,42% { opacity: 0; transform: scale(.3) } 46% { opacity: 1; transform: scale(1) } 50% { transform: scale(.6) } 54% { transform: scale(1) } 58% { transform: scale(.6) } 62% { transform: scale(1) } 66% { transform: scale(.6) } 70% { opacity: 1; transform: scale(1) } 74%,100% { opacity: 0; transform: scale(.3) } }

@media (prefers-reduced-motion: reduce) {
  .is-play .fa-ha-ma .p-head { animation-name: fa-ha-ma-head-c; }
  .is-play .fa-ha-ma .p-top { animation-name: fa-ha-ma-top-c; }
  .is-play .fa-ha-ma .p-jaw { animation-name: fa-ha-ma-jaw-c; }
  .is-play .fa-ha-ma .p-body { animation-name: fa-ha-ma-body-c; }
  .is-play .fa-ha-ma .p-ear-a, .is-play .fa-ha-ma .p-ear-b { animation-name: fa-ha-ma-ear-c; }
  .is-play .fa-khi .p-monkey { animation-name: fa-khi-hop-c; }
  .is-play .fa-khi .p-head { animation-name: fa-khi-head-c; }
  .is-play .fa-khi .p-tail { animation-name: fa-khi-tail-c; }
  .is-play .fa-khi .p-arm-up { animation-name: fa-khi-armup-c; }
  .is-play .fa-khe .p-fruit { animation-name: fa-khe-fruit-c; }
  .is-play .fa-khe .p-leaf { animation-name: fa-khe-leaf-c; }
  .is-play .fa-khe .p-slice { animation-name: fa-khe-slice-c; }
  .is-play .fa-lon .p-pig { animation-name: fa-lon-hop-c; }
  .is-play .fa-lon .p-snout { animation-name: fa-lon-snout-c; }
  .is-play .fa-lon .p-ear-f, .is-play .fa-lon .p-ear-b { animation-name: fa-lon-ear-c; }
  .is-play .fa-lon .p-tail { animation-name: fa-lon-tail-c; }
  .is-play .fa-lon .p-curl { animation-name: fa-lon-curl-c; }
  .is-play .fa-meo .p-tail { animation-name: fa-meo-tail-c; }
  .is-play .fa-meo .p-head { animation-name: fa-meo-head-c; }
  .is-play .fa-meo .p-ear-l, .is-play .fa-meo .p-ear-r { animation-name: fa-meo-ear-c; }
  .is-play .fa-meo .p-leg-up { animation-name: fa-meo-legup-c; }
  .is-play .fa-meo .p-tongue { animation-name: fa-meo-tongue-c; }
}
@keyframes fa-ha-ma-head-c { 0%,12% { transform: rotate(0) } 32%,60% { transform: rotate(-5deg) } 78% { transform: rotate(1deg) } 100% { transform: rotate(0) } }
@keyframes fa-ha-ma-top-c { 0%,12% { transform: rotate(0) } 32%,60% { transform: rotate(-13deg) } 74%,100% { transform: rotate(0) } }
@keyframes fa-ha-ma-jaw-c { 0%,12% { transform: rotate(0) } 32%,60% { transform: rotate(17deg) } 74%,100% { transform: rotate(0) } }
@keyframes fa-ha-ma-body-c { 0%,12% { transform: scale(1) } 34%,60% { transform: scale(1.025) } 80%,100% { transform: scale(1) } }
@keyframes fa-ha-ma-ear-c { 0%,72% { transform: rotate(0) } 80% { transform: rotate(-12deg) } 90% { transform: rotate(8deg) } 100% { transform: rotate(0) } }
@keyframes fa-khi-hop-c { 0% { transform: none } 6% { transform: scale(1.03,.96) } 14% { transform: translateY(-7px) } 22% { transform: scale(1.03,.97) } 30% { transform: translateY(-5px) } 36%,100% { transform: none } }
@keyframes fa-khi-head-c { 0%,30% { transform: rotate(0) } 40%,52% { transform: rotate(-4deg) } 58% { transform: rotate(0) } 72%,90% { transform: rotate(3deg) } 100% { transform: rotate(0) } }
@keyframes fa-khi-tail-c { 0% { transform: rotate(0) } 18% { transform: rotate(-6deg) } 36% { transform: rotate(5deg) } 54%,100% { transform: rotate(0) } }
@keyframes fa-khi-armup-c { 0%,35% { transform: rotate(-70deg); opacity: 0 } 36% { transform: rotate(-60deg); opacity: 1 } 40% { transform: rotate(0) } 45% { transform: rotate(-4deg) } 50% { transform: rotate(0); opacity: 1 } 54% { transform: rotate(-60deg); opacity: 1 } 55%,100% { transform: rotate(-70deg); opacity: 0 } }
@keyframes fa-khe-fruit-c { 0% { transform: rotate(0) } 10% { transform: rotate(-3deg) } 22% { transform: rotate(2deg) } 34%,100% { transform: rotate(0) } }
@keyframes fa-khe-leaf-c { 0% { transform: rotate(0) } 12% { transform: rotate(-8deg) } 26% { transform: rotate(6deg) } 40%,100% { transform: rotate(0) } }
@keyframes fa-khe-slice-c { 0%,30% { transform: rotate(0) scale(1) } 38% { transform: rotate(-14deg) scale(.95) } 66% { transform: rotate(360deg) scale(1.06) } 78%,100% { transform: rotate(360deg) scale(1) } }
@keyframes fa-lon-hop-c { 0%,70% { transform: none } 76% { transform: scale(1.03,.95) } 84% { transform: translateY(-10px) } 92% { transform: scale(1.03,.96) } 100% { transform: none } }
@keyframes fa-lon-snout-c { 0%,4% { transform: none } 12% { transform: rotate(-5deg) scale(1.05) } 20% { transform: rotate(3deg) } 28% { transform: rotate(-5deg) scale(1.05) } 36% { transform: rotate(3deg) } 42%,100% { transform: none } }
@keyframes fa-lon-ear-c { 0%,36% { transform: rotate(0) } 44% { transform: rotate(16deg) } 54% { transform: rotate(-4deg) } 62%,78% { transform: rotate(0) } 88% { transform: rotate(10deg) } 100% { transform: rotate(0) } }
@keyframes fa-lon-tail-c { 0%,40% { transform: rotate(0) } 52% { transform: rotate(-12deg) } 64% { transform: rotate(8deg) } 72%,100% { transform: rotate(0) } }
@keyframes fa-lon-curl-c { 0%,40% { transform: rotate(0) } 72%,100% { transform: rotate(-360deg) } }
@keyframes fa-meo-tail-c { 0% { transform: rotate(0) } 18% { transform: rotate(-10deg) } 40% { transform: rotate(8deg) } 62% { transform: rotate(-6deg) } 82% { transform: rotate(4deg) } 100% { transform: rotate(0) } }
@keyframes fa-meo-head-c { 0%,30% { transform: rotate(0) } 42%,74% { transform: rotate(-4deg) } 84%,100% { transform: rotate(0) } }
@keyframes fa-meo-ear-c { 0%,6% { transform: rotate(0) } 11% { transform: rotate(8deg) } 16%,84% { transform: rotate(0) } 89% { transform: rotate(-8deg) } 94%,100% { transform: rotate(0) } }
@keyframes fa-meo-legup-c { 0%,36% { transform: rotate(-30deg); opacity: 0 } 37% { transform: rotate(-30deg); opacity: 1 } 43% { transform: rotate(0) } 55% { transform: rotate(-4deg) } 67% { transform: rotate(0) } 78% { transform: rotate(-30deg); opacity: 1 } 79%,100% { transform: rotate(-30deg); opacity: 0 } }
@keyframes fa-meo-tongue-c { 0%,42% { opacity: 0; transform: scale(.3) } 48% { opacity: 1; transform: scale(1) } 56% { transform: scale(.75) } 64% { transform: scale(1) } 70% { opacity: 1; transform: scale(1) } 74%,100% { opacity: 0; transform: scale(.3) } }
`;
