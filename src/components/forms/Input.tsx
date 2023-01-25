import classNames from "classnames"
import React, { forwardRef } from "react"
import FormBase from "./FormBase"

const Input = forwardRef((props: any, ref) => {
  return (
    <FormBase {...props}>
      <div className="absolute  ml-2 w-12 h-7 overflow-hidden">{props.withIcon}</div>
      <input
        ref={ref}
        type="text"
        {...props.inputProps}
        className={classNames("block w-full shadow-sm sm:text-sm focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md",
        props.withIcon ? "pl-12" : " "
        )}
      />
    </FormBase>
  )
})

export default Input
