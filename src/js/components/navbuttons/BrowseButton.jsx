
import React, { PropTypes as T } from 'react';
import {ButtonToolbar, Button} from 'react-bootstrap';
var history = require('react-router').browserHistory;


var BrowseButton = React.createClass({
    redirect: function () {
      return (
        history.push("/search/hairstylist/Montreal/searchresults")
        )
    },
    render: function(){
    return (
      <div>
        <ButtonToolbar>
             <Button onClick={this.redirect}>Browse Profiles</Button>
        </ButtonToolbar>
      </div>
    );
    }
});

module.exports = BrowseButton;