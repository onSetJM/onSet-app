var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/App");
var Signup = require("./components/Signup");
var Home = require("./components/Home");

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <Route path="signup" component={Signup}></Route>
            <Route path="home" component={Home}></Route>
        </Route>
    </Router>
);

module.exports = routes;