import Main from "@/layouts/main/Main"
import { usePrompt } from "@/contexts/prompt-context"
import { useNavigate } from "react-router-dom"
import {
  PencilSolid,
  PlusSmallSolid,
  PlusSolid,
  TrashSolid,
} from "@graywolfai/react-heroicons"
import DataGrid from "@/components/data-grid/DataGrid"
import useCompany from "@/queries/useCompany"
import { useEffect } from "react"
import { useUrlSearchParams } from "use-url-search-params"
import useEvent from "react-use-event-hook"
import Drawer from "@/components/Drawer/Drawer"
import useBoolean from "@/hooks/useBoolean"
import UpsertCompanyDrawer from "./UpsertAgentDrawer"
import useAgent from "@/queries/useAgent"
import UpsertAgentDrawer from "./UpsertAgentDrawer"

function Agent() {
  const navigate = useNavigate()
  const prompt = usePrompt()

  const upsertAgentDrawer = useBoolean(false)

  const [searchParams, setSearchParams] = useUrlSearchParams({
    pageIndex: 1,
    pageSize: 15,
    sortBy: "id",
    sortType: "asc",
    id: "",
  })
  const { pageIndex, pageSize } = searchParams as any
  const { id, ..._searchParams } = searchParams as any
  const agent = useAgent({
    params: _searchParams,
    id,
  })

  const handlePageIndexChange = useEvent((pageIndex) =>
    setSearchParams({ ...searchParams, pageIndex })
  )
  const handlePageSizeChange = useEvent((pageSize) =>
    setSearchParams({ ...searchParams, pageSize })
  )

  const handleSuccessSave = useEvent(() => {
    if (searchParams.sortType === "asc") {
      setSearchParams({
        ...searchParams,
        pageIndex: Math.ceil((agent.list?.data?.data.count || 1) / pageSize),
      })
    } else setSearchParams({ ...searchParams, pageIndex: 1 })
  })

  const handleDelete = useEvent((row:AgentType) => {
    const message = `${row.id} numaralı ${row.name} ${row.surname} isimli temsilciyi silmek üzeresiniz.`
    prompt
      .asyncAppear({
        title: message,
        id: "delete-agent",
        icon: TrashSolid,
        color: "red",
        okTitle:"Silmeyi onayla",
        cancelTitle:"Vazgeç"
      })
      .then(() => {
        agent.destroy.mutate(row.id)
      })
      .catch(() => console.log("ok demedi"))
  })

  return (
    <Main
      breadcrumb={[{ name: "Temsilciler", href: "/app/agent" }]}
      title="Temsilciler"
      description="Bu ekrandan temsilci ekleyebilir, silebilir ve var olanları düzenleyebilirsiniz."
      actions={[
        {
          title: "Yeni temsilci",
          icon: PlusSolid,
          onClick: upsertAgentDrawer.show,
        },
      ]}
    >
      {upsertAgentDrawer.value && (
        <UpsertAgentDrawer
          updateId={Number(searchParams.id)}
          open={upsertAgentDrawer.value}
          onClose={() => {
            setSearchParams({ ...searchParams, id: undefined })
            upsertAgentDrawer.hide()
          }}
          onSaveSuccess={!Number(searchParams.id) && handleSuccessSave}
        />
      )}
      <DataGrid
        onPageIndexChange={handlePageIndexChange}
        onPageSizeChange={handlePageSizeChange}
        keyField="id"
        columns={[
          {
            label: "ID",
            field: "id",
            sortable: true,
            align: "right",
            headingStyles: "w-32",
          },
          {
            label: "Kulanıcı adı",
            field: "username",
            sortable: true,
          },
          {
            label: "Ad",
            field: "name",
            sortable: true,
          },
          {
            label: "Soyad",
            field: "surname",
            sortable: true,
          },
          {
            label: "Telefon",
            field: "phone",
            sortable: true,
          },
          {
            label: "Şirket",
            field: "company.title",
            sortable: true,
          },
          {
            label: "Oluşturulma Zamanı",
            field: "createdAt",
            formatter: (value: string) => new Date(value).toLocaleString(),
            sortable: true,
            headingStyles: "w-64",
          },
          {
            label: "Değiştirilme Zamanı",
            field: "updatedAt",
            formatter: (value: string) => new Date(value).toLocaleString(),
            sortable: true,
            headingStyles: "w-64",
          },
          {
            label: "Eylemler",
            align: "right",
            headingStyles: "w-64",
            render: (row: any, index: number) => (
              <>
                <button onClick={() => handleDelete(row)}>
                  <TrashSolid className="w-5 h-5 fill-red-300 hover:fill-red-800" />
                </button>
                <button
                  className="ml-4"
                  onClick={() => {
                    upsertAgentDrawer.show()
                    setSearchParams({ ...searchParams, id: row.id })
                  }}
                >
                  <PencilSolid className="w-5 h-5 fill-indigo-300 hover:fill-indigo-800" />
                </button>
              </>
            ),
          },
        ]}
        rows={agent.list?.data?.data.rows}
        totalCount={agent.list?.data?.data.count || 0}
        pageIndex={Number(pageIndex) || 0}
        pageSize={Number(pageSize) || 0}
      />
    </Main>
  )
}

export default Agent
