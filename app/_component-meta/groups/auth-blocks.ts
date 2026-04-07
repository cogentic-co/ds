import type { ComponentMeta } from "../index"

// ── Auth blocks ──
export const authBlocksMeta: Record<string, ComponentMeta> = {
  "login-form": {
    status: "new",
    description:
      "Email/password login block with optional social buttons and forgot-password link. Validation runs through @tanstack/react-form with a zod schema. The default `loginSchema` is exported and can be replaced or extended.",
    since: "0.8.0",
    importStatement: 'import { LoginForm, loginSchema } from "@cogentic-co/ds/blocks/login-form"',
    dos: [
      "Pass an `onSubmit` handler — it receives parsed, type-safe values",
      "Override the default schema with `.extend()` to add custom rules (e.g. enterprise email domain)",
      "Use `forgotPasswordHref` to link to your reset flow",
      "Set `loading` while your auth request is in flight",
    ],
    donts: [
      "Don't try to control field state externally — the block owns the form via TanStack Form",
      "Don't validate manually before `onSubmit`; the schema runs first and only valid values reach you",
    ],
    codeExample: `import { LoginForm, loginSchema } from "@cogentic-co/ds/blocks/login-form"
import { z } from "zod"

// Optional: extend the default schema
const mySchema = loginSchema.extend({
  email: z.string().email().endsWith("@acme.co", "Use your work email"),
})

<LoginForm
  schema={mySchema}
  forgotPasswordHref="/forgot-password"
  onSubmit={async (values) => {
    // values is { email: string; password: string }
    await signIn(values)
  }}
/>`,
  },
  "register-form": {
    status: "new",
    description:
      "Name/email/password registration block with optional terms checkbox and social buttons. Uses @tanstack/react-form + zod under the hood; `registerSchema` is exported.",
    since: "0.8.0",
    importStatement:
      'import { RegisterForm, registerSchema } from "@cogentic-co/ds/blocks/register-form"',
    dos: [
      "Pass `termsHref` to render a required terms checkbox row",
      "Extend `registerSchema` to add fields like company name or invite code",
      "Use `socialButtons` slot for OAuth providers",
    ],
    donts: [
      "Don't roll your own validation — extend the exported schema",
      "Don't bypass the terms checkbox if your jurisdiction requires consent",
    ],
    codeExample: `import { RegisterForm, registerSchema } from "@cogentic-co/ds/blocks/register-form"

// Extend with an invite code field
const schema = registerSchema.extend({
  inviteCode: z.string().min(6),
})

<RegisterForm
  schema={schema}
  termsHref="/terms"
  onSubmit={async (values) => {
    await createAccount(values)
  }}
/>`,
  },
  "forgot-password-form": {
    status: "new",
    description:
      "Single-field email block for password reset requests. Built on @tanstack/react-form + zod. Default schema `forgotPasswordSchema` exported.",
    since: "0.8.0",
    importStatement:
      'import { ForgotPasswordForm } from "@cogentic-co/ds/blocks/forgot-password-form"',
    dos: [
      "Pair with a confirmation screen (or use MagicLinkMessage) after submission",
      "Always return success even if the email is unknown — don't leak account existence",
    ],
    donts: [
      "Don't reveal whether the email exists in the system",
      "Don't add additional fields here — keep this single-purpose",
    ],
    codeExample: `import { ForgotPasswordForm } from "@cogentic-co/ds/blocks/forgot-password-form"

<ForgotPasswordForm
  onSubmit={async (values) => {
    await requestPasswordReset(values.email)
  }}
/>`,
  },
  "select-org-form": {
    status: "new",
    description:
      "Organization picker block for users who belong to multiple workspaces. Auto-switches between radio `list` and searchable `Command` variants based on org count. Uses @tanstack/react-form + zod (`selectOrgSchema` exported).",
    since: "0.8.0",
    importStatement: 'import { SelectOrgForm } from "@cogentic-co/ds/blocks/select-org-form"',
    dos: [
      "Pass an `organizations` array with stable `id`s",
      "Provide `logo`, `role`, or `memberCount` to enrich each row",
      'Force `variant="search"` when you know the user has many orgs',
    ],
    donts: [
      "Don't use this for choosing a single resource that isn't an organization — compose Command directly",
      "Don't pre-select an org without good reason; let the user confirm",
    ],
    codeExample: `import { SelectOrgForm } from "@cogentic-co/ds/blocks/select-org-form"

<SelectOrgForm
  organizations={[
    { id: "acme", name: "Acme Inc.", role: "Owner", memberCount: 12 },
    { id: "globex", name: "Globex", role: "Admin", memberCount: 47 },
  ]}
  onSubmit={async (values) => {
    // values is { organizationId: string }
    await switchOrg(values.organizationId)
  }}
/>`,
  },
  "magic-link-message": {
    status: "new",
    description:
      "Confirmation screen shown after a magic sign-in link is sent. Includes a resend button with built-in cooldown and an optional 'use a different email' link. Not a form — no TanStack Form / zod here.",
    since: "0.8.0",
    importStatement: 'import { MagicLinkMessage } from "@cogentic-co/ds/blocks/magic-link-message"',
    dos: [
      "Pass the email so the user can verify they typed it correctly",
      "Provide `onResend` so users can retry — the block handles cooldown for you",
      "Provide `onBack` to let users return to the email entry screen",
    ],
    donts: [
      "Don't auto-resend on mount — let the user click",
      "Don't shorten the resend cooldown below ~15s; it exists to prevent abuse",
    ],
    codeExample: `import { MagicLinkMessage } from "@cogentic-co/ds/blocks/magic-link-message"

<MagicLinkMessage
  email="user@example.com"
  resendCooldownSeconds={30}
  onResend={async () => {
    await sendMagicLink("user@example.com")
  }}
  onBack={() => router.back()}
/>`,
  },
}
