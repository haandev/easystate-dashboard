import React, { useCallback, useEffect, useRef, useState } from "react"
import * as yup from "yup"

export type UseFormPropsType<T> = {
  formType: "controlled" | "uncontrolled"
  onError?: (err: any) => void
  formId?: string
  initialValues: T
}

export type ToStringAll<T> = Record<keyof T, string>
export type UseFormReturnType<T> = {
  handleChange: (e: any, formatter: any) => void
  handleFieldChange: (name: keyof T, value?: string) => void
  handlePatch: (obj: Record<string, any>) => void
  handleSubmit: (
    onSubmit: (values: T) => Promise<any> | void
  ) => () => Promise<any>
  values: Partial<T>
  errors: Partial<ToStringAll<T>>
  handleReset: () => void
  props: (
    name: keyof T,
    config: {
      formatter?: (value: any) => any
      schema: yup.AnySchema
      validateOn?: { blur?: boolean; change?: boolean; submit?: boolean }
      onChange?: (e: any) => void
      onBlur?: (e: any) => void
    }
  ) => {
    name: keyof T
    id: string
    onChange?: (e: any) => void
    onBlur?: (e: any) => void
    value?: any
    defaultValue?: any
  }
}

const useForm = <T>({
  formType,
  formId,
  onError,
  initialValues,
}: UseFormPropsType<T>): UseFormReturnType<T> => {
  const [values, setValuesRoot] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<ToStringAll<T>>>({})
  const schemaObj = useRef<any>({})
  const validateOnObj = useRef<any>({})

  const setValues: React.Dispatch<React.SetStateAction<T>> = useCallback(
    (values) => {
      if (formType === "controlled") setValuesRoot(values as any)
    },
    []
  )
  useEffect(() => {
    setValuesRoot(initialValues)
  }, [])
  const handleChange = useCallback((e: any, formatter: any) => {
    const value = formatter ? formatter(e.target.value) : e.target.value
    const name = e.target.name
    setValues((prev) => ({ ...prev, [name]: value }))
    fieldValidate(name, value, "change")
  }, [])

  const handleFieldChange = useCallback((name: keyof T, value?: string) => {
    if (value !== undefined) {
      setValues((prev) => ({ ...prev, [name]: value }))
      if (formType === "uncontrolled" && formId) {
        const form = document.getElementById(formId)
        const children = Array.from(form?.children || [])
        const el = children.find(
          (elem) => (elem as HTMLInputElement).name === name
        ) as HTMLInputElement
        el.value = value
      }
      fieldValidate(name, value, "change")
    }
  }, [])

  const handlePatch = useCallback((obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      return handleFieldChange(key as keyof T, value as any)
    })
  }, [])

  const fieldValidate = useCallback(
    (name: keyof T, value: string, action: "blur" | "change" | "submit") => {
      if (validateOnObj.current[name]?.[action]) {
        const prm = schemaObj.current[name]?.validate?.(value)
        prm
          ?.then(() => {
            setErrors((prev: any) => ({ ...prev, [name]: "" }))
          })
          ?.catch((err: yup.ValidationError) => {
            setErrors((prev: any) => ({ ...prev, [name]: err.message }))
          })
        return prm
      }
    },
    []
  )

  const handleBlur = useCallback((e: any) => {
    const name = e.target.name
    const value = e.target.value
    fieldValidate(name, value, "blur")
  }, [])
  const handleReset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
  }, [])

  const handleSubmit: UseFormReturnType<T>["handleSubmit"] = useCallback(
    (onSubmit) => {
      return () => {
        let val: any = {}
        if (formType === "controlled") {
          val = values //state
        } else if (formType === "uncontrolled" && formId) {
          const form = document.getElementById(formId)
          const children = Array.from(form?.children || [])
          children
            .filter((elem) => ["INPUT", "SELECT"].includes(elem.tagName))
            .forEach((elem) => {
              const el = elem as HTMLInputElement
              const key = el.name
              const value = el.value
              val[key] = value //uncontrlled
            })
        }
        const validations = Object.entries(val as any).map(([key, value]) => {
          return fieldValidate(key as keyof T, value as string, "submit")
        })

        return Promise.allSettled(validations).then((promiseValues) => {
          const rejected = promiseValues.filter(
            (prm) => prm?.status === "rejected"
          )
          if (rejected.length) {
            onError?.(rejected)
          } else {
            return onSubmit(val)
          }
        })
      }
    },
    [values]
  )
  const props = useCallback(
    (
      name: keyof T,
      config: {
        formatter?: (value: any) => any
        schema: yup.AnySchema
        validateOn?: { blur?: boolean; change?: boolean; submit?: boolean }
        onChange?: (e: any) => void
        onBlur?: (e: any) => void
      }
    ) => {
      schemaObj.current[name] = config.schema
      validateOnObj.current[name] = {
        blur: config.validateOn?.blur ?? false,
        change: config.validateOn?.change ?? false,
        submit: config.validateOn?.submit ?? true,
      }
      return {
        name,
        id: `${formId ? formId + "." : ""}${String(name)}`,
        ...(formType === "controlled"
          ? { value: (values as any)[name] }
          : formType === "uncontrolled"
          ? { defaultValue: initialValues[name] }
          : {}),
        onChange: (e: any) => {
          e.target.value = config.formatter
            ? config.formatter?.(e.target.value)
            : e.target.value
          config?.onChange?.(e)
          handleChange(e, config.formatter)
        },
        onBlur: (e: any) => {
          e.target.value = config.formatter
            ? config.formatter?.(e.target.value)
            : e.target.value
          config?.onBlur?.(e)
          handleBlur(e)
        },
      }
    },
    [values]
  )

  return {
    handleChange,
    handleFieldChange,
    handleSubmit,
    values,
    errors,
    handleReset,
    props,
    handlePatch,
  }
}

export default useForm
