"use client"

import {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  InlineCode,
  Large,
  Lead,
  List,
  Muted,
  P,
  Prose,
  Small,
} from "@/components/ui/typography"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const typographyControlDefs = {
  heading: {
    type: "select" as const,
    options: ["H1", "H2", "H3", "H4"],
    defaultValue: "H1",
    label: "Heading",
  },
  text: {
    type: "text" as const,
    defaultValue: "The quick brown fox",
    label: "Text",
  },
  proseSize: {
    type: "radio" as const,
    options: ["sm", "default", "lg"],
    defaultValue: "default",
    label: "Prose Size",
  },
} satisfies ControlDefs

const headingComponents = { H1, H2, H3, H4 } as const

export default function TypographyPreview() {
  const controls = useControls(typographyControlDefs)
  const { heading, text, proseSize } = controls.values
  const HeadingComponent = headingComponents[heading as keyof typeof headingComponents]
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <div className="w-full space-y-4">
          <HeadingComponent>{text}</HeadingComponent>
          <Prose size={proseSize as "default"} className="rounded-lg border p-6">
            <h2>Prose Container</h2>
            <p>
              The Prose component applies consistent typography styles to all child elements —
              headings, paragraphs, lists, links, code, and tables.
            </p>
            <ul>
              <li>Automatic spacing between elements</li>
              <li>
                Styled <a href="#">links</a> and <strong>bold text</strong>
              </li>
              <li>
                Inline <code>code</code> formatting
              </li>
            </ul>
          </Prose>
        </div>
      </Playground>
      <Section title="Headings">
        <div className="w-full space-y-4">
          <H1>Heading One</H1>
          <H2>Heading Two</H2>
          <H3>Heading Three</H3>
          <H4>Heading Four</H4>
        </div>
      </Section>
      <Section title="Text Variants">
        <div className="w-full space-y-4">
          <Lead>This is a lead paragraph with larger, muted text.</Lead>
          <P>This is a regular paragraph with comfortable line height for readability.</P>
          <Large>Large emphasis text</Large>
          <Small>Small label text</Small>
          <Muted>Muted helper text for secondary information.</Muted>
          <P>
            Use <InlineCode>InlineCode</InlineCode> for code references in text.
          </P>
        </div>
      </Section>
      <Section title="Blockquote & List">
        <div className="w-full space-y-4">
          <Blockquote>
            &ldquo;Design is not just what it looks like. Design is how it works.&rdquo;
          </Blockquote>
          <List>
            <li>First unordered item</li>
            <li>Second unordered item</li>
            <li>Third unordered item</li>
          </List>
          <List ordered>
            <li>First ordered item</li>
            <li>Second ordered item</li>
            <li>Third ordered item</li>
          </List>
        </div>
      </Section>
    </div>
  )
}
