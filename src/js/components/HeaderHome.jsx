
var React = require('react');
var SearchBar = require("./SearchBar");

var Link = require("react-router").Link;



var HeaderHome = React.createClass({
    render: function() {
    return (
          <div className="header-text headerhome">
            <Link className="header-title" to={"/"}>onSet</Link>
            <h2>build your profile. get hired.</h2>
            <SearchBar className="searchbar"/>
        </div>
    );
  }
});

module.exports = HeaderHome;