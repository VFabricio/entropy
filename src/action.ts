import { ActionCreator } from './types/action'

const createAction = <P>(type: string): ActionCreator<P> => {
  const actionCreator: ActionCreator<P> = payload => ({
    type,
    payload,
  })

  actionCreator.toString = () => type

  return actionCreator
}

export { createAction }
