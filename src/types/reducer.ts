import { Action } from './action'

type Reducer<S, P, A extends Action<P>> = (state: S, action: A) => S

export type { Reducer }
