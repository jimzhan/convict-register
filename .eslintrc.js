const lodash = require('lodash')
const { config } = require('exnext-scripts')

module.exports = lodash.merge(config.eslint, {
  rules: {

  }
})