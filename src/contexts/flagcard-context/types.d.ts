import { FlagcardProps } from "@/components/flagcard/Flagcard.specs"

export namespace FlagcardTypes {
  type ValueType = {
    state: StateType
    provided: boolean
    dispatch: React.Dispatch<ActionType>
  }

  type StateType = FlagcardProps[]
  type ActionType =
    | {
        type: "appear"
        props: FlagcardProps
      }
    | {
        type: "dismiss"
        id: string
      }
  type ReducerType = (state: StateType, action: ActionType) => StateType
}
