"use client"

import { BgShader } from "@/components/ui/bg-shader"

export default function BgShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <BgShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over shader</p>
      </div>
    </div>
  )
}
