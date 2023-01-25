type SmartModelType = {
  id: number
  tableName: string
  modelName: string
  singular: string
  plural: string
  description: string
  icon: string
  isHierarchy: boolean
  userOwnable: boolean
  groupOwnable: boolean
  sortable: boolean
  paranoid: boolean
  initialized: boolean
  fields: Array<SmartField>
  relationsAsSource: Array<SmartRelation>
  relationsAsTarget: Array<SmartRelation>
}

type SmartRelation = {
  id: number
  sourceModelId: number
  isSourceMany: boolean
  targetModelId: number
  isTargetMany: boolean
  pivotSmartModelTableName: string
  pivotSmartModelName: string
  targetAccessor?: string
  sourceAccessor?: string
  /* type definitions */
}

type SmartField = {
  id: number
  name: string
  title: string
  description: string
  icon: string
  smartOptions: any
}
type SmartModelWithAssociations = SmartModelType & {}

type SmartModelCreatePayload = CreatePayload<SmartModelType>
type SmartModelListParams = Pager<{}>
type SmartModelListResponseType = PagerResponse<SmartModelWithAssociations>
