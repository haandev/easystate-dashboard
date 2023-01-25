import Drawer from "@/components/Drawer/Drawer"
import useForm from "@/hooks/useForm"
import useCompany from "@/queries/useCompany"
import React, { FC, useEffect } from "react"
import * as yup from "yup"
import * as estate from "@/services/estate"
import useEvent from "react-use-event-hook"
const UpsertCompanyDrawer: FC<any> = ({
  open,
  onClose,
  onSaveSuccess,
  initialData,
  updateId,
}) => {
  const company = useCompany({ id: updateId})
 
  const form = useForm({
    formType: "controlled",
    formId: "add-company-form",
    initialValues: company.find.data?.data || { title: "" },
  })

  useEffect(()=>{
    if (company.find.isFetchedAfterMount){
      form.handlePatch(company.find.data?.data || {})
    }
  },[company.find.isFetchedAfterMount])


  const handleSave = useEvent(() => {
    const method = updateId ? company.update.mutate : company.create.mutate
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
      title={updateId ? "Şirketi Düzenle" : "Yeni şirket"}
      description={
        updateId
          ? "Seçili şirketin bilgilerini düzenlemek için formu doldurun"
          : "Yeni şirket eklemek için aşağıdaki formu doldurun"
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
            Şirket başlığı
          </label>
          <div className="mt-1">
            <input
              type="text"
              {...form.props("title", {
                schema: yup.string().required(),
              })}
              className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>
    </Drawer>
  )
}

export default UpsertCompanyDrawer
