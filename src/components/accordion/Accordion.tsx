/* This example requires Tailwind CSS v2.0+ */
import DiskIcon from "@/assets/icons/DiskIcon"
import SendMailIcon from "@/assets/icons/SendMailIcon"
import useBoolean from "@/hooks/useBoolean"
import { refreshFlowPane } from "@/pages/app/Story/flow-utils"
import {
  ChevronDownSolid,
  ChevronUpSolid,
  TrashOutline,
  TrashSolid,
} from "@graywolfai/react-heroicons"
import { Disclosure } from "@headlessui/react"
import classNames from "classnames"
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"
import useEvent from "react-use-event-hook"
import { useReactFlow } from "reactflow"
import ActionForm from "../story-builder/ActionForm"
import { ContextInjectableHandlers } from "../story-builder/story-builder.types"

export const Accordion = forwardRef(
  (
    {
      loadedList,
      state,
      ...props
    }: {
      state: SingleStateType
      loadedList: Record<string, SingleActionType>
      titleProp: string
      onActionSave: ContextInjectableHandlers["handleUpsertAction"]
    },
    ref
  ) => {
    const [unsavedList, setUnsavedList] = useState<SingleActionTemplateType[]>(
      []
    )
    const isEditTitle = useBoolean(false)
    const [editableTitle, setEditableTitle] = useState<string>("")
    const [editTitleIndex, setEditTitleIndex] = useState<number>(-1)

    const titleInput = useRef(null)

    useImperativeHandle(
      ref,
      () => ({
        addNewUnsaved(newItems: SingleActionTemplateType[]) {
          setUnsavedList((prev) => [...prev, ...newItems])
        },
      }),
      []
    )

    const fullList = [
      ...Object.entries(loadedList).map((i) => ({ ...i[1], loaded: true })),
      ...unsavedList,
    ]

    const handleClickOutsideTitleInput = () => {
      isEditTitle.setFalse()
      setUnsavedList((prev) =>
        prev.map((item, idx) => {
          const ret = {
            ...item,
            name: idx === editTitleIndex ? editableTitle : item.name,
          }
          return ret
        })
      )
    }
    const flow = useReactFlow()
    const handleDeleteUnsaved = useEvent((idx: number) => {
      setUnsavedList((prev) => {
        prev.splice(idx - Object.keys(loadedList).length, 1)
        return prev
      })
      refreshFlowPane(flow, true)
    })

    const handleSaveAction = useEvent(
      (context: UpsertActionPayload, idx: number) => {
        setUnsavedList((prev) => {
          prev.splice(idx - Object.keys(loadedList).length, 1)
          return prev
        })
        return props.onActionSave?.(context)
      }
    )

    return (
      <div className="bg-slate-200 rounded-lg w-full ">
        <div className="w-full">
          <div className="w-full">
            <dl className="w-full">
              {fullList.map((item, idx) => (
                <Disclosure as="div" key={idx}>
                  {({ open, close }) => (
                    <>
                      <dt
                        className={classNames(
                          "text-lg py-1 px-2",
                          idx === 0 && "rounded-t-lg",
                          //idx === list.length - 1 && "rounded-b-lg",
                          !open &&
                            (idx % 2 === 0 ? "bg-indigo-50" : "bg-indigo-100"),
                          open && "bg-slate-200"
                        )}
                      >
                        <Disclosure.Button
                          onClick={(e: any) => {
                            if (open) e.preventDefault()
                          }}
                          onDoubleClick={() => {
                            if (idx < Object.keys(loadedList).length) return
                            if (!isEditTitle.value) {
                              isEditTitle.setTrue()
                              setEditableTitle(item.name)
                              setEditTitleIndex(
                                idx - Object.keys(loadedList).length
                              )
                            }
                          }}
                          className="text-left w-full flex justify-between items-center text-gray-400"
                        >
                          <div className="flex flex-row items-center">
                            <SendMailIcon className="mr-1 fill-indigo-600" />
                            {isEditTitle.value &&
                            idx ===
                              (editTitleIndex as number) +
                                Object.keys(loadedList).length ? (
                              <>
                                <input
                                  ref={titleInput}
                                  className=" w-[80%] pl-2 pr-10 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                  value={editableTitle}
                                  onChange={(e) => {
                                    setEditableTitle(e.target.value)
                                  }}
                                  onBlur={() => {
                                    handleClickOutsideTitleInput()
                                  }}
                                />
                              </>
                            ) : (
                              <span className="font-medium text-gray-900 text-sm">
                                {
                                  item[
                                    props.titleProp as keyof SingleActionTemplateType &
                                      keyof SingleActionType
                                  ] as string
                                }
                              </span>
                            )}
                          </div>
                          {!("loaded" in item) && (
                            <div className="ml-6 h-7 flex items-center">
                              {!open ? (
                                <ChevronDownSolid
                                  className={classNames(
                                    open ? "-rotate-180" : "rotate-0",
                                    "h-6 w-6 transform"
                                  )}
                                  aria-hidden="true"
                                />
                              ) : (
                                !isEditTitle.value && (
                                  <div>
                                    <span
                                      onClick={() => {
                                        handleDeleteUnsaved(
                                          idx - Object.keys(loadedList).length
                                        )
                                      }}
                                      className="text-xs text-pink-200 hover:text-pink-500"
                                    >
                                      <TrashOutline
                                        className={classNames(
                                          "h-5 w-5 transform"
                                        )}
                                      />
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          )}
                        </Disclosure.Button>
                      </dt>
                      <Disclosure.Panel as="dd" className="mt-2 ">
                        <div className="text-base text-gray-500 px-2 pb-2">
                          <ActionForm
                            actionTemplate={"pmMap" in item ? item : undefined}
                            action={"pmMap" in item ? undefined : item}
                            onSave={(context) => handleSaveAction(context, idx)}
                            state={state}
                          />
                        </div>
                        {open && (
                          <div
                            onClick={() => close()}
                            className={classNames(
                              "px-2",
                              "cursor-pointer",
                              "text-right w-full flex flex-row justify-end",
                              idx % 2 === 0 ? "bg-indigo-50" : "bg-indigo-100"
                            )}
                          >
                            <ChevronUpSolid
                              className={classNames("h-6 w-6")}
                              aria-hidden="true"
                            />
                          </div>
                        )}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
              ))}
            </dl>
          </div>
        </div>
      </div>
    )
  }
)
export default Accordion
