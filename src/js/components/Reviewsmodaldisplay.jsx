var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');
var Modal = require('react-modal');
var $ = require('jquery');
var ReviewsSingledisplay = require('./ReviewsSingledisplay');
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
    width: '65%',
    maxWidth: '30rem',
    maxHeight: '80%'
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
    console.log(this.props.reviews, "hi from modal reviews");
    console.log(this.props.profile, "hi from modal profile");
    return (
      <div>
          <button className="btn btn-default profilebtn" onClick={this.openModal}>
              TotalReviews: {this.props.profile.profileReviews}
          </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="modalreview">
            <h3>{this.props.profile.name} </h3>
            <h5> {this.props.profile.profileScore}/10 for {this.props.profile.profileReviews} reviews </h5>
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