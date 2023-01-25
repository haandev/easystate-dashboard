type AgentType = {
  id: number
  name: string
  surname: string
  username: string
  phone: string
  companyId: number
  createdAt: string
  updatedAt: string
  password?:string
}

type AgentWithAssociations = AgentType & { company: CompanyType }

type AgentCreatePayload = CreatePayload<AgentType>
type AgentListParams = Pager<{}>
type AgentListResponseType = PagerResponse<AgentWithAssociations>
