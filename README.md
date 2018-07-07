# convict-register

Registration helper for [node-convict](https://github.com/mozilla/node-convict), a featureful configuration management library for Node.js

[![build](https://travis-ci.org/jimzhan/convict-register.svg?branch=master)](https://travis-ci.org/jimzhan/convict-register)
[![JavaScript Style Guide](https://camo.githubusercontent.com/387caee7992b38dcac6cb23f87abf0ba139d7101/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f636f64652532307374796c652d616972626e622d626c75652e737667)](https://github.com/airbnb/javascript)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Standard Version](https://img.shields.io/badge/release-standard%20version-brightgreen.svg)](https://github.com/conventional-changelog/standard-version)

`convict-register` expands the `convict` further by automatically registering all of the modules under the given folder, so that we can easily create a modular settings structures by splitting domain settings via files for large scale application.


## Install

```shell
npm install convict
```

## Usage

An sample structure of settings folder.

```
- settings/
  db.js
  redis.js
  index.js
```

Sample in `settings/db.js`.

```javascript
module.exports = {
  username: {
    format: String,
    default: 'dbuser',
    env: 'DB_USER',
  },
}
```

Sample in `settings/index.js`.

```javascript
const register = require('convict-register')

/*
  Arguments
    - abspath: absolute path to the folder with settings modules.
    - recursive: whether to recursively find all settings modules.
    - settings: top level settings values.
*/
module.exports = register(__dirname, false, {
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
```

Using settings elsewhere (e.g. `main.js`):

```javascript
const settings = require('./settings')

console.log(settings.get('port'))           // 9394
console.log(settings.get('db.username'))    // dbuser

```

The `settings` object is essentially a `convict` object, meaning that you have still have full capacity of [convict](https://github.com/mozilla/node-convict).

