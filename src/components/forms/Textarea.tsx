import React, { forwardRef } from "react"
import FormBase from "./FormBase"

const Textarea = forwardRef((props: any, ref) => {
  return (
    <FormBase {...props}>
      <textarea
        ref={ref}
        type="text"
        {...props.inputProps}
        className="block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
      />
    </FormBase>
  )
})

export default Textarea
