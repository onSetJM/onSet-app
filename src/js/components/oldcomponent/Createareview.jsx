var React = require('react');
var $ = require('jquery');
/* global localStorage */


var history = require('react-router').browserHistory;
var Link = require("react-router").Link;


var Createareview = React.createClass({
    getInitialState: function() {
        return {};
    },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.refs.score.value,
          text: this.refs.reviewText.value,
          token: localStorage.instagram_sub,
          profileusername: this.props.params.username
      };
      console.log(reviewObj);
      var that = this;
      $.ajax({           
            url: '/createareview', 
            data: reviewObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
                history.push(`/profile/${that.props.params.username}`);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
    },
  render: function() {
    return (
      <div>
        <form  id="reviewForm" onSubmit={this._handleSubmit}>
            <p> Please enter a score out of 10 </p>
            <input type="number" ref="score" placeholder="Score out of 10" />
            <p> Please enter your comments </p>
            <input ref="reviewText" type="textarea" />
            <button > Submit your review !</button>
        </form>
      </div>
    );
  }
});

module.exports = Createareview;


