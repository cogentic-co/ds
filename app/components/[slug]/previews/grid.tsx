"use client"

import { Col, Grid } from "@/components/ui/grid"
import { type ControlDefs, Playground, Section, useControls } from "./_shared"

const gridControlDefs = {
  cols: {
    type: "number" as const,
    defaultValue: 3,
    min: 1,
    max: 6,
    label: "Columns",
  },
  gap: {
    type: "number" as const,
    defaultValue: 4,
    min: 0,
    max: 12,
    label: "Gap",
  },
} satisfies ControlDefs

export default function GridPreview() {
  const controls = useControls(gridControlDefs)
  const { cols, gap } = controls.values
  return (
    <div className="space-y-8">
      <Playground controls={controls}>
        <Grid cols={cols} gap={gap} className="w-full">
          {Array.from({ length: 6 }, (_, i) => (
            <Col key={i} className="rounded-md border bg-muted/50 p-4 text-center text-sm">
              Col {i + 1}
            </Col>
          ))}
        </Grid>
      </Playground>
      <Section title="Spanning Columns">
        <Grid cols={4} gap={4} className="w-full">
          <Col span={2} className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Span 2
          </Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Col 3</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Col 4</Col>
          <Col span="full" className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Span Full
          </Col>
        </Grid>
      </Section>
      <Section title="Row Spanning">
        <Grid cols={3} rows={2} gap={4} className="w-full">
          <Col rowSpan={2} className="rounded-md border bg-primary/10 p-4 text-center text-sm">
            Row Span 2
          </Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
          <Col className="rounded-md border bg-muted/50 p-4 text-center text-sm">Cell</Col>
        </Grid>
      </Section>
    </div>
  )
}
