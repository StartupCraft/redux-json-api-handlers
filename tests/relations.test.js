import { createRelationAddHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

const { data } = initialState

let postsState = data.posts
let shiftsState = data.shifts

describe('Relations', () => {
  test(tests.relations.addOne.title, () => {
    postsState = createRelationAddHandler('comments', 'post')(
      postsState,
      actions.relations[tests.relations.addOne.key],
    )

    expect(postsState).toEqual(equals.relations[tests.relations.addOne.key])
  })

  test(tests.relations.addMany.title, () => {
    postsState = createRelationAddHandler('comments', 'post')(
      postsState,
      actions.relations[tests.relations.addMany.key],
    )

    expect(postsState).toEqual(equals.relations[tests.relations.addMany.key])
  })

  test(tests.relations.addManyToMany.title, () => {
    shiftsState = createRelationAddHandler('shiftsJobs', 'shift')(
      shiftsState,
      actions.relations[tests.relations.addManyToMany.key],
    )

    expect(shiftsState).toEqual(
      equals.relations[tests.relations.addManyToMany.key],
    )
  })
})
