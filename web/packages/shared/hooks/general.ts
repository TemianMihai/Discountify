import { Dispatch, useReducer } from 'react'

export const useSetState = <T>(initialState: T): [T, Dispatch<T>] => {
  return useReducer(
    (prevState: T, state: T) => ({ ...prevState, ...state }),
    initialState,
  )
}
export const useOnOffSwitch = (initialState: boolean = false) => {
  const [state, setState] = useSetState<{ open: boolean }>({
    open: initialState,
  })

  const onOn = (): void => {
    setState({
      open: true,
    })
  }

  const onOff = (): void => {
    setState({
      open: false,
    })
  }

  return [state.open, onOn, onOff] as const
}
