import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
import AuthService from '../utils/AuthService'


var Logout = React.createClass({
    render: function(){
    var  auth = this.props.auth;
    
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={function() {auth.logout()}}>Logout</Button>
        </ButtonToolbar>
      </div>
    )
    }
});


module.exports = Logout;