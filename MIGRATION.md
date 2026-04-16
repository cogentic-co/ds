# Migration — signal-landing feature visuals → `@cogentic-co/ds`

This guide maps the feature-page visual components that previously lived in
`signal-landing/src/components/ui/{bento-cards,showcase-animations}` and
adjacent files to their new locations in `@cogentic-co/ds`. Run a codemod
(or search-and-replace) across `src/` using the mappings below.

## 1. Subpaths

| Old (local) | New (`@cogentic-co/ds`) |
| --- | --- |
| `@/components/ui/workflow-primitives.tsx` (local fork) | `@cogentic-co/ds/workflow/workflow-node-card` |
| `@/components/ui/workflow-diagram.tsx` | `@cogentic-co/ds/workflow-diagram` |
| `@/components/ui/animated-beam.tsx` | `@cogentic-co/ds/workflow-diagram/animated-beam` |
| `@/components/ui/card-stack.tsx` | `@cogentic-co/ds/card-stack` |
| `@/components/ui/ds-icon.tsx` | `@cogentic-co/ds/lib/icon-map` (`Icon`) |
| `@/lib/icon-map.ts` | `@cogentic-co/ds/lib/icon-map` (`ICON_MAP`, `getIcon`) |
| `@/lib/use-css-vars.ts` | `@cogentic-co/ds/hooks/use-css-vars` |

## 2. Bento components

All bento components move to `@cogentic-co/ds/bento/<name>` (or the
aggregate `@cogentic-co/ds/bento`). The `Bento` prefix is dropped. Two
components were renamed for clarity:

| Old name | New name | Subpath |
| --- | --- | --- |
| `BentoProfile` | `Profile` | `@cogentic-co/ds/bento/profile` |
| `BentoScore` | `Score` | `@cogentic-co/ds/bento/score` |
| `BentoChecklist` (default mode) | `Checklist` | `@cogentic-co/ds/bento/checklist` |
| `BentoChecklist` (rule mode) | `RuleChecklist` | `@cogentic-co/ds/bento/rule-checklist` |
| `BentoFeed` | `Feed` | `@cogentic-co/ds/bento/feed` |
| `BentoCorridor` | `TransitionCard` | `@cogentic-co/ds/bento/transition-card` |
| `BentoCardGrid` | `CardGrid` | `@cogentic-co/ds/bento/card-grid` |
| `BentoSkillMatch` | `SkillMatch` | `@cogentic-co/ds/bento/skill-match` |
| `BentoDecisionRecord` | `DecisionRecord` | `@cogentic-co/ds/bento/decision-record` |
| `BentoSearchPanel` | `SearchPanel` | `@cogentic-co/ds/bento/search-panel` |
| `BentoRetentionTable` | `RetentionTable` | `@cogentic-co/ds/bento/retention-table` |
| `BentoDataMap` | `MappingMatrix` | `@cogentic-co/ds/bento/mapping-matrix` |

### Breaking: drop the `{ visual }` wrapper

All bento components used to take a single `visual` prop. They now take
visual fields as direct props.

```diff
- <BentoProfile className={...} visual={{ type: "profile", icon, name, subtitle, badges }} />
+ <Profile className={...} icon={icon} name={name} subtitle={subtitle} badges={badges} />
```

For data-driven pages, spread the visual object:

```tsx
// data file stays typed with BentoVisual discriminated union
const visual: ProfileVisual = { type: "profile", icon, name, subtitle, badges }
// render
<Profile {...visual} />
```

### Breaking: `BentoChecklist` split into two components

The old `BentoChecklist` detected "rule mode" from `heading?.startsWith("rule:")`.
That string check is gone — pick the component explicitly:

```diff
- <BentoChecklist visual={{ type: "checklist", heading: "Rule: X", items: [...] }} />
+ <RuleChecklist heading="X" items={[...]} />

- <BentoChecklist visual={{ type: "checklist", heading: "Required", items: [...] }} />
+ <Checklist heading="Required" items={[...]} />
```

The data-side type also splits:

```diff
- export type BentoChecklistVisual = { type: "checklist"; ... }
+ export type ChecklistVisual = { type: "checklist"; ... }
+ export type RuleChecklistVisual = { type: "ruleChecklist"; ... }
```

### Breaking: `BentoProfile.variant` rename

```diff
- variant?: "default" | "vasp"
+ variant?: "default" | "verified"
+ certifier?: string  // new: header pill label for the verified variant
```

If you previously relied on the first `success` badge being promoted to
the directory-header pill, that still works. Pass `certifier` explicitly
to force a specific label.

## 3. Showcase components

All move to `@cogentic-co/ds/showcase/<name>` (or aggregate
`@cogentic-co/ds/showcase`). Same rule: drop the `Showcase` prefix, drop
the `{ visual }` wrapper.

| Old name | New name | Subpath |
| --- | --- | --- |
| `ShowcaseSteps` | `Steps` | `@cogentic-co/ds/showcase/steps` |
| `ShowcaseSources` | `Sources` | `@cogentic-co/ds/showcase/sources` |
| `ShowcaseAction` | `Action` | `@cogentic-co/ds/showcase/action` |
| `ShowcaseDetail` | `Detail` | `@cogentic-co/ds/showcase/detail` |
| `ShowcaseVersionHistory` | `VersionHistory` | `@cogentic-co/ds/showcase/version-history` |

```diff
- <ShowcaseSteps visual={{ type: "steps", steps: [...] }} />
+ <Steps steps={[...]} />
```

## 4. Icon resolution

The `DsIcon` component is now `Icon`, and `ICON_MAP` / `getIcon` live in
the same file:

```diff
- import { DsIcon } from "@/components/ui/ds-icon"
+ import { Icon } from "@cogentic-co/ds/lib/icon-map"

- import { ICON_MAP, getIcon } from "@/lib/icon-map"
+ import { ICON_MAP, getIcon } from "@cogentic-co/ds/lib/icon-map"
```

Behaviour is unchanged: `Icon` resolves a string name (case-insensitive,
dashes/spaces stripped) to a pixelarticons component, falling back to
rendering the name as text so emoji / plain strings still work.

## 5. Workflow node — delete the local fork

`signal-landing/src/components/ui/workflow-primitives.tsx` was a local fork of
DS `WorkflowNodeCard`. Delete it. Use the DS component directly:

```tsx
import { WorkflowNodeCard } from "@cogentic-co/ds/workflow/workflow-node-card"
```

Two changes worth noting in the DS version:

- **Status icons** use pixelarticons (`Loader`, `Check`, `WarningDiamond`,
  `Clock`) instead of lucide. This is purely a visual change — the prop
  surface is unchanged.
- **New prop `hideStatusLabel?: boolean`** — hides the text label in the
  status badge while keeping the icon. Useful in compact layouts.

## 6. `AnimatedBeam` caveats

`AnimatedBeam` uses refs and `ResizeObserver` to measure its `from` and
`to` DOM nodes. For it to render correctly:

1. Both refs must be attached to nodes that are measurable at mount
   (i.e. in the DOM and laid out).
2. The `containerRef` must wrap both endpoints in a positioned ancestor.
3. If the beam appears to have the wrong length on first paint, it's
   usually because fonts / images haven't settled yet; the component
   schedules a post-paint re-measure via `requestAnimationFrame`, so
   the second frame is usually correct.
4. If the endpoints can unmount (e.g. tabs, conditional rendering),
   the observer will detach cleanly, but the beam will not auto-redraw
   — wrap it in a `key` that changes when endpoints change identity.

## 7. CSS — `text-xxs` utility

DS `globals.css` now defines `text-xxs` (`0.6875rem` / `leading-[1.45]`).
If your app CSS was defining it locally, remove that definition after
importing `@cogentic-co/ds/styles.css`.

## 8. `pixelarticons` becomes a direct dependency

Previously a devDependency in DS (pulled transitively). It is now a
regular dependency, so consumers get it automatically. No action needed.
