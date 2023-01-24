import {
  PromptModalEvent,
  PromptModalProps,
} from "@/components/modals/prompt-modal/PromptModal.specs"
import { useContext, useMemo } from "react"
import useEvent from "react-use-event-hook"
import { v4 } from "uuid"
import { PromptContext } from "./PromptContext"

export const usePrompt = () => {
  const contextValue = useContext(PromptContext)
  if (!contextValue.provided) {
    throw new Error("usePrompt must be used within a PromptProvider.")
  }
  const appear = useEvent((props: PromptModalProps) => {
    contextValue.dispatch({ type: "appear", props })
  })

  const asyncAppear = useEvent(
    (props: PromptModalProps) =>
      new Promise<PromptModalEvent | null>((resolve, reject) => {
        contextValue.dispatch({
          type: "appear",
          props: {
            ...props,
            key: `${props.id}_${v4()}`,
            visible: true,
            onOk: (values) => {
              props.onOk?.(values)
              resolve(values as PromptModalEvent)
              contextValue.dispatch({ type: "dismiss", id: props.id })
            },
            onCancel: () => {
              props.onCancel?.()
              reject(null)
              contextValue.dispatch({ type: "dismiss", id: props.id })
            },
          },
        })
      })
  )

  const dismiss = useEvent((id: string) => {
    contextValue.dispatch({ type: "dismiss", id })
  })

  return useMemo(() => ({ appear, dismiss, asyncAppear }), [])
}
