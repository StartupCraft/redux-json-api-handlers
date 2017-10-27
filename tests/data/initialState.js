import Immutable from 'seamless-immutable'

export default Immutable({
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
            id: 2,
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
})
