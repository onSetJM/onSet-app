var React = require("react");
/* global localStorage */

var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

var SearchBar = React.createClass({
    getInitialState: function() {
        return {
            searchstatus: false
        };
    },
    _handleSearch: function () {
        var searchstatus = this.state.searchstatus;
        if(!this.refs.city.value) {
            this.setState({
                searchstatus: true
            })
        }
        else {
            this.setState({
                searchstatus: false
            })
            history.push(`/search/${this.refs.category.value}/${this.refs.city.value}/${this.refs.filter.value}`);
        }
    },
    render: function(){
        var children = this.props.children && React.cloneElement(this.props.children, {searchObj: this.state.searchObj });
        return (
            
            <div className="homepagesearchbar">
                <div className="superselect">
                    <select ref='category' defaultValue="hairstylist">
                        <option value="Hairstylist">Hairstylist </option>
                        <option value="Make-Up Artist">Make-up Artist</option>
                        <option value="Colorist">Colorist</option>
                        <option value="Stylist">Stylist</option>
                        <option value="Dualist">Dualist</option>
                        <option value="Nail Artist">Nail Artist</option>
                    </select>
                </div>
                
                <input type="search" ref="city" className="searchinput eqHeight" placeholder="City"  />
                <div className="superselect">
                    <select ref="filter">
                        <option value="" disabled selected>Filter by </option>
                        <option value="profileScore">Best profile scores </option>
                        <option value="totalReviews">Total number of reviews</option>
                        <option value="profileCreateAt"> Latest profiles </option>
                    </select>    
                </div>
                <button type="button" onClick={this._handleSearch} className="eqHeight">Search</button>
                {this.state.searchstatus ? alert('please pick a city ') : null}
            </div>
          
        );
    }
});

module.exports = SearchBar;
/*


*/