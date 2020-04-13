let {
  AuthenticationService,
  JWTStrategy,
} = require('@feathersjs/authentication')
let { LocalStrategy } = require('@feathersjs/authentication-local')
let { expressOauth } = require('@feathersjs/authentication-oauth')

module.exports = (app) => {
  let authentication = new AuthenticationService(app)

  authentication.register('jwt', new JWTStrategy())
  authentication.register('local', new LocalStrategy())

  app.use('/authentication', authentication)
  app.configure(expressOauth())
}
