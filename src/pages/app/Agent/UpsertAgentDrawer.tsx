import Drawer from "@/components/Drawer/Drawer"
import useForm from "@/hooks/useForm"
import useCompany from "@/queries/useCompany"
import React, { FC, useEffect } from "react"
import * as yup from "yup"
import * as estate from "@/services/estate"
import useEvent from "react-use-event-hook"
import useAgent from "@/queries/useAgent"
const UpsertCompanyDrawer: FC<any> = ({
  open,
  onClose,
  onSaveSuccess,
  initialData,
  updateId,
}) => {
  const agent = useAgent({ id: updateId })
  const company = useCompany({
    params: { sortBy: "id", sortType: "asc", pageIndex: 1, pageSize: 9999 },
  })
  const form = useForm({
    formType: "controlled",
    formId: "add-company-form",
    initialValues: agent.find.data?.data || {
      name: "",
      surname: "",
      username: "",
      phone: "",
      password: "",
      companyId: -1,
    },
  })

  useEffect(() => {
    if (agent.find.isFetchedAfterMount) {
      form.handlePatch(agent.find.data?.data || {})
    }
  }, [agent.find.isFetchedAfterMount])

  const handleSave = useEvent(() => {
    const method = updateId ? agent.update.mutate : agent.create.mutate
    form
      .handleSubmit(method)()
      .then(() => {
        form.handleReset()
        onClose?.()
        onSaveSuccess && onSaveSuccess?.()
      })
  })
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title={updateId ? "Temsilci Düzenle" : "Yeni Temsilci"}
      description={
        updateId
          ? "Seçili temsilcinin bilgilerini düzenlemek için formu doldurun"
          : "Yeni temsilci eklemek için aşağıdaki formu doldurun"
      }
      size="narrow"
      onSave={handleSave}
    >
      <div className="space-y-6 pt-6 pb-5">
        <div id="add-company-form">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Kullanıcı adı
          </label>
          <div className="mt-1 mb-3">
            <input
              type="text"
              {...form.props("username", {
                schema: yup.string().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Parola
          </label>
          <div className="mt-1 mb-3">
            <input
              type="text"
              {...form.props("password", {
                schema: yup.string(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Adı
          </label>
          <div className="mt-1 mb-3">
            <input
              type="text"
              {...form.props("name", {
                schema: yup.string().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Soyadı
          </label>
          <div className="mt-1 mb-3">
            <input
              type="text"
              {...form.props("surname", {
                schema: yup.string().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-900"
          >
            Telefon numarası
          </label>
          <div className="mt-1 mb-3">
            <input
              type="text"
              {...form.props("phone", {
                schema: yup.string().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
          <label
            htmlFor="companyId"
            className="block text-sm font-medium text-gray-900"
          >
            Şirket
          </label>
          <div className="mt-1 mb-3">
            <select
              {...form.props("companyId", {
                formatter: Number,
                schema: yup.number().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            >
              <option key={-1} value={-1}>
                Seçiniz
              </option>
              {company.list.data?.data.rows.map((company) => (
                <option key={company.id} value={Number(company.id)}>
                  {company.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default UpsertCompanyDrawer
