/* Generative hero: a dynamical phase portrait — nested hairline orbits with
   points travelling along them, an iterate spiral converging to the fixed
   point z*, and a slender arboreal tree. Orbits are sized from the distance
   to the nearest canvas edge and every stroke dissolves radially, so the art
   is never clipped and has no "picture frame". */
(() => {
  const canvas = document.getElementById('heroArt');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMQ = matchMedia('(prefers-reduced-motion: reduce)');

  const INK = [24, 26, 29], BODY = [56, 52, 46], COPPER = [168, 111, 60], DEEP = [138, 84, 46];
  const rgba = (c, a) => `rgba(${c[0]},${c[1]},${c[2]},${a})`;
  const mix = (a, b, t) => [0, 1, 2].map(i => Math.round(a[i] + (b[i] - a[i]) * t));

  /* deterministic PRNG so the composition is stable across loads and resizes */
  const mulberry32 = s => () => {
    s |= 0; s = (s + 0x6D2B79F5) | 0;
    let z = Math.imul(s ^ (s >>> 15), 1 | s);
    z = (z + Math.imul(z ^ (z >>> 7), 61 | z)) ^ z;
    return ((z ^ (z >>> 14)) >>> 0) / 4294967296;
  };
  const sstep = (a, b, x) => {
    const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };

  let W = 1, H = 1, unit = 1, maxR = 1, limit = 1, narrow = false;
  let C = { x: 0, y: 0 };          // composition core: the fixed point z*
  let orbits = [], ambient = [], dust = [], treeRoot = null, spiral = null;
  /* pointer parallax: eased offsets applied to the whole composition */
  let vx = 0, vy = 0, tx = 0, ty = 0;

  function build() {
    const rnd = mulberry32(20260731);
    unit = Math.min(W, H);
    /* matches the CSS single-column breakpoint: centre the composition
       whenever the canvas sits below the copy instead of beside it */
    narrow = W < 900;
    C = narrow ? { x: W * 0.50, y: H * 0.46 } : { x: W * 0.715, y: H * 0.50 };
    /* hard containment: orbits are sized from the distance to the nearest
       canvas edge, so nothing ever reaches the frame geometrically either */
    limit = Math.min(W - C.x, C.y, H - C.y, C.x * 1.2) * 0.90;
    maxR = limit * 1.28;

    /* ---- principal orbits, each carrying travelling points ---- */
    orbits = [];
    const N = 6;
    for (let i = 0; i < N; i++) {
      const a = limit * (0.30 + 0.70 * (i / (N - 1))) * (0.94 + rnd() * 0.10);
      const o = {
        a, b: a * (0.55 + rnd() * 0.30),
        tilt: (rnd() - 0.5) * 0.9,
        dashed: i % 3 === 1,
        copper: rnd() < 0.35,
        alpha: 0.30 - i * 0.022,
        pts: [],
      };
      const n = i < 2 ? 2 : 2 + (rnd() < 0.5 ? 1 : 0);
      for (let j = 0; j < n; j++) {
        o.pts.push({
          th: rnd() * Math.PI * 2,
          /* Kepler-ish: inner orbits run faster; a few run retrograde */
          w: 0.36 / Math.pow(a / (limit * 0.30), 1.5) * (rnd() < 0.85 ? 1 : -1),
          r: 1.8 + rnd() * 2.0,
          copper: rnd() < 0.45,
          ring: rnd() < 0.25,
          trail: 0.30 + rnd() * 0.25,
        });
      }
      orbits.push(o);
    }

    /* ---- ambient orbits: huge, ultra-faint arcs that pass behind the text
       column, tying the two halves of the hero into one composition ---- */
    ambient = narrow ? [] : [0, 1].map(k => {
      const a = W * (0.46 + k * 0.10);
      return {
        cx: W * (0.66 + k * 0.06), cy: H * (0.50 + k * 0.04),
        a, b: a * (0.40 + rnd() * 0.12),
        tilt: -0.30 + k * 0.22,
        alpha: 0.060 - k * 0.012,
        pt: { th: rnd() * Math.PI * 2, w: 0.05 * (k ? -1 : 1), r: 2.1 },
      };
    });

    /* ---- iterate spiral: z, f(z), f²(z), … converging to z* at the core ---- */
    spiral = { r0: limit * 0.62, q: 0.795, th0: 2.35, dth: 0.56, n: 15 };

    /* ---- arboreal tree: the full binary tree of an arboreal representation,
       symmetric and lush like the original, but scaled so the whole canopy
       stays inside the dissolve envelope instead of poking past the top ---- */
    const MAXD = narrow ? 7 : 8;
    const mk = d => {
      const node = {
        ang: d === 0 ? -Math.PI / 2 + (rnd() - 0.5) * 0.10
                     : (rnd() - 0.5) * (1.02 - d * 0.07),
        sh: 0.72 + rnd() * 0.09,
        curv: (rnd() - 0.5) * 0.16,
        phase: rnd() * Math.PI * 2,
        kids: [], bud: false, ring: false, copper: false, br: 0,
      };
      if (d < MAXD) {
        const nk = d < 2 ? 2 : (rnd() < 0.8 ? 2 : 1);
        for (let i = 0; i < nk; i++) node.kids.push(mk(d + 1));
      } else {
        node.bud = true;
        node.ring = rnd() < 0.35;
        node.copper = rnd() < 0.6;
        node.br = 1.1 + rnd() * 1.6;
      }
      return node;
    };
    treeRoot = mk(0);
    treeRoot.x = W * (narrow ? 0.62 : 0.775);
    treeRoot.y = H + unit * 0.06;
    treeRoot.len = unit * (narrow ? 0.150 : 0.210);

    /* ---- drifting dust across the whole canvas: the glue between halves ---- */
    dust = [];
    for (let i = 0; i < 30; i++) dust.push({
      x: rnd() * W, y: rnd() * H,
      r: 0.7 + rnd() * 1.1,
      a: 0.05 + rnd() * 0.11,
      vy: 2.5 + rnd() * 5, ph: rnd() * Math.PI * 2,
      copper: rnd() < 0.4,
    });
  }

  /* alpha falloff: dissolves radially from the core, keeps a soft clear zone
     under the text column, and fades generously near every canvas edge so no
     stroke is ever clipped by the frame */
  function fall(x, y) {
    const d = Math.hypot(x - C.x, y - C.y) / maxR;
    const radial = 1 - sstep(0.60, 1.15, d);
    const left = narrow ? 1 : sstep(W * 0.34, W * 0.58, x);
    const ex = sstep(0, 1, Math.min(x, W - x) / (W * 0.11));
    const ey = sstep(0, 1, Math.min(y / (H * 0.17), (H - y) / (H * 0.12)));
    return radial * left * ex * ey;
  }
  /* gentler falloff for the ambient arcs: no clear zone, wider radius */
  function fallA(x, y) {
    const d = Math.hypot(x - C.x, y - C.y) / (maxR * 1.9);
    const radial = 1 - sstep(0.80, 1.40, d);
    const ex = sstep(0, 1, Math.min(x, W - x) / (W * 0.06));
    const ey = sstep(0, 1, Math.min(y / (H * 0.12), (H - y) / (H * 0.10)));
    return radial * ex * ey;
  }

  const epos = (cx, cy, a, b, tilt, th) => {
    const ct = Math.cos(tilt), st = Math.sin(tilt);
    const ex = Math.cos(th) * a, ey = Math.sin(th) * b;
    return { x: cx + ex * ct - ey * st, y: cy + ex * st + ey * ct };
  };

  /* stroke an ellipse in alpha-bucketed arc segments, so the falloff applies
     along the curve and no stroke ever ends abruptly */
  function strokeEllipse(cx, cy, a, b, tilt, alpha, col, dashMod, fallFn) {
    const SEG = 110;
    const buckets = new Map();
    for (let i = 0; i < SEG; i++) {
      if (dashMod && i % dashMod === dashMod - 1) continue;
      const th0 = (i / SEG) * Math.PI * 2, th1 = ((i + 1) / SEG) * Math.PI * 2;
      const m = epos(cx, cy, a, b, tilt, (th0 + th1) / 2);
      const key = Math.round(fallFn(m.x, m.y) * alpha * 60);
      if (!key) continue;
      const p0 = epos(cx, cy, a, b, tilt, th0), p1 = epos(cx, cy, a, b, tilt, th1);
      if (!buckets.has(key)) buckets.set(key, []);
      buckets.get(key).push([p0.x, p0.y, p1.x, p1.y]);
    }
    ctx.lineWidth = 1;
    for (const [key, segs] of buckets) {
      ctx.strokeStyle = rgba(col, key / 60);
      ctx.beginPath();
      for (const s of segs) { ctx.moveTo(s[0], s[1]); ctx.lineTo(s[2], s[3]); }
      ctx.stroke();
    }
  }

  function draw(t) {
    ctx.clearRect(0, 0, W, H);
    ctx.lineCap = 'round';

    /* pointer parallax: ease the composition toward the cursor */
    vx += (tx - vx) * 0.05;
    vy += (ty - vy) * 0.05;
    const ox = C.x, oy = C.y;
    C.x += vx * unit * 0.016;
    C.y += vy * unit * 0.012;

    /* warm breath at the core */
    const g = ctx.createRadialGradient(C.x, C.y, 0, C.x, C.y, maxR * 0.9);
    g.addColorStop(0, rgba(COPPER, 0.055));
    g.addColorStop(1, rgba(COPPER, 0));
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    /* ---- faint polar grid: graph paper for the phase portrait ---- */
    for (const rr of [0.34, 0.56, 0.78, 1.0]) {
      strokeEllipse(C.x, C.y, limit * rr, limit * rr, 0, 0.050, BODY, 4, fall);
    }
    for (let k = 0; k < 8; k++) {
      const th = k * Math.PI / 4 + 0.18;
      const SEGS = 40;
      for (let i = 0; i < SEGS; i++) {
        const r0 = limit * (i / SEGS), r1 = limit * ((i + 1) / SEGS);
        const mx = C.x + Math.cos(th) * (r0 + r1) / 2, my = C.y + Math.sin(th) * (r0 + r1) / 2;
        const f = fall(mx, my);
        if (f < 0.02) continue;
        ctx.strokeStyle = rgba(BODY, 0.045 * f);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(C.x + Math.cos(th) * r0, C.y + Math.sin(th) * r0);
        ctx.lineTo(C.x + Math.cos(th) * r1, C.y + Math.sin(th) * r1);
        ctx.stroke();
      }
    }

    /* ---- arboreal tree, drawn early so the orbits overlay its canopy ---- */
    (function branch(n, x, y, absAng, len, d) {
      const sway = Math.sin(t * 0.55 + n.phase + d * 0.6) * 0.030 * d;
      const a = absAng + n.ang + sway;
      const nx = x + Math.cos(a) * len, ny = y + Math.sin(a) * len;
      const mx = (x + nx) / 2 + Math.cos(a + Math.PI / 2) * len * n.curv;
      const my = (y + ny) / 2 + Math.sin(a + Math.PI / 2) * len * n.curv;
      const f = fall(nx, ny);
      if (f > 0.02) {
        const dt = d / 9;
        ctx.strokeStyle = rgba(mix(BODY, COPPER, dt * 0.8), (0.34 - dt * 0.13) * f);
        ctx.lineWidth = Math.max(0.6, 1.6 - d * 0.13);
        ctx.beginPath(); ctx.moveTo(x, y); ctx.quadraticCurveTo(mx, my, nx, ny); ctx.stroke();
      }
      if (n.bud) {
        if (f > 0.02) {
          const r = n.br * (1 + 0.22 * Math.sin(t * 1.1 + n.phase));
          const col = n.copper ? DEEP : BODY;
          if (n.ring) {
            ctx.strokeStyle = rgba(col, 0.45 * f); ctx.lineWidth = 1;
            ctx.beginPath(); ctx.arc(nx, ny, r + 0.8, 0, Math.PI * 2); ctx.stroke();
          } else {
            ctx.fillStyle = rgba(col, 0.50 * f);
            ctx.beginPath(); ctx.arc(nx, ny, r, 0, Math.PI * 2); ctx.fill();
          }
        }
        return;
      }
      for (const k of n.kids) branch(k, nx, ny, a, len * n.sh, d + 1);
    })(treeRoot, treeRoot.x, treeRoot.y, 0, treeRoot.len, 0);

    /* ---- ambient arcs reaching behind the text column ---- */
    for (const a of ambient) {
      strokeEllipse(a.cx, a.cy, a.a, a.b, a.tilt, a.alpha, BODY, 0, fallA);
      const q = epos(a.cx, a.cy, a.a, a.b, a.tilt, a.pt.th + a.pt.w * t);
      const f = fallA(q.x, q.y);
      if (f > 0.03) {
        ctx.fillStyle = rgba(BODY, 0.30 * f);
        ctx.beginPath(); ctx.arc(q.x, q.y, a.pt.r, 0, Math.PI * 2); ctx.fill();
      }
    }

    /* ---- principal orbits, apsis ticks, and the travelling points ---- */
    for (let i = 0; i < orbits.length; i++) {
      const o = orbits[i];
      strokeEllipse(C.x, C.y, o.a, o.b, o.tilt, o.alpha, o.copper ? COPPER : BODY, o.dashed ? 3 : 0, fall);

      /* tiny apsis ticks on the two outermost orbits: instrument feel */
      if (i >= orbits.length - 2) {
        for (const th of [0, Math.PI / 2, Math.PI, Math.PI * 1.5]) {
          const p = epos(C.x, C.y, o.a, o.b, o.tilt, th);
          const f = fall(p.x, p.y);
          if (f < 0.03) continue;
          const L = Math.hypot(p.x - C.x, p.y - C.y) || 1;
          const ux = (p.x - C.x) / L, uy = (p.y - C.y) / L;
          ctx.strokeStyle = rgba(BODY, 0.30 * f);
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x - ux * 3, p.y - uy * 3);
          ctx.lineTo(p.x + ux * 4.5, p.y + uy * 4.5);
          ctx.stroke();
        }
      }

      /* points with comet trails, sampled by angle so trail length is even */
      for (const p of o.pts) {
        const col = p.copper ? DEEP : BODY;
        const thNow = p.th + p.w * t;
        const TR = 18, dth = (p.trail / TR) * Math.sign(p.w);
        for (let k = TR; k > 0; k--) {
          const q0 = epos(C.x, C.y, o.a, o.b, o.tilt, thNow - k * dth);
          const q1 = epos(C.x, C.y, o.a, o.b, o.tilt, thNow - (k - 1) * dth);
          const f = fall(q1.x, q1.y);
          if (f < 0.02) continue;
          const u = 1 - k / (TR + 1);
          ctx.strokeStyle = rgba(col, Math.pow(u, 1.6) * 0.42 * f);
          ctx.lineWidth = Math.max(0.5, p.r * 0.95 * u);
          ctx.beginPath(); ctx.moveTo(q0.x, q0.y); ctx.lineTo(q1.x, q1.y); ctx.stroke();
        }
        const q = epos(C.x, C.y, o.a, o.b, o.tilt, thNow);
        const f = fall(q.x, q.y);
        if (f > 0.02) {
          ctx.fillStyle = rgba(col, 0.10 * f);
          ctx.beginPath(); ctx.arc(q.x, q.y, p.r * 2.6, 0, Math.PI * 2); ctx.fill();
          if (p.ring) {
            ctx.strokeStyle = rgba(col, 0.68 * f); ctx.lineWidth = 1.1;
            ctx.beginPath(); ctx.arc(q.x, q.y, p.r, 0, Math.PI * 2); ctx.stroke();
          } else {
            ctx.fillStyle = rgba(col, 0.88 * f);
            ctx.beginPath(); ctx.arc(q.x, q.y, p.r, 0, Math.PI * 2); ctx.fill();
          }
        }
      }
    }

    /* ---- spiral of iterates z, f(z), f²(z), … pulsing inward toward z* ---- */
    if (spiral) {
      const s = spiral;
      for (let k = s.n - 1; k >= 0; k--) {
        const r = s.r0 * Math.pow(s.q, k), th = s.th0 + k * s.dth;
        const x = C.x + Math.cos(th) * r, y = C.y + Math.sin(th) * r * 0.92;
        const wave = 0.5 + 0.5 * Math.sin(t * 1.5 - k * 0.5);
        const f = fall(x, y);
        if (f < 0.02) continue;
        ctx.fillStyle = rgba(DEEP, (0.10 + wave * 0.30) * f);
        ctx.beginPath(); ctx.arc(x, y, (1.15 + wave * 0.85) * (1 - k / (s.n * 1.6)), 0, Math.PI * 2); ctx.fill();
      }
    }

    /* ---- the fixed point z* at the core ---- */
    const fc = fall(C.x, C.y);
    if (fc > 0.02) {
      ctx.strokeStyle = rgba(BODY, 0.34 * fc); ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(C.x - 6.5, C.y); ctx.lineTo(C.x + 6.5, C.y);
      ctx.moveTo(C.x, C.y - 6.5); ctx.lineTo(C.x, C.y + 6.5);
      ctx.stroke();
      ctx.fillStyle = rgba(DEEP, 0.80 * fc);
      ctx.beginPath(); ctx.arc(C.x, C.y, 1.7, 0, Math.PI * 2); ctx.fill();
      ctx.font = '500 10.5px GeistMono, "SF Mono", monospace';
      ctx.fillStyle = rgba(BODY, 0.60 * fc);
      ctx.fillText('z*', C.x + 11, C.y - 9);
    }

    /* ---- dust ---- */
    for (const p of dust) {
      const yy = (((p.y - t * p.vy) % H) + H) % H;
      const xx = p.x + Math.sin(t * 0.3 + p.ph) * 6;
      ctx.fillStyle = rgba(p.copper ? COPPER : BODY, p.a * (0.35 + 0.65 * fall(xx, yy)));
      ctx.beginPath(); ctx.arc(xx, yy, p.r, 0, Math.PI * 2); ctx.fill();
    }

    C.x = ox; C.y = oy;
  }

  /* ---- wiring: DPR-aware resize, rAF loop, reduced-motion & tab-hidden safe ---- */
  let raf = 0;
  const t0 = performance.now();
  const tick = now => { draw((now - t0) / 1000 + 9); raf = requestAnimationFrame(tick); };
  const start = () => { if (!raf && !reduceMQ.matches) raf = requestAnimationFrame(tick); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };

  function resize() {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    W = Math.max(1, Math.round(r.width));
    H = Math.max(1, Math.round(r.height));
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    build();
    if (reduceMQ.matches) draw(9);
  }

  new ResizeObserver(resize).observe(canvas);
  resize();

  document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  reduceMQ.addEventListener?.('change', () => { stop(); reduceMQ.matches ? draw(9) : start(); });
  if (reduceMQ.matches) draw(9); else start();

  /* pointer parallax only for fine pointers, never under reduced motion */
  if (!reduceMQ.matches && matchMedia('(hover: hover) and (pointer: fine)').matches) {
    window.addEventListener('pointermove', e => {
      tx = (e.clientX / W - 0.5) * 2;
      ty = (e.clientY / H - 0.5) * 2;
    }, { passive: true });
    document.documentElement.addEventListener('pointerleave', () => { tx = 0; ty = 0; });
    window.__zzParallax = () => ({ tx, ty });
  }
})();
