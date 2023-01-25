const FormBase = (props: any) => {
  return (
    <div className={props.className}>
      <label
        htmlFor={props.name || props.inputProps.name}
        className="block text-sm font-medium text-gray-900"
      >
        {props.label}
      </label>
      <div className="mt-1 flex flex-row items-center relative">{props.children}</div>

      {props.error ? (
        <div>
          <span className="text-xs text-red-500">{props.error}</span>
        </div>
      ) : (
        <div>
          <span className="text-xs">{props.description}</span>
        </div>
      )}
    </div>
  )
}

export default FormBase
