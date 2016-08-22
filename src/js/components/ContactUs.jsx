var React = require("react");
var $ = require ("jquery");
var history = require('react-router').browserHistory;

var ContactUs = React.createClass({
    getInitialState: function(){
        return {};
    },
    _sendData : function () {
      var formInfo = {
              Name: this.refs.name.value,
              Email: this.refs.email.value,
              Message: this.refs.msg.value,
            };
        $.ajax({           
            url: '/contactus', 
            data: formInfo,
            type: 'POST',
            success: function(result) {
                console.log("This is the contactus result" + result);
            },
            error: function() {
              console.log('this is the ajax error');      
            }
        });
    },
    _handleSubmit: function(e) {
        e.preventDefault();
        this._sendData();
        // history.push("/contactus");
        alert("Thanks for your email!");
    },
    render: function() {
    return (
      <div className="contact-us-container">
      <h2 className="contactus-title">Contact Us</h2> 
      <h3 className="contactus-subtitle">Have some thoughts you'd like to share with us? We'd love to hear them! 
      We'll get back to you at the email you provide as soon as possible.</h3>
        <form  className="contactusform" id="emailForm">
              <input ref="name" type="text" placeholder="Name" />
              <input ref="email" type="text" placeholder="Your Email"/>
              <textarea ref="msg" type="text" placeholder="Share your thoughts here!" />
            <br/>
            <br/>
            <button className="btn btn-default  btn-blue" onClick={this._handleSubmit}> Send away!</button>
        </form>
      </div>
    )}
});

module.exports= ContactUs;


