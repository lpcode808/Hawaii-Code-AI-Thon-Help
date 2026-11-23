# The two 60-second films: how they're built

- **Part 1, `../prequel-animation.html`: why make things.** For educators deciding whether to come (students will be watching too). It is the argument of the KS EdTech 2026 vibe talk (`lpcode808/KSEDTECH-26-present`, `vibe/` slides 21A and 21, in Justin's words from `mpi-vibe/practice-2026-07-20.md`): writing the code used to be the work, and both ends got rushed; now the middle is cheap, and knowing what to make, and whether it works, is the whole job. Testing gets the longest beat: someone tries a tip splitter, $50 for 3 says $16.666666666666668, every button works and there is no error, and it is still wrong. Then "these are moves we already teach", "your students watch the way you work", no CS degree, no budget line, no IT ticket, and the call to action. The ideas are everyday apps, not classroom tools, and there are no student names. Video: `../assets/video/code-aithon-why-60s.mp4`.
- **Part 2, `../promo-animation.html`: how the day works.** For people who have signed up: frame a real problem, generate the app in Gemini Canvas, test and steer it one change at a time, share a real link. It follows the 8-beat storyboard in `../ANIMATION-BRIEF.md`. Video: `../assets/video/code-aithon-60s.mp4`.

Everything on screen is drawn by `renderAt(t)` on a 1920×1080 canvas from the time alone, so the player can jump anywhere and the video can be shot frame by frame. Each page is one file: the fonts, the QR code and the soundtrack are embedded at the bottom, so it plays from `file://` with no network. The helpers, shapes and player are copied between the two pages, so a fix to the player goes into both.

## What it borrows

- **From Audio-in-the-Cloud:** the music, chosen per page in its `MUSIC_PLAN`. Part 1: "Tape Left Running", the lo-fi loop (late-night keys, vinyl crackle) moved to E major at 88 bpm, under the old way. It fails along with the work: every error in the page's `FAILS` table makes it stall (the level dips, the pitch sags) and come back a little flatter and duller (`damage` in the plan), so by the end it is sour and muffled. At 19.09 s it winds down like a tape (`tapeStop`) while the old way slows to a stop on screen; in the silence the screen cracks from the middle box, and at 19.79 s the glass shatters and falls away into the new room, where "Whiteboard Morning" (the ukulele cue, moved from C to E major) starts, its band entering on "What are we making?" and its last chord on "Next: how the day works". Both halves are in one key, so the switch is a lift, not a change of song. (A first cut used the suspense loop and was too jarring.) Part 2: "Further Up", the inspirational build in its Stock Library (`stock-library/engine.js` on the shared instruments), written out at 60 s instead of 30. At 96 bpm that is 22 bars and a last chord on bar 23, at 55.04 s, which is where the closing card starts. The scene cuts were moved onto its bar lines (up to 1.5 s off the brief's times): the strings come in as the problem is typed, the drum lift lands on the bug fix, the choir enters on "What will you make?".
- **From Animation-in-the-Cloud:** the method in its `guide.md` (a pure `renderAt(t)`, contact sheets before rendering, a sheet from the final MP4, seek-and-shoot with Playwright, ffmpeg), and its vendored `scripts/qrcodegen.py` for the QR code.

## Build steps

Run from the repo root. Every script takes `--film intro|prequel` (default `intro`); scratch files go to `promo/out/<film>/`. The sibling repos are expected next to this one (`../Audio-in-the-Cloud`, `../Animation-in-the-Cloud`); set `AUDIO_REPO` or `ANIMATION_REPO` otherwise. Playwright's Chromium and ffmpeg are needed. Scratch files go to `promo/out/` (ignored by git).

```bash
node promo/build.mjs
```
Embeds the fonts (`promo/fonts/`, SIL OFL) and the QR code for the guide's URL.

```bash
node promo/score.mjs
```
Writes the music (about 45 s for part 2, 30 s for part 1), synthesizes the sound effects from the page's `cues()` list, mixes them, and embeds a 128 kb/s MP3. `--reuse-music` skips writing the music again when only the effects changed. Run it after any timing change.

```bash
node promo/video.mjs
```
Shoots 1800 frames (about 45 s on four cores) and writes the film's MP4 in `assets/video/` with the soundtrack. Delete `promo/out/<film>/frames` first after a change, or old frames are reused.

```bash
node promo/check.mjs --sheet --player
```
Fails on console errors, on any visible word under 28 px at 1080p or running off the frame (swept every 0.05 s; words mid-transition are skipped), and on broken controls at 1280×720, 1920×1080 and 390×844. `--sheet` writes `promo/out/<film>/sheet.jpg`; `--sheet 12.5,30` picks the times.

## Player

Space play/pause, R replay, L loop, M sound, F full screen, ← → five seconds, 1–8 jump to a beat. `?loop=1` starts with loop on; `?loop=1&autoplay=1` starts playing at once, silent (browsers allow sound only after a click), for a hallway screen. `?t=30` opens on a time.

## Choices

Part 1:
- The "before" is staged in the guide's Paper Press cream and the "after" in Studio navy, the way the deck turns from cream to blue between 21A and 21. The new room opens out of the AI box after the snap, and the Rising Peak only exists in the new room.
- The code typed in the "before" is the tip splitter from the first sticky note, and it really does print `'$' + bill / people` with no rounding: the bug the test finds later. The number on the phone is what JavaScript prints for 50 / 3.
- Both ends of the diagram fade to gray while the middle box takes over; the color comes back in the new room.
- The crack and shatter break the fourth wall: the film breaks its own screen. The pieces carry a still of the old room, painted once (`frozen()`), and the cells come from a seeded web of radial cracks and rings (`glass()`).
- "Half a day · Free · No coding experience needed" is from the README (half-day event) and the brief (free); no date or place is given, since none is set here.

Part 2:
- Written for people who already signed up, so the closing card says "Open the guide · pick an idea · build" and "Free · Use a personal Google account" instead of a sign-up pitch.
- "See it live in 60 seconds" became "See it live in about a minute".
- The theme change flashes Arcade Lab, then settles on Paper Press, so the shipped app is the light one on the dark stage.
- Menu arrows are drawn as `›`: the embedded font subsets have no `→`.

## Not checked

- **Nobody has listened to either film.** The mixes were set by measurement: about -16 LUFS integrated, peaks rounded under -1.5 dBFS (20 to 30 ms of rounding), each effect's peak near the music's level around it. In part 1, the stalls (are they clearly failures, and not glitches in the file?), the tape stop, the crack in the silence and the shatter into the ukulele are the moments most worth a listen.
- **The QR code has not been scanned with a phone.** It is generated from `https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/` by a standard library, but scan it from the projector once before the event.
- Only tested in headless Chromium. Not opened on a Chromebook, an iPad, Safari or Firefox, and not timed on slow hardware (a 1920×1080 canvas at 60 fps).
- The Gemini window is a drawing of the late-2026 Canvas layout from the guide's text, not from a screenshot.
