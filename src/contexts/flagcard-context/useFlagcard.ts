import {
  FlagcardEvent,
  FlagcardProps,
} from "@/components/flagcard/Flagcard.specs"
import { useContext, useMemo } from "react"
import useEvent from "react-use-event-hook"
import { v4 } from "uuid"
import { FlagcardContext } from "./FlagcardContext"

export const useFlagcard = () => {
  const contextValue = useContext(FlagcardContext)
  if (!contextValue.provided) {
    throw new Error("useFlagcard must be used within a PromptProvider.")
  }
  const appear = useEvent((props: FlagcardProps) => {
    const id = v4()

    contextValue.dispatch({
      type: "appear",
      props: {
        ...props,
        key: id,
        id,
      },
    })
  })

  const dismiss = useEvent((id: string) => {
    contextValue.dispatch({ type: "dismiss", id })
  })

  return useMemo(() => ({ appear, dismiss }), [])
}
