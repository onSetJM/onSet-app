var React = require("react");

var Home = React.createClass({
  showLock: function() {
    this.props.lock.show();
  },

  render: function() {
    return (
    <div className="login-box">
      <button onClick={this.showLock}>Sign In</button>
    </div>);
  }
});

module.exports = Home;