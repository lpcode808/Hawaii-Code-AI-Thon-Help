# Understand Your Code: Follow-Up Prompts

You built an app. It works. Now what?

These are **3 follow-up prompts** you paste into the same Gemini chat (or a new one) to understand what you built. Use them in order, or jump to whichever one you need.

| Prompt | What it does | When to use it |
|--------|-------------|----------------|
| **1. "What Did I Build?"** | Visual overview — no code shown | Right after your app works |
| **2. "Walk Me Through the Code"** | Beginner-friendly code tour with safe experiments | When you want to understand how it works |
| **3. "Help Me Fix or Change This"** | Guided debugging and feature help | When something's broken or you want to add a feature |

---

## Prompt 1: "What Did I Build?" (The Big Picture)

Use this when your app is working and you want to understand what it actually does — without reading code. Paste the prompt below, then paste your `index.html` code after it.

```
I just built a web app with AI and I want to understand what it does at a HIGH LEVEL. Don't show me code — show me what happens from a user's perspective using simple diagrams.

Here's what I need:

1. THE APP IN ONE SENTENCE
   What does this app do? (Plain English, one sentence.)

2. WHAT CAN THE USER DO?
   List every action a user can take and what happens when they do it. Use a simple table:

   USER DOES THIS          | APP RESPONDS WITH
   ------------------------|---------------------------
   [action]                | [what happens]

3. THE MAIN FLOW (Step by Step)
   Walk through the most common use case like a story:

   STEP 1: User opens the app. They see: ___
   STEP 2: User does ___. The app: ___
   STEP 3: The app saves/processes ___
   STEP 4: User sees ___

4. WHERE DOES DATA GO?
   Show a simple diagram of how information flows:

   User types something
      ↓
   App receives it
      ↓
   App stores it in ___
      ↓
   App shows it on screen as ___

5. WHAT ARE THE "RULES"?
   List 3-5 rules the app follows.
   Example: "Names can't be empty" or "Data disappears when you refresh"

6. WHAT HAPPENS IN UNUSUAL SITUATIONS?
   Show a table:

   WHAT IF...                     | WHAT HAPPENS
   -------------------------------|---------------------------
   User submits empty form?       | ___
   User refreshes the page?       | ___
   User clicks Submit 100 times?  | ___

Keep the language simple — explain this to someone who has never coded before. Use diagrams made of text characters, not just paragraphs.

Here's my code:
[PASTE YOUR index.html CODE HERE]
```

### When to use this
- Right after your first working version
- Before showing your app to someone else (so you can explain it)
- When a teacher asks "what does your app do?"

---

## Prompt 2: "Walk Me Through the Code" (The Guided Tour)

Use this when you want to actually understand how the code works — what the HTML, CSS, and JavaScript pieces do and how they connect. This prompt gives you safe things to experiment with so you can learn by doing.

```
I built this web app with AI and I want to understand how the code works. I'm a complete beginner — I don't know HTML, CSS, or JavaScript yet. Explain everything using simple language and visual diagrams.

Here's what I need:

PART A: THE LAYOUT (What's on screen)

Show me every visible element in my app like a map:
+-----------------------------------+
|  [header area]                    |
+-----------------------------------+
|  [input area]                     |
|  [buttons]                        |
+-----------------------------------+
|  [results/display area]           |
+-----------------------------------+

List each important element:
ELEMENT               | WHAT IT IS              | WHAT IT DOES
----------------------|-------------------------|------------------
[e.g., text box]      | Where user types        | Collects input
[e.g., Submit button] | Clickable button        | Triggers action

PART B: THE STYLES (How things look)

Show me ONE example of how the CSS controls appearance:
.button {
  background-color: #4CAF50;  ← SAFE TO CHANGE: try "red" or "#FF5733"
  padding: 10px 20px;         ← SAFE TO CHANGE: bigger number = more space
  border-radius: 5px;         ← SAFE TO CHANGE: bigger = rounder corners
}

PART C: THE ACTIONS (What happens when you click things)

For each button or interactive element, show:
WHEN [element] IS CLICKED:
  1. App gets ___
  2. App checks ___
  3. App saves ___
  4. App shows ___

Draw a flowchart for the main action:
User clicks button
      ↓
App reads the text box
      ↓
Is it empty?
  YES → Show error
  NO  → Save data → Update display

PART D: 5 SAFE EXPERIMENTS TO TRY

Give me 5 things I can change in the code that are safe and will teach me something:

1. CHANGE A COLOR
   Find: [exact code to find]
   Change to: [new value]
   What you'll see: [result]

2. CHANGE A SIZE
   Find: [exact code]
   Change to: [new value]
   What you'll see: [result]

3. CHANGE A MESSAGE
   Find: [exact text]
   Change to: [your own text]
   What you'll see: [result]

4. ADD A DEBUG MESSAGE
   Find: [a function]
   Add this line at the top: console.log('This function ran!');
   Open browser console (F12) to see it

5. CHANGE A NUMBER
   Find: [a number in the code]
   Change to: [different number]
   What you'll see: [result]

PART E: THE CHEAT SHEET

Show a translation table for the most common patterns in MY code:

WHAT IT DOES IN PLAIN ENGLISH     | THE CODE THAT DOES IT
----------------------------------|---------------------------
"Find the button on the page"     | document.querySelector('#btn')
"When button is clicked, do ___"  | btn.addEventListener('click', ...)
"Change what's displayed"         | element.textContent = '...'
"Save to a list"                  | array.push(item)
"Check if something is true"      | if (condition) { ... }

Keep everything beginner-friendly. Quote the actual code from MY app (don't use generic examples). Bold the specific code I should look for.

Here's my code:
[PASTE YOUR index.html CODE HERE]
```

### When to use this
- During the "Tweak" phase — understand before you change
- When a teacher wants to learn what the code means
- When you want to try modifying things yourself instead of asking AI

### Bonus: If participants know Scratch

If your students have Scratch experience, add this line to the prompt before pasting the code:

> Also: I know Scratch programming. When explaining JavaScript concepts, compare them to Scratch blocks. For example, `addEventListener('click', ...)` is like "when this sprite clicked."

This activates Scratch-to-web parallels in the response:
```
SCRATCH BLOCK               | WEB CODE
----------------------------|---------------------------
when green flag clicked      | window.addEventListener('load', ...)
when this sprite clicked     | button.addEventListener('click', ...)
say [Hello]                  | element.textContent = "Hello"
set [var] to [10]            | let myVar = 10
change [var] by [1]          | myVar = myVar + 1
if <condition> then          | if (condition) { ... }
repeat [10]                  | for (let i = 0; i < 10; i++) { ... }
forever                      | setInterval(() => { ... }, 1000)
add [item] to [list]         | list.push(item)
```

---

## Prompt 3: "Help Me Fix or Change This" (The Tutor)

Use this when something is broken, or when you want to add a feature but don't know how. Paste the prompt below, then paste your code and describe your problem.

```
I'm a complete beginner who built this web app with AI. I need help with something specific. Here are your rules:

YOUR ROLE:
- You are a patient tutor, not just a code fixer
- When I describe a problem, help me UNDERSTAND what's wrong — don't just fix it silently
- When I want to add something, walk me through the steps — don't just give me new code
- Celebrate what's already working before addressing what needs fixing
- Keep explanations under 200 words, then ask if I want more detail

HOW TO HELP ME DEBUG:
1. First, tell me what the problem probably is in plain English
2. Then show me exactly where to look (quote the code, don't use line numbers)
3. Tell me to add a console.log() to confirm the problem:
   "Add this line inside your [function name]: console.log('checking:', variableName);"
4. Then show me the fix and explain WHY it fixes the problem

HOW TO HELP ME ADD FEATURES:
1. First, point out a similar pattern already in my code
2. Then break the new feature into 3 simple steps
3. Walk me through each step one at a time
4. After each step, tell me to save and test before continuing

WHAT NOT TO DO:
- Don't rewrite my entire app
- Don't add features I didn't ask for
- Don't use technical jargon without explaining it
- Don't assume I know anything about coding

Here's my code:
[PASTE YOUR index.html CODE HERE]

My question / what I want to change:
[DESCRIBE YOUR PROBLEM OR WHAT YOU WANT TO ADD]
```

### Common things to ask for

**Fixing bugs:**
> The delete button doesn't work. When I click it, nothing happens.

**Adding features:**
> I want to add a "clear all" button that removes everything from the list.

**Changing the look:**
> I want a dark background with light text. Show me exactly what to change.

**Understanding something:**
> What does the `forEach` part of my code do? I see it but don't understand it.

**Saving data:**
> Right now everything disappears when I refresh the page. How do I make it save?

---

## Suggested Hackathon Workflow

```
Phase 2: GENERATE          → Use superprompt.md to build app
                                |
Phase 3: TWEAK              → Use Prompt 1 ("What Did I Build?")
                                |
                             → Use Prompt 2 ("Walk Me Through")
                             → Try the 5 safe experiments
                                |
                             → Use Prompt 3 to fix/add things
                                |
Phase 4: DEPLOY             → Use deploy-guide.md
```

### For Teachers

These prompts work for you too. After a student builds something:
1. Paste the student's code + Prompt 1 → understand what they made
2. Paste the student's code + Prompt 2 → learn the code alongside them
3. Use the "Safe Experiments" as a classroom activity: "Everyone change one color and one number. What happened?"

### For Google Docs

After using any of these prompts, paste Gemini's response into your Google Doc under a new section:

```
## What I Learned About My Code

[Paste Gemini's explanation here]

What surprised me:

What I still don't understand:

Experiments I tried and what happened:
```

---

## Tips

- **Don't paste all 3 prompts at once.** Start with Prompt 1. Move to Prompt 2 when you're ready. Use Prompt 3 when you need specific help.
- **You can use a new Gemini chat for each prompt.** Or stay in the same one — Gemini remembers context within a chat.
- **Teachers: try Prompt 2 on your own first.** The safe experiments are a great way to build your own comfort with code before facilitating.
- **The Scratch table is optional but powerful.** If your students have ANY Scratch experience, add the Scratch line to Prompt 2. The parallels make everything click faster.
