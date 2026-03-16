# Source Map: Where This Material Came From

This documents the source materials from the ~/Coding/ portfolio that were synthesized into the hackathon materials.

---

## Primary Sources

### KSEdTech Presentation (the origin of this whole effort)
- **`claude-export/.../Atlas/Dots/Concepts/KSEdTech-Vibe-Coding-2025.md`** — Full transcript of Justin's "Vibe Coding in the Classroom" presentation at Kamehameha Schools EdTech conference (June 3, 2025, with Eva Lam). Sourced:
  - The exact superprompt used in the live demo (now the canonical version in `superprompt.md`)
  - The **conference contact tracker** as the primary demo example
  - **AI Studio vs. gemini.google.com** distinction and why AI Studio is preferred
  - **Google Sites embed** as the simplest hosting option ("host it in Google Sites")
  - The **AI Studio save warning** ("look for the save icon")
  - The **PRD concept** ("put it into a PRD so that AI can generate it")
  - **Student as project manager** framing ("teachers are preparing the AI partner/developer")
  - Real micro-app examples: Plywood Cutting Visualizer, Scrip Calculator, AI Model Comparison, Ideation App
  - The link [bit.ly/LP0603](https://bit.ly/LP0603) for the original slides
- **`claude-export/.../Atlas/Dots/Concepts/Vibe Coding.md`** — Conceptual note on vibe coding as pedagogy. Sourced:
  - "Problem first, creativity throughout, syntax as needed" framing
  - Contrast with traditional coding education
  - Connection to 4 Ps of Creative Learning (Projects, Passion, Peers, Play)
  - Assessment approach: process over product

### Super Prompt
- **`BlocksHTML/superprompt.md`** — "VIBE CODING ASSISTANT" with 4-tier commenting system. Core template and constraints adapted for the hackathon superprompt.
- **`claude-export/processed_conversations/2859a0e6-..._Gemini Web Studio Superprompt starred.json`** — Original conversation where the Gemini superprompt was designed. Includes the Q&A process, constraints (single-file, no deps, 200-word limit), and suggested app types.
- **`Prompt-HTML-viz/prompts/prompt-1-code-generator.md`** — Detailed 4-tier comment system (section headers, structural explanations, concept annotations, inline clarifications) and interaction annotations linking HTML/CSS/JS blocks.

### Vibe Coding Pedagogy
- **`claude-export/.../CS-Course/slides/week03_first_vibe_coding_app.md`** — "You are the DIRECTOR, not the typist" framing. Problem-first app ideation (school, time, habits, goals). 3-feature constraint exercise. Superprompt template structure.
- **`claude-export/.../CS-Course/slides/week04_superprompt_mastery.md`** — Prompt iteration loop (Write > Generate > Evaluate > Refine > Repeat). A/B testing prompts. Strategies: target weak spots, limit scope, reference existing code.

### Deployment
- **`_planning/git-local-workflow.md`** (456 lines) — Non-technical Git introduction, 3 essential commands, daily workflow patterns. Adapted for the deploy guide.
- **`ConicSections/docs/github-launch.md`** (39 lines) — 4-step quick launch checklist (git init, create repo, enable Pages, verify). Directly inspired the deploy guide structure.
- **`claude-export/.../CS-Course/slides/week10_deployment_sharing.md`** (650+ lines) — Full deployment lesson plan with ASCII diagrams, 6-step GitHub Pages process, troubleshooting guide.
- **`Fin-Dash/DEPLOYMENT.md`** (230 lines) — Comprehensive multi-platform deployment guide.
- **`TechFamilyFunFair/deploy-script.sh`** — Automated deploy bash script.

### Understanding Code (Follow-Up Prompts)
- **`StudentProjects/0-prompts/evaluator.md`** (~1000 lines) — Code tutor prompt with Scratch parallels, "Predict > Test > Observe" pattern, 4-tier commenting system reference, experimentation safety guidelines, error translation guide, debugging strategies. Condensed into Prompt 3 ("Help Me Fix or Change This").
- **`StudentProjects/0-prompts/surveyor.md`** (~600 lines) — 17-part high-level flow analysis (no code shown). User journey maps, data flow diagrams, state diagrams, edge case analysis. Condensed into Prompt 1 ("What Did I Build?").
- **`StudentProjects/0-prompts/translator.md`** (~390 lines) — Detailed code walkthrough for Scratch programmers. HTML as "sprites," CSS as "costumes," JS as "scripts," safe experiments, Scratch-to-Web cheat sheet. Condensed into Prompt 2 ("Walk Me Through the Code").
- **`StudentProjects/0-prompts/generator.md`** (~35 lines) — App generator prompt (more advanced version allowing React/Tailwind CDN). Not used directly — our superprompt is simpler and better for zero-background participants.

### Student-Facing Materials
- **`Prompt-HTML-viz/docs/STUDENT-GUIDE.md`** (338 lines) — 10-minute quick start guide for complete beginners. Color-coded visualization explanation. Challenge projects by difficulty. "The visualization is like a map of a city" analogy.

---

## Secondary Sources (Consulted but Not Directly Used)

### Curriculum Architecture
- **`claude-export/.../CS-Course/EXECUTIVE_SUMMARY.md`** — Full semester overview
- **`claude-export/.../CS-Course/TEACHER_TRAINING_GUIDE.md`** — Educator onboarding
- **`claude-export/.../CS-Course/evaluation_rubric.md`** — Assessment criteria

### Prompt Engineering References
- **`claude-export/.../vibe-coding/references/prompt-patterns.md`** — Comprehensive prompt pattern library (core principles, category-specific patterns, anti-patterns, advanced patterns)
- **`Prompt-HTML-viz/prompts/prompt-2-visualization-generator.md`** — Code visualization prompt (Cytoscape.js)

### Example Projects (Could Be Used as Demos)
- **`DialUp/index.html`** — 630-line single-file app (contacts, localStorage, URL params). Deployed at lpcode808.github.io/DialUp/
- **`_archives/projects/Pomodoro/`** — Simple timer with themes (4 files, no build step)
- **`_archives/projects/Gradients/`** — CSS gradient generator (~300 lines)
- **`ScripCalculator/`** — Mobile-first calculator (6 files, data-driven from JSON)
- **`FontPairings/index.html`** — 980-line interactive font comparison tool

### Related Projects
- **`GAI-QuickLaunch/`** — Mobile-first Google AI launcher
- **`AIforEDUStudies/`** — AI education research browser
- **`Claude-Code-101/`** — Claude Code educational guide (separate from Gemini focus)

---

## Key Design Decisions

1. **Google Gemini / AI Studio over Claude**: Free, no API key, accessible to everyone with a Google account. Aligns with the "zero background" requirement.

2. **Single-file HTML over React/Vite**: No build step, no terminal, no node_modules. Double-click to open. Lowest possible barrier.

3. **GitHub Pages over Vercel/Netlify**: Most participants will already have (or create) GitHub accounts. Simplest static hosting with no configuration.

4. **Super prompt over iterative prompting**: Give participants one good prompt to start with. Teach iteration as a skill after they have a working first version.

5. **4 steps, not 11 weeks**: The CS-Course is a full semester. This hackathon distills it to the minimum viable flow: Frame > Generate > Test > Deploy.
