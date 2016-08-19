var React = require('react');
var $ = require('jquery');
var Singlereview = require('./Singlereview');

var history = require('react-router').browserHistory;



var Reviews = React.createClass({
    getInitialState: function() {
        return {};
    },
    componentDidMount: function() {
        var that = this;
        console.log(that.props.params.username);
        $.ajax({           
            url: '/reviews', 
            data: {profileusername:that.props.params.username},
            type: 'POST',
            success: function(result) {
                console.log(result.reviews);
                that.setState({
                 reviews:result.reviews
                });
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
  },
  render: function() {
      if (!this.state.reviews) {
            return <div>LOADING FOLLOWERS...</div>;
        }
    return (
      <div>
            <div >
            <h3>Reviews</h3>
             <ul>
                 {this.state.reviews.map(function(review){
                     return <Singlereview key={review.reviewId} review = {review} />;
                 })}
             </ul>
            </div>
      </div>
    );

  }
});


module.exports = Reviews;