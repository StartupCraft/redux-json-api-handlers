import tests from '../tests'

export default {
  entity: {
    [tests.entity.addOne.key]: {
      payload: {
        data: {
          posts: {
            3: {
              id: 3,
            },
          },
        },
      },
    },
  },
  relations: {
    [tests.relations.addOne.key]: {
      payload: {
        data: {
          comments: {
            3: {
              id: 3,
              relationships: {
                post: {
                  data: {
                    id: 1,
                    type: 'posts',
                  },
                },
              },
            },
          },
        },
      },
    },
    [tests.relations.addMany.key]: {
      payload: {
        data: {
          comments: {
            4: {
              id: 4,
              relationships: {
                post: {
                  data: {
                    id: 1,
                    type: 'posts',
                  },
                },
              },
            },
            5: {
              id: 5,
              relationships: {
                post: {
                  data: {
                    id: 1,
                    type: 'posts',
                  },
                },
              },
            },
          },
        },
      },
    },
    [tests.relations.addManyToMany.key]: {
      payload: {
        data: {
          shiftsJobs: {
            '16': {
              id: '16',
              attributes: { quantity: 1 },
              relationships: {
                shift: { data: { id: '10', type: 'shifts' } },
                job: { data: { id: '1', type: 'jobs' } },
                employees: { data: [] },
              },
            },
            '17': {
              id: '17',
              attributes: { quantity: 1 },
              relationships: {
                shift: { data: { id: '11', type: 'shifts' } },
                job: { data: { id: '1', type: 'jobs' } },
                employees: { data: [] },
              },
            },
          },
        },
      },
    },
  },
}
