var React = require('react');
var ReactDOM = require('react-dom');
var StarRatingComponent = require('react-star-rating-component');
var Modal = require('react-modal');
var $ = require('jquery');
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
    maxWidth: '35rem'
  }
};


var Createreviewmodal = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false, rating:5 };
  },
  onStarClick: function(nextValue, prevValue, name) {
        console.log(nextValue, "NEXT VALUE")
        this.setState({rating: nextValue});
    },
  openModal: function() {
    this.setState({modalIsOpen: true});
    if(!localStorage.instagram_sub) {
      history.push(`/pleaselogin`);
    };
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.state.rating,
          headline: this.refs.headline.value,
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
              
                that.props.onReviewSubmit();
                console.log("This is the result KJHGKJHVKJHHJ");
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
    console.log(this.state.rating, "THE RATING")
    var rating  = this.state.rating;
    return (
      <div >
        <button className="btn btn-default btn-sm profilebtn" onClick={this.openModal}>Review {this.props.name}</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >
          <div className="modalreview">
          <p className="h2">Rate {this.props.name}</p>
          
          <form id="reviewForm" onSubmit={this._handleSubmit}>
            <div>
              <h2>
                <StarRatingComponent 
                    name="rate1" 
                    starCount={10}
                    value={rating}
                    onStarClick={this.onStarClick}
                    size={50}
                />
                </h2>
            </div>
            <div className="form-group">
                 <input type="text" className="form-control" ref="headline" id="exampleInputPassword1" placeholder="Headline" />
            </div>

             
            
            <div className="form-group">
                <textarea className="form-control" ref="reviewText" id="exampleTextarea" rows="3" placeholder="Review message"></textarea>
            </div>
            <button className="btn btn-default btn-sm profilebtn">Submit your review!</button>

          </form>
          </div>
        </Modal>
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

module.exports = Createreviewmodal;