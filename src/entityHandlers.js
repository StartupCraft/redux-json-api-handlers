import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import map from 'lodash/map'
import get from 'lodash/get'

export const createLoadHandler = (resourceType, mapToKey, idsOnly) => (
  state,
  { payload },
) =>
  state.merge({
    [mapToKey || resourceType]: merge(
      {},
      state[resourceType],
      idsOnly
        ? map(payload.data[resourceType], 'id')
        : payload.data[resourceType],
    ),
    [`isLoaded${mapToKey || ''}`]: true,
    [`isLoading${mapToKey || ''}`]: false,
  })

export const createDeleteHandler = (state, action, collectionName) => {
  const deletedId = get(action, 'payload.deletedId')
  return reduce(
    state[collectionName],
    (result, value, key) => {
      if (value.id !== deletedId) {
        return { ...result, [key]: value }
      }
      return { ...result }
    },
    {},
  )
}
