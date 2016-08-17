var React = require('react');



var Header = React.createClass({
    showLock: function() {
        this.props.lock.show();
    },
    render: function() {
    return (
      <div>
        <div className="login-box">
            <button onClick={this.showLock}>Sign In</button>
        </div>
        <h1>onSet</h1>
        <img src="/img/hairphoto.jpeg"/>
      </div>
    );
  }
});

module.exports = Header;