var React = require('react');

var Signup = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
      this.lock = new Auth0Lock('YOUR_CLIENT_ID', 'YOUR_CLIENT_DOMAIN');
  },
  render: function() {
    return (<Home lock={this.lock} />);
  }
});

module.exports = Signup;