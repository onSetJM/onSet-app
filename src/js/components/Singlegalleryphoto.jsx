var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singlegalleryphoto = React.createClass({
    render: function() {
        return (
            
            <div> 
            <img className="singlephoto" src={this.props.photo.url} />
            </div>

        );
    }
});
//src={this.props.photo.images.standard_resolution.url}
module.exports = Singlegalleryphoto;
