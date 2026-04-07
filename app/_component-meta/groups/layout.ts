import type { ComponentMeta } from "../index"

// ── Layout ──
export const layoutMeta: Record<string, ComponentMeta> = {
  card: {
    status: "stable",
    description: "Contained surface for grouping related content.",
    since: "0.1.0",
    importStatement:
      'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@cogentic-co/ds/card"',
    dos: [
      "Use CardHeader + CardContent for consistent structure",
      "Use CardAction for top-right actions (settings, close)",
    ],
    donts: ["Don't nest cards inside cards", "Don't overload a single card with too many actions"],
    codeExample: `import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@cogentic-co/ds/card"

<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>
    <Button>Save</Button>
  </CardFooter>
</Card>`,
  },
}
