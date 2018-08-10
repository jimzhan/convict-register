const convict = require('convict')
const requireContext = require('require-context')

const pattern = /^((?!index).)+(\.js)$/

/**
 * Register all commonjs module (`index.js` excluded) under the given path.
 *
 * @param {string} abspath absolute path to folder contains settings modules.
 * @param {boolean} recursive whether to find all the modules recursively.
 * @param {object} modules consolidated modules containers.
 */
module.exports = (abspath, recursive = false, values = {}) => {
  const context = requireContext(abspath, recursive, pattern)
  context.keys().forEach((filename) => {
    const name = filename.replace(/(\.\/|\.js)/g, '')
    const module = context(filename)
    values[name] = module.default || module // eslint-disable-line no-param-reassign
  })
  const settings = convict(values)
  settings.validate({ allowed: 'strict' })
  return settings
}
