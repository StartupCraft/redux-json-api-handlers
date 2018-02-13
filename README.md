# redux-json-api-handlers

Redux JSON-API handlers V2. New api

[Data reducer example](DATA_REDUCER.MD)

## Api methods

### Entity handlers

#### `createLoadHandler(resourceType: string, options: object): nextState`
Use it for handle success data loading

Options: 
```js
const options = {
  mapToKey: bool|string,  // default: false, map result to custom reducer key
  withLoading: bool,      // default: true, enable/disable loading params
  singular: bool,         // default: false, get first value and store it
  withReplace: bool,      // default: false, replace current values instead of merge it
  addToState: object,     // default: {}, additional props passed to state
}
```

##### Simple example
Initial state looks like: 
```js
state = {
  posts: {
    isLoaded: false,
    isLoading: false,
    posts: {}
  }
}
```
```js
const handlers = {
  [LOAD_POSTS.SUCCESS]: createLoadHandler('posts')
}
```
Resulted state looks like: 
```js
state = {
  posts: {
    isLoaded: true,
    isLoading: false,
    posts: [1]
  }
}
```

##### Custom example
Initial state looks like: 
```js
state = {
  posts: {
    isLoadedPostIds: false,
    isLoadingPostIds: false,
    post: null,
  }
}
```
Handler:
```js
const handlers = {
  [LOAD_POSTS.SUCCESS]: createLoadHandler('posts', { mapToKey: 'post', singular: true })
}
```
Resulted state looks like: 
```js
state = {
  posts: {
    isLoadedPostIds: true,
    isLoadingPostIds: false,
    postIds: 1,
  }
}
```


#### `createDeleteHandler(stateKey: string): nextState`
Use it for handle delete data.

Action payload should have `deletedId` param with singular ID, or `deletedIds` with array of IDS

##### Simple example
Initial state looks like: 
```js
state = {
  posts: {
    posts: [1, 2]
  }
}
```
Handler:
```js
const handlers = {
  [DELETE_POST.SUCCESS]: createDeleteHandler('posts')
}
// action.payload.deletedId = 1
```
Resulted state looks like: 
```js
state = {
  posts: {
    posts: [2]
  }
}
```

##### Custom key example
Initial state looks like: 
```js
state = {
  posts: {
    postIds: [1, 2]
  }
}
```
```js
const handlers = {
  [DELETE_POST.SUCCESS]: createDeleteHandler('postIds')
}
// action.payload.deletedId = 2
```
Resulted state looks like: 
```js
state = {
  posts: {
    postIds: [1]
  }
}
```

##### Multiple IDs
Initial state looks like: 
```js
state = {
  posts: {
    postIds: [3, 1, 2]
  }
}
```
```js
const handlers = {
  [DELETE_POST.SUCCESS]: createDeleteHandler('postIds')
}
// action.payload.deletedIds = [2, 1]
```
Resulted state looks like: 
```js
state = {
  posts: {
    postIds: [3]
  }
}
```

### Relationships handlers

#### `createRelationAddHandler(type: string, relationName: string): nextState`
Use it for add relation to data reducer. Inject it to `data.<type>` reducer

##### Example
Initial state looks like: 
```js
state = {
  data: {
    posts: {
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
            ],
          },
        },
      },
    },
  }
}
```
Action looks like:
```js
action = {
  type: CREATE_COMMENT.SUCCESS,
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
```

Handler:
```js
const handlers = {
  [CREATE_COMMENT.SUCCESS]: createRelationAddHandler('comments', 'post')
}
```
Resulted state looks like: 
```js
state = {
  data: {
    posts: {
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
                id: 3,
                type: 'comments',
              },
            ],
          },
        },
      },
    },
  }
}
```

#### `createRelationDeleteHandler(relationsName: string): nextState`
Use it for delete relation from data reducer. Inject it to `data.<type>` reducer

##### Example
Initial state looks like: 
```js
state = {
  data: {
    posts: {
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
                id: 3,
                type: 'comments',
              },
            ],
          },
        },
      },
    },
  }
}
```
Action looks like:
```js
action = {
  type: DELETE_COMMENT.SUCCESS,
  payload: {
    deletedId: 3,
    relationId: 1,
  },
}
```

Handler:
```js
const handlers = {
  [DELETE_COMMENT.SUCCESS]: createRelationDeleteHandler('comments')
}
```
Resulted state looks like: 
```js
state = {
  data: {
    posts: {
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
            ],
          },
        },
      },
    },
  }
}
```
