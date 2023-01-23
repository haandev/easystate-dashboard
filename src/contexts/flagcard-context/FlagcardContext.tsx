import Flagcard from "@/components/flagcard/Flagcard"
import { FlagcardProps } from "@/components/flagcard/Flagcard.specs"
import { createContext, FC, PropsWithChildren, useReducer } from "react"
import useEvent from "react-use-event-hook"
import { v4 } from "uuid"
import { FlagcardTypes } from "./types"

const initialState: FlagcardTypes.StateType = []

const initialValue: FlagcardTypes.ValueType = {
  state: initialState,
  provided: false,
  dispatch: () => {},
}

export const FlagcardContext = createContext(initialValue)

const reducer: FlagcardTypes.ReducerType = (state, action) => {
  switch (action.type) {
    case "appear":
      return [...state, action.props]
    case "dismiss":
      return state.filter((flagcard) => flagcard.id !== action.id)
    default:
      return state
  }
}
export const FlagcardProvider: FC<PropsWithChildren<any>> = ({
  children,
  ...props
}) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const dismiss = useEvent((id: string) => {
    dispatch({ type: "dismiss", id })
  })

  
  return (
    <FlagcardContext.Provider
      {...props}
      value={{
        provided: true,
        dispatch,
        state,
      }}
    >
      {children}
      <div className="absolute right-8 flex flex-col justify-start items-end pr-10 z-50 top-24">
        {state.map((flagcardData, idx) => (
          <Flagcard {...flagcardData} key={v4()} onDismiss={dismiss} />
        ))}
      </div>
    </FlagcardContext.Provider>
  )
}
