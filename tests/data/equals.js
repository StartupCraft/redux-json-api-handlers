import tests from '../tests'

import initialState from './initialState'

export default {
  entity: {
    // ADD ONE
    [tests.entity.addOne.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      isLoadedPost: true,
      isLoadingPost: false,
      postIds: [3],
      posts: [3],
      post: 1,
    },
    [tests.entity.addOneWithoutLoading.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [3],
      posts: 1,
      post: 1,
    },
    [tests.entity.addOneToOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      isLoadedPostId: true,
      isLoadingPostId: false,
      postIds: [3],
      posts: [3],
      post: 1,
      postId: 1,
    },
    [tests.entity.addOneWithReplace.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      isLoadedPost: true,
      isLoadingPost: false,
      postIds: [3],
      posts: [3],
      post: 3,
    },
    // MULTIPLE
    [tests.entity.addMultiple.key]: {
      isLoaded: true,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [3],
      posts: [3, 1, 5],
      post: 1,
    },
    [tests.entity.addMultipleWithReplace.key]: {
      isLoaded: true,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [3],
      posts: [1, 5],
      post: 1,
    },
    [tests.entity.addMultipleWithoutLoading.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [3],
      posts: [3, 1, 5],
      post: 1,
    },
    [tests.entity.addMultipleToOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: true,
      isLoadingPostIds: false,
      postIds: [3, 1, 5],
      posts: [3],
      post: 1,
    },
    // DELETE
    [tests.entity.deleteOne.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [3],
      posts: [],
      post: 1,
    },
    [tests.entity.deleteOneFromOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [],
      posts: [3],
      post: 1,
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
