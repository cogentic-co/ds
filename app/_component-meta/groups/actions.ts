import type { ComponentMeta } from "../index"

// ── Actions ──
export const actionsMeta: Record<string, ComponentMeta> = {
  button: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/button",
    description: "Trigger actions or navigation. Supports multiple variants and sizes.",
    since: "0.1.0",
    importStatement: 'import { Button } from "@cogentic-co/ds/button"',
    dos: [
      "Use primary variant for the main action on a page",
      "Use destructive variant for irreversible actions",
      "Include an icon for quick visual scanning",
      "Use loading state to indicate async operations",
    ],
    donts: [
      "Don't use more than one primary button in a section",
      "Don't use a button where a link (<a>) is more appropriate",
      "Don't disable buttons without explaining why",
    ],
    codeExample: `import { Button } from "@cogentic-co/ds/button"

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline" size="sm">Small</Button>`,
  },
  "button-group": {
    status: "stable",
    description: "Group related buttons with consistent spacing.",
    since: "0.1.0",
    importStatement: 'import { ButtonGroup } from "@cogentic-co/ds/button-group"',
    dos: [
      "Group related actions together (e.g. Save / Cancel)",
      "Use consistent button variants within a group",
    ],
    donts: ["Don't mix too many variants in one group", "Don't use for unrelated actions"],
    codeExample: `import { ButtonGroup } from "@cogentic-co/ds/button-group"
import { Button } from "@cogentic-co/ds/button"

<ButtonGroup>
  <Button variant="outline">Cancel</Button>
  <Button>Save</Button>
</ButtonGroup>`,
  },
  toggle: {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/toggle",
    description: "Two-state button that can be on or off.",
    since: "0.1.0",
    importStatement: 'import { Toggle } from "@cogentic-co/ds/toggle"',
    dos: [
      "Use for binary on/off actions (bold, italic, mute)",
      "Use clear icons that indicate the toggled state",
    ],
    donts: [
      "Don't use for navigation — use Button or Link",
      "Don't use when Switch is more appropriate (settings)",
    ],
    codeExample: `import { Toggle } from "@cogentic-co/ds/toggle"

<Toggle aria-label="Toggle bold">
  <Bold className="size-4" />
</Toggle>`,
  },
  "toggle-group": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/toggle-group",
    description: "Group of toggles for selecting one or multiple options.",
    since: "0.1.0",
    importStatement: 'import { ToggleGroup, ToggleGroupItem } from "@cogentic-co/ds/toggle-group"',
    dos: [
      "Use type='single' for mutually exclusive options",
      "Use type='multiple' for independent toggles",
    ],
    donts: [
      "Don't use for more than 5-6 options — use Select instead",
      "Don't mix icons and text labels in the same group",
    ],
    codeExample: `import { ToggleGroup, ToggleGroupItem } from "@cogentic-co/ds/toggle-group"

<ToggleGroup type="single">
  <ToggleGroupItem value="left">Left</ToggleGroupItem>
  <ToggleGroupItem value="center">Center</ToggleGroupItem>
  <ToggleGroupItem value="right">Right</ToggleGroupItem>
</ToggleGroup>`,
  },
  "dropdown-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/menu",
    description:
      "Contextual menu triggered by a button. Supports items, checkboxes, radios, and sub-menus.",
    since: "0.1.0",
    importStatement:
      'import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@cogentic-co/ds/dropdown-menu"',
    dos: [
      "Group related actions with separators",
      "Include keyboard shortcuts in menu items",
      "Use descriptive labels for actions",
    ],
    donts: [
      "Don't nest menus more than one level deep",
      "Don't put too many items in a single menu (>10)",
    ],
  },
  "context-menu": {
    status: "stable",
    baseUiDoc: "https://base-ui.com/react/components/context-menu",
    description: "Right-click context menu with the same structure as DropdownMenu.",
    since: "0.1.0",
    importStatement:
      'import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem } from "@cogentic-co/ds/context-menu"',
    dos: [
      "Use for secondary actions on interactive elements",
      "Mirror common OS context menu patterns",
    ],
    donts: [
      "Don't use as the only way to access important actions",
      "Don't use on touch-only interfaces without an alternative",
    ],
  },
}
