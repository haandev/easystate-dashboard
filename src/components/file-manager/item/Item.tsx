import {
  CodeBracketOutline,
  CogOutline,
  LockClosedOutline,
} from "@graywolfai/react-heroicons"
import classNames from "classnames"
import React, { FC, PropsWithChildren } from "react"
import useEvent from "react-use-event-hook"
import { ItemProps } from "./Item.specs"

const Item: FC<PropsWithChildren<ItemProps>> = ({
  item,
  title,
  onClick,
  isSelected,
  onDoubleClick,
  contextMenuStrip,
  icon,
}) => {
  const handleClick = useEvent(() => {
    onClick?.(item?.id as string)
  })
  return (
    <div
      onDoubleClick={onDoubleClick}
      onClick={handleClick}
      className={classNames(
        "select-none",
        "item",
        "flex flex-col",
        "items-center",
        "justify-center",
        "min-w-[230px]",
        "w-[230px]",
        "max-w-[400px]",
        "bg-gray-200",
        "rounded-lg",
        "h-[170px]",
        "m-2 flex-1",
        "hover:bg-gray-300",
        "cursor-pointer",
        "relative",
        "box-border border-2",
        { "border-indigo-700": isSelected }
      )}
    >
      <div className="-right-1 -top-1 absolute">{contextMenuStrip}</div>
      {Boolean(icon) && (
        <div className="folder-icon m-auto w-full items-center">
          <div className="w-[100px] flex justify-center items-center">
            <img src={icon} />
          </div>

          <p className="text-center text-base item-label mt-2 mb-5">{title}</p>
          <div className="absolute bottom-1 left-1">
            <div className="flex flex-row justify-between"></div>
            {/*  {item?.createdBy && (
              <p className="text-center flex flex-row items-center  mr-3 w-full">
                <CodeIcon className="w-4" />
                <span className="text-xs ">Created by {item.createdBy}</span>
              </p>
            )} */}
            {item?.reservedBy && (
              <p className="text-center flex flex-row items-center  mr-3 w-full">
                <LockClosedOutline className="w-4" />
                <span className="text-xs ">Reserved by {item.reservedBy}</span>
              </p>
            )}
            {item?.status && (
              <p className="text-center flex flex-row items-center  mr-3 w-full">
                <CogOutline className="w-4" />
                <span className="text-xs ">Status: {item.status}</span>
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(Item)
