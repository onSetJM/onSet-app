var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;
var $ = require ("jquery");


var Email = React.createClass({
  getInitialState: function(){
        return {};
  },
    _sendData : function () {
      var formInfo = {
              ContactDate: this.refs.date.value, 
              Name: this.refs.name.value,
              ContacterCity: this.refs.city.value,
              Email: this.refs.email.value,
              PhoneNumber: this.refs.phonenumber.value,
              Message: this.refs.msg.value,
              profileUsername: this.props.params.username
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
        history.push(`/profiles/${this.props.params.username}`);
    },
    render: function() {
    return (
      <div>
        <form  id="emailForm">
            <p> Contract Date </p>
              <input type="date" ref="date" placeholder="Data" />
            <p> Name </p>
              <input ref="name" type="text" />
            <p> City </p>
              <input ref="city" type="text" />
            <p> Email</p>
              <input ref="email" type="text" />
            <p> Phone Number </p>
              <input ref="phonenumber" type="text" />
            <p> Describe the services that you need </p>
              <input ref="msg" type="text" />
            <br/>
            <br/>
            <button className="btn btn-danger" onClick={this._handleSubmit}> Send an email !</button>
        </form>
      </div>
    );
  }
});

module.exports = Email;
