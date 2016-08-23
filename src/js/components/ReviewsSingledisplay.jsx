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
                    <div>
                    <h4> Review Title </h4>
                    </div>
                    <div className= "starsforsinglereview">
                    <StarRatingComponent 
                         name="singleprofilerating" 
                         starCount={5}
                         value={reviewScore}
                         editing={false} /> 
                    </div>
                </div>
                
                <div className="reviewBody">
                    <p>{this.props.review.reviewText} </p>
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