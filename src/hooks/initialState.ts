import { ControlState, controlState } from './controlState'

export interface InitialState {
  id: ControlState
  name: ControlState
}

export const initialState: InitialState = {
  id: controlState,
  name: controlState,
}
