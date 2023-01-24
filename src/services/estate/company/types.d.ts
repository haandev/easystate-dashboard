type CompanyType = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
}

type CompanyCreatePayload = CreatePayload<CompanyType>
type CompanyListParams = Pager<{}>
type CompanyListResponseType = PagerResponse<CompanyType>
