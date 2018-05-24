const model = require('./queries');

var express = require('express');
var app = express();

function listening() {
    console.log('Maintenance API is listening on port 3000!');
}

var server = app.listen(3000, listening);

app.get('/users', model.getAllRequests);

//Update the error handlers in app.js to serve up JSON:

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status( err.code || 500 )
    .json({
      status: 'error',
      message: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  .json({
    status: 'error',
    message: err.message
  });
});
