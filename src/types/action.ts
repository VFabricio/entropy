/**
 * An `Action` is the fundamental way of interacting with Entropy stores. Each
 * store is associated to a stream of actions (represented by an RxJS
 * Observable) and has a {@link Reducer} which tells it how to how to update its
 * state in response to actions.
 *
 * Every action must have a `type` property. This is supposed to be the main way
 * for reducers to understand what the action is supposed to represent.
 *
 * Optionally, an action can also contain arbitrary extra data in its `payload`
 * property. It is a good idea to make such data serializable (to be able to
 * send actions over the wire, for example), but Entropy neither enforces this
 * or relies on it.
 *
 * For example, a note taking app might contain an action like this:
 * ```typescript
 *   const addNoteAction = {
 *     type: 'addNote',
 *     payload: {
 *       id: 42,
 *       content: "foo",
 *       date: Date.now(),
 *     }
 *   }
 * ```
 *
 * @typeParam P - the type for the action's payload
 */
interface Action<P> {
    type: string,
    payload: P,
}

type ActionCreator<P> = (payload: P) => Action<P>

export { Action, ActionCreator }
