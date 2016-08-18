var React = require('react');
var history = require('react-router').browserHistory;
var Link = require("react-router").Link;



var Singleprofileresult = React.createClass({
    render: function() {
        var url = "/profile/" + this.props.profile.username;
        return (
            <li>
            <div> 
                <Link to={url}>
                    <p className="profile-nickname">{this.props.profile.username}</p>
                </Link>
            </div>
            <div> Score :  {this.props.profile.profileScore}</div>
            <div> Total reviews: {this.props.profile.totalReviews} </div>
            <div> ProfilePic: {this.props.profile.profilePic} </div>
            <div> Category: {this.props.profile.profileCategory} </div>
            <div> Speciality: {this.props.profile.profileData} </div>
            </li>
        );
    }
});

module.exports = Singleprofileresult;
