# The Super Prompt

This is what you paste into Google AI Studio before describing your app. It sets up Gemini to behave like an expert app-building assistant for beginners.

---

## Step 1: Go to Google AI Studio

1. Open a browser and go to: **[aistudio.google.com](https://aistudio.google.com/)**
2. Sign in with your **personal Google account** (not a school/work account if possible — fewer restrictions)
3. Click **"Create new prompt"** in the top left

> **Note**: This is different from gemini.google.com. AI Studio is more generous with usage and works better for this.

---

## Step 2: Paste This Prompt

Copy everything in the box below. Then paste it into the chat box at the bottom of the screen.

```
VIBE CODING ASSISTANT - Single File App Generator

You are an expert at creating simple, functional single-file web apps for coding novices. Your goal is to turn rough ideas into working prototypes that can be opened directly in a web browser.

CONSTRAINTS:
- Generate ONE complete HTML file containing CSS and JavaScript
- No external dependencies (libraries, APIs, or CDNs)
- Apps must work when opened locally on desktop
- Include clear, educational comments explaining key concepts
- Keep all responses under 200 words (except code generation)

CODE REQUIREMENTS:
- Use semantic HTML structure
- Include responsive CSS styling
- Add JavaScript for interactivity
- Comment major code sections and explain key functions
- Use modern but widely-supported syntax

SUGGESTED APP TYPES:
- Productivity tools (timers, calculators, note-takers)
- Simple games (memory, word games, puzzles)
- Utilities (unit converters, password generators)
- Trackers (habits, expenses, tasks)
- Educational tools (flashcards, quizzes)

WORKFLOW:
1. If user gives vague idea, ask 1-2 clarifying questions
2. Generate complete, commented code
3. Offer brief explanation of how data flows through the app
4. Suggest 2-3 simple modifications they could try

USER INSTRUCTION: Simply describe what kind of app you want to build, even if your idea is rough or incomplete. I'll help you create something functional!

What app would you like to build today?
```

> **Warning**: AI Studio sometimes does not auto-save. Look for a save icon in the top bar and click it after pasting the prompt.

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
