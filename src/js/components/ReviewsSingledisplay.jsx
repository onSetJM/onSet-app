var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var ReviewsSingledisplay = React.createClass({
    render: function() {
        return (
            <div className="singleReviewContainer" key={this.props.review.reviewId}>
                <div className="reviewHeader">
                    <div className="reviewerUsername">Reviewer: <span className="review-var">{this.props.review.reviewerusername}</span></div>
                </div>
                <div className="reviewBody">
                    <div className="reviewScore">Score: <span className="review-var">{this.props.review.reviewScore}</span></div>
                    <div className="reviewText">Review: <span className="review-var">{this.props.review.reviewText}</span></div>
                    <div className="reviewpText">Date: <span className="review-var">{this.props.review.reviewCreatedAt}</span></div>
                </div>
                <div className="reviewfooter">
                </div>
            </div>
            
        );
    }
});

module.exports = ReviewsSingledisplay;

/*


*/