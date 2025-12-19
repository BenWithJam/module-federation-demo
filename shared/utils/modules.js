const { createLoaders } = require('./remoteLoader')

const modules = {
  app1: {
    port: 3001,
    name: 'app1',
    path: '/js/app1',
  },

  app2: {
    port: 3002,
    name: 'app2',
    path: '/js/app2',
    ...createLoaders('app2'),
  }
}

module.exports = { modules }
