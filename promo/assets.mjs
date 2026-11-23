// Rewrites one embedded asset in promo-animation.html: the text between /* @asset name */ and /* @end */.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, '..');
export const PAGE = path.join(ROOT, 'promo-animation.html');
// the sibling repos this piece borrows from (override with AUDIO_REPO / ANIMATION_REPO)
export const AUDIO_REPO = process.env.AUDIO_REPO || path.resolve(ROOT, '..', 'Audio-in-the-Cloud');
export const ANIMATION_REPO = process.env.ANIMATION_REPO || path.resolve(ROOT, '..', 'Animation-in-the-Cloud');
// scratch space for frames and WAVs (git ignores promo/out/)
export const OUT = process.env.PROMO_OUT || path.join(HERE, 'out');

export function writeAsset(name, value) {
  const html = fs.readFileSync(PAGE, 'utf8');
  const open = `/* @asset ${name} */`, close = '/* @end */';
  const a = html.indexOf(open); if (a < 0) throw new Error('no asset marker for ' + name);
  const b = html.indexOf(close, a + open.length); if (b < 0) throw new Error('no end marker for ' + name);
  const next = html.slice(0, a + open.length) + JSON.stringify(value) + html.slice(b);
  fs.writeFileSync(PAGE, next);
  return next.length;
}
