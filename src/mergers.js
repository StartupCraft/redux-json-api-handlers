import isArray from 'lodash/isArray'

export default {
  latestArrayMerger: (objValue, srcValue) =>
    isArray(objValue) ? srcValue : undefined,
}
