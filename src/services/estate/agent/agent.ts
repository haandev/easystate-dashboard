import { stringMap } from "@/utils/common"
import { number } from "yup"
import { instance } from "../instance"
import queryString from "query-string"

export const create = (payload: AgentCreatePayload) => {
  return instance.post<AgentType>("/admin/agent", payload)
}

export const update = (id: number, payload: AgentCreatePayload) => {
  return instance.put<AgentType>(`/admin/agent/${id}`, payload)
}

export const list = (params: AgentListParams) => {
  params.pageIndex ||= 1
  params.pageSize ||= 15
  const search = queryString.stringify(params)

  return instance.get<AgentListResponseType>(
    "/admin/agent?" + search.toString()
  )
}

export const find = (id: number) => {
  return instance.get<AgentType>(`/admin/agent/${id}`)
}

export const destroy = (id: number) => {
  return instance.delete<AgentType>(`/admin/agent/${id}`)
}
