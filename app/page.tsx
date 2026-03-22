export default function Home() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-bold text-3xl tracking-tight">Cogentic Design System</h1>
      <p className="mt-2 text-muted-foreground">
        56 components built on Base UI primitives with Tailwind CSS v4 and OKLch design tokens.
      </p>

      <div className="mt-6 grid gap-4">
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Install</h2>
          <code className="mt-2 block rounded bg-muted px-3 py-2 font-mono text-sm">
            pnpm add @cogentic-co/ds
          </code>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Import styles</h2>
          <code className="mt-2 block rounded bg-muted px-3 py-2 font-mono text-sm">
            {`@import "@cogentic-co/ds/styles.css";`}
          </code>
        </div>
        <div className="rounded-lg border p-4">
          <h2 className="font-semibold">Use components</h2>
          <code className="mt-2 block rounded bg-muted px-3 py-2 font-mono text-sm">
            {`import { Button } from "@cogentic-co/ds"`}
          </code>
        </div>
      </div>
      <p className="mt-8 text-muted-foreground text-sm">
        Browse components in the sidebar to see live previews.
      </p>
    </div>
  )
}
