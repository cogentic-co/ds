"use client"

import { addDays, format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import type * as React from "react"
import type { DateRange } from "react-day-picker"

import { cn } from "../lib/utils"
import { Button } from "./button"
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"

/* ────────────────────────────────────────────────────────────────────────────
 * DatePicker — single date
 * ──────────────────────────────────────────────────────────────────────────── */

type DatePickerPreset = {
  label: string
  /** Number of days from today (0 = today, 1 = tomorrow, -7 = a week ago) */
  days: number
}

type DatePickerProps = {
  /** Currently selected date */
  value?: Date
  /** Callback when date changes */
  onChange?: (date: Date | undefined) => void
  /** Placeholder text when no date selected */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Preset quick-select options */
  presets?: DatePickerPreset[]
  /** Alignment of the popover */
  align?: "start" | "center" | "end"
  /** Additional className for the trigger button */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Props forwarded to the Calendar */
  calendarProps?: Omit<React.ComponentProps<typeof Calendar>, "mode" | "selected" | "onSelect">
}

function DatePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  dateFormat = "PPP",
  presets,
  align = "start",
  className,
  disabled,
  calendarProps,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-4" />
        {value ? format(value, dateFormat) : <span>{placeholder}</span>}
      </PopoverTrigger>
      <PopoverContent
        align={align}
        className={cn("w-auto p-0", presets && "flex flex-col space-y-2 p-2")}
      >
        {presets && (
          <Select
            onValueChange={(v: string | null) => {
              if (v) onChange?.(addDays(new Date(), Number.parseInt(v, 10)))
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              {presets.map((preset) => (
                <SelectItem key={preset.days} value={`${preset.days}`}>
                  {preset.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <div className={cn(presets && "rounded-md border")}>
          <Calendar mode="single" selected={value} onSelect={onChange} {...calendarProps} />
        </div>
      </PopoverContent>
    </Popover>
  )
}

/* ────────────────────────────────────────────────────────────────────────────
 * DateRangePicker
 * ──────────────────────────────────────────────────────────────────────────── */

type DateRangePickerProps = {
  /** Currently selected date range */
  value?: DateRange
  /** Callback when range changes */
  onChange?: (range: DateRange | undefined) => void
  /** Placeholder text when no date selected */
  placeholder?: string
  /** Date format string (date-fns format) */
  dateFormat?: string
  /** Number of months to display (default: 2) */
  numberOfMonths?: number
  /** Alignment of the popover */
  align?: "start" | "center" | "end"
  /** Additional className for the trigger button */
  className?: string
  /** Disabled state */
  disabled?: boolean
  /** Props forwarded to the Calendar */
  calendarProps?: Omit<
    React.ComponentProps<typeof Calendar>,
    "mode" | "selected" | "onSelect" | "numberOfMonths"
  >
}

function DateRangePicker({
  value,
  onChange,
  placeholder = "Pick a date",
  dateFormat = "LLL dd, y",
  numberOfMonths = 2,
  align = "start",
  className,
  disabled,
  calendarProps,
}: DateRangePickerProps) {
  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className,
            )}
          />
        }
      >
        <CalendarIcon className="size-4" />
        {value?.from ? (
          value.to ? (
            <>
              {format(value.from, dateFormat)} – {format(value.to, dateFormat)}
            </>
          ) : (
            format(value.from, dateFormat)
          )
        ) : (
          <span>{placeholder}</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align={align}>
        <Calendar
          mode="range"
          defaultMonth={value?.from}
          selected={value}
          onSelect={onChange}
          numberOfMonths={numberOfMonths}
          {...calendarProps}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker, DateRangePicker }
export type { DatePickerPreset, DatePickerProps, DateRangePickerProps }
