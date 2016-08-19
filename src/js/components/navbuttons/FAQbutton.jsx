
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;


var FAQbutton = React.createClass({
    redirect: function () {
      return (
        history.push("/faq")
        )
    },
    render: function(){
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={this.redirect}>FAQ</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = FAQbutton;