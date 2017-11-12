import { createRelationAddHandler, createRelationDeleteHandler } from '../src/'

import tests from './tests'
import actions from './data/actions'
import equals from './data/equals'
import initialState from './data/initialState'

const { data } = initialState

let postsState = data.posts
let shiftsState = data.shifts

describe('Relations', () => {
  test(tests.relations.addOneWithoutPayload.title, () => {
    postsState = createRelationAddHandler('comments', 'post')(postsState, {
      payload: null,
    })

    expect(postsState).toEqual(data.posts)
  })

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

  test(tests.relations.deleteOneWithoutPayload.title, () => {
    const shifts = createRelationDeleteHandler('shiftsJobs')(data.shifts, {
      payload: null,
    })

    expect(shifts).toEqual(data.shifts)
  })

  test(tests.relations.deleteOne.title, () => {
    shiftsState = createRelationDeleteHandler('shiftsJobs')(
      shiftsState,
      actions.relations[tests.relations.deleteOne.key],
    )

    expect(shiftsState).toEqual(equals.relations[tests.relations.deleteOne.key])
  })
})
