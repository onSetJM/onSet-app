var React = require('react');
var Login = require("./Login");
var Logout = require("./Logout");
var Link = require("react-router").Link;

var $ = require('jquery');
/* global localStorage */


var ViewYourProfile = require("./navbuttons/ViewYourProfile");

import AuthService from '../utils/AuthService';


var NavBar= React.createClass({
  getInitialState: function() {
                return {};
            },
  getDefaultProps: function() {
    return {};
  },
  userEntry: function() {
    console.log(this.state.username, "This is state for the nav buttons");
    if (this.props.loggedIn) {
      return (
        <div className="navbuttons">
          <Link to={"/"} className="nav-btn nav-link">Home</Link>
          <Link to={"/search/hairstylist/montreal/profileScore"} className="nav-btn nav-link">Search</Link>

          <Link to={!this.state.username ? "/createprofile": "/editprofile/"+this.state.username} className="nav-btn nav-link">{!this.state.username ? "Create your profile": "Edit your profile"}</Link>

          
          {!this.state.username ? null: <ViewYourProfile />} 

          <Logout auth={this.props.auth} />
        </div>
      )
    } else {
      console.log(this.state.username, "This is state for the nav buttons");
      return (
        <div className="navbuttons">
          <Link to={"/"} className="nav-btn nav-link">Home</Link>
          <Link to={"/search/hairstylist/montreal/profileScore"} className="nav-btn nav-link">Search</Link>
          <Link to={!this.state.username ? "/createprofile": "/editprofile/"+this.state.username} className="nav-btn nav-link">{!this.state.username ? "Create your profile": "Edit your profile"}</Link>
          <Login auth={this.props.auth} />
        </div>
      )
    }
  },
    componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
  },
  componentDidMount: function() {
                var that = this;
                $.ajax({           
                 url: '/getusername', 
                 data: {token: localStorage.instagram_sub},
                 type: 'POST',
                  success: function(result) {
                     that.setState({
                           username: result.username.username
                      });
                      console.log(result.username, "this is profile USERNAME");
                 },
                 error: function() {
                    console.log('this is the ajax error');      
                 }
              });
            },
    render: function() {
      console.log(this.state.username, "THIS IS THE USERNAME LOG IN");
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