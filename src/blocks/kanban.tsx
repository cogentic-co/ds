"use client"

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  type DragOverEvent,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import type { ComponentProps, ReactNode } from "react"
import { Badge } from "../components/badge"
import { cn } from "../lib/utils"

type KanbanCard = {
  id: string
  columnId: string
  content: ReactNode
}

type KanbanColumn = {
  id: string
  title: string
  /** Optional accent color class for the column header (e.g. "text-focal") */
  accent?: string
  /** Optional icon rendered before the title */
  icon?: ReactNode
  /** Max cards allowed. Shows count / max if set. */
  limit?: number
}

type KanbanProps = ComponentProps<"div"> & {
  columns: KanbanColumn[]
  cards: KanbanCard[]
  /** Called when a card is moved to a new column or position */
  onCardsChange: (cards: KanbanCard[]) => void
  /** Render-prop wrapper for each card (e.g. make cards clickable) */
  renderCard?: (card: KanbanCard) => ReactNode
}

function Kanban({ columns, cards, onCardsChange, renderCard, className, ...props }: KanbanProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 4 },
    }),
  )

  function moveCard(activeId: string, overId: string) {
    const active = cards.find((c) => c.id === activeId)
    if (!active) return cards
    const overCard = cards.find((c) => c.id === overId)
    const overColumn = columns.find((col) => col.id === overId)

    const targetColumnId = overCard?.columnId ?? overColumn?.id ?? active.columnId
    if (active.columnId === targetColumnId && !overCard) return cards

    const without = cards.filter((c) => c.id !== activeId)
    const updated = { ...active, columnId: targetColumnId }

    if (overCard) {
      const overIndex = without.findIndex((c) => c.id === overId)
      return [...without.slice(0, overIndex), updated, ...without.slice(overIndex)]
    }
    return [...without, updated]
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const next = moveCard(active.id as string, over.id as string)
    if (next !== cards) onCardsChange(next)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over || active.id === over.id) return
    const next = moveCard(active.id as string, over.id as string)
    if (next !== cards) onCardsChange(next)
  }

  return (
    <div data-slot="kanban" className={cn("flex gap-4 overflow-x-auto pb-2", className)} {...props}>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        {columns.map((column) => {
          const columnCards = cards.filter((c) => c.columnId === column.id)
          return (
            <KanbanColumnView
              key={column.id}
              column={column}
              cards={columnCards}
              renderCard={renderCard}
            />
          )
        })}
      </DndContext>
    </div>
  )
}

function KanbanColumnView({
  column,
  cards,
  renderCard,
}: {
  column: KanbanColumn
  cards: KanbanCard[]
  renderCard?: (card: KanbanCard) => ReactNode
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column.id })

  return (
    <div
      data-slot="kanban-column"
      data-over={isOver || undefined}
      className={cn(
        "flex w-72 shrink-0 flex-col gap-2 rounded-lg bg-muted/40 p-2",
        isOver && "bg-muted/70",
      )}
    >
      <div className="flex items-center justify-between px-2 py-1">
        <div className={cn("flex items-center gap-1.5 font-semibold text-sm", column.accent)}>
          {column.icon}
          {column.title}
          <Badge square variant="secondary" className="text-[10px]">
            {column.limit ? `${cards.length}/${column.limit}` : cards.length}
          </Badge>
        </div>
      </div>
      <div ref={setNodeRef} className="flex min-h-20 flex-col gap-2">
        <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          {cards.map((card) => (
            <KanbanCardView key={card.id} card={card} renderCard={renderCard} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

function KanbanCardView({
  card,
  renderCard,
}: {
  card: KanbanCard
  renderCard?: (card: KanbanCard) => ReactNode
}) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: card.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform) ?? undefined,
        transition,
        opacity: isDragging ? 0.5 : 1,
      }}
      data-slot="kanban-card"
      className="cursor-grab active:cursor-grabbing"
      {...attributes}
      {...listeners}
    >
      {renderCard ? renderCard(card) : card.content}
    </div>
  )
}

export type { KanbanCard, KanbanColumn, KanbanProps }
export { Kanban }
