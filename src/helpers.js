import indexOf from 'lodash/indexOf'

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1)

export const nullifyIfIncludes = (ids, value) =>
  indexOf(ids, value) !== -1 ? null : value
