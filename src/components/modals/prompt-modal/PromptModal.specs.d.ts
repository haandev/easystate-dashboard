import { UseFormReturnType } from "@/hooks/useForm"
import {
  TwoActionModalProps,
  TwoActionModalType,
} from "@/components/two-action-modal/TwoActionModal.specs"
import { PropsWithChildren } from "react"
import { FC } from "react"
export type PromptFormType = Record<string, string>
export type PromptModalEvent = {
  form: UseFormReturnType<PromptFormType>
}

export type PromptModalProps = PropsWithChildren<
  TwoActionModalProps<PromptModalEvent> & {
    fields?: Record<
      string,
      {
        placeholder?: string
        label?: string
        initialValue?: string
        requiredMessage?: string
        editor?: "input" | "textarea"
      }
    >
  }
>
export type PromptModalType = FC<PropsWithChildren<PromptModalProps>>
