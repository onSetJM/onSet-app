var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var StarRatingComponent = require('react-star-rating-component');



var ReviewsSingledisplay = React.createClass({
    render: function() {
        var reviewScore = (this.props.review.reviewScore) /2;
        return (
            <div className="singleReviewContainer" key={this.props.review.reviewId}>
                <div className="reviewHeader">
                    <h4> Review Title </h4>
                    <StarRatingComponent 
                         name="singleprofilerating" 
                         starCount={5}
                         value={reviewScore}
                         editing={false} /> 
                    <span> {reviewScore} </span>
                </div>
                
                <div className="reviewBody">
                    <p>Review: <span className="review-var">{this.props.review.reviewText}</span></p>
                </div>
                
                <div className="reviewfooter">
                        <abbr class="initialism"> Reviewed by {this.props.review.reviewerusername} on {this.props.review.reviewCreatedAt} </abbr>
                </div>
            </div>
            
        );
    }
});

module.exports = ReviewsSingledisplay;

/*


*/