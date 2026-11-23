# CLAUDE.md — Hawaii Code AI-Thon Help

Project-specific guidance. Universal principles are in `~/.claude/CLAUDE.md`.

## What This Is

Workshop materials for a **beginner AI vibe-coding hackathon** for **middle & high school students, teachers, and Hawaii Department of Education (HIDOE) educators**. Participants build a working web app using Google Gemini, then share it via Google Sites, Google Classroom, or GitHub Pages.

**Live site:** `https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/`
**Repo:** `https://github.com/lpcode808/Hawaii-Code-AI-Thon-Help`

---

## File Map

| File | Purpose | Audience |
|------|---------|---------|
| `gemini-guide.html` | **Primary deliverable** — interactive guide with TOC, search, copy blocks, expandable steps, screenshot placeholders, and AI Workshop Coach prompt. Links to journey map at hero & footer. | Participants (self-paced or projected) |
| `guide-map.html` | **Journey map** — scrollable vertical roadmap with 4 phases, fork/fan SVG connectors, 13 clickable cards deep-linking into `gemini-guide.html`, and 3 help/reference cards. | Participants + Facilitators (for projection) |
| `promo-animation.html` | **60-second intro animation** — 8 beats on a 1920×1080 canvas, drawn by `renderAt(t)` from the time alone. Music + effects, fonts and QR embedded, so it runs offline. Built and checked by `promo/` (see `promo/README.md`). | Facilitators (projected at kickoff, hallway loop) |
| `prequel-animation.html` | **Part 1 film (persuade)** — 60 s for educators: the KS EdTech talk's 21A → 21 argument (writing the code used to be the work → the middle got cheap → what to make + testing are the job), the old way failing (errors pile up, the music stalls and dulls, both ends go gray, the screen cracks and shatters), a testing beat (tip splitter: no error, still wrong), "moves we already teach", permission, CTA. Same engine and player as `promo-animation.html`. | Educators deciding whether to come (students watching too) |
| `assets/video/code-aithon-60s.mp4`, `code-aithon-why-60s.mp4` | The two films rendered to H.264 1080p30 with sound (`promo/video.mjs`) | Facilitators |
| `index.html` | **Redirect only** — `<meta refresh>` to `gemini-guide.html`. Root URL goes straight to the guide. | — |
| `README.md` | Facilitator event guide — 5-phase agenda, setup checklist, teaching notes | Facilitators |
| `superprompt.md` | The core prompt to paste into Gemini before describing an app | Participants |
| `quick-start.md` | Step-by-step participant walkthrough (AI Studio Build + Chat fallback) | Participants |
| `understand-your-code.md` | 4 quick file moves + 3 follow-up prompts: big picture, code tour, tutor mode | Participants + Teachers |
| `deploy-guide.md` | One-click Gemini → Google Sites export, manual Google Sites embed, Classroom, and GitHub Pages | Participants |
| `SCREENSHOT-PLAN.md` | Capture brief & Observed UI Log for a browser-enabled agent to shoot late-2026 screenshots | Browser/QA Agent |
| `ANIMATION-BRIEF.md` | 60-second hype/explainer animation storyboard, palette, and technical contract | Animation Agent |
| `SOURCE-MAP.md` | Provenance of all workshop materials — what was synthesized from where | Internal reference |

---

## The Two Paths

Both are covered in `gemini-guide.html` via a tab switcher:

1. **Gemini Canvas** (`gemini.google.com` → `+` *Upload and tools* → `More tools` → `Canvas`) — live preview beside chat, easiest onramp, one-click `Export > Google Sites` (Oct 2026), sketch-to-app, and `Share > Share to Classroom` on Workspace for Education.
2. **Google AI Studio** (`aistudio.google.com/build`) — Build mode with live preview, code view, `Settings → Versions`, Download ZIP, and GitHub sync, plus a generous free tier when Canvas hits a limit. Chat mode still works as a fallback for single offline `index.html` files.

**Account guidance (School / HIDOE):** Recommend a **personal Google account** for fewest surprises. Workspace for Education / HIDOE accounts can now share Canvas creations to Google Classroom and export to Google Sites (where admin-enabled), but public Canvas share links and AI Studio may still be restricted. Never put real student PII in prompts.

**Model:** Default free **Gemini Flash** is sufficient — no upgrade needed.

---

## gemini-guide.html Architecture

Single-file HTML, no build step, GitHub Pages-ready.

**Features:**
- 3 switchable themes (`localStorage` key `codeaithon-theme`, zero-FOUC inline head loader):
  - **Studio** (default) — subtle dark slate-navy, Google accents (`#4285f4`, green, yellow, red, teal), `Sora` + `Source Serif 4` + `JetBrains Mono`
  - **Paper Press** (`data-theme="paper"`) — warm editorial light (cream/terracotta/fern), `Fraunces` + `Plus Jakarta Sans` + `IBM Plex Mono`
  - **Arcade Lab** (`data-theme="arcade"`) — high-contrast maker dark (obsidian/cyan/electric lime), `Bricolage Grotesque` + `Lexend` + `JetBrains Mono`
- TOC sidebar (auto-generated from `h2[id]`/`h3[id]`, expand/collapse, active tracking)
- Cmd+K search modal (searches `h2, h3, p, li, td, summary, pre`, opens parent `<details>` + correct tab on jump)
- Copy buttons on all `<pre>` blocks (injected via `attachCopyButtons()`)
- Expandable `<details>` sections (steps, prompts, troubleshooting, deploy)
- Tab switcher for Canvas vs AI Studio paths (`data-tab` attribute pattern)
- Screenshot placeholders (`figure.guide-shot.placeholder[data-shot]`) wired to `SCREENSHOT-PLAN.md` filenames
- Reading progress bar
- Keyboard shortcuts: `T` (TOC), `Cmd+K` (search), `Cmd+/` (shortcuts modal), `Esc` (close)
- Responsive: TOC hidden on ≤900px, path cards and mini-grids stack

**Fonts:** Sora (display) + Source Serif 4 (body) + JetBrains Mono (code) via Google Fonts

**Sections in order (by `h2[id]`):**
1. Hero — tagline, *"Make first, code later. You are the project manager — the AI is your developer."*
2. `#how-it-works` — 4-step plain-English overview
3. `#choose-your-path` — two-column path cards + HIDOE/personal account callout
4. `#the-super-prompt` — lesson plan / job description brief + upgraded single-file super prompt
5. `#step-by-step` — tabbed Gemini Canvas / AI Studio (Build + Chat) step-by-step with screenshot placeholders
6. `#app-ideas` — category table
7. `#iteration-tips` — Reroll vs. Translate, Two Moves Past Prompting (AI interviews you / Point, don't describe), Test with a real person, prompt templates
8. `#understand-your-code` — 4 quick file moves (Find it / Predict / Break it / Reflect), Gemini Notebook tip, and 3 full prompts
9. `#share-your-app` — 1-click Export to Google Sites, Share to Classroom, manual Sites embed, GitHub Pages, direct file
10. `#troubleshooting` — "If It Goes Sideways" 4-card quick rescue grid + 8 expandable fixes
11. `#ai-workshop-coach` — self-contained 5-phase coaching prompt for any AI chat
12. `#glossary` — 10 terms, 2-column card grid
13. Footer — "View as Journey Map →" link to `guide-map.html`

---

## guide-map.html Architecture

Single-file HTML, no build step, GitHub Pages-ready. Redesigned (commit `4b2478a`) as a **scrollable vertical roadmap** with animated dashed SVG fork/fan connectors.

**Layout (4 sequential phases + Help & Reference row):**
1. `01 — Orient`: Start Here → How It Works → Choose Your Path
2. `02 — Choose One Path`: Mantra + fork (`Gemini Canvas` OR `AI Studio`)
3. `03 — Build & Tweak`: The Super Prompt → Step-by-Step Guide → 3-card fan (`App Ideas` | `Iteration Tips` | `Understand Your Code`)
4. `04 — Ship It`: Share Your App
5. `Help & Reference`: Troubleshooting, AI Workshop Coach, Glossary

**Features:**
- Dark theme matching guide (Sora font, Google accent colors for card borders)
- Scroll progress bar, dismissible orientation banner, `prefers-reduced-motion` support
- Responsive: fork/fan rows stack cleanly on mobile with fallback vertical connectors

---

## Films Notes (promo-animation.html, prequel-animation.html)

- **Two parts.** Part 1 `prequel-animation.html` persuades educators; part 2 `promo-animation.html` walks signed-up people through the day. Each start screen links the other; part 1 ends on "Next: how the day works".
- **Part 1's source** is `lpcode808/KSEDTECH-26-present` `vibe/` (slides 21A/21, 22, 20, 05B, 04) and Justin's spoken version of 21A/21 in `mpi-vibe/practice-2026-07-20.md`. Read it; don't edit that repo from here.
- **Part 1's music** is two Stock Library cues, both in E major: "Tape Left Running" (lo-fi loop, 88 bpm) under the old way, then "Whiteboard Morning" (ukulele, 112 bpm) from the shatter at 19.79 s, its last chord at 56.3 s. Each entry in `FAILS` pops an error and makes the lo-fi stall and come back flatter and duller (`damage` in `MUSIC_PLAN`, done in `promo/score.mjs`); at 19.09 s it winds down like a tape (`tapeStop`), the screen cracks from the middle box in the silence, and the glass shatters into the new room. Justin's notes that got here: the suspense cue made the switch jarring; a record scratch is too cliché; the ends should go gray; break the fourth wall into the second half; no "baby steps" joke (he said the ukulele cue sounds like Bieber's "Baby"; leave the tune as it is).
- **Part 1's examples are everyday apps, not teacher tools, and use no student names** (Justin's call, 2026-11-23; a teacher-tools cut, "the teacher on behalf of the students", is tabled). The room turns from Paper Press cream to Studio navy at the snap, as the deck turns from cream to blue.
- **Shared code is copied, not linked** (each page is one offline file): helpers, shapes and the player in part 1 came from part 2. A player fix goes into both.
- **Audience (part 2):** people who have already signed up. It explains the process, not why to come.
- **Timeline:** scene cuts sit on the bar lines of the music (96 bpm, bar = 2.5 s, bar 1 at 0.04 s): Hook 0–7.5, Mindset –15, Frame –22.5, Generate –32.5, Test & steer –42.5, Ship –50, Ideas –55, CTA –60. That is up to 1.5 s off the brief's times, by choice.
- **Music** is "Further Up" from `Audio-in-the-Cloud/stock-library` written out at 60 s; its strings enter during Frame, its drum lift lands as the bug is fixed (35.04 s), and its last chord lands on the CTA (55.04 s). Effects come from the page's own `cues()` list. Rebuild with `node promo/score.mjs` after changing timings.
- **Embedded assets** live in one `<script>` at the bottom between `/* @asset name */ … /* @end */` markers. Edit the code above them; `promo/build.mjs` (fonts, QR) and `promo/score.mjs` (audio) rewrite the markers.
- **Checks:** `node promo/check.mjs [--film prequel] --sheet --player` (no console errors, no visible text under 28 px or off frame, player controls at three sizes). Every `promo/` script takes `--film intro|prequel` (default intro).

## Content Decisions

- **Lean & tactical** — no facilitator logistics, phase timing, or pedagogy rationale in `gemini-guide.html`. Those live in `README.md`.
- **All 3 understand-your-code prompts** are in `gemini-guide.html` as full copy blocks (don't trim them — the verbosity is the point).
- **AI Workshop Coach** (`#ai-workshop-coach`) embeds the full 5-phase flow + super prompt inline so it's self-contained when pasted into any AI chat. (Previously named "Chat Companion".)
- `pre` blocks use `white-space: pre-wrap` — intentional, wraps long prompt lines.
- **Vocab hints** (`.vocab` span + `data-term` attribute) — dotted teal underline, tooltip on hover/tap shows real developer term. `attachVocabTaps()` handles mobile tap-to-reveal. Currently on: HTML file, code, iterate, deploy, repository, commit, HTML/CSS/JS.
- **Glossary** at `#glossary` — 10 terms (HTML, CSS, JavaScript, Deploy, Repository, Commit, Code, Iterate, Prompt, localhost). Framed as "you've already been doing this — now you know the words."
- **No PII** — bit.ly/LP0603 removed from all files including SOURCE-MAP.md.

---

## What's Left / Ideas

- [ ] Add `?path=canvas` URL param to auto-select the Canvas tab on load (fork cards on journey map would use this)
- [ ] Move guide-to-map link higher in gemini-guide.html (TOC sidebar header or hero section) for better discoverability
- [ ] localStorage-based progress tracking on journey map (visited cards get checkmark/dim)
- [ ] "Open in Gemini" button that pre-fills the chat companion prompt (deep link via `https://gemini.google.com/?q=...`)
- [ ] Print/PDF stylesheet for handout version
- [ ] Facilitator cheat sheet one-pager (separate HTML)
- [ ] Colorblind support on journey map: add shape/icon indicators per card category (not just border color)
- [ ] Projector mode: `@media (min-width: 1800px)` font bump or phase-by-phase presentation view
- [ ] Translations / accessibility audit

---

## Git Notes

- No build process — edit HTML/MD directly, commit, push, GitHub Pages auto-deploys in ~2 min
- Hard refresh after deploy: `Cmd+Shift+R`
- `SOURCE-MAP.md` committed intentionally — it's educational context, no PII
