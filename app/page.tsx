export default function Home() {
  return (
    <div className="max-w-2xl">
      <h1 className="font-bold text-3xl tracking-tight">Cogentic Design System</h1>
      <p className="mt-2 text-muted-foreground">
        56 components built on Base UI primitives with Tailwind CSS v4 and OKLch design tokens.
      </p>

      <div className="mt-8 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4">
        <h2 className="font-semibold text-amber-600 dark:text-amber-400">
          First-time setup (one-time)
        </h2>
        <p className="mt-1 text-muted-foreground text-sm">
          The package is published to GitHub Packages (private). Authenticate once using the GitHub
          CLI:
        </p>
        <div className="mt-3 space-y-2">
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">gh auth login</code>
          <code className="block rounded bg-muted px-3 py-2 font-mono text-sm">
            npm login --scope=@cogentic-co --registry=https://npm.pkg.github.com
          </code>
        </div>
        <p className="mt-2 text-muted-foreground text-sm">
          When prompted, use your GitHub username and paste the output of{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">gh auth token</code> as
          the password.
        </p>
        <p className="mt-2 text-muted-foreground text-sm">
          For CI/Vercel, use a classic PAT with{" "}
          <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">read:packages</code>{" "}
          scope. See the README for full details.
        </p>
      </div>

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
