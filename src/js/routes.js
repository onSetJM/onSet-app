var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/App");
var Home = require("./components/Home");
var Loggedin = require("./components/Loggedin");
var Createareview = require("./components/Createareview");
var Createartistprofile = require("./components/Createartistprofile");
var Profile = require("./components/Profile");

var SearchBar = require("./components/SearchBar");
var SearchResults = require("./components/SearchResults");
var Header = require("./components/Header");
var Footer = require("./components/Footer");
var Email = require("./components/Email");
var Reviews = require("./components/Reviews");



var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route component={SearchBar}></Route>
            <Route path="loggedin" component={Loggedin}></Route>
            <Route path="createareview" component={Createareview}></Route>
            <Route path="createartistprofile" component={Createartistprofile}></Route>
            <Route path="search" component={SearchResults}></Route>
            <Route path="profile" component={Profile}></Route>
            <Route path="profile/email/:username" component={Email}> </Route>
            <Route path="reviews" component={Reviews}></Route>
        </Route>
    </Router>
);

module.exports = routes;