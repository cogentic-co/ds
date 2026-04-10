"use client"

import { Plus, Trash2 } from "lucide-react"
import { type ComponentProps, useCallback } from "react"
import { Button } from "../components/button"
import { Input } from "../components/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/select"
import { cn } from "../lib/utils"

type RuleOperator = "equals" | "not_equals" | "greater_than" | "less_than" | "contains" | "in"

type RuleCondition = {
  id: string
  field: string
  operator: RuleOperator
  value: string
}

type RuleGroup = {
  id: string
  logic: "and" | "or"
  conditions: RuleCondition[]
}

type RuleBuilderField = {
  value: string
  label: string
}

type RuleBuilderProps = ComponentProps<"div"> & {
  groups: RuleGroup[]
  onGroupsChange: (groups: RuleGroup[]) => void
  /** Available fields for condition dropdowns */
  fields: RuleBuilderField[]
  /** Max groups allowed. Default: 10 */
  maxGroups?: number
  /** Max conditions per group. Default: 10 */
  maxConditions?: number
}

const OPERATORS: { value: RuleOperator; label: string }[] = [
  { value: "equals", label: "equals" },
  { value: "not_equals", label: "not equals" },
  { value: "greater_than", label: "greater than" },
  { value: "less_than", label: "less than" },
  { value: "contains", label: "contains" },
  { value: "in", label: "in" },
]

function RuleBuilder({
  groups,
  onGroupsChange,
  fields,
  maxGroups = 10,
  maxConditions = 10,
  className,
  ...props
}: RuleBuilderProps) {
  const updateGroup = useCallback(
    (groupId: string, patch: Partial<RuleGroup>) => {
      onGroupsChange(
        groups.map((g) => (g.id === groupId ? { ...g, ...patch } : g)),
      )
    },
    [groups, onGroupsChange],
  )

  const addGroup = useCallback(() => {
    if (groups.length >= maxGroups) return
    onGroupsChange([
      ...groups,
      {
        id: `group-${Date.now()}`,
        logic: "and",
        conditions: [{ id: `cond-${Date.now()}`, field: fields[0]?.value ?? "", operator: "equals", value: "" }],
      },
    ])
  }, [groups, onGroupsChange, fields, maxGroups])

  const removeGroup = useCallback(
    (groupId: string) => {
      onGroupsChange(groups.filter((g) => g.id !== groupId))
    },
    [groups, onGroupsChange],
  )

  const addCondition = useCallback(
    (groupId: string) => {
      const group = groups.find((g) => g.id === groupId)
      if (!group || group.conditions.length >= maxConditions) return
      updateGroup(groupId, {
        conditions: [
          ...group.conditions,
          { id: `cond-${Date.now()}`, field: fields[0]?.value ?? "", operator: "equals", value: "" },
        ],
      })
    },
    [groups, updateGroup, fields, maxConditions],
  )

  const removeCondition = useCallback(
    (groupId: string, condId: string) => {
      const group = groups.find((g) => g.id === groupId)
      if (!group) return
      updateGroup(groupId, {
        conditions: group.conditions.filter((c) => c.id !== condId),
      })
    },
    [groups, updateGroup],
  )

  const updateCondition = useCallback(
    (groupId: string, condId: string, patch: Partial<RuleCondition>) => {
      const group = groups.find((g) => g.id === groupId)
      if (!group) return
      updateGroup(groupId, {
        conditions: group.conditions.map((c) => (c.id === condId ? { ...c, ...patch } : c)),
      })
    },
    [groups, updateGroup],
  )

  return (
    <div
      data-slot="rule-builder"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    >
      {groups.map((group, gi) => (
        <div key={group.id} className="flex flex-col gap-2 rounded-lg border border-border p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {gi > 0 && (
                <span className="font-mono text-muted-foreground text-[10px] uppercase">OR</span>
              )}
              <Select
                value={group.logic}
                onValueChange={(v) => updateGroup(group.id, { logic: v as "and" | "or" })}
              >
                <SelectTrigger className="h-7 w-20 text-[11px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="and">AND</SelectItem>
                  <SelectItem value="or">OR</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-muted-foreground text-xs">group</span>
            </div>
            <Button
              variant="ghost"
              size="icon-xs"
              onClick={() => removeGroup(group.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="size-3" />
            </Button>
          </div>

          {group.conditions.map((cond, ci) => (
            <div key={cond.id} className="flex items-center gap-2">
              {ci > 0 && (
                <span className="w-8 shrink-0 text-center font-mono text-muted-foreground text-[10px] uppercase">
                  {group.logic}
                </span>
              )}
              {ci === 0 && <span className="w-8 shrink-0" />}
              <Select
                value={cond.field}
                onValueChange={(v) => v && updateCondition(group.id, cond.id, { field: v })}
              >
                <SelectTrigger className="h-8 w-32 text-xs">
                  <SelectValue placeholder="Field" />
                </SelectTrigger>
                <SelectContent>
                  {fields.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select
                value={cond.operator}
                onValueChange={(v) => updateCondition(group.id, cond.id, { operator: v as RuleOperator })}
              >
                <SelectTrigger className="h-8 w-28 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {OPERATORS.map((op) => (
                    <SelectItem key={op.value} value={op.value}>
                      {op.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                value={cond.value}
                onChange={(e) => updateCondition(group.id, cond.id, { value: e.target.value })}
                placeholder="Value"
                className="h-8 flex-1 font-mono text-xs"
              />
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={() => removeCondition(group.id, cond.id)}
                className="text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="size-3" />
              </Button>
            </div>
          ))}

          <Button
            variant="ghost"
            size="sm"
            onClick={() => addCondition(group.id)}
            className="w-fit text-xs"
          >
            <Plus className="mr-1 size-3" />
            Add condition
          </Button>
        </div>
      ))}

      <Button variant="outline" size="sm" onClick={addGroup} className="w-fit">
        <Plus className="mr-1 size-3.5" />
        Add group
      </Button>
    </div>
  )
}

export { RuleBuilder }
export type { RuleBuilderField, RuleBuilderProps, RuleCondition, RuleGroup, RuleOperator }
