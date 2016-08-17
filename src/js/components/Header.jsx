var React = require('react');
var Search = require("./Search")


var Header = React.createClass({
    showLock: function() {
        this.props.lock.show();
    },
    render: function() {
    return (
      <div className="header">
      <div className="login-box">
            <button className="btn btn-secondary btn-sm" onClick={this.showLock}>Sign In</button>
        </div>
          <div className="header-text">
            <h1>onSet</h1>
            <h2>build your profile. get hired.</h2>
            <Search className="searchbar" component={Search}/>
        </div>
      </div>
    );
  }
});

module.exports = Header;