import ActionIcon from "@/assets/icons/ActionIcon"
import SendMailIcon from "@/assets/icons/SendMailIcon"
import useBoolean from "@/hooks/useBoolean"
import { useAction } from "@/queries/useAction"
import {
  ChevronDownSolid,
  ChevronUpOutline,
  ChevronUpSolid,
  CogSolid,
  FolderOpenSolid,
  PlusSolid,
} from "@graywolfai/react-heroicons"
import classNames from "classnames"
import React, { FC, useRef, useState } from "react"
import useEvent from "react-use-event-hook"
import { Handle, Position } from "reactflow"
import Accordion from "../accordion/Accordion"
import Dropdown from "../dropdown/Dropdown"
import { StateNodeProps } from "./story-builder.types"

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
export const StateNode: FC<StateNodeProps> = ({ data, ...props }) => {
  const expanded = useBoolean(false)
  //const [actions, setActions] = useState<SingleActionTemplateType[]>([])
  const action = useAction()


  const accordion = useRef<any>(null)
  return (
    <>
      <div className=" w-72  px-2 pt-1 pb-2 relative  box-content  flex-col flex items-center bg-white rounded-lg border-indigo-400">
        <>
          <button
            className="flex pl-2 w-full flex-col"
            onClick={expanded.toggle}
          >
            <span className="font-bold">{data.sourceState.stateName}</span>
            {Object.keys(data.sourceState.actions).length ? (
              <span className="text-gray-800 text-xs  mb-1  -mt-1">
                {Object.keys(data.sourceState.actions).length} actions
              </span>
            ) : (
              <span className="text-gray-800 text-xs  mb-1  -mt-1">
                Action not added
              </span>
            )}
          </button>
          {expanded.isVisible && (
            <>
              <div className="w-full">
                <Accordion
                  ref={accordion}
                  loadedList={data.sourceState.actions}
                  titleProp="name"
                  onActionSave={data.events.onActionSave}
                  state={data.sourceState}
                />
              </div>
              <div
                className={classNames("rounded-b-lg p-2 bg-slate-200 w-full ")}
              >
                <>
                  <Dropdown
                    showChevron={false}
                    title={
                      <div className=" w-[17rem] border border-dashed  flex items-center flex-col cursor-pointer bg-slate-200 hover:bg-slate-300 py-2 text-base border-gray-300 focus:outline-none sm:text-sm rounded-md">
                        <ActionIcon className=" fill-slate-400" />
                        <span className="text-xs mt-2">
                          Click to add new action
                        </span>
                      </div>
                    }
                    groups={[
                      action.getActionTemplates?.map((at) => ({
                        title: at.name,
                        onClick: () => {
                          accordion.current?.addNewUnsaved?.([at])
                        //  setActions((ats) => [...ats, at])
                        },
                        icon: SendMailIcon,
                      })) || [],
                    ]}
                  />
                </>
              </div>
            </>
          )}
        </>
        <button
          onClick={expanded.toggle}
          className="p-1 w-8 h-4 z-0  absolute -bottom-3 flex left-[110px] items-center justify-center rounded-b-full bg-white"
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
        className="bg-indigo-600"
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
