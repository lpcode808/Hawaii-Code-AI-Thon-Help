// Checks promo-animation.html against the brief, in headless Chromium.
//   node promo/check.mjs [--sheet t1,t2,...] [--player]
// 1. No console errors or page errors.
// 2. Every word on screen (alpha >= 0.6, not mid-transition) is at least 28 px tall at 1080p,
//    and no visible word runs off the 1920x1080 frame. Swept every 0.05 s.
// 3. --sheet: a contact sheet of the listed times (default: two per beat) in promo/out/sheet.jpg.
// 4. --player: the controls at 1280x720 (play, pause, loop, replay, scrub, keys).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { PAGE, OUT } from './assets.mjs';
const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const args = process.argv.slice(2);
const want = k => args.includes(k);
const argv = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : null; };
fs.mkdirSync(OUT, { recursive: true });
const browser = await chromium.launch();
let failed = 0;
const fail = m => { failed++; console.log('FAIL ' + m); };

// ---- the frames ----
{
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  await page.goto('file://' + PAGE + '?render=1');
  await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
  const res = await page.evaluate(() => {
    const Q = PROMO.QA; Q.on = true; const small = [], off = []; let n = 0;
    for (let t = 0; t <= PROMO.DUR + 1e-9; t += 0.05) {
      renderAt(t);
      for (const it of Q.items) {
        n++;
        if (it.alpha >= .6 && !it.transit && it.px < 27.99) small.push({ t: +t.toFixed(2), s: it.s, px: +it.px.toFixed(1) });
        if (it.alpha >= .3 && !it.transit && (it.x0 < -1 || it.x1 > 1921 || it.y < 0 || it.y > 1080)) off.push({ t: +t.toFixed(2), s: it.s, x0: Math.round(it.x0), x1: Math.round(it.x1), y: Math.round(it.y) });
      }
    }
    Q.on = false;
    const fonts = [...document.fonts].map(f => f.family + ' ' + f.weight + ' ' + f.status);
    return { n, small, off, fonts };
  });
  const uniq = (a, key) => { const seen = new Map(); for (const x of a) { const k = key(x); if (!seen.has(k)) seen.set(k, x); } return [...seen.values()]; };
  console.log(`text draws checked: ${res.n}; fonts: ${res.fonts.filter(f => f.endsWith('loaded')).length}/${res.fonts.length} loaded`);
  for (const x of uniq(res.small, x => x.s)) fail(`small text at ${x.t}s: "${x.s}" ${x.px}px`);
  for (const x of uniq(res.off, x => x.s)) fail(`text off frame at ${x.t}s: "${x.s}" x ${x.x0}..${x.x1} y ${x.y}`);
  if (want('--sheet')) {
    const list = (argv('--sheet') || '').split(',').filter(Boolean).map(Number);
    const times = list.length ? list : await page.evaluate(() => PROMO.SCENES.flatMap(s => [s.t0 + (s.t1 - s.t0) * .35, s.t0 + (s.t1 - s.t0) * .85]));
    const dir = path.join(OUT, 'sheet'); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < times.length; i++) {
      const d = await page.evaluate(t => { renderAt(t); const c = document.getElementById('c'), x = c.getContext('2d'); x.setTransform(1, 0, 0, 1, 0, 0); x.globalAlpha = 1; x.fillStyle = 'rgba(0,0,0,.7)'; x.fillRect(0, 0, 220, 64); x.fillStyle = '#ff0'; x.font = '700 44px monospace'; x.textAlign = 'left'; x.fillText(t.toFixed(2) + 's', 14, 48); return c.toDataURL('image/jpeg', .9); }, times[i]);
      fs.writeFileSync(path.join(dir, `f${String(i).padStart(3, '0')}.jpg`), Buffer.from(d.split(',')[1], 'base64'));
    }
    const cols = times.length > 9 ? 4 : 3, rows = Math.ceil(times.length / cols);
    execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', path.join(dir, 'f%03d.jpg'), '-vf', `scale=640:-1,tile=${cols}x${rows}:padding=6:color=white`, '-frames:v', '1', '-q:v', '3', path.join(OUT, 'sheet.jpg')]);
    console.log('sheet: ' + path.join(OUT, 'sheet.jpg') + ' (' + times.map(t => t.toFixed(2)).join(', ') + ')');
  }
  for (const e of errors) fail('console: ' + e);
  await page.close();
}

// ---- the player ----
if (want('--player')) {
  for (const vp of [{ width: 1280, height: 720 }, { width: 1920, height: 1080 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport: vp });
    const errors = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', e => errors.push(e.message));
    await page.goto('file://' + PAGE);
    await page.waitForFunction(() => window.__ready, null, { timeout: 60000 });
    const T = () => page.evaluate(() => +document.getElementById('scrub').getAttribute('aria-valuenow'));
    await page.click('#bigplay');
    await page.waitForTimeout(1500);
    const t1 = await T(); if (!(t1 > 1 && t1 < 2.5)) fail(`${vp.width}: playing 1.5 s reached ${t1}`);
    await page.keyboard.press('Space'); const tp = await T(); await page.waitForTimeout(600); const tp2 = await T();
    if (Math.abs(tp2 - tp) > .05) fail(`${vp.width}: Space did not pause (${tp} -> ${tp2})`);
    await page.keyboard.press('l'); const loop = await page.getAttribute('#loop', 'aria-pressed'); if (loop !== 'true') fail(`${vp.width}: L did not turn loop on`);
    await page.keyboard.press('l');
    const box = await page.locator('#scrub').boundingBox();
    if (box) { await page.mouse.move(box.x + 5, box.y + box.height / 2); await page.mouse.down(); await page.mouse.move(box.x + box.width * .75, box.y + box.height / 2, { steps: 5 }); await page.mouse.up(); }
    const ts = await T(); if (!(ts > 43 && ts < 47)) fail(`${vp.width}: drag to 75% gave ${ts}`);
    await page.keyboard.press('r'); await page.waitForTimeout(400); const tr = await T(); if (!(tr < 1.2)) fail(`${vp.width}: R gave ${tr}`);
    await page.keyboard.press('8'); await page.waitForTimeout(300);
    await page.keyboard.press('Space'); await page.keyboard.press('Space');
    const pageNoScroll = await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);
    if (!pageNoScroll) fail(`${vp.width}: page scrolls sideways`);
    const uiFits = await page.evaluate(() => { const u = document.getElementById('ui').getBoundingClientRect(), f = document.getElementById('frame').getBoundingClientRect(); return u.right <= f.right + 1 && u.left >= f.left - 1; });
    if (!uiFits) fail(`${vp.width}: controls overflow the frame`);
    await page.screenshot({ path: path.join(OUT, `player-${vp.width}.png`) });
    for (const e of errors) fail(`${vp.width} console: ` + e);
    console.log(`player ${vp.width}x${vp.height}: t after 1.5 s ${t1.toFixed(2)}, paused at ${tp.toFixed(2)}, scrub ${ts.toFixed(1)}, replay ${tr.toFixed(2)}`);
    await page.close();
  }
}
await browser.close();
console.log(failed ? `${failed} problem(s)` : 'all checks passed');
process.exit(failed ? 1 : 0);
