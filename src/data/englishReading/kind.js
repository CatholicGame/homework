// Bộ chủ đề 💛 Chuyện nhân văn (kind), bài 111–120. Xem docs/tieng-anh/thiet-ke-bai-doc.md §10.
// Kể lại bằng lời của mình, giữ đúng chi tiết thật về nhân vật thật.
export default [
  // 111
  {
    id: 'en-111', no: 111, level: 1, pack: 'kind',
    title: 'The Lion and the Mouse',
    topic: 'Ngụ ngôn Aesop: chuột nhỏ cứu sư tử',
    grammar: {
      point: "can / can't; tính từ big / small / strong",
      explainVi: 'Dùng "can" + động từ để nói ai đó làm được việc gì, "can\'t" (= cannot) khi không làm được. Sau can luôn là động từ nguyên mẫu, không thêm -s. Tính từ (big, small, strong, kind) đứng sau "is" hoặc đứng trước danh từ (small teeth).',
      pattern: "S + can / can't + động từ.  S + is + tính từ.",
      examples: ['I can help you.', "He can't get out.", 'The lion is big and strong.'],
    },
    text: `This is a lion. He is big and strong. This is a mouse. She is small.

The lion is sleeping under a tree. The mouse is running on his nose. The lion is angry. "I can eat you!" "Please don't eat me!" says the mouse. "I can help you." The lion is laughing. "You are small. You can't help me!" But he is kind. The mouse can go.

Now the lion is in a net. He can't get out. The mouse is biting the net with her small teeth. The lion is free. "Thank you, friend!"`,
    vocab: [
      { word: 'lion', vi: 'con sư tử', emoji: '🦁', example: 'The lion is big and strong.' },
      { word: 'mouse', vi: 'con chuột', emoji: '🐭', example: 'The mouse is small.' },
      { word: 'strong', vi: 'khoẻ', emoji: '💪', example: 'My dad is strong.' },
      { word: 'angry', vi: 'tức giận', emoji: '😠', example: 'The lion is angry.' },
      { word: 'net', vi: 'cái lưới', emoji: '🕸️', example: 'The lion is in a net.' },
      { word: 'teeth', vi: 'răng (nhiều cái)', emoji: '🦷', example: 'The mouse has got small teeth.' },
      { word: 'kind', vi: 'tốt bụng', emoji: '💛', example: 'Grandma is kind.' },
      { word: 'free', vi: 'được tự do', emoji: '🕊️', example: 'The bird is free.' },
    ],
    questions: [
      { type: 'mc', q: 'Where is the lion sleeping?', options: ['under a tree', 'in a net', 'on a bed'], answer: 0, listen: true },
      { type: 'tf', q: 'The mouse is big.', answer: false, listen: true },
      { type: 'mc', q: 'What is the mouse running on?', options: ['a tree', "the lion's nose", 'a net'], answer: 1 },
      { type: 'tf', q: 'The lion can get out of the net.', answer: false },
      { type: 'mc', q: 'What is the mouse biting?', options: ['the lion', 'a tree', 'the net'], answer: 2 },
    ],
    makeQuestion: [
      { answer: 'He is big and strong.', question: 'What is the lion like?', hint: 'What … like?', accept: ['What is he like?'] },
      { answer: "No, she isn't. She is small.", question: 'Is the mouse big?', hint: 'Is the mouse …?', accept: ['Is she big?'] },
      { answer: 'He is sleeping under a tree.', question: 'Where is the lion sleeping?', hint: 'Where …?', accept: ['Where is he sleeping?'] },
      { answer: 'Because the mouse is running on his nose.', question: 'Why is the lion angry?', hint: 'Why …?', accept: ['Why is he angry?'] },
      { answer: "No, he can't. He is in a net.", question: 'Can the lion get out?', hint: 'Can …?', accept: ['Can he get out?', 'Can the lion get out of the net?'] },
      { answer: 'She is biting the net.', question: 'What is the mouse doing?', hint: 'What … doing?', accept: ['What is she doing?'] },
      { answer: 'The mouse is biting the net.', question: 'Who is biting the net?', hint: 'Who …?' },
      { answer: 'Yes, he is. The lion is kind.', question: 'Is the lion kind?', hint: 'Is the lion …?', accept: ['Is he kind?'] },
    ],
    dictation: ['He is big and strong.', "He can't get out.", 'The lion is free.'],
    reorder: [
      { words: ["can't", 'He', 'out', 'get'], answer: "He can't get out." },
      { words: ['is', 'mouse', 'The', 'small'], answer: 'The mouse is small.' },
    ],
    rewrite: [
      { prompt: 'The mouse can help the lion. (can\'t)', answer: "The mouse can't help the lion.", accept: ['The mouse cannot help the lion.'], instructionVi: 'Viết lại câu ở dạng phủ định với can\'t.' },
      { prompt: 'The lion can get out. (Can …?)', answer: 'Can the lion get out?', instructionVi: 'Viết lại thành câu hỏi: đưa "Can" lên đầu câu.' },
    ],
  },
  // 112
  {
    id: 'en-112', no: 112, level: 2, pack: 'kind',
    title: 'The Starfish Boy',
    topic: 'Cậu bé ném sao biển về biển: giúp được con nào hay con ấy',
    grammar: {
      point: 'Hiện tại đơn và hiện tại tiếp diễn',
      explainVi: 'Hiện tại đơn (walks, sees) nói thói quen, việc lặp lại: every morning, usually. Hiện tại tiếp diễn (am / is / are + V-ing) nói việc đang xảy ra ngay lúc nói: now, today. Ở hiện tại đơn, chủ ngữ là he / she / the boy thì động từ thêm -s / -es.',
      pattern: 'S + V(s / es) + every morning.  S + am / is / are + V-ing + now.',
      examples: ['An old man walks on the beach every morning.', 'The boy is throwing starfish into the water.', 'Now the man is throwing starfish, too.'],
    },
    text: `Every morning, an old man walks on the beach. Today, after a big storm, there are hundreds of starfish on the sand. The sun is hot. The starfish can't go back to the sea.

Then the man sees a boy. The boy is picking up starfish and throwing them into the water, one by one.

"What are you doing?" the man asks.

"I am helping the starfish. They need water," the boy says.

"But there are so many! It doesn't make a difference."

The boy throws one more starfish into the sea. He smiles. "It makes a difference to that one."

Now the man is throwing starfish, too.`,
    vocab: [
      { word: 'beach', vi: 'bãi biển', emoji: '🏖️', example: 'We play on the beach in summer.' },
      { word: 'storm', vi: 'cơn bão', emoji: '⛈️', example: 'There is a big storm tonight.' },
      { word: 'starfish', vi: 'sao biển', emoji: '⭐', example: 'A starfish lives in the sea.' },
      { word: 'sand', vi: 'cát', emoji: '🏝️', example: 'The sand is hot.' },
      { word: 'sea', vi: 'biển', emoji: '🌊', example: 'Fish live in the sea.' },
      { word: 'throw', vi: 'ném', emoji: '🤾', example: 'He throws the ball to me.' },
      { word: 'difference', vi: 'sự khác biệt (make a difference: làm thay đổi điều gì)', emoji: '✨', example: 'Your help makes a difference.' },
    ],
    questions: [
      { type: 'mc', q: 'Where does the old man walk every morning?', options: ['in the park', 'on the beach', 'in the sea'], answer: 1, listen: true },
      { type: 'tf', q: 'There are hundreds of starfish on the sand.', answer: true, listen: true },
      { type: 'mc', q: 'What is the boy doing?', options: ['He is picking up shells.', 'He is swimming in the sea.', 'He is throwing starfish into the water.'], answer: 2 },
      { type: 'tf', q: 'The old man thinks the boy can help all the starfish.', answer: false },
      { type: 'mc', q: 'What is the man doing at the end?', options: ['He is throwing starfish, too.', 'He is going home.', 'He is laughing at the boy.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He walks on the beach every morning.', question: 'What does the old man do every morning?', hint: 'What does …?', accept: ['What does the man do every morning?', 'What does he do every morning?'] },
      { answer: 'There are hundreds of starfish on the sand.', question: 'How many starfish are there on the sand?', hint: 'How many …?', accept: ['How many starfish are there?', 'How many starfish are on the sand?'] },
      { answer: 'Because they need water.', question: 'Why is the boy helping the starfish?', hint: 'Why …?', accept: ['Why is he helping the starfish?', 'Why is the boy throwing the starfish into the sea?'] },
      { answer: 'I am helping the starfish.', question: 'What are you doing?', hint: 'What are you …?' },
      { answer: "No, they can't. They can't go back to the sea.", question: 'Can the starfish go back to the sea?', hint: 'Can …?', accept: ['Can they go back to the sea?'] },
      { answer: 'He throws it into the sea.', question: 'Where does the boy throw the starfish?', hint: 'Where …?', accept: ['Where does he throw it?', 'Where does the boy throw it?', 'Where does he throw the starfish?'] },
      { answer: 'Yes, he is. He is throwing starfish, too.', question: 'Is the man helping now?', hint: 'Is the man …?', accept: ['Is the old man helping now?', 'Is he helping now?', 'Is the man throwing starfish now?'] },
      { answer: 'The boy is picking up the starfish.', question: 'Who is picking up the starfish?', hint: 'Who …?', accept: ['Who is picking up starfish?'] },
    ],
    dictation: ['Every morning, an old man walks on the beach.', "The starfish can't go back to the sea.", 'It makes a difference to that one.'],
    reorder: [
      { words: ['is', 'boy', 'The', 'starfish', 'throwing'], answer: 'The boy is throwing starfish.' },
      { words: ['walks', 'man', 'The', 'beach', 'on', 'the'], answer: 'The man walks on the beach.' },
    ],
    rewrite: [
      { prompt: 'The boy throws starfish into the sea. (now)', answer: 'The boy is throwing starfish into the sea now.', accept: ['Now the boy is throwing starfish into the sea.'], instructionVi: 'Viết lại câu ở thì hiện tại tiếp diễn vì có "now".' },
      { prompt: 'The man is walking on the beach. (every morning)', answer: 'The man walks on the beach every morning.', accept: ['Every morning, the man walks on the beach.', 'Every morning the man walks on the beach.'], instructionVi: 'Viết lại câu ở thì hiện tại đơn vì có "every morning".' },
    ],
  },
  // 113
  {
    id: 'en-113', no: 113, level: 2, pack: 'kind',
    title: 'Hachiko Waits',
    topic: 'Chú chó Hachiko chờ chủ ở ga Shibuya',
    grammar: {
      point: 'Hiện tại đơn, trạng từ tần suất; at + giờ',
      explainVi: 'Kể thói quen bằng hiện tại đơn (lives, walks, waits). Trạng từ tần suất always / usually / often / sometimes / never đứng trước động từ thường, đứng sau "is / are". Nói giờ dùng "at": at six o\'clock, at the same time (vào cùng một giờ).',
      pattern: 'S + always / often / never + V(s).  S + V + at + giờ.',
      examples: ['The professor always comes out of the train with a smile.', 'People often give him food.', "Minh gets up at six o'clock."],
    },
    text: `Hachiko is a big Akita dog. He lives in Tokyo, Japan, with Professor Ueno. The professor loves his dog very much.

Every morning, Hachiko walks with him to Shibuya Station. Every afternoon, he goes back and waits at the station. The professor always comes out of the train with a smile.

One day, the professor doesn't come back. He is very ill at work, and he dies. But Hachiko doesn't understand. He goes to the station every day at the same time, in the rain and in the snow. He waits for about nine years! People often give him food.

Today, there is a statue of Hachiko at Shibuya Station.`,
    vocab: [
      { word: 'professor', vi: 'giáo sư', emoji: '👨‍🏫', example: 'The professor teaches at a university.' },
      { word: 'station', vi: 'nhà ga', emoji: '🚉', example: 'The train is at the station.' },
      { word: 'train', vi: 'tàu hoả', emoji: '🚆', example: 'I go to Hai Phong by train.' },
      { word: 'wait', vi: 'chờ, đợi', emoji: '🐕', example: 'Lucky waits for me at the door.' },
      { word: 'always', vi: 'luôn luôn', emoji: '💯', example: 'He always comes home at five.' },
      { word: 'understand', vi: 'hiểu', emoji: '🤔', example: 'I understand the lesson.' },
      { word: 'statue', vi: 'bức tượng', emoji: '🗿', example: 'There is a statue in the park.' },
    ],
    questions: [
      { type: 'mc', q: 'Where does Hachiko live?', options: ['in Tokyo', 'in Ha Noi', 'in Sydney'], answer: 0, listen: true },
      { type: 'tf', q: 'Hachiko waits for about nine years.', answer: true, listen: true },
      { type: 'mc', q: 'Where does Hachiko walk every morning?', options: ['to the park', 'to the university', 'to Shibuya Station'], answer: 2 },
      { type: 'tf', q: 'People never give Hachiko food.', answer: false },
      { type: 'mc', q: 'What is at Shibuya Station today?', options: ['a statue of Hachiko', 'a big tree', 'a dog shop'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'He lives in Tokyo, Japan.', question: 'Where does Hachiko live?', hint: 'Where does …?', accept: ['Where does he live?'] },
      { answer: 'He is a big Akita dog.', question: 'What kind of dog is Hachiko?', hint: 'What kind of …?', accept: ['What kind of dog is he?', 'What is Hachiko?'] },
      { answer: 'He goes back every afternoon.', question: 'When does Hachiko go back to the station?', hint: 'When …?', accept: ['When does he go back to the station?', 'When does Hachiko go to the station?', 'When does he go back?'] },
      { answer: 'Because he is waiting for the professor.', question: 'Why does Hachiko go to the station every day?', hint: 'Why …?', accept: ['Why does he go to the station every day?', 'Why does Hachiko go to the station?'] },
      { answer: 'He waits for about nine years.', question: 'How long does Hachiko wait?', hint: 'How long …?', accept: ['How long does he wait?'] },
      { answer: 'Yes, they do. People often give him food.', question: 'Do people give Hachiko food?', hint: 'Do people …?', accept: ['Do people give him food?', 'Do people often give Hachiko food?', 'Do people often give him food?'] },
      { answer: 'Professor Ueno loves Hachiko very much.', question: 'Who loves Hachiko very much?', hint: 'Who …?', accept: ['Who loves Hachiko?'] },
      { answer: 'He goes to the station every day.', question: 'How often does Hachiko go to the station?', hint: 'How often …?', accept: ['How often does he go to the station?'] },
    ],
    dictation: ['Every morning, Hachiko walks with him to Shibuya Station.', 'The professor loves his dog very much.', 'People often give him food.'],
    reorder: [
      { words: ['always', 'He', 'at', 'waits', 'the', 'station'], answer: 'He always waits at the station.' },
      { words: ['never', 'They', 'him', 'forget'], answer: 'They never forget him.' },
    ],
    rewrite: [
      { prompt: 'Hachiko waits at the station. (always)', answer: 'Hachiko always waits at the station.', instructionVi: 'Thêm trạng từ trong ngoặc vào đúng chỗ (trước động từ thường).' },
      { prompt: 'The professor is late. (never)', answer: 'The professor is never late.', instructionVi: 'Thêm trạng từ trong ngoặc vào đúng chỗ (sau động từ to be).' },
    ],
  },
  // 114
  {
    id: 'en-114', no: 114, level: 3, pack: 'kind',
    title: 'Androcles and the Lion',
    topic: 'Rút gai cho sư tử, sư tử nhớ ơn',
    grammar: {
      point: 'Quá khứ đơn bất quy tắc; mệnh đề when',
      explainVi: 'Nhiều động từ có dạng quá khứ riêng, phải học thuộc: run → ran, hide → hid, come → came, see → saw, hold → held, catch → caught, put → put, set → set. "When + quá khứ đơn" cho biết lúc một việc xảy ra; mệnh đề when đứng đầu câu thì có dấu phẩy.',
      pattern: 'S + V2 (ran, saw, came …).  When + S + V2, S + V2.',
      examples: ['A huge lion came into the cave.', 'When Androcles looked at the paw, he saw a big thorn in it.', 'Later, soldiers caught Androcles.'],
    },
    text: `A long time ago, a poor servant called Androcles ran away from his cruel master. He hid in a dark cave.

A huge lion came into the cave. Androcles was scared, but the lion didn't attack him. It held up its paw. When Androcles looked at the paw, he saw a big thorn in it. He pulled out the thorn slowly. The lion licked his hand like a friendly dog.

Later, soldiers caught Androcles. They put him in an arena in Rome with a hungry lion. When the lion ran to him, it stopped. It was his friend from the cave! The emperor was so surprised that he set them both free.`,
    vocab: [
      { word: 'servant', vi: 'người hầu', emoji: '🧹', example: 'The servant worked in a big house.' },
      { word: 'cruel', vi: 'độc ác, tàn nhẫn', emoji: '😈', example: 'The cruel king was not kind to anyone.' },
      { word: 'cave', vi: 'hang động', emoji: '⛰️', example: 'Bats live in a dark cave.' },
      { word: 'paw', vi: 'bàn chân (của con vật)', emoji: '🐾', example: 'Lucky gave me his paw.' },
      { word: 'thorn', vi: 'cái gai', emoji: '🌵', example: 'Roses have thorns.' },
      { word: 'emperor', vi: 'hoàng đế', emoji: '👑', example: 'The emperor lived in Rome.' },
      { word: 'surprised', vi: 'ngạc nhiên', emoji: '😲', example: 'I was surprised to see my grandpa.' },
    ],
    questions: [
      { type: 'mc', q: 'Where did Androcles hide?', options: ['in a big house', 'in a dark cave', 'in a tree'], answer: 1, listen: true },
      { type: 'tf', q: 'The lion attacked Androcles in the cave.', answer: false, listen: true },
      { type: 'short', q: "What did Androcles see in the lion's paw?", answer: 'He saw a big thorn in it.', accept: ['a thorn', 'a big thorn', 'He saw a thorn.', 'He saw a big thorn.'] },
      { type: 'short', q: 'Who caught Androcles?', answer: 'Soldiers caught him.', accept: ['soldiers', 'the soldiers', 'Soldiers caught Androcles.', 'The soldiers caught him.'] },
      { type: 'mc', q: 'Why did the lion in the arena stop?', options: ['It was tired.', 'It was his friend from the cave.', 'The emperor said "Stop!"'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'He ran away from his cruel master.', question: 'Who did Androcles run away from?', hint: 'Who …?', accept: ['Who did he run away from?'] },
      { answer: 'He hid in a dark cave.', question: 'Where did Androcles hide?', hint: 'Where …?', accept: ['Where did he hide?'] },
      { answer: 'He saw a big thorn in it.', question: 'What did Androcles see in the paw?', hint: 'What did …?', accept: ['What did he see in the paw?', 'What did he see?', 'What did Androcles see?', "What did Androcles see in the lion's paw?"] },
      { answer: 'Because his master was very cruel.', question: 'Why did Androcles run away?', hint: 'Why …?', accept: ['Why did he run away?'] },
      { answer: "No, it didn't. It held up its paw.", question: 'Did the lion attack Androcles?', hint: 'Did …?', accept: ['Did the lion attack him?', 'Did it attack him?'] },
      { answer: 'They put him in an arena in Rome.', question: 'Where did the soldiers put Androcles?', hint: 'Where …?', accept: ['Where did they put him?', 'Where did the soldiers put him?'] },
      { answer: 'The emperor set them both free.', question: 'Who set them free?', hint: 'Who …?', accept: ['Who set them both free?', 'Who set Androcles and the lion free?'] },
      { answer: 'It licked his hand like a friendly dog.', question: 'What did the lion do after that?', hint: 'What did …?', accept: ['What did the lion do?', 'What did it do?'] },
    ],
    dictation: ['He pulled out the thorn slowly.', 'The lion licked his hand like a friendly dog.', 'It was his friend from the cave!'],
    reorder: [
      { words: ['saw', 'He', 'thorn', 'a', 'big'], answer: 'He saw a big thorn.' },
      { words: ['caught', 'Soldiers', 'Androcles'], answer: 'Soldiers caught Androcles.' },
    ],
    rewrite: [
      { prompt: 'Androcles hides in a cave. (Yesterday)', answer: 'Yesterday, Androcles hid in a cave.', accept: ['Yesterday Androcles hid in a cave.'], instructionVi: 'Viết lại câu ở quá khứ đơn, bắt đầu bằng từ trong ngoặc.' },
      { prompt: 'The lion saw Androcles. It stopped. (When)', answer: 'When the lion saw Androcles, it stopped.', accept: ['When the lion saw Androcles it stopped.', 'The lion stopped when it saw Androcles.'], instructionVi: 'Nối hai câu bằng "When", đặt mệnh đề When ở đầu câu.' },
    ],
  },
  // 115
  {
    id: 'en-115', no: 115, level: 3, pack: 'kind',
    title: "Louis Braille's Dots",
    topic: 'Cậu bé mù 15 tuổi sáng tạo chữ nổi',
    grammar: {
      point: "could / couldn't (khả năng trong quá khứ); quá khứ đơn",
      explainVi: '"could" là quá khứ của "can": ngày xưa ai đó làm được việc gì. "couldn\'t" (= could not) là không làm được. Sau could / couldn\'t là động từ nguyên mẫu. Những việc đã xảy ra kể bằng quá khứ đơn: was born, played, hurt, went, made.',
      pattern: "S + could / couldn't + V (nguyên mẫu).",
      examples: ["Soon, he couldn't see at all.", 'Blind people could read it with their fingers.', 'At fifteen, he made a new alphabet.'],
    },
    text: `Louis Braille was born in France in 1809. When he was three, he played with a sharp tool in his father's workshop and hurt his eye. Soon, he couldn't see at all.

Louis wanted to read. At ten, he went to a school for blind children in Paris. The books had big raised letters. Reading them was slow.

One day, a soldier showed the school a way of writing with raised dots. It was difficult, so Louis worked on it day and night. At fifteen, he made a new alphabet with six dots. Blind people could read it with their fingers, and they could write it, too! Today, people around the world use Braille.`,
    vocab: [
      { word: 'sharp', vi: 'sắc, nhọn', emoji: '🔪', example: 'Be careful! The knife is sharp.' },
      { word: 'tool', vi: 'dụng cụ', emoji: '🔨', example: 'Grandpa has got a box of tools.' },
      { word: 'workshop', vi: 'xưởng (làm đồ)', emoji: '🛠️', example: 'My uncle makes chairs in his workshop.' },
      { word: 'blind', vi: 'mù, không nhìn thấy', emoji: '🧑‍🦯', example: 'A blind man can read with his fingers.' },
      { word: 'raised', vi: 'nổi lên (trên mặt giấy)', emoji: '⠿', example: 'You can feel the raised dots.' },
      { word: 'dot', vi: 'chấm', emoji: '⚫', example: 'There are six dots on the dice.' },
      { word: 'alphabet', vi: 'bảng chữ cái', emoji: '🔤', example: 'The English alphabet has 26 letters.' },
      { word: 'finger', vi: 'ngón tay', emoji: '☝️', example: 'I have got ten fingers.' },
    ],
    questions: [
      { type: 'mc', q: 'How old was Louis when he hurt his eye?', options: ['three', 'ten', 'fifteen'], answer: 0, listen: true },
      { type: 'tf', q: 'Louis went to a school for blind children in Paris.', answer: true, listen: true },
      { type: 'short', q: 'What did the books at the school have?', answer: 'They had big raised letters.', accept: ['big raised letters', 'raised letters', 'The books had big raised letters.'] },
      { type: 'short', q: 'How many dots did his alphabet have?', answer: 'It had six dots.', accept: ['six', 'six dots', '6', '6 dots'] },
      { type: 'mc', q: 'What could blind people do with Braille?', options: ['see again', 'read and write', 'paint pictures'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'He was born in France.', question: 'Where was Louis born?', hint: 'Where …?', accept: ['Where was he born?', 'Where was Louis Braille born?'] },
      { answer: 'He was born in 1809.', question: 'When was Louis born?', hint: 'When …?', accept: ['When was he born?', 'When was Louis Braille born?'] },
      { answer: "No, he couldn't. He couldn't see at all.", question: 'Could Louis see?', hint: 'Could …?', accept: ['Could he see?'] },
      { answer: 'Because he wanted to read.', question: 'Why did Louis go to the school in Paris?', hint: 'Why …?', accept: ['Why did he go to the school in Paris?', 'Why did Louis go to school in Paris?', 'Why did he go to school?'] },
      { answer: 'A soldier showed the school a way of writing with raised dots.', question: 'Who showed the school a way of writing with raised dots?', hint: 'Who …?', accept: ['Who showed them a way of writing with raised dots?', 'Who showed the school a way of writing with dots?'] },
      { answer: 'He was fifteen when he made his alphabet.', question: 'How old was Louis when he made his alphabet?', hint: 'How old …?', accept: ['How old was he when he made his alphabet?', 'How old was Louis when he made the new alphabet?'] },
      { answer: 'They could read it with their fingers.', question: 'How could blind people read it?', hint: 'How …?', accept: ['How could they read it?', 'How could blind people read Braille?'] },
      { answer: 'He played with a sharp tool.', question: 'What did Louis play with?', hint: 'What did …?', accept: ['What did he play with?'] },
    ],
    dictation: ["Soon, he couldn't see at all.", 'The books had big raised letters.', 'At fifteen, he made a new alphabet with six dots.'],
    reorder: [
      { words: ['could', 'People', 'with', 'read', 'fingers', 'their'], answer: 'People could read with their fingers.' },
      { words: ['wanted', 'Louis', 'read', 'to'], answer: 'Louis wanted to read.' },
    ],
    rewrite: [
      { prompt: 'Louis can read with his fingers. (Last year)', answer: 'Last year, Louis could read with his fingers.', accept: ['Last year Louis could read with his fingers.'], instructionVi: 'Viết lại câu ở quá khứ, bắt đầu bằng từ trong ngoặc (can → could).' },
      { prompt: 'Louis could see. (couldn\'t)', answer: "Louis couldn't see.", accept: ['Louis could not see.'], instructionVi: 'Viết lại câu ở dạng phủ định.' },
    ],
  },
  // 116
  {
    id: 'en-116', no: 116, level: 3, pack: 'kind',
    title: 'The Lady with the Lamp',
    topic: 'Florence Nightingale chăm sóc người bệnh',
    grammar: {
      point: 'Quá khứ đơn; first / then / finally',
      explainVi: 'Kể chuyện đã qua bằng quá khứ đơn: thêm -ed (cleaned, washed, walked) hoặc dạng bất quy tắc (went, wrote, became). Dùng First (đầu tiên), Then (sau đó), Finally (cuối cùng) ở đầu câu để kể các việc theo thứ tự; sau First và Finally có dấu phẩy.',
      pattern: 'First, S + V2. Then S + V2. Finally, S + V2.',
      examples: ['First, the nurses cleaned the rooms.', 'Then they washed the sheets and cooked good food.', 'Finally, she went back to England.'],
    },
    text: `Florence Nightingale was born in 1820 into a rich English family. She wanted to help sick people, so she became a nurse.

In 1854, there was a war in Crimea, and many British soldiers were hurt. Florence went to a hospital in Scutari with thirty-eight nurses. The hospital was dirty, and there were rats everywhere.

First, the nurses cleaned the rooms. Then they washed the sheets and cooked good food. At night, Florence walked from bed to bed with a lamp. She talked to the soldiers and wrote letters for them. They called her "the Lady with the Lamp".

Finally, she went back to England. In 1860, she opened a school for nurses in London.`,
    vocab: [
      { word: 'nurse', vi: 'y tá', emoji: '👩‍⚕️', example: 'The nurse is kind to the children.' },
      { word: 'sick', vi: 'ốm, bệnh', emoji: '🤒', example: 'My brother is sick today.' },
      { word: 'war', vi: 'chiến tranh', emoji: '⚔️', example: 'Nobody likes war.' },
      { word: 'soldier', vi: 'người lính', emoji: '💂', example: 'The soldier was hurt in the war.' },
      { word: 'hospital', vi: 'bệnh viện', emoji: '🏥', example: 'Dad works at the hospital.' },
      { word: 'dirty', vi: 'bẩn', emoji: '🧽', example: 'My shoes are dirty.' },
      { word: 'rat', vi: 'con chuột cống', emoji: '🐀', example: 'Rats like dirty places.' },
      { word: 'lamp', vi: 'cây đèn', emoji: '🪔', example: 'She walked with a lamp at night.' },
    ],
    questions: [
      { type: 'mc', q: 'When did Florence go to Scutari?', options: ['in 1820', 'in 1854', 'in 1860'], answer: 1, listen: true },
      { type: 'tf', q: 'The hospital in Scutari was clean.', answer: false, listen: true },
      { type: 'short', q: 'What did Florence carry at night?', answer: 'She carried a lamp.', accept: ['a lamp', 'She had a lamp.', 'She walked with a lamp.'] },
      { type: 'short', q: 'What did the soldiers call her?', answer: 'They called her the Lady with the Lamp.', accept: ['the Lady with the Lamp', 'Lady with the Lamp'] },
      { type: 'mc', q: 'What did Florence open in 1860?', options: ['a hospital', 'a shop', 'a school for nurses'], answer: 2 },
    ],
    makeQuestion: [
      { answer: 'She was born in 1820.', question: 'When was Florence born?', hint: 'When …?', accept: ['When was she born?', 'When was Florence Nightingale born?'] },
      { answer: 'She went to a hospital in Scutari.', question: 'Where did Florence go in 1854?', hint: 'Where …?', accept: ['Where did she go in 1854?', 'Where did Florence go?'] },
      { answer: 'Because she wanted to help sick people.', question: 'Why did Florence become a nurse?', hint: 'Why …?', accept: ['Why did she become a nurse?'] },
      { answer: 'First, they cleaned the rooms.', question: 'What did the nurses do first?', hint: 'What … first?', accept: ['What did they do first?'] },
      { answer: 'Thirty-eight nurses went with her.', question: 'How many nurses went with Florence?', hint: 'How many …?', accept: ['How many nurses went with her?'] },
      { answer: 'Yes, there were. There were rats everywhere.', question: 'Were there rats in the hospital?', hint: 'Were there …?', accept: ['Were there any rats in the hospital?'] },
      { answer: 'She talked to the soldiers and wrote letters for them.', question: 'What did Florence do for the soldiers at night?', hint: 'What did …?', accept: ['What did she do for the soldiers?', 'What did Florence do at night?'] },
      { answer: 'She opened it in London.', question: 'Where did Florence open a school for nurses?', hint: 'Where …?', accept: ['Where did she open a school for nurses?', 'Where did she open the school?'] },
    ],
    dictation: ['She wanted to help sick people, so she became a nurse.', 'First, the nurses cleaned the rooms.', 'At night, Florence walked from bed to bed with a lamp.'],
    reorder: [
      { words: ['cleaned', 'the', 'First,', 'rooms', 'they'], answer: 'First, they cleaned the rooms.' },
      { words: ['a', 'became', 'She', 'nurse'], answer: 'She became a nurse.' },
    ],
    rewrite: [
      { prompt: 'The nurses clean the rooms. They wash the sheets. (First … Then …)', answer: 'First, the nurses cleaned the rooms. Then they washed the sheets.', accept: ['First the nurses cleaned the rooms. Then they washed the sheets.'], instructionVi: 'Viết lại ở quá khứ đơn, bắt đầu hai câu bằng First và Then.' },
      { prompt: 'Florence goes back to England. (Finally)', answer: 'Finally, Florence went back to England.', accept: ['Finally Florence went back to England.'], instructionVi: 'Viết lại câu ở quá khứ đơn, bắt đầu bằng từ trong ngoặc.' },
    ],
  },
  // 117
  {
    id: 'en-117', no: 117, level: 4, pack: 'kind',
    title: 'Water!',
    topic: 'Helen Keller và cô giáo Anne Sullivan',
    grammar: {
      point: 'Quá khứ tiếp diễn với when / while; mệnh đề quan hệ who',
      explainVi: 'Quá khứ tiếp diễn (was / were + V-ing) tả việc đang diễn ra ở một lúc trong quá khứ. Việc dài dùng quá khứ tiếp diễn, việc ngắn chen vào dùng quá khứ đơn sau "when"; hai việc cùng diễn ra một lúc thì nối bằng "while". Mệnh đề "who" đứng ngay sau danh từ chỉ người, nói rõ đó là người nào.',
      pattern: 'S + was / were + V-ing when + S + V2.  While + S + was / were + V-ing, S + was / were + V-ing.  người + who + V …',
      examples: ['One day in 1887, they were standing next to the water pump.', 'While water was running over one of her hands, Anne was spelling w-a-t-e-r into the other.', 'Anne was the teacher who changed her life.'],
    },
    text: `Helen Keller was born in the United States in 1880. When she was a baby, she became very ill. After that, she couldn't see or hear, and she was often angry.

When Helen was six, a teacher called Anne Sullivan came to her house. Anne spelled words into Helen's hand, but Helen didn't know what they meant.

One day in 1887, they were standing next to the water pump. While water was running over one of Helen's hands, Anne was spelling w-a-t-e-r into the other. Suddenly, Helen understood. Everything had a name! That day, she learned thirty words.

Later, Helen went to university and wrote books. Anne, the teacher who changed her life, stayed with her for almost fifty years.`,
    vocab: [
      { word: 'hear', vi: 'nghe thấy', emoji: '👂', example: 'I can hear the birds.' },
      { word: 'angry', vi: 'tức giận, bực bội', emoji: '😠', example: 'He was angry because nobody listened.' },
      { word: 'spell', vi: 'đánh vần', emoji: '🔡', example: 'Can you spell your name?' },
      { word: 'pump', vi: 'cái máy bơm nước', emoji: '🚰', example: 'Grandpa gets water from the pump.' },
      { word: 'suddenly', vi: 'bỗng nhiên, đột nhiên', emoji: '⚡', example: 'Suddenly, it started to rain.' },
      { word: 'understand', vi: 'hiểu', emoji: '💡', example: 'Now I understand the story.' },
      { word: 'university', vi: 'trường đại học', emoji: '🎓', example: 'My sister goes to university.' },
    ],
    questions: [
      { type: 'tf', q: 'Helen could see and hear when she was six.', answer: false, listen: true },
      { type: 'mc', q: "What was Anne spelling into Helen's hand at the pump?", options: ['doll', 'water', 'name'], answer: 1, listen: true },
      { type: 'short', q: 'Who was Anne Sullivan?', answer: "She was the teacher who changed Helen's life.", accept: ["Helen's teacher", "She was Helen's teacher.", 'a teacher', 'She was a teacher.', 'She was the teacher who changed her life.'] },
      { type: 'short', q: 'How many words did Helen learn that day?', answer: 'She learned thirty words.', accept: ['thirty', '30', 'thirty words', '30 words', 'She learned 30 words.'] },
      { type: 'short', q: 'Why was Helen often angry before Anne came?', answer: "Because she couldn't see or hear.", accept: ['Because she could not see or hear.', "She couldn't see or hear.", 'Because nobody could understand her.', 'Because she could not talk to people.'] },
    ],
    makeQuestion: [
      { answer: 'She was born in 1880.', question: 'When was Helen born?', hint: 'When …?', accept: ['When was she born?', 'When was Helen Keller born?'] },
      { answer: 'They were standing next to the water pump.', question: 'Where were Anne and Helen standing?', hint: 'Where were …?', accept: ['Where were they standing?', 'Where were Helen and Anne standing?'] },
      { answer: 'Anne was spelling w-a-t-e-r into her other hand.', question: 'What was Anne doing while the water was running?', hint: 'What was … doing?', accept: ['What was Anne doing?', 'What was she doing?'] },
      { answer: "Because she couldn't see or hear.", question: 'Why was Helen often angry?', hint: 'Why …?', accept: ['Why was she often angry?', 'Why was Helen angry?'] },
      { answer: 'Anne Sullivan was the teacher who changed her life.', question: "Who changed Helen's life?", hint: 'Who …?', accept: ['Who changed her life?'] },
      { answer: 'Yes, she did. She went to university and wrote books.', question: 'Did Helen go to university?', hint: 'Did …?', accept: ['Did she go to university?'] },
      { answer: 'She stayed with her for almost fifty years.', question: 'How long did Anne stay with Helen?', hint: 'How long …?', accept: ['How long did Anne stay with her?', 'How long did she stay with Helen?', 'How long did she stay with her?'] },
      { answer: 'She learned thirty words that day.', question: 'How many words did Helen learn that day?', hint: 'How many …?', accept: ['How many words did she learn that day?', 'How many words did Helen learn?'] },
    ],
    dictation: ['When Helen was six, a teacher called Anne Sullivan came to her house.', 'One day in 1887, they were standing next to the water pump.', 'Later, Helen went to university and wrote books.'],
    reorder: [
      { words: ['were', 'They', 'next', 'standing', 'to', 'pump', 'the'], answer: 'They were standing next to the pump.' },
      { words: ['the', 'teacher', 'Anne', 'was', 'who', 'changed', 'her', 'life'], answer: 'Anne was the teacher who changed her life.' },
    ],
    rewrite: [
      { prompt: "Water was running over Helen's hand. Anne spelled the word. (when)", answer: "Water was running over Helen's hand when Anne spelled the word.", accept: ["When Anne spelled the word, water was running over Helen's hand."], instructionVi: 'Nối hai câu bằng "when": việc đang diễn ra dùng quá khứ tiếp diễn, việc chen vào dùng quá khứ đơn.' },
      { prompt: "Anne was a teacher. She changed Helen's life. (who)", answer: "Anne was a teacher who changed Helen's life.", instructionVi: 'Nối hai câu bằng "who".' },
    ],
  },
  // 118
  {
    id: 'en-118', no: 118, level: 4, pack: 'kind',
    title: 'A Thousand Paper Cranes',
    topic: 'Sadako và những con hạc giấy hoà bình',
    grammar: {
      point: 'so / because / so that; used to',
      explainVi: '"because" + lý do; "so" + kết quả; "so that" + mục đích (để cho), sau so that thường có can / could. "used to + động từ nguyên mẫu" nói việc ngày xưa hay làm, bây giờ không còn nữa.',
      pattern: 'S + V because + lý do.  …, so + kết quả.  S + V so that + S + could + V.  S + used to + V.',
      examples: ['She became ill because of the bomb.', 'She folded a paper crane so that Sadako could smile.', 'She used to run very fast.'],
    },
    text: `Sadako Sasaki lived in Hiroshima, Japan. In 1945, when she was two, an atomic bomb fell on the city. Sadako was not hurt. She grew up and used to run very fast.

But in 1955, when she was twelve, she became ill because of the bomb. One day, a friend came to the hospital with golden paper. She folded a paper crane so that Sadako could smile. An old story says that if you fold a thousand cranes, you can make a wish. So Sadako folded hundreds of cranes, and she wished for peace.

Sadako died in October 1955. Her classmates collected money for a statue, the Children's Peace Statue in Hiroshima. Children around the world still send cranes there.`,
    vocab: [
      { word: 'bomb', vi: 'quả bom', emoji: '💣', example: 'A bomb can destroy a city.' },
      { word: 'golden', vi: 'màu vàng óng', emoji: '✨', example: 'She has got golden paper.' },
      { word: 'fold', vi: 'gấp (giấy)', emoji: '📄', example: 'Fold the paper in half.' },
      { word: 'crane', vi: 'con hạc', emoji: '🕊️', example: 'I can fold a paper crane.' },
      { word: 'wish', vi: 'điều ước; ước', emoji: '🌠', example: 'Close your eyes and make a wish.' },
      { word: 'peace', vi: 'hoà bình', emoji: '☮️', example: 'Everyone wants peace.' },
      { word: 'statue', vi: 'bức tượng', emoji: '🗿', example: 'There is a statue in the park.' },
    ],
    questions: [
      { type: 'mc', q: 'How old was Sadako when the bomb fell?', options: ['two', 'ten', 'twelve'], answer: 0, listen: true },
      { type: 'tf', q: 'Sadako used to run very fast.', answer: true, listen: true },
      { type: 'short', q: 'What did her friend bring to the hospital?', answer: 'She brought golden paper.', accept: ['golden paper', 'some golden paper', 'She came with golden paper.'] },
      { type: 'short', q: 'What did Sadako wish for?', answer: 'She wished for peace.', accept: ['peace', 'She wished for peace in the world.'] },
      { type: 'short', q: 'Why do children still send paper cranes to the statue?', answer: 'Because they remember Sadako and they want peace.', accept: ['Because they want peace.', 'They want peace.', 'Because they remember Sadako.', 'To remember Sadako.', 'For peace.'] },
    ],
    makeQuestion: [
      { answer: 'She lived in Hiroshima, Japan.', question: 'Where did Sadako live?', hint: 'Where …?', accept: ['Where did she live?'] },
      { answer: 'The bomb fell in 1945.', question: 'When did the bomb fall?', hint: 'When …?', accept: ['When did the bomb fall on the city?', 'When did the bomb fall on Hiroshima?'] },
      { answer: 'Yes, she did. She used to run very fast.', question: 'Did Sadako use to run fast?', hint: 'Did … use to …?', accept: ['Did she use to run fast?', 'Did Sadako use to run very fast?', 'Did she use to run very fast?'] },
      { answer: 'She became ill because of the bomb.', question: 'Why did Sadako become ill?', hint: 'Why …?', accept: ['Why did she become ill?'] },
      { answer: 'She folded it so that Sadako could smile.', question: 'Why did her friend fold a paper crane?', hint: 'Why …?', accept: ['Why did the friend fold a paper crane?', 'Why did she fold a paper crane?', 'Why did her friend fold a crane?'] },
      { answer: 'If you fold a thousand cranes, you can make a wish.', question: 'What does the old story say?', hint: 'What …?', accept: ['What does the story say?'] },
      { answer: 'She folded hundreds of cranes.', question: 'How many cranes did Sadako fold?', hint: 'How many …?', accept: ['How many cranes did she fold?'] },
      { answer: 'Her classmates collected money for it.', question: 'Who collected money for the statue?', hint: 'Who …?', accept: ['Who collected money for it?'] },
    ],
    dictation: ['She grew up and used to run very fast.', 'She folded a paper crane so that Sadako could smile.', 'Children around the world still send cranes there.'],
    reorder: [
      { words: ['used', 'She', 'run', 'to', 'fast'], answer: 'She used to run fast.' },
      { words: ['folded', 'She', 'so', 'that', 'crane', 'a', 'Sadako', 'could', 'smile'], answer: 'She folded a crane so that Sadako could smile.' },
    ],
    rewrite: [
      { prompt: 'When I was small, I often played in the park. I don\'t now. (used to)', answer: 'When I was small, I used to play in the park.', accept: ['When I was small I used to play in the park.', 'I used to play in the park when I was small.'], instructionVi: 'Viết lại câu đầu với "used to" (thói quen ngày xưa, nay không còn).' },
      { prompt: 'She folded cranes. She wanted to make a wish. (so that)', answer: 'She folded cranes so that she could make a wish.', accept: ['She folded cranes so that she can make a wish.'], instructionVi: 'Nối hai câu bằng "so that" (so that + S + could + V).' },
    ],
  },
  // 119
  {
    id: 'en-119', no: 119, level: 5, pack: 'kind',
    title: 'The Marathon of Hope',
    topic: 'Terry Fox chạy xuyên Canada bằng một chân',
    grammar: {
      point: 'although / despite; bị động quá khứ đơn',
      explainVi: '"Although" đi với một mệnh đề có chủ ngữ và động từ (Although he had only one leg, …). "Despite" đi với danh từ hoặc V-ing (Despite the pain, …). Cả hai đều nghĩa là "mặc dù"; không dùng thêm "but" trong cùng câu. Bị động quá khứ: was / were + V3, dùng khi muốn nói điều gì đã xảy ra với ai, vật gì (his leg was removed).',
      pattern: 'Although + S + V, S + V.  Despite + danh từ / V-ing, S + V.  S + was / were + V3.',
      examples: ['Although he had only one leg, he decided to run across Canada.', 'Despite the pain, he ran about 42 kilometres a day.', 'His right leg was removed.'],
    },
    text: `Terry Fox was a young Canadian who loved sport. In 1977, when he was eighteen, he was told that he had cancer. His right leg was removed, and he learned to walk with an artificial leg.

In hospital, Terry met children with cancer. Although he had only one leg, he decided to run across Canada to raise money for cancer research. He called it the Marathon of Hope.

Terry started in April 1980. Despite the pain, he ran about 42 kilometres a day. After 143 days and 5,373 kilometres, he had to stop because the cancer had spread to his lungs. Terry died the next year, but his dream did not.

Today, a Terry Fox Run is held every year to raise money for research.`,
    vocab: [
      { word: 'cancer', vi: 'bệnh ung thư', emoji: '🎗️', example: 'Doctors are working hard to stop cancer.' },
      { word: 'remove', vi: 'cắt bỏ, lấy đi', emoji: '✂️', example: 'The doctor removed the splinter from my finger.' },
      { word: 'artificial', vi: 'nhân tạo, giả', emoji: '🦿', example: 'He walks with an artificial leg.' },
      { word: 'raise', vi: 'quyên góp (tiền)', emoji: '💰', example: 'Our class raised money for the flood victims.' },
      { word: 'research', vi: 'việc nghiên cứu', emoji: '🔬', example: 'Scientists do research to find new medicines.' },
      { word: 'marathon', vi: 'cuộc chạy đường dài (khoảng 42 km)', emoji: '🏃', example: 'A marathon is about 42 kilometres long.' },
      { word: 'pain', vi: 'cơn đau', emoji: '🤕', example: 'Despite the pain, she finished the race.' },
    ],
    questions: [
      { type: 'mc', q: 'How old was Terry when he was told that he had cancer?', options: ['eight', 'eighteen', 'twenty-two'], answer: 1, listen: true },
      { type: 'tf', q: 'Terry finished his run across Canada.', answer: false, listen: true },
      { type: 'short', q: 'How far did Terry run every day?', answer: 'He ran about 42 kilometres a day.', accept: ['about 42 kilometres', '42 kilometres', 'about 42 km', '42 km', 'He ran about 42 kilometres every day.'] },
      { type: 'short', q: 'Why did Terry have to stop?', answer: 'Because the cancer had spread to his lungs.', accept: ['The cancer had spread to his lungs.', 'Because the cancer came back.', 'Because of the cancer.', 'Because he was ill again.'] },
      { type: 'mc', q: 'What does "Terry died the next year, but his dream did not" mean?', options: ['He finished his run in 1981.', 'People still run and raise money for his dream.', 'Nobody remembers Terry today.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'He was told that he had cancer.', question: 'What was Terry told in 1977?', hint: 'What was …?', accept: ['What was he told?', 'What was Terry told?', 'What was he told in 1977?'] },
      { answer: 'His right leg was removed.', question: 'Which leg was removed?', hint: 'Which …?', accept: ['Which of his legs was removed?', 'Which leg was removed by the doctors?'] },
      { answer: 'Because he wanted to raise money for cancer research.', question: 'Why did Terry run across Canada?', hint: 'Why …?', accept: ['Why did he run across Canada?', 'Why did Terry decide to run across Canada?'] },
      { answer: 'He called it the Marathon of Hope.', question: 'What did Terry call his run?', hint: 'What did …?', accept: ['What did he call it?', 'What did he call his run?', 'What did Terry call it?'] },
      { answer: 'He started in April 1980.', question: 'When did Terry start his run?', hint: 'When …?', accept: ['When did he start?', 'When did Terry start?', 'When did he start his run?'] },
      { answer: 'He ran for 143 days.', question: 'How long did Terry run?', hint: 'How long …?', accept: ['How many days did Terry run?', 'How long did he run?', 'How many days did he run?'] },
      { answer: "No, he didn't. He had to stop.", question: 'Did Terry finish his run?', hint: 'Did …?', accept: ['Did he finish his run?', 'Did Terry finish the run?', 'Did he finish the run?'] },
      { answer: 'It is held every year.', question: 'How often is the Terry Fox Run held?', hint: 'How often …?', accept: ['How often is it held?', 'How often is a Terry Fox Run held?'] },
    ],
    dictation: [
      'His right leg was removed, and he learned to walk with an artificial leg.',
      'Despite the pain, he ran about 42 kilometres a day.',
      'Terry died the next year, but his dream did not.',
    ],
    reorder: [
      { words: ['the', 'Despite', 'pain,', 'he', 'running', 'kept'], answer: 'Despite the pain, he kept running.' },
      { words: ['was', 'leg', 'His', 'removed', 'right'], answer: 'His right leg was removed.' },
    ],
    rewrite: [
      { prompt: 'He had only one leg, but he ran across Canada. (Although)', answer: 'Although he had only one leg, he ran across Canada.', accept: ['Although he had only one leg he ran across Canada.', 'Although he had one leg, he ran across Canada.'], instructionVi: 'Viết lại câu, bắt đầu bằng "Although" và bỏ "but".' },
      { prompt: 'People raised a lot of money for research. (A lot of money)', answer: 'A lot of money was raised for research.', accept: ['A lot of money was raised for research by people.', 'A lot of money was raised by people for research.'], instructionVi: 'Viết lại câu ở dạng bị động, bắt đầu bằng từ trong ngoặc.' },
    ],
  },
  // 120
  {
    id: 'en-120', no: 120, level: 5, pack: 'kind',
    title: 'The Happy Prince',
    topic: 'Truyện của Oscar Wilde: bức tượng hoàng tử và chim én',
    grammar: {
      point: 'Câu tường thuật; quá khứ hoàn thành',
      explainVi: 'Kể lại lời người khác: said that + câu lùi một thì (am / is → was, have seen → had seen), đổi I thành he / she. Kể lại lời nhờ: asked + người + to V. Quá khứ hoàn thành (had + V3) nói việc xảy ra trước một việc khác trong quá khứ: chim én đã định bay sang Ai Cập từ trước, rồi mới ở lại với hoàng tử.',
      pattern: 'S + said that + S + V (lùi thì).  S + asked + người + to V.  S + had + V3.',
      examples: ['He said that he had never seen sadness in his palace.', 'He asked the swallow to take his ruby to a poor mother.', 'The swallow had wanted to fly to Egypt.'],
    },
    text: `High above the city stood the statue of the Happy Prince. He was covered with gold leaf, and his eyes were two sapphires.

One night, a swallow slept between his feet. A tear fell on him. The prince was crying. He said that he had never seen sadness in his palace. Now he could see poor people everywhere.

He asked the swallow to take his ruby to a poor mother. Then the bird took his sapphires and gold leaf to poor families.

The swallow had wanted to fly to Egypt, but he stayed. When winter came, the bird died, and the prince's heart broke. God asked an angel for the two most precious things in the city. The angel brought the heart and the bird.`,
    vocab: [
      { word: 'statue', vi: 'bức tượng', emoji: '🗿', example: 'The statue stands in the middle of the square.' },
      { word: 'prince', vi: 'hoàng tử', emoji: '🤴', example: 'The prince lived in a big palace.' },
      { word: 'swallow', vi: 'chim én', emoji: '🐦', example: 'Swallows fly to warm countries in winter.' },
      { word: 'sapphire', vi: 'viên ngọc xanh (xa-phia)', emoji: '💎', example: 'Her ring has a blue sapphire.' },
      { word: 'ruby', vi: 'viên hồng ngọc', emoji: '❤️', example: 'A ruby is a red stone.' },
      { word: 'palace', vi: 'cung điện', emoji: '🏰', example: 'The king lived in a palace.' },
      { word: 'precious', vi: 'quý giá', emoji: '💖', example: 'Friends are more precious than gold.' },
      { word: 'angel', vi: 'thiên thần', emoji: '👼', example: 'The angel had white wings.' },
    ],
    questions: [
      { type: 'mc', q: "What were the prince's eyes?", options: ['two rubies', 'two sapphires', 'two gold coins'], answer: 1, listen: true },
      { type: 'tf', q: 'The swallow flew to Egypt before winter.', answer: false, listen: true },
      { type: 'short', q: 'Why was the prince crying?', answer: 'Because he could see poor people everywhere.', accept: ['He could see poor people everywhere.', 'Because he could see the poor people.', 'Because he saw poor people.', 'Because he saw poor people everywhere.'] },
      { type: 'short', q: 'Who did the swallow take the ruby to?', answer: 'He took it to a poor mother.', accept: ['a poor mother', 'to a poor mother', 'He took the ruby to a poor mother.'] },
      { type: 'short', q: 'Why did the swallow stay with the prince?', answer: 'Because he wanted to help the prince and the poor people.', accept: ['Because he wanted to help the prince.', 'Because he wanted to help.', 'Because the prince needed him.', 'He wanted to help the poor people.', 'Because he loved the prince.'] },
    ],
    makeQuestion: [
      { answer: 'He was covered with gold leaf.', question: 'What was the statue covered with?', hint: 'What … covered with?', accept: ['What was the prince covered with?', 'What was he covered with?'] },
      { answer: 'He said that he had never seen sadness in his palace.', question: 'What did the prince say?', hint: 'What did … say?', accept: ['What did he say?'] },
      { answer: 'A swallow slept between his feet.', question: 'Who slept between his feet?', hint: 'Who …?', accept: ["Who slept between the prince's feet?"] },
      { answer: 'Because he could see poor people everywhere.', question: 'Why was the prince crying?', hint: 'Why …?', accept: ['Why was he crying?'] },
      { answer: 'He had wanted to fly to Egypt.', question: 'Where had the swallow wanted to fly?', hint: 'Where had …?', accept: ['Where had he wanted to fly?', 'Where had the swallow wanted to fly to?'] },
      { answer: "No, he didn't. He stayed with the prince.", question: 'Did the swallow fly to Egypt?', hint: 'Did …?', accept: ['Did he fly to Egypt?'] },
      { answer: 'It broke when the bird died.', question: "When did the prince's heart break?", hint: 'When …?', accept: ['When did his heart break?'] },
      { answer: 'God asked an angel for the two most precious things.', question: 'Who did God ask for the two most precious things?', hint: 'Who …?', accept: ['Who did God ask?'] },
    ],
    dictation: [
      'High above the city stood the statue of the Happy Prince.',
      'He said that he had never seen sadness in his palace.',
      'The swallow had wanted to fly to Egypt, but he stayed.',
    ],
    reorder: [
      { words: ['had', 'He', 'never', 'sadness', 'seen'], answer: 'He had never seen sadness.' },
      { words: ['said', 'The', 'prince', 'that', 'he', 'was', 'sad'], answer: 'The prince said that he was sad.' },
    ],
    rewrite: [
      { prompt: '"I have never seen sadness," said the prince. (The prince said that …)', answer: 'The prince said that he had never seen sadness.', accept: ['The prince said he had never seen sadness.'], instructionVi: 'Viết lại thành câu tường thuật: lùi thì (have seen → had seen), đổi I thành he.' },
      { prompt: '"I am cold," said the swallow. (The swallow said that …)', answer: 'The swallow said that he was cold.', accept: ['The swallow said he was cold.'], instructionVi: 'Viết lại thành câu tường thuật: lùi thì (am → was), đổi I thành he.' },
    ],
  },
];
