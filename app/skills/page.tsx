"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { CodeHighlight } from "../code-highlight"

const dsExpertSkill = `# DS Expert Skill

Gives your AI assistant full knowledge of every component, prop, entry point, and design token in the Cogentic Design System.

## Install

\`\`\`bash
npx skills add cogentic-co/ds
\`\`\`

Works with Claude Code, Cursor, Copilot, Cline, Windsurf, and 30+ other agents.

## What it covers

- **130+ components** with props and usage patterns
- All entry points (\`@cogentic-co/ds\`, \`@cogentic-co/ds/charts\`, \`@cogentic-co/ds/workflow\`, etc.)
- Design tokens, theming, and dark mode conventions
- Compliance-specific components (ApprovalActions, AuditLog, CommentThread, etc.)
- Code-splitting patterns for animations and blocks
- Common page layouts (dashboard, settings, case review)

## Example prompts

- "Build a case review page with approval actions and an audit trail"
- "Create a dashboard with waffle charts and a data table with filters"
- "Add a settings page with a form using the DS"
`

const createAppSkill = `# Create Cogentic App Skill

Scaffolds complete Next.js applications pre-configured with the Cogentic Design System.

## Install

\`\`\`bash
npx skills add cogentic-co/ds
\`\`\`

The skill is bundled alongside the DS Expert skill.

## What it does

- Scaffolds a **Next.js 16** project with TypeScript
- Uses **Tailwind CSS v4**, **React 19**, and the latest \`@cogentic-co/ds\`
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
        <h1 className="font-bold text-3xl tracking-tight">AI Skills</h1>
        <p className="mt-2 text-muted-foreground">
          Install skills to give your AI assistant full knowledge of the Cogentic Design System.
        </p>
        <Card className="mt-4 p-4">
          <code className="font-mono text-sm">npx skills add cogentic-co/ds</code>
        </Card>
      </div>

      <Separator />

      <section className="space-y-6">
        <div>
          <h2 className="font-semibold text-xl">DS Expert</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Component catalog, design tokens, patterns, and compliance workflows.
          </p>
        </div>
        <Card className="p-6">
          <CodeHighlight code={dsExpertSkill.trim()} lang="markdown" />
        </Card>
      </section>

      <Separator />

      <section className="space-y-6">
        <div>
          <h2 className="font-semibold text-xl">Create Cogentic App</h2>
          <p className="mt-1 text-muted-foreground text-sm">
            Scaffolds Next.js apps pre-configured with the DS, AppShell, and routes.
          </p>
        </div>
        <Card className="p-6">
          <CodeHighlight code={createAppSkill.trim()} lang="markdown" />
        </Card>
      </section>
    </div>
  )
}
