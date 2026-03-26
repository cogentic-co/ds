"use client"

import { LogoVasp } from "@/components/ui/logo-vasp"

export default function LogoVaspPreview() {
  return (
    <div className="flex items-center gap-6">
      <LogoVasp size="sm" />
      <LogoVasp size="default" />
      <LogoVasp size="lg" />
      <LogoVasp size="lg" className="text-muted-foreground" />
    </div>
  )
}
