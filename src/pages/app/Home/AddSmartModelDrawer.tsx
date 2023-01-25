import Drawer from "@/components/Drawer/Drawer"
import useForm from "@/hooks/useForm"
import useCompany from "@/queries/useCompany"
import React, { FC, useEffect, useState } from "react"
import * as yup from "yup"
import * as estate from "@/services/estate"
import useEvent from "react-use-event-hook"
import useSmartModelQuery from "@/queries/useSmartModelQuery"
import Input from "@/components/forms/Input"
import { plural, singular } from "pluralize"
import * as c from "change-case"
import Textarea from "@/components/forms/Textarea"
import SwitchControl from "@/components/forms/Switch"
import useBoolean from "@/hooks/useBoolean"
import MaterialIcons, {
  MaterialIconsModal,
} from "@/components/material-icons/MaterialIcons"
const UpsertCompanyDrawer: FC<any> = ({
  open,
  onClose,
  onSaveSuccess,
  initialData,
  updateId,
}) => {
  const smartModel = useSmartModelQuery()

  const form = useForm<SmartModelCreatePayload>({
    onError: console.log,
    formType: "controlled",
    formId: "add-company-form",
    initialValues: {
      tableName: "",
      modelName: "",
      singular: "",
      plural: "",
      description: "",
      icon: "apartment",
      isHierarchy: false,
      userOwnable: false,
      groupOwnable: false,
      sortable: false,
      paranoid: false,
    },
  })

  const handleSave = useEvent(() => {
    const method = smartModel.create.mutate
    form
      .handleSubmit(method)()
      .then((e) => {
        form.handleReset()
        onClose?.()
        onSaveSuccess && onSaveSuccess?.()
      })
  })

  const namingDetails = useBoolean(false)
  const iconModal = useBoolean(false)
  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="New data model"
      description="You can add new data model via this form"
      size="narrow"
      onSave={handleSave}
    >
      <div className="space-y-6 pt-6 pb-5">
        <MaterialIconsModal
          visible={iconModal.isVisible}
          onClose={iconModal.hide}
          onSelect={(val: string) => form.handleFieldChange("icon", val)}
        />
        <div id="add-data-model-form">
          <Input
            error={form.errors.modelName}
            label="Model name"
            description="A name for the new data model. It is recommended to be singular. For example:`Customer`"
            inputProps={{
              ...form.props("modelName", {
                schema: yup.string().required(),
                formatter: c.pascalCase,
                onChange: (e: any) => {
                  form.handlePatch({
                    tableName: plural(e.target.value).toLowerCase(),
                    plural: plural(e.target.value).toLowerCase(),
                    singular: singular(e.target.value).toLowerCase(),
                  })
                },
              }),
              placeholder: "e.g. Customer",
            }}
          />
          <Input
            className="mt-4"
            label="Icon"
            withIcon={
              <span className="material-symbols-outlined">
                {form.values.icon}
              </span>
            }
            description="Provide a icon to use at UI"
            inputProps={{
              ...form.props("icon", {
                schema: yup.string().required(),
              }),
              onClick: iconModal.show,
              placeholder: "",
            }}
          />
          <SwitchControl
            className="mt-4"
            label="Naming details"
            description="If you choose this, you will be asked to manage names such as table name, singularity, plural. Generally this is not needed."
            value={namingDetails.value}
            onChange={namingDetails.setValue}
          />
          {namingDetails.value && (
            <>
              <Input
                className="mt-4"
                label="Table name"
                description="Provide a table name to store in the database. Multiple is recommended. For example `customers`"
                inputProps={{
                  ...form.props("tableName", {
                    schema: yup.string().required(),
                  }),
                  placeholder: "e.g. customers",
                }}
              />
              <Input
                className="mt-4"
                label="Singular"
                description="How are records of this data model named when they are singular?"
                inputProps={{
                  ...form.props("singular", {
                    schema: yup.string().required(),
                  }),
                  placeholder: "e.g. customer",
                }}
              />
              <Input
                className="mt-4"
                label="Plural"
                description="How are records of this data model named when they are plural?"
                inputProps={{
                  ...form.props("plural", {
                    schema: yup.string().required(),
                  }),
                  placeholder: "e.g. customers",
                }}
              />
            </>
          )}

          <Textarea
            error={form.errors.description}
            className="mt-4"
            label="Description"
            description="Provide a description for this data model to show in the interface"
            inputProps={{
              ...form.props("description", {
                schema: yup.string().required(),
              }),
            }}
          />
          <SwitchControl
            className="mt-4"
            label="Paranoid"
            description="If you choose this, it will simply become invisible when a record is deleted."
            value={form.values.paranoid}
            onChange={(val: boolean) => {
              form.handleFieldChange("paranoid", val)
            }}
          />
          <SwitchControl
            className="mt-4"
            label="Is Hierarchy"
            description="Do the records here have a subordinate relationship among themselves? For example, category and subcategory relationship in the same table."
            value={form.values.isHierarchy}
            onChange={(val: boolean) => {
              form.handleFieldChange("isHierarchy", val)
            }}
          />
          <SwitchControl
            className="mt-4"
            label="Sortable"
            description="Should the records here be sorted with a specific sequence number? For example, products in the price list."
            value={form.values.sortable}
            onChange={(val: boolean) => {
              form.handleFieldChange("sortable", val)
            }}
          />
          <SwitchControl
            className="mt-4"
            label="User ownable"
            description="Can any of the records here be owned by any user? For example, a vehicle advertisement on the classifieds site?"
            value={form.values.userOwnable}
            onChange={(val: boolean) => {
              form.handleFieldChange("userOwnable", val)
            }}
          />
          <SwitchControl
            className="mt-4"
            label="Group ownable"
            description="Can one of the records here become the property of any user group? For example, is a vehicle posting on the classifieds site open to all other users in the user's group?"
            value={form.values.groupOwnable}
            onChange={(val: boolean) => {
              form.handleFieldChange("groupOwnable", val)
            }}
          />
        </div>
      </div>
    </Drawer>
  )
}

export default UpsertCompanyDrawer
