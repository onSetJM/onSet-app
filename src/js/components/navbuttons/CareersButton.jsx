
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;


var CareersButton = React.createClass({
    redirect: function () {
      return (
        history.push("/careers")
        )
    },
    render: function(){
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={this.redirect}>Join Our Team!</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = CareersButton;