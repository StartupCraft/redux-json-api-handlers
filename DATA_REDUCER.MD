# redux-json-api-handlers

Redux JSON-API handlers V2. New api

## Data reducer example

First, create file `data/index.js` in reducers root folder with contents:

```js
import { mergers } from 'redux-json-api-handlers'

import get from 'lodash/get'
import mergeWith from 'lodash/mergeWith'
import omit from 'lodash/omit'

import handlersReducer from './handlers'

const initialState = {}

export default (state = initialState, action) => {
  const data = get(action, 'payload.data')
  const meta = get(action, 'meta', {})

  if (data && meta.isSuccess) {
    const nextState = mergeWith({}, state, omit(data, 'meta'), mergers.latestArrayMerger)

    // Listen only for API success events
    return handlersReducer(nextState, action)
  }

  return state
}
```

Then, create file `data/handlers/index.js` with contents:

```js
import { mergers } from 'redux-json-api-handlers'

import mergeWith from 'lodash/mergeWith'
import reduce from 'lodash/reduce'
import set from 'lodash/set'

import posts from './posts'

const reducers = {
  posts
}

export default (state, action) =>
  mergeWith(
    {},
    state,
    reduce(
      reducers,
      (acc, reducer, key) => set(acc, key, reducer(state[key], action)),
      {},
    ),
    mergers.latestArrayMerger,
  )

```

For example, create file `data/handlers/posts.js` with contents:
```js
import { createRelationAddHandler, createRelationDeleteHandler } from 'redux-json-api-handlers'

import {
  ADD_COMMENT,
  DELETE_COMMENT,
} from 'Store/Actions/news'

const initialState = {}

const handlers = {
  [ADD_COMMENT.SUCCESS]: createRelationAddHandler('comments', 'post'),
  [DELETE_COMMENT.SUCCESS]: createRelationDeleteHandler('comments'),
}

export default createReducer(initialState, handlers)
```

`createReducer` example:
```js
export const createReducer = (initialState, handlers) => (
  state = initialState,
  action,
) => (handlers[action.type] ? handlers[action.type](state, action) : state)
```
