// Writes a film's soundtrack and embeds it in its page.
//   node promo/score.mjs [--film intro|prequel] [--reuse-music]
// Music: the page's MUSIC_PLAN, a list of Stock Library cues from Audio-in-the-Cloud (stock-library/engine.js on
// the shared instruments), each written out with the engine's own options and laid at its time, with optional
// fades, a cut-off and an optional tape stop. The intro is "Further Up" at 60 s; the prequel is "Tape Left Running"
// (lo-fi loop) in E major, wound down like a tape, a snap, then "Whiteboard Morning" (corporate cut) in E major.
// Sound effects: synthesized here from the page's own cue list (cues()), so every click, pop and whoosh sits on
// the frame that causes it. Music and effects are added, peaks over -1.5 dBFS are rounded by a curve with no
// memory, and the result goes into ASSETS.audio as a 128 kb/s MP3. promo/out/<film>/score.wav keeps the full mix
// for promo/video.mjs. Rendered cues are cached in promo/out/music-*.f32 (--reuse-music uses them).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import crypto from 'node:crypto';
import { OUT as OUT0, AUDIO_REPO, writeAsset, film } from './assets.mjs';
const F = film(), PAGE = F.page, OUT = path.join(OUT0, F.name);
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const SR = 44100, SFX_GAIN = 1.0;
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

// the cue list, from the page
const page = await browser.newPage();
await page.goto('file://' + PAGE + '?render=1');
await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
const { DUR, cues, plan } = await page.evaluate(() => ({ DUR: PROMO.DUR, cues: PROMO.cues(), plan: PROMO.MUSIC_PLAN }));
await page.close();
console.log(`${F.name}: ${cues.length} cues over ${DUR} s, ${plan.length} music cue(s)`);

const harness = path.join(AUDIO_REPO, 'stock-library', 'tests', 'harness.html');
if (!fs.existsSync(harness)) throw new Error('Audio-in-the-Cloud not found at ' + AUDIO_REPO + ' (set AUDIO_REPO)');
const lab = await browser.newPage();
lab.on('pageerror', e => console.log('ERR', e.message));
await lab.goto('file://' + harness);
const f32 = b64 => { const b = Buffer.from(b64, 'base64'); return new Float32Array(b.buffer, b.byteOffset, b.length / 4); };

// the music: each cue in the plan, written (or reused from the cache), then laid into one bed
const N0 = Math.round(DUR * SR), mL = new Float32Array(N0), mR = new Float32Array(N0);
for (const seg of plan) {
  const key = crypto.createHash('sha1').update(JSON.stringify([seg.family, seg.opt])).digest('hex').slice(0, 10);
  const cache = path.join(OUT0, `music-${seg.family}-${key}.f32`);
  let L, R;
  if (process.argv.includes('--reuse-music') && fs.existsSync(cache)) {
    const all = new Float32Array(fs.readFileSync(cache).buffer.slice(0)); L = all.subarray(0, all.length / 2); R = all.subarray(all.length / 2);
    console.log(`music: ${seg.family} reused from ${cache}`);
  } else {
    const t0 = Date.now();
    const r = await lab.evaluate(([f, o]) => take(f, o), [seg.family, seg.opt]);
    if (r.sr !== SR) throw new Error('music came back at ' + r.sr + ' Hz');
    L = f32(r.L); R = f32(r.R);
    const all = new Float32Array(L.length * 2); all.set(L, 0); all.set(R, L.length); fs.writeFileSync(cache, Buffer.from(all.buffer));
    console.log(`music: "${r.cue.title}" (${seg.family} ${r.cue.kind}), ${r.cue.tempo} bpm, ${r.cue.key.name}, ${r.cue.bars} bars, ${r.cue.length} s, last chord at ${r.cue.chart.at(-1).t} s (${((Date.now() - t0) / 1000).toFixed(0)} s to write)`);
  }
  // lay it in: starts at seg.at (s), from seg.from (s into the take), ends at seg.until, with fades.
  //   tapeStop (s): the last stretch before seg.until plays slower and slower to a stop, as a tape does when the motor is cut.
  //   damage: [{ t, depth, cents, wow, dull }]: at t the music chokes. A copy of that instant plays slower and slower
  //   (its pitch sagging by cents) while the level dips by depth, then the music comes back exactly on the beat, as
  //   if nothing was lost: no stall ever moves the music off the picture's grid. Each one can also leave the tape
  //   wobbling a little more (wow, cents of slow pitch wobble that averages out) and duller (a low-pass falling to dull Hz).
  const at = Math.round((seg.at || 0) * SR), from = Math.round((seg.from || 0) * SR), until = Math.min(N0, Math.round((seg.until == null ? DUR : seg.until) * SR));
  const fi = Math.max(1, Math.round((seg.fadeIn || 0) * SR)), fo = Math.max(1, Math.round((seg.fadeOut || 0) * SR)), g = seg.gain == null ? 1 : Math.pow(10, seg.gain / 20);
  const ts = Math.round((seg.tapeStop || 0) * SR), tsAt = until - ts;
  const dmg = (seg.damage || []).map(d => Object.assign({ depth: .5, cents: -60, wow: 0, dull: 0 }, d, { q: null }));
  const STALL = .4;
  const dip = u => u < 0 ? 0 : u < .03 ? u / .03 : u < .16 ? 1 : u < .38 ? 1 - (u - .16) / .22 : 0;          // the level
  const mixIn = u => u < 0 ? 0 : u < .02 ? u / .02 : u < .22 ? 1 : u < STALL ? 1 - (u - .22) / (STALL - .22) : 0;   // the choking copy
  const wowAt = tt => dmg.reduce((a, d) => a + (tt >= d.t ? d.wow * Math.min(1, (tt - d.t) / .3) : 0), 0);
  const cutoffAt = tt => { let f = 18000; for (const d of dmg) if (d.dull && tt >= d.t) f = f + (d.dull - f) * Math.min(1, (tt - d.t) / .3); return f; };
  const lp = [{ x1: 0, x2: 0, y1: 0, y2: 0 }, { x1: 0, x2: 0, y1: 0, y2: 0 }]; let co = null;
  const biq = f => { const w = 2 * Math.PI * Math.min(f, SR * .45) / SR, cs = Math.cos(w), al = Math.sin(w) / (2 * .707), a0 = 1 + al; return { b0: (1 - cs) / 2 / a0, b1: (1 - cs) / a0, b2: (1 - cs) / 2 / a0, a1: -2 * cs / a0, a2: (1 - al) / a0 }; };
  const run = (st, x) => { const y = co.b0 * x + co.b1 * st.x1 + co.b2 * st.x2 - co.a1 * st.y1 - co.a2 * st.y2; st.x2 = st.x1; st.x1 = x; st.y2 = st.y1; st.y1 = y; return y; };
  const read = (A, p) => { const j0 = Math.floor(p), fr = p - j0; return j0 + 1 < A.length && j0 >= 0 ? A[j0] + (A[j0 + 1] - A[j0]) * fr : 0; };
  const dull = dmg.some(d => d.dull);
  let pos = from;
  for (let i = at; i < until; i++) {
    const tt = i / SR, slow = ts > 0 && i >= tsAt;
    if (pos + 1 >= L.length) break;
    let l = read(L, pos), r = read(R, pos), lev = 1;
    for (const d of dmg) {
      const u = tt - d.t; if (u < 0 || u >= STALL) continue;
      if (d.q === null) d.q = pos;
      const w = mixIn(u), cl = read(L, d.q), cr = read(R, d.q);
      l = l * (1 - w) + cl * w; r = r * (1 - w) + cr * w; lev *= 1 - d.depth * dip(u);
      d.q += Math.pow(2, d.cents * Math.min(1, u / .12) / 1200);
    }
    let k = Math.min(1, (i - at) / fi, (until - i) / fo) * g * lev;
    if (slow) k *= Math.min(1, (until - i) / (ts * .35));
    if (dull) { if ((i - at) % 32 === 0) co = biq(cutoffAt(tt)); l = run(lp[0], l); r = run(lp[1], r); }
    mL[i] += l * k; mR[i] += r * k;
    const wow = dmg.length ? wowAt(tt) : 0;
    pos += (wow ? Math.pow(2, wow * Math.sin(2 * Math.PI * .9 * tt) / 1200) : 1) * (slow ? 1 - (i - tsAt) / ts : 1);
  }
}

// the sound effects
const sfx = await lab.evaluate(async ({ cues, DUR }) => {
  const sr = 44100, ac = new OfflineAudioContext(2, Math.ceil(DUR * sr), sr);
  let seed = 20261123;
  const rnd = () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const nb = ac.createBuffer(1, sr * 2, sr), nd = nb.getChannelData(0); for (let i = 0; i < nd.length; i++) nd[i] = rnd() * 2 - 1;
  // a small room, so the effects sit near the music's hall
  const ir = ac.createBuffer(2, Math.round(sr * 1.1), sr);
  for (let ch = 0; ch < 2; ch++) { const d = ir.getChannelData(ch); for (let i = 0; i < d.length; i++) d[i] = (rnd() * 2 - 1) * Math.exp(-i / sr * 5.5) * .35; }
  const dry = ac.createGain(), room = ac.createConvolver(), wet = ac.createGain();
  room.buffer = ir; wet.gain.value = .25; dry.connect(ac.destination); room.connect(wet).connect(ac.destination);
  const bus = pan => { const p = ac.createStereoPanner(); p.pan.value = pan; p.connect(dry); p.connect(room); return p; };
  const dbus = pan => { const p = ac.createStereoPanner(); p.pan.value = pan; p.connect(dry); return p; };   // no room (808, hats)
  const drive = (() => { const n = 1024, c = new Float32Array(n); for (let i = 0; i < n; i++) { const x = i / (n - 1) * 2 - 1; c[i] = Math.tanh(2.2 * x) / Math.tanh(2.2); } return c; })();
  const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
  const env = (g, t, a, peak, d) => { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); g.gain.setValueAtTime(0, t + a + d + .001); };
  const noise = (t, len) => { const s = ac.createBufferSource(); s.buffer = nb; s.start(t, rnd() * 1.4, len); return s; };
  const tone = (type, f, t, a, peak, d, pan, f1) => {
    const o = ac.createOscillator(); o.type = type; o.frequency.setValueAtTime(f, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + Math.min(.05, d));
    const g = ac.createGain(); env(g, t, a, peak, d); o.connect(g).connect(bus(pan || 0)); o.start(t); o.stop(t + a + d + .02);
  };
  const filt = (type, f, q) => { const b = ac.createBiquadFilter(); b.type = type; b.frequency.value = f; b.Q.value = q; return b; };
  for (const c of cues) {
    const t = c.t, v = c.v == null ? .6 : c.v;
    switch (c.kind) {
      case 'tick': {   // a soft key: a click of filtered noise and a little thock
        const g = ac.createGain(); env(g, t, .001, .05 * v, .028);
        noise(t, .05).connect(filt('bandpass', 2600 + rnd() * 1600, 1.3)).connect(g).connect(bus(-.15 + rnd() * .3));
        tone('sine', 700 + rnd() * 250, t, .001, .03 * v, .03, 0, 260);
        break;
      }
      case 'pop': { const f = mtof(c.m); tone('sine', f * 1.7, t, .003, .2 * v, .2, 0, f); tone('triangle', f * 2, t, .002, .035 * v, .09, 0); break; }
      case 'blip': tone('sine', mtof(c.m), t, .006, .08 * v, .14, c.m > 76 ? .35 : -.35); break;
      case 'click': {
        const g = ac.createGain(); env(g, t, .0008, .12 * v, .012); noise(t, .03).connect(filt('highpass', 2500, .7)).connect(g).connect(bus(.1));
        tone('sine', 1900, t, .0008, .05 * v, .02, .1, 1200);
        break;
      }
      case 'whoosh': {
        const d = c.d || .6, s = noise(t, d + .05), bp = filt('bandpass', 300, .8), g = ac.createGain(), p = ac.createStereoPanner();
        bp.frequency.setValueAtTime(260, t); bp.frequency.exponentialRampToValueAtTime(2400, t + d * .6); bp.frequency.exponentialRampToValueAtTime(600, t + d);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.22 * v, t + d * .6); g.gain.linearRampToValueAtTime(0, t + d);
        p.pan.setValueAtTime(-.5, t); p.pan.linearRampToValueAtTime(.5, t + d);
        s.connect(bp).connect(g).connect(p); p.connect(dry); p.connect(room);
        break;
      }
      case 'swish': {
        const d = .32, s = noise(t, d), bp = filt('bandpass', 3000, 1.2), g = ac.createGain();
        bp.frequency.setValueAtTime(2200, t); bp.frequency.exponentialRampToValueAtTime(7500, t + d);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.24 * v, t + .08); g.gain.linearRampToValueAtTime(0, t + d);
        s.connect(bp).connect(g).connect(bus(.3));
        break;
      }
      case 'sparkle': { const ns = [86, 90, 93, 98, 93, 102]; ns.forEach((m, i) => tone('sine', mtof(m), t + i * .045, .003, .06 * v, .32, i % 2 ? .4 : -.4)); break; }
      case 'chime': {
        [[81, 0], [86, .11]].forEach(([m, dt]) => { const f = mtof(m); tone('sine', f, t + dt, .004, .12 * v, 1.1, 0); tone('sine', f * 2.76, t + dt, .002, .025 * v, .35, 0); tone('sine', f * 5.4, t + dt, .001, .01 * v, .15, 0); });
        break;
      }
      case 'bonk': {   // a gentle "uh-oh", two notes down, not a buzzer
        [[57, 0], [53, .14]].forEach(([m, dt]) => {
          const f = mtof(m), o = ac.createOscillator(), lp = filt('lowpass', 1400, .7), g = ac.createGain();
          o.type = 'triangle'; o.frequency.setValueAtTime(f * 1.04, t + dt); o.frequency.exponentialRampToValueAtTime(f, t + dt + .04);
          env(g, t + dt, .005, .2 * v, .2); o.connect(lp).connect(g).connect(bus(0)); o.start(t + dt); o.stop(t + dt + .3);
        });
        break;
      }
      case 'think': {
        const d = c.d, s = ac.createBufferSource(); s.buffer = nb; s.loop = true; s.start(t, 0); s.stop(t + d + .1);
        const bp = filt('bandpass', 1900, 4), g = ac.createGain(), lfo = ac.createOscillator(), lg = ac.createGain();
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.035, t + .3); g.gain.setValueAtTime(.035, t + d - .3); g.gain.linearRampToValueAtTime(0, t + d);
        lfo.frequency.value = 5; lg.gain.value = .012; lfo.connect(lg).connect(g.gain); lfo.start(t); lfo.stop(t + d + .1);
        s.connect(bp).connect(g).connect(bus(0));
        break;
      }
      case 'snap': {   // fingers: a sharp crack of noise with a short body, and a touch more room
        const g = ac.createGain(); env(g, t, .0005, .5 * v, .05); noise(t, .08).connect(filt('bandpass', 2300, 1.6)).connect(g).connect(bus(0));
        const g2 = ac.createGain(); env(g2, t, .0005, .25 * v, .012); noise(t, .02).connect(filt('highpass', 5000, .7)).connect(g2).connect(bus(0));
        tone('sine', 1300, t, .0005, .1 * v, .03, 0, 700);
        break;
      }
      case 'stamp': {  // a rubber stamp: a dull thud and a slap
        tone('sine', 140, t, .002, .3 * v, .12, 0, 70);
        const g = ac.createGain(); env(g, t, .001, .14 * v, .05); noise(t, .06).connect(filt('lowpass', 1800, .7)).connect(g).connect(bus(0));
        break;
      }
      case 'strike': { // a marker line drawn across a word
        const d = .22, s = noise(t, d), bp = filt('bandpass', 1500, 2), g = ac.createGain();
        bp.frequency.setValueAtTime(1200, t); bp.frequency.linearRampToValueAtTime(2400, t + d);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.1 * v, t + .03); g.gain.setValueAtTime(.1 * v, t + d - .05); g.gain.linearRampToValueAtTime(0, t + d);
        s.connect(bp).connect(g).connect(bus(-.2));
        break;
      }
      case 'crack': {  // a pane giving way: a hard tick, then a short splintering
        const g = ac.createGain(); env(g, t, .0004, .5 * v, .03); noise(t, .05).connect(filt('highpass', 3500, .8)).connect(g).connect(bus(0));
        tone('sine', 2600, t, .0004, .12 * v, .02, 0, 1800);
        for (let i = 0; i < 9; i++) { const ti = t + .02 + i * .022 + rnd() * .012, g2 = ac.createGain(); env(g2, ti, .0004, (.16 - i * .012) * v, .012); noise(ti, .02).connect(filt('bandpass', 4000 + rnd() * 3000, 2)).connect(g2).connect(bus(-.4 + rnd() * .8)); }
        break;
      }
      case 'shatter': {  // the glass goes: a burst, a low thump, and a fall of small bright pieces
        const g = ac.createGain(); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.42 * v, t + .004); g.gain.exponentialRampToValueAtTime(.0001, t + .5);
        noise(t, .55).connect(filt('highpass', 1800, .7)).connect(g).connect(bus(0));
        tone('sine', 90, t, .003, .3 * v, .25, 0, 50);
        for (let i = 0; i < 34; i++) {
          const ti = t + .01 + Math.pow(rnd(), 1.6) * .9, f = 2800 + rnd() * 5200, d = .05 + rnd() * .12, lv = (.05 + rnd() * .05) * v * (1 - (ti - t) / 1.1);
          tone('sine', f, ti, .0006, lv, d, -.8 + rnd() * 1.6); tone('sine', f * 1.51, ti, .0006, lv * .4, d * .7, -.8 + rnd() * 1.6);
        }
        break;
      }
      // ---- a drum machine, for the electronic beat in the prequel ----
      case 'k808': {   // a tuned sine kick with a long tail, driven a little so it carries on small speakers
        const f = mtof(c.m), d = c.d || .6, o = ac.createOscillator(), g = ac.createGain(), ws = ac.createWaveShaper(), out = ac.createGain();
        o.type = 'sine'; o.frequency.setValueAtTime(f * 3.2, t); o.frequency.exponentialRampToValueAtTime(f, t + .045);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(1, t + .002); g.gain.setValueAtTime(1, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + d);
        ws.curve = drive; out.gain.value = .34 * v;
        o.connect(g).connect(ws).connect(out).connect(dbus(0)); o.start(t); o.stop(t + d + .05);
        const g2 = ac.createGain(); env(g2, t, .0005, .08 * v, .008); noise(t, .02).connect(filt('highpass', 3000, .7)).connect(g2).connect(dbus(0));
        break;
      }
      case 'eclap': {  // three hands a few milliseconds apart, a snare's body under them, and a tail in the room
        for (let i = 0; i < 3; i++) { const g = ac.createGain(); env(g, t + i * .009, .0005, .22 * v, i < 2 ? .012 : .14); noise(t + i * .009, .2).connect(filt('bandpass', 1150, .9)).connect(g).connect(bus(i === 1 ? -.15 : .15)); }
        tone('triangle', 190, t, .001, .08 * v, .07, 0, 150);
        break;
      }
      case 'ehat': {   // closed, or open on the off-beat
        const d = c.open ? .22 : .028, g = ac.createGain(); env(g, t, .0005, .09 * v, d);
        noise(t, d + .02).connect(filt('highpass', 7500, .7)).connect(g).connect(dbus(.25));
        break;
      }
      case 'riser': {  // noise climbing through a band-pass, up to the drop
        const d = c.d || 1.5, s = noise(t, d), bp = filt('bandpass', 400, 2.5), g = ac.createGain();
        bp.frequency.setValueAtTime(400, t); bp.frequency.exponentialRampToValueAtTime(9000, t + d);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.12 * v, t + d * .9); g.gain.linearRampToValueAtTime(0, t + d);
        s.connect(bp).connect(g).connect(bus(0));
        break;
      }
      case 'swell': {  // a cymbal played backwards, into the last chord
        const d = c.d || .5, s = noise(t, d), hp = filt('highpass', 5000, .7), g = ac.createGain();
        g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.16 * v, t + d - .01); g.gain.linearRampToValueAtTime(0, t + d);
        s.connect(hp).connect(g).connect(bus(0));
        break;
      }
      case 'bloom': {
        const o = ac.createOscillator(), g = ac.createGain(); o.type = 'sine'; o.frequency.value = mtof(50);
        g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.1, t + .45); g.gain.exponentialRampToValueAtTime(.0001, t + 2.4);
        o.connect(g).connect(bus(0)); o.start(t); o.stop(t + 2.5);
        const s = noise(t, 1.2), bp = filt('bandpass', 400, 1.2), g2 = ac.createGain();
        bp.frequency.setValueAtTime(400, t); bp.frequency.exponentialRampToValueAtTime(5000, t + 1.0);
        g2.gain.setValueAtTime(0, t); g2.gain.linearRampToValueAtTime(.06, t + .8); g2.gain.linearRampToValueAtTime(0, t + 1.15);
        s.connect(bp).connect(g2).connect(bus(0));
        break;
      }
    }
  }
  const b = await ac.startRendering();
  const enc = a => { const u = new Uint8Array(a.buffer); let s = ''; for (let i = 0; i < u.length; i += 0x8000) s += String.fromCharCode.apply(null, u.subarray(i, i + 0x8000)); return btoa(s); };
  return { L: enc(b.getChannelData(0)), R: enc(b.getChannelData(1)) };
}, { cues, DUR });
await browser.close();
const sL = f32(sfx.L), sR = f32(sfx.R);

// add, then round the peaks: straight up to 0.7, then a curve that never passes 0.84 (-1.5 dBFS)
const N = Math.round(DUR * SR), K = .7, TOP = .84 - K;
const shape = x => { const a = Math.abs(x); return a <= K ? x : Math.sign(x) * (K + TOP * Math.tanh((a - K) / TOP)); };
const L = new Float32Array(N), R = new Float32Array(N);
let rounded = 0, peakIn = 0;
for (let i = 0; i < N; i++) {
  const l = (mL[i] || 0) + SFX_GAIN * (sL[i] || 0), r = (mR[i] || 0) + SFX_GAIN * (sR[i] || 0);
  peakIn = Math.max(peakIn, Math.abs(l), Math.abs(r)); if (Math.abs(l) > K || Math.abs(r) > K) rounded++;
  L[i] = shape(l); R[i] = shape(r);
}
// 16-bit WAV
const wav = Buffer.alloc(44 + N * 4);
wav.write('RIFF', 0); wav.writeUInt32LE(36 + N * 4, 4); wav.write('WAVE', 8); wav.write('fmt ', 12); wav.writeUInt32LE(16, 16); wav.writeUInt16LE(1, 20); wav.writeUInt16LE(2, 22);
wav.writeUInt32LE(SR, 24); wav.writeUInt32LE(SR * 4, 28); wav.writeUInt16LE(4, 32); wav.writeUInt16LE(16, 34); wav.write('data', 36); wav.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) { wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i])) * 32767), 44 + i * 4); wav.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i])) * 32767), 46 + i * 4); }
const wavPath = path.join(OUT, 'score.wav'), mp3Path = path.join(OUT, 'score.mp3');
fs.writeFileSync(wavPath, wav);
fs.writeFileSync(path.join(OUT, 'sfx.f32'), Buffer.concat([Buffer.from(sL.buffer, sL.byteOffset, sL.byteLength), Buffer.from(sR.buffer, sR.byteOffset, sR.byteLength)]));
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', wavPath, '-c:a', 'libmp3lame', '-b:a', '128k', mp3Path]);
const loud = execFileSync('ffmpeg', ['-hide_banner', '-nostats', '-i', wavPath, '-af', 'ebur128=peak=true', '-f', 'null', '-'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const mp3 = fs.readFileSync(mp3Path);
const size = writeAsset('audio', mp3.toString('base64'), PAGE);
console.log(`mix: peak before rounding ${(20 * Math.log10(peakIn)).toFixed(1)} dBFS, ${(rounded / SR * 1000).toFixed(0)} ms rounded; mp3 ${(mp3.length / 1024).toFixed(0)} KB; page ${(size / 1024).toFixed(0)} KB`);
