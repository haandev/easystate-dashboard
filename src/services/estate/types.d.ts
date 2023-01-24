type SuccessResponseType<ContentType = any, Code = 200> = ContentType

type ErrorResponseType<ErrorContentType = any, Code = 400> = ErrorContentType

type AnyResponse = SuccessResponseType | ErrorResponseType

type Pager<T> = {
  pageIndex?: number | string
  pageSize?: number | string
  sortBy?: string
  sortType?: "asc" | "desc"
} & T

type PagerResponse<T> = { count: number; rows: Array<T> }

type CreatePayload<T> = Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
