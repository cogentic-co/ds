# Skills.sh Distribution Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Publish Cogentic DS skills to skills.sh so consuming projects get AI-powered component knowledge via `npx skills add cogentic-co/ds`.

**Architecture:** Move existing `.claude/skills/` content into top-level `skills/` directory with SKILL.md frontmatter format. Clean up sensitive references for public repo readiness. Update CLAUDE.md checklist so future components keep skills in sync.

**Tech Stack:** Markdown (SKILL.md format), YAML frontmatter, symlinks

**Spec:** `docs/superpowers/specs/2026-03-22-skills-sh-distribution-design.md`

---

### Task 1: Create skills directory and ds-expert SKILL.md

**Files:**
- Create: `skills/ds-expert/SKILL.md`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p skills/ds-expert
```

- [ ] **Step 2: Create SKILL.md with frontmatter + existing content**

Copy the full content of `.claude/skills/ds-expert.md` into `skills/ds-expert/SKILL.md`, prepending this YAML frontmatter:

```yaml
---
name: ds-expert
description: Expert guide for building UIs with the Cogentic Design System (@cogentic/ds). Covers all components, blocks, charts, workflow, hooks, design tokens, and patterns.
---
```

The body is the entire existing content of `.claude/skills/ds-expert.md` unchanged.

- [ ] **Step 3: Clean up email in the new file**

Replace all instances of `james@cogentic.co` with `user@example.com` in `skills/ds-expert/SKILL.md`.

- [ ] **Step 4: Commit**

```bash
git add skills/ds-expert/SKILL.md
git commit -m "Add ds-expert skill in skills.sh format"
```

---

### Task 2: Create create-cogentic-app SKILL.md

**Files:**
- Create: `skills/create-cogentic-app/SKILL.md`

- [ ] **Step 1: Create the directory**

```bash
mkdir -p skills/create-cogentic-app
```

- [ ] **Step 2: Create SKILL.md with frontmatter + existing content**

Copy the full content of `.claude/skills/create-cogentic-app.md` into `skills/create-cogentic-app/SKILL.md`, prepending this YAML frontmatter:

```yaml
---
name: create-cogentic-app
description: Scaffold new Next.js applications pre-configured with the Cogentic Design System (@cogentic/ds). Creates AppShell layout, routes, auth pages, and all configuration.
---
```

The body is the entire existing content of `.claude/skills/create-cogentic-app.md` unchanged.

- [ ] **Step 3: Commit**

```bash
git add skills/create-cogentic-app/SKILL.md
git commit -m "Add create-cogentic-app skill in skills.sh format"
```

---

### Task 3: Replace .claude/skills/ files with symlinks

**Files:**
- Modify: `.claude/skills/ds-expert.md` (replace with symlink)
- Modify: `.claude/skills/create-cogentic-app.md` (replace with symlink)

- [ ] **Step 1: Remove original files and create symlinks**

```bash
rm .claude/skills/ds-expert.md
ln -s ../../skills/ds-expert/SKILL.md .claude/skills/ds-expert.md

rm .claude/skills/create-cogentic-app.md
ln -s ../../skills/create-cogentic-app/SKILL.md .claude/skills/create-cogentic-app.md
```

- [ ] **Step 2: Verify symlinks work**

```bash
ls -la .claude/skills/
head -5 .claude/skills/ds-expert.md
head -5 .claude/skills/create-cogentic-app.md
```

Expected: Both show the YAML frontmatter from the new SKILL.md files.

- [ ] **Step 3: Commit**

```bash
git add .claude/skills/ds-expert.md .claude/skills/create-cogentic-app.md
git commit -m "Replace .claude/skills with symlinks to skills/ directory"
```

---

### Task 4: Update package.json files array

**Files:**
- Modify: `package.json:42-46`

- [ ] **Step 1: Remove `.claude/skills` from files array**

In `package.json`, change the `files` array from:

```json
"files": [
  "dist",
  "src/styles",
  ".claude/skills"
],
```

To:

```json
"files": [
  "dist",
  "src/styles"
],
```

Skills are distributed via skills.sh (reads from GitHub repo), not the npm tarball.

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "Remove .claude/skills from npm package files"
```

---

### Task 5: Add skill update step to CLAUDE.md checklist

**Files:**
- Modify: `CLAUDE.md:237-241` (after "### 6. Build verification")

- [ ] **Step 1: Add checklist step 7**

After the "### 6. Build verification" section (line 241), add:

```markdown

### 7. Skill update
- [ ] Component added to `skills/ds-expert/SKILL.md` with signature, description, and category
- [ ] If new hook/block/chart: added to the appropriate section in the skill
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Add skill update step to new component checklist"
```

---

### Task 6: Add skills install instructions to CLAUDE.md

**Files:**
- Modify: `CLAUDE.md:72-87` (in "Consuming the package" section)

- [ ] **Step 1: Add skills install section**

After the existing "### Usage" code block (around line 82), add a new subsection:

```markdown

### AI Skills
```bash
# Install DS skills for your AI agent (Claude Code, Cursor, Copilot, etc.)
npx skills add cogentic-co/ds
```

This gives your AI assistant full knowledge of all DS components, patterns, design tokens, and scaffolding.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "Add skills.sh install instructions to consuming section"
```

---

### Task 7: Clean up sensitive references for public repo

**Files:**
- Modify: `CLAUDE.md:5` (Jira URL)
- Modify: `README.md` (Jira URL)
- Modify: `app/components/[slug]/previews.tsx` (email)
- Modify: `app/shells/[slug]/previews.tsx` (email)
- Modify: `.gitignore` (add dist/)

- [ ] **Step 1: Remove Jira URL from CLAUDE.md**

Remove the line `**Jira Epic:** [SIG-490](https://cogentic.atlassian.net/browse/SIG-490)` from `CLAUDE.md`.

- [ ] **Step 2: Remove Jira URL from README.md**

Remove any reference to `cogentic.atlassian.net/browse/SIG-490` from `README.md`.

- [ ] **Step 3: Replace email in preview files**

In `app/components/[slug]/previews.tsx` and `app/shells/[slug]/previews.tsx`, replace all instances of `james@cogentic.co` with `user@example.com`.

- [ ] **Step 4: Add dist/ to .gitignore**

Add `dist/` to `.gitignore`. The build artifact is generated by `prepublishOnly` during `pnpm publish`.

- [ ] **Step 5: Remove dist/ from git tracking**

```bash
git rm -r --cached dist/
```

- [ ] **Step 6: Commit**

```bash
git add CLAUDE.md README.md "app/components/[slug]/previews.tsx" "app/shells/[slug]/previews.tsx" .gitignore
git commit -m "Clean up sensitive references for public repo readiness"
```

---

### Task 8: Verify everything works

- [ ] **Step 1: Verify skill files have correct frontmatter**

```bash
head -5 skills/ds-expert/SKILL.md
head -5 skills/create-cogentic-app/SKILL.md
```

Expected: Both start with `---` / `name:` / `description:` / `---`.

- [ ] **Step 2: Verify symlinks resolve**

```bash
cat .claude/skills/ds-expert.md | head -5
cat .claude/skills/create-cogentic-app.md | head -5
```

Expected: Same frontmatter output as step 1.

- [ ] **Step 3: Verify no sensitive references remain**

```bash
grep -r "cogentic.atlassian.net" --include="*.md" --include="*.tsx" . | grep -v node_modules | grep -v docs/superpowers
grep -r "james@cogentic.co" --include="*.md" --include="*.tsx" . | grep -v node_modules | grep -v docs/superpowers
```

Expected: No matches.

- [ ] **Step 4: Verify package builds**

```bash
pnpm build:pkg
pnpm test
pnpm lint
```

Expected: All pass.

- [ ] **Step 5: Verify npm package doesn't include skills**

```bash
pnpm pack --dry-run 2>&1 | grep -i skill
```

Expected: No skill files listed in the tarball contents.
