import { createLoadHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

let { posts } = initialState

describe('Entities', () => {
  test(tests.entity.addOne.title, () => {
    posts = createLoadHandler('posts')(
      posts,
      actions.entity[tests.entity.addOne.key],
    )

    expect(posts).toEqual(equals.entity[tests.entity.addOne.key])
  })
})
