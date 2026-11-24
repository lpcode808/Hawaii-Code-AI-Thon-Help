// Embeds the fonts and the QR code into promo-animation.html.
//   node promo/build.mjs [--film intro|prequel]
// The QR code is drawn by Animation-in-the-Cloud's vendored qrcodegen.py (MIT, Project Nayuki).
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { HERE, ANIMATION_REPO, writeAsset, film } from './assets.mjs';
const F = film();

export const QR_URL = 'https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/';

const FONTS = {
  'sora-600': 'sora-latin-600-normal.woff2', 'sora-700': 'sora-latin-700-normal.woff2', 'sora-800': 'sora-latin-800-normal.woff2',
  'jakarta-500': 'plus-jakarta-sans-latin-500-normal.woff2', 'jakarta-600': 'plus-jakarta-sans-latin-600-normal.woff2',
  'jakarta-700': 'plus-jakarta-sans-latin-700-normal.woff2', 'jakarta-800': 'plus-jakarta-sans-latin-800-normal.woff2',
  'mono-500': 'jetbrains-mono-latin-500-normal.woff2', 'mono-600': 'jetbrains-mono-latin-600-normal.woff2', 'mono-700': 'jetbrains-mono-latin-700-normal.woff2',
};
const fonts = {};
for (const [k, f] of Object.entries(FONTS)) fonts[k] = fs.readFileSync(path.join(HERE, 'fonts', f)).toString('base64');
writeAsset('fonts', fonts, F.page);

const qrPy = path.join(ANIMATION_REPO, 'scripts');
const rows = execFileSync('python3', ['-I', '-c', `
import sys; sys.path.insert(0, sys.argv[1])
from qrcodegen import QrCode
q = QrCode.encode_text(sys.argv[2], QrCode.Ecc.MEDIUM)
n = q.get_size()
print("\\n".join("".join("1" if q.get_module(x, y) else "0" for x in range(n)) for y in range(n)))
`, qrPy, QR_URL], { encoding: 'utf8' }).trim().split('\n');
const size = writeAsset('qr', rows, F.page);
console.log(`${F.name}: fonts: ${Object.keys(fonts).length}, qr: ${rows.length}x${rows.length} for ${QR_URL}, page ${(size / 1024).toFixed(0)} KB`);
