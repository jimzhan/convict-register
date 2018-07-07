const requireContext = require('require-context')

const pattern = /^((?!index).)+(\.js)$/

/**
 * Register all commonjs module (`index.js` excluded) under the given path.
 *
 * @param {string} abspath absolute path for module's registration.
 * @param {*} recursive whether to find all the modules recursively.
 * @param {*} modules consolidated modules containers.
 */
const register = (abspath, recursive = false, modules = {}) => {
  const context = requireContext(abspath, recursive, pattern)
  context.keys().forEach((filename) => {
    const name = filename.replace(/(\.\/|\.js)/g, '')
    const module = context(filename)
    modules[name] = module.default || module // eslint-disable-line no-param-reassign
  })
  return modules
}

module.exports = register
