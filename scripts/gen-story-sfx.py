"""
Tạo tiếng động cho truyện hoạt hình tiếng Anh bằng ElevenLabs Sound Effects.

  XI_KEY=sk_... python -I scripts/gen-story-sfx.py               # tạo các tiếng chưa có file
  XI_KEY=sk_... python -I scripts/gen-story-sfx.py dog-bark poof # tạo lại đúng mấy tiếng này

Bảng S là danh mục: tên chung (vd. 'door-open') → src/assets/sfx/story/common/, dùng cho mọi truyện;
tên có thư mục (vd. 'en021/xxx') → src/assets/sfx/story/en021/, chỉ truyện đó dùng (ưu tiên hơn tiếng chung cùng tên).
Truyện mới: dùng lại tiếng chung trước, thiếu thì thêm dòng vào S (tên chung nếu truyện khác cũng sẽ cần).
Bản gốc stereo lưu docs/sfx/english-story/; file dùng: mono 24 kHz, cắt im lặng, đỉnh theo cột peak.
"""
import os, sys, json, wave, urllib.request
import numpy as np

KEY = os.environ['XI_KEY']
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW = os.path.join(ROOT, 'docs', 'sfx', 'english-story')
OUT = os.path.join(ROOT, 'src', 'assets', 'sfx', 'story')
SR = 24000
TAIL = ', cartoon sound for a children\'s story animation, warm and soft, no harsh high frequencies, dry, no music, no voice, no background noise'

# name: (seconds, peak dB, loop, prompt)
S = {
  'steps': (2.0, -20, True, 'light child footsteps walking on a wooden floor at a steady relaxed pace, soft slippers, seamless loop'),
  'snore': (1.5, -22, False, 'a tiny cute child snoring softly once, a gentle breath in and a little whistle out'),
  'alarm-clock': (1.2, -18, False, 'a cute small alarm clock ringing, a light metal bell trilling quickly then stopping'),
  'birds': (2.5, -22, False, 'a few small happy birds chirping in the morning outside an open window, light and sparse'),
  'window-open': (0.6, -20, False, 'a wooden window opening, a short soft creak and a gentle latch click'),
  'tap-water': (1.6, -22, False, 'a bathroom tap running water into a sink and a child splashing water on the face'),
  'brush-teeth': (1.8, -22, False, 'a child brushing teeth quickly with a toothbrush, soft rhythmic scrubbing, foamy'),
  'dog-bark': (0.5, -16, False, 'a single happy small puppy bark, cute and friendly, one woof'),
  'wardrobe-open': (0.6, -20, False, 'a small wooden wardrobe door opening with a gentle creak'),
  'poof': (0.6, -18, False, 'a soft magical poof, a puff of smoke with a tiny sparkle, quick costume change'),
  'sparkle': (0.6, -20, False, 'a soft magical twinkle, three tiny glockenspiel sparkles going up'),
  'comb-hair': (1.2, -24, False, 'a plastic comb brushing through hair a few times, soft and quick'),
  'pot-stir': (1.6, -22, False, 'a pot of soup bubbling on a stove and a spoon stirring gently, kitchen morning'),
  'bowl-down': (0.5, -18, False, 'a ceramic bowl placed gently on a wooden table, one soft clink'),
  'slurp': (1.2, -20, False, 'a child happily slurping noodles twice, cute slurp, not gross'),
  'gulp': (1.2, -20, False, 'a child drinking milk from a glass, three soft gulps and a happy breath out'),
  'page-turn': (0.5, -20, False, 'a single book page turning, soft paper flip'),
  'car-go': (3.0, -20, False, 'a small family car starting gently and driving away down the street, fading out'),
  'bag-on': (0.6, -20, False, 'a school backpack lifted onto shoulders, a soft rustle and a short zipper pull'),
  'door-open': (0.8, -20, False, 'a front door of a house opening, a soft handle click and a gentle creak'),
  'hearts': (1.2, -18, False, 'a warm happy harp glissando going up with a soft chime at the end, love and joy'),
  'rain': (3.0, -24, True, 'gentle steady rain falling on a window and a roof, soft pitter patter, seamless loop'),
  'wind': (2.5, -22, False, 'a soft breezy gust of wind blowing through trees with leaves rustling, rising then fading'),
  'whistle': (0.8, -20, False, 'a friendly traffic police whistle, two short soft toots'),
  'sizzle': (2.0, -22, False, 'spring rolls frying in a pan of hot oil, gentle sizzling and crackling'),
  'camera': (0.6, -20, False, 'a camera shutter click with a tiny film wind, one photo'),
  'pencil': (1.2, -24, False, 'a pencil drawing quickly on paper, soft scratchy strokes'),
  'phone-ring': (1.6, -20, False, 'a cute home telephone ringing twice, soft friendly ring tone'),
  'bike-fix': (1.4, -22, False, 'a wrench tightening a bicycle bolt, a few soft metal clicks and a wheel spinning freely'),
  # Cấp 3 (en041–en060)
  'pop': (0.5, -18, False, 'a soft cartoon pop, one bubble popping'),
  'box-shake': (1.0, -20, False, 'a small cardboard box of dry cat food being shaken, kibble rattling'),
  'splash': (0.8, -18, False, 'a small splash of water from a cup hitting the floor'),
  'ladder': (1.8, -22, False, 'someone slowly climbing an aluminium ladder, four soft metal steps'),
  'cough': (0.8, -20, False, 'a small child coughing twice softly'),
  'meow': (0.8, -18, False, 'a small kitten meowing once, cute and gentle'),
  'purr': (1.6, -20, False, 'a happy cat purring softly'),
  'cheer': (2.0, -20, False, 'a small group of children cheering and clapping happily'),
  'clap': (1.2, -20, False, 'a few people clapping hands warmly'),
  'giggle': (1.2, -20, False, 'children giggling happily together'),
  'bus': (3.0, -22, False, 'a city bus engine idling then driving off gently'),
  'robot-beep': (0.8, -20, False, 'a cute toy robot beeping, little friendly electronic boops'),
  'robot-walk': (1.5, -22, False, 'a small toy robot walking, servo whirrs and soft metal steps'),
  'fireworks': (2.5, -22, False, 'distant fireworks popping and crackling in the night sky'),
  'lion-drum': (2.0, -18, False, 'a festive lion dance drum and small cymbal beat, short and joyful'),
  'cash': (0.8, -20, False, 'a shop cash register ding and the drawer sliding open'),
  'quack': (0.8, -20, False, 'a duck quacking twice'),
  'elephant': (1.2, -20, False, 'an elephant trumpeting once, friendly'),
  'monkey': (1.0, -20, False, 'a playful monkey chattering briefly'),
  'parrot': (0.8, -20, False, 'a parrot squawking once, cheerful'),
  'hiss': (1.0, -22, False, 'a snake hissing softly'),
  'whoosh': (0.6, -20, False, 'a quick soft whoosh, something flying past'),
  'drip': (1.4, -22, False, 'a dripping tap, a few slow water drops into a metal sink'),
  'kick': (0.5, -18, False, 'a child kicking a football, one soft thump'),
  'school-bell': (1.5, -20, False, 'a school bell ringing briefly'),
  'plane': (2.5, -22, False, 'a small airplane flying past overhead'),
  'knock': (0.7, -20, False, 'knocking on a wooden door three times'),
  'sweep': (1.4, -24, False, 'a broom sweeping a floor, a few soft strokes'),
  'dishes': (1.6, -22, False, 'washing dishes in a sink, plates gently clinking and water running'),
  'tick': (1.5, -22, False, 'a wall clock ticking four times, tick tock tick tock, steady'),
  'ding': (0.6, -18, False, 'a bright happy ding, correct answer chime'),
  'buzz-no': (0.6, -22, False, 'a soft low cartoon buzz meaning no, gentle not harsh'),
  'crunch': (0.8, -20, False, 'a child biting a crunchy cookie twice'),
  'pour': (1.2, -22, False, 'pouring milk into a glass'),
  'paint': (1.4, -24, False, 'a paint brush making a few soft wet strokes on a board'),
  'wipe': (1.2, -22, False, 'a cloth wiping a glass window, a few squeaky clean rubs'),
  'river': (3.0, -24, True, 'a small river flowing gently, soft babbling water, seamless loop'),
  'beep': (0.6, -20, False, 'a digital thermometer beeping three short times'),
  'drone': (2.0, -24, True, 'a small toy drone buzzing and hovering, soft propeller hum, seamless loop'),
  'bump': (0.5, -18, False, 'a toy robot falling over on the floor, a soft plastic clunk'),
  'boat-horn': (1.2, -20, False, 'a small tourist boat horn tooting once, friendly'),
  'typing': (1.4, -24, False, 'quick light typing on a laptop keyboard'),
  'dig': (1.4, -22, False, 'a garden hoe digging into soft soil a few times'),
  'crickets': (3.0, -26, True, 'quiet crickets chirping on a calm summer night in the countryside, seamless loop'),
  'roll': (1.0, -22, False, 'a small rubber ball rolling across a floor'),
  'click': (0.4, -20, False, 'a flashlight switch clicking on, one click'),
}

def gen(name):
    sec, peak, loop, prompt = S[name]
    body = json.dumps({'text': prompt + TAIL, 'duration_seconds': sec, 'prompt_influence': 0.7, 'loop': loop}).encode()
    req = urllib.request.Request(f'https://api.elevenlabs.io/v1/sound-generation?output_format=pcm_{SR}', body,
                                 {'xi-api-key': KEY, 'Content-Type': 'application/json'})
    pcm = urllib.request.urlopen(req, timeout=120).read()
    st = np.frombuffer(pcm[: len(pcm) // 4 * 4], '<i2').reshape(-1, 2)  # ElevenLabs trả PCM stereo xen kẽ L R L R
    write(raw_path(name), st, ch=2)
    return st.astype(np.float32).mean(1) / 32768

def raw_path(name): return os.path.join(RAW, name.replace('/', '_') + '.wav')
def out_path(name): return os.path.join(OUT, *(name.split('/') if '/' in name else ['common', name])) + '.wav'

def write(p, x, ch=1):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    data = x if x.dtype == np.int16 else (np.clip(x, -1, 1) * 32767).astype('<i2')
    with wave.open(p, 'wb') as w:
        w.setnchannels(ch); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(data.tobytes())

def process(name, x):
    sec, peak, loop, _ = S[name]
    x = x - x.mean()
    if not loop:
        env = np.convolve(np.abs(x), np.ones(240) / 240, 'same')
        thr = env.max() * 10 ** (-40 / 20)
        on = np.nonzero(env > thr)[0]
        a, b = max(0, on[0] - 120), min(len(x), on[-1] + 480)
        x = x[a:b].copy()
        f = min(len(x) // 4, int(0.04 * SR))
        x[-f:] *= np.linspace(1, 0, f)
        x[:24] *= np.linspace(0, 1, 24)
    x = x / (np.abs(x).max() + 1e-9) * 10 ** (peak / 20)
    write(out_path(name), x)
    return len(x) / SR

names = sys.argv[1:] or [n for n in S if not os.path.exists(out_path(n))]
for n in names:
    try:
        d = process(n, gen(n))
        print(f'{n}: {d:.2f}s')
    except Exception as e:
        print(f'{n}: FAIL {e}')
