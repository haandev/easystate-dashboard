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
import UpsertCompanyDrawer from "./UpsertCompanyDrawer"

function Company() {
  const navigate = useNavigate()
  const prompt = usePrompt()

  const upsertCompanyDrawer = useBoolean(false)

  const [searchParams, setSearchParams] = useUrlSearchParams({
    pageIndex: 1,
    pageSize: 15,
    sortBy: "id",
    sortType: "asc",
    id: "",
  })
  const { pageIndex, pageSize } = searchParams as any
  const { id, ..._searchParams } = searchParams as any
  const company = useCompany({
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
        pageIndex: Math.ceil((company.list?.data?.data.count || 1) / pageSize),
      })
    } else setSearchParams({ ...searchParams, pageIndex: 1 })
  })

  const handleDelete = useEvent((row) => {
    const message = `${row.id} numaralı ${row.title} isimli şirketi silmek üzeresiniz.`
    prompt
      .asyncAppear({
        title: message,
        id: "delete-company",
        icon: TrashSolid,
        color: "red",
        okTitle:"Silmeyi onayla",
        cancelTitle:"Vazgeç"
      })
      .then(() => {
        company.destroy.mutate(row.id)
      })
      .catch(() => console.log("ok demedi"))
  })

  return (
    <Main
      breadcrumb={[{ name: "Şirketler", href: "/app/company" }]}
      title="Şirketler"
      description="Bu ekrandan şirket ekleyebilir, silebilir ve var olanları düzenleyebilirsiniz."
      actions={[
        {
          title: "Yeni şirket",
          icon: PlusSolid,
          onClick: upsertCompanyDrawer.show,
        },
      ]}
    >
      {upsertCompanyDrawer.value && (
        <UpsertCompanyDrawer
          updateId={Number(searchParams.id)}
          open={upsertCompanyDrawer.value}
          onClose={() => {
            setSearchParams({ ...searchParams, id: undefined })
            upsertCompanyDrawer.hide()
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
            label: "Başlık",
            field: "title",
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
                    upsertCompanyDrawer.show()
                    setSearchParams({ ...searchParams, id: row.id })
                  }}
                >
                  <PencilSolid className="w-5 h-5 fill-indigo-300 hover:fill-indigo-800" />
                </button>
              </>
            ),
          },
        ]}
        rows={company.list?.data?.data.rows}
        totalCount={company.list?.data?.data.count || 0}
        pageIndex={Number(pageIndex) || 0}
        pageSize={Number(pageSize) || 0}
      />
    </Main>
  )
}

export default Company
