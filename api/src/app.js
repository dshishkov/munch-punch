let path = require('path');
let favicon = require('serve-favicon');
let compress = require('compression');
let helmet = require('helmet');
let cors = require('cors');
let logger = require('./logger');

let feathers = require('@feathersjs/feathers');
let configuration = require('@feathersjs/configuration');
let express = require('@feathersjs/express');
let socketio = require('@feathersjs/socketio');

let middleware = require('./middleware');
let services = require('./services');
let appHooks = require('./app.hooks');
let channels = require('./channels');

let authentication = require('./authentication');

let app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
