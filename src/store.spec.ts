import { marbles } from 'rxjs-marbles'
import { Observable, Subject } from 'rxjs'
import { createAction } from './action'
import { createStore } from './store'
import { Action, ActionCreator } from './types/action'
import { Reducer } from './types/reducer'

describe('createStore', () => {
  it('should emit a store with the correct initial state and that responds correctly to actions', marbles(m => {
    const increase: ActionCreator<void> = createAction('increase')
    const decrease: ActionCreator<void> = createAction('decrease')
    const foo: ActionCreator<void> = createAction('foo')

    const reducer: Reducer<number, void, Action<void>> = (state, action) => {
      switch (action.type) {
      case 'increase':
        return state + 1
      case 'decrease':
        return state - 1
      default:
        return state
      }
    }

    const action$: Subject<Action<void>> = new Subject()

    const state$: Observable<number> = createStore(reducer, 42, action$)

    action$.next(increase())
    action$.next(decrease())
    action$.next(decrease())
    action$.next(foo())

    const values = { a: 42, b: 43, c: 42, d: 41, e: 41 }
    const expected = m.hot('(abcde)', values)

    m.expect(state$).toBeObservable(expected)
  }))
})
