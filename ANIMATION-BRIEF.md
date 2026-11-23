# 60-Second Animation Video Brief — Hawaii Code AI-Thon

> **If you are the animation agent, start here:**
> 1. Build a **60.0-second** `16:9` (`1920×1080`) **code-driven** animation telling the 8-beat story below for middle/high school students, teachers, and Hawaii DOE educators.
> 2. Primary deliverable: **`promo-animation.html`** at the root of `Hawaii-Code-AI-Thon-Help` (single self-contained HTML/CSS/Canvas/SVG file, works offline, includes Play/Pause/Replay + timeline scrubber + optional mute-safe kinetic typography). Optional secondary deliverable: `assets/video/code-aithon-60s.mp4` (H.264, 1080p) if you also render video.
> 3. Do **not** overwrite `gemini-guide.html` or `guide-map.html` unless asked — once `promo-animation.html` is verified, add a clean link in `README.md` / `CLAUDE.md` (or ask Justin before embedding in the hero).
>
> **Created:** 2026-11-23 · **Target repo:** `Hawaii-Code-AI-Thon-Help` (do not modify `KSEDTECH-26-present`)

---

## 1. Audience, Goal & Tone

- **Who's watching:** Middle & high school students, teachers, and Hawaii Department of Education (HIDOE) staff — many with **zero coding experience** — seeing this on a projector at event kickoff, in a hallway loop, or linked from the guide.
- **Core message:** *"Make first, code later. You can just make digital things."* You describe a real problem in plain English, Gemini builds a working web app in ~60 seconds, you test & steer it one small change at a time, and you publish a real link.
- **Tone:** Energetic, warm, grounded, zero tech-bro hype, zero intimidating jargon. Feels like a friendly creative studio — *not* a corporate AI commercial.
- **Works muted:** Must read cleanly with **no audio** (bold kinetic typography + clear UI motion) for projector/hallway loops, while also supporting an optional voiceover track.

---

## 2. Visual System & Palette (Synced with `gemini-guide.html` + `favicon.svg`)

Default to the guide's **Studio** palette (and optionally showcase a playful split-second theme flash to **Paper Press** `#f7f2e8`/`#c84b31` or **Arcade Lab** `#0b0e14`/`#a3e635` during Beat 05 *"Make it dark mode / change the look"*!):

| Token | Hex | Role |
|---|---|---|
| Background deep navy (`--bg-primary`) | `#1a1a2e` / `#16213e` | Canvas backdrop (subtle radial glow, never flat dead black) |
| Surface card (`--bg-card`) | `#2a2a44` | Floating UI mockups (chat box, Canvas preview, browser bar) |
| Deep code surface (`--bg-code`) | `#16162a` | Code snippets & terminal-free preview frames |
| Border hairline (`--border`) | `#3a3a54` | Clean card edges |
| Primary text (`--text-primary`) | `#ececec` / `#ffffff` | Headlines & kinetic words |
| Secondary text (`--text-secondary`) | `#b4b4c8` | Supporting labels & captions |
| Accent Blue (`--accent-blue`) | `#4285f4` | Primary action, Gemini prompt, active highlights |
| Accent Green (`--accent-green`) | `#34a853` | Working app, checks, published URL |
| Accent Yellow / Gold (`--accent-yellow`) | `#fbbc04` | Super-prompt spark, Rising Peak glow, "Aha" beats |
| Accent Red / Coral (`--accent-red`) | `#ea4335` | Bug / stuck state → quickly fixed |
| Accent Teal (`--accent-teal`) | `#5cb8b2` | Project manager mantra, code/vocab highlights |

- **Typography:** `Sora` (bold display headlines, tight tracking), `Source Serif 4` or `Plus Jakarta Sans` (subtitles), `JetBrains Mono` (code snippets, URLs, prompt text) — with clean system fallbacks so it stays sharp even 100% offline.
- **Signature motif:** The **Rising Peak** from `favicon.svg` (glowing gold/coral volcano peak + blue code chevron + green ocean wave) bookends the intro (`0:00`) and outro (`0:55`).

---

## 3. Technical Contract (Important!)

- **Format:** `16:9` (`1920×1080`, 60fps target), **exact 60.0 seconds** total duration, scales cleanly into any browser window (`aspect-ratio: 16/9`).
- **Code-driven animation only:** Explicitly build with HTML5 Canvas / SVG / CSS keyframes — do **not** attempt generative video pixels, so every word stays razor-sharp and editable.
- **Controls (for `promo-animation.html`):** Spacebar Play/Pause, `R` Replay, clickable/draggable 60s scrubber bar, and a `Loop` toggle for hallway/projector use (auto-hide controls during playback).
- **No tiny text:** Minimum on-screen label size `28px` equivalent at 1080p so the back row of a school gym or auditorium can read every beat.
- **Motion principles:** Snappy ease-out entrances (`cubic-bezier(0.22, 1, 0.36, 1)`), 1 focal element moving at a time, clean visual continuity (typed sentence → split-screen Canvas app → `Export > Google Sites` → phone + desktop URL).

---

## 4. 60-Second Beat-by-Beat Storyboard

| Time | Beat | On-Screen Text (Kinetic Type) | Visual / Motion Choreography | Optional VO (130 words total, ~130 wpm) |
|---|---|---|---|---|
| **0:00–0:06** | **01 · The Hook** | `You don't need to know how to code` → *(beat)* → `to build a real web app.` | Rising Peak logo pulses in, then parts into a clean dark stage. A blinking cursor types and dissolves into a glowing app window. | *"You don't need to know how to code to build a real web app."* |
| **0:06–0:13** | **02 · The Mindset** | **Make first. Code later.**<br>`You = Project Manager` · `AI = Developer` | Two-column split graphic: left icon (person sketching an idea) labeled *You describe, test, steer*; right icon (spark/Gemini) labeled *AI writes the code*. | *"Make first, code later. You're the project manager — Gemini is your developer."* |
| **0:13–0:21** | **03 · Step 1: Frame It** | `1. Start with a real problem`<br>*"I need a way to track people I meet so I remember to follow up."* | Prompt card slides in. Highlighted fill-in-the-blank sentence fills dynamically; 3 compact feature pills pop in (`Name + Note`, `Timestamp`, `Copy All`). | *"Start with one real problem from your school or day, and three simple features."* |
| **0:21–0:31** | **04 · Step 2: Generate** | `2. Paste the Super Prompt` → `See it live in 60 seconds` | Stylized **Gemini Canvas** split screen animates in: left pane pastes the gold Super Prompt + idea, a quick "Thinking…" shimmer runs, and the right pane **renders a live Contact Tracker app** with real buttons & sample cards. | *"Paste the super prompt into Gemini Canvas or AI Studio, describe your idea, and watch a working app appear in under a minute."* |
| **0:31–0:41** | **05 · Step 3: Test & Steer** | `3. Small steps, small fixes`<br>`One change at a time` | Cursor clicks a button in the mock app → tiny coral alert (`Button stuck!`) → user types one short sentence in chat (*"Fix the Add button"*) → app flashes green and works! Second quick beat: *"Switch the theme"* → UI smoothly shifts from Studio → Paper Press / Arcade Lab. | *"Test every button. When something's off, ask for one small fix at a time — or tweak a color yourself."* |
| **0:41–0:49** | **06 · Step 4: Ship It** | `4. Share a real link`<br>`Export → Google Sites` · `Classroom` · `GitHub Pages` | App window lifts out of Canvas; an `Export > Google Sites` click pops open a clean browser bar (`sites.google.com/view/my-app`) AND a phone frame side-by-side showing the working app on mobile. | *"When it works, export straight to Google Sites, share to Classroom, or publish on GitHub Pages — a real URL anyone can open."* |
| **0:49–0:55** | **07 · What Will You Make?** | `Tip splitter` · `Flashcards` · `Name picker` · `Habit tracker` · `Study timer` | Rapid-fire Bento mosaic of 5 colorful mini-app cards snapping into place around the screen — middle/high school & classroom flavor. | *"Flashcards, a name picker, a habit tracker, a study timer — you can just make digital things."* |
| **0:55–1:00** | **08 · Call to Action** | **Hawaii Code AI-Thon**<br>`Free · $0 · Personal Google Account`<br>`lpcode808.github.io/Hawaii-Code-AI-Thon-Help` | Rising Peak mark locks up above the title, subtle teal glow, URL pill + clean QR code placeholder box on the right. Hold steady for 2.5s for easy reading. | *"Open the guide, pick an idea, and build your first app today."* |

---

## 5. Definition of Done & Self-Test Checklist

- [ ] Exact `60.0s` runtime with smooth 60fps pacing (no rushed walls of text, no awkward dead air).
- [ ] Readable muted on a projector from 30 feet away (`>= 28px` at 1080p).
- [ ] Matches the `gemini-guide.html` Studio palette (`#1a1a2e` / `#4285f4` / `#34a853` / `#fbbc04` / `#5cb8b2`) and `favicon.svg` Rising Peak motif.
- [ ] Shows **late-2026 UI concepts** (Gemini Canvas split view, `Export > Google Sites`, mobile preview) — no floppy-disk icons or terminal/CLI windows.
- [ ] Tested in a browser at `1920×1080` and `1280×720`: zero console errors, zero clipped text, Play/Pause/Replay/Loop controls work cleanly.
- [ ] Works completely offline (single-file `promo-animation.html` with system font fallbacks if Google Fonts aren't reachable).
