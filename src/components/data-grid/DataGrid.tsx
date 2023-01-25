import {
  ChevronLeftSolid,
  ChevronRightSolid,
} from "@graywolfai/react-heroicons"
import classNames from "classnames"
import React, { FC } from "react"
import useEvent from "react-use-event-hook"
const DataGrid: FC<DataGridProps> = (props) => {
  const totalPage = Math.ceil(props.totalCount / props.pageSize)

  const handleNext = useEvent(() => {
    if (props.pageIndex < totalPage) {
      props.onPageIndexChange?.(props.pageIndex + 1)
    }
  })
  const handlePrev = useEvent(() => {
    if (props.pageIndex > 1) {
      props.onPageIndexChange?.(props.pageIndex - 1)
    }
  })

  const handleGo = useEvent((pageIndex) => {
    props.onPageIndexChange?.(pageIndex)
  })

  return !props.rows?.length ? (
    <>Empty</>
  ) : (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {props.columns.map((col, i) => (
                    <th
                      key={col.label || "" + i}
                      scope="col"
                      className={`${col.headingStyles} px-6 py-3 text-${
                        col.align || "left"
                      }  font-medium text-gray-500  tracking-wider`}
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {props.rows.map((row, index) => (
                  <tr key={row[props.keyField]}>
                    {props.columns.map((col, i) => {
                      let val = col.field && row[col.field]
                      if (col.field?.includes(".")) {
                        const path = col.field.split(".")
                        val = row
                        val = path.reduce((prev, current) => {
                          return prev[current]
                        }, val)
                      }
                      return (
                        <td
                          key={row[props.keyField] + "_" + col.label + "_" + i}
                          className={`${
                            col.dataStyles
                          } px-6 py-4 whitespace-nowrap  font-medium text-gray-900
                        text-${col.align || "left"} `}
                        >
                          {col.field && !col.formatter && val}
                          {col.field &&
                            col.formatter &&
                            col.formatter(row[col.field])}
                          {!col.field && col.render && col.render(row, index)}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="p-4 hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Toplam
                  <span className="font-medium mx-2">{props.totalCount}</span>
                  kayıttan
                  <span className="font-medium mx-2">
                    {(props.pageIndex - 1) * props.pageSize}
                  </span>
                  :
                  <span className="font-medium mx-2">
                    {Math.min(
                      props.pageIndex * props.pageSize,
                      props.totalCount
                    )}
                  </span>
                  arası kayıtlar her sayfada{" "}
                  <span className="font-medium mx-2">{props.pageSize}</span>{" "}
                  adet gösteriliyor.
                </p>
              </div>
              <div>
                <nav
                  className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                  aria-label="Pagination"
                >
                  <button
                    onClick={handlePrev}
                    className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  >
                    <span className="sr-only">Önceki</span>
                    <ChevronLeftSolid className="h-5 w-5" />
                  </button>
                  {totalPage > 0 && (
                    <button
                      onClick={() => handleGo(1)}
                      aria-current="page"
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === 1
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      1
                    </button>
                  )}
                  {totalPage > 1 && (
                    <button
                      onClick={() => handleGo(2)}
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === 2
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      2
                    </button>
                  )}
                  {totalPage > 2 && (
                    <button
                      onClick={() => handleGo(3)}
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === 3
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      3
                    </button>
                  )}
                  {totalPage > 6 && (
                    <span className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700">
                      ...
                    </span>
                  )}
                  {totalPage > 5 && (
                    <button
                      onClick={() => handleGo(totalPage - 2)}
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === totalPage - 2
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      {totalPage - 2}
                    </button>
                  )}
                  {totalPage > 4 && (
                    <button
                      onClick={() => handleGo(totalPage - 1)}
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === totalPage - 1
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      {totalPage - 1}
                    </button>
                  )}
                  {totalPage > 3 && (
                    <button
                      onClick={() => handleGo(totalPage)}
                      className={classNames(
                        "relative z-10 inline-flex items-center border px-4 py-2 text-sm font-medium  focus:z-20 ",
                        props.pageIndex === totalPage
                          ? "border-indigo-500 bg-indigo-50 text-indigo-600"
                          : "border-gray-300 bg-white  text-gray-500 hover:bg-gray-50 "
                      )}
                    >
                      {totalPage}
                    </button>
                  )}
                  <button
                    onClick={handleNext}
                    className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                  >
                    <span className="sr-only">Sonraki</span>
                    <ChevronRightSolid className="h-5 w-5" />
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DataGrid
