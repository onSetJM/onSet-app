var React = require('react');



var Header = React.createClass({
    showLock: function() {
        this.props.lock.show();
    },
    render: function() {
    return (
      <div className="header">
      <div className="header-img">
        <div className="login-box">
            <button className="btn btn-secondary btn-sm" onClick={this.showLock}>Sign In</button>
        </div>
        <h1>onSet</h1>
        <h2>build your profile. get hired.</h2>
        </div>
      </div>
    );
  }
});

module.exports = Header;