import type { Observable } from 'rxjs'
import { scan, shareReplay, startWith } from 'rxjs/operators'

import type { Action } from './types/action'
import type { Reducer } from './types/reducer'

/**
 * Creates a store, which responds to actions by updating its state and can be
 * subscribed to.
 *
 * @param reducer - The {@link Reducer}, responsible for processing incoming
 *   actions and updating the state.
 * @param initialState - The initial state of the store.
 * @param action$ - An Observable that represents the sequence of actions sent
 *   to this store over time.
 */
const createStore = <S, P, A extends Action<P>>(
  reducer: Reducer<S, P, A>,
  initialState: S,
  action$: Observable<A>,
): Observable<S> => {
  const state$ = action$.pipe(
    scan(reducer, initialState),
    startWith(initialState),
    shareReplay(),
  )
  // We need this subscription to make the store start processing incoming
  // actions immediately, instead of waiting for the first external subscription
  state$.subscribe()

  return state$
}

export { createStore }
