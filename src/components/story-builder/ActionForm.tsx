import useForm from "@/hooks/useForm"
import React, { FC } from "react"
import { ActionFormProps } from "./story-builder.types"
import * as yup from "yup"
import DiskIcon from "@/assets/icons/DiskIcon"
import { v4 } from "uuid"
import useEvent from "react-use-event-hook"
import { useStory } from "@/queries/useStory"

const javaTypeMap = {
  "java.lang.String": "TEXT",
  "java.util.List": "LIST",
}
type JavaTypeMapKeysType = keyof typeof javaTypeMap
const ActionForm: FC<ActionFormProps> = (props) => {
  const story = useStory()
  const flatLoadProps = props.action?.inputParameters
    ? Object.entries(props.action?.inputParameters)
        .map(([key, value]) =>
          value.objectParameter.objectFieldList.map((field) => ({
            name: field.name,
            type: field.javaType,
            value: field.value,
          }))
        )
        .flat()
    : []
  const flatCreatedProps = props.actionTemplate?.pmMap
    ? Object.entries(props.actionTemplate.pmMap)
        .map(([key, value]) =>
          value.objectParameterDto.fieldList.map((field) => ({
            name: field.name,
            type: field.javaType,
          }))
        )
        .flat()
    : []
  const flatProps: Array<{ name: string; type: string; value?: string }> = [
    ...flatLoadProps,
    ...flatCreatedProps,
  ]
  const initials: Record<string, string> = flatProps.reduce((prev, item) => {
    prev[item?.name] = "value" in item ? item.value : ""
    return prev
  }, {} as any)
  const form = useForm<typeof initials>({
    formType: "controlled",
    initialValues: initials,
  })
  const handleSave = useEvent(() => {
    if (!props.actionTemplate) return
    const inputParameters: any = Object.fromEntries(
      Object.entries(props.actionTemplate.pmMap).map(([key, value]) => [
        String(key),
        {
          isObject: value.isObject,
          objectParameter: {
            objectClassName:value.objectParameterDto.javaObjectClass,
            name: value.objectParameterDto.name,
            objectFieldList: value.objectParameterDto.fieldList.map(
              (field) => ({
                name: field.name,
                javaType: field.javaType,
                value: form.values[field.name],
              })
            ),
          },
        },
      ])
    )

    const payload: UpsertActionPayload = {
      actionDto: {
        name: props.actionTemplate.name,
        outputParameter: "out",
        inputParameters,
        classTemplateName: props.actionTemplate.templateClassName,
      },
      stateId: props.state.id,
      storyName: story.storyName as string,
    }
    form.handleSubmit(() => props.onSave(payload))()
  })
  return (
    <>
      {props.action &&
        Object.entries(props.action?.inputParameters).map(([key, pm]) => {
          return [
            <label key={`label-${v4()}`} className="text-xs">
              {pm.objectParameter.name}
            </label>,
            ...pm.objectParameter.objectFieldList.map((field) => {
              if (field.javaType === "TEXT")
                return (
                  <input
                    readOnly={true}
                    key={field.name}
                    className="mt-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...form.props(field.name, {
                      schema: yup.string(),
                    })}
                    placeholder={field.name}
                  />
                )
              if (field.javaType === "LIST")
                return (
                  <textarea
                    readOnly={true}
                    key={field.name}
                    className="overflow-y-hidden mt-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...form.props(field.name, {
                      schema: yup.string(),
                    })}
                    placeholder={`${field.name}
note:you can delimit list with coma`}
                  />
                )
            }),
            <hr key={`hr-${v4()}`} className="bg-slate-300 mt-1" />,
          ]
        })}

      {props.actionTemplate?.pmMap &&
        Object.entries(props.actionTemplate.pmMap).map(([key, pm]) => {
          return [
            <label key={`label-${v4()}`} className="text-xs">
              {pm.objectParameterDto.name}
            </label>,
            ...pm.objectParameterDto.fieldList.map((field) => {
              if (field.javaType === "TEXT")
                return (
                  <input
                    key={field.name}
                    className="mt-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...form.props(field.name, {
                      schema: yup.string(),
                    })}
                    placeholder={field.name}
                  />
                )
              if (field.javaType === "LIST")
                return (
                  <textarea
                    key={field.name}
                    className="overflow-y-hidden mt-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...form.props(field.name, {
                      schema: yup.string(),
                    })}
                    placeholder={`${field.name}
note:you can delimit list with coma`}
                  />
                )
            }),
            <hr key={`hr-${v4()}`} className="bg-slate-300 mt-1" />,
          ]
        })}
      {!Boolean(props.action) && (
        <button
          onClick={handleSave}
          className="bg-slate-200 w-full text-xs flex flex-row items-center justify-center border border-slate-300 rounded-md   p-1 hover:bg-slate-300"
        >
          <DiskIcon className="w-4 h-4 mr-1 fill-none stroke-black" /> Save
        </button>
      )}
    </>
  )
}

export default ActionForm
