import merge from 'lodash/merge'
import mergeWith from 'lodash/mergeWith'
import get from 'lodash/get'
import reject from 'lodash/reject'
import isArray from 'lodash/isArray'
import omit from 'lodash/omit'

export const createLoadSuccessHandler = resourceType => (state, { payload }) =>
  state.merge({
    [resourceType]: merge({}, state[resourceType], payload.data[resourceType]),
    isLoaded: true,
    isLoading: false,
  })

export const createDeleteHandler = resourceType => (state, { payload }) =>
  omit(state[resourceType], { value: payload.deletedId })

export const mergeCustomizer = (objValue, srcValue) =>
  isArray(objValue) ? srcValue : undefined

export const createRelationAddHandler = (type, relationName) => (
  state,
  { payload },
) => {
  const itemIds = Object.keys(payload.data[type])

  let relationId = null

  const newRelationships = itemIds.map(itemId => {
    const item = payload.data[type][itemId]
    relationId = get(item, `relationships.${relationName}.data.id`)
    return { id: item.id, type }
  })

  if (!relationId) return state

  const currentData = state[relationId].relationships[type].data

  return merge({}, state, {
    [relationId]: {
      relationships: {
        [type]: {
          data: [...currentData, ...newRelationships],
        },
      },
    },
  })
}

export const createRelationDeleteHandler = relationsName => (
  state,
  { payload },
) => {
  const deletedId = get(payload, 'deletedId')
  const relationId = get(payload, 'relationId')

  if (!deletedId || !relationId) return state

  return mergeWith(
    state,
    {
      [relationId]: {
        relationships: {
          [relationsName]: {
            data: reject(state[relationId].relationships[relationsName].data, {
              id: deletedId,
            }),
          },
        },
      },
    },
    mergeCustomizer,
  )
}

export const getFirstEntity = entities => {
  const entityId = Object.keys(entities)[0]
  return entities[entityId]
}
