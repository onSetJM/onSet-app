/* global localStorage */
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;
var $ = require("jquery");


var ViewYourProfileFoot = React.createClass({
    redirect: function () {
        if (!localStorage.id_token) {
            history.push("/pleaselogin")
            
        } else {
            var token = localStorage.instagram_sub;
            $.ajax({           
            url: '/myprofile', 
            data: {token: token},
            type: 'POST',
            success: function(result) {
                console.log(result, "result!!");
                    history.push(`/profile/${result.username}`)
                },
            error: function() {
                    console.log('this is the ajax error');      
            }
            });

        }
    },
    render: function(){
    return (
      <div>
        <Button onClick={this.redirect} className="view-btn">View Your Profile</Button>
      </div>
    );
    }
});

module.exports = ViewYourProfileFoot;