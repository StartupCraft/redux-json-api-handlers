import tests from '../tests'

export default {
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
  },
}
