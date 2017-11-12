import { createRelationAddHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

let { posts, shifts } = initialState

describe('Relations', () => {
  test(tests.relations.addOne.title, () => {
    posts = createRelationAddHandler('comments', 'post')(
      posts,
      actions.relations[tests.relations.addOne.key],
    )

    expect(posts).toEqual(equals.relations[tests.relations.addOne.key])
  })

  test(tests.relations.addMany.title, () => {
    posts = createRelationAddHandler('comments', 'post')(
      posts,
      actions.relations[tests.relations.addMany.key],
    )

    expect(posts).toEqual(equals.relations[tests.relations.addMany.key])
  })

  test(tests.relations.addManyToMany.title, () => {
    shifts = createRelationAddHandler('shiftsJobs', 'shift')(
      shifts,
      actions.relations[tests.relations.addManyToMany.key],
    )

    expect(shifts).toEqual(equals.relations[tests.relations.addManyToMany.key])
  })
})
