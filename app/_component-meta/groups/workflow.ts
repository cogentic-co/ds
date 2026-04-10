import type { ComponentMeta } from "../index"

// ── Workflow ──
export const workflowMeta: Record<string, ComponentMeta> = {
  "workflow-canvas": {
    status: "new",
    description:
      "Interactive canvas powered by React Flow for building visual workflows. Wraps ReactFlow with sensible defaults (pan-on-scroll, fit-view, delete keys) and a dotted background.",
    since: "0.2.4",
    importStatement: 'import { Canvas } from "@cogentic-co/ds/workflow"',
    dos: [
      "Set layout='vertical' for top-to-bottom flows (default) or 'horizontal' for left-to-right",
      "Provide nodeTypes and edgeTypes maps for custom node/edge rendering",
      "Use fitView with padding for initial viewport",
      "Wrap in a fixed-height container — Canvas fills its parent",
    ],
    donts: [
      "Don't nest a Canvas inside another Canvas",
      "Don't forget to import '@xyflow/react/dist/style.css' (Canvas does this internally)",
      "Don't use raw ReactFlow when Canvas provides the themed wrapper",
    ],
    codeExample: `import { Canvas, WorkflowNode, SolidEdge } from "@cogentic-co/ds/workflow"

const nodes = [
  { id: "1", type: "custom", position: { x: 0, y: 0 }, data: { label: "Start" } },
  { id: "2", type: "custom", position: { x: 0, y: 200 }, data: { label: "End" } },
]
const edges = [{ id: "e1-2", source: "1", target: "2", type: "solid" }]

<Canvas
  nodes={nodes}
  edges={edges}
  nodeTypes={{ custom: MyNode }}
  edgeTypes={{ solid: SolidEdge }}
  layout="vertical"
  fitView
/>`,
  },
  "workflow-node": {
    status: "stable",
    description:
      "Card-style workflow node with header (icon, title, category chip), collapsible body, execution status (running/completed/failed/queued) with animated border, and a floating kind badge. Use WorkflowNodeIcon for themed icon squares.",
    since: "0.2.4",
    importStatement: `import {
  WorkflowNode,
  WorkflowNodeIcon,
  WorkflowNodeRow,
  WorkflowNodeDescription,
  type WorkflowNodeStatus,
} from "@cogentic-co/ds/workflow"`,
    dos: [
      "Use state for selection visual ('default' | 'selected' | 'dotted')",
      "Use status for execution state ('running' | 'completed' | 'failed' | 'queued')",
      "Use kind for a floating top-left badge (e.g. 'Trigger', 'Condition', 'Action')",
      "Use category for the in-header chip (e.g. 'Deals', 'Slack', 'AI')",
      "Use WorkflowNodeIcon with tone prop ('ai' | 'slack' | 'email' | etc.) for themed icon squares",
    ],
    donts: [
      "Don't render handles outside a Canvas — omit the handles prop",
      "Don't put too many rows in a single node — split into multiple nodes",
      "Don't use the dotted state for active nodes — it's for placeholders",
    ],
    codeExample: `import { WorkflowNode, WorkflowNodeIcon, WorkflowNodeDescription } from "@cogentic-co/ds/workflow"
import { Sparkles } from "lucide-react"

<WorkflowNode
  status="running"
  kind={<><Sparkles className="size-3" /> AI</>}
  category="Slack"
  title="Summarize to Slack"
  icon={<WorkflowNodeIcon tone="ai"><Sparkles /></WorkflowNodeIcon>}
  handles={{ target: true, source: true }}
>
  <WorkflowNodeDescription>Send key information to Slack.</WorkflowNodeDescription>
</WorkflowNode>`,
  },
  "workflow-slack-message": {
    status: "new",
    description:
      "Slack-style notification preview card for workflow canvases. Shows a rendered message with app avatar, name, timestamp, title, body, and action buttons. Use next to a workflow node to preview what a Slack notification will look like.",
    since: "0.11.0",
    importStatement: `import {
  WorkflowSlackMessage,
  WorkflowSlackMessageTitle,
  WorkflowSlackMessageBody,
  WorkflowSlackMessageActions,
} from "@cogentic-co/ds/workflow/workflow-slack-message"`,
    dos: [
      "Place next to a workflow node that sends Slack messages",
      "Use WorkflowSlackMessageActions for 'Move to Qualified' / 'Open case' style buttons",
      "Pass an avatar element (img or styled div) for the bot icon",
    ],
    donts: [
      "Don't use for non-Slack notifications — build a similar component for email/Teams",
      "Don't nest inside a Card — it's already a card",
    ],
    codeExample: `<WorkflowSlackMessage appName="Compliance Bot" timestamp="10:18 AM" appAvatar={...}>
  <WorkflowSlackMessageTitle>⚠️ High-risk VASP detected</WorkflowSlackMessageTitle>
  <WorkflowSlackMessageBody>A counterparty transfer has triggered the Travel Rule threshold.</WorkflowSlackMessageBody>
  <WorkflowSlackMessageActions>
    <Button variant="secondary" size="sm">Open case</Button>
  </WorkflowSlackMessageActions>
</WorkflowSlackMessage>`,
  },
  "workflow-edge": {
    status: "stable",
    description:
      "Themed edge components for connecting workflow nodes. Includes Solid, Dotted, Dashed, Animated (travelling dot), and Temporary variants. Edges support floating label pills via data.label with active/inactive styling for branching flows.",
    since: "0.2.4",
    importStatement: `import {
  SolidEdge,
  DottedEdge,
  DashedEdge,
  AnimatedEdge,
  TemporaryEdge,
} from "@cogentic-co/ds/workflow"`,
    dos: [
      "Register edge types in the edgeTypes prop of Canvas",
      "Use Solid for standard connections, Dotted for optional paths",
      "Use Animated for active/in-progress connections",
      "Use Temporary as the edge type during drag operations",
      "Pass data.label to show a label pill on the edge midpoint",
      "Pass data.active to highlight the active branch label (solid border vs muted)",
      "Pass data.color to override the edge stroke colour",
    ],
    donts: [
      "Don't use WorkflowEdge namespace directly as an edge type — use individual exports (SolidEdge, etc.)",
      "Don't mix too many edge types in a single workflow — keep it visually consistent",
    ],
    codeExample: `import { SolidEdge, AnimatedEdge, TemporaryEdge } from "@cogentic-co/ds/workflow"

const edgeTypes = {
  solid: SolidEdge,
  animated: AnimatedEdge,
  temporary: TemporaryEdge,
}

// Edge with a label
const edges = [{
  id: "e1",
  source: "1",
  target: "2",
  type: "solid",
  data: { label: "Success" },
}]`,
  },
  "workflow-connection": {
    status: "new",
    description:
      "Connection line shown while dragging a new edge between nodes. Supports default, dotted, dashed, and animated variants with auto-detected vertical/horizontal flow.",
    since: "0.2.4",
    importStatement: `import {
  WorkflowConnection,
  WorkflowConnectionDotted,
  WorkflowConnectionAnimated,
} from "@cogentic-co/ds/workflow"`,
    dos: [
      "Pass as connectionLineComponent prop to Canvas",
      "Match the connection style to your edge style for visual consistency",
      "Provide an onConnect handler to persist new connections",
    ],
    donts: [
      "Don't forget onConnect — without it, connections won't be saved",
      "Don't use connection lines outside a Canvas context",
    ],
    codeExample: `import { Canvas, WorkflowConnectionAnimated } from "@cogentic-co/ds/workflow"
import { addEdge } from "@xyflow/react"

const [edges, setEdges] = useState([])
const onConnect = (conn) => setEdges(prev => addEdge(conn, prev))

<Canvas
  connectionLineComponent={WorkflowConnectionAnimated}
  onConnect={onConnect}
  ...
/>`,
  },
  "workflow-controls": {
    status: "new",
    description:
      "Zoom and fit-view controls overlay for the workflow canvas. Renders in the bottom-left corner by default.",
    since: "0.2.4",
    importStatement: 'import { WorkflowControls } from "@cogentic-co/ds/workflow"',
    dos: [
      "Place as a child of Canvas",
      "Use when the workflow may be zoomed or panned extensively",
    ],
    donts: ["Don't render outside a Canvas — it depends on ReactFlow context"],
    codeExample: `import { Canvas, WorkflowControls } from "@cogentic-co/ds/workflow"

<Canvas nodes={nodes} edges={edges} ...>
  <WorkflowControls />
</Canvas>`,
  },
  "workflow-panel": {
    status: "new",
    description:
      "Positioned overlay panel for workflow metadata, actions, or status. Renders as a card anchored to a corner of the canvas.",
    since: "0.2.4",
    importStatement: 'import { WorkflowPanel } from "@cogentic-co/ds/workflow"',
    dos: [
      "Place as a child of Canvas",
      "Use position prop ('top-left', 'top-right', 'bottom-left', 'bottom-right')",
      "Use for workflow info, toolbox, or action buttons",
      "Keep panel content compact — it overlays the canvas",
    ],
    donts: [
      "Don't put large forms or modals inside a panel — use a dialog instead",
      "Don't render outside a Canvas",
    ],
    codeExample: `import { Canvas, WorkflowPanel } from "@cogentic-co/ds/workflow"

<Canvas ...>
  <WorkflowPanel position="top-left">
    <div className="p-2 text-xs">
      <p className="font-semibold">Workflow Info</p>
      <p>Nodes: 5 · Edges: 4</p>
    </div>
  </WorkflowPanel>
</Canvas>`,
  },
  "workflow-toolbar": {
    status: "new",
    description:
      "Floating toolbar that appears when a workflow node is selected. Positioned below the node by default. Use for quick actions like edit, delete, or duplicate.",
    since: "0.2.4",
    importStatement: 'import { WorkflowToolbar } from "@cogentic-co/ds/workflow"',
    dos: [
      "Render inside a custom node component (as a child of WorkflowNode)",
      "Add icon buttons for common actions (edit, delete, copy)",
      "Keep the toolbar compact — 2-4 actions max",
    ],
    donts: [
      "Don't render outside a ReactFlow node — it uses NodeToolbar internally",
      "Don't put text-heavy content in the toolbar — use a panel or dialog",
    ],
    codeExample: `import { WorkflowNode, WorkflowToolbar } from "@cogentic-co/ds/workflow"
import { CopyIcon, Trash2Icon, SettingsIcon } from "lucide-react"

function MyNode({ data }) {
  return (
    <WorkflowNode title={data.title} handles={{ target: true, source: true }}>
      <WorkflowToolbar>
        <button><CopyIcon className="size-3.5" /></button>
        <button><SettingsIcon className="size-3.5" /></button>
        <button><Trash2Icon className="size-3.5" /></button>
      </WorkflowToolbar>
    </WorkflowNode>
  )
}`,
  },
  "workflow-gate": {
    status: "new",
    description:
      "Decision gate for conditional branching in workflows. Diamond shape for logic gates (IF/ELSE, Switch, Merge), circle for Delay and End. Supports branch labels that appear as pills beside the gate.",
    since: "0.2.4",
    importStatement: 'import { WorkflowGate } from "@cogentic-co/ds/workflow"',
    dos: [
      "Use type='if-else' for conditional branching with left/right outputs",
      "Use the branches prop to show labelled pills (e.g. 'Is True' / 'If False')",
      "Pass an icon for visual clarity — GitBranch for if-else, Route for switch, etc.",
      "Use handles for connection points (top/bottom/left/right)",
      "Use selected state to highlight the active gate",
    ],
    donts: [
      "Don't use gates for regular processing steps — use WorkflowNode instead",
      "Don't put long text in branch labels — keep them to 2-3 words",
      "Don't render handles outside a Canvas context",
    ],
    codeExample: `import { WorkflowGate } from "@cogentic-co/ds/workflow"
import { GitBranch } from "lucide-react"

<WorkflowGate
  type="if-else"
  icon={<GitBranch />}
  branches={{ left: "Is True", right: "If False" }}
  handles={{ top: true, left: true, right: true }}
/>`,
  },
  "workflow-label": {
    status: "new",
    description:
      "Floating annotation pill for labelling edges, nodes, or workflow states. Colour-coded variants for different statuses.",
    since: "0.2.4",
    importStatement: 'import { WorkflowLabel } from "@cogentic-co/ds/workflow"',
    dos: [
      "Use on edges via data.label for inline annotations",
      "Use variant to communicate status (success, warning, error, muted)",
      "Keep labels short — 1-2 words",
    ],
    donts: [
      "Don't use as a general-purpose badge — use Badge component instead",
      "Don't put long descriptions in labels",
    ],
    codeExample: `import { WorkflowLabel } from "@cogentic-co/ds/workflow"

<WorkflowLabel variant="success">Approved</WorkflowLabel>
<WorkflowLabel variant="error">Failed</WorkflowLabel>
<WorkflowLabel variant="muted">Skipped</WorkflowLabel>`,
  },
  "workflow-minimap": {
    status: "new",
    description:
      "A themed minimap overlay for the workflow canvas. Wraps React Flow's MiniMap with Cogentic design tokens.",
    since: "0.2.4",
    importStatement: 'import { WorkflowMinimap } from "@cogentic-co/ds/workflow"',
    dos: [
      "Place inside a WorkflowCanvas for a birds-eye navigation overview",
      "Use for large workflows where users might lose orientation",
    ],
    donts: [
      "Don't render outside a ReactFlow provider",
      "Don't use on small/simple workflows where it adds clutter",
    ],
    codeExample: `import { WorkflowCanvas, WorkflowMinimap } from "@cogentic-co/ds/workflow"

<WorkflowCanvas nodes={nodes} edges={edges}>
  <WorkflowMinimap />
</WorkflowCanvas>`,
  },
  "workflow-group": {
    status: "new",
    description:
      "A dashed container for visually grouping related workflow nodes. Supports colour variants and a floating label badge.",
    since: "0.2.4",
    importStatement: 'import { WorkflowGroup } from "@cogentic-co/ds/workflow"',
    dos: [
      "Use to visually group related nodes (e.g. a retry loop, parallel branch)",
      "Provide a short label to describe the group's purpose",
      "Use colour variants to differentiate group types",
    ],
    donts: [
      "Don't nest groups deeply — keep hierarchy flat",
      "Don't use as a generic container outside workflow context",
    ],
    codeExample: `import { WorkflowGroup } from "@cogentic-co/ds/workflow"
import { Layers } from "lucide-react"

<WorkflowGroup
  variant="primary"
  label="Retry Loop"
  icon={<Layers />}
>
  {children}
</WorkflowGroup>`,
  },
  "workflow-handle": {
    status: "new",
    description:
      "A standalone styled connection handle for workflow nodes. Auto-detects position from layout context and includes an error boundary for safe rendering outside ReactFlow.",
    since: "0.2.4",
    importStatement: 'import { WorkflowHandle } from "@cogentic-co/ds/workflow"',
    dos: [
      "Use inside custom node components for connection points",
      "Let position auto-detect from WorkflowContext layout direction",
      "Override position prop when you need non-standard handle placement",
    ],
    donts: [
      "Don't use HandleBoundary directly unless building a custom handle",
      "Don't set both auto-detect and explicit position — pick one",
    ],
    codeExample: `import { WorkflowHandle } from "@cogentic-co/ds/workflow"

function CustomNode() {
  return (
    <div className="rounded-lg border bg-card p-4">
      <WorkflowHandle type="target" />
      <span>My Node</span>
      <WorkflowHandle type="source" />
    </div>
  )
}`,
  },
}
