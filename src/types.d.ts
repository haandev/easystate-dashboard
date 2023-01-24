type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
type WithId<T> = { id?: number } & T
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
