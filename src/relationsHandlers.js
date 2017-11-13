import merge from 'lodash/merge'
import get from 'lodash/get'
import mergeWith from 'lodash/mergeWith'
import reject from 'lodash/reject'

import mergers from './mergers'

const getRelationId = (relationName, value) =>
  get(value, `relationships.${relationName}.data.id`)

const extractRelationsIds = relationName => (relationsIds, current) => {
  const relationId = getRelationId(relationName, current)
  const hasRelId = relationsIds.indexOf(relationId) >= 0
  return hasRelId ? relationsIds : [...relationsIds, relationId]
}

export const createRelationAddHandler = (type, relationName) => (
  state,
  { payload },
) => {
  const dataType = get(payload, `data.${type}`)

  if (!dataType) return state

  const createdRelations = Object.values(dataType)
  const updatedRelativesMap = new Map()

  createdRelations
    .reduce(extractRelationsIds(relationName), []) // collect affected relatives ids
    .forEach(relationId =>
      updatedRelativesMap.set(relationId, state[relationId]),
    ) // collect affected relatives state

  createdRelations.forEach(current => {
    const currentRelationId = getRelationId(relationName, current)
    if (!currentRelationId) return
    const relative = updatedRelativesMap.get(currentRelationId)
    const newRelation = { id: current.id, type }
    const existedRelations = get(relative, `relationships.${type}.data`, {})
    const updatedRelative = {
      ...relative,
      relationships: {
        // Relationships spread omitted since lodash.merge preserves other rel types.
        [type]: {
          data: [...existedRelations, newRelation],
        },
      },
    }
    updatedRelativesMap.set(currentRelationId, updatedRelative) // Override prev value with prev+new
  })

  // Convert Map<RelationId, RelationValue> to Array<Relation>
  const updatedRelatives = []
  // eslint-disable-next-line no-restricted-syntax
  for (const [key, value] of updatedRelativesMap.entries()) {
    if (key && value) {
      updatedRelatives.push({ [key]: value })
    }
  }

  return merge({}, state, ...updatedRelatives)
}

export const createRelationDeleteHandler = relationsName => (
  state,
  { payload },
) => {
  const deletedId = get(payload, 'deletedId')
  const relationId = get(payload, 'relationId')

  if (!deletedId || !relationId) return state

  return mergeWith(
    {},
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
    mergers.latestArrayMerger,
  )
}
