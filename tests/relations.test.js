import ReduxService from '../src/'

import { addCommentAction, addManyCommentsAction } from './data/actions'
import initialState from './data/initialState'

let state = initialState

describe('Relations suite', () => {
  test('handle singular relation add test', () => {
    state = ReduxService.createRelationAddHandler('comments', 'post')(
      initialState,
      addCommentAction,
    )

    expect(state).toEqual({
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
              {
                id: 2,
                type: 'comments',
              },
              {
                id: 3,
                type: 'comments',
              },
            ],
          },
          user: {
            data: {
              id: 1,
              type: 'users',
            },
          },
        },
      },
    })
  })

  test('handle many relations add test', () => {
    state = ReduxService.createRelationAddHandler('comments', 'post')(
      state,
      addManyCommentsAction,
    )

    expect(state).toEqual({
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
              {
                id: 2,
                type: 'comments',
              },
              {
                id: 3,
                type: 'comments',
              },
              {
                id: 4,
                type: 'comments',
              },
              {
                id: 5,
                type: 'comments',
              },
            ],
          },
          user: {
            data: {
              id: 1,
              type: 'users',
            },
          },
        },
      },
    })
  })
})
