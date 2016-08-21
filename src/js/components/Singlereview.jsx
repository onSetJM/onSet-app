var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlereview = React.createClass({
    render: function() {
        return (
            <div className="singleReview" key={this.props.review.reviewId}>
                <div className="reviewText">
                    <p className="reviewScore"> Review Score: {this.props.review.reviewScore}</p><br/>
                    
                    <p className="reviewpText"> Review Text: {this.props.review.reviewText} </p>
                </div>
                <div> Date :  {this.props.review.reviewCreatedAt}</div>
            </div>
        );
    }
});

module.exports = Singlereview;
