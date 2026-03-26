"use client"

import { BlockyShader } from "@/components/ui/blocky-shader"

export default function BlockyShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <BlockyShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over blocky shader</p>
      </div>
    </div>
  )
}
