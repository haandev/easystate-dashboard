type DataGridProps = {
  checkbox?: boolean
  totalCount: number
  pageIndex: number
  pageSize: number
  keyField: string
  columns: Array<{
    dataStyles?: string
    headingStyles?: string
    label?: string
    field?: string
    sortable?: boolean
    align?: "right" | "left" | "center"
    formatter?: (value: any) => any
    render?: (row: any, index: number) => any
  }>
  onPageIndexChange?: (pageIndex: number) => void
  onPageSizeChange?: (pageSize: number) => void
  rows?: Array<any>
}
