// Bộ chủ đề vietsu (bài đọc tiếng Anh 101+). Xem docs/tieng-anh/thiet-ke-bai-doc.md §10.
// 🇻🇳 Nhân vật lịch sử Việt Nam, bài 121–130, xếp theo thời gian. Truyền thuyết / giai thoại luôn nói rõ "People say …" / "An old story says …".
export default [
  // 121
  {
    id: 'en-121', no: 121, level: 3, pack: 'vietsu',
    title: 'The Trung Sisters',
    topic: 'Hai Bà Trưng khởi nghĩa năm 40',
    grammar: {
      point: 'Quá khứ của to be (was / were) và quá khứ đơn',
      explainVi: 'Kể chuyện ngày xưa: "was" đi với I / he / she / it và một người, vật; "were" đi với we / you / they và nhiều người, vật. Động từ thường đổi sang quá khứ: có quy tắc thêm -ed (lived, started, joined), bất quy tắc phải học thuộc (ride → rode, win → won, run → ran, come → came, fight → fought).',
      pattern: 'S + was / were + …   S + V2 (lived, rode, won) …',
      examples: ['The two sisters were brave.', 'The sisters rode on big elephants.', 'To Dinh ran away to the north.'],
    },
    text: `About two thousand years ago, our country was not free. Rulers from the north were in our land, and the governor, To Dinh, was very cruel.

Trung Trac and Trung Nhi were two sisters from Me Linh. They were brave and clever. In the year 40, the sisters started a fight against To Dinh. Many people joined them, and lots of women were soldiers too. The sisters rode on big elephants, and their army won. To Dinh ran away to the north.

Trung Trac became queen, and her sister helped her. Two years later, a huge army came from the north again. The sisters fought bravely until the year 43. Today, many streets and schools have their name.`,
    vocab: [
      { word: 'free', vi: 'tự do', emoji: '🕊️', example: 'Our country was not free.' },
      { word: 'cruel', vi: 'độc ác, tàn bạo', emoji: '😠', example: 'The governor was very cruel.' },
      { word: 'brave', vi: 'dũng cảm', emoji: '🦸', example: 'The two sisters were brave.' },
      { word: 'join', vi: 'tham gia, đi theo', emoji: '🤝', example: 'Many people joined the sisters.' },
      { word: 'soldier', vi: 'người lính', emoji: '💂', example: 'Lots of women were soldiers too.' },
      { word: 'elephant', vi: 'con voi', emoji: '🐘', example: 'The sisters rode on big elephants.' },
      { word: 'army', vi: 'quân đội, đội quân', emoji: '⚔️', example: 'Their army won.' },
      { word: 'queen', vi: 'nữ hoàng, nữ vương', emoji: '👑', example: 'Trung Trac became queen.' },
    ],
    questions: [
      { type: 'mc', q: 'When did the sisters start the fight?', options: ['in the year 40', 'in the year 43', 'in the year 938'], answer: 0, listen: true },
      { type: 'tf', q: 'The sisters rode on horses.', answer: false, listen: true },
      { type: 'mc', q: 'Who was the cruel governor?', options: ['Trung Nhi', 'To Dinh', 'Me Linh'], answer: 1 },
      { type: 'short', q: 'Where were the two sisters from?', answer: 'They were from Me Linh.', accept: ['Me Linh', 'from Me Linh'] },
      { type: 'short', q: 'Who became queen?', answer: 'Trung Trac became queen.', accept: ['Trung Trac', 'Trung Trac did.'] },
    ],
    makeQuestion: [
      { answer: 'Yes, he was. The governor was very cruel.', question: 'Was the governor cruel?', hint: 'Was …?', accept: ['Was To Dinh cruel?', 'Was the governor very cruel?'] },
      { answer: 'Because the governor, To Dinh, was very cruel.', question: 'Why did the sisters start a fight?', hint: 'Why …?', accept: ['Why did the sisters start the fight?', 'Why did they start a fight?', 'Why did they fight against To Dinh?', 'Why did the sisters fight against To Dinh?'] },
      { answer: 'They were from Me Linh.', question: 'Where were the sisters from?', hint: 'Where …?', accept: ['Where were the two sisters from?', 'Where were they from?'] },
      { answer: 'They started the fight in the year 40.', question: 'When did the sisters start the fight?', hint: 'When did …?', accept: ['When did they start the fight?', 'When did the fight start?'] },
      { answer: 'They rode on big elephants.', question: 'What did the sisters ride on?', hint: 'What did …?', accept: ['What did they ride on?', 'What did the sisters ride?'] },
      { answer: 'Trung Trac became queen.', question: 'Who became queen?', hint: 'Who …?' },
      { answer: 'He ran away to the north.', question: 'Where did To Dinh go?', hint: 'Where did …?', accept: ['Where did To Dinh run?', 'Where did To Dinh run away to?', 'Where did he go?'] },
      { answer: 'They fought until the year 43.', question: 'How long did the sisters fight?', hint: 'How long …?', accept: ['Until when did the sisters fight?', 'Until when did they fight?', 'How long did they fight?'] },
    ],
    dictation: [
      'They were brave and clever.',
      'The sisters rode on big elephants, and their army won.',
      'Trung Trac became queen, and her sister helped her.',
    ],
    reorder: [
      { words: ['were', 'sisters', 'The', 'brave', 'two'], answer: 'The two sisters were brave.' },
      { words: ['joined', 'people', 'them', 'Many'], answer: 'Many people joined them.' },
    ],
    rewrite: [
      { prompt: 'The sisters are very brave. (Two thousand years ago)', answer: 'Two thousand years ago, the sisters were very brave.', accept: ['Two thousand years ago the sisters were very brave.', 'The sisters were very brave two thousand years ago.'], instructionVi: 'Viết lại câu ở quá khứ, bắt đầu bằng cụm từ trong ngoặc.' },
      { prompt: 'The sisters ride on big elephants. (In the year 40)', answer: 'In the year 40, the sisters rode on big elephants.', accept: ['In the year 40 the sisters rode on big elephants.', 'The sisters rode on big elephants in the year 40.'], instructionVi: 'Viết lại câu ở quá khứ, bắt đầu bằng cụm từ trong ngoặc.' },
    ],
  },
  // 122
  {
    id: 'en-122', no: 122, level: 3, pack: 'vietsu',
    title: 'The Stakes in the River',
    topic: 'Ngô Quyền và trận Bạch Đằng năm 938',
    grammar: {
      point: 'Quá khứ đơn; kể theo thứ tự: first / then / after that / finally',
      explainVi: 'Kể một việc gồm nhiều bước trong quá khứ, dùng quá khứ đơn và các từ nối chỉ thứ tự: "First" (đầu tiên), "Then" (rồi, sau đó), "After that" (sau đó), "Finally" (cuối cùng). Các từ này thường đứng đầu câu, sau nó có dấu phẩy (trừ "Then").',
      pattern: 'First, … Then … After that, … Finally, …',
      examples: ['First, his soldiers cut tall trees.', 'Then they made big wooden stakes.', 'Finally, our country was free.'],
    },
    text: `Ngo Quyen was a great general. In 938, ships from the Southern Han came to attack our country. Ngo Quyen had a clever plan.

First, his soldiers cut tall trees. Then they made big wooden stakes with iron tips. They put the stakes in the Bach Dang River. At high tide, the water covered the stakes, so the enemy could not see them.

After that, his small boats came out to fight and then ran away. The enemy ships followed them into the river. Then the tide went out. Many ships hit the sharp stakes and got stuck. Finally, after about a thousand years of northern rule, our country was free. In 939, Ngo Quyen became king.`,
    vocab: [
      { word: 'general', vi: 'vị tướng', emoji: '🎖️', example: 'Ngo Quyen was a great general.' },
      { word: 'attack', vi: 'tấn công', emoji: '⚔️', example: 'The ships came to attack our country.' },
      { word: 'plan', vi: 'kế hoạch, mưu kế', emoji: '🗺️', example: 'Ngo Quyen had a clever plan.' },
      { word: 'stake', vi: 'cái cọc', emoji: '🪵', example: 'They made big wooden stakes with iron tips.' },
      { word: 'tide', vi: 'thuỷ triều', emoji: '🌊', example: 'At high tide, the water covered the stakes.' },
      { word: 'enemy', vi: 'kẻ thù, quân giặc', emoji: '👿', example: 'The enemy could not see the stakes.' },
      { word: 'sharp', vi: 'sắc, nhọn', emoji: '🔪', example: 'The ships hit the sharp stakes.' },
      { word: 'stuck', vi: 'bị mắc kẹt', emoji: '🪤', example: 'Some ships got stuck.' },
    ],
    questions: [
      { type: 'mc', q: 'What did the soldiers make first?', options: ['big ships', 'wooden stakes with iron tips', 'small houses'], answer: 1, listen: true },
      { type: 'tf', q: 'At high tide, the enemy could see the stakes.', answer: false, listen: true },
      { type: 'mc', q: 'Where did they put the stakes?', options: ['in the forest', 'in the river', 'on the boats'], answer: 1 },
      { type: 'short', q: 'What happened when the tide went out?', answer: 'Many ships hit the sharp stakes and got stuck.', accept: ['The ships hit the stakes.', 'The ships got stuck.', 'Many ships got stuck.', 'The ships hit the sharp stakes and got stuck.'] },
      { type: 'short', q: 'When did Ngo Quyen become king?', answer: 'He became king in 939.', accept: ['in 939', '939'] },
    ],
    makeQuestion: [
      { answer: 'He was a great general.', question: 'Who was Ngo Quyen?', hint: 'Who …?' },
      { answer: 'The ships came in 938.', question: 'When did the ships come?', hint: 'When did …?', accept: ['When did the enemy ships come?', 'When did the big ships come?'] },
      { answer: 'Yes, he did. He had a clever plan.', question: 'Did Ngo Quyen have a plan?', hint: 'Did …?', accept: ['Did Ngo Quyen have a clever plan?', 'Did he have a plan?', 'Did he have a clever plan?'] },
      { answer: 'They made big wooden stakes.', question: 'What did the soldiers make?', hint: 'What did …?', accept: ['What did they make?', 'What did his soldiers make?'] },
      { answer: 'They put them in the Bach Dang River.', question: 'Where did they put the stakes?', hint: 'Where did …?', accept: ['Where did the soldiers put the stakes?', 'Where did they put them?'] },
      { answer: 'Because the water covered the stakes.', question: 'Why could the enemy not see the stakes?', hint: 'Why …?', accept: ["Why couldn't the enemy see the stakes?", "Why couldn't the enemy see them?", 'Why could the enemy not see them?'] },
      { answer: 'They followed the small boats into the river.', question: 'What did the enemy ships do?', hint: 'What … do?', accept: ['What did the big enemy ships do?', 'What did the ships do?'] },
      { answer: 'He became king in 939.', question: 'When did Ngo Quyen become king?', hint: 'When …?', accept: ['When did he become king?'] },
    ],
    dictation: [
      'Ngo Quyen had a clever plan.',
      'Then they made big wooden stakes with iron tips.',
      'Then the tide went out.',
    ],
    reorder: [
      { words: ['First,', 'trees', 'soldiers', 'tall', 'his', 'cut'], answer: 'First, his soldiers cut tall trees.' },
      { words: ['Finally,', 'was', 'country', 'our', 'free'], answer: 'Finally, our country was free.' },
    ],
    rewrite: [
      { prompt: 'The soldiers cut trees. They made stakes. (First … Then …)', answer: 'First, the soldiers cut trees. Then they made stakes.', accept: ['First the soldiers cut trees. Then they made stakes.', 'First, the soldiers cut trees, then they made stakes.'], instructionVi: 'Nối hai câu theo thứ tự, dùng từ trong ngoặc.' },
      { prompt: 'The tide goes out. (Then … , past)', answer: 'Then the tide went out.', instructionVi: 'Viết lại câu ở quá khứ, bắt đầu bằng "Then".' },
    ],
  },
  // 123
  {
    id: 'en-123', no: 123, level: 3, pack: 'vietsu',
    title: 'The Buffalo Boy and the Reed Flags',
    topic: 'Đinh Bộ Lĩnh: cờ lau tập trận, dẹp loạn 12 sứ quân (968)',
    grammar: {
      point: 'Mệnh đề when + quá khứ đơn; could / couldn\'t',
      explainVi: '"When + quá khứ" cho biết lúc việc kia xảy ra: "When he grew up, …" (Khi ông lớn lên, …). Mệnh đề when đứng đầu câu thì có dấu phẩy. "could / could not (couldn\'t) + động từ nguyên mẫu" nói ai đó đã có thể / không thể làm gì trong quá khứ.',
      pattern: 'When + S + V2, S + V2 …   S + could / couldn\'t + V …',
      examples: ['When Dinh Bo Linh was a little boy, he looked after buffaloes.', 'People could not live happily.', 'Finally, people could live in peace again.'],
    },
    text: `When Dinh Bo Linh was a little boy, he lived near Hoa Lu. His family was poor, so he looked after buffaloes. An old story says that he played battle games with the other buffalo boys. They used reeds as flags, and Bo Linh was always the leader.

When he grew up, the country was not peaceful. There were twelve warlords, and they fought each other all the time. People could not live happily. Dinh Bo Linh built a strong army and beat them one by one.

In 968, he became the emperor, Dinh Tien Hoang. He named the country Dai Co Viet, and Hoa Lu was the capital. Finally, people could live in peace again.`,
    vocab: [
      { word: 'buffalo', vi: 'con trâu', emoji: '🐃', example: 'He looked after buffaloes.' },
      { word: 'reed', vi: 'cây lau, cây sậy', emoji: '🌾', example: 'They used reeds as flags.' },
      { word: 'flag', vi: 'lá cờ', emoji: '🚩', example: 'The boys used reeds as flags.' },
      { word: 'leader', vi: 'người chỉ huy, thủ lĩnh', emoji: '🧑‍✈️', example: 'Bo Linh was always the leader.' },
      { word: 'peaceful', vi: 'yên bình, thái bình', emoji: '☮️', example: 'The country was not peaceful.' },
      { word: 'warlord', vi: 'sứ quân (người cầm quân chiếm giữ một vùng)', emoji: '🏯', example: 'There were twelve warlords.' },
      { word: 'emperor', vi: 'hoàng đế', emoji: '🤴', example: 'In 968, he became the emperor.' },
      { word: 'capital', vi: 'kinh đô, thủ đô', emoji: '🏛️', example: 'Hoa Lu was the capital.' },
    ],
    questions: [
      { type: 'mc', q: 'What did the boys use as flags?', options: ['leaves', 'reeds', 'sticks'], answer: 1, listen: true },
      { type: 'tf', q: 'There were twelve warlords.', answer: true, listen: true },
      { type: 'mc', q: 'What did Dinh Bo Linh name the country?', options: ['Dai Viet', 'Dai Co Viet', 'Van Lang'], answer: 1 },
      { type: 'short', q: 'Why did Bo Linh look after buffaloes?', answer: 'Because his family was poor.', accept: ['His family was poor.', 'his family was poor'] },
      { type: 'short', q: 'What was the capital?', answer: 'Hoa Lu was the capital.', accept: ['Hoa Lu', 'It was Hoa Lu.'] },
    ],
    makeQuestion: [
      { answer: 'He looked after buffaloes.', question: 'What did Bo Linh do when he was a little boy?', hint: 'What did …?', accept: ['What did he do when he was a little boy?', 'What did Dinh Bo Linh do when he was a little boy?', 'What did he look after?'] },
      { answer: 'Because his family was poor.', question: 'Why did he look after buffaloes?', hint: 'Why …?', accept: ['Why did Bo Linh look after buffaloes?', 'Why did Dinh Bo Linh look after buffaloes?'] },
      { answer: 'Yes, he was. Bo Linh was always the leader.', question: 'Was Bo Linh the leader?', hint: 'Was …?', accept: ['Was he the leader?', 'Was Bo Linh always the leader?'] },
      { answer: 'There were twelve warlords.', question: 'How many warlords were there?', hint: 'How many …?' },
      { answer: 'No, they could not. People could not live happily.', question: 'Could people live happily?', hint: 'Could …?', accept: ['Could the people live happily?'] },
      { answer: 'He became the emperor in 968.', question: 'When did he become the emperor?', hint: 'When …?', accept: ['When did Dinh Bo Linh become the emperor?', 'When did he become emperor?', 'When did Bo Linh become the emperor?'] },
      { answer: 'He named it Dai Co Viet.', question: 'What did he name the country?', hint: 'What did …?', accept: ['What did he call the country?', 'What did Dinh Bo Linh name the country?'] },
      { answer: 'Hoa Lu was the capital.', question: 'Where was the capital?', hint: 'Where …?', accept: ['Which city was the capital?', 'Where was the capital of Dai Co Viet?'] },
    ],
    dictation: [
      'His family was poor, so he looked after buffaloes.',
      'People could not live happily.',
      'Finally, people could live in peace again.',
    ],
    reorder: [
      { words: ['always', 'the', 'was', 'Bo Linh', 'leader'], answer: 'Bo Linh was always the leader.' },
      { words: ['could', 'happily', 'People', 'live', 'not'], answer: 'People could not live happily.' },
    ],
    rewrite: [
      { prompt: 'He grew up. The country was not peaceful. (When)', answer: 'When he grew up, the country was not peaceful.', accept: ['When he grew up the country was not peaceful.'], instructionVi: 'Nối hai câu, bắt đầu bằng "When".' },
      { prompt: 'People can live in peace. (In 968)', answer: 'In 968, people could live in peace.', accept: ['In 968 people could live in peace.', 'People could live in peace in 968.'], instructionVi: 'Viết lại câu ở quá khứ, dùng "could", thêm cụm từ trong ngoặc.' },
    ],
  },
  // 124
  {
    id: 'en-124', no: 124, level: 3, pack: 'vietsu',
    title: 'A Poem by the River',
    topic: 'Lý Thường Kiệt, sông Như Nguyệt 1077, bài thơ Nam quốc sơn hà',
    grammar: {
      point: 'Quá khứ đơn; will / won\'t (lời hứa, điều chắc chắn sẽ xảy ra)',
      explainVi: 'Phần kể chuyện dùng quá khứ đơn (came, waited, built, heard). Lời trong bài thơ nói điều chắc chắn sẽ xảy ra nên dùng "will + động từ nguyên mẫu" (will lose: sẽ thua). Phủ định: will not = won\'t.',
      pattern: 'S + V2 …   S + will / won\'t + V …',
      examples: ['If enemies come here, they will lose.', 'The enemy will not cross this river.', 'The soldiers heard the poem.'],
    },
    text: `Ly Thuong Kiet was a great general of the Ly kings. In 1076, a big Song army came from the north. His soldiers waited on the south bank of the Nhu Nguyet River. They built a long, strong wall of earth and wood along the river.

The enemy tried to cross the river many times, but they could not. People say that one night, a voice from a temple by the river read a poem: "The southern land belongs to the southern king. If enemies come here, they will lose." The soldiers felt very brave, and they fought even harder.

In 1077, the Song army went home. Today, people call the poem our first declaration of independence.`,
    vocab: [
      { word: 'bank', vi: 'bờ sông', emoji: '🏞️', example: 'The soldiers waited on the south bank.' },
      { word: 'wall', vi: 'bức tường, chiến luỹ', emoji: '🧱', example: 'They built a long, strong wall.' },
      { word: 'cross', vi: 'vượt qua, đi qua', emoji: '➡️', example: 'The enemy tried to cross the river.' },
      { word: 'voice', vi: 'giọng nói, tiếng nói', emoji: '🗣️', example: 'A voice read a poem.' },
      { word: 'temple', vi: 'ngôi đền', emoji: '🛕', example: 'There was a temple by the river.' },
      { word: 'poem', vi: 'bài thơ', emoji: '📜', example: 'The voice read a poem.' },
      { word: 'belong', vi: 'thuộc về', emoji: '🏷️', example: 'The southern land belongs to the southern king.' },
      { word: 'lose', vi: 'thua', emoji: '😞', example: 'If enemies come here, they will lose.' },
    ],
    questions: [
      { type: 'mc', q: 'Where did Ly Thuong Kiet and his soldiers wait?', options: ['on the north bank', 'on the south bank', 'in the temple'], answer: 1, listen: true },
      { type: 'tf', q: 'The enemy crossed the river easily.', answer: false, listen: true },
      { type: 'mc', q: 'What did the soldiers build along the river?', options: ['a bridge', 'a long, strong wall', 'a temple'], answer: 1 },
      { type: 'short', q: 'Where did the voice come from?', answer: 'It came from a temple by the river.', accept: ['a temple', 'from a temple', 'a temple by the river', 'from a temple by the river'] },
      { type: 'short', q: 'How did the soldiers feel after they heard the poem?', answer: 'They felt very brave.', accept: ['brave', 'very brave', 'They felt brave.'] },
    ],
    makeQuestion: [
      { answer: 'A big Song army came in 1076.', question: 'What happened in 1076?', hint: 'What happened …?', accept: ['What came in 1076?', 'Who came in 1076?'] },
      { answer: 'They waited on the south bank of the river.', question: 'Where did the soldiers wait?', hint: 'Where did …?', accept: ['Where did they wait?', 'Where did Ly Thuong Kiet and his soldiers wait?'] },
      { answer: 'They built it of earth and wood.', question: 'What did they build the wall of?', hint: 'What … of?', accept: ['What was the wall made of?', 'What did they build it of?'] },
      { answer: 'No, they could not.', question: 'Could the enemy cross the river?', hint: 'Could …?', accept: ['Could they cross the river?', 'Could the enemy cross it?'] },
      { answer: 'It read the poem one night.', question: 'When did the voice read the poem?', hint: 'When did …?', accept: ['When did the voice read a poem?', 'When did it read the poem?'] },
      { answer: 'Because the poem made them feel brave.', question: 'Why did the soldiers fight harder?', hint: 'Why …?', accept: ['Why did they fight harder?', 'Why did the soldiers fight even harder?'] },
      { answer: 'They will lose.', question: 'What will happen to the enemies?', hint: 'What will …?', accept: ['What will happen if enemies come here?', 'What will happen to enemies?'] },
      { answer: 'The Song army went home in 1077.', question: 'When did the Song army go home?', hint: 'When …?', accept: ['When did the enemy go home?', 'When did they go home?'] },
    ],
    dictation: [
      'In 1076, a big Song army came from the north.',
      'The enemy tried to cross the river many times, but they could not.',
      'If enemies come here, they will lose.',
    ],
    reorder: [
      { words: ['will', 'enemies', 'The', 'lose'], answer: 'The enemies will lose.' },
      { words: ['read', 'voice', 'a', 'The', 'poem'], answer: 'The voice read a poem.' },
    ],
    rewrite: [
      { prompt: 'The enemy will cross this river. (not)', answer: 'The enemy will not cross this river.', accept: ["The enemy won't cross this river."], instructionVi: 'Viết lại câu ở dạng phủ định.' },
      { prompt: 'The soldiers build a strong wall. (In 1076)', answer: 'In 1076, the soldiers built a strong wall.', accept: ['In 1076 the soldiers built a strong wall.', 'The soldiers built a strong wall in 1076.'], instructionVi: 'Viết lại câu ở quá khứ, thêm cụm từ trong ngoặc.' },
    ],
  },
  // 125
  {
    id: 'en-125', no: 125, level: 4, pack: 'vietsu',
    title: 'The Boy Outside the Classroom',
    topic: 'Nguyễn Hiền nghe lỏm bài, đỗ trạng nguyên năm 1247',
    grammar: {
      point: 'Quá khứ tiếp diễn với while / when',
      explainVi: 'Quá khứ tiếp diễn (was / were + V-ing) tả việc đang diễn ra ở một lúc trong quá khứ. "While" nối hai việc đang diễn ra cùng lúc (cả hai đều dùng V-ing). "When" + quá khứ đơn chỉ một việc ngắn xảy ra chen vào giữa việc đang diễn ra.',
      pattern: 'While + S + was / were + V-ing, S + was / were + V-ing …   S + was / were + V-ing + when + S + V2 …',
      examples: ['While the other children were studying, Hien was listening at the window.', 'The teacher was asking a question when Hien answered.', 'He was standing outside when it started to rain.'],
    },
    text: `Nguyen Hien lived about eight hundred years ago. His family was very poor, so he could not go to school. But he loved learning.

Every day, while the other children were studying inside, Hien was standing at the window. He was listening to the teacher very carefully. He had no paper, so he wrote on the ground with a stick.

One day, the teacher was asking the class a difficult question. Nobody could answer it. Suddenly, the boy at the window gave the right answer. The teacher was very surprised, and he let Hien study in the class.

In 1247, when Hien was only twelve or thirteen, he came first in the king's exam. He became the youngest trang nguyen in our history.`,
    vocab: [
      { word: 'poor', vi: 'nghèo', emoji: '🪙', example: 'His family was very poor.' },
      { word: 'learning', vi: 'việc học', emoji: '📚', example: 'He loved learning.' },
      { word: 'carefully', vi: 'chăm chú, cẩn thận', emoji: '👂', example: 'He was listening very carefully.' },
      { word: 'stick', vi: 'que, cành cây', emoji: '🥢', example: 'He wrote on the ground with a stick.' },
      { word: 'suddenly', vi: 'bỗng nhiên, đột nhiên', emoji: '⚡', example: 'Suddenly, the boy gave the right answer.' },
      { word: 'surprised', vi: 'ngạc nhiên', emoji: '😮', example: 'The teacher was very surprised.' },
      { word: 'exam', vi: 'kì thi', emoji: '📝', example: 'He came first in the exam.' },
      { word: 'youngest', vi: 'trẻ nhất, nhỏ tuổi nhất', emoji: '👦', example: 'He became the youngest trang nguyen.' },
    ],
    questions: [
      { type: 'mc', q: 'Where was Hien when the other children were studying?', options: ['at home', 'at the window', 'in the classroom'], answer: 1, listen: true },
      { type: 'tf', q: 'Hien wrote in a new notebook.', answer: false, listen: true },
      { type: 'short', q: 'Why could Hien not go to school?', answer: 'Because his family was very poor.', accept: ['His family was very poor.', 'His family was poor.', 'Because his family was poor.'] },
      { type: 'short', q: 'What did the teacher do after Hien gave the right answer?', answer: 'He let Hien study in the class.', accept: ['He let him study in the class.', 'He let Hien study in class.', 'He let Hien study.'] },
      { type: 'mc', q: 'Why was the teacher surprised?', options: ['Because a boy outside knew the answer', 'Because Hien was late', 'Because the class was noisy'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He lived about eight hundred years ago.', question: 'When did Nguyen Hien live?', hint: 'When did …?', accept: ['When did Hien live?', 'When did he live?'] },
      { answer: 'Because his family was very poor.', question: 'Why could Hien not go to school?', hint: 'Why …?', accept: ["Why couldn't Hien go to school?", "Why couldn't he go to school?", 'Why could he not go to school?'] },
      { answer: 'They were studying inside.', question: 'What were the other children doing?', hint: 'What were …?', accept: ['What were the children doing?'] },
      { answer: 'He was standing at the window.', question: 'Where was Hien standing?', hint: 'Where was …?', accept: ['Where was he standing?', 'Where was Hien?'] },
      { answer: 'No, he did not. He had no paper.', question: 'Did Hien have any paper?', hint: 'Did …?', accept: ['Did Hien have paper?', 'Did he have any paper?', 'Did he have paper?'] },
      { answer: 'He wrote with a stick.', question: 'What did he write with?', hint: 'What did …?', accept: ['What did Hien write with?'] },
      { answer: 'The boy at the window gave the right answer.', question: 'Who gave the right answer?', hint: 'Who …?', accept: ['Who answered the question?'] },
      { answer: 'He was only twelve or thirteen.', question: 'How old was Hien in 1247?', hint: 'How old …?', accept: ['How old was he in 1247?', 'How old was Hien when he came first?', 'How old was he?'] },
    ],
    dictation: [
      'His family was very poor, so he could not go to school.',
      'He was listening to the teacher very carefully.',
      'The teacher was very surprised, and he let Hien study in the class.',
    ],
    reorder: [
      { words: ['was', 'at', 'the', 'Hien', 'window', 'standing'], answer: 'Hien was standing at the window.' },
      { words: ['studying', 'children', 'The', 'were', 'inside'], answer: 'The children were studying inside.' },
    ],
    rewrite: [
      { prompt: 'The children studied inside. Hien listened outside. (While)', answer: 'While the children were studying inside, Hien was listening outside.', accept: ['While the children were studying inside Hien was listening outside.', 'Hien was listening outside while the children were studying inside.'], instructionVi: 'Nối hai câu bằng "While", dùng quá khứ tiếp diễn.' },
      { prompt: 'The teacher asked a question. Hien answered. (was asking … when)', answer: 'The teacher was asking a question when Hien answered.', instructionVi: 'Nối hai câu: việc đang diễn ra dùng quá khứ tiếp diễn, việc chen vào dùng "when" + quá khứ đơn.' },
    ],
  },
  // 126
  {
    id: 'en-126', no: 126, level: 4, pack: 'vietsu',
    title: 'The Orange in His Hand',
    topic: 'Trần Quốc Toản bóp nát quả cam, lá cờ sáu chữ vàng',
    grammar: {
      point: 'too … to; so that; mệnh đề quan hệ who',
      explainVi: '"too + tính từ + to + động từ" nghĩa là quá … nên không thể làm gì (too young to come in: quá nhỏ, không được vào). "so that + S + could / can …" nói mục đích (để mà). "who" nối thêm thông tin về người, đứng ngay sau danh từ chỉ người: a young lord who was only fifteen.',
      pattern: 'S + be + too + adj + to + V   … so that + S + could + V   N (người) + who + V …',
      examples: ['He was too young to come in.', 'The king called a meeting so that the leaders could plan the fight.', 'He found young men who wanted to fight.'],
    },
    text: `In 1282, a huge Yuan army was getting ready to attack Dai Viet. King Tran Nhan Tong called a meeting at Binh Than so that the leaders could plan the fight.

Tran Quoc Toan was a young lord who was fifteen or sixteen. He wanted to join the meeting, but the guards said he was too young to come in. After the meeting, the king gave him an orange. While Quoc Toan was thinking about his country, he crushed the orange in his hand without noticing.

He went home and found about a thousand men who wanted to fight. He made a flag with six words in gold: "Destroy the strong enemy, repay the king's kindness." They fought bravely against the Yuan army.`,
    vocab: [
      { word: 'huge', vi: 'rất lớn, khổng lồ', emoji: '🐘', example: 'A huge army was getting ready to attack.' },
      { word: 'meeting', vi: 'cuộc họp, hội nghị', emoji: '🪑', example: 'The king called a meeting at Binh Than.' },
      { word: 'guard', vi: 'lính gác', emoji: '💂', example: 'The guards said he was too young.' },
      { word: 'orange', vi: 'quả cam', emoji: '🍊', example: 'The king gave him an orange.' },
      { word: 'crush', vi: 'bóp nát, làm nát', emoji: '✊', example: 'He crushed the orange in his hand.' },
      { word: 'notice', vi: 'để ý, nhận ra', emoji: '👀', example: 'He crushed it without noticing.' },
      { word: 'repay', vi: 'đền đáp, trả ơn', emoji: '🙏', example: 'Repay the king\'s kindness.' },
      { word: 'gold', vi: 'vàng; màu vàng kim', emoji: '🥇', example: 'The flag had six words in gold.' },
    ],
    questions: [
      { type: 'tf', q: 'The guards let Quoc Toan come into the meeting.', answer: false, listen: true },
      { type: 'mc', q: 'What did the king give the boy?', options: ['a sword', 'an orange', 'a flag'], answer: 1, listen: true },
      { type: 'short', q: 'Why could Quoc Toan not join the meeting?', answer: 'Because he was too young.', accept: ['He was too young.', 'He was too young to come in.', 'Because he was too young to come in.'] },
      { type: 'short', q: 'How many words were on his flag?', answer: 'There were six words on his flag.', accept: ['six', 'six words', 'Six words.'] },
      { type: 'mc', q: 'Why did he crush the orange without noticing?', options: ['Because he was hungry', 'Because he was thinking hard about his country', 'Because he did not like oranges'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'He called a meeting at Binh Than.', question: 'Where did the king call a meeting?', hint: 'Where …?', accept: ['Where did King Tran Nhan Tong call a meeting?'] },
      { answer: 'So that the leaders could plan the fight.', question: 'Why did the king call a meeting?', hint: 'Why …?', accept: ['Why did King Tran Nhan Tong call a meeting?', 'Why did the king call the meeting?'] },
      { answer: 'He was fifteen or sixteen.', question: 'How old was Tran Quoc Toan?', hint: 'How old …?', accept: ['How old was Quoc Toan?', 'How old was he?'] },
      { answer: 'No, he could not. He was too young to come in.', question: 'Could Quoc Toan join the meeting?', hint: 'Could …?', accept: ['Could he join the meeting?', 'Could Tran Quoc Toan join the meeting?', 'Could he come in?'] },
      { answer: 'He was thinking about his country.', question: 'What was Quoc Toan thinking about?', hint: 'What was …?', accept: ['What was he thinking about?'] },
      { answer: 'He found about a thousand men.', question: 'How many men did he find?', hint: 'How many …?', accept: ['How many men did Quoc Toan find?'] },
      { answer: 'The words were "Destroy the strong enemy, repay the king\'s kindness."', question: 'What words were on the flag?', hint: 'What words …?', accept: ['What were the words on the flag?', 'What did the flag say?'] },
      { answer: 'The guards said he was too young.', question: 'Who said he was too young?', hint: 'Who …?', accept: ['Who said he was too young to come in?'] },
    ],
    dictation: [
      'He wanted to join the meeting, but the guards said he was too young to come in.',
      'While Quoc Toan was thinking about his country, he crushed the orange in his hand without noticing.',
      'He went home and found about a thousand men who wanted to fight.',
    ],
    reorder: [
      { words: ['too', 'He', 'young', 'was', 'to', 'in', 'come'], answer: 'He was too young to come in.' },
      { words: ['a', 'lord', 'He', 'who', 'young', 'loved', 'his', 'country', 'was'], answer: 'He was a young lord who loved his country.' },
    ],
    rewrite: [
      { prompt: 'He was very young. He could not come in. (too … to)', answer: 'He was too young to come in.', instructionVi: 'Nối hai câu bằng "too … to".' },
      { prompt: 'He found about a thousand men. They wanted to fight. (who)', answer: 'He found about a thousand men who wanted to fight.', instructionVi: 'Nối hai câu bằng "who".' },
    ],
  },
  // 127
  {
    id: 'en-127', no: 127, level: 4, pack: 'vietsu',
    title: 'The Sword and the Golden Turtle',
    topic: 'Lê Lợi, khởi nghĩa Lam Sơn và sự tích hồ Hoàn Kiếm (truyền thuyết)',
    grammar: {
      point: 'Bị động hiện tại đơn / quá khứ đơn (is / was + V3); mệnh đề which',
      explainVi: 'Câu bị động nói sự vật chịu tác động: is / are + V3 (hiện tại), was / were + V3 (quá khứ); người làm (nếu cần) đứng sau "by". "which" nối thêm thông tin về vật, đứng ngay sau danh từ chỉ vật: an uprising which lasted ten years.',
      pattern: 'S + is / was + V3 (+ by …)   N (vật) + which + V …',
      examples: ['Our country was ruled by the Ming army.', 'The lake is visited by many people every day.', 'Le Loi started an uprising which lasted ten years.'],
    },
    text: `About six hundred years ago, our country was ruled by the Ming army. In 1418, Le Loi started the Lam Son uprising, which lasted almost ten years. His soldiers were often hungry, but they never gave up. In 1427, the Ming army was defeated, and in 1428 Le Loi became king.

An old story says that Le Loi was given a magic sword which helped him win. Later, while the king was sailing on a lake in Thang Long, a golden turtle came up. It asked for the sword back. The king returned it, and the turtle disappeared into the water.

Today the lake is called Ho Hoan Kiem, which means "Lake of the Returned Sword". It is visited by many people every day.`,
    vocab: [
      { word: 'rule', vi: 'cai trị', emoji: '👑', example: 'Our country was ruled by the Ming army.' },
      { word: 'uprising', vi: 'cuộc khởi nghĩa', emoji: '✊', example: 'Le Loi started an uprising in 1418.' },
      { word: 'defeat', vi: 'đánh bại', emoji: '🏳️', example: 'The Ming army was defeated in 1427.' },
      { word: 'magic', vi: 'thần, phép thuật', emoji: '✨', example: 'Le Loi was given a magic sword.' },
      { word: 'sword', vi: 'thanh gươm, thanh kiếm', emoji: '🗡️', example: 'The turtle asked for the sword back.' },
      { word: 'turtle', vi: 'con rùa', emoji: '🐢', example: 'A big golden turtle came up.' },
      { word: 'disappear', vi: 'biến mất', emoji: '💨', example: 'The turtle disappeared into the water.' },
      { word: 'lake', vi: 'cái hồ', emoji: '🏞️', example: 'The lake is visited by many people.' },
    ],
    questions: [
      { type: 'mc', q: 'When did Le Loi start the uprising?', options: ['in 1418', 'in 1427', 'in 1428'], answer: 0, listen: true },
      { type: 'tf', q: 'The soldiers gave up because they were hungry.', answer: false, listen: true },
      { type: 'short', q: 'Who was the country ruled by at that time?', answer: 'It was ruled by the Ming army.', accept: ['the Ming army', 'by the Ming army', 'the Ming'] },
      { type: 'short', q: 'What does "Ho Hoan Kiem" mean?', answer: 'It means "Lake of the Returned Sword".', accept: ['Lake of the Returned Sword', 'the Lake of the Returned Sword'] },
      { type: 'mc', q: 'Why is the story about the turtle called "an old story"?', options: ['Because it is a legend, not a real event', 'Because the turtle was very old', 'Because Le Loi wrote it'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He started the Lam Son uprising.', question: 'What did Le Loi start in 1418?', hint: 'What did …?', accept: ['What did he start in 1418?'] },
      { answer: 'It was ruled by the Ming army.', question: 'Who was the country ruled by?', hint: 'Who … by?', accept: ['Who ruled the country?', 'Who was our country ruled by?', 'Who was it ruled by?'] },
      { answer: 'It lasted almost ten years.', question: 'How long did the uprising last?', hint: 'How long …?', accept: ['How long did it last?'] },
      { answer: 'No, they did not. They never gave up.', question: 'Did the soldiers give up?', hint: 'Did …?', accept: ['Did his soldiers give up?', 'Did they give up?'] },
      { answer: 'The Ming army was defeated in 1427.', question: 'When was the Ming army defeated?', hint: 'When was …?' },
      { answer: 'He was sailing on a lake in Thang Long.', question: 'Where was the king sailing?', hint: 'Where was …?', accept: ['Where was Le Loi sailing?', 'Where was he sailing?'] },
      { answer: 'Because it wanted the sword back.', question: 'Why did the turtle come up?', hint: 'Why …?', accept: ['Why did the golden turtle come up?'] },
      { answer: 'It is visited by many people every day.', question: 'Who is the lake visited by?', hint: 'Who … by?', accept: ['Who visits the lake?', 'Who is it visited by?'] },
    ],
    dictation: [
      'About six hundred years ago, our country was ruled by the Ming army.',
      'An old story says that Le Loi was given a magic sword which helped him win.',
      'It is visited by many people every day.',
    ],
    reorder: [
      { words: ['was', 'The', 'army', 'Ming', 'defeated'], answer: 'The Ming army was defeated.' },
      { words: ['by', 'visited', 'lake', 'people', 'The', 'many', 'is'], answer: 'The lake is visited by many people.' },
    ],
    rewrite: [
      { prompt: 'Many people visit the lake every day. (The lake)', answer: 'The lake is visited by many people every day.', instructionVi: 'Viết lại câu ở dạng bị động, bắt đầu bằng từ trong ngoặc.' },
      { prompt: 'Le Loi had a magic sword. It helped him win. (which)', answer: 'Le Loi had a magic sword which helped him win.', accept: ['Le Loi had a magic sword that helped him win.'], instructionVi: 'Nối hai câu bằng "which".' },
    ],
  },
  // 128
  {
    id: 'en-128', no: 128, level: 5, pack: 'vietsu',
    title: 'Kindness After Victory',
    topic: 'Nguyễn Trãi, Bình Ngô đại cáo; cấp thuyền, ngựa cho quân Minh về nước (1427–1428)',
    grammar: {
      point: 'Although; câu tường thuật (said / told … that)',
      explainVi: '"Although + mệnh đề" (mặc dù …) nối hai ý trái ngược nhau trong một câu; không dùng thêm "but". Câu tường thuật kể lại lời người khác: said (that) … / told + người + (that) …, động từ lùi một thì (can → could, should giữ nguyên, have → had).',
      pattern: 'Although + S + V …, S + V …   S + said / told + O + (that) + S + V (lùi thì) …',
      examples: ['Although they kept him for years, he never worked for them.', 'He told them that they could not win.', 'Some soldiers said that the enemy should be punished.'],
    },
    text: `Nguyen Trai was a great scholar and poet. Although the Ming kept him in the capital for years, he did not help them. Later, he escaped and joined Le Loi.

He became Le Loi's adviser. In his letters to the Ming generals, he told them that they could not win and should go home.

After the victory in 1427, some soldiers said that the enemy should be punished, but Le Loi and Nguyen Trai chose kindness. Although the Ming soldiers had attacked our land, they were given boats, horses and food so that they could go home safely.

In 1428, he wrote Binh Ngo Dai Cao, a famous declaration of victory. It said that our country had its own land, customs and kings. Students still learn it today.`,
    vocab: [
      { word: 'scholar', vi: 'nhà nho, học giả', emoji: '🧑‍🏫', example: 'Nguyen Trai was a great scholar.' },
      { word: 'escape', vi: 'trốn thoát', emoji: '🏃', example: 'Later, he escaped and joined Le Loi.' },
      { word: 'adviser', vi: 'quân sư, người cố vấn', emoji: '🧠', example: 'He became Le Loi\'s adviser.' },
      { word: 'punish', vi: 'trừng phạt', emoji: '⚖️', example: 'Some soldiers said the enemy should be punished.' },
      { word: 'kindness', vi: 'lòng nhân hậu, lòng tốt', emoji: '💛', example: 'Le Loi and Nguyen Trai chose kindness.' },
      { word: 'safely', vi: 'an toàn', emoji: '🛶', example: 'They could go home safely.' },
      { word: 'victory', vi: 'chiến thắng', emoji: '🏆', example: 'It was a famous declaration of victory.' },
      { word: 'custom', vi: 'phong tục', emoji: '🎎', example: 'Our country had its own land, customs and kings.' },
    ],
    questions: [
      { type: 'mc', q: 'What did Nguyen Trai become?', options: ["Le Loi's adviser", 'a Ming general', 'a king'], answer: 0, listen: true },
      { type: 'tf', q: 'The Ming soldiers were given boats, horses and food.', answer: true, listen: true },
      { type: 'short', q: 'What did Nguyen Trai tell the Ming generals in his letters?', answer: 'He told them that they could not win and that they should go home.', accept: ['They could not win.', 'They should go home.', "He told them that they couldn't win.", 'He told them to go home.'] },
      { type: 'short', q: 'What did Nguyen Trai write in 1428?', answer: 'He wrote Binh Ngo Dai Cao.', accept: ['Binh Ngo Dai Cao', 'a declaration of victory', 'a famous declaration of victory'] },
      { type: 'mc', q: 'Why did Le Loi and Nguyen Trai give the enemy boats and horses?', options: ['Because they wanted to show kindness and end the war', 'Because they were afraid of the Ming', 'Because the boats were old'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He was a great scholar and poet.', question: 'Who was Nguyen Trai?', hint: 'Who …?' },
      { answer: 'No, he did not help them.', question: 'Did Nguyen Trai help the Ming?', hint: 'Did …?', accept: ['Did he help the Ming?', 'Did he help them?', 'Did Nguyen Trai help them?', 'Did Nguyen Trai help the Ming rulers?'] },
      { answer: 'He became Le Loi\'s adviser.', question: 'What did Nguyen Trai become?', hint: 'What did …?', accept: ['What did he become?'] },
      { answer: 'He told them that they should go home.', question: 'What did he tell the Ming generals?', hint: 'What did … tell …?', accept: ['What did Nguyen Trai tell the Ming generals?', 'What did he tell them?'] },
      { answer: 'Some soldiers said that the enemy should be punished.', question: 'What did some soldiers say?', hint: 'What … say?', accept: ["What did some of Le Loi's soldiers say?", 'What did the soldiers say?'] },
      { answer: 'So that they could go home safely.', question: 'Why were the Ming soldiers given boats and horses?', hint: 'Why …?', accept: ['Why were they given boats and horses?', 'Why were the Ming soldiers given boats, horses and food?'] },
      { answer: 'He wrote it in 1428.', question: 'When did Nguyen Trai write Binh Ngo Dai Cao?', hint: 'When …?', accept: ['When did he write it?', 'When did he write Binh Ngo Dai Cao?'] },
      { answer: 'Students still learn it today.', question: 'Who still learns it today?', hint: 'Who …?', accept: ['Who learns it today?', 'Who still learns it?'] },
    ],
    dictation: [
      'Later, he escaped and joined Le Loi.',
      'In his letters to the Ming generals, he told them that they could not win and should go home.',
      'It said that our country had its own land, customs and kings.',
    ],
    reorder: [
      { words: ['he', 'told', 'that', 'them', 'they', 'could', 'not', 'win'], answer: 'He told them that they could not win.' },
      { words: ['Although', 'was', 'he', 'kept', 'there,', 'he', 'escaped'], answer: 'Although he was kept there, he escaped.' },
    ],
    rewrite: [
      { prompt: '"You cannot win," Nguyen Trai told the Ming generals. (Nguyen Trai told the Ming generals that …)', answer: 'Nguyen Trai told the Ming generals that they could not win.', accept: ["Nguyen Trai told the Ming generals that they couldn't win.", 'Nguyen Trai told the Ming generals they could not win.'], instructionVi: 'Viết lại thành câu tường thuật, nhớ lùi thì.' },
      { prompt: 'The Ming soldiers had attacked our land, but they were given boats. (Although)', answer: 'Although the Ming soldiers had attacked our land, they were given boats.', accept: ['Although the Ming soldiers had attacked our land they were given boats.'], instructionVi: 'Viết lại câu, bắt đầu bằng "Although" và bỏ "but".' },
    ],
  },
  // 129
  {
    id: 'en-129', no: 129, level: 5, pack: 'vietsu',
    title: 'How to Weigh an Elephant',
    topic: 'Lương Thế Vinh cân voi bằng thuyền (giai thoại), ông giỏi toán',
    grammar: {
      point: 'Câu bị động; câu điều kiện loại 1',
      explainVi: 'Kể các bước làm việc mà không cần nói ai làm, dùng bị động: was / were + V3 (was led, was drawn, were weighed). Câu điều kiện loại 1 nói điều có thật sẽ xảy ra nếu điều kiện xảy ra: If + hiện tại đơn, S + will + V.',
      pattern: 'S + was / were + V3 …   If + S + V (hiện tại), S + will + V …',
      examples: ['The elephant was led onto a boat.', 'The stones were weighed one by one.', 'If we put the elephant on a boat, the boat will go down.'],
    },
    text: `Luong The Vinh loved maths. In 1463, he became trang nguyen. His maths book, Dai Thanh Toan Phap, was used by students for hundreds of years.

There is a famous folk story about him. One day, a foreign visitor asked how heavy an elephant was. Nobody could answer, because no scale was big enough. Luong The Vinh said, "If we put the elephant on a boat, the boat will go down."

The elephant was led onto a boat, and a line was drawn at the water level. Then the elephant was taken off, and the boat was filled with stones until the water reached the line again. Finally, the stones were weighed one by one. "If you add the numbers together, you will know the elephant's weight," he said.`,
    vocab: [
      { word: 'weigh', vi: 'cân', emoji: '⚖️', example: 'The stones were weighed one by one.' },
      { word: 'add', vi: 'cộng (các số) lại', emoji: '➕', example: 'Add the numbers together.' },
      { word: 'folk story', vi: 'giai thoại, truyện dân gian', emoji: '📖', example: 'There is a famous folk story about him.' },
      { word: 'foreign', vi: '(người) nước ngoài', emoji: '🌏', example: 'A foreign visitor asked a question.' },
      { word: 'scale', vi: 'cái cân', emoji: '⚖️', example: 'No scale was big enough.' },
      { word: 'level', vi: 'mức, mực (nước)', emoji: '📏', example: 'A line was drawn at the water level.' },
      { word: 'stone', vi: 'hòn đá', emoji: '🪨', example: 'The boat was filled with stones.' },
      { word: 'weight', vi: 'cân nặng, trọng lượng', emoji: '🐘', example: 'You will know the elephant\'s weight.' },
    ],
    questions: [
      { type: 'mc', q: 'When did Luong The Vinh become trang nguyen?', options: ['in 1247', 'in 1463', 'in 1789'], answer: 1, listen: true },
      { type: 'tf', q: 'There was a scale big enough for the elephant.', answer: false, listen: true },
      { type: 'short', q: 'What was the elephant led onto?', answer: 'It was led onto a boat.', accept: ['a boat', 'onto a boat', 'the boat'] },
      { type: 'short', q: 'What was the boat filled with?', answer: 'It was filled with stones.', accept: ['stones', 'with stones'] },
      { type: 'mc', q: 'Why did the stones have the same weight as the elephant?', options: ['Because the boat went down to the same line', 'Because the stones were very big', 'Because the elephant was small'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He loved maths.', question: 'What did Luong The Vinh love?', hint: 'What did …?', accept: ['What did he love?'] },
      { answer: 'It was used by students for hundreds of years.', question: 'Who was his maths book used by?', hint: 'Who … by?', accept: ['Who was the book used by?', 'Who used his maths book?', 'Who used the book?'] },
      { answer: 'Because no scale was big enough.', question: 'Why could nobody answer?', hint: 'Why …?', accept: ['Why could nobody answer the question?', "Why couldn't anybody answer?"] },
      { answer: 'Yes, it will. The boat will go down.', question: 'Will the boat go down if we put the elephant on it?', hint: 'Will …?', accept: ['Will the boat go down?', 'Will the boat go down if we put the elephant on a boat?'] },
      { answer: 'It was drawn at the water level.', question: 'Where was the line drawn?', hint: 'Where was …?', accept: ['Where was a line drawn?'] },
      { answer: 'It was filled with stones.', question: 'What was the boat filled with?', hint: 'What was …?' },
      { answer: 'You will know the elephant\'s weight.', question: 'What will you know if you add the numbers together?', hint: 'What will …?', accept: ['What will happen if you add the numbers together?', 'What will you know?'] },
      { answer: 'A foreign visitor asked the question.', question: 'Who asked how heavy an elephant was?', hint: 'Who …?', accept: ['Who asked the question?'] },
    ],
    dictation: [
      'One day, a foreign visitor asked how heavy an elephant was.',
      'Nobody could answer, because no scale was big enough.',
      'The elephant was led onto a boat, and a line was drawn at the water level.',
    ],
    reorder: [
      { words: ['was', 'The', 'onto', 'elephant', 'a', 'led', 'boat'], answer: 'The elephant was led onto a boat.' },
      { words: ['If', 'you', 'add', 'the', 'numbers,', 'you', 'will', 'know'], answer: 'If you add the numbers, you will know.' },
    ],
    rewrite: [
      { prompt: 'They weighed the stones one by one. (The stones)', answer: 'The stones were weighed one by one.', instructionVi: 'Viết lại câu ở dạng bị động, bắt đầu bằng từ trong ngoặc.' },
      { prompt: 'Put the elephant on the boat. The boat goes down. (If we …, … will …)', answer: 'If we put the elephant on the boat, the boat will go down.', accept: ['If we put the elephant on the boat the boat will go down.', 'The boat will go down if we put the elephant on the boat.'], instructionVi: 'Viết lại thành câu điều kiện loại 1, dùng gợi ý trong ngoặc.' },
    ],
  },
  // 130
  {
    id: 'en-130', no: 130, level: 5, pack: 'vietsu',
    title: 'The Spring Victory',
    topic: 'Quang Trung hành quân thần tốc, chiến thắng Ngọc Hồi – Đống Đa Tết Kỷ Dậu 1789',
    grammar: {
      point: 'Quá khứ hoàn thành (had + V3); by the time',
      explainVi: 'Quá khứ hoàn thành (had + V3) nói việc đã xong trước một lúc hay một việc khác trong quá khứ. "By the time + quá khứ đơn, S + had + V3": tới lúc việc này xảy ra thì việc kia đã xong rồi. "By + mốc thời gian" (by the fifth day) cũng hay đi với had + V3.',
      pattern: 'By the time + S + V2, S + had + V3 …   By + thời điểm, S + had + V3 …',
      examples: ['By the time Quang Trung rode into Thang Long, the Qing army had run away.', 'By the fifth day of Tet, they had won.', 'He had kept his promise.'],
    },
    text: `In late 1788, a huge Qing army took Thang Long. Far away in Phu Xuan, Nguyen Hue made himself Emperor Quang Trung and marched his army north at an amazing speed.

Before the battle, the soldiers celebrated Tet early. Quang Trung promised that they would celebrate it again in Thang Long on the seventh day of Tet. By the fifth day of Tet in 1789, they had won at Ngoc Hoi and Dong Da. By the time Quang Trung rode into Thang Long, the Qing army had run away. He had kept his promise, two days early!

People say that he sent a peach branch to Phu Xuan to share the happy news. Today, the Dong Da Festival is held every year on the fifth day of Tet.`,
    vocab: [
      { word: 'march', vi: 'hành quân', emoji: '🥾', example: 'He marched his army north.' },
      { word: 'amazing', vi: 'đáng kinh ngạc', emoji: '🤩', example: 'They marched at an amazing speed.' },
      { word: 'speed', vi: 'tốc độ', emoji: '💨', example: 'The army moved at an amazing speed.' },
      { word: 'celebrate', vi: 'ăn mừng, đón (Tết)', emoji: '🎉', example: 'The soldiers celebrated Tet early.' },
      { word: 'promise', vi: 'hứa; lời hứa', emoji: '🤞', example: 'He had kept his promise.' },
      { word: 'battle', vi: 'trận đánh', emoji: '⚔️', example: 'Before the battle, the soldiers celebrated Tet early.' },
      { word: 'peach', vi: 'cây đào, hoa đào', emoji: '🌸', example: 'He sent a peach branch to Phu Xuan.' },
      { word: 'festival', vi: 'lễ hội', emoji: '🏮', example: 'The Dong Da Festival is held every year.' },
    ],
    questions: [
      { type: 'mc', q: 'Where was Nguyen Hue when the Qing army took Thang Long?', options: ['in Thang Long', 'in Phu Xuan', 'in Ngoc Hoi'], answer: 1, listen: true },
      { type: 'tf', q: 'The soldiers celebrated Tet early, before the battle.', answer: true, listen: true },
      { type: 'short', q: 'When had they won at Ngoc Hoi and Dong Da?', answer: 'They had won by the fifth day of Tet in 1789.', accept: ['by the fifth day of Tet', 'the fifth day of Tet', 'by the fifth day of Tet in 1789'] },
      { type: 'short', q: 'What had the Qing army done by the time Quang Trung rode into Thang Long?', answer: 'The Qing army had run away.', accept: ['It had run away.', 'They had run away.', 'run away', 'had run away'] },
      { type: 'mc', q: 'Why does the story say "two days early"?', options: ['Because he promised the seventh day but arrived on the fifth', 'Because Tet came early that year', 'Because the army was late'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'A huge Qing army came and took Thang Long.', question: 'What happened in late 1788?', hint: 'What happened …?', accept: ['What happened in 1788?'] },
      { answer: 'He made himself Emperor Quang Trung.', question: 'What did Nguyen Hue make himself?', hint: 'What did …?', accept: ['What did he make himself?'] },
      { answer: 'He was in Phu Xuan.', question: 'Where was Nguyen Hue?', hint: 'Where …?', accept: ['Where was Nguyen Hue in 1788?', 'Where was he?'] },
      { answer: 'Because Quang Trung wanted them to celebrate before the battle.', question: 'Why did the soldiers celebrate Tet early?', hint: 'Why …?', accept: ['Why did they celebrate Tet early?'] },
      { answer: 'Yes, he had. He had kept his promise, two days early.', question: 'Had Quang Trung kept his promise?', hint: 'Had …?', accept: ['Had he kept his promise?', 'Did Quang Trung keep his promise?', 'Did he keep his promise?'] },
      { answer: 'They had won by the fifth day of Tet.', question: 'When had they won the battles?', hint: 'When had …?', accept: ['When had they won?', 'By when had they won the battles?'] },
      { answer: 'He sent a peach branch.', question: 'What did he send to Phu Xuan?', hint: 'What did …?', accept: ['What did Quang Trung send to Phu Xuan?'] },
      { answer: 'It is held on the fifth day of Tet.', question: 'When is the Dong Da Festival held?', hint: 'When is …?', accept: ['When is the festival held?', 'When is it held?'] },
    ],
    dictation: [
      'Before the battle, the soldiers celebrated Tet early.',
      'By the time Quang Trung rode into Thang Long, the Qing army had run away.',
      'Today, the Dong Da Festival is held every year on the fifth day of Tet.',
    ],
    reorder: [
      { words: ['had', 'He', 'his', 'kept', 'promise'], answer: 'He had kept his promise.' },
      { words: ['the', 'army', 'had', 'away', 'run', 'Qing'], answer: 'The Qing army had run away.' },
    ],
    rewrite: [
      { prompt: 'The Qing army ran away. Then Quang Trung rode into Thang Long. (By the time)', answer: 'By the time Quang Trung rode into Thang Long, the Qing army had run away.', accept: ['By the time Quang Trung rode into Thang Long the Qing army had run away.'], instructionVi: 'Nối hai câu bằng "By the time", việc xảy ra trước dùng had + V3.' },
      { prompt: 'They won the battles. Then the fifth day of Tet came. (By the fifth day of Tet)', answer: 'By the fifth day of Tet, they had won the battles.', accept: ['By the fifth day of Tet they had won the battles.', 'They had won the battles by the fifth day of Tet.'], instructionVi: 'Viết lại câu bằng quá khứ hoàn thành, bắt đầu bằng cụm từ trong ngoặc.' },
    ],
  },
];
