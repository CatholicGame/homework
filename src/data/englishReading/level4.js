// Cấp 4 ⭐⭐⭐⭐ Pre-intermediate (A2): bài 61–80. Thiết kế: docs/tieng-anh/thiet-ke-bai-doc.md
export default [
  {
    id: 'en-061', no: 61, level: 4,
    title: 'Have You Ever Seen Snow?',
    topic: 'Trải nghiệm',
    grammar: {
      point: 'Hiện tại hoàn thành: ever / never',
      explainVi: 'Dùng hiện tại hoàn thành (have / has + V3) để nói về trải nghiệm trong đời, không nói rõ lúc nào. "Have you ever …?" hỏi đã từng bao giờ chưa; "never" nghĩa là chưa bao giờ. Nếu nói rõ thời gian (last winter, yesterday) thì dùng quá khứ đơn.',
      pattern: 'Have / Has + S + ever + V3 …?   S + have / has + never + V3 …',
      examples: ['Have you ever seen snow?', 'I have never been to Japan.', 'Tom has never tried snails.'],
    },
    text: `Minh is in grade 6 now, and Tom is still his best friend. One afternoon, they sat in the school yard and talked about their experiences.

"Have you ever seen snow?" Tom asked.

"No, I have never seen snow," Minh answered. "It doesn't snow in Ha Noi. Have you ever been to Sa Pa?"

"Yes, I have. I went there last winter, but there was no snow. I have seen snow in Japan, though. It was cold and beautiful."

Minh has never flown on a plane, but he has eaten snails. Tom has never tried them. He thinks they look strange.

"Have you ever eaten snails?" Minh asked.

"Never!" Tom laughed. "But I will try them tomorrow."`,
    vocab: [
      { word: 'experience', vi: 'trải nghiệm', emoji: '🌍', example: 'Travelling is a great experience.' },
      { word: 'snow', vi: 'tuyết', emoji: '❄️', example: 'It never snows in Ho Chi Minh City.' },
      { word: 'yard', vi: 'sân', emoji: '🏫', example: 'The children play in the school yard.' },
      { word: 'winter', vi: 'mùa đông', emoji: '🧣', example: 'It is cold in winter.' },
      { word: 'plane', vi: 'máy bay', emoji: '✈️', example: 'Have you ever flown on a plane?' },
      { word: 'snail', vi: 'con ốc', emoji: '🐌', example: 'Snails are a popular street food in Ha Noi.' },
      { word: 'strange', vi: 'lạ, kì lạ', emoji: '🤔', example: 'That fruit looks strange.' },
    ],
    questions: [
      { type: 'tf', q: 'Minh has seen snow in Ha Noi.', answer: false, listen: true },
      { type: 'mc', q: 'Where has Tom seen snow?', options: ['in Sa Pa', 'in Japan', 'in Ha Noi'], answer: 1, listen: true },
      { type: 'short', q: 'When did Tom go to Sa Pa?', answer: 'He went there last winter.', accept: ['last winter', 'He went to Sa Pa last winter.'] },
      { type: 'short', q: 'What has Minh eaten that Tom has never tried?', answer: 'He has eaten snails.', accept: ['snails', 'Minh has eaten snails.'] },
      { type: 'short', q: 'Why has Minh never seen snow?', answer: 'Because it does not snow in Ha Noi.', accept: ["Because it doesn't snow in Ha Noi.", 'It does not snow in Ha Noi.', "It doesn't snow in Ha Noi."] },
    ],
    makeQuestion: [
      { answer: 'No, I have never seen snow.', question: 'Have you ever seen snow?', hint: 'Have you ever …?' },
      { answer: 'Yes, I have. I went to Sa Pa last winter.', question: 'Have you ever been to Sa Pa?', hint: 'Have you ever been to …?' },
      { answer: 'Yes, he has eaten snails.', question: 'Has Minh ever eaten snails?', hint: 'Has Minh ever …?' },
    ],
    dictation: [
      'One afternoon, they sat in the school yard and talked about their experiences.',
      'I went there last winter, but there was no snow.',
      'Minh has never flown on a plane, but he has eaten snails.',
    ],
    reorder: [
      { words: ['ever', 'seen', 'you', 'snow', 'have'], answer: 'Have you ever seen snow?' },
      { words: ['tried', 'Tom', 'snails', 'never', 'has'], answer: 'Tom has never tried snails.' },
    ],
    rewrite: [
      { prompt: 'This is the first time I have flown on a plane. (never)', answer: 'I have never flown on a plane before.', accept: ['I have never flown on a plane.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
      { prompt: 'Tom has eaten snails. (Câu hỏi với ever)', answer: 'Has Tom ever eaten snails?', instructionVi: 'Đổi thành câu hỏi với "ever".' },
    ],
  },
  {
    id: 'en-062', no: 62, level: 4,
    title: 'Not Finished Yet',
    topic: 'Chuẩn bị đi học',
    grammar: {
      point: 'Hiện tại hoàn thành: just / already / yet',
      explainVi: '"just" = vừa mới; "already" = đã … rồi (sớm hơn mong đợi), hai từ này đứng giữa have / has và V3. "yet" đứng cuối câu hỏi (… chưa?) và câu phủ định (chưa …).',
      pattern: 'S + have / has + just / already + V3.   Have / Has + S + V3 … yet?   S + haven\'t / hasn\'t + V3 … yet.',
      examples: ['I have just put my pencil case in my bag.', 'Dad has already started the motorbike.', "You haven't brushed your teeth yet."],
    },
    text: `It is the first day of school, and Lan and Minh are getting ready.

"Have you packed your bag yet, Minh?" Mum asks.

"Yes, I have already packed it. I have just put my new pencil case in it."

"Lan, have you had breakfast yet?"

"Not yet, Mum. I have just washed my face." Lan sits down at the table and eats her bread quickly.

Outside, Dad has already started the motorbike and is waiting for them. Lucky is barking at the gate because he wants to come too.

"Minh, you haven't brushed your teeth yet!" Mum says.

"Oh no! I have forgotten again!" Minh runs to the bathroom.

"We haven't been late yet this year," Dad laughs.`,
    vocab: [
      { word: 'ready', vi: 'sẵn sàng', emoji: '✅', example: 'Are you ready for school?' },
      { word: 'pack', vi: 'xếp đồ, đóng gói', emoji: '🎒', example: 'I have packed my bag.' },
      { word: 'pencil case', vi: 'hộp bút', emoji: '✏️', example: 'My pencil case is blue.' },
      { word: 'breakfast', vi: 'bữa sáng', emoji: '🍞', example: 'Have you had breakfast yet?' },
      { word: 'motorbike', vi: 'xe máy', emoji: '🛵', example: 'Dad takes us to school by motorbike.' },
      { word: 'forget', vi: 'quên', emoji: '😅', example: 'I have forgotten my homework.' },
      { word: 'bathroom', vi: 'phòng tắm', emoji: '🚿', example: 'He brushes his teeth in the bathroom.' },
    ],
    questions: [
      { type: 'mc', q: 'What has Minh just put in his bag?', options: ['his book', 'his new pencil case', 'his lunch box'], answer: 1, listen: true },
      { type: 'tf', q: 'Lan has already had breakfast.', answer: false, listen: true },
      { type: 'short', q: 'What has Dad already done?', answer: 'He has already started the motorbike.', accept: ['He has started the motorbike.', 'started the motorbike'] },
      { type: 'short', q: 'What hasn\'t Minh done yet?', answer: 'He hasn\'t brushed his teeth yet.', accept: ['brushed his teeth', 'He has not brushed his teeth yet.', "He hasn't brushed his teeth."] },
      { type: 'mc', q: 'Why is Lucky barking at the gate?', options: ['He is hungry.', 'He wants to come too.', 'He sees a cat.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'Yes, I have already packed it.', question: 'Have you packed your bag yet?', hint: 'Have you … yet?' },
      { answer: 'Not yet. I have just washed my face.', question: 'Have you had breakfast yet?', hint: 'Have you had … yet?' },
    ],
    dictation: [
      'Lan sits down at the table and eats her bread quickly.',
      'Outside, Dad has already started the motorbike and is waiting for them.',
      'Lucky is barking at the gate because he wants to come too.',
    ],
    reorder: [
      { words: ['already', 'it', 'have', 'I', 'packed'], answer: 'I have already packed it.' },
      { words: ['breakfast', 'had', 'yet', 'you', 'have'], answer: 'Have you had breakfast yet?' },
    ],
    rewrite: [
      { prompt: 'Lan has had breakfast. (Phủ định với yet)', answer: "Lan hasn't had breakfast yet.", accept: ['Lan has not had breakfast yet.'], instructionVi: 'Đổi sang câu phủ định, dùng "yet".' },
      { prompt: 'Minh washed his face a moment ago. (just)', answer: 'Minh has just washed his face.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-063', no: 63, level: 4,
    title: 'Friends for Five Years',
    topic: 'Tình bạn',
    grammar: {
      point: 'Hiện tại hoàn thành: since / for',
      explainVi: 'Hiện tại hoàn thành dùng cho việc bắt đầu trong quá khứ và vẫn còn đến bây giờ. "for" + khoảng thời gian (for five years, for three months); "since" + mốc thời gian (since 2021, since grade 1, since that day).',
      pattern: 'S + have / has + V3 + for + khoảng thời gian.   S + have / has + V3 + since + mốc thời gian.',
      examples: ['Tom has lived in Viet Nam for five years.', 'They have been friends since grade 1.', 'How long have you known Minh?'],
    },
    text: `Tom came to Ha Noi from Sydney when he was six. He has lived in Viet Nam for five years. On his first day at school, he sat next to Minh, and they have been best friends since that day.

Tom has studied Vietnamese since grade 1, so he speaks it very well.

The two boys have played in the same football team for three years. Tom is a good goalkeeper, and Minh is a fast player. Lucky has known Tom since he was a puppy, so he always runs to the gate when Tom visits.

"We have been friends for five years," Minh says proudly. "I hope we will be friends forever."`,
    vocab: [
      { word: 'friend', vi: 'bạn', emoji: '🤝', example: 'Tom is my best friend.' },
      { word: 'next to', vi: 'bên cạnh', emoji: '👫', example: 'I sit next to Minh.' },
      { word: 'team', vi: 'đội', emoji: '⚽', example: 'Our team has won three matches.' },
      { word: 'goalkeeper', vi: 'thủ môn', emoji: '🧤', example: 'The goalkeeper caught the ball.' },
      { word: 'puppy', vi: 'chó con', emoji: '🐶', example: 'Lucky was a cute puppy.' },
      { word: 'proudly', vi: 'một cách tự hào', emoji: '😊', example: 'She showed her medal proudly.' },
      { word: 'forever', vi: 'mãi mãi', emoji: '♾️', example: 'We will be friends forever.' },
    ],
    questions: [
      { type: 'mc', q: 'How long has Tom lived in Viet Nam?', options: ['for three years', 'for five years', 'for six years'], answer: 1, listen: true },
      { type: 'tf', q: 'Tom is a goalkeeper in the football team.', answer: true, listen: true },
      { type: 'short', q: 'Since when have Tom and Minh been best friends?', answer: 'They have been best friends since Tom\'s first day at school.', accept: ['since his first day at school', 'since that day', 'since grade 1', 'since the first day at school'] },
      { type: 'short', q: 'How long have the boys played in the same football team?', answer: 'They have played in the same team for three years.', accept: ['for three years', 'three years'] },
      { type: 'short', q: 'Why does Lucky run to the gate when Tom visits?', answer: 'Because Lucky has known Tom since he was a puppy.', accept: ['Lucky has known Tom since he was a puppy.', 'Because he has known Tom for a long time.', 'He knows Tom well.'] },
    ],
    makeQuestion: [
      { answer: 'I have lived in Viet Nam for five years.', question: 'How long have you lived in Viet Nam?', hint: 'How long have you …?' },
      { answer: 'Tom has studied Vietnamese since grade 1.', question: 'How long has Tom studied Vietnamese?', hint: 'How long has Tom …?' },
    ],
    dictation: [
      'Tom has studied Vietnamese since grade 1, so he speaks it very well.',
      'Tom is a good goalkeeper, and Minh is a fast player.',
      'The two boys have played in the same football team for three years.',
    ],
    reorder: [
      { words: ['for', 'five', 'have', 'friends', 'we', 'years', 'been'], answer: 'We have been friends for five years.' },
      { words: ['grade', 'studied', 'since', 'has', 'Tom', 'Vietnamese', '1'], answer: 'Tom has studied Vietnamese since grade 1.' },
    ],
    rewrite: [
      { prompt: 'Tom started to live in Viet Nam five years ago. (for)', answer: 'Tom has lived in Viet Nam for five years.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
      { prompt: 'Lucky has known Tom for two years. (since 2024)', answer: 'Lucky has known Tom since 2024.', instructionVi: 'Viết lại câu, thay "for" bằng "since" và mốc thời gian trong ngoặc.' },
    ],
  },
  {
    id: 'en-064', no: 64, level: 4,
    title: 'The Power Cut',
    topic: 'Mất điện',
    grammar: {
      point: 'Quá khứ tiếp diễn: was / were + V-ing',
      explainVi: 'Quá khứ tiếp diễn diễn tả việc đang xảy ra tại một thời điểm trong quá khứ (lúc 8 giờ tối qua). Dùng "was" với I / he / she / it, "were" với you / we / they. Khác quá khứ đơn: quá khứ đơn là việc đã xong, quá khứ tiếp diễn là việc đang dở.',
      pattern: 'S + was / were + V-ing.   S + wasn\'t / weren\'t + V-ing.   Was / Were + S + V-ing?',
      examples: ['At eight o\'clock, Dad was watching TV.', 'Lan and Minh were drawing.', 'What were you doing last night?'],
    },
    text: `Last Friday evening, there was a power cut in Minh's street. At eight o'clock, everyone in the family was doing something different.

Mum was marking her students' tests in the living room. Dad was watching a football match on TV. Lan was cooking soup in the kitchen, and Minh was drawing a picture of a dragon. Grandma was visiting them that week, and she was telling Lucky a story. Kitty was sleeping on the sofa.

Suddenly, all the lights went out. It was dark and very hot. Dad found some candles, and the family sat together on the balcony. They weren't watching TV or using their phones. They were talking and laughing.

"I like power cuts," Minh said.`,
    vocab: [
      { word: 'power cut', vi: 'mất điện', emoji: '🔌', example: 'There was a power cut last night.' },
      { word: 'mark', vi: 'chấm (bài)', emoji: '📝', example: 'The teacher is marking our tests.' },
      { word: 'match', vi: 'trận đấu', emoji: '⚽', example: 'Dad was watching a football match.' },
      { word: 'dragon', vi: 'con rồng', emoji: '🐉', example: 'Minh drew a green dragon.' },
      { word: 'suddenly', vi: 'đột nhiên', emoji: '⚡', example: 'Suddenly, it started to rain.' },
      { word: 'candle', vi: 'cây nến', emoji: '🕯️', example: 'We lit some candles.' },
      { word: 'balcony', vi: 'ban công', emoji: '🏠', example: 'There are flowers on our balcony.' },
    ],
    questions: [
      { type: 'mc', q: 'What was Lan doing at eight o\'clock?', options: ['She was reading.', 'She was cooking soup.', 'She was marking tests.'], answer: 1, listen: true },
      { type: 'tf', q: 'Kitty was sleeping on the sofa.', answer: true, listen: true },
      { type: 'short', q: 'What was Minh doing?', answer: 'He was drawing a picture of a dragon.', accept: ['drawing a picture of a dragon', 'He was drawing a dragon.', 'drawing'] },
      { type: 'short', q: 'Where did the family sit after the lights went out?', answer: 'They sat together on the balcony.', accept: ['on the balcony', 'They sat on the balcony.'] },
      { type: 'mc', q: 'Why did Minh like the power cut?', options: ['Because he could sleep early.', 'Because the family talked and laughed together.', 'Because he didn\'t have to do homework.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'Dad was watching a football match.', question: 'What was Dad doing?', hint: 'What was … doing?' },
      { answer: 'She was marking tests in the living room.', question: 'What was Mum doing?', hint: 'What was … doing?' },
      { answer: 'No, they weren\'t. They were talking and laughing.', question: 'Were they watching TV?', hint: 'Were they …?' },
    ],
    dictation: [
      'Last Friday evening, there was a power cut in Minh\'s street.',
      'Grandma was visiting them that week, and she was telling Lucky a story.',
      'Dad found some candles, and the family sat together on the balcony.',
    ],
    reorder: [
      { words: ['was', 'match', 'Dad', 'a', 'watching', 'football'], answer: 'Dad was watching a football match.' },
      { words: ['talking', 'were', 'they', 'laughing', 'and'], answer: 'They were talking and laughing.' },
    ],
    rewrite: [
      { prompt: 'Kitty sleeps on the sofa. (at eight o\'clock last night)', answer: 'Kitty was sleeping on the sofa at eight o\'clock last night.', accept: ['At eight o\'clock last night, Kitty was sleeping on the sofa.'], instructionVi: 'Viết lại câu ở quá khứ tiếp diễn với mốc thời gian trong ngoặc.' },
      { prompt: 'Mum and Dad were watching TV. (Phủ định)', answer: "Mum and Dad weren't watching TV.", accept: ['Mum and Dad were not watching TV.'], instructionVi: 'Đổi sang câu phủ định.' },
    ],
  },
  {
    id: 'en-065', no: 65, level: 4,
    title: 'While We Were Sleeping',
    topic: 'Bão đêm',
    grammar: {
      point: 'Quá khứ tiếp diễn + while / when',
      explainVi: 'Việc dài đang diễn ra dùng quá khứ tiếp diễn, việc ngắn chen vào dùng quá khứ đơn. "while" thường đi với việc dài (while we were sleeping), "when" thường đi với việc ngắn (when a window banged).',
      pattern: 'While + S + was / were + V-ing, S + V2.   S + was / were + V-ing + when + S + V2.',
      examples: ['While we were sleeping, the wind started to blow.', 'Minh was dreaming when the lights went out.', 'Dad checked the doors while Mum was looking for a torch.'],
    },
    text: `Last night, a big storm came to Ha Noi. While we were sleeping, the wind started to blow very hard. Lan woke up when a window banged. While she was closing it, she saw the trees in the street. They were moving like dancers in the rain.

Minh was dreaming about football when the lights went out. Lucky was barking under the bed, and Kitty was hiding in a box.

Dad got up and checked the doors while Mum was looking for a torch. When the storm stopped, it was nearly four o'clock.

In the morning, we found a fallen tree in front of our house. While we were cleaning the street, our neighbours came out to help us.`,
    vocab: [
      { word: 'storm', vi: 'cơn bão', emoji: '⛈️', example: 'The storm came at night.' },
      { word: 'wind', vi: 'gió', emoji: '💨', example: 'The wind was very strong.' },
      { word: 'bang', vi: 'đập mạnh, kêu sầm', emoji: '🚪', example: 'The door banged in the wind.' },
      { word: 'dream', vi: 'mơ', emoji: '💭', example: 'I was dreaming about the sea.' },
      { word: 'bark', vi: 'sủa', emoji: '🐕', example: 'Lucky barks at strangers.' },
      { word: 'torch', vi: 'đèn pin', emoji: '🔦', example: 'Mum found a torch in the drawer.' },
      { word: 'neighbour', vi: 'hàng xóm', emoji: '🏘️', example: 'Our neighbours are very kind.' },
    ],
    questions: [
      { type: 'mc', q: 'What woke Lan up?', options: ['Lucky', 'a window', 'the lights'], answer: 1, listen: true },
      { type: 'tf', q: 'Kitty was hiding under the bed.', answer: false, listen: true },
      { type: 'short', q: 'What was Minh doing when the lights went out?', answer: 'He was dreaming about football.', accept: ['dreaming about football', 'He was sleeping.', 'He was dreaming.'] },
      { type: 'short', q: 'What was Mum doing while Dad was checking the doors?', answer: 'She was looking for a torch.', accept: ['looking for a torch', 'She was looking for a torch.'] },
      { type: 'short', q: 'Why did the neighbours come out in the morning?', answer: 'They came out to help clean the street.', accept: ['to help', 'They wanted to help.', 'to help clean the street', 'They came to help.', 'to help us'] },
    ],
    makeQuestion: [
      { answer: 'I was dreaming about football.', question: 'What were you doing when the lights went out?', hint: 'What were you doing when …?' },
      { answer: 'She was closing the window.', question: 'What was Lan doing when she saw the trees?', hint: 'What was Lan doing when …?' },
    ],
    dictation: [
      'Lucky was barking under the bed, and Kitty was hiding in a box.',
      'Minh was dreaming about football when the lights went out.',
      'In the morning, we found a fallen tree in front of our house.',
    ],
    reorder: [
      { words: ['we', 'while', 'sleeping', 'were', 'the', 'storm', 'came'], answer: 'The storm came while we were sleeping.' },
      { words: ['window', 'Lan', 'when', 'a', 'woke', 'banged', 'up'], answer: 'Lan woke up when a window banged.' },
    ],
    rewrite: [
      { prompt: 'Mum was looking for a torch. Dad checked the doors. (while)', answer: 'While Mum was looking for a torch, Dad checked the doors.', accept: ['Dad checked the doors while Mum was looking for a torch.'], instructionVi: 'Nối hai câu thành một câu, dùng từ trong ngoặc.' },
      { prompt: 'Minh was dreaming. The lights went out. (when)', answer: 'Minh was dreaming when the lights went out.', accept: ['When the lights went out, Minh was dreaming.'], instructionVi: 'Nối hai câu thành một câu, dùng từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-066', no: 66, level: 4,
    title: 'If It Rains Tomorrow',
    topic: 'Kế hoạch dã ngoại',
    grammar: {
      point: 'Câu điều kiện loại 1',
      explainVi: 'Câu điều kiện loại 1 nói về điều có thể xảy ra ở hiện tại hoặc tương lai và kết quả của nó. Mệnh đề "if" dùng hiện tại đơn, mệnh đề chính dùng will / won\'t + V. Khi "if" đứng đầu câu thì có dấu phẩy.',
      pattern: 'If + S + V (hiện tại đơn), S + will / won\'t + V.',
      examples: ['If it rains tomorrow, we will visit the museum.', 'If you take an umbrella, you will stay dry.', "We won't play football if it rains."],
    },
    text: `Ms Hoa's class is going to have a picnic in Thu Le Park on Sunday. But it is the rainy season, so they are making two plans.

"If it is sunny, we will play games on the grass," says Ms Hoa. "If it rains tomorrow, we will visit the museum instead."

Minh looks worried. "If we go to the museum, we won't play football."

"Don't worry," Tom says. "If it rains, we will play football next week."

Lan gives her brother some advice. "If you take an umbrella, you will stay dry. If you bring sandwiches, everyone will be happy."

Minh checks the weather on Dad's phone and smiles. "If it is sunny on Sunday, I will bring my ball!"`,
    vocab: [
      { word: 'picnic', vi: 'buổi dã ngoại', emoji: '🧺', example: 'We had a picnic in the park.' },
      { word: 'weather', vi: 'thời tiết', emoji: '🌤️', example: 'What will the weather be like tomorrow?' },
      { word: 'grass', vi: 'cỏ', emoji: '🌱', example: 'The children sat on the grass.' },
      { word: 'museum', vi: 'bảo tàng', emoji: '🏛️', example: 'We visited the history museum.' },
      { word: 'instead', vi: 'thay vào đó', emoji: '🔄', example: 'It rained, so we stayed home instead.' },
      { word: 'worried', vi: 'lo lắng', emoji: '😟', example: 'Minh looks worried about the test.' },
      { word: 'advice', vi: 'lời khuyên', emoji: '💡', example: 'My sister always gives me good advice.' },
      { word: 'umbrella', vi: 'cái ô', emoji: '☂️', example: 'Take an umbrella. It may rain.' },
    ],
    questions: [
      { type: 'mc', q: 'Where will the class go if it rains?', options: ['to the park', 'to the museum', 'to the cinema'], answer: 1, listen: true },
      { type: 'tf', q: 'The picnic is on Saturday.', answer: false, listen: true },
      { type: 'short', q: 'What will the class do if it is sunny?', answer: 'They will play games on the grass.', accept: ['play games on the grass', 'They will play games.'] },
      { type: 'short', q: 'Why does Minh look worried?', answer: 'Because if they go to the museum, they won\'t play football.', accept: ['He wants to play football.', 'Because he won\'t play football.', 'Because they will not play football.'] },
      { type: 'short', q: 'What will Minh bring if it is sunny?', answer: 'He will bring his ball.', accept: ['his ball', 'a ball', 'He will bring his ball.'] },
    ],
    makeQuestion: [
      { answer: 'If it rains, we will visit the museum.', question: 'What will you do if it rains?', hint: 'What will you do if …?' },
      { answer: 'Yes, I will. If it is sunny, I will bring my ball.', question: 'Will you bring your ball if it is sunny?', hint: 'Will you … if …?' },
    ],
    dictation: [
      'If it rains tomorrow, we will visit the museum instead.',
      "Minh checks the weather on Dad's phone and smiles.",
      'If it rains, we will play football next week.',
    ],
    reorder: [
      { words: ['rains', 'if', 'it', 'will', 'we', 'stay', 'home'], answer: 'If it rains, we will stay home.' },
      { words: ['you', 'umbrella', 'will', 'an', 'take', 'if', 'you', 'dry', 'stay'], answer: 'If you take an umbrella, you will stay dry.' },
    ],
    rewrite: [
      { prompt: 'Bring sandwiches, and everyone will be happy. (If)', answer: 'If you bring sandwiches, everyone will be happy.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, bắt đầu bằng "If".' },
      { prompt: 'It may rain. Then we won\'t have the picnic. (If)', answer: "If it rains, we won't have the picnic.", accept: ['If it rains, we will not have the picnic.', "We won't have the picnic if it rains."], instructionVi: 'Nối hai câu thành câu điều kiện loại 1.' },
    ],
  },
  {
    id: 'en-067', no: 67, level: 4,
    title: 'The Girl Who Loved Stars',
    topic: 'Thiên văn',
    grammar: {
      point: 'Mệnh đề quan hệ who / which / that',
      explainVi: 'Mệnh đề quan hệ giúp nói rõ người hoặc vật nào. "who" dùng cho người, "which" dùng cho vật / con vật, "that" dùng được cho cả người và vật. Mệnh đề đứng ngay sau danh từ nó bổ nghĩa.',
      pattern: 'người + who / that + V …   vật + which / that + V …',
      examples: ['Lan is a girl who loves stars.', 'She has a telescope which Grandpa gave her.', 'It is a book that tells stories about stars.'],
    },
    text: `Lan is a girl who loves stars. She has a small telescope which Grandpa gave her for her birthday. On clear nights, she climbs up to the roof of their building and looks at the sky.

Her favourite book is one that tells old stories about the stars. Ms Hoa lent it to her.

"Look, Minh! That is the bright star which sailors followed long ago," Lan says.

Lan wants to be a scientist who studies the planets. Last week, she saw a light that moved slowly across the sky.

"Is it a plane?" Minh asked.

"No, it is a satellite which goes around the Earth," Lan answered.

Minh thinks his sister is the cleverest person that he knows.`,
    vocab: [
      { word: 'telescope', vi: 'kính thiên văn', emoji: '🔭', example: 'Lan looks at the moon with her telescope.' },
      { word: 'clear', vi: 'quang đãng, trong', emoji: '🌌', example: 'On clear nights, you can see many stars.' },
      { word: 'roof', vi: 'mái nhà, sân thượng', emoji: '🏢', example: 'We watched the moon from the roof.' },
      { word: 'sailor', vi: 'thuỷ thủ', emoji: '⛵', example: 'The sailors followed the stars.' },
      { word: 'scientist', vi: 'nhà khoa học', emoji: '👩‍🔬', example: 'A scientist is a person who studies science.' },
      { word: 'planet', vi: 'hành tinh', emoji: '🪐', example: 'Mars is a red planet.' },
      { word: 'satellite', vi: 'vệ tinh', emoji: '🛰️', example: 'A satellite goes around the Earth.' },
    ],
    questions: [
      { type: 'mc', q: 'Who gave Lan the telescope?', options: ['Dad', 'Grandpa', 'Ms Hoa'], answer: 1, listen: true },
      { type: 'tf', q: 'The light that moved across the sky was a plane.', answer: false, listen: true },
      { type: 'short', q: 'What kind of book is Lan\'s favourite book?', answer: 'It is a book that tells old stories about the stars.', accept: ['a book that tells old stories about the stars', 'It tells old stories about the stars.', 'stories about the stars'] },
      { type: 'short', q: 'What does Lan want to be?', answer: 'She wants to be a scientist who studies the planets.', accept: ['a scientist', 'She wants to be a scientist.'] },
      { type: 'mc', q: 'How does Minh feel about his sister?', options: ['He thinks she is very clever.', 'He thinks she is boring.', 'He is angry with her.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'Grandpa gave her the telescope.', question: 'Who gave Lan the telescope?', hint: 'Who …?' },
      { answer: 'It was a satellite which goes around the Earth.', question: 'What was the light in the sky?', hint: 'What was …?' },
    ],
    dictation: [
      'She has a small telescope which Grandpa gave her for her birthday.',
      'Lan wants to be a scientist who studies the planets.',
      'Last week, she saw a light that moved slowly across the sky.',
    ],
    reorder: [
      { words: ['loves', 'is', 'who', 'a', 'Lan', 'stars', 'girl'], answer: 'Lan is a girl who loves stars.' },
      { words: ['a', 'goes', 'satellite', 'around', 'the', 'Earth', 'which', 'it', 'is'], answer: 'It is a satellite which goes around the Earth.' },
    ],
    rewrite: [
      { prompt: 'Lan is a girl. She loves stars. (who)', answer: 'Lan is a girl who loves stars.', accept: ['Lan is a girl that loves stars.'], instructionVi: 'Nối hai câu, dùng đại từ quan hệ trong ngoặc.' },
      { prompt: 'Lan has a telescope. Grandpa gave it to her. (which)', answer: 'Lan has a telescope which Grandpa gave her.', accept: ['Lan has a telescope which Grandpa gave to her.', 'Lan has a telescope that Grandpa gave her.', 'Lan has a telescope that Grandpa gave to her.'], instructionVi: 'Nối hai câu, dùng đại từ quan hệ trong ngoặc.' },
    ],
  },
  {
    id: 'en-068', no: 68, level: 4,
    title: 'Grandpa Used to Fish',
    topic: 'Làng quê xưa và nay',
    grammar: {
      point: 'used to + V',
      explainVi: '"used to + V" nói về thói quen hoặc sự việc thường xảy ra trong quá khứ nhưng nay không còn nữa. Phủ định: didn\'t use to; câu hỏi: Did … use to …? (sau did thì bỏ "d").',
      pattern: 'S + used to + V.   S + didn\'t use to + V.   Did + S + use to + V?',
      examples: ['Grandpa used to fish in the river.', "We didn't use to have electricity.", 'Did you use to go to school by bike?'],
    },
    text: `Last summer, Minh visited Grandpa. One evening, they sat by the pond, and Grandpa talked about the old days.

"When I was a boy, I used to fish in the river every morning. There used to be many big fish in it. We didn't use to have electricity, so we used to read by oil lamps."

"Did you use to go to school by bike?" Minh asked.

"No. I used to walk five kilometres. Now the village has a new road, and children go to school by bus."

Grandpa still fishes in his pond, but the river is not as clean as it used to be. "Life has changed a lot," he said. "But I still love this village."`,
    vocab: [
      { word: 'pond', vi: 'cái ao', emoji: '🐟', example: 'There are fish in Grandpa\'s pond.' },
      { word: 'river', vi: 'con sông', emoji: '🏞️', example: 'The river is near the village.' },
      { word: 'electricity', vi: 'điện', emoji: '💡', example: 'Long ago, the village had no electricity.' },
      { word: 'oil lamp', vi: 'đèn dầu', emoji: '🪔', example: 'People used to read by oil lamps.' },
      { word: 'kilometre', vi: 'ki-lô-mét', emoji: '📏', example: 'The school is two kilometres away.' },
      { word: 'village', vi: 'làng', emoji: '🏡', example: 'Grandpa lives in a small village.' },
      { word: 'clean', vi: 'sạch', emoji: '✨', example: 'The water in the river is not clean.' },
    ],
    questions: [
      { type: 'mc', q: 'What did Grandpa use to do every morning?', options: ['He used to swim.', 'He used to fish in the river.', 'He used to ride a bike.'], answer: 1, listen: true },
      { type: 'tf', q: 'Grandpa used to go to school by bus.', answer: false, listen: true },
      { type: 'short', q: 'How did Grandpa use to read at night?', answer: 'He used to read by oil lamps.', accept: ['by oil lamps', 'by oil lamp', 'They used to read by oil lamps.'] },
      { type: 'short', q: 'How do children go to school now?', answer: 'They go to school by bus.', accept: ['by bus', 'They go by bus.'] },
      { type: 'short', q: 'Why did people use to read by oil lamps?', answer: 'Because they didn\'t have electricity.', accept: ['Because they did not have electricity.', 'They had no electricity.', 'There was no electricity.'] },
    ],
    makeQuestion: [
      { answer: 'No, I didn\'t. I used to walk to school.', question: 'Did you use to go to school by bike?', hint: 'Did you use to …?' },
      { answer: 'He used to fish in the river.', question: 'What did Grandpa use to do every morning?', hint: 'What did … use to do?' },
    ],
    dictation: [
      'One evening, they sat by the pond, and Grandpa talked about the old days.',
      'There used to be many big fish in it.',
      'Now the village has a new road, and children go to school by bus.',
    ],
    reorder: [
      { words: ['used', 'Grandpa', 'fish', 'to', 'the', 'in', 'river'], answer: 'Grandpa used to fish in the river.' },
      { words: ['use', 'did', 'you', 'walk', 'to', 'school', 'to'], answer: 'Did you use to walk to school?' },
    ],
    rewrite: [
      { prompt: 'Grandpa walked to school every day when he was young, but he doesn\'t now. (used to)', answer: 'Grandpa used to walk to school every day.', accept: ['Grandpa used to walk to school every day when he was young.', 'Grandpa used to walk to school.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng "used to".' },
      { prompt: 'They used to have electricity. (Phủ định)', answer: "They didn't use to have electricity.", accept: ['They did not use to have electricity.'], instructionVi: 'Đổi sang câu phủ định.' },
    ],
  },
  {
    id: 'en-069', no: 69, level: 4,
    title: 'How Paper Is Made',
    topic: 'Quy trình làm giấy',
    grammar: {
      point: 'Bị động hiện tại đơn: am / is / are + V3',
      explainVi: 'Câu bị động dùng khi ta quan tâm đến việc được làm hơn là ai làm. Hiện tại đơn bị động: am / is / are + V3 (quá khứ phân từ). Muốn nói ai làm thì thêm "by + người / vật".',
      pattern: 'S + am / is / are + V3 (+ by …).   Câu chủ động: They cut the trees. → Bị động: The trees are cut.',
      examples: ['Paper is made from wood.', 'The wood is brought to the factory by truck.', 'Old paper is collected and recycled.'],
    },
    text: `Last week, Ms Hoa took her class to a paper factory near Ha Noi. A worker showed them how paper is made.

"First, trees are cut down, and the wood is brought to the factory by truck," she said. "Then the wood is cut into small pieces and mixed with water. This mixture is called pulp."

Next, the pulp is pressed between big rollers, and the water is removed. After that, the paper is dried and rolled up. Finally, it is sent to shops, offices and schools.

"Is old paper used again?" Tom asked.

"Yes. Old paper is collected and recycled here, too. It saves trees."

On the bus home, Minh said, "I will never waste paper again!"`,
    vocab: [
      { word: 'factory', vi: 'nhà máy', emoji: '🏭', example: 'Paper is made in a factory.' },
      { word: 'wood', vi: 'gỗ', emoji: '🪵', example: 'This table is made of wood.' },
      { word: 'truck', vi: 'xe tải', emoji: '🚚', example: 'The wood is brought by truck.' },
      { word: 'mixture', vi: 'hỗn hợp', emoji: '🥣', example: 'Wood and water make a mixture.' },
      { word: 'press', vi: 'ép, nén', emoji: '🗜️', example: 'The pulp is pressed by rollers.' },
      { word: 'recycle', vi: 'tái chế', emoji: '♻️', example: 'Old paper is recycled.' },
      { word: 'waste', vi: 'lãng phí', emoji: '🗑️', example: 'Don\'t waste water.' },
    ],
    questions: [
      { type: 'mc', q: 'How is the wood brought to the factory?', options: ['by boat', 'by truck', 'by train'], answer: 1, listen: true },
      { type: 'tf', q: 'The mixture of wood and water is called pulp.', answer: true, listen: true },
      { type: 'short', q: 'What happens to the pulp after it is pressed?', answer: 'The water is removed, and the paper is dried and rolled up.', accept: ['It is dried and rolled up.', 'The water is removed.', 'dried and rolled up'] },
      { type: 'short', q: 'Where is the paper sent?', answer: 'It is sent to shops, offices and schools.', accept: ['to shops, offices and schools', 'shops, offices and schools'] },
      { type: 'short', q: 'Why does Minh say he will never waste paper again?', answer: 'Because paper is made from trees.', accept: ['Paper is made from trees.', 'He wants to save trees.', 'Because he wants to save trees.'] },
    ],
    makeQuestion: [
      { answer: 'Paper is made from wood.', question: 'What is paper made from?', hint: 'What is … made from?' },
      { answer: 'Yes, old paper is collected and recycled.', question: 'Is old paper used again?', hint: 'Is … used …?' },
    ],
    dictation: [
      'Then the wood is cut into small pieces and mixed with water.',
      'Next, the pulp is pressed between big rollers, and the water is removed.',
      'Finally, it is sent to shops, offices and schools.',
    ],
    reorder: [
      { words: ['made', 'paper', 'how', 'is'], answer: 'How is paper made?' },
      { words: ['recycled', 'old', 'is', 'paper', 'here'], answer: 'Old paper is recycled here.' },
    ],
    rewrite: [
      { prompt: 'Workers cut the wood into small pieces.', answer: 'The wood is cut into small pieces.', accept: ['The wood is cut into small pieces by workers.'], instructionVi: 'Chuyển sang câu bị động.' },
      { prompt: 'The factory sends the paper to schools.', answer: 'The paper is sent to schools.', accept: ['The paper is sent to schools by the factory.'], instructionVi: 'Chuyển sang câu bị động.' },
    ],
  },
  {
    id: 'en-070', no: 70, level: 4,
    title: 'Healthy Habits',
    topic: 'Sống khoẻ',
    grammar: {
      point: 'a lot of / a few / a little; danh động từ (V-ing) làm chủ ngữ',
      explainVi: '"a lot of" = nhiều (dùng cả danh từ đếm được và không đếm được); "a few" = một vài (danh từ đếm được số nhiều); "a little" = một chút (danh từ không đếm được). V-ing có thể làm chủ ngữ và đi với động từ số ít: "Eating well is important."',
      pattern: 'a lot of + N.   a few + N số nhiều.   a little + N không đếm được.   V-ing + is / helps / keeps …',
      examples: ['Eating well is important.', 'You should eat a lot of vegetables but only a little sugar.', 'Dad eats a few bananas.'],
    },
    text: `This week, Ms Hoa's class is learning about healthy habits. "Eating well is very important," she says. "You should eat a lot of vegetables and fruit, but only a little sugar."

Minh loves fried chicken, so he feels a bit worried. Tom says, "Drinking water is better than drinking soft drinks."

Ms Hoa gives them a few more tips. "Sleeping for nine hours helps your brain. Playing outside for an hour a day keeps your body strong. Watching a lot of TV is bad for your eyes."

At home, Minh tells his family. Now Lan cooks with only a little oil, and Dad eats a few bananas instead of cakes. Walking after dinner has become the family's new habit.`,
    vocab: [
      { word: 'healthy', vi: 'tốt cho sức khoẻ', emoji: '🥗', example: 'Fruit is healthy food.' },
      { word: 'habit', vi: 'thói quen', emoji: '🔁', example: 'Reading every day is a good habit.' },
      { word: 'sugar', vi: 'đường', emoji: '🍬', example: 'Too much sugar is bad for your teeth.' },
      { word: 'fried', vi: 'chiên, rán', emoji: '🍗', example: 'Minh loves fried chicken.' },
      { word: 'soft drink', vi: 'nước ngọt', emoji: '🥤', example: 'Water is better than soft drinks.' },
      { word: 'tip', vi: 'mẹo, lời khuyên nhỏ', emoji: '💡', example: 'Ms Hoa gave us a few tips.' },
      { word: 'brain', vi: 'bộ não', emoji: '🧠', example: 'Sleep helps your brain.' },
      { word: 'strong', vi: 'khoẻ mạnh', emoji: '💪', example: 'Exercise keeps you strong.' },
    ],
    questions: [
      { type: 'mc', q: 'What does Ms Hoa say about sugar?', options: ['Eat a lot of it.', 'Eat only a little.', 'Never eat it.'], answer: 1, listen: true },
      { type: 'tf', q: 'Ms Hoa says watching a lot of TV is bad for your eyes.', answer: true, listen: true },
      { type: 'short', q: 'How many hours should children sleep?', answer: 'They should sleep for nine hours.', accept: ['nine hours', 'for nine hours', '9 hours'] },
      { type: 'short', q: 'What does Dad eat instead of cakes?', answer: 'He eats a few bananas.', accept: ['a few bananas', 'bananas'] },
      { type: 'mc', q: 'Why does Minh feel a bit worried?', options: ['Because he loves fried chicken.', 'Because he can\'t swim.', 'Because he is ill.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'Playing outside keeps your body strong.', question: 'What keeps your body strong?', hint: 'What keeps …?' },
      { answer: 'Lan cooks with only a little oil.', question: 'How much oil does Lan cook with?', hint: 'How much …?' },
      { answer: 'Dad eats a few bananas.', question: 'How many bananas does Dad eat?', hint: 'How many …?' },
    ],
    dictation: [
      'Minh loves fried chicken, so he feels a bit worried.',
      'Playing outside for an hour a day keeps your body strong.',
      "Walking after dinner has become the family's new habit.",
    ],
    reorder: [
      { words: ['well', 'important', 'is', 'eating', 'very'], answer: 'Eating well is very important.' },
      { words: ['a', 'eats', 'Dad', 'bananas', 'few'], answer: 'Dad eats a few bananas.' },
    ],
    rewrite: [
      { prompt: 'It is good to walk after dinner. (Walking …)', answer: 'Walking after dinner is good.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, bắt đầu bằng danh động từ.' },
      { prompt: 'Lan uses some oil, but not much. (a little)', answer: 'Lan uses a little oil.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-071', no: 71, level: 4,
    title: 'A Phone Call to Tom',
    topic: 'Lời mời, đề nghị',
    grammar: {
      point: 'Would you like …? / Could you …? / Can I …?',
      explainVi: '"Would you like (to) …?" dùng để mời lịch sự. "Could you …?" dùng để nhờ ai làm gì một cách lịch sự (lịch sự hơn "Can you …?"). "Can I …?" dùng để xin phép. Sau các từ này động từ để nguyên mẫu.',
      pattern: 'Would you like + N / to V?   Could you + V …?   Can I + V …?',
      examples: ['Would you like to come to my house?', 'Could you bring some fruit?', 'Can I bring my board game?'],
    },
    text: `On Saturday morning, Minh called Tom on Mum's phone.

"Hello, Tom. It's Minh. Would you like to come to my house this afternoon? Lan is going to make spring rolls."

"I'd love to! Can I bring my new board game?"

"Of course. Could you bring some fruit too? Mum would like some mangoes for dessert."

"Sure. Would you like me to bring my football as well?"

"Yes, please! We can play in the park after we eat."

"Could you tell me your address again? I have forgotten it."

"It's 25 Hang Bong Street. Could you come at two o'clock?"

"No problem. Can I bring my cousin Jack? He is visiting from Sydney."

"Of course! See you at two!"`,
    vocab: [
      { word: 'call', vi: 'gọi điện', emoji: '📞', example: 'Minh called Tom on Saturday.' },
      { word: 'board game', vi: 'trò chơi bàn cờ', emoji: '🎲', example: 'We played a board game after lunch.' },
      { word: 'mango', vi: 'quả xoài', emoji: '🥭', example: 'Mangoes are sweet in summer.' },
      { word: 'dessert', vi: 'món tráng miệng', emoji: '🍨', example: 'We had fruit for dessert.' },
      { word: 'address', vi: 'địa chỉ', emoji: '🏠', example: 'Could you tell me your address?' },
      { word: 'cousin', vi: 'anh / chị / em họ', emoji: '👦', example: 'My cousin lives in Sydney.' },
      { word: 'problem', vi: 'vấn đề', emoji: '👌', example: 'No problem, I can help you.' },
    ],
    questions: [
      { type: 'mc', q: 'What is Lan going to make?', options: ['pho', 'spring rolls', 'a cake'], answer: 1, listen: true },
      { type: 'tf', q: 'Tom remembers Minh\'s address.', answer: false, listen: true },
      { type: 'short', q: 'What does Minh ask Tom to bring?', answer: 'He asks Tom to bring some fruit.', accept: ['some fruit', 'fruit', 'mangoes', 'some mangoes'] },
      { type: 'short', q: 'What time should Tom come?', answer: 'He should come at two o\'clock.', accept: ['at two o\'clock', 'two o\'clock', 'at two', '2 o\'clock'] },
      { type: 'short', q: 'Why does Tom want to bring his cousin Jack?', answer: 'Because Jack is visiting from Sydney.', accept: ['Jack is visiting from Sydney.', 'He is visiting from Sydney.', 'Because he is visiting.'] },
    ],
    makeQuestion: [
      { answer: 'Yes, I\'d love to come to your house.', question: 'Would you like to come to my house?', hint: 'Would you like to …?' },
      { answer: 'Sure, I can bring some fruit.', question: 'Could you bring some fruit?', hint: 'Could you …?' },
      { answer: 'Of course you can bring your board game.', question: 'Can I bring my board game?', hint: 'Can I …?' },
    ],
    dictation: [
      "On Saturday morning, Minh called Tom on Mum's phone.",
      'Would you like to come to my house this afternoon?',
      'We can play in the park after we eat.',
    ],
    reorder: [
      { words: ['you', 'bring', 'could', 'fruit', 'some'], answer: 'Could you bring some fruit?' },
      { words: ['I', 'my', 'can', 'cousin', 'bring'], answer: 'Can I bring my cousin?' },
    ],
    rewrite: [
      { prompt: 'Do you want to come to my house? (Would you like …)', answer: 'Would you like to come to my house?', instructionVi: 'Viết lại thành lời mời lịch sự.' },
      { prompt: 'Tell me your address. (Could you …)', answer: 'Could you tell me your address?', accept: ['Could you tell me your address, please?'], instructionVi: 'Viết lại thành lời nhờ lịch sự.' },
    ],
  },
  {
    id: 'en-072', no: 72, level: 4,
    title: 'The Football Final',
    topic: 'Trận chung kết',
    grammar: {
      point: 'Quá khứ đơn và hiện tại hoàn thành',
      explainVi: 'Quá khứ đơn dùng cho việc đã xong ở một thời điểm rõ ràng (last Saturday, two minutes before the end). Hiện tại hoàn thành dùng khi không nói rõ lúc nào, khi khoảng thời gian chưa kết thúc (this year), hoặc với ever / never / since / for.',
      pattern: 'S + V2 + thời gian xác định.   S + have / has + V3 (this year, never, since …).',
      examples: ['The final was last Saturday.', 'The team has won six matches this year.', 'I have never scored two goals before.'],
    },
    text: `This year, Minh's school team has played six matches in the city football competition, and they have won all of them. The last one was the final, and it was last Saturday.

Many parents came to watch. In the first half, the other team scored a goal, and Minh felt nervous. But in the second half, Tom kicked the ball far up the field to Minh, and he scored! Then, two minutes before the end, Minh scored again. His team won 2 to 1.

"This is the best day of my life," Minh said. "I have never scored two goals in one match before!"

Since then, he has shown his gold medal to everyone in the family, even Kitty.`,
    vocab: [
      { word: 'final', vi: 'trận chung kết', emoji: '🏆', example: 'Our team played in the final.' },
      { word: 'competition', vi: 'cuộc thi, giải đấu', emoji: '🥇', example: 'She won the drawing competition.' },
      { word: 'score', vi: 'ghi bàn', emoji: '⚽', example: 'Minh scored two goals.' },
      { word: 'nervous', vi: 'hồi hộp, lo lắng', emoji: '😬', example: 'I feel nervous before a test.' },
      { word: 'half', vi: 'hiệp (trận đấu), một nửa', emoji: '⏱️', example: 'They scored in the second half.' },
      { word: 'field', vi: 'sân bóng, cánh đồng', emoji: '🏟️', example: 'The players ran onto the field.' },
      { word: 'medal', vi: 'huy chương', emoji: '🏅', example: 'He has won a gold medal.' },
    ],
    questions: [
      { type: 'mc', q: 'How many matches has the team won this year?', options: ['two', 'five', 'six'], answer: 2, listen: true },
      { type: 'tf', q: 'Minh\'s team scored the first goal of the final.', answer: false, listen: true },
      { type: 'short', q: 'When was the final?', answer: 'It was last Saturday.', accept: ['last Saturday', 'The final was last Saturday.'] },
      { type: 'short', q: 'How many goals did Minh score in the final?', answer: 'He scored two goals.', accept: ['two', 'two goals', '2'] },
      { type: 'short', q: 'How did Minh feel when the other team scored?', answer: 'He felt nervous.', accept: ['nervous', 'He was nervous.', 'worried'] },
    ],
    makeQuestion: [
      { answer: 'Yes, I have. I scored two goals last Saturday.', question: 'Have you ever scored two goals in one match?', hint: 'Have you ever …?' },
      { answer: 'The final was last Saturday.', question: 'When was the final?', hint: 'When …?' },
    ],
    dictation: [
      'In the first half, the other team scored a goal, and Minh felt nervous.',
      'Then, two minutes before the end, Minh scored again.',
      'I have never scored two goals in one match before!',
    ],
    reorder: [
      { words: ['won', 'they', 'have', 'six', 'matches'], answer: 'They have won six matches.' },
      { words: ['last', 'final', 'the', 'Saturday', 'was'], answer: 'The final was last Saturday.' },
    ],
    rewrite: [
      { prompt: 'Minh scores a goal. (last Saturday)', answer: 'Minh scored a goal last Saturday.', instructionVi: 'Viết lại câu với thời gian trong ngoặc, chia đúng thì.' },
      { prompt: 'The team wins many matches. (this year)', answer: 'The team has won many matches this year.', instructionVi: 'Viết lại câu với thời gian trong ngoặc, chia đúng thì.' },
    ],
  },
  {
    id: 'en-073', no: 73, level: 4,
    title: 'The Recycling Club',
    topic: 'Tái chế',
    grammar: {
      point: 'may / might (khả năng)',
      explainVi: '"may" và "might" + V nguyên mẫu dùng để nói điều có thể xảy ra nhưng chưa chắc chắn. "might" thường ít chắc chắn hơn một chút. Phủ định: may not / might not.',
      pattern: 'S + may / might + V.   S + may not / might not + V.',
      examples: ['We might make flower pots.', 'It may rain on Friday.', 'The robot might not work.'],
    },
    text: `Minh and Lan have joined the Recycling Club at school. Every Friday, the members bring old bottles, cans and paper.

This week, the club is planning a new project. "We might make flower pots from plastic bottles," says Lan. "Or we may build a robot from old cans," says Tom.

Ms Hoa thinks they may sell their things at the school fair in December. "Parents might buy the flower pots for their gardens," she says.

Minh is not sure. "It may rain on the day of the fair, so fewer people might come. And the robot might not work!"

"Then we may need a plan B," Lan laughs. "But recycling is fun, even if we don't sell anything."`,
    vocab: [
      { word: 'member', vi: 'thành viên', emoji: '🧑‍🤝‍🧑', example: 'Minh is a member of the club.' },
      { word: 'bottle', vi: 'cái chai', emoji: '🍾', example: 'We collect plastic bottles.' },
      { word: 'can', vi: 'lon', emoji: '🥫', example: 'Old cans can be recycled.' },
      { word: 'project', vi: 'dự án', emoji: '📋', example: 'Our class has a new project.' },
      { word: 'flower pot', vi: 'chậu hoa', emoji: '🪴', example: 'Lan made a flower pot from a bottle.' },
      { word: 'fair', vi: 'hội chợ', emoji: '🎪', example: 'The school fair is in December.' },
      { word: 'plastic', vi: 'nhựa', emoji: '🧴', example: 'This bag is made of plastic.' },
    ],
    questions: [
      { type: 'mc', q: 'What might the club make from plastic bottles?', options: ['a robot', 'flower pots', 'bags'], answer: 1, listen: true },
      { type: 'tf', q: 'The school fair is in December.', answer: true, listen: true },
      { type: 'short', q: 'What does Tom think they may build?', answer: 'They may build a robot from old cans.', accept: ['a robot', 'a robot from old cans'] },
      { type: 'short', q: 'Who might buy the flower pots?', answer: 'Parents might buy them.', accept: ['parents', 'The parents might buy them.'] },
      { type: 'short', q: 'Why might fewer people come to the fair?', answer: 'Because it may rain on the day of the fair.', accept: ['It may rain.', 'Because it might rain.', 'because of the rain', 'It might rain.'] },
    ],
    makeQuestion: [
      { answer: 'We might make flower pots.', question: 'What might you make?', hint: 'What might …?' },
      { answer: 'They may sell their things at the school fair.', question: 'Where may they sell their things?', hint: 'Where …?' },
    ],
    dictation: [
      'Minh and Lan have joined the Recycling Club at school.',
      'This week, the club is planning a new project.',
      'Ms Hoa thinks they may sell their things at the school fair in December.',
    ],
    reorder: [
      { words: ['rain', 'may', 'it', 'Friday', 'on'], answer: 'It may rain on Friday.' },
      { words: ['not', 'robot', 'might', 'the', 'work'], answer: 'The robot might not work.' },
    ],
    rewrite: [
      { prompt: 'Perhaps it will rain on Friday. (may)', answer: 'It may rain on Friday.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
      { prompt: 'Maybe the robot won\'t work. (might)', answer: 'The robot might not work.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-074', no: 74, level: 4,
    title: 'Helping Our Neighbours',
    topic: 'Giúp hàng xóm',
    grammar: {
      point: 'Động từ + to V và động từ + V-ing',
      explainVi: 'Một số động từ đi với "to V": decide, offer, agree, promise, hope, want. Một số động từ đi với "V-ing": enjoy, keep, love, finish, spend time. Sau giới từ (for, about) cũng dùng V-ing.',
      pattern: 'decide / offer / agree / promise / hope + to V.   enjoy / keep / finish + V-ing.',
      examples: ['Lan offered to cook dinner.', 'Minh enjoys playing with the dog.', 'Thank you for helping me.'],
    },
    text: `Mrs Lien, Minh's elderly neighbour, broke her leg last month. She lives alone, so Minh's family decided to help her.

Lan offered to cook dinner for her every Tuesday. Minh agreed to walk her little dog, and he enjoys playing with it. Mum promised to buy vegetables for her at the market. Dad is a doctor, so he keeps checking her leg.

Grandma was staying with the family that month. She loves telling old stories, so she visited Mrs Lien every afternoon. They spent hours chatting.

"I hope to walk again soon," Mrs Lien said. "Thank you for helping me."

Minh has learned that helping people feels good. He wants to join a volunteer club next year.`,
    vocab: [
      { word: 'alone', vi: 'một mình', emoji: '🧓', example: 'She lives alone.' },
      { word: 'decide', vi: 'quyết định', emoji: '🤔', example: 'We decided to help her.' },
      { word: 'offer', vi: 'đề nghị (làm giúp)', emoji: '🙋', example: 'Lan offered to cook dinner.' },
      { word: 'agree', vi: 'đồng ý', emoji: '👍', example: 'Minh agreed to walk the dog.' },
      { word: 'promise', vi: 'hứa', emoji: '🤞', example: 'Mum promised to buy vegetables.' },
      { word: 'chat', vi: 'trò chuyện', emoji: '💬', example: 'They spent hours chatting.' },
      { word: 'volunteer', vi: 'tình nguyện', emoji: '🤲', example: 'He wants to join a volunteer club.' },
    ],
    questions: [
      { type: 'mc', q: 'What happened to Mrs Lien?', options: ['She lost her dog.', 'She broke her leg.', 'She moved house.'], answer: 1, listen: true },
      { type: 'tf', q: 'Minh agreed to cook dinner for Mrs Lien.', answer: false, listen: true },
      { type: 'short', q: 'What does Minh enjoy doing?', answer: 'He enjoys playing with her dog.', accept: ['playing with the dog', 'playing with her dog', 'He enjoys playing with the dog.'] },
      { type: 'short', q: 'Why does Dad keep checking Mrs Lien\'s leg?', answer: 'Because he is a doctor.', accept: ['He is a doctor.', 'because he is a doctor'] },
      { type: 'short', q: 'What does Minh want to do next year?', answer: 'He wants to join a volunteer club.', accept: ['join a volunteer club', 'to join a volunteer club'] },
    ],
    makeQuestion: [
      { answer: 'Lan offered to cook dinner for her.', question: 'What did Lan offer to do?', hint: 'What did … offer to do?' },
      { answer: 'He enjoys playing with the dog.', question: 'What does Minh enjoy doing?', hint: 'What does … enjoy doing?' },
    ],
    dictation: [
      'Lan offered to cook dinner for her every Tuesday.',
      'Mum promised to buy vegetables for her at the market.',
      'He wants to join a volunteer club next year.',
    ],
    reorder: [
      { words: ['enjoys', 'with', 'Minh', 'playing', 'dog', 'the'], answer: 'Minh enjoys playing with the dog.' },
      { words: ['decided', 'family', 'to', 'the', 'her', 'help'], answer: 'The family decided to help her.' },
    ],
    rewrite: [
      { prompt: 'Lan said, "I will cook dinner for you." (offered)', answer: 'Lan offered to cook dinner for her.', accept: ['Lan offered to cook dinner for Mrs Lien.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng động từ trong ngoặc.' },
      { prompt: 'Minh likes playing with the dog very much. (enjoys)', answer: 'Minh enjoys playing with the dog.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng động từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-075', no: 75, level: 4,
    title: 'The Treasure Map',
    topic: 'Đọc bản đồ',
    grammar: {
      point: 'Giới từ chuyển động: across / through / along / past',
      explainVi: '"across" = băng qua (từ bên này sang bên kia: cầu, đường). "through" = xuyên qua (bên trong: rừng, cánh đồng). "along" = dọc theo (sông, đường). "past" = đi ngang qua (một nơi nào đó). Ngoài ra: into (vào trong), out of (ra khỏi).',
      pattern: 'go / walk / run + across / through / along / past + nơi chốn',
      examples: ['They went along the river.', 'They walked across a small bridge.', 'They went through the rice fields.'],
    },
    text: `During the summer holiday, Tom stayed with Minh at Grandpa's house. One morning, the boys found an old map in a box. It was a treasure map which Grandpa drew for Lan when she was small.

"Let's follow it!" said Tom. They walked out of the gate and went along the river. Then they walked past the old temple and across a small bridge. After that, they went through the rice fields and into a bamboo forest. Lucky ran ahead of them, barking happily.

Under a big tree, they found a tin box. Inside, there was a note: "Well done! Now walk back past the temple for some ice cream!" Grandpa was waiting at the gate with a big smile.`,
    vocab: [
      { word: 'treasure', vi: 'kho báu', emoji: '💰', example: 'They found a treasure map.' },
      { word: 'map', vi: 'bản đồ', emoji: '🗺️', example: 'Follow the map to the forest.' },
      { word: 'temple', vi: 'ngôi đền, chùa', emoji: '🛕', example: 'There is an old temple in the village.' },
      { word: 'bridge', vi: 'cây cầu', emoji: '🌉', example: 'They walked across the bridge.' },
      { word: 'rice field', vi: 'cánh đồng lúa', emoji: '🌾', example: 'The rice fields are green in summer.' },
      { word: 'bamboo', vi: 'tre', emoji: '🎋', example: 'There is a bamboo forest behind the house.' },
      { word: 'note', vi: 'mẩu giấy ghi chú', emoji: '📝', example: 'Grandpa left a note in the box.' },
    ],
    questions: [
      { type: 'mc', q: 'Who drew the treasure map?', options: ['Lan', 'Grandpa', 'Tom'], answer: 1, listen: true },
      { type: 'tf', q: 'The boys walked across a small bridge.', answer: true, listen: true },
      { type: 'short', q: 'What did the boys walk along?', answer: 'They walked along the river.', accept: ['the river', 'along the river'] },
      { type: 'short', q: 'Where did they find the tin box?', answer: 'They found it under a big tree.', accept: ['under a big tree', 'under a tree'] },
      { type: 'mc', q: 'Why was Grandpa smiling at the gate?', options: ['Because his plan worked and the boys found his note.', 'Because he found the treasure.', 'Because Lucky was lost.'], answer: 0 },
    ],
    makeQuestion: [
      { answer: 'We walked along the river.', question: 'Where did you walk?', hint: 'Where …?' },
      { answer: 'We found a tin box under a big tree.', question: 'What did you find under the big tree?', hint: 'What …?' },
    ],
    dictation: [
      'They walked out of the gate and went along the river.',
      'Then they walked past the old temple and across a small bridge.',
      'After that, they went through the rice fields and into a bamboo forest.',
    ],
    reorder: [
      { words: ['across', 'bridge', 'they', 'the', 'walked'], answer: 'They walked across the bridge.' },
      { words: ['through', 'the', 'went', 'fields', 'we', 'rice'], answer: 'We went through the rice fields.' },
    ],
    rewrite: [
      { prompt: 'They went from one side of the bridge to the other. (across)', answer: 'They went across the bridge.', accept: ['They walked across the bridge.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng giới từ trong ngoặc.' },
      { prompt: 'They walked next to the river for a long way. (along)', answer: 'They walked along the river.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng giới từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-076', no: 76, level: 4,
    title: 'Saving the Sea Turtles',
    topic: 'Động vật quý hiếm',
    grammar: {
      point: 'so / because / so that',
      explainVi: '"because" + nguyên nhân (vì). "so" + kết quả (nên). "so that" + mục đích (để mà), thường đi với can / can\'t / could / won\'t. Ví dụ: Turtles eat plastic bags, so they die (kết quả); We keep the eggs safe so that birds can\'t eat them (mục đích).',
      pattern: 'Kết quả + because + nguyên nhân.   Nguyên nhân, so + kết quả.   Hành động + so that + mục đích.',
      examples: ['Sea turtles are in danger because people catch them.', 'They lay eggs at night, so we collect them.', 'We keep the eggs safe so that birds can\'t eat them.'],
    },
    text: `Minh's family went to Con Dao, an island in the south of Viet Nam. They visited a centre that protects sea turtles. Sea turtles are in danger because people catch them and make the sea dirty.

A guide, Mr Tuan, explained his work. "Turtles lay their eggs on the beach at night, so we collect the eggs. We keep them in a safe place so that dogs and birds can't eat them."

Later, baby turtles came out, so everyone carried them to the sea. They walked slowly so that they didn't drop the babies.

"Plastic bags look like jellyfish, so turtles eat them," Mr Tuan said. Now Minh always takes a cloth bag so that he doesn't use plastic ones.`,
    vocab: [
      { word: 'island', vi: 'hòn đảo', emoji: '🏝️', example: 'Con Dao is a beautiful island.' },
      { word: 'protect', vi: 'bảo vệ', emoji: '🛡️', example: 'We must protect wild animals.' },
      { word: 'turtle', vi: 'con rùa', emoji: '🐢', example: 'Sea turtles lay eggs on the beach.' },
      { word: 'danger', vi: 'sự nguy hiểm', emoji: '⚠️', example: 'These animals are in danger.' },
      { word: 'guide', vi: 'hướng dẫn viên', emoji: '🧑‍🏫', example: 'The guide showed us the beach.' },
      { word: 'jellyfish', vi: 'con sứa', emoji: '🪼', example: 'A plastic bag looks like a jellyfish.' },
      { word: 'cloth', vi: 'vải', emoji: '👜', example: 'Mum uses a cloth bag at the market.' },
    ],
    questions: [
      { type: 'mc', q: 'Where is Con Dao?', options: ['in the north of Viet Nam', 'in the south of Viet Nam', 'in Australia'], answer: 1, listen: true },
      { type: 'tf', q: 'Turtles lay their eggs on the beach in the morning.', answer: false, listen: true },
      { type: 'short', q: 'Why are sea turtles in danger?', answer: 'Because people catch them and make the sea dirty.', accept: ['People catch them and make the sea dirty.', 'because people catch them', 'People catch them.'] },
      { type: 'short', q: 'Why do they keep the eggs in a safe place?', answer: 'So that dogs and birds can\'t eat them.', accept: ['so that dogs and birds cannot eat them', 'so that animals can\'t eat them', 'to protect them from dogs and birds'] },
      { type: 'short', q: 'Why does Minh always take a cloth bag now?', answer: 'So that he doesn\'t use plastic bags.', accept: ['so that he does not use plastic bags', 'He doesn\'t want to use plastic.', 'to save the turtles', 'He wants to help the turtles.'] },
    ],
    makeQuestion: [
      { answer: 'Because people catch them and make the sea dirty.', question: 'Why are sea turtles in danger?', hint: 'Why …?' },
      { answer: 'They lay their eggs on the beach.', question: 'Where do turtles lay their eggs?', hint: 'Where …?' },
    ],
    dictation: [
      'Sea turtles are in danger because people catch them and make the sea dirty.',
      "They walked slowly so that they didn't drop the babies.",
      "Now Minh always takes a cloth bag so that he doesn't use plastic ones.",
    ],
    reorder: [
      { words: ['at', 'their', 'turtles', 'eggs', 'lay', 'night'], answer: 'Turtles lay their eggs at night.' },
      { words: ['are', 'turtles', 'in', 'danger', 'sea'], answer: 'Sea turtles are in danger.' },
    ],
    rewrite: [
      { prompt: 'Turtles eat plastic bags because they look like jellyfish. (so)', answer: 'Plastic bags look like jellyfish, so turtles eat them.', instructionVi: 'Viết lại câu với "so" sao cho nghĩa không đổi.' },
      { prompt: 'Minh takes a cloth bag. He doesn\'t want to use plastic bags. (so that)', answer: "Minh takes a cloth bag so that he doesn't use plastic bags.", accept: ['Minh takes a cloth bag so that he does not use plastic bags.', "Minh takes a cloth bag so that he won't use plastic bags."], instructionVi: 'Nối hai câu, dùng "so that" để nói mục đích.' },
    ],
  },
  {
    id: 'en-077', no: 77, level: 4,
    title: 'Safe on the Internet',
    topic: 'An toàn trên mạng',
    grammar: {
      point: 'must / have to / should (so sánh)',
      explainVi: '"must" = phải (luật lệ hoặc người nói thấy rất cần); "mustn\'t" = cấm, không được. "have to" = phải (do hoàn cảnh, người khác yêu cầu); "don\'t have to" = không cần phải. "should / shouldn\'t" = nên / không nên (lời khuyên).',
      pattern: 'S + must / mustn\'t + V.   S + have to / has to + V.   S + don\'t / doesn\'t have to + V.   S + should / shouldn\'t + V.',
      examples: ['You must never share your password.', 'Minh has to ask Mum before he downloads a game.', 'You should take a break every thirty minutes.'],
    },
    text: `Ms Hoa is teaching the class about internet safety. "The internet is very useful, but you must be careful," she says.

"You must never share your password with anyone. You mustn't meet people from the internet without your parents. If someone is unkind to you online, you should tell an adult."

Tom asks, "Do we have to use our real names in games?"

"No, you don't have to. In fact, you shouldn't use them," Ms Hoa answers.

At home, Minh has to ask Mum before he downloads a new game. Lan has to finish her homework before she goes online.

"You should also take a break every thirty minutes," Dad says. "Your eyes need some rest."`,
    vocab: [
      { word: 'internet', vi: 'mạng internet', emoji: '🌐', example: 'The internet is very useful.' },
      { word: 'safety', vi: 'sự an toàn', emoji: '🔒', example: 'Internet safety is important.' },
      { word: 'password', vi: 'mật khẩu', emoji: '🔑', example: 'Never share your password.' },
      { word: 'online', vi: 'trên mạng', emoji: '💻', example: 'Be kind when you are online.' },
      { word: 'adult', vi: 'người lớn', emoji: '🧑', example: 'Tell an adult if you have a problem.' },
      { word: 'download', vi: 'tải xuống', emoji: '⬇️', example: 'Ask Mum before you download a game.' },
      { word: 'break', vi: 'giờ nghỉ', emoji: '☕', example: 'Take a break every thirty minutes.' },
    ],
    questions: [
      { type: 'mc', q: 'Who should you tell if someone is unkind to you online?', options: ['a friend', 'an adult', 'nobody'], answer: 1, listen: true },
      { type: 'tf', q: 'Ms Hoa says you have to use your real name in games.', answer: false, listen: true },
      { type: 'short', q: 'What does Minh have to do before he downloads a new game?', answer: 'He has to ask Mum.', accept: ['ask Mum', 'He has to ask his mum.'] },
      { type: 'short', q: 'What does Lan have to do before she goes online?', answer: 'She has to finish her homework.', accept: ['finish her homework', 'She has to do her homework.'] },
      { type: 'short', q: 'Why does Dad say you should take a break every thirty minutes?', answer: 'Because your eyes need some rest.', accept: ['Your eyes need rest.', 'Because our eyes need rest.', 'to rest our eyes'] },
    ],
    makeQuestion: [
      { answer: 'No, you don\'t have to use your real name.', question: 'Do we have to use our real names?', hint: 'Do we have to …?' },
      { answer: 'You should tell an adult.', question: 'What should I do if someone is unkind to me online?', hint: 'What should I do if …?' },
    ],
    dictation: [
      'If someone is unkind to you online, you should tell an adult.',
      'At home, Minh has to ask Mum before he downloads a new game.',
      'Lan has to finish her homework before she goes online.',
    ],
    reorder: [
      { words: ['share', 'must', 'never', 'your', 'you', 'password'], answer: 'You must never share your password.' },
      { words: ['a', 'take', 'you', 'break', 'should'], answer: 'You should take a break.' },
    ],
    rewrite: [
      { prompt: 'It is not necessary to use your real name. (don\'t have to)', answer: "You don't have to use your real name.", accept: ['You do not have to use your real name.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng cụm từ trong ngoặc.' },
      { prompt: 'Don\'t share your password with anyone. (mustn\'t)', answer: "You mustn't share your password with anyone.", accept: ['You must not share your password with anyone.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
    ],
  },
  {
    id: 'en-078', no: 78, level: 4,
    title: 'Boring or Bored?',
    topic: 'Cảm xúc',
    grammar: {
      point: 'Tính từ đuôi -ed và -ing',
      explainVi: 'Tính từ đuôi -ed nói về cảm xúc của người (I am bored = tôi thấy chán). Tính từ đuôi -ing nói về tính chất của sự vật, sự việc gây ra cảm xúc đó (The book is boring = cuốn sách chán).',
      pattern: 'Người + be / feel + V-ed.   Vật / việc + be + V-ing.',
      examples: ['Minh felt bored.', 'The book is really exciting.', 'He was surprised because the facts were surprising.'],
    },
    text: `Last Sunday was a rainy day, and Minh felt bored. "There is nothing to do," he said. "Everything is so boring."

Lan was reading an interesting book about dinosaurs. "Why don't you read this? It's really exciting," she said.

At first, Minh wasn't interested. But after a few pages, he was amazed. Dinosaurs were huge, and some of the facts were really surprising. One dinosaur was as long as two buses!

Suddenly, Kitty jumped onto the book, and Minh was very frightened. He screamed, and Lan laughed. "Are you scared of a little cat?"

In the evening, Minh told Dad, "Today wasn't boring at all. Tomorrow I'm going to the library. I'm so excited!"`,
    vocab: [
      { word: 'bored', vi: 'thấy chán', emoji: '😑', example: 'I feel bored on rainy days.' },
      { word: 'interesting', vi: 'thú vị', emoji: '📗', example: 'This is an interesting book.' },
      { word: 'exciting', vi: 'hấp dẫn, gây hào hứng', emoji: '🎢', example: 'The football match was exciting.' },
      { word: 'amazed', vi: 'kinh ngạc', emoji: '😲', example: 'Minh was amazed by the dinosaurs.' },
      { word: 'dinosaur', vi: 'khủng long', emoji: '🦕', example: 'Some dinosaurs were very big.' },
      { word: 'surprising', vi: 'đáng ngạc nhiên', emoji: '❗', example: 'The facts were surprising.' },
      { word: 'frightened', vi: 'sợ hãi', emoji: '😱', example: 'Minh was frightened by the cat.' },
    ],
    questions: [
      { type: 'mc', q: 'What was Lan\'s book about?', options: ['cats', 'dinosaurs', 'football'], answer: 1, listen: true },
      { type: 'tf', q: 'One dinosaur was as long as two buses.', answer: true, listen: true },
      { type: 'short', q: 'How did Minh feel at the beginning of the day?', answer: 'He felt bored.', accept: ['bored', 'He was bored.'] },
      { type: 'short', q: 'Why was Minh frightened?', answer: 'Because Kitty suddenly jumped onto the book.', accept: ['Kitty jumped onto the book.', 'Because Kitty jumped onto the book.', 'because of Kitty'] },
      { type: 'short', q: 'Where is Minh going tomorrow?', answer: 'He is going to the library.', accept: ['to the library', 'the library'] },
    ],
    makeQuestion: [
      { answer: 'I felt bored because it was raining.', question: 'How did you feel?', hint: 'How did you feel?' },
      { answer: 'Yes, it is really exciting.', question: 'Is the book exciting?', hint: 'Is the book …?' },
    ],
    dictation: [
      'Last Sunday was a rainy day, and Minh felt bored.',
      'Dinosaurs were huge, and some of the facts were really surprising.',
      'Suddenly, Kitty jumped onto the book, and Minh was very frightened.',
    ],
    reorder: [
      { words: ['an', 'book', 'is', 'this', 'interesting'], answer: 'This is an interesting book.' },
      { words: ['excited', 'I', 'so', 'am'], answer: 'I am so excited.' },
    ],
    rewrite: [
      { prompt: 'The rainy day bored Minh. (Minh felt …)', answer: 'Minh felt bored.', accept: ['Minh felt bored on the rainy day.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng tính từ đuôi -ed.' },
      { prompt: 'The facts surprised Minh. (The facts were …)', answer: 'The facts were surprising.', accept: ['The facts were surprising to Minh.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng tính từ đuôi -ing.' },
    ],
  },
  {
    id: 'en-079', no: 79, level: 4,
    title: 'Hoi An Lantern Night',
    topic: 'Phố cổ Hội An',
    grammar: {
      point: 'Trật tự tính từ; very / quite / really',
      explainVi: 'Khi có nhiều tính từ trước danh từ, thứ tự thường là: ý kiến (beautiful) → kích cỡ (big, little) → tuổi (old) → hình dạng (round) → màu (red) → nguồn gốc (Vietnamese) → chất liệu (silk, paper, wooden) → danh từ. "very / really" làm tính từ mạnh hơn, "quite" làm tính từ nhẹ đi (khá).',
      pattern: 'ý kiến + kích cỡ + tuổi + hình dạng + màu + nguồn gốc + chất liệu + N.   very / quite / really + tính từ.',
      examples: ['a beautiful little green lantern', 'big round red lanterns', 'It was quite cheap, but it was really pretty.'],
    },
    text: `On the fourteenth night of every lunar month, the old town of Hoi An turns off its electric lights. Minh's family were there last month, and the town looked really magical.

There were hundreds of lanterns everywhere: big round red lanterns, small yellow silk lanterns and lovely blue paper ones. Lan bought a beautiful little green lantern for her room. It was quite cheap.

They walked along the narrow old streets and saw many lovely old wooden houses. Minh ate a very tasty Vietnamese noodle dish called cao lau.

Later, they put small paper lanterns on the river and made wishes. "This is a really wonderful place," said Grandma. Dad was quite tired, but he was very happy.`,
    vocab: [
      { word: 'lantern', vi: 'đèn lồng', emoji: '🏮', example: 'The lanterns are red and yellow.' },
      { word: 'lunar', vi: 'âm lịch, thuộc mặt trăng', emoji: '🌕', example: 'Tet is in the first lunar month.' },
      { word: 'magical', vi: 'huyền diệu', emoji: '✨', example: 'The town looked magical at night.' },
      { word: 'silk', vi: 'lụa', emoji: '🧵', example: 'Hoi An is famous for silk.' },
      { word: 'narrow', vi: 'hẹp', emoji: '↔️', example: 'The old streets are narrow.' },
      { word: 'wooden', vi: 'bằng gỗ', emoji: '🪵', example: 'They live in an old wooden house.' },
      { word: 'tasty', vi: 'ngon', emoji: '🍜', example: 'Cao lau is a tasty noodle dish.' },
      { word: 'wish', vi: 'điều ước', emoji: '🌠', example: 'Grandma made a wish.' },
    ],
    questions: [
      { type: 'mc', q: 'What colour was Lan\'s lantern?', options: ['red', 'yellow', 'green'], answer: 2, listen: true },
      { type: 'tf', q: 'Lan\'s lantern was very expensive.', answer: false, listen: true },
      { type: 'short', q: 'What does Hoi An do on the fourteenth night of every lunar month?', answer: 'It turns off its electric lights.', accept: ['It turns off the electric lights.', 'turns off its electric lights', 'It turns off the lights.'] },
      { type: 'short', q: 'What did Minh eat?', answer: 'He ate a very tasty Vietnamese noodle dish called cao lau.', accept: ['cao lau', 'He ate cao lau.', 'a noodle dish'] },
      { type: 'mc', q: 'How did Dad feel at the end of the night?', options: ['He was bored.', 'He was tired but very happy.', 'He was angry.'], answer: 1 },
    ],
    makeQuestion: [
      { answer: 'Lan bought a beautiful little green lantern.', question: 'What did Lan buy?', hint: 'What did …?' },
      { answer: 'It was quite cheap.', question: 'How much was the lantern?', hint: 'How much …?' },
    ],
    dictation: [
      'Lan bought a beautiful little green lantern for her room.',
      'They walked along the narrow old streets and saw many lovely old wooden houses.',
      'Dad was quite tired, but he was very happy.',
    ],
    reorder: [
      { words: ['round', 'were', 'big', 'there', 'lanterns', 'red'], answer: 'There were big round red lanterns.' },
      { words: ['really', 'is', 'place', 'a', 'this', 'wonderful'], answer: 'This is a really wonderful place.' },
    ],
    rewrite: [
      { prompt: 'Lan bought a lantern. It was little, green and beautiful.', answer: 'Lan bought a beautiful little green lantern.', instructionVi: 'Viết lại thành một câu, đặt các tính từ trước danh từ theo đúng thứ tự.' },
      { prompt: 'They saw some houses. The houses were wooden, old and lovely.', answer: 'They saw some lovely old wooden houses.', instructionVi: 'Viết lại thành một câu, đặt các tính từ trước danh từ theo đúng thứ tự.' },
    ],
  },
  {
    id: 'en-080', no: 80, level: 4,
    title: 'Camping Under the Stars',
    topic: 'Truyện ôn tập',
    grammar: {
      point: 'Ôn các thì đã học',
      explainVi: 'Bài ôn: quá khứ đơn (went, cooked) kể việc đã xong; quá khứ tiếp diễn (were putting up, were sitting) cho việc đang diễn ra; hiện tại hoàn thành (has never slept) cho trải nghiệm; used to cho thói quen xưa; will / be going to cho tương lai; câu điều kiện loại 1 (If you look …, you will see …).',
      pattern: 'V2 / was + V-ing / have + V3 / used to + V / will + V / be going to + V',
      examples: ['Tom has never slept in a tent.', 'Dad and Tom were putting up the tent.', 'Next year, I am going to bring my parents.'],
    },
    text: `Last weekend, Minh's family went camping in Ba Vi National Park. Minh has camped there before, but Tom has never slept in a tent, so Minh invited him.

While Dad and Tom were putting up the tent, Lan cooked noodles on a stove. Dad used to camp there when he was a student.

Later, they were sitting around the fire when they heard a strange noise. It was only a hungry monkey which wanted their bananas.

At midnight, Lan pointed at the sky. "If you look carefully, you will see a shooting star." Tom saw one and made a wish.

"This is the best trip I have ever had," Tom said. "Next year, I am going to bring my parents."`,
    vocab: [
      { word: 'camping', vi: 'cắm trại', emoji: '🏕️', example: 'We went camping in the mountains.' },
      { word: 'national park', vi: 'vườn quốc gia', emoji: '🌳', example: 'Ba Vi is a national park near Ha Noi.' },
      { word: 'tent', vi: 'cái lều', emoji: '⛺', example: 'Dad put up the tent.' },
      { word: 'stove', vi: 'cái bếp', emoji: '🔥', example: 'Lan cooked noodles on a small stove.' },
      { word: 'noise', vi: 'tiếng động', emoji: '🔊', example: 'We heard a strange noise.' },
      { word: 'monkey', vi: 'con khỉ', emoji: '🐒', example: 'The monkey wanted our bananas.' },
      { word: 'shooting star', vi: 'sao băng', emoji: '🌠', example: 'Make a wish when you see a shooting star.' },
    ],
    questions: [
      { type: 'mc', q: 'What did Lan do while Dad and Tom were putting up the tent?', options: ['She slept.', 'She cooked noodles.', 'She looked at the stars.'], answer: 1, listen: true },
      { type: 'tf', q: 'Tom has slept in a tent many times.', answer: false, listen: true },
      { type: 'short', q: 'What made the strange noise?', answer: 'A hungry monkey made the noise.', accept: ['a monkey', 'a hungry monkey', 'It was a monkey.'] },
      { type: 'short', q: 'When did Dad use to camp in Ba Vi?', answer: 'He used to camp there when he was a student.', accept: ['when he was a student', 'when he was young'] },
      { type: 'short', q: 'How did Tom feel about the trip? How do you know?', answer: 'He loved it. He said it was the best trip he had ever had.', accept: ['He loved it.', 'He was very happy.', 'happy', 'It was the best trip he has ever had.'] },
    ],
    makeQuestion: [
      { answer: 'No, I have never slept in a tent.', question: 'Have you ever slept in a tent?', hint: 'Have you ever …?' },
      { answer: 'We were sitting around the fire.', question: 'What were you doing when you heard the noise?', hint: 'What were you doing when …?' },
      { answer: 'I am going to bring my parents.', question: 'What are you going to do next year?', hint: 'What are you going to …?' },
    ],
    dictation: [
      "Last weekend, Minh's family went camping in Ba Vi National Park.",
      'Dad used to camp there when he was a student.',
      'It was only a hungry monkey which wanted their bananas.',
    ],
    reorder: [
      { words: ['never', 'in', 'Tom', 'slept', 'tent', 'has', 'a'], answer: 'Tom has never slept in a tent.' },
      { words: ['tent', 'were', 'Dad', 'up', 'and', 'putting', 'the', 'Tom'], answer: 'Dad and Tom were putting up the tent.' },
    ],
    rewrite: [
      { prompt: 'This is the first time Tom has slept in a tent. (never … before)', answer: 'Tom has never slept in a tent before.', instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng từ trong ngoặc.' },
      { prompt: 'Dad camped here when he was a student, but he doesn\'t now. (used to)', answer: 'Dad used to camp here when he was a student.', accept: ['Dad used to camp here.'], instructionVi: 'Viết lại câu sao cho nghĩa không đổi, dùng "used to".' },
    ],
  },
];
