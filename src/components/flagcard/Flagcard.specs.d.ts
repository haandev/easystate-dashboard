import { UseFormReturnType } from "@/hooks/useForm"
import {
  TwoActionProps,
  TwoActionType,
} from "@/components/two-action-modal/TwoAction.specs"
import { PropsWithChildren } from "react"
import { FC } from "react"
export type FlagcardFormType = Record<string, string>
export type FlagcardEvent = {
  form: UseFormReturnType<FlagcardFormType>
}

export type FlagcardProps = {
  type: "info" | "error" | "success" | "warning"
  message: string
  key?: string
  id?: string
  list?:string[]
  onDismiss?: (id: string) => void
}
export type FlagcardType = FC<PropsWithChildren<FlagcardProps>>
