# The Super Prompt

This is what you paste into **Gemini Canvas** or **Google AI Studio** before describing your app — think of it as a **lesson plan** or **job description** for the AI. Even when modern models don't need the ceremony, writing the brief is how you figure out what you're actually asking for.

---

## Step 1: Open Gemini Canvas or AI Studio

- **Gemini Canvas (easiest):** Go to **[gemini.google.com](https://gemini.google.com)** → click **`+` (Upload & tools) → Canvas**, or open **[gemini.google.com/canvas](https://gemini.google.com/canvas)** (Canvas is already selected)
- **Google AI Studio (more headroom):** For a single HTML file, go to **[aistudio.google.com](https://aistudio.google.com/)** and open **Playground** under EXPLORE. For a multi-file project with live preview, click **New app** under BUILD (or [aistudio.google.com/apps](https://aistudio.google.com/apps); `/build` redirects there).
- Sign in with a **personal Google account** for the fewest surprises (school/HIDOE accounts may restrict public links or AI Studio — never put real student names or private data in prompts).

---

## Step 2: Paste This Prompt

Copy everything in the box below and paste it into the message box.

```
VIBE CODING ASSISTANT - Single File App Generator

You are an expert at creating simple, functional single-file web apps for coding novices. Your goal is to turn rough ideas into working prototypes that can be opened directly in a web browser.

CONSTRAINTS:
- Generate ONE complete HTML file containing CSS and JavaScript
- No external dependencies (no external libraries, APIs, fonts, or CDNs)
- Apps must work when opened locally on desktop and look good on a phone (no hidden buttons or horizontal scroll)
- Include clear, educational comments explaining key concepts
- Keep editable text/content in one clearly labeled section near the top of the script
- Start with 2 realistic sample items (or a "Load sample data" button) so the app doesn't open empty
- Keep all responses under 200 words (except code generation)

CODE REQUIREMENTS:
- Use semantic HTML structure
- Include responsive, mobile-friendly CSS styling
- Add JavaScript for interactivity (use localStorage if the app saves entries)
- Comment major code sections and explain key functions
- Use modern but widely-supported syntax

SUGGESTED APP TYPES:
- Productivity tools (timers, calculators, note-takers)
- Simple games (memory, word games, puzzles)
- Utilities (unit converters, password generators)
- Trackers (habits, expenses, tasks)
- Educational tools (flashcards, quizzes, name pickers)

WORKFLOW:
1. If user gives vague idea, ask 1-2 clarifying questions
2. Generate complete, commented code
3. Offer brief explanation of how data flows through the app
4. Suggest 2-3 simple modifications they could try

USER INSTRUCTION: Simply describe what kind of app you want to build, even if your idea is rough or incomplete. I'll help you create something functional!

What app would you like to build today?
```

> **Tip:** When you're done building, always export (e.g., **Export → Google Sites** or **Export → Download code** in Canvas) before closing your browser tab. The Code tab is read-only and has no copy/download button of its own.

---

## Step 3: Describe Your App

After pasting the prompt above, type your app description **in the same message box** before hitting send. Or send the prompt first, then type your description in the next message.

Keep your description short and specific. Examples:

**Conference contact tracker:**
> Conference app to track people I meet. Simple input of name, note, and follow-up — all text fields. Timestamp each entry. Copy everything to clipboard at the end.

**Habit tracker:**
> A daily habit tracker where I can add habits I want to build, check them off each day, and see how many days in a row I've done each one.

**Pomodoro timer:**
> A Pomodoro timer with 25-minute work sessions and 5-minute breaks. Start, pause, and reset buttons. Show which session I'm on. Play a sound when time's up.

**Random name picker:**
> A tool where I can paste a list of student names (one per line) and click a button to randomly pick one. Highlight the picked name. Let me remove it from the pool after picking.

**Tip calculator:**
> A tip calculator. I enter the bill total and number of people, choose 15/18/20/25% tip, and it shows the tip amount and total per person.

---

## Step 4: Wait for the Code

Gemini will:
1. Possibly ask 1-2 clarifying questions (answer them briefly)
2. Generate the full HTML code
3. Offer to explain how it works

The code generation usually takes 30–90 seconds. You'll see it "thinking" first — that's normal.

---

## Iterating (Making It Better)

After you have a working first version, ask for specific improvements. Keep each request focused:

**To fix something broken:**
> The [feature] isn't working. When I [do X], [Y happens] instead of [Z]. Fix just this issue, don't change anything else.

**To add a feature:**
> Here's my current code: [paste the code]. Add [specific feature]. Keep everything else the same.

**To change the look:**
> Change the color scheme to dark mode with a navy background and white text. Don't change any functionality.

**To understand the code:**
> Explain what the JavaScript section does in simple terms. I'm a complete beginner.

**Full reset and retry:**
> Start over. New version with these changes: [list what you want different].

---

## App Ideas by Category

If you're stuck, pick one from this list and make it your own:

| What it does | App idea |
|---|---|
| Calculate something | Tip splitter, unit converter, BMI calculator, loan payment estimator |
| Track something | Habit streak, water intake, mood log, reading list, expense log |
| Organize something | To-do list, packing checklist, meeting notes, contact tracker |
| Time something | Pomodoro timer, countdown to event, stopwatch with laps |
| Classroom tools | Random name picker, quiz flashcards, exit ticket form, seating chart randomizer |
| Fun/creative | Decision spinner, compliment generator, quote of the day, trivia game |

---

## What Makes a Good First App

- **Does one thing well** — not five things poorly
- **Solves a real problem you actually have** — you'll be more motivated to finish it
- **Has 3 features or fewer** for version 1 — you can always add more later
- **Works without an internet connection** — the super prompt enforces this

> You are the **project manager**. The AI is your developer. Your job is to describe what you want clearly, test it, and tell the AI what needs to change. You don't need to know how to code.
