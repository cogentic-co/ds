"use client"

import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp"
import { type ControlDefs, Playground, useControls } from "./_shared"

const inputOTPControlDefs = {
  maxLength: {
    type: "number" as const,
    defaultValue: 6,
    min: 4,
    max: 8,
    step: 1,
    label: "Max length",
  },
} satisfies ControlDefs

export default function InputOTPPreview() {
  const controls = useControls(inputOTPControlDefs)
  const half = Math.floor(controls.values.maxLength / 2)

  return (
    <div className="space-y-6">
      <Playground controls={controls}>
        <div className="flex items-center justify-center py-4">
          <InputOTP key={controls.values.maxLength} maxLength={controls.values.maxLength}>
            <InputOTPGroup>
              {Array.from({ length: half }, (_, i) => (
                <InputOTPSlot key={i} index={i} />
              ))}
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              {Array.from({ length: controls.values.maxLength - half }, (_, i) => (
                <InputOTPSlot key={half + i} index={half + i} />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Playground>
    </div>
  )
}
