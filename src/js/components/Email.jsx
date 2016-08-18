var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Email = React.createClass({
    render: function() {
    return (
      <div>
        <form  id="emailForm">
            <p> Contract Date </p>
            <input type="date" ref="date" placeholder="Data" />
            <p> City </p>
            <input ref="City" type="text" />
            <p> Phone Number </p>
            <input ref="PhoneNumber" type="text" />
            <p> Describe the services that you need </p>
            <input ref="ServiceDesc" type="text" />
            <br/>
            <br/>
            <button className = "btn btn-danger" > Send an email !</button>
        </form>
      </div>
    );
  }
});

module.exports = Email;
