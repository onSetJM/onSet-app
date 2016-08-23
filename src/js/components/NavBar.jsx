var React = require('react');
var Login = require("./Login");
var Logout = require("./Logout");
var Link = require("react-router").Link;

import AuthService from '../utils/AuthService';


var NavBar= React.createClass({
  getDefaultProps: function() {
    return {};
  },
  userEntry: function() {
    if (this.props.loggedIn) {
      return (
        <div className="navbuttons">
          <Link to={"/"} className="nav-btn nav-link">Home</Link>
          <Link to={"/search/hairstylist/montreal/profileScore"} className="nav-btn nav-link">Search</Link>
          <Link to={"/createprofile"} className="nav-btn nav-link">Create Your Profile</Link>
          <Logout auth={this.props.auth} />
        </div>
      )
    } else {
      return (
        <div className="navbuttons">
          <Link to={"/"} className="nav-btn nav-link">Home</Link>
          <Link to={"search/hairstylist"} className="nav-btn nav-link">Search</Link>
          <Link to={"/createprofile"} className="nav-btn nav-link">Create Your Profile</Link>
          <Login auth={this.props.auth} />
        </div>
      )
    }
  },
    componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
  },
    render: function() {
    return (
        <div className="header">    
            <div className="loginoutbuttons">
              {this.userEntry()}
            </div>
        </div>
    );
  }
});

module.exports = NavBar;