import type { Observable } from 'rxjs'
import { scan, shareReplay, startWith } from 'rxjs/operators'

import type { Action } from './types/action'
import type { Reducer } from './types/reducer'

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
