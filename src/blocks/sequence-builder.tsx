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
import { GripVertical, Plus, Trash2 } from "lucide-react"
import type * as React from "react"
import { Button } from "../components/button"
import { cn } from "../lib/utils"

type SequenceStep = {
  id: string
  title?: React.ReactNode
  content: React.ReactNode
}

type SequenceBuilderProps = {
  steps: SequenceStep[]
  onStepsChange: (steps: SequenceStep[]) => void
  onAddStep?: (index: number) => void
  onRemoveStep?: (id: string) => void
  className?: string
}

function SequenceBuilder({
  steps,
  onStepsChange,
  onAddStep,
  onRemoveStep,
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
      {/* Continuous vertical guide line behind the cards. Aligned to the centre
          of the step number badge: drag handle (24px) + gap (8px) + half of
          card padding-left (16px) + half of badge (14px) ≈ 44px from the
          left edge of the builder. */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 bottom-0 left-[44px] z-0 w-px bg-border"
      />
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={steps.map((s) => s.id)} strategy={verticalListSortingStrategy}>
          {onAddStep && <InsertButton onClick={() => onAddStep(0)} />}
          {steps.map((step, index) => (
            <div key={step.id} className="contents">
              <SortableStep
                step={step}
                index={index}
                onRemove={onRemoveStep ? () => onRemoveStep(step.id) : undefined}
              />
              {onAddStep && <InsertButton onClick={() => onAddStep(index + 1)} />}
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
  onRemove?: () => void
}

function SortableStep({ step, index, onRemove }: SortableStepProps) {
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
      className="group/sequence-step relative z-10 flex items-start gap-2"
    >
      <button
        type="button"
        data-slot="sequence-builder-drag-handle"
        className={cn(
          "mt-4 flex size-6 shrink-0 cursor-grab items-center justify-center rounded text-muted-foreground/40 opacity-0 transition-opacity",
          "hover:text-muted-foreground focus-visible:opacity-100 group-hover/sequence-step:opacity-100",
          "active:cursor-grabbing",
        )}
        aria-label={`Drag step ${index + 1}`}
        {...attributes}
        {...listeners}
      >
        <GripVertical className="size-4" aria-hidden />
      </button>
      <div className="min-w-0 flex-1 rounded-lg border border-border bg-card p-4">
        <div className="mb-3 flex items-center gap-3">
          <div
            data-slot="sequence-builder-step-number"
            className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted/60 font-mono text-muted-foreground text-xs"
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          {step.title && <div className="min-w-0 flex-1 font-semibold text-sm">{step.title}</div>}
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
}

function InsertButton({ onClick }: InsertButtonProps) {
  return (
    <div data-slot="sequence-builder-insert" className="relative z-10 flex justify-start py-2">
      <button
        type="button"
        onClick={onClick}
        className={cn(
          "ml-[30px] flex size-7 items-center justify-center rounded-md border border-border bg-card text-muted-foreground shadow-xs transition-colors",
          "hover:border-focal hover:text-focal",
          "focus-visible:border-focal focus-visible:text-focal focus-visible:outline-none",
        )}
        aria-label="Insert step here"
      >
        <Plus className="size-4" />
      </button>
    </div>
  )
}

export { SequenceBuilder }
export type { SequenceBuilderProps, SequenceStep }
