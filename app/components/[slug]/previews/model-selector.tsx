"use client"

import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorTrigger,
} from "@/src/chat"

export default function ModelSelectorPreview() {
  return (
    <ModelSelector value="claude-opus-4" onValueChange={() => {}}>
      <ModelSelectorTrigger>Claude Opus 4</ModelSelectorTrigger>
      <ModelSelectorContent>
        <ModelSelectorInput />
        <ModelSelectorList>
          <ModelSelectorGroup label="Anthropic">
            <ModelSelectorItem
              value="claude-opus-4"
              name="Claude Opus 4"
              description="Most capable model"
            />
            <ModelSelectorItem
              value="claude-sonnet-4"
              name="Claude Sonnet 4"
              description="Best balance of speed and quality"
            />
            <ModelSelectorItem
              value="claude-haiku-4"
              name="Claude Haiku 4"
              description="Fastest responses"
            />
          </ModelSelectorGroup>
          <ModelSelectorGroup label="OpenAI">
            <ModelSelectorItem value="gpt-4o" name="GPT-4o" description="Multimodal flagship" />
            <ModelSelectorItem
              value="gpt-4o-mini"
              name="GPT-4o Mini"
              description="Cost-effective"
            />
          </ModelSelectorGroup>
        </ModelSelectorList>
      </ModelSelectorContent>
    </ModelSelector>
  )
}
