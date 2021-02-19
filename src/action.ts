import { ActionCreator } from './types/action'

/**
 * Creates an {@link ActionCreator} with the given `type`
 *
 * @param type - the type for the actions obtained from the returned `ActionCreator`
 */
const createAction = <P>(type: string): ActionCreator<P> => {
  const actionCreator: ActionCreator<P> = payload => ({
    type,
    payload,
  })

  actionCreator.toString = () => type

  return actionCreator
}

export { createAction }
