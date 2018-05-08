import { createLoadHandler, createDeleteHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

const { posts } = initialState

describe('Add singular entity', () => {
  // Add single entity
  test(tests.entity.addOne.title, () => {
    const nextState = createLoadHandler('posts', {
      singular: true,
      mapToKey: 'post',
    })(posts, actions.entity.addOne)

    expect(nextState).toEqual(equals.entity[tests.entity.addOne.key])
  })

  test(tests.entity.addOneWithoutLoading.title, () => {
    const nextState = createLoadHandler('posts', {
      withLoading: false,
      singular: true,
    })(posts, actions.entity.addOne)

    expect(nextState).toEqual(
      equals.entity[tests.entity.addOneWithoutLoading.key],
    )
  })

  test(tests.entity.addOneToOtherKey.title, () => {
    const nextState = createLoadHandler('posts', {
      mapToKey: 'postId',
      singular: true,
    })(posts, actions.entity.addOne)

    expect(nextState).toEqual(equals.entity[tests.entity.addOneToOtherKey.key])
  })

  test(tests.entity.addOneWithReplace.title, () => {
    const nextState = createLoadHandler('posts', {
      mapToKey: 'post',
      singular: true,
    })(posts, actions.entity.addOneWithReplace)

    expect(nextState).toEqual(equals.entity[tests.entity.addOneWithReplace.key])
  })
})

describe('Add multiple entities', () => {
  test(tests.entity.addMultiple.title, () => {
    const nextState = createLoadHandler('posts')(
      posts,
      actions.entity.addMultiple,
    )

    expect(nextState).toEqual(equals.entity[tests.entity.addMultiple.key])
  })

  test(tests.entity.addMultipleWithReplace.title, () => {
    const nextState = createLoadHandler('posts', { withReplace: true })(
      posts,
      actions.entity.addMultipleWithReplace,
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.addMultipleWithReplace.key],
    )
  })

  test(tests.entity.addMultipleWithoutLoading.title, () => {
    const nextState = createLoadHandler('posts', {
      withLoading: false,
    })(posts, actions.entity.addMultiple)

    expect(nextState).toEqual(
      equals.entity[tests.entity.addMultipleWithoutLoading.key],
    )
  })

  test(tests.entity.addMultipleToOtherKey.title, () => {
    const nextState = createLoadHandler('posts', {
      mapToKey: 'postIds',
    })(posts, actions.entity.addMultiple)

    expect(nextState).toEqual(
      equals.entity[tests.entity.addMultipleToOtherKey.key],
    )
  })
})

describe('Delete entity', () => {
  test(tests.entity.deleteOne.title, () => {
    const nextState = createDeleteHandler('posts')(
      posts,
      actions.entity.deleteOne,
    )

    expect(nextState).toEqual(equals.entity[tests.entity.deleteOne.key])
  })

  test(tests.entity.deleteOneFromOtherKey.title, () => {
    const nextState = createDeleteHandler('postIds')(
      posts,
      actions.entity.deleteOne,
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneFromOtherKey.key],
    )
  })

  test(tests.entity.deleteOneWithoutDeletedId.title, () => {
    const nextState = createDeleteHandler('posts')(
      posts,
      actions.entity.deleteOneWithoutDeletedId,
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneWithoutDeletedId.key],
    )
  })

  test(tests.entity.deleteMany.title, () => {
    const nextState = createDeleteHandler('posts')(
      posts,
      actions.entity.deleteMany,
    )

    expect(nextState).toEqual(equals.entity[tests.entity.deleteMany.key])
  })

  test(tests.entity.deleteOneFromSingular.title, () => {
    const nextState = createDeleteHandler('post')(
      posts,
      actions.entity.deleteOneFromSingular,
    )

    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneFromSingular.key],
    )
  })

  test(tests.entity.deleteOneWithAdditional.title, () => {
    const nextState = createDeleteHandler('posts', {
      addToState: {
        isDeleted: true,
      },
    })(posts, actions.entity.deleteOne)
    expect(nextState).toEqual(
      equals.entity[tests.entity.deleteOneWithAdditional.key],
    )
  })
})
