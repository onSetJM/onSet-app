var React = require("react");

var Search = React.createClass({
    render: function(){
        return (
            <div className="homepagesearchbar">
                <input type="search" className="searchinput eqHeight" placeholder="Search" />
                <button type="button" className="btn btn-secondary btn-sm eqHeight">Search</button>
            </div>
        );
    }
});

module.exports = Search;