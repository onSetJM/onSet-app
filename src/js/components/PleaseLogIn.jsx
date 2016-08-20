var React = require("react");
var Login = require("../components/Login");

var PleaseLogIn = React.createClass({
  render: function() {
      return (
          <div>
            <h2>Please Log In to Continue Browsing</h2>
            <p>Thanks so much for your interest in our site! Some of our content
            requires you to be logged in but, don't worry, it's super simple.
            Log in with just two clicks.</p>
            <Login auth={this.props.auth}/>
          </div>
      );
  }
 });
 
module.exports = PleaseLogIn;