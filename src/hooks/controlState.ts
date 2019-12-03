export interface ControlState {
  label: string
  value: string
  required?: boolean
  readonly?: boolean
}

export const controlState: ControlState = {
  label: '',
  value: '',
  required: false,
  readonly: false,
}
