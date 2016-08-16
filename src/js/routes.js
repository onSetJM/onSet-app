var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var App = require("./components/App");
var Auth = require("./components/Auth");
var Home = require("./components/Home");
var Loggedin = require("./components/Loggedin");

import Foundation from 'react-foundation';

var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <Route path="auth" component={Auth}></Route>
            <Route path="home" component={Home}></Route>
            <Route path="loggedin" component={Loggedin}></Route>
        </Route>
    </Router>
);

module.exports = routes;