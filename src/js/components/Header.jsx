/* global localStorage */
var React = require('react');
var SearchBar = require("./SearchBar");
var Login = require("./Login");
var Logout = require("./Logout");
import AuthService from '../utils/AuthService';
var SearchButton = require("./navbuttons/SearchButton");
var HomeButton = require("./navbuttons/HomeButton");
var CreateYourProfile = require("./navbuttons/CreateYourProfile");

var Header = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  userEntry: function() {
    if (this.props.loggedIn) {
      return (
        <div className="navbuttons">
          <HomeButton />
          <SearchButton />
          <CreateYourProfile /> 
          <Logout auth={this.props.auth} />
        </div>
      )
    } else {
      return (
        <div className="navbuttons">
          <HomeButton />
          <SearchButton />
          <CreateYourProfile /> 
          <Login auth={this.props.auth} />
        </div>
      )
    }
  },
    componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
  },
    render: function() {
    console.log(localStorage.id_token)
    return (
      <div className="header">
        <div className="loginoutbuttons">
          {this.userEntry()}
        </div>
          <div className="header-text">
            <h1>onSet</h1>
            <h2>build your profile. get hired.</h2>
            <SearchBar className="searchbar"/>
        </div>
      </div>
    );
  }
});

module.exports = Header;