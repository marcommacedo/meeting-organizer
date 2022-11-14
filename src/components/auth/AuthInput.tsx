interface AuthInputProps {
  id: string
  label: string
  value: any
  onChange: (value: any) => void
  type: string
  placeholder: string
  isRequired?: boolean
}

export default function AuthInput(props: AuthInputProps) {
  return (
    <div className="flex flex-col mt-4 mb-2">
      <label htmlFor={props.id}>{props.label}</label>
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className="border rounded-lg mt-2 py-2 px-2 bg-gray-200 focus:bg-white focus:border-blue-400 focus:outline-none"
      />
    </div>
  )
}
