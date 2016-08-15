var React = require('react');
var ReactDOM = require('react-dom');

var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'JM_MM', 
  password : '',
  database: 'onset'
});

var routes = require("./routes");

ReactDOM.render(routes, document.getElementById('app'));