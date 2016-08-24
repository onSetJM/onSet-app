var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var StarRatingComponent = require('react-star-rating-component');
var moment = require('moment');



var ReviewsSingledisplay = React.createClass({
    render: function() {
        var reviewScore = (this.props.review.reviewScore) /2;
        var date = moment(this.props.review.reviewCreatedAt).format('MMMM Do YYYY');
        return (
            <div className="singleReviewContainer" key={this.props.review.reviewId}>
                <div className="reviewHeader">
                    <div>
                    <h5> {this.props.review.reviewHeadline} </h5>
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
                        <abbr class="initialism"> Reviewed by {this.props.review.reviewerusername} on {date} </abbr>
                </div>
            </div>
            
        );
    }
});

module.exports = ReviewsSingledisplay;

/*


*/