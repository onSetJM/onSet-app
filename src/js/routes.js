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



var SearchBar = require("./components/SearchBar");
var SearchResults = require("./components/SearchResults");

var Email = require("./components/Email");

var Reviews = require("./components/Reviews");
var Gallery = require("./components/Gallery");

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
            <IndexRoute component={Home}/>
            <Route path="search" component={SearchResults}></Route>
            <Route path="profile/:username" component={Profile}></Route>
            <Route path="createareview" component={Createareview} onEnter={requireAuth} ></Route>
            <Route path="createartistprofile" component={Createartistprofile} onEnter={requireAuth}></Route>
            <Route path="profile" component={Profile}></Route>
            <Route path="profile/email/:username" component={Email}> </Route>
            <Route path="reviews" component={Reviews}></Route>
            <Route path="profile/photos" component={Gallery}></Route>
        </Route>
    </Router>
);

module.exports = routes;