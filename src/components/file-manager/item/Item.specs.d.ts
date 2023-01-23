export type ItemProps = {
  title:string
  item?: Partial<StoryType & FolderType>
  contextMenuStrip?: any
  isSelected: boolean
  onClick: (id: string) => void
  onDoubleClick?: (e: MouseEventHandler<HTMLDivElement>) => void
  icon?: string
}
