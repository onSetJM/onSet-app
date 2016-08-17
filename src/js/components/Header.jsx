var React = require('react');
var SearchBar = require("./SearchBar")


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
            <SearchBar className="searchbar" component={SearchBar}/>
        </div>
      </div>
    );
  }
});

module.exports = Header;