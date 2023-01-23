/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
import { FC, Fragment, PropsWithChildren, useState } from "react"
import { Dialog, Menu, Transition } from "@headlessui/react"
import {
  CogOutline,
  FaceFrownOutline,
  HomeOutline,
  MicrophoneOutline,
  PhotoOutline,
  PlusSmallOutline,
  UserGroupOutline,
  GiftOutline,
  XMarkOutline,
  BuildingOfficeOutline,
  BriefcaseOutline,
} from "@graywolfai/react-heroicons"
import { MagnifyingGlassCircleOutline } from "@graywolfai/react-heroicons"
import classNames from "classnames"
import { Link } from "react-router-dom"
import logo from "@/assets/images/logo.png"
const sidebarNavigation = [
  { name: "Home", to: "/app/home", icon: HomeOutline, current: true },
  { name: "Companies", to: "/app/company", icon: BuildingOfficeOutline, current: false },
  { name: "Library", href: "#", icon: PhotoOutline, current: false },
  { name: "Management", href: "#", icon: UserGroupOutline, current: false },
  { name: "Listeners", href: "#", icon: FaceFrownOutline, current: false },
  { name: "Trash", href: "#", icon: CogOutline, current: false },
]
const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Sign out", href: "#" },
]

const Main: FC<PropsWithChildren<any>> = ({ children, ...props }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex">
        {/* Narrow sidebar */}
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex flex-col min-h-0 bg-indigo-700 p-4 w-56">
          <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
            <div className="flex items-center flex-shrink-0 px-4">
              <img
                className="h-16 w-auto"
                src={logo}
                alt="Workflow"
              />
            </div>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {sidebarNavigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.to as string}
                  className={classNames(
                    item.current
                      ? "bg-indigo-800 text-white"
                      : "text-white hover:bg-indigo-600 hover:bg-opacity-75",
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                  )}
                >
                  <item.icon
                    className="mr-3 flex-shrink-0 h-6 w-6 text-indigo-300"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-indigo-800 p-4">
            <a href="#" className="flex-shrink-0 w-full group block">
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-white">Tom Cook</p>
                  <p className="text-xs font-medium text-indigo-200 group-hover:text-white">
                    View profile
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* Mobile menu */}
        <Transition.Root show={mobileMenuOpen} as={Fragment}>
          <Dialog as="div" className="md:hidden" onClose={setMobileMenuOpen}>
            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <div className="relative max-w-xs w-full bg-indigo-700 pt-5 pb-4 flex-1 flex flex-col">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute top-1 right-0 -mr-14 p-1">
                      <button
                        type="button"
                        className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <XMarkOutline
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Close sidebar</span>
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex-shrink-0 px-4 flex items-center">
                    <img
                      className="h-8 w-auto"
                      src="https://tailwindui.com/img/logos/workflow-mark.svg?color=white"
                      alt="Workflow"
                    />
                  </div>
                  <div className="mt-5 flex-1 h-0 px-2 overflow-y-auto">
                    <nav className="h-full flex flex-col">
                      <div className="space-y-1">
                        {sidebarNavigation.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className={classNames(
                              item.current
                                ? "bg-indigo-800 text-white"
                                : "text-indigo-100 hover:bg-indigo-800 hover:text-white",
                              "group py-2 px-3 rounded-md flex items-center text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <item.icon
                              className={classNames(
                                item.current
                                  ? "text-white"
                                  : "text-indigo-300 group-hover:text-white",
                                "mr-3 h-6 w-6"
                              )}
                              aria-hidden="true"
                            />
                            <span>{item.name}</span>
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>
                </div>
              </Transition.Child>
              <div className="flex-shrink-0 w-14" aria-hidden="true">
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Content area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Main content */}
          <div className="flex-1 flex items-stretch overflow-hidden">
            <div className="flex-1 flex flex-col overflow-hidden h-full max-h-full w-full max-w-full">
              <header className="w-full">
                <div className="relative z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 shadow-sm flex">
                  <button
                    type="button"
                    className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
                    onClick={() => setMobileMenuOpen(true)}
                  >
                    <span className="sr-only">Open sidebar</span>
                    <BriefcaseOutline className="h-6 w-6" aria-hidden="true" />
                  </button>
                  <div className="flex-1 flex justify-between px-4 sm:px-6">
                    <div className="flex-1 flex">
                      <form
                        className="w-full flex md:ml-0"
                        action="#"
                        method="GET"
                      >
                        <label htmlFor="search-field" className="sr-only">
                          Search all files
                        </label>
                        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
                            <MagnifyingGlassCircleOutline
                              className="flex-shrink-0 h-5 w-5"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            name="search-field"
                            id="search-field"
                            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400"
                            placeholder="Search"
                            type="search"
                          />
                        </div>
                      </form>
                    </div>
                    <div className="ml-2 flex items-center space-x-4 sm:ml-6 sm:space-x-6">
                      {/* Profile dropdown */}
                      <Menu as="div" className="relative flex-shrink-0">
                        <div>
                          <Menu.Button className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            <span className="sr-only">Open user menu</span>
                            <img
                              className="h-8 w-8 rounded-full"
                              src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                              alt=""
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            {userNavigation.map((item) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <a
                                    href={item.href}
                                    className={classNames(
                                      active ? "bg-gray-100" : "",
                                      "block px-4 py-2 text-sm text-gray-700"
                                    )}
                                  >
                                    {item.name}
                                  </a>
                                )}
                              </Menu.Item>
                            ))}
                          </Menu.Items>
                        </Transition>
                      </Menu>

                      <button
                        type="button"
                        className="flex bg-indigo-600 p-1 rounded-full items-center justify-center text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        <PlusSmallOutline className="h-6 w-6" aria-hidden="true" />
                        <span className="sr-only">Add file</span>
                      </button>
                    </div>
                  </div>
                </div>
              </header>
              <div className="flex-1 overflow-hidden pr-4  pb-4 h-full max-h-full w-full max-w-full">
                <main className={classNames("flex-1 overflow-y-auto  main-content max-h-full h-full",
                !!props.noMargin || "pr-4 pt-4 pb-4 pl-8"
                )}>
                  {/* Primary column */}
                  {children}
                </main>
              </div>
            </div>
            {/* Secondary column (hidden on smaller screens) */}
            {props.withSidebar && (
              <aside className="hidden w-96 bg-slate-200 border-l border-gray-200 overflow-y-auto lg:block">
                <div className="text-black border-b-2 border-b-black mx-4 h-16 items-center flex text-xl text-black">
                  File Preview
                </div>
              </aside>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Main
