var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');
var Modal = require('react-modal');
var $ = require('jquery');
/* global localStorage */


var history = require('react-router').browserHistory;
var Link = require("react-router").Link;




var Createreviewform = React.createClass({
  getInitialState: function() {
    return { rating: 1 };
  },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.refs.score.value,
          text: this.refs.reviewText.value,
          reviewertoken: localStorage.instagram_sub,
          profileusername: this.props.username,
          reviewerusername: this.state.profile.username
      };
      console.log(reviewObj);
      var that = this;
      $.ajax({           
            url: '/createareview', 
            data: reviewObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
                history.push(`/profile/martimax21`);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
        this.setState({modalIsOpen: false})
    },
    componentDidMount: function() {
      var that = this;
      $.ajax({
          url: '/getInstagramProfile',
          headers: {
              authorization: 'Bearer ' + localStorage.getItem('id_token')
          }
      }).then(
          function(response) {
            console.log(response, "this is my profile sunday night")
              that.setState({profile: response});
          }
        )
  },
  render: function() {
    var rating  = this.state.rating;
    return (
      <div >
        
          <p className="h2">Review {this.props.name}</p>
          
          
            <div className="form-group">
                 <input type="text" className="form-control" ref="headline" id="exampleInputPassword1" placeholder="Review Title" />
            </div>
            <div className="form-group">
                <label htmlFor="score">Rate Your Experience with {this.props.name}</label>
                 <input type="number" className="form-control" ref="score" id="exampleInputPassword1" placeholder="Score out of 10" />
             </div>
            
            <div className="form-group">
                <label htmlFor="comments">Review Message: </label>
                <textarea className="form-control" ref="reviewText" id="exampleTextarea" rows="3"></textarea>
            </div>
            
          
      </div>
      
    );
  }
});

/*
<div> Star score to debug
                <h2>Rating from state: {rating}</h2>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick}
                />
            </div>
            */

module.exports = Createreviewform;