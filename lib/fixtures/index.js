const register = require('../index.legacy')

const settings = register(__dirname, false, {
  env: {
    doc: 'Deployment environment',
    format: String,
    default: 'development',
    env: 'NODE_ENV',
  },
  host: {
    format: String,
    default: '0.0.0.0',
    env: 'HOST',
  },
  port: {
    format: 'port',
    default: 9394,
    env: 'PORT',
  },
  keys: {
    doc: 'Application secret keys',
    format: Array,
    default: [],
    env: 'SECRET',
  },
})

module.exports = settings
