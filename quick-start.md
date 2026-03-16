# Quick Start: Zero to Working App

**Time needed**: 30 minutes for your first app + iterations
**Cost**: $0
**You need**: Chrome or Firefox, a Google account, Google Drive

---

## Before You Start: Set Up Your Google Doc

Create a Google Doc to track everything you build today. You'll paste your prompts, save your code, and write notes — so nothing gets lost if you close a tab.

1. Go to **[docs.google.com](https://docs.google.com)**
2. Click **+ Blank** to create a new document
3. Name it: `Hackathon — [Your Name] — [Date]`
4. Share it with the facilitator (File > Share > enter their email)
5. Copy and paste this template into your doc:

---

```
# My Hackathon App

## My App Idea
Problem I'm solving:

App name (optional):

## 3 Core Features
1.
2.
3.

## My Prompts (paste each one + what happened)

### Attempt 1
Prompt:

What worked:
What didn't:

### Attempt 2
Prompt:

What worked:
What didn't:

## Final Code
(paste your final index.html code here)

## My App Link
(paste your Google Sites or GitHub Pages URL here)

## Reflection
What I built:
What surprised me:
What I'd add next:
```

---

## Phase 1: Research — Define What You'll Build (10 min)

Before touching AI, write down your idea in your Google Doc.

**Fill in this sentence:**
> "I need a way to _______________ so that _______________."

**Example:**
> "I need a way to **track the people I meet at conferences** so that **I remember who to follow up with and what we talked about**."

**Then list 3 core features — keep it simple:**
1. Input fields: name, note, follow-up action
2. Save each entry with a timestamp
3. Copy all entries to clipboard

> Rule: If you can't write it down in plain English in 2 minutes, the idea is too vague. Narrow it down first.

---

## Phase 2: Generate — Use AI to Build It (15 min)

### 2a. Open Google AI Studio

1. Go to **[aistudio.google.com](https://aistudio.google.com/)**
2. Sign in with your **personal** Google account (not school/work — fewer restrictions)
3. In the top-left, click **"Create new prompt"**

> If you see a popup about settings or model selection, dismiss it — the defaults are fine.

### 2b. Paste the Super Prompt

1. Open `superprompt.md`
2. Copy the entire text in the code block (from `VIBE CODING ASSISTANT` to `What app would you like to build today?`)
3. Click into the message box at the bottom of AI Studio
4. Paste it (Ctrl+V on Windows / Cmd+V on Mac)

> **Important**: Click the save icon (floppy disk symbol) in the top bar after pasting. AI Studio doesn't always auto-save.

### 2c. Describe Your App

In the same message box (or in a new message), type your app description. Example:

> Conference app to track people I meet. Simple text inputs for name, note, and follow-up action. Add a timestamp automatically. At the end, let me copy everything to clipboard.

Then click **Send** (or press Enter).

### 2d. Wait and Watch

Gemini will show "Thinking..." and then start generating code. This takes 30–90 seconds. You'll see the reasoning steps — this is Gemini planning before it codes.

When it's done, you'll see a big block of code starting with `<!DOCTYPE html>`.

**Paste your prompt into your Google Doc under "Attempt 1 — Prompt."**

---

## Phase 3: Tweak — Save and Test Your App (10 min)

### 3a. Copy the Code

1. Scroll through Gemini's response to find the code block
2. Select all the code — from `<!DOCTYPE html>` all the way to `</html>` at the bottom
3. Copy it (Ctrl+A won't work; you need to click at the start, Shift+click at the end, then Ctrl+C)

> Tip: Look for a "Copy" button on the code block — Gemini sometimes shows one in the top-right corner of the code.

### 3b. Save It as an HTML File

**On Mac:**
1. Open **TextEdit** (search for it in Spotlight: Cmd+Space, type "TextEdit")
2. Go to **Format > Make Plain Text** (this is critical — skip this and it won't work)
3. Paste your code (Cmd+V)
4. Go to **File > Save**
5. Name it `index.html`
6. In the save dialog, change **"If no extension is provided, use .txt"** to **"Don't append"** — or just manually type `.html` at the end
7. Save to your Desktop

**On Windows:**
1. Open **Notepad** (search in Start menu)
2. Paste your code (Ctrl+V)
3. Go to **File > Save As**
4. In the "Save as type" dropdown, choose **"All Files (*.*)"**
5. Name it `index.html`
6. Save to your Desktop

**Better option (either platform):** Use **VS Code** (free, download at code.visualstudio.com)
1. Open VS Code
2. New file: Ctrl+N (Windows) / Cmd+N (Mac)
3. Paste your code
4. Save as: Ctrl+S / Cmd+S, name it `index.html`

### 3c. Open and Test It

1. Find `index.html` on your Desktop
2. Double-click it — it opens in your browser
3. Try every feature
4. Write notes in your Google Doc: what works, what doesn't, what's missing

---

## Phase 3b: Understand — What Did You Actually Build? (optional but valuable)

Before iterating, take 5 minutes to understand what Gemini made for you. Open `understand-your-code.md` and use the follow-up prompts:

1. **Prompt 1: "What Did I Build?"** — Paste your code into a new Gemini chat with this prompt. You'll get back a visual overview of how your app works — no coding knowledge needed. Great for your Google Doc.

2. **Prompt 2: "Walk Me Through the Code"** — This gives you 5 safe experiments: things you can change in the code (a color, a number, a message) to see what happens. Try at least one before moving on.

3. **Prompt 3: "Help Me Fix or Change This"** — Use this during iteration when you have a specific problem or want to add something.

**Teachers**: Try Prompt 2 on your own or alongside a student. The experiments build your comfort with reading code without needing to write any.

Paste Gemini's explanation into your Google Doc under "What I Learned About My Code."

---

## Phase 4: Iterate — Make It Better (repeat as needed)

The first version is never perfect. That's expected. The goal is to go around this loop:

```
Write prompt → Generate → Test → Understand → Find problem → Improve prompt → Repeat
```

### How to Ask for Improvements

Go back to AI Studio and ask Gemini to fix or add things. **Be specific. Change one thing at a time.**

**To fix a bug:**
> The "add entry" button doesn't do anything when I click it. Fix just this issue. Here's my current code: [paste your code]

**To add a feature:**
> Here's my current code: [paste]. Add a character counter under the notes field showing how many characters are left (max 200). Don't change anything else.

**To change the design:**
> Make the background dark gray (#1a1a1a) and the text white. Keep the buttons green. Don't change the functionality.

**To understand something:**
> In simple terms, what does the JavaScript function at line [X] do?

### Save Each Iteration

After each new version of the code:
1. Copy the new code from Gemini
2. In your text editor, **select all** (Ctrl+A / Cmd+A) and **paste** to replace the old code
3. Save the file (Ctrl+S / Cmd+S)
4. **Refresh your browser** (F5 or Ctrl+R / Cmd+R) — you don't need to close and reopen
5. Paste the prompt into your Google Doc under the next "Attempt" section

---

## Troubleshooting

### "The file opened as text, not a web page"
- Mac TextEdit: you forgot **Format > Make Plain Text**. Save again as plain text.
- Windows: you saved as `.txt`. Open File Explorer, right-click the file, Rename, change `.txt` to `.html`.
- Either: right-click the file > Open With > Chrome (or Firefox)

### "The app doesn't do anything when I click buttons"
- Copy ALL the code — scroll to the bottom of Gemini's response to make sure you got `</html>`
- Open the browser's developer console: press **F12**, click the **Console** tab, look for red errors
- Copy the red error text and paste it back to Gemini: "I'm getting this error: [paste]. Fix it."

### "Gemini stopped generating partway through"
- Scroll down and look for a "Continue" button
- Or ask: "Continue from where you left off — the code got cut off."

### "I want to start completely over"
- Start a new AI Studio chat (don't reuse the same one)
- Paste the super prompt again
- Describe the same app but differently, or try a new idea

### "I have no idea what to build"
Pick one and add your name to it — make it yours:
- **[Your name]'s tip calculator** — enter bill + people + tip %, see split
- **[Event] countdown** — days/hours/minutes until something you care about
- **Random picker** — paste a list, click to pick one randomly
- **Check-in log** — record name + note + timestamp, copy all to clipboard
- **Habit tracker** — daily checklist that saves between sessions

---

## Next Step: Deploy It

Once your app works, go to `deploy-guide.md` to put it online so anyone can open it without needing your laptop.
