import { PromptModalProps } from "@/components/modals/prompt-modal/PromptModal.specs"

export namespace PromptTypes {
  type ValueType = {
    state: StateType
    provided: boolean
    dispatch: React.Dispatch<ActionType>
  }

  type StateType = PromptModalProps[]
  type ActionType =
    | {
        type: "appear"
        props: PromptModalProps
      }
    | {
        type: "dismiss"
        id: string
      }
  type ReducerType = (state: StateType, action: ActionType) => StateType
}
