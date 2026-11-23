# The 60-second intro: how it's built

`../promo-animation.html` is a 60-second intro to how the AI-Thon works, for people who have already signed up: frame a real problem, generate the app in Gemini Canvas, test and steer it one change at a time, share a real link. It follows the 8-beat storyboard in `../ANIMATION-BRIEF.md`. `../assets/video/code-aithon-60s.mp4` is the same piece as a video.

Everything on screen is drawn by `renderAt(t)` on a 1920×1080 canvas from the time alone, so the player can jump anywhere and the video can be shot frame by frame. The page is one file: the fonts, the QR code and the soundtrack are embedded at the bottom, so it plays from `file://` with no network.

## What it borrows

- **From Audio-in-the-Cloud:** the music. "Further Up", the inspirational build in its Stock Library (`stock-library/engine.js` on the shared instruments), written out at 60 s instead of 30. At 96 bpm that is 22 bars and a last chord on bar 23, at 55.04 s, which is where the closing card starts. The scene cuts were moved onto its bar lines (up to 1.5 s off the brief's times): the strings come in as the problem is typed, the drum lift lands on the bug fix, the choir enters on "What will you make?".
- **From Animation-in-the-Cloud:** the method in its `guide.md` (a pure `renderAt(t)`, contact sheets before rendering, a sheet from the final MP4, seek-and-shoot with Playwright, ffmpeg), and its vendored `scripts/qrcodegen.py` for the QR code.

## Build steps

Run from the repo root. The sibling repos are expected next to this one (`../Audio-in-the-Cloud`, `../Animation-in-the-Cloud`); set `AUDIO_REPO` or `ANIMATION_REPO` otherwise. Playwright's Chromium and ffmpeg are needed. Scratch files go to `promo/out/` (ignored by git).

```bash
node promo/build.mjs
```
Embeds the fonts (`promo/fonts/`, SIL OFL) and the QR code for the guide's URL.

```bash
node promo/score.mjs
```
Writes the music (about 45 s), synthesizes the sound effects from the page's `cues()` list, mixes them, and embeds a 128 kb/s MP3. `--reuse-music` skips writing the music again when only the effects changed. Run it after any timing change.

```bash
node promo/video.mjs
```
Shoots 1800 frames (about 45 s on four cores) and writes `assets/video/code-aithon-60s.mp4` with the soundtrack. Delete `promo/out/frames` first after a change, or old frames are reused.

```bash
node promo/check.mjs --sheet --player
```
Fails on console errors, on any visible word under 28 px at 1080p or running off the frame (swept every 0.05 s; words mid-transition are skipped), and on broken controls at 1280×720, 1920×1080 and 390×844. `--sheet` writes `promo/out/sheet.jpg`; `--sheet 12.5,30` picks the times.

## Player

Space play/pause, R replay, L loop, M sound, F full screen, ← → five seconds, 1–8 jump to a beat. `?loop=1` starts with loop on; `?loop=1&autoplay=1` starts playing at once, silent (browsers allow sound only after a click), for a hallway screen. `?t=30` opens on a time.

## Choices

- Written for people who already signed up, so the closing card says "Open the guide · pick an idea · build" and "Free · Use a personal Google account" instead of a sign-up pitch.
- "See it live in 60 seconds" became "See it live in about a minute".
- The theme change flashes Arcade Lab, then settles on Paper Press, so the shipped app is the light one on the dark stage.
- Menu arrows are drawn as `›`: the embedded font subsets have no `→`.

## Not checked

- **Nobody has listened to it.** The mix was set by measurement: -15.9 LUFS integrated, peaks rounded under -1.5 dBFS (about 30 ms of rounding, at the drum lift), each effect's peak near the music's level around it.
- **The QR code has not been scanned with a phone.** It is generated from `https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/` by a standard library, but scan it from the projector once before the event.
- Only tested in headless Chromium. Not opened on a Chromebook, an iPad, Safari or Firefox, and not timed on slow hardware (a 1920×1080 canvas at 60 fps).
- The Gemini window is a drawing of the late-2026 Canvas layout from the guide's text, not from a screenshot.
