import React from "react"

export type ViewerProps = {
  dropdown?: any
  title: string
  items?: Record<string, Partial<FolderType & StoryType>>
  addLabel: string
  onAdd: () => void
  addIcon?: string
  currentFolderId?: string
}
