"use client"

import { MoreHorizontal, Plus } from "lucide-react"
import type { ComponentProps } from "react"
import { Badge } from "../components/badge"
import { Button } from "../components/button"
import { CopyButton } from "../components/copy-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/table"
import { cn, timeAgo } from "../lib/utils"

type ApiKey = {
  id: string
  name: string
  /** Masked/preview form of the key (e.g. "sk_live_...ab42") — full key is never stored client-side after creation */
  preview: string
  /** ISO timestamp of creation */
  createdAt: string
  /** ISO timestamp of last use, if any */
  lastUsed?: string
  /** Optional scope/permissions summary (e.g. "Read only", "Full access") */
  scope?: string
  /** Whether this key is currently active */
  active?: boolean
}

type ApiKeyManagerProps = ComponentProps<"div"> & {
  keys: ApiKey[]
  onCreate?: () => void
  onRevoke?: (id: string) => void
  onRotate?: (id: string) => void
  /** Title rendered above the table. Default: "API keys" */
  title?: string
}

function ApiKeyManager({
  keys,
  onCreate,
  onRevoke,
  onRotate,
  title = "API keys",
  className,
  ...props
}: ApiKeyManagerProps) {
  return (
    <div data-slot="api-key-manager" className={cn("flex flex-col gap-4", className)} {...props}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">{title}</h3>
        {onCreate && (
          <Button size="sm" onClick={onCreate}>
            <Plus className="mr-1 size-3.5" />
            Create key
          </Button>
        )}
      </div>

      <div className="rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Key</TableHead>
              <TableHead>Scope</TableHead>
              <TableHead>Last used</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-muted-foreground text-sm">
                  No API keys yet
                </TableCell>
              </TableRow>
            ) : (
              keys.map((key) => (
                <TableRow key={key.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{key.name}</span>
                      {key.active === false && (
                        <Badge
                          square
                          variant="outline"
                          className="border-red-700/40 bg-red-700/10 px-1.5 py-0.5 text-[9px] text-red-700 uppercase dark:border-red-400/40 dark:bg-red-400/10 dark:text-red-400"
                        >
                          Revoked
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {key.preview}
                      </code>
                      <CopyButton value={key.preview} size="icon-xs" />
                    </div>
                  </TableCell>
                  <TableCell>
                    {key.scope && (
                      <span className="text-muted-foreground text-xs">{key.scope}</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-muted-foreground text-xs">
                      {key.lastUsed ? timeAgo(key.lastUsed) : "Never"}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="font-mono text-muted-foreground text-xs">
                      {timeAgo(key.createdAt)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button variant="ghost" size="icon-xs">
                            <MoreHorizontal className="size-3.5" />
                          </Button>
                        }
                      />
                      <DropdownMenuContent align="end">
                        {onRotate && key.active !== false && (
                          <DropdownMenuItem onClick={() => onRotate(key.id)}>
                            Rotate key
                          </DropdownMenuItem>
                        )}
                        {onRevoke && key.active !== false && (
                          <>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => onRevoke(key.id)}
                              className="text-destructive"
                            >
                              Revoke
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export { ApiKeyManager }
export type { ApiKey, ApiKeyManagerProps }
