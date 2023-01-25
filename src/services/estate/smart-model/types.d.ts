type SmartModelType = {
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
  
  type SmartModelWithAssociations = SmartModelType & {  }
  
  type SmartModelCreatePayload = CreatePayload<SmartModelType>
  type SmartModelListParams = Pager<{}>
  type SmartModelListResponseType = PagerResponse<SmartModelWithAssociations>
  