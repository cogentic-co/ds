import type { ComponentMeta } from "../index"

// ── AI / Chatbot ──
export const aiChatbotMeta: Record<string, ComponentMeta> = {
  "agent-progress": {
    status: "new",
    description:
      "Live status card for an agent or workflow run. Composes Step/Stepper, Badge, Progress, Separator, and Button. Variants: State (running|completed|failed) × Density (compact|detailed).",
    since: "0.19.0",
    importStatement: 'import { AgentProgress } from "@cogentic-co/ds/chatbot/agent-progress"',
    dos: [
      "Use for agent or workflow runs that have a fixed list of steps",
      "Pass step descriptions even in compact density — they're used by detailed mode",
      "Include a `progress` object when the run has a measurable percentage",
      "Use `meta` for the secondary footer line (started X ago · ETA Y)",
    ],
    donts: [
      "Don't use for chat messages — use Message instead",
      "Don't use for free-form workflows without discrete steps — use a Plan or Task list",
      "Don't override step status manually — flow through `status: 'done'|'active'|'pending'|'failed'|'skipped'`",
    ],
    codeExample: `import { AgentProgress } from "@cogentic-co/ds/chatbot/agent-progress"

<AgentProgress
  state="running"
  density="compact"
  title="Investigation created"
  reference="INV-104"
  description="Wallet risk investigation"
  steps={[
    { id: "1", title: "Parse transaction", status: "done" },
    { id: "2", title: "Resolve counterparties", status: "done" },
    { id: "3", title: "Risk score", status: "active" },
    { id: "4", title: "Recommendation", status: "pending" },
  ]}
  progress={{ value: 48, summary: "ETA 2 min" }}
  meta="Started 4 min ago"
  onCancel={() => stop()}
  onOpen={() => open()}
/>`,
  },
  markdown: {
    status: "new",
    description:
      "Streaming-aware Markdown renderer for AI output. Wraps Vercel's Streamdown with DS prose tokens — handles unterminated code/tables/links during streaming, supports GFM, code highlighting, and tables. Auto-rendered inside MessageResponse when children is a string.",
    importStatement: 'import { Markdown } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Use for any model output that may contain markdown (almost always)",
      "Pass model output as a plain string — Streamdown handles partial blocks",
      "Use the `inverted` variant inside primary-coloured surfaces (user message bubble)",
      "Trust the auto-render in MessageResponse — pass strings directly",
    ],
    donts: [
      "Don't double-wrap with Markdown if you're already passing a string to MessageResponse",
      "Don't sanitize input yourself — Streamdown already sanitizes via rehype-sanitize",
      "Don't use for plain text that contains no markdown — it adds runtime cost",
    ],
    codeExample: `import { Markdown } from "@cogentic-co/ds/chatbot"

// Standalone
<Markdown>{modelOutput}</Markdown>

// Inside MessageResponse — auto-rendered
<Message from="assistant">
  <MessageContent>
    <MessageResponse>{streamingChunk}</MessageResponse>
  </MessageContent>
</Message>`,
  },
  shimmer: {
    status: "new",
    description:
      "Animated shimmer text effect for loading states. Renders a gradient animation across text content.",
    importStatement: 'import { Shimmer } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Use for AI-generated text that's still loading or streaming",
      "Keep shimmer text short — a few words that hint at what's coming",
      "Use the `as` prop to match the expected final element (h2, span, etc.)",
    ],
    donts: [
      "Don't use on non-text elements — it relies on bg-clip-text",
      "Don't show shimmer for more than a few seconds — switch to a skeleton or spinner",
      "Don't use alongside a separate loading spinner on the same content",
    ],
    codeExample: `import { Shimmer } from "@cogentic-co/ds/chatbot"

<Shimmer duration={2}>Generating response...</Shimmer>
<Shimmer as="span" duration={3}>Loading</Shimmer>`,
  },
  suggestion: {
    status: "new",
    description: "Clickable suggestion pills for prompting user actions in a chat interface.",
    importStatement: 'import { Suggestions, Suggestion } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Show 2–5 relevant suggestions based on conversation context",
      "Keep suggestion text concise — under 40 characters",
      "Update suggestions dynamically as the conversation progresses",
      "Place below the latest assistant message or in the empty state",
    ],
    donts: [
      "Don't show suggestions while the AI is still responding",
      "Don't use generic suggestions that don't relate to the current context",
      "Don't show more than 6 suggestions — it overwhelms the user",
    ],
    codeExample: `import { Suggestions, Suggestion } from "@cogentic-co/ds/chatbot"

<Suggestions>
  <Suggestion onClick={() => send("Summarize this")}>Summarize this</Suggestion>
  <Suggestion onClick={() => send("Explain more")}>Explain more</Suggestion>
</Suggestions>`,
  },
  reasoning: {
    status: "new",
    description:
      "Collapsible reasoning/thinking panel. Shows AI chain-of-thought or reasoning steps.",
    importStatement:
      'import { Reasoning, ReasoningTrigger, ReasoningContent } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Use to show AI thinking process for transparency",
      "Start collapsed by default — most users don't need to see reasoning",
      "Use font-mono for the reasoning text to distinguish from the response",
      "Show duration or a streaming indicator when reasoning is in progress",
    ],
    donts: [
      "Don't show reasoning for simple, obvious responses",
      "Don't put the final answer inside the reasoning panel",
      "Don't use for error messages — use Callout or Alert instead",
    ],
    codeExample: `import { Reasoning, ReasoningTrigger, ReasoningContent } from "@cogentic-co/ds/chatbot"

<Reasoning>
  <ReasoningTrigger />
  <ReasoningContent>
    Let me think about this step by step...
  </ReasoningContent>
</Reasoning>`,
  },
  sources: {
    status: "new",
    description:
      "Collapsible citation sources panel. Display references and links used to generate a response.",
    importStatement:
      'import { Sources, SourcesTrigger, SourcesContent, Source } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Show source count in the trigger text (e.g. '3 sources')",
      "Include title and description for each source for scannability",
      "Use favicon images when available for visual recognition",
      "Place directly after the response that cites these sources",
    ],
    donts: [
      "Don't show sources if the response is purely generative with no references",
      "Don't link to sources the user can't access (paywalled, internal)",
      "Don't duplicate sources — deduplicate before rendering",
    ],
    codeExample: `import { Sources, SourcesTrigger, SourcesContent, Source } from "@cogentic-co/ds/chatbot"

<Sources>
  <SourcesTrigger>3 sources</SourcesTrigger>
  <SourcesContent>
    <Source href="https://example.com" title="Example" description="A description" />
  </SourcesContent>
</Sources>`,
  },
  "inline-citation": {
    status: "new",
    description:
      "Inline citation with hover card. Shows a numbered superscript that reveals source details on hover.",
    importStatement: 'import { InlineCitation } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Number citations sequentially within a single response",
      "Wrap only the relevant phrase, not the entire sentence",
      "Always provide both title and href for the hover card",
      "Use for factual claims that benefit from source attribution",
    ],
    donts: [
      "Don't cite every sentence — only key claims and data points",
      "Don't use sequential numbers that skip (e.g. 1, 3, 5)",
      "Don't nest citations inside other interactive elements",
    ],
    codeExample: `import { InlineCitation } from "@cogentic-co/ds/chatbot"

<p>
  This is a fact
  <InlineCitation index={1} href="https://example.com" title="Source" description="A reliable source">
    supported by research
  </InlineCitation>.
</p>`,
  },
  message: {
    status: "new",
    description:
      "Chat message bubble with role-based styling. Compound component with avatar, content, actions, and branching.",
    importStatement:
      'import { Message, MessageContent, MessageResponse, MessageActions } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Always set the `from` prop to get correct alignment and bubble styling",
      "Use MessageAvatar for visual identity — initials, icon, or image",
      "Show MessageActions on hover for a clean default view",
      "Use MessageCopyAction for all assistant responses",
      "Support markdown in MessageResponse for rich formatting",
    ],
    donts: [
      "Don't show feedback actions (thumbs up/down) on user messages",
      "Don't render empty MessageActions — hide when no actions are needed",
      "Don't put interactive form elements inside MessageResponse",
      "Don't use system role for error messages — use Callout instead",
    ],
    codeExample: `import {
  Message, MessageAvatar, MessageContent,
  MessageResponse, MessageActions, MessageCopyAction
} from "@cogentic-co/ds/chatbot"

<Message from="assistant">
  <MessageAvatar>AI</MessageAvatar>
  <MessageContent>
    <MessageResponse>Hello! How can I help you today?</MessageResponse>
    <MessageActions>
      <MessageCopyAction content="Hello! How can I help you today?" />
    </MessageActions>
  </MessageContent>
</Message>`,
  },
  conversation: {
    status: "new",
    description:
      "Auto-scrolling conversation container with empty state and scroll-to-bottom button.",
    importStatement:
      'import { Conversation, ConversationContent, ConversationEmptyState } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Set an explicit height on the Conversation container (h-[500px], h-screen, etc.)",
      "Use ConversationEmptyState when there are no messages",
      "Include suggestions in the empty state to help users get started",
      "Add ConversationDownload for long conversations users may want to save",
    ],
    donts: [
      "Don't nest Conversation inside another scroll container",
      "Don't render the scroll-to-bottom button when already at bottom (handled automatically)",
      "Don't put the PromptInput inside Conversation — place it as a sibling below",
    ],
    codeExample: `import { Conversation, ConversationContent, ConversationEmptyState } from "@cogentic-co/ds/chatbot"

<Conversation className="h-[500px]">
  <ConversationContent>
    {messages.length === 0 ? (
      <ConversationEmptyState />
    ) : (
      messages.map(msg => <Message key={msg.id} ... />)
    )}
  </ConversationContent>
</Conversation>`,
  },
  "prompt-input": {
    status: "new",
    description:
      "Composable chat input with auto-resizing textarea, file attachments, and submit button.",
    importStatement:
      'import { PromptInput, PromptInputTextarea, PromptInputFooter, PromptInputSubmit } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Always include PromptInputSubmit for clear submit affordance",
      "Use Enter to submit, Shift+Enter for newline (built-in behaviour)",
      "Show PromptInputFiles above the textarea when files are attached",
      "Disable the input during loading with the isLoading prop",
      "Place the input at the bottom of the page, sticky if needed",
    ],
    donts: [
      "Don't omit the submit button and rely solely on keyboard shortcuts",
      "Don't allow unlimited file uploads — set reasonable limits",
      "Don't hide the attach button if file uploads are supported",
    ],
    codeExample: `import {
  PromptInput, PromptInputBody, PromptInputTextarea,
  PromptInputFooter, PromptInputTools, PromptInputAttachButton,
  PromptInputSubmit, PromptInputFiles
} from "@cogentic-co/ds/chatbot"

<PromptInput onSubmit={(msg, files) => send(msg)}>
  <PromptInputFiles />
  <PromptInputBody>
    <PromptInputTextarea />
  </PromptInputBody>
  <PromptInputFooter>
    <PromptInputTools>
      <PromptInputAttachButton />
    </PromptInputTools>
    <PromptInputSubmit />
  </PromptInputFooter>
</PromptInput>`,
  },
  "chain-of-thought": {
    status: "new",
    description:
      "Step-by-step reasoning visualization. Collapsible panel showing sequential thinking steps with search results.",
    importStatement:
      'import { ChainOfThought, ChainOfThoughtHeader, ChainOfThoughtContent, ChainOfThoughtStep } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Number steps sequentially and update status as each completes",
      "Use descriptive step labels that explain what's happening",
      "Include search results within steps when the AI searches for information",
      "Start collapsed by default for non-technical users",
    ],
    donts: [
      "Don't show more than 8-10 steps — group related operations",
      "Don't update step statuses out of order",
      "Don't use for simple responses that don't involve multi-step reasoning",
    ],
    codeExample: `import {
  ChainOfThought, ChainOfThoughtHeader,
  ChainOfThoughtContent, ChainOfThoughtStep
} from "@cogentic-co/ds/chatbot"

<ChainOfThought defaultOpen>
  <ChainOfThoughtHeader>Thinking...</ChainOfThoughtHeader>
  <ChainOfThoughtContent>
    <ChainOfThoughtStep step={1} status="complete">Analyzing the question</ChainOfThoughtStep>
    <ChainOfThoughtStep step={2} status="active">Searching for relevant info</ChainOfThoughtStep>
    <ChainOfThoughtStep step={3} status="pending">Formulating response</ChainOfThoughtStep>
  </ChainOfThoughtContent>
</ChainOfThought>`,
  },
  confirmation: {
    status: "new",
    description:
      "Tool approval request UI. Shows a confirmation card when AI wants to execute a tool or action.",
    importStatement:
      'import { Confirmation, ConfirmationRequest, ConfirmationActions, ConfirmationAction } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Clearly describe the action being requested in the title",
      "Show the exact input/parameters in the description for transparency",
      "Update status to 'accepted' or 'rejected' after the user decides",
      "Use destructive variant for the reject action button",
    ],
    donts: [
      "Don't auto-approve actions without user consent for sensitive operations",
      "Don't show confirmation for read-only operations that have no side effects",
      "Don't allow re-approving an already rejected action without a new request",
    ],
    codeExample: `import {
  Confirmation, ConfirmationRequest,
  ConfirmationActions, ConfirmationAction
} from "@cogentic-co/ds/chatbot"

<Confirmation status="pending">
  <ConfirmationRequest
    title="Run database query"
    description="SELECT * FROM users WHERE active = true"
  />
  <ConfirmationActions>
    <ConfirmationAction onClick={approve}>Approve</ConfirmationAction>
    <ConfirmationAction variant="destructive" onClick={reject}>Reject</ConfirmationAction>
  </ConfirmationActions>
</Confirmation>`,
  },
  checkpoint: {
    status: "new",
    description:
      "Conversation bookmark marker. Visual indicator for saved points in a conversation.",
    importStatement:
      'import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Use meaningful labels that describe what was accomplished at this point",
      "Insert between messages at natural breakpoints in the conversation",
      "Make the trigger clickable to scroll to or restore that point",
    ],
    donts: [
      "Don't create checkpoints more often than every 5-10 messages",
      "Don't use vague labels like 'Checkpoint 1' — describe the milestone",
      "Don't checkpoint trivial exchanges",
    ],
    codeExample: `import { Checkpoint, CheckpointIcon, CheckpointTrigger } from "@cogentic-co/ds/chatbot"

<Checkpoint>
  <CheckpointIcon />
  <CheckpointTrigger>Checkpoint: Initial analysis complete</CheckpointTrigger>
</Checkpoint>`,
  },
  plan: {
    status: "new",
    description:
      "Collapsible execution plan display. Shows AI-generated plans with steps and actions.",
    importStatement:
      'import { Plan, PlanTrigger, PlanContent, PlanFooter, PlanAction } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Show the plan before execution so users can review and approve",
      "Use PlanFooter with an action button for explicit user confirmation",
      "Keep plan steps concise and scannable",
      "Start expanded so users see the plan immediately",
    ],
    donts: [
      "Don't execute the plan automatically without user approval",
      "Don't show more than 10 steps — break into phases if needed",
      "Don't mix plan display with task progress — use Task component for execution tracking",
    ],
    codeExample: `import { Plan, PlanTrigger, PlanContent, PlanFooter, PlanAction } from "@cogentic-co/ds/chatbot"

<Plan>
  <PlanTrigger>Implementation Plan</PlanTrigger>
  <PlanContent>
    <p>1. Create the database schema</p>
    <p>2. Build the API endpoints</p>
    <p>3. Write tests</p>
  </PlanContent>
  <PlanFooter>
    <PlanAction>Execute Plan</PlanAction>
  </PlanFooter>
</Plan>`,
  },
  task: {
    status: "new",
    description:
      "Collapsible task progress display. Shows task items with status indicators (pending, running, complete, error).",
    importStatement:
      'import { Task, TaskTrigger, TaskContent, TaskItem } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Update task item statuses in real-time as work progresses",
      "Use the running status with spinner for the currently active item",
      "Show the overall task status in the trigger (running, complete, error)",
      "Expand by default when a task is actively running",
    ],
    donts: [
      "Don't show completed tasks as running",
      "Don't have more than one item with 'running' status simultaneously",
      "Don't remove failed items — show them with error status for debugging",
    ],
    codeExample: `import { Task, TaskTrigger, TaskContent, TaskItem } from "@cogentic-co/ds/chatbot"

<Task>
  <TaskTrigger status="running">Installing dependencies</TaskTrigger>
  <TaskContent>
    <TaskItem status="complete">Downloaded packages</TaskItem>
    <TaskItem status="running">Linking dependencies</TaskItem>
    <TaskItem status="pending">Running post-install scripts</TaskItem>
  </TaskContent>
</Task>`,
  },
  tool: {
    status: "new",
    description: "Collapsible tool invocation display. Shows tool name, status, input, and output.",
    importStatement:
      'import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Show the tool name in monospace font for technical clarity",
      "Display the status badge (pending, running, success, error) in the header",
      "Format input and output as JSON or code for readability",
      "Start collapsed — expand only when the user wants details",
    ],
    donts: [
      "Don't show raw, unformatted input/output — pretty-print JSON",
      "Don't truncate output without a 'show more' option",
      "Don't show tool invocations for internal/hidden tools the user doesn't need to see",
    ],
    codeExample: `import { Tool, ToolHeader, ToolContent, ToolInput, ToolOutput } from "@cogentic-co/ds/chatbot"

<Tool>
  <ToolHeader name="search_documents" status="success" />
  <ToolContent>
    <ToolInput>{"query": "compliance regulations"}</ToolInput>
    <ToolOutput>Found 3 matching documents...</ToolOutput>
  </ToolContent>
</Tool>`,
  },
  queue: {
    status: "new",
    description:
      "Structured task/message queue list with collapsible sections. Indicators match Step styling (border-circle + status icon). Optional QueueItemDragHandle for reorderable backlogs — wire DnD via native HTML5 drag events or any DnD library.",
    importStatement:
      'import { QueueSection, QueueSectionTrigger, QueueList, QueueItem, QueueItemIndicator, QueueItemDragHandle, QueueItemContent } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Group related items into QueueSections with descriptive labels",
      "Show the item count in the section trigger",
      "Use status indicators consistently (pending, active, complete, error)",
      "Add `QueueItemDragHandle` for reorderable items + spread `draggable` / `onDragStart` / `onDrop` on `QueueItem`",
      "Add descriptions to items that need more context",
    ],
    donts: [
      "Don't put more than 20 items in a single section — paginate or group",
      "Don't mix item types (tasks, messages, files) in the same section",
      "Don't use the queue for real-time data — it's for discrete items",
    ],
    codeExample: `import {
  QueueSection, QueueSectionTrigger, QueueList,
  QueueItem, QueueItemIndicator, QueueItemContent
} from "@cogentic-co/ds/chatbot"

<QueueSection>
  <QueueSectionTrigger>Pending Tasks (3)</QueueSectionTrigger>
  <QueueList>
    <QueueItem>
      <QueueItemIndicator status="active" />
      <QueueItemContent>Process uploaded files</QueueItemContent>
    </QueueItem>
  </QueueList>
</QueueSection>`,
  },
  "model-selector": {
    status: "new",
    description:
      "Searchable model picker dropdown. Select AI models with logos, descriptions, and grouping.",
    importStatement:
      'import { ModelSelector, ModelSelectorTrigger, ModelSelectorContent, ModelSelectorItem } from "@cogentic-co/ds/chatbot"',
    dos: [
      "Group models by provider for easy scanning",
      "Include a short description of each model's strengths",
      "Show the currently selected model name in the trigger",
      "Include a search input when offering more than 5 models",
    ],
    donts: [
      "Don't show deprecated or unavailable models",
      "Don't allow selecting a model mid-conversation without warning",
      "Don't use technical model IDs as display names — use human-friendly names",
    ],
    codeExample: `import {
  ModelSelector, ModelSelectorTrigger, ModelSelectorContent,
  ModelSelectorInput, ModelSelectorList, ModelSelectorGroup,
  ModelSelectorItem
} from "@cogentic-co/ds/chatbot"

<ModelSelector value="claude-opus-4" onValueChange={setModel}>
  <ModelSelectorTrigger>Claude Opus 4</ModelSelectorTrigger>
  <ModelSelectorContent>
    <ModelSelectorInput />
    <ModelSelectorList>
      <ModelSelectorGroup label="Anthropic">
        <ModelSelectorItem value="claude-opus-4" name="Claude Opus 4" description="Most capable" />
        <ModelSelectorItem value="claude-sonnet-4" name="Claude Sonnet 4" description="Best balance" />
      </ModelSelectorGroup>
    </ModelSelectorList>
  </ModelSelectorContent>
</ModelSelector>`,
  },
  timeline: {
    status: "stable",
    description:
      "Vertical timeline for displaying chronological events like audit trails, case history, or activity logs.",
    since: "0.3.0",
    importStatement:
      'import { Timeline, TimelineItem, TimelineDot, TimelineContent, TimelineTitle, TimelineTime } from "@cogentic-co/ds/timeline"',
    dos: [
      "Use for chronological event sequences (audit trails, case history)",
      "Add icons to TimelineDot for visual categorisation",
      "Include descriptions for important events",
      "Use colour-coded dots to indicate event severity or type",
    ],
    donts: [
      "Don't use for step-by-step processes — use Stepper instead",
      "Don't overload with too many events — paginate or virtualise long lists",
      "Don't omit timestamps — they're essential for audit context",
    ],
    codeExample: `import {
  Timeline, TimelineItem, TimelineDot,
  TimelineContent, TimelineTitle, TimelineTime,
} from "@cogentic-co/ds/timeline"

<Timeline>
  <TimelineItem>
    <TimelineDot />
    <TimelineContent>
      <TimelineTitle>KYC verification passed</TimelineTitle>
      <TimelineTime>2 hours ago</TimelineTime>
    </TimelineContent>
  </TimelineItem>
  <TimelineItem>
    <TimelineDot>
      <CheckCircle className="size-3 text-emerald-600" />
    </TimelineDot>
    <TimelineContent>
      <TimelineTitle>Case approved</TimelineTitle>
      <TimelineTime>Just now</TimelineTime>
    </TimelineContent>
  </TimelineItem>
</Timeline>`,
  },
}
