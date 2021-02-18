import { createAction } from './action'

describe('actionCreator', () => {
  it('should return an action creator that returns the correct type', () => {
    const increase = createAction<void>('increase')
    const action = increase()
    expect(action.type).toBe('increase')
  })

  it('should return an action creator that returns the correct payload', () => {
    const increaseBy = createAction<number>('increaseBy')
    const action = increaseBy(42)
    expect(action.payload).toBe(42)
  })

  it('should return an action creator that returns its type when stringified', () => {
    const increase = createAction<void>('increase')
    expect(`${increase}`).toBe('increase')
  })
})
