const app = require("../server/app");
const debug = require('debug')('cha:server');
const logger = require("../server/lib/logger");
const http = require("http");
// const WebpackDevServer = require("webpack-dev-server");
// const webpack = require("webpack");
// const webpackConfig = require("../webpack.config");
// const compiler = webpack(webpackConfig);
// app.use(require("webpack-dev-middleware")(compiler, {
//     noInfo: true,
//     hot: true,
//     historyApiFallback: true,
//     publicPath: webpackConfig.output.publicPath
// }));
// app.use(require("webpack-hot-middleware")(compiler, {
//     log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000,
// }));



var port = 3000;
app.set("port", port);

var server = http.createServer(app);
server.listen(port, function () {
    logger.info("start server on port " + port);
});
server.on('error', onError);
server.on('listening', onListening);

import chatSocket from "../server/sockets/chat";
chatSocket(server);


/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      logger.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
