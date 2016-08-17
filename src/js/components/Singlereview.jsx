var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlereview = React.createClass({
    render: function() {
        return (
            <li>
            <div> Review Score: {this.props.review.reviewScore}</div>
            <div> Review Text: {this.props.review.reviewText} </div>
            <div> Date :  {this.props.review.reviewCreatedAt}</div>
            <div> Username: {this.props.review.user.username} </div>
            </li>
        );
    }
});

module.exports = Singlereview;
