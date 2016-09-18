"use strict";

/**
 * Module dependencies.
 */
var http = require('http')
  , path = require('path')
  , express = require('express')
  , routes = require(path.join(process.cwd(), 'routes', 'index.js'))
  , app = express()
;

var options = {
  host: 'localhost',
  port: 2323
};

//check if server is already running
http.get(options, function(res) {
  console.log('server is running, redirecting to localhost');
  if (window.location.href.indexOf('localhost') < 0) { 
    window.location = 'http://localhost:' + app.get('port');
  }
}).on('error', function(e) {
  //server is not yet running

  // all environments
  app.set('port', process.env.PORT || 2323);
  app.set('views', process.cwd() + '/views');
  app.set('view engine', 'jade');
  app.locals.pretty = true;
  app.use(require('stylus').middleware(path.join(process.cwd(), 'public')));
  app.use(express.static(path.join(process.cwd(), 'public')));

  app.get('/', routes.index);
  app.get('/test', routes.test);
  app.get('/logs', routes.logs);
  app.get('/getData', routes.getData);
  app.get('/savelog', routes.savelog);

  http.createServer(app).listen(app.get('port'), function(err){
    console.log('server created');
    if (window.location.href.indexOf('localhost') < 0) { 
      window.location = 'http://localhost:' + app.get('port');
    }
  });
});
