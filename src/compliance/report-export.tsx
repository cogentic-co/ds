"use client"

import { Download, FileText } from "lucide-react"
import { type ComponentProps, useCallback, useState } from "react"
import { Button } from "../components/button"
import { Checkbox } from "../components/checkbox"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/select"
import { cn } from "../lib/utils"

type ExportFormat = "pdf" | "csv" | "xlsx"

type ReportSection = {
  id: string
  label: string
  defaultChecked?: boolean
}

type ReportExportConfig = {
  format: ExportFormat
  dateFrom: string
  dateTo: string
  sections: string[]
}

type ReportExportProps = ComponentProps<"div"> & {
  /** Available sections the user can include/exclude */
  sections: ReportSection[]
  /** Called when the user clicks export */
  onExport: (config: ReportExportConfig) => void | Promise<void>
  /** Available formats. Default: all three */
  formats?: ExportFormat[]
  exporting?: boolean
}

function ReportExport({
  sections,
  onExport,
  formats = ["pdf", "csv", "xlsx"],
  exporting = false,
  className,
  ...props
}: ReportExportProps) {
  const [format, setFormat] = useState<ExportFormat>(formats[0])
  const [dateFrom, setDateFrom] = useState("")
  const [dateTo, setDateTo] = useState("")
  const [selectedSections, setSelectedSections] = useState<Set<string>>(
    () => new Set(sections.filter((s) => s.defaultChecked !== false).map((s) => s.id)),
  )

  const toggleSection = useCallback((id: string) => {
    setSelectedSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  const handleExport = useCallback(async () => {
    await onExport({
      format,
      dateFrom,
      dateTo,
      sections: Array.from(selectedSections),
    })
  }, [format, dateFrom, dateTo, selectedSections, onExport])

  return (
    <div
      data-slot="report-export"
      className={cn("flex flex-col gap-5 rounded-xl border border-border bg-card p-5", className)}
      {...props}
    >
      <div className="flex items-center gap-2">
        <FileText className="size-4 text-muted-foreground" />
        <span className="font-semibold text-sm">Export report</span>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">Format</Label>
          <Select value={format} onValueChange={(v) => setFormat(v as ExportFormat)}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {formats.includes("pdf") && <SelectItem value="pdf">PDF</SelectItem>}
              {formats.includes("csv") && <SelectItem value="csv">CSV</SelectItem>}
              {formats.includes("xlsx") && <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>}
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">From</Label>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label className="text-xs">To</Label>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="h-8 text-xs"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-medium text-xs">Include sections</span>
        <div className="grid gap-2 sm:grid-cols-2">
          {sections.map((section) => (
            <label key={section.id} className="flex items-center gap-2 text-sm">
              <Checkbox
                checked={selectedSections.has(section.id)}
                onCheckedChange={() => toggleSection(section.id)}
              />
              {section.label}
            </label>
          ))}
        </div>
      </div>

      <Button size="sm" onClick={handleExport} disabled={exporting} className="w-fit">
        <Download className="mr-1.5 size-3.5" />
        {exporting ? "Exporting..." : `Export as ${format.toUpperCase()}`}
      </Button>
    </div>
  )
}

export type { ExportFormat, ReportExportConfig, ReportExportProps, ReportSection }
export { ReportExport }
