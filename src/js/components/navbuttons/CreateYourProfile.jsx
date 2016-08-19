
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;


var CreateYourProfile = React.createClass({
    redirect: function () {
      return (
        history.push("/createprofile")
        )
    },
    render: function(){
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={this.redirect}>Create Your Profile</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = CreateYourProfile;