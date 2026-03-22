"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { InlineCode } from "@/components/ui/typography"
import { CodeHighlight } from "../code-highlight"

const dsExpertSkill = `# How to use

Add this skill to any project that consumes \`@cogentic/ds\`. It gives Claude deep knowledge of every component, prop, entry point, and design token in the design system.

## Setup

The skill is bundled with \`@cogentic/ds\`. After installing the package, symlink or copy the skills into your project:

\`\`\`bash
# Option 1: Symlink (recommended — stays in sync with package updates)
mkdir -p .claude/skills
ln -s ../../node_modules/@cogentic/ds/.claude/skills/ds-expert.md .claude/skills/ds-expert.md
ln -s ../../node_modules/@cogentic/ds/.claude/skills/create-cogentic-app.md .claude/skills/create-cogentic-app.md

# Option 2: Copy (if symlinks aren't supported)
cp node_modules/@cogentic/ds/.claude/skills/*.md .claude/skills/
\`\`\`

Claude will automatically pick up the skills when working in your project.

## What it does

- Provides a complete catalog of 130+ components with their props and usage patterns
- Knows all entry points (\`@cogentic/ds\`, \`@cogentic/ds/charts\`, \`@cogentic/ds/workflow\`, \`@cogentic/ds/chatbot\`, etc.)
- Understands design tokens, theming, and dark mode conventions
- Guides Claude to use the correct import paths and component APIs
- Includes code-splitting patterns for animations and blocks

## Example prompts

- "Build a settings page with a form using Cogentic DS components"
- "Create a dashboard layout with AppShell, cards, and charts"
- "Add a workflow canvas with nodes and edges"
`

const createAppSkill = `# How to use

This skill scaffolds complete Next.js applications pre-configured with the Cogentic Design System.

## Setup

The skill is bundled with \`@cogentic/ds\` (see DS Expert setup above for how to install skills from the package).

Alternatively, open Claude Code in any directory and reference the skill directly.

## What it does

- Scaffolds a complete **Next.js 16** project with TypeScript
- Uses **Tailwind CSS v4**, **React 19**, and the latest \`@cogentic/ds\`
- Pre-configures \`.npmrc\`, Tailwind setup, and \`next.config.ts\`
- Sets up AppShell with sidebar navigation for your specified routes
- Optionally includes auth pages using the AuthForm block
- Creates route stubs for each page you specify

## Example prompts

- "Create a new app called compliance-portal with routes: dashboard, reports, settings"
- "Scaffold a project called signal-dashboard with auth and a canvas page"
`

export default function SkillsPage() {
  return (
    <div className="max-w-4xl space-y-12">
      <div>
        <h1 className="font-bold text-3xl tracking-tight">Claude Skills</h1>
        <p className="mt-2 text-muted-foreground">
          The <InlineCode>@cogentic/ds</InlineCode> package ships with two Claude Code skills that
          help you build with the design system. Skills are markdown files in{" "}
          <InlineCode>.claude/skills/</InlineCode> that give Claude specialized knowledge. Install
          the package and symlink or copy the skills into your project to use them.
        </p>
      </div>

      <Separator />

      {/* DS Expert */}
      <section className="space-y-6">
        <div>
          <h2 className="font-semibold text-xl">DS Expert</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            <InlineCode>.claude/skills/ds-expert.md</InlineCode>
          </p>
        </div>
        <p className="text-muted-foreground">
          Gives Claude deep knowledge of every component, prop, entry point, and design token in the
          design system. Use this in any project that consumes <InlineCode>@cogentic/ds</InlineCode>
          .
        </p>
        <Card className="p-6">
          <CodeHighlight code={dsExpertSkill.trim()} lang="markdown" />
        </Card>
      </section>

      <Separator />

      {/* Create Cogentic App */}
      <section className="space-y-6">
        <div>
          <h2 className="font-semibold text-xl">Create Cogentic App</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            <InlineCode>.claude/skills/create-cogentic-app.md</InlineCode>
          </p>
        </div>
        <p className="text-muted-foreground">
          Scaffolds complete Next.js applications pre-configured with the Cogentic Design System.
          Generates project structure, configuration, AppShell, and route stubs.
        </p>
        <Card className="p-6">
          <CodeHighlight code={createAppSkill.trim()} lang="markdown" />
        </Card>
      </section>
    </div>
  )
}
