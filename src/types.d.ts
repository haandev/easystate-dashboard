type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
namespace dojo {
  type ViewerItemType = {
    id: string
    lastUpdate?: string
    kind?: "story" | "collection"
    subicon?: string
    title: string
    isReserved?: boolean
    reservedBy?: string
    subtext?: string
    //sortIndex?: number
  }
}
