import map from 'lodash/map'
import sortBy from 'lodash/sortBy'
import indexOf from 'lodash/indexOf'

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const nullifyIfIncludes = (ids, value) =>
  indexOf(ids, value) !== -1 ? null : value

export const getFirstEntity = entities => {
  const entityId = Object.keys(entities)[0]
  return entities[entityId]
}

export const keepSortByKey = (meta, data, key) => {
  const endpoint = getFirstEntity(meta)
  const idsOrder = map(endpoint.data, key)
  return sortBy(data, item => idsOrder.indexOf(item.id))
}
