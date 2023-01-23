/* This example requires Tailwind CSS v2.0+ */
import { Fragment, PropsWithChildren, FC } from "react"
import { Menu, Transition } from "@headlessui/react"
import { ChevronDownSolid } from "@graywolfai/react-heroicons"
import classNames from "classnames"

export const Dropdown: FC<PropsWithChildren<any>> = ({
  title,
  showChevron,
  groups,
  disabled,
}) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          disabled={disabled}
          className="inline-flex justify-center w-full"
        >
          {title}
          {Boolean(showChevron) && (
            <ChevronDownSolid
              className="-mr-1 ml-2 h-5 w-5"
              aria-hidden="true"
            />
          )}
        </Menu.Button>
      </div>

      {!disabled && (
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="origin-top-right z-50 cursor-pointer absolute right-0 -mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none">
            {groups?.map((actions: any, idx: number) => (
              <div className="py-1" key={idx}>
                {actions?.map(
                  ({ children, icon, title, ...action }: any, idx: number) => {
                    const Icon = icon
                    return (
                      children || (
                        <Menu.Item key={idx}>
                          {({ active }) => (
                            <a
                              {...action}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "group flex items-center px-4 py-2 text-sm"
                              )}
                            >
                              <Icon
                                className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                                aria-hidden="true"
                              />
                              {title}
                            </a>
                          )}
                        </Menu.Item>
                      )
                    )
                  }
                )}
              </div>
            ))}
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  )
}
export default Dropdown
