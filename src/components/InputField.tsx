import * as React from 'react'
import TextField, { Input } from '@material/react-text-field'

interface Props {
  label: React.ReactNode
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  className?: string
  dense?: boolean
  fullWidth?: boolean
  outlined?: boolean
  textarea?: boolean
}

const InputField: React.FunctionComponent<Props> = ({
  value,
  onChange,
  ...props
}) => (
  <TextField {...props}>
    <Input value={value} onChange={onChange} />
  </TextField>
)

export default React.memo(InputField)
