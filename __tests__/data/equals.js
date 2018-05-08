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
      postIds: [1, 2, 3],
      posts: [3, 4, 5],
      post: 1,
    },
    [tests.entity.addOneWithoutLoading.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
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
      postIds: [1, 2, 3],
      posts: [3, 4, 5],
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
      postIds: [1, 2, 3],
      posts: [3, 4, 5],
      post: 3,
    },
    // MULTIPLE
    [tests.entity.addMultiple.key]: {
      isLoaded: true,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [3, 4, 5, 1],
      post: 1,
    },
    [tests.entity.addMultipleWithReplace.key]: {
      isLoaded: true,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [1, 5],
      post: 1,
    },
    [tests.entity.addMultipleWithoutLoading.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [3, 4, 5, 1],
      post: 1,
    },
    [tests.entity.addMultipleToOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: true,
      isLoadingPostIds: false,
      postIds: [1, 2, 3, 5],
      posts: [3, 4, 5],
      post: 1,
    },
    // DELETE
    [tests.entity.deleteOne.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [4, 5],
      post: 1,
    },
    [tests.entity.deleteOneFromOtherKey.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2],
      posts: [3, 4, 5],
      post: 1,
    },
    [tests.entity.deleteOneWithoutDeletedId.key]: initialState.posts,
    [tests.entity.deleteMany.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [5],
      post: 1,
    },
    [tests.entity.deleteOneFromSingular.key]: {
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [3, 4, 5],
      post: null,
    },
    [tests.entity.deleteOneWithAdditional.key]: {
      isDeleted: true,
      isLoaded: false,
      isLoading: false,
      isLoadedPostIds: false,
      isLoadingPostIds: false,
      postIds: [1, 2, 3],
      posts: [4, 5],
      post: 1,
    },
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
          shiftsJobs: {
            data: [
              { id: '1', type: 'shiftsJobs' },
              { id: '16', type: 'shiftsJobs' },
            ],
          },
          jobs: { data: [] },
          employees: {
            data: [
              { id: '2', type: 'employees' },
              { id: '5', type: 'employees' },
            ],
          },
        },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: {
            data: [
              { id: '2', type: 'shiftsJobs' },
              { id: '17', type: 'shiftsJobs' },
            ],
          },
          jobs: { data: [] },
        },
      },
    },
    [tests.relations.addToArray.key]: {
      10: {
        id: '10',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: {
            data: [
              { id: '1', type: 'shiftsJobs' },
              { id: '16', type: 'shiftsJobs' },
            ],
          },
          jobs: { data: [] },
          employees: {
            data: [
              { id: '2', type: 'employees' },
              { id: '5', type: 'employees' },
              { id: '4', type: 'employees' },
            ],
          },
        },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: {
            data: [
              { id: '2', type: 'shiftsJobs' },
              { id: '17', type: 'shiftsJobs' },
            ],
          },
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
          shiftsJobs: {
            data: [{ id: '1', type: 'shiftsJobs' }],
          },
          jobs: { data: [] },
          employees: {
            data: [
              { id: '2', type: 'employees' },
              { id: '5', type: 'employees' },
              { id: '4', type: 'employees' },
            ],
          },
        },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: {
          shiftsJobs: {
            data: [
              { id: '2', type: 'shiftsJobs' },
              { id: '17', type: 'shiftsJobs' },
            ],
          },
          jobs: { data: [] },
        },
      },
    },
  },
}
