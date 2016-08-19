var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlereview = React.createClass({
    render: function() {
        return (
            <li>
            <div> Review Score: {this.props.review.reviewScore}</div>
            <p> Review Text: {this.props.review.reviewText} </p>
            <div> Date :  {this.props.review.reviewCreatedAt}</div>
            <div> Reviewer: {this.props.review.reviewer} </div>
            </li>
        );
    }
});

module.exports = Singlereview;
