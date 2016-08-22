
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;


var HomeButton = React.createClass({
    redirect: function () {
      return (
        history.push("/")
        )
    },
    render: function(){
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={this.redirect} className="footer-title">Home</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = HomeButton;