// @flow
import difference from 'lodash/difference'
import isArray from 'lodash/isArray'
import values from 'lodash/values'
import uniq from 'lodash/uniq'
import map from 'lodash/map'
import get from 'lodash/get'
import set from 'lodash/set'

import {
  capitalizeFirstLetter,
  nullifyIfIncludes,
  keepSortByKey,
} from './helpers'

const defaultLoadOptions = {
  mapToKey: false,
  withLoading: true,
  singular: false,
  withReplace: false,
  addToState: {},
  keepSorting: false,
}

type LoadOptionsType = {
  mapToKey?: string | boolean,
  withLoading?: boolean,
  singular?: boolean,
  withReplace: boolean,
  addToState: Object, // TODO: add tests
  keepSorting: boolean, // TODO: add tests
}

const defaultDeleteOptions = {
  addToState: {},
}

type DeleteOptionsType = {
  addToState: Object,
}

export const createLoadHandler = (
  resourceType: string,
  options: LoadOptionsType,
) => (state: any, { payload, meta }: { payload: any, meta: any }) => {
  const {
    mapToKey,
    withLoading,
    singular,
    withReplace,
    addToState,
    keepSorting,
  } = {
    ...defaultLoadOptions,
    ...options,
  }

  const data = get(payload, `data.${resourceType}`, false)

  const payloadResource =
    keepSorting && !singular ? keepSortByKey(meta, data, 'id') : data

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
export const createDeleteHandler = (
  stateKey: string,
  options: DeleteOptionsType,
) => (state: any, { payload }: { payload: any }) => {
  const { addToState } = {
    ...defaultDeleteOptions,
    ...options,
  }
  const deletedIds = get(payload, 'deletedIds') || [get(payload, 'deletedId')]

  const stateValue = state[stateKey]

  return state.merge({
    [stateKey]: isArray(stateValue)
      ? difference(stateValue, deletedIds)
      : nullifyIfIncludes(deletedIds, stateValue),
    ...addToState,
  })
}
