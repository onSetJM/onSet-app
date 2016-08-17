var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var App = require("./components/App");
var Auth = require("./components/Auth");
var Home = require("./components/Home");
var Loggedin = require("./components/Loggedin");
var Createareview = require("./components/Createareview");
var Createartistprofile = require("./components/Createartistprofile");
var Profile = require("./components/Profile");
var Search = require("./components/Search");


var routes = (
    <Router history={ReactRouter.browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="loggedin" component={Loggedin}></Route>
            <Route path="createareview" component={Createareview}></Route>
            <Route path="createartistprofile" component={Createartistprofile}></Route>
<<<<<<< HEAD
            <Route path="searh" component={Search} />
=======
            <Route path="profile" component={Profile}></Route>
>>>>>>> 3f96f930248c3ab78a58fc9aab4004126ea2b18e
        </Route>
    </Router>
);

module.exports = routes;