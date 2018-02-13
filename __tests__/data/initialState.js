import Immutable from 'seamless-immutable'

export default Immutable({
  data: {
    posts: {
      1: {
        id: 1,
        relationships: {
          comments: {
            data: [
              {
                id: 1,
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
    shifts: {
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
          shiftsJobs: { data: [{ id: '2', type: 'shiftsJobs' }] },
          jobs: { data: [] },
        },
      },
    },
  },
  posts: {
    post: 1,
    posts: [3, 4, 5],
    postIds: [1, 2, 3],
    isLoading: false,
    isLoaded: false,
    isLoadedPostIds: false,
    isLoadingPostIds: false,
  },
})
