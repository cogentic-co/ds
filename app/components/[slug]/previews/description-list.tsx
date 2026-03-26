"use client"

import { Badge } from "@/components/ui/badge"
import {
  DescriptionList,
  DescriptionListDetail,
  DescriptionListItem,
  DescriptionListTerm,
} from "@/components/ui/description-list"

export default function DescriptionListPreview() {
  return (
    <DescriptionList>
      <DescriptionListItem>
        <DescriptionListTerm>Full Name</DescriptionListTerm>
        <DescriptionListDetail>James Cooke</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Email</DescriptionListTerm>
        <DescriptionListDetail>user@example.com</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Role</DescriptionListTerm>
        <DescriptionListDetail>Engineering Lead</DescriptionListDetail>
      </DescriptionListItem>
      <DescriptionListItem>
        <DescriptionListTerm>Status</DescriptionListTerm>
        <DescriptionListDetail>
          <Badge variant="default">Active</Badge>
        </DescriptionListDetail>
      </DescriptionListItem>
    </DescriptionList>
  )
}
