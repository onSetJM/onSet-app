
import React from 'react';
var history = require('react-router').browserHistory;


var HeaderTitle = React.createClass({
    redirect: function () {
      return (
        history.push("/")
        )
    },
    render: function(){
    return (
      <div>
        <button onClick={this.redirect} className="onset-title">onSet</button>
      </div>
    );
    }
});

module.exports = HeaderTitle;