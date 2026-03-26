"use client"

import { AsciiShader } from "@/components/ui/ascii-shader"

export default function AsciiShaderPreview() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg border">
      <AsciiShader />
      <div className="relative z-10 flex h-full items-center justify-center">
        <p className="font-semibold text-lg">Content over ASCII shader</p>
      </div>
    </div>
  )
}
