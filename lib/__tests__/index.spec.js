const settings = require('../settings')

describe('convict settings', () => {
  it('fetch settings from top level registry', () => {
    expect(settings.get('port')).toBe(9394)
  })

  it('fetch settings from dynamic registry', () => {
    expect(settings.get('db.username')).toBe('dbuser')
  })
})
