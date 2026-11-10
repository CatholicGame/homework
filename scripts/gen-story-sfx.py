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
