# redux-json-api-handlers

Redux JSON-API handlers V2. New api

## Api methods

### `createLoadHandler(resourceType: string, options: object): nextState`
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

#### Simple example
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

#### Custom example
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


### `createDeleteHandler(stateKey: string): nextState`
Use it for handle delete data.

Action payload should have `deletedId` param

#### Simple example
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
```
Resulted state looks like: 
```js
state = {
  posts: {
    posts: [2]
  }
}
```

#### Custom example
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
  [DELETE_POST.SUCCESS]: createDeleteHandler('posts', {
    mapToKey: 'postIds',
  })
}
```
Resulted state looks like: 
```js
state = {
  posts: {
    postIds: [1]
  }
}
```
