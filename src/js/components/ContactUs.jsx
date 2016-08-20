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
      <div>
      <h2>Contact Us</h2> 
      <h3>Have some thoughts you'd like to share with us? We'd love to hear them! 
      We'll get back to you at the email you provide as soon as possible.</h3>
        <form  id="emailForm">
            <p> Name </p>
              <input ref="name" type="text" />
            <p> Email</p>
              <input ref="email" type="text" />
            <p> Message </p>
              <input ref="msg" type="text" />
            <br/>
            <br/>
            <button className="btn btn-danger" onClick={this._handleSubmit}> Send away!</button>
        </form>
      </div>
    )}
});

module.exports= ContactUs;


