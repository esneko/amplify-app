import { InitialState, initialState } from '../hooks/initialState'

export interface Action {
  type: 'setField' | 'reset'
  data: {
    id: string
    value: {}
  }
}

export const reducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case 'setField':
      return {
        ...state,
        [action.data.id]: action.data.value,
      }
    case 'reset':
      return initialState
    default:
      throw new Error()
  }
}
