import tests from '../tests'

export default {
  entity: {
    addOne: {
      payload: {
        data: {
          posts: {
            1: {
              id: 1,
            },
          },
        },
      },
    },
    addOneWithReplace: {
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
    addMultiple: {
      payload: {
        data: {
          posts: {
            1: {
              id: 1,
            },
            3: {
              id: 3,
            },
            5: {
              id: 5,
            },
          },
        },
      },
    },
    deleteOne: {
      payload: {
        deletedId: 3,
      },
    },
    deleteOneWithoutDeletedId: {
      payload: {},
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
    [tests.relations.deleteOne.key]: {
      payload: {
        deletedId: '16',
        relationId: '10',
      },
    },
  },
}
