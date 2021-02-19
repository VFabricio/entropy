import { Action } from './action'

/**
 * `Reducer` is where the state updating logic is contained in Entropy. Each
 * store has a reducer, which chooses what to do with the state based on the
 * current state. So, at least at the type level, a reducer is just a function
 * which takes the current state and an action and returns the new state.
 *
 * Notice that the type definition implies that the reducers *must* be
 * synchronous (it returns the state itself and not a Promise that resolves to
 * the state). The idea is that actions should only be emitted if there is
 * enough information for the reducer to determine how to compute the next state
 * . If extra information is needed (perhaps by querying an external API), that
 * information must first be obtained outside the reducer and only after that
 * the action should be emitted.
 *
 * Actually, the reducer must satisfy an even stronger constraint. Reducers have
 * to be *pure*. That is, when given the same current state and action the
 * reducer must always return the same new state. This ensures the replayability
 * of the store: if one is given the initial state and all action that were sent
 * to the store, it is always possible to recompute the state.
 *
 * So, any non-deterministic computation that you might have must be moved
 * outside of the reducers. Incentivizing this separation of effectful and pure
 * code is one of the key ideas of Entropy (and similiar libraries, such as
 * Redux).
 *
 * Example of a reducer responsible for updating a counter:
 * ```typescript
 *   const reducer: Reducer<number, void, Action<void>> = (state, action) => {
 *     switch (action.type) {
 *     case 'increase':
 *       return state + 1
 *     case 'decrease':
 *       return state - 1
 *     default:
 *       return state
 *     }
 *   }
 * ```
 * Notice how we have taken care to return the state unchanged if the action is
 * not recognized. It is usually a good idea to do that, since it makes it
 * easier to combine reducers and less likely that you will get a corrupt state
 * if you forget to handle an action type. Had we omitted the default clause,
 * the state would become `undefined` when an unrecognized action is received,
 * which might not be expected behavior.
 *
 * @typeParam S - the state type handled by the reducer
 * @typeParam P - the payload type of the actions handled by the reducer
 * @typeParam A - the type of the actions handled by the reducer
 */
type Reducer<S, P, A extends Action<P>> = (state: S, action: A) => S

export type { Reducer }
