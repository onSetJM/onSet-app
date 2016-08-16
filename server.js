var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root', 
  password : '',
  database: 'onset'
});

var onSetAPI = require('./src/js/api/api')(connection);

app.use(express.static(__dirname + '/public'));


/* insert any app.get or app.post you need here */

/*
This says: for any path NOT served by the middleware above, send the file called index.html instead.
For example, if the client requests http://server/step-2 the server will send the file index.html, which will start the same React app.
This will enable us to do url-based routing on the front-end.
*/
app.get('/*', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/login', function(req, res){
  //get data, do my sql magic send back response res.send
})

app.listen(process.env.PORT || 8080, function() {
  console.log('Server started');
});