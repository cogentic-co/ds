"use client"

import { Task, TaskContent, TaskItem, TaskTrigger } from "@/src/chatbot"

export default function TaskPreview() {
  return (
    <Task defaultOpen>
      <TaskTrigger status="running">Setting up compliance infrastructure</TaskTrigger>
      <TaskContent>
        <TaskItem status="complete">Created database schema</TaskItem>
        <TaskItem status="complete">Configured API endpoints</TaskItem>
        <TaskItem status="running">Running screening provider integration</TaskItem>
        <TaskItem status="pending">Setting up monitoring alerts</TaskItem>
        <TaskItem status="pending">Deploying to staging</TaskItem>
      </TaskContent>
    </Task>
  )
}
