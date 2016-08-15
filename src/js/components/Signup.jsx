var React = require('react');


var Signup = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
      this.lock = new Auth0Lock('u62PeQq50xQ4RgaJr291OGnUwdgrc6cA', 'https://onset-jessmitch.c9users.io/');
      // this.lock = new Auth0Lock('u62PeQq50xQ4RgaJr291OGnUwdgrc6cA', 'https://onsetproject-martimax21.c9users.io/');
  },
  render: function() {
    return (<Home lock={this.lock} />);
  }
});

module.exports = Signup;