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
        relationships: { shiftsJobs: { data: [] }, jobs: { data: [] } },
      },
      11: {
        id: '11',
        attributes: {
          name: 'A shift',
        },
        relationships: { shiftsJobs: { data: [] }, jobs: { data: [] } },
      },
    },
  },
  posts: {
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
    postIds: [1],
    isLoading: false,
    isLoaded: false,
    isLoadedPostIds: false,
    isLoadingPostIds: false,
  },
})
