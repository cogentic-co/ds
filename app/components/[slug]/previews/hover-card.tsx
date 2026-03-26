"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

export default function HoverCardPreview() {
  return (
    <HoverCard>
      <HoverCardTrigger
        render={<a href="#" className="font-medium text-sm underline underline-offset-4" />}
      >
        @cogentic
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex gap-4">
          <Avatar>
            <AvatarFallback>CG</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="font-medium text-sm">Cogentic</h4>
            <p className="text-muted-foreground text-sm">Design system and component library.</p>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
