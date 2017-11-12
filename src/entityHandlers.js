// @flow
import without from 'lodash/without'
import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'
import merge from 'lodash/merge'
import map from 'lodash/map'
import get from 'lodash/get'

import { capitalizeFirstLetter } from './helpers'

const defaultLoadOptions = {
  mapToKey: false,
  withLoading: true,
  idsOnly: false,
}

type LoadOptionsType = {
  mapToKey?: string | boolean,
  withLoading?: boolean,
  idsOnly?: boolean,
}

export const createLoadHandler = (
  resourceType: string,
  options: LoadOptionsType,
) => (state: any, { payload }: { payload: any }) => {
  const { mapToKey, withLoading, idsOnly } = {
    ...defaultLoadOptions,
    ...options,
  }

  const payloadResource = get(payload, `data.${resourceType}`, false)

  const mappedResourceType = mapToKey || resourceType

  // $FlowFixMe
  const nextState = {
    [mappedResourceType]: idsOnly
      ? [...state[mappedResourceType], ...map(payloadResource, 'id')]
      : merge({}, state[mappedResourceType], payloadResource),
  }

  if (withLoading) {
    const addKey = mapToKey ? capitalizeFirstLetter(mapToKey) : ''
    nextState[`isLoaded${addKey}`] = true
    nextState[`isLoading${addKey}`] = false
  }

  return state.merge(nextState)
}

export const createDeleteHandler = (stateKey: string) => (
  state: any,
  { payload }: { payload: any },
) => {
  const deletedId = get(payload, 'deletedId')

  const stateValue = state[stateKey]

  return state.merge({
    [stateKey]: isArray(stateValue)
      ? without(stateValue, deletedId)
      : reduce(
          stateValue,
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
