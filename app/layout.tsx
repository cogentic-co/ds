import type { Metadata } from "next"
import "./globals.css"
import { fontMono, fontSans } from "@/src/lib/fonts"
import { PreviewShell } from "./preview-shell"

export const metadata: Metadata = {
  title: "Cogentic Design System",
  description: "Component showcase for the Cogentic design system",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <PreviewShell>{children}</PreviewShell>
      </body>
    </html>
  )
}
