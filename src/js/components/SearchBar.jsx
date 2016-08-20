var React = require("react");
var SearchResults = require("./SearchResults");
/* global localStorage */

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var SearchBar = React.createClass({
    _handleSearch: function () {
        history.push(`/search/${this.refs.search.value}`);
    },
    render: function(){
        return (
            <div className="homepagesearchbar">
                <input type="search" ref="search" className="searchinput eqHeight" placeholder="Search by profession" />
                <button type="button" onClick={this._handleSearch} className="btn btn-secondary btn-sm eqHeight">Search</button>
            </div>
        );
    }
});

module.exports = SearchBar;