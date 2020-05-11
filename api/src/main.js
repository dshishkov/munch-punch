/* eslint-disable no-console */
import logger from './logger'
import app from './app'

let port = app.get('port')
let server = app.listen(port)

logger.info(`API port is ${port}`)

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
)

server.on('listening', () =>
  logger.info(
    'Feathers application started on http://%s:%d',
    app.get('host'),
    port
  )
)
