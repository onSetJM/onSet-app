
var React = require('react');
var SearchBar = require("./SearchBar");

var Link = require("react-router").Link;

var Parallax = require('react-parallax').Parallax;

var HeaderHome = React.createClass({
    componentDidMount: function() {
      setTimeout(function() {window.scrollBy(0, 1);}, 0);
    },
    render: function() {
    return (
          <div>
            <Parallax bgImage="/img/blue-hair-jess copy.jpg" strength={400}>
              <div className="homecontent">
                <div>
                  <Link className="header-title" to={"/"}>onSet</Link>
                  <h2>build your profile. get hired.</h2>
                  <SearchBar className="searchbar"/>
                </div>
              </div>
            </Parallax>
        </div>
    );
  }
});

module.exports = HeaderHome;