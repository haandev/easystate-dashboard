import Main from "@/layouts/main/Main"
import { usePrompt } from "@/contexts/prompt-context"
import { useNavigate } from "react-router-dom"
import useSmartModelQuery from "@/queries/useSmartModelQuery"
import { useUrlSearchParams } from "use-url-search-params"
import {
  EllipsisVerticalSolid,
  PencilSquareOutline,
  PlusSolid,
} from "@graywolfai/react-heroicons"
import classNames from "classnames"
import useBoolean from "@/hooks/useBoolean"
import AddSmartModelDrawer from "./AddSmartModelDrawer"
import useEvent from "react-use-event-hook"

function Home() {
  const navigate = useNavigate()
  const prompt = usePrompt()

  const addSmartModelDrawer = useBoolean(false)

  const [searchParams, setSearchParams] = useUrlSearchParams({
    pageIndex: 1,
    pageSize: 15,
    sortBy: "id",
    sortType: "asc",
    id: "",
  })

  const { id, ..._searchParams } = searchParams as any

  const smartModel = useSmartModelQuery({
    params: _searchParams,
    id,
  })

  const handleSuccessSave = useEvent(() => {
    if (searchParams.sortType === "asc") {
      setSearchParams({
        ...searchParams,
        pageIndex: Math.ceil(
          (smartModel.list?.data?.data.count || 1) /
            (searchParams?.pageSize as number)
        ),
      })
    } else setSearchParams({ ...searchParams, pageIndex: 1 })
  })

  return (
    <Main
      breadcrumb={[{ name: "Overview", href: "/app/home" }]}
      title="Data models overview"
      description="You can add, remove and update data models from here."
      actions={[
        {
          title: "New data model",
          icon: PlusSolid,
          onClick: addSmartModelDrawer.show,
        },
      ]}
    >
      {addSmartModelDrawer.value && (
        <AddSmartModelDrawer
          updateId={Number(searchParams.id)}
          open={addSmartModelDrawer.value}
          onClose={() => {
            setSearchParams({ ...searchParams, id: undefined })
            addSmartModelDrawer.hide()
          }}
          onSaveSuccess={!Number(searchParams.id) && handleSuccessSave}
        />
      )}
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {smartModel.list.data?.data.rows.map((model) => (
          <li
            key={model.modelName}
            className="col-span-1 flex shadow-sm rounded-md"
          >
            <div
              className={classNames(
                model.initialized ? "bg-green-500"  : "bg-red-500",
                "flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              <span className="material-symbols-outlined">{model.icon}</span>
            </div>
            <div className="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <a
                  href={model.modelName}
                  className="text-gray-900 font-medium hover:text-gray-600"
                >
                  {model.modelName}
                </a>
                <p className="text-gray-500">
                  {model.fields.length} field,{" "}
                  {model.relationsAsSource.length +
                    model.relationsAsTarget.length}{" "}
                  relation
                </p>
              </div>
              <div className="flex-shrink-0 pr-2">
                <button
                  type="button"
                  className="w-8 h-8 bg-white inline-flex items-center justify-center text-gray-400 rounded-full bg-transparent hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <span className="sr-only">Open options</span>
                  <PencilSquareOutline className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Main>
  )
}

export default Home
