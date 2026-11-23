// Writes the soundtrack and embeds it in promo-animation.html.
//   node promo/score.mjs [--reuse-music]
// Music: "Further Up", the inspirational build from Audio-in-the-Cloud's Stock Library (stock-library/engine.js
// on the shared instruments), written out at 60 s: 96 bpm, D major, 22 bars and a last chord on bar 23 (55.04 s).
// Sound effects: synthesized here from the page's own cue list (cues() in promo-animation.html), so every click,
// pop and whoosh sits on the frame that causes it. The two are added, peaks over -1.5 dBFS are rounded by a curve
// with no memory, and the result goes into ASSETS.audio as a 128 kb/s MP3. promo/out/score.wav keeps the full mix
// for promo/video.mjs.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { PAGE, OUT, AUDIO_REPO, writeAsset } from './assets.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const SR = 44100, SFX_GAIN = 1.0;
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();

// the cue list, from the page
const page = await browser.newPage();
await page.goto('file://' + PAGE + '?render=1');
await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
const { DUR, cues } = await page.evaluate(() => ({ DUR: PROMO.DUR, cues: PROMO.cues() }));
await page.close();
console.log(`${cues.length} cues over ${DUR} s`);

const harness = path.join(AUDIO_REPO, 'stock-library', 'tests', 'harness.html');
if (!fs.existsSync(harness)) throw new Error('Audio-in-the-Cloud not found at ' + AUDIO_REPO + ' (set AUDIO_REPO)');
const lab = await browser.newPage();
lab.on('pageerror', e => console.log('ERR', e.message));
await lab.goto('file://' + harness);
const f32 = b64 => { const b = Buffer.from(b64, 'base64'); return new Float32Array(b.buffer, b.byteOffset, b.length / 4); };

// the music (about 45 s to write in headless Chromium on four cores)
const cache = path.join(OUT, 'music.f32');
let mL, mR;
if (process.argv.includes('--reuse-music') && fs.existsSync(cache)) {
  const all = new Float32Array(fs.readFileSync(cache).buffer.slice(0)); mL = all.subarray(0, all.length / 2); mR = all.subarray(all.length / 2);
  console.log('music: reused ' + cache);
} else {
  const t0 = Date.now();
  const r = await lab.evaluate(() => take('inspire', { length: 60 }));
  if (r.sr !== SR) throw new Error('music came back at ' + r.sr + ' Hz');
  mL = f32(r.L); mR = f32(r.R);
  const all = new Float32Array(mL.length * 2); all.set(mL, 0); all.set(mR, mL.length); fs.writeFileSync(cache, Buffer.from(all.buffer));
  console.log(`music: "${r.cue.title}", ${r.cue.tempo} bpm, ${r.cue.key.name}, ${r.cue.bars} bars, last chord at ${r.cue.chart.at(-1).t} s (${((Date.now() - t0) / 1000).toFixed(0)} s to write)`);
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
const size = writeAsset('audio', mp3.toString('base64'));
console.log(`mix: peak before rounding ${(20 * Math.log10(peakIn)).toFixed(1)} dBFS, ${(rounded / SR * 1000).toFixed(0)} ms rounded; mp3 ${(mp3.length / 1024).toFixed(0)} KB; page ${(size / 1024).toFixed(0)} KB`);
