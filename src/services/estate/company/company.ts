import { stringMap } from "@/utils/common"
import { number } from "yup"
import { instance } from "../instance"
import queryString from "query-string"

export const create = (payload: CompanyCreatePayload) => {
  return instance.post<CompanyType>("/admin/company", payload)
}

export const update = (id: number, payload: CompanyCreatePayload) => {
  return instance.put<CompanyType>(`/admin/company/${id}`, payload)
}

export const list = (params: CompanyListParams) => {
  params.pageIndex ||= 1
  params.pageSize ||= 15
  const search = queryString.stringify(params)

  return instance.get<CompanyListResponseType>(
    "/admin/company?" + search.toString()
  )
}

export const find = (id: number) => {
  return instance.get<CompanyType>(`/admin/company/${id}`)
}

export const destroy = (id: number) => {
  return instance.delete<CompanyType>(`/admin/company/${id}`)
}
