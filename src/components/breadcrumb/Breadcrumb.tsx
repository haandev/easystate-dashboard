/* This example requires Tailwind CSS v2.0+ */
import { ChevronRightSolid, HomeSolid } from "@graywolfai/react-heroicons"
import { Link } from "react-router-dom"

const Breadcrumb = ({
  pages,
}: {
  pages: {
    name: string
    href?: string
    current?: boolean
  }[]
}) => {
  return (
    <nav className="flex p-2 mb-4" aria-label="Breadcrumb">
      <ol role="list" className="flex items-center space-x-4">
        <li>
          <div>
            <Link to="/app/home/root" className="text-gray-400 hover:text-gray-500">
              <HomeSolid className="flex-shrink-0 h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Home</span>
            </Link>
          </div>
        </li>
        {pages.map((page) => (
          <li key={page.name}>
            <div className="flex items-center">
              <ChevronRightSolid
                className="flex-shrink-0 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              {page.href ? (
                <Link
                  to={page.href}
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </Link>
              ) : (
                <a
                  className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                  aria-current={page.current ? "page" : undefined}
                >
                  {page.name}
                </a>
              )}
            </div>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default Breadcrumb
