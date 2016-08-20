/* global localStorage */
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;
var $ = require("jquery");


var ViewYourProfile = React.createClass({
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
                console.log(result);
                return (
                    history.push(`/profile/${result.username}`)
                 );
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
        <ButtonToolbar>
             <Button onClick={this.redirect} href="#viewprofile">View Your Profile</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = ViewYourProfile;

