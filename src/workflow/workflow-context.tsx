"use client"

import { createContext, useContext } from "react"

type WorkflowLayout = "vertical" | "horizontal"

const WorkflowContext = createContext<WorkflowLayout>("vertical")

function useWorkflowLayout() {
  return useContext(WorkflowContext)
}

export type { WorkflowLayout }
export { useWorkflowLayout, WorkflowContext }
