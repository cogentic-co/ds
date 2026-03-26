"use client"

import { CodeBlock } from "@/components/ui/code-block"
import { type ControlDefs, Playground, useControls } from "./_shared"

const codeBlockControlDefs = {
  language: {
    type: "select" as const,
    options: ["tsx", "typescript", "javascript", "css", "html", "json", "bash"],
    defaultValue: "tsx",
    label: "Language",
  },
  showLineNumbers: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Line Numbers",
  },
  showCopy: {
    type: "boolean" as const,
    defaultValue: true,
    label: "Copy Button",
  },
} satisfies ControlDefs

const codeBlockSampleCode = `import { Button } from "@cogentic/ds"

export function MyComponent() {
  return (
    <Button variant="default">
      Click me
    </Button>
  )
}`

export default function CodeBlockPreview() {
  const controls = useControls(codeBlockControlDefs)
  const { language, showLineNumbers, showCopy } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="max-w-lg">
          <CodeBlock
            language={language}
            code={codeBlockSampleCode}
            showLineNumbers={showLineNumbers}
            showCopy={showCopy}
          />
        </div>
      </Playground>
    </div>
  )
}
