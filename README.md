# Local Hackathon: Build Your First Web App with AI

**Audience**: Students and teachers with zero coding background
**Tool**: Google Gemini via AI Studio (free, no API key)
**Output**: A working single-file web app, shared via Google Sites or GitHub Pages
**Time**: Half-day event (~3.5 hours)
**Origin**: Based on "Vibe Coding in the Classroom" presented at KS EdTech (June 2025) — [bit.ly/LP0603](https://bit.ly/LP0603)

---

## Core Philosophy

> "Build first, understand later."

Participants don't need to learn HTML, CSS, or JavaScript first. They are **project managers**. The AI is the developer. Their job is to describe what they want, test the result, and direct changes.

The process: **Research → Generate → Tweak → Deploy**

---

## Event Agenda

| Phase | What | Who leads | Time | Handout |
|-------|------|-----------|------|---------|
| **0. Setup** | Open Google Doc, set up tracking | Facilitator guides | 10 min | `quick-start.md` (Step 0) |
| **1. Research** | Frame the problem — what will you build? | Facilitator, then pairs | 20 min | `README.md` (Step 1 section) |
| **2. Generate** | Paste super prompt, describe app, get code | Individual | 20 min | `superprompt.md` |
| **3. Tweak** | Save as HTML, open in browser, iterate, understand | Individual | 60 min | `quick-start.md` + `understand-your-code.md` |
| **4. Deploy** | Put on Google Sites or GitHub Pages | Individual | 20 min | `deploy-guide.md` |
| **5. Share** | Demo your app to the group | Whole group | 30 min | — |
| **Buffer** | Help desk, Q&A, overflow | Facilitator | 30 min | — |

---

## Facilitator Setup (Do This Before the Event)

### Accounts Participants Need
- **Google account** (personal, not school/work — fewer restrictions for AI Studio)
- **GitHub account** (optional, only if doing GitHub Pages deployment)

### What to Prepare

**1. Create a shared Google Drive folder**
   - Name it `[Event Name] Hackathon — [Date]`
   - Share it with "Anyone with the link can edit"
   - Put the event link in this folder and display it on screen
   - Participants will create their Google Docs inside this folder

**2. Share the hackathon materials**
   - Create a Google Doc with links to:
     - The super prompt (`superprompt.md` text, or paste directly into the Doc)
     - `quick-start.md` (copy into a Google Doc or share as PDF)
     - `deploy-guide.md` (copy into a Google Doc or share as PDF)
   - OR: share this entire folder and let participants navigate it

**3. Test the flow yourself first**
   - Go through `quick-start.md` from scratch
   - Build the conference contact tracker example (it's in `superprompt.md`)
   - Confirm it works in your browser
   - Takes 10–15 minutes

**4. Have a backup app idea ready**
   - If someone's stuck, suggest: "Make a simple contact tracker — name, note, timestamp, copy to clipboard"
   - This is the demo from the original KSEdTech presentation and is proven to work

### Day-Of Checklist
- [ ] WiFi works and blocks neither aistudio.google.com nor github.com
- [ ] Shared Google Drive folder is created and link is visible to participants
- [ ] You have the super prompt ready to paste (on screen or in a shared Doc)
- [ ] You've confirmed AI Studio works on the venue WiFi
- [ ] Display/screen shows the event folder link or QR code

---

## Step 1: Research — Frame the Problem (20 min, Facilitator-Led)

The goal: every participant leaves this section with a specific, scoped app idea written in their Google Doc.

### Opening Exercise (5 min)

Say: *"Before we touch the AI, let's think about what we want to build. The best apps solve a real problem someone actually has. Think about your daily life — as a teacher, a student, a person."*

Prompt questions:
- What do you do manually that a simple tool could automate?
- What do you wish you could calculate, track, or organize?
- What would help your students, your classroom, or your workflow?

### App Categories to Spark Ideas

| Category | Ideas |
|----------|-------|
| **Calculate** | Tip splitter, unit converter, grade calculator, loan estimator |
| **Track** | Habit streak, water intake, meeting notes, contact log |
| **Organize** | To-do list, packing checklist, student roster, schedule |
| **Time** | Pomodoro timer, countdown to event, stopwatch |
| **Classroom** | Random name picker, exit ticket form, quiz flashcards |
| **Fun** | Decision spinner, compliment generator, trivia game |

### Scope Check (5 min)

Have each participant write in their Google Doc:
1. **"I need a way to ___ so that ___."** (plain English problem statement)
2. **3 core features** — no more than 3 for v1

Circulate and help anyone whose idea is too vague or too big. Common fixes:
- "A social media platform" → "A simple mood log that saves 5 words per day"
- "A full school management system" → "A random name picker for my class roster"
- "An AI chatbot" → "A flashcard quiz app with 10 fixed questions"

### PRD Shortcut (optional, if participants want structure)

If anyone is unsure of their scope, have them describe their idea to Gemini and ask:
> "Write a Product Requirements Document (PRD) for this app that could be given to a developer to build in a single HTML file. Keep it to 3–5 bullet points."

The PRD output helps them write a better prompt in Phase 2.

---

## Step 2: Generate (20 min)

Direct participants to `superprompt.md` for exact steps. Key facilitation notes:

- **Walk through the first 2 minutes together** — show the AI Studio interface on screen, paste the prompt live
- **Model the conference contact tracker** as a group first, then let participants do their own
- **Remind about the save button** in AI Studio (looks like a floppy disk) — it doesn't auto-save
- **It's okay if the first result isn't perfect** — that's Phase 3

---

## Step 3: Tweak (60 min)

This is the core learning loop. Participants will:
1. Save the code as `index.html`
2. Open it in their browser
3. Use the follow-up prompts from `understand-your-code.md` to learn what they built
4. Find what's wrong or missing
5. Go back to Gemini and ask for specific improvements
6. Repeat

### Understanding the Code (teachers and students together)

`understand-your-code.md` has 3 follow-up prompts participants paste into Gemini:
1. **"What Did I Build?"** — a visual overview, no code knowledge needed
2. **"Walk Me Through the Code"** — guided tour with 5 safe experiments to try
3. **"Help Me Fix or Change This"** — a patient tutor that explains, not just fixes

**For teachers**: Use Prompt 2 on a student's code to learn alongside them. The safe experiments ("change this color," "change this number") work great as a group activity.

### Saving the File (biggest friction point)

Walk through this live before letting participants try on their own. Common issues:
- **Mac TextEdit**: Must do Format > Make Plain Text FIRST, or the file gets corrupted
- **Windows Notepad**: Must choose "All Files" in the Save dialog, not "Text Document"
- **VS Code**: Easiest — just paste and Ctrl+S. Recommend installing VS Code before the event.

### Teaching the Iteration Loop

After the first test, ask participants: *"What's one thing that doesn't work the way you wanted?"*

That frustration → write it as a prompt → send it → update the file → test again.

Key prompting rules to share:
- **One change at a time** — don't ask for 10 things at once
- **Paste your current code** when asking for changes — Gemini forgets the previous version
- **Be specific** — "make it bigger and red" not "make it look better"

---

## Step 4: Deploy (20 min)

Direct participants to `deploy-guide.md`. Two paths:

**Option A — Google Sites** (recommended for most participants)
- No new accounts needed
- Embedded HTML works for most apps
- URL: `sites.google.com/view/your-site-name`
- Done in 5 minutes

**Option B — GitHub Pages** (for participants who want a more robust URL)
- Requires a GitHub account (5 minutes to create)
- Works with all app features
- URL: `username.github.io/repo-name`
- Done in 10–15 minutes

After deploying, participants paste their URL into their Google Doc.

---

## Step 5: Show and Tell (30 min)

Each participant (or pair) does a 2-minute demo:
1. What problem did you solve?
2. Show the app working
3. What would you add if you had another hour?

Facilitator notes:
- Celebrate working-but-imperfect apps — this is v1, not a finished product
- Note the variety of problems people chose to solve
- Discuss: "What surprised you about working with AI this way?"

---

## Files in This Folder

| File | For | Purpose |
|------|-----|---------|
| `README.md` | Facilitators | This file — event overview, agenda, facilitation guide |
| `superprompt.md` | Participants | The prompt to paste into Google AI Studio |
| `quick-start.md` | Participants | Step-by-step handout with Google Doc template |
| `understand-your-code.md` | Participants + Teachers | 3 follow-up prompts to understand generated code |
| `deploy-guide.md` | Participants | How to share via Google Sites or GitHub Pages |
| `SOURCE-MAP.md` | Facilitators | Source materials from the portfolio this was built from |
