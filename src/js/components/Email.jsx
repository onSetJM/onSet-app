var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var $ = require("jquery");

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    padding: '25px',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minHeight: '10rem',
    minWidth: '15rem',
    width: '65%',
    maxWidth: '35rem',
    maxHeight: '90%'
  }
};


var Email = React.createClass({
  getInitialState: function() {
    return {
      modalIsOpen: false
    };
  },
  _sendData: function() {
    var formInfo = {
      ContactDate: this.refs.date.value,
      Name: this.refs.name.value,
      ContacterCity: this.refs.city.value,
      Email: this.refs.email.value,
      PhoneNumber: this.refs.phonenumber.value,
      Message: this.refs.msg.value,
      profileUsername: this.props.username
    };
    $.ajax({
      url: '/email',
      data: formInfo,
      type: 'POST',
      success: function(result) {
        console.log("This is the email result" + result);
      },
      error: function() {
        console.log('this is the ajax error');
      }
    });
  },
  _handleSubmit: function(e) {
    e.preventDefault();
    this._sendData();
    this.setState({
      modalIsOpen: false
    });
  },
  openModal: function() {
    this.setState({
      modalIsOpen: true
    });
  },

  closeModal: function() {
    this.setState({
      modalIsOpen: false
    });
  },
  render: function() {
    return (
      <div className="email-container">
         <button  className="btn btn-default btn-sm profilebtn" onClick={this.openModal}> Email {this.props.name} </button>
         
         <Modal isOpen={this.state.modalIsOpen} onAfterOpen={this.afterOpenModal} onRequestClose={this.closeModal} style={customStyles}>
           <div className="modalreview">
             <p className="h4">Send an email to hire {this.props.name}</p>
             <form id="reviewForm emailForm" onSubmit={this._handleSubmit}>

                <label htmlFor="date">Contract date  </label>
                <input type="date" className="form-control" ref="date" id="date" placeholder="Contract date" />

                <label htmlFor="name">Name </label>
                <input type="text" className="form-control" ref="name" id="name" placeholder="Name" />

                <label htmlFor="example-email-input">Email</label>
                <input className="form-control" type="email" ref="email" placeholder="Email" id="example-email-input"/>

                <label htmlFor="city">City </label>
                <input type="text" className="form-control" ref="city" id="city" placeholder="City" />

                <label htmlFor="example-tel-input">Phone Number</label>
                <input className="form-control" type="tel" ref="phonenumber" placeholder="Phone Number" id="example-tel-input" />

                <label htmlFor="emailtext">Describe the services that you need  </label>
                <textarea className="form-control" ref="msg" id="exampleTextarea" rows="3"></textarea>

               <button  className="btn btn-default btn-sm btn-blue cform" onClick={this._handleSubmit}> Send an email !</button>
             </form>
           </div>
         </Modal>
   </div>
    );
  }
});

module.exports = Email;
