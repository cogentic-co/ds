"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function TablePreview() {
  return (
    <div className="max-w-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[
            { name: "Alice Johnson", status: "Active", role: "Admin", amount: "$2,500" },
            { name: "Bob Smith", status: "Inactive", role: "User", amount: "$1,200" },
            { name: "Carol Williams", status: "Active", role: "Editor", amount: "$3,100" },
            { name: "David Brown", status: "Active", role: "User", amount: "$800" },
          ].map((row) => (
            <TableRow key={row.name}>
              <TableCell className="font-medium">{row.name}</TableCell>
              <TableCell>
                <Badge variant={row.status === "Active" ? "default" : "secondary"}>
                  {row.status}
                </Badge>
              </TableCell>
              <TableCell>{row.role}</TableCell>
              <TableCell className="text-right">{row.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
