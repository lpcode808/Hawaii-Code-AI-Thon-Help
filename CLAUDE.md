# CLAUDE.md — Hawaii Code AI-Thon Help

Project-specific guidance. Universal principles are in `~/.claude/CLAUDE.md`.

## What This Is

Workshop materials for a **beginner AI vibe-coding hackathon** (teachers and K-12 educators in Hawaii). Participants build a single-file HTML app using Google Gemini, then deploy it to Google Sites or GitHub Pages.

**Live site:** `https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/`
**Repo:** `https://github.com/lpcode808/Hawaii-Code-AI-Thon-Help`

---

## File Map

| File | Purpose | Audience |
|------|---------|---------|
| `gemini-guide.html` | **Primary deliverable** — interactive guide with TOC, search, copy blocks, expandable steps, chat companion prompt. Links to journey map at footer. | Participants (self-paced or projected) |
| `guide-map.html` | **Journey map** — pannable/zoomable canvas with 13 clickable card nodes showing workshop flow. Fork visualization, phase labels, color-coded sections. Companion to the main guide. | Participants + Facilitators (for projection) |
| `index.html` | **Redirect only** — `<meta refresh>` to `gemini-guide.html`. Root URL goes straight to the guide. | — |
| `README.md` | Facilitator event guide — 5-phase agenda, setup checklist, teaching notes | Facilitators |
| `superprompt.md` | The core prompt to paste into Gemini before describing an app | Participants |
| `quick-start.md` | Step-by-step participant walkthrough for AI Studio path | Participants |
| `understand-your-code.md` | 3 follow-up prompts: big picture, code tour, tutor mode | Participants |
| `deploy-guide.md` | Google Sites (5 min) and GitHub Pages (15 min) deployment | Participants |
| `SOURCE-MAP.md` | Provenance of all materials — what was synthesized from where | Internal reference |

---

## The Two Paths

Both are covered in `gemini-guide.html` via a tab switcher:

1. **Gemini Canvas** (`gemini.google.com/canvas`) — live preview in chat, easiest onramp, lower daily limits
2. **AI Studio** (`aistudio.google.com`) — more free usage (~500 req/day Flash), see + save full code

**Critical:** Participants must use a **personal Google account**, not school/Workspace. Workspace for Education accounts cannot share Canvas creations.

**Model:** Gemini Flash (free default) is sufficient — no upgrade needed.

---

## gemini-guide.html Architecture

Single-file HTML, no build step, GitHub Pages-ready.

**Features:**
- Dark theme (Google accent colors: `--accent-blue: #4285f4`, green, yellow, red)
- TOC sidebar (auto-generated from `h2[id]`/`h3[id]`, expand/collapse, active tracking)
- Cmd+K search modal (searches `h2, h3, p, li, td, summary, pre`, opens parent `<details>` + correct tab on jump)
- Copy buttons on all `<pre>` blocks (injected via `attachCopyButtons()`)
- Expandable `<details>` sections (steps, prompts, troubleshooting, deploy)
- Tab switcher for Canvas vs AI Studio paths (`data-tab` attribute pattern)
- Reading progress bar
- Keyboard shortcuts: `T` (TOC), `Cmd+K` (search), `Cmd+/` (shortcuts modal), `Esc` (close)
- Responsive: TOC hidden on ≤900px, path cards stack

**Fonts:** Sora (display) + Source Serif 4 (body) + JetBrains Mono (code) via Google Fonts

**Sections in order (by `h2[id]`):**
1. Hero — tagline, "You are the project manager" mantra, badges
2. `#how-it-works` — 4-step plain-English overview (added for beginner orientation)
3. `#choose-your-path` — two-column path cards + opinionated "start with Canvas" rec
4. `#the-super-prompt` — giant copy block with "this is for the AI, not you" note
5. `#step-by-step` — tabbed Canvas / AI Studio step-by-step
6. `#app-ideas` — category table
7. `#iteration-tips` — expandable prompt templates
8. `#understand-your-code` — reframed as optional/curiosity; 3 prompts as expandable copy blocks
9. `#share-your-app` — renamed from "Deploy"; 3 options, expandable
10. `#troubleshooting` — 8 items including "completely stuck" nuclear option
11. `#ai-workshop-coach` — renamed from "Chat Companion"; full coaching prompt for any AI chat
12. `#glossary` — 10 terms, 2-column card grid
13. Footer — "View as Journey Map →" link to `guide-map.html`

---

## guide-map.html Architecture

Single-file HTML, no build step, GitHub Pages-ready. Pannable/zoomable canvas with clickable card nodes.

**Canvas:** 3000×2100px. Pan via pointer events, zoom via wheel/pinch. `will-change: transform` on canvas div.

**Initial view:** First-time visitors see the first row (Start Here → How It Works → Choose Your Path) at readable zoom. "Overview" button shows the full canvas. Mobile (<768px) zooms into first row. State saved to `sessionStorage`.

**Card layout (6 rows + support column):**
1. Start Here → How It Works → Choose Your Path (y=200)
2. Gemini Canvas | OR | AI Studio (y=470) — fork with "OR" divider
3. The Super Prompt (y=700) — convergence point
4. Step-by-Step Guide (y=960)
5. App Ideas | Iteration Tips | Understand Your Code (y=1210) — fan-out
6. Share Your App (y=1470) — convergence
- Support column (x=1900): Troubleshooting, AI Workshop Coach, Glossary

**Features:**
- Dark theme matching guide (Sora font, Google accent colors for card borders)
- Animated dashed SVG flow lines showing progression direction
- Horizontal phase labels above each row (01 ORIENT → 04 SHIP IT)
- Color-coded card types: blue (content), gold (AI/tool), green (action), teal (reference), coral (help)
- "Start Here" card has infinite pulsing glow animation
- Orientation banner for direct visitors ("Start the full guide →")
- Keyboard: arrow keys pan, +/- zoom, 0 = overview. Screen-reader-safe (arrows skip when link/button focused)
- Touch: `touch-action: none`, 10px drag threshold, multi-touch guard for pinch
- `prefers-reduced-motion` disables all animations
- "More below" pulsing indicator on mobile
- Welcome-back hint on sessionStorage restore

**Critical implementation note:** `setPointerCapture()` must NOT be called when pointerdown target is inside `a.node` — otherwise the browser won't synthesize a click event and card links silently fail. Guard with `if (!e.target.closest('a.node'))`.

---

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
