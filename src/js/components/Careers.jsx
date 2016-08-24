var React = require("react");
var $ = require("jquery");
var HeaderOther = require("./HeaderOther");

var Careers = React.createClass({
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
            <HeaderOther />
            <div className="content-padding contact-us-container">
                <h1 className="page-main-title">Careers</h1>
                <div>
                    <h2 className="contactus-subtitle">Interested in joining our team? Send us an email about yourself!</h2>
                    
                    <form  className="contactusform" id="emailForm">
                        <input className="cform" ref="name" type="text" placeholder="Name" />
                        <input className="cform" ref="email" type="text" placeholder="Your Email"/>
                        <textarea className="cform" ref="msg" type="text" placeholder="Tell us about yourself!!" />
                        <br/>
                        <button className="btn btn-default  btn-blue" onClick={this._handleSubmit}> Send away!</button>
                    </form>
                </div>
            </div>
            </div>
            );
    }
});

module.exports= Careers;