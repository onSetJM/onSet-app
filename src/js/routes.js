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
var Createprofile = require("./components/Createprofile");
var Profile = require("./components/Profile");
var Login = require("./components/Login");
var Logout = require("./components/Logout");
var FAQ = require("./components/FAQ");
var ContactUs = require("./components/ContactUs");
var Careers = require("./components/Careers");

var SearchBar = require("./components/SearchBar");
var SearchResults = require("./components/SearchResults");
var SearchForm = require("./components/SearchForm");

var Email = require("./components/Email");

var Reviews = require("./components/Reviews");
var Gallery = require("./components/Gallery");

var auth = new AuthService('pQZynj9aeB6FgPoKihk7HluGGlLYwqWR', 'onset.auth0.com');

var requireAuth = function(nextState, replace, next) {
    if (!auth.loggedIn()) {
        localStorage.setItem('last_url', window.location.pathname);
        replace({ pathname: '/' + window.location.hash})
    }
    
    next();
}


var routes = (
    <Router history={ReactRouter.browserHistory}> 
        <Route path="/" component={App} auth={auth}>
            <IndexRoute component={Home}/>

            <Route path="faq" component={FAQ} />

            <Route path="createprofile" component={Createprofile} onEnter={requireAuth}></Route>
            

            <Route path="search/:category" component={SearchForm}>
                <Route path="searchresults" component={SearchResults} />
            </Route>
            <Route path="profile/:username" component={Profile}>
                <Route path="email" component={Email}> </Route>
            </Route>
            <Route path="profile/:username/reviews" component={Reviews}> </Route>
            <Route path="profile/:username/createareview" component={Createareview} onEnter={requireAuth}> </Route>
            
            <Route path="photos" component={Gallery}></Route>
            <Route path="contactus" component={ContactUs}></Route>
            <Route path="careers" component={Careers}></Route>
        </Route>
    </Router>
);

module.exports = routes;