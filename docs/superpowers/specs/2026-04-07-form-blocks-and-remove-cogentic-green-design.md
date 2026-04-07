# Form Blocks + Remove `cogentic-green`

**Status:** Approved
**Date:** 2026-04-07

## Goals

1. Replace the existing monolithic `AuthForm` block with five focused, single-purpose blocks for the auth flow.
2. Standardise form validation across the design system on `react-hook-form` + `zod` (as peer dependencies).
3. Remove the brand-specific `--cogentic-green` token in favour of `--primary`, so the DS is fully neutral and consumers theme via standard semantic tokens.

This is a breaking change. The package is pre-1.0 (currently `0.7.0`) and will bump to `0.8.0`.

## Non-goals

- Building auth backend logic, session handling, or routing — blocks are presentational and call user-supplied `onSubmit` handlers.
- Adding generic form primitives beyond what these auth blocks need. The shared helper is internal.
- Migrating other DS components to react-hook-form. Only the new auth blocks use it.
- Preserving the existing `page-cta` brand-green look. The visual change to `--primary` is accepted.

## Architecture

### Peer dependencies

Add to `package.json`:

```json
"peerDependencies": {
  "react-hook-form": "^7.0.0",
  "zod": "^3.23.0",
  "@hookform/resolvers": "^3.0.0"
},
"peerDependenciesMeta": {
  "react-hook-form": { "optional": true },
  "zod": { "optional": true },
  "@hookform/resolvers": { "optional": true }
}
```

These are also added to `devDependencies` so the package can build, type-check, and test.

Tree-shaking is preserved by the existing per-component subpath exports — consumers who don't import auth blocks will not pull react-hook-form into their bundle.

### Shared internal helper — `src/blocks/_form.tsx`

Internal-only (not exported from `src/index.ts`). Provides:

- `useZodForm<TSchema>(schema, defaultValues)` — wraps `useForm` with `zodResolver`. Returns the standard react-hook-form `UseFormReturn`.
- `<FormField>` — bound field renderer that takes `{ form, name, label, type?, placeholder?, autoComplete? }` and renders `Label` + `Input` + inline error message using existing DS components (`Label`, `Input`). Pulls error from `form.formState.errors[name]`.

The helper exists to keep the five auth blocks small and consistent, and so a future change to error styling or field layout happens in one place.

### Common block contract

Every form block (excluding `MagicLinkMessage`) accepts:

```ts
type FormBlockProps<TSchema extends z.ZodType> = {
  schema?: TSchema
  defaultValues?: Partial<z.infer<TSchema>>
  onSubmit: (values: z.infer<TSchema>) => void | Promise<void>
  loading?: boolean
  logo?: React.ReactNode
  title?: string
  description?: string
  footer?: React.ReactNode
  className?: string
}
```

Behaviours:

- Wraps content in `Card` / `CardHeader` / `CardContent` / `CardFooter`.
- Sets `data-slot="<block-name>"` on the root.
- Submit button is disabled when `loading || form.formState.isSubmitting`.
- Inline field errors render below each field; no toast or summary banner.
- Each block exports its **default zod schema** alongside the component (e.g. `loginSchema`) so consumers can extend it via `.extend()` or `.merge()`.

## The five blocks

### 1. `LoginForm`

- File: `src/blocks/login-form.tsx`
- Default schema: `loginSchema = z.object({ email: z.string().email(), password: z.string().min(1) })`
- Extra props:
  - `socialButtons?: React.ReactNode` — slot rendered below the submit, with an "Or continue with" divider.
  - `forgotPasswordHref?: string` — when set, renders a "Forgot password?" link beside the password label.
- Default copy: title "Welcome back", description "Enter your credentials to sign in", submit "Sign in".

### 2. `RegisterForm`

- File: `src/blocks/register-form.tsx`
- Default schema: `registerSchema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(8) })`
- Extra props:
  - `socialButtons?: React.ReactNode`
  - `termsHref?: string` — when set, renders a required Terms checkbox row above the submit, with a link to the terms page. The schema is augmented to include `acceptTerms: z.literal(true)` only when this prop is set (handled inside the component by merging schemas).
- Default copy: title "Create an account", description "Enter your details to get started", submit "Create account".

### 3. `ForgotPasswordForm`

- File: `src/blocks/forgot-password-form.tsx`
- Default schema: `forgotPasswordSchema = z.object({ email: z.string().email() })`
- No extra props beyond the common contract.
- Default copy: title "Forgot password", description "Enter your email to receive a reset link", submit "Send reset link".

### 4. `SelectOrgForm`

- File: `src/blocks/select-org-form.tsx`
- Default schema: `selectOrgSchema = z.object({ organizationId: z.string().min(1) })`
- Extra props:
  - `organizations: Org[]` where `Org = { id: string; name: string; logo?: React.ReactNode; role?: string; memberCount?: number }`
  - `variant?: "list" | "search"` — defaults to `list` when `organizations.length <= 10`, otherwise `search`. Explicit prop overrides the auto-pick.
- Variants:
  - **`list`** — vertical radio list, each row shows `logo` (or generated avatar fallback), `name`, and either `role` or `memberCount` if provided. Single-select.
  - **`search`** — uses the existing `Command` component as a filterable palette. Selecting a row sets `organizationId` in the form state.
- Submit button text: "Continue".
- Default copy: title "Select an organization", description "Choose which workspace to use".

### 5. `MagicLinkMessage`

- File: `src/blocks/magic-link-message.tsx`
- **Not** a `useForm`-backed block — it is a confirmation/status screen.
- Props:
  ```ts
  type MagicLinkMessageProps = {
    email: string
    onResend?: () => void | Promise<void>
    onBack?: () => void
    resendCooldownSeconds?: number   // default 30
    logo?: React.ReactNode
    title?: string
    description?: string
    className?: string
  }
  ```
- Renders: icon (lucide `Mail`), title ("Check your email"), description with the email rendered prominently, "Resend email" button, and a "Use a different email" link.
- Resend behaviour: clicking "Resend" calls `onResend`, then disables the button and shows a countdown ("Resend in 30s") for `resendCooldownSeconds`. Internal state only — no external `status` prop.
- `data-slot="magic-link-message"`.

## Removals (breaking)

- Delete `src/blocks/auth-form.tsx`.
- Delete `src/blocks/__tests__/auth-form.test.tsx` if it exists.
- Remove `AuthForm`, `AuthFormProps`, `AuthFormVariant` from `src/index.ts` and from any sub-barrel.
- Remove the auth-form preview file under `app/blocks/auth-form/` and its sidebar entry in `app/preview-shell.tsx`.
- Remove the `auth-form` entry from `app/component-meta.ts`.
- Remove `auth-form` from `skills/ds-expert/SKILL.md`.

## `cogentic-green` removal

Replace all usages with `--primary` / `bg-primary` / `text-primary-foreground`.

Files to edit:

1. `src/styles/globals.css` — delete `--cogentic-green` and any `--color-cogentic-green` lines in both `:root` and `.dark`.
2. `src/blocks/page-cta.tsx` — replace `bg-cogentic-green` (and any paired text color) with `bg-primary text-primary-foreground`.
3. `app/globals.css` — remove the token reference.
4. `app/foundations/colors/page.tsx` — remove the green swatch entry.
5. `app/foundations/tokens/page.tsx` — remove the green token row.
6. `CLAUDE.md` — remove the "Brand" line from the Design Tokens section.
7. `README.md` — remove the brand mention.
8. `skills/ds-expert/SKILL.md` — remove the brand color guidance.

After the swap, run `pnpm dev` and visually check `page-cta` and any preview pages — confirm the new `--primary` look is intentional.

## Per-block deliverables (CLAUDE.md "New Component Checklist")

For each of the five new blocks:

1. **Source file** in `src/blocks/` with named exports, `data-slot`, `cn()` merging, light/dark support, accessible markup, exported props type, exported default schema.
2. **Test file** in `src/blocks/__tests__/<name>.test.tsx` covering:
   - Renders without crashing
   - All variants/states (where applicable)
   - Validation error displays for invalid input
   - Successful submit calls `onSubmit` with parsed values
   - `className` override merges via `cn()`
   - Keyboard submit (Enter in last field)
   - `vitest-axe` a11y check
3. **Preview** in `app/blocks/<slug>/previews.tsx` using `useControls` + `<Playground>` for `loading`, `socialButtons` toggle, `variant` (where applicable), and static `<Section>` examples for error and loading states.
4. **Sidebar entry** in `app/preview-shell.tsx` under the Blocks group with an appropriate lucide icon.
5. **Metadata** in `app/component-meta.ts` with `status: "new"`, description, `since: "0.8.0"`, import statement, dos/donts, and a code example showing schema customisation.
6. **Skill entry** in `skills/ds-expert/SKILL.md` under the blocks section with signature, description, and category.
7. **Barrel export** in `src/index.ts` (component, props type, default schema).

## Build verification

Before merging:

- `pnpm build:pkg` succeeds (tsup ESM + types)
- `pnpm test` passes (all five new test files green, removed `auth-form` test gone)
- `pnpm lint` passes (Biome)
- `next build` succeeds for the preview app
- Manual visual check of `page-cta` and all five new block previews in light and dark mode

## Versioning

Bump `package.json` version from `0.7.0` → `0.8.0`. Note breaking changes in the changelog: removal of `AuthForm`, removal of `--cogentic-green` token, addition of new peer deps.

## Risks

- **Peer dep friction**: Consumers not using auth blocks may still see peer warnings. Mitigated by `peerDependenciesMeta.optional = true`.
- **`page-cta` visual change**: `--primary` is more neutral than the brand green. Accepted by user.
- **Schema extension ergonomics**: Consumers extending the default schema with `.extend()` need to keep the field names stable. Documented in each block's metadata code example.
