interface Action<P> {
    type: string,
    payload: P,
}

type ActionCreator<P> = (payload: P) => Action<P>

export { Action, ActionCreator }
