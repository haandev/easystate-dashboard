export const mapFormDataRequest = (data: any): FormData => {
  if (data instanceof FormData) {
    return data
  } else {
    const formData = new FormData()
    const obj = Object.entries(data)

    obj.forEach((entry) => {
      if (!entry[1]) {
        formData.append(entry[0], "")
      } else if (entry[1] instanceof Array) {
        entry[1].forEach((item) => {
          if (item === null) {
            formData.append(entry[0], "")
          } else if (item instanceof File || typeof item === "string") {
            formData.append(entry[0], item)
          } else {
            formData.append(entry[0], JSON.stringify(item))
          }
        })
      } else if (entry[1] instanceof File || typeof entry[1] === "string") {
        formData.append(entry[0], entry[1])
      } else {
        formData.append(entry[0], JSON.stringify(entry[1]))
      }
    })
    return formData
  }
}

export const stringMap = (params: any) =>
  Object.entries(params).reduce((prev, [key, value]) => {
    prev[key] = String(value)
    return prev
  }, {} as any)
