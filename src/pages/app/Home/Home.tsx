import Main from "@/layouts/main/Main"
import { usePrompt } from "@/contexts/prompt-context"
import { useNavigate } from "react-router-dom"
import useSmartModelQuery from "@/queries/useSmartModelQuery"
import { useUrlSearchParams } from "use-url-search-params"

function Home() {
  const navigate = useNavigate()
  const prompt = usePrompt()

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

  return <Main breadcrumb={[{ name: "Overview", href: "/app/home" }]}>
    {JSON.stringify(smartModel.list.data?.data.rows)}
  </Main>
}

export default Home
