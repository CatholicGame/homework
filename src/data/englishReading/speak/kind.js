// 🎤 Nói, bộ chủ đề 💛 Chuyện nhân văn (bài 111–120). Định dạng: docs/tieng-anh/thiet-ke-bai-doc.md §9
// kind 'text'   hỏi về bài đọc: need = các nhóm từ khoá phải nghe thấy ('a|b' = a hoặc b).
// kind 'me'     hỏi về chính em: frame = khung câu gợi ý, need thường là từ của khung (bé tự điền phần còn lại).
// kind 'retell' kể lại / nói nhiều câu: hints = từ gợi ý hiện ra, need = nhóm từ khoá, min = số nhóm tối thiểu phải nghe thấy.
// minWords: số từ tối thiểu (mặc định text 2, me 3, retell 8).
export default {
  'en-111': [
    { kind: 'text', q: 'What is the lion like?', vi: 'Con sư tử trông thế nào?', model: 'He is big and strong.', need: ['big|strong'] },
    { kind: 'text', q: 'How does the mouse help the lion?', vi: 'Chú chuột giúp sư tử thế nào?', model: 'She is biting the net.', need: ['net|biting|bite|bites'] },
    { kind: 'me', q: 'Who can you help?', vi: 'Em có thể giúp ai?', frame: 'I can help …', model: 'I can help my mum.', need: ['help'] },
    { kind: 'me', q: 'What can you do for a friend?', vi: 'Em có thể làm gì cho một người bạn?', frame: 'I can …', model: 'I can share my toys.', need: ['can'] },
    { kind: 'retell', q: 'Tell me about the lion and the mouse.', vi: 'Kể về sư tử và chú chuột.', hints: ['lion', 'mouse', 'angry', 'net', 'teeth', 'free'], model: 'The lion is big. The mouse is small. The lion is in a net. The mouse is biting the net. The lion is free.', need: ['lion', 'mouse', 'big|strong|small', 'angry|sleeping|nose', 'net', 'biting|bite|teeth', 'free'], min: 3 },
  ],
  'en-112': [
    { kind: 'text', q: 'Where are the starfish?', vi: 'Những con sao biển ở đâu?', model: 'They are on the sand.', need: ['sand|beach'] },
    { kind: 'text', q: 'What is the boy doing?', vi: 'Cậu bé đang làm gì?', model: 'He is throwing starfish into the sea.', need: ['throwing|throw|throws|helping|help'] },
    { kind: 'me', q: 'What do you do to help at home?', vi: 'Em làm gì để giúp đỡ ở nhà?', frame: 'I help my … I …', model: 'I help my mum. I wash the dishes.', need: ['help|helps'] },
    { kind: 'me', q: 'What small thing can you do today to help someone?', vi: 'Hôm nay em có thể làm một việc nhỏ nào để giúp ai đó?', frame: 'Today I can …', model: 'Today I can help my friend with her homework.', need: ['can'] },
    { kind: 'retell', q: 'Tell me the starfish story.', vi: 'Kể lại câu chuyện sao biển.', hints: ['beach', 'storm', 'starfish', 'boy', 'throwing', 'difference'], model: 'After a big storm, there are hundreds of starfish on the sand. A boy is throwing them into the sea. The man says it does not make a difference. The boy says it makes a difference to that one.', need: ['beach|sand', 'storm', 'starfish', 'boy', 'throwing|throws|throw', 'sea|water', 'difference'], min: 3 },
  ],
  'en-113': [
    { kind: 'text', q: 'Where does Hachiko wait?', vi: 'Hachiko chờ ở đâu?', model: 'He waits at the station.', need: ['station'] },
    { kind: 'text', q: 'How long does Hachiko wait?', vi: 'Hachiko chờ bao lâu?', model: 'He waits for about nine years.', need: ['nine'] },
    { kind: 'me', q: 'Who always waits for you?', vi: 'Ai luôn chờ em?', frame: 'My … always waits for me.', model: 'My grandma always waits for me after school.', need: ['waits|wait'] },
    { kind: 'me', q: 'How do you show love to your family or your pet?', vi: 'Em thể hiện tình yêu với gia đình hay thú cưng thế nào?', frame: 'I often …', model: 'I often hug my mum and I feed my cat.', need: ['often|always|usually|sometimes'] },
    { kind: 'retell', q: 'Tell me about Hachiko.', vi: 'Kể về chú chó Hachiko.', hints: ['dog', 'professor', 'station', 'train', 'waits', 'statue'], model: 'Hachiko is a dog in Tokyo. Every morning he walks with the professor to the station. One day the professor does not come back. Hachiko waits for about nine years. Today there is a statue of him.', need: ['dog', 'professor', 'station', 'train|afternoon|morning', 'waits|wait', 'nine|years', 'statue'], min: 3 },
  ],
  'en-114': [
    { kind: 'text', q: 'What did Androcles see in the paw?', vi: 'Androcles thấy gì trong chân sư tử?', model: 'He saw a big thorn.', need: ['thorn'] },
    { kind: 'text', q: 'What did the emperor do at the end?', vi: 'Cuối cùng hoàng đế đã làm gì?', model: 'He set them both free.', need: ['free'] },
    { kind: 'me', q: 'When did you help an animal or a person?', vi: 'Em đã giúp một con vật hay một người khi nào?', frame: 'When I saw …, I …', model: 'When I saw a small bird on the ground, I gave it some water.', need: ['when', 'saw|was'], minWords: 6 },
    { kind: 'me', q: 'Who helped you when you were sad?', vi: 'Ai đã giúp em khi em buồn?', frame: 'When I was sad, my … helped me.', model: 'When I was sad, my sister helped me.', need: ['helped|help'] },
    { kind: 'retell', q: 'Tell me the story of Androcles and the lion.', vi: 'Kể lại chuyện Androcles và sư tử.', hints: ['ran away', 'cave', 'lion', 'thorn', 'soldiers', 'free'], model: 'Androcles ran away and hid in a cave. A lion came in. He pulled a thorn out of its paw. Later, soldiers caught him. The lion in the arena was his friend, so the emperor set them free.', need: ['ran|away|hid', 'cave', 'lion', 'thorn|paw', 'soldiers|soldier|caught', 'arena|rome|emperor', 'free'], min: 3 },
  ],
  'en-115': [
    { kind: 'text', q: 'How old was Louis when he made his alphabet?', vi: 'Louis bao nhiêu tuổi khi làm ra bảng chữ cái?', model: 'He was fifteen.', need: ['fifteen'] },
    { kind: 'text', q: 'How could blind people read Braille?', vi: 'Người mù đọc chữ Braille bằng cách nào?', model: 'They could read it with their fingers.', need: ['fingers|finger'] },
    { kind: 'me', q: 'What could you do when you were five?', vi: 'Khi lên năm tuổi em làm được gì?', frame: 'When I was five, I could …', model: 'When I was five, I could ride a bike.', need: ['could'] },
    { kind: 'me', q: 'What is difficult for you? What do you do?', vi: 'Việc gì khó với em? Em làm thế nào?', frame: '… is difficult for me, so I …', model: 'Maths is difficult for me, so I practise every day.', need: ['difficult|hard'], minWords: 6 },
    { kind: 'retell', q: 'Tell me about Louis Braille.', vi: 'Kể về Louis Braille.', hints: ['workshop', 'eye', 'blind', 'school', 'dots', 'fingers'], model: 'Louis hurt his eye in his father\'s workshop, and he could not see. He went to a school for blind children. At fifteen, he made an alphabet with six dots. Blind people could read it with their fingers.', need: ['workshop|tool', 'eye|see', 'blind', 'school|paris', 'dots|dot|alphabet', 'fingers|finger|read'], min: 3 },
  ],
  'en-116': [
    { kind: 'text', q: 'What was the hospital in Scutari like?', vi: 'Bệnh viện ở Scutari thế nào?', model: 'It was dirty, and there were rats everywhere.', need: ['dirty|rats|rat'] },
    { kind: 'text', q: 'What did the soldiers call Florence?', vi: 'Những người lính gọi Florence là gì?', model: 'They called her the Lady with the Lamp.', need: ['lady|lamp'] },
    { kind: 'me', q: 'Who helped you when you were sick?', vi: 'Ai đã chăm em khi em bị ốm?', frame: 'When I was sick, my … helped me.', model: 'When I was sick, my mum helped me.', need: ['helped|help|looked|cared'] },
    { kind: 'me', q: 'What did you do to help someone yesterday? Tell me in order.', vi: 'Hôm qua em đã làm gì để giúp ai đó? Kể theo thứ tự.', frame: 'First, I … Then I …', model: 'First, I cleaned my room. Then I helped my grandma cook.', need: ['first|then'], minWords: 6 },
    { kind: 'retell', q: 'Tell me about Florence Nightingale.', vi: 'Kể về Florence Nightingale.', hints: ['nurse', 'war', 'hospital', 'cleaned', 'lamp', 'school'], model: 'Florence became a nurse. In 1854, she went to a hospital in the war. First, the nurses cleaned the rooms. At night, she walked with a lamp. Finally, she opened a school for nurses.', need: ['nurse|nurses', 'war|soldiers', 'hospital', 'cleaned|clean|washed', 'lamp|night', 'school|london'], min: 3 },
  ],
  'en-117': [
    { kind: 'text', q: 'Where were Anne and Helen standing?', vi: 'Anne và Helen đang đứng ở đâu?', model: 'They were standing next to the water pump.', need: ['pump'] },
    { kind: 'text', q: 'What did Helen understand that day?', vi: 'Hôm đó Helen đã hiểu ra điều gì?', model: 'She understood that everything had a name.', need: ['name|names|word|words|water'] },
    { kind: 'me', q: 'Who is a teacher who has helped you a lot?', vi: 'Thầy cô nào đã giúp em nhiều?', frame: '… is a teacher who …', model: 'Ms Lan is a teacher who helps me with reading.', need: ['who'], minWords: 6 },
    { kind: 'me', q: 'What were you doing when you learned something new?', vi: 'Em đang làm gì khi học được một điều mới?', frame: 'I was … when I learned …', model: 'I was swimming with my dad when I learned to float.', need: ['was|were', 'when|while'], minWords: 6 },
    { kind: 'retell', q: 'Tell me about Helen and Anne.', vi: 'Kể về Helen và cô Anne.', hints: ['see', 'hear', 'teacher', 'pump', 'spelling', 'water'], model: 'Helen could not see or hear. Anne was her teacher. One day they were standing next to the water pump. While water was running over Helen\'s hand, Anne was spelling water into the other. Helen understood.', need: ['see|hear|blind|deaf', 'teacher|anne', 'pump', 'spelling|spelled|spell', 'water', 'understood|name|words'], min: 3, minWords: 15 },
  ],
  'en-118': [
    { kind: 'text', q: 'What did Sadako fold?', vi: 'Sadako đã gấp gì?', model: 'She folded paper cranes.', need: ['crane|cranes'] },
    { kind: 'text', q: 'What did Sadako wish for?', vi: 'Sadako đã ước điều gì?', model: 'She wished for peace.', need: ['peace'] },
    { kind: 'me', q: 'What did you use to do when you were small?', vi: 'Hồi nhỏ em hay làm gì?', frame: 'When I was small, I used to …', model: 'When I was small, I used to sleep with a teddy bear.', need: ['used|use'], minWords: 6 },
    { kind: 'me', q: 'What can you do so that a sick friend feels better?', vi: 'Em có thể làm gì để một bạn bị ốm thấy vui hơn?', frame: 'I can … so that my friend …', model: 'I can make a card so that my friend can smile.', need: ['so that|because'], minWords: 6 },
    { kind: 'retell', q: 'Tell me about Sadako and the paper cranes.', vi: 'Kể về Sadako và những con hạc giấy.', hints: ['Hiroshima', 'bomb', 'ill', 'cranes', 'wish', 'peace'], model: 'Sadako lived in Hiroshima. She used to run very fast. Because of the bomb, she became ill. Her friend brought golden paper, so she folded hundreds of cranes and wished for peace. Today there is a statue of her.', need: ['bomb', 'ill|sick|hospital', 'run|fast', 'crane|cranes|fold|folded', 'wish|wished', 'peace', 'statue'], min: 3, minWords: 15 },
  ],
  'en-119': [
    { kind: 'text', q: 'Why did Terry decide to run across Canada?', vi: 'Vì sao Terry quyết định chạy xuyên Canada?', model: 'He wanted to raise money for cancer research.', need: ['money|research|cancer'] },
    { kind: 'text', q: 'Why did Terry have to stop?', vi: 'Vì sao Terry phải dừng lại?', model: 'He had to stop because the cancer had spread to his lungs.', need: ['cancer|lungs|ill|sick'] },
    { kind: 'me', q: 'Tell me about something you did although it was difficult.', vi: 'Kể về một việc em đã làm dù việc đó khó.', frame: 'Although it was difficult, I …', model: 'Although it was difficult, I learned to swim last summer.', need: ['although|despite|but'], minWords: 7 },
    { kind: 'me', q: 'If you could raise money for something, what would it be for?', vi: 'Nếu em có thể quyên góp tiền cho một việc, em sẽ quyên góp cho việc gì?', frame: 'I would raise money for … because …', model: 'I would raise money for poor children because they need books.', need: ['money|raise'], minWords: 7 },
    { kind: 'retell', q: 'Tell me about Terry Fox and the Marathon of Hope.', vi: 'Kể về Terry Fox và Cuộc chạy Hi vọng.', hints: ['cancer', 'leg', 'artificial', 'Canada', 'money', 'every year'], model: 'When Terry was eighteen, his leg was removed because of cancer. Although he had only one leg, he decided to run across Canada to raise money for research. Despite the pain, he ran about forty-two kilometres a day. He had to stop after 143 days. Today, a Terry Fox Run is held every year.', need: ['cancer', 'leg|artificial', 'run|ran|marathon', 'canada', 'money|research', 'pain|despite|although', 'every year|today'], min: 3, minWords: 20 },
  ],
  'en-120': [
    { kind: 'text', q: 'What was the Happy Prince covered with?', vi: 'Hoàng tử Hạnh phúc được phủ bằng gì?', model: 'He was covered with gold leaf.', need: ['gold'] },
    { kind: 'text', q: 'What did the prince ask the swallow to do?', vi: 'Hoàng tử nhờ chim én làm gì?', model: 'He asked the swallow to take his ruby to a poor mother.', need: ['ruby|sapphires|sapphire|gold|poor'] },
    { kind: 'me', q: 'What did your mum or dad ask you to do today?', vi: 'Hôm nay bố hoặc mẹ đã nhờ em làm gì?', frame: 'My mum asked me to …', model: 'My mum asked me to water the flowers.', need: ['asked|ask|told'], minWords: 6 },
    { kind: 'me', q: 'What is the most precious thing you have? Why?', vi: 'Thứ quý giá nhất em có là gì? Vì sao?', frame: 'The most precious thing I have is … because …', model: 'The most precious thing I have is my family because they love me.', need: ['precious|important', 'because'], minWords: 8 },
    { kind: 'retell', q: 'Tell me the story of the Happy Prince.', vi: 'Kể lại chuyện Hoàng tử Hạnh phúc.', hints: ['statue', 'swallow', 'crying', 'ruby', 'gold', 'heart'], model: 'The Happy Prince was a statue covered with gold leaf. A swallow slept between his feet. The prince said that he had never seen sadness in his palace. He asked the swallow to take his ruby and sapphires to poor people. In winter the bird died, and the prince\'s heart broke.', need: ['statue|prince', 'swallow|bird', 'crying|cried|tear|sad|sadness', 'ruby|sapphires|sapphire', 'gold', 'poor', 'heart|angel'], min: 3, minWords: 20 },
  ],
};
