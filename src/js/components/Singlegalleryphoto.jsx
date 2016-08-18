var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlegalleryphoto = React.createClass({
    render: function() {
        return (
            <li>
            <div> 
            <img className="singlephoto" src={this.props.photo.images.standard_resolution.url} />
            </div>
            <br/>
            </li>
        );
    }
});

module.exports = Singlegalleryphoto;
