import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { axe } from "vitest-axe"
import {
  AuditLog,
  AuditLogContent,
  AuditLogDetail,
  AuditLogEntry,
  AuditLogIcon,
  AuditLogMessage,
  AuditLogMeta,
  AuditLogTime,
} from "../audit-log"

function renderLog() {
  return render(
    <AuditLog>
      <AuditLogEntry action="create">
        <AuditLogIcon>+</AuditLogIcon>
        <AuditLogContent>
          <AuditLogMessage>
            <strong>Sarah Chen</strong> created case #1234
          </AuditLogMessage>
          <AuditLogMeta>
            <AuditLogTime>2 hours ago</AuditLogTime>
            <span>Compliance Team</span>
          </AuditLogMeta>
          <AuditLogDetail>New KYC review initiated for Acme Corp.</AuditLogDetail>
        </AuditLogContent>
      </AuditLogEntry>
    </AuditLog>,
  )
}

describe("AuditLog", () => {
  it("renders without crashing", () => {
    renderLog()
    expect(screen.getByRole("log")).toBeInTheDocument()
    expect(screen.getByText(/created case #1234/)).toBeInTheDocument()
  })

  it("has no accessibility violations", async () => {
    const { container } = renderLog()
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it("has data-slot attributes", () => {
    const { container } = renderLog()
    expect(container.querySelector("[data-slot='audit-log']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-entry']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-icon']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-content']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-message']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-meta']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-time']")).toBeInTheDocument()
    expect(container.querySelector("[data-slot='audit-log-detail']")).toBeInTheDocument()
  })

  it("sets data-action attribute", () => {
    const { container } = renderLog()
    expect(container.querySelector("[data-action='create']")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(<AuditLog className="my-8" />)
    expect(container.querySelector("[data-slot='audit-log']")).toHaveClass("my-8")
  })

  it("renders time element", () => {
    renderLog()
    expect(screen.getByText("2 hours ago")).toBeInTheDocument()
  })

  it("renders detail section", () => {
    renderLog()
    expect(screen.getByText("New KYC review initiated for Acme Corp.")).toBeInTheDocument()
  })
})
