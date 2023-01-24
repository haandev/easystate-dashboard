import React, { useEffect, useRef } from "react"
import useForm from "@/hooks/useForm"
import TwoActionModal from "@/components/two-action-modal"
import * as yup from "yup"
import { PromptFormType, PromptModalType } from "./PromptModal.specs"
import useEvent from "react-use-event-hook"

const PromptModal: PromptModalType = ({ children, ...props }) => {
  const form = useForm<PromptFormType>({
    formType: "controlled",
    formId: "prompt-form",
    initialValues: Object.fromEntries(
      Object.entries(props.fields||{}).map(([key, value]) => [
        key,
        (value.initialValue as string) || "",
      ])
    ),
  })
  const inputRef = useRef<HTMLInputElement & HTMLTextAreaElement>(null)

  useEffect(() => {
    Object.entries(props.fields||{}).forEach(([key, value]) => {
      form.handleFieldChange(key, value.initialValue)
    })

    setTimeout(() => {
      inputRef.current?.focus()
      inputRef.current?.select()
    }, 100)
  }, [props.visible])

  const handleOk = useEvent(() => {
    form.handleSubmit((_values) => props.onOk?.({ form }))()
  })
  const handleCancel = useEvent(() => {
    props.onCancel?.()
  })
  return props.visible ? (
    <TwoActionModal
      {...props}
      onOk={handleOk}
      onCancel={handleCancel}
      onClose={handleCancel}
      title={props.title}
    >
      {Object.entries(props.fields||{}).map(([key, value], idx) => {
        const edt = value.editor !== "textarea"
        if (edt)
          return (
            <div key={idx}>
              {value.label ? (
                <label
                  htmlFor={`prompt-form.${key}`}
                  className="text-left block text-sm font-medium text-gray-700 mb-1"
                >
                  {value.label}
                </label>
              ) : null}
              <input
                ref={idx === 0 ? inputRef : undefined}
                {...form.props(key, {
                  schema: yup.string().required(value.requiredMessage || ""),
                })}
                placeholder={value.placeholder}
                autoComplete="off"
                className="mb-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          )
        return (
          <div key={idx}>
            {value.label ? (
              <label
                htmlFor={`prompt-form.${key}`}
                className="text-left block text-sm font-medium text-gray-700 mb-1"
              >
                {value.label}
              </label>
            ) : null}
            <textarea
              ref={idx === 0 ? inputRef : undefined}
              {...form.props(key, {
                schema: yup.string().required(value.requiredMessage || ""),
              })}
              placeholder={value.placeholder}
              autoComplete="off"
              className="mb-2 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        )
      })}
    </TwoActionModal>
  ) : null
}

export default PromptModal
