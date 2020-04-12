// Initializes the `user` service on path `/user`
let { User } = require('./user.class');
let hooks = require('./user.hooks');

module.exports = function (app) {
  let options = {
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/user', new User(options, app));

  // Get our initialized service so that we can register hooks
  let service = app.service('user');

  service.hooks(hooks);
};
