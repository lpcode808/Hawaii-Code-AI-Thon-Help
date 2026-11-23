# Hawaii Code AI-Thon Help

**Build your first web app with AI — no coding experience needed.**

> **→ [Open the Interactive Guide](https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/gemini-guide.html)**
> **▶ Two one-minute films:** [Part 1: why make things](https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/prequel-animation.html) (for educators deciding whether to come) · [Part 2: how it works](https://lpcode808.github.io/Hawaii-Code-AI-Thon-Help/promo-animation.html) (for people who signed up). Videos: [`code-aithon-why-60s.mp4`](assets/video/code-aithon-why-60s.mp4), [`code-aithon-60s.mp4`](assets/video/code-aithon-60s.mp4)

---

**Audience**: Middle & high school students, teachers, and Hawaii DOE (HIDOE) educators — zero coding background needed
**Tool**: Google Gemini (free, no API key, no install)
**Output**: A working web app, shared via Google Sites, Google Classroom, or GitHub Pages
**When**: Coming February 2027, a week-long build around a theme (not final yet). The agenda below is written as a half-day session.

---

## Core Philosophy

> "Make first, code later."

Participants are **project managers**. The AI is the developer. Their job is to describe what they want, test the result, and direct changes — not learn HTML first.

The process: **Research → Generate → Tweak → Deploy**

---

## Files

| File | For | Purpose |
|------|-----|---------|
| **`gemini-guide.html`** | Participants | Interactive guide: Canvas + AI Studio Build paths, super prompt, app ideas, iteration tips, deploy, troubleshooting, AI Workshop Coach |
| `guide-map.html` | Participants + Facilitators | Scrollable 4-phase visual journey map |
| `prequel-animation.html` | Educators deciding whether to come | One-minute film, part 1: writing the code used to be the work; now the middle is cheap, and knowing what to make and whether it works (testing) is the job. From the KS EdTech 2026 vibe talk |
| `promo-animation.html` | Facilitators (projected) | One-minute film, part 2: how it works. Frame it, generate, test & steer, ship. Works offline; `Space` play/pause, `R` replay, `L` loop, `F` full screen |
| `assets/video/code-aithon-why-60s.mp4`, `code-aithon-60s.mp4` | Facilitators | The two films as 1080p videos, for Slides, Sites, email or Classroom |
| `promo/` | Maintainers | Build scripts for both films (soundtrack, video, checks); see `promo/README.md` |
| `README.md` | Facilitators | This file — event overview, agenda, facilitation notes |
| `superprompt.md` | Participants | The prompt to paste into Gemini before describing an app |
| `quick-start.md` | Participants | Step-by-step walkthrough with Google Doc template |
| `understand-your-code.md` | Participants + Teachers | 4 quick file moves + 3 follow-up prompts to understand generated code |
| `deploy-guide.md` | Participants | Share via 1-click Export to Google Sites, Classroom, or GitHub Pages |
| `SCREENSHOT-PLAN.md` | Browser Agent | Shot list & UI verification checklist for late-2026 screenshots |
| `ANIMATION-BRIEF.md` | Animation Agent | 60-second hype/explainer animation storyboard & visual spec |
| `SOURCE-MAP.md` | Reference | Provenance of all workshop materials |

**Primary participant resource: `gemini-guide.html`** — everything they need in one searchable, interactive page.

---

## Event Agenda

| Phase | What | Who leads | Time |
|-------|------|-----------|------|
| **0. Setup** | Open Google Doc, set up tracking | Facilitator | 10 min |
| **1. Research** | Frame the problem — what will you build? | Facilitator, then pairs | 20 min |
| **2. Generate** | Paste super prompt, describe app, get code | Individual | 20 min |
| **3. Tweak** | Test, iterate one small change at a time, understand | Individual | 60 min |
| **4. Deploy** | Export to Google Sites, Classroom, or GitHub Pages | Individual | 20 min |
| **5. Share** | Demo your app to the group | Whole group | 30 min |
| **Buffer** | Help desk, Q&A, overflow | Facilitator | 30 min |

---

## Facilitator Setup

### Accounts Participants Need
- **Google account** — a **personal** Gmail gives the fewest surprises. School / Hawaii DOE (Workspace for Education) accounts can now share Canvas creations to Google Classroom and export to Google Sites (where admin-enabled), but public Canvas links and AI Studio may still be restricted. Remind participants never to enter real student names or private data.
- **GitHub account** — optional, only needed for GitHub Pages deployment

### Before the Event

**1. Create a shared Google Drive folder**
   - Name it `[Event Name] — [Date]`
   - Share with "Anyone with the link can edit"
   - Participants create their tracking Google Docs inside it

**2. Share the guide**
   - Best: share the link to `gemini-guide.html` (works on any device with a browser)
   - Backup: copy `superprompt.md` text into a shared Google Doc

**3. Test the flow yourself**
   - Build the conference contact tracker example from `superprompt.md`
   - Confirm it works in your browser and on a phone
   - Takes 10–15 minutes

**4. Have a backup app idea ready**
   - Suggest if someone is stuck: "Make a simple contact tracker — name, note, timestamp, copy to clipboard"

### Day-Of Checklist
- [ ] WiFi accessible at both `aistudio.google.com` and `gemini.google.com` (plus `vscode.dev` and `lpcode808.github.io/HTML-previewer`)
- [ ] Shared Drive folder link visible to participants (on screen or QR code)
- [ ] Super prompt ready to paste (in `gemini-guide.html` or a shared Doc)
- [ ] You've confirmed Gemini works on venue WiFi
- [ ] Intro queued for kickoff: `promo-animation.html`, press `F` for full screen (for a silent hallway loop, open it with `?loop=1&autoplay=1`)

### Backup / Contingency Plan

**If Gemini is down or WiFi is unavailable:**
- Have the super prompt pre-loaded in a shared Google Doc so participants can copy it without opening the guide
- If Canvas hits a usage limit, switch participants to **Google AI Studio Build mode** (`aistudio.google.com/build`)
- As a last resort: use **ChatGPT (`chatgpt.com`)** or **Claude (`claude.ai`)** — the super prompt works in any AI chat, just paste it the same way

**If school/HIDOE accounts restrict sharing:**
- Try **Export → Google Sites** or **Share → Share to Classroom** inside Gemini Canvas first
- Otherwise copy the code from the **Code** tab, test in `lpcode808.github.io/HTML-previewer`, and deploy via GitHub Pages or email `index.html` directly

---

## Phase 1: Research (20 min)

Goal: every participant leaves with a specific, scoped app idea written down.

### Opening (5 min)

Ask: *"Before we touch the AI — what's something you do manually that a simple tool could help with? Think about your day as a teacher, a person."*

Prompt questions:
- What do you calculate, track, or look up repeatedly?
- What would help your students or your workflow?
- What would you actually use?

### App Categories

| Category | Ideas |
|----------|-------|
| **Calculate** | Tip splitter, grade calculator, unit converter, loan estimator |
| **Track** | Habit streak, water intake, meeting notes, contact log |
| **Organize** | To-do list, packing checklist, student roster |
| **Time** | Pomodoro timer, countdown to event, stopwatch |
| **Classroom** | Random name picker, exit ticket form, quiz flashcards |
| **Fun** | Decision spinner, compliment generator, trivia game |

### Scope Check (5 min)

Each participant writes:
1. **"I need a way to ___ so that ___."**
2. **3 core features max** for v1

Common fixes:
- "A social media platform" → "A mood log that saves 5 words per day"
- "A full school system" → "A random name picker for my class"
- "An AI chatbot" → "A flashcard quiz with 10 fixed questions"

---

## Phase 2: Generate (20 min)

Point participants to the **Step-by-Step Guide** in `gemini-guide.html` — it covers both the Gemini Canvas and AI Studio paths.

Facilitation notes:
- **Walk through the first 2 minutes together** — show the interface on screen, paste the prompt live
- **Demo the contact tracker** as a group example first, then participants do their own
- **It's fine if the first result isn't perfect** — that's what Phase 3 is for

---

## Phase 3: Tweak (60 min)

The core learning loop. Participants:
1. Test the app (Canvas preview, or save as `index.html` and open in browser)
2. Find what's wrong or missing
3. Ask Gemini for one specific improvement
4. Repeat

### Teaching the Iteration Loop

Ask: *"What's one thing that doesn't work the way you wanted?"*

That frustration → write it as a specific prompt → send → test → repeat.

Key rules to share:
- **One change at a time** — not ten things at once
- **Be specific** — "The Add button doesn't respond when clicked" not "fix the button"
- **Paste your full code** when using AI Studio (Gemini forgets the previous version)

### Understanding the Code

`understand-your-code.md` has 3 follow-up prompts (also in `gemini-guide.html`):
1. **"What Did I Build?"** — plain-English overview, no code knowledge needed
2. **"Walk Me Through the Code"** — guided tour with 5 safe experiments to try
3. **"Help Me Fix or Change This"** — patient tutor that explains, not just fixes

**For teachers:** Prompt 2's "safe experiments" work well as a group activity — everyone changes one color and one number, then shares what happened.

### Saving the File (AI Studio path — biggest friction point)

Walk through this live before participants try on their own:
- **Mac TextEdit**: Format → Make Plain Text FIRST, or the file gets corrupted
- **Windows Notepad**: Save As → "All Files (*.*)" — not "Text Document"
- **VS Code**: Paste and Cmd/Ctrl+S — easiest option

---

## Phase 4: Deploy (20 min)

Two options (detailed steps in `deploy-guide.md` and `gemini-guide.html`):

**Option A — Google Sites** (recommended for most)
- No new accounts needed, done in 5 minutes
- Insert → Embed → paste HTML → Publish
- URL: `sites.google.com/view/your-site-name`

**Option B — GitHub Pages** (more robust)
- Requires a free GitHub account (~5 min to create)
- Upload `index.html`, enable Pages in Settings
- URL: `username.github.io/repo-name`

---

## Phase 5: Share (30 min)

Each person does a 2-minute demo:
1. What problem did you solve?
2. Show the app working
3. What would you add with another hour?

Facilitator notes:
- Celebrate working-but-imperfect apps — this is v1
- Note the range of problems people chose to solve
- Ask: "What surprised you about working with AI this way?"
