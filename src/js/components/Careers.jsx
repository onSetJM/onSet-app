var React = require("react");
var $ = require("jquery");

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
            <div className="content-padding">
                <h1 className="page-main-title">Careers</h1>
                <div>
                    <h2 className="page-subtitle">Interested in joining our team? Send us an email about yourself!</h2>
                    
                    <form  className="contactusform" id="emailForm">
                        <input ref="name" type="text" placeholder="Name" />
                        <input ref="email" type="text" placeholder="Your Email"/>
                        <textarea ref="msg" type="text" placeholder="Tell us about yourself!!" />
                        <br/>
                        <button className="btn btn-default  btn-blue" onClick={this._handleSubmit}> Send away!</button>
                    </form>
                </div>
            </div>
            );
    }
});

module.exports= Careers;