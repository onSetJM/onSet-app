var React = require('react');
var SearchBar = require("./SearchBar");
var Login = require("./Login");
var Logout = require("./Logout");

var Header = React.createClass({
  getDefaultProps: function() {
    return {}
  },
  componentWillReceiveProps: function(nextProps) {
    console.log(nextProps);
  },
    render: function() {
    console.log(this.props)
    return (
      <div className="header">
        <div className="loginoutbuttons">
          <Login auth={this.props.auth} />
          <Logout auth={this.props.auth} />
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