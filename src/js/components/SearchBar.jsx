var React = require("react");
var SearchResults = require("./SearchResults");
/* global localStorage */

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var SearchBar = React.createClass({
    _handleSearch: function () {
        history.push(`/search/${this.refs.category.value}/${this.refs.city.value}/searchresults`);
    },
    render: function(){
        return (
            <div className="homepagesearchbar">
                    
                    <select  className="form-control" ref='category'>
                        <option value="hairstylist">Hairstylist </option>
                         <option value="make-up Artist">Make-up Artist</option>
                         <option value="colorist">Colorist</option>
                        <option value="stylist">Stylist</option>
                         <option value="dualist">Dualist</option>
                          <option value="nailartist">Nail Artist</option>
                    </select>

                <input type="search" ref="city" className="searchinput eqHeight" placeholder="City" />
                <button type="button" onClick={this._handleSearch} className="btn btn-secondary btn-sm eqHeight">Search</button>
            </div>
        );
    }
});

module.exports = SearchBar;