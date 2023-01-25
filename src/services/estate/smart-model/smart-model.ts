import { stringMap } from "@/utils/common"
import { number } from "yup"
import { instance } from "../instance"
import queryString from "query-string"

export const create = (payload: SmartModelCreatePayload) => {
  return instance.post<SmartModelType>("/admin/smart/model", payload)
}

export const update = (id: number, payload: SmartModelCreatePayload) => {
  return instance.put<SmartModelType>(`/admin/smart/model/${id}`, payload)
}

export const list = (params: SmartModelListParams) => {
  params.pageIndex ||= 1
  params.pageSize ||= 15
  const search = queryString.stringify(params)

  return instance.get<SmartModelListResponseType>(
    "/admin/smart/model?" + search.toString()
  )
}

export const find = (id: number) => {
  return instance.get<SmartModelType>(`/admin/smart/model/${id}`)
}

export const destroy = (id: number) => {
  return instance.delete<SmartModelType>(`/admin/smart/model/${id}`)
}
