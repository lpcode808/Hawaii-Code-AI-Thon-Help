// Shoots promo-animation.html frame by frame and muxes the soundtrack: assets/video/code-aithon-60s.mp4
//   node promo/score.mjs        (once, for promo/out/score.wav)
//   node promo/video.mjs [fps]  (default 30; frames go to promo/out/frames and are reused if present)
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { PAGE, OUT, ROOT } from './assets.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const FPS = +(process.argv[2] || 30), WORKERS = 3, DIR = path.join(OUT, 'frames');
const wav = path.join(OUT, 'score.wav'); if (!fs.existsSync(wav)) throw new Error('run node promo/score.mjs first');
fs.mkdirSync(DIR, { recursive: true });
const browser = await chromium.launch();
const t0 = Date.now();
let NF = 0;
await Promise.all(Array.from({ length: WORKERS }, async (_, w) => {
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('pageerror', e => console.log('ERR', e.message));
  await page.goto('file://' + PAGE + '?render=1');
  await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
  const DUR = await page.evaluate(() => PROMO.DUR); NF = Math.round(DUR * FPS);
  for (let f = w; f < NF; f += WORKERS) {
    const fn = path.join(DIR, `f${String(f).padStart(5, '0')}.jpg`); if (fs.existsSync(fn)) continue;
    const d = await page.evaluate(t => { renderAt(t); return document.getElementById('c').toDataURL('image/jpeg', .93); }, f / FPS);
    fs.writeFileSync(fn, Buffer.from(d.split(',')[1], 'base64'));
  }
  await page.close();
}));
await browser.close();
console.log(`${NF} frames in ${((Date.now() - t0) / 1000).toFixed(0)} s`);
const out = path.join(ROOT, 'assets', 'video', 'code-aithon-60s.mp4');
fs.mkdirSync(path.dirname(out), { recursive: true });
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(FPS), '-i', path.join(DIR, 'f%05d.jpg'), '-i', wav,
  '-map', '0:v', '-map', '1:a', '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-tune', 'animation', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-level', '4.1',
  '-c:a', 'aac', '-b:a', '160k', '-t', '60', '-movflags', '+faststart', out]);
console.log(`${out}: ${(fs.statSync(out).size / 1048576).toFixed(1)} MB`);
