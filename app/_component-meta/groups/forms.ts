import type { ComponentMeta } from "../index"

// ── Forms ──
export const formsMeta: Record<string, ComponentMeta> = {
  "approval-actions": {
    status: "new",
    description:
      "Compound component for compliance review workflows: approve, reject, or escalate with confirmation dialog and optional reason.",
    since: "0.5.0",
    importStatement: 'import { ApprovalActions } from "@cogentic-co/ds/approval-actions"',
    dos: [
      "Use in compliance and review workflows requiring explicit approve/reject/escalate",
      "Enable requireReason for auditable decisions",
      "Provide all three callbacks for full functionality",
    ],
    donts: [
      "Don't use for simple yes/no confirmations — use AlertDialog instead",
      "Don't omit all callbacks — at least one action should be wired up",
    ],
    codeExample: `import { ApprovalActions } from "@cogentic-co/ds/approval-actions"

<ApprovalActions
  onApprove={(reason) => console.log("Approved", reason)}
  onReject={(reason) => console.log("Rejected", reason)}
  onEscalate={(reason) => console.log("Escalated", reason)}
  requireReason
/>`,
  },
  input: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/input",
    description: "Text input field with support for different types and states.",
    since: "0.1.0",
    importStatement: 'import { Input } from "@cogentic-co/ds/input"',
    dos: [
      "Always pair with a label (use Field component)",
      "Use placeholder text as a hint, not a label",
      "Show validation errors clearly with FieldError",
    ],
    donts: [
      "Don't use placeholder as a replacement for labels",
      "Don't disable inputs without clear context",
    ],
    codeExample: `import { Input } from "@cogentic-co/ds/input"

<Input type="email" placeholder="you@example.com" />
<Input disabled placeholder="Disabled" />`,
  },
  textarea: {
    status: "stable",
    description: "Multi-line text input.",
    since: "0.1.0",
    importStatement: 'import { Textarea } from "@cogentic-co/ds/textarea"',
    dos: [
      "Set a reasonable min-height for the expected content",
      "Use with Field for labels and validation",
    ],
    donts: [
      "Don't use for single-line input — use Input instead",
      "Don't disable resize unless you have a good reason",
    ],
    codeExample: `import { Textarea } from "@cogentic-co/ds/textarea"

<Textarea placeholder="Write a message..." />`,
  },
  select: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/select",
    description: "Dropdown selection from a list of options. Built on Base UI Select.",
    since: "0.1.0",
    importStatement:
      'import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@cogentic-co/ds/select"',
    dos: [
      "Use placeholder text to describe the expected selection",
      "Group options with SelectGroup for long lists",
    ],
    donts: [
      "Don't use for fewer than 3 options — use RadioGroup instead",
      "Don't use for searchable lists — use Combobox",
    ],
    codeExample: `import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@cogentic-co/ds/select"

<Select>
  <SelectTrigger>
    <SelectValue placeholder="Pick one" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="a">Option A</SelectItem>
    <SelectItem value="b">Option B</SelectItem>
  </SelectContent>
</Select>`,
  },
  "native-select": {
    status: "stable",
    description: "Native HTML select element with consistent styling.",
    since: "0.1.0",
    importStatement: 'import { NativeSelect } from "@cogentic-co/ds/native-select"',
    dos: [
      "Use when you need native mobile picker behavior",
      "Use for simple forms that don't need custom styling",
    ],
    donts: [
      "Don't use when you need search/filter — use Combobox",
      "Don't use when you need multi-select",
    ],
  },
  checkbox: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/checkbox",
    description: "Binary choice control. Built on Base UI Checkbox.",
    since: "0.1.0",
    importStatement: 'import { Checkbox } from "@cogentic-co/ds/checkbox"',
    dos: [
      "Always provide a visible label",
      "Use for independent boolean choices",
      "Group related checkboxes with Field",
    ],
    donts: [
      "Don't use for mutually exclusive options — use RadioGroup",
      "Don't use without a label — screen readers need it",
    ],
    codeExample: `import { Checkbox } from "@cogentic-co/ds/checkbox"

<Checkbox />
<Checkbox defaultChecked />
<Checkbox disabled />`,
  },
  "radio-group": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/radio",
    description: "Single selection from a group of options. Built on Base UI RadioGroup.",
    since: "0.1.0",
    importStatement: 'import { RadioGroup, RadioGroupItem } from "@cogentic-co/ds/radio-group"',
    dos: [
      "Use for 2-5 mutually exclusive options",
      "Always show all options — don't hide behind a dropdown",
    ],
    donts: [
      "Don't use for more than 5 options — use Select instead",
      "Don't use for independent choices — use Checkbox",
    ],
    codeExample: `import { RadioGroup, RadioGroupItem } from "@cogentic-co/ds/radio-group"

<RadioGroup defaultValue="a">
  <RadioGroupItem value="a" label="Option A" />
  <RadioGroupItem value="b" label="Option B" />
</RadioGroup>`,
  },
  switch: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/switch",
    description: "Toggle for enabling/disabling settings. Built on Base UI Switch.",
    since: "0.1.0",
    importStatement: 'import { Switch } from "@cogentic-co/ds/switch"',
    dos: [
      "Use for settings that take effect immediately",
      "Place the label on the left, switch on the right",
    ],
    donts: [
      "Don't use for actions that require a submit — use Checkbox",
      "Don't use without a label",
    ],
    codeExample: `import { Switch } from "@cogentic-co/ds/switch"

<Switch />
<Switch defaultChecked />`,
  },
  slider: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/slider",
    description: "Range input for selecting numeric values. Built on Base UI Slider.",
    since: "0.1.0",
    importStatement: 'import { Slider } from "@cogentic-co/ds/slider"',
    dos: ["Show the current value near the slider", "Use sensible min/max/step values"],
    donts: [
      "Don't use for precise numeric input — use NumberInput",
      "Don't use without showing the value somewhere",
    ],
    codeExample: `import { Slider } from "@cogentic-co/ds/slider"

<Slider defaultValue={[50]} max={100} step={1} />`,
  },
  "input-group": {
    status: "stable",
    description: "Compose inputs with addons, buttons, and icons.",
    since: "0.1.0",
    importStatement: 'import { InputGroup, InputGroupAddon } from "@cogentic-co/ds/input-group"',
    dos: [
      "Use addons for prefixes/suffixes (icons, labels, buttons)",
      "Keep addons small and non-interactive when possible",
    ],
    donts: ["Don't nest InputGroups", "Don't use addons that are wider than the input itself"],
    codeExample: `import { InputGroup, InputGroupAddon } from "@cogentic-co/ds/input-group"
import { Input } from "@cogentic-co/ds/input"
import { SearchIcon } from "lucide-react"

<InputGroup>
  <InputGroupAddon><SearchIcon className="size-4" /></InputGroupAddon>
  <Input placeholder="Search..." />
</InputGroup>`,
  },
  "input-otp": {
    status: "stable",
    description: "One-time password input with individual digit fields.",
    since: "0.1.0",
    importStatement:
      'import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cogentic-co/ds/input-otp"',
    dos: ["Set maxLength to match the expected code length", "Auto-focus the first slot on mount"],
    donts: [
      "Don't use for regular text input",
      "Don't use without clear instructions about the code",
    ],
    codeExample: `import { InputOTP, InputOTPGroup, InputOTPSlot } from "@cogentic-co/ds/input-otp"

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
  },
  combobox: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/combobox",
    description: "Searchable select with autocomplete. Built on Base UI Combobox.",
    since: "0.1.0",
    importStatement: 'import { Combobox } from "@cogentic-co/ds/combobox"',
    dos: ["Use for lists with more than 10 options", "Provide helpful placeholder text"],
    donts: [
      "Don't use for short lists — use Select or RadioGroup",
      "Don't clear the search on blur if user might return",
    ],
  },
  calendar: {
    status: "stable",
    description: "Date selection calendar. Uses react-day-picker with custom styling.",
    since: "0.1.0",
    importStatement: 'import { Calendar } from "@cogentic-co/ds/calendar"',
    dos: ["Use inside a Popover for inline date picking", "Disable dates outside valid ranges"],
    donts: [
      "Don't use standalone — wrap in DatePicker for a full experience",
      "Don't use for date ranges — use DateRangePicker",
    ],
  },
  "date-picker": {
    status: "new",
    description: "Date and date range picker with popover and optional presets.",
    since: "0.2.0",
    importStatement: 'import { DatePicker, DateRangePicker } from "@cogentic-co/ds/date-picker"',
    dos: [
      "Use DatePicker for single date, DateRangePicker for ranges",
      "Provide presets for common selections (today, last 7 days)",
    ],
    donts: ["Don't use for time-only selection"],
  },
  label: {
    status: "stable",
    description: "Form label element with consistent styling.",
    since: "0.1.0",
    importStatement: 'import { Label } from "@cogentic-co/ds/label"',
    dos: ["Always associate with an input via htmlFor", "Keep labels concise and descriptive"],
    donts: [
      "Don't use Label alone — use Field for full form structure",
      "Don't hide labels unless using VisuallyHidden for a11y",
    ],
  },
  field: {
    status: "stable",
    description: "Form field wrapper with label, description, error, and layout variants.",
    since: "0.1.0",
    importStatement:
      'import { Field, FieldLabel, FieldDescription, FieldError } from "@cogentic-co/ds/field"',
    dos: [
      "Use Field to wrap every form input for consistent structure",
      "Use FieldDescription for helper text below inputs",
      "Use FieldError to display validation messages",
    ],
    donts: ["Don't use Field without a label — use sr-only if needed"],
    codeExample: `import { Field, FieldLabel, FieldDescription, FieldError } from "@cogentic-co/ds/field"
import { Input } from "@cogentic-co/ds/input"

<Field>
  <FieldLabel>Email</FieldLabel>
  <Input type="email" placeholder="you@example.com" />
  <FieldDescription>We'll never share your email.</FieldDescription>
</Field>`,
  },
  form: {
    status: "stable",
    description: "Re-exports TanStack Form hooks for form state management and validation.",
    since: "0.2.0",
    dos: [
      "Use for forms that need validation and state management",
      "Combine with Field for consistent layout",
    ],
    donts: ["Don't use for simple one-field forms — a plain form element is fine"],
  },
}
