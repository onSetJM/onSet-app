var React = require("react");
var SearchResults = require("./SearchResults");

var SearchBar = React.createClass({
    _handleSearch: function () {
        console.log(this.refs.search.value);
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