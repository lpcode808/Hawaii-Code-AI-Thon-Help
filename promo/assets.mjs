// Rewrites one embedded asset in promo-animation.html: the text between /* @asset name */ and /* @end */.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const HERE = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.resolve(HERE, '..');
export const PAGE = path.join(ROOT, 'promo-animation.html');
// the films: page, video file, and a short name for scratch files
export const FILMS = {
  intro: { page: path.join(ROOT, 'promo-animation.html'), video: 'code-aithon-60s.mp4' },
  prequel: { page: path.join(ROOT, 'prequel-animation.html'), video: 'code-aithon-why-60s.mp4' },
};
// --film intro|prequel on the command line (default intro)
export function film(argv = process.argv) { const i = argv.indexOf('--film'), name = i >= 0 ? argv[i + 1] : 'intro'; if (!FILMS[name]) throw new Error('no film ' + name + ' (there are ' + Object.keys(FILMS).join(', ') + ')'); return Object.assign({ name }, FILMS[name]); }
// the sibling repos this piece borrows from (override with AUDIO_REPO / ANIMATION_REPO)
export const AUDIO_REPO = process.env.AUDIO_REPO || path.resolve(ROOT, '..', 'Audio-in-the-Cloud');
export const ANIMATION_REPO = process.env.ANIMATION_REPO || path.resolve(ROOT, '..', 'Animation-in-the-Cloud');
// scratch space for frames and WAVs (git ignores promo/out/)
export const OUT = process.env.PROMO_OUT || path.join(HERE, 'out');

export function writeAsset(name, value, page = PAGE) {
  const html = fs.readFileSync(page, 'utf8');
  const open = `/* @asset ${name} */`, close = '/* @end */';
  const a = html.indexOf(open); if (a < 0) throw new Error('no asset marker for ' + name);
  const b = html.indexOf(close, a + open.length); if (b < 0) throw new Error('no end marker for ' + name);
  const next = html.slice(0, a + open.length) + JSON.stringify(value) + html.slice(b);
  fs.writeFileSync(page, next);
  return next.length;
}
