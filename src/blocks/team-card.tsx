"use client"

import { Linkedin } from "lucide-react"
import Image from "next/image"
import { AspectRatio } from "../components/aspect-ratio"
import { Card, CardContent, CardFooter } from "../components/card"
import { cn } from "../lib/utils"

interface TeamCardProps {
  name: string
  role: string
  imageUrl?: string
  linkedinUrl?: string
  className?: string
}

function TeamCard({ name, role, imageUrl, linkedinUrl, className }: TeamCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card
      data-slot="team-card"
      className={cn("group relative gap-0 overflow-hidden p-0", className)}
    >
      {linkedinUrl && (
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10 block"
        />
      )}
      <CardContent className="p-0">
        <AspectRatio ratio={1} className="overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
              className="block size-full origin-center object-cover object-center transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="flex size-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/20">
              <span className="font-medium text-4xl text-muted-foreground/40">{initials}</span>
            </div>
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="gap-2 px-4 py-2.5">
        <div className="flex-1">
          <div className="font-medium text-sm leading-normal">{name}</div>
          <div className="text-muted-foreground text-xs">{role}</div>
        </div>
        {linkedinUrl && (
          <div className="shrink-0">
            <Linkedin className="size-4 text-muted-foreground" />
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export { TeamCard }
export type { TeamCardProps }
