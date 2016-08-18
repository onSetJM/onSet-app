/* global localStorage*/

import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';



var Login = React.createClass({
  
    render: function(){

    var  auth = this.props.auth;
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={function() {auth.login()}}>Login</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = Login;