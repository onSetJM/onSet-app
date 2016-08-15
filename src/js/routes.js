var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/App");

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
        
        </Route>
    </Router>
);

module.exports = routes;