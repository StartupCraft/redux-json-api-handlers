import tests from '../tests'

import initialState from './initialState'

export default {
  entity: {
    [tests.entity.addOne.key]: {
      isLoaded: true,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1],
      posts: {
        '1': {
          id: 1,
          relationships: {
            comments: { data: [{ id: 1, type: 'comments' }] },
            user: { data: { id: 1, type: 'users' } },
          },
        },
        '3': { id: 3 },
      },
    },
    [tests.entity.addOneWithoutLoading.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1],
      posts: {
        '1': {
          id: 1,
          relationships: {
            comments: { data: [{ id: 1, type: 'comments' }] },
            user: { data: { id: 1, type: 'users' } },
          },
        },
        '3': { id: 3 },
      },
    },
    [tests.entity.addOneToOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: true,
      isLoadingPostIds: false,
      posts: {
        '1': {
          id: 1,
          relationships: {
            comments: { data: [{ id: 1, type: 'comments' }] },
            user: { data: { id: 1, type: 'users' } },
          },
        },
      },
      postIds: [1, 3],
    },
    [tests.entity.deleteOne.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1],
      posts: {},
    },
    [tests.entity.deleteOneFromOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [],
      posts: {
        '1': {
          id: 1,
          relationships: {
            comments: { data: [{ id: 1, type: 'comments' }] },
            user: { data: { id: 1, type: 'users' } },
          },
        },
      },
    },
    [tests.entity.deleteOneWithoutDeletedId.key]: initialState.posts,
  },
  relations: {
    [tests.relations.addOne.key]: {
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
              {
                id: 3,
                type: 'comments',
              },
            ],
          },
          user: {
            data: {
              id: 1,
              type: 'users',
            },
          },
        },
      },
    },
    [tests.relations.addMany.key]: {
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
                type: 'comments',
              },
              {
                id: 3,
                type: 'comments',
              },
              {
                id: 4,
                type: 'comments',
              },
              {
                id: 5,
                type: 'comments',
              },
            ],
          },
          user: {
            data: {
              id: 1,
              type: 'users',
            },
          },
        },
      },
    },
    [tests.relations.addManyToMany.key]: {
      10: {
        id: '10',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: { data: [{ id: '16', type: 'shiftsJobs' }] },
          jobs: { data: [] },
        },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: { data: [{ id: '17', type: 'shiftsJobs' }] },
          jobs: { data: [] },
        },
      },
    },
    [tests.relations.deleteOne.key]: {
      10: {
        id: '10',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: { data: [] },
          jobs: { data: [] },
        },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: { data: [{ id: '17', type: 'shiftsJobs' }] },
          jobs: { data: [] },
        },
      },
    },
  },
}
