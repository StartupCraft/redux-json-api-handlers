import { createLoadHandler, createDeleteHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

const { posts } = initialState

describe('Entities', () => {
  test(tests.entity.addOne.title, () => {
    const nextState = createLoadHandler('posts')(
      posts,
      actions.entity[tests.entity.addOne.key],
    )

    expect(nextState).toEqual(equals.entity[tests.entity.addOne.key])
  })

  test(tests.entity.addOneWithoutLoading.title, () => {
    const nextState = createLoadHandler('posts', { withLoading: false })(
      posts,
      actions.entity[tests.entity.addOne.key],
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.addOneWithoutLoading.key],
    )
  })

  test(tests.entity.addOneToOtherKey.title, () => {
    const nextState = createLoadHandler('posts', {
      mapToKey: 'postIds',
      idsOnly: true,
    })(posts, actions.entity[tests.entity.addOne.key])

    expect(nextState).toEqual(equals.entity[tests.entity.addOneToOtherKey.key])
  })

  test(tests.entity.deleteOne.title, () => {
    const nextState = createDeleteHandler('posts')(
      posts,
      actions.entity[tests.entity.deleteOne.key],
    )

    expect(nextState).toEqual(equals.entity[tests.entity.deleteOne.key])
  })

  test(tests.entity.deleteOneFromOtherKey.title, () => {
    const nextState = createDeleteHandler('postIds')(
      posts,
      actions.entity[tests.entity.deleteOne.key],
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneFromOtherKey.key],
    )
  })

  test(tests.entity.deleteOneWithoutDeletedId.title, () => {
    const nextState = createDeleteHandler('posts')(
      posts,
      actions.entity[tests.entity.deleteOneWithoutDeletedId.key],
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneWithoutDeletedId.key],
    )
  })
})
