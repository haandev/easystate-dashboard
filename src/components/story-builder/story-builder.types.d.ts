import { Handle, Position, Node } from "reactflow"

export type FlowDataType = { nodes: Node[]; edges: Edge[] }

export type ContextInjectableHandlers = {
  handleAddTargetState: (
    context: VirtualAddTargetStateNodeProps
  ) => Promise<any>
  handleTransitionAddEvent: (context: AddEventPayload) => Promise<any>
  handleUpsertCondition: (context: UpsertConditionPayload) => Promise<any>
  handleUpsertAction: (context: UpsertActionPayload) => Promise<any>
}

export type FlowContext = {
  handlers: ContextInjectableHandlers
}

export type VirtualAddTargetStateNodeData = {
  sourceNode: Node<StateNodeData>
  events: {
    onClick: ContextInjectableHandlers["handleAddTargetState"]
  }
}

export type VirtualAddTargetStateNodeProps = {
  data: VirtualAddTargetStateNodeData
}

export type TransitionNodeData = {
  sourceTransition: SingleTransitionType
  events: {
    onEventSave: ContextInjectableHandlers["handleTransitionAddEvent"]
    onConditionSave: ContextInjectableHandlers["handleUpsertCondition"]
  }
}

export type TransitionNodeProps = {
  data: TransitionNodeData
}

export type StateNodeData = {
  sourceState: SingleStateType
  events: {
    onActionSave: ContextInjectableHandlers["handleUpsertAction"]
  }
}

export type StateNodeProps = {
  data: StateNodeData
}

export type ActionFormProps = {
  state:SingleStateType
  actionTemplate?: SingleActionTemplateType
  action?: SingleActionType
  onSave: ContextInjectableHandlers["handleUpsertAction"]
}
