---
"@cogentic-co/ds": minor
---

Port feature-page visuals from signal-landing. Adds four new subpaths:

- `@cogentic-co/ds/workflow-diagram` — inline SVG workflow renderer (`WorkflowDiagram`) with branching bezier edges, travelling-dot animations, and a headless `AnimatedBeam` primitive for connecting arbitrary ref'd DOM nodes.
- `@cogentic-co/ds/card-stack` — scattered rotated-card hero composition (`CardStack`, `StackCard`, `GhostCard`).
- `@cogentic-co/ds/bento` — 12 feature-page bento visuals: `Profile` (with `verified` variant), `Score`, `Checklist`, `RuleChecklist`, `Feed`, `TransitionCard`, `CardGrid`, `SkillMatch`, `DecisionRecord`, `SearchPanel`, `RetentionTable`, `MappingMatrix`.
- `@cogentic-co/ds/showcase` — 5 in-panel showcase animations: `Steps`, `Sources`, `Action`, `Detail`, `VersionHistory`.

Also adds:

- `WorkflowNodeCard` — status icons converged to pixelarticons (Loader / Check / WarningDiamond / Clock); new `hideStatusLabel` prop.
- `@cogentic-co/ds/lib/icon-map` — shared pixelarticons resolver (`ICON_MAP`, `getIcon`, `Icon` component) so data-driven `icon: string` shapes work out of the box.
- `@cogentic-co/ds/hooks/use-css-vars` — `useResolvedCssVars(names)` for passing CSS custom properties to APIs that don't honour `var(--...)` (e.g. canvas `fillStyle`).
- `text-xxs` (`@utility`) added to `styles/globals.css`.
- `pixelarticons` moved from devDependencies to dependencies.
