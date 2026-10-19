/**
 * Truyện của 🏘️ Phố Kỹ Năng (docs/ky-nang-song/thiet-ke.md §3, §9). Dữ liệu thuần, sửa lời thoại không cần sửa engine.
 *
 * story = { id, place, title, icon, grades, source, cast, start, nodes }
 *   cast:  { vai: { slot: 'a'|'b'|'c', npc?: id trong npc.js, name?, phone?: true (nói qua điện thoại) } }
 *          vai 'me' là bé (Bin hoặc Na, chọn ở màn đầu), vai 'ban' là bạn còn lại. Vai không có trong cast mà
 *          vẫn nói (vd. 'door': người ngoài cửa) thì khai trong VOICES.
 *   node:  { scene?, set?: { light, bike, alert, door, phone, loa, look } (giữ tới khi đổi),
 *            show?: { vai: 'wait'|'happy'|'sad'|null } (null = rời cảnh; giữ tới khi đổi),
 *            say?: [[vai, lời], …],
 *            choose?: [{ icon, text, go }] | act?: { prompt, buttons: [{ icon, text }], order: [chỉ số…], wrong, set?, go }
 *            | next?: id | end?: 'best'|'ok'|'bad', title, learn, stars? }
 *   Lời có {me} (tên bé), {ban} (tên bạn).
 *
 * Quy tắc nội dung (§3): không vẽ cảnh bị hại, nhánh chưa ổn dừng lại trước khi có chuyện ("Khoan đã!");
 * lời giải thích nói về hành động, không chê bé; kiến thức an toàn ghi nguồn ở `source`; không dùng "nhé".
 */

/** Người nói không đứng trong cảnh. */
export const VOICES = {
  door: { name: 'Người ngoài cửa', icon: '🚪' },
  loa: { name: 'Loa siêu thị', icon: '📢' },
};

export const PLACES = [
  { id: 'road', icon: '🚸', title: 'Đường đến trường', color: '#F97316' },
  { id: 'home', icon: '🏠', title: 'Nhà em', color: '#EC4899' },
  { id: 'market', icon: '🛒', title: 'Siêu thị', color: '#16A34A' },
  { id: 'school', icon: '🏫', title: 'Trường học', color: '#3B82F6' },
  { id: 'water', icon: '🌊', title: 'Hồ, sông, bể bơi', color: '#0EA5E9' },
  { id: 'park', icon: '🌳', title: 'Công viên', color: '#22C55E' },
  { id: 'net', icon: '📱', title: 'Thế giới mạng', color: '#8B5CF6' },
  { id: 'fire', icon: '🔥', title: 'Khi có sự cố', color: '#EF4444' },
];

const quaDuong = {
  id: 'qua-duong', place: 'road', icon: '🚦', title: 'Qua đường đến trường', grades: [1, 5],
  source: 'Ủy ban An toàn giao thông Quốc gia, Bộ GD&ĐT: tài liệu giáo dục an toàn giao thông cho học sinh tiểu học',
  cast: { me: { slot: 'a' }, ban: { slot: 'b' }, cop: { slot: 'c', npc: 'congan', name: 'Chú công an' } },
  start: 'c1',
  nodes: {
    c1: {
      scene: 'crossing', set: { light: 'red', bike: 'come' }, show: { me: 'wait', ban: 'happy', cop: 'wait' },
      say: [['ban', '{me} ơi, sắp vào lớp rồi!'], ['ban', 'Mình chạy qua đường luôn đi!']],
      choose: [
        { icon: '🚦', text: 'Đợi đèn xanh', go: 'wait' },
        { icon: '🏃', text: 'Chạy qua luôn', go: 'run' },
        { icon: '🙋', text: 'Nhờ chú công an', go: 'ask' },
      ],
    },
    wait: {
      say: [['me', 'Đèn đỏ rồi. Mình đợi đèn xanh đã.'], ['ban', 'Ừ, muộn một chút còn hơn gặp nguy hiểm.']],
      next: 'green',
    },
    green: {
      set: { light: 'green', bike: 'stop' }, show: { me: 'happy' },
      say: [['me', 'Đèn xanh rồi! Nhưng phải nhìn xe trước đã.']],
      act: {
        prompt: 'Nhìn trái, nhìn phải, rồi nhìn trái lần nữa.',
        buttons: [{ icon: '⬅️', text: 'Nhìn trái' }, { icon: '➡️', text: 'Nhìn phải' }],
        order: [0, 1, 0],
        look: ['left', 'right', 'left'],
        wrong: 'Nhìn bên trái trước, vì xe đi bên phải đường sẽ tới từ phía trái em.',
        go: 'walk',
      },
    },
    walk: {
      say: [['me', 'Không có xe nào chạy tới. Mình đi thôi!']],
      choose: [
        { icon: '🦓', text: 'Đi thẳng trên vạch kẻ', go: 'endZebra' },
        { icon: '↗️', text: 'Đi chéo cho nhanh', go: 'endDiag' },
      ],
    },
    run: {
      set: { alert: true, bike: 'stop' }, show: { ban: 'sad', me: 'sad', cop: 'sad' },
      say: [['cop', 'Khoan đã! Đứng lại, các cháu!'], ['cop', 'Đèn đỏ, xe máy đang tới. Chạy ra lúc này rất nguy hiểm.']],
      next: 'endRun',
    },
    ask: {
      show: { me: 'happy' },
      say: [['me', 'Chú ơi, chú giúp cháu qua đường được không ạ?'], ['cop', 'Giỏi lắm! Đợi đèn xanh, chú dẫn hai cháu qua.']],
      next: 'askGreen',
    },
    askGreen: {
      set: { light: 'green', bike: 'stop' }, show: { cop: 'happy', ban: 'happy' },
      say: [['cop', 'Đèn xanh rồi. Xe dừng hết rồi. Đi nào!']],
      next: 'endAsk',
    },
    endZebra: {
      end: 'best', title: 'Qua đường an toàn', stars: 2,
      say: [['cop', 'Đúng rồi! Đợi đèn, nhìn xe, đi trên vạch kẻ đường.']],
      learn: 'Đợi đèn xanh. Nhìn trái, nhìn phải, nhìn trái lần nữa. Đi thẳng trên vạch kẻ đường.',
    },
    endDiag: {
      end: 'ok', title: 'Còn cách tốt hơn',
      say: [['cop', 'Cháu đợi đèn và nhìn xe là đúng.'], ['cop', 'Nhưng đi chéo thì đường dài hơn, xe khó thấy cháu.']],
      learn: 'Qua đường thì đi thẳng trên vạch kẻ đường, không đi chéo.',
    },
    endRun: {
      end: 'bad', title: 'Suýt nữa thì nguy hiểm',
      say: [['cop', 'Muộn học thì nói với cô giáo. Còn đèn đỏ thì luôn đứng lại.']],
      learn: 'Dù sắp muộn học cũng không chạy qua đường. Đèn đỏ thì đứng lại.',
    },
    endAsk: {
      end: 'best', title: 'Nhờ người lớn giúp', stars: 2,
      say: [['cop', 'Đường đông xe thì nhờ người lớn dắt qua, như các cháu vừa làm.']],
      learn: 'Đường đông xe, em nhờ chú công an hoặc người lớn dắt qua đường.',
    },
  },
};

const oNha = {
  id: 'o-nha', place: 'home', icon: '🚪', title: 'Ở nhà một mình có người gõ cửa', grades: [1, 5],
  source: 'Tổng đài quốc gia bảo vệ trẻ em 111, UNICEF Việt Nam: kỹ năng tự bảo vệ cho trẻ khi ở nhà một mình',
  cast: { me: { slot: 'a' }, mom: { slot: 'c', npc: 'co', name: 'Mẹ', phone: true } },
  start: 'c1',
  nodes: {
    c1: {
      scene: 'home', set: { door: 'knock' }, show: { me: 'wait', mom: null },
      say: [['door', 'Cốc cốc! Có ai ở nhà không?'], ['door', 'Chú là thợ sửa điện. Cháu mở cửa cho chú vào!']],
      choose: [
        { icon: '🚪', text: 'Mở cửa cho chú', go: 'open' },
        { icon: '🤫', text: 'Không mở, nói vọng ra', go: 'talk' },
        { icon: '📞', text: 'Gọi cho bố mẹ', go: 'call' },
      ],
    },
    open: {
      set: { door: null, phone: 'ring' },
      say: [['me', 'Ơ, điện thoại reo!']],
      next: 'openMom',
    },
    openMom: {
      set: { phone: null }, show: { mom: 'sad', me: 'sad' },
      say: [['mom', 'Khoan đã, con! Đừng mở cửa!'], ['mom', 'Hôm nay bố mẹ không hẹn thợ nào cả.']],
      next: 'endOpen',
    },
    talk: {
      choose: [
        { icon: '🗣️', text: '"Bố mẹ cháu đi vắng rồi ạ."', go: 'tellAlone' },
        { icon: '🗣️', text: '"Bố mẹ cháu đang bận, chú quay lại sau ạ."', go: 'tellBusy' },
      ],
    },
    tellAlone: {
      show: { me: 'sad' },
      say: [['door', 'Vậy à? Thế cháu mở cửa đi, chú làm nhanh thôi.'], ['me', 'Ơ… Mình phải gọi cho mẹ.']],
      next: 'callAfterTell',
    },
    callAfterTell: {
      act: { prompt: 'Gọi cho mẹ.', buttons: [{ icon: '👩', text: 'Mẹ' }, { icon: '🎮', text: 'Bạn chơi game' }], order: [0], wrong: 'Bạn chơi game không giúp được em. Gọi cho mẹ.', set: { phone: 'ring' }, go: 'momAfterTell' },
    },
    momAfterTell: {
      set: { phone: null, door: null }, show: { mom: 'wait' },
      say: [['mom', 'Con không mở cửa là đúng.'], ['mom', 'Nhưng đừng nói với người lạ là con ở nhà một mình. Mẹ gọi bác hàng xóm sang ngay.']],
      next: 'endTell',
    },
    tellBusy: {
      set: { door: null }, show: { me: 'happy' },
      say: [['door', 'Ừ, thế chú quay lại sau.'], ['me', 'Mình vẫn phải kể cho mẹ biết.']],
      next: 'call',
    },
    call: {
      act: { prompt: 'Gọi cho mẹ.', buttons: [{ icon: '👩', text: 'Mẹ' }, { icon: '🎮', text: 'Bạn chơi game' }], order: [0], wrong: 'Bạn chơi game không giúp được em. Gọi cho mẹ.', set: { phone: 'ring' }, go: 'momGood' },
    },
    momGood: {
      set: { phone: null, door: null }, show: { mom: 'happy', me: 'happy' },
      say: [['me', 'Mẹ ơi, có chú nói là thợ điện gõ cửa nhà mình.'], ['mom', 'Con không mở cửa và gọi cho mẹ, giỏi lắm!'], ['mom', 'Mẹ gọi bác hàng xóm sang xem. Nếu người đó cố vào nhà, con gọi 113.']],
      next: 'endCall',
    },
    endOpen: {
      end: 'bad', title: 'Suýt mở cửa cho người lạ',
      say: [['mom', 'Người lạ có thể nói dối là thợ, là bạn của bố mẹ. Con ở nhà một mình thì không mở cửa cho ai.']],
      learn: 'Ở nhà một mình, không mở cửa cho người lạ, dù họ nói là thợ hay người quen của bố mẹ.',
    },
    endTell: {
      end: 'ok', title: 'Không nói mình ở nhà một mình',
      learn: 'Đừng nói với người lạ là em ở nhà một mình. Nói "Bố mẹ đang bận" rồi gọi cho bố mẹ.',
    },
    endCall: {
      end: 'best', title: 'Không mở cửa, gọi bố mẹ', stars: 2,
      learn: 'Không mở cửa cho người lạ. Gọi ngay cho bố mẹ. Người đó cố vào nhà thì gọi 113.',
    },
  },
};

const lacSieuThi = {
  id: 'lac-sieu-thi', place: 'market', icon: '🧺', title: 'Đi lạc trong siêu thị', grades: [1, 5],
  source: 'UNICEF Việt Nam, Tổng đài 111: trẻ đi lạc nơi đông người (đứng yên, tìm nhân viên mặc đồng phục, không đi theo người lạ)',
  cast: {
    me: { slot: 'a' }, mom: { slot: 'b', npc: 'co', name: 'Mẹ' },
    stranger: { slot: 'b', npc: 'anh', name: 'Một anh lạ' }, staff: { slot: 'c', npc: 'chi', name: 'Chị nhân viên' },
  },
  start: 'c1',
  nodes: {
    c1: {
      scene: 'market', show: { me: 'happy', mom: 'happy', stranger: null, staff: null },
      say: [['mom', 'Con đứng ở quầy bánh này chọn bánh. Mẹ ra quầy sữa bên cạnh một chút.'], ['me', 'Vâng ạ!']],
      next: 'lost',
    },
    lost: {
      show: { mom: null, me: 'sad' },
      say: [['me', 'Mình mải xem bánh… Ơ, mẹ đâu rồi?']],
      choose: [
        { icon: '🏃', text: 'Chạy đi tìm mẹ khắp nơi', go: 'run' },
        { icon: '🧍', text: 'Đứng yên ở chỗ cũ', go: 'stay' },
        { icon: '🚪', text: 'Ra cổng đợi mẹ', go: 'exit' },
      ],
    },
    run: {
      show: { stranger: 'happy' },
      say: [['stranger', 'Em lạc mẹ à? Đi theo anh, anh dẫn ra ngoài tìm mẹ.']],
      choose: [
        { icon: '🚶', text: 'Đi theo anh ấy', go: 'follow' },
        { icon: '🙅', text: '"Không ạ, em tìm cô chú nhân viên."', go: 'refuse' },
      ],
    },
    follow: {
      show: { staff: 'sad' },
      say: [['staff', 'Khoan đã! Em ở lại đây, chị là nhân viên siêu thị, chị sẽ giúp em.']],
      next: 'endFollow',
    },
    refuse: {
      show: { stranger: null, staff: 'wait' },
      say: [['me', 'Chị ơi, em bị lạc mẹ ạ.']],
      next: 'askNumber',
    },
    exit: {
      show: { staff: 'sad' },
      say: [['staff', 'Khoan đã, em! Em đi đâu một mình thế?'], ['me', 'Em ra cổng đợi mẹ ạ.'], ['staff', 'Ngoài cổng đông người và xe lắm. Mẹ quay lại sẽ không thấy em.']],
      next: 'endExit',
    },
    stay: {
      say: [['me', 'Mẹ dặn: bị lạc thì đứng yên ở chỗ cũ.']],
      next: 'stayMom',
    },
    stayMom: {
      show: { mom: 'happy', me: 'happy' },
      say: [['mom', 'Con đây rồi! Con đứng yên đúng chỗ nên mẹ quay lại thấy ngay.']],
      next: 'endStay',
    },
    askNumber: {
      say: [['staff', 'Em đừng lo. Em có nhớ số điện thoại của mẹ không?']],
      choose: [
        { icon: '🔢', text: 'Em nhớ số của mẹ', go: 'number' },
        { icon: '😢', text: 'Em không nhớ', go: 'noNumber' },
      ],
    },
    number: {
      show: { staff: 'happy' },
      say: [['staff', 'Giỏi quá! Chị gọi cho mẹ em ngay.']],
      next: 'numberMom',
    },
    numberMom: {
      show: { mom: 'happy', me: 'happy' },
      say: [['mom', 'Cảm ơn chị! Con tìm đúng người giúp rồi.']],
      next: 'endStaff',
    },
    noNumber: {
      set: { loa: 'on' }, show: { staff: 'wait' },
      say: [['staff', 'Không sao, chị đọc tên em trên loa.'], ['loa', 'Phụ huynh của bé {me} xin mời đến quầy thu ngân.']],
      next: 'noNumberMom',
    },
    noNumberMom: {
      set: { loa: null }, show: { mom: 'happy', me: 'happy' },
      say: [['mom', 'Mẹ đây! Về nhà mẹ con mình học thuộc số điện thoại của mẹ.']],
      next: 'endNoNumber',
    },
    endStay: {
      end: 'best', title: 'Đứng yên chờ mẹ', stars: 2,
      learn: 'Bị lạc, em đứng yên ở chỗ cũ. Bố mẹ sẽ quay lại tìm em ở đó.',
    },
    endStaff: {
      end: 'best', title: 'Nhờ nhân viên siêu thị', stars: 2,
      learn: 'Bị lạc, em nhờ nhân viên mặc đồng phục hoặc cô thu ngân. Không đi theo người lạ. Học thuộc số điện thoại của bố mẹ.',
    },
    endNoNumber: {
      end: 'ok', title: 'Học thuộc số điện thoại',
      learn: 'Em tìm nhân viên là đúng. Hãy học thuộc số điện thoại của bố mẹ để gọi được ngay.',
    },
    endFollow: {
      end: 'bad', title: 'Không đi theo người lạ',
      say: [['staff', 'Người lạ trông rất hiền cũng có thể là người xấu. Không đi theo ai ra ngoài cả.']],
      learn: 'Không đi theo người lạ, dù họ nói sẽ dẫn em đi tìm bố mẹ.',
    },
    endExit: {
      end: 'ok', title: 'Không ra cổng một mình',
      say: [['staff', 'Em ở lại quầy thu ngân với chị. Chị đọc loa gọi mẹ em.']],
      learn: 'Bị lạc, em không tự ra cổng. Đứng yên hoặc nhờ nhân viên giúp.',
    },
  },
};

export const STORIES = [quaDuong, oNha, lacSieuThi];

/** Danh sách kết cục của truyện (để vẽ sổ kết cục): [{ id, end, title }] theo thứ tự khai báo. */
export function endingsOf(story) {
  return Object.entries(story.nodes).filter(([, n]) => n.end).map(([id, n]) => ({ id, end: n.end, title: n.title }));
}
