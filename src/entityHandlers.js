// @flow
import difference from 'lodash/difference'
import isArray from 'lodash/isArray'
import values from 'lodash/values'
import uniq from 'lodash/uniq'
import map from 'lodash/map'
import get from 'lodash/get'
import set from 'lodash/set'

import { capitalizeFirstLetter, nullifyIfIncludes } from './helpers'

const defaultLoadOptions = {
  mapToKey: false,
  withLoading: true,
  singular: false,
  withReplace: false,
  addToState: {},
}

type LoadOptionsType = {
  mapToKey?: string | boolean,
  withLoading?: boolean,
  singular?: boolean,
  withReplace: boolean,
  addToState: Object, // TODO: add tests
}

export const createLoadHandler = (
  resourceType: string,
  options: LoadOptionsType,
) => (state: any, { payload }: { payload: any }) => {
  const { mapToKey, withLoading, singular, withReplace, addToState } = {
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

  return state.merge({ ...nextState, ...addToState })
}

// TODO: add coverage for lines 86, 87, 89
export const createDeleteHandler = (stateKey: string) => (
  state: any,
  { payload }: { payload: any },
) => {
  const deletedIds = get(payload, 'deletedIds') || [get(payload, 'deletedId')]

  const stateValue = state[stateKey]

  return state.merge({
    [stateKey]: isArray(stateValue)
      ? difference(stateValue, deletedIds)
      : nullifyIfIncludes(deletedIds, stateValue),
  })
}
