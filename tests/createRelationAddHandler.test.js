import { createRelationAddHandler } from '../src/'

import initialState from './data/initialState'

const addCommentAction = {
  payload: {
    data: {
      comments: {
        3: {
          id: 3,
          relationships: {
            post: {
              data: {
                id: 1,
                type: 'posts',
              },
            },
          },
        },
      },
    },
  },
}

const addManyCommentsAction = {
  payload: {
    data: {
      comments: {
        4: {
          id: 4,
          relationships: {
            post: {
              data: {
                id: 1,
                type: 'posts',
              },
            },
          },
        },
        5: {
          id: 5,
          relationships: {
            post: {
              data: {
                id: 1,
                type: 'posts',
              },
            },
          },
        },
      },
    },
  },
}

let state = initialState

test('handle singular relation add test', () => {
  state = createRelationAddHandler('comments', 'post')(
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
  state = createRelationAddHandler('comments', 'post')(
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
