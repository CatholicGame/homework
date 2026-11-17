// Bộ chủ đề alien (bài đọc tiếng Anh 101+). Xem docs/tieng-anh/thiet-ke-bai-doc.md §10.
// 👽 Bạn từ hành tinh khác: Bíp (Bip), cậu bé người ngoài hành tinh từ hành tinh Lumo, rơi xuống vườn nhà Minh.
export default [
  // 101
  {
    id: 'en-101', no: 101, level: 1, pack: 'alien',
    title: 'A Visitor in the Garden',
    topic: 'Bíp rơi xuống vườn, làm quen',
    grammar: {
      point: 'Động từ to be; have got / has got',
      explainVi: 'Dùng "am" với I, "is" với he / she / it, "are" với you / we / they. "Have got" nghĩa là "có": dùng "have got" với I / you / we / they, "has got" với he / she / it.',
      pattern: 'I am / He is / You are + …   I have got / He has got + …',
      examples: ['Bip is an alien.', 'He has got three eyes.', 'You are my friend.'],
    },
    text: `Minh is in the garden with Lucky. There is a small spaceship under the mango tree. It is round and silver. It is broken.

"Hello! I am Bip," says a little voice. Bip is an alien. He is from planet Lumo. He is small and green. He has got three eyes and two antennae.

"I am Minh. This is my dog, Lucky," says Minh. Minh is not scared. Lucky is happy. Bip is happy, too. His antennae glow yellow!

"Have you got a home?" asks Minh. "Yes, but it is far away," says Bip. "You are my friend!" says Minh.`,
    vocab: [
      { word: 'garden', vi: 'khu vườn', emoji: '🌳', example: 'Minh is in the garden.' },
      { word: 'spaceship', vi: 'phi thuyền, tàu vũ trụ', emoji: '🛸', example: 'The spaceship is round and silver.' },
      { word: 'broken', vi: 'bị hỏng', emoji: '🔧', example: 'My toy car is broken.' },
      { word: 'alien', vi: 'người ngoài hành tinh', emoji: '👽', example: 'Bip is a little alien.' },
      { word: 'planet', vi: 'hành tinh', emoji: '🪐', example: 'Bip is from planet Lumo.' },
      { word: 'antennae', vi: 'râu, ăng-ten (số nhiều của antenna)', emoji: '📡', example: 'Bip has got two antennae.' },
      { word: 'scared', vi: 'sợ, sợ hãi', emoji: '😨', example: 'Kitty is scared of the rain.' },
      { word: 'friend', vi: 'bạn', emoji: '🤝', example: 'You are my friend.' },
    ],
    questions: [
      { type: 'mc', q: 'How many eyes has Bip got?', options: ['two', 'three', 'four'], answer: 1, listen: true },
      { type: 'tf', q: 'The spaceship is under the mango tree.', answer: true, listen: true },
      { type: 'mc', q: 'What colour is Bip?', options: ['green', 'yellow', 'silver'], answer: 0 },
      { type: 'tf', q: 'Minh is scared.', answer: false },
      { type: 'mc', q: 'Where is Bip from?', options: ['Ha Noi', 'planet Lumo', 'Australia'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'It is under the mango tree.', question: 'Where is the spaceship?', hint: 'Where is …?', accept: ['Where is it?'] },
      { answer: 'He is from planet Lumo.', question: 'Where is Bip from?', hint: 'Where … from?', accept: ['Where is he from?'] },
      { answer: 'He has got three eyes.', question: 'How many eyes has Bip got?', hint: 'How many …?', accept: ['How many eyes has he got?', 'How many eyes does Bip have?'] },
      { answer: 'Bip is an alien.', question: 'Who is Bip?', hint: 'Who …?', accept: ['What is Bip?'] },
      { answer: 'Yes, it is. It is broken.', question: 'Is the spaceship broken?', hint: 'Is the …?', accept: ['Is it broken?'] },
      { answer: 'No, he isn\'t. Lucky is happy.', question: 'Is Lucky scared?', hint: 'Is Lucky …?' },
      { answer: 'His antennae glow because he is happy.', question: 'Why do his antennae glow?', hint: 'Why …?', accept: ['Why do Bip\'s antennae glow?'] },
      { answer: 'He is small and green.', question: 'What is Bip like?', hint: 'What is … like?', accept: ['What does Bip look like?', 'What is he like?'] },
    ],
    dictation: ['It is round and silver.', 'Bip is an alien.', 'He is small and green.'],
    reorder: [
      { words: ['got', 'Bip', 'has', 'three', 'eyes'], answer: 'Bip has got three eyes.' },
      { words: ['broken', 'The', 'spaceship', 'is'], answer: 'The spaceship is broken.' },
    ],
    rewrite: [
      { prompt: 'I have got three eyes. (Bip)', answer: 'Bip has got three eyes.', instructionVi: 'Viết lại câu với chủ ngữ trong ngoặc, đổi have got thành has got.' },
      { prompt: 'I am an alien. (He)', answer: 'He is an alien.', instructionVi: 'Viết lại câu, bắt đầu bằng từ trong ngoặc.' },
    ],
  },
  // 102
  {
    id: 'en-102', no: 102, level: 1, pack: 'alien',
    title: 'Bip Likes Pho',
    topic: 'Bíp ăn thử món Việt',
    grammar: {
      point: 'like / don\'t like; can / can\'t',
      explainVi: 'Dùng "I like …" để nói mình thích, "I don\'t like …" để nói mình không thích. Dùng "can" để nói mình làm được việc gì, "can\'t" là không làm được. Sau can / can\'t là động từ nguyên mẫu.',
      pattern: 'I like / don\'t like + món ăn.   I can / can\'t + động từ.',
      examples: ['I like pho.', 'I don\'t like sticky rice.', 'Bip can\'t use chopsticks.'],
    },
    text: `Bip is hungry. Mum is in the kitchen. "Can you eat our food, Bip?" asks Mum. "Yes, I can!" says Bip.

Mum has got a big bowl of pho. Bip likes the noodles and the beef. His antennae glow! "I like pho!" he says.

Lan has got some xoi. It is sticky rice. "I don't like it. It is very sticky!" says Bip. Lan laughs.

Bip can't use chopsticks, but Minh can. "Look, Bip. Like this!" Now Bip can eat with chopsticks, too.

"On Lumo, we eat purple fruit," says Bip. "We don't eat noodles. But I like Vietnamese food!"`,
    vocab: [
      { word: 'hungry', vi: 'đói', emoji: '😋', example: 'I am hungry. Can I eat now?' },
      { word: 'kitchen', vi: 'nhà bếp', emoji: '🍳', example: 'Mum is in the kitchen.' },
      { word: 'bowl', vi: 'cái bát', emoji: '🍜', example: 'I have got a bowl of pho.' },
      { word: 'noodles', vi: 'sợi mì, sợi phở, bún', emoji: '🍝', example: 'I like noodles.' },
      { word: 'beef', vi: 'thịt bò', emoji: '🥩', example: 'Pho with beef is very good.' },
      { word: 'sticky', vi: 'dính, dẻo', emoji: '🍙', example: 'Xoi is sticky rice.' },
      { word: 'chopsticks', vi: 'đôi đũa', emoji: '🥢', example: 'I can eat with chopsticks.' },
      { word: 'fruit', vi: 'hoa quả, trái cây', emoji: '🍇', example: 'I like fruit.' },
    ],
    questions: [
      { type: 'mc', q: 'What does Bip like?', options: ['pho', 'xoi', 'mango'], answer: 0, listen: true },
      { type: 'tf', q: 'Bip likes sticky rice.', answer: false, listen: true },
      { type: 'mc', q: 'Where is Mum?', options: ['in the garden', 'in the kitchen', 'at school'], answer: 1 },
      { type: 'mc', q: 'Who can use chopsticks?', options: ['Minh', 'Lucky', 'Kitty'], answer: 0 },
      { type: 'tf', q: 'On Lumo, they eat purple fruit.', answer: true },
    ],
    makeQuestion: [
      { answer: 'Yes, I can!', question: 'Can you eat our food?', hint: 'Can you …?' },
      { answer: 'Mum is in the kitchen.', question: 'Where is Mum?', hint: 'Where is …?' },
      { answer: 'I like pho!', question: 'What food do you like?', hint: 'What food …?', accept: ['What do you like?'] },
      { answer: 'No, I don\'t. It is very sticky!', question: 'Do you like xoi?', hint: 'Do you like …?', accept: ['Do you like sticky rice?', 'Do you like it?'] },
      { answer: 'Because it is very sticky.', question: 'Why don\'t you like xoi?', hint: 'Why …?', accept: ['Why don\'t you like sticky rice?', 'Why do you not like xoi?', 'Why don\'t you like it?'] },
      { answer: 'Minh can use chopsticks.', question: 'Who can use chopsticks?', hint: 'Who …?' },
      { answer: 'We eat purple fruit.', question: 'What do you eat on Lumo?', hint: 'What do you eat …?' },
      { answer: 'No, I can\'t. Minh can.', question: 'Can you use chopsticks?', hint: 'Can you …?' },
    ],
    dictation: ['Bip is hungry.', 'Mum is in the kitchen.', 'It is sticky rice.'],
    reorder: [
      { words: ['like', 'I', 'pho'], answer: 'I like pho.' },
      { words: ['can', 'eat', 'Bip', 'chopsticks', 'with'], answer: 'Bip can eat with chopsticks.' },
    ],
    rewrite: [
      { prompt: 'I like noodles. (not)', answer: 'I don\'t like noodles.', accept: ['I do not like noodles.'], instructionVi: 'Viết lại thành câu phủ định với don\'t.' },
      { prompt: 'Bip can use chopsticks. (?)', answer: 'Can Bip use chopsticks?', instructionVi: 'Đổi thành câu hỏi, đưa Can lên đầu câu.' },
    ],
  },
  // 103
  {
    id: 'en-103', no: 103, level: 2, pack: 'alien',
    title: 'Bip Goes to School',
    topic: 'Bíp đi học cùng Minh',
    grammar: {
      point: 'Hiện tại đơn ngôi thứ ba; trạng từ tần suất always / usually / sometimes / never',
      explainVi: 'Khi chủ ngữ là he / she / it hoặc một người (Bip, Minh), động từ thêm -s / -es (sits, goes, washes). Trạng từ tần suất cho biết việc xảy ra thường xuyên đến đâu: always (luôn luôn), usually (thường), sometimes (thỉnh thoảng), never (không bao giờ). Chúng đứng trước động từ thường, sau động từ to be.',
      pattern: 'He / She + always / usually / sometimes / never + động từ-s / -es',
      examples: ['Bip always listens to the teacher.', 'He never talks in class.', 'He sometimes plays football.'],
    },
    text: `Bip lives with Minh's family now. Every morning, he gets up early and puts on Minh's old cap. The cap hides his antennae.

Bip goes to school with Minh. He sits next to Tom in Ms Hoa's class. He always listens to the teacher, and he never talks in class. He usually writes very fast because he has got three eyes!

At break time, Bip sometimes plays football with the boys. He is small, but he runs very fast.

Ms Hoa often asks, "Where is Bip from?" Minh always smiles and says, "He is from far away." Bip loves school because he learns something new every day.`,
    vocab: [
      { word: 'cap', vi: 'mũ lưỡi trai', emoji: '🧢', example: 'Bip puts on an old cap.' },
      { word: 'hide', vi: 'che, giấu', emoji: '🙈', example: 'The cap hides his antennae.' },
      { word: 'always', vi: 'luôn luôn', emoji: '✅', example: 'I always listen to my teacher.' },
      { word: 'never', vi: 'không bao giờ', emoji: '🚫', example: 'He never talks in class.' },
      { word: 'usually', vi: 'thường thường', emoji: '🔁', example: 'I usually walk to school.' },
      { word: 'sometimes', vi: 'thỉnh thoảng', emoji: '🌤️', example: 'We sometimes play football.' },
      { word: 'break time', vi: 'giờ ra chơi', emoji: '🔔', example: 'We play games at break time.' },
      { word: 'learn', vi: 'học, học được', emoji: '📘', example: 'He learns something new every day.' },
    ],
    questions: [
      { type: 'mc', q: 'Who does Bip sit next to?', options: ['Minh', 'Tom', 'Lan'], answer: 1, listen: true },
      { type: 'tf', q: 'Bip often talks in class.', answer: false, listen: true },
      { type: 'mc', q: 'What does Bip sometimes play at break time?', options: ['football', 'chess', 'badminton'], answer: 0 },
      { type: 'tf', q: 'The cap hides Bip\'s antennae.', answer: true },
      { type: 'short', q: 'Why does Bip write very fast?', answer: 'Because he has got three eyes.', accept: ['He has got three eyes.', 'three eyes', 'Because he has three eyes.'] },
    ],
    makeQuestion: [
      { answer: 'He gets up early.', question: 'When does Bip get up?', hint: 'When …?', accept: ['When does he get up?'] },
      { answer: 'He sits next to Tom.', question: 'Who does Bip sit next to?', hint: 'Who …?', accept: ['Who does he sit next to?'] },
      { answer: 'Because he has got three eyes.', question: 'Why does Bip write very fast?', hint: 'Why …?', accept: ['Why does he write very fast?', 'Why does Bip write fast?'] },
      { answer: 'No, he never talks in class.', question: 'Does Bip talk in class?', hint: 'Does Bip …?', accept: ['Does he talk in class?'] },
      { answer: 'He sometimes plays football.', question: 'What does Bip do at break time?', hint: 'What does … do …?', accept: ['What does he do at break time?', 'What does Bip play at break time?'] },
      { answer: 'Yes, he does. He runs very fast.', question: 'Does Bip run fast?', hint: 'Does Bip …?', accept: ['Does he run fast?', 'Does Bip run very fast?'] },
      { answer: 'He lives with Minh\'s family.', question: 'Where does Bip live?', hint: 'Where …?', accept: ['Where does he live?', 'Who does Bip live with?'] },
      { answer: 'He puts on Minh\'s old cap.', question: 'What does Bip put on every morning?', hint: 'What does …?', accept: ['What does he put on every morning?', 'What does Bip put on?'] },
    ],
    dictation: [
      'He sits next to Tom in Ms Hoa\'s class.',
      'He is small, but he runs very fast.',
      'Every morning, he gets up early and puts on Minh\'s old cap.',
    ],
    reorder: [
      { words: ['always', 'Bip', 'listens', 'teacher', 'the', 'to'], answer: 'Bip always listens to the teacher.' },
      { words: ['plays', 'sometimes', 'He', 'football'], answer: 'He sometimes plays football.' },
    ],
    rewrite: [
      { prompt: 'I always go to school with Minh. (Bip)', answer: 'Bip always goes to school with Minh.', instructionVi: 'Viết lại câu với chủ ngữ trong ngoặc, nhớ thêm -s / -es vào động từ.' },
      { prompt: 'Bip talks in class. (never)', answer: 'Bip never talks in class.', instructionVi: 'Thêm trạng từ tần suất trong ngoặc vào đúng chỗ.' },
    ],
  },
  // 104
  {
    id: 'en-104', no: 104, level: 2, pack: 'alien',
    title: 'Life on Planet Lumo',
    topic: 'Bíp kể về hành tinh Lumo',
    grammar: {
      point: 'So sánh hai nơi bằng hiện tại đơn; nối câu bằng and / but / because',
      explainVi: 'Dùng hiện tại đơn để kể những điều luôn đúng về một nơi (Lumo has got two suns). "and" nối hai ý giống nhau, "but" nối hai ý trái ngược, "because" nêu lí do.',
      pattern: 'Câu 1 + and / but / because + câu 2',
      examples: ['Earth has got one sun, but Lumo has got two suns.', 'Your sea is blue, but our sea is purple.', 'I like Earth because people are kind.'],
    },
    text: `One evening, Bip and Minh sit in the garden and look at the stars. "Where is Lumo?" asks Minh. Bip points to a tiny purple star.

"Lumo is very different from Earth," says Bip. "Earth has got one sun, but Lumo has got two suns. Our sky is orange in the day and pink at night. Your sea is blue, but our sea is purple.

On Lumo, children don't go to school by bus. They fly because they have got small wings on their shoes! We don't eat rice, but we eat big purple fruit.

I like Earth because people are kind here. But I miss my mum and dad."`,
    vocab: [
      { word: 'star', vi: 'ngôi sao', emoji: '⭐', example: 'Bip points to a tiny star.' },
      { word: 'different', vi: 'khác, khác biệt', emoji: '🔀', example: 'Lumo is very different from Earth.' },
      { word: 'Earth', vi: 'Trái Đất', emoji: '🌍', example: 'We live on Earth.' },
      { word: 'sun', vi: 'mặt trời', emoji: '☀️', example: 'Lumo has got two suns.' },
      { word: 'sky', vi: 'bầu trời', emoji: '🌌', example: 'The sky is blue today.' },
      { word: 'sea', vi: 'biển', emoji: '🌊', example: 'Our sea is purple.' },
      { word: 'wing', vi: 'cánh', emoji: '🪽', example: 'Birds have got two wings.' },
      { word: 'miss', vi: 'nhớ (người, nơi ở xa)', emoji: '💭', example: 'I miss my grandma.' },
    ],
    questions: [
      { type: 'mc', q: 'How many suns has Lumo got?', options: ['one', 'two', 'three'], answer: 1, listen: true },
      { type: 'tf', q: 'The sea on Lumo is blue.', answer: false, listen: true },
      { type: 'mc', q: 'How do children go to school on Lumo?', options: ['by bus', 'on foot', 'they fly'], answer: 2 },
      { type: 'short', q: 'What colour is the sky on Lumo at night?', answer: 'It is pink.', accept: ['pink', 'It is pink at night.', 'It\'s pink.'] },
      { type: 'tf', q: 'Bip misses his mum and dad.', answer: true },
    ],
    makeQuestion: [
      { answer: 'They look at the stars.', question: 'What do Bip and Minh look at?', hint: 'What do …?', accept: ['What do they look at?'] },
      { answer: 'Bip points to a tiny purple star.', question: 'Where does Bip point?', hint: 'Where …?', accept: ['What does Bip point to?'] },
      { answer: 'Lumo has got two suns.', question: 'How many suns has Lumo got?', hint: 'How many …?', accept: ['How many suns does Lumo have?', 'How many suns has it got?'] },
      { answer: 'Because they have got small wings on their shoes.', question: 'Why do children on Lumo fly to school?', hint: 'Why …?', accept: ['Why do they fly to school?', 'Why do children fly to school?', 'Why do they fly?', 'Why can children on Lumo fly?'] },
      { answer: 'No, they don\'t. They fly.', question: 'Do children on Lumo go to school by bus?', hint: 'Do children …?', accept: ['Do they go to school by bus?'] },
      { answer: 'Because people are kind here.', question: 'Why do you like Earth?', hint: 'Why …?', accept: ['Why does Bip like Earth?'] },
      { answer: 'It is purple.', question: 'What colour is the sea on Lumo?', hint: 'What colour …?', accept: ['What colour is the sea?', 'What colour is your sea?'] },
      { answer: 'They sit in the garden one evening.', question: 'When do they sit in the garden?', hint: 'When …?', accept: ['When do Bip and Minh sit in the garden?'] },
    ],
    dictation: ['Bip points to a tiny purple star.', 'Your sea is blue, but our sea is purple.', 'I like Earth because people are kind here.'],
    reorder: [
      { words: ['got', 'Lumo', 'has', 'two', 'suns'], answer: 'Lumo has got two suns.' },
      { words: ['because', 'I', 'Earth', 'like', 'people', 'kind', 'are'], answer: 'I like Earth because people are kind.' },
    ],
    rewrite: [
      { prompt: 'Earth has got one sun. Lumo has got two suns. (but)', answer: 'Earth has got one sun, but Lumo has got two suns.', accept: ['Earth has got one sun but Lumo has got two suns.'], instructionVi: 'Nối hai câu bằng từ trong ngoặc.' },
      { prompt: 'Bip misses home. His family is on Lumo. (because)', answer: 'Bip misses home because his family is on Lumo.', instructionVi: 'Nối hai câu bằng từ trong ngoặc.' },
    ],
  },
  // 105
  {
    id: 'en-105', no: 105, level: 3, pack: 'alien',
    title: 'Lost in the Old Quarter',
    topic: 'Bíp lạc ở phố cổ, bà bán xôi giúp',
    grammar: {
      point: 'Quá khứ đơn của động từ bất quy tắc: took, saw, ran, sat, gave, ate…',
      explainVi: 'Kể chuyện đã xảy ra thì dùng quá khứ đơn. Nhiều động từ không thêm -ed mà đổi hẳn dạng: take → took, see → saw, run → ran, sit → sat, give → gave, eat → ate, feel → felt, buy → bought. Dạng quá khứ giống nhau với mọi chủ ngữ.',
      pattern: 'S + V2 (dạng quá khứ) + …',
      examples: ['Mum took the children to the Old Quarter.', 'Bip saw a big balloon.', 'The old woman gave him some xoi.'],
    },
    text: `Last Sunday, Mum took Minh, Lan and Bip to the Old Quarter. The streets were busy and noisy. Bip saw a man with a big balloon and ran after it.

Soon he was lost. He sat down on a chair next to a xoi stall, and his antennae went dark.

An old woman sold sticky rice there. She saw the sad little boy in a cap and gave him a warm bag of xoi. "Your family will come," she said.

Bip ate the xoi and felt better. Then Minh came round the corner with Mum. Bip ran to them, and his antennae glowed again. Mum bought xoi for everyone and thanked the kind woman.`,
    vocab: [
      { word: 'noisy', vi: 'ồn ào', emoji: '📢', example: 'The streets were busy and noisy.' },
      { word: 'lost', vi: 'bị lạc', emoji: '😟', example: 'Bip was lost in the Old Quarter.' },
      { word: 'stall', vi: 'quầy hàng, sạp hàng', emoji: '🏪', example: 'She has got a small xoi stall.' },
      { word: 'sold', vi: 'đã bán (quá khứ của sell)', emoji: '💰', example: 'An old woman sold sticky rice.' },
      { word: 'gave', vi: 'đã cho, đã đưa (quá khứ của give)', emoji: '🎁', example: 'She gave him a bag of xoi.' },
      { word: 'felt', vi: 'đã cảm thấy (quá khứ của feel)', emoji: '😊', example: 'Bip felt better after he ate.' },
      { word: 'corner', vi: 'góc phố, chỗ rẽ', emoji: '↪️', example: 'Minh came round the corner.' },
      { word: 'bought', vi: 'đã mua (quá khứ của buy)', emoji: '🛒', example: 'Mum bought xoi for everyone.' },
    ],
    questions: [
      { type: 'mc', q: 'Where did Mum take the children?', options: ['to the zoo', 'to the Old Quarter', 'to school'], answer: 1, listen: true },
      { type: 'tf', q: 'Bip ran after a balloon.', answer: true, listen: true },
      { type: 'short', q: 'What did the old woman give Bip?', answer: 'She gave him a warm bag of xoi.', accept: ['a bag of xoi', 'xoi', 'a warm bag of xoi', 'sticky rice', 'She gave him xoi.'] },
      { type: 'short', q: 'How did Bip feel after he ate the xoi?', answer: 'He felt better.', accept: ['better', 'He felt better after he ate the xoi.'] },
      { type: 'mc', q: 'What did Mum buy for everyone?', options: ['balloons', 'xoi', 'pho'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'Mum took them to the Old Quarter.', question: 'Where did Mum take them?', hint: 'Where did …?', accept: ['Where did Mum take the children?', 'Where did Mum take Minh, Lan and Bip?'] },
      { answer: 'He saw a man with a big red balloon.', question: 'What did Bip see?', hint: 'What did …?', accept: ['What did he see?'] },
      { answer: 'Because he ran after a balloon.', question: 'Why was Bip lost?', hint: 'Why …?', accept: ['Why did Bip get lost?', 'Why was he lost?', 'Why did he get lost?'] },
      { answer: 'He sat down next to a xoi stall.', question: 'Where did Bip sit down?', hint: 'Where did …?', accept: ['Where did he sit down?', 'Where did he sit?', 'Where did Bip sit?'] },
      { answer: 'An old woman sold sticky rice there.', question: 'Who sold sticky rice there?', hint: 'Who …?', accept: ['Who sold sticky rice?', 'Who sold xoi?'] },
      { answer: 'Yes, he did. He felt better.', question: 'Did Bip feel better?', hint: 'Did Bip …?', accept: ['Did he feel better?'] },
      { answer: 'Minh came round the corner.', question: 'Who came round the corner?', hint: 'Who …?' },
      { answer: 'They went there last Sunday.', question: 'When did they go to the Old Quarter?', hint: 'When did …?', accept: ['When did Mum take them to the Old Quarter?', 'When did Mum take the children to the Old Quarter?'] },
    ],
    dictation: ['The streets were busy and noisy.', 'An old woman sold sticky rice there.', 'Bip ate the xoi and felt better.'],
    reorder: [
      { words: ['saw', 'Bip', 'balloon', 'a', 'big'], answer: 'Bip saw a big balloon.' },
      { words: ['woman', 'The', 'gave', 'him', 'xoi'], answer: 'The woman gave him xoi.' },
    ],
    rewrite: [
      { prompt: 'Bip eats the xoi. (Yesterday)', answer: 'Yesterday, Bip ate the xoi.', accept: ['Yesterday Bip ate the xoi.', 'Bip ate the xoi yesterday.'], instructionVi: 'Viết lại câu ở thì quá khứ đơn, bắt đầu bằng từ trong ngoặc. Chú ý động từ bất quy tắc.' },
      { prompt: 'Mum buys xoi for everyone. (Last Sunday)', answer: 'Last Sunday, Mum bought xoi for everyone.', accept: ['Last Sunday Mum bought xoi for everyone.', 'Mum bought xoi for everyone last Sunday.'], instructionVi: 'Viết lại câu ở thì quá khứ đơn, bắt đầu bằng từ trong ngoặc. Chú ý động từ bất quy tắc.' },
    ],
  },
  // 106
  {
    id: 'en-106', no: 106, level: 3, pack: 'alien',
    title: 'Taller, Faster, Smaller',
    topic: 'Bíp dự ngày hội thể thao',
    grammar: {
      point: 'So sánh hơn và so sánh nhất: faster than, the fastest',
      explainVi: 'So sánh hai người / vật: tính từ ngắn thêm -er và "than" (faster than, bigger than). So sánh một người với cả nhóm: "the" + tính từ thêm -est (the fastest, the smallest). Tính từ tận cùng phụ âm sau một nguyên âm thì gấp đôi phụ âm (big → bigger); good → better → the best.',
      pattern: 'A + be + adj-er + than + B.   A + be + the + adj-est (+ of all / in …)',
      examples: ['Tom was faster than Minh.', 'Bip was the fastest of all.', 'He was the smallest child in the school.'],
    },
    text: `On Sports Day, Bip joined Minh's class team. He was the smallest child in the school, but he was very fast.

In the running race, Tom was faster than Minh, but Bip was the fastest of all. Everyone cheered. In the high jump, Bip jumped higher than the tallest boy because his legs were like springs!

Then came the tug of war. Class 3B was bigger and stronger than Minh's class. Bip pulled, but he was lighter than the others, and he flew into the air! Everyone laughed, and Bip laughed the loudest.

Minh's class didn't win the tug of war, but they won two races. "This is the best day on Earth!" said Bip.`,
    vocab: [
      { word: 'team', vi: 'đội', emoji: '👥', example: 'Bip joined the class team.' },
      { word: 'race', vi: 'cuộc đua, cuộc chạy thi', emoji: '🏃', example: 'Tom won the running race.' },
      { word: 'fast', vi: 'nhanh', emoji: '⚡', example: 'Bip was the fastest of all.' },
      { word: 'cheer', vi: 'reo hò cổ vũ', emoji: '📣', example: 'Everyone cheered for Bip.' },
      { word: 'jump', vi: 'nhảy', emoji: '🦘', example: 'Bip jumped very high.' },
      { word: 'strong', vi: 'khỏe', emoji: '💪', example: 'Class 3B was stronger than us.' },
      { word: 'pull', vi: 'kéo', emoji: '🪢', example: 'Pull the rope hard!' },
      { word: 'light', vi: 'nhẹ', emoji: '🪶', example: 'A feather is lighter than a stone.' },
    ],
    questions: [
      { type: 'mc', q: 'Who was the fastest in the running race?', options: ['Tom', 'Minh', 'Bip'], answer: 2, listen: true },
      { type: 'tf', q: 'Bip was the tallest child in the school.', answer: false, listen: true },
      { type: 'short', q: 'Why did Bip jump so high?', answer: 'Because his legs were like springs.', accept: ['His legs were like springs.', 'because his legs were like springs'] },
      { type: 'short', q: 'How many races did Minh\'s class win?', answer: 'They won two races.', accept: ['two', 'two races', 'Two races.'] },
      { type: 'mc', q: 'What happened to Bip in the tug of war?', options: ['He fell asleep.', 'He flew into the air.', 'He won the game.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'Tom was faster than Minh.', question: 'Who was faster, Tom or Minh?', hint: 'Who was faster …?', accept: ['Who was faster than Minh?'] },
      { answer: 'Bip was the fastest of all.', question: 'Who was the fastest?', hint: 'Who was the …?', accept: ['Who was the fastest of all?', 'Who was the fastest in the running race?'] },
      { answer: 'Because he was lighter than the others.', question: 'Why did Bip fly into the air?', hint: 'Why …?', accept: ['Why did he fly into the air?', 'Why did Bip fly up into the air?'] },
      { answer: 'Class 3B was bigger and stronger.', question: 'Which class was bigger and stronger?', hint: 'Which class …?', accept: ['Which class was stronger?', 'Which class was bigger?'] },
      { answer: 'No, they didn\'t. But they won two races.', question: 'Did Minh\'s class win the tug of war?', hint: 'Did …?', accept: ['Did they win the tug of war?'] },
      { answer: 'Yes, he was. He was the smallest child in the school.', question: 'Was Bip the smallest child in the school?', hint: 'Was Bip …?', accept: ['Was Bip the smallest?', 'Was he the smallest child in the school?'] },
      { answer: 'They won two races.', question: 'How many races did they win?', hint: 'How many …?', accept: ['How many races did Minh\'s class win?'] },
      { answer: 'He joined the team on Sports Day.', question: 'When did Bip join the class team?', hint: 'When …?', accept: ['When did Bip join Minh\'s class team?', 'When did he join the team?', 'When did Bip join the team?'] },
    ],
    dictation: [
      'He was the smallest child in the school, but he was very fast.',
      'Class 3B was bigger and stronger than Minh\'s class.',
      'Everyone laughed, and Bip laughed the loudest.',
    ],
    reorder: [
      { words: ['faster', 'Tom', 'than', 'was', 'Minh'], answer: 'Tom was faster than Minh.' },
      { words: ['the', 'Bip', 'fastest', 'was'], answer: 'Bip was the fastest.' },
    ],
    rewrite: [
      { prompt: 'Tom is tall. Bip is short. (taller)', answer: 'Tom is taller than Bip.', instructionVi: 'Viết một câu so sánh hơn, dùng từ trong ngoặc.' },
      { prompt: 'No one in the school is smaller than Bip. (smallest)', answer: 'Bip is the smallest child in the school.', accept: ['Bip is the smallest in the school.'], instructionVi: 'Viết lại câu dùng so sánh nhất với từ trong ngoặc.' },
    ],
  },
  // 107
  {
    id: 'en-107', no: 107, level: 4, pack: 'alien',
    title: 'Bip Misses Home',
    topic: 'Bíp nhớ nhà, các bạn làm đèn Trung thu',
    grammar: {
      point: 'Hiện tại hoàn thành: ever / never / since / for',
      explainVi: 'Hiện tại hoàn thành (have / has + V3) nói về trải nghiệm hoặc việc bắt đầu trong quá khứ và còn kéo dài tới bây giờ. "Have you ever …?" hỏi đã từng chưa; "never" là chưa bao giờ. "for" + khoảng thời gian (for two months), "since" + mốc thời gian hoặc một việc (since he arrived).',
      pattern: 'S + have / has + V3 + for / since …   Have / Has + S + ever + V3 …?',
      examples: ['Bip has lived here for two months.', 'He has learned many words since he arrived.', 'Have you ever made a lantern?'],
    },
    text: `Bip has lived with Minh's family for two months. He has learned a lot of Vietnamese words since he arrived, and he has made many friends. But tonight his antennae are not glowing. He misses Lumo.

"I have never been away from home for so long," he says.

Lan has an idea. The Mid-Autumn Festival is next week. "Have you ever made a lantern?" she asks. "Never," says Bip.

The children make star lanterns with red paper and bamboo. Tom has brought some candles, and Grandma has sent mooncakes. On the night of the festival, they walk with their lanterns. Bip looks up at the full moon. "Lumo has two suns but no moon," he says. His antennae glow again.`,
    vocab: [
      { word: 'arrive', vi: 'đến, tới nơi', emoji: '🛬', example: 'He has learned a lot since he arrived.' },
      { word: 'miss', vi: 'nhớ (người, nơi ở xa)', emoji: '💭', example: 'Bip misses his home.' },
      { word: 'festival', vi: 'lễ hội, Tết', emoji: '🎉', example: 'The Mid-Autumn Festival is next week.' },
      { word: 'lantern', vi: 'đèn lồng', emoji: '🏮', example: 'Have you ever made a lantern?' },
      { word: 'bamboo', vi: 'cây tre, nan tre', emoji: '🎋', example: 'We make lanterns with paper and bamboo.' },
      { word: 'candle', vi: 'cây nến', emoji: '🕯️', example: 'Put a candle in the lantern.' },
      { word: 'mooncake', vi: 'bánh Trung thu', emoji: '🥮', example: 'Grandma has sent mooncakes.' },
      { word: 'moon', vi: 'mặt trăng', emoji: '🌕', example: 'Look at the full moon!' },
    ],
    questions: [
      { type: 'mc', q: 'How long has Bip lived with Minh\'s family?', options: ['for two weeks', 'for two months', 'for two years'], answer: 1, listen: true },
      { type: 'tf', q: 'Bip has made a lantern before.', answer: false, listen: true },
      { type: 'short', q: 'Why are Bip\'s antennae not glowing tonight?', answer: 'Because he misses Lumo.', accept: ['He misses Lumo.', 'He misses home.', 'Because he misses home.'] },
      { type: 'short', q: 'What has Grandma sent?', answer: 'She has sent mooncakes.', accept: ['mooncakes', 'Grandma has sent mooncakes.'] },
      { type: 'mc', q: 'Why do Bip\'s antennae glow again at the end?', options: ['Because he eats a mooncake.', 'Because he feels happy with his friends.', 'Because Lumo has no moon.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'He has lived with them for two months.', question: 'How long has Bip lived with Minh\'s family?', hint: 'How long …?', accept: ['How long has he lived with them?', 'How long has Bip lived with them?'] },
      { answer: 'No, I have never made a lantern.', question: 'Have you ever made a lantern?', hint: 'Have you ever …?' },
      { answer: 'Because he misses Lumo.', question: 'Why are Bip\'s antennae not glowing?', hint: 'Why …?', accept: ['Why aren\'t Bip\'s antennae glowing?', 'Why aren\'t his antennae glowing?', 'Why are his antennae not glowing?'] },
      { answer: 'It is next week.', question: 'When is the Mid-Autumn Festival?', hint: 'When is …?', accept: ['When is the festival?'] },
      { answer: 'They make star lanterns with red paper and bamboo.', question: 'What do the children make?', hint: 'What do …?', accept: ['What do they make?', 'What do the children make lanterns with?'] },
      { answer: 'Tom has brought some candles.', question: 'What has Tom brought?', hint: 'What has …?' },
      { answer: 'Yes, he has. He has made many friends.', question: 'Has Bip made many friends?', hint: 'Has Bip …?', accept: ['Has he made many friends?', 'Has Bip made friends?'] },
      { answer: 'Grandma has sent them.', question: 'Who has sent the mooncakes?', hint: 'Who …?', accept: ['Who has sent mooncakes?', 'Who sent the mooncakes?'] },
    ],
    dictation: [
      'Bip has lived with Minh\'s family for two months.',
      'The children make star lanterns with red paper and bamboo.',
      'On the night of the festival, they walk with their lanterns.',
    ],
    reorder: [
      { words: ['ever', 'you', 'made', 'Have', 'a', 'lantern'], answer: 'Have you ever made a lantern?' },
      { words: ['lived', 'He', 'here', 'for', 'has', 'two', 'months'], answer: 'He has lived here for two months.' },
    ],
    rewrite: [
      { prompt: 'Bip came to Earth two months ago. He is still here. (for)', answer: 'Bip has been on Earth for two months.', accept: ['Bip has lived on Earth for two months.', 'Bip has been here for two months.'], instructionVi: 'Viết lại thành một câu ở hiện tại hoàn thành với từ trong ngoặc.' },
      { prompt: 'Bip has made a lantern. (Câu hỏi với ever)', answer: 'Has Bip ever made a lantern?', instructionVi: 'Đổi thành câu hỏi với "ever".' },
    ],
  },
  // 108
  {
    id: 'en-108', no: 108, level: 4, pack: 'alien',
    title: 'Fixing the Spaceship',
    topic: 'Sửa phi thuyền bằng đồ tái chế',
    grammar: {
      point: 'Mệnh đề quan hệ who / which; may / might',
      explainVi: '"who" thay cho người, "which" thay cho vật; mệnh đề đứng ngay sau danh từ để nói rõ đó là người / vật nào (an old fan which still works). "may / might" + động từ nguyên mẫu nói điều có thể xảy ra nhưng không chắc; "might" chắc ít hơn một chút.',
      pattern: 'người + who + V …   vật + which + V …   S + may / might (not) + V',
      examples: ['Tom brings an old fan which still works.', 'Dad, who is good at fixing things, gives them some wire.', 'It might fly!'],
    },
    text: `Bip's spaceship needs a new engine, window and wing. "Shops on Earth don't sell spaceship parts," says Bip. "But we might find old things which we can recycle," says Minh.

The children collect old things. Lan finds plastic bottles which are clean. Tom brings an old fan which still works. Dad, who is good at fixing things, gives them some wire. Grandma sends a pot lid.

Bip uses the fan as an engine and the bottles as a window. The pot lid becomes a new wing. "It may not look beautiful," says Bip, "but it might fly!"

That evening, Bip presses a green button. The engine makes a happy noise, and the spaceship lifts a little off the ground.`,
    vocab: [
      { word: 'engine', vi: 'động cơ', emoji: '⚙️', example: 'The spaceship needs a new engine.' },
      { word: 'recycle', vi: 'tái chế', emoji: '♻️', example: 'We recycle old bottles.' },
      { word: 'collect', vi: 'thu gom, sưu tầm', emoji: '🧺', example: 'The children collect old things.' },
      { word: 'bottle', vi: 'cái chai', emoji: '🍶', example: 'Lan finds plastic bottles.' },
      { word: 'wire', vi: 'dây điện, dây thép', emoji: '🔌', example: 'Dad gives them some wire.' },
      { word: 'lid', vi: 'cái nắp, vung', emoji: '🍲', example: 'The pot lid becomes a wing.' },
      { word: 'button', vi: 'cái nút bấm', emoji: '🔘', example: 'Press the green button.' },
      { word: 'noise', vi: 'tiếng động, tiếng ồn', emoji: '🔊', example: 'The engine makes a happy noise.' },
    ],
    questions: [
      { type: 'mc', q: 'What does Tom bring?', options: ['plastic bottles', 'an old fan', 'some wire'], answer: 1, listen: true },
      { type: 'tf', q: 'Dad is good at fixing things.', answer: true, listen: true },
      { type: 'short', q: 'What does Bip use as a window?', answer: 'He uses the plastic bottles.', accept: ['the bottles', 'plastic bottles', 'He uses the bottles as a window.', 'the plastic bottles'] },
      { type: 'short', q: 'Why do the children collect old things?', answer: 'Because shops on Earth don\'t sell spaceship parts.', accept: ['To fix the spaceship.', 'to fix the spaceship', 'Because shops do not sell spaceship parts.', 'Because they want to fix the spaceship.'] },
      { type: 'mc', q: 'How does Bip feel at the end?', options: ['happy and hopeful', 'angry', 'bored'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'It needs a new engine, window and wing.', question: 'What does the spaceship need?', hint: 'What does …?', accept: ['What does Bip\'s spaceship need?', 'What does it need?'] },
      { answer: 'Dad gives them some wire.', question: 'Who gives them some wire?', hint: 'Who …?', accept: ['Who gives the children some wire?', 'Who gives them wire?'] },
      { answer: 'Because shops on Earth don\'t sell spaceship parts.', question: 'Why do the children collect old things?', hint: 'Why …?', accept: ['Why do they collect old things?', 'Why do they need old things?'] },
      { answer: 'She sends a big pot lid.', question: 'What does Grandma send?', hint: 'What does …?', accept: ['What does Grandma send them?'] },
      { answer: 'The pot lid becomes a new wing.', question: 'Which thing becomes a new wing?', hint: 'Which …?', accept: ['What becomes a new wing?'] },
      { answer: 'Yes, it does. The fan still works.', question: 'Does the old fan still work?', hint: 'Does …?', accept: ['Does the fan still work?', 'Does Tom\'s fan still work?'] },
      { answer: 'That evening.', question: 'When does Bip press the green button?', hint: 'When …?', accept: ['When does he press the button?', 'When does Bip press the button?'] },
      { answer: 'It lifts a little off the ground.', question: 'How far does the spaceship lift?', hint: 'How far …?', accept: ['How high does the spaceship lift?', 'How high does it lift?'] },
    ],
    dictation: [
      'Tom brings an old fan which still works.',
      'Dad, who is good at fixing things, gives them some wire.',
      'The engine makes a happy noise, and the spaceship lifts a little off the ground.',
    ],
    reorder: [
      { words: ['might', 'It', 'fly'], answer: 'It might fly.' },
      { words: ['is', 'Dad', 'a', 'man', 'who', 'fixes', 'things'], answer: 'Dad is a man who fixes things.' },
    ],
    rewrite: [
      { prompt: 'Tom brings an old fan. It still works. (which)', answer: 'Tom brings an old fan which still works.', accept: ['Tom brings an old fan that still works.'], instructionVi: 'Nối hai câu bằng từ trong ngoặc.' },
      { prompt: 'Perhaps the spaceship will fly. (might)', answer: 'The spaceship might fly.', instructionVi: 'Viết lại câu dùng might (có thể, không chắc chắn).' },
    ],
  },
  // 109
  {
    id: 'en-109', no: 109, level: 5, pack: 'alien',
    title: 'If I Lived on Lumo',
    topic: 'Minh tưởng tượng sống ở Lumo',
    grammar: {
      point: 'Câu điều kiện loại 2: If + quá khứ, would + V; wish + quá khứ',
      explainVi: 'Câu điều kiện loại 2 nói về điều không có thật ở hiện tại: mệnh đề If dùng quá khứ, mệnh đề chính dùng would / could + động từ nguyên mẫu. "I wish + quá khứ" nói điều mình ước mà hiện không có (I wish I had three eyes). Lỗi hay gặp: dùng "will" thay cho "would", hoặc "I wish I have".',
      pattern: 'If + S + V2, S + would / could + V.   S + wish + S + V2 / could + V',
      examples: ['If I lived on Lumo, I would have two shadows.', 'I wish I had three eyes like you.', 'I wish I could stay here longer.'],
    },
    text: `The spaceship was almost ready. One night, Minh lay in bed and imagined life on Lumo.

"If I lived on Lumo, I would have two shadows because there are two suns," he told Bip. "I would swim in the purple sea every day, and I wouldn't need a bus because I would fly to school."

Bip smiled. "If you came to Lumo, you would be the tallest boy in my town."

"I wish I had three eyes like you," said Minh. "Then I could read and draw at the same time."

Bip's antennae glowed softly. "And I wish I could stay here longer. If I stayed, I would eat pho every morning." Minh laughed, but he felt a little sad. His friend would leave soon.`,
    vocab: [
      { word: 'almost', vi: 'gần như, sắp', emoji: '🔜', example: 'The spaceship was almost ready.' },
      { word: 'town', vi: 'thị trấn, thành phố', emoji: '🏘️', example: 'There is a big park in my town.' },
      { word: 'imagine', vi: 'tưởng tượng', emoji: '💭', example: 'Minh imagined life on Lumo.' },
      { word: 'shadow', vi: 'cái bóng', emoji: '👥', example: 'In the sun, you have a shadow.' },
      { word: 'wish', vi: 'ước', emoji: '🌠', example: 'I wish I had three eyes.' },
      { word: 'stay', vi: 'ở lại', emoji: '🏠', example: 'I wish I could stay here longer.' },
      { word: 'softly', vi: 'dịu dàng, nhè nhẹ', emoji: '🌙', example: 'His antennae glowed softly.' },
      { word: 'leave', vi: 'rời đi', emoji: '👋', example: 'His friend would leave soon.' },
    ],
    questions: [
      { type: 'mc', q: 'Why would Minh have two shadows on Lumo?', options: ['Because there are two suns.', 'Because he has three eyes.', 'Because the sea is purple.'], answer: 0, listen: true },
      { type: 'tf', q: 'Bip wishes he could stay on Earth longer.', answer: true, listen: true },
      { type: 'short', q: 'How would Minh go to school on Lumo?', answer: 'He would fly to school.', accept: ['He would fly.', 'fly', 'by flying', 'He would fly there.'] },
      { type: 'short', q: 'What would Bip eat every morning if he stayed?', answer: 'He would eat pho.', accept: ['pho', 'He would eat pho every morning.'] },
      { type: 'mc', q: 'Why did Minh feel a little sad?', options: ['Because his friend would leave soon.', 'Because he could not fly.', 'Because he was tired.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'I would swim in the purple sea every day.', question: 'What would you do if you lived on Lumo?', hint: 'What would you do if …?', accept: ['What would you do on Lumo?'] },
      { answer: 'Because there are two suns.', question: 'Why would Minh have two shadows?', hint: 'Why …?', accept: ['Why would he have two shadows?', 'Why would you have two shadows?', 'Why would Minh have two shadows on Lumo?'] },
      { answer: 'I wish I had three eyes like you.', question: 'What do you wish?', hint: 'What do you …?', accept: ['What does Minh wish?'] },
      { answer: 'Yes, I would. I would eat pho every morning.', question: 'Would you eat pho every morning if you stayed?', hint: 'Would you …?', accept: ['Would you eat pho if you stayed?', 'Would Bip eat pho every morning?'] },
      { answer: 'No, I wouldn\'t. I would fly to school.', question: 'Would you need a bus on Lumo?', hint: 'Would you …?', accept: ['Would you need a bus?'] },
      { answer: 'He was in bed.', question: 'Where was Minh that night?', hint: 'Where …?', accept: ['Where was Minh?', 'Where was he?'] },
      { answer: 'You would be the tallest boy in my town.', question: 'How tall would I be on Lumo?', hint: 'How tall …?', accept: ['How tall would Minh be on Lumo?'] },
      { answer: 'Because his friend would leave soon.', question: 'Why did Minh feel sad?', hint: 'Why …?', accept: ['Why did Minh feel a little sad?', 'Why did he feel sad?'] },
    ],
    dictation: [
      'If you came to Lumo, you would be the tallest boy in my town.',
      'Then I could read and draw at the same time.',
      'Minh laughed, but he felt a little sad.',
    ],
    reorder: [
      { words: ['would', 'If', 'wings', 'I', 'fly', 'had', 'I'], answer: 'If I had wings, I would fly.' },
      { words: ['wish', 'I', 'could', 'I', 'stay'], answer: 'I wish I could stay.' },
    ],
    rewrite: [
      { prompt: 'I don\'t have three eyes. (I wish)', answer: 'I wish I had three eyes.', instructionVi: 'Viết câu ước với từ trong ngoặc, động từ lùi về quá khứ.' },
      { prompt: 'I don\'t live on Lumo, so I don\'t have two shadows. (If)', answer: 'If I lived on Lumo, I would have two shadows.', accept: ['If I lived on Lumo I would have two shadows.'], instructionVi: 'Viết lại thành câu điều kiện loại 2, bắt đầu bằng If.' },
    ],
  },
  // 110
  {
    id: 'en-110', no: 110, level: 5, pack: 'alien',
    title: 'Goodbye, Bip',
    topic: 'Bíp chia tay, hứa trở lại',
    grammar: {
      point: 'Câu tường thuật (told / said / promised that …); bị động quá khứ was / were + V3',
      explainVi: 'Kể lại lời người khác thì lùi thì: is → was, will → would, have → had, và đổi người (I → he, my → his). Dùng "tell + người + that …" hoặc "say that …". Câu bị động quá khứ: was / were + V3 (+ by + người làm), dùng khi muốn nói về vật được làm.',
      pattern: 'S + told + O / said + that + S + V (lùi thì).   S + was / were + V3 (+ by …)',
      examples: ['He promised that he would come back one day.', 'The spaceship was painted green and yellow by Lan.', 'Its lights were seen all over Hanoi.'],
    },
    text: `On the last evening, everyone came to Minh's garden. The spaceship was painted green and yellow by Lan, and a Vietnamese flag was drawn on its side by Minh. A big box of mooncakes was packed by Grandma for the trip.

Bip thanked everyone. He told Ms Hoa that her class was the best class in the universe. He told Lucky that he would miss his wet nose. Then he hugged Minh and promised that he would come back one day.

"Look at the sky every night," he said. "When two stars blink, I am saying hello."

The spaceship rose into the air, and its lights were seen all over Hanoi. Later, Minh said that Bip was the best friend he had ever had.`,
    vocab: [
      { word: 'paint', vi: 'sơn, tô màu', emoji: '🎨', example: 'The spaceship was painted by Lan.' },
      { word: 'flag', vi: 'lá cờ', emoji: '🇻🇳', example: 'A flag was drawn on its side.' },
      { word: 'pack', vi: 'gói, xếp vào hộp', emoji: '📦', example: 'The mooncakes were packed by Grandma.' },
      { word: 'universe', vi: 'vũ trụ', emoji: '🌌', example: 'There are many stars in the universe.' },
      { word: 'hug', vi: 'ôm', emoji: '🤗', example: 'Bip hugged his best friend.' },
      { word: 'promise', vi: 'hứa', emoji: '🤞', example: 'He promised that he would come back.' },
      { word: 'blink', vi: 'nhấp nháy', emoji: '✨', example: 'The stars blink at night.' },
      { word: 'rose', vi: 'đã bay lên (quá khứ của rise)', emoji: '🚀', example: 'The spaceship rose into the air.' },
    ],
    questions: [
      { type: 'mc', q: 'Who painted the spaceship?', options: ['Minh', 'Lan', 'Grandma'], answer: 1, listen: true },
      { type: 'tf', q: 'The mooncakes were packed by Tom.', answer: false, listen: true },
      { type: 'short', q: 'What did Bip tell Lucky?', answer: 'He told Lucky that he would miss his wet nose.', accept: ['He would miss his wet nose.', 'that he would miss his wet nose', 'He said that he would miss his wet nose.'] },
      { type: 'short', q: 'What did Bip promise Minh?', answer: 'He promised that he would come back one day.', accept: ['He would come back one day.', 'to come back one day', 'He promised to come back.', 'that he would come back one day'] },
      { type: 'mc', q: 'Why will Minh look at the sky every night?', options: ['To see two stars blink and think of Bip.', 'To count the moons.', 'To find a new spaceship.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'It was painted by Lan.', question: 'Who was the spaceship painted by?', hint: 'Who was … by?', accept: ['Who painted the spaceship?', 'Who was it painted by?'] },
      { answer: 'It was drawn on the side of the spaceship.', question: 'Where was the flag drawn?', hint: 'Where was …?', accept: ['Where was the Vietnamese flag drawn?', 'Where was the flag on its side drawn?'] },
      { answer: 'He told her that her class was the best class in the universe.', question: 'What did Bip tell Ms Hoa?', hint: 'What did … tell …?', accept: ['What did he tell Ms Hoa?', 'What did Bip say to Ms Hoa?'] },
      { answer: 'Because it was Bip\'s last evening.', question: 'Why did everyone come to Minh\'s garden?', hint: 'Why …?', accept: ['Why did everyone come to the garden?'] },
      { answer: 'Yes, they were. They were seen all over Hanoi.', question: 'Were the lights seen all over Hanoi?', hint: 'Were …?', accept: ['Were its lights seen all over Hanoi?', 'Were the lights of the spaceship seen all over Hanoi?'] },
      { answer: 'It was packed by Grandma.', question: 'Who was the box of mooncakes packed by?', hint: 'Who was … by?', accept: ['Who packed the mooncakes?', 'Who packed the box of mooncakes?', 'Who were the mooncakes packed by?'] },
      { answer: 'It was painted green and yellow.', question: 'What colour was the spaceship painted?', hint: 'What colour …?', accept: ['What colours was the spaceship painted?', 'What colour was it painted?'] },
      { answer: 'When two stars blink.', question: 'When is Bip saying hello?', hint: 'When …?', accept: ['When does Bip say hello?'] },
    ],
    dictation: [
      'On the last evening, everyone came to Minh\'s garden.',
      'He told Lucky that he would miss his wet nose.',
      'Later, Minh said that Bip was the best friend he had ever had.',
    ],
    reorder: [
      { words: ['painted', 'was', 'The', 'spaceship', 'by', 'Lan'], answer: 'The spaceship was painted by Lan.' },
      { words: ['would', 'He', 'that', 'said', 'come', 'he', 'back'], answer: 'He said that he would come back.' },
    ],
    rewrite: [
      { prompt: '"I will come back one day," Bip said. (Bip said that …)', answer: 'Bip said that he would come back one day.', accept: ['Bip said he would come back one day.'], instructionVi: 'Viết lại thành câu tường thuật: lùi thì will → would, đổi I → he.' },
      { prompt: 'Grandma packed a big box of mooncakes. (A big box of mooncakes)', answer: 'A big box of mooncakes was packed by Grandma.', instructionVi: 'Viết lại câu ở dạng bị động, bắt đầu bằng từ trong ngoặc.' },
    ],
  },
];
