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
| `gemini-guide.html` | **Primary deliverable** — interactive guide with TOC, search, copy blocks, expandable steps, chat companion prompt | Participants (self-paced or projected) |
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

- [ ] Add `?path=canvas` URL param to auto-select the Canvas tab on load (useful for sharing path-specific links)
- [ ] "Open in Gemini" button that pre-fills the chat companion prompt (deep link via `https://gemini.google.com/?q=...`)
- [ ] Print/PDF stylesheet for handout version
- [ ] Facilitator cheat sheet one-pager (separate HTML)
- [ ] Translations / accessibility audit

---

## Git Notes

- No build process — edit HTML/MD directly, commit, push, GitHub Pages auto-deploys in ~2 min
- Hard refresh after deploy: `Cmd+Shift+R`
- `SOURCE-MAP.md` committed intentionally — it's educational context, no PII
