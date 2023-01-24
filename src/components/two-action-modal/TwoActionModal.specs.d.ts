import TwoActionModal from "./TwoActionModal"
import { FC, PropsWithChildren } from "react"

type TwoActionModalProps<Event = any> = {
  id:string
  key?:string
  visible?: boolean
  onClose?: (e?: Event) => void
  onOk?: (e?: Event) => Promise
  onCancel?: (e?: Event) => void
  okTitle?: string
  cancelTitle?: string
  title?: string,
  icon?:any,
  color:string
}

type TwoActionModalType<Omits = "", Extends = {}, Event=any> = FC<
  PropsWithChildren<Extends & Omit<TwoActionModalProps<Event>, Omits>>
>
