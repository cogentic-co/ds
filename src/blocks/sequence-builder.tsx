"use client"

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { cva, type VariantProps } from "class-variance-authority"
import { GripVertical, Plus, Trash2 } from "lucide-react"
import type * as React from "react"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

type SequenceStep = {
  id: string
  title?: React.ReactNode
  content: React.ReactNode
}

type SequenceBuilderSize = NonNullable<VariantProps<typeof stepRootVariants>["size"]>

// Vertical guide line behind the cards, aligned to the centre of the step
// number badge. Offsets tuned per size variant so the line threads through
// both the badge and the insert button centres.
const guideLineVariants = cva("pointer-events-none absolute z-0 w-px bg-border", {
  variants: {
    size: {
      sm: "top-[18px] bottom-[18px] left-[38px]",
      md: "top-[22px] bottom-[22px] left-[44px]",
    },
  },
  defaultVariants: { size: "md" },
})

const stepRootVariants = cva("group/sequence-step relative z-10 flex items-start", {
  variants: {
    size: {
      sm: "gap-1",
      md: "gap-2",
    },
  },
  defaultVariants: { size: "md" },
})

const dragHandleVariants = cva(
  [
    "flex size-6 shrink-0 cursor-grab items-center justify-center rounded text-muted-foreground/40 opacity-0 transition-opacity",
    "hover:text-muted-foreground focus-visible:opacity-100 group-hover/sequence-step:opacity-100",
    "active:cursor-grabbing",
  ],
  {
    variants: {
      size: {
        sm: "mt-2.5",
        md: "mt-4",
      },
    },
    defaultVariants: { size: "md" },
  },
)

const stepCardVariants = cva("min-w-0 flex-1 rounded-lg border border-border bg-card", {
  variants: {
    size: {
      sm: "p-3",
      md: "p-4",
    },
  },
  defaultVariants: { size: "md" },
})

const stepHeaderVariants = cva("flex items-center", {
  variants: {
    size: {
      sm: "mb-2 gap-2",
      md: "mb-3 gap-3",
    },
  },
  defaultVariants: { size: "md" },
})

const stepNumberVariants = cva(
  "flex shrink-0 items-center justify-center rounded-md bg-muted/60 font-mono text-muted-foreground",
  {
    variants: {
      size: {
        sm: "size-6 text-[10px]",
        md: "size-7 text-xs",
      },
    },
    defaultVariants: { size: "md" },
  },
)

const stepTitleVariants = cva("min-w-0 flex-1 font-semibold", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: { size: "md" },
})

const insertWrapperVariants = cva("relative z-10 flex justify-start", {
  variants: {
    size: {
      sm: "py-1.5",
      md: "py-2",
    },
  },
  defaultVariants: { size: "md" },
})

const insertButtonVariants = cva(
  [
    "flex items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-xs transition-colors",
    "hover:border-focal hover:text-focal",
    "focus-visible:border-focal focus-visible:text-focal focus-visible:outline-none",
  ],
  {
    variants: {
      size: {
        sm: "ml-[26px] size-6",
        md: "ml-[30px] size-7",
      },
    },
    defaultVariants: { size: "md" },
  },
)

type SequenceBuilderProps = {
  steps: SequenceStep[]
  onStepsChange: (steps: SequenceStep[]) => void
  onAddStep?: (index: number) => void
  onRemoveStep?: (id: string) => void
  /** Visual size. "sm" uses tighter padding for dense panels like inspectors. Default: "md" */
  size?: SequenceBuilderSize
  className?: string
}

function SequenceBuilder({
  steps,
  onStepsChange,
  onAddStep,
  onRemoveStep,
  size = "md",
  className,
}: SequenceBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const oldIndex = steps.findIndex((s) => s.id === active.id)
    const newIndex = steps.findIndex((s) => s.id === over.id)
    if (oldIndex < 0 || newIndex < 0) return
    onStepsChange(arrayMove(steps, oldIndex, newIndex))
  }

  return (
    <div data-slot="sequence-builder" className={cn("relative flex flex-col", className)}>
      <div aria-hidden className={guideLineVariants({ size })} />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {onAddStep && <InsertButton onClick={() => onAddStep(0)} size={size} />}
          {steps.map((step, index) => (
            <div key={step.id} className="contents">
              <SortableStep
                step={step}
                index={index}
                size={size}
                onRemove={onRemoveStep ? () => onRemoveStep(step.id) : undefined}
              />
              {onAddStep && <InsertButton onClick={() => onAddStep(index + 1)} size={size} />}
            </div>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  )
}

type SortableStepProps = {
  step: SequenceStep
  index: number
  size: SequenceBuilderSize
  onRemove?: () => void
}

function SortableStep({ step, index, size, onRemove }: SortableStepProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: step.id,
  })

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform) ?? undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-slot="sequence-builder-step"
      className={stepRootVariants({ size })}
    >
      <button
        type="button"
        data-slot="sequence-builder-drag-handle"
        className={dragHandleVariants({ size })}
        aria-label={`Drag step ${index + 1}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden />
      </button>
      <div className={stepCardVariants({ size })}>
        <div className={stepHeaderVariants({ size })}>
          <div
            data-slot="sequence-builder-step-number"
            className={stepNumberVariants({ size })}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          {step.title && <div className={stepTitleVariants({ size })}>{step.title}</div>}
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="text-muted-foreground/50 opacity-0 transition-opacity hover:text-foreground focus-visible:opacity-100 group-hover/sequence-step:opacity-100"
              onClick={onRemove}
              aria-label={`Remove step ${index + 1}`}
            >
              <Trash2 className="size-4" />
            </Button>
          )}
        </div>
        {step.content}
      </div>
    </div>
  )
}

type InsertButtonProps = {
  onClick: () => void
  size: SequenceBuilderSize
}

function InsertButton({ onClick, size }: InsertButtonProps) {
  return (
    <div data-slot="sequence-builder-insert" className={insertWrapperVariants({ size })}>
      <button
        type="button"
        onClick={onClick}
        className={insertButtonVariants({ size })}
        aria-label="Insert step here"
      >
        <Plus className={size === "sm" ? "size-3.5" : "size-4"} />
      </button>
    </div>
  )
}

export { SequenceBuilder }
export type { SequenceBuilderProps, SequenceBuilderSize, SequenceStep }
