const path = require('path')
const globby = require('globby')
const convict = require('convict')
const callsite = require('callsite')


class Settings {
  constructor(values = {}) {
    this.root = path.dirname(
      callsite()[1].getFileName()
    )
    this.values = values
    this.convict = null
  }

  /**
   * ------------------------------------------------------------------------------------------
   * Import all javascript settings modules from the given path. Files excluded:
   *  - index.js
   *  - *.spec.js
   *  - *.test.js
   * ------------------------------------------------------------------------------------------
   * @param {string} basedir path to folder contains settings modules.
   * @param {object} modules consolidated modules containers.
   * @return {Map} structuracl settings values for `convict`.
   */
  bootstrap() {
    if (this.convict) return // bootstrap should be lazy :-)
    globby.sync([
      // Available settings modules.
      `${this.root}/*.js`,
      `!${this.root}/index.js`,
      `!${this.root}/*.spec.js`,
      `!${this.root}/*.test.js`,
    ]).forEach(abspath => {
      const module = require(abspath)
      const filename = path.basename(abspath)
      const namespace = filename.replace(/(\.\/|\.js)/g, '')
      this.values[namespace] = module.default || module
    })
    this.convict = convict(this.values)
    this.convict.validate({ allowed: 'strict' })
  }

  get(key) {
    this.bootstrap()
    return this.convict.get(key)
  }
}

module.exports = Settings