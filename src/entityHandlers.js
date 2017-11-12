import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import map from 'lodash/map'
import get from 'lodash/get'

import { capitalizeFirstLetter } from './helpers'

const defaultOptions = {
  mapToKey: false,
  withLoading: true,
  idsOnly: false,
}

export const createLoadHandler = (resourceType, options) => (
  state,
  { payload },
) => {
  const { mapToKey, withLoading, idsOnly } = { ...defaultOptions, ...options }

  const nextState = {
    [mapToKey || resourceType]: merge(
      {},
      state[resourceType],
      idsOnly
        ? map(payload.data[resourceType], 'id')
        : payload.data[resourceType],
    ),
  }

  if (withLoading) {
    const add = mapToKey ? capitalizeFirstLetter(mapToKey) : ''
    nextState[`isLoaded${add}`] = true
    nextState[`isLoading${add}`] = false
  }

  return state.merge(nextState)
}

export const createDeleteHandler = (resourceType, options) => (
  state,
  { payload },
) => {
  const { mapToKey } = { ...defaultOptions, ...options }
  const deletedId = get(payload, 'deletedId')

  return state.merge({
    [mapToKey || resourceType]: reduce(
      state[resourceType],
      (result, value, key) => {
        if (value.id !== deletedId) {
          return { ...result, [key]: value }
        }
        return { ...result }
      },
      {},
    ),
  })
}
