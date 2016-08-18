/*global localStorage */
var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

import AuthService from './utils/AuthService';

var App = require("./components/App");
var Home = require("./components/Home");
var Createareview = require("./components/Createareview");
var Createartistprofile = require("./components/Createartistprofile");
var Profile = require("./components/Profile");
var Login = require("./components/Login");
var Logout = require("./components/Logout");
var Header = require("./components/Header");
var Footer = require("./components/Footer");

var SearchBar = require("./components/SearchBar");
var SearchResults = require("./components/SearchResults");
var Reviews = require("./components/Reviews");

var auth = new AuthService('pQZynj9aeB6FgPoKihk7HluGGlLYwqWR', 'onset.auth0.com');

var requireAuth = function(nextState, replace) {
    if (!auth.loggedIn()) {
        localStorage.setItem('last_url', window.location.pathname);
        replace({ pathname: '/login' + window.location.hash})
    }
}

var routes = (
    <Router history={ReactRouter.browserHistory}> 
        <Route path="/" component={App} auth={auth}>
            <IndexRoute component={Home} onEnter={requireAuth}/>
            <Route component={Header} />
            <Route component={Footer} />
            <Route path="login" component={Login} />
            <Route path="logout" component={Logout} />
            <Route component={SearchBar}></Route>
            
            <Route path="search" component={SearchResults}></Route>
            <Route path="createareview" component={Createareview} onEnter={requireAuth} ></Route>
            <Route path="createartistprofile" component={Createartistprofile}></Route>
            <Route path="profile" component={Profile}></Route>
            <Route path="reviews" component={Reviews}></Route>
        </Route>
    </Router>
);

module.exports = routes;