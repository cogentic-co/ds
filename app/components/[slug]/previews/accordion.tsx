"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { type ControlDefs, Playground, useControls } from "./_shared"

const accordionControlDefs = {
  multiple: {
    type: "boolean" as const,
    defaultValue: false,
    label: "Multiple",
  },
} satisfies ControlDefs

export default function AccordionPreview() {
  const controls = useControls(accordionControlDefs)

  return (
    <div className="max-w-md space-y-6">
      <Playground controls={controls}>
        <Accordion key={String(controls.values.multiple)} multiple={controls.values.multiple}>
          <AccordionItem value="item-1">
            <AccordionTrigger>Is it accessible?</AccordionTrigger>
            <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it styled?</AccordionTrigger>
            <AccordionContent>
              Yes. It comes with default styles using Tailwind CSS.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>Is it animated?</AccordionTrigger>
            <AccordionContent>
              Yes. It uses CSS animations for smooth open/close transitions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Playground>
    </div>
  )
}
