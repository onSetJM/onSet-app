var React = require('react');
var $ = require('jquery');
/* global localStorage */

import {withRouter} from "react-router";
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var SearchForm = React.createClass({
    getInitialState: function() {
        return {};
    },
  _handleSubmit: function(e) {
      e.preventDefault();
      var searchObj = {
                 category: this.refs.category.value,
                 availability: this.refs.availability.value,
                 city: this.refs.city.value,
                 sortingMethod: this.refs.sortingMethod.value
        }
      this.setState({searchObj:searchObj});
      this.props.router.push(`/search/${this.refs.category.value}/searchresults`);
  },
  render: function() {
     var children = this.props.children && React.cloneElement(this.props.children, {searchObj: this.state.searchObj }) 
    return (
      <div>
        <form  id="searchForm" onSubmit={this._handleSubmit}>
            <p> Pick a category of work </p>
            <select ref="category" defaultValue={this.props.params.category}>
                <option value="hairstylist">Hairstylist </option>
                <option value="make-up Artist">Make-up Artist</option>
                <option value="colorist">Colorist</option>
                <option value="stylist">Stylist</option>
                <option value="dualist">Dualist</option>
                <option value="nailartist">Nail Artist</option>
            </select>
            <p> Availability </p>
            <input ref="availability" type="text" />
            <p> Enter your city </p>
            <input ref="city" type="text" />
            <p> Sorted by</p>
            <select ref="sortingMethod">
                <option value="profileScore">Best profile scores </option>
                <option value="totalReviews">Total number of reviews</option>
                <option value="profileCreateAt"> Latest profiles </option>
            </select>
            <button >Search</button>
        </form>
        {children}
      </div>
    );
  }
});

var SearchFormWithRouter = withRouter(SearchForm);

module.exports = SearchFormWithRouter;