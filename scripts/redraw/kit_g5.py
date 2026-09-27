"""
Bộ vẽ khối 3D (Bài 46: khối trụ, khối cầu, khối lập phương...) — nét riêng, viền INK.

Dựng lưới đa giác 3D đơn giản rồi chiếu vuông góc (xoay yaw/pitch), tô theo ánh sáng,
vẽ viền cạnh cứng + đường bao (silhouette). Nhờ vậy khối trụ bị cắt vát, 3/4 khối trụ,
nửa khối cầu... đúng hình học.

    from kit_g5 import *
    m = cylinder(1, 2)                       # bán kính 1, cao 2, trục đứng, đáy ở y=0
    parts += render(m, ox, oy, scale)        # (ox, oy) = điểm gốc (0,0,0) trên màn hình
    parts += render_fit(m, 0, 0, W, H, pad)  # tự căn vừa khung
    parts += sphere(cx, cy, r, BLUE)         # khối cầu (tô gradient tròn)
"""
import math
import os
import sys

from common import INK, WHITE

_PREFIX = os.path.splitext(os.path.basename(sys.argv[0] or 'kit'))[0].replace('.', '_') or 'kit'
_n = [0]


def uid(tag='g'):
    _n[0] += 1
    return f'{_PREFIX}_{tag}{_n[0]}'


def _rgb(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) for i in (0, 2, 4)]


def shade(h, k):
    """k>0 pha trắng, k<0 pha tối (mực)."""
    r = _rgb(h)
    t = _rgb('#FFFFFF') if k > 0 else [40, 36, 50]
    k = abs(k)
    return '#' + ''.join(f'{round(a + (b - a) * k):02X}' for a, b in zip(r, t))


# ── lưới ─────────────────────────────────────────────────────────────────────
class Mesh:
    def __init__(self):
        self.faces = []            # (pts3d list, group, color)

    def add(self, pts, group, color):
        self.faces.append((pts, group, color))
        return self

    def extend(self, other):
        self.faces += other.faces
        return self

    def map(self, fn):
        m = Mesh()
        m.faces = [([fn(p) for p in pts], g, c) for pts, g, c in self.faces]
        return m

    def move(self, dx=0, dy=0, dz=0):
        return self.map(lambda p: (p[0] + dx, p[1] + dy, p[2] + dz))

    def rot(self, axis, deg):
        a = math.radians(deg)
        c, s = math.cos(a), math.sin(a)

        def f(p):
            x, y, z = p
            if axis == 'x':
                return (x, y * c - z * s, y * s + z * c)
            if axis == 'y':
                return (x * c + z * s, y, -x * s + z * c)
            return (x * c - y * s, x * s + y * c, z)
        return self.map(f)

    def recolor(self, color):
        m = Mesh()
        m.faces = [(pts, g, color) for pts, g, c in self.faces]
        return m


_G = [0]


def _grp():
    _G[0] += 1
    return _G[0]


def box(w, h, d, color):
    """Hộp chữ nhật, tâm đáy tại gốc (x ∈ ±w/2, y ∈ 0..h, z ∈ ±d/2)."""
    x0, x1, z0, z1 = -w / 2, w / 2, -d / 2, d / 2
    V = lambda x, y, z: (x, y, z)
    m = Mesh()
    m.add([V(x0, 0, z1), V(x1, 0, z1), V(x1, h, z1), V(x0, h, z1)], _grp(), color)   # trước
    m.add([V(x1, 0, z0), V(x0, 0, z0), V(x0, h, z0), V(x1, h, z0)], _grp(), color)   # sau
    m.add([V(x1, 0, z1), V(x1, 0, z0), V(x1, h, z0), V(x1, h, z1)], _grp(), color)   # phải
    m.add([V(x0, 0, z0), V(x0, 0, z1), V(x0, h, z1), V(x0, h, z0)], _grp(), color)   # trái
    m.add([V(x0, h, z1), V(x1, h, z1), V(x1, h, z0), V(x0, h, z0)], _grp(), color)   # trên
    m.add([V(x0, 0, z0), V(x1, 0, z0), V(x1, 0, z1), V(x0, 0, z1)], _grp(), color)   # dưới
    return m


def cylinder(r, h, color, a0=0.0, a1=360.0, n=96, top=None):
    """Khối trụ trục đứng (đáy y=0). a0..a1 = cung giữ lại (độ, góc đo trong mặt xz:
    0° = +x, 90° = +z hướng về người xem). top(x, z) -> độ cao mặt trên (mặc định h)."""
    top = top or (lambda x, z: h)
    full = (a1 - a0) >= 359.999
    k = max(8, int(n * (a1 - a0) / 360))
    angs = [math.radians(a0 + (a1 - a0) * i / k) for i in range(k + (0 if full else 1))]
    P = [(r * math.cos(a), r * math.sin(a)) for a in angs]
    side = _grp()
    m = Mesh()
    rng = range(len(P)) if full else range(len(P) - 1)
    for i in rng:
        (xa, za), (xb, zb) = P[i], P[(i + 1) % len(P)]
        m.add([(xa, 0, za), (xa, top(xa, za), za), (xb, top(xb, zb), zb), (xb, 0, zb)], side, color)
    tp = [(x, top(x, z), z) for x, z in P]
    bt = [(x, 0, z) for x, z in P]
    if not full:
        tp = [(0, top(0, 0), 0)] + tp
        bt = [(0, 0, 0)] + bt
        (xa, za), (xb, zb) = P[0], P[-1]
        m.add([(0, 0, 0), (0, top(0, 0), 0), (xa, top(xa, za), za), (xa, 0, za)], _grp(), color)
        m.add([(xb, 0, zb), (xb, top(xb, zb), zb), (0, top(0, 0), 0), (0, 0, 0)], _grp(), color)
    m.add(tp[::-1], _grp(), color)
    m.add(bt, _grp(), color)
    return m


def hemisphere(r, color, nu=72, nv=22):
    """Nửa khối cầu, mặt phẳng ở y=0, vòm hướng +y."""
    m = Mesh()
    g = _grp()
    for j in range(nv):
        t0, t1 = math.pi / 2 * j / nv, math.pi / 2 * (j + 1) / nv      # từ xích đạo lên đỉnh
        for i in range(nu):
            p0, p1 = 2 * math.pi * i / nu, 2 * math.pi * (i + 1) / nu
            Q = lambda t, p: (r * math.cos(t) * math.cos(p), r * math.sin(t), r * math.cos(t) * math.sin(p))
            pts = [Q(t0, p0), Q(t0, p1), Q(t1, p1)]
            if j < nv - 1:
                pts.append(Q(t1, p0))
            m.add(pts[::-1], g, color)
    disc = [(r * math.cos(2 * math.pi * i / nu), 0, r * math.sin(2 * math.pi * i / nu)) for i in range(nu)]
    m.add(disc, _grp(), color)
    return m


# ── chiếu & tô ───────────────────────────────────────────────────────────────
YAW, PITCH = -28.0, 22.0
LIGHT = (-0.45, 0.75, 0.55)


def _view(p, yaw, pitch):
    x, y, z = p
    a, b = math.radians(yaw), math.radians(pitch)
    x, z = x * math.cos(a) + z * math.sin(a), -x * math.sin(a) + z * math.cos(a)
    y, z = y * math.cos(b) - z * math.sin(b), y * math.sin(b) + z * math.cos(b)
    return (x, y, z)


def _normal(v):
    # Newell
    nx = ny = nz = 0.0
    for i in range(len(v)):
        x0, y0, z0 = v[i]
        x1, y1, z1 = v[(i + 1) % len(v)]
        nx += (y0 - y1) * (z0 + z1)
        ny += (z0 - z1) * (x0 + x1)
        nz += (x0 - x1) * (y0 + y1)
    L = math.sqrt(nx * nx + ny * ny + nz * nz) or 1
    return (nx / L, ny / L, nz / L)


def _key(p):
    return (round(p[0], 4), round(p[1], 4), round(p[2], 4))


def project(m, yaw=YAW, pitch=PITCH):
    return [[_view(p, yaw, pitch) for p in pts] for pts, g, c in m.faces]


def bbox(m, yaw=YAW, pitch=PITCH):
    xs, ys = [], []
    for pts in project(m, yaw, pitch):
        for x, y, z in pts:
            xs.append(x)
            ys.append(-y)
    return min(xs), min(ys), max(xs), max(ys)


def render(m, ox, oy, s, yaw=YAW, pitch=PITCH, sw=3, gloss=True):
    L = LIGHT
    ll = math.sqrt(sum(c * c for c in L))
    L = tuple(c / ll for c in L)
    vf = []
    for (pts, g, c) in m.faces:
        v = [_view(p, yaw, pitch) for p in pts]
        n = _normal(v)
        vf.append((pts, v, n, g, c))
    # cạnh -> các mặt
    edges = {}
    for i, (pts, v, n, g, c) in enumerate(vf):
        for a in range(len(pts)):
            e = frozenset((_key(pts[a]), _key(pts[(a + 1) % len(pts)])))
            edges.setdefault(e, []).append(i)
    vis = [f[2][2] > 1e-6 for f in vf]
    order = sorted([i for i in range(len(vf)) if vis[i]],
                   key=lambda i: sum(p[2] for p in vf[i][1]) / len(vf[i][1]))
    S = lambda p: (ox + s * p[0], oy - s * p[1])
    fills, out = [], []
    for i in order:
        pts, v, n, g, c = vf[i]
        d = max(0.0, sum(a * b for a, b in zip(n, L)))
        k = -0.28 + 0.62 * d
        if gloss:
            hv = (L[0], L[1], L[2] + 1)
            hl = math.sqrt(sum(q * q for q in hv))
            spec = max(0.0, sum(a * b / hl for a, b in zip(n, hv))) ** 40
            k = min(0.85, k + 0.6 * spec)
        col = shade(c, k)
        poly = ' '.join(f'{S(p)[0]:.1f},{S(p)[1]:.1f}' for p in v)
        fills.append(f'<polygon points="{poly}" fill="{col}" stroke="{col}" stroke-width="0.8" stroke-linejoin="round"/>')
        segs = []
        for a in range(len(pts)):
            e = frozenset((_key(pts[a]), _key(pts[(a + 1) % len(pts)])))
            fs = edges[e]
            other = [j for j in fs if j != i]
            if not other or any(vf[j][3] != g or not vis[j] for j in other):
                p0, p1 = S(v[a]), S(v[(a + 1) % len(v)])
                segs.append(f'M{p0[0]:.1f},{p0[1]:.1f}L{p1[0]:.1f},{p1[1]:.1f}')
        if segs:
            fills.append(f'<path d="{"".join(segs)}" fill="none" stroke="{INK}" stroke-width="{sw}" stroke-linecap="round"/>')
    return fills + out


def render_fit(m, x, y, w, h, pad=10, yaw=YAW, pitch=PITCH, sw=3, align='center'):
    x0, y0, x1, y1 = bbox(m, yaw, pitch)
    s = min((w - 2 * pad) / (x1 - x0), (h - 2 * pad) / (y1 - y0))
    ox = x + w / 2 - s * (x0 + x1) / 2
    oy = y + h / 2 - s * (y0 + y1) / 2
    if align == 'bottom':
        oy = y + h - pad - s * y1
    return render(m, ox, oy, s, yaw, pitch, sw)


def sphere(cx, cy, r, color, sw=3, shadow=True, gloss=True):
    gid = uid('sph')
    out = [f'<defs><radialGradient id="{gid}" cx="0.36" cy="0.32" r="0.75">'
           f'<stop offset="0" stop-color="{shade(color, 0.7)}"/>'
           f'<stop offset="0.45" stop-color="{color}"/>'
           f'<stop offset="1" stop-color="{shade(color, -0.3)}"/></radialGradient></defs>']
    if shadow:
        out.append(f'<ellipse cx="{cx + r * 0.15:.1f}" cy="{cy + r * 0.97:.1f}" rx="{r * 0.8:.1f}" ry="{r * 0.14:.1f}" fill="#000" opacity="0.10"/>')
    out.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="url(#{gid})" stroke="{INK}" stroke-width="{sw}"/>')
    if gloss:
        out.append(f'<ellipse cx="{cx - r * 0.38:.1f}" cy="{cy - r * 0.42:.1f}" rx="{r * 0.2:.1f}" ry="{r * 0.12:.1f}" '
                   f'transform="rotate(-35 {cx - r * 0.38:.1f} {cy - r * 0.42:.1f})" fill="{WHITE}" opacity="0.85"/>')
    return out


def cyl2d(cx, top, w, h, color, ry=None, sw=3, top_fill=None):
    """Khối trụ đứng vẽ 2D: (cx, top) = tâm elip mặt trên, w = rộng, h = cao (tới tâm elip đáy)."""
    ry = ry if ry is not None else w * 0.18
    l, r, b, rx = cx - w / 2, cx + w / 2, top + h, w / 2
    gid = uid('cyl')
    return [
        f'<defs><linearGradient id="{gid}" x1="0" x2="1"><stop offset="0" stop-color="{shade(color, -0.12)}"/>'
        f'<stop offset="0.3" stop-color="{shade(color, 0.4)}"/><stop offset="0.72" stop-color="{color}"/>'
        f'<stop offset="1" stop-color="{shade(color, -0.3)}"/></linearGradient></defs>',
        f'<path d="M{l},{top} L{l},{b} A{rx},{ry} 0 0 0 {r},{b} L{r},{top} Z" fill="url(#{gid})" '
        f'stroke="{INK}" stroke-width="{sw}" stroke-linejoin="round"/>',
        f'<ellipse cx="{cx}" cy="{top}" rx="{rx}" ry="{ry}" fill="{top_fill or shade(color, 0.3)}" '
        f'stroke="{INK}" stroke-width="{sw}"/>',
    ]
