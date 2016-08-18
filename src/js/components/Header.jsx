var React = require('react');
var SearchBar = require("./SearchBar");


var Header = React.createClass({
    render: function() {
    return (
      <div className="header">
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