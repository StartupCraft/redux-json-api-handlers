import build from 'redux-object'
import { createSelector } from 'reselect'

import map from 'lodash/map'
import isArray from 'lodash/isArray'
import isEmpty from 'lodash/isEmpty'

import { capitalizeFirstLetter } from './helpers'

export const denormalize = (entities, type, id) =>
  build(entities, type, isArray(id) ? map(id, i => i.id || i) : id, {
    eager: true,
  })

export const getEntities = (
  getState,
  getData,
  { type, field, singular = false },
) =>
  createSelector(getState, getData, (state, data) => {
    const entity = field || type

    const addKey = !field || field === type ? '' : capitalizeFirstLetter(field)

    const all = {
      isLoading: state[`isLoading${addKey}`],
      isLoaded: state[`isLoaded${addKey}`],
    }

    const ids = state[entity]

    const entityKey = singular ? 'entity' : 'entities'

    if (!isEmpty(ids)) {
      all[entityKey] = denormalize(data, type, ids)
    } else {
      all[entityKey] = singular ? {} : []
    }

    return all
  })
