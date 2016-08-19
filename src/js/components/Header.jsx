/* global localStorage */
var React = require('react');
var SearchBar = require("./SearchBar");
var Login = require("./Login");
var Logout = require("./Logout");

var Header = React.createClass({
  getDefaultProps: function() {
    return {};
  },
  logInOut: function() {
    // if (!localStorage.id_token) {
    //   <Login auth={this.props.auth} />;
    // } else {
    //   <Logout auth={this.props.auth} />;
    // }
  },
    componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
  },
    render: function() {
    console.log(localStorage)
    return (
      <div className="header">
        <div className="loginoutbuttons">
        <Login auth={this.props.auth} />
        <Logout auth={this.props.auth} />;
          {this.logInOut()}
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