"use client"

import { Attachment, Attachments } from "@/src/chatbot"

export default function AttachmentsPreview() {
  return (
    <Attachments>
      <Attachment name="compliance-report.pdf" type="file" />
      <Attachment name="screenshot.png" type="image" onRemove={() => {}} />
      <Attachment name="meeting-recording.mp4" type="video" />
      <Attachment name="interview.mp3" type="audio" />
    </Attachments>
  )
}
