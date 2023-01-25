import { Dialog, Transition } from "@headlessui/react"
import React, { Fragment, useEffect, useState } from "react"
import useEvent from "react-use-event-hook"

const MaterialIcons = (props: any) => {
  const [icons, setIcons] = useState({})
  useEffect(() => {
    const i = fetch(
      "https://raw.githubusercontent.com/google/material-design-icons/master/update/current_versions.json"
    )
      .then((response) => response.json())
      .then((data) =>
        Object.keys(data)
          .map((icon) => icon.split("::"))
          .reduce((prev: any, current: any) => {
            if (!prev[current[0]]) prev[current[0]] = []
            prev[current[0]].push(current[1])
            return prev
          }, {})
      )
      .then((data) => {
        setIcons(data)
      })
  }, [])
  return (
    <div>
      {Object.entries(icons).map(([groupName, icons]: any) => {
        return (
          <>
            <h1>{(groupName as string).toUpperCase()}</h1>
            <div className="flex flex-row flex-wrap justify-between after:flex-1 after:content-none">
              {icons.map((icon: any) => (
                <div
                  onClick={()=>props.onClick?.(icon)}
                  className="w-16 cursor-pointer h-16  mb-2 flex items-center justify-center overflow-hidden rounded-lg border border-gray-400"
                >
                  <span className="material-symbols-outlined">{icon}</span>
                </div>
              ))}
            </div>
          </>
        )
      })}
    </div>
  )
}

export const MaterialIconsModal = (props: any) => {
  const handleClose = useEvent((e) => {
    props.onClose?.(e)
  })
  return (
    <Transition.Root show={!!props.visible} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-50 inset-0 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <div className="mt-2">
                    <div className="text-sm text-gray-500 max-h-[70vh] overflow-x-hidden pr-4">
                      <MaterialIcons
                        onClick={(val:string) => {
                          props.onSelect?.(val)
                          props.onClose?.()
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default MaterialIcons
