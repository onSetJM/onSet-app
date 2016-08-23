var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');
var Modal = require('react-modal');
var $ = require('jquery');
var ReviewsSingledisplay = require('./ReviewsSingledisplay');
var StarRatingComponent = require('react-star-rating-component');
/* global localStorage */


var history = require('react-router').browserHistory;
var Link = require("react-router").Link;

/*
By default the modal is anchored to document.body. All of the following overrides are available.

* element
Modal.setAppElement(appElement);

* query selector - uses the first element found if you pass in a class.
Modal.setAppElement('#your-app-element');

*/

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    padding               : '40px',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minHeight: '10rem',
    minWidth: '15rem',
    width: '80%',
    maxWidth: '50rem',
    maxHeight: '70%'
  }
};


var Reviewsmodaldisplay = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false};
  },
  onStarClick: function(name, nextValue) {
        this.setState({rating: nextValue});
    },
  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  render: function() {
    var reviewScore = (this.props.profile.profileScore)/2;
    return (
      <div>
          <button className="btn btn-default btn-sm profilebtn" onClick={this.openModal}>
              Total Reviews: {this.props.profile.profileReviews}
          </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="modalreview">
            <div className="allreviewsheader">
              <h2>{this.props.profile.name} </h2>
              <div className="userReviewedTitle" >
                  <h3> {reviewScore} </h3>
                  <div className= "totalscoreforuser">
                    <StarRatingComponent 
                         name="singleprofilerating" 
                         starCount={5}
                         value={reviewScore}
                         editing={false} /> 
                  </div>
                  <div className="totalscorereview"> {this.props.profile.profileReviews} reviews </div>
              </div>
            </div>
            <div className="displayReviews">
                 {this.props.reviews.map(function(review){
                     return <ReviewsSingledisplay key={review.reviewId} review = {review} />;
                 })}
            </div>
          </div>
        </Modal>
      </div>
      
    );
  }
});



module.exports = Reviewsmodaldisplay;