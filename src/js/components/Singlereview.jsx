var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlereview = React.createClass({
    render: function() {
        return (
            <div className="singleReview" key={this.props.review.reviewId}>
                    <div className="reviewerUsername">Reviewer: <span className="review-var">{this.props.review.reviewerusername}</span></div>
                    <div className="reviewScore">Score: <span className="review-var">{this.props.review.reviewScore}</span></div>
                    <div className="reviewText">Review: <span className="review-var">{this.props.review.reviewText}</span></div>
                    <div className="reviewpText">Date: <span className="review-var">{this.props.review.reviewCreatedAt}</span></div>
            </div>
        );
    }
});

module.exports = Singlereview;
