"use client"

import { FilterBar, FilterChip, FilterClear } from "@/components/ui/filter-bar"
import { Section } from "./_shared"

export default function FilterBarPreview() {
  return (
    <div className="space-y-8">
      <Section title="With Active Filters">
        <FilterBar>
          <FilterChip label="Status" value="Under Review" onRemove={() => {}} />
          <FilterChip label="Risk Level" value="High" onRemove={() => {}} />
          <FilterChip label="Date Range" value="Mar 1 – Mar 15" onRemove={() => {}} />
          <FilterClear onClick={() => {}} />
        </FilterBar>
      </Section>
      <Section title="No Selection (placeholder)">
        <FilterBar>
          <FilterChip label="Status" />
          <FilterChip label="Risk Level" />
          <FilterChip label="Assignee" />
        </FilterBar>
      </Section>
      <Section title="Mixed States">
        <FilterBar>
          <FilterChip label="Status" value="Flagged" onRemove={() => {}} />
          <FilterChip label="Jurisdiction" />
          <FilterChip label="Entity Type" value="VASP" onRemove={() => {}} />
          <FilterClear onClick={() => {}} />
        </FilterBar>
      </Section>
    </div>
  )
}
