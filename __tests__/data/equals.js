import tests from '../tests'

import initialState from './initialState'

const initialPosts = {
  post: 1,
  posts: [5, 3, 4],
  postIds: [1, 2, 3],
  isLoading: false,
  isLoaded: false,
  isLoadedPostIds: false,
  isLoadingPostIds: false,
  sorting: [],
}

export default {
  entity: {
    // ADD ONE
    [tests.entity.addOne.key]: {
      ...initialPosts,
      isLoadedPost: true,
      isLoadingPost: false,
    },
    [tests.entity.addOneWithoutLoading.key]: {
      ...initialPosts,
      posts: 1,
    },
    [tests.entity.addOneToOtherKey.key]: {
      ...initialPosts,
      isLoadedPostId: true,
      isLoadingPostId: false,
      postId: 1,
    },
    [tests.entity.addOneWithReplace.key]: {
      ...initialPosts,
      isLoadedPost: true,
      isLoadingPost: false,
      post: 3,
    },
    // MULTIPLE
    [tests.entity.addMultiple.key]: {
      ...initialPosts,
      posts: [5, 3, 4, 1],
      isLoaded: true,
    },
    [tests.entity.addMultipleWithReplace.key]: {
      ...initialPosts,
      posts: [1, 5],
      isLoaded: true,
    },
    [tests.entity.addMultipleWithoutLoading.key]: {
      ...initialPosts,
      posts: [5, 3, 4, 1],
    },
    [tests.entity.addMultipleToOtherKey.key]: {
      ...initialPosts,
      postIds: [1, 2, 3, 5],
      isLoadedPostIds: true,
    },
    // DELETE
    [tests.entity.deleteOne.key]: {
      ...initialPosts,
      posts: [5, 4],
    },
    [tests.entity.deleteOneFromOtherKey.key]: {
      ...initialPosts,
      postIds: [1, 2],
    },
    [tests.entity.deleteOneWithoutDeletedId.key]: initialState.posts,
    [tests.entity.deleteMany.key]: {
      ...initialPosts,
      posts: [5],
    },
    [tests.entity.deleteOneFromSingular.key]: {
      ...initialPosts,
      post: null,
    },
    [tests.entity.deleteOneWithAdditional.key]: {
      ...initialPosts,
      posts: [5, 4],
      isDeleted: true,
    },
    // SORTING
    [tests.entity.keepSorting.key]: {
      ...initialPosts,
      isLoaded: true,
      sorting: [5, 1, 3],
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
