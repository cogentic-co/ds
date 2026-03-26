"use client"

import { toast } from "sonner"
import { SearchInput } from "@/components/ui/search-input"

type Fruit = { id: string; name: string; emoji: string; color: string }

const fruits: Fruit[] = [
  { id: "1", name: "Apple", emoji: "🍎", color: "Red" },
  { id: "2", name: "Banana", emoji: "🍌", color: "Yellow" },
  { id: "3", name: "Blueberry", emoji: "🫐", color: "Blue" },
  { id: "4", name: "Cherry", emoji: "🍒", color: "Red" },
  { id: "5", name: "Grape", emoji: "🍇", color: "Purple" },
  { id: "6", name: "Kiwi", emoji: "🥝", color: "Green" },
  { id: "7", name: "Mango", emoji: "🥭", color: "Orange" },
  { id: "8", name: "Orange", emoji: "🍊", color: "Orange" },
  { id: "9", name: "Peach", emoji: "🍑", color: "Pink" },
  { id: "10", name: "Strawberry", emoji: "🍓", color: "Red" },
  { id: "11", name: "Watermelon", emoji: "🍉", color: "Green" },
  { id: "12", name: "Pineapple", emoji: "🍍", color: "Yellow" },
]

export default function SearchInputPreview() {
  return (
    <div className="max-w-xl space-y-6">
      <SearchInput<Fruit>
        onSearch={async (query) => {
          await new Promise((r) => setTimeout(r, 300))
          return fruits.filter((f) => f.name.toLowerCase().includes(query.toLowerCase()))
        }}
        renderItem={(item) => (
          <>
            <span className="text-2xl">{item.emoji}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-foreground">{item.name}</div>
              <div className="truncate text-muted-foreground text-sm">{item.color}</div>
            </div>
          </>
        )}
        onSelect={(item) => toast(`Selected: ${item.emoji} ${item.name}`)}
        placeholder="Search fruits..."
      />
    </div>
  )
}
