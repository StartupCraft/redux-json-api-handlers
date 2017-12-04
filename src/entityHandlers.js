// @flow
import without from 'lodash/without'
import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'
import values from 'lodash/values'
import uniq from 'lodash/uniq'
import map from 'lodash/map'
import get from 'lodash/get'
import set from 'lodash/set'

import { capitalizeFirstLetter } from './helpers'

const defaultLoadOptions = {
  mapToKey: false,
  withLoading: true,
  singular: false,
  withReplace: false,
}

type LoadOptionsType = {
  mapToKey?: string | boolean,
  withLoading?: boolean,
  singular?: boolean,
  withReplace: boolean,
}

export const createLoadHandler = (
  resourceType: string,
  options: LoadOptionsType,
) => (state: any, { payload }: { payload: any }) => {
  const { mapToKey, withLoading, singular, withReplace } = {
    ...defaultLoadOptions,
    ...options,
  }

  const payloadResource = get(payload, `data.${resourceType}`, false)

  const mappedResourceType = mapToKey || resourceType

  // $FlowFixMe
  const nextState = {
    [mappedResourceType]: state[mappedResourceType],
  }

  if (singular) {
    set(nextState, mappedResourceType, get(values(payloadResource), '0.id'))
  } else {
    set(
      nextState,
      mappedResourceType,
      withReplace
        ? map(payloadResource, 'id')
        : uniq([
            ...get(state, mappedResourceType, []),
            ...map(payloadResource, 'id'),
          ]),
    )
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
