"use client"

import { Globe, Hammer, Mic, Rocket, Undo2, UserRound } from "lucide-react"
import type React from "react"
import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  PromptInput,
  PromptInputAction,
  PromptInputAttachButton,
  PromptInputBody,
  PromptInputCommand,
  type PromptInputCommandPayload,
  PromptInputFiles,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/src/chatbot"

const commands = [
  { value: "deploy", label: "deploy", description: "Ship to production", icon: <Rocket /> },
  { value: "rollback", label: "rollback", description: "Undo last release", icon: <Undo2 /> },
  { value: "build", label: "build", description: "Run a fresh build", icon: <Hammer /> },
]

const allMentions = [
  { value: "alice", label: "Alice Chen", description: "Eng lead", icon: <UserRound /> },
  { value: "bob", label: "Bob Carter", description: "PM", icon: <UserRound /> },
  { value: "casey", label: "Casey Lee", description: "Design", icon: <UserRound /> },
  { value: "dani", label: "Dani Park", description: "Ops", icon: <UserRound /> },
  { value: "ezra", label: "Ezra Singh", description: "Data", icon: <UserRound /> },
]

type SubmitLog = {
  message: string
  fileNames: string[]
  payload?: PromptInputCommandPayload
}

function Block({
  title,
  blurb,
  children,
}: {
  title: string
  blurb?: string
  children: React.ReactNode
}) {
  return (
    <section className="space-y-3">
      <header className="space-y-1">
        <h3 className="font-medium text-foreground text-sm">{title}</h3>
        {blurb && <p className="text-muted-foreground text-sm">{blurb}</p>}
      </header>
      {children}
    </section>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">{children}</code>
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-xxs">
      {children}
    </kbd>
  )
}

function Row({ name, type, children }: { name: string; type: string; children: React.ReactNode }) {
  return (
    <tr className="border-border border-b last:border-b-0">
      <td className="py-1.5 pr-4 align-top font-mono text-xs">{name}</td>
      <td className="py-1.5 pr-4 align-top font-mono text-muted-foreground text-xs">{type}</td>
      <td className="py-1.5 align-top text-foreground text-sm">{children}</td>
    </tr>
  )
}

function PropTable({ title, rows }: { title: string; rows: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-lg border border-border p-3">
      <div className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
        {title}
      </div>
      <table className="w-full">
        <tbody>{rows}</tbody>
      </table>
    </div>
  )
}

export default function PromptInputPreview() {
  const [lastSubmit, setLastSubmit] = useState<SubmitLog | null>(null)

  return (
    <div className="max-w-3xl space-y-10">
      <PropTable
        title="<PromptInput> props"
        rows={
          <>
            <Row name="onSubmit" type="(message, files, payload?) => void">
              Fired on submit. <Code>payload</Code> is included only in rich-text mode (when{" "}
              <Code>commands</Code> or <Code>mentions</Code> are passed).
            </Row>
            <Row name="value / onValueChange" type="string / (v) => void">
              Plain-text controlled value.
            </Row>
            <Row name="parts / defaultParts / onPartsChange" type="TextCommandValue">
              Rich-text controlled value (parts array). Use either <Code>parts</Code> or{" "}
              <Code>defaultParts</Code>, not both.
            </Row>
            <Row name="commands" type="TextCommandItem[]">
              Items shown after typing <Kbd>/</Kbd>. Setting this enables rich-text mode.
            </Row>
            <Row name="mentions" type="TextCommandItem[]">
              Items shown after typing <Kbd>@</Kbd>. Setting this enables rich-text mode.
            </Row>
            <Row name="isLoading" type="boolean">
              Disables input + swaps submit button to a stop icon.
            </Row>
          </>
        }
      />

      <PropTable
        title="Composition slots"
        rows={
          <>
            <Row name="<PromptInputHeader>" type="div">
              Optional bordered row above the body (toolbars, model picker, etc).
            </Row>
            <Row name="<PromptInputBody>" type="div">
              Container for the editor (Textarea or Command).
            </Row>
            <Row name="<PromptInputTextarea>" type="textarea">
              Plain-text editor.
            </Row>
            <Row name="<PromptInputCommand>" type="contentEditable">
              Rich-text editor with inline <Kbd>/</Kbd> and <Kbd>@</Kbd> chips.
            </Row>
            <Row name="<PromptInputFiles>" type="div">
              Attachment chips. Place anywhere — e.g. inside <Code>PromptInputTools</Code> next to
              the attach button.
            </Row>
            <Row name="<PromptInputFooter>" type="div">
              Action row at the bottom. Holds tools + submit.
            </Row>
            <Row name="<PromptInputTools>" type="div">
              Cluster of utility buttons inside the footer.
            </Row>
            <Row name="<PromptInputAttachButton>" type="button">
              File picker — populates <Code>PromptInputFiles</Code>.
            </Row>
            <Row name="<PromptInputAction tooltip>" type="wrapper">
              Tooltip wrapper for an action button.
            </Row>
            <Row name="<PromptInputSubmit>" type="button">
              Submit / stop button (auto-disabled when empty).
            </Row>
          </>
        }
      />

      <Block
        title="Plain text"
        blurb="Default mode — typed message + file attachments. onSubmit receives (message, files)."
      >
        <PromptInput
          onSubmit={(message, files) =>
            setLastSubmit({ message, fileNames: files.map((f) => f.name) })
          }
        >
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask about compliance..." />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAttachButton />
              <PromptInputFiles className="px-0 pt-0" />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Block>

      <Block
        title="With /commands and @mentions"
        blurb="Pass commands and/or mentions to enable rich-text mode. Selections become atomic inline chips. onSubmit receives (message, files, payload) where payload is { commands, mentions }."
      >
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground text-sm">
          <li>
            Type <Kbd>/</Kbd> to open the slash-command picker (deploy, rollback, build)
          </li>
          <li>
            Type <Kbd>@</Kbd> to mention a teammate (Alice, Bob, Casey…)
          </li>
          <li>
            <Kbd>↑</Kbd> <Kbd>↓</Kbd> to navigate, <Kbd>Enter</Kbd> or <Kbd>Tab</Kbd> to insert
          </li>
          <li>
            <Kbd>Enter</Kbd> with no menu open to submit
          </li>
          <li>
            <Kbd>Backspace</Kbd> on a chip removes it as a unit
          </li>
        </ul>

        <PromptInput
          commands={commands}
          mentions={allMentions.slice(0, 3)}
          onSubmit={(message, files, payload) =>
            setLastSubmit({ message, fileNames: files.map((f) => f.name), payload })
          }
        >
          <PromptInputBody className="px-4 pt-3">
            <PromptInputCommand placeholder="Type / for commands or @ to mention" rows={3} />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAttachButton />
              <PromptInputFiles className="px-0 pt-0" />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Block>

      <Block
        title="Server-driven mentions"
        blurb="Use onTriggerQueryChange + filterItems={false} on PromptInputCommand when mentions come from an API. Parent fetches based on the live trigger query and replaces the mentions prop."
      >
        <ServerDrivenMentions
          onSubmit={(message, files, payload) =>
            setLastSubmit({ message, fileNames: files.map((f) => f.name), payload })
          }
        />
      </Block>

      <Block
        title="With a header"
        blurb="PromptInputHeader sits above the body — useful for model pickers, mode toggles, or breadcrumbs."
      >
        <PromptInput onSubmit={(message) => setLastSubmit({ message, fileNames: [] })}>
          <PromptInputHeader>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Investigations agent</span>
              <span className="text-muted-foreground text-xs">claude-opus-4-7</span>
            </div>
          </PromptInputHeader>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Investigate wallet 0x…" />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAttachButton />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Block>

      <Block
        title="Custom actions"
        blurb="PromptInputAction wraps any button with a tooltip. Drop them into PromptInputTools next to the attach button."
      >
        <PromptInput onSubmit={(message) => setLastSubmit({ message, fileNames: [] })}>
          <PromptInputBody>
            <PromptInputTextarea placeholder="Ask anything…" />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAttachButton />
              <PromptInputAction tooltip="Search the web">
                <Button variant="ghost" size="icon" aria-label="Search the web">
                  <Globe className="size-4" />
                </Button>
              </PromptInputAction>
              <PromptInputAction tooltip="Voice input">
                <Button variant="ghost" size="icon" aria-label="Voice input">
                  <Mic className="size-4" />
                </Button>
              </PromptInputAction>
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Block>

      <Block
        title="Loading state"
        blurb="Pass isLoading to disable the editor and swap submit for a stop button."
      >
        <PromptInput isLoading onSubmit={() => {}}>
          <PromptInputBody>
            <PromptInputTextarea defaultValue="Investigating wallet 0xabcd…cdef12…" />
          </PromptInputBody>
          <PromptInputFooter>
            <PromptInputTools>
              <PromptInputAttachButton />
            </PromptInputTools>
            <PromptInputSubmit />
          </PromptInputFooter>
        </PromptInput>
      </Block>

      <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-3 font-mono text-xs">
        <div className="text-muted-foreground">
          {lastSubmit ? "last submitted →" : "submit any preview to see the API payload →"}
        </div>
        <pre className="whitespace-pre-wrap break-words text-foreground">
          {lastSubmit ? JSON.stringify(lastSubmit, null, 2) : "(nothing yet)"}
        </pre>
      </div>
    </div>
  )
}

function ServerDrivenMentions({
  onSubmit,
}: {
  onSubmit: (message: string, files: File[], payload?: PromptInputCommandPayload) => void
}) {
  const [results, setResults] = useState(allMentions)
  const visible = useMemo(() => results, [results])

  return (
    <PromptInput mentions={visible} onSubmit={onSubmit}>
      <PromptInputBody className="px-4 pt-3">
        <PromptInputCommand
          placeholder="Type @ — mentions are fetched per keystroke"
          filterItems={false}
          onTriggerQueryChange={(state) => {
            if (!state || state.trigger !== "@") {
              setResults(allMentions)
              return
            }
            const q = state.query.toLowerCase()
            setResults(allMentions.filter((p) => p.label.toLowerCase().includes(q)))
          }}
        />
      </PromptInputBody>
      <PromptInputFooter>
        <PromptInputTools>
          <PromptInputAttachButton />
        </PromptInputTools>
        <PromptInputSubmit />
      </PromptInputFooter>
    </PromptInput>
  )
}
