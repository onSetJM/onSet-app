var React = require('react');
var $ = require('jquery');
var Reviewsmodaldisplay = require('./Reviewsmodaldisplay');

var history = require('react-router').browserHistory;



var Reviews = React.createClass({
    getInitialState: function() {
        return {};
    },
  render: function() {
      if (!this.state.reviews) {
            return <div>Loading</div>;
        }
    return (
      <div>
           
      </div>
    );

  }
});


module.exports = Reviews;