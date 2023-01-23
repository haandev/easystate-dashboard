import {
  CheckCircleSolid,
  InformationCircleSolid,
  XCircleSolid,
  XMarkSolid,
} from "@graywolfai/react-heroicons"
import classNames from "classnames"
import React from "react"
import useEvent from "react-use-event-hook"
import item from "../file-manager/item"
import { FlagcardType } from "./Flagcard.specs"

import { useTimeout } from "usehooks-ts"

const typeColorMap = {
  success: {
    icon: CheckCircleSolid,
    bg: "bg-green-50",
    textLight: "text-green-400",
    textNormal: "text-green-800",
    hover: "hover:bg-green-100",
    ringLight: "focus:ring-offset-green-50",
    ring: "focus:ring-green-600",
  },
  error: {
    icon: XCircleSolid,
    bg: "bg-red-50",
    textLight: "text-red-400",
    textNormal: "text-red-800",
    hover: "hover:bg-red-100",
    ringLight: "focus:ring-offset-red-50",
    ring: "focus:ring-red-600",
  },
  info: {
    icon: InformationCircleSolid,
    bg: "bg-blue-50",
    textLight: "text-blue-400",
    textNormal: "text-blue-800",
    hover: "hover:bg-blue-100",
    ringLight: "focus:ring-offset-blue-50",
    ring: "focus:ring-blue-600",
  },
  warning: {
    icon: CheckCircleSolid,
    bg: "bg-yellow-50",
    textLight: "text-yellow-400",
    textNormal: "text-yellow-800",
    hover: "hover:bg-yellow-100",
    ringLight: "focus:ring-offset-yellow-50",
    ring: "focus:ring-yellow-600",
  },
}

const Flagcard: FlagcardType = ({ message, list, type, id, onDismiss }) => {
  const Theme = typeColorMap[type]
  const handleDismiss = useEvent(() => {
    onDismiss?.(id as string)
  })

  useTimeout(() => {
    handleDismiss()
  }, 5000)
  return (
    <div className={classNames("rounded-md p-4 mb-4 shadow-lg", Theme.bg)}>
      <div className="flex">
        <div className="flex-shrink-0">
          {type === "success" && (
            <CheckCircleSolid
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          )}
          {type === "error" && (
            <CheckCircleSolid
              className="h-5 w-5 text-red-400"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="ml-3">
          <p className={classNames("text-sm font-medium", Theme.textNormal)}>
            {message}
          </p>
          <div className={classNames("mt-2 text-sm", Theme.textNormal)}>
            {list && (
              <ul role="list" className="list-disc pl-5 space-y-1">
                {list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={handleDismiss}
              type="button"
              className={classNames(
                "inline-flex",
                Theme.bg,
                "rounded-md p-1.5",
                Theme.textLight,
                Theme.hover,
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                Theme.ringLight,
                Theme.ring
              )}
            >
              <span className="sr-only">Dismiss</span>
              <XMarkSolid className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Flagcard
