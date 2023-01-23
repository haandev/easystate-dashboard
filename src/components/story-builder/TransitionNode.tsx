import ConditionIcon from "@/assets/icons/ConditionIcon"
import useBoolean from "@/hooks/useBoolean"
import useForm from "@/hooks/useForm"
import { useEventTemplate } from "@/queries/useEventTemplate"
import {
  ArrowUpTraySolid,
  ChevronDownSolid,
  ChevronUpOutline,
  ChevronUpSolid,
  PlusOutline,
} from "@graywolfai/react-heroicons"
import React, { FC, useEffect, useState } from "react"
import { Handle, Position } from "reactflow"
import { TransitionNodeProps } from "./story-builder.types"
import * as yup from "yup"
import useEvent from "react-use-event-hook"
import { useStory } from "@/queries/useStory"
import { getSourceStateByTransitionId } from "@/pages/app/Story/flow-utils"
import classNames from "classnames"
import EventIcon from "@/assets/icons/EventIcon"
import DiskIcon from "@/assets/icons/DiskIcon"
import ResetIcon from "@/assets/icons/ResetIcon"
import { useConditionRule } from "@/queries/useConditionRule"
import Dropdown from "../dropdown/Dropdown"
import EqualIcon from "@/assets/icons/EqualIcon"
import CaseSensitiveEqual from "@/assets/icons/CaseSensitiveEqual"
import ContainsIcon from "@/assets/icons/ContainsIcon"
import ListIcon from "@/assets/icons/ListIcon"
import IsNull from "@/assets/icons/IsNull"
import LessThanIcon from "@/assets/icons/LessThanIcon"
import LessThanOrEqualIcon from "@/assets/icons/LessThanOrEqualIcon"
import GreaterThanIcon from "@/assets/icons/GreaterThanIcon"
import GreaterThanOrEqualIcon from "@/assets/icons/GreaterThanOrEqualIcon"
import NotEqualIcon from "@/assets/icons/NotEqualIcon"

const ConditionRuleIcons: any = {
  none: { operator: "", icon: ChevronDownSolid },
  "equal to": { operator: "==", icon: EqualIcon },
  "not equal to": { operator: "!=", icon: NotEqualIcon },
  caseSensitivelyEquals: { operator: "", icon: CaseSensitiveEqual },
  contains: { operator: "", icon: ContainsIcon },
  anElementOfList: { operator: "", icon: ListIcon },
  null: { operator: "", icon: IsNull },
  empty: { operator: "", icon: IsNull },
  "less than": { operator: "<", icon: LessThanIcon },
  "greater than": { operator: ">", icon: GreaterThanIcon },
  "less than or equal to": { operator: "<=", icon: LessThanOrEqualIcon },
  "greater than or equal to": { operator: ">=", icon: GreaterThanOrEqualIcon },
}
const handleStyleTarget = {
  top: 20,
  width: 10,
  height: 10,
  right: -6,
  background: "#3730A3",
  border: "none",
}
const handleStyleSource = {
  top: 20,
  width: 10,
  height: 10,
  left: -6,
  background: "#A5B4FC",
  border: "none",
}

export const TransitionNode: FC<TransitionNodeProps> = ({ data, ...props }) => {
  const eventTemplate = useEventTemplate({
    eventName: data.sourceTransition.eventName,
  })

  const story = useStory()

  const hasEvent = useBoolean(Boolean(data.sourceTransition.eventName))
  const hasCondition = useBoolean(Boolean(data.sourceTransition.condition))
  const conditionForm = useBoolean(Boolean(data.sourceTransition.condition))

  const [lhvType, setLhvType] = useState<JavaType>(
    data.sourceTransition.condition?.lhv.value.javaType as JavaType
  )

  const conditionRule = useConditionRule(lhvType)

  const expanded = useBoolean(false)
  const formEvent = useForm({
    formType: "controlled",
    formId: `${data.sourceTransition.id}-transition-event-form`,
    initialValues: {
      event: "not-set-event",
    },
  })

  useEffect(() => {
    const eventId = eventTemplate.eventIdByName(data.sourceTransition.eventName)
    eventId && formEvent.handleFieldChange("event", eventId)
  }, [eventTemplate.list])

  const formCondition = useForm({
    formType: "controlled",
    formId: `${data.sourceTransition.id}-transition-event-form`,
    initialValues: {
      conditionName: data.sourceTransition.condition?.name,
      lhvType: data.sourceTransition.condition?.lhv.value.valueType || "EVENT",
      lhvValue:
        data.sourceTransition.condition?.lhv.value.value.parameterString ||
        data.sourceTransition.condition?.lhv.value.value.eventParameter
          ?.parameter.path ||
        "select-to-continue",
      operator: data.sourceTransition.condition?.operand,
      rhvType: data.sourceTransition.condition?.rhv.value.valueType || "VALUE",
      rhvValue:
        data.sourceTransition.condition?.rhv.value.value.parameterString ||
        data.sourceTransition.condition?.rhv.value.value.eventParameter
          ?.parameter.path ||
        "",
    },
  })

  useEffect(() => {
    const lhvType = eventTemplate.listEventParameters?.find(
      (et) => et.path === formCondition.values.lhvValue
    )?.type
    lhvType && setLhvType(lhvType)
  }, [formCondition.values.lhvValue])

  useEffect(() => {
    !hasCondition.value && formCondition.handleFieldChange("operator", "none")
  }, [lhvType])

  const handleEventSaveClick = useEvent(() =>
    formEvent
      .handleSubmit((values) =>
        data.events.onEventSave?.({
          storyName: story.storyName as string,
          stateId: getSourceStateByTransitionId(
            story.find,
            data.sourceTransition.id
          )?.id as string,
          transitionId: data.sourceTransition.id,
          eventName: eventTemplate.eventNameById(values.event) as string,
          eventId: values.event,
        })
      )()
      .then((data) => {
        hasEvent.setTrue()
        return data
      })
  )
  const handleConditionSaveClick = useEvent(() => {
    const lhvEventParameter = eventTemplate.listEventParameters?.find(
      (ep) => ep.path === formCondition.values.lhvValue
    )
    const rhvEventParameter = eventTemplate.listEventParameters?.find(
      (ep) => ep.path === formCondition.values.rhvValue
    )

    const payload: UpsertConditionPayload = {
      storyName: story.storyName as string,
      stateId: getSourceStateByTransitionId(
        story.find,
        data.sourceTransition.id
      )?.id as string,
      transitionId: data.sourceTransition.id,
      conditionDto: {
        name: formCondition.values.conditionName as string,
        description: "",
        lhv: {
          value: {
            value: {
              parameterString: undefined,
              eventParameter: undefined,
            },
            valueType: "EVENT",
            javaType: "NUMERIC",
          },
          isStatic: false,
        },
        rhv: {
          value: {
            value: {
              parameterString: "0",
            },
            valueType: "VALUE",
            javaType: "NUMERIC",
          },
          isStatic: true,
        },
        operand: "==",
        isBinary: true,
        isComplex: false,
      },
    }
    payload.conditionDto.lhv.value.javaType = lhvType as JavaType

    if (formCondition.values.lhvType === "EVENT") {
      payload.conditionDto.lhv.value.value.eventParameter = {
        eventName: eventTemplate.eventNameById(
          formEvent.values.event as string
        ) as string,
        parameter: lhvEventParameter as SingleEventParameterType,
      }
      payload.conditionDto.lhv.isStatic = false
      payload.conditionDto.lhv.value.valueType = "EVENT"
    } else if (formCondition.values.lhvType === "VALUE") {
      payload.conditionDto.lhv.value.value.parameterString =
        formCondition.values.lhvValue
      payload.conditionDto.lhv.isStatic = true
      payload.conditionDto.lhv.value.valueType = "VALUE"
    }

    if (formCondition.values.rhvType === "EVENT") {
      payload.conditionDto.rhv.value.value.eventParameter = {
        eventName: eventTemplate.eventNameById(
          formEvent.values.event as string
        ) as string,
        parameter: rhvEventParameter as SingleEventParameterType,
      }
      payload.conditionDto.rhv.isStatic = false
      payload.conditionDto.rhv.value.valueType = "EVENT"
    } else if (formCondition.values.rhvType === "VALUE") {
      payload.conditionDto.rhv.value.value.parameterString =
        formCondition.values.rhvValue
      payload.conditionDto.rhv.isStatic = true
      payload.conditionDto.rhv.value.valueType = "VALUE"
    }
    payload.conditionDto.isBinary = !!conditionRule.getConditionRules?.find(
      (op) => op.javaMatch === formCondition.values.operator
    )?.isBinary

    payload.conditionDto.operand = formCondition.values.operator

    payload.conditionDto.isComplex = false

    if (formCondition.values.operator !== "none")
      formCondition.handleSubmit((values) =>
        data.events.onConditionSave?.(payload).then((data) => {
          if (!data) return
          hasCondition.setTrue()
          return data
        })
      )()
  })
  return (
    <>
      <div
        className={classNames(
          "w-64 px-2 pt-1 pb-2 relative box-content bg-white  flex flex-col justify-center items-start rounded-lg "
        )}
      >
        <div
          className="flex  pl-2 w-full flex-row justify-between items-center"
          onClick={expanded.toggle}
        >
          <div className="flex flex-col text-left">
            {data.sourceTransition.eventName ? (
              <span className="font-bold">
                {data.sourceTransition.eventName}
              </span>
            ) : (
              <span className="font-bold text-pink-400">
                Event not selected
              </span>
            )}

            {data.sourceTransition.condition ? (
              <span className="text-gray-800 text-sm  mb-1 -mt-1">
                {data.sourceTransition.condition.name}
              </span>
            ) : (
              <span className="text-gray-800 text-xs mb-1  -mt-1">
                Condition not added
              </span>
            )}
          </div>
          <div className="flex flex-row items-center justify-right">
            <EventIcon
              className={classNames(
                "mr-1",
                hasEvent.value ? "fill-green-500" : "fill-slate-300"
              )}
            />
            <ConditionIcon
              className={classNames(
                hasCondition.value ? "fill-green-500" : "fill-slate-300"
              )}
            />
          </div>
        </div>
        {expanded.isVisible && (
          <>
            <div className="bg bg mt-2 px-2 pb-2 bg-slate-200 w-full rounded-lg">
              <div className="mt-2">
                <label
                  htmlFor="event"
                  className="block text-xs font-medium text-gray-700"
                >
                  Event
                </label>
                <div className="flex flex-row">
                  <select
                    disabled={hasEvent.value}
                    className="mt-1 disabled:bg-white block w-full pl-2 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    {...formEvent.props("event", {
                      schema: yup.string().required("Event name is required"),
                    })}
                  >
                    <option value="not-set-event">Event not settled yet</option>

                    {eventTemplate.list?.map((et) => (
                      <option key={et.eventId} value={et.eventId}>
                        {et.eventName}
                      </option>
                    ))}
                  </select>
                  {!hasEvent.value && (
                    <button
                      disabled={"not-set-event" === formEvent.values.event}
                      onClick={handleEventSaveClick}
                      className="px-1  h-[24px] mt-1 ml-1 flex justify-center items-center border text-xs border-gray-300  rounded-md    bg-slate-200 hover:bg-slate-300 "
                    >
                      <DiskIcon className="w-4 h-4 mr-1 fill-none stroke-black" />
                      Save
                    </button>
                  )}
                </div>
              </div>
              {hasEvent.value && (
                <div className="mt-2">
                  {!hasCondition.value && !conditionForm.value ? (
                    <>
                      <button
                        onClick={conditionForm.show}
                        className="mt-1  border border-dashed w-full flex items-center flex-col cursor-pointer bg-slate-200 hover:bg-slate-300 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md"
                      >
                        <ConditionIcon className=" fill-slate-400" />
                        <span className="text-xs mt-2">
                          Click to add condition
                        </span>
                      </button>
                    </>
                  ) : (
                    <>
                      <label
                        htmlFor="conditionForm"
                        className="block text-xs font-medium text-gray-700"
                      >
                        Condition
                        <span className="text-gray-500 text-xs">
                          (Optional)
                        </span>
                      </label>
                      <input
                        readOnly={hasCondition.value}
                        {...formCondition.props("conditionName", {
                          schema: yup.string().required(),
                        })}
                        className="mt-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        placeholder="Condition name..."
                      />
                      <div className="flex flex-col">
                        <div className="lhv flex flex-row">
                          <select
                            disabled={hasCondition.value}
                            className="mt-1  w-full pl-2 pr-10 py-1 mr-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            {...formCondition.props("lhvType", {
                              schema: yup.string().required(),
                            })}
                            placeholder="Type"
                          >
                            <option value="EVENT">Event</option>
                          </select>
                          {formCondition.values.lhvType === "EVENT" ? (
                            <select
                              disabled={hasCondition.value}
                              className="mt-1  ml-1 block w-full pl-2 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              {...formCondition.props("lhvValue", {
                                schema: yup.string().required(),
                              })}
                            >
                              <option
                                key="select-to-continue"
                                value="select-to-continue"
                              >
                                Select to continue
                              </option>
                              {eventTemplate.listEventParameters?.map((ep) => (
                                <option key={ep.path} value={ep.path}>
                                  {ep.fieldName}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <input
                              {...formCondition.props("lhvValue", {
                                schema: yup.string().required(),
                              })}
                              readOnly={hasCondition.value}
                              className="mt-1 ml-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            />
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          <Dropdown
                            disabled={
                              !Boolean(
                                formCondition.values.lhvValue &&
                                  formCondition.values.lhvValue !==
                                    "select-to-continue"
                              ) || hasCondition.value
                            }
                            title={(() => {
                              const op = conditionRule.getConditionRules?.find(
                                (cr) =>
                                  cr.javaMatch === formCondition.values.operator
                              )
                              const FoundIcon =
                                ConditionRuleIcons[op?.frontEndName || "none"]
                                  .icon

                              return Boolean(FoundIcon) ? (
                                <div
                                  className={classNames(
                                    "p-2 m-2 rounded-full flex",
                                    formCondition.values.lhvValue &&
                                      formCondition.values.lhvValue !==
                                        "select-to-continue"
                                      ? "bg-white"
                                      : "bg-slate-300"
                                  )}
                                >
                                  <FoundIcon
                                    className={classNames(
                                      "w-4 h-4",
                                      (!formCondition.values.lhvValue ||
                                        formCondition.values.lhvValue ===
                                          "select-to-continue") &&
                                        "fill-slate-200 stroke-slate-200"
                                    )}
                                  />
                                </div>
                              ) : (
                                "S"
                              )
                            })()}
                            groups={[
                              conditionRule.getConditionRules?.map((cr) => ({
                                title: cr.frontEndName,
                                onClick: () => {
                                  formCondition.handleFieldChange(
                                    "operator",
                                    cr.javaMatch
                                  )
                                },
                                icon: ConditionRuleIcons[cr.frontEndName].icon,
                              })),
                            ]}
                          />
                        </div>
                        {!!conditionRule.getConditionRules?.find(
                          (op) => op.javaMatch === formCondition.values.operator
                        )?.isBinary && (
                          <div className="rhv flex flex-row">
                            <select
                              disabled={hasCondition.value}
                              className="mt-1  w-full pl-2 pr-10 py-1 mr-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              {...formCondition.props("rhvType", {
                                schema: yup.string(),
                              })}
                              placeholder="Type"
                            >
                              <option value="EVENT">Event</option>
                              <option value="VALUE">Value</option>
                            </select>

                            {formCondition.values.rhvType === "EVENT" ? (
                              <select
                                disabled={hasCondition.value}
                                className="mt-1  ml-1 block w-full pl-2 pr-10 py-1 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                {...formCondition.props("rhvValue", {
                                  schema: yup.string(),
                                })}
                              >
                                <option
                                  key="select-to-continue"
                                  value="select-to-continue"
                                >
                                  Select to continue
                                </option>
                                {eventTemplate.listEventParameters
                                  ?.filter(
                                    (ep) =>
                                      ep.type ===
                                      eventTemplate.listEventParameters?.find(
                                        (rhvValue) =>
                                          rhvValue.path ===
                                          formCondition.values.lhvValue
                                      )?.type
                                  )
                                  ?.map((ep) => (
                                    <option key={ep.path} value={ep.path}>
                                      {ep.fieldName}
                                    </option>
                                  ))}
                              </select>
                            ) : (
                              <input
                                {...formCondition.props("rhvValue", {
                                  schema: yup.string(),
                                })}
                                readOnly={hasCondition.value}
                                className="mt-1 ml-1 w-full pl-2 pr-10 py-1 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                              />
                            )}
                          </div>
                        )}
                        {!hasCondition.value && (
                          <div className="flex flex-row">
                            <button
                              onClick={() => {
                                conditionForm.hide()
                                formCondition.handleReset()
                              }}
                              className="bg-slate-200 mr-1 w-full text-xs flex flex-row items-center justify-center border border-slate-300 rounded-md mt-2  p-1 hover:bg-slate-300"
                            >
                              <ResetIcon className="w-4 h-4 mr-1 fill-none stroke-black" />{" "}
                              Reset
                            </button>
                            <button
                              onClick={handleConditionSaveClick}
                              className="bg-slate-200 ml-1 w-full text-xs flex flex-row items-center justify-center border border-slate-300 rounded-md mt-2  p-1 hover:bg-slate-300"
                            >
                              <DiskIcon className="w-4 h-4 mr-1 fill-none stroke-black" />{" "}
                              Save
                            </button>
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </>
        )}
        <button
          onClick={expanded.toggle}
          className="p-1 w-8 h-4 z-0  absolute -bottom-3 flex left-[97px] items-center justify-center rounded-b-full bg-white"
        >
          {expanded.value ? (
            <ChevronUpSolid className=" w-4 h-4 -mt-1 stroke-indigo-600 stroke-2" />
          ) : (
            <ChevronDownSolid className=" w-4 h-4 -mt-1 stroke-indigo-600 stroke-2" />
          )}
        </button>
      </div>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyleSource}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyleTarget}
      />
    </>
  )
}
