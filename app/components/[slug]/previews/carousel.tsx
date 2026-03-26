"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { type ControlDefs, Playground, useControls } from "./_shared"

const carouselControlDefs = {
  orientation: {
    type: "radio" as const,
    options: ["horizontal", "vertical"],
    defaultValue: "horizontal",
    label: "Orientation",
  },
} satisfies ControlDefs

export default function CarouselPreview() {
  const controls = useControls(carouselControlDefs)

  return (
    <div className="mx-auto max-w-xs space-y-6">
      <Playground controls={controls}>
        <Carousel orientation={controls.values.orientation as "horizontal"}>
          <CarouselContent>
            {Array.from({ length: 5 }, (_, i) => (
              <CarouselItem key={i}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="font-semibold text-3xl">{i + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </Playground>
    </div>
  )
}
