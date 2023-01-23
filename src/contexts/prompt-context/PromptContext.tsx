import PromptModal from "@/components/modals/prompt-modal/PromptModal"
import { PromptModalProps } from "@/components/modals/prompt-modal/PromptModal.specs"
import {
  Children,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useMemo,
  useReducer,
  useState,
} from "react"
import { PromptTypes } from "./types"

const initialState: PromptTypes.StateType = []

const initialValue: PromptTypes.ValueType = {
  state: initialState,
  provided: false,
  dispatch: () => {},
}

export const PromptContext = createContext(initialValue)

const reducer: PromptTypes.ReducerType = (state, action) => {
  switch (action.type) {
    case "appear":
      return [...state, action.props]
    case "dismiss":
      return state.filter((modal) => modal.id !== action.id)
    default:
      return state
  }
}
export const PromptProvider: FC<PropsWithChildren<any>> = ({
  children,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  
  return (
    <PromptContext.Provider
      {...props}
      value={{
        provided: true,
        dispatch,
        state,
      }}
    >
      {children}
      {state.map((modalData) => (
        <PromptModal
          {...modalData}
          visible={modalData.visible}
          onOk={modalData.onOk}
          onClose={modalData.onClose}
          onCancel={modalData.onCancel}
        />
      ))}
    </PromptContext.Provider>
  )
}
