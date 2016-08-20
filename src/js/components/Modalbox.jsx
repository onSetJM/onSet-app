var React = require('react');
var ReactDOM = require('react-dom');
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
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


var Modalbox = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  afterOpenModal: function() {
    // references are now sync'd and can be accessed.
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },
  _handleSubmit: function(e) {
      e.preventDefault();
      var reviewObj = {
          score: this.refs.score.value,
          text: this.refs.reviewText.value,
          token: localStorage.instagram_sub,
          profileusername: this.props.username
      };
      console.log(reviewObj);
      var that = this;
      $.ajax({           
            url: '/createareview', 
            data: reviewObj,
            type: 'POST',
            success: function(result) {
                console.log("This is the result" + result);
                history.push(`/profile/martimax21`);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
        this.setState({modalIsOpen: false})
    },

  render: function() {
    return (
      <div>
        <button className="btn btn-danger" onClick={this.openModal}> REVIEW {this.props.username} </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles} >

          <h2 ref="subtitle">Hello</h2>
          <div>Review {this.props.username}</div>
          <form id="reviewForm" onSubmit={this._handleSubmit}>
            <p> Please enter a score out of 10 </p>
            <input type="number" ref="score" placeholder="Score out of 10" />
            <p> Please enter your comments </p>
            <input ref="reviewText" type="textarea" />
            <br/>
            <button className="btn btn-danger"> Submit your review !</button>
          </form>
        </Modal>
      </div>
    );
  }
});

module.exports = Modalbox;